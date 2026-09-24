import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { loadPyodide } from "pyodide";
import { execute, initializeRuntime } from "../frontend/public/runtime/engine.mjs";
import { ensurePackages } from "../frontend/public/runtime/packages.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("frontend/public/runtime/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const directory = path.resolve("content-src/project-course");
let lessons = 0,
  tasks = 0,
  quizzes = 0,
  examples = 0;
const all = [];
async function gradeGraphical(activity, files, frames) {
  await ensurePackages(py, files);
  initializeRuntime(py);
  for (const [name, code] of Object.entries(files)) {
    py.globals.set('_fixture_code', code);
    py.globals.set('_fixture_name', name);
    py.runPython('compile(_fixture_code, _fixture_name, "exec")');
  }
  py.globals.set('_fixture_files', JSON.stringify(files));
  py.runPython('_lab_prepare(json.loads(_fixture_files), fresh=True)');
  const grade = py.globals.get('_lab_game_grade');
  try {
    return {error:null, results:JSON.parse(grade(JSON.stringify({files, checks:activity.checkpoints, frames, error:null})))};
  } finally { grade.destroy(); }
}
for (const filename of fs
  .readdirSync(directory)
  .filter((f) => /^\d.*\.mjs$/.test(f))
  .sort()) {
  const { activities } = await import(
    new URL("../content-src/project-course/" + filename, import.meta.url)
  );
  all.push(...activities);
  assert.equal(
    activities.filter((a) => a.kind === "coding").length,
    5,
    filename,
  );
  assert.equal(activities.filter((a) => a.kind === "quiz").length, 1, filename);
  for (const a of activities) {
    assert(a.title.en && a.title.nl, a.id);
    if (a.kind === "quiz") {
      quizzes++;
      assert.equal(a.questions.length, 5, a.id);
      for (const q of a.questions) {
        assert(q.choices.some((c) => c.id === q.answer));
        assert(
          q.choices.every(
            (c) => c.label.en && c.label.nl && c.reason.en && c.reason.nl,
          ),
        );
        if (q.codeBlank) {
          const b = q.codeBlank;
          assert.equal(b.segments.length, b.blanks.length + 1);
          const source = b.segments
            .map((s, i) => s + (b.blanks[i]?.answer || ""))
            .join("");
          const output = await execute(py, {
            files: { "main.py": source },
            checks: [],
          });
          assert.equal(output.error, null, q.id);
          assert.equal(output.stdout, b.output, q.id);
        }
      }
      continue;
    }
    if (a.kind !== "coding") continue;
    assert(a.solutionNote.en && a.solutionNote.nl, a.id + ': solution note');
    assert(a.explanation.en && a.explanation.nl, a.id);
    assert(a.sections.length, a.id);
    for (const section of a.sections) {
      if (!section.code) continue;
      py.globals.set("_example_source", section.code);
      py.runPython("compile(_example_source, 'example.py', 'exec')");
      if (section.output !== undefined) {
        py.setStdin({ stdin: () => undefined });
        // The multi-file explanation deliberately uses the helper defined in
        // its preceding section, just as the learner's two-file project does.
        const dependencies =
          a.id === "python-v2-7-04"
            ? { "greetings.py": a.sections[1].code }
            : {};
        const example = await execute(py, {
          files: { ...dependencies, "main.py": section.code },
          checks: [],
        });
        assert.equal(example.error, null, `${a.id}: ${section.heading.en}`);
        assert.equal(
          example.stdout.trimEnd(),
          section.output.trimEnd(),
          `${a.id}: ${section.heading.en}`,
        );
        examples++;
      }
    }
    assert(a.checkpoints.length >= 3 && a.checkpoints.length <= 5, a.id);
    assert(
      a.checkpoints.every(
        (c) => c.hints.length === 3 && c.feedback.en && c.feedback.nl,
      ),
      a.id,
    );
    let input = [...a.inputs];
    py.setStdin({ stdin: () => input.shift() });
    const reference = a.runtime === 'pygame' ? await gradeGraphical(a, a.solution, 1) : await execute(py, {
      files: a.solution,
      checks: a.checkpoints,
    });
    assert.equal(reference.error, null, a.id);
    assert(
      reference.results.every((c) => c.passed),
      JSON.stringify({ id: a.id, results: reference.results }),
    );
    const blank = a.runtime === 'pygame' ? await gradeGraphical(a, {...a.files, 'main.py':'pass\n'}, 0) : await execute(py, {
      files: { ...a.files, "main.py": "pass\n" },
      checks: a.checkpoints,
    });
    assert(
      blank.results.every((c) => !c.passed),
      a.id,
    );
    lessons++;
    tasks += a.checkpoints.length;
  }
}
const supply = all.find((a) => a.id === "python-v2-1-05");
const source = (body) =>
  `visitors = 23\npack_size = 5\npack_price = 7.5\n${body}\nspare = packs * pack_size - visitors\ncost = packs * pack_price\nprint(packs, spare, cost)\n`;
for (const body of [
  "import math\npacks = math.ceil(visitors / pack_size)",
  "packs = visitors // pack_size\nif visitors % pack_size: packs += 1",
  "packs = 0\nwhile packs * pack_size < visitors:\n    packs += 1",
]) {
  const result = await execute(py, {
    files: { "main.py": source(body) },
    checks: supply.checkpoints,
  });
  assert(
    result.results.every((c) => c.passed),
    body,
  );
}
for (const body of [
  "packs = visitors // pack_size",
  "packs = visitors // pack_size + 1",
  "packs = 5",
]) {
  const result = await execute(py, {
    files: { "main.py": source(body) },
    checks: supply.checkpoints,
  });
  assert.equal(result.results[0].passed, false, body);
}
async function verifyVariant(id, code, passes, failedStep) {
  const activity = all.find((a) => a.id === id);
  let inputs = [...activity.inputs];
  py.setStdin({ stdin: () => inputs.shift() });
  const result = await execute(py, {
    files: { ...activity.solution, "main.py": code },
    checks: activity.checkpoints,
  });
  assert.equal(result.error, null, id);
  if (passes)
    assert(
      result.results.every((r) => r.passed),
      JSON.stringify(result.results),
    );
  else assert.equal(result.results[failedStep].passed, false, id);
}
const byId = (id) => all.find((a) => a.id === id).solution["main.py"];
const departureId = "python-v2-2-03";
await verifyVariant(
  departureId,
  byId(departureId).replace("walk_minutes <= minutes_left", "buffer >= 0"),
  true,
);
await verifyVariant(
  departureId,
  byId(departureId).replace(
    "walk_minutes <= minutes_left",
    "walk_minutes < minutes_left",
  ),
  false,
  1,
);
const equipmentId = "python-v2-2-04";
await verifyVariant(
  equipmentId,
  byId(equipmentId).replace(
    "remaining = available\n",
    "remaining = available - requested\n",
  ),
  false,
  2,
);
const bookingId = "python-v2-2-05";
await verifyVariant(
  bookingId,
  `ticket_price = 4.5
quantity = int(input())
budget = float(input())
total = ticket_price * quantity
can_book = budget >= total
remaining = budget - total if can_book else budget
print("%.2f" % total)
print("booked" if can_book else "save more")
`,
  true,
);
await verifyVariant(
  bookingId,
  byId(bookingId).replace("total <= budget", "total < budget"),
  false,
  1,
);
console.log(
  JSON.stringify({
    newLessons: lessons,
    tasks,
    quizzes,
    executableExamples: examples,
    supplyAlternatives: 3,
    supplyBoundaryMistakesRejected: 3,
    responsiveAlternatives: 2,
    responsiveBoundaryMistakesRejected: 3,
  }),
);
