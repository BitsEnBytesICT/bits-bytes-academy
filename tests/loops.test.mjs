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
    (a) => a.id === `learn-python-loops-${String(n).padStart(2, "0")}`,
  );
let stages = 0;
async function attempt(n, code, expected, error = null) {
  const result = await execute(py, {
    files: { "main.py": code },
    checks: lesson(n).checkpoints,
  });
  assert.equal(result.error, error, `page ${n}: ${code}`);
  if (expected)
    assert.deepEqual(
      result.results.map((r) => r.passed),
      expected,
      `page ${n}: ${code}`,
    );
  return result;
}
const solutions = (n) => lesson(n).solution["main.py"];
const partials = [
  [
    2,
    lesson(2).files["main.py"] + 'print("Stop:", stations[3])\n',
    [true, false, false],
  ],
  [2, solutions(2).split('print("Count:')[0], [true, true, false]],
  [
    3,
    solutions(3)
      .replace("    visited.append(code)\n", "")
      .split('print("Checked:')[0],
    [true, false, false],
  ],
  [3, solutions(3).split('print("Checked:')[0], [true, true, false]],
  [
    4,
    solutions(4)
      .replace("    totals.append((index + 1) * samples_per_round)\n", "")
      .split('print("Samples:')[0],
    [true, false, false],
  ],
  [4, solutions(4).split('print("Samples:')[0], [true, true, false]],
  [
    5,
    solutions(5)
      .replace("    history.append(charge)\n", "")
      .split('print("Finished:')[0],
    [true, false, false],
  ],
  [5, solutions(5).split('print("Finished:')[0], [true, true, false]],
  [
    6,
    solutions(6)
      .replace("    total += values[index]\n    running.append(total)\n", "")
      .split('print("Running:')[0],
    [true, false, false],
  ],
  [6, solutions(6).split('print("Running:')[0], [true, true, false]],
  [
    8,
    solutions(8)
      .replace("    inspected.append(value)\n", "")
      .split('print("Inspected:')[0],
    [true, false, false],
  ],
  [8, solutions(8).split('print("Inspected:')[0], [true, true, false]],
  [
    9,
    solutions(9)
      .replace("        rejected += 1\n", "")
      .split('print("Accepted:')[0],
    [true, false, false],
  ],
  [9, solutions(9).split('print("Accepted:')[0], [true, true, false]],
  [
    10,
    solutions(10)
      .replace("        row_total += value\n        grand_total += value\n", "")
      .replace("    row_totals.append(row_total)\n", "")
      .split('print("Rows:')[0],
    [true, false, false],
  ],
  [10, solutions(10).split('print("Rows:')[0], [true, true, false]],
  [11, solutions(11).split("corrected =")[0], [true, false, false]],
  [11, solutions(11).split("doubled =")[0], [true, true, false]],
  [12, solutions(12).split("excess =")[0], [true, false, false]],
  [12, solutions(12).split("labels =")[0], [true, true, false]],
];
for (const [i, marker] of [
  "valid =",
  "corrected =",
  "total =",
  "first_alert =",
  "labels =",
].entries()) {
  partials.push([
    13,
    solutions(13).split(marker)[0],
    Array.from({ length: 6 }, (_, j) => j <= i),
  ]);
}
for (const [n, code, expected] of partials) {
  await attempt(n, code, expected);
  stages++;
}

// Plausible mistakes, including ones correct for the visible input but wrong
// at a supplied boundary. Deliberately nonterminating code is tested through
// the bounded browser worker, never synchronously in this test process.
const mistakes = [
  [
    2,
    "for station in stations:",
    'for station in ["Harbor", "Market", "Park", "Depot"]:',
    1,
  ],
  [3, "    visited.append(code)", "    visited = [code]", 1],
  [4, "range(rounds)", "range(rounds - 1)", 0],
  [4, "rounds * samples_per_round)", "totals[-1])", 2],
  [5, "while charge < target:", "while charge <= target:", 0],
  [
    5,
    "    charge += step\n    history.append(charge)",
    "    history.append(charge)\n    charge += step",
    1,
  ],
  [6, "    index += 1", "    index += 2", 0],
  [6, "    total += values[index]", "    total = values[index]", 1],
  [8, "value > limit", "value >= limit", 0],
  [8, "        break\n", "", 0],
  [8, "    inspected.append(value)", "    inspected = [value]", 1],
  [9, "        continue", "        break", 0],
  [9, "value < 0", "value <= 0", 0],
  [
    9,
    "        rejected += 1\n        continue",
    "        continue\n        rejected += 1",
    1,
  ],
  [10, "    row_total = 0", "    row_total = grand_total", 1],
  [10, "        grand_total += value", "        grand_total = value", 1],
  [
    10,
    "    row_totals.append(row_total)",
    "        row_totals.append(row_total)",
    1,
  ],
  [11, "value + offset for value in raw", "value + 2 for value in raw", 1],
  [11, "value * 2 for value in corrected", "value * 2 for value in raw", 2],
  [12, "value > limit]", "value >= limit]", 0],
  [12, "value - limit for value", "value for value", 1],
  [12, 'else "ok" for value in values', 'else "ok" for value in alerts', 2],
  [13, "readings.append(value)", "readings.append(batch)", 0],
  [13, "value < 0", "value <= 0", 1],
  [
    13,
    "value + offset for value in valid",
    "value + offset for value in readings",
    2,
  ],
  [13, "    total += value", "    total = value", 3],
  [13, "        break\n", "", 4],
  [
    13,
    'else "ok" for value in corrected',
    'else "ok" for value in corrected if value > limit',
    5,
  ],
];
for (const [n, from, to, failed] of mistakes) {
  assert(solutions(n).includes(from), `missing mutation ${n}: ${from}`);
  const result = await execute(py, {
    files: { "main.py": solutions(n).replace(from, to) },
    checks: lesson(n).checkpoints,
  });
  assert.equal(
    result.results[failed].passed,
    false,
    `accepted mistake ${n}: ${to}`,
  );
}
await attempt(
  3,
  lesson(3).files["main.py"],
  [false, false, false],
  "IndentationError",
);
await attempt(
  6,
  solutions(6).replace("index < len(values)", "index <= len(values)"),
  [false, false, false],
  "IndexError",
);

// Accept other readable implementations of the stated constructs.
await attempt(
  4,
  solutions(4)
    .replace("range(rounds)", "range(1, rounds + 1)")
    .replaceAll("index + 1", "index"),
  [true, true, true],
);
await attempt(
  5,
  solutions(5).replace("charge += step", "charge = charge + step"),
  [true, true, true],
);
await attempt(
  10,
  solutions(10)
    .replace(/\brow_total\b/g, "subtotal")
    .replaceAll("for row in batches", "for group in batches")
    .replace("for value in row", "for value in group"),
  [true, true, true],
);
await attempt(
  12,
  solutions(12).replace(
    "value - limit for value in values if value > limit",
    "value - limit for value in alerts",
  ),
  [true, true, true],
);

// Current release must retain all old MC meanings for existing quiz attempts.
const quiz = course.activities.find((a) => a.id === "learn-python-loops-quiz");
assert(
  quiz.questions.every((q) =>
    q.choices.slice(1).every((c) => c.reason.en && c.reason.nl),
  ),
);
assert.equal(quiz.questions.filter((q) => q.codeBlank).length, 1);
console.log(
  `Loops passed: ${stages} staged attempts, ${mistakes.length} mistakes, two diagnostic errors and four alternative solutions.`,
);
