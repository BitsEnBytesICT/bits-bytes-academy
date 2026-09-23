# List supporting articles — 23 September 2026

Read the authenticated, rendered course articles in the user's existing browser.
This is a conceptual inventory, not a copy of their prose or example programs.

## Tuples

Source: https://www.codecademy.com/courses/learn-python-3/articles/tuples-in-python

Visible sequence: immutable sequence; creation with heterogeneous fields;
singleton comma; indexing and slicing; length; maximum and minimum; first-index
lookup; occurrence counting. Examples include successful queries and missing-value
or incompatible-comparison errors. The article ends with an embedded assessment.
Its widget remained on “Loading assessment” when revisited after the narrative
review, so its questions, starter program and grading were **not** inspected.

Original adaptation: a station departure record and delay measurements. The
supplied program already prints a useful report. Learners read and unpack fields,
summarise measurements, construct a revised record while retaining the original,
and compare singleton syntax. Deliberate item-assignment and missing-index errors
are explained and reversed. A small separate example shows mutable list contents
inside an immutable tuple. Five self-contained examples have exact tested output.

Accuracy refinements: explain comparability rather than requiring identical types
for min/max (integers and floats compare); avoid a blanket performance claim.
Tuple structure and unpacking were cross-checked against Python's official tutorial:
https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences

## Combining sequences with zip

Source: https://www.codecademy.com/courses/learn-python-3/articles/zip-for-lists

Visible sequence: related data held in separate lists; position-based pairing;
two or more inputs; shortest-input limit; zip-object display; collecting results
with list; recognising tuples inside the result. The embedded practice also
remained on “Loading assessment” after authoring work and a later state check.
No unseen assessment content is inferred from the article narrative.

Original adaptation: station/passenger/platform data with a deliberately missing
measurement. Learners diagnose truncation, append the measurement and rebuild
results, add a third field, inspect a nested position, then compare an exhausted
iterator with its saved list. Empty input and reversed argument order are explicit
experiments. Four self-contained examples have exact tested output. No loop is
required before the next chapter introduces loops.

Accuracy refinement: explain lazy iteration and consumption, rather than treating
the printed object description as the data itself or calling a tuple an inner list.
Iterator behaviour was cross-checked against the official built-in reference:
https://docs.python.org/3/library/functions.html#zip

## Compatibility and verification

- Both retain reading kind, IDs, order and ungraded exploration semantics.
- Saved learner files are preserved; richer starters apply to new workspaces or an
  explicit learner reset. No schema, API or layout changes.
- Nine examples run independently; eleven additional real-Python checks exercise
  both starters, extended reports, error/recovery, singleton syntax, empty input,
  a shorter third input and swapped fields.
- These articles complete the authored list support material, not the later
  function-based list challenges. Those remain in their existing chapter/order.
