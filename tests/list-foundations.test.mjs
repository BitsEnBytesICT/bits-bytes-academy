import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";
const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const activity = (n) =>
  course.activities.find(
    (a) => a.id === `create-python-list-${String(n).padStart(2, "0")}`,
  );
let stages = 0;
async function check(n, code, expected) {
  const result = await execute(py, {
    files: { "main.py": code },
    checks: activity(n).checkpoints,
  });
  assert.equal(result.error, null, `lesson ${n}`);
  assert.deepEqual(
    result.results.map((r) => r.passed),
    expected,
    `lesson ${n}: ${code}`,
  );
  stages++;
}
await check(1, "masses = [4, 7, 4, 8]\nprint(masses)\n", [true, false]);
await check(2, 'sensor = ["Sensor", 4, 2.5, "True"]\nprint(sensor)\n', [
  true,
  false,
  false,
]);
await check(2, 'sensor = ["Sensor", 4, 2.5, True]\nprint(sensor)\n', [
  true,
  true,
  false,
]);
await check(
  3,
  'requests = []\nis_empty = False\nprint(requests)\nprint("Empty:", is_empty)\n',
  [true, false],
);
await check(
  5,
  'packing = ["map", "water"]\nprint("Before:", packing)\npacking.append("torch")\nprint("After:", packing)\n',
  [true, false],
);
await check(
  6,
  'morning = [9,11]\nafternoon = [14,16]\nschedule = morning + afternoon\nprint("Schedule:",schedule)\nprint("Morning:",morning)\nprint("Afternoon:",afternoon)\n',
  [true, false],
);
await check(
  7,
  'stops = ["Oak", "Bridge", "Lake", "Hill"]\nfirst = stops[0]\nthird = "not selected"\nprint(first)\nprint(third)\n',
  [true, false, false],
);
await check(
  7,
  'stops = ["Oak", "Bridge", "Lake", "Hill"]\nfirst = stops[0]\nthird = stops[2]\nprint(first)\nprint(third)\n',
  [true, true, false],
);
await check(
  8,
  "readings = [18,20,19,22]\nlatest = readings[-1]\nprevious = readings[-2]\nprint(latest,previous)\n",
  [true, false, false],
);
await check(
  8,
  "readings = [18,20,19,22]\nlatest = readings[-1]\nprevious = readings[-2]\nprint(latest,previous)\nreadings.append(24)\nnew_latest = readings[-1]\nprint(new_latest)\n",
  [true, true, false],
);
await check(
  9,
  'gear = ["map","broken compass","water","worn strap"]\nreplaced = gear[1]\ngear[1] = "compass"\nprint("Removed:",replaced)\nprint("Ready:",gear)\n',
  [true, false, false],
);
await check(
  10,
  'queue = ["lamp","canceled","tripod","canceled","case"]\nprint("Before:",queue)\nqueue.remove("canceled")\nprint("After one cancellation:",queue)\n',
  [true, false, false],
);
await check(
  10,
  'queue = ["lamp","canceled","tripod","canceled","case"]\nprint("Before:",queue)\nqueue.remove("canceled")\nprint("After one cancellation:",queue)\nqueue.remove("case")\n',
  [true, true, false],
);
await check(
  11,
  'stock = [["lamp",3]]\nstock.append(["cable",8])\nprint("Main room:",stock)\n',
  [true, false],
);
await check(
  12,
  'stock = [["lamp",3],["cable",8],["battery",4]]\ncable_count = stock[1][1]\nlast_count = 0\nprint("Cables:",cable_count)\nprint("Last row quantity:",last_count)\n',
  [true, false, false],
);
await check(
  12,
  'stock = [["lamp",3],["cable",8],["battery",4]]\ncable_count = stock[1][1]\nlast_count = stock[-1][-1]\nprint("Cables:",cable_count)\nprint("Last row quantity:",last_count)\n',
  [true, true, false],
);
await check(
  13,
  'stock = [["lamp",3],["cable",8],["battery",4]]\nlamp_row = stock[0]\nstock[0][1] += 2\nprint("Lamp row:",lamp_row)\nprint("Stock:",stock)\n',
  [true, false, false],
);

// The cumulative review logs historical states before later edits, so its early
// checkpoints remain meaningful and achievable as the same table evolves.
const reviewStart =
  'stock = [["lamp",3,True],["cable",8,False]]\nremote_stock = [["tripod",2,True]]\nprint("Received:",stock)\n';
const reviewDisplay =
  'print("Main room:",stock)\nprint("Remote room:",remote_stock)\n';
let changes = "";
await check(14, reviewStart + reviewDisplay, [
  true,
  false,
  false,
  false,
  false,
  false,
]);
for (const [code, expected] of [
  [
    'stock.append(["battery",4,True])\nprint("Delivery:",stock)\n',
    [true, true, false, false, false, false],
  ],
  ["stock[0][1] += 3\n", [true, true, true, false, false, false]],
  ["stock[1][2] = True\n", [true, true, true, true, false, false]],
  ['stock.remove(["battery",4,True])\n', [true, true, true, true, true, false]],
]) {
  changes += code;
  await check(14, reviewStart + changes + reviewDisplay, expected);
}
await check(
  14,
  reviewStart +
    changes +
    reviewDisplay +
    'combined = stock + remote_stock\nlast_label = combined[-1][0]\nprint("Combined:",combined)\nprint("Last item:",last_label)\n',
  [true, true, true, true, true, true],
);
await check(
  13,
  activity(13).solution["main.py"].replace(
    "stock[0][1] = stock[0][1] + 2",
    "stock[0][1] += 2",
  ),
  [true, true, true],
);
await check(
  14,
  activity(14).solution["main.py"].replace(
    'stock.append(["battery", 4, True])',
    'delivery = ["battery", 4, True]\nstock.append(delivery)',
  ),
  [true, true, true, true, true, true],
);

const mutations = [
  [3, (c) => c.replace("is_empty = requests == []", "is_empty = True"), 1],
  [
    6,
    (c) =>
      c.replace("schedule = morning + afternoon", "schedule = [9,11,14,16]"),
    0,
  ],
  [7, (c) => c.replace("first = stops[0]", 'first = "Oak"'), 0],
  [
    8,
    (c) =>
      c
        .replace("latest = readings[-1]", "latest = readings[3]")
        .replace("previous = readings[-2]", "previous = readings[2]"),
    0,
  ],
  [9, (c) => c.replace('gear[-1] = "new strap"', 'gear[3] = "new strap"'), 1],
  [10, (c) => c.replace('queue.remove("case")', "queue.pop(3)"), 1],
  [
    12,
    (c) => c.replace("last_count = stock[-1][-1]", "last_count = stock[2][1]"),
    1,
  ],
  [
    13,
    (c) => c.replace("stock[0][1] = stock[0][1] + 2", 'stock[0] = ["lamp", 5]'),
    0,
  ],
  [14, (c) => c.replace("stock[0][1] = stock[0][1] + 3", "stock[0][1] = 6"), 2],
];
for (const [n, change, index] of mutations) {
  const original = activity(n).solution["main.py"],
    code = change(original);
  assert.notEqual(code, original, `mutation ${n}`);
  const result = await execute(py, {
    files: { "main.py": code },
    checks: activity(n).checkpoints,
  });
  assert.equal(
    result.error,
    null,
    `default input must still run for mutation ${n}`,
  );
  assert.equal(result.results[index].passed, false, `detect mutation ${n}`);
}
// Separate probe data supports nested mutable arrays, Unicode, null and strings
// resembling code without modifying the original console namespace or files.
const files = {
  "main.py":
    'rows = [["original", 2]]\nrow = rows[0]\nrows[0][1] += 1\nprint(rows)\n',
  "notes.txt": "untouched",
};
const payload = {
  files,
  checks: [
    {
      id: "nested",
      check: "rows == [['original',3]]",
      cases: [
        {
          inputs: {
            rows: [
              ["é\"; print('not code')", 8],
              [null, true],
            ],
          },
          check:
            "rows[0][1] == 9 and rows[1] == [None,True] and row is rows[0]",
        },
        { inputs: { rows: [["other", 4]] }, check: "rows == [['other',5]]" },
      ],
    },
  ],
};
const saved = JSON.stringify(payload);
const result = await execute(py, payload);
assert.equal(result.results[0].passed, true);
assert.equal(result.stdout, "[['original', 3]]\n");
assert.deepEqual(result.files, files);
assert.equal(JSON.stringify(payload), saved);
assert.equal(
  (await consoleLine(py, { files, line: "rows" })).display,
  "[['original', 3]]",
);
console.log(
  `List foundations passed: ${stages} staged attempts, ${mutations.length} incorrect transformations, mutable probe isolation and Unicode literals.`,
);
