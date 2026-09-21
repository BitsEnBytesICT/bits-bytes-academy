import type Database from "better-sqlite3";
export class LearningDAO {
  constructor(public db: Database.Database) {}
  getWorkspace(id: string) {
    const row = this.db
      .prepare("SELECT revision,data FROM workspaces WHERE id=?")
      .get(id) as { revision: number; data: string } | undefined;
    return row ? { ...JSON.parse(row.data), revision: row.revision } : null;
  }
  saveWorkspace(id: string, revision: number, data: unknown) {
    return this.db.transaction(() => {
      const current = this.getWorkspace(id);
      if ((current?.revision || 0) !== revision)
        return { conflict: true, current };
      const next = revision + 1;
      this.db
        .prepare(
          "INSERT INTO workspaces VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,data=excluded.data",
        )
        .run(id, next, JSON.stringify(data));
      return { revision: next };
    })();
  }
  getProgress(id: string) {
    const row = this.db
      .prepare("SELECT data FROM progress WHERE id=?")
      .get(id) as { data: string } | undefined;
    return row ? JSON.parse(row.data) : {};
  }
  setProgress(id: string, value: unknown) {
    this.db
      .prepare(
        "INSERT INTO progress VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
      )
      .run(id, JSON.stringify(value));
  }
  setting(id: string, value?: unknown) {
    if (value !== undefined)
      this.db
        .prepare(
          "INSERT INTO settings VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
        )
        .run(id, JSON.stringify(value));
    const row = this.db
      .prepare("SELECT data FROM settings WHERE id=?")
      .get(id) as { data: string } | undefined;
    return row ? JSON.parse(row.data) : undefined;
  }
  state() {
    return {
      progress: Object.fromEntries(
        (
          this.db.prepare("SELECT * FROM progress").all() as {
            id: string;
            data: string;
          }[]
        ).map((r) => [r.id, JSON.parse(r.data)]),
      ),
      settings: this.setting("preferences") || {},
      unlocks: this.setting("unlocks") || [],
    };
  }
  attempt(id: string, value: unknown) {
    this.db
      .prepare("INSERT INTO attempts(activity_id,data) VALUES(?,?)")
      .run(id, JSON.stringify(value));
  }
  backup() {
    return {
      format: "python-lab-backup",
      version: 1,
      createdAt: new Date().toISOString(),
      ...this.state(),
      workspaces: Object.fromEntries(
        (
          this.db.prepare("SELECT id FROM workspaces").all() as { id: string }[]
        ).map((r) => [r.id, this.getWorkspace(r.id)]),
      ),
      attempts: (
        this.db
          .prepare("SELECT activity_id,data,created_at FROM attempts")
          .all() as { activity_id: string; data: string; created_at: string }[]
      ).map((r) => ({
        activityId: r.activity_id,
        data: JSON.parse(r.data),
        createdAt: r.created_at,
      })),
    };
  }
  restore(data: any) {
    this.db.transaction(() => {
      const revisions = new Map(
        (
          this.db.prepare("SELECT id,revision FROM workspaces").all() as {
            id: string;
            revision: number;
          }[]
        ).map((row) => [row.id, row.revision]),
      );
      this.db.exec(
        "DELETE FROM workspaces; DELETE FROM progress; DELETE FROM attempts; DELETE FROM settings;",
      );
      for (const [id, w] of Object.entries(data.workspaces) as [string, any][])
        this.db
          .prepare("INSERT INTO workspaces VALUES(?,?,?)")
          .run(
            id,
            Math.max(revisions.get(id) || 0, w.revision) + 1,
            JSON.stringify(w),
          );
      for (const [id, p] of Object.entries(data.progress))
        this.setProgress(id, p);
      this.setting("preferences", data.settings);
      this.setting("unlocks", data.unlocks);
      for (const a of data.attempts)
        this.db
          .prepare(
            "INSERT INTO attempts(activity_id,data,created_at) VALUES(?,?,?)",
          )
          .run(a.activityId, JSON.stringify(a.data), a.createdAt);
    })();
  }
}
