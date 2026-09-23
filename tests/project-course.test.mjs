import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const directory = path.resolve("content-src/project-course");
let lessons = 0,
  tasks = 0,
  quizzes = 0;
const all = [];
for (const filename of fs
  .readdirSync(directory)
  .filter((f) => /^\d.*\.mjs$/.test(f))
  .sort()) {
  const { activities } = await import(
    new URL("../content-src/project-course/" + filename, import.meta.url)
  );
  all.push(...activities);
  assert.equal(
    activities.filter((a) => a.kind === "coding").length,
    5,
    filename,
  );
  assert.equal(activities.filter((a) => a.kind === "quiz").length, 1, filename);
  for (const a of activities) {
    assert(a.title.en && a.title.nl, a.id);
    if (a.kind === "quiz") {
      quizzes++;
      assert.equal(a.questions.length, 5, a.id);
      for (const q of a.questions) {
        assert(q.choices.some((c) => c.id === q.answer));
        assert(
          q.choices.every(
            (c) => c.label.en && c.label.nl && c.reason.en && c.reason.nl,
          ),
        );
        if (q.codeBlank) {
          const b = q.codeBlank;
          assert.equal(b.segments.length, b.blanks.length + 1);
          const source = b.segments
            .map((s, i) => s + (b.blanks[i]?.answer || ""))
            .join("");
          const output = await execute(py, {
            files: { "main.py": source },
            checks: [],
          });
          assert.equal(output.error, null, q.id);
          assert.equal(output.stdout, b.output, q.id);
        }
      }
      continue;
    }
    if (a.kind !== "coding") continue;
    assert(a.explanation.en && a.explanation.nl, a.id);
    assert(a.sections.length, a.id);
    assert(a.checkpoints.length >= 3 && a.checkpoints.length <= 5, a.id);
    assert(
      a.checkpoints.every(
        (c) => c.hints.length === 3 && c.feedback.en && c.feedback.nl,
      ),
      a.id,
    );
    let input = [...a.inputs];
    py.setStdin({ stdin: () => input.shift() });
    const reference = await execute(py, {
      files: a.solution,
      checks: a.checkpoints,
    });
    assert.equal(reference.error, null, a.id);
    assert(
      reference.results.every((c) => c.passed),
      JSON.stringify({ id: a.id, results: reference.results }),
    );
    const blank = await execute(py, {
      files: { ...a.files, "main.py": "pass\n" },
      checks: a.checkpoints,
    });
    assert(
      blank.results.every((c) => !c.passed),
      a.id,
    );
    lessons++;
    tasks += a.checkpoints.length;
  }
}
const supply = all.find((a) => a.id === "python-v2-1-05");
const source = (body) =>
  `visitors = 23\npack_size = 5\npack_price = 7.5\n${body}\nspare = packs * pack_size - visitors\ncost = packs * pack_price\nprint(packs, spare, cost)\n`;
for (const body of [
  "import math\npacks = math.ceil(visitors / pack_size)",
  "packs = visitors // pack_size\nif visitors % pack_size: packs += 1",
  "packs = 0\nwhile packs * pack_size < visitors:\n    packs += 1",
]) {
  const result = await execute(py, {
    files: { "main.py": source(body) },
    checks: supply.checkpoints,
  });
  assert(
    result.results.every((c) => c.passed),
    body,
  );
}
for (const body of [
  "packs = visitors // pack_size",
  "packs = visitors // pack_size + 1",
  "packs = 5",
]) {
  const result = await execute(py, {
    files: { "main.py": source(body) },
    checks: supply.checkpoints,
  });
  assert.equal(result.results[0].passed, false, body);
}
console.log(
  JSON.stringify({
    newLessons: lessons,
    tasks,
    quizzes,
    supplyAlternatives: 3,
    supplyBoundaryMistakesRejected: 3,
  }),
);
