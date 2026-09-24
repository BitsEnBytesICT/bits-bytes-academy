# Calculator and Pong course rework

## Required outcome

Two active learning paths: Python Foundations — Build a Calculator, and Interactive Python — Build Pong. Ten modules, five substantial coding activities and a five-question quiz per module; one documentation-research reading; two self-assessed projects; one optional AI extension. Later topics remain unavailable. Keep EN/NL, existing fonts/panes, saved work, and confirmed curriculum jumps. Next requires completion. Projects have no automated checks or mandatory implementation structure.

## Verified original snapshot

Before any application edits, a full snapshot was created at `../../backups/python-course-before-project-rework-2026-09-23T21-29-39-600Z`. Original revision: `fe455a918a94adb635e367238e875edd4b8a075c`. Manifest covers 406 files, 240 activities in 13 chapters, all authoring sources and built assets, a Git bundle, and a consistent SQLite snapshot. Separate restore copy verified every file and all database rows; SQLite integrity check passed. Learner data counts: 11 workspaces, 11 progress rows, 2 settings, 21 attempts. Backups stay outside Git.

## Delivery gates

- [x] Snapshot and restore verification.
- [x] Browser pygame: real drawing, keyboard, async loop, errors, watchdog, Stop/restart, focus loss, long play.
- [x] Content model, legacy registry, archive access, backup compatibility, project persistence.
- [x] Behavioral checker: isolated functions/input scripts, alternative solutions, current-run completion, graphical exercises.
- [x] Calculator modules: useful programs; responsive programs; unexpected input; repetition; functions.
- [x] Calculator self-assessed project from a fresh editor.
- [x] Pong modules: state; libraries; scenes; movement; game rules.
- [x] Reading: researching documentation. Pong self-assessed project; optional AI.
- [x] Navigation, descriptions, duration, future lock, progress and Resume in EN/NL.
- [x] Learner-facing desktop/mobile and keyboard checks; persistence, backup and conflict regression tests.
- [ ] Typecheck, production build, restart, Git push, run instructions. (Only push remains.)

## Current implementation evidence

- Pinned pygame wheel bundled and checked against the runtime lockfile hash. Real pygame-ce 2.5.7/SDL 2.32.10 drawn in browser on the existing Python 3.14.2 interpreter.
- Browser probe on port 3003: animation, `ArrowUp` and `w` events, streamed output, Stop, NameError, top-level non-yielding loop, async non-yielding loop, and starting another program after an error verified. Initial watchdog startup race was fixed by waiting for its armed acknowledgement; a Python trace deadline also catches ordinary non-yielding code. Full App integration, focus pause/resume, multi-minute animation, graphical console inspection, Unicode/blank/EOF input, and mobile preview/terminal layout have since been verified. Output-limit messaging and a subsequent successful recovery run are verified.
- Behavioral probes pass alternatives, float tolerance, repeated/blank/Unicode stdin, EOF, raised exceptions, keyword arguments, and isolation of files/local imports/console variables. All 227 legacy reference programs, 206 negative cases and 64 quiz predictions still pass.
- New completion requires all exercise checks in one current run; prior earned completion remains intact. Project Run bypasses grading. Next handler now checks completion rather than relying on a disabled button alone.
- Legacy registry and archive endpoints implemented. Project milestones persist in the existing workspace JSON and backup v1 envelope. Tests prove empty projects can be self-completed, malformed milestone state is rejected, and original learner records remain restorable without counting toward a different curriculum.
- All five calculator-path modules are authored in EN/NL: 25 coding activities, 77 task checks, and five five-question quizzes. The progression is useful programs → input/decisions → validation/errors → repetition/recovery → reusable functions. All reference programs and blank-program rejection checks pass. Learner-facing integration and final regression checks passed.
- Foundation assessment checks accept alternative Boolean expressions, sentinel loops, nested validation, different local variable names, equivalent formulas, keyword argument order, float results, and different money formatting. Twenty-five plausible mistakes are rejected, eight alternatives accepted, and two partial-repair cases exercised, in addition to the existing supply and responsive-program boundary tests. Function probes distinguish setup failures from errors actually raised by the requested function and expose that call’s own output/input effects for interface-separation checks.
- Modules 6–7 are authored and verified: game state (lists, coordinate tuples, dictionaries, copies, independent match reconstruction) and libraries (finite-number validation, randomness, real pygame.Rect objects, local helper files, independent two-file paddle layout). These add ten coding activities/two quizzes. Across modules 1–7, 35 references, 108 task checks, seven quizzes, and 27 executable explanation examples pass. State/library tests reject 20 additional plausible mistakes and accept eight alternate implementations.
- Terminal scripts and console commands automatically load only the bundled pygame-ce package when an actual import requires it, including imports in helper files and multiline console functions. Comments and string mentions do not trigger loading. Package startup uses the loading deadline, and the pygame support banner is suppressed so teaching outputs stay accurate. Real offscreen Surface drawing/pixel checks work in the same interpreter; no mock pygame API is involved. Window/canvas behavior still requires the graphical runner.
- Graphical assessment core now shares the terminal checkpoint evaluator. Optional module-only probes import a reusable game module without starting its interactive main.py loop, and can inspect real Surface pixels or returned objects. Tests accept two rendering approaches, reject wrong pixels, and enforce supplied preview-frame/error gates. GameRunner now invokes this grader with actual preview frame counts after normal exit. The App browser check verifies an unfinished scene fails, a valid scene passes after Finish & check, and merely using a solution no longer awards completion.
- Both project briefs and the standalone documentation-research reading are authored; project pane and progressive hints implemented. All 15 remaining graphical exercises/three quizzes, the optional AI extension, and active-course assembly are now implemented. The updated production build is now running on port 3001.

## Teaching and assessment rules

User addition: verify multi-file projects end to end and include one small practical lesson if not already covered. The lesson is authored as `python-v2-7-04` (One program, two files), assembled into module 7, and followed by a real-Pygame two-file paddle-layout exercise. Active-course/UI integration is implemented. Cover creating a helper file, both import styles, main.py as the Run entry point, save/reload, editing an imported file, and understandable import failures. Also check file-creation validation and use multiple saved files in the graphical runner. At final delivery, answer whether this is covered and ask the requested follow-up question.

Multi-file implementation evidence: four import styles (module, function, and aliases of each) pass the new lesson checker. Numeric display formatting remains flexible. Tests confirm edits to imported files take effect on the next full run, removed helpers produce ModuleNotFoundError, missing functions fail understandably, repaired modules recover, and probe substitutions do not alter learner files. A behavioral helper substitution catches code that imports the file but duplicates its calculation instead of using it. File creation now reports duplicate/invalid names and the 40-file limit, instead of silently doing nothing or creating an unsavable workspace. Browser checks now cover the actual file-creation dialog, duplicate-name rejection, a function-style import, formatted numeric output, running main.py while the helper tab is selected, grading, and restoring both files/completion after reload. Real multi-file pygame rendering and normal grading have also been verified.

Consolidate retained overlapping lessons; record old-to-new mapping separately from deferral. Support fades through guided, adaptation/debugging, and independent activities. Independent tasks describe behavior, not the algorithm. Useful starter code except explicit fresh-build tasks. Three hint levels: concept, approach/docs, small example. Full solutions remain a deliberate separate reveal. Both final projects have optional milestones and suggested manual tests, no grader; completion is the learner's decision.

## Runtime decision

Keep pinned Pyodide 314.0.7 and its ABI-matched pygame-ce 2.5.7 wheel (`import pygame`). Bundle the lockfile-verified wheel. SDL requires an HTML canvas and cooperative async yielding; validate browser behavior before graphical lesson authoring. Sources: https://pyodide.org/en/stable/usage/sdl.html and https://pyodide.org/en/stable/usage/keyboard-interrupts.html. Do not substitute a simulated pygame API or desktop-only game. Projects must run real learner code.

## Latest integration evidence

- Active assembly: 64 activities / 63 required, 50 coding exercises with 155 checkpoints, ten five-question quizzes, one article, two self-assessed projects, and one optional AI extension. Estimated required duration is 22 hours. Guidance mix: 21 guided, 19 adaptation/debugging, ten independent exercises. The consolidation/deferral distinction is documented in COURSE-REWORK-MAP.md.
- New graphical unit coverage: 15 reference solutions, 15 unfinished starters rejected, 15 missing-preview cases rejected, five valid alternatives accepted, and twelve plausible mistakes rejected. All 50 course reference programs and 30 executable explanation examples pass.
- Browser QA uses a separate SQLite database and Vite/API on 5175/3004. Production learner data is not used for test attempts. A separate browser suite passed all fifteen graphical reference main.py programs using the real iframe interpreter, normal QUIT exit, actual rendered frames, and assessment.
- Reading view has no editor/terminal and requires explicit completion; completion survives reload. Both course paths and the future placeholder render correctly. Old saved lesson URLs open the read-only archive.
- Projects can be marked complete with unchecked milestones. Optional AI Copy my Pong copies main.py and a second helper file into an independent workspace; an unnecessary interruption message was removed from that flow.
- Mobile 390×844 layout, long project titles, Dutch language controls, game/terminal tab, and curriculum drawer focus trapping/Escape return verified. Existing pane sizing and typography remain in place.
- Quiz browser checks: wrong-answer explanation, correct token placement, draft restoration after reload, per-blank feedback, a completed 80% result, best score, unlocked Continue, and shuffled retry with fresh answers.
- Browser testing found and fixed the unsupported native file prompt and a missing solution-note crash. Authoring now supplies bilingual solution notes and tests enforce them. Using a reference marks assistance but requires a subsequent graded Run.
- Existing legacy runtime/content tests passed; the API test was updated for the new catalog duration and new active quiz ID, then passed. The final complete npm test and npm run test:rework suites passed, as did typecheck and production build. Production restart preserved all 12 workspaces, 11 progress rows, 2 settings, and 21 attempts byte-for-byte at the row level; SQLite integrity passed. The homepage, new overview, and original-work archive were checked on the production build.
