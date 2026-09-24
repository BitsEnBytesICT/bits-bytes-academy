import fs from "node:fs";
import path from "node:path";
import {
  course,
  estimatedHours,
  estimatedMinutes,
} from "../content-src/beginner-course/index.mjs";
import { createManifest } from "../content-src/beginner-course/manifest.mjs";
const manifest = createManifest(
  course,
  JSON.parse(fs.readFileSync("content/legacy/course-v1.json", "utf8")),
);
for (const v of [1, 2, 3]) {
  const old = JSON.parse(
    fs.readFileSync(`content/legacy/course-v${v}.json`, "utf8"),
  );
  if (old.activities.some((a) => course.activities.some((b) => b.id === a.id)))
    throw Error(`v${v} identities must remain archived`);
}
for (const chapter of course.chapters) {
  const directory = path.join(
    "content/beginner-course",
    String(chapter.number).padStart(2, "0") + "-" + chapter.slug,
  );
  fs.mkdirSync(directory, { recursive: true });
  // Rewritten quizzes have new identities; their exact old definitions live in
  // legacy/course-v4-original-quizzes.json. Remove only the obsolete generated
  // file in this known chapter directory, never learner data or arbitrary files.
  const oldQuiz = path.resolve(
    directory,
    `python-v4-${String(chapter.number).padStart(2, "0")}-quiz.json`,
  );
  if (!oldQuiz.startsWith(path.resolve("content/beginner-course") + path.sep))
    throw Error("Invalid generated path");
  if (fs.existsSync(oldQuiz)) fs.unlinkSync(oldQuiz);
  fs.writeFileSync(
    path.join(directory, "chapter.json"),
    JSON.stringify(chapter, null, 2),
  );
  for (const id of chapter.activityIds)
    fs.writeFileSync(
      path.join(directory, id + ".json"),
      JSON.stringify(
        course.activities.find((a) => a.id === id),
        null,
        2,
      ),
    );
}
fs.writeFileSync("content/course.json", JSON.stringify(course, null, 2));
fs.writeFileSync(
  "content/curriculum-manifest.json",
  JSON.stringify(manifest, null, 2),
);
fs.writeFileSync(
  "COURSE-COVERAGE.md",
  [
    "# Python version 4 coverage",
    "",
    "Generated from explicit lesson sections, required checkpoints, question forms and delayed retrieval prompts. Runtime setup is excluded. The 151 distinct linked syllabus entries are consolidated below; repeated entries share evidence. File and class reviews also appear in independent activities and module quizzes.",
    "",
    `The active course has ${manifest.counts.topics} stable topic contracts. Exact evidence is in [the manifest](content/curriculum-manifest.json). Optional self-explanation is retrieval, not graded proof of mastery.`,
    "",
    "| Requested subject | Topics | Introduction |",
    "| --- | --- | --- |",
    ...manifest.requestedSyllabus.map(
      (r) =>
        `| [${r.referenceTitle.en}](${r.sourceUrl}) | ${r.topicIds.join(", ")} | ${[...new Set(r.evidence.map((t) => t.introduction))].join(", ")} |`,
    ),
    "",
  ].join("\n"),
);
fs.writeFileSync(
  "COURSE-REWORK-MAP.md",
  [
    "# Python course version 4 — beginner path",
    "",
    `24 modules, ${manifest.counts.coding} focused coding lessons, six graded mini projects, 23 quizzes with two forms each, two self-assessed main projects, and a final local-development article.`,
    "",
    `Activity estimates sum to ${estimatedMinutes} minutes (approximately ${estimatedHours} hours). This is a provisional authoring estimate; no fixed duration target was used. Review time and actual beginner completion times require learner validation.`,
    "",
    "## Linear path",
    "",
    "| Module | Outcome | Activities | Estimated minutes |",
    "| --- | --- | --- | --- |",
    ...course.chapters.map(
      (c) =>
        `| ${c.number}. ${c.title.en} | ${c.outcome} | ${c.activityIds.length} | ${course.activities.filter((a) => a.chapter === c.number).reduce((n, a) => n + a.estimatedMinutes, 0)} |`,
    ),
    "",
    "## Projects",
    "",
    "- Delivery-price adviser after decisions; activity-log analyser after list loops; number-guessing game after modules.",
    "- One calculator after module 10: functions, input, repetition, validation, retrying and cancellation have already been practised.",
    "- One procedural Pong after module 16: graphics, controls, movement, collision correction, scoring and serving precede it. Its AI extension stays in the same workspace.",
    "- Text cleaner after strings; club results book after CSV and JSON; virtual pet after classes.",
    "",
    "## Teaching and assessment",
    "",
    "The first eight activities cover running Hello World, writing one print from an empty file, execution order, quotes, numbers versus quoted text, comments, one syntax repair, and an independent announcement. Variables arrive in module 2.",
    "",
    "Coding lessons provide bilingual teaching, analogous worked examples, predictions, focused instructions, three hints, explained reference solutions and changed-input experiments. Runtime setup and data fixtures are supplied; short independent tasks use empty editors. New topics later in the course receive working examples again.",
    "",
    "Sequential instructions keep future steps readable, neutral and locked. A fully correct first run passes all steps. Otherwise only the active step earns progress; first-time completion requires every current requirement to pass together. Historical definitions retain their earlier grading interface.",
    "",
    "Each quiz form has two predictions, two completions, one debugging/test-selection question and one application question. Earlier material is retrieved in later modules. Scores and review links remain advisory; drafts and form identity are persisted.",
    "",
    "## Source and preservation",
    "",
    "All 56 files in curriculum/ were reviewed as pacing references. Empty or answer-filled source files were not mistaken for starters; new source lives in content-src/beginner-course/. Codecademy URLs identify the supplied checklist; external lesson text was not copied.",
    "",
    "Version 3 is frozen at content/legacy/course-v3.json alongside versions 1 and 2. New activities have v4 IDs. Archive stages resolve to canonical project files; no credit transfers to changed tasks. The active course has no project stages or copy-earlier-project UI.",
    "",
    "## Verification",
    "",
    "Run npm run test:beginner-course, npm test, the runtime/persistence suites and npm run build. Browser fixtures test real pygame-ce rendering and controls. See COURSE-V4-IMPLEMENTATION.md for release evidence and remaining real-learner validation.",
    "",
    "## Full lesson sequence",
    "",
    ...course.chapters.flatMap((c) => [
      `### ${c.number}. ${c.title.en}`,
      "",
      ...c.activityIds.map((id) => {
        const a = course.activities.find((a) => a.id === id);
        return `- ${a.title.en} (${a.kind}, ${a.estimatedMinutes} min) — ${a.id}`;
      }),
      "",
    ]),
  ].join("\n"),
);
console.log(
  `Course v4: ${course.activities.length} activities, ${manifest.counts.coding} coding lessons, 6 mini projects, 2 main projects, 46 quiz forms, ${manifest.counts.topics} topics; provisional ${estimatedHours} hours.`,
);
