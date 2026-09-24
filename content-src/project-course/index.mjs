import { L } from "./authoring.mjs";
import { activities as one } from "./01-useful-programs.mjs";
import { activities as two } from "./02-responsive-programs.mjs";
import { activities as three } from "./03-unexpected-input.mjs";
import { activities as four } from "./04-repetition.mjs";
import { activities as five } from "./05-organising-solutions.mjs";
import { activities as six } from "./06-game-state.mjs";
import { activities as seven } from "./07-using-tools.mjs";
import { activities as eight } from "./08-scenes.mjs";
import { activities as nine } from "./09-movement.mjs";
import { activities as ten } from "./10-game-rules.mjs";
import { calculatorProject, pongProject } from "./projects.mjs";
import { researchReading } from "./research-reading.mjs";
import { aiExtension } from "./ai-extension.mjs";

const modules = [
  ["useful-programs", L("Useful programs", "Nuttige programma’s"), one],
  [
    "responsive-programs",
    L("Input and decisions", "Invoer en beslissingen"),
    two,
  ],
  ["unexpected-input", L("Unexpected input", "Onverwachte invoer"), three],
  ["repetition", L("Repetition and recovery", "Herhaling en herstel"), four],
  [
    "organising-solutions",
    L("Organising a solution", "Een oplossing organiseren"),
    [...five, calculatorProject],
  ],
  ["game-state", L("Representing game state", "Speltoestand voorstellen"), six],
  [
    "using-tools",
    L("Libraries and local files", "Bibliotheken en lokale bestanden"),
    [...seven.slice(0, 5), researchReading, seven[5]],
  ],
  ["scenes", L("Scenes and events", "Scènes en gebeurtenissen"), eight],
  ["movement", L("Movement and control", "Beweging en besturing"), nine],
  [
    "game-rules",
    L("Rallies and matches", "Rally’s en wedstrijden"),
    [...ten, pongProject, aiExtension],
  ],
];
export const course = {
  version: 2,
  availability: "available",
  title: L(
    "Python: from calculator to Pong",
    "Python: van rekenmachine tot Pong",
  ),
  paths: [
    {
      id: "calculator",
      title: L(
        "Python Foundations — Build a Calculator",
        "Pythonbasis — Bouw een rekenmachine",
      ),
      description: L(
        "Write useful terminal programs, handle input and errors, and organise your own calculator.",
        "Schrijf nuttige terminalprogramma’s, handel invoer en fouten af en organiseer je eigen rekenmachine.",
      ),
      chapterNumbers: [1, 2, 3, 4, 5],
      projectId: calculatorProject.id,
    },
    {
      id: "pong",
      title: L(
        "Interactive Python — Build Pong",
        "Interactieve Python — Bouw Pong",
      ),
      description: L(
        "Use libraries and multiple files, draw and control a game, and build your own two-player Pong.",
        "Gebruik bibliotheken en meerdere bestanden, teken en bestuur een spel en bouw je eigen Pong voor twee spelers.",
      ),
      chapterNumbers: [6, 7, 8, 9, 10],
      projectId: pongProject.id,
    },
  ],
  chapters: modules.map(([slug, title, activities], i) => ({
    number: i + 1,
    slug,
    title,
    outcome: "",
    pathId: i < 5 ? "calculator" : "pong",
    activityIds: activities.map((a) => a.id),
  })),
  groups: modules.flatMap(([, title, activities], i) =>
    [...new Set(activities.map((a) => a.group))].map((id) => ({
      id,
      chapter: i + 1,
      title:
        id.includes("project") || id.endsWith("-ai")
          ? activities.find((a) => a.group === id).title
          : title,
      activityIds: activities.filter((a) => a.group === id).map((a) => a.id),
    })),
  ),
  activities: modules.flatMap(([, , activities]) => activities),
};
export const estimatedHours = Math.ceil(
  course.activities
    .filter((a) => !a.optional)
    .reduce((sum, a) => sum + a.estimatedMinutes, 0) / 60,
);
