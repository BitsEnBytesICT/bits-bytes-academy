import test from "node:test";
import assert from "node:assert/strict";
import { compareLines } from "../frontend/src/solution-diff.ts";
import {
  codeLines,
  pythonTokens,
} from "../frontend/src/python-highlighting.ts";

test("Diff aligns unchanged lines after insertions, deletions and replacements", () => {
  const rows = compareLines("first\nold\nlast\n", "first\nnew\nextra\nlast\n");
  assert.deepEqual(rows, [
    { left: { number: 1, kind: "same" }, right: { number: 1, kind: "same" } },
    {
      left: { number: 2, kind: "removed" },
      right: { number: 2, kind: "added" },
    },
    { right: { number: 3, kind: "added" } },
    { left: { number: 3, kind: "same" }, right: { number: 4, kind: "same" } },
  ]);
  assert.equal(compareLines("", "new\n")[0].right?.kind, "added");
  assert.equal(compareLines("old\n", "")[0].left?.kind, "removed");
  assert.deepEqual(compareLines("", ""), []);
  assert.deepEqual(compareLines("x\r\n", "x\n"), [
    { left: { number: 1, kind: "same" }, right: { number: 1, kind: "same" } },
  ]);
  assert.equal(compareLines("x", "x\n")[0].left?.kind, "removed");
  assert.equal(compareLines("    x\n", "x\n")[0].left?.kind, "removed");
});

test("Python syntax classes preserve code, indentation and multiline string context", () => {
  const code =
    '# note\ndef total(items):\n    text = """first\nsecond"""\n    return len(items) + 42\n';
  const tokens = pythonTokens(code);
  assert.equal(tokens.map((token) => token.text).join(""), code);
  for (const kind of ["comment", "keyword", "function", "string", "number"]) {
    assert(
      tokens.some((token) => token.className === `py-${kind}`),
      kind,
    );
  }
  const lines = codeLines(code);
  assert.equal(lines.length, 5);
  assert(lines[3].some((token) => token.className === "py-string"));
  assert.equal(
    lines.map((line) => line.map((token) => token.text).join("")).join("\n") +
      "\n",
    code,
  );
  assert.equal(
    pythonTokens('print("<script>")')
      .map((token) => token.text)
      .join(""),
    'print("<script>")',
  );
  assert.deepEqual(codeLines(""), []);
  assert.equal(codeLines("a\n\nb\n", false).length, 3);
});
