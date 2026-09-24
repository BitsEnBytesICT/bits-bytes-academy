# Complete Python course implementation and verification

Implemented on 24 September 2026, starting from commit `6194d8400f76ffdcd0d75dba6eebbd9f1a1f3d23` with a clean working tree. The local production app now serves curriculum **v3** at [localhost:3001](http://localhost:3001/courses/python).

## Delivered

- 17 bilingual modules; 83 coding activities with examples, prediction prompts, 2–4 checkpoints, three hints, solution explanations and changed-input experiments.
- 16 six-question quizzes with two distinct forms each: 192 authored questions, including 128 executable prediction/completion programs.
- Two required projects across four visits. Calculator stages follow modules 2 and 14; Pong stages follow modules 8 and 16. Each family shares canonical files and revisions while retaining separate completion and unique milestones.
- 225 explicit objective contracts, 83 later recall prompts, module outcomes and advisory project readiness recaps.
- Crosswalk for all 151 distinct requested syllabus links, with repeated list/loop blocks consolidated. See [coverage](COURSE-COVERAGE.md) and [machine-readable evidence](content/curriculum-manifest.json).
- A six-section local-development article, with official links, Windows and macOS/Linux guidance, labelled shell commands and a troubleshooting box. No embedded workspace or required third project.
- V1 and unmodified V2 archives, explicit earlier-project copying, and backup compatibility. Rewritten activities use new IDs; earned completion is not transferred to different tasks.

## Reproducible automated checks

All passed:

| Command / suite | Evidence |
| --- | --- |
| `npm run test:complete-course` | Assembly and source crosswalk; 83 reference solutions; 83 unfinished starters rejected; all Python source compiled; 83 worked-example outputs; 304 isolated probes; 21 targeted misconception/alternative cases; 128 quiz-program outputs; generated-file probe isolation |
| Curriculum persistence suite | Five tests: HTTP aliases and stale-write 409s, separate stage completion, family milestones, all 32 form drafts and scoring, immutable attempt data, both historical registries, backup round trips |
| `npm test` | Historical v1 content/runtime plus 19 API, workspace, runner, quiz, terminal and presentation tests |
| `npm run test:rework` | Historical v2 reference/content suites, shared package/file/graphical grading, projects, revision and runner checks |
| `npm run build` | Content generation, bundled runtime, frontend/backend typecheck, Vite production build and server compilation |

Local detailed logs are under `data/v3-*.log`; they contain test output and are intentionally not tracked. Tests used memory databases or the separate `data/v3-browser-test.sqlite` profile, never the live learning profile.

## Browser verification

Used the in-app browser and the actual bundled Pyodide/pygame-ce interpreter.

- **14/14 graphical references** rendered real frames, exited normally and passed their checkpoints. Reproduce with `npm run test:browser`, open `http://127.0.0.1:3003`, and run the references.
- **12/12 match interaction checks** passed at `/match`: serve; simultaneous held controls; pause; focus loss/return; wall reflection; approaching-paddle correction; moving-away contact; scoring exactly once; winning; restart; Stop followed by Run; and capture of `result.json` on normal finish. The test fixture uses browser keyboard events and explicit ball placements for reproducible boundaries. These are automated browser interactions, not a human playtest study.
- In the full app, edited and ran a calculator workspace; generated text, CSV and JSON appeared as editor tabs. Navigated to the later calculator, reopened files, reloaded, and verified stage completion stayed separate.
- Edited and rendered Pong in the early project, then opened the final project and verified the same learner code remained. Rapid navigation exercised canonical draft recovery.
- Completed a quiz at 83%, checked misconception feedback and its lesson link, restored an unfinished token-placement draft after reload, retried with changed values, and confirmed the alternate form survived reload.
- Inspected Dutch article and class instructions, the worked-example prediction/output reveal, the editor and game layouts. The article has no editor, terminal or game controls.
- Seeded V1/V2 saved work only in the test profile, opened both archive entries in the UI, and verified a full API backup preview/restore preserved files and attempts.

## Local release and recovery

Before restarting, used SQLite's online backup API to capture the live database including WAL state:

`data/backups/before-course-v3-2026-09-24T13-04-31-700Z.sqlite`

Verified the old process belonged to this repository before replacing it. The live server now returns 17 chapters and 105 activities. Its served HTML matches `frontend/dist/index.html` and loads `/assets/index-Cwa_IzCI.js`. Startup preserved the live record counts: 2 workspaces, 2 progress records, 3 attempts and 2 settings. See `data/v3-release-verification.json` for the machine-checked release result.

Your old saved activities are available from **Manage learning data → Open saved work from earlier courses**. New-course progress starts separately. No database reset or automatic project-file replacement was performed.

## Learning validation still requiring real beginners

The 1,770-minute activity budget plus 2–4 hours of review is an authoring estimate. No recruited beginner sessions were run, and no claim of measured learning improvement is made.

For a pilot, observe these four routes without showing reference solutions first:

| Route | Observe | Record |
| --- | --- | --- |
| Modules 1–2 → first calculator | First typing, interpreting a traceback, zero boundary and combining decisions | Active minutes; hints opened; unexpected explanation needed; an independent changed-input result |
| Modules 7–8 → first Pong | Coordinate tracing, supplied loop versus learner code, held controls, collisions and reset | Setup confusion; recurring misconceptions; debugging attempts; working rally |
| Modules 13–14 → calculator upgrade | Inspecting generated files, write/append, CSV quoting, JSON round trip, recovery | Filesystem misconceptions; data lost or duplicated; ordinary/empty/malformed checks |
| Module 15 → complete Pong | self versus local values, independent instances, explaining responsibility choices | Transfer without copying; shared-state mistakes; appropriate use of classes |

Use those observations to adjust examples, scaffolding and time estimates. This remaining human validation cannot be inferred from passing software tests.
