import { L } from "./authoring.mjs";
export const reviewLibrary = {
  id: "python-v4-23-review-library",
  chapter: 23,
  group: "python-v4-module-23",
  title: L("Optional recall library", "Optionele herhalingsbibliotheek"),
  kind: "reading",
  optional: true,
  presentation: "article",
  runtime: "terminal",
  estimatedMinutes: 10,
  explanation: L(
    "Use this collection when you want to revisit a topic that has no later lesson using it. Choose one earlier example, predict it without running, and explain one changed case. You can continue to local Python whenever you are ready.",
    "Gebruik deze verzameling als je een onderwerp wilt herhalen dat geen latere les meer gebruikt. Kies één eerder voorbeeld, voorspel het zonder uitvoeren en leg één gewijzigd geval uit. Je kunt doorgaan naar lokale Python zodra je wilt.",
  ),
  sections: [],
  files: {},
  solution: {},
  checkpoints: [],
  references: [],
  inputs: [],
  topicIds: [],
  requiredConcepts: [],
  solutionNote: L(
    "Optional recall supports retention; it does not change your graded completion or prove independent mastery.",
    "Optionele herhaling helpt onthouden; die verandert je beoordeelde voortgang niet en bewijst geen zelfstandige beheersing.",
  ),
};
export function addRetrieval(lessons, activities) {
  const order = new Map(activities.map((a, i) => [a.id, i]));
  for (const source of lessons) {
    // Prefer an actual later use of this concept, rather than an arbitrary
    // chapter offset. Unused later topics go to one optional reference library.
    const destination =
      activities.find(
        (a) =>
          a.chapter > source.chapter &&
          a.chapter < 24 &&
          a.kind !== "quiz" &&
          a.kind !== "reading" &&
          (a.requiredConcepts || []).some((t) => source.topicIds.includes(t)),
      ) || reviewLibrary;
    if (order.get(destination.id) <= order.get(source.id))
      throw Error(`Recall must be later: ${source.id}`);
    const example = source.sections.find(
      (s) => s.code && s.output !== undefined,
    );
    const experiment = source.sections.find((s) => s.role === "experiment");
    (destination.retrievals ||= []).push({
      id: `recall-${source.id}`,
      sourceActivityId: source.id,
      objectiveIds: source.topicIds,
      prompt: L(
        `Recall ${source.title.en.toLowerCase()}. ${example?.prediction?.en || "Predict the output and explain the order of execution."} ${experiment?.body.en || "Explain what would change with different input."}`,
        `Herhaal ${source.title.nl.toLowerCase()}. ${example?.prediction?.nl || "Voorspel de uitvoer en leg de uitvoeringsvolgorde uit."} ${experiment?.body.nl || "Leg uit wat bij andere invoer verandert."}`,
      ),
      ...(example ? { code: example.code } : {}),
    });
  }
}
