# Version 4: beginner course implementation

## Published content

The active source is `content-src/beginner-course/`; `npm run content` assembles and validates it through `scripts/build-beginner-content.mjs`. All 56 files in the supplied `curriculum/` folder were read as pacing and exercise references. Empty reference files, incomplete starters and completed answers were distinguished during authoring. The supplied files remain unchanged.

| Content | Total |
| --- | ---: |
| Modules | 24 |
| Focused coding lessons | 165 |
| Independently graded mini projects | 6 |
| Main projects | 2 |
| Quizzes | 23 |
| Quiz forms / questions | 46 / 276 |
| Readings | 2 |
| Required activities | 198 |
| Stable topic contracts | 274 |

The opening starts with running Hello World, writing one print from an empty editor, statement order, strings, printed numbers, comments, a syntax repair and an independent announcement. Variables, arithmetic and input follow in their own modules. The calculator follows module 10; procedural Pong follows module 16. The six mini projects are delivery pricing, activity analysis, number guessing, text cleaning, a CSV-to-JSON club results book and a virtual pet. The optional computer opponent remains inside the same Pong workspace.

Every activity has English and Dutch teaching and feedback. Coding lessons include an analogous worked example, prediction, runnable starter where appropriate, focused checks, three hint levels, an explained reference and a changed-input experiment. Independent exercises accept alternate implementations; selected construct exercises check the requested syntax. File activities explain the supplied caller, editable helper and input/output tabs. The closing article has six sections and no workspace controls.

`COURSE-REWORK-MAP.md` documents the sequence and outcomes. `COURSE-COVERAGE.md` maps 151 distinct supplied syllabus URLs to topic evidence. `content/curriculum-manifest.json` records introductions, worked examples, required checkpoints, assessment, prerequisites and delayed retrieval. Retrieval prompts are self-explanation, not graded mastery. Supplied runtime infrastructure is not coverage evidence.

The summed estimate is **3,021 minutes**, displayed as **approximately 51 hours**. This was calculated from the authored activities, without a preset duration or lesson cap. It is not a measured completion time.

## Interface and saved work

- New coding activities use sequential checkpoints. Only the active instruction receives ordinary failure feedback; future instructions and hints stay locked and neutral. A correct full program passes all checkpoints immediately. Earned steps survive reload; a first completion requires all requirements to pass together. An earlier regression produces one focused review message.
- Run attempts record their active checkpoint (or null for a final review), mode and check results. Existing navigation, edit-generation, Stop and conflict protections remain in place.
- Dark quiz code uses a scoped light palette. Syntax categories, fallback text, blanks and answer-review examples meet the tested 4.5:1 contrast threshold. Code-completion questions display their expected output before submission.
- Quiz retries alternate examples while retaining the original draft/attempt interpretation. Scores and recommended review remain separate from completion.
- The two main projects are ordinary self-assessed activities. Project sections, the calculator test table and conversation, readiness links, hints and optional Pong brief render in both languages. The project-copy button and modal are removed.
- Version 3 was frozen in `content/legacy/course-v3.json` and its map before replacement. Versions 1 and 2 remain registered. Rewritten activities have new v4 IDs. Historical project-stage lookups resolve to their canonical workspace; prior files, progress, quiz forms, attempts and backup support remain available without transferring credit to different tasks.

## Automated verification

Passed on the implementation machine:

- `npm run test:beginner-course`: assembly/prerequisite and bilingual validation; **173 executable worked examples**, **171 graded reference solutions**, **394 behaviour probes**, unfinished starter rejection; **276 quiz items**, including **184 prediction/completion programs** executed in Python; calculator conversations, plausible mistakes and valid alternative implementations; sequential progress, contrast, archive/backup and quiz-form persistence.
- The calculator fixture covers repeated use, negative and decimal inputs, numeric zero, bad numbers, bad operations, division by zero, cancellation at each prompt and end-of-input.
- Negative tests include incorrect precedence, print/return confusion, treating zero as cancellation, early search returns, unwanted list mutation, losing false-like dictionary values, duplicate-record errors and shared class state. Independent alternatives pass.
- Project presentation tests render the actual React component in both languages and check that project sections and the manual test table remain visible.
- `npm test`: legacy content/runtime compatibility and shared API, workspace, terminal, quiz and progress checks passed.
- `npm run test:rework`: historical assembly, behaviour probes, package loading, actual Pygame values/pixels, error/preview gates, file/module isolation, persistence and game-runner lifecycle checks passed.
- `npm run build`: content generation, bundled runtime preparation, frontend/backend typechecks and production builds passed.

Reference project implementations live only in `tests/fixtures/beginner-projects.mjs`; they are not installed as learner starters.

## Browser verification

Browser testing used the real production interface on port 3004 with an isolated in-memory profile. The graphical fixtures on port 3003 use no learning database.

- All **13 active Pygame reference lessons** rendered real frames and passed their checks.
- **14 procedural Pong interaction checks** passed: serving, simultaneous held controls, both paddle boundaries, focus pause/resume, both walls, both paddles, separating overlap, preserving departure direction, misses on both sides, scoring once, serving again, normal close, and Stop followed by Run.
- Hello World unlocks Continue after successful execution; the next editor is empty. Partial instruction completion unlocks the next step without red feedback. Incorrect active work affects that step only. Reload preserves earned progress. An earlier regression blocks first completion and identifies the broken instruction. A correct first-run input solution passes all steps.
- Invalid numeric input displays the Python traceback. Editing during a pending run displays the stale-run warning and awards no progress. Stop and navigation cancel pending work without completing it.
- Quiz colours were inspected in the rendered page, including filled slots and completed-code review. Token placements and alternate-form selection survived reload. Expected output is visible before choosing a token.
- Generated `summary.txt`, `results.csv` (with a quoted comma) and `settings.json` survived save and reload and were opened in the editor.
- A v3 Pong stage URL redirected to its archive and displayed files saved through its canonical project workspace. API tests verified backup round trips and stale revision rejection.
- The populated browser QA profile also completed an API backup/restore round trip: all 12 saved workspaces, 14 attempts and progress were preserved. Workspace revisions advanced deliberately so older tabs cannot overwrite the restored files.
- A real calculator conversation recovered from `apple`, accepted `-2.5` and `4`, displayed `1.5` and quit normally. Projects remain self-assessed.
- The class introduction, prediction and hint were reviewed in English and Dutch. The Dutch closing article displayed all six sections and troubleshooting guidance without an editor, terminal or game preview.

## Learning validation

These are author walkthroughs and automated/browser checks. No human beginner pilot sessions have been claimed. Observe new learners through Hello World, input conversion, calculator preparation, Pong preparation and classes; record unexpected help, misconceptions and actual time. Keep the displayed duration provisional until those observations exist.

## Local release

On 24 September 2026, the existing learning database was backed up with SQLite's consistent backup API to `data/backups/before-course-v4-2026-09-24T16-53-32.796Z.sqlite`; its integrity check passed. The production server was restarted at **http://localhost:3001**. `GET /api/course` reports version 4 with 198 activities, and the served HTML matches the built production index, including its current JavaScript asset. The course overview was opened and inspected in the browser. Earlier earned work remains in the archive; active v4 completion starts independently.

## Official references

- [Python data structures](https://docs.python.org/3.14/tutorial/datastructures.html): list mutation versus returned values, dictionaries and comprehensions.
- [Python built-in types](https://docs.python.org/3.14/library/stdtypes.html): strings, sequences, ranges and mappings.
- [Python CSV](https://docs.python.org/3.14/library/csv.html) and [JSON](https://docs.python.org/3.14/library/json.html): structured file processing.
- [Pyodide filesystem](https://pyodide.org/en/stable/usage/file-system.html): browser filesystem behaviour.
- [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial) and [environments](https://code.visualstudio.com/docs/python/environments): local continuation.
- [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): the quiz contrast target.
