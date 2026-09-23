import type {
  Activity,
  Course,
  Language,
  Progress,
} from "../../../shared/types";
import { Icon } from "../Icon";
import { CodeBlock } from "./CodeBlock";
import { InlineLessonText, LessonText } from "./LessonText";
import { LayeredHints } from "./LayeredHints";
export function LessonPane({
  activity,
  course,
  language,
  progress,
  results,
}: {
  activity: Activity;
  course: Course;
  language: Language;
  progress: Progress;
  results: Record<string, boolean>;
}) {
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const group = course.groups.find((group) =>
    group.activityIds.includes(activity.id),
  );
  const chapter = course.chapters.find(
    (chapter) => chapter.number === activity.chapter,
  )!;
  const title = (group?.title || chapter.title)[language];
  const exercise = activity.kind === "quiz" ? null : activity;
  return (
    <aside className="learning-pane">
      <div className="lesson-scroll structured-lesson" key={activity.id}>
        <div className="lesson-section-bar">
          <Icon name="book" size={16} />
          <span>{tr("Learn", "Leren")}</span>
        </div>
        <section className="lesson-section-content">
          <div className="lesson-kicker">{title.toUpperCase()}</div>
          <h1>{activity.title[language]}</h1>
          <p className="lesson-estimate">
            {activity.estimatedMinutes} min
            {activity.optional ? " · " + tr("Optional", "Optioneel") : ""}
          </p>
          {exercise ? (
            <>
              <div className="explanation">
                <LessonText text={exercise.explanation[language]} />
              </div>
              {exercise.example && (
                <CodeBlock className="example-code" code={exercise.example} />
              )}
              {exercise.sections?.map((section, index) => (
                <section className="worked-example explanation" key={index}>
                  <h2>
                    <InlineLessonText text={section.heading[language]} />
                  </h2>
                  <LessonText text={section.body[language]} />
                  {section.code !== undefined && (
                    <CodeBlock className="example-code" code={section.code} />
                  )}
                  {section.output !== undefined && (
                    <div className="example-result">
                      <span>{tr("Output", "Output")}</span>
                      <pre>
                        <code>
                          {section.output || tr("(No output)", "(Geen output)")}
                        </code>
                      </pre>
                    </div>
                  )}
                  {section.takeaway && (
                    <LessonText text={section.takeaway[language]} />
                  )}
                </section>
              ))}
            </>
          ) : (
            <div className="explanation">
              <p>
                {tr(
                  "Answer each question and learn from the feedback. For code blanks, choose tokens and check your answer. Review your results and try again whenever you like.",
                  "Beantwoord elke vraag en leer van de feedback. Kies bij invulcode de codeblokjes en controleer je antwoord. Bekijk je resultaat en probeer het gerust opnieuw.",
                )}
              </p>
            </div>
          )}
        </section>
        {exercise && (
          <>
            <div className="lesson-section-bar instructions-heading">
              <Icon name="check" size={16} />
              <h2>{tr("Instructions", "Instructies")}</h2>
              {exercise.checkpoints.length > 0 && (
                <span>
                  {
                    exercise.checkpoints.filter(
                      (c) =>
                        results[c.id] ??
                        (progress.checkpoints || []).includes(c.id),
                    ).length
                  }{" "}
                  / {exercise.checkpoints.length}
                </span>
              )}
            </div>
            <section className="lesson-section-content lesson-tasks">
              {exercise.checkpoints.length ? (
                exercise.checkpoints.map((c, i) => {
                  const passed =
                      results[c.id] ??
                      (progress.checkpoints || []).includes(c.id),
                    failed = results[c.id] === false;
                  return (
                    <div
                      className={
                        "checkpoint " +
                        (passed ? "passed" : failed ? "failed" : "")
                      }
                      key={c.id}
                    >
                      <div className="checkpoint-title">
                        <span>
                          {passed ? <Icon name="check" size={13} /> : i + 1}
                        </span>
                        <p>
                          <InlineLessonText text={c.task[language]} />
                        </p>
                      </div>
                      <LayeredHints
                        hints={c.hints || [c.hint]}
                        language={language}
                      />
                      {failed && !passed && (
                        <p className="check-message">
                          {c.feedback ? (
                            <InlineLessonText text={c.feedback[language]} />
                          ) : (
                            tr(
                              "Not passed yet. Check the task and try again.",
                              "Nog niet geslaagd. Controleer de opdracht en probeer opnieuw.",
                            )
                          )}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="reading-note">
                  {tr(
                    "Run the example, experiment with the code, then continue when you are ready.",
                    "Voer het voorbeeld uit, experimenteer met de code en ga verder zodra je klaar bent.",
                  )}
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </aside>
  );
}
