import type {
  Activity,
  Course,
  Language,
  Progress,
} from "../../../shared/types";
import { Icon } from "../Icon";
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
                {exercise.explanation[language].split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {exercise.example && (
                <pre className="example-code">{exercise.example}</pre>
              )}
            </>
          ) : (
            <div className="explanation">
              <p>
                {tr(
                  "Choose an answer to get immediate feedback. Review your results and try again whenever you like.",
                  "Kies een antwoord voor directe feedback. Bekijk je resultaat en probeer het gerust opnieuw.",
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
                  {Object.keys(results).length
                    ? Object.values(results).filter(Boolean).length
                    : (progress.checkpoints || []).length}{" "}
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
                        <p>{c.task[language]}</p>
                      </div>
                      <details>
                        <summary>
                          <Icon name="hint" size={14} />
                          {tr("Need a hint?", "Een hint nodig?")}
                        </summary>
                        <p>{c.hint[language]}</p>
                      </details>
                      {failed && !passed && (
                        <p className="check-message">
                          {tr(
                            "Not passed yet. Check the task and try again.",
                            "Nog niet geslaagd. Controleer de opdracht en probeer opnieuw.",
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
