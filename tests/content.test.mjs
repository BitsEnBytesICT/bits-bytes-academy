import fs from "node:fs";
import assert from "node:assert/strict";
const course = JSON.parse(fs.readFileSync("content/legacy/course-v1.json", "utf8"));
assert.equal(course.chapters.length, 13);
assert.equal(course.activities.length, 240);
assert.equal(course.activities.filter((a) => a.sourcePosition).length, 160);
assert.equal(
  course.activities.filter((a) => a.kind === "challenge").length,
  59,
);
const quizzes = course.activities.filter((a) => a.kind === "quiz");
assert.equal(quizzes.length, 13);
assert.equal(
  quizzes.reduce((n, q) => n + q.questions.length, 0),
  114,
);
const ids = new Set();
const localized = (x) => {
  assert.equal(typeof x.en, "string");
  assert.equal(typeof x.nl, "string");
  assert(x.en.trim());
  assert(x.nl.trim());
};
for (const a of course.activities) {
  assert.equal(
    a.estimatedMinutes,
    a.kind === "quiz"
      ? a.questions.length
      : a.kind === "reading"
        ? 2
        : a.kind === "challenge"
          ? 10
          : 6,
  );
  assert.equal(
    course.groups.filter((group) => group.activityIds.includes(a.id)).length,
    1,
  );
  assert(!ids.has(a.id));
  ids.add(a.id);
  localized(a.title);
  assert(
    course.chapters.some(
      (c) => c.number === a.chapter && c.activityIds.includes(a.id),
    ),
  );
  if (a.kind === "quiz") {
    for (const q of a.questions) {
      localized(q.prompt);
      if (q.codeBlank) {
        const b = q.codeBlank;
        localized(b.prompt);
        assert.equal(b.segments.length, b.blanks.length + 1);
        assert.equal(new Set(b.tokens.map((t) => t.id)).size, b.tokens.length);
        const available = b.tokens.map((t) => t.code);
        for (const blank of b.blanks) {
          localized(blank.reason);
          const index = available.indexOf(blank.answer);
          assert(index >= 0, `Missing token for ${q.id}`);
          available.splice(index, 1);
        }
      }
      assert(q.choices.length >= 2 && q.choices.length <= 4);
      assert.equal(q.choices.filter((c) => c.id === q.answer).length, 1);
      assert.equal(new Set(q.choices.map((c) => c.id)).size, q.choices.length);
      for (const choice of q.choices) {
        localized(choice.label);
        localized(choice.reason);
      }
    }
  } else {
    localized(a.explanation);
    localized(a.solutionNote);
    assert.equal(typeof a.files["main.py"], "string");
    assert.equal(typeof a.solution["main.py"], "string");
    for (const c of a.checkpoints) {
      localized(c.task);
      localized(c.hint);
      assert(c.check || c.expectedError);
    }
    assert(a.kind === "reading" || a.checkpoints.length > 0);
  }
}
console.log(
  "Content validation passed: 13 chapters, 160 core lessons, 59 challenges, 8 readings, 13 quizzes / 114 questions, complete bilingual fields.",
);
