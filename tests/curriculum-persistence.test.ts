import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { openDatabase } from "../backend/src/database.ts";
import { LearningDAO } from "../backend/src/endpoints/learning.dao.ts";
import { LearningService } from "../backend/src/endpoints/learning.service.ts";
import {
  createQuizState,
  questionsFor,
  isCorrect,
} from "../frontend/src/quiz-answers.ts";
import { workspaceActivityId } from "../frontend/src/activity.ts";
import type { Course, Project, ProjectStage, Quiz } from "../shared/types";
import { createApp } from "../backend/src/app.ts";

const versions: Course[] = [1, 2, 3].map((v) =>
  JSON.parse(fs.readFileSync(`content/legacy/course-v${v}.json`, "utf8")),
);
const originalV4Quizzes: Course = JSON.parse(
  fs.readFileSync("content/legacy/course-v4-original-quizzes.json", "utf8"),
);
const original = versions[1].activities.find(
  (a) => a.kind === "project",
) as Project;
const project: Project = {
  ...original,
  id: "new-project",
  milestones: [{ ...original.milestones[0], id: "later" }],
};
const stage: ProjectStage = {
  ...project,
  id: "early-stage",
  kind: "project-stage",
  projectId: project.id,
  milestones: [{ ...original.milestones[0], id: "early" }],
};
const oldQuiz = versions[1].activities.find((a) => a.kind === "quiz") as Quiz;
const quiz: Quiz = {
  ...oldQuiz,
  id: "new-quiz",
  questions: [oldQuiz.questions[0]],
  alternateQuestions: [{ ...oldQuiz.questions[1], id: "alternate-question" }],
};
const course: Course = {
  version: 3,
  chapters: [],
  groups: [],
  activities: [project, stage, quiz],
};

test("HTTP stage aliases reject stale writes and backup restores canonical workspaces", async () => {
  const db = openDatabase(":memory:");
  const { app } = createApp(db);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api`;
  const request = async (route: string, data?: unknown, method = "PUT") => {
    const response = await fetch(base + route, {
      method: data === undefined ? "GET" : method,
      headers: { "Content-Type": "application/json" },
      body: data === undefined ? undefined : JSON.stringify(data),
    });
    return { status: response.status, data: await response.json() };
  };
  try {
    for (const name of ["calculator", "pong"]) {
      const first = `python-v3-${name}-first`,
        last = `python-v3-${name}-project`;
      assert.equal(
        (
          await request(`/workspaces/${first}`, {
            revision: 0,
            files: { "main.py": "# first" },
          })
        ).status,
        200,
      );
      assert.equal(
        (await request(`/workspaces/${last}`)).data.files["main.py"],
        "# first",
      );
      await request(`/workspaces/${last}`, {
        revision: 1,
        files: { "main.py": "# improved", "history.json": "[]" },
      });
      const stale = await request(`/workspaces/${first}`, {
        revision: 1,
        files: { "main.py": "# stale" },
      });
      assert.equal(stale.status, 409);
      assert.equal(stale.data.current.files["main.py"], "# improved");
      await request(`/progress/${first}`, { complete: true });
      const archived = (await request(`/archive/${first}`)).data;
      assert.equal(archived.workspace.files["main.py"], "# improved");
      assert.equal(archived.workspace.files["history.json"], "[]");
      assert.equal(archived.progress.complete, true);
    }
    for (const version of versions) {
      const id = version.activities[0].id;
      await request(`/workspaces/${id}`, {
        revision: 0,
        files: { "main.py": `# old v${version.version}` },
      });
      await request(`/progress/${id}`, { complete: true });
      assert.equal(
        (await request(`/archive/${id}`)).data.progress.complete,
        true,
      );
    }
    const backup = (await request("/backup")).data;
    assert(!Object.keys(backup.workspaces).some((id) => id.endsWith("-first")));
    assert.equal(
      (await request("/backup/preview", backup, "POST")).status,
      200,
    );
    assert.equal(
      (await request("/backup/restore", backup, "POST")).status,
      200,
    );
    const state = (await request("/state")).data;
    assert.equal(state.progress["python-v3-pong-first"].complete, true);
    assert.equal(state.progress["python-v3-pong-project"], undefined);
    assert.equal(
      (await request("/workspaces/python-v3-pong-first")).data.files[
        "history.json"
      ],
      "[]",
    );
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    db.close();
  }
});

test("Stages share files and revisions while retaining separate earned completion", () => {
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db),
      service = new LearningService(dao, course, versions);
    assert.equal(workspaceActivityId(stage), project.id);
    assert.equal(workspaceActivityId(project), project.id);
    service.save(stage.id, {
      revision: 0,
      files: { "main.py": "print('mine')" },
      project: { milestones: ["early"] },
    });
    assert.equal(
      service.workspace(project.id).files["main.py"],
      "print('mine')",
    );
    service.progress(stage.id, { complete: true });
    assert.equal(dao.getProgress(project.id).complete, undefined);
    service.save(project.id, {
      revision: 1,
      files: { "main.py": "print('improved')", "history.json": "[]" },
      project: { milestones: ["early", "later"] },
    });
    assert.equal(service.workspace(stage.id).revision, 2);
    assert.equal(service.workspace(stage.id).files["history.json"], "[]");
    assert.equal(
      service.save(stage.id, { revision: 1, files: { "main.py": "stale" } })
        .conflict,
      true,
    );
    assert.equal(
      service.workspace(stage.id).files["main.py"],
      "print('improved')",
    );
    assert.throws(
      () =>
        service.save(stage.id, {
          revision: 2,
          files: {},
          project: { milestones: ["unrelated"] },
        }),
      /milestones/,
    );
    const backup = service.validateBackup(dao.backup());
    assert.deepEqual(Object.keys(backup.workspaces), [project.id]);
    dao.restore(backup);
    assert.equal(service.workspace(stage.id).files["history.json"], "[]");
    assert.equal(dao.getProgress(stage.id).complete, true);
    assert.equal(dao.getProgress(project.id).complete, undefined);
  } finally {
    db.close();
  }
});

test("Quiz drafts and attempts retain their question form across reload, retry and backup", () => {
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db),
      service = new LearningService(dao, course, versions);
    const a = createQuizState(quiz, 0, (x) => x),
      b = createQuizState(quiz, a.attempt, (x) => x);
    assert.equal(a.formId, "a");
    assert.equal(b.formId, "b");
    assert.equal(createQuizState(quiz, b.attempt, (x) => x).formId, "a");
    a.answers[quiz.questions[0].id] = quiz.questions[0].answer;
    a.finished = true;
    service.save(quiz.id, { revision: 0, files: {}, quiz: a });
    assert(
      isCorrect(questionsFor(quiz, service.workspace(quiz.id).quiz)[0], a),
    );
    service.save(quiz.id, { revision: 1, files: {}, quiz: b });
    const roundtrip = service.validateBackup(dao.backup());
    dao.restore(roundtrip);
    const saved = service.workspace(quiz.id).quiz!;
    assert.equal(saved.formId, "b");
    assert.equal(questionsFor(quiz, saved)[0].id, "alternate-question");
    assert.deepEqual(saved.answers, {});
    assert.throws(
      () =>
        service.validateWorkspace(quiz.id, {
          revision: 0,
          files: {},
          quiz: { ...b, answers: a.answers },
        }),
      /Quiz data/,
    );
    assert.throws(
      () =>
        service.validateWorkspace(oldQuiz.id, {
          revision: 0,
          files: {},
          quiz: { ...createQuizState(oldQuiz, 0, (x) => x), formId: "b" },
        }),
      /Quiz data/,
    );
  } finally {
    db.close();
  }
});

test("All three historical courses remain readable and restorable without transferring credit", () => {
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db),
      service = new LearningService(dao, course, versions);
    for (const v of versions) {
      const id = v.activities[0].id;
      service.save(id, {
        revision: 0,
        files: { "main.py": `# version ${v.version}` },
      });
      service.progress(id, { complete: true });
    }
    const backup = service.validateBackup(dao.backup());
    dao.restore(backup);
    assert.equal(service.archive().length, 3);
    for (const v of versions)
      assert.equal(
        service.archivedWork(v.activities[0].id).progress.complete,
        true,
      );
    assert.equal(service.workspace(project.id), null);
  } finally {
    db.close();
  }
});

test("All authored quiz forms preserve drafts, scoring, answers and immutable attempt interpretation", () => {
  const active: Course = JSON.parse(
    fs.readFileSync("content/course.json", "utf8"),
  );
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db),
      service = new LearningService(dao, active, versions);
    for (const q of active.activities.filter(
      (a): a is Quiz => a.kind === "quiz",
    )) {
      for (const previous of [0, 1]) {
        const draft = createQuizState(q, previous, (values) =>
          values.toReversed(),
        );
        const selected = questionsFor(q, draft);
        const revision = service.workspace(q.id)?.revision || 0;
        const blank = selected.find((question) => question.codeBlank)!;
        draft.placements![blank.id] = [blank.codeBlank!.tokens[0].id];
        service.save(q.id, { revision, files: {}, quiz: draft });
        assert.deepEqual(service.workspace(q.id).quiz, draft);
        for (const question of selected)
          draft.answers[question.id] = question.codeBlank
            ? JSON.stringify(
                question.codeBlank.blanks.map(
                  (b) =>
                    question.codeBlank!.tokens.find((t) => t.code === b.answer)!
                      .id,
                ),
              )
            : question.answer;
        draft.finished = true;
        draft.index = 5;
        assert.equal(
          selected.filter((question) => isCorrect(question, draft)).length,
          6,
        );
        const first = selected[0];
        draft.answers[first.id] = first.choices.find(
          (c) => c.id !== first.answer,
        )!.id;
        assert.equal(
          selected.filter((question) => isCorrect(question, draft)).length,
          5,
        );
        service.save(q.id, { revision: revision + 1, files: {}, quiz: draft });
        dao.attempt(q.id, {
          type: "quiz",
          formId: draft.formId,
          format: draft.format,
          attempt: draft.attempt,
          answers: draft.answers,
          score: 83,
        });
      }
    }
    const before = dao.backup();
    dao.restore(service.validateBackup(before));
    assert.deepEqual(dao.backup().attempts, before.attempts);
    assert.equal(before.attempts.length, 46);
    for (const q of active.activities.filter(
      (a): a is Quiz => a.kind === "quiz",
    )) {
      const saved = service.workspace(q.id).quiz!;
      assert.equal(saved.formId, "b");
      assert(
        questionsFor(q, saved).every((question) => question.id.includes("-b-")),
      );
    }
  } finally {
    db.close();
  }
});

test("Original v4 quiz forms restore under their archived identity without passing revised quizzes", async () => {
  const db = openDatabase(":memory:");
  const { app } = createApp(db);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api`;
  const request = async (route: string, data?: unknown, method = "PUT") => {
    const response = await fetch(base + route, {
      method: data === undefined ? "GET" : method,
      headers: { "Content-Type": "application/json" },
      body: data === undefined ? undefined : JSON.stringify(data),
    });
    return { status: response.status, data: await response.json() };
  };
  try {
    const active = (await request("/course")).data as Course;
    for (const q of originalV4Quizzes.activities as Quiz[]) {
      assert(!active.activities.some((a) => a.id === q.id));
      const draft = createQuizState(q, 1, (values) => values);
      const selected = questionsFor(q, draft);
      draft.answers[selected[0].id] = selected[0].answer;
      assert.equal(
        (
          await request(`/workspaces/${q.id}`, {
            revision: 0,
            files: {},
            quiz: draft,
          })
        ).status,
        200,
      );
      await request(`/progress/${q.id}`, { complete: true, score: 67 });
      const archive = (await request(`/archive/${q.id}`)).data;
      assert.deepEqual(archive.workspace.quiz, draft);
      assert.equal(archive.progress.complete, true);
      assert.equal(
        questionsFor(q, archive.workspace.quiz)[0].id,
        selected[0].id,
      );
      const replacement = active.activities.find(
        (a) => a.kind === "quiz" && a.chapter === q.chapter,
      )!;
      assert.notEqual(replacement.id, q.id);
      assert(
        !(await request("/state")).data.progress[replacement.id]?.complete,
      );
    }
    const backup = (await request("/backup")).data;
    assert.equal(
      (await request("/backup/preview", backup, "POST")).status,
      200,
    );
    assert.equal(
      (await request("/backup/restore", backup, "POST")).status,
      200,
    );
    for (const q of originalV4Quizzes.activities as Quiz[])
      assert.deepEqual(
        (await request(`/workspaces/${q.id}`)).data.quiz,
        backup.workspaces[q.id].quiz,
      );
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    db.close();
  }
});
