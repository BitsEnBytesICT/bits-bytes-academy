import type { Checkpoint, Progress } from "../../shared/types";

export type CheckpointMode = "sequential" | "all-at-once";
export const nextCheckpoint = (
  checkpoints: Checkpoint[],
  progress?: Progress,
) => checkpoints.find((c) => !(progress?.checkpoints || []).includes(c.id))?.id;

export function recordLessonRun(
  previous: Progress | undefined,
  checkpoints: Checkpoint[],
  results: { id: string; passed: boolean }[],
  mode: CheckpointMode = "all-at-once",
  activeId = nextCheckpoint(checkpoints, previous),
): Progress {
  const valid = new Set(checkpoints.map((check) => check.id));
  const passedNow = new Set(
    results
      .filter((result) => result.passed && valid.has(result.id))
      .map((result) => result.id),
  );
  const allPassed =
    checkpoints.length > 0 && checkpoints.every((c) => passedNow.has(c.id));
  const earned =
    mode === "sequential" && !allPassed
      ? [...passedNow].filter((id) => id === activeId)
      : [...passedNow];
  const passed = [...new Set([...(previous?.checkpoints || []), ...earned])];
  return {
    ...previous,
    complete: Boolean(previous?.complete || allPassed),
    checkpoints: passed,
  };
}

/** Raw future checks are retained for the all-correct shortcut, never shown as failures. */
export function instructionView(
  checkpoints: Checkpoint[],
  progress: Progress,
  results: Record<string, boolean>,
  mode: CheckpointMode = "all-at-once",
  checkedStep?: string,
) {
  const sequential = mode === "sequential";
  const effective = sequential
    ? recordLessonRun(
        progress,
        checkpoints,
        Object.entries(results).map(([id, passed]) => ({ id, passed })),
        mode,
        checkedStep,
      )
    : progress;
  const activeId = nextCheckpoint(checkpoints, effective);
  const activeIndex = checkpoints.findIndex((c) => c.id === activeId);
  const reviewing =
    sequential && checkpoints.length > 0 && !activeId && !effective.complete;
  const reviewId = reviewing
    ? checkpoints.find((c) => results[c.id] === false)?.id
    : undefined;
  const steps = checkpoints.map((c, i) => {
    const passed = sequential
      ? !!effective.complete || (effective.checkpoints || []).includes(c.id)
      : (results[c.id] ?? (progress.checkpoints || []).includes(c.id));
    return {
      id: c.id,
      passed,
      locked: sequential && activeIndex >= 0 && i > activeIndex,
      active: sequential && c.id === activeId,
      failed:
        !passed &&
        results[c.id] === false &&
        (!sequential || c.id === checkedStep),
    };
  });
  return { steps, reviewing, reviewId };
}
