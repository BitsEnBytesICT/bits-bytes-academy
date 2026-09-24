import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import {
  execute,
  initializeRuntime,
} from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";
import { course } from "../content-src/beginner-course/index.mjs";
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const mutants = [
  [
    "10-converter-session",
    "value is None",
    "not value",
    "zero must not cancel",
  ],
  [
    "10-converter-session",
    'print("Unknown operation")',
    'print("Bye")',
    "unknown operations recover",
  ],
  [
    "15-event-wiring",
    "event.type == pygame.KEYDOWN and event.key",
    "event.key",
    "non-key events are safe",
  ],
  [
    "15-render-label",
    "canvas.blit(label,(12,12))",
    "# omitted blit",
    "rendering alone does not display text",
  ],
  ["16-two-controls", "if down:", "elif down:", "both players move together"],
  [
    "16-mirror-collision",
    "vx > 0",
    "vx < 0",
    "outgoing collision does not bounce again",
  ],
  [
    "16-rally-session",
    "return 320, 0, left + 1, right",
    "return x, vx, left + 1, right",
    "a miss leaves the scoring state",
  ],
  [
    "18-both-format-forms",
    'named = "{who}: {points}".format(who=name, points=score)',
    "named = positional",
    "both forms require learner syntax",
  ],
  [
    "19-build-record",
    "record.update(details)",
    "# ignored details",
    "incoming fields are applied",
  ],
  [
    "19-keys-and-values",
    "list(record.values())",
    "list(record.keys())",
    "values are not labels",
  ],
];
for (const [id, before, after, reason] of mutants) {
  const a = course.activities.find((a) => a.id === "python-v4-" + id),
    files = { ...a.solution };
  const file = files["game.py"] ? "game.py" : "main.py";
  assert(files[file].includes(before), `Stale mutation ${id}`);
  files[file] = files[file].replace(before, after);
  py.setStdin({ stdin: () => undefined });
  let results;
  if (a.runtime === "pygame") {
    await ensurePackages(py, files);
    initializeRuntime(py);
    py.globals.set("_integration_files", JSON.stringify(files));
    py.runPython("_lab_prepare(json.loads(_integration_files), fresh=True)");
    const grade = py.globals.get("_lab_game_grade");
    try {
      results = JSON.parse(
        grade(
          JSON.stringify({
            files,
            checks: a.checkpoints,
            frames: 1,
            error: null,
          }),
        ),
      );
    } finally {
      grade.destroy();
    }
  } else
    results = (await execute(py, { files, checks: a.checkpoints })).results;
  assert(
    results.some((r) => !r.passed),
    `${id}: ${reason}`,
  );
}
// Supplied call panels must work with the reference, without contaminating
// function-only checks. Interactive functions consume a fresh conversation.
for (const a of course.activities.filter(
  (a) => ["coding", "challenge"].includes(a.kind) && a.runtime === "terminal",
)) {
  for (const panel of a.sections.filter(
    (s) => s.role === "practice" && s.code,
  )) {
    const calls = a.checkpoints
      .flatMap((c) => c.probes || [])
      .filter((p) => p.call && !p.call.module && /^[a-z]/.test(p.call.name));
    const unique = [
      ...new Map(calls.map((p) => [JSON.stringify(p.call), p])).values(),
    ].slice(0, 2);
    const input = unique.flatMap((p) => p.stdin || []);
    py.setStdin({ stdin: () => input.shift() });
    const files = {
      ...a.solution,
      "main.py": a.solution["main.py"] + "\n" + panel.code + "\n",
    };
    const result = await execute(py, { files, checks: a.checkpoints });
    assert.equal(result.error, null, `${a.id} visible caller`);
    assert(
      result.results.every((r) => r.passed),
      `${a.id} visible caller must not break checks`,
    );
  }
}
for (const q of course.activities.filter((a) => a.kind === "quiz"))
  for (const question of [...q.questions, ...q.alternateQuestions])
    if (question.codeBlank)
      for (const token of question.codeBlank.tokens)
        if (token.code !== question.codeBlank.blanks[0].answer)
          assert(
            token.reason?.en && token.reason?.nl,
            `${question.id}: missing targeted token feedback`,
          );
assert.equal(
  course.activities.at(-1).retrievals,
  undefined,
  "Local setup stays focused",
);
assert(
  course.activities.some((a) => a.id.endsWith("review-library") && a.optional),
);
console.log(
  "10 integration mistakes rejected; visible callers, bilingual token feedback and focused final article verified.",
);
