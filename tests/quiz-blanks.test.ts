import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { openDatabase } from "../backend/src/database.ts";
import { LearningDAO } from "../backend/src/endpoints/learning.dao.ts";
import {
  LearningService,
  workspaceSchema,
} from "../backend/src/endpoints/learning.service.ts";
import {
  blankCode,
  createQuizState,
  decodePlacement,
  isCorrect,
  placement,
  placeToken,
  slotResults,
  usesBlanks,
  type QuizState,
} from "../frontend/src/quiz-answers.ts";
import type { Course, Quiz } from "../shared/types";
const course: Course = JSON.parse(
  fs.readFileSync("content/course.json", "utf8"),
);
const quiz = course.activities.find(
  (a) => a.id === "create-python-list-quiz",
) as Quiz;
const fresh = (): QuizState => ({
  index: 4,
  orders: quiz.questions.map((q) =>
    (q.codeBlank?.tokens || q.choices).map((c) => c.id),
  ),
  answers: {},
  placements: {},
  attempt: 1,
  finished: false,
  format: 2,
});

test("Code blanks track token instances, accept equivalent duplicates and grade each slot", () => {
  const retry = createQuizState(quiz, 5, (values) => values.reverse());
  assert.equal(retry.attempt, 6);
  assert.deepEqual(retry.answers, {});
  assert.deepEqual(retry.placements, {});
  assert.deepEqual(
    retry.orders[4],
    quiz.questions[4].codeBlank!.tokens.map((t) => t.id).reverse(),
  );
  const ordinary = course.activities.find(
    (a) => a.kind === "quiz" && a.id !== quiz.id,
  ) as Quiz;
  assert.equal(
    createQuizState(ordinary, 0, (values) => values).format,
    undefined,
  );
  const q = quiz.questions[4];
  let state = fresh();
  let values = placement(q, state);
  assert.deepEqual(values, [null, null, null]);
  values = placeToken(q, values, "token-2");
  assert.deepEqual(placeToken(q, values, "token-2"), values);
  values = placeToken(q, values, "token-1");
  values = placeToken(q, values, "token-3");
  assert.deepEqual(values, ["token-2", "token-1", "token-3"]);
  assert.deepEqual(slotResults(q, values), [true, true, true]);
  state.placements = { [q.id]: values };
  assert.equal(
    isCorrect(q, state),
    false,
    "a complete draft must not be graded",
  );
  state.answers[q.id] = JSON.stringify(values);
  assert.equal(isCorrect(q, state), true);
  assert.match(blankCode(q, values), /stock\[1\]\[1\] = 12/);
  state.answers[q.id] = JSON.stringify(["token-4", "token-2", "token-3"]);
  assert.equal(isCorrect(q, state), false);
  assert.deepEqual(slotResults(q, decodePlacement(state.answers[q.id])), [
    false,
    true,
    true,
  ]);
  assert.deepEqual(decodePlacement("invalid"), []);
  assert.deepEqual(decodePlacement('{"a":1}'), []);
  const legacy = { ...state, format: undefined, answers: { [q.id]: q.answer } };
  assert.equal(usesBlanks(q, legacy), false);
  assert.equal(isCorrect(q, legacy), true);
});

test("Quiz drafts, locked submissions and legacy attempts survive save and backup validation", () => {
  const db = openDatabase(":memory:");
  const service = new LearningService(new LearningDAO(db), course);
  const q = quiz.questions[4];
  try {
    const state = fresh();
    state.placements = { [q.id]: ["token-1", null, "token-3"] };
    service.save(quiz.id, { revision: 0, files: {}, quiz: state });
    assert.deepEqual(service.workspace(quiz.id).quiz, state);
    state.placements[q.id] = ["token-1", "token-2", "token-3"];
    state.answers[q.id] = JSON.stringify(state.placements[q.id]);
    service.save(quiz.id, { revision: 1, files: {}, quiz: state });
    const saved = service.workspace(quiz.id);
    assert.equal(isCorrect(q, saved.quiz!), true);
    const backup = {
      format: "python-lab-backup",
      version: 1,
      createdAt: new Date().toISOString(),
      progress: {},
      settings: {},
      unlocks: [],
      workspaces: { [quiz.id]: saved },
      attempts: [],
    };
    assert.deepEqual(
      service.validateBackup(backup).workspaces[quiz.id].quiz,
      state,
    );
    for (const bad of [
      { ...state, placements: { [q.id]: ["token-1", "token-1", "token-3"] } },
      { ...state, placements: { [q.id]: ["token-1", null, "token-3"] } },
      { ...state, placements: { unknown: [null] } },
      { ...state, answers: { [q.id]: '["token-1",null,"token-3"]' } },
      { ...state, answers: { [q.id]: '["token-1","token-2","not-a-token"]' } },
      { ...state, answers: { [q.id]: q.answer } },
      { ...state, finished: true },
    ])
      assert.throws(() =>
        service.validateWorkspace(quiz.id, {
          revision: 0,
          files: {},
          quiz: bad,
        }),
      );
    const legacy: QuizState = {
      index: 4,
      orders: quiz.questions.map((q) => q.choices.map((c) => c.id)),
      answers: { [q.id]: q.answer },
      finished: false,
      attempt: 1,
    };
    service.save(quiz.id, { revision: 2, files: {}, quiz: legacy });
    assert.deepEqual(service.workspace(quiz.id).quiz, legacy);
    const oldBackup = {
      ...backup,
      workspaces: { [quiz.id]: service.workspace(quiz.id) },
    };
    assert.deepEqual(
      service.validateBackup(oldBackup).workspaces[quiz.id].quiz,
      legacy,
    );
    assert.equal(
      workspaceSchema.safeParse({
        revision: 0,
        files: {},
        quiz: { ...fresh(), format: 3 },
      }).success,
      false,
    );
    const all = fresh();
    for (const question of quiz.questions) {
      if (question.codeBlank) {
        const remaining = [...question.codeBlank.tokens];
        const values = question.codeBlank.blanks.map(
          (b) =>
            remaining.splice(
              remaining.findIndex((t) => t.code === b.answer),
              1,
            )[0].id,
        );
        all.answers[question.id] = JSON.stringify(values);
        all.placements![question.id] = values;
      } else all.answers[question.id] = question.answer;
    }
    all.finished = true;
    service.validateWorkspace(quiz.id, { revision: 0, files: {}, quiz: all });
    assert.equal(quiz.questions.filter((q) => isCorrect(q, all)).length, 11);
    assert.deepEqual(fresh().answers, {});
    assert.deepEqual(fresh().placements, {});
  } finally {
    db.close();
  }
});
