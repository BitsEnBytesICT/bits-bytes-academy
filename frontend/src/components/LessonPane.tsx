import type {
  Activity,
  Course,
  Language,
  Progress,
} from "../../../shared/types";
import { Icon } from "../Icon";
import { CodeBlock } from "./CodeBlock";
import { InlineLessonText, LessonText } from "./LessonText";
import { WorkedExample } from "./WorkedExample";
import { LayeredHints } from "./LayeredHints";
import { RetrievalPrompts } from "./RetrievalPrompts";
import { instructionView } from "../lesson-progress";
export function LessonPane({
  activity,
  course,
  language,
  progress,
  results,
  checkedStep,
}: {
  activity: Activity;
  course: Course;
  language: Language;
  progress: Progress;
  results: Record<string, boolean>;
  checkedStep?: string;
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
  const instructions = exercise
    ? instructionView(
        exercise.checkpoints,
        progress,
        results,
        exercise.checkpointMode,
        checkedStep,
      )
    : null;
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
              {exercise.sections
                ?.filter((section) => section.role !== "experiment")
                .map((section, index) => (
                  <WorkedExample
                    key={index}
                    section={section}
                    language={language}
                  />
                ))}
              <RetrievalPrompts
                activity={exercise}
                course={course}
                language={language}
              />
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
                  {instructions!.steps.filter((c) => c.passed).length} /{" "}
                  {exercise.checkpoints.length}
                </span>
              )}
            </div>
            <section className="lesson-section-content lesson-tasks">
              {instructions?.reviewing && (
                <div className="instruction-review" role="status">
                  <strong>
                    {tr(
                      "Check the complete program",
                      "Controleer het hele programma",
                    )}
                  </strong>
                  <p>
                    {instructions.reviewId
                      ? tr(
                          `You completed the steps, but your latest edits changed instruction ${exercise.checkpoints.findIndex((c) => c.id === instructions.reviewId) + 1}. Review that instruction and run again.`,
                          `Je hebt de stappen afgerond, maar je laatste wijzigingen hebben instructie ${exercise.checkpoints.findIndex((c) => c.id === instructions.reviewId) + 1} veranderd. Bekijk die instructie en voer opnieuw uit.`,
                        )
                      : tr(
                          "All steps have been practised. Run your program to check that everything works together.",
                          "Alle stappen zijn geoefend. Voer je programma uit om te controleren of alles samen werkt.",
                        )}
                  </p>
                  {instructions.reviewId && (
                    <InlineLessonText
                      text={
                        exercise.checkpoints.find(
                          (c) => c.id === instructions.reviewId,
                        )!.feedback?.[language] ||
                        exercise.checkpoints.find(
                          (c) => c.id === instructions.reviewId,
                        )!.task[language]
                      }
                    />
                  )}
                </div>
              )}
              {exercise.checkpoints.length ? (
                exercise.checkpoints.map((c, i) => {
                  const { passed, failed, locked, active } =
                    instructions!.steps[i];
                  return (
                    <div
                      className={
                        "checkpoint " +
                        (passed
                          ? "passed"
                          : failed
                            ? "failed"
                            : locked
                              ? "locked"
                              : active
                                ? "active"
                                : "")
                      }
                      key={c.id}
                    >
                      <div className="checkpoint-title">
                        <span>
                          {passed ? (
                            <Icon name="check" size={13} />
                          ) : locked ? (
                            <Icon name="lock" size={13} />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <p>
                          <InlineLessonText text={c.task[language]} />
                        </p>
                      </div>
                      {locked && (
                        <p className="checkpoint-status">
                          {tr(
                            "Unlocks after the previous instruction",
                            "Beschikbaar na de vorige instructie",
                          )}
                        </p>
                      )}
                      {active && (
                        <p className="checkpoint-status">
                          {tr("Current instruction", "Huidige instructie")}
                        </p>
                      )}
                      {!locked && (
                        <LayeredHints
                          hints={c.hints || [c.hint]}
                          language={language}
                        />
                      )}
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
            {exercise.sections
              ?.filter((section) => section.role === "experiment")
              .map((section, index) => (
                <section
                  className="lesson-section-content"
                  key={`experiment-${index}`}
                >
                  <details className="retrieval-prompts">
                    <summary>{section.heading[language]}</summary>
                    <p>
                      {tr(
                        "Optional exploration. Complete the instructions first. Changing the example data can change the expected result; your earned progress stays saved.",
                        "Vrijwillig onderzoek. Rond eerst de instructies af. Andere voorbeeldgegevens kunnen een ander resultaat geven; je behaalde voortgang blijft bewaard.",
                      )}
                    </p>
                    <LessonText text={section.body[language]} />
                  </details>
                </section>
              ))}
          </>
        )}
      </div>
    </aside>
  );
}
