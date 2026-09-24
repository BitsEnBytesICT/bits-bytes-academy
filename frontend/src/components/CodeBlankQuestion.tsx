import { useEffect, useRef } from "react";
import type { Language, Question } from "../../../shared/types";
import {
  blankCode,
  isCorrect,
  placement,
  placeToken,
  slotResults,
  type QuizState,
} from "../quiz-answers";
import { CodeBlock, CodeTokens } from "./CodeBlock";
import { pythonTokens } from "../python-highlighting";

export function CodeBlankQuestion({
  question: q,
  state,
  language,
  update,
  review = false,
}: {
  question: Question;
  state: QuizState;
  language: Language;
  update?: (state: QuizState) => void;
  review?: boolean;
}) {
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const spec = q.codeBlank!;
  const values = placement(q, state);
  const submitted = !!state.answers[q.id];
  const results = slotResults(q, values);
  const feedback = useRef<HTMLDivElement>(null);
  const wasSubmitted = useRef(submitted);
  useEffect(() => {
    if (submitted && !wasSubmitted.current && !review)
      feedback.current?.focus();
    wasSubmitted.current = submitted;
  }, [submitted, review]);
  const change = (next: (string | null)[]) => {
    if (!submitted)
      update?.({ ...state, placements: { ...state.placements, [q.id]: next } });
  };
  return (
    <div className="code-blank-question">
      {!review && (
        <p>
          {tr(
            "Choose a token to fill the next empty blank. Select a filled blank to return its token.",
            "Kies een codeblokje voor de volgende lege plek. Klik op een ingevulde plek om het blokje terug te zetten.",
          )}
        </p>
      )}
      <pre className="python-code quiz-code blank-program">
        <code>
          {spec.segments.map((segment, i) => (
            <span key={i}>
              <CodeTokens tokens={pythonTokens(segment)} />
              {i < spec.blanks.length && (
                <button
                  type="button"
                  className={
                    "code-slot " +
                    (submitted ? (results[i] ? "correct" : "incorrect") : "")
                  }
                  disabled={submitted || !values[i]}
                  aria-label={`${tr("Blank", "Invulplek")} ${i + 1}: ${spec.tokens.find((t) => t.id === values[i])?.code ?? tr("empty", "leeg")}${submitted ? (results[i] ? tr(", correct", ", goed") : tr(", incorrect", ", fout")) : values[i] ? tr(", return token", ", zet blokje terug") : ""}`}
                  onClick={() =>
                    change(values.map((value, n) => (n === i ? null : value)))
                  }
                >
                  {spec.tokens.find((t) => t.id === values[i])?.code ??
                    ` ${i + 1} `}
                  {submitted && (
                    <span aria-hidden="true">{results[i] ? " ✓" : " ×"}</span>
                  )}
                </button>
              )}
            </span>
          ))}
        </code>
      </pre>
      {!review && (
        <div className="quiz-expected-output">
          <p>{tr("Expected output", "Verwachte uitvoer")}</p>
          <pre>{spec.output}</pre>
        </div>
      )}
      {!review && (
        <>
          <div
            className="token-bank"
            role="group"
            aria-label={tr("Available code tokens", "Beschikbare codeblokjes")}
          >
            {(state.orders[state.index] || spec.tokens.map((t) => t.id)).map(
              (id) => {
                const token = spec.tokens.find((t) => t.id === id)!;
                const used = values.includes(id);
                return (
                  <button
                    type="button"
                    key={id}
                    className={"code-token" + (used ? " used" : "")}
                    disabled={submitted}
                    aria-disabled={used || !values.includes(null)}
                    aria-label={`${token.code}, ${used ? tr("already placed", "al geplaatst") : tr("place in next blank", "zet op volgende lege plek")}`}
                    onClick={() => change(placeToken(q, values, id))}
                  >
                    {token.code}
                  </button>
                );
              },
            )}
          </div>
          {!submitted && (
            <button
              className="primary"
              disabled={values.some((v) => v === null)}
              onClick={() =>
                update?.({
                  ...state,
                  answers: { ...state.answers, [q.id]: JSON.stringify(values) },
                })
              }
            >
              {tr("Check answer", "Controleer antwoord")}
            </button>
          )}
        </>
      )}
      {submitted && (
        <div
          ref={feedback}
          tabIndex={-1}
          role="status"
          className={"quiz-feedback " + (isCorrect(q, state) ? "good" : "bad")}
        >
          <strong>
            {isCorrect(q, state)
              ? tr("That’s right.", "Dat klopt.")
              : tr(
                  "Not quite — review the marked blanks.",
                  "Nog niet helemaal — bekijk de gemarkeerde plekken.",
                )}
          </strong>
          <ol>
            {spec.blanks.map((blank, i) => (
              <li key={i}>
                <strong>
                  {results[i] ? "✓ " : "× "}
                  {tr("Blank", "Invulplek")} {i + 1}:{" "}
                </strong>
                {(!results[i] &&
                  spec.tokens.find((t) => t.id === values[i])?.reason?.[
                    language
                  ]) ||
                  blank.reason[language]}
              </li>
            ))}
          </ol>
          {review && (
            <>
              <p>{tr("Completed code", "Volledige code")}</p>
              <CodeBlock code={blankCode(q)} className="quiz-code" />
              <p>{tr("Output", "Uitvoer")}</p>
              <pre>{spec.output}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
