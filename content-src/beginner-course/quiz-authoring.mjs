import { L, local, words, idFor } from "./authoring.mjs";
export function P(topic, code, outputs, reasons) {
  if (new Set(outputs).size !== 3)
    throw Error(`Ambiguous prediction: ${topic}`);
  return {
    objectiveIds: words(topic),
    category: "prediction",
    prompt: L("What does this program print?", "Wat drukt dit programma af?"),
    code,
    answer: "a",
    expectedOutput: outputs[0] + "\n",
    choices: outputs.map((label, i) => ({
      id: "abc"[i],
      label: L(label, label),
      reason: local(reasons[i]),
    })),
  };
}
export function B(topic, template, answer, distractors, reason, output) {
  if (
    template.split("___").length !== 2 ||
    new Set([answer, ...distractors]).size !== 3
  )
    throw Error(`Ambiguous completion: ${topic}`);
  const prompt = L(
    "Complete the code to produce the shown output.",
    "Vul de code aan om de getoonde uitvoer te maken.",
  );
  return {
    objectiveIds: words(topic),
    category: "completion",
    prompt,
    code: template,
    answer: "a",
    choices: [answer, ...distractors].map((label, i) => ({
      id: "abc"[i],
      label: L(label, label),
      reason: local(reason),
    })),
    codeBlank: {
      prompt,
      segments: template.split("___"),
      tokens: [answer, ...distractors].map((code, i) => ({
        id: `token-${i + 1}`,
        code,
      })),
      blanks: [{ answer, reason: local(reason) }],
      output,
    },
  };
}
export function Q(topic, category, prompt, code, answers) {
  return {
    objectiveIds: words(topic),
    category,
    prompt: local(prompt),
    code,
    answer: "a",
    choices: answers.map(([label, reason], i) => ({
      id: "abc"[i],
      label: local(label),
      reason: local(reason),
    })),
  };
}
export function makeQuizzes(specs, activities, chapters) {
  const owners = new Map(
    activities.flatMap((a) => (a.topicIds || []).map((t) => [t, a.id])),
  );
  return specs.map((build, index) => {
    const chapter = index + 1;
    const form = (alternate) => {
      const own = build(alternate);
      // From module 3 onward, two changed examples retrieve earlier concepts.
      const previous = index ? specs[Math.max(0, index - 2)](alternate) : own;
      const questions =
        index === 0
          ? [own.p, own.p2, own.b, own.b2, own.debug, own.app]
          : index === 1
            ? [own.p, previous.p, own.b, own.b2, own.debug, own.app]
            : [own.p, previous.p, own.b, previous.b, own.debug, own.app];
      return questions.map((q, i) => {
        if (!q) throw Error(`Missing question ${chapter}/${i}`);
        return {
          ...structuredClone(q),
          id: `${idFor(chapter, "quiz")}-${alternate ? "b" : "a"}-${i + 1}`,
          reviewActivityIds: [
            ...new Set(
              q.objectiveIds.map((t) => {
                if (!owners.has(t)) throw Error(`Unknown quiz topic ${t}`);
                return owners.get(t);
              }),
            ),
          ],
        };
      });
    };
    return {
      id: idFor(chapter, "quiz"),
      chapter,
      group: `python-v4-module-${chapter}`,
      kind: "quiz",
      optional: false,
      estimatedMinutes: 8,
      title: L(
        `${chapters[index][0]}: review`,
        `${chapters[index][1]}: herhaling`,
      ),
      questions: form(false),
      alternateQuestions: form(true),
    };
  });
}
