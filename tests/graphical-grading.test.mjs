import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { harness } from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const main =
  'raise RuntimeError("The assessment must not start the interactive entry point")\n';
const helpers = [
  "import pygame\ndef scene(width, height):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((0, 0, 0))\n    pygame.draw.rect(canvas, (255, 128, 0), pygame.Rect(10, 20, 5, 9))\n    return canvas\n",
  "from pygame import Surface\ndef scene(width, height):\n    canvas = Surface((width, height))\n    canvas.fill((0, 0, 0))\n    canvas.fill((255, 128, 0), (10, 20, 5, 9))\n    return canvas\n",
];
await ensurePackages(py, { "scene.py": helpers[0] });
py.runPython(harness);
const checks = [
  {
    id: "scene",
    check: "_rendered_frames > 0",
    probes: [
      {
        moduleOnly: true,
        call: { module: "scene", name: "scene", args: [100, 100] },
        check:
          "_error is None and _return.get_size() == (100, 100) and tuple(_return.get_at((11, 21))) == (255, 128, 0, 255) and tuple(_return.get_at((0, 0))) == (0, 0, 0, 255)",
      },
    ],
  },
];
function grade(files, frames, error = null, givenChecks = checks) {
  py.globals.set("_fixture_files", JSON.stringify(files));
  py.runPython("_lab_prepare(json.loads(_fixture_files), fresh=True)");
  const fn = py.globals.get("_lab_game_grade");
  try {
    return JSON.parse(
      fn(JSON.stringify({ files, checks: givenChecks, frames, error })),
    );
  } finally {
    fn.destroy();
  }
}
for (const helper of helpers) {
  const files = { "main.py": main, "scene.py": helper };
  assert.equal(
    grade(files, 1)[0].passed,
    true,
    "Real drawing alternatives satisfy the pixel contract",
  );
  assert.equal(
    grade(files, 0)[0].passed,
    false,
    "No rendering means no successful preview",
  );
  assert.equal(
    grade(files, 1, "NameError")[0].passed,
    false,
    "A preview error prevents completion",
  );
  assert.equal(
    grade(
      {
        ...files,
        "scene.py": helper.replaceAll("(255, 128, 0)", "(0, 0, 255)"),
      },
      1,
    )[0].passed,
    false,
    "Incorrect drawing is rejected",
  );
  const normalProbe = [
    { ...checks[0], probes: [{ ...checks[0].probes[0], moduleOnly: false }] },
  ];
  assert.equal(
    grade(files, 1, null, normalProbe)[0].passed,
    false,
    "Ordinary probes still execute their script setup",
  );
}
console.log(
  "Graphical assessment: real Surface pixels, alternate drawing methods, module-only isolation, and preview/error gates passed. Browser execution is tested separately.",
);
