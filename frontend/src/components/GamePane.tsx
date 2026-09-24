import type { ComponentProps, RefObject } from "react";
import { Terminal } from "./Terminal";

type Props = ComponentProps<typeof Terminal> & {
  previewRef: RefObject<HTMLDivElement | null>;
  project: boolean;
  previewRunning: boolean;
  onFinish: () => void;
  onResume: () => void;
};

export function GamePane({
  previewRef,
  project,
  previewRunning,
  onFinish,
  onResume,
  ...terminal
}: Props) {
  const tr = (en: string, nl: string) => (terminal.language === "nl" ? nl : en);
  const canFinish =
    previewRunning && ["running", "paused", "input"].includes(terminal.status);
  return (
    <section
      className="terminal-pane game-pane"
      aria-label={tr("Game and terminal", "Spel en terminal")}
    >
      <div className="terminal-header game-header">
        <span>{tr("Game preview", "Spelvoorbeeld")}</span>
        <button onClick={onFinish} disabled={!canFinish}>
          {project
            ? tr("Close preview", "Voorbeeld sluiten")
            : tr("Finish & check", "Afronden en controleren")}
        </button>
      </div>
      <div className="game-preview-wrap">
        <div className="game-preview-host" ref={previewRef} />
        {terminal.status === "idle" && (
          <p className="game-placeholder">
            {tr(
              "Run your code to open the preview.",
              "Voer je code uit om het voorbeeld te openen.",
            )}
          </p>
        )}
        {terminal.status === "loading" && (
          <p className="game-placeholder" role="status">
            {tr("Opening the game…", "Het spel wordt geopend…")}
          </p>
        )}
        {terminal.status === "paused" && (
          <button className="game-resume" onClick={onResume}>
            {tr("Resume preview", "Voorbeeld hervatten")}
          </button>
        )}
      </div>
      <p className="game-help">
        {terminal.status === "grading"
          ? tr("Checking your exercise…", "Je opdracht wordt gecontroleerd…")
          : terminal.status === "finishing"
            ? tr(
                "Waiting for the game to close…",
                "Wachten tot het spel sluit…",
              )
            : project
              ? tr(
                  "Click the preview to use the keyboard. Close preview exits normally; Stop interrupts.",
                  "Klik op het voorbeeld om het toetsenbord te gebruiken. Voorbeeld sluiten sluit normaal af; Stop onderbreekt.",
                )
              : tr(
                  "Click the preview to use the keyboard. Finish closes it normally; Stop interrupts.",
                  "Klik op het voorbeeld om het toetsenbord te gebruiken. Afronden sluit normaal af; Stop onderbreekt.",
                )}
      </p>
      <Terminal {...terminal} />
    </section>
  );
}
