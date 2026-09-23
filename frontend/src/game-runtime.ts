import type { RuntimeEvent } from "./runtime";

/** A fresh canvas interpreter per Run; learner files are saved by the caller. */
export class GameRunner {
  frame: HTMLIFrameElement | null = null;
  runId = 0;
  interrupt: Uint8Array | null = null;
  timer: ReturnType<typeof setTimeout> | undefined;
  onEvent: (event: RuntimeEvent) => void = () => {};
  private listener: ((event: MessageEvent) => void) | null = null;
  execute(container: HTMLElement, files: Record<string, string>) {
    this.cancel();
    const runId = ++this.runId;
    const frame = document.createElement("iframe");
    frame.title = "Python game preview";
    frame.src = "/runtime/game-frame.html";
    frame.className = "game-preview-frame";
    this.frame = frame;
    this.interrupt = new Uint8Array(new SharedArrayBuffer(1));
    this.listener = (event) => {
      if (
        event.source !== frame.contentWindow ||
        event.origin !== location.origin ||
        event.data?.protocol !== "python-game" ||
        this.frame !== frame
      )
        return;
      const data = event.data;
      if (data.type === "ready") {
        frame.contentWindow?.postMessage(
          {
            protocol: "python-game",
            type: "run",
            runId,
            files,
            interrupt: this.interrupt!.buffer,
          },
          location.origin,
        );
        return;
      }
      if (data.runId !== runId && data.type !== "stop-requested") return;
      if (data.type === "stop-requested") {
        this.cancel("Execution stopped.");
        return;
      }
      if (["running", "done", "failure"].includes(data.type))
        clearTimeout(this.timer);
      this.onEvent(data);
    };
    window.addEventListener("message", this.listener);
    container.replaceChildren(frame);
    this.timer = setTimeout(
      () =>
        this.cancel(
          "The game could not load. Check the connection and try Run again.",
        ),
      45000,
    );
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
