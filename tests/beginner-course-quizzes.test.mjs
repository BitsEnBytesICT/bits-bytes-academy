import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
import { course } from "../content-src/beginner-course/index.mjs";
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let total = 0,
  programs = 0;
for (const a of course.activities.filter((a) => a.kind === "quiz"))
  for (const questions of [a.questions, a.alternateQuestions])
    for (const q of questions) {
      total++;
      let code, expected;
      if (q.category === "prediction") {
        code = q.code;
        expected = q.expectedOutput;
      }
      if (q.codeBlank) {
        code = q.codeBlank.segments.join(q.codeBlank.blanks[0].answer);
        expected = q.codeBlank.output;
      }
      if (code) {
        const result = await execute(py, {
          files: { "main.py": code },
          checks: [],
        });
        assert.equal(result.error, null, `${q.id}: ${result.error}`);
        assert.equal(
          result.stdout,
          expected,
          `${q.id}: incorrect documented answer`,
        );
        programs++;
      }
    }
assert.equal(total, 276);
assert.equal(programs, 184);
console.log(
  `${total} quiz items / ${programs} prediction and completion programs verified in real Python.`,
);
