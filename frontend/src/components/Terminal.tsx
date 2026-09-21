import { useEffect, useRef, useState } from "react";
import type { Language } from "../../../shared/types";
import { Icon } from "../Icon";
import { displayConsolePrompt } from "../console-prompt";
export type OutputLine = { text: string; channel: string };
export function Terminal({
  output,
  status,
  prompt,
  language,
  onCommand,
  onInput,
  onStop,
  onClear,
}: {
  output: OutputLine[];
  status: string;
  prompt: string;
  language: Language;
  onCommand: (line: string) => void;
  onInput: (line: string | null) => void;
  onStop: () => void;
  onClear: () => void;
}) {
  const [value, setValue] = useState(""),
    [history, setHistory] = useState<string[]>([]),
    [cursor, setCursor] = useState(-1);
  const body = useRef<HTMLDivElement>(null),
    field = useRef<HTMLTextAreaElement>(null),
    last = useRef(""),
    restoreFocus = useRef(false),
    draft = useRef("");
  const waiting = status === "input",
    busy = ["loading", "running"].includes(status),
    tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [output, status, prompt]);
  useEffect(() => {
    const canInterrupt = () =>
      (busy || waiting || prompt === "...") &&
      !window.getSelection()?.toString();
    const interruptSession = (event: Event) => {
      event.preventDefault();
      onStop();
      setValue("");
    };
    const interrupt = (event: KeyboardEvent) => {
      if (
        !event.defaultPrevented &&
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "c" &&
        canInterrupt()
      ) {
        interruptSession(event);
      }
    };
    // Embedded browsers may dispatch their Copy command instead of keydown.
    // Preserve ordinary copying whenever the learner has selected text.
    const copy = (event: ClipboardEvent) => {
      if (!event.defaultPrevented && canInterrupt()) interruptSession(event);
    };
    document.addEventListener("keydown", interrupt);
    document.addEventListener("copy", copy);
    return () => {
      document.removeEventListener("keydown", interrupt);
      document.removeEventListener("copy", copy);
    };
  }, [busy, waiting, prompt, onStop]);
  useEffect(() => {
    if (waiting) {
      setValue("");
      field.current?.focus();
    } else if (!busy && restoreFocus.current) {
      restoreFocus.current = false;
      setValue(
        prompt === "..."
          ? (last.current.match(/^\s*/)?.[0] || "") +
              (last.current.trimEnd().endsWith(":") ? "    " : "")
          : "",
      );
      field.current?.focus();
    }
  }, [status, prompt]);
  const submit = () => {
    if (busy) return;
    const line = prompt === "..." && !value.trim() ? "" : value;
    setValue("");
    if (waiting) {
      onInput(line);
      return;
    }
    last.current = line;
    restoreFocus.current = true;
    setCursor(-1);
    if (line.trim())
      setHistory((h) => [...h.filter((_, i) => i >= h.length - 99), line]);
    onCommand(line);
  };
  return (
    <section className="terminal-pane">
      <div className="terminal-header">
        <span>
          <Icon name="terminal" size={17} />
          Terminal
        </span>
        <div className="terminal-actions">
          {(busy || waiting) && (
            <button onClick={onStop}>{tr("Stop", "Stop")}</button>
          )}
          <button onClick={onClear}>{tr("Clear", "Wissen")}</button>
          <details className="terminal-help">
            <summary aria-label={tr("Terminal help", "Terminalhulp")}>
              ?
            </summary>
            <div>
              <p>
                {tr(
                  "Type Python or use these commands:",
                  "Typ Python of gebruik deze commando’s:",
                )}
              </p>
              <code>
                python main.py · /run
                <br />
                /clear · /reset
              </code>
              <p>
                {tr(
                  "Enter submits a line. Finish a multiline block with an empty line. ↑/↓ browse history. Ctrl+C stops; Ctrl+D ends program input.",
                  "Enter verstuurt een regel. Sluit een blok af met een lege regel. ↑/↓ bladeren door commando’s. Ctrl+C stopt; Ctrl+D beëindigt programma-invoer.",
                )}
              </p>
            </div>
          </details>
        </div>
      </div>
      <div className="terminal-body" ref={body}>
        <div aria-live="polite" aria-label="Python output">
          {output.map((line, i) => (
            <span
              key={i}
              className={
                line.channel === "stderr"
                  ? "stderr"
                  : line.channel === "command"
                    ? "terminal-command"
                    : ""
              }
            >
              {line.text}
            </span>
          ))}
        </div>
        {status === "loading" && (
          <p className="terminal-status">
            {tr("Starting Python…", "Python starten…")}
          </p>
        )}
        {status === "running" && (
          <p className="terminal-status">{tr("Running…", "Bezig…")}</p>
        )}
        <form
          className="input-prompt console-prompt"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <span aria-hidden="true">
            {waiting ? "" : displayConsolePrompt(prompt)}
          </span>
          <textarea
            ref={field}
            rows={Math.min(6, value.split("\n").length)}
            aria-label={
              waiting
                ? tr("Python input", "Python-invoer")
                : tr("Python console", "Python-console")
            }
            spellCheck={false}
            value={value}
            disabled={busy}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === "c" &&
                !window.getSelection()?.toString()
              ) {
                e.preventDefault();
                if (busy || waiting || prompt === "...") onStop();
                setValue("");
              } else if (
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === "d"
              ) {
                e.preventDefault();
                if (waiting) onInput(null);
              } else if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              } else if (
                !waiting &&
                !busy &&
                !value.includes("\n") &&
                ["ArrowUp", "ArrowDown"].includes(e.key) &&
                history.length
              ) {
                e.preventDefault();
                if (cursor === -1) draft.current = value;
                const next =
                  e.key === "ArrowUp"
                    ? Math.min(history.length - 1, cursor + 1)
                    : Math.max(-1, cursor - 1);
                setCursor(next);
                setValue(
                  next < 0 ? draft.current : history[history.length - 1 - next],
                );
              }
            }}
          />
          <button
            type="submit"
            disabled={busy}
            aria-label={
              waiting
                ? tr("Send input", "Verstuur invoer")
                : tr("Submit command", "Voer commando uit")
            }
          >
            ↵
          </button>
        </form>
      </div>
    </section>
  );
}
