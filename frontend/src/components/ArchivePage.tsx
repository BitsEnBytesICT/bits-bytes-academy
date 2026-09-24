import { useEffect, useState } from "react";
import type {
  Language,
  Localized,
  Progress,
  Workspace,
} from "../../../shared/types";
import { api } from "../api";
import { CodeBlock } from "./CodeBlock";

type Entry = { id: string; title: Localized; kind: string; progress: Progress };
type Detail = Entry & { workspace: Workspace | null };
export function ArchivePage({
  language,
  id,
  onOpen,
  onBack,
}: {
  language: Language;
  id?: string;
  onOpen: (id: string) => void;
  onBack: () => void;
}) {
  const [entries, setEntries] = useState<Entry[]>([]),
    [detail, setDetail] = useState<Detail | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [file, setFile] = useState("main.py");
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setDetail(null);
    void (async () => {
      try {
        if (id) {
          const value = await api<Detail>("/archive/" + encodeURIComponent(id));
          if (!cancelled) {
            setDetail(value);
            setFile(Object.keys(value.workspace?.files || {})[0] || "main.py");
          }
        } else {
          const values = await api<Entry[]>("/archive");
          if (!cancelled) setEntries(values);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);
  return (
    <main className="catalog-page archive-page">
      <button className="text-button" onClick={onBack}>
        {tr("Back", "Terug")}
      </button>
      <h1>
        {tr(
          "Saved work from the original course",
          "Opgeslagen werk uit de oorspronkelijke cursus",
        )}
      </h1>
      <p>
        {tr(
          "Your previous files and results are preserved here. They do not count toward the new learning paths. Export a backup from Manage learning data to keep a separate copy.",
          "Je eerdere bestanden en resultaten blijven hier bewaard. Ze tellen niet mee voor de nieuwe leerpaden. Exporteer via Beheer leergegevens een back-up voor een afzonderlijke kopie.",
        )}
      </p>
      {loading ? (
        <p role="status">
          {tr("Opening saved work…", "Opgeslagen werk openen…")}
        </p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : detail ? (
        <section>
          <h2>{detail.title[language]}</h2>
          <p>
            {detail.progress?.complete
              ? tr("Completed", "Afgerond")
              : tr("Not completed", "Niet afgerond")}
            {detail.progress?.best !== undefined
              ? ` · ${detail.progress.best}%`
              : ""}
          </p>
          <div className="archive-files">
            {Object.keys(detail.workspace?.files || {}).map((name) => (
              <button
                className={file === name ? "selected" : ""}
                aria-pressed={file === name}
                onClick={() => setFile(name)}
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
          {detail.workspace?.files[file] !== undefined ? (
            <CodeBlock code={detail.workspace.files[file]} />
          ) : (
            <p>
              {tr(
                "No code files were saved for this activity.",
                "Voor deze activiteit zijn geen codebestanden opgeslagen.",
              )}
            </p>
          )}
        </section>
      ) : entries.length ? (
        <div className="overview-activities">
          {entries.map((entry) => (
            <button key={entry.id} onClick={() => onOpen(entry.id)}>
              <span>{entry.progress.complete ? "✓" : "○"}</span>
              <span>{entry.title[language]}</span>
            </button>
          ))}
        </div>
      ) : (
        <p>
          {tr(
            "No saved activities from the original course were found.",
            "Er zijn geen opgeslagen activiteiten uit de oorspronkelijke cursus gevonden.",
          )}
        </p>
      )}
    </main>
  );
}
