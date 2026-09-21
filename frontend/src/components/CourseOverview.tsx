import type {
  Activity,
  Course,
  CourseSummary,
  Language,
  State,
} from "../../../shared/types";
import { Icon } from "../Icon";
import { CourseIcon } from "./CourseIcon";
export function CourseOverview({
  summary,
  course,
  state,
  language,
  onBack,
  onStart,
  onActivity,
}: {
  summary: CourseSummary;
  course: Course;
  state: State;
  language: Language;
  onBack: () => void;
  onStart: () => void;
  onActivity: (a: Activity) => void;
}) {
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const available = summary.status === "available",
    required = course.activities.filter((a) => !a.optional),
    done = required.filter((a) => state.progress[a.id]?.complete).length;
  const started =
    !!state.settings.lastActivity || Object.keys(state.progress).length > 0;
  return (
    <main className="catalog-page">
      <button className="text-button overview-back" onClick={onBack}>
        <Icon name="back" size={15} />
        {tr("All courses", "Alle cursussen")}
      </button>
      <div className="overview-grid">
        <section className="overview-main">
          <span className="eyebrow">
            {available
              ? tr("PYTHON COURSE", "PYTHON-CURSUS")
              : tr("COMING SOON", "BINNENKORT")}
          </span>
          <h1>{summary.title}</h1>
          <p className="overview-description">
            {summary.description[language]}
          </p>
          <div className="overview-facts">
            <span>{tr("Beginner", "Beginner")}</span>
            <span>
              {available
                ? tr("Approximately 20 hours", "Ongeveer 20 uur")
                : tr("Duration to be announced", "Tijdsduur volgt")}
            </span>
            {available && <span>13 {tr("chapters", "hoofdstukken")}</span>}
          </div>
          <h2>{tr("What you will learn", "Wat je gaat leren")}</h2>
          <ul className="topic-list">
            {summary.topics.map((topic, i) => (
              <li key={i}>
                <Icon name="check" size={16} />
                {topic[language]}
              </li>
            ))}
          </ul>
          {available ? (
            <>
              <h2>{tr("Course curriculum", "Curriculum")}</h2>
              <div className="overview-chapters">
                {course.chapters.map((chapter) => {
                  const items = course.activities.filter(
                      (a) => a.chapter === chapter.number,
                    ),
                    completed = items.filter(
                      (a) => state.progress[a.id]?.complete,
                    ).length;
                  return (
                    <details key={chapter.number}>
                      <summary>
                        <span className="chapter-number">
                          {String(chapter.number).padStart(2, "0")}
                        </span>
                        <span>
                          {chapter.title[language]}
                          <small>
                            {completed} / {items.length}{" "}
                            {tr("complete", "afgerond")}
                            {items.every((a) => a.optional)
                              ? " · " + tr("Optional", "Optioneel")
                              : ""}
                          </small>
                        </span>
                        <Icon name="arrow" size={14} />
                      </summary>
                      <div className="overview-activities">
                        {items.map((a) => (
                          <button key={a.id} onClick={() => onActivity(a)}>
                            <span
                              className={
                                state.progress[a.id]?.complete ? "good" : ""
                              }
                            >
                              {state.progress[a.id]?.complete ? "✓" : "○"}
                            </span>
                            <span>{a.title[language]}</span>
                            <small>{a.estimatedMinutes} min</small>
                          </button>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="coming-soon-note">
              <h2>
                {tr("This course is on its way", "Deze cursus komt eraan")}
              </h2>
              <p>
                {tr(
                  "Lessons are not available yet. You can start learning with the Python course now.",
                  "Er zijn nog geen lessen beschikbaar. Je kunt alvast beginnen met de Python-cursus.",
                )}
              </p>
            </div>
          )}
        </section>
        <aside className="overview-summary">
          <CourseIcon slug={summary.slug} />
          <h2>{summary.title}</h2>
          {available ? (
            <>
              <p>
                {done} / {required.length}{" "}
                {tr(
                  "required activities complete",
                  "verplichte activiteiten afgerond",
                )}
              </p>
              <div className="progress-track">
                <i style={{ width: (done / required.length) * 100 + "%" }} />
              </div>
              <button className="primary" onClick={onStart}>
                {started
                  ? tr("Resume learning", "Verder leren")
                  : tr("Start learning", "Begin met leren")}
                <Icon name="arrow" size={15} />
              </button>
              <small>
                {tr(
                  "Your code and progress are saved automatically.",
                  "Je code en voortgang worden automatisch opgeslagen.",
                )}
              </small>
            </>
          ) : (
            <span className="course-badge">
              {tr("Coming soon", "Binnenkort")}
            </span>
          )}
        </aside>
      </div>
    </main>
  );
}
