import test from "node:test";
import assert from "node:assert/strict";
import { WorkspaceStore } from "../frontend/src/api.ts";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  } as Storage;
}
const json = (data: unknown) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

test("A slow previous page cannot replace the currently selected workspace", async () => {
  const original = globalThis.fetch;
  Object.defineProperty(globalThis, "localStorage", {
    value: memoryStorage(),
    configurable: true,
  });
  let finishOld!: (response: Response) => void;
  let savedUrl = "";
  globalThis.fetch = async (url, options) => {
    if (options?.method === "PUT") {
      savedUrl = String(url);
      return json({ revision: 2 });
    }
    if (String(url).endsWith("/old"))
      return new Promise((resolve) => {
        finishOld = resolve;
      });
    return json({ revision: 1, files: { "main.py": "new page" } });
  };
  try {
    const store = new WorkspaceStore();
    const old = store.load("old", {});
    await store.load("new", {});
    finishOld(json({ revision: 8, files: { "main.py": "old page" } }));
    await old;
    assert.equal(store.id, "new");
    assert.equal(store.current.files["main.py"], "new page");
    store.edit({ files: { "main.py": "new edits" } });
    await store.save();
    assert.equal(savedUrl, "/api/workspaces/new");
  } finally {
    globalThis.fetch = original;
  }
});

test("Edits made during a save remain recoverable and use the new revision on the next save", async () => {
  const original = globalThis.fetch;
  Object.defineProperty(globalThis, "localStorage", {
    value: memoryStorage(),
    configurable: true,
  });
  let completeFirst!: (response: Response) => void;
  let signalStarted!: () => void;
  const started = new Promise<void>((resolve) => {
    signalStarted = resolve;
  });
  const saves: any[] = [];
  globalThis.fetch = async (_url, options) => {
    if (options?.method !== "PUT") return json(null);
    saves.push(JSON.parse(String(options.body)));
    if (saves.length === 1) {
      signalStarted();
      return new Promise((resolve) => {
        completeFirst = resolve;
      });
    }
    return json({ revision: 2 });
  };
  try {
    const store = new WorkspaceStore();
    await store.load("activity", { "main.py": "" });
    store.edit({ files: { "main.py": "first edit" } });
    const pending = store.save();
    await started;
    store.edit({ files: { "main.py": "latest edit" } });
    completeFirst(json({ revision: 1 }));
    await pending;
    const draft = JSON.parse(
      localStorage.getItem("python-lab-draft:activity")!,
    );
    assert.equal(draft.baseRevision, 1);
    assert.equal(draft.workspace.files["main.py"], "latest edit");
    assert.equal(store.dirty, true);
    await store.save();
    assert.equal(saves[1].revision, 1);
    assert.equal(saves[1].files["main.py"], "latest edit");
    assert.equal(localStorage.getItem("python-lab-draft:activity"), null);
    assert.equal(store.dirty, false);
  } finally {
    globalThis.fetch = original;
  }
});
