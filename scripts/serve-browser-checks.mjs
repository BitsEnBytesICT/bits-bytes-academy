import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { matchFiles } from "../content-src/complete-course/full-game-support.mjs";
import { pongReference } from "../tests/fixtures/beginner-projects.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const app = express();
const port = Number(process.env.BROWSER_TEST_PORT || 3003);
app.use((_request, response, next) => {
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.get("/game-runtime.js", (_request, response) =>
  response.type("js").send(
    ts.transpileModule(
      fs.readFileSync(path.join(root, "frontend/src/game-runtime.ts"), "utf8"),
      {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ES2022,
        },
      },
    ).outputText,
  ),
);
app.get("/graphical-fixtures", (_request, response) =>
  response.json(
    JSON.parse(
      fs.readFileSync(path.join(root, "content/course.json"), "utf8"),
    ).activities.filter((a) => a.kind === "coding" && a.runtime === "pygame"),
  ),
);
app.use("/runtime", express.static(path.join(root, "frontend/public/runtime")));
app.get("/beginner-match-fixture", (_q, s) => {
  const files = { ...pongReference };
  files["main.py"] = files["main.py"]
    .replace("import pygame", "import pygame\nimport json")
    .replace(
      "            if event.type == pygame.KEYDOWN:",
      `            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_1:
                    x, y, vx, vy = 320.0, 5.0, 180.0, -90.0
                if event.key == pygame.K_2:
                    x, y, vx, vy = 31.0, left_y + 20, -180.0, 0.0
                if event.key == pygame.K_3:
                    x, y, vx, vy = 31.0, left_y + 20, 180.0, 0.0
                if event.key == pygame.K_4:
                    x, y, vx, vy = 650.0, 100.0, 180.0, 0.0
                if event.key == pygame.K_5:
                    x, y, vx, vy = 609.0, right_y + 20, 180.0, 0.0
                if event.key == pygame.K_6:
                    x, y, vx, vy = 320.0, 399.0, 180.0, 90.0
                if event.key == pygame.K_7:
                    x, y, vx, vy = -8.0, 100.0, -180.0, 0.0`,
    )
    .replace(
      "        pygame.display.flip()",
      `        pygame.display.flip()
        print("@@QA" + json.dumps({"state":"serve" if vx == 0 else "playing","left":left_y,"right":right_y,"x":x,"y":y,"vx":vx,"vy":vy,"scores":[left_score,right_score]}))`,
    );
  s.json(files);
});
app.get("/beginner-match", (_q, s) =>
  s.sendFile(path.join(root, "tests/browser/beginner-match.html")),
);
app.get("/match-fixture", (_q, s) => {
  const files = matchFiles();
  files["main.py"] = files["main.py"]
    .replace("import game", "import game\nimport json")
    .replace(
      "                control.handle_key(event.key)",
      `                if event.key == pygame.K_1:
                    x, y, vx, vy = 320.0, 5.0, 200.0, -100.0
                if event.key == pygame.K_2:
                    x, y, vx, vy = 31.0, left.y + 20, -200.0, 0.0
                if event.key == pygame.K_3:
                    x, y, vx, vy = 31.0, left.y + 20, 200.0, 0.0
                if event.key == pygame.K_4:
                    x, y, vx, vy = 650.0, 100.0, 200.0, 0.0
                control.handle_key(event.key)`,
    )
    .replace(
      "        pygame.display.flip()",
      `        pygame.display.flip()
        print("@@QA" + json.dumps({"state":state,"left":left.y,"right":right.y,"x":x,"y":y,"vx":vx,"vy":vy,"scores":[left_score,right_score],"paused":control.paused}))`,
    );
  s.json(files);
});
app.get("/match", (_q, s) =>
  s.sendFile(path.join(root, "tests/browser/match-controls.html")),
);
app.get("/", (_request, response) =>
  response.sendFile(path.join(root, "tests/browser/graphical-course.html")),
);
app.listen(port, "127.0.0.1", () =>
  console.log(
    `Browser checks: http://127.0.0.1:${port} — choose Run all graphical references. No learner database is used.`,
  ),
);
