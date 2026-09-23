export function L(en, nl) {
  if (!en || !nl)
    throw new Error("Every learner-facing passage needs English and Dutch");
  return { en, nl };
}
export function section(heading, body, code, output) {
  return {
    heading,
    body,
    ...(code === undefined ? {} : { code }),
    ...(output === undefined ? {} : { output }),
  };
}
export function task(id, task, check, hints, feedback, probes = []) {
  if (hints.length !== 3)
    throw new Error(`${id}: provide three progressively revealing hints`);
  return { id, task, check, hint: hints[0], hints, feedback, probes };
}
export function lesson({
  module,
  number,
  title,
  guidance,
  explanation,
  sections,
  starter,
  solution,
  tasks,
  inputs = [],
  runtime = "terminal",
  minutes = 12,
  solutionNote,
}) {
  return {
    id: `python-v2-${module}-${String(number).padStart(2, "0")}`,
    chapter: module,
    group: `python-v2-module-${module}`,
    title,
    kind: "coding",
    optional: false,
    runtime,
    guidance,
    estimatedMinutes: minutes,
    explanation,
    sections,
    example: "",
    files: typeof starter === "string" ? { "main.py": starter } : starter,
    solution: typeof solution === "string" ? { "main.py": solution } : solution,
    checkpoints: tasks.map((t, i) => ({
      ...t,
      id: `python-v2-${module}-${String(number).padStart(2, "0")}-step-${i + 1}`,
    })),
    inputs,
    solutionNote,
  };
}
export function quiz(module, title, questions) {
  return {
    id: `python-v2-${module}-quiz`,
    chapter: module,
    group: `python-v2-module-${module}`,
    kind: "quiz",
    optional: false,
    title,
    estimatedMinutes: questions.length,
    questions,
  };
}
export function question(id, prompt, code, choices, answer = "a") {
  return {
    id,
    prompt,
    ...(code ? { code } : {}),
    choices: choices.map(([label, reason], index) => ({
      id: String.fromCharCode(97 + index),
      label,
      reason,
    })),
    answer,
  };
}
