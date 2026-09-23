import { useState } from "react";
import type { Language, Localized } from "../../../shared/types";
import { LessonText } from "./LessonText";
import { Icon } from "../Icon";

export function LayeredHints({
  hints,
  language,
}: {
  hints: Localized[];
  language: Language;
}) {
  const [visible, setVisible] = useState(0);
  if (!hints.length) return null;
  return (
    <div className="layered-hints">
      {hints.slice(0, visible).map((hint, index) => (
        <div key={index} className="hint-level">
          <span>
            {language === "nl" ? "Hint" : "Hint"} {index + 1}
          </span>
          <LessonText text={hint[language]} />
        </div>
      ))}
      {visible < hints.length && (
        <button
          type="button"
          className="text-button"
          onClick={() => setVisible((n) => n + 1)}
        >
          <Icon name="hint" size={14} />
          {language === "nl"
            ? visible
              ? "Nog een hint"
              : "Een hint nodig?"
            : visible
              ? "Another hint"
              : "Need a hint?"}
        </button>
      )}
    </div>
  );
}
