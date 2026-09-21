import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
} from "./helpers.mjs";
const g = "learn-python-loops";
R(
  g,
  1,
  "A loop repeats a block of work. A for loop visits items in an iterable, while a while loop repeats as long as a condition remains true. Repetition lets a short program process a large collection.",
  "Een loop herhaalt een blok code. Een for loop bezoekt items in een iterable. Een while loop herhaalt zolang een voorwaarde waar blijft. Zo kan een kort programma een grote verzameling verwerken.",
  'for sensor in ["north", "south", "west"]:\n    print("Checking", sensor)\n',
  { titleNl: "Waarom loops?" },
);
L(
  g,
  2,
  "Repeated lines are difficult to maintain: a rule may need to be changed in several places. A loop expresses the rule once and applies it to each item.",
  "Herhaalde regels zijn lastig te onderhouden: dezelfde regel moet dan op meerdere plaatsen worden aangepast. Een loop beschrijft de regel één keer en past deze op elk item toe.",
  "Replace repeated prints with a loop over names. Print each name on its own line.",
  "Vervang herhaalde print-regels door een loop over names. Druk elke naam op een eigen regel af.",
  'names = ["East", "West", "North"]\nfor name in names:\n    print(name)\n',
  "_stdout.splitlines() == ['East','West','North'] and any(isinstance(n,_ast.For) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter:
      'names = ["East", "West", "North"]\nprint(names[0])\nprint(names[1])\nprint(names[2])\n',
    titleNl: "Herhaling vervangen",
  },
);
L(
  g,
  3,
  "for item in collection assigns each element to item in turn. The indented body runs once per element. Choose a loop variable name that describes one element.",
  "for item in collection wijst elk element om de beurt toe aan item. Het ingesprongen blok draait één keer per element. Kies een loopvariablenaam die één element beschrijft.",
  "For each code in codes, print Sensor followed by a space and that code.",
  "Druk voor elke code in codes Sensor af, gevolgd door een spatie en de code.",
  'codes = ["A1", "B2", "C3"]\nfor code in codes:\n    print("Sensor", code)\n',
  "_stdout.splitlines() == ['Sensor A1','Sensor B2','Sensor C3']",
  {
    starter: 'codes = ["A1", "B2", "C3"]\n',
    example: 'for fruit in ["pear", "plum"]:\n    print(fruit)',
    titleNl: "Een for loop",
  },
);
L(
  g,
  4,
  "Use range when you want a known number of iterations. The loop variable receives each integer in the range. The stop value is excluded.",
  "Gebruik range als je een vast aantal herhalingen wilt. De loopvariable krijgt elke integer uit de range. De stopwaarde telt niet mee.",
  "Print the integers 1 through 4, each on its own line, using range.",
  "Druk met range de integers 1 tot en met 4 af, elk op een eigen regel.",
  "for number in range(1, 5):\n    print(number)\n",
  "_stdout.splitlines() == ['1','2','3','4'] and 'range' in _source",
  { titleNl: "Herhalen met range" },
);
L(
  g,
  5,
  "A while loop checks its condition before every iteration. Update the state inside the loop so the condition can eventually become false. Otherwise it may never finish.",
  "Een while loop controleert vóór elke herhaling de voorwaarde. Werk de toestand binnen de loop bij, zodat de voorwaarde uiteindelijk onwaar kan worden. Anders stopt de loop mogelijk nooit.",
  "Start count at 0. Use while to print 0, 1, and 2, then finish with count equal to 3.",
  "Begin met count = 0. Gebruik while om 0, 1 en 2 af te drukken. Eindig met count gelijk aan 3.",
  "count = 0\nwhile count < 3:\n    print(count)\n    count += 1\n",
  "count == 3 and _stdout.splitlines() == ['0','1','2'] and any(isinstance(n,_ast.While) for n in _ast.walk(_ast.parse(_source)))",
  { titleNl: "Een while loop" },
);
L(
  g,
  6,
  "An index-controlled while loop can walk through a list. Check index < len(items), use the current element, then increment the index. Keeping these steps together prevents skipped or repeated entries.",
  "Een while loop met een index kan door een list lopen. Controleer index < len(items), gebruik het huidige element en verhoog de index. Houd die stappen bij elkaar om overslaan of herhalen te voorkomen.",
  "Use a while loop to total values into total. Finish with total equal to 15.",
  "Tel values met een while loop op in total. Eindig met total gelijk aan 15.",
  "values = [3, 5, 7]\nindex = 0\ntotal = 0\nwhile index < len(values):\n    total += values[index]\n    index += 1\nprint(total)\n",
  "total == 15 and index == 3",
  {
    starter: "values = [3, 5, 7]\nindex = 0\ntotal = 0\n",
    titleNl: "Een list met while doorlopen",
  },
);
R(
  g,
  7,
  "A loop is infinite if its condition never becomes false and nothing breaks out of it. Try changing the counter update below to see why it matters. Use Stop to cancel a runaway program; your editor stays usable.",
  "Een loop is oneindig als de voorwaarde nooit onwaar wordt en niets de loop afbreekt. Verander de tellerupdate hieronder om te onderzoeken waarom die nodig is. Gebruik Stop om een vastgelopen programma te stoppen; de editor blijft werken.",
  "counter = 0\nwhile counter < 3:\n    print(counter)\n    counter += 1\n",
  { titleNl: "Oneindige loops begrijpen" },
);
L(
  g,
  8,
  "break immediately exits the innermost loop. Statements after break in the same iteration are skipped. It is useful when a search has already found what it needs.",
  "break verlaat direct de binnenste loop. Regels na break in dezelfde herhaling worden overgeslagen. Dat is handig als een zoekactie haar doel al heeft gevonden.",
  "Find the first value above 10 in values, store it in found, and stop searching.",
  "Zoek de eerste waarde boven 10 in values, sla deze op in found en stop met zoeken.",
  "values = [4, 8, 12, 18]\nfound = None\nfor value in values:\n    if value > 10:\n        found = value\n        break\nprint(found)\n",
  "found == 12 and any(isinstance(n,_ast.Break) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter: "values = [4, 8, 12, 18]\nfound = None\n",
    titleNl: "Vroeg stoppen met break",
  },
);
L(
  g,
  9,
  "continue skips the rest of the current iteration and moves to the next one. Use it to ignore invalid entries without ending the entire loop.",
  "continue slaat de rest van de huidige herhaling over en gaat naar de volgende. Gebruik dit om ongeldige items over te slaan zonder de hele loop te stoppen.",
  "Skip negative values using continue and collect the others in valid.",
  "Sla negatieve waarden over met continue en verzamel de overige waarden in valid.",
  "values = [3, -1, 5, -2, 0]\nvalid = []\nfor value in values:\n    if value < 0:\n        continue\n    valid.append(value)\nprint(valid)\n",
  "valid == [3,5,0] and any(isinstance(n,_ast.Continue) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter: "values = [3, -1, 5, -2, 0]\nvalid = []\n",
    titleNl: "Een herhaling overslaan",
  },
);
L(
  g,
  10,
  "A nested loop runs its inner loop for each outer element. For a table, the outer loop selects a row and the inner loop selects values in that row.",
  "Een geneste loop voert de binnenste loop uit voor elk buitenste element. Bij een tabel kiest de buitenste loop een rij en de binnenste loop waarden in die rij.",
  "Use nested loops to add every grid value into total.",
  "Gebruik geneste loops om alle grid-waarden op te tellen in total.",
  "grid = [[2, 4], [6, 8]]\ntotal = 0\nfor row in grid:\n    for value in row:\n        total += value\nprint(total)\n",
  "total == 20 and sum(isinstance(n,_ast.For) for n in _ast.walk(_ast.parse(_source))) >= 2",
  { starter: "grid = [[2, 4], [6, 8]]\ntotal = 0\n", titleNl: "Geneste loops" },
);
L(
  g,
  11,
  "A list comprehension combines iteration and transformation in one expression: [expression for item in items]. It creates a new list and is best kept short and readable.",
  "Een list comprehension combineert herhaling en bewerking in één expressie: [expression for item in items]. Deze maakt een nieuwe list en blijft het duidelijkst als je de expressie kort houdt.",
  "Create doubled by doubling every value in raw with a list comprehension.",
  "Maak doubled door elke waarde in raw met een list comprehension te verdubbelen.",
  "raw = [2, 5, 8]\ndoubled = [value * 2 for value in raw]\nprint(doubled)\n",
  "doubled == [4,10,16] and any(isinstance(n,_ast.ListComp) for n in _ast.walk(_ast.parse(_source)))",
  { starter: "raw = [2, 5, 8]\n", titleNl: "Een list comprehension" },
);
L(
  g,
  12,
  "Add if condition at the end of a comprehension to filter input elements. Only matching elements contribute to the new list; the transformation still appears first.",
  "Voeg if condition toe aan het einde van een comprehension om invoerelementen te filteren. Alleen passende elementen komen in de nieuwe list; de bewerking staat nog steeds vooraan.",
  "Create positive_squares from the squares of values greater than zero in raw.",
  "Maak positive_squares met de kwadraten van waarden groter dan nul in raw.",
  "raw = [-2, 0, 3, 5]\npositive_squares = [value ** 2 for value in raw if value > 0]\nprint(positive_squares)\n",
  "positive_squares == [9,25] and any(isinstance(n,_ast.ListComp) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter: "raw = [-2, 0, 3, 5]\n",
    titleNl: "Filteren in een comprehension",
  },
);
L(
  g,
  13,
  "Combine iteration and conditions to process collections. Keep an accumulator outside the loop when it must survive across iterations. Build a new list when the original data should remain available.",
  "Combineer loops en voorwaarden om verzamelingen te verwerken. Zet een accumulator buiten de loop als deze tussen herhalingen bewaard moet blijven. Maak een nieuwe list als je de oorspronkelijke gegevens wilt behouden.",
  "Flatten batches into readings. Keep only positive readings in valid and compute their sum as total.",
  "Maak van batches één list readings. Bewaar alleen positieve metingen in valid en bereken hun som als total.",
  "batches = [[2, -1], [4, 0], [6]]\nreadings = []\nfor batch in batches:\n    for value in batch:\n        readings.append(value)\nvalid = [value for value in readings if value > 0]\ntotal = sum(valid)\nprint(valid, total)\n",
  "readings == [2,-1,4,0,6] and valid == [2,4,6] and total == 12",
  {
    starter: "batches = [[2, -1], [4, 0], [6]]\n",
    titleNl: "Terugblik: loops",
  },
);
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
