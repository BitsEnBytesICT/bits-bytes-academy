# Calculator and Pong course rework

## Required outcome

Two active learning paths: Python Foundations — Build a Calculator, and Interactive Python — Build Pong. Ten modules, five substantial coding activities and a five-question quiz per module; one documentation-research reading; two self-assessed projects; one optional AI extension. Later topics remain unavailable. Keep EN/NL, existing fonts/panes, saved work, and confirmed curriculum jumps. Next requires completion. Projects have no automated checks or mandatory implementation structure.

## Verified original snapshot

Before any application edits, a full snapshot was created at `../../backups/python-course-before-project-rework-2026-09-23T21-29-39-600Z`. Original revision: `fe455a918a94adb635e367238e875edd4b8a075c`. Manifest covers 406 files, 240 activities in 13 chapters, all authoring sources and built assets, a Git bundle, and a consistent SQLite snapshot. Separate restore copy verified every file and all database rows; SQLite integrity check passed. Learner data counts: 11 workspaces, 11 progress rows, 2 settings, 21 attempts. Backups stay outside Git.

## Delivery gates

- [x] Snapshot and restore verification.
- [ ] Browser pygame: real drawing, keyboard, async loop, errors, watchdog, Stop/restart, focus loss, long play.
- [ ] Content model, legacy registry, archive access, backup compatibility, project persistence.
- [ ] Behavioral checker: isolated functions/input scripts, alternative solutions, current-run completion, graphical exercises.
- [ ] Calculator modules: useful programs; responsive programs; unexpected input; repetition; functions.
- [ ] Calculator self-assessed project from a fresh editor.
- [ ] Pong modules: state; libraries; scenes; movement; game rules.
- [ ] Reading: researching documentation. Pong self-assessed project; optional AI.
- [ ] Navigation, descriptions, duration, future lock, progress and Resume in EN/NL.
- [ ] Learner-facing desktop/mobile and keyboard checks; persistence, backup and conflict regression tests.
- [ ] Typecheck, production build, restart, Git push, run instructions.

## Current implementation evidence

- Pinned pygame wheel bundled and checked against the runtime lockfile hash. Real pygame-ce 2.5.7/SDL 2.32.10 drawn in browser on the existing Python 3.14.2 interpreter.
- Browser probe on port 3003: animation, `ArrowUp` and `w` events, streamed output, Stop, NameError, top-level non-yielding loop, async non-yielding loop, and starting another program after an error verified. Initial watchdog startup race was fixed by waiting for its armed acknowledgement; a Python trace deadline also catches ordinary non-yielding code. Full app integration, focus behavior, output limits, long play and mobile remain to verify.
- Behavioral probes pass alternatives, float tolerance, repeated/blank/Unicode stdin, EOF, raised exceptions, keyword arguments, and isolation of files/local imports/console variables. All 227 legacy reference programs, 206 negative cases and 64 quiz predictions still pass.
- New completion requires all exercise checks in one current run; prior earned completion remains intact. Project Run bypasses grading. Next handler now checks completion rather than relying on a disabled button alone.
- Legacy registry and archive endpoints implemented. Project milestones persist in the existing workspace JSON and backup v1 envelope. Tests prove empty projects can be self-completed, malformed milestone state is rejected, and original learner records remain restorable without counting toward a different curriculum.
- All five calculator-path modules are authored in EN/NL: 25 coding activities, 77 task checks, and five five-question quizzes. The progression is useful programs → input/decisions → validation/errors → repetition/recovery → reusable functions. All reference programs and blank-program rejection checks pass. This is authoring/runtime evidence; final learner-facing integration is still pending.
- Foundation assessment checks accept alternative Boolean expressions, sentinel loops, nested validation, different local variable names, equivalent formulas, keyword argument order, float results, and different money formatting. Twenty-five plausible mistakes are rejected, eight alternatives accepted, and two partial-repair cases exercised, in addition to the existing supply and responsive-program boundary tests. Function probes distinguish setup failures from errors actually raised by the requested function and expose that call’s own output/input effects for interface-separation checks.
- Modules 6–7 are authored and verified: game state (lists, coordinate tuples, dictionaries, copies, independent match reconstruction) and libraries (finite-number validation, randomness, real pygame.Rect objects, local helper files, independent two-file paddle layout). These add ten coding activities/two quizzes. Across modules 1–7, 35 references, 108 task checks, seven quizzes, and 27 executable explanation examples pass. State/library tests reject 20 additional plausible mistakes and accept eight alternate implementations.
- Terminal scripts and console commands automatically load only the bundled pygame-ce package when an actual import requires it, including imports in helper files and multiline console functions. Comments and string mentions do not trigger loading. Package startup uses the loading deadline, and the pygame support banner is suppressed so teaching outputs stay accurate. Real offscreen Surface drawing/pixel checks work in the same interpreter; no mock pygame API is involved. Window/canvas behavior still requires the graphical runner.
- Both project briefs and the standalone documentation-research reading are authored; project pane and progressive hints implemented. The remaining 15 Pong-path coding exercises/three quizzes, optional AI extension, active-course assembly, and complete UI integration are still pending. Production continues to serve the original course during implementation.

## Teaching and assessment rules

User addition: verify multi-file projects end to end and include one small practical lesson if not already covered. The lesson is authored as `python-v2-7-04` (One program, two files), assembled into module 7, and followed by a real-Pygame two-file paddle-layout exercise. Active-course/UI integration is still pending. Cover creating a helper file, both import styles, main.py as the Run entry point, save/reload, editing an imported file, and understandable import failures. Also check file-creation validation and use multiple saved files in the graphical runner. At final delivery, answer whether this is covered and ask the requested follow-up question.

Multi-file implementation evidence: four import styles (module, function, and aliases of each) pass the new lesson checker. Numeric display formatting remains flexible. Tests confirm edits to imported files take effect on the next full run, removed helpers produce ModuleNotFoundError, missing functions fail understandably, repaired modules recover, and probe substitutions do not alter learner files. A behavioral helper substitution catches code that imports the file but duplicates its calculation instead of using it. File creation now reports duplicate/invalid names and the 40-file limit, instead of silently doing nothing or creating an unsavable workspace. Browser file-tab/save/reload and multi-file pygame checks remain pending.

Consolidate retained overlapping lessons; record old-to-new mapping separately from deferral. Support fades through guided, adaptation/debugging, and independent activities. Independent tasks describe behavior, not the algorithm. Useful starter code except explicit fresh-build tasks. Three hint levels: concept, approach/docs, small example. Full solutions remain a deliberate separate reveal. Both final projects have optional milestones and suggested manual tests, no grader; completion is the learner's decision.

## Runtime decision

Keep pinned Pyodide 314.0.7 and its ABI-matched pygame-ce 2.5.7 wheel (`import pygame`). Bundle the lockfile-verified wheel. SDL requires an HTML canvas and cooperative async yielding; validate browser behavior before graphical lesson authoring. Sources: https://pyodide.org/en/stable/usage/sdl.html and https://pyodide.org/en/stable/usage/keyboard-interrupts.html. Do not substitute a simulated pygame API or desktop-only game. Projects must run real learner code.
