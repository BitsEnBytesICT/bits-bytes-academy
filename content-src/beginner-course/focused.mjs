import { lesson, step } from "./authoring.mjs";
// Compact authoring notation. Every entry supplies its own teaching, example,
// task, diagnosis, fragment and transfer prompt; nothing is generated from a title.
export function focus(chapter, slug, s) {
  return lesson(chapter, slug, {
    ...s,
    intro: s.why,
    teach: s.teach,
    idea: s.rule,
    note: s.explain,
    predict: s.predict,
    experiment: s.change,
    steps: s.tasks.map((t) =>
      step(t.task, t.check, t.help, t.fragment, t.probes || [], t.extra || {}),
    ),
  });
}
