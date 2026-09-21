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

- 13 chapters and 240 activities: 160 core lesson pages, 59 optional coding challenges, 8 supporting readings, and 13 quizzes with 114 original questions.
- English and Dutch explanations, tasks, hints, feedback, and interface text. Python syntax stays in English.
- A course homepage, Python overview with Start/Resume, and coming-soon previews for C# and HTML + CSS. Python is approximately 20 hours; preview courses have no announced duration.
- An interactive Python console, real errors, `input()` and `sys.stdin.readline()`, Stop/Ctrl+C, and checks against program results.
- Editable files, local Python imports, and text/CSV/JSON files created by your code.
- Hints, side-by-side reference solutions, and an explicit assisted-completion marker when you use a solution.
- Quiz feedback after each answer, shuffled choices on retry, resumable attempts, answer review, and best scores.
- Sequential progression, with a manual jump that leaves skipped activities incomplete.
- Automatic code saving, local draft recovery, saved progress, and backup export/import through **Manage learning data** on the homepage.

Separate projects and video walkthroughs are excluded. This is an independently written course following the researched topic sequence; it is not a downloaded copy of Codecademy's explanations or question bank and is not affiliated with Codecademy.

## Stack and design

| Layer | Technology |
|---|---|
| Website | React 19, TypeScript 6, Vite 8, React Router 7, Tailwind CSS 4 |
| Editor | CodeMirror 6 with Python highlighting and Ctrl+Enter to run |
| Python | Pyodide 314.0.7 in a dedicated browser worker |
| API | Express 5, Zod validation, controller/service/DAO separation |
| Storage | SQLite with better-sqlite3, WAL, versioned workspace saves |
| Style | Blue `#317199`, orange `#f2880f`, light blue `#92d5ff`, local Outfit font |

The source platform's application stack is retained. React Router and Vite use newer compatible releases to resolve the dependency warnings found during implementation. The original management-platform repository was not modified.

Python runs on your browser's processor in one persistent worker per active lesson. The server stores learning data and serves the website; it does not execute student Python as host processes. A full script run starts with a fresh namespace and your saved workspace files. Its resulting variables remain available for console inspection. Console commands share variables within the current activity and never award completion. Stopping execution, resetting the console, reloading, or navigating away discards temporary console variables while retaining saved work.

The lesson layout keeps the original font sizes, pane widths, draggable dividers, and responsive breakpoints. Learn and Instructions share a scrolling pane. The header contains the smaller supplied Bits & Bytes logo, blue lesson navigation with progress segments and a curriculum button, and English/Dutch flag controls. On screens up to 540 pixels, lesson navigation occupies a second header row. The keyboard-accessible curriculum drawer also links to the course overview. Course cards and overviews share local monochrome SVG language icons. Editor selections use a visible blue background, including when focus moves away.

Internet access is not required while the installed app is running: the Python runtime and font are bundled locally. This is an ordinary web app rather than a service-worker/PWA setup, keeping installation and maintenance simple.

## Source and course files

```text
frontend/src/                 React interface, editor, saves, Python worker client
frontend/public/runtime/     Python execution/grading bridge and bundled interpreter
backend/src/                 Express API and SQLite persistence
shared/types.d.ts            Shared course and workspace contracts
content-src/                 Editable authored chapter modules and curriculum map
content/chapters/            One JSON file per activity, grouped by chapter
content/course.json          Generated course loaded by the API
backend/src/course-catalog.ts Read-only catalog served by GET /api/courses
scripts/                     Content build, interpreter setup, app launcher
tests/                       Content, real-Python grading, persistence/API checks
data/                        Your learning database, logs, and pre-import backups
```

Edit course content in `content-src/`, then run `npm run build` and restart the server. Generated JSON files are useful for reviewing individual chapters, but changes made directly to them are overwritten on the next build. The course build is self-contained in this folder.

## Saving and backups

Your code, quiz attempts, results, language, and progress are stored in `data/learning.sqlite`. The app is for one local learner. There is no cloud synchronization. Export a backup through **Manage learning data** on the homepage before moving to a different computer. Import first shows a preview, validates activity/quiz data, and saves a copy of the current profile under `data/backups/` before replacing it. Existing activity IDs, lesson URLs, database records, and backup formats are preserved; this update requires no database migration.

Each save carries a revision number. A stale tab cannot silently overwrite a newer save. Edits are also mirrored to browser local storage for draft recovery. If a save conflict appears, keep a copy of any wanted code and reload; the app will use the newer server copy rather than overwrite it.

## Runtime scope

- Enter Python expressions and statements at `>`. This display replaces Python's conventional `>>>` without changing how commands work. Multiline blocks use `...`; submit a blank line to finish a block. Up/Down recall command history.
- `python main.py` and `/run` use the same execution and grading path as **Run code**. `/clear` clears output; `/reset` clears temporary console variables without deleting saved files. This is a Python console, not a Windows shell.
- During `input()` or `sys.stdin.readline()`, the prompt accepts program input, including blank lines and Unicode. Ctrl+D sends end-of-input. Stop or Ctrl+C interrupts execution and resets the console session.
- Course exercises use supported Python standard-library modules. Desktop GUIs, host filesystem access, and arbitrary `pip` packages are outside this course runner.
- Each uninterrupted run has a 10-second limit. Waiting for terminal input pauses that timer. Stop works while running or waiting for input.
- Output is limited to 1 MiB; saved workspaces support up to 40 flat text files and 5 MiB total. Binary files and nested folders are not exposed in the editor.
- Grading checks the stated task's variables, return values, output, files, or syntax as appropriate. It accepts tested alternative syntax, but it is not a universal proof of program correctness.
- The server binds to this computer only. Public multi-user hosting would require authentication and a separate deployment design.

## Verification

```sh
npm run typecheck
npm test
npm audit
```

See **TEST-RESULTS.md** for the implementation verification and browser scenarios.
