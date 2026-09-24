import { syllabus, lessonId } from "./syllabus.mjs";
export { L } from "../project-course/authoring.mjs";
import { L } from "../project-course/authoring.mjs";

export const pair = (value) => (Array.isArray(value) ? L(...value) : value);
export const topics = (value) =>
  typeof value === "string" ? value.split(" ") : value;
export function S(ids, heading, body, code, output, prediction) {
  return {
    topicIds: topics(ids),
    heading: pair(heading),
    body: pair(body),
    ...(code === undefined ? {} : { code }),
    ...(output === undefined ? {} : { output }),
    ...(prediction ? { prediction: pair(prediction) } : {}),
  };
}
export function C(ids, task, check, hints, feedback, probes = []) {
  if (hints.length !== 3) throw Error("Use three hint levels");
  return {
    objectiveIds: topics(ids),
    task: pair(task),
    check: check.replaceAll("\n", "\\n"),
    hints: hints.map(pair),
    hint: pair(hints[0]),
    feedback: pair(feedback),
    probes: probes.map((p) => ({
      ...p,
      check: p.check.replaceAll("\n", "\\n"),
    })),
  };
}
export const B = (inputs, check, stdin) => ({
  inputs,
  check,
  ...(stdin ? { stdin } : {}),
});
export const F = (name, args, check, options = {}) => ({
  call: { name, args, ...(options.module ? { module: options.module } : {}) },
  check,
  ...(options.module ? { moduleOnly: true } : {}),
  ...options,
});
export function lesson(chapter, number, spec) {
  const module = syllabus[chapter - 1],
    row = module.lessons[number - 1],
    id = lessonId(chapter, number);
  const {
    starter,
    solution,
    tasks,
    note,
    explanation,
    sections,
    experiment,
    ...rest
  } = spec;
  if (!note || !experiment || tasks.length < 2 || tasks.length > 4)
    throw Error(`${id}: missing teaching contract`);
  const minutes =
    Math.floor((module.minutes - 6) / module.lessons.length) +
    (number <= (module.minutes - 6) % module.lessons.length ? 1 : 0);
  return {
    id,
    chapter,
    group: `python-v3-module-${chapter}`,
    title: L(row[0], row[1]),
    kind: "coding",
    optional: false,
    runtime: "terminal",
    guidance:
      number === module.lessons.length
        ? "independent"
        : number === 1
          ? "guided"
          : "adapt",
    estimatedMinutes: minutes,
    explanation: pair(explanation),
    example: "",
    topicIds: topics(row[2]),
    prerequisites:
      number > 1
        ? [lessonId(chapter, number - 1)]
        : chapter > 1
          ? [lessonId(chapter - 1, syllabus[chapter - 2].lessons.length)]
          : [],
    sections: [
      ...sections,
      S([], ["Try a changed input", "Probeer gewijzigde invoer"], experiment),
    ],
    files: typeof starter === "string" ? { "main.py": starter } : starter,
    solution: typeof solution === "string" ? { "main.py": solution } : solution,
    checkpoints: tasks.map((t, i) => ({ ...t, id: `${id}-step-${i + 1}` })),
    solutionNote: pair(note),
    inputs: [],
    ...rest,
  };
}
