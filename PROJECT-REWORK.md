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
- Five new EN/NL coding activities and one five-question quiz authored in module 1, including a code-blank question. All 15 task checks pass their reference programs. Three different supply-planning algorithms pass and three plausible boundary mistakes fail.
- Both project briefs and the standalone documentation-research reading authored; project pane and progressive hints implemented. The remaining 45 exercises/nine quizzes, optional AI extension, active-course assembly, and complete UI integration are still pending. Production continues to serve the original course during implementation.

## Teaching and assessment rules

Consolidate retained overlapping lessons; record old-to-new mapping separately from deferral. Support fades through guided, adaptation/debugging, and independent activities. Independent tasks describe behavior, not the algorithm. Useful starter code except explicit fresh-build tasks. Three hint levels: concept, approach/docs, small example. Full solutions remain a deliberate separate reveal. Both final projects have optional milestones and suggested manual tests, no grader; completion is the learner's decision.

## Runtime decision

Keep pinned Pyodide 314.0.7 and its ABI-matched pygame-ce 2.5.7 wheel (`import pygame`). Bundle the lockfile-verified wheel. SDL requires an HTML canvas and cooperative async yielding; validate browser behavior before graphical lesson authoring. Sources: https://pyodide.org/en/stable/usage/sdl.html and https://pyodide.org/en/stable/usage/keyboard-interrupts.html. Do not substitute a simulated pygame API or desktop-only game. Projects must run real learner code.
