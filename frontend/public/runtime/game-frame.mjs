import { loadPyodide } from "./pyodide/pyodide.mjs";
import { initializeRuntime, consoleLine } from "./engine.mjs";

const canvas = document.querySelector("canvas");
let py,
  interrupt,
  activeId = 0,
  busy = false,
  mode = "run";
let watchdog, heartbeat, pendingInput, focusWaiter;
let paused = false,
  waitingInput = false,
  timedOut = false;
let outputSize = 0,
  stdout = "";
let outputLimitExceeded = false;
const heldKeys = new Map();
let outputTimer,
  pendingBytes = 0;
const pendingOutput = [];
const post = (type, body = {}) =>
  parent.postMessage(
    { protocol: "python-game", type, runId: activeId, ...body },
    location.origin,
  );
function flushOutput() {
  clearTimeout(outputTimer);
  outputTimer = undefined;
  for (const entry of pendingOutput.splice(0)) post("output", entry);
  pendingBytes = 0;
}
function emit(type, body = {}) {
  if (type !== "output") {
    flushOutput();
    post(type, body);
    return;
  }
  const previous = pendingOutput.at(-1);
  if (previous?.channel === body.channel) previous.text += body.text;
  else pendingOutput.push({ ...body });
  pendingBytes += body.text.length;
  if (pendingBytes >= 16384) flushOutput();
  else if (!outputTimer) outputTimer = setTimeout(flushOutput, 16);
}

function releaseKeys() {
  for (const values of heldKeys.values())
    canvas.dispatchEvent(
      new KeyboardEvent("keyup", { ...values, bubbles: true }),
    );
  heldKeys.clear();
}
function setPaused(value) {
  if (!busy || mode !== "run" || paused === value) return;
  paused = value;
  if (value) releaseKeys();
  else {
    py?.runPython("_game_last_yield = time.monotonic()");
    focusWaiter?.();
    focusWaiter = undefined;
  }
  if (!waitingInput) emit(value ? "paused" : "resume");
}
canvas.addEventListener("pointerdown", () => {
  canvas.focus();
  setPaused(false);
});
canvas.addEventListener("focus", () => setPaused(false));
window.addEventListener("blur", () => setPaused(true));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    setPaused(true);
    watchdog?.postMessage({ type: "stop" });
  } else {
    py?.runPython("_game_last_yield = time.monotonic()");
    watchdog?.postMessage({ type: "start" });
  }
});
document.addEventListener("keydown", (event) => {
  heldKeys.set(event.code, {
    key: event.key,
    code: event.code,
    keyCode: event.keyCode,
    which: event.which,
  });
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)
  )
    event.preventDefault();
  if (event.ctrlKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
    emit("stop-requested");
  }
});
document.addEventListener("keyup", (event) => heldKeys.delete(event.code));

// Synchronous Python input awaits the parent terminal through JSPI.
globalThis._game_request_input = () => {
  waitingInput = true;
  emit("input");
  return new Promise((resolve) => {
    pendingInput = resolve;
  });
};
globalThis._game_wait_focus = () =>
  paused
    ? new Promise((resolve) => {
        focusWaiter = resolve;
      })
    : Promise.resolve();

const bootstrap = String.raw`
import asyncio, inspect, time, pygame
from pyodide.ffi import run_sync
from js import _game_request_input, _game_wait_focus
sys.stdout.reconfigure(line_buffering=True, write_through=True)
sys.stderr.reconfigure(line_buffering=True, write_through=True)
_game_last_yield = time.monotonic()
_game_trace_count = 0
_game_original_sleep = asyncio.sleep

class _GameInput(io.TextIOBase):
    encoding = 'utf-8'
    def __init__(self): self.reset()
    def reset(self): self.pending, self.eof = '', False
    def readable(self): return True
    def readline(self, size=-1):
        if size == 0: return ''
        if not self.pending and not self.eof:
            value = json.loads(run_sync(_game_request_input()))['value']
            if value is None: self.eof = True
            else: self.pending = value + '\n'
        end = self.pending.find('\n') + 1
        if end == 0: end = len(self.pending)
        if size >= 0: end = min(end, size)
        result, self.pending = self.pending[:end], self.pending[end:]
        return result
    def read(self, size=-1):
        if size == 0: return ''
        result = ''
        while size < 0 or len(result) < size:
            part = self.readline(-1 if size < 0 else size - len(result))
            if not part: break
            result += part
        return result
_game_stdin = _GameInput()
sys.stdin = _game_stdin

async def _game_sleep(delay, result=None):
    await _game_original_sleep(delay)
    await _game_wait_focus()
    return result

def _game_trace(frame, event, arg):
    global _game_trace_count
    filename = frame.f_code.co_filename
    if filename not in ('main.py', '<console>') and not filename.startswith((_lab_root + '/', '/home/pyodide/behavior-probe/')):
        return None
    _game_trace_count += 1
    if _game_trace_count % 128 == 0 and time.monotonic() - _game_last_yield > 1.5:
        raise TimeoutError('The program did not yield. In a game loop, use await asyncio.sleep(1 / 60).')
    return _game_trace

async def _game_run(files_json):
    global _game_frames
    _lab_prepare(json.loads(files_json), fresh=True)
    before = asyncio.all_tasks()
    _game_frames = 0
    error = None
    original_flip, original_update = pygame.display.flip, pygame.display.update
    def flip(*args, **kwargs):
        global _game_frames
        result = original_flip(*args, **kwargs)
        _game_frames += 1
        return result
    def update(*args, **kwargs):
        global _game_frames
        result = original_update(*args, **kwargs)
        _game_frames += 1
        return result
    pygame.display.flip, pygame.display.update = flip, update
    asyncio.sleep = _game_sleep
    try:
        source = open('main.py', encoding='utf-8').read()
        result = eval(compile(source, 'main.py', 'exec', flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT), _lab_ns)
        if inspect.isawaitable(result): await result
        tasks = asyncio.all_tasks() - before
        if tasks: await asyncio.gather(*tasks)
    except BaseException as exc:
        error = type(exc).__name__
        traceback.print_exception(type(exc), exc, exc.__traceback__)
    finally:
        for task in asyncio.all_tasks() - before: task.cancel()
        asyncio.sleep = _game_original_sleep
        pygame.display.flip, pygame.display.update = original_flip, original_update
    return json.dumps({'files': _lab_files(), 'error': error, 'frames': _game_frames})
`;

async function initialize() {
  if (py) return;
  emit("loading");
  py = await loadPyodide({
    indexURL: new URL("./pyodide/", import.meta.url).href,
    env: { PYGAME_HIDE_SUPPORT_PROMPT: "1" },
  });
  py.canvas.setCanvas2D(canvas);
  py._api._skip_unwind_fatal_error = true;
  py.setInterruptBuffer(interrupt);
  await py.loadPackage("pygame-ce");
  for (const channel of ["stdout", "stderr"]) {
    const decoder = new TextDecoder();
    py[channel === "stdout" ? "setStdout" : "setStderr"]({
      write(buffer) {
        if (outputLimitExceeded) return buffer.length;
        outputSize += buffer.length;
        if (outputSize > 1048576) {
          outputLimitExceeded = true;
          throw new Error("Output limit exceeded (1 MiB)");
        }
        const text = decoder.decode(buffer, { stream: true });
        if (channel === "stdout") stdout += text;
        emit("output", { channel, text });
        return buffer.length;
      },
    });
  }
  initializeRuntime(py);
  py.runPython(bootstrap);
}

async function startGuard() {
  timedOut = false;
  Atomics.store(interrupt, 0, 0);
  watchdog = new Worker(new URL("./game-watchdog.mjs", import.meta.url), {
    type: "module",
  });
  watchdog.postMessage({ type: "init", interrupt: interrupt.buffer });
  await new Promise((resolve) => {
    watchdog.onmessage = ({ data }) => {
      if (data.type === "armed") resolve();
      if (data.type === "timeout") {
        timedOut = true;
        emit("watchdog", {
          message:
            "The program stopped responding. Give the browser a turn with await asyncio.sleep(1 / 60) inside a game loop.",
        });
      }
    };
    watchdog.postMessage({ type: "start" });
  });
  if (document.hidden) watchdog.postMessage({ type: "stop" });
  heartbeat = setInterval(() => {
    py.runPython("_game_last_yield = time.monotonic()");
    watchdog?.postMessage({ type: "beat" });
  }, 100);
  py.runPython(
    "_game_last_yield = time.monotonic()\n_game_trace_count = 0\n_game_stdin.reset()\nsys.settrace(_game_trace)",
  );
}

async function handle(request) {
  busy = true;
  activeId = request.runId;
  mode = request.type;
  paused = false;
  outputSize = 0;
  outputLimitExceeded = false;
  stdout = "";
  try {
    await initialize();
    await startGuard();
    emit("running");
    if (mode === "console") {
      const result = await consoleLine(py, {
        files: request.files,
        line: request.line,
      });
      if (outputLimitExceeded) {
        result.error = "OutputLimitError";
        emit("output", {
          channel: "stderr",
          text: "Output limit exceeded (1 MiB). Reduce repeated printing and try again.\n",
        });
      }
      emit("console-done", { result });
    } else {
      py.globals.set("_game_request_files", JSON.stringify(request.files));
      const result = JSON.parse(
        await py.runPythonAsync("await _game_run(_game_request_files)"),
      );
      if (outputLimitExceeded) {
        result.error = "OutputLimitError";
        emit("output", {
          channel: "stderr",
          text: "Output limit exceeded (1 MiB). Reduce repeated printing and try again.\n",
        });
      }
      if (request.checks?.length) {
        emit("grading");
        py.globals.set(
          "_game_assessment",
          JSON.stringify({
            files: request.files,
            checks: request.checks,
            frames: result.frames,
            error: result.error,
            stdout,
          }),
        );
        result.results = JSON.parse(
          py.runPython(
            "_game_last_yield = time.monotonic()\n_lab_game_grade(_game_assessment)",
          ),
        );
      }
      emit("done", { result: { ...result, timedOut } });
    }
  } catch (error) {
    emit("failure", {
      message: outputLimitExceeded
        ? "Output limit exceeded (1 MiB). Reduce repeated printing and try again."
        : String(error),
    });
  } finally {
    clearInterval(heartbeat);
    watchdog?.terminate();
    watchdog = undefined;
    try {
      py?.runPython("sys.settrace(None)");
    } catch {
      /* failed initialization */
    }
    pendingInput = undefined;
    waitingInput = false;
    focusWaiter?.();
    focusWaiter = undefined;
    busy = false;
    releaseKeys();
  }
}

window.addEventListener("message", ({ source, origin, data }) => {
  if (
    source !== parent ||
    origin !== location.origin ||
    data?.protocol !== "python-game"
  )
    return;
  if (data.type === "input" && data.runId === activeId && pendingInput) {
    const resolve = pendingInput;
    pendingInput = undefined;
    waitingInput = false;
    emit(paused ? "paused" : "resume");
    resolve(JSON.stringify({ value: data.text }));
    return;
  }
  if (data.type === "resume" && data.runId === activeId) {
    canvas.focus();
    setPaused(false);
    return;
  }
  if (
    data.type === "finish" &&
    data.runId === activeId &&
    busy &&
    mode === "run" &&
    py
  ) {
    setPaused(false);
    if (pendingInput) {
      const resolve = pendingInput;
      pendingInput = undefined;
      waitingInput = false;
      resolve(JSON.stringify({ value: null }));
    }
    try {
      py.runPython(
        "pygame.event.post(pygame.event.Event(pygame.QUIT)) if pygame.display.get_init() else None",
      );
      emit("finishing");
    } catch (error) {
      emit("failure", { message: String(error) });
    }
    return;
  }
  if (["run", "console"].includes(data.type) && !busy) {
    if (!interrupt) interrupt = new Uint8Array(data.interrupt);
    void handle(data);
  }
});
emit("ready");
