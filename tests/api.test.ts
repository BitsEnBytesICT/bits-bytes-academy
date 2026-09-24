import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../backend/src/app.ts";
import { openDatabase } from "../backend/src/database.ts";
import { LearningDAO } from "../backend/src/endpoints/learning.dao.ts";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

test("Workspace revisions, progress, quiz state, and backup validation", async () => {
  const db = openDatabase(":memory:");
  const { app } = createApp(db);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((r) => server.once("listening", r));
  const address = server.address() as { port: number };
  const request = async (
    route: string,
    data?: unknown,
    method = "POST",
    headers: Record<string, string> = {},
  ) => {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api${route}`,
      {
        method: data === undefined ? "GET" : method,
        headers: { "Content-Type": "application/json", ...headers },
        body: data === undefined ? undefined : JSON.stringify(data),
      },
    );
    return {
      status: response.status,
      data: await response.json(),
      headers: response.headers,
    };
  };
  try {
    const health = await request("/health");
    const catalog = await request("/courses");
    assert.deepEqual(
      catalog.data.map((c: any) => [c.slug, c.status, c.estimatedHours]),
      [
        [
          "python",
          "available",
          Math.ceil(
            JSON.parse(
              fs.readFileSync("content/course.json", "utf8"),
            ).activities.reduce(
              (n: number, a: any) => n + a.estimatedMinutes,
              0,
            ) / 60,
          ),
        ],
        ["csharp", "coming-soon", null],
        ["html-css", "coming-soon", null],
      ],
    );
    assert.equal(health.status, 200);
    assert.equal(
      health.headers.get("cross-origin-embedder-policy"),
      "require-corp",
    );
    const id = "python-v4-01-announcement";
    const saved = await request(
      "/workspaces/" + id,
      { revision: 0, files: { "main.py": 'print("saved")' } },
      "PUT",
    );
    assert.equal(saved.data.revision, 1);
    const stale = await request(
      "/workspaces/" + id,
      { revision: 0, files: { "main.py": "stale" } },
      "PUT",
    );
    assert.equal(stale.status, 409);
    assert.equal(stale.data.current.files["main.py"], 'print("saved")');
    assert.equal(
      (
        await request(
          "/workspaces/" + id,
          { revision: 1, files: { "../outside.py": "bad" } },
          "PUT",
        )
      ).status,
      422,
    );
    assert.equal(
      (
        await request(
          "/workspaces/not-an-activity",
          { revision: 0, files: {} },
          "PUT",
        )
      ).status,
      404,
    );
    assert.equal(
      (
        await request("/settings", { language: "nl" }, "PATCH", {
          Origin: "https://foreign.example",
        })
      ).status,
      403,
    );
    await request(
      "/progress/" + id,
      { complete: true, checkpoints: ["step-1"] },
      "PUT",
    );
    await request(
      "/progress/" + id,
      { complete: false, checkpoints: ["step-2"] },
      "PUT",
    );
    const state = await request("/state");
    assert.equal(state.data.progress[id].complete, true);
    assert.deepEqual(state.data.progress[id].checkpoints, ["step-1", "step-2"]);
    const course = (await request("/course")).data;
    const q = course.activities.find(
      (a: any) => a.kind === "quiz" && a.chapter === 2,
    ).id;
    const questions = course.activities.find((a: any) => a.id === q).questions;
    const quiz = {
      index: 1,
      orders: questions.map((question: any) =>
        question.choices.map((choice: any) => choice.id),
      ),
      answers: { [questions[0].id]: questions[0].choices[0].id },
      finished: false,
      attempt: 1,
    };
    await request("/workspaces/" + q, { revision: 0, files: {}, quiz }, "PUT");
    assert.deepEqual((await request("/workspaces/" + q)).data.quiz, quiz);
    await request("/progress/" + q, { complete: true, score: 80 }, "PUT");
    await request("/progress/" + q, { complete: true, score: 50 }, "PUT");
    assert.equal((await request("/state")).data.progress[q].best, 80);
    const malformed = { ...quiz, index: 99 };
    assert.equal(
      (
        await request(
          "/workspaces/" + q,
          { revision: 1, files: {}, quiz: malformed },
          "PUT",
        )
      ).status,
      422,
    );
    const duplicateOrder = structuredClone(quiz);
    duplicateOrder.orders[0][1] = duplicateOrder.orders[0][0];
    assert.equal(
      (
        await request(
          "/workspaces/" + q,
          { revision: 1, files: {}, quiz: duplicateOrder },
          "PUT",
        )
      ).status,
      422,
    );
    const backup = (await request("/backup")).data;
    const badQuiz = structuredClone(backup);
    badQuiz.workspaces[q].quiz = malformed;
    assert.equal((await request("/backup/preview", badQuiz)).status, 422);
    assert.equal((await request("/backup/preview", backup)).status, 200);
    const bad = structuredClone(backup);
    bad.workspaces.invalid = { revision: 0, files: {} };
    assert.equal((await request("/backup/restore", bad)).status, 404);
    assert.equal((await request("/workspaces/" + id)).data.revision, 1);
    assert.equal((await request("/backup/restore", backup)).status, 200);
    assert.equal((await request("/workspaces/" + id)).data.revision, 2);
    assert.equal(
      (
        await request(
          "/workspaces/" + id,
          { revision: 1, files: { "main.py": "stale after restore" } },
          "PUT",
        )
      ).status,
      409,
    );
    assert.equal(
      (await request("/workspaces/" + id)).data.files["main.py"],
      'print("saved")',
    );
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    db.close();
  }
});
test("SQLite startup preserves learner records", () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "python-lab-test-"));
  const file = path.join(folder, "learning.sqlite");
  let db = openDatabase(file);
  new LearningDAO(db).saveWorkspace("sample", 0, {
    files: { "main.py": "print(12)" },
  });
  db.close();
  db = openDatabase(file);
  assert.equal(
    new LearningDAO(db).getWorkspace("sample").files["main.py"],
    "print(12)",
  );
  db.close();
  for (const name of [
    "learning.sqlite",
    "learning.sqlite-wal",
    "learning.sqlite-shm",
  ]) {
    const candidate = path.join(folder, name);
    if (fs.existsSync(candidate)) fs.unlinkSync(candidate);
  }
  fs.rmdirSync(folder);
});
