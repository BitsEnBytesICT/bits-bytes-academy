import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";

const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
let emitted = "";
py.setStdout({
  write(bytes) {
    emitted += new TextDecoder().decode(bytes);
    return bytes.length;
  },
});
py.setStderr({ write: (bytes) => bytes.length });
const lesson = (group, n) =>
  course.activities.find(
    (a) => a.id === `${group}-${String(n).padStart(2, "0")}`,
  );
async function attempt(group, n, code, expected, label = "staged attempt") {
  const activity = lesson(group, n);
  const result = await execute(py, {
    files: { "main.py": code },
    checks: activity.checkpoints,
  });
  assert.equal(result.error, null, `${activity.id}: ${label}`);
  assert.deepEqual(
    result.results.map((r) => r.passed),
    expected,
    `${activity.id}: ${label}`,
  );
}
const flow = "python-control-flow",
  errors = "python-errors";
const stages = [
  [
    flow,
    2,
    'count_is_testable = True\nopinion_is_testable = "undecided"\nfour_is_odd = "undecided"\nprint(count_is_testable)\nprint(opinion_is_testable)\nprint(four_is_odd)\n',
    [true, false, false],
  ],
  [
    flow,
    2,
    'count_is_testable = True\nopinion_is_testable = False\nfour_is_odd = "undecided"\nprint(count_is_testable)\nprint(opinion_is_testable)\nprint(four_is_odd)\n',
    [true, true, false],
  ],
  [
    flow,
    3,
    'expected = 12\nreceived = 9\nlabel_text = "12"\nmatches = expected == received\ndiffers = False\nlabel_matches_number = True\nprint(matches)\nprint(differs)\nprint(label_matches_number)\n',
    [true, false, false],
  ],
  [
    flow,
    3,
    'expected = 12\nreceived = 9\nlabel_text = "12"\nmatches = expected == received\ndiffers = expected != received\nlabel_matches_number = True\nprint(matches)\nprint(differs)\nprint(label_matches_number)\n',
    [true, true, false],
  ],
  [
    flow,
    4,
    'status_text = "True"\nenabled = "True"\nremaining = 2\nprint(type(status_text))\nprint(enabled)\n',
    [true, false, false],
  ],
  [
    flow,
    4,
    'status_text = "True"\nenabled = True\nremaining = 2\nprint(type(status_text))\nprint(type(enabled))\n',
    [true, true, false],
  ],
  [
    flow,
    5,
    'mode = "test"\nif mode == "test":\n    print("Test run")\n',
    [true, false, false],
  ],
  [
    flow,
    5,
    'mode = "test"\nif mode == "test":\n    print("Test run")\nif mode == "live":\n    print("Live run")\n',
    [true, true, false],
  ],
  [
    flow,
    6,
    "load = 80\nlimit = 80\nwithin_limit = load <= limit\nbelow_limit = True\nprint(within_limit)\nprint(below_limit)\n",
    [true, false, false],
  ],
  [
    flow,
    6,
    "load = 80\nlimit = 80\nwithin_limit = load <= limit\nbelow_limit = load < limit\nprint(within_limit)\nprint(below_limit)\n",
    [true, true, false],
  ],
  [
    flow,
    7,
    'charged = True\nlid_closed = False\ncan_start = charged and lid_closed\nprint(can_start)\nif charged:\n    print("Dispatch started")\n',
    [true, false],
  ],
  [
    flow,
    8,
    'hours = 45\nwarning = True\nmaintenance_needed = hours > 100 or warning\nprint(maintenance_needed)\nif hours > 100:\n    print("Maintenance needed")\n',
    [true, false],
  ],
  [
    flow,
    9,
    "occupied = False\nreserved = True\navailable = not occupied\nprint(available)\n",
    [true, false, false],
  ],
  [
    flow,
    9,
    'occupied = False\nreserved = True\navailable = not occupied\nprint(available)\nif not occupied:\n    print("Bay is empty")\n',
    [true, true, false],
  ],
  [
    flow,
    10,
    'seats = 0\nif seats > 0:\n    print("Seats available")\nelse:\n    print("Full")\n',
    [true, false],
  ],
  [
    flow,
    11,
    'wind = 18\nif wind < 10:\n    category = "calm"\nelif wind < 25:\n    category = "breezy"\nelse:\n    category = "unclassified"\nprint(category)\n',
    [true, false, false],
  ],
  [
    flow,
    11,
    'wind = 18\nif wind < 10:\n    category = "calm"\nelif wind < 25:\n    category = "breezy"\nelif wind < 40:\n    category = "strong"\nelse:\n    category = "storm"\nprint(category)\n',
    [true, true, false],
  ],
  [
    errors,
    2,
    'distance = 8\nprint("Route planner")\nif distance < 3:\n    mode = "Walk"\nelif distance < 12:\n    mode = "Cycle"\nelse:\n    mode = "Transit"\nprint(mode)\n',
    [true, true, true, false],
  ],
  [
    errors,
    3,
    'answer_one = "blue"\nanswer_two = "circle"\nscore = 0\nif answer_one == "blue":\n    score += 1\nif answer_two == "circle":\n    score += 1\nprint("Score: " + str(score))\n',
    [true, true, false],
  ],
  [
    errors,
    4,
    'quantity_text = "6"\nspares = 2\nunit_price = 3\nquantity = int(quantity_text) + spares\ntotal = quantity * unit_price\nprint("Packing estimate")\nprint("Total: " + str(total))\n',
    [true, true, false],
  ],
];
for (const args of stages) await attempt(...args);

// Different valid structures must still pass: descending ranges and f-strings.
await attempt(
  flow,
  11,
  'wind = 18\nif wind >= 40:\n    category = "storm"\nelif wind >= 25:\n    category = "strong"\nelif wind >= 10:\n    category = "breezy"\nelse:\n    category = "calm"\nprint(category)\nprint(f"Wind: {wind} | {category}")\n',
  [true, true, true],
  "equivalent descending thresholds",
);
await attempt(
  flow,
  7,
  'charged = True\nlid_closed = False\ncan_start = lid_closed and charged\nprint(can_start)\nif can_start == True:\n    print("Dispatch started")\n',
  [true, true],
  "equivalent operand order",
);

// These programs match the default output but implement the wrong rule.
const nearMisses = [
  [
    flow,
    3,
    (code) => code.replace("matches = expected == received", "matches = False"),
    0,
  ],
  [
    flow,
    3,
    (code) => code.replace("differs = expected != received", "differs = True"),
    1,
  ],
  [flow, 6, (code) => code.replace("load <= limit", "load == limit"), 0],
  [flow, 6, (code) => code.replace("load < limit", "load > limit"), 1],
  [
    flow,
    7,
    (code) =>
      code.replace(
        "can_start = charged and lid_closed",
        "can_start = False\nunused = charged and lid_closed",
      ),
    0,
  ],
  [
    flow,
    8,
    (code) => code.replace("hours > 100 or warning", "hours >= 100 or warning"),
    0,
  ],
  [
    flow,
    9,
    (code) =>
      code.replace(
        "not occupied and not reserved",
        "not occupied and reserved",
      ),
    2,
  ],
  [flow, 11, (code) => code.replace("wind < 10", "wind <= 10"), 0],
  [flow, 11, (code) => code.replace("wind < 40", "wind <= 40"), 1],
  [
    errors,
    3,
    (code) => code.replace('if answer_two == "circle":', "if True:"),
    1,
  ],
  [errors, 4, (code) => code.replace("int(quantity_text) + spares", "8"), 0],
];
for (const [group, n, change, index] of nearMisses) {
  const activity = lesson(group, n);
  const code = change(activity.solution["main.py"]);
  assert.notEqual(
    code,
    activity.solution["main.py"],
    `${activity.id}: mutation must apply`,
  );
  const result = await execute(py, {
    files: { "main.py": code },
    checks: activity.checkpoints,
  });
  assert.equal(result.error, null, activity.id);
  assert.equal(
    result.results[index].passed,
    false,
    `${activity.id}: detect wrong rule`,
  );
}

// Probe runs must not leak output or change the actual script namespace/files.
emitted = "";
const files = {
  "main.py": "quantity = 2\nquantity = quantity + 1\nprint(quantity)\n",
  "notes.txt": "keep me",
};
const checks = [
  {
    id: "boundary",
    check: "quantity == 3",
    cases: [
      { inputs: { quantity: 8 }, check: "quantity == 9 and _stdout == '9\\n'" },
    ],
  },
];
const result = await execute(py, { files, checks });
assert.equal(result.results[0].passed, true);
assert.equal(result.stdout, "3\n");
assert.equal(emitted, "3\n");
assert.deepEqual(result.files, files);
const inspection = await consoleLine(py, { files, line: "quantity" });
assert.equal(inspection.display, "3");
const missing = await execute(py, {
  files: { "main.py": "other = 3\n" },
  checks: [{ ...checks[0], check: "other == 3" }],
});
assert.equal(missing.error, null);
assert.equal(missing.results[0].passed, false);
// Probe failure is grading feedback, not a fabricated error in the visible run.
const probeError = await execute(py, {
  files: { "main.py": "quantity = 2\nanswer = 10 / quantity\n" },
  checks: [
    {
      id: "zero",
      check: "answer == 5",
      cases: [{ inputs: { quantity: 0 }, check: "True" }],
    },
  ],
});
assert.equal(probeError.error, null);
assert.equal(probeError.results[0].passed, false);
console.log(
  `Control flow passed: ${stages.length} partial attempts, ${nearMisses.length} incorrect rules, isolated boundary execution and console inspection.`,
);
