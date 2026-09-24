import fs from "node:fs";
import { execFileSync } from "node:child_process";
const root = "docs/audits/python-v4";
// This ledger describes the original audit, not subsequent revised content.
const course = JSON.parse(
  execFileSync(
    "git",
    ["show", "beec730ad347902c5bd2be6e58c0e0c4dc156e55:content/course.json"],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  ),
);
const notes = JSON.parse(
  fs.readFileSync(`${root}/activity-notes.json`, "utf8"),
);
const ids = course.activities.map((a) => a.id.replace("python-v4-", ""));
if (
  ids.some((id) => !notes[id]) ||
  Object.keys(notes).some((id) => !ids.includes(id))
)
  throw Error("The audit must cover every active activity exactly once.");
const counts = Object.values(notes).reduce((acc, [status]) => {
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});
const text = [
  "# Python v4: activity-by-activity review",
  "",
  "Audited 24 September 2026 against commit beec730ad347902c5bd2be6e58c0e0c4dc156e55. Read the [findings and improvement plan](README.md) first for shared issues F01–F13 and verification limits.",
  "",
  `All ${course.activities.length} activities are listed in course order: ${counts.Keep} Keep, ${counts.Improve} Improve and ${counts.Fix} Fix. These are editorial triage decisions, not measured learner outcomes.`,
  "",
  "- **Keep:** no material task-specific defect found; retain the core design. Shared interface and feedback improvements still apply.",
  "- **Improve:** useful task, with a specific clarity, scaffolding, transfer or assessment improvement.",
  "- **Fix:** a reproduced grading mismatch, missing mandatory interface or factual content defect requires correction.",
  "",
  "Verification baseline: all 171 graded reference solutions pass and their unfinished starters do not earn full completion. All 173 documented-output Python examples pass. Both forms of all 23 quizzes were reviewed; 184 prediction/completion programs run correctly and all 184 incorrect blank tokens fail to reproduce the required output. The 13 graphical references also pass through the real browser preview. Main projects are self-assessed; their reference fixtures and manual-test coverage were reviewed separately.",
  "",
  "A passing reference is not proof that a valid learner alternative passes. See evidence.json for 27 additional adversarial cases and sequential-prefixes.json for runnable-prefix checks of 41 multi-instruction terminal activities. Prefix checks locate possible dependencies; they do not replace semantic review of each instruction.",
  "",
  "IDs below omit the common `python-v4-` prefix. Lesson task wording was reviewed in English and Dutch. Bilingual field completeness is automated; a full independent Dutch editorial proofread and real novice sessions remain future validation.",
  "",
];
for (const chapter of course.chapters) {
  const activities = course.activities.filter(
    (a) => a.chapter === chapter.number,
  );
  text.push(
    `## ${chapter.number}. ${chapter.title.en}`,
    "",
    `Current authored estimate: ${activities.reduce((sum, a) => sum + a.estimatedMinutes, 0)} minutes. This includes the quiz and any project in this module.`,
    "",
    "| ID | Activity | Decision | Task-specific judgment and next action |",
    "|---|---|---|---|",
  );
  for (const a of activities) {
    const id = a.id.replace("python-v4-", "");
    const [status, note] = notes[id];
    text.push(
      `| ${id} | ${a.title.en.replaceAll("|", "\\|")} | **${status}** | ${note.replaceAll("|", "\\|")} |`,
    );
  }
  text.push("");
}
text.push(
  "## Interpretation",
  "",
  "Keep the gradual opening, the 24-module dependency order, one calculator and one Pong project. Address the shared blockers before adding content. Add integrated practice where learner work currently stops at a helper function; split dense new concepts where needed. Do not inflate every focused lesson into a five-step sequence.",
  "",
);
fs.writeFileSync(`${root}/activity-by-activity.md`, text.join("\n"));
console.log(
  JSON.stringify({
    activities: ids.length,
    counts,
    output: `${root}/activity-by-activity.md`,
  }),
);
