import assert from "node:assert/strict";
import { requestedGroups } from "../complete-course/requested-topics.mjs";
const alias = {
  "mixed-lists": "list-contents",
  "list-review": "copying",
  "range-as-sequence": "range",
  len: "length",
  "list-while": "while-lists",
  "conditional-comprehensions": "conditional-list-comprehensions",
  "why-functions": "functions",
  "defining-functions": "function-definition",
  "calling-functions": "function-calls",
  parameters: "parameters-arguments",
  "builtins-vs-user-functions": "builtins",
  "local-scope": "scope",
  "function-review": "functions-review",
  "string-negative-indices": "string-negative-index",
  "string-immutability": "immutability",
  "strings-review": "text-project",
  "split-delimiter": "split-delimiters",
  "format-positional": "positional-format",
  "format-named": "named-format",
  "from-import": "selected-imports",
  "local-modules": "helper-modules",
  "module-review": "guessing-project",
  "valid-keys": "dictionary-keys",
  "add-key": "adding-keys",
  overwrite: "overwriting",
  "get-key": "lookup",
  "delete-key": "dictionary-delete",
  "dict-pop": "dictionary-pop",
  "append-file": "append-files",
  "csv-structure": "csv",
  "csv-dictreader": "dict-reader",
  "csv-conversion": "csv-numeric-conversion",
  "csv-writer": "csv-write",
  "json-dump": "json-save",
  class: "classes",
  "class-variables": "class-attributes",
  "instance-variables": "instance-attributes",
  "everything-is-object": "everything-object",
  str: "str-method",
};
export function createManifest(course, legacy) {
  const order = new Map(course.activities.map((a, i) => [a.id, i]));
  const owners = new Map(
    course.activities.flatMap((a) => (a.topicIds || []).map((t) => [t, a])),
  );
  const loc = (v, label) =>
    assert(
      v?.en?.trim() && v?.nl?.trim(),
      `Bilingual content missing: ${label}`,
    );
  const before = (a, b) =>
    assert(
      order.has(a) && order.get(a) < order.get(b),
      `${a} must precede ${b}`,
    );
  assert.equal(order.size, course.activities.length);
  const topics = [...owners].map(([id, a]) => {
    const teaching = a.sections.flatMap((s, i) =>
      s.topicIds?.includes(id) ? [{ activityId: a.id, section: i + 1 }] : [],
    );
    const workedExamples = teaching.filter(
      (e) => a.sections[e.section - 1].code,
    );
    const requiredPractice = course.activities.flatMap((p) =>
      (p.checkpoints || [])
        .filter((c) => c.objectiveIds?.includes(id))
        .map((c) => ({ activityId: p.id, checkpointId: c.id })),
    );
    const assessment = requiredPractice.map((p) => ({
      ...p,
      kind: "coding-checkpoint",
    }));
    for (const q of course.activities.filter((q) => q.kind === "quiz"))
      for (const [form, items] of [
        ["a", q.questions],
        ["b", q.alternateQuestions],
      ])
        for (const item of items)
          if (item.objectiveIds.includes(id))
            assessment.push({
              kind: "quiz-question",
              activityId: q.id,
              questionId: item.id,
              form,
            });
    const laterRetrieval = course.activities.flatMap((p) =>
      (p.retrievals || [])
        .filter((r) => r.objectiveIds.includes(id))
        .map((r) => ({
          activityId: p.id,
          retrievalId: r.id,
          kind: "self-explanation",
          graded: false,
        })),
    );
    assert(
      teaching.length &&
        workedExamples.length &&
        requiredPractice.length &&
        assessment.length &&
        laterRetrieval.length,
      `Incomplete evidence: ${id}`,
    );
    for (const r of laterRetrieval) before(a.id, r.activityId);
    return {
      id,
      introduction: a.id,
      teaching,
      workedExamples,
      requiredPractice,
      independentApplication: requiredPractice.filter(
        (p) =>
          course.activities.find((a) => a.id === p.activityId)?.guidance ===
          "independent",
      ),
      assessment,
      laterRetrieval,
    };
  });
  for (const a of course.activities) {
    loc(a.title, a.id);
    for (const t of a.requiredConcepts || []) {
      assert(owners.has(t), `Missing concept ${t}`);
      before(owners.get(t).id, a.id);
    }
    for (const ref of a.references || []) before(ref, a.id);
    if (a.kind === "quiz") {
      for (const qs of [a.questions, a.alternateQuestions]) {
        assert.equal(qs.length, 6);
        assert.deepEqual(
          ["prediction", "completion", "debugging", "application"].map(
            (c) => qs.filter((q) => q.category === c).length,
          ),
          [2, 2, 1, 1],
        );
        for (const q of qs) {
          loc(q.prompt, q.id);
          q.choices.forEach((c) => {
            loc(c.label, q.id);
            loc(c.reason, q.id);
          });
          q.reviewActivityIds.forEach((ref) => before(ref, a.id));
        }
      }
    } else {
      loc(a.explanation, a.id);
      loc(a.solutionNote, a.id);
      for (const test of a.manualTests || []) {
        loc(test.input, a.id);
        loc(test.expected, a.id);
      }
      for (const s of a.sections || []) {
        loc(s.heading, a.id);
        loc(s.body, a.id);
        if (s.prediction) loc(s.prediction, a.id);
      }
      for (const c of a.checkpoints) {
        loc(c.task, c.id);
        loc(c.feedback, c.id);
        assert.equal(c.hints.length, 3);
        c.hints.forEach((h) => loc(h, c.id));
      }
      if (["coding", "challenge"].includes(a.kind))
        assert.equal(a.checkpointMode, "sequential");
    }
  }
  const byTopic = new Map(topics.map((t) => [t.id, t]));
  const requestedSyllabus = Object.entries(requestedGroups).flatMap(
    ([group, rows]) =>
      rows.split("|").map((ids, i) => {
        const original = legacy.activities.find(
          (a) => a.id === `${group}-${String(i + 1).padStart(2, "0")}`,
        );
        assert(original?.sourceUrl, `Missing source ${group}/${i}`);
        const topicIds = ids.split(" ").map((t) => alias[t] || t);
        for (const t of topicIds)
          assert(byTopic.has(t), `Missing requested topic ${t}`);
        return {
          sourceUrl: original.sourceUrl,
          referenceTitle: original.title,
          topicIds,
          evidence: topicIds.map((t) => byTopic.get(t)),
        };
      }),
  );
  const counts = {
    modules: course.chapters.length,
    coding: course.activities.filter((a) => a.kind === "coding").length,
    miniProjects: course.activities.filter((a) => a.kind === "challenge")
      .length,
    projects: course.activities.filter((a) => a.kind === "project").length,
    projectStages: course.activities.filter((a) => a.kind === "project-stage")
      .length,
    quizzes: course.activities.filter((a) => a.kind === "quiz").length,
    quizForms: 46,
    quizQuestions: 276,
    topics: topics.length,
  };
  assert.deepEqual(
    [
      counts.modules,
      counts.miniProjects,
      counts.projects,
      counts.projectStages,
      counts.quizzes,
    ],
    [24, 6, 2, 0, 23],
  );
  return {
    version: 4,
    evidencePolicy:
      "Introductions and demonstrated examples, learner checkpoint outcomes, independent application, quiz items and optional recall are separate author-reviewed evidence. Checkpoint tags exclude incidental practice tags and supplied runtime setup; targeted rendering, event, formatting and dictionary tasks provide the learner contribution. Behavior checks establish tested outcomes, not general mastery; named syntax requirements additionally use source checks. Retrieval is ungraded. Adversarial verification is recorded in docs/audits/python-v4/verification.json.",
    durationPolicy:
      "Provisional estimates from individual authored activities; no fixed time or lesson-count target. Actual beginner sessions remain required for validation.",
    estimatedMinutes: course.activities.reduce(
      (n, a) => n + a.estimatedMinutes,
      0,
    ),
    counts,
    prerequisiteMap: course.activities.map((a) => ({
      activityId: a.id,
      requires: (a.requiredConcepts || []).map((t) => ({
        topicId: t,
        introduction: owners.get(t).id,
      })),
    })),
    topics,
    requestedSyllabus,
  };
}
