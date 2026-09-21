import test from "node:test";
import assert from "node:assert/strict";
import { PythonRunner } from "../frontend/src/runtime.ts";

test("The runner retains one activity worker, routes stdin/EOF, and ignores cancelled responses", () => {
  const original = globalThis.Worker;
  class FakeWorker {
    static instances: FakeWorker[] = [];
    onmessage: (event: any) => void = () => {};
    onerror: (event: any) => void = () => {};
    requests: any[] = [];
    terminated = false;
    constructor() {
      FakeWorker.instances.push(this);
    }
    postMessage(data: any) {
      this.requests.push(data);
    }
    terminate() {
      this.terminated = true;
    }
    emit(type: string, request = this.requests.at(-1)) {
      this.onmessage({
        data: {
          type,
          runId: request.runId,
          result: { files: {}, error: null },
        },
      });
    }
  }
  globalThis.Worker = FakeWorker as unknown as typeof Worker;
  const runner = new PythonRunner(),
    events: string[] = [];
  runner.onEvent = (event) => events.push(event.type);
  try {
    runner.execute({ "main.py": "seed=9" }, []);
    const first = FakeWorker.instances[0],
      run = first.requests[0];
    first.emit("running");
    first.emit("done");
    assert.equal(first.terminated, false);
    runner.command({ "main.py": "seed=9" }, "seed");
    assert.equal(FakeWorker.instances.length, 1);
    first.emit("running");
    first.emit("input");
    runner.input("héllo");
    const state = new Int32Array(runner.stdin!, 0, 2);
    assert.equal(Atomics.load(state, 0), 1);
    assert.equal(
      new TextDecoder().decode(
        new Uint8Array(runner.stdin!, 8, Atomics.load(state, 1)),
      ),
      "héllo",
    );
    runner.input(null);
    assert.equal(Atomics.load(state, 0), 2);
    first.emit("console-done");
    const count = events.length;
    first.emit("done", run);
    assert.equal(events.length, count);
    runner.cancel("Stopped");
    assert.equal(first.terminated, true);
    runner.command({ "main.py": "seed=9" }, "2+2");
    assert.equal(FakeWorker.instances.length, 2);
    const afterCancel = events.length;
    first.emit("console-done");
    assert.equal(events.length, afterCancel);
    FakeWorker.instances[1].emit("console-done");
    assert.equal(events.at(-1), "console-done");
  } finally {
    runner.cancel();
    globalThis.Worker = original;
  }
});
