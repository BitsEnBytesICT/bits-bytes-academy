# Deeper course authoring

The priority is better teaching and substantive programs to work on, not more
paragraphs around the existing one-line tasks. Keep the researched topic sequence;
write original contexts, explanations, examples and questions.

- Explain a concrete problem and mental model before syntax.
- Interleave explanations with runnable examples, exact output and a trace of why.
- Supply data, a partial working program, a deliberate bug or a function to extend.
  A blank editor needs a pedagogical reason. Remove scaffolding gradually.
- Each step has one clear outcome; later steps extend earlier work. Mix prediction,
  diagnosis, implementation and changed-input experiments. Do not inflate counts
  by splitting trivial actions artificially.
- Explain unfamiliar concepts before requiring them. Write contextual hints,
  diagnostic feedback and a solution explanation specific to the program.
- Check behavior and relevant boundaries, not just keywords. Accept equivalent
  correct code unless practising a specific construct is the stated objective.
- Intermediate steps must run without answers to later tasks. Deliberate multi-error
  programs need explicit explanation of when their checks can pass.
- Quiz distractors should reflect identifiable misconceptions, each with useful
  feedback. Preserve existing IDs and answer mappings when updating feedback.
- Keep English and Dutch idiomatic and complete. Python syntax remains English.

Use `guided`, `section`, `step` and `loc` from `helpers.mjs`; see
`foundations-lessons.mjs`. Sections optionally contain `code` and exact `output`.
Interactive examples need defined test inputs before asserting expected output.
Inline backticks are supported safely; generated JSON is not the authoring source.

Pure introductory programs may opt into checkpoint `cases`, each containing an
`inputs` mapping and a Python `check` expression. Inputs replace the first simple
top-level assignment to that name in a separate execution; subsequent updates
remain intact. Probe namespaces/output are isolated from the learner's actual run.
Use these only for short, deterministic, single-file programs without imports,
interactive input or filesystem effects. Available probe builtins cover basic
values, arithmetic, printing and collections; this is not a general-purpose Python
test environment or a security boundary. Worker time/output limits still apply.
Test an incorrect rule that matches the supplied inputs but fails another case,
and a legitimate alternative solution. See `tests/control-flow.test.mjs`.

Keep activity IDs, URLs, kinds and backup formats stable. Revisioned checkpoint
IDs cannot inherit credit for different old tasks. Preserve earned completion and
learner files; never reset their files to make a new starter appear.

Before releasing a chapter, execute all reference solutions and worked examples,
test staged and near-miss attempts, verify persistence and inspect the browser.
Record actual coverage and gaps in `research/` and `COURSE-REVISION.md`. More words
or a green content-count test alone do not establish teaching quality.
