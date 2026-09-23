import test from "node:test";
import assert from "node:assert/strict";
import { TerminalLine } from "../frontend/src/terminal-line.ts";

test("Command editing preserves Unicode and inserts/deletes at the cursor", () => {
  const line = new TerminalLine();
  line.insert("hé🐍");
  line.cursor = 2;
  line.insert("界");
  assert.equal(line.value, "hé界🐍");
  line.remove(false);
  assert.equal(line.value, "hé界");
  line.remove(true);
  assert.equal(line.value, "hé");
  line.cursor = 0;
  line.remove(true);
  assert.equal(line.value, "hé");
});

test("History restores unfinished drafts and multiline pastes stay intact", () => {
  const line = new TerminalLine();
  line.set("x = 4");
  line.remember();
  line.set("print(x)");
  line.remember();
  line.set("draft");
  line.recall(1);
  assert.equal(line.value, "print(x)");
  line.recall(1);
  assert.equal(line.value, "x = 4");
  line.recall(-1);
  line.recall(-1);
  assert.equal(line.value, "draft");
  line.set("");
  line.insert("def hello():\r\n    return 'hi'\r\n");
  assert.equal(line.value, "def hello():\n    return 'hi'\n");
  assert.equal(line.history.length, 2);
});
