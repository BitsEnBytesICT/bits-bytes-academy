import { L } from "./authoring.mjs";
import { syllabus } from "./syllabus.mjs";
import { activities as a } from "./01-02-foundations.mjs";
import { activities as b } from "./03-04-control.mjs";
import { activities as c } from "./05-06-state-tools.mjs";
import { activities as d } from "./07-08-first-game.mjs";
import { activities as e } from "./09-10-collections-text.mjs";
import { activities as f } from "./11-12-recovery-records.mjs";
import { activities as g } from "./13-14-files.mjs";
import { activities as h } from "./15-objects.mjs";
import { activities as i } from "./16-finished-game.mjs";
import { quizzes as earlyQuizzes } from "./quizzes-foundations.mjs";
import { quizzes as laterQuizzes } from "./quizzes-breadth.mjs";
import {
  calculator,
  calculatorFirst,
  pong,
  pongFirst,
  aiExtension,
} from "./projects.mjs";
import { localDevelopment } from "./local-development.mjs";
import { addRetrieval } from "./retrieval.mjs";
import { focusedChecks } from "./construct-checks.mjs";

const all = [...a, ...b, ...c, ...d, ...e, ...f, ...g, ...h, ...i];
const quizzes = [...earlyQuizzes, ...laterQuizzes];
const visits = {
  2: [calculatorFirst],
  8: [pongFirst],
  14: [calculator],
  16: [pong, aiExtension],
};
const modules = syllabus.map((module, index) => ({
  ...module,
  activities: [
    ...all.filter((a) => a.chapter === index + 1),
    quizzes.find((q) => q.chapter === index + 1),
    ...(visits[index + 1] || []),
  ],
}));
modules.push({
  title: ["Python on your own computer", "Python op je eigen computer"],
  outcome: [
    "Set up a local project and begin one small idea of your own.",
    "Stel een lokaal project in en begin aan een klein eigen idee.",
  ],
  activities: [localDevelopment],
});
const activities = structuredClone(modules.flatMap((m) => m.activities));
focusedChecks(activities);
addRetrieval(activities);
const paths = [
  {
    id: "first-programs",
    title: L("Your first calculator", "Je eerste rekenmachine"),
    description: L(
      "Start with small programs and make useful choices.",
      "Begin met kleine programma’s en maak nuttige keuzes.",
    ),
    chapterNumbers: [1, 2],
    projectId: calculator.id,
  },
  {
    id: "first-game",
    title: L(
      "From reusable code to a rally",
      "Van herbruikbare code naar een rally",
    ),
    description: L(
      "Learn repetition, functions and state; make your first playable Pong.",
      "Leer herhaling, functies en toestand; maak je eerste speelbare Pong.",
    ),
    chapterNumbers: [3, 4, 5, 6, 7, 8],
    projectId: pong.id,
  },
  {
    id: "data-and-reliability",
    title: L(
      "More capable Python programs",
      "Pythonprogramma’s die meer kunnen",
    ),
    description: L(
      "Process collections, text and files, then improve your own calculator.",
      "Verwerk verzamelingen, tekst en bestanden en verbeter daarna je eigen rekenmachine.",
    ),
    chapterNumbers: [9, 10, 11, 12, 13, 14],
    projectId: calculator.id,
  },
  {
    id: "complete-and-continue",
    title: L(
      "Finish your game and continue independently",
      "Maak je spel af en ga zelfstandig verder",
    ),
    description: L(
      "Group state and behaviour, complete Pong, and move to a local editor.",
      "Groepeer toestand en gedrag, maak Pong af en ga verder in een lokale editor.",
    ),
    chapterNumbers: [15, 16, 17],
    projectId: pong.id,
  },
];
const required = activities.filter((a) => !a.optional);
const count = (kind) => required.filter((a) => a.kind === kind).length;
export const estimatedMinutes = required.reduce(
  (n, a) => n + a.estimatedMinutes,
  0,
);
export const estimatedHours = Math.ceil(estimatedMinutes / 60);
export const course = {
  version: 3,
  availability: "available",
  title: L(
    "Python: two projects that grow with you",
    "Python: twee projecten die met je meegroeien",
  ),
  reviewMinutes: [120, 240],
  paths,
  description: L(
    `Learn Python through ${modules.length} modules, ${count("coding")} coding activities and ${count("quiz")} short quizzes. Build a calculator and Pygame Pong, then improve both as your skills grow.`,
    `Leer Python in ${modules.length} modules met ${count("coding")} programmeeroefeningen en ${count("quiz")} korte quizzes. Bouw een rekenmachine en Pygame Pong en verbeter beide terwijl je vaardigheden groeien.`,
  ),
  chapters: modules.map((m, i) => ({
    number: i + 1,
    slug: m.title[0]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""),
    title: L(...m.title),
    outcome: "",
    outcomes: [L(...m.outcome)],
    pathId: paths.find((p) => p.chapterNumbers.includes(i + 1)).id,
    activityIds: m.activities.map((a) => a.id),
  })),
  groups: modules.flatMap((m, i) =>
    [...new Set(m.activities.map((a) => a.group))].map((id) => ({
      id,
      chapter: i + 1,
      title: m.activities.find((a) => a.group === id).kind.startsWith("project")
        ? m.activities.find((a) => a.group === id).title
        : L(...m.title),
      activityIds: m.activities.filter((a) => a.group === id).map((a) => a.id),
    })),
  ),
  activities,
};
