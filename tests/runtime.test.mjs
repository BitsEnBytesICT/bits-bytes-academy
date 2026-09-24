import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
const course = JSON.parse(fs.readFileSync("content/legacy/course-v1.json", "utf8"));
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (buf) => buf.length });
py.setStderr({ write: (buf) => buf.length });
let passed = 0,
  negative = 0,
  predictions = 0;
const failures = [];
for (const a of course.activities.filter((a) => a.kind !== "quiz")) {
  let inputs = [...(a.inputs || [])];
  py.setStdin({ stdin: () => inputs.shift() ?? "Alex" });
  try {
    const result = await execute(py, {
      files: { ...a.files, ...a.solution },
      checks: a.checkpoints,
    });
    if (result.error || result.results.some((r) => !r.passed)) {
      failures.push({
        id: a.id,
        error: result.error,
        failed: result.results.filter((r) => !r.passed),
      });
      continue;
    }
    passed++;
    if (a.checkpoints.length) {
      const bad = await execute(py, {
        files: { ...a.files, "main.py": "pass\n" },
        checks: a.checkpoints,
      });
      assert(
        bad.results.some((r) => !r.passed),
        `Blank solution should fail ${a.id}`,
      );
      negative++;
    }
  } catch (error) {
    failures.push({ id: a.id, error: String(error) });
  }
}
const syntax = await execute(py, {
  files: { "main.py": 'print("broken)\n' },
  checks: [{ id: "expected-error", expectedError: "SyntaxError" }],
});
assert.equal(syntax.results[0].passed, true);
const alternate = await execute(py, {
  files: { "main.py": "destination = 'Delft'\nprint(destination)" },
  checks: [
    {
      id: "alternate",
      check: "destination == 'Delft' and _stdout.strip() == 'Delft'",
    },
  ],
});
assert.equal(alternate.results[0].passed, true);
for (const quiz of course.activities.filter((a) => a.kind === "quiz")) {
  for (const question of quiz.questions) {
    if (question.codeBlank) {
      const b = question.codeBlank;
      const code = b.segments
        .map((s, i) => s + (b.blanks[i]?.answer || ""))
        .join("");
      const result = await execute(py, {
        files: { "main.py": code },
        checks: [],
      });
      assert.equal(result.error, null, question.id);
      assert.equal(result.stdout, b.output, question.id);
    }
    if (question.prompt.en !== "What does this code print?" || !question.code)
      continue;
    const actual = await execute(py, {
      files: { "main.py": question.code },
      checks: [],
    });
    const expected = question.choices.find(
      (choice) => choice.id === question.answer,
    ).label.en;
    assert.equal(actual.error, null, question.id);
    assert.equal(actual.stdout.trim(), expected.trim(), question.id);
    predictions++;
  }
}
console.log(
  JSON.stringify(
    {
      referenceSolutionsPassed: passed,
      negativeCasesPassed: negative,
      quizPredictionsPassed: predictions,
      expectedException: "passed",
      alternativeSyntax: "passed",
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
