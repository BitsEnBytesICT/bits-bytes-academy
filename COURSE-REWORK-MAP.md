# Calculator and Pong curriculum map

The active course has two project-led learning paths and ten modules. Each module contains five connected coding activities and a five-question quiz. A separate reading teaches documentation research. The calculator and Pong projects are self-assessed, begin with almost empty files, and impose no function-name or automated-test requirements. An optional computer-opponent extension follows Pong. Later topics have no active lessons or invented third project.

## Progression

| Module | Main learning outcome | Preparation for the project |
|---|---|---|
| Useful programs | Output, numbers, arithmetic, updates, remainder | Calculate useful results and explain them |
| Input and decisions | Input, conversion, formatting, Boolean conditions, branches | Ask for numbers and choose operations |
| Unexpected input | Normalisation, compound conditions, exceptions | Reject mistakes without crashing |
| Repetition and recovery | Sentinel loops, retry/cancel, counted repetition | Keep the calculator usable across calculations |
| Organising a solution | Functions, returns, defaults, validation helpers | Design and build a terminal calculator |
| Representing game state | Lists, coordinate tuples, dictionaries, copying | Track positions and scores deliberately |
| Libraries and local files | math, random, real pygame.Rect, imports, own helper modules | Use libraries and split a program into files |
| Scenes and events | Surfaces, colour, geometry, event handling, frame redraw | Build a visible, responsive court |
| Movement and control | Elapsed time, held keys, clamping, wall response | Control two paddles and move a ball consistently |
| Rallies and matches | Hitboxes, direction-aware collision, scoring, reset, winning | Assemble and test a personal Pong game |

The first activities provide a working context and small repairs. Later activities ask for behavior with fewer implementation directions. Each module ends with an independent exercise. Three hint levels move from a concept to an approach and then a small example; reference solutions remain a separate deliberate action. Choosing a reference does not complete an exercise: a successful graded Run is still required. Projects use the learner's explicit completion decision instead.

## Mapping the original course

| Original chapter | Retained or combined material | Deferred material / reason |
|---|---|---|
| 1. Python foundations | Useful programs; input and formatting in Input and decisions | Repeated one-line arithmetic/output drills consolidated into connected tasks |
| 2. Control flow and errors | Input and decisions; Unexpected input; later boundary debugging | Separate Boolean and debugging introductions combined with real input problems |
| 3. Lists | Representing game state; iteration reused across modules | Comprehensive list-operation catalogue, advanced slicing and nested-list drills deferred |
| 4. Loops | Repetition and recovery; game loops revisit the concept in a new setting | Comprehension and nested-loop specialisms deferred |
| 5. Functions | Organising a solution; helpers reused in multi-file and game lessons | Repeated parameter/return drills combined into repair and independent tasks |
| 6. Optional practice I | Selected skills integrated into cumulative exercises and the calculator | Original optional drill bank remains in the backup/archive, not the required path |
| 7. Strings | Input conversion/formatting and strip/lower validation in modules 2–3 | Full string indexing/method catalogue deferred; duplicate formatting introductions removed |
| 8. Modules | Libraries and local files, actual bundled pygame, documentation research | Repeated import introductions combined; browser setup taught explicitly |
| 9. Dictionaries | Representing game state; match state and controllers | Full dictionary-method catalogue deferred; creation and use taught together |
| 10. Files | Local Python-module organisation is taught in module 7 | Text/CSV/JSON data processing deferred; importing Python files is not claimed to replace file-I/O teaching |
| 11. Classes | Learners use library objects such as Rect and Surface | Defining classes, inheritance and object-oriented design deferred |
| 12. Optional practice II | Relevant state/debugging practice appears in Pong preparation | Remaining advanced drill bank deferred |
| 13. Next steps | One unavailable future-path notice | Future curriculum left open for the owner |

The visible module count changes from 13 to 10 (about 23% fewer). That number must not be presented as a pure deduplication result: some old topics are deferred, while three graphical modules are new. The actual consolidation is in repeated foundational drills and separate introductions to concepts now taught together. The 240-to-64 activity change also reflects the narrower two-project scope, not removal of 176 redundant lessons.

## Saved work and course identity

New activities use `python-v2-*` IDs. Existing workspaces, quiz attempts, progress, and backup-v1 records retain their original IDs and remain restorable. Original saved work is accessible through the learning-data archive; it does not count as completion of a new activity. `content/legacy/course-v1.json`, original authoring sources, and original chapter files are retained. A full pre-rework source/runtime/Git/database snapshot also exists outside the repository; see `PROJECT-REWORK.md` for its location and verification evidence.

## Assessment design

Coding exercises check observable results, isolated function calls, input sequences, errors, imported-module behavior, and boundary values. They accept alternate formulas, control flow, import styles, variable names, numeric formatting, and equivalent drawing operations where the contract allows them. Graphical exercises use real pygame objects and pixels plus evidence that the preview rendered and exited without error. Full script runs start fresh; console experiments never award completion. Current-run checks must all pass together; prior earned completion remains preserved.

An exercise can prescribe a public helper interface because a caller needs one. That restriction does not extend to final projects. Neither final project has an automated solution checker, required algorithm, or required file structure.

## Multi-file coverage

**One program, two files** explicitly teaches creating `shipping.py`, importing a module or a function, selecting tabs, main.py as the entry point, save/reload, and import failures. **Build a reusable paddle layout module** applies the same skill to pygame. Graphical modules continue using separate helper files. The optional AI extension copies every saved Pong file into an independent workspace, so learners can preserve their two-player project while experimenting.
