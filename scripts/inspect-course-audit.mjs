import fs from "node:fs";
const course = JSON.parse(fs.readFileSync("content/course.json", "utf8"));
const chapters = (process.argv[2] || "1").split(",").map(Number);
const language = process.argv[3] || "en";
const show = (value) =>
  typeof value === "object" && value && language in value
    ? value[language]
    : value;
for (const a of course.activities.filter(
  (a) =>
    chapters.includes(a.chapter) &&
    (process.argv[4] !== "quiz" || a.kind === "quiz"),
)) {
  console.log(
    `\n## ${a.id} | ${show(a.title)} | ${a.kind}/${a.guidance} | ${a.estimatedMinutes}min`,
  );
  console.log("TOPICS", a.topicIds, "NEEDS", a.requiredConcepts);
  console.log("INTRO", show(a.explanation));
  for (const s of a.sections || [])
    console.log(
      JSON.stringify(
        Object.fromEntries(
          Object.entries(s)
            .filter(([k]) => !["id", "topicIds", "heading"].includes(k))
            .map(([k, v]) => [k, show(v)]),
        ),
      ),
    );
  if (a.kind === "quiz")
    for (const [form, questions] of [
      ["a", a.questions],
      ["b", a.alternateQuestions],
    ]) {
      for (const q of questions)
        console.log(
          JSON.stringify({
            form,
            id: q.id,
            topics: q.objectiveIds,
            category: q.category,
            prompt: show(q.prompt),
            code: q.code,
            choices: q.choices.map((c) => ({
              id: c.id,
              text: show(c.label),
              why: show(c.reason),
            })),
            answer: q.answer,
            output: q.codeBlank?.output,
          }),
        );
    }
  else {
    const visibleFiles = (files) =>
      a.runtime === "pygame" && a.kind !== "project"
        ? Object.fromEntries(
            Object.entries(files || {}).filter(([name]) => name !== "main.py"),
          )
        : files;
    console.log("STARTER", JSON.stringify(visibleFiles(a.files)));
    console.log("ANSWER", JSON.stringify(visibleFiles(a.solution)));
    for (const c of a.checkpoints || [])
      console.log(
        JSON.stringify({
          task: show(c.task),
          check: c.check,
          probes: c.probes,
          hints: c.hints?.map(show),
          feedback: show(c.feedback),
        }),
      );
    console.log("EXPLAIN", show(a.solutionNote));
    if (a.kind === "project") console.log(JSON.stringify(a.project));
  }
}
