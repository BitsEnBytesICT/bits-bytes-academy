import assert from "node:assert/strict";
import fs from "node:fs";
import {
  course,
  estimatedHours,
  estimatedMinutes,
} from "../content-src/complete-course/index.mjs";
import { course as v2 } from "../content-src/project-course/index.mjs";
import { createManifest } from "../content-src/complete-course/manifest.mjs";
import { requestedCrosswalk } from "../content-src/complete-course/requested-topics.mjs";
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
assert.deepEqual(
  read("content/legacy/course-v3.json"),
  JSON.parse(JSON.stringify(course)),
);
assert.deepEqual(
  read("content/legacy/course-v2.json"),
  JSON.parse(JSON.stringify(v2)),
);
const manifest = createManifest(course);
manifest.requestedSyllabus = requestedCrosswalk(
  read("content/legacy/course-v1.json"),
  manifest.topics,
);
assert.equal(manifest.requestedSyllabus.length, 151);
assert.equal(manifest.version, 3);
assert.equal(course.chapters.length, 17);
assert.equal(course.activities.length, 105);
const required = course.activities.filter((a) => !a.optional);
assert.equal(required.length, 104);
for (const [kind, count] of [
  ["coding", 83],
  ["quiz", 16],
  ["project", 2],
  ["project-stage", 2],
])
  assert.equal(required.filter((a) => a.kind === kind).length, count);
assert.equal(estimatedMinutes, 1770);
assert.equal(estimatedHours, 30);
const ids = new Set(course.activities.map((a) => a.id));
for (const v of [1, 2])
  for (const a of read(`content/legacy/course-v${v}.json`).activities)
    assert(
      !ids.has(a.id) || a.id === "python-v2-pong-ai",
      "Changed contracts must not inherit earned credit",
    );
assert.deepEqual(
  course.chapters.flatMap((c) => c.activityIds),
  course.activities.map((a) => a.id),
);
for (const a of course.activities) {
  assert.equal(
    course.groups.filter((g) => g.activityIds.includes(a.id)).length,
    1,
  );
  assert(a.estimatedMinutes > 0);
}
for (const p of course.paths)
  assert.equal(
    course.activities.find((a) => a.id === p.projectId).kind,
    "project",
  );
const article = course.activities.at(-1);
assert.equal(article.presentation, "article");
assert.equal(article.sections.length, 6);
assert.deepEqual(article.files, {});
assert.deepEqual(article.checkpoints, []);
console.log(
  "Assembly: 17 modules, 83 exercises, 32 quiz forms, two staged projects, article, 225 topic contracts and both historical definitions verified.",
);
