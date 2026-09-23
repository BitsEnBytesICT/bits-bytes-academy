import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";
import { localFilesLesson as lesson } from "../content-src/project-course/local-files-lesson.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
for (const [imports, expression] of [
  ["import shipping", "shipping.delivery_cost(parcel_weight)"],
  ["from shipping import delivery_cost", "delivery_cost(parcel_weight)"],
  ["import shipping as prices", "prices.delivery_cost(parcel_weight)"],
  ["from shipping import delivery_cost as price", "price(parcel_weight)"],
]) {
  const files = {
    ...lesson.solution,
    "main.py": `${imports}\nparcel_weight = 3\nquote = ${expression}\nprint(f'{quote:.3f}')\n`,
  };
  const result = await execute(py, { files, checks: lesson.checkpoints });
  assert.equal(result.error, null);
  assert(
    result.results.every((r) => r.passed),
    imports,
  );
  assert.deepEqual(
    result.files,
    files,
    "Probe modules never replace the saved helper",
  );
}
let files = { ...lesson.solution };
let result = await execute(py, { files, checks: lesson.checkpoints });
assert(result.results.every((r) => r.passed));
files["shipping.py"] =
  "def delivery_cost(weight):\n    return 10 + weight * 2\n";
result = await execute(py, { files, checks: [] });
assert.equal(
  result.stdout.trim(),
  "16",
  "Run loads the edited helper instead of a cached function",
);
assert.equal(
  (await consoleLine(py, { files, line: "shipping.delivery_cost(1)" })).display,
  "12",
);
delete files["shipping.py"];
result = await execute(py, { files, checks: [] });
assert.equal(
  result.error,
  "ModuleNotFoundError",
  "A removed file is not retained in sys.modules",
);
files = {
  ...lesson.solution,
  "shipping.py": "def wrong_name(weight):\n    return weight\n",
};
result = await execute(py, { files, checks: lesson.checkpoints });
assert.equal(result.error, "AttributeError");
assert(result.results.every((r) => !r.passed));
result = await execute(py, {
  files: { ...lesson.solution },
  checks: lesson.checkpoints,
});
assert.equal(result.error, null);
assert(
  result.results.every((r) => r.passed),
  "Repairing the module recovers without restarting the app",
);
result = await execute(py, {
  files: {
    ...lesson.solution,
    "main.py":
      "import shipping\nparcel_weight = 3\nquote = 3 + parcel_weight * 1.5\nprint(quote)\n",
  },
  checks: lesson.checkpoints,
});
assert.equal(
  result.results[1].passed,
  false,
  "Importing but duplicating the helper calculation does not prove reuse",
);
console.log(
  "Multiple files: four import styles, flexible numeric formatting, edited module reload, console inspection, missing-file and missing-function errors, recovery, and actual imported-function reuse passed.",
);
