import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { initializeRuntime } from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";
import { course } from "../content-src/project-course/index.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
await ensurePackages(py, { "main.py": "import pygame" });
initializeRuntime(py);
function grade(activity, files, frames = 1) {
  py.globals.set("_fixture_files", JSON.stringify(files));
  py.runPython("_lab_prepare(json.loads(_fixture_files), fresh=True)");
  const fn = py.globals.get("_lab_game_grade");
  try {
    return JSON.parse(
      fn(
        JSON.stringify({
          files,
          checks: activity.checkpoints,
          frames,
          error: null,
        }),
      ),
    );
  } finally {
    fn.destroy();
  }
}
const graphical = course.activities.filter(
  (a) => a.kind === "coding" && a.runtime === "pygame",
);
assert.equal(graphical.length, 15);
for (const a of graphical) {
  assert(
    grade(a, a.solution).every((r) => r.passed),
    a.id + " reference",
  );
  assert(
    grade(a, a.files).some((r) => !r.passed),
    a.id + " unfinished starter must not complete",
  );
  assert(
    grade(a, a.solution, 0).every((r) => !r.passed),
    a.id + " needs a rendered frame",
  );
}
const alternatives = [
  [
    "python-v2-8-01",
    "scene.py",
    "import pygame\ndef make_scene(width,height):\n    image = pygame.Surface(size=(width,height))\n    image.fill(pygame.Color(16,23,39))\n    return image\n",
  ],
  [
    "python-v2-9-02",
    "motion.py",
    "def axis(negative,positive):\n    return int(positive)-int(negative)\n",
  ],
  [
    "python-v2-9-03",
    "motion.py",
    "def move_paddle(y,direction,speed,dt,court_height,paddle_height):\n    candidate=y+speed*dt*direction\n    if candidate < 0: candidate=0\n    if candidate > court_height-paddle_height: candidate=court_height-paddle_height\n    return candidate\n",
  ],
  [
    "python-v2-10-01",
    "rules.py",
    "def overlaps(ball,paddle):\n    x,y,w,h=ball\n    px,py,pw,ph=paddle\n    return x < px+pw and x+w > px and y < py+ph and y+h > py\n",
  ],
  [
    "python-v2-10-03",
    "rules.py",
    'def scorer(x,radius,width):\n    return "right" if x <= -radius else "left" if x >= width+radius else None\n',
  ],
];
for (const [id, file, source] of alternatives) {
  const a = graphical.find((a) => a.id === id);
  assert(
    grade(a, { ...a.solution, [file]: source }).every((r) => r.passed),
    id + " alternative",
  );
}
const mistakes = [
  [
    "python-v2-8-02",
    "scene.py",
    "right.right = width - 24",
    "right.left = width - 24",
  ],
  ["python-v2-8-04", "scene.py", "    canvas.fill((16, 23, 39))\n", ""],
  ["python-v2-8-05", "scene.py", "    if paused:", "    if True:"],
  ["python-v2-9-01", "motion.py", "x + vx * dt", "round(x + vx * dt)"],
  [
    "python-v2-9-02",
    "motion.py",
    "negative == positive",
    "not negative and not positive",
  ],
  [
    "python-v2-9-03",
    "motion.py",
    "court_height - paddle_height",
    "court_height",
  ],
  ["python-v2-9-04", "motion.py", "        if vy < 0:", "        if vy != 0:"],
  ["python-v2-9-05", "motion.py", "result = state.copy()", "result = state"],
  ["python-v2-10-02", "rules.py", "p.left - b.width", "p.left"],
  ["python-v2-10-03", "rules.py", "x + radius <= 0", "x <= 0"],
  [
    "python-v2-10-04",
    "rules.py",
    'if result["winner"] is not None:',
    "if False:",
  ],
  [
    "python-v2-10-05",
    "rules.py",
    'result["x"], result["y"] = width / 2, height / 2',
    'result["x"], result["y"] = state["x"], state["y"]',
  ],
];
for (const [id, file, from, to] of mistakes) {
  const a = graphical.find((a) => a.id === id);
  assert(a.solution[file].includes(from), id + " mutation target");
  const files = { ...a.solution, [file]: a.solution[file].replace(from, to) };
  assert(
    grade(a, files).some((r) => !r.passed),
    id + " mistake",
  );
}
console.log(
  JSON.stringify({
    graphicalReferences: 15,
    unfinishedStartersRejected: 15,
    missingPreviewRejected: 15,
    alternatives: alternatives.length,
    mistakesRejected: mistakes.length,
  }),
);
