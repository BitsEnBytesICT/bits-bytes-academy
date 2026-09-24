import { useState } from "react";
import type { Course, Exercise, Language } from "../../../shared/types";
import { RetrievalPrompts } from "./RetrievalPrompts";
import { LessonText } from "./LessonText";
import { CodeBlock } from "./CodeBlock";
import { Icon } from "../Icon";

export function ReadingPane({
  activity,
  course,
  language,
  complete,
  onComplete,
}: {
  activity: Exercise;
  course: Course;
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
          <RetrievalPrompts
            activity={activity}
            course={course}
            language={language}
          />
          {activity.sections?.map((section, i) => (
            <section className="worked-example explanation" key={i}>
              <h2>{section.heading[language]}</h2>
              <LessonText text={section.body[language]} />
              {section.code !== undefined &&
                (section.codeLanguage === "shell" ? (
                  <div>
                    <small>{tr("Terminal command", "Terminalcommando")}</small>
                    <pre className="python-code">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                ) : (
                  <CodeBlock code={section.code} />
                ))}
              {section.callout && (
                <aside className="lesson-callout">
                  <h3>{section.callout.title[language]}</h3>
                  <LessonText text={section.callout.body[language]} />
                </aside>
              )}
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
