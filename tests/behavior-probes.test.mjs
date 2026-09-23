import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";
const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const check = (probes) => [{ id: "behavior", check: "True", probes }];
const probes = [
  {
    call: { name: "total", args: [[2, -4, 8]] },
    check: "_error is None and _return == 6",
  },
  {
    call: { name: "total", args: [[]] },
    check: "_error is None and _return == 0",
  },
  {
    call: { name: "total", args: [[0.1, 0.2]] },
    check: "_error is None and _close(_return, 0.3)",
  },
];
for (const source of [
  "def total(values):\n    return sum(values)\n",
  "def total(values):\n    result = 0\n    for value in values:\n        result += value\n    return result\n",
  "def total(values):\n    if not values: return 0\n    return values[0] + total(values[1:])\n",
]) {
  const result = await execute(py, {
    files: { "main.py": source },
    checks: check(probes),
  });
  assert.equal(result.results[0].passed, true, source);
}
assert.equal(
  (
    await execute(py, {
      files: { "main.py": "def total(values):\n    return 6\n" },
      checks: check(probes),
    })
  ).results[0].passed,
  false,
);

const interactive = `import sys
values = []
while True:
    line = sys.stdin.readline()
    if line == '' or line.strip() == 'q': break
    try:
        values.append(float(line))
    except ValueError:
        print('Try a number')
print(sum(values))
`;
py.setStdin({ stdin: () => undefined });
let result = await execute(py, {
  files: { "main.py": interactive },
  checks: check([
    {
      stdin: ["2.5", "", "日本語", "-1", "q"],
      check:
        '_error is None and values == [2.5, -1] and _stdout.rstrip().endswith("1.5")',
    },
    {
      stdin: [],
      check: '_error is None and values == [] and _stdout.strip() == "0"',
    },
  ]),
});
assert.equal(result.results[0].passed, true);
result = await execute(py, {
  files: {
    "main.py":
      'def greet():\n    name = input("Name: ")\n    return "Hello " + name\n',
  },
  checks: check([
    {
      call: { name: "greet" },
      stdin: ["Zoë"],
      check: '_return == "Hello Zoë" and _error is None',
    },
    {
      call: { name: "greet" },
      stdin: [""],
      check: '_return == "Hello " and _error is None',
    },
    { call: { name: "greet" }, stdin: [], check: '_error == "EOFError"' },
  ]),
});
assert.equal(result.results[0].passed, true);

const files = {
  "main.py": `import helper
calls = []
def change(value):
    calls.append(value)
    helper.values.append(value)
    with open('note.txt', 'w') as file: file.write(str(value))
    return len(calls), len(helper.values)
`,
  "helper.py": "values = []\n",
  "note.txt": "original",
};
result = await execute(py, {
  files,
  checks: check([
    { call: { name: "change", args: [12] }, check: "_return == (1, 1)" },
    { call: { name: "change", args: [99] }, check: "_return == (1, 1)" },
  ]),
});
assert.equal(result.results[0].passed, true);
assert.equal(result.files["note.txt"], "original");
assert.equal(
  (
    await consoleLine(py, {
      files: result.files,
      line: "(calls, helper.values)",
    })
  ).display,
  "([], [])",
);
result = await execute(py, {
  files: { "main.py": "def divide(a,b):\n    return a/b\n" },
  checks: check([
    {
      call: { name: "divide", kwargs: { b: 0, a: 5 } },
      check: '_error == "ZeroDivisionError"',
    },
    {
      call: { name: "divide", kwargs: { b: 2, a: 5 } },
      check: "_error is None and _return == 2.5",
    },
  ]),
});
assert.equal(result.results[0].passed, true);
result = await execute(py, {
  files: {
    "main.py":
      "fail_setup = False\nif fail_setup: raise ValueError('setup failed')\ndef operation():\n    return 12\n",
  },
  checks: check([
    {
      inputs: { fail_setup: true },
      call: { name: "operation" },
      check: '_error == "ValueError"',
    },
  ]),
});
assert.equal(
  result.results[0].passed,
  false,
  "A setup error cannot satisfy the function's exception contract",
);
let setupInput = ["start", "answer"];
py.setStdin({ stdin: () => setupInput.shift() });
result = await execute(py, {
  files: {
    "main.py":
      "print('Starting')\ninitial = input('Setup: ')\ndef ask():\n    value = input('Question: ')\n    print(value)\n    return value\n",
  },
  checks: check([
    {
      stdin: ["start", "Zoë"],
      call: { name: "ask" },
      check:
        '_error is None and _return == "Zoë" and _call_stdout == "Question: Zoë\\n" and _call_stderr == "" and _call_input_chars == 4 and "Starting" in _stdout',
    },
  ]),
});
assert.equal(
  result.results[0].passed,
  true,
  "Call output and consumed input exclude setup activity",
);
console.log(
  "Behavior probes: alternative algorithms, sample hardcoding, float tolerance, repeated/blank/Unicode input, EOF, exception contracts, keyword calls, and file/module/console isolation passed.",
);
