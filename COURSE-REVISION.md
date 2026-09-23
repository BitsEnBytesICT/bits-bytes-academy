# Course depth and workspace revision — in progress

## Full scope

- Review every Python 3 lesson, its instructional sequence, exercise mechanics,
  checkpoint count, worked-example concepts, and visible workspace scaffolding.
  Review quizzes and supporting articles; keep projects and videos excluded.
- Keep a source-linked, original conceptual inventory rather than an archive of
  Codecademy's narrative, task wording, starter code, or question bank.
- Rewrite the local bilingual course with fuller explanations, worked examples,
  purposeful multi-step exercises, hints, useful starter scaffolding and independent
  checks. Preserve activity IDs, URLs, saved files, results and backup compatibility.
- Improve the terminal's actual interaction, Python file icons, solution differences,
  and Python syntax colouring across editor, examples and quizzes.
- Verify course solutions, partial progress, incorrect answers, runtime input,
  interruption/recovery, keyboard/mobile behaviour and persistence before finishing.
- Rebuild, run the finished site, and sync verified changes to the existing repository.

## Evidence and current status (23 September 2026)

The September 21 `content-src/curriculum-map.json` inventories 160 core pages,
13 quizzes, 59 optional challenges and supporting readings. It is a starting
inventory, not proof of the deeper review requested on September 23.

Current source review is in `research/2026-09-23-foundations.md`. The rest of the
course still needs this deeper review. Do not describe the whole course as mapped
or rewritten. No authored lesson has been rewritten in this revision yet.

Implemented workspace changes:

- Shared Lezer Python token categories/CSS for CodeMirror, lesson examples, quiz
  snippets and solution views; transparent active line preserves selection.
- Local Python SVG in file tabs.
- Side-by-side, per-file line differences, aligned unchanged lines, line numbers,
  addition/deletion signs, new/deleted files, EOF notices and bounded diff work.
- xterm.js with editable inline prompts, Unicode paste, multiline input, history,
  cursor editing, ANSI output, carriage returns, keyboard interruption and EOF.
  The persistent Python worker still owns execution and grading.
- `ls`/`dir`, `pwd`, `cat`/`type`, `clear`/`cls`, `/help` operate on the lesson
  workspace. Existing `/run`, `python main.py`, `/reset` remain available.

Verification so far:

- Type checking and production build pass.
- Existing content/runtime/console/API/workspace tests pass (227 reference
  solutions, 206 negative cases, 64 executable quiz predictions).
- New tests cover diff alignment, syntax preservation/multiline strings, terminal
  line editing/history, ANSI/carriage returns, wrapped Unicode commands, blank
  input/EOF, rapid input, staged paste and multiline indentation.
- Browser checked solution alignment and syntax colours. Expressions, function
  definitions/inspection, repeated input, blank input, Unicode paste and EOF work.
- Browser verified timeout, Ctrl+C, recovery, selected-output copying without
  interruption, mobile terminal resizing/input, `ls`, `pwd`, `cat main.py`, Ctrl+L
  and cancellation when navigating away. The integrated-browser Copy-event fallback
  is verified. A cold-start input readiness guard also passed a fresh-load command check.
- All 14 API/workspace/runner/presentation/terminal tests pass, in addition to the
  existing full-course runtime and console suites. Tests use a separate learning DB.

## Next work

1. Preserve the verified workspace changes and add regression coverage if further
   course work exposes an interaction issue.
2. Complete foundation workspace/example inspection and review the quiz/article.
3. Add structured lesson sections so explanations and worked examples can alternate.
4. Rewrite the entire first chapter with original bilingual material and checkpoints;
   check partial attempts, all reference solutions, and saved-data compatibility.
5. Continue the same source review and authoring process for every remaining chapter,
   challenge set and quiz. Record coverage and remaining uncertainties per chapter.
6. Perform a requirement-by-requirement completion audit. A green existing content
   count test alone does not establish richer explanations or appropriate tasks.

This goal turn made progress: implementation, tests and fresh source observations.
No blocker prevents continuing. The full goal remains active.
