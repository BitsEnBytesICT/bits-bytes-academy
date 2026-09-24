import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";

const course = JSON.parse(fs.readFileSync("content/legacy/course-v1.json", "utf8"));
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

// Follow the reading's experiments, including deliberate errors and recovery.
// These pages are ungraded; verifying only their prose examples misses the
// program learners actually receive and extend in the editor.
const tuples = course.activities.find((a) => a.id === "reading-tuples");
const zipped = course.activities.find((a) => a.id === "reading-zip");
const readingExperiments = [
  [
    tuples.files["main.py"],
    "Departure: ('Harbor', 3, '09:40')\nStation: Harbor\n",
    null,
  ],
  [tuples.solution["main.py"], "One stop: ('Harbor',)\n", null],
  [
    tuples.solution["main.py"] + "departure[1] = 8\n",
    "Original: ('Harbor', 3, '09:40')\n",
    "TypeError",
  ],
  [
    tuples.solution["main.py"] + "delays.index(99)\n",
    "Four-minute delays: 2\n",
    "ValueError",
  ],
  [tuples.solution["main.py"] + "print(delays.count(99))\n", "\n0\n", null],
  [
    tuples.solution["main.py"].replace(
      "single_stop = (station,)",
      "single_stop = (station)",
    ),
    "One stop: Harbor\n",
    null,
  ],
  [
    zipped.files["main.py"],
    "Display: [('Harbor', 18), ('Market', 7)]\nStations: 3 Rows: 2\n",
    null,
  ],
  [
    zipped.solution["main.py"],
    "Second read: []\nSaved again: [('Harbor', 18), ('Market', 7), ('Park', 12)]\n",
    null,
  ],
  [
    zipped.files["main.py"].replace("passengers = [18, 7]", "passengers = []"),
    "Display: []\nStations: 3 Rows: 0\n",
    null,
  ],
  [
    zipped.solution["main.py"].replace(
      "platforms = [2, 4, 1]",
      "platforms = [2]",
    ),
    "With platforms: [('Harbor', 18, 2)]\nLast station: Harbor\n",
    null,
  ],
  [
    zipped.solution["main.py"].replace(
      "zip(stations, passengers, platforms)",
      "zip(stations, platforms, passengers)",
    ),
    "With platforms: [('Harbor', 2, 18), ('Market', 4, 7), ('Park', 1, 12)]\n",
    null,
  ],
];
for (const [code, output, error] of readingExperiments) {
  const result = await execute(py, { files: { "main.py": code }, checks: [] });
  assert(
    result.stdout.includes(output),
    `reading experiment output: ${result.stdout}`,
  );
  if (error) assert(result.error?.includes(error), result.error);
  else assert.equal(result.error, null);
}
console.log(
  `List readings passed: ${readingExperiments.length} starter, extension, error and recovery experiments.`,
);
