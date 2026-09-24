import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const app = express();
const port = Number(process.env.BROWSER_TEST_PORT || 3003);
app.use((_request, response, next) => {
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.get("/game-runtime.js", (_request, response) =>
  response
    .type("js")
    .send(
      ts.transpileModule(
        fs.readFileSync(
          path.join(root, "frontend/src/game-runtime.ts"),
          "utf8",
        ),
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
app.get("/", (_request, response) =>
  response.sendFile(path.join(root, "tests/browser/graphical-course.html")),
);
app.listen(port, "127.0.0.1", () =>
  console.log(
    `Browser checks: http://127.0.0.1:${port} — choose Run all graphical references. No learner database is used.`,
  ),
);
