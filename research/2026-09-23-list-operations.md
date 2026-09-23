# List operations: deeper review and original rewrite

Reviewed the authenticated course through its visible browser UI on 23 September
2026. This records concepts, scaffolding and interaction design, not a copy of
proprietary explanations, source programs or question wording. Existing source
completion badges were not treated as proof of review: every page was opened and
its narrative, instructions, available hints and visible workspace were inspected.
Projects and videos remain excluded.

## Lessons

Source group: [Working with Lists](https://www.codecademy.com/courses/learn-python-3/lessons/use-python-list/exercises/operations-on-lists).
Exact source URLs for each position remain in `content-src/curriculum-map.json`.

| Position / source exercise | Observed teaching sequence and scaffolding |
| --- | --- |
| 1 / operations-on-lists | Reading and operation infographic, no code workspace or graded steps. Contrasts method-call syntax with built-in functions before previewing insert/pop/range/len/slicing/count/sorting. Local reading supplies an executable dispatch preview. |
| 2 / adding-by-index-insert | Two steps: run a supplied display collection, then insert at the front and inspect it. Narrative explains argument order, shifting later indexes and negative insertion indexes. Hints reiterate running first and position/value order. Local route adds two stops, then reads the shifted position. |
| 3 / removing-by-index-pop | Three steps: inspect a supplied topic list, remove its last item, then remove another indexed item. Explains optional index, returned removed value, shifting and IndexError on empty/out-of-range removal. Local queue retains both canceled and processed job names. |
| 4 / consecutive-lists-range | Two steps repair a small supplied range and construct another range with an inclusive verbal endpoint. Narrative distinguishes the range object's display from list conversion and the excluded stop. Local station-count program derives range, list and final station from one setting. |
| 5 / the-power-of-range | Two steps change a supplied range's step and create another stepped range. Examples trace increasing values and explain why the final value can lie below stop without reaching it. Hints map argument positions. Local schedule adds a boundary-sensitive last value and a negative-step countdown. |
| 6 / list-len | Five steps count/print a supplied mixed list, count/print a supplied range and change its step to compare length. Explicitly notes range length needs no list conversion. Local monitoring report covers both and distinguishes outer rows from inner fields. |
| 7 / slice-iii | Three steps predict/print a supplied slice, shorten its prefix and select a middle segment. Explains start inclusion, stop exclusion and positional reasoning. Local sensor window also demonstrates a separate flat slice and an empty slice. |
| 8 / slice-iv | Two steps select a suffix and everything except a tail from a supplied collection. Examples contrast omitted start, omitted stop and negative boundaries. Local log builds prefix/suffix/earlier reports; examples explain short-list clamping and the -0 trap. |
| 9 / count | Two steps count a repeated value in supplied records and print it. Narrative also counts equal inner lists as whole outer elements. Local scanner keeps counts before/after an append, counts an absent status and counts a complete nested record. |
| 10 / sort | Five steps sort/print supplied text data, repair a commented method/function syntax error, inspect a sort return value and change to descending order. Workspace contains multiple small collections and an existing sort assignment. Hints address method syntax, indentation after uncommenting and None. Local priorities exercise retains an alias, prints an increasing snapshot, repairs a label sort and then reports decreasing order plus None. |
| 11 / sorted | Two steps make a sorted copy from a supplied collection and compare both lists. Explains function syntax and preservation of the source. Local arrival report keeps increasing/decreasing copies and derives a top-two slice. |
| 12 / review-ii | Nine initially gated steps: original length, first item, last item, bounded slice, prefix slice, repeated-value count, removal with retained return value, indexed insertion and sorting. Supplied inventory collection. All nine steps and hints were revealed through an authorized completed attempt; all nine passed. Local eight-step shipment report combines initial facts, removal, urgent insertion, separate sorted catalog, dynamic IDs and final slices. |

The source's 37 checkpoints include several inspect/print-only steps. The local
rewrite uses 40 substantive connected checks across 11 coding pages plus the
reading. It supplies data and purposeful starting programs on every page.

## Operations quiz

[Source quiz](https://www.codecademy.com/courses/learn-python-3/quizzes/use-python-list-quiz)
was reviewed through a completed 12/12 result. It has ten immediate single-choice
questions and two token-based code-completion questions. Concepts in observed order:

1. Length function syntax.
2. Indexed pop call assembled from three blanks.
3. Insertion with a negative index.
4. Default last-item pop.
5. In-place sort call syntax.
6. Predicting a bounded slice.
7. Selecting the correct slice expression.
8. Occurrence-count method syntax.
9. Predicting a stepped range.
10. Indexed insertion call assembled from four blanks.
11. Range argument order.
12. Negative-start suffix slice.

The token questions use distractor positions and methods, explicit Check answer,
and the previously observed per-slot feedback. No new interaction type was found.
The local quiz keeps historical question definitions and answer mappings, adds
original insert/pop code-blank variants for fresh attempts and specific feedback
for every incorrect choice. The source question bank was not copied. This preserves
local history rather than claiming identical question wording or ordering.

## Verification

- 12 revised pages, 40 connected checkpoints, 46 alternate-input cases and 20
  independently executable examples. Revised checkpoint IDs keep old completions
  without giving unrelated old checks credit for new tasks.
- 32 staged/alternative attempts verify gradual progress. Sixteen plausible
  mistakes cover hard-coded ranges/counts/slices, wrong mutation/alias behavior,
  fixed indexes and incorrect non-divisible range lengths. Valid alternatives
  include explicit negative pop index, copy-then-sort and variable-based insertion.
- Full build/type and test suites pass: 227 reference programs, 206 negative cases,
  64 quiz predictions, five completed code-blank programs, 85 worked examples across
  revised content, console coverage and 19 TypeScript tests.
- Browser QA used isolated port 3002. Shipment progressed from 4/8 to 8/8; the
  variable-based insertion and completion persisted after reload. Dutch prose,
  contextual feedback, starter scaffolding and desktop rendering were inspected.
- Both new quiz token questions grade correctly, and submitted feedback survives
  reload. A deliberately wrong range answer shows targeted Dutch feedback. No
  browser errors were recorded.
- IDs, activity kinds/order and all legacy quiz prompts, choices and correct-answer
  mappings match the preceding release. No database schema or interface sizing
  changes are involved.
- Production restart preserves exact learner-record fingerprints; the served
  course matches the generated JSON.

## Remaining work

Tuple/zip support readings and optional list challenges still need the deeper
review and rewrite. Later chapters and quizzes remain incomplete. The final
responsive audit must include code-blank questions at an actual narrow viewport.
