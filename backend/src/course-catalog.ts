import type { CourseSummary } from "../../shared/types.js";
export const courseCatalog: CourseSummary[] = [
  {
    slug: "python",
    title: "Python",
    status: "available",
    estimatedHours: 22,
    description: {
      en: "Build a terminal calculator, then your own two-player Pong. Learn through guided repairs, independent exercises, quizzes, and two projects you design yourself.",
      nl: "Bouw een terminalrekenmachine en daarna je eigen Pong voor twee spelers. Leer met begeleide reparaties, zelfstandige oefeningen, quizzes en twee projecten die je zelf ontwerpt.",
    },
    topics: [
      { en: "Input, decisions, loops, and functions", nl: "Invoer, beslissingen, lussen en functies" },
      {
        en: "Libraries, multiple files, and finding documentation",
        nl: "Bibliotheken, meerdere bestanden en documentatie vinden",
      },
      {
        en: "Real pygame: drawing, controls, collisions, and scoring",
        nl: "Echte pygame: tekenen, besturing, botsingen en score",
      },
    ],
  },
  {
    slug: "csharp",
    title: "C#",
    status: "coming-soon",
    estimatedHours: null,
    description: {
      en: "An introduction to C# and the building blocks of .NET applications. This course is being planned.",
      nl: "Een introductie tot C# en de bouwstenen van .NET-applicaties. Deze cursus wordt voorbereid.",
    },
    topics: [
      { en: "Types and variables", nl: "Types en variables" },
      { en: "Methods and control flow", nl: "Methods en control flow" },
      { en: "Classes and objects", nl: "Classes en objects" },
    ],
  },
  {
    slug: "html-css",
    title: "HTML + CSS",
    status: "coming-soon",
    estimatedHours: null,
    description: {
      en: "Learn how web pages are structured and styled. This course is being planned.",
      nl: "Leer hoe webpagina’s worden opgebouwd en vormgegeven. Deze cursus wordt voorbereid.",
    },
    topics: [
      { en: "HTML structure and semantics", nl: "HTML-structuur en semantiek" },
      { en: "CSS styling and layout", nl: "CSS-styling en layout" },
      { en: "Responsive web pages", nl: "Responsive webpagina’s" },
    ],
  },
];
