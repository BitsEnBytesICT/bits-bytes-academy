import { Link } from "react-router-dom";
import type { Course, Exercise, Language } from "../../../shared/types";
import { LessonText } from "./LessonText";
import { CodeBlock } from "./CodeBlock";

export function RetrievalPrompts({
  activity,
  course,
  language,
}: {
  activity: Pick<Exercise, "retrievals">;
  course: Course;
  language: Language;
}) {
  if (!activity.retrievals?.length) return null;
  return (
    <details className="retrieval-prompts">
      <summary>
        {language === "nl"
          ? "Haal eerdere ideeën terug"
          : "Recall earlier ideas"}
      </summary>
      <p>
        {language === "nl"
          ? "Probeer eerst uit je geheugen. Open de eerdere les als je hulp nodig hebt. Dit telt mee als herhaling; het blokkeert je voortgang niet."
          : "Try from memory first. Open the earlier lesson if you need help. This is review time; it does not block your progress."}
      </p>
      {activity.retrievals.map((r) => (
        <details key={r.id}>
          <summary>
            {
              course.activities.find((a) => a.id === r.sourceActivityId)?.title[
                language
              ]
            }
          </summary>
          <LessonText text={r.prompt[language]} />
          {r.code && <CodeBlock code={r.code} />}
          <Link to={`/learn/${r.sourceActivityId}`}>
            {
              course.activities.find((a) => a.id === r.sourceActivityId)?.title[
                language
              ]
            }
          </Link>
        </details>
      ))}
    </details>
  );
}
