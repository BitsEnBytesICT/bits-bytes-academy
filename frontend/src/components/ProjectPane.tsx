import { useState } from "react";
import type {
  Activity,
  Course,
  Language,
  Project,
} from "../../../shared/types";
import { LessonText } from "./LessonText";
import { LayeredHints } from "./LayeredHints";
import { Icon } from "../Icon";

export function ProjectPane({
  activity,
  course,
  language,
  milestones,
  complete,
  onMilestones,
  onComplete,
  onActivity,
}: {
  activity: Project;
  course: Course;
  language: Language;
  milestones: string[];
  complete: boolean;
  onMilestones: (ids: string[]) => void;
  onComplete: () => Promise<void>;
  onActivity: (activity: Activity) => void;
}) {
  const [saving, setSaving] = useState(false);
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  return (
    <aside className="learning-pane">
      <div className="lesson-scroll structured-lesson">
        <div className="lesson-section-bar">
          <Icon name="book" size={16} />
          <span>{tr("Your project", "Jouw project")}</span>
        </div>
        <section className="lesson-section-content">
          <h1>{activity.title[language]}</h1>
          <p className="lesson-estimate">
            {activity.estimatedMinutes} min ·{" "}
            {tr("Self-assessed", "Zelf beoordelen")}
          </p>
          <div className="explanation">
            <LessonText text={activity.explanation[language]} />
          </div>
        </section>
        <div className="lesson-section-bar">
          <h2>{tr("Suggested milestones", "Voorgestelde mijlpalen")}</h2>
        </div>
        <section className="lesson-section-content lesson-tasks">
          {activity.milestones.map((milestone) => (
            <div className="checkpoint" key={milestone.id}>
              <label className="project-milestone">
                <input
                  type="checkbox"
                  checked={milestones.includes(milestone.id)}
                  onChange={(event) =>
                    onMilestones(
                      event.target.checked
                        ? [...milestones, milestone.id]
                        : milestones.filter((id) => id !== milestone.id),
                    )
                  }
                />
                <strong>{milestone.title[language]}</strong>
              </label>
              <LessonText text={milestone.description[language]} />
              <LayeredHints hints={milestone.hints} language={language} />
            </div>
          ))}
        </section>
        <div className="lesson-section-bar">
          <h2>{tr("Things to try", "Dingen om te proberen")}</h2>
        </div>
        <section className="lesson-section-content">
          <ul className="project-test-ideas">
            {activity.suggestedTests.map((idea, index) => (
              <li key={index}>
                <LessonText text={idea[language]} />
              </li>
            ))}
          </ul>
          <p>
            {tr(
              "These are ideas for your own testing. No automated checks decide whether your project is finished.",
              "Dit zijn ideeën voor je eigen tests. Geen automatische controles bepalen of je project af is.",
            )}
          </p>
        </section>
        <div className="lesson-section-bar">
          <h2>{tr("Revisit a lesson", "Bekijk een eerdere les")}</h2>
        </div>
        <section className="lesson-section-content project-references">
          {activity.references
            .map((id) => course.activities.find((a) => a.id === id))
            .filter((a): a is Activity => !!a)
            .map((a) => (
              <button
                key={a.id}
                className="text-button"
                onClick={() => onActivity(a)}
              >
                {a.title[language]}
              </button>
            ))}
        </section>
        <section className="lesson-section-content project-finish">
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
              ? tr("Project marked complete", "Project als afgerond gemarkeerd")
              : saving
                ? tr("Saving…", "Opslaan…")
                : tr("Mark project complete", "Project als afgerond markeren")}
          </button>
          <p>
            {tr(
              "You decide when it is finished. You can keep editing afterward.",
              "Jij bepaalt wanneer het af is. Je kunt het daarna blijven aanpassen.",
            )}
          </p>
        </section>
      </div>
    </aside>
  );
}
