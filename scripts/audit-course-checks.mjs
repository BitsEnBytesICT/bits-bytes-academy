import fs from "node:fs";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const out = "docs/audits/python-v4";
fs.mkdirSync(out, { recursive: true });
const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const run = async (files, checks = [], inputs = []) => {
  const queue = [...inputs];
  py.setStdin({ stdin: () => queue.shift() });
  return execute(py, { files, checks });
};
const cases = [];
async function check(suffix, label, files, expected, inputs) {
  const a = course.activities.find((a) => a.id === "python-v4-" + suffix);
  const workspace =
    typeof files === "string"
      ? { "main.py": files }
      : typeof files === "function"
        ? files(a)
        : files;
  const r = await run(workspace, a.checkpoints, inputs || a.inputs || []);
  const passed = r.results.map((c) => c.passed);
  const matches = expected.every((p, i) => p === passed[i]);
  cases.push({
    id: a.id,
    label,
    expected,
    actual: passed,
    error: r.error,
    stdout: r.stdout,
    files: workspace,
    matches,
  });
  console.log(
    matches ? "OK" : "MISMATCH",
    suffix,
    label,
    JSON.stringify(passed),
  );
  return r;
}
await check(
  "05-normalise-command",
  "Valid normalisation without an unrequested raw variable",
  'choice = input("Choice: ").strip().lower()\nprint(choice)\n',
  [true],
);
await check(
  "08-repeat-input",
  "Instruction 1 complete; instruction 2 intentionally unfinished",
  'choice = input("Item: ").strip().lower()\nwhile choice != "quit":\n    print(f"Added {choice}")\n    choice = input("Item: ").strip().lower()\n',
  [true, false],
);
await check(
  "09-return-values",
  "Return-only function with visible learner test calls",
  (a) => ({ "main.py": a.solution["main.py"] + "print(area(3, 4))\n" }),
  [true],
);
await check(
  "10-retry",
  "Completed retry helper with the natural interactive test call",
  (a) => ({ "main.py": a.solution["main.py"] + "print(read_count())\n" }),
  [true],
  ["bad", "3"],
);
await check(
  "10-cancel-safely",
  "Completed cancellable helper with an interactive test call",
  (a) => ({ "main.py": a.solution["main.py"] + "print(read_number())\n" }),
  [true, true],
  ["-2.5"],
);
await check(
  "03-powers",
  "Multiplication instead of explicitly required exponent operator",
  "side = 6\nresult = side * side\nprint(result)\n",
  [false, true],
);
await check(
  "12-range-stop",
  "Loop instead of explicitly required range",
  "def positions(count):\n    result = []\n    i = 0\n    while i < count:\n        result.append(i)\n        i += 1\n    return result\n",
  [false],
);
await check(
  "12-range-step",
  "While loop instead of explicitly required range",
  "def countdown(start):\n    values = []\n    while start > 0:\n        values.append(start)\n        start -= 1\n    return values\n",
  [false],
);
await check(
  "13-unpack",
  "Index access rather than explicitly requested unpacking",
  "def shift(point, dx, dy):\n    return (point[0] + dx, point[1] + dy)\n",
  [false],
);
await check(
  "08-break",
  "Correct behaviour using an unannounced stop prompt",
  'while True:\n    command = input("Action: ").strip().lower()\n    if command == "quit":\n        break\n    print("Working")\nprint("Stopped")\n',
  [true],
);
await check(
  "06-equal",
  "Correct Boolean but output hard-coded for the starter",
  'entered = "open"\nexpected = "open"\nresult = entered == expected\nprint(True)\n',
  [true, false],
);
await check(
  "03-addition",
  "Equivalent grouped initial assignments rejected by probe replacement",
  "morning, afternoon = 7, 5\nresult = morning + afternoon\nprint(result)\n",
  [true, true],
);
await check(
  "23-methods",
  "Method changes the right state and also returns the new state",
  (a) => ({ "main.py": a.solution["main.py"] + "        return self.on\n" }),
  [true],
);
await check(
  "23-virtual-pet",
  "feed changes state correctly and returns the resulting energy",
  (a) => ({
    "main.py": a.solution["main.py"].replace(
      "    def play(self):",
      "        return self.energy\n    def play(self):",
    ),
  }),
  [true, true],
);
await check(
  "23-virtual-pet",
  "play incorrectly rejects exactly two energy",
  (a) => ({
    "main.py": a.solution["main.py"].replace(
      "if self.energy < 2:",
      "if self.energy <= 2:",
    ),
  }),
  [true, false],
);
await check(
  "23-virtual-pet",
  "repr incorrectly hard-codes the initial energy",
  (a) => ({
    "main.py": a.solution["main.py"].replace(
      "energy={self.energy}",
      "energy=5",
    ),
  }),
  [true, false],
);
await check(
  "19-keys",
  "Fixed example returned for every changed coordinate",
  "def location(coordinates, label):\n    return {(2,3):label}\n",
  [false],
);
await check(
  "14-repeatable-random",
  "Alternating constants ignore the required seed and random generator",
  "import random\ndef draws(seed, count):\n    result = []\n    for i in range(count):\n        result.append(1 + i % 2)\n    return result\n",
  [false],
);
await check(
  "20-read",
  "Returns identical text without the explicitly required with statement",
  (a) => ({
    ...a.solution,
    "work.py":
      'def read_text(path):\n    handle = open(path, encoding="utf-8")\n    text = handle.read()\n    handle.close()\n    return text\n',
  }),
  [false],
);
for (const suffix of ["20-append", "22-update-and-recover"]) {
  const a = course.activities.find((a) => a.id === "python-v4-" + suffix);
  const first = await check(suffix, "Reference, first run", a.solution, [true]);
  await check(
    suffix,
    "Same correct code with files saved from first run",
    first.files,
    [true],
  );
}
for (const [suffix, file, value] of [
  ["20-read", "note.txt", "Changed\n"],
  ["20-lines", "names.txt", "One\nTwo\nThree\n"],
  ["21-rows", "table.csv", "name,score\nAda,9\n"],
  ["22-load", "club.json", '{"players":[{"name":"New"}]}'],
]) {
  const a = course.activities.find((a) => a.id === "python-v4-" + suffix);
  await check(
    suffix,
    "Correct reference after the encouraged input-file experiment",
    { ...a.solution, [file]: value },
    [true],
  );
}
const quizAmbiguities = [];
let distractors = 0;
// Bound learner snippets, including any incorrect token that could make a loop endless.
py.runPython(
  `import sys\ndef _audit_trace(frame,event,arg):\n    if event == 'line' and frame.f_code.co_filename == 'main.py':\n        _audit_budget[0] -= 1\n        if _audit_budget[0] <= 0: raise RuntimeError('Audit execution limit')\n    return _audit_trace\n`,
);
for (const a of course.activities.filter((a) => a.kind === "quiz"))
  for (const [form, questions] of [
    ["a", a.questions],
    ["b", a.alternateQuestions],
  ])
    for (const q of questions) {
      if (!q.codeBlank) continue;
      const blank = q.codeBlank;
      for (const t of blank.tokens) {
        if (t.code === blank.blanks[0].answer) continue;
        distractors++;
        py.runPython("_audit_budget = [1000]\nsys.settrace(_audit_trace)");
        const r = await run({ "main.py": blank.segments.join(t.code) });
        py.runPython("sys.settrace(None)");
        if (r.error === null && r.stdout === blank.output)
          quizAmbiguities.push({
            activity: a.id,
            question: q.id,
            form,
            code: blank.segments.join(t.code),
            acceptedAnswer: blank.blanks[0].answer,
            rejectedToken: t.code,
            output: r.stdout,
          });
      }
    }
const functionContracts = [];
for (const a of course.activities.filter((a) =>
  ["coding", "challenge"].includes(a.kind),
)) {
  const text = [
    a.explanation.en,
    ...a.sections.map((s) => s.body.en),
    ...a.checkpoints.map((c) => c.task.en),
  ].join("\n");
  const files = Object.values(a.files).join("\n");
  const names = [
    ...new Set(
      a.checkpoints
        .flatMap((c) => (c.probes || []).map((p) => p.call?.name))
        .filter(Boolean),
    ),
  ];
  const missing = names.filter(
    (n) => !new RegExp(`\\b${n}\\b`).test(text + "\n" + files),
  );
  if (missing.length) functionContracts.push({ id: a.id, missing });
}
const stats = course.chapters.map((ch) => {
  const acts = course.activities.filter((a) => a.chapter === ch.number);
  const coding = acts.filter((a) => ["coding", "challenge"].includes(a.kind));
  return {
    chapter: ch.number,
    title: ch.title.en,
    minutes: acts.reduce((n, a) => n + a.estimatedMinutes, 0),
    coding: coding.length,
    singleStep: coding.filter((a) => a.checkpoints.length === 1).length,
    blank: coding.filter((a) => Object.values(a.files).every((s) => !s.trim()))
      .length,
    teachingWords: coding.map((a) => a.sections[0].body.en.split(/\s+/).length),
    retrievals: acts.reduce((n, a) => n + (a.retrievals?.length || 0), 0),
  };
});
const evidence = {
  date: "2026-09-24",
  courseVersion: course.version,
  cases,
  quizDistractorsExecuted: distractors,
  quizAmbiguities,
  functionContracts,
  stats,
};
// The original audit is immutable evidence; reruns write a separate report.
fs.writeFileSync(
  out + "/verification.json",
  JSON.stringify(evidence, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      cases: cases.length,
      mismatches: cases.filter((c) => !c.matches).length,
      distractors,
      quizAmbiguities,
      functionContracts,
      stats,
    },
    null,
    2,
  ),
);
if (
  cases.some((c) => !c.matches) ||
  quizAmbiguities.length ||
  functionContracts.length
)
  process.exitCode = 1;
