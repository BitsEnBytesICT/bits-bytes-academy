import { Router } from "express";
import { LearningService } from "./learning.service.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
export function learningRoutes(service: LearningService) {
  const r = Router();
  r.get("/health", (_q, s) =>
    s.json({ ok: true, app: "bits-bytes-python-lab", version: "1.0.0" }),
  );
  r.get("/course", (_q, s) => s.json(service.course));
  r.get("/archive", (_q, s) => s.json(service.archive()));
  r.get("/archive/:id", (q, s) =>
    s.json(service.archivedWork(String(q.params.id))),
  );
  r.get("/state", (_q, s) => s.json(service.dao.state()));
  r.get("/workspaces/:id", (q, s) =>
    s.json(service.workspace(String(q.params.id))),
  );
  r.put("/workspaces/:id", (q, s) => {
    const result = service.save(String(q.params.id), q.body);
    s.status(result.conflict ? 409 : 200).json(result);
  });
  r.put("/progress/:id", (q, s) =>
    s.json(service.progress(String(q.params.id), q.body)),
  );
  r.patch("/settings", (q, s) => s.json(service.settings(q.body)));
  r.post("/unlocks/:id", (q, s) => s.json(service.unlock(String(q.params.id))));
  r.post("/attempts/:id", (q, s) => {
    service.id(String(q.params.id));
    service.dao.attempt(String(q.params.id), q.body);
    s.json({ ok: true });
  });
  r.get("/backup", (_q, s) =>
    s.attachment("python-lab-backup.json").json(service.dao.backup()),
  );
  r.post("/backup/preview", (q, s) => {
    const data = service.validateBackup(q.body);
    s.json({
      workspaces: Object.keys(data.workspaces).length,
      completed: Object.values(data.progress).filter((p) => p.complete).length,
      attempts: data.attempts.length,
    });
  });
  r.post("/backup/restore", (q, s) => {
    const data = service.validateBackup(q.body);
    const folder = path.resolve("data/backups");
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(
      path.join(folder, `before-import-${crypto.randomUUID()}.json`),
      JSON.stringify(service.dao.backup()),
    );
    service.dao.restore(data);
    s.json({ ok: true });
  });
  return r;
}
