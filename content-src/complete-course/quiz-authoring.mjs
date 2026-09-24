import { L, pair, topics } from "./authoring.mjs";
import { plannedTopics, syllabus } from "./syllabus.mjs";
const owner = new Map(plannedTopics.map((t) => [t.id, t.introduction]));
const evidence = (ids) => ({
  objectiveIds: topics(ids),
  reviewActivityIds: [
    ...new Set(
      topics(ids).map((id) => {
        if (!owner.has(id)) throw Error(`Unknown question objective: ${id}`);
        return owner.get(id);
      }),
    ),
  ],
});
export function choice(ids, category, prompt, code, answers) {
  if (answers.length !== 3) throw Error("Author three reasoned choices");
  return {
    ...evidence(ids),
    category,
    prompt: pair(prompt),
    ...(code ? { code } : {}),
    answer: "a",
    choices: answers.map(([label, reason], i) => ({
      id: String.fromCharCode(97 + i),
      label: pair(label),
      reason: pair(reason),
    })),
  };
}
export function predict(ids, code, outputs, reasons) {
  if (new Set(outputs).size !== 3)
    throw Error("Prediction choices must differ");
  return {
    ...choice(
      ids,
      "prediction",
      ["What does this program print?", "Wat drukt dit programma af?"],
      code,
      outputs.map((s, i) => [[s, s], reasons[i]]),
    ),
    expectedOutput: outputs[0] + "\n",
  };
}
export function complete(
  ids,
  prompt,
  template,
  answer,
  distractors,
  reason,
  output,
) {
  const tokens = [answer, ...distractors];
  if (
    new Set(tokens).size !== tokens.length ||
    template.split("___").length !== 2
  )
    throw Error("A completion needs one unambiguous blank");
  return {
    ...choice(
      ids,
      "completion",
      prompt,
      template,
      tokens.map((t) => [[t, t], reason]),
    ),
    codeBlank: {
      prompt: pair(prompt),
      segments: template.split("___"),
      tokens: tokens.map((code, i) => ({ id: `token-${i + 1}`, code })),
      blanks: [{ answer, reason: pair(reason) }],
      output,
    },
  };
}
export function quiz(chapter, build) {
  const make = (form) =>
    build(form === "b").map((q, i) => ({
      ...q,
      id: `python-v3-${chapter}-quiz-${form}-${i + 1}`,
    }));
  const q = {
    id: `python-v3-${chapter}-quiz`,
    chapter,
    group: `python-v3-module-${chapter}`,
    kind: "quiz",
    optional: false,
    estimatedMinutes: 6,
    title: L(
      `${syllabus[chapter - 1].title[0]}: review`,
      `${syllabus[chapter - 1].title[1]}: herhaling`,
    ),
    questions: make("a"),
    alternateQuestions: make("b"),
  };
  for (const form of [q.questions, q.alternateQuestions]) {
    if (form.length !== 6) throw Error(`${q.id}: six questions required`);
    if (
      form.filter((q) => q.category === "prediction").length !== 2 ||
      form.filter((q) => q.category === "completion").length !== 2 ||
      form.filter((q) => q.category === "debugging").length !== 1 ||
      form.filter((q) => q.category === "application").length !== 1
    )
      throw Error(`${q.id}: wrong mix`);
    const current = form.filter((q) =>
      q.objectiveIds.some((id) =>
        plannedTopics
          .find((t) => t.id === id)
          ?.introduction.startsWith(`python-v3-${chapter}-`),
      ),
    ).length;
    if (current !== (chapter === 1 ? 6 : chapter === 2 ? 5 : 4))
      throw Error(`${q.id}: current/retrieval split ${current}`);
  }
  return q;
}
