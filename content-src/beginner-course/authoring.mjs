export const L = (en, nl) => ({ en, nl });
export const local = (value) => (Array.isArray(value) ? L(...value) : value);
export const words = (value = "") =>
  typeof value === "string" ? value.split(/\s+/).filter(Boolean) : value;
export const idFor = (chapter, slug) =>
  `python-v4-${String(chapter).padStart(2, "0")}-${slug}`;
export const probe = (inputs, check, stdin) => ({
  inputs,
  check,
  ...(stdin ? { stdin } : {}),
});
export const call = (name, args, check, options = {}) => ({
  call: { name, args, ...(options.module ? { module: options.module } : {}) },
  check,
  ...(options.module ? { moduleOnly: true } : {}),
  ...options,
});
export const output = (value) => `_stdout == ${JSON.stringify(value)}`;
export const uses = (node) =>
  `any(isinstance(n, _ast.${node}) for n in _ast.walk(_ast.parse(_source)))`;
export const pythonLiteral = (value) =>
  value === null
    ? "None"
    : typeof value === "boolean"
      ? value
        ? "True"
        : "False"
      : Array.isArray(value)
        ? `[${value.map(pythonLiteral).join(", ")}]`
        : typeof value === "object"
          ? `{${Object.entries(value)
              .map(([k, v]) => `${pythonLiteral(k)}: ${pythonLiteral(v)}`)
              .join(", ")}}`
          : JSON.stringify(value);
/** Concept hint comes from the lesson; approach and fragment are specific to this instruction. */
export function step(task, check, approach, fragment, probes = [], extra = {}) {
  return {
    task: local(task),
    check,
    approach: local(approach),
    fragment,
    probes,
    ...extra,
  };
}
export function lesson(chapter, slug, spec) {
  const id = idFor(chapter, slug);
  const objectiveIds = [...words(spec.topics), ...words(spec.practices)];
  const sections = [
    {
      id: `${id}-example`,
      topicIds: objectiveIds,
      heading: local(
        spec.heading || [
          "Follow a working example",
          "Volg een werkend voorbeeld",
        ],
      ),
      body: local(spec.teach),
      code: spec.example,
      output: spec.output,
      prediction: local(spec.predict),
      takeaway: local(spec.idea),
    },
    ...(spec.sections || []),
    {
      id: `${id}-experiment`,
      role: "experiment",
      topicIds: [],
      heading: L(
        "After completing the task: try one change",
        "Na het afronden: probeer één wijziging",
      ),
      body: local(spec.experiment),
    },
  ];
  const checkpoints = spec.steps.map((s, i) => ({
    id: `${id}-step-${i + 1}`,
    objectiveIds: s.objectiveIds || words(spec.topics),
    task: s.task,
    // Interactive programs are checked with isolated documented conversations,
    // so the learner can run any valid input rather than a hard-coded sample.
    check: (spec.inputs?.length ? "True" : s.check).replaceAll("\n", "\\n"),
    probes: [
      ...(spec.inputs?.length ? [{ stdin: spec.inputs, check: s.check }] : []),
      ...s.probes,
    ].map((p) => ({
      ...p,
      ...(s.ignorePrompts ? { ignorePrompts: true } : {}),
      check: (p.stdin && !p.check.includes("_remaining_input")
        ? `(${p.check}) and _remaining_input == ""`
        : p.check
      ).replaceAll("\n", "\\n"),
    })),
    hint: local(spec.idea),
    hints: [
      local(spec.idea),
      s.approach,
      L(
        `A small fragment to adapt: \`${s.fragment}\``,
        `Een klein fragment om aan te passen: \`${s.fragment}\``,
      ),
    ],
    feedback: s.feedback ? local(s.feedback) : s.approach,
  }));
  // Expose a caller, never the function implementation. It is safe to add these
  // calls once the named definition exists, including in independently blank tasks.
  const calls = checkpoints
    .flatMap((c) => c.probes || [])
    .filter((p) => p.call && !p.call.module && /^[a-z]/.test(p.call.name));
  if (
    calls.length &&
    (spec.runtime || "terminal") === "terminal" &&
    !checkpoints.some(
      (c) =>
        /\b_stdout\b/.test(c.check) ||
        c.probes.some((p) => /\b_stdout\b/.test(p.check)),
    )
  ) {
    const unique = [
      ...new Map(calls.map((p) => [JSON.stringify(p.call), p])).values(),
    ].slice(0, 2);
    sections.splice(sections.length - 1, 0, {
      id: `${id}-try-calls`,
      role: "practice",
      topicIds: [],
      heading: L("See your function work", "Bekijk wat je functie doet"),
      body: L(
        "A definition alone produces no output. After writing the function, add these calls underneath it in main.py, without indentation, and Run. Compare the returned values with the task's requirements. The checks also call your function with other inputs; they do not require you to keep these demonstration calls.",
        "Een definitie alleen geeft geen uitvoer. Schrijf eerst de functie en voeg daarna deze aanroepen eronder toe in main.py, zonder inspringing. Klik op Uitvoeren. Vergelijk de teruggegeven waarden met de opdracht. De controles roepen je functie ook met andere invoer aan; deze demonstratieaanroepen zijn niet verplicht.",
      ),
      code: unique
        .map(
          (p) =>
            `print(${p.call.name}(${p.call.args.map(pythonLiteral).join(", ")}))`,
        )
        .join("\n"),
      ...(unique.some((p) => p.stdin)
        ? {
            takeaway: L(
              `For the first conversation, enter ${JSON.stringify(unique[0].stdin)} one answer per line. Use End input to test cancellation when the task supports it.`,
              `Voer voor het eerste gesprek ${JSON.stringify(unique[0].stdin)} in, één antwoord per regel. Gebruik Einde invoer om annuleren te testen wanneer de opdracht dat ondersteunt.`,
            ),
          }
        : {}),
    });
  }
  for (const key of [
    "title",
    "intro",
    "teach",
    "idea",
    "predict",
    "experiment",
    "note",
  ])
    if (!spec[key] || !local(spec[key]).en || !local(spec[key]).nl)
      throw Error(`${id}: missing bilingual ${key}`);
  if (!spec.example || spec.output === undefined)
    throw Error(`${id}: example and output required`);
  if (!checkpoints.length && spec.kind !== "reading")
    throw Error(`${id}: no coding checks`);
  return {
    id,
    chapter,
    group: `python-v4-module-${chapter}`,
    title: local(spec.title),
    kind: spec.kind || "coding",
    optional: false,
    runtime: spec.runtime || "terminal",
    guidance: spec.guidance || "guided",
    checkpointMode: "sequential",
    estimatedMinutes: spec.minutes || 12,
    topicIds: words(spec.topics),
    practices: words(spec.practices),
    requiredConcepts: words(spec.requires),
    explanation: local(spec.intro),
    example: "",
    sections,
    files:
      typeof spec.starter === "string"
        ? { "main.py": spec.starter }
        : spec.starter,
    solution:
      typeof spec.solution === "string"
        ? { "main.py": spec.solution }
        : spec.solution,
    checkpoints,
    solutionNote: local(spec.note),
    inputs: spec.inputs || [],
    ...(spec.partialSolutions
      ? { partialSolutions: spec.partialSolutions }
      : {}),
    ...(spec.expectedStarterError
      ? { expectedStarterError: spec.expectedStarterError }
      : {}),
    ...(spec.validation ? { validation: spec.validation } : {}),
  };
}
