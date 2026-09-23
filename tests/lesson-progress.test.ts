import test from "node:test";
import assert from "node:assert/strict";
import { recordLessonRun } from "../frontend/src/lesson-progress.ts";
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
