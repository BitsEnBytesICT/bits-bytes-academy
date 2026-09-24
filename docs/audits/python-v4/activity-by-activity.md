# Python v4: activity-by-activity review

Audited 24 September 2026 against commit beec730ad347902c5bd2be6e58c0e0c4dc156e55. Read the [findings and improvement plan](README.md) first for shared issues F01–F13 and verification limits.

All 198 activities are listed in course order: 108 Keep, 66 Improve and 24 Fix. These are editorial triage decisions, not measured learner outcomes.

- **Keep:** no material task-specific defect found; retain the core design. Shared interface and feedback improvements still apply.
- **Improve:** useful task, with a specific clarity, scaffolding, transfer or assessment improvement.
- **Fix:** a reproduced grading mismatch, missing mandatory interface or factual content defect requires correction.

Verification baseline: all 171 graded reference solutions pass and their unfinished starters do not earn full completion. All 173 documented-output Python examples pass. Both forms of all 23 quizzes were reviewed; 184 prediction/completion programs run correctly and all 184 incorrect blank tokens fail to reproduce the required output. The 13 graphical references also pass through the real browser preview. Main projects are self-assessed; their reference fixtures and manual-test coverage were reviewed separately.

A passing reference is not proof that a valid learner alternative passes. See evidence.json for 27 additional adversarial cases and sequential-prefixes.json for runnable-prefix checks of 41 multi-instruction terminal activities. Prefix checks locate possible dependencies; they do not replace semantic review of each instruction.

IDs below omit the common `python-v4-` prefix. Lesson task wording was reviewed in English and Dutch. Bilingual field completeness is automated; a full independent Dutch editorial proofread and real novice sessions remain future validation.

## 1. Your first Python programs

Current authored estimate: 84 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 01-welcome | Hello, world! | **Keep** | The supplied Hello World program establishes Run and output before syntax writing. Keep this orientation short; make the terminal output easy to locate. |
| 01-first-print | Write your first print | **Keep** | A one-line program from an empty editor is an appropriate first independent action. Preserve exact output here, with spaces and quotation marks explained. |
| 01-print-order | One line after another | **Keep** | Two statements give a clear execution-order exercise, and its checkpoints are separable. Ask the learner to predict the second line before running. |
| 01-strings-quotes | Text is a string | **Keep** | Matching single and double quotes are introduced before variables. Treat trying both quote styles as exploration, not an invisible formatting restriction. |
| 01-print-numbers | Numbers and quoted numbers | **Keep** | Comparing 7 and quoted 7 exposes that identical output can come from different types. Keep the later type() link; output alone cannot show the difference. |
| 01-comments | Comments are for readers | **Keep** | Commenting out a supplied test line has a visible effect and a clear purpose. Keep the distinction between source comments and printed messages. |
| 01-repair-syntax | Your first error message | **Keep** | One deliberately broken print call is a manageable first error. The changed-input experiment already says to do it after passing; use this ordering elsewhere. |
| 01-announcement | Make a terminal announcement | **Keep** | A short empty-editor announcement appropriately combines print, order, strings and comments. Allow a personal announcement after the specified verification task. |
| 01-quiz | Your first Python programs: review | **Keep** | The six items cover output, syntax and comments at an appropriate level. Both forms execute correctly; preserve the short first review. |

## 2. Variables and values

Current authored estimate: 113 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 02-assignment | Give a value a name | **Keep** | Store a value, then print the variable: the two checkpoints match the two new actions. Retain the explanation that assignment evaluates the right side first. |
| 02-name-or-text | A name or literal text? | **Keep** | The contrast between a quoted label and an unquoted name addresses a common misconception directly. The supplied context keeps the task focused. |
| 02-names | Choose readable names | **Keep** | Readable identifier practice is small enough for this point. Explain a rejected spelling as a naming contract, rather than implying it is invalid Python. |
| 02-reassignment | Change a stored value | **Keep** | Printing before and after reassignment makes changing state visible. Both instructions remain compatible with the finished program. |
| 02-integers | Whole numbers | **Keep** | Whole numbers and zero are introduced concretely without input conversion. Retain an optional negative-number experiment and a changed-value check. |
| 02-floats | Numbers with a decimal point | **Keep** | A single stored decimal is an appropriate next step after integers. Keep the Dutch note that Python uses a decimal point, not a comma. |
| 02-inspect-types | Ask Python for a value's type | **Keep** | type() now explains why earlier printed numbers looked alike. Make clear that its class-style output is diagnostic text, not class syntax to learn yet. |
| 02-repair-name | Read a NameError | **Keep** | A small name mismatch makes NameError actionable. Preserve the distinction between changing the reference and changing the stored value. |
| 02-profile | Create a small profile | **Keep** | The independent profile combines three already introduced types and ordered output. Its fixed data is reasonable for this first transfer exercise. |
| 02-quiz | Variables and values: review | **Fix** | Core questions are correct, but form B's wrong option says change cat to dog when the example already contains dog. Correct the stale option; keep case-sensitive naming feedback. F11. |

## 3. Calculations and changing values

Current authored estimate: 148 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 03-addition | Add quantities | **Improve** | The quantity calculation is clear, but assignment-replacement probes reject grouped equivalent assignments. Document supplied data as fixed scaffolding or make substitution independent of assignment syntax. F05. |
| 03-subtraction | Find what remains | **Keep** | A remaining-stock calculation gives subtraction a familiar meaning. Retain changed input and zero-result cases rather than checking only the shown answer. |
| 03-multiplication | Multiply equal groups | **Keep** | Equal groups give multiplication a concrete context. Continue checking calculated values rather than a memorised total. |
| 03-division | Share a quantity equally | **Keep** | Sharing a total introduces / and a float result without requiring error recovery yet. Keep nonzero divisors explicit until module 10. |
| 03-precedence | Control the order of a calculation | **Keep** | Parentheses solve a visible grouping problem. Preserve the worked comparison between grouped and ungrouped expressions. |
| 03-update-a-number | Update a number step by step | **Keep** | Two successive stock changes make execution order necessary. Both intermediate and final output are meaningful checkpoints. |
| 03-short-updates | The += and -= shortcuts | **Keep** | += and -= follow ordinary reassignment, so the shorthand has a basis. Keep the explicit construct requirement visible in both languages. |
| 03-powers | Repeated multiplication with ** | **Fix** | The task explicitly requires ** but multiplication instead passes. Either assess the named exponent construct or relax the brief; this lesson is the intended exponent practice. F06. |
| 03-whole-groups | Count complete groups with // | **Keep** | Complete boxes explain floor division more clearly than a rounding-up puzzle. Retain small positive examples before the negative-value investigation. |
| 03-remainder | Find the leftovers with % | **Keep** | Leftover items connect % to the preceding complete-groups lesson. Pair the two results in the later tuple exercise. |
| 03-receipt | Calculate a simple receipt | **Keep** | The independent receipt combines multiplication and subtraction without adding input or branching. The one-time discount is a useful requirement to state precisely. |
| 03-quiz | Calculations and changing values: review | **Improve** | Arithmetic, remainder and updates are sampled correctly. Add a changed grouping or zero-value scenario on retry rather than only replacing numbers. |

## 4. Building useful text output

Current authored estimate: 98 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 04-concatenate | Join two pieces of text | **Keep** | Joining names with an explicit space makes string concatenation concrete. Keep punctuation and spaces visible in expected output. |
| 04-convert-to-text | Include a number in text | **Keep** | str() is introduced at the point where number-plus-text would fail. Retain the contrast between numeric addition and string concatenation. |
| 04-print-values | Print several values together | **Keep** | Multiple print arguments offer a simple alternative to manual conversion. Explain the default spaces so output differences do not appear arbitrary. |
| 04-f-strings | Place values inside a message | **Keep** | Simple braces and an f prefix are sufficient at this stage. The construct requirement is explicit and the example is analogous. |
| 04-escapes | Newlines and special characters | **Keep** | One string containing a newline is a suitable first escape task. Keep the distinction between a backslash-n in source and a line break in output. |
| 04-multiline | Text across several source lines | **Keep** | A short notice introduces triple-quoted text without new computation. Warn that indentation inside the string becomes part of its contents. |
| 04-visitor-card | Build a visitor card | **Keep** | The independent card applies familiar formatting to another context. Accept equivalent formatting methods because the brief assesses the displayed result. |
| 04-quiz | Building useful text output: review | **Improve** | Formatting and newline questions are correct. Remove arbitrary added numerals from examples and make a retry distinguish literal braces from an evaluated field. |

## 5. Asking for input

Current authored estimate: 109 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 05-first-input | Ask and wait for an answer | **Keep** | An explicit prompt, stored answer and greeting introduce the input/output cycle. Keep the terminal interaction visible and explain that Run waits for Enter. |
| 05-input-is-text | Digits entered are still text | **Keep** | Inspecting an entered number's type addresses a crucial prerequisite before conversion. Keep this separate from int() and float(). |
| 05-integer-input | Convert a whole-number answer | **Keep** | The task explicitly names raw and visitors, unlike the later normalisation defect. Failed conversion is explained without prematurely demanding recovery. |
| 05-float-input | Read a decimal measurement | **Keep** | Decimal hours to minutes practises float conversion using known arithmetic. Make the valid-input assumption and decimal-point syntax prominent. |
| 05-two-answers | Ask two questions in order | **Keep** | Two prompts introduce ordering with a positive-time precondition. A sample conversation should remain visible while the learner types answers. |
| 05-normalise-command | Clean a typed command | **Fix** | Correct code that assigns input().strip().lower() to choice is rejected because a probe secretly requires raw. Remove that hidden variable dependency. Reproduced in Pyodide and browser. F01. |
| 05-trip-report | Make an interactive trip report | **Keep** | The independent report combines input, conversion, calculation and formatting without new control flow. Preserve its ordinary and decimal input cases. |
| 05-quiz | Asking for input: review | **Keep** | The text-versus-number and normalisation questions target important misconceptions. Keep the invalid decimal conversion repair and earlier retrieval. |

## 6. Comparisons and Boolean values

Current authored estimate: 124 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 06-boolean-values | Two Boolean values | **Keep** | Literal True and False precede comparisons and branches. Explain that the capital letters are Python spelling, not strings. |
| 06-equal | Compare with == | **Fix** | A correct result variable followed by print(True) passes even when changed inputs make result False. Probe the output requirement with both Boolean outcomes. F06. |
| 06-not-equal | Compare with != | **Improve** | The stop-command comparison is understandable. Audit the separate print checkpoint for the same hard-coded-output weakness as equality, and test both truth values. |
| 06-greater-less | Greater than and less than | **Improve** | The strict comparison is useful preparation for boundaries. Add an explicit equal-to-limit example and verify that output follows changed results. |
| 06-inclusive-boundaries | Include the boundary | **Improve** | The boundary is stated clearly. Put below/equal/above cases together so learners can explain <= versus <, and strengthen the output check. |
| 06-and | Require both conditions with and | **Improve** | The combined rule is appropriate after single comparisons. Keep a full four-row trace and verify both individual failing conditions, not just the example. |
| 06-or | Allow either condition with or | **Improve** | Two accepted commands provide a clear use of or. Include the common always-true expression error and test output on an unsupported command. |
| 06-not | Reverse a Boolean with not | **Improve** | Paused versus running makes negation concrete. Check both stored states and their printed results; do not accept a fixed Boolean output. |
| 06-access-rule | Combine a complete access rule | **Improve** | This is useful independent Boolean composition. Add a small input-state table and ensure the output checkpoint varies alongside the rule. |
| 06-quiz | Comparisons and Boolean values: review | **Improve** | The review's arithmetic execution is correct, but Boolean transfer needs more varied truth combinations. Use a different true/false arrangement in the alternate form. |

## 7. Making decisions

Current authored estimate: 137 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 07-first-if | Run an instruction only when needed | **Keep** | One conditional print introduces selection without an else. No-output for a false condition is a legitimate result and should be named explicitly. |
| 07-indentation | See which lines belong together | **Keep** | Repairing which lines belong inside the block teaches indentation through behaviour. The always-printed Ready line makes the boundary observable. |
| 07-else | Choose between two actions | **Keep** | The two age branches are clear and finish compatibly. Retain the threshold cases 11, 12 and 13 and the two-step interaction. |
| 07-elif | Choose among several actions | **Keep** | Ordered temperature intervals give elif a purpose. Require the learner to trace the exact boundaries rather than only one middle value. |
| 07-separate-or-chain | Separate checks or one choice? | **Keep** | The duplicate-label bug is a useful contrast between separate if statements and one chain. Preserve a case that would match both tests. |
| 07-command-menu | Respond to a typed choice | **Keep** | The independent normalised menu combines earlier input and decisions. Its error response is manageable because no retry loop is required yet. |
| 07-delivery-adviser | Mini project: delivery-price adviser | **Improve** | A suitable first mini project, with known comparisons and arithmetic. Add a visible tariff table and sample conversation; retain valid-input scope instead of introducing recovery early. |
| 07-quiz | Making decisions: review | **Improve** | Branch selection and boundary testing are appropriate. Change the generic application prompt to ask which test set covers the decision, and vary the boundary structure on retry. |

## 8. Repeating with while

Current authored estimate: 153 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 08-why-repeat | Repeat a small block | **Keep** | A counter-controlled while loop introduces repetition with familiar print statements. Trace condition, body and update as distinct steps. |
| 08-trace-counter | Trace the counter | **Keep** | A countdown followed by Go makes the after-loop boundary visible. A zero-start case is valuable for understanding that a loop may run zero times. |
| 08-accumulate | Keep a running total | **Improve** | The accumulator is an important new pattern, not just another counter. Add a tiny iteration table separating current value from running total. |
| 08-stop-endless-loop | Recognise and stop an endless loop | **Keep** | Repairing an omitted update teaches termination and safe use of Stop. Keep the final counter requirement and avoid leaving an unbounded starter running automatically. |
| 08-repeat-input | Keep asking until a stop word | **Fix** | Instruction 1's checks already require instruction 2's Done output. A correct first step cannot unlock the second. Split the contracts; browser feedback currently misdiagnoses a missing input update. F02. |
| 08-break | Exit a loop with break | **Fix** | The grader requires the Command: prompt although the task does not specify it. State the exact prompt or assess the stop behaviour independently of prompt wording. F05. |
| 08-continue | Skip one iteration with continue | **Improve** | Skipping evens is a useful contrast with break. Add an explicit trace showing why the counter must advance before continue to prevent a frozen loop. |
| 08-repair-exit | Repair a loop that exits too soon | **Keep** | A familiar loop with one incorrect exit is an appropriate debugging task. Keep the changed run that distinguishes break from continue. |
| 08-session-summary | Summarise a short session | **Improve** | This is a reasonable independent accumulation task. Add an immediate-quit example and make the final summary clearly separate from per-answer output. |
| 08-quiz | Repeating with while: review | **Keep** | The infinite-loop repair and continue explanation test relevant mental models. Add a trace table as optional feedback if learners confuse counter updates with skipped output. |

## 9. Writing small functions

Current authored estimate: 138 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 09-define-and-call | Give instructions a name | **Keep** | Defining once and calling twice gives functions a visible purpose. Preserve the first checkpoint for definition and the second for calls. |
| 09-flow | Follow a function call | **Keep** | Moving the final print exposes execution flow across calls. A short line-number trace would be useful optional support. |
| 09-parameters | Pass a value into a function | **Keep** | One input parameter and a visible call give a sound starting model. Distinguish the parameter name from the argument value in the explanation. |
| 09-multiple-parameters | Use two arguments | **Keep** | Two arithmetic arguments build naturally on the prior lesson. Keep the ordered call and later named-argument connection. |
| 09-return-values | Return an answer to the caller | **Improve** | Printing versus returning is correctly contrasted, but the finished helper has no visible caller. Supply a safe call-and-display example that does not violate the function's no-print contract. F04. |
| 09-none | A function without a return value | **Improve** | Useful misconception repair, but very similar to the preceding activity. Turn this into a prediction and caller-repair task so it adds understanding rather than repeating the same edit. |
| 09-local-scope | Keep a function independent | **Keep** | Replacing hidden global dependence with a parameter addresses reusable design. Compare two calls with different rates to make independence visible. |
| 09-named-and-default | Optional inputs and named arguments | **Improve** | Defaults and keyword calls are bundled into one task. Add separate call examples and a parameter-binding table before asking for both forms. |
| 09-early-return | Stop a function at a guard | **Improve** | A guard introduces a new control-flow idea. Trace one early exit and one calculation, and replace the awkward Dutch guard terminology with a plain explanation. |
| 09-ticket-function | Build a reusable ticket calculation | **Improve** | The independent function contract is explicit and tests defaults. Add a supplied caller or visible input/output table so success produces something the learner can inspect. |
| 09-quiz | Writing small functions: review | **Improve** | Return, scope and calls are assessed correctly. Strengthen the alternate form with a caller that combines a returned value rather than a numerical reskin. |

## 10. Handling mistakes and invalid input

Current authored estimate: 213 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 10-diagnose | Name the kind of mistake | **Improve** | The average repair applies logic-error diagnosis, but the title suggests practising all error categories. Show one labelled traceback investigation separately; do not claim one arithmetic fix assesses all diagnosis. |
| 10-value-error | Recover from a conversion failure | **Improve** | Parsing text and returning None is a good small recovery contract. Add visible calls with valid text, invalid text and zero; the helper-only Run otherwise appears inert. |
| 10-zero-division | Handle division by zero | **Keep** | A specific exception task avoids broad catch-all handling. Keep its explicit ZeroDivisionError requirement and compare a zero result with an invalid divisor. |
| 10-validate | A number can still be invalid | **Improve** | Parsing versus range validation is a valuable independent combination. Supply a visible cases table for 0, 100, outside values and malformed text. |
| 10-retry | Try again after invalid input | **Fix** | The helper alone never prompts on Run. Adding the natural print(read_count()) call consumes the probe's input before its hidden second call and fails grading. Separate demonstration and probe execution. F04. |
| 10-cancel-safely | Give every retry a way out | **Fix** | The important cancellation contract is sound, but adding a visible read_number() caller breaks grading. Supply a safe interactive driver and show EOF/quit versus numeric zero explicitly. F04. |
| 10-quiz | Handling mistakes and invalid input: review | **Improve** | Retry placement and cancellation versus zero are useful questions. Pair them with a runnable conversation task; quiz correctness cannot substitute for that integration. |
| 10-calculator-project | Project: your calculator | **Improve** | Requirements and manual tests are well scoped to earlier topics. Add a non-calculator integration exercise and a conversation flow sketch before this nearly blank-file project. Keep one calculator project. F09. |

## 11. Introducing lists

Current authored estimate: 80 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 11-create | Keep several values in a list | **Improve** | Mixed list contents are introduced correctly, but a function-only starter hides the resulting list. Supply a visible caller and label brackets, commas and element order. F04. |
| 11-append | Start empty and append | **Keep** | Starting empty and appending twice is focused practice of the named method. Retain changed values and order checks. |
| 11-combine | Combine two lists | **Keep** | Combining two lists without mutation makes + distinct from append. Retain tests confirming both inputs remain unchanged. |
| 11-indexes | Select a position | **Keep** | First and last elements practise positive and negative indexes with a stated nonempty precondition. Show a one-element case so both indexes may identify the same value. |
| 11-change-element | Replace an element | **Keep** | Replacing the last item demonstrates mutation rather than new-list construction. The requirement to return the same list is stated explicitly. |
| 11-length-copy | Count and copy a list | **Fix** | The independent editor is empty but the brief never names the required with_count(items) function. Publish its interface, examples and nonmutation contract before grading. F03. |
| 11-quiz | Introducing lists: review | **Keep** | Indexing, append, mutation and aliasing are represented correctly. Preserve the distinction between a new name and a copied list. |

## 12. Processing lists with loops

Current authored estimate: 115 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 12-for-values | Visit every value with for | **Keep** | Summing values with for builds on the known accumulator. The empty-list result is explicit and useful. |
| 12-range-stop | Repeat a known number of times | **Fix** | The brief requires range, but a while implementation passes. Decide whether range is the assessed construct and align checks accordingly; explain the excluded stop. F06. |
| 12-range-step | Choose the start and step | **Fix** | The range task also accepts a while-only countdown. Assess the named construct and add a concrete negative-step trace with a nonpositive start. F06. |
| 12-indexed-while | Traverse a list with an index | **Keep** | An indexed while loop is a useful comparison with value iteration. The end condition and independent output list are appropriate checks. |
| 12-search | Search until a match | **Keep** | A search task gives early return a new context. Retain later-match, no-match and empty-list cases so a premature False fails. |
| 12-filter | Build a list of matching values | **Keep** | Filtering into a new list prepares comprehensions without new syntax. Preserve order and nonmutation checks. |
| 12-activity-log | Mini project: activity-log analyser | **Improve** | The summary algorithm is a useful mini project, but it remains a helper with no visible report. Supply sample log data and a caller that prints the result; retain independent implementation. F09. |
| 12-quiz | Processing lists with loops: review | **Keep** | The late-match search bug and filtering explanation are useful assessments beyond syntax recall. Correct answers and completion distractors execute as intended. |

## 13. Tuples and multiple results

Current authored estimate: 44 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 13-pairs | Keep a coordinate pair in a tuple | **Keep** | A coordinate pair prepares graphics without introducing classes. Explicitly distinguish tuple construction from two separate returns. |
| 13-unpack | Unpack a pair into names | **Fix** | The task asks learners to unpack point, but index-based access passes. Either require unpacking as this lesson's skill or revise the wording and assess unpacking elsewhere. F06. |
| 13-multiple-results | Return two related answers | **Fix** | A blank-editor task requires pack_groups(items, size) without stating that name. Add the exact interface, one ordinary call and a zero-items example. F03. |
| 13-quiz | Tuples and multiple results: review | **Keep** | Tuple order, unpacking shape and calling a function are tested correctly. Keep tuple immutability wording precise and avoid implying all tuples are pairs. |

## 14. Libraries and separate Python files

Current authored estimate: 120 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 14-import | Use a standard-library module | **Keep** | A small math import makes module access concrete. Keep square-root meaning explained so the task does not silently become a mathematics test. |
| 14-selected-and-alias | Import a function or choose an alias | **Improve** | Selected imports and aliases arrive together while the imports are already supplied. Add a short learner-written import edit and explain the two resulting local names separately. |
| 14-random | Generate a random choice | **Keep** | A die roll is a clear bounded use of randint. Preserve checks for a genuine random call and explain inclusive endpoints. |
| 14-repeatable-random | Repeat a random experiment | **Fix** | A fixed alternating list that ignores seed and randomness passes. Check the generator/seed behaviour, and compare same-seed repetition with controlled different-seed draws. F06. |
| 14-decimal | Use decimal arithmetic deliberately | **Keep** | Constructing Decimal from strings gives the topic a practical purpose. Retain focused coverage and later retrieval instead of expanding it into a separate arithmetic course. |
| 14-helper-files | Put reusable code in another file | **Keep** | A supplied main.py calling an editable helper is a good runnable model. Reuse this pattern to repair silent function activities and explain module scope. |
| 14-guessing-game | Mini project: number-guessing game | **Improve** | Comparison, retries and cancellation combine appropriately. The graded task is a helper; provide a visible interactive launcher and clarify who chooses the target number. F09. |
| 14-quiz | Libraries and separate Python files: review | **Improve** | Seed, Decimal and import questions are correct. Add module-scope retrieval later and make the alternate seed question test a changed call sequence. |

## 15. Drawing and interacting with Pygame

Current authored estimate: 116 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 15-coordinates | Meet the Pygame preview | **Improve** | The real preview works, and supplied startup is appropriate. Add a labelled coordinate sketch and explicitly identify the learner-owned file versus infrastructure. |
| 15-attributes | Use an object’s attributes | **Keep** | Rect centre and dimensions give object attributes a concrete use before class definitions. Preserve changed coordinates and size checks. |
| 15-surface-colour | Paint an image on a Surface | **Keep** | Creating and filling a Surface gives immediate visual feedback. Explain RGB range and keep preview setup supplied. |
| 15-drawing-order | Draw the background before the foreground | **Keep** | One visible drawing-order fault is an effective debugging task. Real-browser reference rendering passed. |
| 15-events | Respond to a key press | **Improve** | The key toggle and quit helper are useful, but event polling and dispatch are supplied. Add a small event-loop edit before claiming those skills are independently practised. F08. |
| 15-score-label | Draw text on the court | **Improve** | The lesson teaches render/blit, but the independent task only returns an f-string to a supplied renderer. Add actual text rendering practice before Pong's score display. F08/F09. |
| 15-quiz | Drawing and interacting with Pygame: review | **Improve** | Rect, Surface and drawing-order items are useful. The event application forms differ only by a comment number; use another event shape or a missing-key counterexample. F11. |

## 16. Movement and game rules

Current authored estimate: 288 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 16-velocity | Move by elapsed time | **Keep** | Position plus velocity times dt is explained with units and checked at zero and negative velocity. Keep float state and integer drawing distinct. |
| 16-held-controls | Hold keys to move both paddles | **Improve** | The Boolean direction helper is correct and simultaneous controls work. Add an edit wiring both paddles to held-key states so integration is not wholly supplied. |
| 16-boundaries | Keep a paddle inside the court | **Keep** | Clamping the top coordinate using paddle height is appropriately concrete. Retain above/below/in-range and exact-edge cases. |
| 16-wall-bounce | Bounce once at a wall | **Improve** | Direction-aware bounce and correction are technically sound. A before/after position-velocity table or small diagram would make the two coupled changes clearer. |
| 16-paddle-contact | Use Rect collision detection | **Improve** | The fixed left-paddle exercise works, but mirroring the geometry for the right paddle is left to the project. Add a guided mirrored case and an overlap illustration. |
| 16-score-once | Score a miss once | **Improve** | Resetting position and velocity avoids duplicate points correctly. Show a two-frame trace so learners understand why one miss must not count repeatedly. |
| 16-serve | Start the next rally deliberately | **Improve** | A tiny serve helper is too narrow to be the final independent readiness check for Pong. Keep it, then add a combined procedural scene or rally task. F09. |
| 16-quiz | Movement and game rules: review | **Improve** | Movement and duplicate-scoring reasoning are sound. The alternate scoring example changes an irrelevant speed comment; test a genuinely different transition or outgoing collision. |
| 16-pong-project | Project: a complete Pong rally | **Improve** | The supplied loop and procedural scope are right; the 14 real-browser interaction checks pass for the reference fixture. Add an integration bridge and a visible setup/events/update/draw map before the full project. F09. |

## 17. More powerful list processing

Current authored estimate: 129 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 17-insert | Insert at a chosen position | **Keep** | Adding to the front of the same queue is a focused insertion task. Preserve the explicit mutation contract. |
| 17-remove | Remove by value | **Keep** | Removing one matching value while tolerating absence is a useful distinction from pop. Keep duplicates and missing-target cases. |
| 17-pop | Remove by index and keep the value | **Keep** | Returning the removed first item makes pop's result visible. The empty-queue None case is explicit. |
| 17-slicing | Take a slice of a list | **Improve** | Slicing and count are both new and the task also returns a tuple. Introduce count separately or provide a short intermediate result table before combining them. |
| 17-sorting | Sort in place or make a sorted copy | **Keep** | Repairing sort's None return while preserving the input targets the right misconception. Retain duplicates, descending order and nonmutation tests. |
| 17-nested-grid | Read and change a grid | **Improve** | Nested access, updates and shallow-copy cautions are dense in one lesson. Use labelled row/column diagrams and separate reading a cell from changing one. |
| 17-nested-loops | Visit rows and their elements | **Improve** | Summing a ragged grid is meaningful transfer. Add a two-row execution trace before the task; keep empty outer and inner lists. |
| 17-comprehensions | Express a simple transformation compactly | **Improve** | A conditional comprehension combines transformation and filtering. Show the equivalent ordinary loop beside it, then first complete an unconditional version. |
| 17-score-report | Build a report without losing the original | **Keep** | The independent report combines sorting, selection and preserving source data. Keep its explicit contract and unfamiliar input values. |
| 17-quiz | More powerful list processing: review | **Keep** | sort returning None, pop by index and shallow copying are good misconceptions to assess. Preserve these distinctions and use targeted feedback. |

## 18. Strings as data

Current authored estimate: 163 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 18-sequence | Read characters by position | **Keep** | First/last character access clearly reuses list indexing while handling empty text. Preserve the explicit strings-versus-lists distinction. |
| 18-slice | Extract a piece of text | **Keep** | Removing outer characters is a small slicing task with short-string boundaries. A start/stop index illustration would be optional support. |
| 18-immutable | Build a changed string | **Keep** | Constructing a new string makes immutability operational. Keep the one-character replacement precondition and empty-input case. |
| 18-characters | Loop over characters and test membership | **Keep** | Counting vowels combines character iteration, case conversion and membership appropriately. Keep mixed-case, no-vowel and empty examples. |
| 18-case | Return differently cased text | **Keep** | Repairing an ignored method return reinforces immutability rather than adding another syntax rule. A visible caller would improve feedback. |
| 18-split-whitespace | Split ordinary whitespace | **Keep** | Default whitespace splitting has a clear word-count purpose. Preserve mixed spaces, tabs, newlines and empty input cases. |
| 18-split-delimiter | Split a known separator | **Improve** | Explicit delimiter splitting correctly preserves empty fields. Add a visible side-by-side comparison with whitespace splitting and exercise newline/tab separators deliberately. |
| 18-join-strip | Join cleaned pieces of text | **Keep** | Cleaning each fragment and joining with a chosen separator is useful composition. Keep the requirement that empty fields are preserved. |
| 18-replace-find | Search and replace text | **Improve** | Search and replacement are different operations bundled together. Show the original match index separately from the replaced string and include a missing-target example. |
| 18-format | Fill a text template with format | **Improve** | The task accepts one .format() style while the coverage map claims positional and named formatting. Give each a small explicit edit or narrow the assessment claim. F08. |
| 18-text-cleaner | Mini project: text cleaner | **Improve** | The mini project combines useful text operations, but only returns a report structure. Add a sample before/after report and a runnable display driver. F09. |
| 18-quiz | Strings as data: review | **Keep** | The review correctly distinguishes find, immutability and empty delimiter fields. For retry, include a missing match or leading/trailing separator to change the reasoning. |

## 19. Dictionaries and records

Current authored estimate: 117 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 19-records | Name fields with dictionary keys | **Keep** | Named fields provide a clear motivation for dictionaries. Preserve changed names/scores and exact key requirements. |
| 19-keys | Choose valid keys | **Keep** | Converting a supplied coordinate list to a tuple makes valid keys concrete. Explain that a tuple's contents must also be hashable; the current integer precondition is appropriate. |
| 19-update | Build and update a record | **Improve** | Adding and overwriting fields is useful, but empty-dictionary creation and update() are mostly in the example. Add focused construction/update practice if those remain assessed topics. F08. |
| 19-lookup | Handle a missing key | **Keep** | A missing key, stored zero and stored None are deliberately distinguished. This is a strong example of a precise beginner contract. |
| 19-delete | Remove a dictionary entry | **Keep** | Removing a field and returning its previous value gives pop a clear role. Preserve other fields and the missing-key default. |
| 19-views | Visit keys, values and pairs | **Improve** | The task practices items(), while keys() and values() are largely demonstrated. Add explicit results for each view or reduce the coverage claim. F08. |
| 19-comprehension | Derive a new mapping | **Keep** | Filtering and transforming a dictionary builds on known list comprehensions. Preserve positive-only, zero, negative and empty cases. |
| 19-registry | Maintain a small scoreboard | **Keep** | Updating a scoreboard is appropriate independent mapping practice. Keep the distinction between a new player and an existing player. |
| 19-quiz | Dictionaries and records: review | **Fix** | The marked repair says to use (n, 2), but n is undefined in both displayed snippets. Substitute the displayed coordinate or explicitly define n. Other items execute correctly. F11. |

## 20. Reading and writing text files

Current authored estimate: 141 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 20-read | Read your first text file | **Fix** | Correct code fails after the encouraged input-file change because probes inherit learner fixtures but expect original contents. Isolate probe data; also align the explicit with requirement with grading. F07/F06. |
| 20-lines | Process one line at a time | **Fix** | Changing names.txt makes the correct reference fail a baseline check. Supply deterministic isolated probe files while letting the learner inspect varied real input. F07. |
| 20-position | Read a header, then the remaining file | **Improve** | Header then remaining text is a useful file-position lesson. Show the cursor position and audit inherited fixture assumptions under the shared file-grading fix. F07. |
| 20-write | Create or replace a text file | **Keep** | Overwrite behaviour is explicit and generated output can be inspected. Keep a before/after file example and ensure rerunning remains a supported action. |
| 20-append | Append a new log entry | **Fix** | The first reference run passes; rerunning the same code with its saved log fails. Probe expectations assume the original log. Separate test fixtures from learner persistence. F07. |
| 20-missing | Handle a missing file explicitly | **Improve** | Catching only FileNotFoundError is sound. Make missing, existing-empty and existing-nonempty cases visible, and apply deterministic fixtures. |
| 20-report | Generate a text report from a file | **Improve** | The independent report is useful integration of strings and files. Provide a sample input/output pair and apply the shared fixture-isolation change before encouraging file edits. |
| 20-quiz | Reading and writing text files: review | **Improve** | File position, write versus append and with cleanup are useful. Replace the implausible x-invalid mode distractor with a meaningful incorrect alternative whose outcome is checked. |

## 21. CSV records

Current authored estimate: 105 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 21-rows | Read rows and columns with csv.reader | **Fix** | Correct CSV parsing fails after a legitimate table.csv change because the probe expects original rows. Isolate fixture contents and keep quoted-comma examples. F07. |
| 21-named-records | Use a header as field names | **Improve** | Headers and numeric conversion combine sensibly, but represent different steps. Show one row before and after conversion and state whether malformed scores are in scope. |
| 21-delimiter | Read a different CSV dialect | **Keep** | A parameterised delimiter is focused practice using the CSV library. Keep quoted delimiters inside fields as a counterexample to split(). |
| 21-write | Export records to CSV | **Keep** | Header order, quoting and an empty export are appropriate checks. Let learners inspect the actual generated CSV after Run and reload. |
| 21-csv-report | Transform a CSV export | **Improve** | The CSV transformation is a good independent task. Add an explicit input/output sample and audit its baseline fixture assumptions under F07. |
| 21-quiz | CSV records: review | **Fix** | Both scoring forms work, but form B's CSV comment says Ada while its data says Bo. Correct the stale comment and keep the valuable quoted-comma question. F11. |

## 22. JSON and saved data

Current authored estimate: 107 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 22-load | Load nested JSON data | **Fix** | Changing club.json makes the correct name-extraction reference fail. Use isolated fixture data while preserving learner experiments and saved files. F07. |
| 22-save | Save and reopen JSON | **Keep** | Value-based round trips avoid requiring arbitrary whitespace formatting. Keep nested values, Unicode and empty structures visible in examples. |
| 22-update-and-recover | Update saved data and recognise malformed JSON | **Fix** | The correct counter update fails on its second run because the probe expects the original count. Isolate fixtures; retain the good requirement to preserve malformed JSON. F07. |
| 22-club-book | Mini project: club results book | **Improve** | The CSV-to-JSON mini project is a meaningful combined artifact. Add a row-to-summary walkthrough, explicit malformed-row assumptions and deterministic file probes. |
| 22-quiz | JSON and saved data: review | **Keep** | JSON types, round trips and preserving malformed data are correctly distinguished. Use a different malformed structure on retry to avoid memorising one trailing-comma example. |

## 23. Classes and objects

Current authored estimate: 149 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 23-class | Define a new type with class | **Improve** | Class and instance terminology is introduced, but an empty class has little observable purpose. Add a tiny diagram and visible inspection of two separate objects. |
| 23-initialise | Give each instance initial state | **Improve** | A Player constructor is a suitable first stateful class. Trace Player(name) to __init__ and self line by line before requiring it from the starter. |
| 23-methods | Let an object perform an action | **Fix** | toggle() must secretly return None even though the task only requires changing on. A valid method returning its new state fails. State or relax the return contract. F05. |
| 23-method-arguments | Pass an argument to a method | **Keep** | Changing state and returning it is explicitly required here, unlike toggle. Retain omitted-default and named-argument calls. |
| 23-shared-state | Separate shared defaults from instance data | **Improve** | The shared-list bug is valuable and independent instances are checked. Add a two-object state diagram and clarify any required None return from add(). |
| 23-inspect | Inspect an unfamiliar object | **Improve** | hasattr, getattr and dir are bundled into one tuple result. Introduce their three different questions one at a time, including a present attribute whose value is None. |
| 23-representation | Give objects useful text representations | **Keep** | Separate developer and user text representations have explicit contracts. Preserve checks using actual state rather than only initial values. |
| 23-functions-as-values | A function is an object too | **Keep** | Repairing a stored call result into a stored function gives functions-as-objects a practical example. Keep two different subsequent arguments. |
| 23-virtual-pet | Mini project: virtual pet | **Fix** | The brief is promising, but play incorrectly rejecting exactly two energy and repr hard-coding initial energy both pass. feed also has an unstated None-return constraint. Strengthen boundaries and clarify contracts; add a visible play driver. F05/F06/F09. |
| 23-quiz | Classes and objects: review | **Improve** | Independent state and shared class lists are assessed correctly. Replace the hard-coded repr illustration with state-derived text and add post-mutation reasoning. |

## 24. Python on your computer

Current authored estimate: 30 minutes. This includes the quiz and any project in this module.

| ID | Activity | Decision | Task-specific judgment and next action |
|---|---|---|---|
| 24-local-development | Python on your own computer | **Improve** | The six-section article correctly separates browser files, local files and environments. Remove the 13 automatically attached retrieval prompts and make exit from a >>> prompt explicit; retain official setup links. F10. |

## Interpretation

Keep the gradual opening, the 24-module dependency order, one calculator and one Pong project. Address the shared blockers before adding content. Add integrated practice where learner work currently stops at a helper function; split dense new concepts where needed. Do not inflate every focused lesson into a five-step sequence.
