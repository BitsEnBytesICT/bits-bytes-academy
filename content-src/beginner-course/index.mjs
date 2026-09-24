import fs from "node:fs";
import { chapters as outline } from "./chapters.mjs";
import { L } from "./authoring.mjs";
import { makeQuizzes } from "./quiz-authoring.mjs";
import { specs as early } from "./quizzes.mjs";
import { specs as late } from "./quizzes-later.mjs";
import { calculator, pong } from "./projects.mjs";
import { localDevelopment } from "./local-development.mjs";
import { addLearningSupport } from "./learning-support.mjs";
import { addRetrieval, reviewLibrary } from "./retrieval.mjs";
import { applyEvidenceContracts } from "./evidence-contracts.mjs";
const paths = fs
  .readdirSync(new URL(".", import.meta.url))
  .filter((n) => /^\d\d-.*\.mjs$/.test(n))
  .sort();
export const lessons = (
  await Promise.all(paths.map((n) => import(new URL(n, import.meta.url))))
).flatMap((m) => m.activities);
for (const [id, after] of [
  ["18-both-format-forms", "18-format"],
  ["19-build-record", "19-update"],
  ["19-keys-and-values", "19-views"],
]) {
  const index = lessons.findIndex((a) => a.id === `python-v4-${id}`);
  const [activity] = lessons.splice(index, 1);
  lessons.splice(
    lessons.findIndex((a) => a.id === `python-v4-${after}`) + 1,
    0,
    activity,
  );
}
const aliases = {
  assignment: "variables",
  comparisons: "relational-operators",
};
for (const a of lessons)
  a.requiredConcepts = a.requiredConcepts.map((t) => aliases[t] || t);
// The orientation is a reading; its immediate independent print is the practice evidence.
lessons
  .find((a) => a.id === "python-v4-01-first-print")
  .checkpoints[0].objectiveIds.push("welcome");
const quizzes = makeQuizzes([...early, ...late], lessons, outline);
addLearningSupport(lessons);
applyEvidenceContracts(lessons);
const activities = outline.flatMap((_, i) => [
  ...lessons.filter((a) => a.chapter === i + 1),
  ...(i === 22 ? [reviewLibrary] : []),
  ...quizzes.filter((a) => a.chapter === i + 1),
  ...[calculator, pong, localDevelopment].filter((a) => a.chapter === i + 1),
]);
addRetrieval(lessons, activities);
export const estimatedMinutes = activities.reduce(
  (n, a) => n + a.estimatedMinutes,
  0,
);
export const estimatedHours = Math.ceil(estimatedMinutes / 60);
const count = (kind) => activities.filter((a) => a.kind === kind).length;
export const course = {
  version: 4,
  availability: "available",
  title: L("Python, step by step", "Python, stap voor stap"),
  description: L(
    `Start with Hello World. Learn through 24 gradual modules, ${count("coding")} focused exercises, six mini projects and 23 quizzes. Build one calculator and one Pygame Pong game when you are ready. The provisional ${estimatedHours}-hour estimate is based on the authored activities.`,
    `Begin met Hello World. Leer in 24 geleidelijke modules met ${count("coding")} gerichte oefeningen, zes miniprojecten en 23 quizzes. Bouw één rekenmachine en één Pygame Pong-spel wanneer je er klaar voor bent. De voorlopige schatting van ${estimatedHours} uur is gebaseerd op de geschreven activiteiten.`,
  ),
  chapters: outline.map((c, i) => ({
    number: i + 1,
    slug: c[0].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: L(c[0], c[1]),
    outcome: c[2],
    outcomes: [L(c[2], c[3])],
    activityIds: activities.filter((a) => a.chapter === i + 1).map((a) => a.id),
  })),
  groups: outline.map((c, i) => ({
    id: `python-v4-module-${i + 1}`,
    chapter: i + 1,
    title: L(c[0], c[1]),
    activityIds: activities.filter((a) => a.chapter === i + 1).map((a) => a.id),
  })),
  activities,
};
