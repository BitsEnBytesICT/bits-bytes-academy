import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const lesson = (n) =>
  course.activities.find(
    (a) => a.id === `use-python-list-${String(n).padStart(2, "0")}`,
  );
let stages = 0;
async function check(n, code, expected) {
  const result = await execute(py, {
    files: { "main.py": code },
    checks: lesson(n).checkpoints,
  });
  assert.equal(result.error, null, `lesson ${n}: ${code}`);
  assert.deepEqual(
    result.results.map((r) => r.passed),
    expected,
    `lesson ${n}: ${code}`,
  );
  stages++;
}
const boundaries = [
  [2, ["route.insert(2", "shifted ="]],
  [3, ["current =", 'print("Remaining:",']],
  [4, ["station_list =", "last_station ="]],
  [5, ["last_departure =", "countdown ="]],
  [6, ["tick_count =", "sparse_ticks =", "station_count ="]],
  [7, ["window[0] =", "empty_window ="]],
  [8, ['print("Ending:",', 'print("Earlier:",']],
  [9, ["statuses.append", "missing =", "pair_count ="]],
  [10, ["labels.sort()", "result ="]],
  [11, ["descending =", "top_two ="]],
  [
    12,
    [
      "preview =",
      "lamp_count =",
      "canceled =",
      "manifest.insert",
      "catalog =",
      "dispatch_ids =",
      "next_two =",
    ],
  ],
];
for (const [n, markers] of boundaries) {
  const a = lesson(n);
  for (const [i, marker] of markers.entries()) {
    const position = a.solution["main.py"].indexOf(marker);
    assert(position > 0, `missing stage boundary ${n}: ${marker}`);
    await check(
      n,
      a.solution["main.py"].slice(0, position),
      a.checkpoints.map((_, j) => j <= i),
    );
  }
}

const mistakes = [
  [
    4,
    "station_numbers = range(station_count)",
    "station_numbers = range(5)",
    0,
  ],
  [4, "station_list = list(station_numbers)", "station_list = [0,1,2,3,4]", 1],
  [4, "last_station = station_list[-1]", "last_station = 4", 2],
  [5, "last_departure = list(departures)[-1]", "last_departure = stop - 1", 1],
  [6, "tick_count = len(ticks)", "tick_count = 30 // tick_step", 1],
  [7, "window = readings[1:4]", "window = [18,9,14]", 0],
  [7, "window[0] = 99", "readings[1] = 99\nwindow[0] = 99", 1],
  [8, "last_two = events[-2:]", "last_two = events[4:]", 1],
  [8, "without_last_two = events[:-2]", "without_last_two = events[:4]", 2],
  [9, 'before = statuses.count("ok")', "before = 3", 0],
  [9, 'missing = statuses.count("offline")', "missing = 0", 2],
  [9, 'pair_count = batches.count(["ok", 2])', "pair_count = 2", 3],
  [10, "priorities.sort()", "priorities = sorted(priorities)", 0],
  [11, "ranked = sorted(arrival)", "arrival.sort()\nranked = arrival", 0],
  [
    12,
    "canceled = manifest.pop(canceled_index)",
    "canceled = manifest.pop(4)",
    3,
  ],
  [
    12,
    "dispatch_ids = list(range(100, 100 + len(manifest)))",
    "dispatch_ids = list(range(100,107))",
    6,
  ],
];
for (const [n, before, after, checkpoint] of mistakes) {
  const a = lesson(n);
  assert(a.solution["main.py"].includes(before));
  const code = a.solution["main.py"].replace(before, after);
  const result = await execute(py, {
    files: { "main.py": code },
    checks: a.checkpoints,
  });
  assert.equal(result.error, null, `${n}: mistake must run`);
  assert.equal(
    result.results[checkpoint].passed,
    false,
    `${n}: must reject ${after}`,
  );
}
await check(
  3,
  lesson(3).solution["main.py"].replace("jobs.pop()", "jobs.pop(-1)"),
  [true, true, true],
);
await check(
  11,
  lesson(11).solution["main.py"].replace(
    "ranked = sorted(arrival)",
    "ranked = arrival[:]\nranked.sort()",
  ),
  [true, true, true],
);
await check(
  12,
  lesson(12).solution["main.py"].replace(
    "manifest.insert(1, rush_item)",
    "position = 1\nmanifest.insert(position, rush_item)",
  ),
  Array(8).fill(true),
);
const err = await execute(py, {
  files: { "main.py": "jobs = []\njobs.pop()" },
  checks: [],
});
assert.match(err.error, /IndexError/);
console.log(
  `List operations passed: ${stages} staged/alternative attempts, ${mistakes.length} plausible mistakes, empty-pop error.`,
);
