import "./list-foundations.mjs";
import "./list-operations.mjs";
import { enhanceListQuiz } from "./list-quiz.mjs";
import { enhanceOperationsQuiz } from "./list-operations-quiz.mjs";
import { activities } from "./helpers.mjs";
import { quiz as Q, predict as P } from "./helpers.mjs";
const g = "create-python-list";
const w = "use-python-list";
Q(g, [
  P(
    "print([4, 7, 9][0])",
    ["4", "7", "9"],
    "Indexes start at zero.",
    "Indexes beginnen bij nul.",
  ),
  P(
    "print([4, 7, 9][-1])",
    ["9", "4", "7"],
    "-1 selects the final element.",
    "-1 kiest het laatste element.",
  ),
  P(
    "x = [1, 2]\nx.append(3)\nprint(x)",
    ["[1, 2, 3]", "[3, 1, 2]", "[1, 2]"],
    "append adds one element at the end.",
    "append voegt één element toe aan het einde.",
  ),
  [
    "Which literal is an empty list?",
    "Welke literal is een lege list?",
    "",
    ["[]", "{}", "()", '""'],
    "Square brackets create a list.",
    "Vierkante haakjes maken een list.",
  ],
  P(
    'x = ["a", "b"]\nx[1] = "c"\nprint(x)',
    ["['a', 'c']", "['c', 'b']", "['a', 'b', 'c']"],
    "Index 1 is the second element, which is replaced.",
    "Index 1 is het tweede element en wordt vervangen.",
  ),
  P(
    "x = [2, 2, 3]\nx.remove(2)\nprint(x)",
    ["[2, 3]", "[3]", "[2, 2]"],
    "remove deletes only the first matching value.",
    "remove verwijdert alleen de eerste passende waarde.",
  ),
  P(
    "print([1] + [2, 3])",
    ["[1, 2, 3]", "[3, 4]", "[1, [2, 3]]"],
    "List addition concatenates the elements in order.",
    "Optellen van lists voegt de elementen in volgorde samen.",
  ),
  P(
    'rows = [["A", 6], ["B", 8]]\nprint(rows[1][0])',
    ["B", "8", "A", "6"],
    "Select the second row, then its first element.",
    "Kies de tweede rij en daarna het eerste element.",
  ),
  [
    "What happens when a requested index is too large?",
    "Wat gebeurt er als een index te groot is?",
    "",
    [["IndexError"], ["None"], ["An empty list", "Een lege list"]],
    "An out-of-range element lookup raises IndexError.",
    "Een element opvragen buiten de beschikbare indexes geeft IndexError.",
  ],
  [
    "Can one list contain different value types?",
    "Kan één list verschillende types bevatten?",
    "",
    [
      ["Yes", "Ja"],
      ["No", "Nee"],
    ],
    "Python lists can hold objects of different types.",
    "Python-lists kunnen objecten van verschillende types bevatten.",
  ],
  P(
    "x = [5]\nresult = x.append(6)\nprint(result)",
    ["None", "[5, 6]", "6"],
    "append mutates x and returns None.",
    "append verandert x en geeft None terug.",
  ),
]);
enhanceListQuiz(activities.find((a) => a.id === `${g}-quiz`));
Q(w, [
  P(
    "print(list(range(4)))",
    ["[0, 1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3, 4]"],
    "The stop value is excluded.",
    "De stopwaarde telt niet mee.",
  ),
  P(
    "print(list(range(2, 9, 3)))",
    ["[2, 5, 8]", "[2, 3, 4, 5, 6, 7, 8]", "[3, 6, 9]"],
    "Begin at 2 and add 3 while staying below 9.",
    "Begin bij 2 en tel telkens 3 op, zolang de waarde kleiner is dan 9.",
  ),
  P(
    "print(len([[1, 2], [3, 4]]))",
    ["2", "4", "1"],
    "len counts the two outer elements.",
    "len telt de twee buitenste elementen.",
  ),
  P(
    "print([1, 2, 3, 4][1:3])",
    ["[2, 3]", "[1, 2, 3]", "[2, 3, 4]"],
    "Index 1 is included and index 3 is excluded.",
    "Index 1 telt mee; index 3 niet.",
  ),
  P(
    "print([1, 2, 3, 4][-2:])",
    ["[3, 4]", "[1, 2]", "[2, 3]"],
    "Start two positions from the end and continue to the end.",
    "Begin twee posities vóór het einde en ga door tot het einde.",
  ),
  P(
    "x = [1, 3]\nx.insert(1, 2)\nprint(x)",
    ["[1, 2, 3]", "[2, 1, 3]", "[1, 3, 2]"],
    "insert places the value before index 1.",
    "insert plaatst de waarde vóór index 1.",
  ),
  P(
    "x = [4, 5, 6]\nprint(x.pop())",
    ["6", "4", "None"],
    "pop without an index removes and returns the last value.",
    "pop zonder index verwijdert de laatste waarde en geeft die terug.",
  ),
  P(
    "print([2, 1, 2, 2].count(2))",
    ["3", "2", "4"],
    "There are three elements equal to 2.",
    "Drie elementen zijn gelijk aan 2.",
  ),
  P(
    "x = [3, 1, 2]\nprint(x.sort())",
    ["None", "[1, 2, 3]", "[3, 2, 1]"],
    "sort changes x in place and returns None.",
    "sort verandert x en geeft None terug.",
  ),
  P(
    "x = [3, 1]\ny = sorted(x)\nprint(x)",
    ["[3, 1]", "[1, 3]", "None"],
    "sorted returns a separate list, leaving x unchanged.",
    "sorted geeft een aparte list terug en laat x ongewijzigd.",
  ),
  P(
    "print(sorted([4, 2, 7], reverse=True))",
    ["[7, 4, 2]", "[2, 4, 7]", "[4, 2, 7]"],
    "reverse=True requests descending order.",
    "reverse=True vraagt om aflopende volgorde.",
  ),
  P(
    "print([1, 2, 3][:0])",
    ["[]", "[1]", "[1, 2, 3]"],
    "The exclusive stop is zero, so no element is selected.",
    "De uitgesloten stopgrens is nul; er wordt geen element gekozen.",
  ),
]);
enhanceOperationsQuiz(activities.find((a) => a.id === `${w}-quiz`));
