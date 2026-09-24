import { lesson, S, C, B, F } from "./authoring.mjs";
export const activities = [
  lesson(5, 1, {
    explanation: [
      "Store several related values in a list and grow a history one event at a time. A list is an ordered, changeable collection.",
      "Bewaar meerdere bijbehorende waarden in een lijst en breid een geschiedenis één gebeurtenis tegelijk uit. Een lijst is een geordende, veranderbare verzameling.",
    ],
    sections: [
      S(
        "lists mixed-lists empty-lists list-methods append list-concatenation",
        ["Grow a list", "Laat een lijst groeien"],
        [
          "Square brackets create a list; [] is empty. A list can mix types, although similar items are easier to process. A method is an operation accessed through a value, such as scores.append(8). append adds one item to the existing list. + makes a new combined list. append returns None: do not replace your list with its return value.",
          "Vierkante haken maken een lijst; [] is leeg. Een lijst kan types mengen, hoewel gelijksoortige items makkelijker te verwerken zijn. Een methode is een bewerking via een waarde, zoals scores.append(8). append voegt één item aan de bestaande lijst toe. + maakt een nieuwe gecombineerde lijst. append geeft None terug: vervang je lijst niet door die terugkeerwaarde.",
        ],
        'scores = []\nscores.append(8)\nscores.append(3)\nrecord = ["Ada", 11, True]\ncombined = scores + [5]\nprint(scores)\nprint(combined)\nprint(record)',
        "[8, 3]\n[8, 3, 5]\n['Ada', 11, True]\n",
        [
          "Which operation leaves scores unchanged?",
          "Welke bewerking laat scores ongewijzigd?",
        ],
      ),
    ],
    starter:
      'player = "Jo"\nfirst = 4\nsecond = 7\n# Build scores and a mixed record.\n',
    solution:
      'player = "Jo"\nfirst = 4\nsecond = 7\nscores = []\nscores.append(first)\nscores.append(second)\nrecord = [player, first + second]\ncombined = scores + [0]\nprint(record)\nprint(combined)\n',
    tasks: [
      C(
        "lists empty-lists list-methods append",
        [
          "Start scores as an empty list; append first and then second.",
          "Begin scores als een lege lijst; voeg first en daarna second toe met append.",
        ],
        'scores == [first, second] and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == "append" for n in _ast.walk(_ast.parse(_source)))',
        [
          [
            "Create the list before calling its method.",
            "Maak de lijst voordat je zijn methode aanroept.",
          ],
          [
            "Call append twice without assigning its result.",
            "Roep append twee keer aan zonder het resultaat toe te wijzen.",
          ],
          ["scores.append(first)", "scores.append(first)"],
        ],
        [
          "Check that scores is still a list, not None.",
          "Controleer dat scores nog een lijst is, geen None.",
        ],
        [B({ first: 0, second: -2 }, "scores == [0,-2]")],
      ),
      C(
        "mixed-lists list-concatenation",
        [
          "Make record = [player, first + second]. Make combined by joining scores and [0], preserving scores. Print record and combined.",
          "Maak record = [player, first + second]. Maak combined door scores en [0] samen te voegen en behoud scores. Druk record en combined af.",
        ],
        "record == [player, first+second] and combined == [first,second,0] and scores == [first,second] and len(_stdout.splitlines()) == 2",
        [
          [
            "Different types can occupy different list positions.",
            "Verschillende types kunnen verschillende lijstposities innemen.",
          ],
          [
            "Use + for a separate list with the extra zero.",
            "Gebruik + voor een aparte lijst met de extra nul.",
          ],
          ["combined = scores + [0]", "combined = scores + [0]"],
        ],
        [
          "Appending zero to scores would change the original history.",
          "Nul toevoegen met append aan scores zou de oorspronkelijke geschiedenis wijzigen.",
        ],
        [
          B(
            { player: "Mia", first: 2, second: 3 },
            'record == ["Mia",5] and combined == [2,3,0] and scores == [2,3]',
          ),
        ],
      ),
    ],
    note: [
      "append changes the existing list; + creates a new one. The mixed record uses a text label and numeric total, while the score history remains purely numeric.",
      "append wijzigt de bestaande lijst; + maakt een nieuwe. Het gemengde record gebruikt een tekstlabel en numeriek totaal, terwijl de scoregeschiedenis numeriek blijft.",
    ],
    experiment: [
      "Assign the result of append to a temporary name and print it. Explain why it is None even though the list gained an item.",
      "Wijs het resultaat van append aan een tijdelijke naam toe en druk het af. Leg uit waarom het None is hoewel de lijst een item kreeg.",
    ],
  }),
  lesson(5, 2, {
    explanation: [
      "Inspect positions and distinguish an alias from a copy. Two names can refer to the same mutable list.",
      "Bekijk posities en onderscheid een alias van een kopie. Twee namen kunnen naar dezelfde veranderbare lijst verwijzen.",
    ],
    sections: [
      S(
        "indexing negative-indexing list-mutation len aliasing copying",
        ["Positions and shared state", "Posities en gedeelde toestand"],
        [
          "Indexes start at zero. -1 selects the last item. len returns the number of items; the last positive index is len(items)-1. Assigning items[0] replaces one item. alias = items makes another name for the same list; items.copy() makes a separate shallow copy. This is enough for flat numeric lists; nested lists need more care later.",
          "Indexen beginnen bij nul. -1 kiest het laatste item. len geeft het aantal items; de laatste positieve index is len(items)-1. items[0] toewijzen vervangt één item. alias = items maakt een andere naam voor dezelfde lijst; items.copy() maakt een aparte oppervlakkige kopie. Dat volstaat voor vlakke numerieke lijsten; geneste lijsten vragen later meer aandacht.",
        ],
        "items = [2, 5, 8]\nalias = items\nsnapshot = items.copy()\nalias[0] = 9\nprint(items[-1], len(items))\nprint(items)\nprint(snapshot)",
        "8 3\n[9, 5, 8]\n[2, 5, 8]\n",
        [
          "Which names see the changed first item?",
          "Welke namen zien het gewijzigde eerste item?",
        ],
      ),
    ],
    starter:
      "scores = [3, 5, 9]\nreplacement = 7\n# Preserve a snapshot, then change the first score through an alias.\n",
    solution:
      "scores = [3, 5, 9]\nreplacement = 7\nsnapshot = scores.copy()\nalias = scores\nalias[0] = replacement\nlast = scores[-1]\ncount = len(scores)\nprint(scores, snapshot, last, count)\n",
    tasks: [
      C(
        "aliasing copying list-mutation",
        [
          "Create snapshot as a separate copy and alias as another name for scores. Change alias[0] to replacement.",
          "Maak snapshot als aparte kopie en alias als andere naam voor scores. Wijzig alias[0] in replacement.",
        ],
        "alias is scores and snapshot is not scores and snapshot == [3,5,9] and scores == [7,5,9]",
        [
          [
            "Copy before making the change.",
            "Kopieer voordat je de wijziging maakt.",
          ],
          [
            "Use .copy() only for the snapshot.",
            "Gebruik .copy() alleen voor de momentopname.",
          ],
          [
            "snapshot = scores.copy()\nalias = scores",
            "snapshot = scores.copy()\nalias = scores",
          ],
        ],
        [
          "A snapshot must preserve the old value while the alias shares the new value.",
          "Een momentopname moet de oude waarde bewaren terwijl de alias de nieuwe waarde deelt.",
        ],
        [
          B(
            { scores: [1, 2], replacement: 0 },
            "snapshot == [1,2] and scores == [0,2] and alias is scores",
          ),
        ],
      ),
      C(
        "indexing negative-indexing len",
        [
          "Store the last score in last and the list length in count; print the results.",
          "Bewaar de laatste score in last en de lijstlengte in count; druk de resultaten af.",
        ],
        "last == 9 and count == 3 and bool(_stdout)",
        [
          [
            "A negative index counts from the end.",
            "Een negatieve index telt vanaf het einde.",
          ],
          [
            "Use scores[-1] and len(scores).",
            "Gebruik scores[-1] en len(scores).",
          ],
          ["last = scores[-1]", "last = scores[-1]"],
        ],
        [
          "Do not hard-code index 2; the list may have a different length.",
          "Leg index 2 niet vast; de lijst kan een andere lengte hebben.",
        ],
        [B({ scores: [6], replacement: 2 }, "last == 2 and count == 1")],
      ),
    ],
    note: [
      "The copy is created before mutation. The alias deliberately shares identity with scores, while the snapshot retains the earlier independent values.",
      "De kopie wordt vóór de wijziging gemaakt. De alias deelt bewust identiteit met scores, terwijl de momentopname eerdere onafhankelijke waarden bewaart.",
    ],
    experiment: [
      "Explain why an empty list has length zero but no last item. Do not index it without checking its length first.",
      "Leg uit waarom een lege lijst lengte nul heeft maar geen laatste item. Indexeer die niet zonder eerst de lengte te controleren.",
    ],
  }),
  lesson(5, 3, {
    explanation: [
      "Compare direct iteration with an indexed while loop. Both can process a list, but the while version requires you to manage a position.",
      "Vergelijk rechtstreeks doorlopen met een while-lus via indexen. Beide kunnen een lijst verwerken, maar bij while moet je zelf een positie bijhouden.",
    ],
    sections: [
      S(
        "list-for list-while",
        ["Values or positions", "Waarden of posities"],
        [
          "for value in items visits each value. An indexed while uses i < len(items), reads items[i], then advances i. Starting at zero and stopping before len avoids an out-of-range index. Both loop forms naturally do nothing for an empty list.",
          "for value in items bezoekt elke waarde. Een while met index gebruikt i < len(items), leest items[i] en verhoogt daarna i. Beginnen bij nul en stoppen vóór len voorkomt een index buiten bereik. Beide lusvormen doen vanzelf niets bij een lege lijst.",
        ],
        "values = [2, 4]\nfor value in values:\n    print(value)\ni = 0\nwhile i < len(values):\n    print(values[i])\n    i += 1",
        "2\n4\n2\n4\n",
        [
          "Where does the while loop advance?",
          "Waar gaat de while-lus naar de volgende positie?",
        ],
      ),
    ],
    starter:
      "def total_for(values):\n    return 0\n\ndef total_while(values):\n    return 0\n\nprint(total_for([3, 6]), total_while([3, 6]))\n",
    solution:
      "def total_for(values):\n    total = 0\n    for value in values:\n        total += value\n    return total\n\ndef total_while(values):\n    total = 0\n    i = 0\n    while i < len(values):\n        total += values[i]\n        i += 1\n    return total\n\nprint(total_for([3, 6]), total_while([3, 6]))\n",
    tasks: [
      C(
        "list-for",
        [
          "Implement total_for(values) using a for loop and return the sum.",
          "Implementeer total_for(values) met een for-lus en geef de som terug.",
        ],
        'total_for([3,6]) == 9 and any(isinstance(n,_ast.For) for n in _ast.walk(next(n for n in _ast.walk(_ast.parse(_source)) if isinstance(n,_ast.FunctionDef) and n.name == "total_for")))',
        [
          [
            "Use one accumulator for all values.",
            "Gebruik één totaal voor alle waarden.",
          ],
          [
            "Initialise total, loop over values, then return total.",
            "Initialiseer total, doorloop values en geef total terug.",
          ],
          [
            "for value in values:\n    total += value",
            "for value in values:\n    total += value",
          ],
        ],
        [
          "Return after the loop, not during its first iteration.",
          "Geef het resultaat na de lus terug, niet tijdens de eerste iteratie.",
        ],
        [
          F("total_for", [[1, -2, 5]], "_return == 4"),
          F("total_for", [[]], "_return == 0"),
        ],
      ),
      C(
        "list-while",
        [
          "Implement total_while(values) using an indexed while loop, with the same behaviour.",
          "Implementeer total_while(values) met een while-lus via indexen en hetzelfde gedrag.",
        ],
        "total_while([3,6]) == 9 and any(isinstance(n,_ast.While) for n in _ast.walk(_ast.parse(_source)))",
        [
          [
            "The index must reach the stopping boundary.",
            "De index moet de stopgrens bereiken.",
          ],
          [
            "Use i < len(values), not <=, and increment i.",
            "Gebruik i < len(values), niet <=, en verhoog i.",
          ],
          ["i += 1", "i += 1"],
        ],
        [
          "Check both the empty list and the final valid index.",
          "Controleer zowel de lege lijst als de laatste geldige index.",
        ],
        [
          F("total_while", [[]], "_return == 0"),
          F("total_while", [[-3, 2, 8]], "_return == 7"),
        ],
      ),
    ],
    note: [
      "The two functions implement the same contract. The for version handles advancing automatically; the while version exposes that extra responsibility.",
      "De twee functies voeren dezelfde afspraak uit. De for-versie regelt de volgende waarde automatisch; de while-versie maakt die extra verantwoordelijkheid zichtbaar.",
    ],
    experiment: [
      "Call both with [], [0] and [4, -4]. Explain why all return zero for different reasons.",
      "Roep beide aan met [], [0] en [4, -4]. Leg uit waarom ze allemaal nul teruggeven om verschillende redenen.",
    ],
  }),
  lesson(5, 4, {
    explanation: [
      "Represent a position as two coordinates. Return several related values by packing them into a tuple, then unpack them at the call site.",
      "Stel een positie voor met twee coördinaten. Geef meerdere bijbehorende waarden terug door ze in een tuple te verpakken en pak ze bij de aanroep uit.",
    ],
    sections: [
      S(
        "tuples unpacking multiple-returns",
        [
          "One return value containing a pair",
          "Eén terugkeerwaarde met een paar",
        ],
        [
          "A tuple is an ordered sequence whose items cannot be replaced. Commas create a tuple; parentheses often make it clearer. return x, y packs one tuple. a, b = result unpacks its two values. The number of names must match the number of values. This is how a function appears to return multiple values.",
          "Een tuple is een geordende reeks waarvan items niet vervangen kunnen worden. Komma’s maken een tuple; haakjes maken dat vaak duidelijker. return x, y verpakt één tuple. a, b = result pakt de twee waarden uit. Het aantal namen moet bij het aantal waarden passen. Zo lijkt een functie meerdere waarden terug te geven.",
        ],
        "def size():\n    return 80, 40\nwidth, height = size()\nprint(width, height)\npoint = (3, 7)\nx, y = point\nprint(x + 1, y)",
        "80 40\n4 7\n",
        [
          "How many Python values does return really send back?",
          "Hoeveel Python-waarden stuurt return werkelijk terug?",
        ],
      ),
    ],
    starter:
      "def move(x, y, dx, dy):\n    return (x, y)\n\n# Unpack the result of move(3, 4, 2, -1).\n",
    solution:
      "def move(x, y, dx, dy):\n    return x + dx, y + dy\n\nx, y = move(3, 4, 2, -1)\nprint(x, y)\n",
    tasks: [
      C(
        "tuples multiple-returns",
        [
          "Return a tuple containing the new x and y from move(x, y, dx, dy).",
          "Geef vanuit move(x, y, dx, dy) een tuple terug met de nieuwe x en y.",
        ],
        "callable(move)",
        [
          [
            "Each coordinate changes by its own displacement.",
            "Elke coördinaat verandert met zijn eigen verplaatsing.",
          ],
          ["Add dx to x and dy to y.", "Tel dx bij x en dy bij y op."],
          ["return x + dx, y + dy", "return x + dx, y + dy"],
        ],
        [
          "Preserve coordinate order and support negative displacement.",
          "Behoud de coördinatenvolgorde en ondersteun negatieve verplaatsing.",
        ],
        [
          F(
            "move",
            [0, 0, -2, 5],
            "_return == (-2,5) and isinstance(_return,tuple)",
          ),
          F("move", [3, 4, 0, 0], "_return == (3,4)"),
        ],
      ),
      C(
        "unpacking",
        [
          "Unpack move(3, 4, 2, -1) into x and y and print both.",
          "Pak move(3, 4, 2, -1) uit in x en y en druk beide af.",
        ],
        'x == 5 and y == 3 and _stdout.strip() == "5 3"',
        [
          [
            "Two names can receive the two components.",
            "Twee namen kunnen de twee onderdelen ontvangen.",
          ],
          [
            "Put x, y on the left of one assignment.",
            "Zet x, y links van één toewijzing.",
          ],
          ["x, y = move(3, 4, 2, -1)", "x, y = move(3, 4, 2, -1)"],
        ],
        [
          "Print the unpacked components, not a nested list or a single name.",
          "Druk de uitgepakte onderdelen af, geen geneste lijst of enkele naam.",
        ],
      ),
    ],
    note: [
      "return creates one tuple; assignment unpacks it. The function leaves its numeric inputs unchanged and computes a new position.",
      "return maakt één tuple; toewijzing pakt die uit. De functie laat zijn numerieke invoer ongewijzigd en berekent een nieuwe positie.",
    ],
    experiment: [
      "Try a fractional displacement and no movement. Explain why point[0] = 9 fails for a tuple but works for a list.",
      "Probeer een verplaatsing met decimalen en geen beweging. Leg uit waarom point[0] = 9 bij een tuple mislukt maar bij een lijst werkt.",
    ],
  }),
  lesson(5, 5, {
    explanation: [
      "Summarise an unfamiliar recording without changing it. Return its total and the count of values strictly above a supplied limit. Empty recordings return (0, 0).",
      "Vat een nieuwe opname samen zonder die te veranderen. Geef het totaal en het aantal waarden strikt boven een meegegeven grens terug. Lege opnames geven (0, 0).",
    ],
    sections: [
      S(
        "list-review",
        ["Two accumulators", "Twee totalen"],
        [
          "Different questions about the same data can share one traversal. Keep the running sum separate from the count that changes only when a condition is true. A returned pair makes the result available to a caller.",
          "Verschillende vragen over dezelfde gegevens kunnen één doorloop delen. Houd de lopende som apart van de teller die alleen verandert als een voorwaarde waar is. Een teruggegeven paar maakt het resultaat beschikbaar voor een aanroeper.",
        ],
        "count = 0\nfor value in [1, 4, 6]:\n    if value > 3:\n        count += 1\nprint(count)",
        "2\n",
        [
          "Would a value equal to 3 count?",
          "Zou een waarde gelijk aan 3 meetellen?",
        ],
      ),
    ],
    starter:
      "def recording_stats(values, limit):\n    pass\n\nprint(recording_stats([2, 6, -1, 6], 2))\n",
    solution:
      "def recording_stats(values, limit):\n    total = 0\n    above = 0\n    for value in values:\n        total += value\n        if value > limit:\n            above += 1\n    return total, above\n\nprint(recording_stats([2, 6, -1, 6], 2))\n",
    tasks: [
      C(
        "list-review",
        [
          "Return (total, above) using every value and the strict > limit rule.",
          "Geef (total, above) terug met elke waarde en de strikte regel > limit.",
        ],
        "recording_stats([2,6,-1,6],2) == (13,2)",
        [
          [
            "Track two different outcomes.",
            "Houd twee verschillende uitkomsten bij.",
          ],
          [
            "Sum all values but count only those above the limit.",
            "Tel alle waarden op maar tel alleen waarden boven de grens mee in de teller.",
          ],
          [
            "if value > limit:\n    above += 1",
            "if value > limit:\n    above += 1",
          ],
        ],
        [
          "Equality must not count as above. Negative values still contribute to the sum.",
          "Gelijkheid telt niet als erboven. Negatieve waarden dragen wel bij aan de som.",
        ],
        [
          F("recording_stats", [[3, 3, 4], 3], "_return == (10,1)"),
          F("recording_stats", [[-4, -1], -2], "_return == (-5,1)"),
        ],
      ),
      C(
        "list-review",
        [
          "Return (0, 0) for an empty list and preserve the caller’s list.",
          "Geef (0, 0) voor een lege lijst terug en behoud de lijst van de aanroeper.",
        ],
        "recording_stats([],2) == (0,0)",
        [
          [
            "Initial values can also be the empty answer.",
            "Beginwaarden kunnen ook het lege antwoord zijn.",
          ],
          [
            "Do not remove items as you process them.",
            "Verwijder geen items terwijl je ze verwerkt.",
          ],
          ["total = 0\nabove = 0", "total = 0\nabove = 0"],
        ],
        [
          "Reading a recording should not consume or rewrite it.",
          "Een opname lezen mag die niet verbruiken of herschrijven.",
        ],
        [
          F("recording_stats", [[], 0], "_return == (0,0)"),
          F(
            "recording_stats",
            [[4, 1], 2],
            "_return == (5,1) and _args[0] == [4,1]",
          ),
        ],
      ),
    ],
    note: [
      "Two accumulators answer two questions in a single pass. Returning after the loop handles the empty case and preserves the input list.",
      "Twee totalen beantwoorden twee vragen in één doorloop. Teruggeven na de lus handelt het lege geval af en behoudt de invoerlijst.",
    ],
    experiment: [
      "Unpack the result and print a sentence about it. Reuse the same recording with a different limit: which component changes?",
      "Pak het resultaat uit en druk er een zin over af. Hergebruik dezelfde opname met een andere grens: welk onderdeel verandert?",
    ],
  }),
  lesson(6, 1, {
    explanation: [
      "Use a standard-library function instead of inventing a rounding rule. Imports make a module’s tools available to your program.",
      "Gebruik een standaardbibliotheekfunctie in plaats van zelf een afrondregel te verzinnen. Imports maken hulpmiddelen van een module beschikbaar voor je programma.",
    ],
    sections: [
      S(
        "imports from-import aliases documentation install-vs-import",
        ["Read a small API contract", "Lees een kleine API-afspraak"],
        [
          "import math gives you math.ceil(x), which returns the smallest integer at least x. from math import ceil lets you call ceil(x) directly; import math as m uses m.ceil(x). These are naming choices, not different calculations. math is included with Python. Third-party packages must be installed in an environment before importing them; this course already bundles pygame-ce. Read the argument and return descriptions in the [official math documentation](https://docs.python.org/3/library/math.html#math.ceil).",
          "import math geeft je math.ceil(x), het kleinste gehele getal dat minstens x is. from math import ceil laat je direct ceil(x) aanroepen; import math as m gebruikt m.ceil(x). Dit zijn naamkeuzes, geen andere berekeningen. math zit bij Python. Externe pakketten moeten vóór importeren in een omgeving zijn geïnstalleerd; deze cursus bundelt pygame-ce al. Lees de argument- en terugkeerbeschrijvingen in de [officiële math-documentatie](https://docs.python.org/3/library/math.html#math.ceil).",
        ],
        "import math as m\nfrom math import floor\nprint(m.ceil(2.2))\nprint(floor(2.2))",
        "3\n2\n",
        [
          "Which tool rounds upward? What would both return for 2.0?",
          "Welk hulpmiddel rondt omhoog af? Wat zouden beide voor 2.0 geven?",
        ],
      ),
    ],
    starter:
      "# Import a math tool.\ndef billed_minutes(seconds):\n    return 0\n\nprint(billed_minutes(61))\n",
    solution:
      "import math as m\nfrom math import floor\n\ndef billed_minutes(seconds):\n    return m.ceil(seconds / 60)\n\nwhole = floor(2.8)\nprint(billed_minutes(61))\n",
    tasks: [
      C(
        "imports aliases documentation",
        [
          "Import math as m. Return m.ceil(seconds / 60) from billed_minutes for nonnegative seconds.",
          "Importeer math als m. Geef m.ceil(seconds / 60) terug vanuit billed_minutes voor niet-negatieve seconden.",
        ],
        'callable(billed_minutes) and m.__name__ == "math"',
        [
          [
            "Convert seconds to minutes before rounding upward.",
            "Zet seconden om naar minuten voordat je omhoog afrondt.",
          ],
          [
            "The module alias is used before the dot.",
            "De modulealias wordt vóór de punt gebruikt.",
          ],
          ["return m.ceil(seconds / 60)", "return m.ceil(seconds / 60)"],
        ],
        [
          "An exact minute should stay one minute; zero stays zero.",
          "Een exacte minuut moet één minuut blijven; nul blijft nul.",
        ],
        [
          F("billed_minutes", [60], "_return == 1"),
          F("billed_minutes", [61], "_return == 2"),
          F("billed_minutes", [0], "_return == 0"),
        ],
      ),
      C(
        "from-import install-vs-import",
        [
          "Also import floor directly from math and store floor(2.8) in whole. Run without installing a package.",
          "Importeer ook floor rechtstreeks uit math en bewaar floor(2.8) in whole. Voer uit zonder een pakket te installeren.",
        ],
        'whole == 2 and callable(floor) and _stdout.strip() == "2"',
        [
          [
            "This tool is already in Python’s standard library.",
            "Dit hulpmiddel zit al in Pythons standaardbibliotheek.",
          ],
          ["Use from math import floor.", "Gebruik from math import floor."],
          ["whole = floor(2.8)", "whole = floor(2.8)"],
        ],
        [
          "Direct imports introduce the function name itself. Installation commands are not Python statements.",
          "Directe imports introduceren de functienaam zelf. Installatiecommando’s zijn geen Python-opdrachten.",
        ],
      ),
    ],
    note: [
      "The two import styles name the same module’s tools differently. Dividing before ceil expresses charging per started minute without a special integer formula.",
      "De twee importvormen benoemen hulpmiddelen van dezelfde module anders. Delen vóór ceil drukt kosten per begonnen minuut uit zonder speciale geheeltallige formule.",
    ],
    experiment: [
      "Look up floor in the linked documentation. Predict floor(-2.2) and ceil(-2.2), then try them outside the nonnegative billing function.",
      "Zoek floor op in de gekoppelde documentatie. Voorspel floor(-2.2) en ceil(-2.2) en probeer ze buiten de factuurfunctie voor niet-negatieve waarden.",
    ],
  }),
  lesson(6, 2, {
    explanation: [
      "Create repeatable random experiments. Seed once for an experiment, then allow successive calls to advance the random sequence.",
      "Maak herhaalbare willekeurige experimenten. Stel de seed één keer per experiment in en laat opeenvolgende aanroepen de reeks voortzetten.",
    ],
    sections: [
      S(
        "random random-seed",
        ["Variation that can be replayed", "Variatie die herhaald kan worden"],
        [
          "random.randint(a, b) includes both endpoints; random.choice(values) chooses one item. random.seed(n) resets a repeatable sequence. Resetting inside a function would repeat its first choice on every call. Use this generator for simulations and game variation.",
          "random.randint(a, b) neemt beide grenzen mee; random.choice(values) kiest één item. random.seed(n) herstart een herhaalbare reeks. Binnen een functie herstarten zou de eerste keuze bij elke aanroep herhalen. Gebruik deze generator voor simulaties en spelvariatie.",
        ],
        "import random\nrandom.seed(9)\na = random.randint(1, 6)\nrandom.seed(9)\nb = random.randint(1, 6)\nprint(a == b)",
        "True\n",
        [
          "Why are a and b equal although randint is random?",
          "Waarom zijn a en b gelijk hoewel randint willekeurig is?",
        ],
      ),
    ],
    starter:
      "import random\n\ndef roll_many(count):\n    return []\n\nrandom.seed(42)\nprint(roll_many(5))\n",
    solution:
      "import random\n\ndef roll_many(count):\n    rolls = []\n    for i in range(count):\n        rolls.append(random.randint(1, 6))\n    return rolls\n\nrandom.seed(42)\nfirst = roll_many(5)\nrandom.seed(42)\nsecond = roll_many(5)\nprint(first == second)\nprint(first)\n",
    tasks: [
      C(
        "random",
        [
          "Return count random die values between 1 and 6 from roll_many. Do not seed inside the function.",
          "Geef count willekeurige dobbelsteenwaarden tussen 1 en 6 terug vanuit roll_many. Stel de seed niet binnen de functie in.",
        ],
        "callable(roll_many)",
        [
          [
            "Accumulate one random value per iteration.",
            "Verzamel één willekeurige waarde per iteratie.",
          ],
          ["Use randint(1, 6) and append.", "Gebruik randint(1, 6) en append."],
          [
            "rolls.append(random.randint(1, 6))",
            "rolls.append(random.randint(1, 6))",
          ],
        ],
        [
          "The result must have the requested length and actual variation.",
          "Het resultaat moet de gevraagde lengte en echte variatie hebben.",
        ],
        [
          F("roll_many", [0], "_return == []"),
          F(
            "roll_many",
            [60],
            "len(_return) == 60 and all(type(v) is int and 1 <= v <= 6 for v in _return) and len(set(_return)) > 1",
          ),
          F("roll_many", [12], "_return != roll_many(12)"),
        ],
      ),
      C(
        "random-seed",
        [
          "In main.py, seed with 42, store five rolls in first, seed with 42 again and store five in second. Print whether they match and then first.",
          "Stel in main.py de seed in op 42, bewaar vijf worpen in first, stel weer 42 in en bewaar vijf in second. Druk af of ze gelijk zijn en daarna first.",
        ],
        'first == second and len(first) == 5 and _stdout.startswith("True\n")',
        [
          [
            "A repeated seed restarts a sequence, not just one value.",
            "Een herhaalde seed herstart een reeks, niet alleen één waarde.",
          ],
          [
            "Reset immediately before each group of calls.",
            "Herstart direct vóór elke groep aanroepen.",
          ],
          [
            "random.seed(42)\nsecond = roll_many(5)",
            "random.seed(42)\nsecond = roll_many(5)",
          ],
        ],
        [
          "The same seed and same calls reproduce the same experiment.",
          "Dezelfde seed en dezelfde aanroepen herhalen hetzelfde experiment.",
        ],
      ),
    ],
    note: [
      "The seed belongs to the experiment around the function. The function can therefore create new values during play while a test can deliberately reproduce a sequence.",
      "De seed hoort bij het experiment rond de functie. Daardoor kan de functie tijdens het spelen nieuwe waarden maken terwijl een test bewust een reeks herhaalt.",
    ],
    experiment: [
      "Remove only the second seed and compare first and second. Explain why reproducible does not mean every call returns the same result.",
      "Verwijder alleen de tweede seed en vergelijk first en second. Leg uit waarom herhaalbaar niet betekent dat elke aanroep hetzelfde resultaat geeft.",
    ],
  }),
  lesson(6, 3, {
    explanation: [
      "Compare binary floating-point arithmetic with decimal arithmetic. For exact decimal inputs, create Decimal values from strings.",
      "Vergelijk binaire drijvende-kommaberekeningen met decimale berekeningen. Maak Decimal-waarden uit strings voor exacte decimale invoer.",
    ],
    sections: [
      S(
        "decimal",
        ["Represent the intended value", "Stel de bedoelde waarde voor"],
        [
          'Some decimal fractions have no exact finite binary float representation. This is why 0.1 + 0.2 is not exactly 0.3. Decimal("0.1") starts from decimal text; Decimal(0.1) starts from an already approximated float. Decimal arithmetic uses a configurable precision, so it is not unlimited exact mathematics. Do not mix Decimal and float operands.',
          'Sommige decimale breuken hebben geen exacte eindige binaire floatvoorstelling. Daarom is 0.1 + 0.2 niet precies 0.3. Decimal("0.1") begint met decimale tekst; Decimal(0.1) begint met een al benaderde float. Decimal-berekeningen gebruiken instelbare precisie, dus geen onbeperkt exacte wiskunde. Meng Decimal en float niet als operanden.',
        ],
        'from decimal import Decimal\nprint(0.1 + 0.2 == 0.3)\nprint(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))',
        "False\nTrue\n",
        [
          "Which conversion preserves the typed decimal digits?",
          "Welke omzetting behoudt de getypte decimale cijfers?",
        ],
      ),
    ],
    starter:
      'from decimal import Decimal\n\ndef decimal_total(price_text, quantity):\n    return 0\n\nprint(decimal_total("0.10", 3))\n',
    solution:
      'from decimal import Decimal\n\ndef decimal_total(price_text, quantity):\n    return Decimal(price_text) * quantity\n\nfloat_equal = 0.1 + 0.2 == 0.3\ndecimal_equal = Decimal("0.1") + Decimal("0.2") == Decimal("0.3")\nprint(decimal_total("0.10", 3))\n',
    tasks: [
      C(
        "decimal",
        [
          "Return a Decimal total from price_text times quantity, converting directly from the string.",
          "Geef een Decimal-totaal terug van price_text maal quantity en zet direct uit de string om.",
        ],
        'decimal_total("0.10",3) == Decimal("0.30")',
        [
          [
            "Preserve the original text until Decimal reads it.",
            "Behoud de oorspronkelijke tekst totdat Decimal die leest.",
          ],
          [
            "Do not call float before Decimal.",
            "Roep float niet vóór Decimal aan.",
          ],
          [
            "return Decimal(price_text) * quantity",
            "return Decimal(price_text) * quantity",
          ],
        ],
        [
          "A float conversion first introduces the approximation you are trying to avoid.",
          "Eerst naar float omzetten introduceert de benadering die je wilt vermijden.",
        ],
        [
          F(
            "decimal_total",
            ["0.10", 3],
            'isinstance(_return, Decimal) and _return == Decimal("0.30")',
          ),
          F("decimal_total", ["1.25", 0], '_return == Decimal("0")'),
          F("decimal_total", ["-0.2", 2], '_return == Decimal("-0.4")'),
        ],
      ),
      C(
        "decimal",
        [
          "Store the equality tests from the example in float_equal and decimal_equal. Keep the printed total from the function call.",
          "Bewaar de gelijkheidstests uit het voorbeeld in float_equal en decimal_equal. Behoud het afgedrukte totaal van de functieaanroep.",
        ],
        'float_equal is False and decimal_equal is True and _stdout.strip() == "0.30"',
        [
          [
            "Both expressions ask the same decimal-looking question.",
            "Beide expressies stellen dezelfde decimaal ogende vraag.",
          ],
          [
            "Use == rather than = within the assigned expression.",
            "Gebruik == in plaats van = binnen de toegewezen expressie.",
          ],
          ["float_equal = 0.1 + 0.2 == 0.3", "float_equal = 0.1 + 0.2 == 0.3"],
        ],
        [
          "Compare values using each representation; do not just store literal True and False.",
          "Vergelijk waarden met elke voorstelling; bewaar niet alleen letterlijk True en False.",
        ],
      ),
    ],
    note: [
      "The function converts once at its boundary. Integer quantities multiply Decimal values safely, and the representation retains the price’s decimal scale in this example.",
      "De functie zet één keer aan de grens om. Gehele aantallen vermenigvuldigen veilig met Decimal-waarden en de voorstelling behoudt in dit voorbeeld de decimale schaal van de prijs.",
    ],
    experiment: [
      'Compare Decimal("0.1") with Decimal(0.1). Print both to see the effect of converting through float first. Keep the string version in your function.',
      'Vergelijk Decimal("0.1") met Decimal(0.1). Druk beide af om het effect van eerst via float omzetten te zien. Behoud de stringversie in je functie.',
    ],
  }),
  lesson(6, 4, {
    explanation: [
      "Create a helper file that can be imported without starting a conversation. Each module has its own namespace.",
      "Maak een hulpbestand dat geïmporteerd kan worden zonder een gesprek te starten. Elke module heeft zijn eigen naamruimte.",
    ],
    sections: [
      {
        ...S(
          "local-modules module-scope",
          ["Two files, one program", "Twee bestanden, één programma"],
          [
            "A file named labels.py can be imported as labels. Top-level statements run when the module is first imported. Put reusable definitions there, and input or display in main.py. Access a module variable as labels.prefix; a same-named variable in main.py is separate. Imports in this workspace use flat filenames next to main.py.",
            "Een bestand labels.py kan als labels worden geïmporteerd. Opdrachten op het hoogste niveau worden uitgevoerd wanneer de module voor het eerst geïmporteerd wordt. Zet daar herbruikbare definities en plaats input of uitvoer in main.py. Lees een modulevariabele als labels.prefix; een gelijknamige variabele in main.py is apart. Imports in deze werkruimte gebruiken bestandsnamen naast main.py.",
          ],
          'import labels\nprefix = "Local"\nprint(labels.label("Ada"))\nprint(prefix)',
          "Hello Ada\nLocal\n",
          [
            "Why does the local prefix not change labels.prefix?",
            "Waarom verandert de lokale prefix labels.prefix niet?",
          ],
        ),
        exampleFiles: {
          "labels.py":
            'prefix = "Hello"\ndef label(name):\n    return prefix + " " + name\n',
        },
      },
    ],
    starter: {
      "main.py": "# Open helpers.py, add the helper, then import it here.\n",
      "helpers.py": "# Define base_fee and shipping here.\n",
    },
    solution: {
      "main.py":
        "import helpers\nbase_fee = 99\nprint(helpers.shipping(3))\nprint(base_fee)\n",
      "helpers.py":
        "base_fee = 2\ndef shipping(items):\n    return base_fee + items\n",
    },
    tasks: [
      C(
        "local-modules",
        [
          "In helpers.py set base_fee = 2 and define shipping(items), returning base_fee + items. Import helpers in main.py.",
          "Zet in helpers.py base_fee = 2 en definieer shipping(items), die base_fee + items teruggeeft. Importeer helpers in main.py.",
        ],
        "helpers.shipping(3) == 5",
        [
          [
            "The module name is the filename without .py.",
            "De modulenaam is de bestandsnaam zonder .py.",
          ],
          [
            "Use the file tab to edit definitions in helpers.py.",
            "Gebruik het bestandstabblad om definities in helpers.py te bewerken.",
          ],
          [
            "def shipping(items):\n    return base_fee + items",
            "def shipping(items):\n    return base_fee + items",
          ],
        ],
        [
          "Check the filename and keep importable code free of input calls.",
          "Controleer de bestandsnaam en houd importeerbare code vrij van input-aanroepen.",
        ],
        [
          F("shipping", [0], '_return == 2 and _stdout == ""', {
            module: "helpers",
          }),
          F("shipping", [7], "_return == 9", { module: "helpers" }),
        ],
      ),
      C(
        "module-scope",
        [
          "In main.py set a separate base_fee = 99. Print helpers.shipping(3), then this local base_fee. Importing helpers must not print.",
          "Stel in main.py een aparte base_fee = 99 in. Druk helpers.shipping(3) af en daarna deze lokale base_fee. helpers importeren mag niets afdrukken.",
        ],
        'base_fee == 99 and helpers.base_fee == 2 and _stdout == "5\n99\n"',
        [
          [
            "The two names belong to different modules.",
            "De twee namen horen bij verschillende modules.",
          ],
          [
            "Do not assign helpers.base_fee from main.py.",
            "Wijs helpers.base_fee niet vanuit main.py toe.",
          ],
          ["print(helpers.shipping(3))", "print(helpers.shipping(3))"],
        ],
        [
          "Changing main.py’s variable should leave the helper’s default untouched.",
          "De variabele van main.py wijzigen moet de standaard van de helper ongemoeid laten.",
        ],
        [
          F(
            "shipping",
            [1],
            '__import__("helpers").base_fee == 2 and _return == 3 and _stdout == ""',
            { module: "helpers" },
          ),
        ],
      ),
    ],
    note: [
      "Importing creates a namespace for the helper. main.py controls display; helpers.py provides a reusable calculation with its own module variable.",
      "Importeren maakt een naamruimte voor de helper. main.py beheert uitvoer; helpers.py levert een herbruikbare berekening met een eigen modulevariabele.",
    ],
    experiment: [
      "Change base_fee only in main.py, then only in helpers.py. Predict which printed line changes in each experiment.",
      "Wijzig base_fee alleen in main.py en daarna alleen in helpers.py. Voorspel welke uitvoerregel bij elk experiment verandert.",
    ],
  }),
  lesson(6, 5, {
    explanation: [
      "Connect a caller to a helper you design. A movement helper will be reusable in the upcoming game: it must know nothing about input, drawing or printing.",
      "Verbind een aanroeper met een helper die je ontwerpt. Een bewegingshelper wordt herbruikbaar in het komende spel: die mag niets weten over invoer, tekenen of afdrukken.",
    ],
    sections: [
      {
        ...S(
          "module-review",
          ["Keep a module focused", "Houd een module gericht"],
          [
            "A module boundary works best when the caller supplies the data and the helper returns an answer. Import through an alias when a short name makes calls easier to read. Test the helper with different arguments before connecting a user interface.",
            "Een modulegrens werkt het best als de aanroeper gegevens meegeeft en de helper een antwoord teruggeeft. Importeer met een alias wanneer een korte naam aanroepen leesbaarder maakt. Test de helper met verschillende argumenten voordat je een gebruikersinterface aansluit.",
          ],
          "import measures as m\nprint(m.double(4))",
          "8\n",
          ["Which file owns printing?", "Welk bestand beheert het afdrukken?"],
        ),
        exampleFiles: {
          "measures.py": "def double(value):\n    return value * 2\n",
        },
      },
    ],
    starter: {
      "main.py":
        "# Import motion as m, call moved, unpack and print the position.\n",
      "motion.py": "def moved(x, y, dx=0, dy=0):\n    pass\n",
    },
    solution: {
      "motion.py": "def moved(x, y, dx=0, dy=0):\n    return x + dx, y + dy\n",
      "main.py":
        "import motion as m\nx, y = m.moved(10, 20, dy=-3)\nprint(x, y)\n",
    },
    tasks: [
      C(
        "module-review",
        [
          "In motion.py implement moved(x, y, dx=0, dy=0), returning a tuple with displaced coordinates and no printed output.",
          "Implementeer in motion.py moved(x, y, dx=0, dy=0), die een tuple met verplaatste coördinaten teruggeeft zonder uitvoer af te drukken.",
        ],
        "m.moved(1,2) == (1,2)",
        [
          [
            "Combine the tuple-return and default-argument ideas.",
            "Combineer tupleteruggave en standaardargumenten.",
          ],
          [
            "Use only parameters inside the helper.",
            "Gebruik alleen parameters binnen de helper.",
          ],
          ["return x + dx, y + dy", "return x + dx, y + dy"],
        ],
        [
          "A module import should not start a program or print.",
          "Een module-import mag geen programma starten of afdrukken.",
        ],
        [
          F("moved", [2, 3, -5, 4], '_return == (-3,7) and _stdout == ""', {
            module: "motion",
          }),
          F("moved", [0, 0], "_return == (0,0)", { module: "motion" }),
        ],
      ),
      C(
        "module-review",
        [
          "Import motion as m in main.py. Unpack m.moved(10, 20, dy=-3) into x and y, then print them.",
          "Importeer motion als m in main.py. Pak m.moved(10, 20, dy=-3) uit in x en y en druk ze af.",
        ],
        'x == 10 and y == 17 and _stdout.strip() == "10 17"',
        [
          [
            "The named argument skips the default dx.",
            "Het benoemde argument slaat de standaard dx over.",
          ],
          [
            "Use module.function to call through the alias.",
            "Gebruik module.functie om via de alias aan te roepen.",
          ],
          ["x, y = m.moved(10, 20, dy=-3)", "x, y = m.moved(10, 20, dy=-3)"],
        ],
        [
          "Keep the helper in its own file and display only in the caller.",
          "Houd de helper in zijn eigen bestand en uitvoer alleen in de aanroeper.",
        ],
      ),
    ],
    note: [
      "The helper accepts any numeric coordinates and optional displacements. Its caller chooses one example and owns presentation, so the same helper can later serve a game.",
      "De helper accepteert alle numerieke coördinaten en optionele verplaatsingen. De aanroeper kiest een voorbeeld en beheert de presentatie, zodat dezelfde helper later een spel kan dienen.",
    ],
    experiment: [
      "Call the helper twice with different defaults and print both results. Reopen the Decimal lesson and explain why converting to float first changes its arithmetic contract.",
      "Roep de helper twee keer aan met verschillende standaarden en druk beide resultaten af. Open de Decimal-les opnieuw en leg uit waarom eerst naar float omzetten de rekenafspraak verandert.",
    ],
  }),
];
