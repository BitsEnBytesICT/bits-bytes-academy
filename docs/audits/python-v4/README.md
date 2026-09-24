# Python course v4: practical audit and improvement plan

**Historical audit.** The fixes and current verification are recorded in [FIXES.md](FIXES.md). Findings below describe the original baseline, not the revised course.

**Audit date:** 24 September 2026

**Baseline:** `beec730ad347902c5bd2be6e58c0e0c4dc156e55`, course version 4
**Scope:** all 198 active activities, their instructions, examples, starters, reference solutions, checks, hints and feedback; both forms of all 23 quizzes; curriculum order and progress behaviour.

## Judgment

**The broad learning sequence makes sense. The current course is not yet dependable enough for a complete beginner working entirely alone.** The opening is gradual: it starts with output, quoted text, comments and errors, then introduces values, arithmetic, input, decisions, repetition and functions. The calculator and procedural Pong are in defensible positions. Keep this structure.

The most urgent problems are smaller but consequential: correct work can fail, two blank tasks omit the function name the grader needs, one sequential task requires a later instruction before accepting the current one, and saved file data changes the grading result. A novice would reasonably assume these are their mistakes. More explanation cannot compensate for an inconsistent grader.

After those fixes, the largest teaching improvement is **helping learners assemble the pieces**. Many later activities ask for a short helper function. Completing those helpers is useful practice, but it does not establish that the learner can design and run a whole calculator or wire a game loop together. The course needs a few deliberate integration exercises, visible test calls, and better-supported introductions to dense late concepts.

### Direct answers

| Question | Answer |
|---|---|
| Does the order make sense? | Mostly yes. Keep the 24-module backbone, one calculator, one Pong, and the six mini projects. |
| Does every individual task make sense? | No. The ledger identifies missing interfaces, hidden requirements and a sequential dependency error, plus narrower clarity improvements. |
| Do the tasks work? | All reference solutions pass, but several valid alternatives and ordinary reruns fail. Some incorrect implementations also pass. |
| Would a novice understand the instructions? | The opening is reasonably explicit. Reliability, visible execution and the transition into integrated programs need work. This is an expert walkthrough judgment, not a measured novice-study result. |
| Does completion prove understanding? | No. The app deliberately separates quiz completion from readiness; current coverage tags and repeated quiz items still overstate the strength of the evidence. |

Read the [activity-by-activity ledger](activity-by-activity.md) for every activity in order: **108 Keep, 66 Improve, 24 Fix**. These are triage decisions, not numerical ratings of learning quality. A Keep activity can still benefit from shared feedback/interface fixes.

## What was checked

### Execution and state

| Check | Result in this audit | Interpretation |
|---|---|---|
| Documented-output Python examples | 173 passed | Examples produce the documented result with their supplied inputs. This excludes local shell commands and deliberately incomplete snippets. |
| Graded activities | 171 reference solutions passed; unfinished starters cannot earn full completion; 394 probes exercised | This establishes the supplied solutions work; it does not establish a fair grader. |
| Quiz forms | 23 quizzes, 46 forms, 276 items reviewed; 184 prediction/completion programs verified | Debug/application items also received content review. |
| Incorrect completion tokens | 184 executed; none reproduced the required output | No ambiguous successful wrong token was found in this set. |
| Additional adversarial cases | 27 cases; 23 expected/actual mismatches across 20 activity IDs | Several cases reproduce the same underlying defect. These are not 23 independent bugs. See [evidence.json](evidence.json). |
| Sequential reference prefixes | 41 multi-instruction terminal activities examined | Valid top-level prefixes help locate dependencies; semantic review confirms the repeat-input blocker. See [sequential-prefixes.json](sequential-prefixes.json). |
| Real browser graphics | All 13 graphical reference lessons passed with rendered frames | Uses the actual preview and browser interpreter, beyond headless grading. |
| Real browser Pong | All 14 interaction checks passed | Includes both controls, boundaries, both paddles/walls, outgoing contact, misses, one-point scoring, serve, focus, Stop/Run and normal finish. |
| Progress, persistence, archives and contrast | 13 relevant tests passed | Includes sequential rules, quiz forms/drafts, historical workspaces, stale writes, backup compatibility and code palette contrast. |
| Representative browser lessons | Valid normalisation rejected; valid repeat-input step 1 rejected; ordinary assignment step 1 unlocked step 2 neutrally and survived reload | Confirms both the defects and the functioning underlying sequential UI. |
| Generated CSV through the application | Exported results.csv, inspected its quoted comma field, reloaded the page and reopened the identical saved contents | Confirms one complete file-capture/save/reload path. Text and JSON reruns were tested through the Python engine; additional full UI cases remain in the release plan. |

The normal app and learner database were not used for audit writes. Browser lesson experiments ran on a separate local server with an in-memory database. The graphical harness has no learner database. The current dark quiz palette also looked readable in the browser; the automated palette checks meet 4.5:1 for the covered code and blank states.

English content and both quiz forms were reviewed. All English/Dutch task instructions were compared, and bilingual field completeness was checked. A separate full Dutch editorial proofread is still advisable; populated translated fields alone are not proof of natural, beginner-friendly language.

**Limits:** this is not 198 manual browser completions or a real human beginner study. Every graded activity was executed through the course's Python assessment engine; browser checks targeted the important runtime and interface paths. The local-development installation steps were checked against official guidance, not performed on a newly provisioned computer. No production build was needed or claimed because the course/application code was not changed by this audit.

## Findings and concrete improvements

### F01 — Correct normalisation is rejected (P1)

`05-normalise-command` asks for a trimmed lowercase `choice`, then asks the learner to print it. This valid solution fails:

```python
choice = input("Choice: ").strip().lower()
print(choice)
```

The baseline probe evaluates `choice == raw.strip().lower()`, although the task does not require a variable called `raw`. Using a differently named intermediate variable also should be legitimate. This was reproduced in the Python engine and full lesson UI.

**Change:** test the documented input-to-choice/output behaviour. If an intermediate variable is genuinely the learning objective, name it explicitly. Prefer accepting the concise solution here. Add this exact valid alternative to regression checks.

**Location:** `content-src/beginner-course/04-05-text-input.mjs:685` and its check at line 719.

### F02 — One sequential task cannot be completed sequentially (P1)

In `08-repeat-input`, step 1 requires repeated Item prompts and Added messages. Step 2 adds Done after quitting. Step 1's expected transcript already includes Done, so a correct step 1 cannot unlock step 2.

The browser leaves the task at 0/2 and advises the learner to read another answer inside the body—even when the program already does that correctly. The second step stays locked. By comparison, `02-assignment` correctly accepted an assignment alone, unlocked its print step neutrally, and retained progress after reload.

**Change:** each checkpoint must test its own surviving requirement using a partial program that stops before later requirements. Keep the all-correct shortcut and full-program verification before first completion. Add a runnable partial fixture for each multi-instruction activity; do not rely only on full reference solutions.

**Location:** `content-src/beginner-course/08-while.mjs:217`, especially the transcript checks at lines 251 and 260. The generic progress logic in `frontend/src/lesson-progress.ts` does not need replacement.

### F03 — Two independent tasks omit mandatory interfaces (P1)

| Activity | Missing from the learner's blank-editor brief |
|---|---|
| `11-length-copy` | `with_count(items)` |
| `13-multiple-results` | `pack_groups(items, size)` |

The required names occur in the reference/checker, but not the task's explanatory prose or empty starter. The learner cannot infer an arbitrary grader-facing function name.

**Change:** give the exact function interface, input assumptions, return shape, two sample calls and mutation rules. An independent task can keep a blank editor while stating its public interface; withholding the interface is not independence.

### F04 — Interactive helpers cannot be tried naturally (P1 for grading; P2 for presentation)

`10-retry` and `10-cancel-safely` define an input function but provide no top-level call. Run therefore does not show the promised interactive conversation. Adding the natural `print(read_count())` or `print(read_number())` call makes a correct implementation fail: the probe executes the entire source, consuming input, then calls the function a second time with the depleted queue.

Many other function-only activities are valid but produce no visible output, making their execution harder for a novice to reason about.

**Change:** provide a safe demonstration caller and keep its execution separate from assessment calls. Before the modules lesson, use a clearly marked test-call area or supplied caller in the same file; do not require an unexplained import or `__main__` convention. After module 14, the existing supplied `main.py` plus learner-owned helper pattern works well. Always show at least one call and expected return, explaining that returning differs from printing.

**Acceptance:** the function-only solution, a visible interactive driver, retry then success, immediate quit and end-of-input all behave consistently. Hidden checks must not consume input twice.

### F05 — Some checks impose unannounced details (P1/P2)

- `08-break` silently requires the literal prompt Command: although the task only specifies loop behaviour and response messages.
- `23-methods` requires `toggle()` to return None although the task only says to reverse the lamp state. A method that also returns the new state is rejected.
- `23-virtual-pet` similarly imposes an unstated None return on `feed`.
- `03-addition` rejects grouped equivalent assignments because the probe replaces only a particular assignment syntax. This is a lower-priority alternative at that early point, but demonstrates the brittleness of source substitution.

**Change:** write a small contract for every activity: editable data, required names, accepted inputs, output/return, mutation, exact text, required construct. Assess behaviour by default. Impose syntax only where the exercise explicitly teaches that construct. Do not silently grade a formatting choice or incidental reference-solution detail.

### F06 — Passing checks sometimes do not establish the intended skill (P2)

Reproduced examples:

- `06-equal`: calculate a correct result but always print True; both checkpoints pass even though changed inputs should print False.
- `14-repeatable-random`: return a fixed alternating sequence, ignore seed and the random generator; the activity still passes.
- `23-virtual-pet`: reject playing at exactly two energy using `<= 2`; the activity still passes. Its tests exercise odd energy values instead of that boundary.
- The pet's representation may hard-code initial energy 5 and still pass because the relevant check does not inspect representation after state changes.
- Named-construct tasks for powers, range, unpacking and with accept implementations that omit the construct explicitly requested in their brief.

**Change:** add a plausible mistake and a permitted alternative per distinct assessment contract. Test opposite Boolean outcomes, exact boundaries, changed names/state, and real random/seed behaviour. Keep construct checks narrow and syntax-aware; do not make independent projects match one solution's source.

**Useful standard:** a test should explain what learning claim a deliberately wrong implementation disproves. Reference-only success is insufficient.

### F07 — File grading depends on a learner's saved fixture contents (P1)

Correct `20-append` passes on the first run and fails on the second run using its own saved log. Correct `22-update-and-recover` has the same problem as the saved count grows. Correct references also fail after encouraged input-file edits in `20-read`, `20-lines`, `21-rows` and `22-load`.

The engine isolates probe execution, but unspecified probe files inherit the learner workspace. Several checks then expect original fixture values. Isolation from file damage and deterministic test data are two different requirements.

**Change:** declare complete relevant input fixtures for every file probe. Keep the learner's actual files for the real visible run; grade against separate deterministic fixtures. Preserve generated files and do not reset the learner's experiment to make a test pass.

**Acceptance:** run twice, save/reload, change a valid input file, introduce a malformed file, and rerun after recovery. Check text, quoted CSV and nested JSON. Earned completion may remain earned, but current-run feedback must still be truthful.

**Locations:** `content-src/beginner-course/file-authoring.mjs`; `frontend/public/runtime/engine.mjs:14` merges workspace files and probe overrides.

### F08 — The coverage map counts labels as evidence too readily (P2)

All 151 distinct linked syllabus entries have manifest mappings, and the declared prerequisite order validates. That is useful bookkeeping. However, `authoring.mjs` assigns all lesson topics to each checkpoint by default, and the manifest treats tagged practice as assessment evidence. It cannot determine whether the student's contribution actually exercises that skill.

Examples: `15-score-label` teaches font rendering and blitting, but its independent task returns an f-string to a supplied renderer. Event polling/dispatch is supplied in `15-events`. The dictionary views task primarily uses items(), and the formatting task can use only one of positional/named .format() despite broader tags.

**Change:** distinguish introduced, demonstrated, practised, independently applied, assessed and retrieved. Give each assessed topic a specific check and a counterexample that would fail. Supplied runtime code remains support, not learner evidence. Audit keys()/values(), both .format() forms, empty dictionary/update practice, text rendering and event-loop wiring explicitly.

Do not create a separate long lesson for every method. A short targeted edit or a second meaningful checkpoint can be enough.

### F09 — The transition from helpers to whole programs needs bridges (P2)

The calculator's brief, readiness links and manual cases are good. The missing bridge is combining a menu, helper calls, retries, cancellation and an outer loop in one coherent non-calculator program.

Pong's reference works, and keeping it procedural is appropriate. But most preparation exercises modify isolated helpers inside a finished supplied application. The final independent serve task is tiny. Learners then face arranging setup, events, update order, drawing, state and both sides' collisions together.

**Change before calculator:** add a small complete converter or ticket-service session: predict its conversation, repair one retry path, then independently add another operation. Label read → validate → calculate → display → repeat. Keep the calculator as the single later main project.

**Change before Pong:** add a small integration sequence within modules 15–16:

1. Modify a supplied scene's event handling and text rendering.
2. Wire held keys, movement and boundaries together for two paddles.
3. Build one working vertical slice: serve → move → miss → score once → wait.
4. Mirror a supplied left-paddle response to the right side, then explain update order.

Supply the browser startup throughout. Fade the integration guidance before the project; do not ask students to retype infrastructure.

The activity-log analyser, guessing game, text cleaner and virtual pet would feel more like mini projects with supplied callers and visible reports or conversations. Keep their core logic independently graded. The CSV-to-JSON club book already produces a meaningful artifact; strengthen its example data and row-validation contract.

### F10 — Retrieval is mechanically distributed (P2)

Retrieval prompts are assigned two modules later by index, using an earlier prediction and experiment. Some prompts depend on a snippet that is no longer visible. The closing local-development article receives 13 prompts from modules 22–23, undermining its intended short, practical conclusion.

**Change:** select retrieval for its relationship to the current task, include enough context to answer it, and vary the example. Remove the pile-up from the final article. Use a small number of deliberate recalls in later lessons or a clearly optional review collection.

Preserve the ability to open the earlier lesson without losing the current draft. Keep recall advisory; do not turn every prompt into another navigation gate.

### F11 — Quiz scoring is sound, but variation and editorial precision need work (P2; factual corrections P1)

The 276 authored items contain 190 distinct complete question bodies; **86 are exact content repeats under new IDs**, principally automatic earlier-topic retrieval. Repetition can support recall, but this is weaker evidence of transfer than a changed scenario. Many alternate forms change only a number, name or irrelevant comment.

Specific corrections:

- Module 2 form B still offers change cat to dog when the shown value is already dog.
- Module 19's marked repair uses `(n, 2)` although n is undefined in the displayed code.
- Module 21 form B describes Ada in its comment but the CSV row contains Bo.
- Some generic application prompts ask for an explanation while the choices actually ask the learner to select a test set.

**Change:** retain the six-question shape and saved form identity. Make retries vary the reasoning case: true versus false, empty versus populated, exact boundary versus ordinary value, present versus missing, mutation before representation, outgoing versus approaching collision. Give completion distractors specific feedback instead of the same explanation for every wrong token.

Keep option shuffling: the source's repeated answer ID a is not a user-facing fixed-answer-position bug.

### F12 — Optional experiments precede required instructions (P2)

The lesson pane renders all teaching sections, including Try one change, before Instructions. Several experiments alter values required by exact-output tasks. A conscientious beginner can follow the page from top to bottom and accidentally make the graded task fail.

**Change:** present learn/example → required task → check result → optional experiment. At minimum label experiments After completing the task. Prefer an expandable post-completion experiment and an easy way to retain the last passing version. Do not ask a learner to overwrite a satisfied requirement in order to satisfy a later one.

Feedback should show a concise failing input, expected behaviour and observed behaviour when appropriate. Current generic approach hints can be wrong diagnoses, as the repeat-input case demonstrates.

### F13 — Estimates and reward spacing need learner validation (P2/P3)

The authored total is 3,021 minutes, rounded to 51 hours. Of the 171 graded activities, 85 use a 12-minute estimate. The exact totals are not evidence that learners finish at that pace.

| Milestone | Current position | Authored elapsed time before starting |
|---|---:|---:|
| Delivery-price adviser | 64/198, module 7 | 12h 50m |
| Calculator | 94/198, module 10 | 19h 57m |
| Activity-log analyser | 108/198, module 12 | 24h 29m |
| Number-guessing game | 120/198, module 14 | 27h 08m |
| Pong | 137/198, module 16 | 32h 10m |
| Text cleaner | 158/198, module 18 | 38h 49m |
| Club results book | 186/198, module 22 | 46h 29m |
| Virtual pet | 196/198, module 23 | 48h 58m |

These are sums of provisional estimates, not measured times. The gradual opening should remain. Improve the sense of achievement by presenting the announcement, profile, receipt, visitor card and trip report as things the learner has made. Do not move the full calculator ahead of its prerequisites just to get a large project earlier.

Later compact modules need the same novice support as early print lessons: trace tables, data diagrams, visible calls and labelled subgoals. Split concepts only where they create a new mental model—especially defaults/keyword calls, nested structures, comprehensions, file position, constructor/self and shared instance state.

## Curriculum flow, module by module

| Module | Flow judgment and adjustment |
|---|---|
| 1. First programs | Keep the eight-step opening. Clearly separate required output from personal experiments. |
| 2. Variables | Keep. Connect names, assignment order and type inspection with visible values. |
| 3. Calculations | Keep concrete arithmetic. Align construct checks and celebrate the receipt as a useful result. |
| 4. Text output | Keep. Present concatenation, print arguments and formatting as choices with different purposes. |
| 5. Input | Keep separate int/float lessons. Repair normalisation grading and retain valid-input scope. |
| 6. Booleans | Keep separate and/or/not introductions. Add truth traces and strengthen changed-output checks. |
| 7. Decisions | Keep before repetition. Add a visible tariff table to the delivery mini project. |
| 8. while | Repair the sequential task and prompt contract. Add accumulator and continue traces. |
| 9. Functions | Show caller/callee flow. Distinguish print from return, and separate default binding from keyword calls. |
| 10. Recovery | Repair interactive helper grading. Add a complete session bridge before the one calculator project. |
| 11. Lists | Keep method and mutation distinctions. Publish the missing independent function interface. |
| 12. List loops | Keep ordinary loops before comprehensions. Give the activity log a runnable report. |
| 13. Tuples | Keep before graphics. Publish pack_groups and explicitly practise unpacking. |
| 14. Modules | Keep import/install distinction and helper files. Repair seed assessment; give the guessing game a caller. |
| 15. Pygame scenes | Keep stable startup. Add actual event wiring and text rendering by the learner. |
| 16. Game rules | Keep units and direction-aware collisions. Add an integrated rally before the one Pong project. |
| 17. Collections | Add row/column and nested-loop traces. Separate basic comprehension construction from filtering. |
| 18. Strings | Keep immutability and delimiter distinctions. Practise both formatting forms and show a cleaner's report. |
| 19. Dictionaries | Add focused keys/values/update practice and fix the quiz's undefined coordinate variable. |
| 20. Text files | Fix deterministic probe data first. Show file cursor, overwrite and append visually through before/after contents. |
| 21. CSV | Preserve real quoting/delimiter cases. Separate reading a row from converting its values. |
| 22. JSON | Fix reruns; preserve malformed data. Make the club book's row assumptions explicit. |
| 23. Objects | Add instance diagrams and visible use. Fix hidden returns, pet boundaries and state-dependent representation checks. |
| 24. Local Python | Keep the six-part article and official links. Remove the 13 accumulated retrieval prompts. |

## Standard for a revised task

Every task should let a novice answer five questions before editing: **What am I making? Which file or function do I change? What inputs are allowed? What should happen? How can I test it?**

For example, the repaired list-copy brief should say: implement `with_count(items)`, accept a list, return a new list containing the same elements followed by the original length, and leave the input unchanged. Show `with_count(["a", "b"])` producing `["a", "b", 2]` and `with_count([])` producing `[0]`. Give an inspection call so the learner can see both the original and returned values. This states the contract without giving away the implementation.

Use starters deliberately:

| Situation | Supply | Learner's contribution |
|---|---|---|
| First encounter with a construct | A short runnable analogous example and one focused question | Predict, run, explain a step, then make a small change |
| Practising one unfamiliar operation | Data, a named interface and runnable surrounding code | Complete the relevant expression or small block |
| Debugging familiar material | A clearly labelled faulty program | Identify the cause, repair it and try a counterexample |
| Independent transfer | A brief, examples, interface if needed and necessary fixtures | Choose the approach and write a short program or helper |
| Integrating an application | Stable infrastructure and labelled responsibilities, with progressively fewer implementation hints | Connect known behaviours and verify their interactions |

Keep empty editors for familiar, reasonably short constructions. Provide repetitive setup and browser-specific support. A learner should type code because they are making a decision or building a mental model, not because reproducing a long supplied listing earns completion. Keep full solutions behind the existing controls; the third hint should reveal a useful fragment, not quietly substitute for the entire independent task.

## Implementation plan

### Phase 1 — Restore a fair, predictable task contract

Address F01–F05 and F07 first. Fix normalisation, sequential repeat-input, the two missing function interfaces, interactive callers, prompt/return contracts and file fixtures.

**Exit checks:** all existing references still pass; the valid alternatives in evidence.json pass where allowed; step 1 can complete alone; future steps remain neutral; correct file code works after a second run and after valid file edits. Confirm ordinary failure, runtime error, Stop, navigation and edits during execution cannot grant incorrect new credit. Retain stale-write protection.

### Phase 2 — Make lesson execution and feedback understandable

Move experiments after tasks, add safe visible calls, improve failure messages and make exact text versus flexible behaviour explicit. Make before/after values or small traces available for counters, function calls and mutation. Use the same English/Dutch meaning and keep literal code identifiers unchanged.

**Exit checks:** a learner can say what to edit, how to run it, what they should observe, and why a check failed without revealing the complete solution. Test the actual panes at normal viewport sizes, not just source strings.

### Phase 3 — Strengthen evidence of learning

Fix F06 and replace broad checkpoint tags with precise topic evidence. Correct the three quiz copy defects, rewrite weak alternate cases and author meaningful spaced retrieval. Preserve quiz attempt snapshots and their original answer interpretation.

**Exit checks:** every assessed topic has a relevant learner action and an intentional wrong implementation or distractor that fails for the intended reason. Valid alternatives are accepted where syntax is not the goal. Each listed prerequisite is taught before it is required by the learner's contribution.

### Phase 4 — Add the missing integration practice

Add the non-calculator session bridge and the Pygame integration sequence. Make mini-project outputs visible with supplied drivers. Improve the specific dense late lessons identified in the ledger.

**Exit checks:** the calculator and Pong require no newly introduced language or application pattern. Learners have practised connecting state, control flow, helpers and visible output in a changed context. Keep only two ordinary main project activities and preserve each learner workspace.

### Phase 5 — Validate with actual beginners and calibrate estimates

Run formative sessions with several genuinely inexperienced learners; include English and Dutch readers. This is a practical pilot, not a statistically representative experiment. Observe Hello World, input conversion, an interactive retry, calculator preparation, the integrated Pygame task, a file rerun and first classes.

Record first unaided attempt, time spent reading versus coding, unexpected questions, hint use, errors, ability to explain an execution trace and ability to solve a changed example later. Log task defects separately from knowledge gaps. Fix repeated points of confusion, then run another small round. Revise estimates from observations; do not force sessions into the existing minute labels.

### Phase 6 — Release with historical records intact

Keep IDs when only wording or grading is corrected to match the existing contract. Use new IDs for materially different tasks. Version rewritten quiz content so old attempts retain their questions and interpretation. Verify archives, backup round trips, generated files and workspace revision conflicts on an isolated profile. Run content, runtime, API, persistence, typecheck and production-build gates, then verify the served course.

**Release acceptance:** all P1 blockers fixed, references and permitted alternatives pass, plausible errors fail, partial progress works across reload, text/CSV/JSON survive save/reload, graphical checks pass, and the beginner pilot has no unresolved task-contract blocker. Learning effectiveness and duration remain provisional until enough actual use supports stronger claims.

## Research and technical basis

- **Predict, run, investigate, modify, make:** PRIMM supports the proposed progression from examples to independent construction. The published study involved school classrooms and teacher mediation; adapting it to self-paced learning requires validation. [Sentance, Waite and Kallia](https://eprints.gla.ac.uk/229013/).
- **Label the purpose of steps:** worked examples organised around subgoals support the proposed read/validate/calculate/display and setup/events/update/draw explanations. The study found better initial assessments and fewer failures/withdrawals, but not higher mean exam performance; examples still need transfer tasks. [Margulieux, Morrison and Decker](https://link.springer.com/article/10.1186/s40594-020-00222-7).
- **Maintain accurate language distinctions:** sequence operations, shallow copies, mutation returns, list methods and tuple packing/unpacking should follow the official descriptions. [Python data structures](https://docs.python.org/3.14/tutorial/datastructures.html), [control flow and functions](https://docs.python.org/3.14/tutorial/controlflow.html).
- **Separate interpreter files from app persistence:** browser file systems require an application persistence layer; Python writes alone do not establish persistence across sessions. This app supplies file capture/storage, which needs end-to-end checks. [Pyodide file system documentation](https://pyodide.org/en/stable/usage/file-system.html).
- **Keep local setup current:** distinguish interpreter, editor, project environment and shell commands, and retain official guidance for environment selection. [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial).

These sources guide the proposed teaching approach. The task findings come from this repository and the reproduced runs, rather than being inferred from research papers.

## Reproduce this audit

Existing verification commands used:

```text
node tests/beginner-course-runtime.test.mjs
node tests/beginner-course-assembly.test.mjs
node tests/beginner-course-quizzes.test.mjs
node tests/beginner-course-behavior.test.mjs
npx tsx --test tests/lesson-progress.test.ts tests/curriculum-persistence.test.ts tests/quiz-contrast.test.ts
```

New audit-only tools:

```text
node scripts/inspect-course-audit.mjs 1,2 en
node scripts/inspect-course-audit.mjs 12,13 nl quiz
node scripts/audit-course-checks.mjs
node scripts/audit-sequential-prefixes.mjs
node scripts/render-course-audit.mjs
```

`audit-course-checks.mjs` records expected/actual differences; it is a diagnostic audit, not a passing CI gate. `render-course-audit.mjs` verifies that the editorial ledger contains exactly one entry for every active activity.

For rendered graphics, start `node scripts/serve-browser-checks.mjs` and use its graphical-reference and beginner-match pages. These harnesses do not use the learner database.

**Delivered:** this report, the complete activity ledger, its structured notes, and reproducible diagnostic evidence. Course content and application behaviour have not been changed by the audit.
