import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { loadPyodide } from "pyodide";
import {
  execute,
  initializeRuntime,
} from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";
import { localDevelopment } from "../content-src/beginner-course/local-development.mjs";
const files = fs
  .readdirSync("content-src/beginner-course")
  .filter((n) => /^\d\d-/.test(n) && n.endsWith(".mjs"));
const activities = [
  ...(
    await Promise.all(
      files.map((n) => import(`../content-src/beginner-course/${n}`)),
    )
  ).flatMap((m) => m.activities),
  localDevelopment,
];
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let examples = 0,
  solutions = 0,
  probes = 0;
const errors = [];
for (const a of activities) {
  if (
    process.env.COURSE_MODULE &&
    !process.env.COURSE_MODULE.split(",").includes(String(a.chapter))
  )
    continue;
  try {
    for (const s of a.sections || []) {
      if (!s.code || s.output === undefined || s.codeLanguage === "shell")
        continue;
      const input = [...(s.exampleInputs || [])];
      py.setStdin({ stdin: () => input.shift() });
      const r = await execute(py, {
        files: { ...(s.exampleFiles || {}), "main.py": s.code },
        checks: [],
      });
      assert.equal(r.error, null, `${a.id} example error ${r.error}`);
      assert.equal(
        r.stdout.trimEnd(),
        s.output.trimEnd(),
        `${a.id} example output`,
      );
      examples++;
    }
    if (!a.checkpoints.length) continue;
    for (const [label, workspace] of [
      ["solution", a.solution],
      ["starter", a.files],
    ]) {
      const input = [...(a.inputs || [])];
      py.setStdin({ stdin: () => input.shift() });
      let r;
      if (a.runtime === "pygame") {
        await ensurePackages(py, workspace);
        initializeRuntime(py);
        py.globals.set("_fixture_files", JSON.stringify(workspace));
        py.runPython("_lab_prepare(json.loads(_fixture_files), fresh=True)");
        const grade = py.globals.get("_lab_game_grade");
        try {
          r = {
            error: null,
            results: JSON.parse(
              grade(
                JSON.stringify({
                  files: workspace,
                  checks: a.checkpoints,
                  frames: 1,
                  error: null,
                }),
              ),
            ),
          };
        } finally {
          grade.destroy();
        }
      } else r = await execute(py, { files: workspace, checks: a.checkpoints });
      if (label === "solution") {
        assert.equal(r.error, null, `${a.id} solution error`);
        assert(
          r.results.every((c) => c.passed),
          `${a.id} solution checks ${JSON.stringify(r.results)}`,
        );
        solutions++;
      } else {
        assert(
          !r.results.every((c) => c.passed),
          `${a.id} unfinished starter passed`,
        );
        if (a.expectedStarterError)
          assert.equal(
            r.error,
            a.expectedStarterError,
            `${a.id} intended starter error`,
          );
        else
          assert.equal(r.error, null, `${a.id} starter must remain runnable`);
      }
    }
    probes += a.checkpoints.reduce((n, c) => n + (c.probes?.length || 0), 0);
    console.log(`PASS ${a.id}`);
  } catch (e) {
    errors.push(e.message);
    console.error(`FAIL ${e.message}`);
  }
}
console.log(
  JSON.stringify({ examples, solutions, probes, failures: errors.length }),
);
assert.deepEqual(errors, []);
