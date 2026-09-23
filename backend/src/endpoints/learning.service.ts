import { z } from "zod";
import { LearningDAO } from "./learning.dao.js";
import type { Activity, Course, Workspace } from "../../../shared/types.js";
const safeFile = z
  .string()
  .regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.-]*$/)
  .max(100);
const files = z
  .record(safeFile, z.string().max(5 * 1024 * 1024))
  .refine(
    (v) =>
      Object.keys(v).length <= 40 &&
      Object.values(v).reduce((n, s) => n + Buffer.byteLength(s), 0) <=
        5 * 1024 * 1024,
    "Workspace exceeds 5 MiB or 40 files",
  );
const quiz = z
  .object({
    index: z.number().int().min(0).max(100),
    orders: z.array(z.array(z.string().max(50))).max(100),
    answers: z.record(z.string(), z.string()),
    finished: z.boolean(),
    attempt: z.number().int().min(1),
    format: z.literal(2).optional(),
    placements: z
      .record(
        z.string().max(120),
        z.array(z.string().max(50).nullable()).max(30),
      )
      .optional(),
  })
  .optional();
export const workspaceSchema = z.object({
  revision: z.number().int().min(0),
  files,
  quiz,
  project: z
    .object({ milestones: z.array(z.string().max(100)).max(30) })
    .optional(),
});
const progressSchema = z.object({
  complete: z.boolean(),
  assisted: z.boolean().optional(),
  checkpoints: z.array(z.string().max(100)).max(100).optional(),
  score: z.number().min(0).max(100).optional(),
  best: z.number().min(0).max(100).optional(),
});
const settingsSchema = z.object({
  language: z.enum(["en", "nl"]).optional(),
  lastActivity: z.string().max(120).optional(),
});
const backupSchema = z.object({
  format: z.literal("python-lab-backup"),
  version: z.literal(1),
  createdAt: z.string(),
  progress: z.record(z.string(), progressSchema),
  settings: settingsSchema,
  unlocks: z.array(z.string()),
  workspaces: z.record(z.string(), workspaceSchema),
  attempts: z
    .array(
      z.object({
        activityId: z.string(),
        data: z.unknown(),
        createdAt: z.string(),
      }),
    )
    .max(100000),
});
export class LearningService {
  ids: Set<string>;
  registry: Map<string, Activity>;
  constructor(
    public dao: LearningDAO,
    public course: Course,
    legacy?: Course,
  ) {
    this.registry = new Map(
      [...(legacy?.activities || []), ...course.activities].map((a) => [
        a.id,
        a,
      ]),
    );
    this.ids = new Set(this.registry.keys());
  }
  id(id: string) {
    if (!this.ids.has(id))
      throw Object.assign(new Error("Unknown activity"), { status: 404 });
    return id;
  }
  workspace(id: string) {
    this.id(id);
    return this.dao.getWorkspace(id);
  }
  save(id: string, body: unknown) {
    this.id(id);
    const workspace = workspaceSchema.parse(body);
    this.validateWorkspace(id, workspace);
    const { revision, ...data } = workspace;
    return this.dao.saveWorkspace(id, revision, data);
  }
  validateWorkspace(id: string, workspace: Workspace) {
    const activity = this.registry.get(id)!;
    if (
      workspace.project &&
      (activity.kind !== "project" ||
        new Set(workspace.project.milestones).size !==
          workspace.project.milestones.length ||
        workspace.project.milestones.some(
          (id) => !activity.milestones.some((m) => m.id === id),
        ))
    ) {
      throw Object.assign(
        new Error("Project milestones do not match this activity"),
        { status: 422 },
      );
    }
    const state = workspace.quiz;
    if (!state) return;
    const invalid = () => {
      throw Object.assign(new Error("Quiz data does not match this activity"), {
        status: 422,
      });
    };
    if (activity.kind !== "quiz") return invalid();
    if (
      state.index >= activity.questions.length ||
      state.orders.length !== activity.questions.length
    )
      return invalid();
    for (const [i, question] of activity.questions.entries()) {
      const order = state.orders[i];
      const options =
        state.format === 2 && question.codeBlank
          ? question.codeBlank.tokens
          : question.choices;
      if (
        order.length !== options.length ||
        new Set(order).size !== order.length ||
        order.some((id) => !options.some((c) => c.id === id))
      )
        return invalid();
    }
    for (const [questionId, answerId] of Object.entries(state.answers)) {
      const question = activity.questions.find((q) => q.id === questionId);
      if (!question) return invalid();
      if (state.format === 2 && question.codeBlank) {
        let values;
        try {
          values = JSON.parse(answerId);
        } catch {
          return invalid();
        }
        if (!this.validPlacement(question.codeBlank, values, true))
          return invalid();
      } else if (!question.choices.some((c) => c.id === answerId))
        return invalid();
    }
    for (const [questionId, values] of Object.entries(state.placements || {})) {
      const question = activity.questions.find((q) => q.id === questionId);
      if (
        state.format !== 2 ||
        !question?.codeBlank ||
        !this.validPlacement(question.codeBlank, values, false)
      )
        return invalid();
      if (
        state.answers[questionId] &&
        JSON.stringify(values) !== state.answers[questionId]
      )
        return invalid();
    }
    if (state.finished && activity.questions.some((q) => !state.answers[q.id]))
      return invalid();
  }
  validPlacement(
    spec: NonNullable<import("../../../shared/types.js").Question["codeBlank"]>,
    values: unknown,
    complete: boolean,
  ) {
    if (!Array.isArray(values) || values.length !== spec.blanks.length)
      return false;
    const used = values.filter((value) => value !== null);
    return (
      new Set(used).size === used.length &&
      values.every((value) =>
        value === null
          ? !complete
          : typeof value === "string" &&
            spec.tokens.some((t) => t.id === value),
      )
    );
  }
  progress(id: string, body: unknown) {
    this.id(id);
    const value = progressSchema.parse(body);
    const old = this.dao.getProgress(id);
    const result = {
      ...old,
      ...value,
      complete: !!(old.complete || value.complete),
      assisted: !!(old.assisted || value.assisted),
      checkpoints: [
        ...new Set([...(old.checkpoints || []), ...(value.checkpoints || [])]),
      ],
      best: Math.max(old.best || 0, value.score || 0, value.best || 0),
    };
    this.dao.setProgress(id, result);
    return result;
  }
  settings(body: unknown) {
    const value = settingsSchema.parse(body);
    if (value.lastActivity) this.id(value.lastActivity);
    const next = { ...this.dao.setting("preferences"), ...value };
    this.dao.setting("preferences", next);
    return next;
  }
  unlock(id: string) {
    this.id(id);
    if (!this.course.activities.some((a) => a.id === id))
      throw Object.assign(new Error("This activity is archived"), {
        status: 409,
      });
    const values = [...new Set([...(this.dao.setting("unlocks") || []), id])];
    this.dao.setting("unlocks", values);
    return values;
  }
  archive() {
    const state = this.dao.state();
    return [...this.registry.values()]
      .filter(
        (a) =>
          !this.course.activities.some((current) => current.id === a.id) &&
          (state.progress[a.id] || this.dao.getWorkspace(a.id)),
      )
      .map((a) => ({
        id: a.id,
        title: a.title,
        kind: a.kind,
        progress: state.progress[a.id] || { complete: false },
      }));
  }
  archivedWork(id: string) {
    this.id(id);
    if (!this.archive().some((a) => a.id === id))
      throw Object.assign(
        new Error("No archived learning data for this activity"),
        { status: 404 },
      );
    const activity = this.registry.get(id)!;
    return {
      id,
      title: activity.title,
      kind: activity.kind,
      workspace: this.dao.getWorkspace(id),
      progress: this.dao.getProgress(id),
    };
  }
  validateBackup(body: unknown) {
    const data = backupSchema.parse(body);
    for (const id of [
      ...Object.keys(data.progress),
      ...Object.keys(data.workspaces),
      ...data.unlocks,
      ...data.attempts.map((a) => a.activityId),
    ])
      this.id(id);
    for (const [id, workspace] of Object.entries(data.workspaces))
      this.validateWorkspace(id, workspace);
    if (data.settings.lastActivity) this.id(data.settings.lastActivity);
    return data;
  }
}
