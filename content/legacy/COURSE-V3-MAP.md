# Python curriculum v3

The active curriculum teaches the full requested syllabus through **17 modules, 83 coding activities, 16 six-question quizzes with two forms, two evolving projects, and one closing article**. Calculator and Pong each have an early visit and a later upgrade. There is no required third project. The optional computer-opponent project remains separate.

There are 105 navigable activities, of which 104 are required. Project stages count as visits, not additional projects. The authored time budget is **1,770 minutes (29.5 hours)**, rounded to 30 in the catalog, plus 2–4 hours of review: approximately **32–34 hours**. These are provisional estimates, not observed learner timings.

## The learning path

Module budgets include the six-minute quiz. Project visits are additional.

| Module | Main outcome | Coding activities | Minutes |
| --- | --- | ---: | ---: |
| 1. First useful programs | Text, variables, arithmetic, powers, quotient/remainder and errors | 5 | 70 |
| 2. Input and decisions | Input, conversion, comparisons, Boolean logic and menus | 5 | 80 |
| **Calculator: first useful version** | Two numbers, four operations and zero-divisor handling; valid numeric input | — | **35** |
| 3. Repetition | for/range, while, termination, break, continue, totals | 5 | 80 |
| 4. Reusable functions | Calls, arguments, defaults, scope, return, None, early exits | 5 | 85 |
| 5. Lists, tuples, and state | Lists, indexes, copies, iteration, coordinates and multiple returns | 5 | 80 |
| 6. Libraries and your own modules | Imports, aliases, random, Decimal, helper files, documentation | 5 | 75 |
| 7. Scenes and events | Rect, Surface, coordinates, drawing and keyboard events | 4 | 75 |
| 8. Movement and a first rally | Elapsed time, held controls, bounds, contacts and miss reset | 5 | 90 |
| **Pong: first playable version** | Paddles, ball, wall/paddle responses and reset with supplied browser entry point | — | **75** |
| 9. Working with collections | All requested list methods, slicing, sorting, 2D lists, nested loops, comprehensions | 6 | 100 |
| 10. Text as data | Sequences, immutability, escapes, membership, splitting, joining and formatting | 6 | 95 |
| 11. Reliable input and recovery | Tracebacks, specific exceptions, validation, retry, cancel and EOF | 5 | 85 |
| 12. Dictionaries and records | Keys, creation, mutation, missing values, views and comprehensions | 6 | 95 |
| 13. Text files | with, UTF-8, read/readline/iteration, write/append and persistence | 4 | 70 |
| 14. CSV and JSON | Quoting, delimiters, conversion, structured records and round trips | 6 | 100 |
| **Calculator: reliable and reusable** | Reopen the same files; functions, recovery, history and saved data | — | **90** |
| 15. Classes and objects | Types, self, initialisation, methods, independent instances, inspection and representations | 6 | 110 |
| 16. A complete Pong match | States, scoring once, winning, restart, collisions, responsibilities and saved results | 5 | 100 |
| **Pong: a finished game** | Reopen the same files; finish the match and add a personal enhancement | — | **150** |
| 17. Python on your own computer | Six-section article: editor, environment, running, packages and one original idea | — | 30 |

## Coverage and prerequisites

[COURSE-COVERAGE.md](COURSE-COVERAGE.md) maps all **151 distinct requested reference URLs**. Repeated list and loop blocks are consolidated. [The manifest](content/curriculum-manifest.json) supplies evidence for 225 distinct authoring objectives, including additional prerequisites needed for input, recovery, tuples, browser graphics and project development.

For every objective the build requires an explicit introduction, a labelled worked example, required coding checkpoint, assessment evidence and a later retrieval opportunity. Assessment can be a coding checkpoint or a quiz question. Narrow topics need not appear in every quiz. Optional recall prompts are clearly labelled as opportunities for self-explanation, not evidence of mastery.

Activity prerequisites and quiz review links must point backward. The module's final coding activity is an independent transfer problem. Early game boilerplate is supplied; exceptions, dictionaries and classes are introduced before learners are asked to design with them. Runtime infrastructure does not count as teaching.

## Practice and support

Learners type their first short program immediately. Subsequent tasks mix reading/prediction, completion, modification, debugging and independent building. Each new area starts with a relevant working example, including late topics such as files and classes. Output can remain hidden until the learner has predicted it.

Each coding activity has two to four meaningful checkpoints, three contextual hint levels, a explained reference solution and a changed-input experiment. Datasets, caller interfaces and browser setup are supplied. Independent problems accept equivalent behaviour; a focused method exercise may explicitly require its named construct. Repeated typing of complete example programs is not a completion requirement.

Short, expandable recall prompts revisit earlier ideas after intervening material. Project readiness recaps link to independent exercises. They are advisory; navigation and self-assessment remain flexible.

Each quiz has two tracing questions, two code completions, one debugging/test-selection question and one application question. Modules 3–16 use four current and two earlier questions; module 2 retrieves one earlier idea. A retry switches between two authored forms. Form, question IDs, shuffled orders, blank placements and answers survive save/reload and backup. Scores and review advice remain distinct from completion.

## Project and data ownership

Canonical workspaces are `python-v3-calculator-project` and `python-v3-pong-project`. The early `project-stage` activity points to its canonical `projectId`. The frontend uses that ID for local drafts; the backend resolves aliases before revision validation and persistence. Both visits share every saved file. Their activity completion records and milestone IDs remain distinct.

The later visit never reapplies a starter to existing work. Reset explicitly warns that it replaces files for both visits. Copying an archived project requires the learner's explicit copy action; the source remains unchanged. The optional AI extension has its own workspace and copies Pong only when requested.

V1 and V2 definitions remain in `content/legacy/`. Rewritten contracts have new v3 IDs; the unchanged optional AI extension retains its v2 ID. Old completion does not transfer to different tasks. Saved files, quiz attempts, earned progress and backup-v1 imports remain supported. The previous curriculum map is preserved as [COURSE-V2-MAP.md](content/legacy/COURSE-V2-MAP.md).

## Files and local development

Python runs in Pyodide's browser filesystem. The application captures supported text files into the activity workspace; a plain Pyodide in-memory filesystem would not itself persist across page reloads. Learners inspect generated text, CSV and JSON files in the editor. Files do not automatically appear on the host computer. Probe files and writes are isolated from learner data.

The final article has no editor, terminal or preview. It uses Windows as the main walkthrough, includes macOS/Linux differences, direct virtual-environment interpreter commands, official links and a troubleshooting box. The learner's own new idea is optional and outside the course estimate.

## Research informing these decisions

- [PRIMM — Sentance, Waite and Kallia](https://eprints.gla.ac.uk/229013/): prediction, investigation, modification and making; self-explanation adapts the discussion step for independent learners. Classroom evidence does not directly validate a self-paced implementation.
- [Subgoal-labelled worked examples — Margulieux, Morrison and Decker](https://link.springer.com/article/10.1186/s40594-020-00222-7): make each example's purpose explicit, then check independent transfer; results do not establish uniform exam gains.
- [Completion/Parsons work — Weinman, Fox and Hearst](https://acelab.berkeley.edu/wp-content/papercite-data/pdf/parsons-chi2021.pdf): completion tasks can bridge reading and writing; token choice alone does not establish independent programming ability.
- [Practice testing and distributed practice — Dunlosky and colleagues](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html): revisit skills after intervening content.
- [Formative feedback — Shute](https://www.ets.org/research/policy_research_reports/publications/report/2007/hslv.html): explain the observed failure and suggest a useful next observation.
- Technical distinctions follow [Python data structures](https://docs.python.org/3.14/tutorial/datastructures.html), [built-in types](https://docs.python.org/3.14/library/stdtypes.html), [CSV](https://docs.python.org/3.14/library/csv.html), [Pyodide filesystem](https://pyodide.org/en/stable/usage/file-system.html), [VS Code Python](https://code.visualstudio.com/docs/python/python-tutorial), and [environments](https://code.visualstudio.com/docs/python/environments).

Lesson counts and budgets are design decisions. Browser testing and automated grading do not replace beginner observation. See [the implementation verification log](COURSE-V3-IMPLEMENTATION.md) for evidence and remaining learning validation.
