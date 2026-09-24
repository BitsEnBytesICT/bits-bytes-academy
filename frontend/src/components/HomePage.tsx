import type { CourseSummary, Language } from "../../../shared/types";
import { Icon } from "../Icon";
import { CourseIcon } from "./CourseIcon";
export function HomePage({
  courses,
  language,
  progress,
  onOpen,
  onManage,
}: {
  courses: CourseSummary[];
  language: Language;
  progress: number;
  onOpen: (slug: string) => void;
  onManage: () => void;
}) {
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  return (
    <main className="catalog-page">
      <div className="catalog-heading">
        <span className="eyebrow">BITS & BYTES</span>
        <h1>{tr("Your courses", "Jouw cursussen")}</h1>
        <p>
          {tr(
            "Choose a course and pick up where you left off.",
            "Kies een cursus en ga verder waar je gebleven was.",
          )}
        </p>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <article className={"course-card " + course.slug} key={course.slug}>
            <div className="card-cover">
              <CourseIcon slug={course.slug} />
              <span className="course-badge">
                {course.status === "available"
                  ? tr("Available now", "Nu beschikbaar")
                  : tr("Coming soon", "Binnenkort")}
              </span>
            </div>
            <div className="card-content">
              <span className="eyebrow">{tr("BEGINNER", "BEGINNER")}</span>
              <h2>{course.title}</h2>
              <p>{course.description[language]}</p>
              <div className="course-facts">
                <Icon name="book" size={15} />
                {course.estimatedHours
                  ? tr(`Approximately ${course.estimatedHours} hours`, `Ongeveer ${course.estimatedHours} uur`)
                  : tr("Duration to be announced", "Tijdsduur volgt")}
              </div>
              {course.status === "available" && (
                <div className="card-progress">
                  <span>
                    {progress}% {tr("complete", "afgerond")}
                  </span>
                  <div className="progress-track">
                    <i style={{ width: progress + "%" }} />
                  </div>
                </div>
              )}
              <button
                className={
                  course.status === "available" ? "primary" : "secondary"
                }
                onClick={() => onOpen(course.slug)}
              >
                {course.status === "available"
                  ? tr("Explore course", "Bekijk cursus")
                  : tr("Preview course", "Bekijk vooruitblik")}
                <Icon name="arrow" size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <footer className="catalog-footer">
        <button className="text-button" onClick={onManage}>
          {tr("Manage learning data", "Beheer leergegevens")}
        </button>
      </footer>
    </main>
  );
}
