import assert from "node:assert/strict";
import fs from "node:fs";
import {
  course,
  estimatedHours,
} from "../content-src/project-course/index.mjs";
assert.deepEqual(
  JSON.parse(fs.readFileSync("content/course.json", "utf8")),
  JSON.parse(JSON.stringify(course)),
);
assert.equal(course.chapters.length, 10);
assert.equal(course.paths.length, 2);
assert.equal(course.activities.length, 64);
assert.equal(course.activities.filter((a) => !a.optional).length, 63);
assert.equal(course.activities.filter((a) => a.kind === "coding").length, 50);
assert.equal(course.activities.filter((a) => a.kind === "quiz").length, 10);
assert.equal(estimatedHours, 22);
const ids = new Set(course.activities.map((a) => a.id));
const legacy = JSON.parse(
  fs.readFileSync("content/legacy/course-v1.json", "utf8"),
);
assert(
  legacy.activities.every((a) => !ids.has(a.id)),
  "Old completion cannot imply new completion",
);
assert.equal(legacy.activities.length, 240);
assert.deepEqual(
  course.chapters.flatMap((c) => c.activityIds),
  course.activities.map((a) => a.id),
);
for (const a of course.activities) {
  assert.equal(
    course.groups.filter((g) => g.activityIds.includes(a.id)).length,
    1,
    a.id,
  );
  assert(Number.isFinite(a.estimatedMinutes) && a.estimatedMinutes > 0);
}
for (const p of course.paths) {
  const project = course.activities.find((a) => a.id === p.projectId);
  assert.equal(project.kind, "project");
  assert.deepEqual(project.checkpoints, []);
  assert.deepEqual(project.solution, {});
  assert.equal(p.chapterNumbers.at(-1), project.chapter);
}
const reading = course.activities.find((a) => a.kind === "reading");
assert.equal(reading.presentation, "article");
assert.deepEqual(reading.files, {});
const ai = course.activities.find((a) => a.optional);
assert.equal(ai.continueFrom, "python-v2-pong-project");
assert.equal(ai.kind, "project");
assert.deepEqual(ai.checkpoints, []);
console.log(
  "Course assembly: two paths, 50 exercises, ten quizzes, reading, self-assessed projects, optional extension, preserved legacy IDs, references and duration passed.",
);
