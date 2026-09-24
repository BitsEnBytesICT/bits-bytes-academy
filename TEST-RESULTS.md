# Project course release verification — 24 September 2026

The active release contains two paths, ten modules, 50 coding exercises / 155 checks, ten five-question quizzes, one documentation reading, two self-assessed projects, and an optional AI extension (64 activities / 63 required; approximately 22 hours).

- Final `npm test`, `npm run test:rework`, frontend/backend typecheck, and production build passed.
- All 50 reference programs and 30 executable explanation examples passed. Behavioral suites accept tested alternate implementations and reject incomplete or plausibly incorrect programs.
- All fifteen graphical reference programs passed in the real browser pygame interpreter, with rendered-frame evidence and normal Finish & check. Additional graphical tests reject missing previews and unfinished starters.
- Browser checks covered multi-file creation/validation/imports, Run from a helper tab, saving/reloading, Unicode/blank/EOF input, animation and keyboard events, focus pause/resume, interruption, non-yielding loops, output limits and recovery, persistent console variables, reading completion, project self-assessment, copying all Pong files into the optional extension, quiz drafts/feedback/retry, and mobile/drawer keyboard behavior.
- Revealing a solution marks assistance but does not award new completion until a graded Run passes.
- Production was restarted at http://localhost:3001. Before/after row hashes matched for all 12 workspaces, 11 progress rows, 2 settings, 21 attempts, and the migration marker. SQLite integrity passed. Homepage, overview, and original-course archive were checked after restart.
- The original complete snapshot and verified restore copy remain outside Git. No database migration or learner-data reset was required.

These checks cover the documented scenarios and tested programs; they are not an exhaustive proof for every learner program. The browser suite can be repeated with `npm run test:browser`. The sections below are historical evidence for previous releases and retain their original counts.

---

# Verification — 21 September 2026

The production build runs at http://localhost:3001. The homepage/lesson/console update was tested against a separate SQLite profile on port 3002. The existing production learning profile was retained, with no database migration or reset.

## Automated checks

| Check                                                              | Result                                                     |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| TypeScript frontend and backend                                    | Passed                                                     |
| Production Vite/Express build                                      | Passed                                                     |
| Curriculum structure                                               | 13 chapters, 240 unique activities                         |
| Core lesson pages                                                  | 160                                                        |
| Optional coding challenges                                         | 59                                                         |
| Supporting/closing readings                                        | 8                                                          |
| Quizzes                                                            | 13, containing 114 questions                               |
| English/Dutch content fields                                       | All required fields populated                              |
| Actual Python execution                                            | 227 reference examples passed                              |
| Negative grading cases                                             | 206 incomplete programs correctly rejected                 |
| Quiz output predictions                                            | 64 answer keys verified by executing their Python snippets |
| Expected exception handling                                        | Passed                                                     |
| Alternative correct syntax                                         | Passed                                                     |
| Persistence/API scenarios                                          | Passed                                                     |
| Concurrent save/navigation regressions                             | Passed                                                     |
| Persistent Python console and script namespace isolation           | Passed                                                     |
| Worker reuse, stdin/EOF protocol, and cancelled-response isolation | Passed                                                     |
| Read-only course catalog and activity/group metadata               | Passed                                                     |
| Dependency audit                                                   | 0 known vulnerabilities reported                           |

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

## Foundation teaching revision (23 September 2026)

- Production build and type checking pass. Full tests pass: 227 reference
  programs, 206 negative cases, 64 executable quiz predictions, console coverage,
  and 17 API/workspace/progress/runner/presentation/terminal tests.
- New guided-content verification executes 27 worked examples independently and
  compares exact expected output. It checks 20 intermediate learner attempts,
  untouched starters, a comment-marker false positive and hard-coded power answers.
- All 15 foundation pages plus the input reading are rewritten. Foundation coding
  now has 35 checkpoints; chapter quiz feedback is specific to each choice.
- Browser QA on port 3002: packing exercise advanced from 1/4 to 4/4 with an
  alternative variable-based solution; hints and failure feedback were visible;
  Continue enabled; code, completed checks and language survived reload.
- Dutch explanations, inline code, worked output and hint/feedback translation
  were checked. A wrong quiz choice received its specific Dutch explanation and
  stayed selected with the same feedback after reload. Browser error log empty.
- Existing learner files are protected by a regression test even when new starters
  differ. Completed activities remain complete after revised or failed attempts;
  old checkpoint IDs do not satisfy new tasks. No database migration is involved.
- Production was restarted and the served course contains all 16 revised activities.
  Before/after database fingerprints match for workspaces, progress, settings and
  attempts: all existing learning records are unchanged.
- Desktop rendering was visually checked with unchanged pane/font sizing. The
  attempted viewport override did not resize the background preview, so this pass
  does not claim a new phone-size visual check. The override was reset. Previous
  mobile verification above applies to the unchanged responsive layout.

## Control-flow and debugging revision (23 September 2026)

- Build/type checks and the full suite pass: 227 reference solutions, 206 negative
  cases, 64 quiz predictions and 17 TypeScript tests. Guided-content verification
  now covers 34 activities and 48 independently runnable worked examples.
- Chapter 2 adds 37 checkpoints across 13 coding exercises. Thirty checks contain
  65 alternate-input probes. Twenty staged attempts and 11 incorrect rules are
  tested, plus accepted descending thresholds and reversed Boolean operand order.
- Probe tests verify later reassignment is preserved; output, files and console
  variables remain those of the actual run; missing input assignments and probe
  exceptions fail the check without fabricating an error in the visible run.
- Browser QA on isolated port 3002 confirms gradual 1/2 then 2/2 completion,
  rejection of default-output-only logic, correct console inspection and reload
  persistence. A three-defect syntax starter shows a real SyntaxError and contextual
  hint; repaired grammar reaches 3/4 and the requested extension reaches 4/4.
  Dutch text/feedback and the desktop view were inspected; browser error log empty.
- Activity IDs/kinds/order and all quiz question/choice IDs, content and answer
  mappings match the previous release. Only quiz feedback changed. Existing saved
  files and earned completion retain the previously tested compatibility behavior.
- Production restart verified exact before/after database fingerprints: 10
  workspaces, 11 progress rows, 2 settings and 21 attempts unchanged. The served
  course exactly matches the generated course. No schema or sizing changes.
- Full-course authoring is still in progress: 32/160 core pages, 2/8 supporting
  readings and 2/13 quiz feedback sets revised; optional challenges remain pending.

## List-foundation revision (23 September 2026)

- Production build/type checks and the full suite pass: 227 reference solutions,
  206 negative cases, 64 quiz predictions, console coverage and 17 TypeScript tests.
  Guided-content verification now covers 48 activities and 65 runnable examples.
- New list tests cover 25 staged/alternative solutions and nine plausible errors,
  including fixed indexes, hard-coded totals and replacing an aliased row. Nested
  probe inputs, quoted Unicode text, null/Boolean values and isolation are verified.
- Browser QA on isolated port 3002 confirms 3/6 then 6/6 cumulative completion,
  accepting a variable-based append and augmented assignment. Code and checks
  survive reload; English/Dutch instruction and feedback text were checked.
  Browser error log is empty. No layout or font changes were made in this batch.
- Production restart preserves exact fingerprints of 10 workspaces, 11 progress
  rows, two settings and 21 attempts. Served content matches the generated course.
  Activity IDs/kinds/order and all quiz contents are unchanged.
- Coverage is 46/160 core pages and 2/8 readings. Quiz code blanks, list operations,
  later chapters and optional challenges remain unfinished.

## Code-blank quiz revision (23 September 2026)

- Build/type checks and the full course/console suite pass, including three new
  executable code-blank answers. There are 19 TypeScript tests. After extracting
  the fresh-attempt helper, the focused quiz suite also passes; it checks retry
  reset/shuffling and keeps unrevised quizzes in their legacy format.
- Isolated browser QA completes the mixed list quiz at 10/11, with one intentional
  wrong blank. Token removal, duplicate instances, keyboard selection/submission,
  partial draft recovery, locked answer reload, per-slot correction, saved result,
  answer review, fresh retry and Dutch controls are verified. Browser errors: none.
- Desktop code-blank rendering was inspected. A new narrow-viewport visual check
  remains in the final responsive audit; no existing font sizes or pane widths changed.
- Backend tests validate legacy and new saves/backups, incomplete/duplicate/unknown
  tokens, mismatched locked drafts, invalid formats and finished-attempt consistency.
- Existing question/choice IDs, prompts, labels and correct mappings are preserved;
  new format-specific variants are optional. Production restart leaves all 10
  workspaces, 11 progress rows, two settings and 21 attempts byte-for-byte unchanged.
  Served content matches the generated course. No database migration.

## List-operations revision (23 September 2026)

- Build/type checks and the full suite pass: 227 reference programs, 206 negative
  cases, 64 quiz predictions, five executable code-blank answers, console coverage
  and 19 TypeScript tests. Revised content now has 85 runnable worked examples.
- New tests verify 32 staged/alternative attempts, 16 plausible mistakes and an
  actual empty-pop IndexError. They include non-divisible range lengths, short/empty
  lists, duplicate records, alias identity and preserving original sort order.
- Isolated browser QA verifies an eight-step shipment program at 4/8 then 8/8,
  accepted variable-based insertion, saved code/completion after reload, Dutch
  instruction/feedback and desktop rendering. Both new quiz code tasks grade and
  retain feedback after reload. A wrong range choice receives its specific reason.
- IDs/kinds/order and legacy quiz definitions are preserved. Existing sizing and
  database schema are unchanged. Browser error log is empty.
- Production was restarted with the generated course verified against the API.
  Exact fingerprints of 10 workspaces, 11 progress rows, two settings and 21 attempts
  are unchanged across the restart.

## Reproduce

```sh
npm run build
npm test
npm audit
node scripts/start.mjs --no-browser
```

The app's runtime scope and storage behavior are documented in README.md.

# List support readings — 23 September 2026

- Replaced the tuple and zip readings with original bilingual guided explorations,
  substantial starters, specific solution explanations and nine runnable examples.
- `npm run build` and the complete `npm test` suite pass. The guided-content suite
  now covers 62 structured activities and 94 examples, plus eleven new reading
  experiments testing supplied programs, connected extensions, deliberate errors,
  recovery, singleton syntax, empty input, shortest-input truncation and field order.
- Existing 227 reference solutions, 206 negative cases, 64 executable quiz
  predictions, staged grading suites, console suite and 19 TypeScript tests pass.
- Browser QA on the separate database showed the new Dutch sections and fresh
  editor scaffolding. The tuple starter printed its record. The zip starter showed
  two rows for three stations; its extended program displayed all three stations,
  three-field rows, an empty second iterator read and reusable saved results.
  The extended code survived reload, and no browser errors were recorded.
- Restarted the production site and verified the served course exactly matches the
  generated content. Read-only before/after fingerprints confirm all learner records
  unchanged: 10 workspaces, 11 progress records, 2 settings and 21 attempts.
- No layout/style changes in this release. A fresh narrow-screen audit of the
  earlier code-blank component is still outstanding; this release does not claim it.
- Source tuple/zip narrative reviews are recorded in
  `research/2026-09-23-list-readings.md`. Embedded source assessments remained
  loading and were not inspected. Overall rewrite: 58/160 core pages, 4/8 support
  readings, 4/13 enhanced quizzes, 0/59 revised optional challenges.

# Loop chapter rewrite — 23 September 2026

- Rewrote all 13 loop pages with 36 connected checkpoints, 96 alternate-input
  cases and 25 independently runnable examples. Ten quiz questions have targeted
  wrong-choice feedback; fresh attempts include a nested-loop code-blank variant.
- `npm run build` and complete `npm test` pass: 227 reference solutions, 206
  negative cases, 64 MC code predictions, six code-blank programs, 119 guided
  examples across 75 structured activities, existing grading/console suites and
  all 19 TypeScript tests. New loop tests cover 25 staged attempts, 28 mistakes,
  two diagnostic errors and four equivalent alternative implementations.
- Explicit comparison with the previous Git version confirms unchanged activity
  IDs, kinds and order, plus unchanged legacy loop quiz questions/choices/answers.
- Browser QA on the separate database: the final report awarded 3/6 checks for a
  partial program, then 6/6 after its extensions; completed code and progress
  survived reload. Dutch instructions and diagnostic feedback were inspected.
- A while program using != succeeded for the visible values but failed to stop
  on an alternate input. The worker reached its time limit safely. Changing the
  condition to < and recording history recovered normally and passed all 3 checks.
- Verified the actual quiz viewport at 390 × 844, with document width and scroll
  width both 390. Screenshots show readable, unclipped code slots, wrapping token
  controls and per-slot feedback. Keyboard placement/removal/submission, draft
  reload, wrong-choice feedback, a 90% mixed-format result and expanded complete
  solution/output review all worked. No browser errors were recorded. The prior
  pending phone-width audit of the code-blank component is now completed.
- Restored the viewport override and the user's original Codecademy tab afterward.
- Production restarted with exact generated-content equality. Before/after
  fingerprints show learner records unchanged: 10 workspaces, 11 progress records,
  2 settings, 21 attempts. Existing learner files were not replaced by new starters.
- Overall authored coverage: 71/160 core pages, 4/8 support readings, 5/13 enhanced
  quizzes, 0/59 revised optional challenges. Later content remains in progress.
