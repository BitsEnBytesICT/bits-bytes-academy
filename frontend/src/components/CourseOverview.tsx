import { Fragment } from "react";
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
  const available = summary.status === "available";
  const required = course.activities.filter((a) => !a.optional);
  const done = required.filter((a) => state.progress[a.id]?.complete).length;
  const percent = required.length
    ? Math.round((done / required.length) * 100)
    : 0;
  const started = course.activities.some(
    (a) => a.id === state.settings.lastActivity || state.progress[a.id],
  );
  const activitySummary = (items: Activity[]) => {
    const labels = [
      ["coding", "exercise", "exercises", "oefening", "oefeningen"],
      ["quiz", "quiz", "quizzes", "quiz", "quizzes"],
      ["reading", "reading", "readings", "leesonderdeel", "leesonderdelen"],
      ["challenge", "challenge", "challenges", "uitdaging", "uitdagingen"],
      ["project", "project", "projects", "project", "projecten"],
      [
        "project-stage",
        "early project stage",
        "early project stages",
        "eerste projectstap",
        "eerste projectstappen",
      ],
    ];
    return labels
      .flatMap(([kind, enOne, enMany, nlOne, nlMany]) => {
        const count = items.filter((item) => item.kind === kind).length;
        return count
          ? [
              `${count} ${tr(count === 1 ? enOne : enMany, count === 1 ? nlOne : nlMany)}`,
            ]
          : [];
      })
      .join(" · ");
  };
  const topics = (
    <ul className="topic-list">
      {summary.topics.map((topic, index) => (
        <li key={index}>
          <Icon name="check" size={16} />
          {topic[language]}
        </li>
      ))}
    </ul>
  );
  return (
    <main
      className={"catalog-page" + (available ? " course-details-page" : "")}
    >
      <button className="text-button overview-back" onClick={onBack}>
        <Icon name="back" size={15} />
        {tr("All courses", "Alle cursussen")}
      </button>
      {available ? (
        <>
          <section
            className="course-introduction"
            aria-labelledby="course-title"
          >
            <div className="course-title-row">
              <CourseIcon slug={summary.slug} />
              <h1 id="course-title">{summary.title}</h1>
            </div>
            <div className="course-start-actions">
              <button className="primary" onClick={onStart}>
                {started
                  ? tr("Resume learning", "Verder leren")
                  : tr("Start learning", "Begin met leren")}
                <Icon name="arrow" size={15} />
              </button>
            </div>
            <p className="overview-description">
              {summary.description[language]}
            </p>
            <div className="course-meta">
              <span>{tr("Beginner", "Beginner")}</span>
              <span>
                {tr(
                  `Approximately ${summary.estimatedHours} hours`,
                  `Ongeveer ${summary.estimatedHours} uur`,
                )}
              </span>
              <span>
                {course.chapters.length} {tr("modules", "modules")}
              </span>
            </div>
            <p>{activitySummary(required)}</p>
            {course.reviewMinutes && (
              <p>
                {tr(
                  `Allow another ${course.reviewMinutes[0] / 60}–${course.reviewMinutes[1] / 60} hours for review. These are provisional estimates.`,
                  `Reken op nog ${course.reviewMinutes[0] / 60}–${course.reviewMinutes[1] / 60} uur voor herhaling. Dit zijn voorlopige schattingen.`,
                )}
              </p>
            )}
            <details className="course-topics">
              <summary>
                {tr("What you will learn", "Wat je gaat leren")}
                <Icon name="arrow" size={12} />
              </summary>
              {topics}
            </details>
            <section
              className="course-progress-section"
              aria-labelledby="course-progress-title"
            >
              <div className="course-progress-heading">
                <h2 id="course-progress-title">
                  {tr("Course progress", "Cursusvoortgang")}
                </h2>
                <span>{percent}%</span>
              </div>
              <div className="course-progress-row">
                <div
                  className="course-progress-bar"
                  role="progressbar"
                  aria-labelledby="course-progress-title"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percent}
                >
                  <div style={{ width: `${percent}%` }} />
                </div>
                <svg
                  className={
                    "course-progress-trophy" +
                    (done === required.length && done > 0 ? " complete" : "")
                  }
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 3h10v5a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 5 4m9-7h4v3a4 4 0 0 1-5 4M12 13v5m-4 3h8m-6-3h4l2 3H8Z" />
                </svg>
              </div>
              <p className="course-progress-caption">
                {done} / {required.length}{" "}
                {tr(
                  "required activities complete",
                  "verplichte activiteiten afgerond",
                )}
              </p>
            </section>
          </section>
          <section className="course-syllabus" aria-labelledby="syllabus-title">
            <h2 id="syllabus-title">{tr("Syllabus", "Curriculum")}</h2>
            <div className="overview-chapters">
              {course.chapters.map((chapter) => {
                const path = course.paths?.find(
                  (p) => p.chapterNumbers[0] === chapter.number,
                );
                const items = course.activities.filter(
                  (a) => a.chapter === chapter.number,
                );
                const requiredItems = items.filter((a) => !a.optional);
                const completed = requiredItems.filter(
                  (a) => state.progress[a.id]?.complete,
                ).length;
                const chapterPercent = requiredItems.length
                  ? Math.round((completed / requiredItems.length) * 100)
                  : 0;
                return (
                  <Fragment key={chapter.number}>
                    {path && (
                      <div className="learning-path-heading">
                        <h3>{path.title[language]}</h3>
                        <p>{path.description[language]}</p>
                      </div>
                    )}
                    <details>
                      <summary>
                        <span
                          className={
                            "chapter-completion" +
                            (chapterPercent === 100 ? " complete" : "")
                          }
                          aria-hidden="true"
                        >
                          <svg width="42" height="42" viewBox="0 0 42 42">
                            <circle
                              className="chapter-ring-track"
                              cx="21"
                              cy="21"
                              r="18"
                            />
                            <circle
                              className="chapter-ring-fill"
                              cx="21"
                              cy="21"
                              r="18"
                              pathLength="100"
                              strokeDasharray={`${chapterPercent} 100`}
                              transform="rotate(-90 21 21)"
                            />
                          </svg>
                          <span>
                            {chapterPercent === 100 ? (
                              <Icon name="check" size={16} />
                            ) : completed ? (
                              `${chapterPercent}%`
                            ) : (
                              String(chapter.number).padStart(2, "0")
                            )}
                          </span>
                        </span>
                        <span className="syllabus-chapter-text">
                          <span className="syllabus-chapter-title">
                            {chapter.title[language]}
                          </span>
                          <small>
                            {activitySummary(requiredItems)}
                            {items.some((a) => a.optional)
                              ? " · " +
                                tr(
                                  "Optional extension",
                                  "Optionele uitbreiding",
                                )
                              : ""}
                          </small>
                          <small className="syllabus-chapter-status">
                            {completed} / {requiredItems.length}{" "}
                            {tr("complete", "afgerond")}
                          </small>
                        </span>
                        <Icon name="arrow" size={14} />
                      </summary>
                      <div className="overview-activities">
                        {chapter.outcomes && (
                          <ul>
                            {chapter.outcomes.map((outcome, i) => (
                              <li key={i}>{outcome[language]}</li>
                            ))}
                          </ul>
                        )}
                        {items.map((a) => (
                          <button key={a.id} onClick={() => onActivity(a)}>
                            <span
                              className={
                                state.progress[a.id]?.complete ? "good" : ""
                              }
                            >
                              {state.progress[a.id]?.complete ? "✓" : "○"}
                            </span>
                            <span>
                              {a.title[language]}
                              {a.optional
                                ? ` (${tr("optional", "optioneel")})`
                                : ""}
                            </span>
                            <small>{a.estimatedMinutes} min</small>
                          </button>
                        ))}
                      </div>
                    </details>
                  </Fragment>
                );
              })}
            </div>
            <div className="future-path">
              <Icon name="code" size={18} />
              <div>
                <h3>{tr("Your next idea", "Jouw volgende idee")}</h3>
                <p>
                  {tr(
                    "Finish by setting up Python locally, then choose something useful or enjoyable to build yourself.",
                    "Sluit af door Python lokaal in te stellen en kies daarna iets nuttigs of leuks om zelf te bouwen.",
                  )}
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="overview-grid">
          <section className="overview-main">
            <span className="eyebrow">{tr("COMING SOON", "BINNENKORT")}</span>
            <h1>{summary.title}</h1>
            <p className="overview-description">
              {summary.description[language]}
            </p>
            <div className="overview-facts">
              <span>{tr("Beginner", "Beginner")}</span>
              <span>{tr("Duration to be announced", "Tijdsduur volgt")}</span>
            </div>
            <h2>{tr("What you will learn", "Wat je gaat leren")}</h2>
            {topics}
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
          </section>
          <aside className="overview-summary">
            <CourseIcon slug={summary.slug} />
            <h2>{summary.title}</h2>
            <span className="course-badge">
              {tr("Coming soon", "Binnenkort")}
            </span>
          </aside>
        </div>
      )}
    </main>
  );
}
