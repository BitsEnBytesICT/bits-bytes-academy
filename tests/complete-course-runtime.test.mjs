import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { loadPyodide } from "pyodide";
import {
  execute,
  initializeRuntime,
} from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";
import { course } from "../content-src/complete-course/index.mjs";
import { variantsFor } from "./complete-course-variants.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let lessonCount = 0,
  examples = 0,
  probes = 0,
  variants = 0,
  quizPrograms = 0;
async function run(activity, files, frames = 1) {
  const input = [...(activity.inputs || [])];
  py.setStdin({ stdin: () => input.shift() });
  if (activity.runtime !== "pygame")
    return execute(py, { files, checks: activity.checkpoints });
  await ensurePackages(py, files);
  initializeRuntime(py);
  py.globals.set("_fixture_files", JSON.stringify(files));
  py.runPython("_lab_prepare(json.loads(_fixture_files), fresh=True)");
  const grade = py.globals.get("_lab_game_grade");
  try {
    return {
      error: null,
      results: JSON.parse(
        grade(
          JSON.stringify({
            files,
            checks: activity.checkpoints,
            frames,
            error: null,
          }),
        ),
      ),
    };
  } finally {
    grade.destroy();
  }
}
for (const a of course.activities.filter((a) => a.kind === "coding")) {
  if (
    process.env.COURSE_MODULE &&
    a.chapter !== Number(process.env.COURSE_MODULE)
  )
    continue;
  for (const files of [a.files, a.solution])
    for (const [name, source] of Object.entries(files))
      if (name.endsWith(".py")) {
        py.globals.set("_compile_source", source);
        py.runPython('compile(_compile_source, "lesson.py", "exec")');
      }
  for (const s of a.sections || []) {
    if (!s.code || s.output === undefined) continue;
    py.setStdin({ stdin: () => undefined });
    const example = await execute(py, {
      files: { ...(s.exampleFiles || {}), "main.py": s.code },
      checks: [],
    });
    assert.equal(example.error, null, `${a.id} example: ${example.error}`);
    assert.equal(
      example.stdout.trimEnd(),
      s.output.trimEnd(),
      `${a.id} example output`,
    );
    examples++;
  }
  const result = await run(a, a.solution);
  assert.equal(result.error, null, `${a.id}: ${result.error}`);
  assert(
    result.results.every((c) => c.passed),
    `${a.id} reference: ${JSON.stringify(result.results)}`,
  );
  const starter = await run(a, a.files, 1);
  assert(
    !starter.results.every((c) => c.passed),
    `${a.id}: unfinished starter passed`,
  );
  for (const variant of variantsFor(a)) {
    const result = await run(a, { ...a.solution, ...variant.files });
    const passed = !result.error && result.results.every((c) => c.passed);
    assert.equal(
      passed,
      variant.passes,
      `${a.id}: ${variant.name}: ${JSON.stringify(result.results)}`,
    );
    if (!variant.passes)
      assert.equal(
        result.results[variant.failedCheckpoint]?.passed,
        false,
        `${a.id}: intended failure for ${variant.name}`,
      );
    variants++;
  }
  probes += a.checkpoints.reduce((n, c) => n + (c.probes?.length || 0), 0);
  lessonCount++;
  console.log(`PASS ${a.id} ${a.title.en}`);
}
for (const q of course.activities.filter((a) => a.kind === "quiz")) {
  if (
    process.env.COURSE_MODULE &&
    q.chapter !== Number(process.env.COURSE_MODULE)
  )
    continue;
  for (const question of [...q.questions, ...q.alternateQuestions]) {
    const blank = question.codeBlank;
    const code = blank
      ? blank.segments[0] + blank.blanks[0].answer + blank.segments[1]
      : question.expectedOutput !== undefined
        ? question.code
        : null;
    if (!code) continue;
    const result = await execute(py, {
      files: { "main.py": code },
      checks: [],
    });
    assert.equal(result.error, null, question.id);
    assert.equal(
      result.stdout.trimEnd(),
      (blank?.output ?? question.expectedOutput).trimEnd(),
      question.id,
    );
    quizPrograms++;
  }
}
const isolated = await execute(py, {
  files: {
    "main.py":
      'def overwrite():\n    with open("learner.txt", "w") as f: f.write("probe")\n',
    "learner.txt": "mine",
  },
  checks: [
    {
      id: "isolation",
      check: "True",
      probes: [
        {
          call: { name: "overwrite", args: [] },
          files: { "learner.txt": "fixture" },
          check: 'open("learner.txt").read() == "probe"',
        },
      ],
    },
  ],
});
assert.equal(isolated.results[0].passed, true);
assert.equal(
  isolated.files["learner.txt"],
  "mine",
  "Probe writes must not leak into learner files",
);
console.log(
  `${lessonCount} references/starters; ${examples} examples; ${probes} probes; ${variants} misconception/alternative cases; ${quizPrograms} quiz programs; file isolation passed. Browser rendering is verified separately.`,
);
