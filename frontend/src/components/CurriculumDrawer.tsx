import { useEffect, useRef, useState } from "react";
import type { Activity, Course, Language, State } from "../../../shared/types";
import { Icon } from "../Icon";
export function CurriculumDrawer({
  course,
  state,
  active,
  language,
  onClose,
  onOverview,
  onActivity,
  unlocked,
}: {
  course: Course;
  state: State;
  active: Activity | null;
  language: Language;
  onClose: () => void;
  onOverview: () => void;
  onActivity: (a: Activity) => void;
  unlocked: (a: Activity) => boolean;
}) {
  const [expanded, setExpanded] = useState(active?.chapter || 1),
    dialog = useRef<HTMLDivElement>(null);
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const required = course.activities.filter((a) => !a.optional),
    complete = required.filter((a) => state.progress[a.id]?.complete).length;
  useEffect(() => {
    const before = document.activeElement as HTMLElement;
    const items = () =>
      Array.from(
        dialog.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled)",
        ) || [],
      );
    items()[0]?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const all = items(),
          first = all[0],
          last = all[all.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      before?.focus();
    };
  }, []);
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        className="curriculum-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum"
        ref={dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-heading">
          <h2>Python · Curriculum</h2>
          <button
            className="icon-button"
            aria-label={tr("Close curriculum", "Sluit curriculum")}
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="syllabus">
          <div className="syllabus-heading">
            <button
              className="text-button drawer-overview"
              onClick={onOverview}
            >
              <Icon name="back" size={15} />
              {tr("Course overview", "Cursusoverzicht")}
            </button>
            <p>
              {complete} / {required.length}{" "}
              {tr("activities complete", "activiteiten afgerond")}
            </p>
            <div className="progress-track">
              <i style={{ width: (complete / required.length) * 100 + "%" }} />
            </div>
          </div>
          {course.chapters.map((chapter) => {
            const items = course.activities.filter(
                (a) => a.chapter === chapter.number,
              ),
              requiredItems = items.filter(a => !a.optional),
              count = requiredItems.filter(
                (a) => state.progress[a.id]?.complete,
              ).length;
            return (
              <section className="chapter-group" key={chapter.number}>
                {course.paths?.filter(p => p.chapterNumbers[0] === chapter.number).map(path => <h3 className="drawer-path-heading" key={path.id}>{path.title[language]}</h3>)}
                <button
                  className={
                    "chapter-toggle " +
                    (expanded === chapter.number ? "open" : "")
                  }
                  aria-expanded={expanded === chapter.number}
                  onClick={() =>
                    setExpanded(
                      expanded === chapter.number ? 0 : chapter.number,
                    )
                  }
                >
                  <span className="chapter-number">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span>
                    {chapter.title[language]}
                    <small>
                      {count} / {requiredItems.length}
                    </small>
                  </span>
                  <Icon name="arrow" size={14} />
                </button>
                {expanded === chapter.number && (
                  <div className="activities">
                    {items.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => onActivity(a)}
                        className={
                          "activity " + (active?.id === a.id ? "selected" : "")
                        }
                        aria-current={active?.id === a.id ? "page" : undefined}
                      >
                        <span
                          className={
                            "activity-dot " +
                            (state.progress[a.id]?.complete ? "complete" : "")
                          }
                        >
                          {state.progress[a.id]?.complete ? (
                            <Icon name="check" size={11} />
                          ) : a.kind === "quiz" ? (
                            "?"
                          ) : null}
                        </span>
                        <span>
                          {a.title[language]}
                          <small>
                            {a.estimatedMinutes} min
                            {a.optional
                              ? " · " + tr("Optional", "Optioneel")
                              : ""}
                          </small>
                        </span>
                        {!unlocked(a) && <Icon name="lock" size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
          {course.paths && <p className="drawer-future"><Icon name="lock" size={14}/> {tr('Next learning path · Coming later', 'Volgend leerpad · Later beschikbaar')}</p>}
        </div>
      </div>
    </div>
  );
}
