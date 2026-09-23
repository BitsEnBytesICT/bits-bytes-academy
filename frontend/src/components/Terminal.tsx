import { useEffect, useRef } from "react";
import type { Terminal as XTerminal } from "@xterm/xterm";
import type { Language } from "../../../shared/types";
import { Icon } from "../Icon";
import {
  TerminalSession,
  type TerminalActions,
  type TerminalState,
} from "../terminal-session";
import "@xterm/xterm/css/xterm.css";

export type OutputLine = { text: string; channel: string };
type Props = TerminalState & TerminalActions & { language: Language };

export function Terminal(props: Props) {
  const { status, language, onClear, onStop } = props;
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  const session = useRef<TerminalSession | null>(null);
  const terminal = useRef<XTerminal | null>(null);
  latest.current = props;
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const busy = ["loading", "running", "input"].includes(status);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("@xterm/xterm"), import("@xterm/addon-fit")]).then(
      ([{ Terminal: Xterm }, { FitAddon }]) => {
        if (disposed || !host.current) return;
        const term = new Xterm({
          fontFamily: 'Consolas, "Courier New", monospace',
          fontSize: 12,
          lineHeight: 1.85,
          cursorBlink: true,
          cursorStyle: "block",
          convertEol: true,
          scrollback: 5000,
          screenReaderMode: true,
          theme: {
            background: "#183345",
            foreground: "#d8e7ef",
            cursor: "#92d5ff",
            cursorAccent: "#183345",
            selectionBackground: "#436c85",
            selectionInactiveBackground: "#37566b",
          },
        });
        const fit = new FitAddon();
        term.loadAddon(fit);
        term.open(host.current);
        fit.fit();
        terminal.current = term;
        const controller = new TerminalSession(term, () => latest.current);
        session.current = controller;
        if (term.textarea) {
          term.textarea.disabled = true;
          term.textarea.setAttribute(
            "aria-label",
            latest.current.language === "nl"
              ? "Python-terminal"
              : "Python terminal",
          );
          term.textarea.setAttribute("autocomplete", "off");
        }
        const input = term.onData((data) => {
          void controller.input(data);
        });
        term.attachCustomKeyEventHandler((event) => {
          if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "c" &&
            term.hasSelection()
          )
            return false;
          return true;
        });
        const copyOrInterrupt = (event: ClipboardEvent) => {
          if (
            host.current?.contains(document.activeElement) &&
            !term.hasSelection() &&
            !window.getSelection()?.toString() &&
            (["loading", "running", "input"].includes(latest.current.status) ||
              latest.current.prompt === "...")
          ) {
            event.preventDefault();
            void controller.input("\x03");
          }
        };
        document.addEventListener("copy", copyOrInterrupt);
        const resize = new ResizeObserver(() => {
          if (host.current?.clientWidth && host.current.clientHeight)
            void controller.resize(() => fit.fit());
        });
        resize.observe(host.current);
        void controller.update(latest.current).then(() => {
          if (!disposed && term.textarea) term.textarea.disabled = false;
        });
        cleanup = () => {
          document.removeEventListener("copy", copyOrInterrupt);
          resize.disconnect();
          input.dispose();
          controller.dispose();
          term.dispose();
          session.current = null;
          terminal.current = null;
        };
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  useEffect(() => {
    void session.current?.update(props);
  }, [props.output, props.status, props.prompt]);
  useEffect(() => {
    terminal.current?.textarea?.setAttribute(
      "aria-label",
      tr(
        status === "input" ? "Python input" : "Python terminal",
        status === "input" ? "Python-invoer" : "Python-terminal",
      ),
    );
  }, [language, status]);

  return (
    <section className="terminal-pane">
      <div className="terminal-header">
        <span>
          <Icon name="terminal" size={17} />
          Terminal
          {status === "loading" && (
            <span className="terminal-runtime-status" role="status">
              {tr("Starting…", "Starten…")}
            </span>
          )}
        </span>
        <div className="terminal-actions">
          {busy && <button onClick={onStop}>Stop</button>}
          <button onClick={onClear}>{tr("Clear", "Wissen")}</button>
          <details className="terminal-help">
            <summary aria-label={tr("Terminal help", "Terminalhulp")}>
              ?
            </summary>
            <div>
              <p>
                {tr(
                  "Type Python or use these workspace commands:",
                  "Typ Python of gebruik deze werkruimtecommando’s:",
                )}
              </p>
              <code>
                python main.py · /run
                <br />
                ls · dir · pwd · cat filename
                <br />
                clear · cls · /reset · /help
              </code>
              <p>
                {tr(
                  "Enter runs your command. Finish a Python block with an empty line. ↑/↓ recall commands; ←/→ and Home/End edit them. Tab inserts indentation. Pasted code stays editable until Enter.",
                  "Enter voert je commando uit. Sluit een Python-blok af met een lege regel. ↑/↓ halen commando’s terug; ←/→ en Home/End bewerken ze. Tab voegt inspringing toe. Geplakte code blijft bewerkbaar tot Enter.",
                )}
              </p>
              <p>
                {tr(
                  "Ctrl+C stops, Ctrl+L clears the screen, Ctrl+D ends program input. These commands work with your lesson files.",
                  "Ctrl+C stopt, Ctrl+L wist het scherm, Ctrl+D beëindigt programma-invoer. Deze commando’s werken met je lesbestanden.",
                )}
              </p>
            </div>
          </details>
        </div>
      </div>
      <div className="terminal-screen" ref={host} />
    </section>
  );
}
