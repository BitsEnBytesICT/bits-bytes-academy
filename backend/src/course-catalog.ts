import type { CourseSummary } from "../../shared/types.js";
export const courseCatalog: CourseSummary[] = [
  {
    slug: "python",
    title: "Python",
    status: "available",
    estimatedHours: 20,
    description: {
      en: "Learn to write, run, and debug Python. Build your understanding through explanations, hands-on exercises, and quizzes.",
      nl: "Leer Python schrijven, uitvoeren en debuggen. Bouw je kennis op met uitleg, praktische oefeningen en quizzes.",
    },
    topics: [
      { en: "Variables and control flow", nl: "Variables en control flow" },
      {
        en: "Lists, strings, and dictionaries",
        nl: "Lists, strings en dictionaries",
      },
      {
        en: "Functions, files, and classes",
        nl: "Functions, bestanden en classes",
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
