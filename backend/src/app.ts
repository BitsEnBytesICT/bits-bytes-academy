import express from "express";
import path from "node:path";
import fs from "node:fs";
import { ZodError } from "zod";
import { openDatabase } from "./database.js";
import { LearningDAO } from "./endpoints/learning.dao.js";
import { LearningService } from "./endpoints/learning.service.js";
import { learningRoutes } from "./endpoints/learning.controller.js";
import { courseCatalog } from "./course-catalog.js";
export function createApp(db = openDatabase()) {
  const course = JSON.parse(
    fs.readFileSync(path.resolve("content/course.json"), "utf8"),
  );
  const app = express();
  app.disable("x-powered-by");
  app.use((q, s, next) => {
    s.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    s.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    s.setHeader("X-Content-Type-Options", "nosniff");
    const origin = q.headers.origin;
    if (origin) {
      let host = "";
      try {
        host = new URL(origin).hostname;
      } catch {}
      if (!["localhost", "127.0.0.1", "[::1]"].includes(host))
        return s.status(403).json({ error: "Local access only" });
    }
    next();
  });
  app.use(express.json({ limit: "25mb" }));
  app.get("/api/courses", (_q, s) => s.json(courseCatalog));
  app.use(
    "/api",
    learningRoutes(new LearningService(new LearningDAO(db), course)),
  );
  app.use("/api", (_q, s) => s.status(404).json({ error: "Unknown endpoint" }));
  app.use(express.static(path.resolve("frontend/dist")));
  app.get("/{*path}", (_q, s) =>
    s.sendFile(path.resolve("frontend/dist/index.html")),
  );
  app.use(
    (
      error: any,
      _q: express.Request,
      s: express.Response,
      _next: express.NextFunction,
    ) =>
      s.status(error instanceof ZodError ? 422 : error.status || 500).json({
        error:
          error instanceof ZodError
            ? "Invalid data: " + error.issues.map((i) => i.message).join("; ")
            : error.message || "Request failed",
      }),
  );
  return { app, db };
}
