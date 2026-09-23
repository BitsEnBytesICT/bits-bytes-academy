import { loadPyodide } from "./pyodide/pyodide.mjs";
import { execute, consoleLine } from "./engine.mjs";
import { ensurePackages } from "./packages.mjs";
let interpreter;
let queue = Promise.resolve();
self.onmessage = ({ data }) => {
  queue = queue.then(() => handle(data));
};
async function handle(data) {
  const { runId, files, checks, stdin, interrupt, kind, line } = data;
  const send = (type, body = {}) => self.postMessage({ runId, type, ...body });
  let flush = () => {};
  try {
    if (!interpreter) {
      send("loading");
      interpreter = await loadPyodide({
        indexURL: new URL("./pyodide/", import.meta.url).href,
      });
    }
    const py = interpreter;
    let bytes = 0;
    const streams = ["stdout", "stderr"].map((channel) => {
      const decoder = new TextDecoder();
      let pending = "";
      return {
        flush() {
          if (pending) {
            send("output", { channel, text: pending });
            pending = "";
          }
        },
        write(buffer) {
          bytes += buffer.length;
          if (bytes > 1048576) throw new Error("Output limit exceeded (1 MiB)");
          pending += decoder.decode(buffer, { stream: true });
          if (pending.length >= 4096) this.flush();
          return buffer.length;
        },
      };
    });
    flush = () => streams.forEach((stream) => stream.flush());
    py.setStdout({ write: (buffer) => streams[0].write(buffer) });
    py.setStderr({ write: (buffer) => streams[1].write(buffer) });
    py.setInterruptBuffer(new Uint8Array(interrupt));
    const state = new Int32Array(stdin, 0, 2),
      buffer = new Uint8Array(stdin, 8);
    py.setStdin({
      stdin: () => {
        Atomics.store(state, 0, 0);
        flush();
        send("input");
        while (Atomics.load(state, 0) === 0) {
          Atomics.wait(state, 0, 0, 100);
          py.checkInterrupt();
        }
        send("resume");
        if (Atomics.load(state, 0) === 2) return undefined;
        return new TextDecoder().decode(
          new Uint8Array(buffer.subarray(0, Atomics.load(state, 1))),
        );
      },
    });
    // Package loading uses the startup deadline, not the script's run budget.
    await ensurePackages(py, files, line);
    send("running");
    const result =
      kind === "console"
        ? await consoleLine(py, { files, line })
        : await execute(py, { files, checks });
    flush();
    send(kind === "console" ? "console-done" : "done", { result });
  } catch (error) {
    flush();
    send("failure", { message: String(error) });
  }
}
