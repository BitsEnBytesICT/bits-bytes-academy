import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
import { activities } from "../content-src/project-course/06-game-state.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
let rejected = 0,
  alternatives = 0;
async function check(number, replace, expected, step, label) {
  const activity = activities[number - 1];
  const source =
    typeof replace === "string"
      ? replace
      : replace(activity.solution["main.py"]);
  const result = await execute(py, {
    files: { "main.py": source },
    checks: activity.checkpoints,
  });
  if (expected) {
    assert.equal(result.error, null, label);
    assert(
      result.results.every((r) => r.passed),
      `${label}: ${JSON.stringify(result.results)}`,
    );
    alternatives++;
  } else {
    assert.equal(result.results[step - 1].passed, false, label);
    rejected++;
  }
}
await check(
  1,
  (s) => s.replace("scores.append(new_score)", "scores = [new_score]"),
  false,
  1,
  "New round erases history",
);
await check(
  1,
  (s) =>
    s.replace("scores.append(new_score)", "scores = scores.append(new_score)"),
  false,
  1,
  "Append return replaces the list",
);
await check(
  1,
  (s) =>
    s
      .replace("scores.append(new_score)", "scores = scores + [new_score]")
      .replace(
        "total = sum(scores)",
        "total = 0\nfor score in scores:\n    total += score",
      ),
  true,
  null,
  "Concatenation and explicit accumulation",
);
await check(
  2,
  (s) =>
    s.replace(
      "return (x + dx, y + dy)",
      "position[0] += dx\n    position[1] += dy\n    return tuple(position)",
    ),
  false,
  3,
  "Translation mutates its caller",
);
await check(
  2,
  (s) => s.replace("return (x + dx, y + dy)", "return (x + dy, y + dx)"),
  false,
  1,
  "Coordinate axes swapped",
);
await check(
  2,
  (s) =>
    s.replace(
      "x, y = position\n    dx, dy = offset\n    return (x + dx, y + dy)",
      "return (position[0] + offset[0], position[1] + offset[1])",
    ),
  true,
  null,
  "Indexed coordinate access",
);
await check(
  3,
  (s) => s.replace("state[side] += 1", "state[side] = 1"),
  false,
  1,
  "Point overwrites earlier score",
);
await check(
  3,
  (s) =>
    s.replace('if state[side] >= state["target"]:', "if state[side] >= 3:"),
  false,
  2,
  "Winning target hardcoded",
);
await check(
  3,
  (s) =>
    s.replace(
      'raise ValueError("Unknown side")',
      'state["left"] += 1\n        raise ValueError("Unknown side")',
    ),
  false,
  3,
  "Rejected update changes match",
);
await check(
  4,
  (s) => s.replace("return template.copy()", "return template"),
  false,
  1,
  "Reset aliases template",
);
await check(
  4,
  (s) =>
    s.replace(
      "return template.copy()",
      'return {"x": template["x"], "y": template["y"]}',
    ),
  false,
  1,
  "Reset drops unknown numeric fields",
);
await check(
  4,
  (s) => s.replace("return template.copy()", "return dict(template)"),
  true,
  null,
  "Dictionary constructor copies flat state",
);
await check(
  5,
  (s) => s.replace("            break", "            pass"),
  false,
  2,
  "Rallies continue after victory",
);
await check(
  5,
  (s) =>
    s.replace(
      "for side in rounds:",
      "while rounds:\n        side = rounds.pop(0)",
    ),
  false,
  3,
  "Analysis consumes original recording",
);
await check(
  5,
  `def summarise_match(rounds, target=3):
    left = 0
    right = 0
    played = 0
    winner = None
    for side in rounds:
        if winner is not None:
            break
        if side == "left":
            left += 1
        elif side == "right":
            right += 1
        else:
            raise ValueError("Unrecognised side")
        played += 1
        if left >= target:
            winner = "left"
        elif right >= target:
            winner = "right"
    return {"left": left, "right": right, "played": played, "winner": winner}

rounds = ["left", "right", "left", "left", "right"]
summary = summarise_match(rounds)
print(summary)
`,
  true,
  null,
  "Separate score counters and stop condition at next turn",
);
console.log(
  JSON.stringify({
    gameState: { mistakesRejected: rejected, validAlternatives: alternatives },
  }),
);
