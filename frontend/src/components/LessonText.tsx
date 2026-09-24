import { Fragment } from "react";

/** Small, escaped markup; links are restricted to HTTPS. No raw HTML. */
export function InlineLessonText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(
          /(`[^`\n]+`|\[[^\]\n]+\]\(https:\/\/[^\s<>]+?\)|https:\/\/[^\s<>]+[^\s<>.,)])/g,
        )
        .map((part, index) =>
          part.startsWith("`") && part.endsWith("`") ? (
            <code key={index}>{part.slice(1, -1)}</code>
          ) : part.startsWith("[") &&
            /^\[[^\]\n]+\]\(https:\/\/[^\s<>]+\)$/.test(part) ? (
            <a
              href={part.slice(part.indexOf("](") + 2, -1)}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              {part.slice(1, part.indexOf("]("))}
            </a>
          ) : part.startsWith("https://") ? (
            <a href={part} key={index} target="_blank" rel="noreferrer">
              {part}
            </a>
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
