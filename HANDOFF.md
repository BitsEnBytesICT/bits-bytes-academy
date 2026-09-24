# Python course handoff

Updated 24 September 2026.

## Current state

The Python v4 audit fixes are implemented. The course retains 24 modules, one calculator project, one Pong project and six mini projects. Nine new graded activities close gaps before the projects and in dictionary/string practice. There are now 208 activities, including 180 graded coding/challenge activities and 23 quizzes with two forms each.

Read [the fix report](docs/audits/python-v4/FIXES.md) first. It maps every audit finding F01–F13 to its resolution. [The original audit](docs/audits/python-v4/README.md) and activity ledger describe the older `beec730` revision; they are historical evidence, not a list of unresolved bugs. `verification.json` contains the post-fix regression results.

### Main corrections

- Removed hidden variable/return/prompt restrictions and repaired instruction-by-instruction grading.
- Isolated file checks from learner-generated files and added stronger changed-input cases.
- Added a complete input conversation before the calculator and five practical event/rendering/control/collision/rally activities before Pong.
- Added bilingual traces, explicit function interfaces, observable function/class callers and clearer project readiness maps.
- Moved optional experiments after instructions and placed recall at useful later applications, with an optional review library for remaining topics.
- Corrected quiz content, improved retry variation and added incorrect-token explanations based on executed examples.

## Start or update the app

From the repository folder:

```powershell
git pull --ff-only
npm ci
npm run build
npm run launch
```

The normal application is at **http://localhost:3001/courses/python**. Refresh the page after an update. `npm run launch` reuses an already running server; it does not reload its cached course definitions. If a server was running before a new build, stop that repository's server process and launch it again. Check `data/server.pid` and verify the process command line before stopping it. `npm start` runs the server in the current terminal and needs port 3001 to be free. Never delete the learner database to refresh content.

Ports 3003 and 3004 were temporary verification servers. Port 3004 used an in-memory test database; do not use it for ongoing learning.

## Verified

These commands passed after the changes:

```text
npm test
npm run test:beginner-course
npm run test:audit-regressions
npm run test:rework
npm run build
```

The checks cover 188 executable examples, 180 reference solutions, unfinished starters, 461 behavioral probes, all 46 quiz forms, 27 audit regressions, ten integration mutations, generated call panels, sequential progress, API persistence, archive access and backup round trips.

Real browser verification passed all 18 graphical lesson references and all 14 Pong interaction checks. The full app also passed normalisation without a hidden variable, partial sequential completion with reload, and text/CSV/JSON save-and-reload checks. Tests used a separate in-memory profile; real learner records were not replaced.

## Next session: validate learning, then refine from evidence

1. Run beginner walkthroughs in English and Dutch: Hello World, input conversion, the new converter session, calculator, event/rendering/rally preparation, Pong, and classes/virtual pet. Use a separate profile/database.
2. Record where the learner hesitates, asks for an unexplained concept, needs hints, misreads an instruction or cannot see what their function did. Record actual elapsed time; the roughly 54-hour estimate is still provisional.
3. Have a fluent Dutch editor review wording, especially feedback, technical explanations and project briefs. Automated checks confirm presence and correctness, not naturalness for every learner.
4. Turn concrete observations into small changes and regression cases. Keep the current project count and sequence unless the observations justify a change.

There are no known failing automated checks. Beginner learning outcomes have not been established by a real learner pilot.

## Editing and preservation notes

- Author content in `content-src/beginner-course/`; regenerate with `npm run content`. Avoid editing generated lesson JSON directly.
- `learning-support.mjs` holds supplemental teaching/call panels; `evidence-contracts.mjs` distinguishes learner contributions from supplied code; `retrieval.mjs` places later recall.
- Regenerate incorrect-token feedback with `node scripts/build-quiz-feedback.mjs` when changing code-blank examples/tokens, then rebuild content and run the quiz checks.
- Revised quizzes have `quiz-r2` IDs. Exact original v4 quizzes are archived in `content/legacy/course-v4-original-quizzes.json`; versions 1–3 remain supported. Do not transfer old completion to a different task.
- Keep learner files, earned steps, attempts and backups. New activities need new IDs; stable IDs are retained only for equivalent task contracts.
- Run `node scripts/serve-browser-checks.mjs` for the graphical reference/Pong browser harness when changing game preparation or runtime code.

Suggested next prompt: “Read HANDOFF.md and the fix report. Help me run the beginner pilot one lesson at a time, record concrete problems, and fix only issues supported by those observations.”
