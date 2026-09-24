// Checkpoint evidence names what the learner contributes. Demonstrations and
// supplied browser support stay in teaching sections, not assessment tags.
const contracts = {
  "03-division": [["division"], ["print"]],
  "10-zero-division": [["zero-division-recovery", "zero-division-error"]],
  "15-events": [["keyboard-events"], ["closing-window"]],
  "15-score-label": [["f-strings"]],
  "15-event-wiring": [
    ["event-dispatch", "events", "keyboard-events", "closing-window"],
  ],
  "15-render-label": [["text-rendering-practice", "pygame-text", "blit"]],
  "16-two-controls": [
    [
      "controls-integration",
      "simultaneous-controls",
      "held-keys",
      "boundaries",
      "elapsed-time",
    ],
  ],
  "16-mirror-collision": [
    ["mirrored-collision", "paddle-collision", "overlap-correction"],
  ],
  "16-rally-session": [
    ["rally-integration", "serving", "scoring", "game-state", "elapsed-time"],
  ],
  "18-format": [["format"]],
  "18-both-format-forms": [
    ["format-forms-practice", "positional-format", "named-format"],
  ],
  "19-update": [["adding-keys", "overwriting"]],
  "19-build-record": [["record-construction", "empty-dictionaries", "update"]],
  "19-views": [["items", "dictionary-iteration"]],
  "19-keys-and-values": [["view-selection", "keys", "values"]],
};
export function applyEvidenceContracts(lessons) {
  for (const a of lessons) {
    const mapping = contracts[a.id.replace("python-v4-", "")];
    if (mapping) {
      if (mapping.length !== a.checkpoints.length)
        throw Error(`Evidence contract changed: ${a.id}`);
      a.checkpoints.forEach((c, i) => (c.objectiveIds = mapping[i]));
    }
    // Printing an arithmetic/Boolean result is its own outcome, not a second
    // independent assessment of every concept mentioned in the lesson.
    if (
      [3, 6].includes(a.chapter) &&
      a.checkpoints.length === 2 &&
      /Print.*result/.test(a.checkpoints[1].task.en)
    )
      a.checkpoints[1].objectiveIds = ["print"];
  }
}
