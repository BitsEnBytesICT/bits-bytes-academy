import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";
import { execute, consoleLine } from "../frontend/public/runtime/engine.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let loads = 0;
const load = py.loadPackage;
py.loadPackage = async (...args) => {
  loads++;
  return load(...args);
};
await ensurePackages(py, {
  "main.py": '# import pygame\nmessage = "import pygame"\n',
});
assert.equal(loads, 0, "Comments and strings do not trigger package loading");
await ensurePackages(py, { "main.py": "import pygame\nthis is broken :\n" });
assert.equal(loads, 0, "Syntax errors are left to the normal runner");
const files = { "main.py": "" };
await consoleLine(py, { files, line: "def make_box():" });
await consoleLine(py, { files, line: "    from pygame import Rect" });
await consoleLine(py, { files, line: "    return Rect(1, 2, 3, 4)" });
await consoleLine(py, { files, line: "" });
const consoleResult = await consoleLine(py, {
  files,
  line: "tuple(make_box())",
});
assert.equal(consoleResult.error, null);
assert.equal(consoleResult.display, "(1, 2, 3, 4)");
assert.equal(
  loads,
  1,
  "An import in a multiline console function loads the package once",
);
const result = await execute(py, {
  files: {
    "main.py": "import helper\nbox = helper.make()\nprint(box.center)\n",
    "helper.py":
      "import math, pygame as pg\ndef make():\n    return pg.Rect(10,20,12,80)\n",
  },
  checks: [{ id: "rect", check: "box.center == (16, 60)" }],
});
assert.equal(result.error, null);
assert.equal(result.results[0].passed, true);
assert.equal(loads, 1, "Additional imports reuse the loaded package");
const drawing = await execute(py, {
  files: {
    "main.py":
      "import pygame\nsurface = pygame.Surface((100, 100))\nsurface.fill((0, 0, 0))\npygame.draw.rect(surface, (255, 128, 0), pygame.Rect(10, 20, 5, 9))\n",
  },
  checks: [
    {
      id: "real-pixels",
      check:
        "tuple(surface.get_at((11, 21))) == (255, 128, 0, 255) and tuple(surface.get_at((1, 1))) == (0, 0, 0, 255)",
    },
  ],
});
assert.equal(drawing.error, null);
assert.equal(
  drawing.results[0].passed,
  true,
  "Real pygame draws expected pixels on an offscreen Surface",
);
console.log(
  "Bundled packages: comments, invalid code, nested console imports, helper-file aliases, real Rect behavior, and one-time loading passed.",
);
