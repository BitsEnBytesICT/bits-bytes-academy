import test from "node:test";
import assert from "node:assert/strict";
import { newFileError } from "../frontend/src/workspace-files.ts";

test("File creation gives actionable validation before altering the workspace", () => {
  const files = { "main.py": "# keep my work" };
  for (const name of [
    "shipping.py",
    "game_rules.py",
    "_helpers.py",
    "notes.txt",
    "match-data.json",
  ])
    assert.equal(newFileError(name, files), null, name);
  assert.equal(newFileError("main.py", files), "duplicate");
  for (const name of [
    "shipping-cost.py",
    "1game.py",
    "class.py",
    "game.rules.py",
  ])
    assert.equal(newFileError(name, files), "python-module", name);
  for (const name of [
    "../helper.py",
    "/helper.py",
    "folder/helper.py",
    "my helper.py",
    "x".repeat(101),
  ])
    assert.equal(newFileError(name, files), "invalid", name);
  assert.equal(newFileError("", files), "empty");
  assert.equal(
    newFileError(
      "extra.py",
      Object.fromEntries(
        Array.from({ length: 40 }, (_, i) => [`file${i}.py`, ""]),
      ),
    ),
    "limit",
  );
  assert.deepEqual(files, { "main.py": "# keep my work" });
});
