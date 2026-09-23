import { activities, quiz as Q, predict as P } from "./helpers.mjs";
import { enhanceLoopsQuiz } from "./loops-quiz.mjs";
import "./loops-lessons.mjs";
import "./loops-advanced.mjs";
const g = "learn-python-loops";
Q(g, [
  P(
    "for n in range(3):\n    print(n)",
    ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3"],
    "range(3) contains 0, 1, and 2.",
    "range(3) bevat 0, 1 en 2.",
  ),
  [
    "Which statement ends the nearest loop?",
    "Welke statement beëindigt de dichtstbijzijnde loop?",
    "",
    ["break", "continue", "pass"],
    "break exits the loop; continue skips an iteration and pass does nothing.",
    "break verlaat de loop; continue slaat een herhaling over en pass doet niets.",
  ],
  P(
    "for n in [1, 2, 3]:\n    if n == 2:\n        continue\n    print(n)",
    ["1\n3", "1\n2\n3", "1"],
    "continue skips printing only when n equals 2.",
    "continue slaat het afdrukken alleen over wanneer n gelijk is aan 2.",
  ),
  P(
    "print([n + 1 for n in [2, 4]])",
    ["[3, 5]", "[2, 4, 1]", "[2, 4]"],
    "The expression adds 1 to each input element.",
    "De expressie telt 1 op bij elk invoerelement.",
  ),
  P(
    "print([n for n in [-1, 0, 2] if n > 0])",
    ["[2]", "[0, 2]", "[-1]"],
    "Only 2 satisfies the strict positive condition.",
    "Alleen 2 voldoet aan de voorwaarde strikt groter dan nul.",
  ),
  P(
    "x = 0\nwhile x < 3:\n    x += 1\nprint(x)",
    ["3", "2", "0"],
    "The loop stops after x becomes 3.",
    "De loop stopt nadat x gelijk aan 3 is geworden.",
  ),
  [
    "What is missing from this loop?",
    "Wat ontbreekt in deze loop?",
    "n = 0\nwhile n < 4:\n    print(n)",
    [
      [
        "A change that can make the condition false",
        "Een wijziging die de voorwaarde onwaar kan maken",
      ],
      ["A second print", "Een tweede print"],
      ["A list", "Een list"],
    ],
    "n stays zero, so the condition never becomes false.",
    "n blijft nul, waardoor de voorwaarde nooit onwaar wordt.",
  ],
  P(
    "total = 0\nfor row in [[1, 2], [3]]:\n    for n in row:\n        total += n\nprint(total)",
    ["6", "3", "2"],
    "Each inner value contributes to the total: 1 + 2 + 3.",
    "Elke binnenste waarde telt mee: 1 + 2 + 3.",
  ),
  P(
    "for n in [4, 8, 12]:\n    if n > 5:\n        break\n    print(n)",
    ["4", "4\n8", "4\n8\n12"],
    "The loop breaks at 8 before that value is printed.",
    "De loop stopt bij 8 voordat die waarde wordt afgedrukt.",
  ),
  [
    "Where should a running total usually be initialized?",
    "Waar initialiseer je meestal een lopend totaal?",
    "",
    [
      ["Before the loop", "Vóór de loop"],
      ["Inside every iteration", "Binnen elke herhaling"],
      ["After the loop", "Na de loop"],
    ],
    "Initializing once preserves the accumulated value between iterations.",
    "Eenmalig initialiseren bewaart het opgebouwde totaal tussen herhalingen.",
  ],
]);
enhanceLoopsQuiz(activities.find((a) => a.id === `${g}-quiz`));
