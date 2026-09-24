// Audit-only: find dependencies between sequential checkpoints using runnable
// top-level prefixes of reference programs. Results need contract review.
import fs from "node:fs";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
py.runPython(`import ast, json
def audit_prefixes(source):
    tree = ast.parse(source)
    lines = source.splitlines()
    return json.dumps(["\\n".join(lines[:node.end_lineno]) + "\\n" for node in tree.body])
`);
const rows = [];
for (const a of course.activities.filter(
  (a) =>
    ["coding", "challenge"].includes(a.kind) &&
    a.runtime !== "pygame" &&
    a.checkpoints.length > 1,
)) {
  py.globals.set("_audit_source", a.solution["main.py"]);
  const prefixes = JSON.parse(py.runPython("audit_prefixes(_audit_source)"));
  const runs = [];
  for (const source of prefixes) {
    const queue = [...(a.inputs || [])];
    py.setStdin({ stdin: () => queue.shift() });
    const r = await execute(py, {
      files: { ...a.solution, "main.py": source },
      checks: a.checkpoints,
    });
    runs.push({
      code: source,
      passed: r.results.map((c) => c.passed),
      error: r.error,
    });
  }
  const firstPassing = a.checkpoints.map((_, i) =>
    runs.findIndex((r) => r.passed[i]),
  );
  rows.push({
    id: a.id,
    tasks: a.checkpoints.map((c) => c.task.en),
    firstPassing,
    runs,
  });
}
fs.writeFileSync(
  "docs/audits/python-v4/sequential-prefixes.json",
  JSON.stringify(rows, null, 2) + "\n",
);
console.log("Audited", rows.length, "multi-instruction activities");
for (const row of rows) {
  if (row.firstPassing.some((p, i) => i && p <= row.firstPassing[i - 1]))
    console.log(
      JSON.stringify({
        id: row.id,
        tasks: row.tasks,
        firstPassing: row.firstPassing,
      }),
    );
}
