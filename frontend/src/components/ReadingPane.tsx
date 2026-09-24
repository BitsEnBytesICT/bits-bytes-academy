import { useState } from "react";
import type { Exercise, Language } from "../../../shared/types";
import { LessonText } from "./LessonText";
import { CodeBlock } from "./CodeBlock";
import { Icon } from "../Icon";

export function ReadingPane({
  activity,
  language,
  complete,
  onComplete,
}: {
  activity: Exercise;
  language: Language;
  complete: boolean;
  onComplete: () => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  return (
    <aside className="learning-pane">
      <div className="lesson-scroll structured-lesson">
        <div className="lesson-section-bar">
          <Icon name="book" size={16} />
          <span>{tr("Reading", "Leesles")}</span>
        </div>
        <article className="lesson-section-content">
          <h1>{activity.title[language]}</h1>
          <p className="lesson-estimate">{activity.estimatedMinutes} min</p>
          <LessonText text={activity.explanation[language]} />
          {activity.sections?.map((section, i) => (
            <section className="worked-example explanation" key={i}>
              <h2>{section.heading[language]}</h2>
              <LessonText text={section.body[language]} />
              {section.code !== undefined && <CodeBlock code={section.code} />}
            </section>
          ))}
          <button
            className="primary"
            disabled={saving || complete}
            onClick={async () => {
              setSaving(true);
              try {
                await onComplete();
              } finally {
                setSaving(false);
              }
            }}
          >
            {complete
              ? tr("Reading complete", "Leesles afgerond")
              : saving
                ? tr("Saving…", "Opslaan…")
                : tr("Mark reading complete", "Markeer leesles als afgerond")}
          </button>
        </article>
      </div>
    </aside>
  );
}
