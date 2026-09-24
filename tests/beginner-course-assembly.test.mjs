import assert from "node:assert/strict";
import fs from "node:fs";
import {
  course,
  estimatedMinutes,
  estimatedHours,
} from "../content-src/beginner-course/index.mjs";
import { createManifest } from "../content-src/beginner-course/manifest.mjs";
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
assert.deepEqual(
  read("content/course.json"),
  JSON.parse(JSON.stringify(course)),
);
const manifest = createManifest(course, read("content/legacy/course-v1.json"));
assert.deepEqual(read("content/curriculum-manifest.json"), manifest);
assert.equal(manifest.requestedSyllabus.length, 151);
assert.equal(
  new Set(manifest.requestedSyllabus.map((r) => r.sourceUrl)).size,
  151,
);
assert.equal(course.version, 4);
assert.equal(course.chapters.length, 24);
assert.equal(estimatedHours, Math.ceil(estimatedMinutes / 60));
for (const v of [1, 2, 3])
  for (const a of read(`content/legacy/course-v${v}.json`).activities)
    assert(
      !course.activities.some((b) => b.id === a.id),
      "Changed tasks must not inherit old credit",
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
assert.deepEqual(
  course.activities.filter((a) => a.kind === "project").map((a) => a.chapter),
  [10, 16],
);
assert.deepEqual(
  course.activities.filter((a) => a.kind === "challenge").map((a) => a.chapter),
  [7, 12, 14, 18, 22, 23],
);
assert(
  !course.activities.some((a) => a.kind === "project-stage" || a.continueFrom),
);
const first = course.activities.slice(0, 8);
assert.deepEqual(
  first.map((a) => a.id.split("-").slice(3).join("-")),
  [
    "welcome",
    "first-print",
    "print-order",
    "strings-quotes",
    "print-numbers",
    "comments",
    "repair-syntax",
    "announcement",
  ],
);
assert.equal(first[1].files["main.py"], "");
assert.equal(first[7].files["main.py"], "");
const article = course.activities.at(-1);
assert.equal(article.presentation, "article");
assert.equal(article.sections.length, 6);
assert.deepEqual(article.files, {});
console.log(
  "Version 4 assembly, prerequisite evidence, source checklist, linear projects, bilingual content and archives verified.",
);
