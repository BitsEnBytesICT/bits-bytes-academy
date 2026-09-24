# Bits & Bytes Academy

A personal Python learning website with the blue/orange palette and application stack of the Bits & Bytes management platform. Lessons are on the left, your code is in the middle, and real Python output is on the right. Narrow screens have Learn, Code, and Terminal tabs.

## Open the website

Double-click **Start Python Lab.cmd** in this folder. It starts the app in the background and opens **http://localhost:3001**. Running it again opens the existing server. Node.js must remain installed. There is no account or login to configure.

For a fresh clone, install Node.js 24 and run these commands from this folder:

```sh
npm ci
npm run build
npm start
```

The build prepares the bundled Python runtime automatically. Dependencies, generated application builds, local learning records, backups, and logs are excluded from Git. Transfer your own learning data separately through the homepage's **Manage learning data** controls.

For development, run `npm run dev` and open http://localhost:5174. The API remains on port 3001; stop an existing production server before starting the development API. `npm start` runs in the current terminal and stops with Ctrl+C. The double-click launcher writes its process ID and logs in `data/`.

## What is included

- Version 4: 24 gradual modules, 165 coding lessons, six graded mini projects, 23 six-question quizzes in two forms, and two main projects. The calculator follows module 10; procedural Pygame Pong follows module 16. A final article introduces local development.
- English and Dutch explanations, tasks, hints, feedback, and interface text. Python syntax stays in English.
- A course homepage, Python overview with Start/Resume, and coming-soon previews for C# and HTML + CSS. The 198 required activities total 3,021 estimated minutes (displayed as approximately 51 hours). Estimates are provisional until beginner sessions validate them. Preview courses have no announced duration.
- Real pygame-ce graphics with a canvas preview, keyboard controls, focus-loss pause, normal Finish & check, emergency Stop, and a persistent console for inspecting a finished run. Projects are assessed by the learner, without required function names or automated completion tests.
- An xterm.js terminal with editable commands, history, ANSI output, real Python errors, `input()` and `sys.stdin.readline()`, Stop/Ctrl+C, and checks against program results.
- Editable files, local Python imports, and text/CSV/JSON files created by your code.
- Hints, per-file side-by-side solution differences with line numbers and addition/deletion highlighting, and an explicit assisted-completion marker when you use a solution.
- Multiple-choice quizzes and code-blank questions with selectable tokens, per-blank feedback and saved drafts. Changed question forms and shuffled choices/tokens on retry, lesson review links, and best scores. Completion remains separate from readiness.
- Sequential exercise instructions: earned steps unlock the next task, future tasks stay neutral, and a correct complete program can pass every step on its first run. Navigation remains flexible, with a manual jump that leaves skipped activities incomplete.
- Automatic code saving, local draft recovery, saved progress, and backup export/import through **Manage learning data** on the homepage.

Video walkthroughs are excluded. The calculator and Pong projects are part of the active course. This is an independently written course following the researched topic sequence; it is not a downloaded copy of Codecademy's explanations or question bank and is not affiliated with Codecademy.

The active course builds toward the two projects through guided examples, debugging/adaptation tasks, and independent exercises. Support fades within each new concept; project milestones and hints remain optional. See `COURSE-REWORK-MAP.md` for the complete learning path and topic coverage. `COURSE-REVISION.md` records the earlier curriculum revision.

Existing learner files are kept when course content changes. **Reset code** loads the current starter when you explicitly choose to start that activity over. Versions 1, 2 and 3 and their activity IDs remain in the archive registry. Historical project stages resolve to their original shared workspace. Saved historical work is available under **Manage learning data → Open saved work from earlier courses**; old lesson URLs open that archive. New activities use new IDs, so old completion does not incorrectly complete the reworked course.

Existing quiz attempts retain their original questions and answers. **Try again** starts the updated format after finishing an older attempt. Code-blank drafts and submitted token choices are saved with the attempt; existing backups remain readable. The backup envelope and database schema are unchanged, with optional versioned quiz fields added.

## Stack and design

| Layer   | Technology                                                                         |
| ------- | ---------------------------------------------------------------------------------- |
| Website | React 19, TypeScript 6, Vite 8, React Router 7, Tailwind CSS 4                     |
| Editor  | CodeMirror 6 with Python highlighting and Ctrl+Enter to run                        |
| Python  | Pyodide 314.0.7; terminal worker and a canvas interpreter for real pygame-ce 2.5.7 |
| API     | Express 5, Zod validation, controller/service/DAO separation                       |
| Storage | SQLite with better-sqlite3, WAL, versioned workspace saves                         |
| Style   | Blue `#317199`, orange `#f2880f`, light blue `#92d5ff`, local Outfit font          |

The source platform's application stack is retained. React Router and Vite use newer compatible releases to resolve the dependency warnings found during implementation. The original management-platform repository was not modified.

Python runs on your browser's processor. Terminal lessons retain one worker per activity; graphical lessons use a canvas interpreter with a watchdog. The server stores learning data and serves the website; it does not execute student Python as host processes. A full script run starts with a fresh namespace and your saved workspace files. Its resulting variables remain available for console inspection. Console commands share variables within the current activity and never award completion. Stopping execution, resetting the console, reloading, or navigating away discards temporary console variables while retaining saved work.

The lesson layout keeps the original font sizes, pane widths, draggable dividers, and responsive breakpoints. Learn and Instructions share a scrolling pane. The header contains the smaller supplied Bits & Bytes logo, blue lesson navigation with progress segments and a curriculum button, and English/Dutch flag controls. On screens up to 540 pixels, lesson navigation occupies a second header row. The keyboard-accessible curriculum drawer also links to the course overview. Course cards and overviews share local Devicon SVG language icons. Python file tabs use the Python logo. The editor and lesson examples use the existing Python syntax palette. Dark quiz code, code blanks and answer-review examples use a separately scoped light palette with tested contrast of at least 4.5:1. Editor selections use a visible blue background, including when focus moves away.

Internet access is not required while the installed app is running: the Python runtime and font are bundled locally. This is an ordinary web app rather than a service-worker/PWA setup, keeping installation and maintenance simple.

## Source and course files

```text
frontend/src/                 React interface, editor, saves, Python worker client
frontend/public/runtime/     Python execution/grading bridge and bundled interpreter
backend/src/                 Express API and SQLite persistence
shared/types.d.ts            Shared course and workspace contracts
content-src/beginner-course/ Active v4 lessons, projects, quizzes, coverage and assembly
content-src/complete-course/ Preserved v3 authoring sources
content/beginner-course/     Generated v4 activities, grouped by module
content/complete-course/     Preserved v3 generated modules
content/legacy/             Frozen v1, v2 and v3 courses and curriculum maps
content/curriculum-manifest.json Topic, assessment, retrieval and source crosswalk
content/course.json          Generated course loaded by the API
backend/src/course-catalog.ts Read-only catalog served by GET /api/courses
scripts/                     Content build, interpreter setup, app launcher
tests/                       Content, real-Python grading, persistence/API checks
data/                        Your learning database, logs, and pre-import backups
```

Edit active course content in `content-src/beginner-course/`, then run `npm run build` and restart the server. Generated JSON files are useful for reviewing individual modules, but changes made directly to them are overwritten on the next build. Earlier authoring sources and `content/chapters/` remain preserved for reference. The active build uses `scripts/build-beginner-content.mjs`. Earlier generators remain available for historical source verification and are not part of the active build.

## Saving and backups

Your code, quiz attempts, results, language, and progress are stored in `data/learning.sqlite`. The app is for one local learner. There is no cloud synchronization. Export a backup through **Manage learning data** on the homepage before moving to a different computer. Import first shows a preview, validates activity/quiz data, and saves a copy of the current profile under `data/backups/` before replacing it. Existing activity IDs, lesson URLs, database records, and backup formats are preserved; this update requires no database migration.

Each save carries a revision number. A stale tab cannot silently overwrite a newer save. Edits are also mirrored to browser local storage for draft recovery. If a save conflict appears, keep a copy of any wanted code and reload; the app will use the newer server copy rather than overwrite it.

## Runtime scope

For checks, run `npm run test:beginner-course` (active v4 content, worked examples, grading, quizzes, calculator conversations, Pong boundary cases, sequential instructions, contrast and archive persistence), `npm test` (legacy compatibility and shared behavior) and `npm run test:rework` (historical content and shared graphical/file contracts). `npm run test:complete-course` retains the v3 source checks. `npm run test:browser` opens a local verification server at http://127.0.0.1:3003; open that address and choose **Run all graphical references** to run all thirteen active graphical exercise solutions in the real browser interpreter. It uses no learner database. Open `/beginner-match` on the same test server for procedural Pong controls, focus, boundaries, collisions, scoring, serving and Stop/Run checks. `/match` preserves the historical v3 match fixture. After a build, `node scripts/serve-course-qa.mjs` serves the production interface on port 3004 with a separate in-memory learning profile.

- Enter Python expressions and statements at `>`. This display replaces Python's conventional `>>>` without changing how commands work. Multiline blocks use `...`; submit a blank line to finish a block. Up/Down recall command history.
- `python main.py` and `/run` use the same execution and grading path as **Run code**. `/clear` clears output; `/reset` clears temporary console variables without deleting saved files. This is a Python console, not a Windows shell.
- `ls`/`dir` list your lesson files, `pwd` shows the Python workspace, and `cat filename`/`type filename` display a saved lesson file. `clear`/`cls` and Ctrl+L clear output; `/help` lists these commands. Home/End and arrow keys edit commands, and pasted multiline code stays editable until Enter.
- During `input()` or `sys.stdin.readline()`, the prompt accepts program input, including blank lines and Unicode. Ctrl+D sends end-of-input. Stop or Ctrl+C interrupts execution and resets the console session.
- Course exercises use supported Python standard-library modules and the bundled pygame-ce package (`import pygame`). No `pip install` is needed for Pong. Arbitrary packages, desktop-only GUI features, and host filesystem access are outside this course runner.
- Game loops must cooperate with the browser using `await asyncio.sleep(1 / 60)`. The supplied examples show the entry point. Click the preview for keyboard input; leaving it pauses play. **Finish & check** sends `pygame.QUIT` and grades a coding exercise after normal exit. **Close preview** performs the same normal exit for self-assessed projects. Handle that event in your loop. **Stop** interrupts without grading.
- Multi-file practice begins in **Libraries and separate Python files** and returns throughout the file-processing modules. Use **+** to create a helper, import it without `.py`, and keep `main.py` as the entry point. All files save together; a full Run reloads edited modules. The optional AI brief is inside the single Pong project and uses the same saved workspace.
- Terminal runs and console commands have a 10-second execution limit; waiting for input pauses it. Responsive game loops can keep running, while non-yielding loops are interrupted by a trace deadline and watchdog. Stop works while running or waiting for input.
- Output is limited to 1 MiB; saved workspaces support up to 40 flat text files and 5 MiB total. Binary files and nested folders are not exposed in the editor.
- Grading checks the stated task's variables, return values, output, files, or syntax as appropriate. It accepts tested alternative syntax, but it is not a universal proof of program correctness.
- The server binds to this computer only. Public multi-user hosting would require authentication and a separate deployment design.

## Verification

```sh
npm run typecheck
npm test
npm audit
```

See **COURSE-V4-IMPLEMENTATION.md** for current verification and **TEST-RESULTS.md** for historical platform scenarios.
