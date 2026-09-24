import type { Terminal } from "@xterm/xterm";
import { displayConsolePrompt } from "./console-prompt";
import { TerminalLine } from "./terminal-line";

export type TerminalState = {
  output: { text: string; channel: string }[];
  status: string;
  prompt: string;
};
export type TerminalActions = {
  onCommand: (line: string) => void;
  onInput: (line: string | null) => void;
  onStop: () => void;
  onClear: () => void;
};

export class TerminalSession {
  line = new TerminalLine();
  private state: TerminalState = { output: [], status: "idle", prompt: ">>>" };
  private anchor: { row: number; column: number } | null = null;
  private queue = Promise.resolve();
  private blocked = false;
  private lastCommand = "";
  private disposed = false;
  private inputRevision = 0;
  constructor(
    private terminal: Pick<
      Terminal,
      "write" | "buffer" | "cols" | "reset" | "focus"
    >,
    private actions: () => TerminalActions,
  ) {}
  dispose() {
    this.disposed = true;
  }
  private enqueue(task: () => Promise<void>) {
    this.queue = this.queue.then(async () => {
      if (!this.disposed) await task();
    });
    return this.queue;
  }
  private write(text: string) {
    return new Promise<void>((resolve) => this.terminal.write(text, resolve));
  }
  private position() {
    const buffer = this.terminal.buffer.active;
    return { row: buffer.baseY + buffer.cursorY, column: buffer.cursorX };
  }
  private async erasePrompt() {
    if (!this.anchor) return;
    if (this.anchor.row < this.terminal.buffer.active.baseY) {
      // A pasted block can be taller than the screen. Rebuild from committed output
      // instead of leaving old copies of the editable block in scrollback.
      this.terminal.reset();
      for (const entry of this.state.output)
        await this.writeOutput(entry.text, entry.channel);
      this.anchor = null;
      return;
    }
    const current = this.position();
    const row = Math.max(this.terminal.buffer.active.baseY, this.anchor.row);
    const delta = current.row - row;
    await this.write(
      (delta > 0 ? `\x1b[${delta}A` : delta < 0 ? `\x1b[${-delta}B` : "") +
        `\x1b[${this.anchor.column + 1}G\x1b[J`,
    );
    this.anchor = null;
  }
  private get busy() {
    return this.blocked || ["loading", "running", "paused", "finishing", "grading"].includes(this.state.status);
  }
  private async writeOutput(text: string, channel: string) {
    const color =
      channel === "stderr"
        ? "\x1b[38;2;243;161;141m"
        : channel === "command"
          ? "\x1b[38;2;146;213;255m"
          : "";
    if (text) await this.write(color + text + (color ? "\x1b[0m" : ""));
  }
  private async renderPrompt() {
    if (this.busy || this.disposed) return;
    this.anchor = this.position();
    const prompt =
      this.state.status === "input"
        ? ""
        : displayConsolePrompt(this.state.prompt) + " ";
    const chars = this.line.characters;
    await this.write(
      `\x1b[38;2;146;213;255m${prompt}\x1b[0m` +
        chars.slice(0, this.line.cursor).join(""),
    );
    if (this.position().column === this.terminal.cols) await this.write("\r\n");
    const caret = this.position();
    await this.write(chars.slice(this.line.cursor).join(""));
    const end = this.position();
    const delta = end.row - caret.row;
    await this.write(
      (delta > 0 ? `\x1b[${delta}A` : "") +
        `\x1b[${Math.min(caret.column, this.terminal.cols - 1) + 1}G\x1b[?25h`,
    );
  }
  update(next: TerminalState) {
    return this.enqueue(async () => {
      await this.erasePrompt();
      const previous = this.state;
      const extendsOutput =
        previous.output.length <= next.output.length &&
        previous.output.every((line, index) => {
          const current = next.output[index];
          return (
            current?.channel === line.channel &&
            (index === previous.output.length - 1
              ? current.text.startsWith(line.text)
              : current.text === line.text)
          );
        });
      if (!extendsOutput || !next.output.length) this.terminal.reset();
      for (
        let index = extendsOutput ? Math.max(0, previous.output.length - 1) : 0;
        index < next.output.length;
        index++
      ) {
        const entry = next.output[index];
        const text = entry.text.slice(
          extendsOutput ? (previous.output[index]?.text.length ?? 0) : 0,
        );
        if (!text) continue;
        await this.writeOutput(text, entry.channel);
      }
      this.state = next;
      this.blocked = false;
      if (
        next.status === "done" &&
        previous.status !== next.status &&
        next.prompt === "..."
      ) {
        this.line.set(
          (this.lastCommand.match(/^\s*/)?.[0] || "") +
            (this.lastCommand.trimEnd().endsWith(":") ? "    " : ""),
        );
      }
      if (next.status === "input" && previous.status !== "input") {
        this.line.set("");
        this.terminal.focus();
      }
      if (this.busy) await this.write("\x1b[?25l");
      else await this.renderPrompt();
    });
  }
  resize(fit: () => void) {
    return this.enqueue(async () => {
      await this.erasePrompt();
      fit();
      await this.renderPrompt();
    });
  }
  input(data: string) {
    const revision = ++this.inputRevision;
    return this.enqueue(async () => {
      if (data === "\x03") {
        await this.erasePrompt();
        this.line.set("");
        if (
          this.busy ||
          this.state.status === "input" ||
          this.state.prompt === "..."
        )
          this.actions().onStop();
        else {
          await this.write("^C\r\n");
          await this.renderPrompt();
        }
        return;
      }
      if (data === "\x0c") {
        this.actions().onClear();
        return;
      }
      if (this.busy) return;
      await this.erasePrompt();
      if (data === "\r" || data === "\x04") {
        if (data === "\x04" && this.state.status !== "input") {
          await this.renderPrompt();
          return;
        }
        const line = this.line.value;
        this.line.set("");
        this.blocked = true;
        if (this.state.status === "input")
          this.actions().onInput(data === "\x04" && !line ? null : line);
        else {
          this.line.set(line);
          this.line.remember();
          this.line.set("");
          this.lastCommand = line;
          this.actions().onCommand(
            this.state.prompt === "..." && !line.trim() ? "" : line,
          );
        }
        return;
      }
      if (data === "\x7f" || data === "\b") this.line.remove(true);
      else if (data === "\x1b[3~") this.line.remove(false);
      else if (data === "\x1b[D")
        this.line.cursor = Math.max(0, this.line.cursor - 1);
      else if (data === "\x1b[C")
        this.line.cursor = Math.min(
          this.line.characters.length,
          this.line.cursor + 1,
        );
      else if (["\x1b[H", "\x1bOH", "\x01"].includes(data))
        this.line.cursor = 0;
      else if (["\x1b[F", "\x1bOF", "\x05"].includes(data))
        this.line.cursor = this.line.characters.length;
      else if (data === "\x15") {
        this.line.set(this.line.characters.slice(this.line.cursor).join(""));
        this.line.cursor = 0;
      } else if (data === "\x0b")
        this.line.set(this.line.characters.slice(0, this.line.cursor).join(""));
      else if (data === "\x1b[A" && this.state.status !== "input")
        this.line.recall(1);
      else if (data === "\x1b[B" && this.state.status !== "input")
        this.line.recall(-1);
      else if (data === "\t") this.line.insert("    ");
      else if (!data.startsWith("\x1b")) {
        // Keep pasted control sequences from becoming terminal commands. Newlines stay editable.
        this.line.insert(data.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ""));
      }
      if (revision === this.inputRevision) await this.renderPrompt();
    });
  }
}
