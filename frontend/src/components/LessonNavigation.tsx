import { useEffect, useRef } from "react";
import type { Activity, Course, Language, State } from "../../../shared/types";

export function LessonNavigation({
  activity,
  course,
  state,
  language,
  onCurriculum,
  onActivity,
}: {
  activity: Activity;
  course: Course;
  state: State;
  language: Language;
  onCurriculum: () => void;
  onActivity: (activity: Activity) => void;
}) {
  const segments = useRef<HTMLDivElement>(null);
  const group = course.groups.find((item) =>
    item.activityIds.includes(activity.id),
  );
  const chapter = course.chapters.find(
    (item) => item.number === activity.chapter,
  )!;
  const title = (group?.title || chapter.title)[language];
  const members = course.activities.filter((item) =>
    group?.activityIds.includes(item.id),
  );
  useEffect(() => {
    const container = segments.current;
    const current = container?.querySelector<HTMLElement>(
      '[aria-current="step"]',
    );
    if (container && current) {
      const offset =
        current.getBoundingClientRect().left -
        container.getBoundingClientRect().left;
      if (offset < 0 || offset + current.offsetWidth > container.clientWidth)
        container.scrollLeft +=
          offset - container.clientWidth / 2 + current.offsetWidth / 2;
    }
  }, [activity.id]);
  return (
    <nav
      className="lesson-group-header"
      aria-label={language === "nl" ? "Lesnavigatie" : "Lesson navigation"}
    >
      <div>
        <strong title={title}>{title}</strong>
        <div
          className="exercise-segments"
          ref={segments}
          aria-label={language === "nl" ? "Lesvoortgang" : "Lesson progress"}
        >
          {members.map((item, index) => (
            <button
              key={item.id}
              className={
                (item.id === activity.id ? "current " : "") +
                (state.progress[item.id]?.complete ? "complete" : "")
              }
              aria-current={item.id === activity.id ? "step" : undefined}
              aria-label={`${index + 1}. ${item.title[language]}`}
              title={item.title[language]}
              onClick={() => onActivity(item)}
            />
          ))}
        </div>
      </div>
      <button
        className="curriculum-toggle"
        aria-label="Open curriculum"
        onClick={onCurriculum}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
