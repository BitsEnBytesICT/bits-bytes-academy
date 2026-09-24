import test from "node:test";
import assert from "node:assert/strict";
import { GameRunner } from "../frontend/src/game-runtime.ts";

test("Graphical sessions retain console state, isolate full runs, and route controls only to the current frame", () => {
  const saved = Object.fromEntries(
    ["window", "document", "location"].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  const listeners = new Set<(event: any) => void>();
  const frames: any[] = [];
  const origin = "http://localhost:3001";
  const fakeWindow = {
    addEventListener: (_: string, listener: any) => listeners.add(listener),
    removeEventListener: (_: string, listener: any) =>
      listeners.delete(listener),
  };
  const fakeDocument = {
    createElement: () => {
      const frame = {
        removed: false,
        requests: [] as any[],
        contentWindow: {
          postMessage(data: any, target: string) {
            assert.equal(target, origin);
            frame.requests.push(data);
          },
        },
        remove() {
          frame.removed = true;
        },
      };
      frames.push(frame);
      return frame;
    },
  };
  for (const [key, value] of Object.entries({
    window: fakeWindow,
    document: fakeDocument,
    location: { origin },
  }))
    Object.defineProperty(globalThis, key, { configurable: true, value });
  const container = { replaceChildren() {} } as unknown as HTMLElement;
  const runner = new GameRunner();
  const events: any[] = [];
  runner.onEvent = (event) => events.push(event);
  const emit = (
    frame: any,
    type: string,
    runId = runner.runId,
    source = frame.contentWindow,
    messageOrigin = origin,
  ) => {
    for (const listener of listeners)
      listener({
        source,
        origin: messageOrigin,
        data: { protocol: "python-game", type, runId },
      });
  };
  try {
    runner.execute(container, { "main.py": "pass" }, []);
    const first = frames[0];
    emit(first, "ready");
    assert.equal(first.requests[0].type, "run");
    emit(first, "ready");
    assert.equal(first.requests.length, 1, "Handshake is sent only once");
    emit(first, "running");
    emit(first, "input");
    runner.input("Zoë 日本");
    runner.input("");
    runner.input(null);
    assert.deepEqual(
      first.requests.slice(1).map((r: any) => r.text),
      ["Zoë 日本", "", null],
    );
    assert.throws(() => runner.input("é".repeat(40000)), /too long/);
    runner.finish();
    assert.equal(first.requests.at(-1).type, "finish");
    runner.resume();
    assert.equal(first.requests.at(-1).type, "resume");
    emit(first, "done");
    const oldId = runner.runId;
    runner.command(container, { "main.py": "pass" }, "frames");
    assert.equal(frames.length, 1, "Console keeps the completed interpreter");
    assert.equal(first.requests.at(-1).line, "frames");
    const before = events.length;
    emit(first, "done", oldId);
    emit(first, "console-done", runner.runId, {});
    emit(
      first,
      "console-done",
      runner.runId,
      first.contentWindow,
      "https://example.com",
    );
    assert.equal(
      events.length,
      before,
      "Stale and foreign messages are ignored",
    );
    emit(first, "console-done");
    const interrupt = runner.interrupt!;
    runner.execute(container, { "main.py": "print(2)" }, []);
    assert.equal(first.removed, true);
    assert.equal(Atomics.load(interrupt, 0), 2);
    assert.equal(frames.length, 2);
    assert.equal(listeners.size, 1);
    emit(frames[1], "ready");
    emit(frames[1], "stop-requested");
    assert.equal(runner.frame, null);
    assert.equal(events.at(-1).type, "cancelled");
    assert.equal(listeners.size, 0);
  } finally {
    runner.cancel();
    for (const [key, descriptor] of Object.entries(saved)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});
