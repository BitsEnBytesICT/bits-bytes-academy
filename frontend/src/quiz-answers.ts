import type { Question, Quiz, Workspace } from "../../shared/types";
export type QuizState = NonNullable<Workspace["quiz"]>;
export function questionsFor(quiz: Quiz, state?: Pick<QuizState, "formId">) {
  return state?.formId === "b" && quiz.alternateQuestions
    ? quiz.alternateQuestions
    : quiz.questions;
}

export function createQuizState(
  quiz: Quiz,
  previousAttempt: number,
  shuffle: (values: string[]) => string[],
): QuizState {
  const formId =
    quiz.alternateQuestions && previousAttempt % 2 === 1 ? "b" : "a";
  const questions = questionsFor(quiz, { formId });
  const blanks = questions.some((q) => q.codeBlank);
  return {
    index: 0,
    orders: questions.map((q) =>
      shuffle((q.codeBlank?.tokens || q.choices).map((c) => c.id)),
    ),
    answers: {},
    finished: false,
    attempt: previousAttempt + 1,
    ...(quiz.alternateQuestions ? { formId } : {}),
    ...(blanks ? { format: 2 as const, placements: {} } : {}),
  };
}

export const usesBlanks = (q: Question, state: QuizState) =>
  state.format === 2 && !!q.codeBlank;

export function decodePlacement(answer?: string): (string | null)[] {
  try {
    const value: unknown = JSON.parse(answer || "null");
    return Array.isArray(value) &&
      value.every((v) => v === null || typeof v === "string")
      ? value
      : [];
  } catch {
    return [];
  }
}

export function placement(q: Question, state: QuizState): (string | null)[] {
  return state.answers[q.id]
    ? decodePlacement(state.answers[q.id])
    : state.placements?.[q.id] || q.codeBlank!.blanks.map(() => null);
}

export function slotResults(q: Question, values: (string | null)[]): boolean[] {
  return q.codeBlank!.blanks.map(
    (blank, i) =>
      q.codeBlank!.tokens.find((t) => t.id === values[i])?.code ===
      blank.answer,
  );
}

export function isCorrect(q: Question, state: QuizState): boolean {
  if (!state.answers[q.id]) return false;
  return usesBlanks(q, state)
    ? slotResults(q, decodePlacement(state.answers[q.id])).every(Boolean)
    : state.answers[q.id] === q.answer;
}

export function placeToken(
  q: Question,
  values: (string | null)[],
  token: string,
) {
  const index = values.indexOf(null);
  if (
    index < 0 ||
    values.includes(token) ||
    !q.codeBlank!.tokens.some((t) => t.id === token)
  )
    return values;
  return values.map((value, i) => (i === index ? token : value));
}

export function blankCode(q: Question, values?: (string | null)[]) {
  const blank = q.codeBlank!;
  return blank.segments
    .map(
      (segment, i) =>
        segment +
        (i < blank.blanks.length
          ? values
            ? (blank.tokens.find((t) => t.id === values[i])?.code ?? "___")
            : blank.blanks[i].answer
          : ""),
    )
    .join("");
}
