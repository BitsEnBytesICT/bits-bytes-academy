import fs from "node:fs";
export const blueprint = JSON.parse(
  fs.readFileSync(new URL("./curriculum-map.json", import.meta.url), "utf8"),
);
export const activities = [];
export const loc = (en, nl = en) => ({ en, nl });
export const predict = (code, answers, en, nl) => [
  "What does this code print?",
  "Wat drukt deze code af?",
  code,
  answers,
  en,
  nl,
];
export function lesson(
  group,
  n,
  en,
  nl,
  taskEn,
  taskNl,
  solution,
  check,
  options = {},
) {
  const meta = blueprint.lessonGroups.find((g) => g.slug === group),
    entry = meta.exercises[n - 1];
  if (!entry) throw Error(`Unknown lesson ${group}/${n}`);
  const id = `${group}-${String(n).padStart(2, "0")}`;
  const base = {
    ...options.files,
    "main.py": options.starter ?? "# Write your code below.\n",
  };
  const solutionFiles = {
    ...options.files,
    ...options.solutionFiles,
    "main.py": solution,
  };
  const steps =
    options.steps ||
    (check
      ? [
          {
            task: loc(taskEn, taskNl),
            check,
            expectedError: options.expectedError,
          },
        ]
      : []);
  const activity = {
    id,
    chapter: meta.chapter,
    group,
    title: loc(entry.concept, options.titleNl || entry.concept),
    kind: check ? "coding" : "reading",
    optional: false,
    explanation: loc(en, nl),
    example: options.example || "",
    ...(options.sections ? { sections: options.sections } : {}),
    files: base,
    solution: solutionFiles,
    checkpoints: steps.map((s, i) => ({
      id: `${id}${options.revision ? `-v${options.revision}` : ""}-step-${i + 1}`,
      task: s.task,
      check: s.check || "True",
      ...(s.expectedError ? { expectedError: s.expectedError } : {}),
      ...(s.feedback ? { feedback: s.feedback } : {}),
      ...(s.cases ? { cases: s.cases } : {}),
      hint:
        s.hint ||
        loc(
          options.hint ||
            `Start with ${solution.split("\n").find((l) => l.trim() && !l.startsWith("#")) || "a small change"}. Then compare the values with the task.`,
          options.hintNl ||
            `Begin met ${solution.split("\n").find((l) => l.trim() && !l.startsWith("#")) || "een kleine wijziging"}. Vergelijk de waarden daarna met de opdracht.`,
        ),
    })),
    solutionNote:
      options.solutionNote ||
      loc(
        en +
          "\n\nTrace the solution one line at a time. Try a different input to see which parts change.",
        nl +
          "\n\nVolg de oplossing regel voor regel. Probeer een andere invoer en bekijk welke onderdelen veranderen.",
      ),
    ...(options.inputs ? { inputs: options.inputs } : {}),
    sourcePosition: n,
    sourceUrl: entry.sourceUrl,
  };
  activities.push(activity);
  return activity;
}

// Named fields keep long bilingual lessons reviewable. Revisioned checkpoints
// prevent an older, different task from passing a newly authored requirement.
export function guided(group, n, data) {
  return lesson(
    group,
    n,
    data.intro.en,
    data.intro.nl,
    "",
    "",
    data.solution,
    data.steps?.length ? "True" : null,
    {
      titleNl: data.titleNl,
      starter: data.starter,
      sections: data.sections,
      steps: data.steps || [],
      solutionNote: data.solutionNote,
      revision: 2,
    },
  );
}
export const section = (
  headingEn,
  headingNl,
  bodyEn,
  bodyNl,
  code,
  output,
  takeawayEn,
  takeawayNl,
) => ({
  heading: loc(headingEn, headingNl),
  body: loc(bodyEn, bodyNl),
  ...(code !== undefined ? { code } : {}),
  ...(output !== undefined ? { output } : {}),
  ...(takeawayEn ? { takeaway: loc(takeawayEn, takeawayNl) } : {}),
});
export const step = (
  en,
  nl,
  check,
  hintEn,
  hintNl,
  feedbackEn,
  feedbackNl,
) => ({
  task: loc(en, nl),
  check,
  hint: loc(hintEn, hintNl),
  ...(feedbackEn ? { feedback: loc(feedbackEn, feedbackNl) } : {}),
});
export function reading(group, n, en, nl, code, options = {}) {
  return lesson(group, n, en, nl, "", "", code, null, {
    ...options,
    starter: code,
  });
}
export function challenge(
  chapter,
  group,
  index,
  titleEn,
  titleNl,
  en,
  nl,
  signature,
  body,
  check,
  example,
  files = {},
) {
  const id = `practice-${chapter}-${group}-${index}`;
  const solution = `def ${signature}:\n${body
    .split("\n")
    .map((l) => "    " + l)
    .join("\n")}\n\n${example || ""}\n`;
  activities.push({
    id,
    chapter,
    group,
    title: loc(titleEn, titleNl),
    kind: "challenge",
    optional: true,
    explanation: loc(en, nl),
    example: "",
    files: {
      ...files,
      "main.py": `def ${signature}:\n    # Implement the function.\n    pass\n\n${example || ""}\n`,
    },
    solution: { ...files, "main.py": solution },
    checkpoints: [
      {
        id: id + "-step-1",
        task: loc(en, nl),
        check,
        hint: loc(
          "Work through a small input by hand first. Separate the condition, transformation, and return value.",
          "Werk eerst zelf een kleine invoer uit. Bekijk de voorwaarde, de bewerking en de return value afzonderlijk.",
        ),
      },
    ],
    solutionNote: loc(
      "This solution separates the calculation from its input. Test the function with ordinary values and edge cases such as empty collections or boundary values.",
      "Deze oplossing scheidt de berekening van de invoer. Test de function met gewone waarden en grensgevallen, zoals lege verzamelingen of grenswaarden.",
    ),
  });
}
export function quiz(group, rows, options = {}) {
  const meta = blueprint.lessonGroups.find((g) => g.slug === group);
  if (rows.length !== meta.quiz.questions)
    throw Error(
      `Expected ${meta.quiz.questions} questions in ${group}, got ${rows.length}`,
    );
  activities.push({
    id: group + "-quiz",
    chapter: meta.chapter,
    group,
    title: loc(meta.title + " · Quiz"),
    kind: "quiz",
    optional: false,
    questions: rows.map((r, i) => ({
      id: `${group}-q${i + 1}`,
      prompt: loc(r[0], r[1]),
      code: r[2],
      answer: "a",
      choices: r[3].map((label, j) => ({
        id: String.fromCharCode(97 + j),
        label: Array.isArray(label) ? loc(...label) : loc(String(label)),
        reason: options.feedback?.[i]?.[j] || loc(r[4], r[5]),
      })),
    })),
  });
}
