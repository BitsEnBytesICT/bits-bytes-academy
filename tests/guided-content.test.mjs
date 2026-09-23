import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";

const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const revised = course.activities.filter((a) => a.sections);
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (bytes) => bytes.length });
py.setStderr({ write: (bytes) => bytes.length });
let examples = 0;
for (const activity of revised) {
  for (const section of activity.sections) {
    for (const language of ["en", "nl"]) {
      assert(
        section.heading[language]?.trim(),
        `${activity.id}: section heading ${language}`,
      );
      assert(
        section.body[language]?.trim(),
        `${activity.id}: section body ${language}`,
      );
    }
    if (section.code === undefined || section.output === undefined) continue;
    const result = await execute(py, {
      files: { "main.py": section.code },
      checks: [],
    });
    assert.equal(
      result.error,
      null,
      `${activity.id}: example must run independently`,
    );
    assert.equal(
      result.stdout.replace(/\n$/, ""),
      section.output,
      `${activity.id}: example output`,
    );
    examples++;
  }
  if (!activity.checkpoints.length) continue;
  const untouched = await execute(py, {
    files: activity.files,
    checks: activity.checkpoints,
  });
  assert(
    untouched.results.some((check) => !check.passed),
    `${activity.id}: starter cannot finish activity`,
  );
  assert(
    activity.checkpoints.every((c) => c.feedback?.en && c.feedback?.nl),
    `${activity.id}: actionable feedback`,
  );
}

// Genuine intermediate states: completing one instruction must not require the
// final answer to later instructions. The two-repair debugging task is separate.
const attempts = [
  [
    2,
    '# Current forecast\nprint("Sunny")\nprint("Rain yesterday")\n',
    [true, false],
  ],
  [3, 'print("Departure board")\n', [true, false]],
  [4, 'print("Harbor")\n', [true, false, false]],
  [4, "print(\"Harbor\")\nprint('Harbor')\n", [true, true, false]],
  [5, 'destination = "Delft"\nprint(destination)\n', [true, false]],
  [
    7,
    "passenger_count = 24\ndistance = 0.0\nprint(passenger_count)\nprint(distance)\n",
    [true, false],
  ],
  [
    8,
    "duration = 3 * 15 + 5\nprint(duration)\nduration_seconds = 0\nprint(duration_seconds)\n",
    [true, false],
  ],
  [
    9,
    "kits = 3\nprice = 8\noriginal_total = kits * price\nprint(original_total)\n",
    [true, false, false],
  ],
  [
    9,
    "kits = 3\nprice = 8\noriginal_total = kits * price\nprint(original_total)\nkits = kits + 1\n",
    [true, true, false],
  ],
  [
    10,
    "capacity = 2 ** 10\nprint(capacity)\npanel_area = 6 * 2\nprint(panel_area)\n",
    [true, false],
  ],
  [11, "leftover = 29 % 6\nprint(leftover)\n", [true, false, false, false]],
  [
    11,
    "leftover = 29 % 6\nprint(leftover)\nitems_added = 6 - leftover\nprint(items_added)\n",
    [true, true, false, false],
  ],
  [
    11,
    "leftover = 29 % 6\nprint(leftover)\nitems_added = 6 - leftover\nprint(items_added)\nnew_leftover = (29 + items_added) % 6\nprint(new_leftover)\n",
    [true, true, true, false],
  ],
  [
    12,
    'origin = "North"\ndestination = "Pier"\nplatform = 4\nroute = origin + " → " + destination\nprint(route)\n',
    [true, false],
  ],
  [
    13,
    'energy = 12\nstatus = "Charge"\nenergy += 8\nprint(energy)\n',
    [true, false, false],
  ],
  [
    13,
    'energy = 12\nstatus = "Charge"\nenergy += 8\nprint(energy)\nenergy += 5\nprint(energy)\n',
    [true, true, false],
  ],
  [14, 'bulletin = """Welcome aboard\nNext stop: Delft"""\n', [true, false]],
  [
    15,
    'label = "Sensor kit"\nunits = 6\nunit_price = 4.5\n',
    [true, false, false, false],
  ],
  [
    15,
    'label = "Sensor kit"\nunits = 6\nunit_price = 4.5\ntotal = units * unit_price\n',
    [true, true, false, false],
  ],
  [
    15,
    'label = "Sensor kit"\nunits = 6\nunit_price = 4.5\ntotal = units * unit_price\nsummary = label + " | Total: " + str(total)\n',
    [true, true, true, false],
  ],
];
for (const [number, code, expected] of attempts) {
  const activity = course.activities.find(
    (a) => a.id === `python-hello-world-${String(number).padStart(2, "0")}`,
  );
  const result = await execute(py, {
    files: { "main.py": code },
    checks: activity.checkpoints,
  });
  assert.equal(result.error, null, activity.id);
  assert.deepEqual(
    result.results.map((r) => r.passed),
    expected,
    `${activity.id}: partial attempt`,
  );
}
const comments = course.activities.find(
  (a) => a.id === "python-hello-world-02",
);
const hashInString = await execute(py, {
  files: { "main.py": 'note = "# not a comment"\nprint("Sunny")\n' },
  checks: comments.checkpoints,
});
assert.deepEqual(
  hashInString.results.map((r) => r.passed),
  [false, false],
);
const power = course.activities.find((a) => a.id === "python-hello-world-10");
const hardcoded = await execute(py, {
  files: {
    "main.py":
      "capacity = 1024\npanel_area = 36\nprint(capacity)\nprint(panel_area)\n",
  },
  checks: power.checkpoints,
});
assert.deepEqual(
  hardcoded.results.map((r) => r.passed),
  [false, false],
);
console.log(
  `Guided content passed: ${revised.length} lessons, ${examples} executable examples, ${attempts.length} partial attempts, near-miss grading checks.`,
);
