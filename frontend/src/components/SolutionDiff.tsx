import { useMemo, useState } from "react";
import type { Language } from "../../../shared/types";
import { codeLines } from "../python-highlighting";
import { compareLines } from "../solution-diff";
import { CodeTokens } from "./CodeBlock";

function FileDiff({
  name,
  before,
  after,
  language,
}: {
  name: string;
  before: string;
  after: string;
  language: Language;
}) {
  const [limit, setLimit] = useState(300);
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const diff = useMemo(
    () => ({
      rows: compareLines(before, after),
      left: codeLines(before.replace(/\r\n/g, "\n"), name.endsWith(".py")),
      right: codeLines(after.replace(/\r\n/g, "\n"), name.endsWith(".py")),
    }),
    [name, before, after],
  );
  const removed = diff.rows.filter(
    (row) => row.left?.kind === "removed",
  ).length;
  const added = diff.rows.filter((row) => row.right?.kind === "added").length;
  return (
    <section className="file-diff" aria-label={name}>
      <header>
        <strong>{name}</strong>
        <span className="diff-counts">
          <span>−{removed}</span>
          <span>+{added}</span>
        </span>
      </header>
      {!removed && !added && (
        <p className="diff-identical">
          {tr("No differences", "Geen verschillen")}
        </p>
      )}
      <div
        className="diff-scroll"
        tabIndex={0}
        role="region"
        aria-label={tr("Code comparison", "Codevergelijking") + ": " + name}
      >
        <table className="diff-table">
          <thead>
            <tr>
              <th scope="col">{tr("Your code", "Jouw code")}</th>
              <th scope="col">
                {tr("Reference solution", "Voorbeeldoplossing")}
              </th>
            </tr>
          </thead>
          <tbody>
            {diff.rows.slice(0, limit).map((row, index) => (
              <tr key={index}>
                {(["left", "right"] as const).map((side) => {
                  const line = row[side];
                  return (
                    <td
                      key={side}
                      className={line ? `diff-${line.kind}` : "diff-empty"}
                    >
                      {line && (
                        <div className="diff-line">
                          <span className="diff-line-number" aria-hidden="true">
                            {line.number}
                          </span>
                          <span
                            className="diff-sign"
                            aria-label={
                              line.kind === "removed"
                                ? tr("Removed", "Verwijderd")
                                : line.kind === "added"
                                  ? tr("Added", "Toegevoegd")
                                  : undefined
                            }
                          >
                            {line.kind === "removed"
                              ? "−"
                              : line.kind === "added"
                                ? "+"
                                : " "}
                          </span>
                          <code>
                            <CodeTokens
                              tokens={diff[side][line.number - 1] || []}
                            />
                          </code>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {((before && !before.endsWith("\n")) ||
        (after && !after.endsWith("\n"))) && (
        <p className="diff-eof">
          {tr(
            "No newline at end of file:",
            "Geen regeleinde aan het einde van:",
          )}{" "}
          {before && !before.endsWith("\n") ? tr("your code", "jouw code") : ""}
          {before && !before.endsWith("\n") && after && !after.endsWith("\n")
            ? " · "
            : ""}
          {after && !after.endsWith("\n")
            ? tr("reference solution", "voorbeeldoplossing")
            : ""}
        </p>
      )}
      {diff.rows.length > limit && (
        <button onClick={() => setLimit((value) => value + 300)}>
          {tr("Show more lines", "Meer regels tonen")} (
          {diff.rows.length - limit})
        </button>
      )}
    </section>
  );
}

export function SolutionDiff({
  files,
  solution,
  language,
}: {
  files: Record<string, string>;
  solution: Record<string, string>;
  language: Language;
}) {
  const names = [...new Set([...Object.keys(solution), ...Object.keys(files)])];
  return (
    <div className="solution-comparison">
      {names.map((name) => (
        <FileDiff
          key={name}
          name={name}
          before={files[name] ?? ""}
          after={solution[name] ?? ""}
          language={language}
        />
      ))}
    </div>
  );
}
