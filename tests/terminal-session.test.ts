import test from "node:test";
import assert from "node:assert/strict";
import headless from "@xterm/headless";
import { TerminalSession } from "../frontend/src/terminal-session.ts";

function setup(cols = 40) {
  const term = new headless.Terminal({
    cols,
    rows: 16,
    convertEol: true,
    allowProposedApi: true,
  });
  const commands: string[] = [],
    inputs: (string | null)[] = [];
  let stops = 0;
  const controller = new TerminalSession(
    {
      write: term.write.bind(term),
      get buffer() {
        return term.buffer;
      },
      get cols() {
        return term.cols;
      },
      reset: term.reset.bind(term),
      focus: () => {},
    } as any,
    () => ({
      onCommand: (line) => commands.push(line),
      onInput: (line) => inputs.push(line),
      onClear: () => {},
      onStop: () => {
        stops++;
      },
    }),
  );
  const screen = () =>
    Array.from(
      { length: term.buffer.active.length },
      (_, i) => term.buffer.active.getLine(i)?.translateToString(true) ?? "",
    )
      .join("\n")
      .trimEnd();
  return { term, controller, commands, inputs, screen, stops: () => stops };
}

test("Multiline indentation is prepared only after a command finishes", async () => {
  const { term, controller } = setup();
  try {
    await controller.update({ output: [], status: "idle", prompt: ">>>" });
    await controller.input("def f():");
    await controller.input("\r");
    const output = [{ text: "> def f():\n", channel: "command" }];
    await controller.update({ output, status: "loading", prompt: ">>>" });
    await controller.update({ output, status: "done", prompt: "..." });
    assert.equal(controller.line.value, "    ");
    await controller.input("return 3");
    await controller.input("\r");
    await controller.update({ output, status: "loading", prompt: "..." });
    assert.equal(controller.line.value, "");
    await controller.update({ output, status: "done", prompt: "..." });
    assert.equal(controller.line.value, "    ");
    await controller.input("\r");
    await controller.update({ output, status: "loading", prompt: "..." });
    await controller.update({ output, status: "done", prompt: ">>>" });
    assert.equal(controller.line.value, "");
  } finally {
    controller.dispose();
    term.dispose();
  }
});

test("Long pasted input is not duplicated in scrollback and survives resize", async () => {
  const { term, controller, screen } = setup(12);
  try {
    await controller.update({
      output: [{ text: "ready\n", channel: "stdout" }],
      status: "done",
      prompt: ">>>",
    });
    const text = Array.from({ length: 20 }, (_, i) => `line${i}`).join("\n");
    await controller.input(text);
    await controller.input("!");
    assert.equal(screen().match(/line0\b/g)?.length, 1);
    await controller.resize(() => term.resize(20, 16));
    assert.equal(controller.line.value, text + "!");
    assert.equal(screen().match(/line0\b/g)?.length, 1);
  } finally {
    controller.dispose();
    term.dispose();
  }
});

test("Terminal edits wrapped Unicode input at the actual rendered cursor", async () => {
  const { term, controller, commands, screen } = setup(12);
  try {
    await controller.update({ output: [], status: "idle", prompt: ">>>" });
    await controller.input("abcdefghijklmnop");
    await controller.input("\x1b[D");
    await controller.input("\x7f");
    await controller.input("界");
    assert.equal(controller.line.value, "abcdefghijklmn界p");
    assert.equal(screen().replace(/\n/g, ""), "> abcdefghijklmn界p");
    await controller.input("\r");
    assert.deepEqual(commands, ["abcdefghijklmn界p"]);
    await controller.update({
      output: [
        { text: "> abcdefghijklmn界p\n", channel: "command" },
        { text: "ok\n", channel: "stdout" },
      ],
      status: "done",
      prompt: ">>>",
    });
    assert(screen().endsWith("ok\n>"));
  } finally {
    controller.dispose();
    term.dispose();
  }
});

test("Terminal handles partial output, carriage returns, ANSI, input, EOF and interruption", async () => {
  const { term, controller, inputs, screen, stops } = setup();
  try {
    await controller.update({
      output: [{ text: "Loading 10%", channel: "stdout" }],
      status: "running",
      prompt: ">>>",
    });
    await controller.update({
      output: [
        {
          text: "Loading 10%\rLoading 90%\n\x1b[32mName: \x1b[0m",
          channel: "stdout",
        },
      ],
      status: "input",
      prompt: ">>>",
    });
    assert.equal(screen(), "Loading 90%\nName:");
    await controller.input("hé🐍");
    await controller.input("\r");
    assert.deepEqual(inputs, ["hé🐍"]);
    await controller.update({ output: [], status: "input", prompt: ">>>" });
    await controller.input("\r");
    assert.equal(inputs.at(-1), "");
    await controller.update({ output: [], status: "input", prompt: ">>>" });
    await controller.input("\x04");
    assert.equal(inputs.at(-1), null);
    await controller.update({ output: [], status: "running", prompt: ">>>" });
    await controller.input("\x03");
    assert.equal(stops(), 1);
  } finally {
    controller.dispose();
    term.dispose();
  }
});

test("Terminal stages pasted blocks and coalesces rapid keystrokes without losing commands", async () => {
  const { term, controller, commands, screen } = setup();
  try {
    await controller.update({ output: [], status: "idle", prompt: ">>>" });
    await Promise.all([..."print(42)"].map((char) => controller.input(char)));
    assert.equal(screen(), "> print(42)");
    await controller.input("\r");
    assert.equal(commands[0], "print(42)");
    await controller.update({ output: [], status: "done", prompt: ">>>" });
    await controller.input("def f():\r\n    return 3\r\n");
    assert.equal(commands.length, 1);
    await controller.input("\r");
    assert.equal(commands[1], "def f():\n    return 3\n");
    await controller.update({ output: [], status: "done", prompt: ">>>" });
    await controller.input("\x1b[A");
    assert.equal(controller.line.value, commands[1]);
  } finally {
    controller.dispose();
    term.dispose();
  }
});
