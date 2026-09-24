import { Fragment } from "react";

/** Deliberately small markup: inline code only, with React escaping all text. */
export function InlineLessonText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`\n]+`|https:\/\/[^\s<>]+[^\s<>.,)])/g)
        .map((part, index) =>
          part.startsWith("`") && part.endsWith("`") ? (
            <code key={index}>{part.slice(1, -1)}</code>
          ) : part.startsWith('https://') ? (
            <a href={part} key={index} target="_blank" rel="noreferrer">{part}</a>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
    </>
  );
}
export function LessonText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, index) => (
        <p key={index}>
          <InlineLessonText text={paragraph} />
        </p>
      ))}
    </>
  );
}
