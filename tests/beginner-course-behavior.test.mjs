import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
import { course } from "../content-src/beginner-course/index.mjs";
import {
  calculatorReference,
  pongReference,
} from "./fixtures/beginner-projects.mjs";
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const run = async (files, checks = [], input = []) => {
  const queue = [...input];
  py.setStdin({ stdin: () => queue.shift() });
  return execute(py, { files, checks });
};
for (const [input, expected] of [
  [
    ["+", "2", "3", "-", "7", "10", "quit"],
    ["Result: 5.0", "Result: -3.0", "Goodbye"],
  ],
  [
    ["*", "-2", "4", "/", "9", "2", "quit"],
    ["Result: -8.0", "Result: 4.5"],
  ],
  [
    ["?", "+", "bad", "-2.5", "0", "quit"],
    ["Unknown operation", "Try a number", "Result: -2.5"],
  ],
  [
    ["/", "5", "0", "*", "0", "9", "quit"],
    ["Cannot divide by zero", "Result: 0.0"],
  ],
  [["quit"], ["Goodbye"]],
  [["+", "quit"], ["Goodbye"]],
  [["+", "2", "quit"], ["Goodbye"]],
  [[], ["Goodbye"]],
  [
    ["+", ""],
    ["Try a number", "Goodbye"],
  ],
]) {
  const result = await run(calculatorReference, [], input);
  assert.equal(result.error, null);
  for (const text of expected) assert(result.stdout.includes(text), text);
}
const mistakes = [
  [
    "03-precedence",
    (a) => ({
      "main.py": a.solution["main.py"].replace(
        "(adults + children) * price",
        "adults + children * price",
      ),
    }),
    "wrong grouping",
  ],
  [
    "09-return-values",
    () => ({ "main.py": "def area(width,height):\n    print(width*height)\n" }),
    "print instead of return",
  ],
  [
    "10-cancel-safely",
    (a) => ({
      "main.py": a.solution["main.py"].replace(
        "return float(text)",
        "return None if float(text) == 0 else float(text)",
      ),
    }),
    "zero treated as cancel",
  ],
  [
    "12-search",
    () => ({
      "main.py":
        "def contains(items,target):\n    for item in items:\n        if item == target:\n            return True\n        return False\n    return False\n",
    }),
    "premature search failure",
  ],
  [
    "17-sorting",
    () => ({
      "main.py":
        "def ranked(scores):\n    scores.sort(reverse=True)\n    return scores\n",
    }),
    "mutating source",
  ],
  [
    "19-lookup",
    () => ({
      "main.py": 'def score_of(record):\n    return record.get("score") or 0\n',
    }),
    "discarded present None",
  ],
  [
    "22-club-book",
    (a) => ({
      ...a.solution,
      "work.py": a.solution["work.py"].replace(
        "totals.get(name,0) + score",
        "score",
      ),
    }),
    "lost repeated-player scores",
  ],
  ["23-shared-state", (a) => a.files, "shared mutable instances"],
];
for (const [suffix, make, label] of mistakes) {
  const a = course.activities.find((a) => a.id === "python-v4-" + suffix);
  const result = await run(make(a), a.checkpoints, a.inputs);
  assert(!result.results.every((c) => c.passed), label);
}
for (const [suffix, code] of [
  [
    "17-score-report",
    "def leaders(scores):\n    values = []\n    for score in scores:\n        if score >= 0:\n            values.append(score)\n    values.sort(reverse=True)\n    return values[:3]\n",
  ],
  [
    "19-registry",
    "def award(scores,name,points):\n    result = dict(scores)\n    if name not in result:\n        result[name] = 0\n    result[name] += points\n    return result\n",
  ],
  [
    "18-text-cleaner",
    'def clean_report(lines):\n    return "\\n".join(" ".join(line.split()).lower() for line in lines if line.strip())\n',
  ],
]) {
  const a = course.activities.find((a) => a.id === "python-v4-" + suffix);
  const result = await run({ "main.py": code }, a.checkpoints);
  assert(
    result.results.every((c) => c.passed),
    suffix + " valid alternative",
  );
}
const partial = course.activities.find((a) => a.id === "python-v4-03-addition");
const result = await run(
  { "main.py": "morning = 7\nafternoon = 5\nresult = morning + afternoon\n" },
  partial.checkpoints,
);
assert.equal(result.error, null);
assert.deepEqual(
  result.results.map((c) => c.passed),
  [true, false],
);
// Actual rules run with pygame-ce, without the browser scheduler.
const game = await run({
  "rules.py": pongReference["rules.py"],
  "main.py": `from rules import move_paddle, advance
assert move_paddle(0,True,False,1) == 0
assert move_paddle(340,False,True,1) == 340
assert move_paddle(100,True,True,0.1) == 100
assert advance(320,2,180,-90,170,170,0,0,0)[1:4] == (6,180,90)
assert advance(320,398,180,90,170,170,0,0,0)[1:4] == (394,180,-90)
assert advance(32,200,-180,0,170,170,0,0,0)[0:3:2] == (36,180)
assert advance(32,200,180,0,170,170,0,0,0)[2] == 180
assert advance(608,200,180,0,170,170,0,0,0)[0:3:2] == (604,-180)
assert advance(650,100,180,0,170,170,0,0,0) == (320,200,0,0,1,0)
assert advance(-8,100,-180,0,170,170,0,0,0) == (320,200,0,0,0,1)
assert advance(320,200,0,0,170,170,1,0,0.5)[4:] == (1,0)
print("rules passed")`,
});
assert.equal(game.error, null);
console.log(
  "Calculator conversations, plausible mistakes, valid alternatives, partial runnable work and Pong boundary rules passed.",
);
