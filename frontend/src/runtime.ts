import type { Checkpoint } from "../../shared/types";
export type RuntimeResult = {
  files: Record<string, string>;
  error: string | null;
  results?: { id: string; passed: boolean }[];
  syntax?: string;
  display?: string | null;
};
export type RuntimeEvent = {
  type: string;
  runId?: number;
  text?: string;
  channel?: string;
  message?: string;
  result?: RuntimeResult;
};
export class PythonRunner {
  worker: Worker | null = null;
  runId = 0;
  timer: ReturnType<typeof setTimeout> | undefined;
  stdin: SharedArrayBuffer | null = null;
  interrupt: SharedArrayBuffer | null = null;
  onEvent: (event: RuntimeEvent) => void = () => {};
  cancel(message?: string) {
    clearTimeout(this.timer);
    this.worker?.terminate();
    this.worker = null;
    this.runId++;
    if (message) this.onEvent({ type: "cancelled", message });
  }
  private arm(milliseconds: number, message: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.cancel(message), milliseconds);
  }
  private send(
    kind: "run" | "console",
    files: Record<string, string>,
    checks: Checkpoint[] = [],
    line = "",
  ) {
    const runId = ++this.runId;
    if (!this.worker) {
      this.stdin = new SharedArrayBuffer(65544);
      this.interrupt = new SharedArrayBuffer(1);
      const worker = new Worker("/runtime/python-worker.mjs", {
        type: "module",
      });
      this.worker = worker;
      worker.onmessage = ({ data }) => {
        if (worker !== this.worker || data.runId !== this.runId) return;
        if (data.type === "running" || data.type === "resume")
          this.arm(
            10000,
            "Time limit reached. Check your loops and try again.",
          );
        if (["input", "done", "console-done", "failure"].includes(data.type))
          clearTimeout(this.timer);
        if (data.type === "failure") {
          worker.terminate();
          this.worker = null;
        }
        this.onEvent(data);
      };
      worker.onerror = (event) => {
        if (worker !== this.worker) return;
        this.cancel();
        this.onEvent({
          type: "failure",
          message: event.message || "Python could not start.",
        });
      };
    }
    Atomics.store(new Int32Array(this.stdin!, 0, 2), 0, 0);
    this.arm(45000, "Python took too long to load. Refresh and try again.");
    this.worker.postMessage({
      kind,
      runId,
      files,
      checks,
      line,
      stdin: this.stdin,
      interrupt: this.interrupt,
    });
  }
  execute(files: Record<string, string>, checks: Checkpoint[]) {
    this.send("run", files, checks);
  }
  command(files: Record<string, string>, line: string) {
    this.send("console", files, [], line);
  }
  input(text: string | null) {
    if (!this.stdin) return;
    const state = new Int32Array(this.stdin, 0, 2),
      bytes = new TextEncoder().encode(text ?? "");
    if (bytes.length > 65536) throw Error("Input is too long");
    new Uint8Array(this.stdin, 8).set(bytes);
    Atomics.store(state, 1, bytes.length);
    Atomics.store(state, 0, text === null ? 2 : 1);
    Atomics.notify(state, 0);
  }
}
