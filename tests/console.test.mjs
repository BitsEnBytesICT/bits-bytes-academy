import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (buffer) => buffer.length });
py.setStderr({ write: (buffer) => buffer.length });
let files = { "main.py": "seed = 9\n" };
async function line(source) {
  const result = await consoleLine(py, { files, line: source });
  files = result.files;
  return result;
}
assert.equal((await line("number = 7")).display, null);
assert.equal((await line("number * 3")).display, "21");
assert.equal((await line('"hello"')).display, "'hello'");
assert.equal((await line("[1, 2, 3]")).display, "[1, 2, 3]");
assert.equal((await line("def double(value):")).syntax, "incomplete");
assert.equal((await line("    return value * 2")).syntax, "incomplete");
assert.equal((await line("")).syntax, "complete");
assert.equal((await line("double(6)")).display, "12");
assert.equal((await line("if :")).error, "SyntaxError");
assert.equal((await line("1 / 0")).error, "ZeroDivisionError");
assert.equal((await line("double(4)")).display, "8");
assert.equal(
  (await line("number")).results,
  undefined,
  "Console evaluation must not grade",
);
await line('open("notes.txt", "w", encoding="utf-8").write("hello")');
assert.equal(files["notes.txt"], "hello");
assert.equal((await line('open("notes.txt").read()')).display, "'hello'");
const graded = await execute(py, {
  files,
  checks: [{ id: "seed", check: "seed == 9" }],
});
assert.equal(graded.results[0].passed, true);
assert.equal(
  (await line("seed")).display,
  "9",
  "Inspect a variable produced by a script",
);
assert.equal(
  (await line("number")).error,
  "NameError",
  "Graded runs start with a fresh namespace",
);
let inputs = ["Alex", "héllo", "", undefined];
py.setStdin({ stdin: () => inputs.shift() });
assert.equal((await line('name = input("Name: ")')).error, null);
assert.equal((await line("name")).display, "'Alex'");
await line("import sys");
assert.equal((await line("sys.stdin.readline()")).display, "'héllo\\n'");
assert.equal((await line("input()")).display, "''");
assert.equal((await line("sys.stdin.readline()")).display, "''");
assert.equal((await line("input()")).error, "EOFError");
assert.equal((await line("2 + 2")).display, "4");
console.log(
  "Console passed: persistent variables, expression representations, multiline functions, errors/recovery, file synchronization, script isolation, input/readline, Unicode, empty lines, EOF, and no grading.",
);
