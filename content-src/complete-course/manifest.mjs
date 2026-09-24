import assert from "node:assert/strict";
import { plannedTopics, syllabus } from "./syllabus.mjs";

export function createManifest(course) {
  const order = new Map(course.activities.map((a, i) => [a.id, i]));
  const byId = new Map(course.activities.map((a) => [a.id, a]));
  const localized = (value, label) =>
    assert(
      value?.en?.trim() && value?.nl?.trim(),
      `${label}: English and Dutch required`,
    );
  const before = (first, last) =>
    assert(
      order.has(first) && order.get(first) < order.get(last),
      `${first} must precede ${last}`,
    );
  assert.equal(order.size, course.activities.length, "Unique activity IDs");
  const topics = plannedTopics.map((t) => {
    const a = byId.get(t.introduction);
    const teaching = a.sections.flatMap((s, i) =>
      s.topicIds?.includes(t.id) ? [{ activityId: a.id, section: i + 1 }] : [],
    );
    const examples = teaching.filter((r) => a.sections[r.section - 1].code);
    const practice = a.checkpoints
      .filter((c) => c.objectiveIds?.includes(t.id))
      .map((c) => ({ activityId: a.id, checkpointId: c.id }));
    const assessment = practice.map((p) => ({
      ...p,
      kind: "coding-checkpoint",
      probeCount:
        a.checkpoints.find((c) => c.id === p.checkpointId).probes?.length || 0,
    }));
    for (const quiz of course.activities.filter((a) => a.kind === "quiz")) {
      for (const [form, questions] of [
        ["a", quiz.questions],
        ["b", quiz.alternateQuestions],
      ]) {
        for (const q of questions)
          if (q.objectiveIds.includes(t.id)) {
            before(a.id, quiz.id);
            assessment.push({
              kind: "quiz-question",
              activityId: quiz.id,
              form,
              questionId: q.id,
            });
          }
      }
    }
    const retrieval = course.activities.flatMap((later) =>
      (later.retrievals || [])
        .filter((r) => r.objectiveIds.includes(t.id))
        .map((r) => ({
          activityId: later.id,
          retrievalId: r.id,
          kind: "self-explanation",
          graded: false,
        })),
    );
    assert(
      teaching.length &&
        examples.length &&
        practice.length &&
        assessment.length &&
        retrieval.length,
      `Incomplete coverage: ${t.id}`,
    );
    for (const r of retrieval) before(a.id, r.activityId);
    return {
      ...t,
      teaching,
      workedExamples: examples,
      requiredPractice: practice,
      assessment,
      laterRetrieval: retrieval,
    };
  });
  for (const a of course.activities) {
    localized(a.title, a.id);
    for (const id of [...(a.prerequisites || []), ...(a.references || [])])
      before(id, a.id);
    if (a.kind === "quiz") {
      for (const qs of [a.questions, a.alternateQuestions]) {
        assert.equal(qs.length, 6);
        for (const q of qs) {
          localized(q.prompt, q.id);
          q.choices.forEach((c) => {
            localized(c.label, q.id);
            localized(c.reason, q.id);
          });
          q.reviewActivityIds.forEach((id) => before(id, a.id));
        }
      }
      continue;
    }
    localized(a.explanation, a.id);
    for (const s of a.sections || []) {
      localized(s.heading, a.id);
      localized(s.body, a.id);
      if (s.prediction) localized(s.prediction, a.id);
      if (s.callout) {
        localized(s.callout.title, a.id);
        localized(s.callout.body, a.id);
      }
    }
    for (const r of a.retrievals || []) localized(r.prompt, r.id);
    if (a.kind === "coding") {
      assert(a.checkpoints.length >= 2 && a.checkpoints.length <= 4);
      localized(a.solutionNote, a.id);
      a.checkpoints.forEach((c) => {
        localized(c.task, c.id);
        localized(c.feedback, c.id);
        assert.equal(c.hints.length, 3);
        c.hints.forEach((h) => localized(h, c.id));
      });
    }
    if (a.kind === "project-stage") {
      const canonical = byId.get(a.projectId);
      assert.equal(canonical?.kind, "project");
      before(a.id, canonical.id);
      assert.deepEqual(
        a.files,
        canonical.files,
        "Project visits must agree on the canonical starter",
      );
    }
  }
  for (const p of course.activities.filter((a) => a.kind === "project")) {
    const family = [
      p,
      ...course.activities.filter(
        (a) => a.kind === "project-stage" && a.projectId === p.id,
      ),
    ];
    const milestones = family.flatMap((a) => a.milestones.map((m) => m.id));
    assert.equal(
      new Set(milestones).size,
      milestones.length,
      "Milestone IDs unique across project visits",
    );
  }
  const required = course.activities.filter((a) => !a.optional);
  return {
    version: 3,
    evidencePolicy:
      "Teaching and examples require explicit authored topic tags. Coding checkpoints assess their stated outcomes; optional self-explanation prompts offer later retrieval, not proof of mastery. Infrastructure syntax is excluded. Duplicate source headings are consolidated.",
    estimatedMinutes: required.reduce((n, a) => n + a.estimatedMinutes, 0),
    reviewMinutes: course.reviewMinutes,
    counts: {
      modules: course.chapters.length,
      coding: required.filter((a) => a.kind === "coding").length,
      quizzes: required.filter(a=>a.kind === "quiz").length,
      quizForms: required.filter(a=>a.kind === "quiz").reduce((n,q)=>n+1+Number(Boolean(q.alternateQuestions)),0),
      quizQuestions: required.filter(a=>a.kind === "quiz").reduce((n,q)=>n+q.questions.length+(q.alternateQuestions?.length||0),0),
      projects: required.filter(a=>a.kind === "project").length,
      earlyProjectStages: required.filter(a=>a.kind === "project-stage").length,
      articles: required.filter(a=>a.kind === "reading").length,
      topics: topics.length,
    },
    prerequisiteMap: syllabus.map((m, i) => ({
      chapter: i + 1,
      title: { en: m.title[0], nl: m.title[1] },
      activityPrerequisites: course.activities
        .filter((a) => a.chapter === i + 1 && a.prerequisites)
        .map((a) => ({ activityId: a.id, requires: a.prerequisites })),
    })),
    topics,
  };
}
