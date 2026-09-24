import type { Course, CourseSummary } from "../../shared/types.js";
export function courseCatalog(course: Course): CourseSummary[] {
  return [
    {
      slug: "python",
      title: "Python",
      status: "available",
      estimatedHours: Math.ceil(
        course.activities
          .filter((a) => !a.optional)
          .reduce((n, a) => n + a.estimatedMinutes, 0) / 60,
      ),
      description: course.description || {
        en: "Learn Python",
        nl: "Leer Python",
      },
      topics: course.chapters.map((c) => c.title),
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
        {
          en: "HTML structure and semantics",
          nl: "HTML-structuur en semantiek",
        },
        { en: "CSS styling and layout", nl: "CSS-styling en layout" },
        { en: "Responsive web pages", nl: "Responsive webpagina’s" },
      ],
    },
  ];
}
