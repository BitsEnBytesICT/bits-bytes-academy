// Editing is separate from Python execution: pasted text is never submitted automatically.
export class TerminalLine {
  value = "";
  cursor = 0;
  history: string[] = [];
  historyIndex = -1;
  draft = "";
  get characters() {
    return Array.from(this.value);
  }
  set(value: string) {
    this.value = value;
    this.cursor = this.characters.length;
  }
  insert(text: string) {
    const chars = this.characters;
    chars.splice(this.cursor, 0, ...Array.from(text.replace(/\r\n?/g, "\n")));
    this.cursor += Array.from(text.replace(/\r\n?/g, "\n")).length;
    this.value = chars.join("");
  }
  remove(backward: boolean) {
    const chars = this.characters;
    if (backward && this.cursor) chars.splice(--this.cursor, 1);
    else if (!backward) chars.splice(this.cursor, 1);
    this.value = chars.join("");
  }
  remember() {
    if (this.value.trim() && this.history.at(-1) !== this.value)
      this.history.push(this.value);
    this.history = this.history.slice(-100);
    this.historyIndex = -1;
    this.draft = "";
  }
  recall(direction: 1 | -1) {
    if (!this.history.length) return;
    if (this.historyIndex === -1) this.draft = this.value;
    this.historyIndex = Math.max(
      -1,
      Math.min(this.history.length - 1, this.historyIndex + direction),
    );
    this.set(
      this.historyIndex < 0
        ? this.draft
        : this.history[this.history.length - 1 - this.historyIndex],
    );
  }
}
