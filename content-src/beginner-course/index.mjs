import fs from "node:fs";
import { chapters as outline } from "./chapters.mjs";
import { L } from "./authoring.mjs";
import { makeQuizzes } from "./quiz-authoring.mjs";
import { specs as early } from "./quizzes.mjs";
import { specs as late } from "./quizzes-later.mjs";
import { calculator, pong } from "./projects.mjs";
import { localDevelopment } from "./local-development.mjs";
const paths = fs
  .readdirSync(new URL(".", import.meta.url))
  .filter((n) => /^\d\d-.*\.mjs$/.test(n))
  .sort();
export const lessons = (
  await Promise.all(paths.map((n) => import(new URL(n, import.meta.url))))
).flatMap((m) => m.activities);
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
const activities = outline.flatMap((_, i) => [
  ...lessons.filter((a) => a.chapter === i + 1),
  ...quizzes.filter((a) => a.chapter === i + 1),
  ...[calculator, pong, localDevelopment].filter((a) => a.chapter === i + 1),
]);
// Delayed, optional self-explanation: refer to a specific earlier example and
// a changed-input experiment. These prompts are retrieval, not graded mastery.
for (const source of lessons) {
  const candidates = activities.filter(
    (a) => a.kind !== "quiz" && a.chapter === Math.min(24, source.chapter + 2),
  );
  const within = lessons
    .filter((a) => a.chapter === source.chapter)
    .indexOf(source);
  const destination = candidates[within % candidates.length];
  const prompt =
    source.sections[0].prediction ||
    L(
      "Explain the example’s execution order.",
      "Leg de uitvoeringsvolgorde van het voorbeeld uit.",
    );
  const change = source.sections.at(-1).body;
  (destination.retrievals ||= []).push({
    id: `recall-${source.id}`,
    sourceActivityId: source.id,
    objectiveIds: source.topicIds,
    prompt: L(
      `Recall “${source.title.en}”. ${prompt.en} Try the earlier example from memory, then check it. ${change.en}`,
      `Haal “${source.title.nl}” terug. ${prompt.nl} Probeer het eerdere voorbeeld uit je geheugen en controleer daarna. ${change.nl}`,
    ),
  });
}
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
