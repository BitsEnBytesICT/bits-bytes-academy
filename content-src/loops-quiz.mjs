import { loc } from "./helpers.mjs";
export function enhanceLoopsQuiz(quiz) {
  const wrong = [
    [
      loc(
        "range starts at zero when no start is supplied. The stop value is excluded.",
        "range begint bij nul als geen beginwaarde is opgegeven. De stopwaarde is uitgesloten.",
      ),
      loc(
        "Stop 3 is excluded, so it is never assigned to n.",
        "Stop 3 is uitgesloten en wordt dus nooit aan n toegewezen.",
      ),
    ],
    [
      loc(
        "continue skips the remaining body of one iteration; it does not exit the loop.",
        "continue slaat het resterende blok van één iteratie over; het verlaat de loop niet.",
      ),
      loc(
        "pass performs no action. Execution continues with the following statement.",
        "pass doet niets. De uitvoering gaat verder met de volgende instructie.",
      ),
    ],
    [
      loc(
        "When n is 2, continue skips the print. The other iterations still print.",
        "Wanneer n gelijk is aan 2 slaat continue de print over. De andere iteraties drukken wel af.",
      ),
      loc(
        "That would describe break at 2. continue still allows the later value 3 to be visited.",
        "Dat zou break bij 2 beschrijven. continue laat de latere waarde 3 nog aan de beurt komen.",
      ),
    ],
    [
      loc(
        "The expression adds one to each value; it does not append an extra 1 to the input list.",
        "De expressie telt één op bij elke waarde; deze voegt geen extra 1 achteraan de invoerlist toe.",
      ),
      loc(
        "The expression n + 1 transforms each input before placing it in the new list.",
        "De expressie n + 1 bewerkt elke invoerwaarde voordat die in de nieuwe list komt.",
      ),
    ],
    [
      loc(
        "Zero is not strictly greater than zero. This condition excludes it.",
        "Nul is niet strikt groter dan nul. Deze voorwaarde sluit nul uit.",
      ),
      loc(
        "The condition keeps positive values; -1 fails n > 0.",
        "De voorwaarde behoudt positieve waarden; -1 voldoet niet aan n > 0.",
      ),
    ],
    [
      loc(
        "When x is 2 the condition is still true, so the body increments it to 3 before stopping.",
        "Wanneer x gelijk is aan 2 is de voorwaarde nog waar, dus het blok verhoogt x naar 3 voordat de loop stopt.",
      ),
      loc(
        "The condition starts true and the body changes x. The final print runs after those updates.",
        "De voorwaarde is aanvankelijk waar en het blok verandert x. De laatste print draait na die wijzigingen.",
      ),
    ],
    [
      loc(
        "Printing another line would not change n, so the same condition would remain true.",
        "Nog een regel afdrukken zou n niet veranderen, dus dezelfde voorwaarde zou waar blijven.",
      ),
      loc(
        "A while loop does not require a list. It needs a condition that can eventually become false.",
        "Een while-loop heeft geen list nodig. De voorwaarde moet uiteindelijk onwaar kunnen worden.",
      ),
    ],
    [
      loc(
        "The total is initialised outside both loops, so it includes the first row as well as the second.",
        "Het totaal wordt buiten beide loops geïnitialiseerd en bevat dus zowel de eerste als de tweede rij.",
      ),
      loc(
        "The program adds inner values; it does not count the two outer rows.",
        "Het programma telt binnenste waarden op; het telt niet de twee buitenste rijen.",
      ),
    ],
    [
      loc(
        "break occurs before print when n reaches 8, so 8 is not printed.",
        "break staat vóór print wanneer n 8 bereikt, dus 8 wordt niet afgedrukt.",
      ),
      loc(
        "The first value above 5 exits the loop immediately. Later values are never visited.",
        "De eerste waarde boven 5 verlaat de loop onmiddellijk. Latere waarden worden nooit bezocht.",
      ),
    ],
    [
      loc(
        "Resetting inside the loop discards the earlier contributions on every iteration.",
        "Binnen de loop opnieuw beginnen gooit eerdere bijdragen bij elke iteratie weg.",
      ),
      loc(
        "Initialising after the loop is too late for its first addition and would overwrite the result.",
        "Na de loop initialiseren is te laat voor de eerste optelling en zou het resultaat overschrijven.",
      ),
    ],
  ];
  quiz.questions.forEach((q, i) =>
    q.choices.slice(1).forEach((c, j) => (c.reason = wrong[i][j])),
  );
  quiz.questions[7].codeBlank = {
    prompt: loc(
      "Complete both loops to total every reading in the batches. The empty batch should contribute nothing.",
      "Maak beide loops af om elke meting in de batches op te tellen. De lege batch moet niets bijdragen.",
    ),
    segments: [
      "batches = [[4, 1], [], [7]]\ntotal = 0\nfor batch in ",
      ":\n    for reading in ",
      ":\n        total += ",
      "\nprint(total)",
    ],
    tokens: ["batches", "batch", "reading", "total", "0"].map((code, i) => ({
      id: `token-${i + 1}`,
      code,
    })),
    blanks: [
      {
        answer: "batches",
        reason: loc(
          "The outer loop visits each batch in the complete collection.",
          "De buitenste loop bezoekt elke batch in de volledige verzameling.",
        ),
      },
      {
        answer: "batch",
        reason: loc(
          "The inner loop visits values in the current batch, not all batches again.",
          "De binnenste loop bezoekt waarden in de huidige batch, niet opnieuw alle batches.",
        ),
      },
      {
        answer: "reading",
        reason: loc(
          "Add the current numeric reading to the accumulator. A batch is a list.",
          "Tel de huidige numerieke meting op bij de accumulator. Een batch is een list.",
        ),
      },
    ],
    output: "12\n",
  };
}
