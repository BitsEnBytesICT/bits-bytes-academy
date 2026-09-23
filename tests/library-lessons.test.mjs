import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
import { activities } from "../content-src/project-course/07-using-tools.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let rejected = 0,
  alternatives = 0;
async function variant(number, filename, before, after, step) {
  const activity = activities[number - 1];
  const files = { ...activity.solution };
  assert(files[filename].includes(before));
  files[filename] = files[filename].replace(before, after);
  let input = [...activity.inputs];
  py.setStdin({ stdin: () => input.shift() });
  const result = await execute(py, { files, checks: activity.checkpoints });
  if (step) {
    assert.equal(
      result.results[step - 1].passed,
      false,
      `${activity.id}: ${after}`,
    );
    rejected++;
  } else {
    assert.equal(result.error, null, activity.id);
    assert(
      result.results.every((r) => r.passed),
      `${activity.id}: ${JSON.stringify(result.results)}`,
    );
    alternatives++;
  }
}
await variant(
  1,
  "main.py",
  "not math.isfinite(value) or value <= 0",
  "value <= 0",
  2,
);
await variant(
  1,
  "main.py",
  "except ValueError:\n        return None",
  "except ValueError:\n        raise",
  1,
);
await variant(
  1,
  "main.py",
  "import math",
  "import math as standard_math\nmath = standard_math",
);
await variant(
  2,
  "main.py",
  "vy = random.choice([-1, 1]) * speed / 2",
  "vy = vx / 2",
  2,
);
await variant(
  2,
  "main.py",
  "vx = random.choice([-1, 1]) * speed",
  "random.seed(7)\n    vx = random.choice([-1, 1]) * speed",
  2,
);
await variant(
  2,
  "main.py",
  "vy = random.choice([-1, 1]) * speed / 2",
  "vy = 0",
  1,
);
await variant(
  2,
  "main.py",
  "vx = random.choice([-1, 1]) * speed\n    vy = random.choice([-1, 1]) * speed / 2",
  "vx = (2 * random.randint(0, 1) - 1) * speed\n    vy = (2 * random.randint(0, 1) - 1) * speed / 2",
);
await variant(3, "main.py", "paddle.center =", "paddle.topleft =", 2);
await variant(
  3,
  "main.py",
  "preview = paddle.move(0, shift_y)",
  "preview = paddle.move_ip(0, shift_y)",
  3,
);
await variant(
  3,
  "main.py",
  "preview = paddle.move(0, shift_y)",
  "preview = paddle.copy()\npreview.y += shift_y",
);
await variant(
  5,
  "layout.py",
  "paddle.right = width - 24",
  "paddle.left = width - 24",
  2,
);
await variant(
  5,
  "layout.py",
  "import pygame",
  'import pygame\nprint("layout imported")',
  3,
);
await variant(
  5,
  "layout.py",
  '    paddle = pygame.Rect(0, 0, 12, 72)\n    paddle.centery = height // 2\n    if side == "left":\n        paddle.left = 24\n    else:\n        paddle.right = width - 24\n    return paddle',
  '    x = 24 if side == "left" else width - 36\n    y = height // 2 - 36\n    return pygame.Rect(x, y, 12, 72)',
);
console.log(
  JSON.stringify({
    libraries: { mistakesRejected: rejected, validAlternatives: alternatives },
  }),
);
