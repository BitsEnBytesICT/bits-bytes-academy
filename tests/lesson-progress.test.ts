import test from "node:test";
import assert from "node:assert/strict";
import {
  recordLessonRun,
  instructionView,
} from "../frontend/src/lesson-progress.ts";
import type { Checkpoint } from "../shared/types";

const checkpoints = [1, 2, 3].map((n) => ({
  id: `lesson-v2-step-${n}`,
})) as Checkpoint[];
test("Revised tasks preserve earned completion and old progress without passing new tasks", () => {
  const original = {
    complete: true,
    assisted: true,
    checkpoints: ["lesson-step-1"],
  };
  const result = recordLessonRun(original, checkpoints, [
    { id: checkpoints[0].id, passed: false },
  ]);
  assert.equal(result.complete, true);
  assert.equal(result.assisted, true);
  assert.deepEqual(result.checkpoints, ["lesson-step-1"]);
  assert.deepEqual(original.checkpoints, ["lesson-step-1"]);
  const incomplete = recordLessonRun(
    { ...original, complete: false },
    checkpoints,
    [],
  );
  assert.equal(incomplete.complete, false);
});

test("Sequential runs award only the current step and keep future failures neutral", () => {
  const results = checkpoints.map((c, i) => ({ id: c.id, passed: i < 2 }));
  const first = recordLessonRun(undefined, checkpoints, results, "sequential");
  assert.deepEqual(first.checkpoints, [checkpoints[0].id]);
  assert.equal(first.complete, false);
  const view = instructionView(
    checkpoints,
    first,
    Object.fromEntries(results.map((r) => [r.id, r.passed])),
    "sequential",
    checkpoints[0].id,
  );
  assert.equal(view.steps[1].active, true);
  assert.equal(view.steps[1].passed, false);
  assert.equal(view.steps[1].failed, false);
  assert.equal(view.steps[2].locked, true);
  assert.equal(view.steps[2].failed, false);
  const reload = instructionView(checkpoints, first, {}, "sequential");
  assert.equal(reload.steps[1].active, true);
  assert.equal(reload.steps[2].locked, true);
});

test("Sequential failure stays on the active step; unrelated future passes earn nothing", () => {
  const results = checkpoints.map((c, i) => ({ id: c.id, passed: i > 0 }));
  const progress = recordLessonRun(
    undefined,
    checkpoints,
    results,
    "sequential",
  );
  assert.deepEqual(progress.checkpoints, []);
  const view = instructionView(
    checkpoints,
    progress,
    Object.fromEntries(results.map((r) => [r.id, r.passed])),
    "sequential",
    checkpoints[0].id,
  );
  assert.equal(view.steps[0].failed, true);
  assert.equal(view.steps[1].locked, true);
  assert.equal(view.steps[1].passed, false);
});

test("A correct full solution immediately completes a sequential exercise", () => {
  const progress = recordLessonRun(
    undefined,
    checkpoints,
    checkpoints.map((c) => ({ id: c.id, passed: true })),
    "sequential",
  );
  assert.equal(progress.complete, true);
  assert.deepEqual(
    progress.checkpoints,
    checkpoints.map((c) => c.id),
  );
});

test("Earlier regressions require a focused final review without losing earned steps", () => {
  const previous = {
    complete: false,
    checkpoints: checkpoints.slice(0, 2).map((c) => c.id),
  };
  const results = checkpoints.map((c, i) => ({ id: c.id, passed: i !== 0 }));
  const progress = recordLessonRun(
    previous,
    checkpoints,
    results,
    "sequential",
  );
  assert.equal(progress.complete, false);
  assert.equal(progress.checkpoints?.length, 3);
  const view = instructionView(
    checkpoints,
    progress,
    Object.fromEntries(results.map((r) => [r.id, r.passed])),
    "sequential",
    checkpoints[2].id,
  );
  assert.equal(view.reviewing, true);
  assert.equal(view.reviewId, checkpoints[0].id);
  assert(view.steps.every((s) => !s.failed && !s.locked));
  const fixed = recordLessonRun(
    progress,
    checkpoints,
    checkpoints.map((c) => ({ id: c.id, passed: true })),
    "sequential",
  );
  assert.equal(fixed.complete, true);
});
test("Step history is preserved but new completion requires all tasks in the same run", () => {
  const first = recordLessonRun(undefined, checkpoints, [
    { id: checkpoints[0].id, passed: true },
    { id: "unrelated", passed: true },
  ]);
  assert.equal(first.complete, false);
  assert.deepEqual(first.checkpoints, [checkpoints[0].id]);
  const next = recordLessonRun(first, checkpoints, [
    { id: checkpoints[1].id, passed: true },
  ]);
  assert.equal(next.complete, false);
  const last = recordLessonRun(next, checkpoints, [
    { id: checkpoints[2].id, passed: true },
  ]);
  assert.equal(last.complete, false);
  const together = recordLessonRun(
    last,
    checkpoints,
    checkpoints.map((c) => ({ id: c.id, passed: true })),
  );
  assert.equal(together.complete, true);
  assert.equal(
    recordLessonRun(
      together,
      checkpoints,
      checkpoints.map((c) => ({ id: c.id, passed: false })),
    ).complete,
    true,
  );
  assert.equal(recordLessonRun(undefined, [], []).complete, false);
});
