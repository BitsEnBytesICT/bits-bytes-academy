import { useState } from "react";
import type { Language, LessonSection } from "../../../shared/types";
import { CodeBlock } from "./CodeBlock";
import { InlineLessonText, LessonText } from "./LessonText";

export function WorkedExample({
  section,
  language,
}: {
  section: LessonSection;
  language: Language;
}) {
  const [revealed, setRevealed] = useState(false);
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  return (
    <section className="worked-example explanation">
      <h2>
        <InlineLessonText text={section.heading[language]} />
      </h2>
      <LessonText text={section.body[language]} />
      {section.exampleInputs && (
        <p className="example-inputs">
          <strong>
            {tr(
              "Example answers, in order:",
              "Voorbeeldantwoorden, op volgorde:",
            )}
          </strong>{" "}
          {section.exampleInputs.map((value, i) => (
            <span key={i}>
              {i > 0 ? " → " : ""}
              <code>{JSON.stringify(value)}</code>
            </span>
          ))}
        </p>
      )}
      {section.exampleFiles && (
        <details className="example-fixtures">
          <summary>
            {tr("Files used by this example", "Bestanden voor dit voorbeeld")}
          </summary>
          {Object.entries(section.exampleFiles).map(([name, contents]) => (
            <div key={name}>
              <strong>{name}</strong>
              <pre>
                <code>{contents}</code>
              </pre>
            </div>
          ))}
        </details>
      )}
      {section.code !== undefined && (
        <CodeBlock className="example-code" code={section.code} />
      )}
      {section.prediction && (
        <div className="prediction-prompt">
          <LessonText text={section.prediction[language]} />
          {section.output !== undefined && (
            <button
              className="secondary"
              onClick={() => setRevealed((v) => !v)}
              aria-expanded={revealed}
            >
              {revealed
                ? tr("Hide output", "Verberg uitvoer")
                : tr("Reveal output", "Toon uitvoer")}
            </button>
          )}
        </div>
      )}
      {section.output !== undefined && (!section.prediction || revealed) && (
        <div className="example-result">
          <span>{tr("Output", "Uitvoer")}</span>
          <pre>
            <code>{section.output || tr("(No output)", "(Geen uitvoer)")}</code>
          </pre>
        </div>
      )}
      {section.takeaway && <LessonText text={section.takeaway[language]} />}
    </section>
  );
}
