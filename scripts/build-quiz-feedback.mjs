import fs from "node:fs";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { course } from "../content-src/beginner-course/index.mjs";
import { execute } from "../frontend/public/runtime/engine.mjs";
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
py.runPython(
  `import sys\ndef _feedback_trace(frame,event,arg):\n    if event == 'line' and frame.f_code.co_filename == 'main.py':\n        _feedback_budget[0] -= 1\n        if _feedback_budget[0] <= 0: raise RuntimeError('Trace limit')\n    return _feedback_trace\n`,
);
const feedback = {};
for (const a of course.activities.filter((a) => a.kind === "quiz"))
  for (const q of [...a.questions, ...a.alternateQuestions]) {
    if (!q.codeBlank) continue;
    const b = q.codeBlank;
    for (const token of b.tokens) {
      if (token.code === b.blanks[0].answer) continue;
      const key = JSON.stringify([b.segments, token.code]);
      if (feedback[key]) continue;
      py.runPython("_feedback_budget = [1000]\nsys.settrace(_feedback_trace)");
      const result = await execute(py, {
        files: { "main.py": b.segments.join(token.code) },
        checks: [],
      });
      py.runPython("sys.settrace(None)");
      if (!result.error && result.stdout === b.output)
        throw Error(`Ambiguous token ${q.id}: ${token.code}`);
      const actual = JSON.stringify(result.stdout.slice(0, 160)),
        expected = JSON.stringify(b.output);
      feedback[key] = result.error
        ? {
            en: `Using ${token.code} here produces ${result.error}${result.error === "RuntimeError" ? " or exceeds the short execution limit" : ""}. ${b.blanks[0].reason.en}`,
            nl: `Met ${token.code} ontstaat hier ${result.error}${result.error === "RuntimeError" ? " of wordt de korte uitvoeringslimiet overschreden" : ""}. ${b.blanks[0].reason.nl}`,
          }
        : {
            en: `Using ${token.code} prints ${actual}; the required output is ${expected}. ${b.blanks[0].reason.en}`,
            nl: `Met ${token.code} wordt ${actual} afgedrukt; de vereiste uitvoer is ${expected}. ${b.blanks[0].reason.nl}`,
          };
    }
  }
fs.writeFileSync(
  "content-src/beginner-course/quiz-feedback.json",
  JSON.stringify(feedback, null, 2) + "\n",
);
console.log(
  `${Object.keys(feedback).length} unique incorrect completion snippets executed and explained.`,
);
