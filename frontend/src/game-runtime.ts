import type { Checkpoint } from "../../shared/types";
import type { RuntimeEvent } from "./runtime";

/** Full runs get a fresh canvas interpreter; console commands retain that run. */
export class GameRunner {
  frame: HTMLIFrameElement | null = null;
  runId = 0;
  interrupt: Uint8Array | null = null;
  timer: ReturnType<typeof setTimeout> | undefined;
  onEvent: (event: RuntimeEvent) => void = () => {};
  private listener: ((event: MessageEvent) => void) | null = null;
  private consoleMode = false;
  private arm(milliseconds: number, message: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.cancel(message), milliseconds);
  }
  private send(type: string, body: Record<string, unknown> = {}) {
    this.frame?.contentWindow?.postMessage(
      { protocol: "python-game", type, runId: this.runId, ...body },
      location.origin,
    );
  }
  private create(
    container: HTMLElement,
    type: "run" | "console",
    files: Record<string, string>,
    checks: Checkpoint[],
    line = "",
  ) {
    this.cancel();
    this.consoleMode = type === "console";
    ++this.runId;
    const frame = document.createElement("iframe");
    frame.title = "Python game preview";
    frame.src = "/runtime/game-frame.html";
    frame.className = "game-preview-frame";
    this.frame = frame;
    this.interrupt = new Uint8Array(new SharedArrayBuffer(1));
    let initial = true;
    this.listener = (event) => {
      if (
        event.source !== frame.contentWindow ||
        event.origin !== location.origin ||
        event.data?.protocol !== "python-game" ||
        this.frame !== frame
      )
        return;
      const data = event.data;
      if (data.type === "ready" && initial) {
        initial = false;
        this.send(type, {
          files,
          checks,
          line,
          interrupt: this.interrupt!.buffer,
        });
        return;
      }
      if (data.runId !== this.runId) return;
      if (data.type === "stop-requested") {
        this.cancel("Execution stopped.");
        return;
      }
      if (
        ["running", "done", "console-done", "input", "failure"].includes(
          data.type,
        )
      )
        clearTimeout(this.timer);
      if (this.consoleMode && ["running", "resume"].includes(data.type))
        this.arm(
          10000,
          "Time limit reached. Check your console command and try again.",
        );
      if (data.type === "grading")
        this.arm(
          10000,
          "The checks took too long. Check your helper functions and try again.",
        );
      if (data.type === "failure") this.cancel();
      this.onEvent(data);
    };
    window.addEventListener("message", this.listener);
    container.replaceChildren(frame);
    this.arm(
      45000,
      "The game could not load. Check the connection and try Run again.",
    );
  }
  execute(
    container: HTMLElement,
    files: Record<string, string>,
    checks: Checkpoint[] = [],
  ) {
    this.create(container, "run", files, checks);
  }
  command(container: HTMLElement, files: Record<string, string>, line: string) {
    if (!this.frame) this.create(container, "console", files, [], line);
    else {
      this.consoleMode = true;
      ++this.runId;
      this.arm(
        10000,
        "Time limit reached. Check your console command and try again.",
      );
      this.send("console", { files, line });
    }
  }
  input(text: string | null) {
    if (new TextEncoder().encode(text ?? "").length > 65536)
      throw new Error("Input is too long");
    this.send("input", { text });
  }
  finish() {
    this.send("finish");
    this.arm(
      5000,
      "The preview did not close. Handle pygame.QUIT in the event loop, then try again. Your code is saved.",
    );
  }
  resume() {
    this.send("resume");
  }
  cancel(message?: string) {
    clearTimeout(this.timer);
    if (this.interrupt) Atomics.store(this.interrupt, 0, 2);
    if (this.listener) window.removeEventListener("message", this.listener);
    this.listener = null;
    this.frame?.remove();
    this.frame = null;
    this.runId++;
    if (message) this.onEvent({ type: "cancelled", message });
  }
}
