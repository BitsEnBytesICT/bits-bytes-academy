import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { openDatabase } from "../backend/src/database.ts";
import { LearningDAO } from "../backend/src/endpoints/learning.dao.ts";
import { LearningService } from "../backend/src/endpoints/learning.service.ts";
import type { Course, Project } from "../shared/types";

const legacy: Course = JSON.parse(
  fs.readFileSync("content/legacy/course-v1.json", "utf8"),
);
const project: Project = {
  id: "python-v2-calculator-project",
  chapter: 5,
  group: "calculator-project",
  kind: "project",
  title: { en: "Your calculator", nl: "Jouw rekenmachine" },
  estimatedMinutes: 120,
  optional: false,
  explanation: { en: "Create your calculator.", nl: "Maak je rekenmachine." },
  example: "",
  files: { "main.py": "" },
  solution: {},
  solutionNote: { en: "Your design.", nl: "Jouw ontwerp." },
  checkpoints: [],
  milestones: [
    {
      id: "try-it",
      title: { en: "Try it", nl: "Probeer het" },
      description: { en: "Test your work.", nl: "Test je werk." },
      hints: [],
    },
  ],
  suggestedTests: [],
  references: [],
};
const course: Course = {
  version: 2,
  chapters: [],
  groups: [],
  activities: [project],
};

test("Projects save optional milestones and can be self-completed with no code or checked milestones", () => {
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db),
      service = new LearningService(dao, course, legacy);
    service.save(project.id, {
      revision: 0,
      files: { "main.py": "" },
      project: { milestones: [] },
    });
    assert.equal(
      service.progress(project.id, { complete: true }).complete,
      true,
    );
    const saved = service.save(project.id, {
      revision: 1,
      files: { "main.py": "# my own approach" },
      project: { milestones: ["try-it"] },
    });
    assert.equal(saved.revision, 2);
    assert.deepEqual(service.workspace(project.id).project, {
      milestones: ["try-it"],
    });
    const backup = service.validateBackup(dao.backup());
    dao.restore(backup);
    assert.deepEqual(service.workspace(project.id).project, {
      milestones: ["try-it"],
    });
    assert.equal(dao.getProgress(project.id).complete, true);
  } finally {
    db.close();
  }
});

test("Unknown, duplicated, and non-project milestone data is rejected without changing saved work", () => {
  const db = openDatabase(":memory:");
  try {
    const service = new LearningService(new LearningDAO(db), course, legacy);
    for (const milestones of [["unknown"], ["try-it", "try-it"]]) {
      assert.throws(
        () =>
          service.save(project.id, {
            revision: 0,
            files: {},
            project: { milestones },
          }),
        /milestones/,
      );
    }
    assert.throws(
      () =>
        service.save(legacy.activities[0].id, {
          revision: 0,
          files: {},
          project: { milestones: [] },
        }),
      /milestones/,
    );
    assert.equal(service.workspace(project.id), null);
  } finally {
    db.close();
  }
});

test("Legacy learning data remains restorable and inspectable without adding it to the active course", () => {
  const db = openDatabase(":memory:");
  try {
    const dao = new LearningDAO(db);
    const original = new LearningService(dao, legacy);
    const oldId = "python-hello-world-05";
    original.save(oldId, {
      revision: 0,
      files: { "main.py": 'destination = "saved work"' },
    });
    original.progress(oldId, { complete: true });
    original.settings({ lastActivity: oldId, language: "nl" });
    const backup = dao.backup();
    const revised = new LearningService(dao, course, legacy);
    const validated = revised.validateBackup(backup);
    dao.restore(validated);
    assert.equal(revised.course.activities.length, 1);
    assert.equal(revised.archive().length, 1);
    assert.equal(
      revised.archivedWork(oldId).workspace.files["main.py"],
      'destination = "saved work"',
    );
    assert.equal(revised.archivedWork(oldId).progress.complete, true);
    assert.throws(() => revised.unlock(oldId), /archived/);
    assert.throws(
      () => revised.archivedWork("intro-to-functions-01"),
      /No archived/,
    );
    assert.equal(revised.workspace(project.id), null);
    assert.deepEqual(dao.getProgress(project.id), {});
  } finally {
    db.close();
  }
});
