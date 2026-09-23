# Verification — 21 September 2026

The production build runs at http://localhost:3001. The homepage/lesson/console update was tested against a separate SQLite profile on port 3002. The existing production learning profile was retained, with no database migration or reset.

## Automated checks

| Check | Result |
|---|---|
| TypeScript frontend and backend | Passed |
| Production Vite/Express build | Passed |
| Curriculum structure | 13 chapters, 240 unique activities |
| Core lesson pages | 160 |
| Optional coding challenges | 59 |
| Supporting/closing readings | 8 |
| Quizzes | 13, containing 114 questions |
| English/Dutch content fields | All required fields populated |
| Actual Python execution | 227 reference examples passed |
| Negative grading cases | 206 incomplete programs correctly rejected |
| Quiz output predictions | 64 answer keys verified by executing their Python snippets |
| Expected exception handling | Passed |
| Alternative correct syntax | Passed |
| Persistence/API scenarios | Passed |
| Concurrent save/navigation regressions | Passed |
| Persistent Python console and script namespace isolation | Passed |
| Worker reuse, stdin/EOF protocol, and cancelled-response isolation | Passed |
| Read-only course catalog and activity/group metadata | Passed |
| Dependency audit | 0 known vulnerabilities reported |

The persistence/API checks cover stale revisions, unsafe filenames, unknown activities, cross-origin writes, cumulative progress, best quiz scores, saved quiz state, malformed quiz data, backup preview/restore, stale saves after restore, and preserving records across a database restart. Save tests also confirm that edits made during an ongoing save remain recoverable and that a slow earlier page cannot replace a newer workspace.

These checks verify the implemented reference programs and specified grading behavior. They do not imply that every possible learner program or every wording variation has been exhaustively tested. Non-executable quiz questions receive structural validation; 64 prediction questions also receive execution-based answer verification.

## Browser checks

- Welcome page, code editing, Python stdout, task checks, and the Continue button.
- English/Dutch switching and persistence after reload.
- A deliberate syntax error with a readable Python traceback.
- Interactive `input()` with the entered response appearing in the terminal.
- Manual Stop and automatic timeout of an infinite loop.
- Editing/importing a helper Python file and obtaining the expected `150.0` result.
- Creating a CSV file through Python and inspecting its contents in a new editor tab.
- Reference-solution comparison and assisted completion.
- Quiz choice locking, immediate feedback, a completed 5/6 result (83%), answer review, and retry.
- Manual curriculum jumps without completing skipped activities.
- Final reading completion with an honest count of remaining activities.
- Desktop three-pane layout and a 390-pixel-wide phone layout, including quiz/curriculum switching and the compact code editor.
- No browser console errors in the final inspected testing session.
- Background launcher readiness.

## Homepage, lesson layout, and terminal update

- Homepage Python card shows approximately 20 hours and saved progress. C# and HTML + CSS open coming-soon previews without lessons or fabricated progress.
- Python overview lists chapters and completion states. Start opens the first activity; Resume reopens the last activity with its saved code. Logo navigation and browser Back work.
- British/Dutch flag selection updates the interface and persists after reload. Backup export/import controls are available through Manage learning data on the homepage; existing API backup validation tests pass.
- Learn and Instructions share one scrolling pane. Group progress segments and the curriculum drawer retain manual-jump confirmation. Drawer opening, Tab/Shift+Tab containment, Escape, and restored trigger focus were checked.
- Desktop three-pane and 390 × 844 phone layouts were visually inspected. The original `styles.css` and `Editor.tsx` are byte-for-byte unchanged. At a 1280-pixel desktop viewport, instruction and terminal panes remain 360 pixels wide, explanation/editor text remains 14 pixels, and terminal text remains 12 pixels.
- Requested slogans, terminal filler, preferences control, and current-file download control are absent from the interface. Authored course examples and saved learner files are retained.
- Browser console checks include expressions, persistent variables, multiline functions, blank-line block completion, Up/Down command history, `/clear`, `/reset`, `python main.py`, and `/run`.
- A script combining repeated `input()` and `sys.stdin.readline()` accepted normal text, Unicode, a blank line, and Ctrl+D end-of-input. Its resulting variable was then inspected at the console prompt.
- Console-only output did not complete an exercise; a correct graded script run did. Existing grading and quiz checks still pass. Quiz answer locking, feedback, and saved answer recovery were rechecked in the revised layout.
- Manual Stop during input, Ctrl+C during input and an infinite loop, automatic timeout, recovery after interruption, and navigation away from a waiting program were checked. An embedded-browser Copy event fallback supports Ctrl+C while preserving normal selected-text copying.
- Automated real-Python console checks additionally cover syntax/runtime error recovery, file synchronization, fresh namespaces for full script runs, and console commands returning no grading results.
- No browser console errors were recorded in the inspected test session.

The full automated suite passed after the runtime changes: 227 reference programs, 206 negative grading cases, 64 executable quiz predictions, real-Python console scenarios, and five API/save/worker tests. Subsequent UI-only shortcut handling and the updated backup-help wording passed the production build and type checks.

The final production restart was checked by comparing every backup field except its export timestamp before and after restart: progress, settings, unlocks, workspaces, attempts, format, and version matched exactly. The pre-update profile is also retained in `data/backups/pre-redesign-learning-profile.json`. The updated homepage was opened successfully on port 3001, and the temporary port-3002 test server was stopped.

## Selection and compact-header update

- Production build and frontend/backend type checks passed. Content validation plus the existing worker and save/navigation regressions passed.
- CodeMirror selection was checked with mouse dragging over one and multiple lines, keyboard selection, copying, and focus loss. The focused selection resolves to `#acd2ec`; the unfocused selection is `#d0e1ee`. The active line uses a translucent background so it cannot hide the selection layer. Normal selection and copying preserve the code.
- Browser console checks confirmed the displayed `>` prompt, `...` block continuation, a multiline function returning 12, command history, `/run`, and Unicode program input.
- The header contains one blue lesson navigation component. Previous header text and percentage progress are absent. Manual segment jumps retain confirmation and correctly update the current marker. Drawer focus containment, Escape, restored focus, and its Course overview action passed.
- Desktop (1280 px), tablet (768 px), phone (390 px), and the narrow single-row boundary (541 px) were inspected. Long group names truncate without page overflow. The phone header uses a second navigation row. Desktop header height remains 85 px and both side panes remain 360 px; editor text remains 14 px. The desktop logo is now 140 × 55 px with its proportions preserved.
- Python, C#, and HTML/CSS icons render on all three course cards and their overview pages. English/Dutch flag switching works. No browser errors were recorded in the isolated testing session.
- Testing used port 3002 and its separate SQLite profile; production learner files and progress were not used for test exercises.

## Code presentation and terminal update — 23 September 2026

- Type checking, production build and the complete automated suite pass: 227
  reference solutions, 206 negative cases, 64 executable quiz predictions, the
  real-Python console suite, and 14 API/workspace/runner/presentation/terminal tests.
- Shared syntax tests preserve exact source text and multiline string context.
  Browser checks show the same colours in the editor, lesson example and solution.
- A changed assignment, an extra comment and a later unchanged print line were
  compared in-browser: red removals, green additions and unchanged alignment match
  the code. Automated checks cover insertions, deletions, empty files, whitespace,
  CRLF and missing final newlines.
- xterm headless tests exercise the real terminal buffer for wrapped Unicode,
  ANSI/carriage-return output, long pasted blocks, resize, rapid input, history,
  cursor editing, blank input/EOF and multiline indentation.
- Browser checks on isolated port 3002 cover expression output, multiline function
  definition/inspection, repeated input, blank lines, Unicode paste, EOF, timeout,
  Ctrl+C and recovery, selected-output copying without interruption, Ctrl+L, file
  listing/reading, workspace path and navigation away during execution.
- Mobile layout/input was checked at 390 × 844. The viewport was restored afterward.
  A black unused viewport strip was corrected to the terminal background colour.
- Testing used `work/course-depth-test.sqlite`, not the production learner profile.
  No course content, database schema, activity IDs or backup formats changed in
  this workspace update. Full curriculum revision remains in progress; see
  `COURSE-REVISION.md` for coverage and outstanding work.

## Reproduce

```sh
npm run build
npm test
npm audit
node scripts/start.mjs --no-browser
```

The app's runtime scope and storage behavior are documented in README.md.
