import type { Checkpoint, Progress } from "../../shared/types";

export function recordLessonRun(
  previous: Progress | undefined,
  checkpoints: Checkpoint[],
  results: { id: string; passed: boolean }[],
): Progress {
  const valid = new Set(checkpoints.map((check) => check.id));
  const passed = [
    ...new Set([
      ...(previous?.checkpoints || []),
      ...results
        .filter((result) => result.passed && valid.has(result.id))
        .map((result) => result.id),
    ]),
  ];
  return {
    ...previous,
    complete: Boolean(
      previous?.complete ||
      (checkpoints.length > 0 &&
        checkpoints.every((check) => passed.includes(check.id))),
    ),
    checkpoints: passed,
  };
}
