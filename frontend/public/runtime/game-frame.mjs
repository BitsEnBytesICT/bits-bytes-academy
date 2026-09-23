import { loadPyodide } from "./pyodide/pyodide.mjs";
import { harness } from "./engine.mjs";

const canvas = document.querySelector("canvas");
let started = false;
const send = (type, body = {}) =>
  parent.postMessage(
    { protocol: "python-game", type, ...body },
    location.origin,
  );
canvas.addEventListener("pointerdown", () => canvas.focus());
document.addEventListener("keydown", (event) => {
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)
  )
    event.preventDefault();
  if (event.ctrlKey && event.key.toLowerCase() === "c") send("stop-requested");
});

window.addEventListener("message", async ({ source, origin, data }) => {
  if (
    source !== parent ||
    origin !== location.origin ||
    data.protocol !== "python-game" ||
    data.type !== "run" ||
    started
  )
    return;
  started = true;
  const { files, interrupt, runId } = data;
  let py,
    watchdog,
    beat,
    timedOut = false,
    size = 0;
  const emit = (type, body = {}) => send(type, { runId, ...body });
  try {
    emit("loading");
    py = await loadPyodide({
      indexURL: new URL("./pyodide/", import.meta.url).href,
    });
    py.canvas.setCanvas2D(canvas);
    py._api._skip_unwind_fatal_error = true;
    py.setInterruptBuffer(new Uint8Array(interrupt));
    await py.loadPackage("pygame-ce");
    for (const channel of ["stdout", "stderr"]) {
      const decoder = new TextDecoder();
      py[channel === "stdout" ? "setStdout" : "setStderr"]({
        write(buffer) {
          size += buffer.length;
          if (size > 1048576) throw new Error("Output limit exceeded (1 MiB)");
          emit("output", {
            channel,
            text: decoder.decode(buffer, { stream: true }),
          });
          return buffer.length;
        },
      });
    }
    py.runPython(harness);
    py.globals.set("_game_payload", JSON.stringify(files));
    py.runPython(`
import asyncio, inspect, time
sys.stdout.reconfigure(line_buffering=True, write_through=True)
sys.stderr.reconfigure(line_buffering=True, write_through=True)
_lab_prepare(json.loads(_game_payload), fresh=True)
_game_last_yield = time.monotonic()
_game_trace_count = 0
def _game_trace(frame, event, arg):
    global _game_trace_count
    filename = frame.f_code.co_filename
    if filename != 'main.py' and not filename.startswith(_lab_root + '/'):
        return None
    _game_trace_count += 1
    if _game_trace_count % 128 == 0 and time.monotonic() - _game_last_yield > 1.5:
        raise TimeoutError('The game loop did not yield. Add await asyncio.sleep(1 / 60) inside the loop.')
    return _game_trace
async def _game_run():
    before = asyncio.all_tasks()
    error = None
    try:
        sys.settrace(_game_trace)
        source = open('main.py', encoding='utf-8').read()
        result = eval(compile(source, 'main.py', 'exec', flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT), _lab_ns)
        if inspect.isawaitable(result): await result
        tasks = asyncio.all_tasks() - before
        if tasks: await asyncio.gather(*tasks)
    except BaseException as exc:
        error = type(exc).__name__
        traceback.print_exception(type(exc), exc, exc.__traceback__)
    finally:
        sys.settrace(None)
        for task in asyncio.all_tasks() - before: task.cancel()
    return json.dumps({'files': _lab_files(), 'error': error})
`);
    watchdog = new Worker(new URL("./game-watchdog.mjs", import.meta.url), {
      type: "module",
    });
    watchdog.postMessage({ type: "init", interrupt });
    let arm;
    const armed = new Promise((resolve) => {
      arm = resolve;
    });
    watchdog.onmessage = ({ data }) => {
      if (data.type === "armed") arm();
      if (data.type === "timeout") {
        timedOut = true;
        emit("watchdog", {
          message:
            "The game stopped responding. Give the browser a turn with await asyncio.sleep(1 / 60) inside the game loop.",
        });
      }
    };
    beat = setInterval(() => {
      py.runPython("_game_last_yield = time.monotonic()");
      watchdog.postMessage({ type: "beat" });
    }, 100);
    watchdog.postMessage({ type: "start" });
    await armed;
    py.runPython("_game_last_yield = time.monotonic()");
    emit("running");
    const result = JSON.parse(await py.runPythonAsync("await _game_run()"));
    emit("done", { result: { ...result, timedOut } });
  } catch (error) {
    emit("failure", { message: String(error) });
  } finally {
    clearInterval(beat);
    watchdog?.terminate();
  }
});
send("ready");
