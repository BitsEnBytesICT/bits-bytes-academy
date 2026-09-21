import { z } from "zod";
import { LearningDAO } from "./learning.dao.js";
import type { Course, Workspace } from "../../../shared/types.js";
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
  })
  .optional();
export const workspaceSchema = z.object({
  revision: z.number().int().min(0),
  files,
  quiz,
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
  constructor(
    public dao: LearningDAO,
    public course: Course,
  ) {
    this.ids = new Set(course.activities.map((a) => a.id));
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
    const activity = this.course.activities.find((a) => a.id === id)!;
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
      if (
        order.length !== question.choices.length ||
        new Set(order).size !== order.length ||
        order.some((id) => !question.choices.some((c) => c.id === id))
      )
        return invalid();
    }
    for (const [questionId, answerId] of Object.entries(state.answers)) {
      const question = activity.questions.find((q) => q.id === questionId);
      if (!question || !question.choices.some((c) => c.id === answerId))
        return invalid();
    }
    if (state.finished && activity.questions.some((q) => !state.answers[q.id]))
      return invalid();
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
    const values = [...new Set([...(this.dao.setting("unlocks") || []), id])];
    this.dao.setting("unlocks", values);
    return values;
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
