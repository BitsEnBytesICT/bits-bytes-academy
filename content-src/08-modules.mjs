import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
} from "./helpers.mjs";
const g = "modules-python";
L(
  g,
  1,
  "A module groups related Python definitions. import datetime binds the module name, then dot notation accesses its contents. Importing lets you use tested library code instead of rebuilding common tools.",
  "Een module groepeert verwante Python-definities. import datetime maakt de modulenaam beschikbaar; met een punt benader je de inhoud. Zo gebruik je bestaande bibliotheekcode voor veelvoorkomende taken.",
  "Import datetime. Create launch as the date 2030-04-12 and store its year in launch_year.",
  "Importeer datetime. Maak launch als datum 2030-04-12 en sla het jaar op in launch_year.",
  "import datetime\nlaunch = datetime.date(2030, 4, 12)\nlaunch_year = launch.year\nprint(launch)\n",
  "str(launch) == '2030-04-12' and launch_year == 2030",
  {
    example: "import datetime\nprint(datetime.date.today())",
    titleNl: "Modules importeren",
  },
);
L(
  g,
  2,
  "random provides pseudorandom choices. randint(a, b) includes both endpoints; choice(sequence) selects one element. A seed makes a sequence reproducible, which is useful when testing.",
  "random biedt pseudowillekeurige keuzes. randint(a, b) omvat beide grenzen; choice(sequence) kiest één element. Met een seed is de reeks reproduceerbaar, wat handig is bij testen.",
  "Import random. Create roll between 1 and 6 and selected from the list north, south, west.",
  "Importeer random. Maak roll tussen 1 en 6 en selected uit de list north, south, west.",
  'import random\nroll = random.randint(1, 6)\nselected = random.choice(["north", "south", "west"])\nprint(roll, selected)\n',
  "type(roll) is int and 1 <= roll <= 6 and selected in ['north','south','west']",
  { titleNl: "Willekeurige waarden" },
);
L(
  g,
  3,
  "as assigns a local alias to an imported module or name. An alias changes how you refer to it in your code, not the original module. Choose short names that still communicate their meaning.",
  "as geeft een lokale alias aan een geïmporteerde module of naam. De alias verandert de verwijzing in jouw code, niet de oorspronkelijke module. Kies korte namen die duidelijk blijven.",
  "Import math as maths. Use the alias to compute root as the square root of 81.",
  "Importeer math als maths. Bereken via de alias root als de vierkantswortel van 81.",
  "import math as maths\nroot = maths.sqrt(81)\nprint(root)\n",
  "root == 9 and maths.__name__ == 'math'",
  {
    example: "import datetime as dt\nprint(dt.date.today())",
    titleNl: "Import-aliases",
  },
);
L(
  g,
  4,
  "Binary floating-point cannot represent every decimal fraction exactly. Decimal can preserve exact decimal input when constructed from strings. Constructing it from a float preserves that float’s already-approximated value.",
  "Binaire floating-point kan niet elke decimale breuk exact voorstellen. Decimal kan exacte decimale invoer bewaren wanneer je strings gebruikt. Een Decimal uit een float neemt de al benaderde floatwaarde over.",
  'Import Decimal. Add Decimal("0.1") and Decimal("0.2") into exact_total.',
  'Importeer Decimal. Tel Decimal("0.1") en Decimal("0.2") op in exact_total.',
  'from decimal import Decimal\nexact_total = Decimal("0.1") + Decimal("0.2")\nprint(exact_total)\n',
  "str(exact_total) == '0.3' and type(exact_total).__name__ == 'Decimal'",
  {
    example: 'from decimal import Decimal\nprice = Decimal("2.40")',
    titleNl: "Exacte decimalen",
  },
);
L(
  g,
  5,
  "A Python file can be imported as a module using its filename without .py. Keep reusable definitions in the helper file and call them from the entrypoint. Each module has its own global namespace.",
  "Een Python-bestand kun je importeren als module met de bestandsnaam zonder .py. Zet herbruikbare definities in het helperbestand en roep ze aan vanuit het hoofdprogramma. Elke module heeft een eigen globale namespace.",
  "In helpers.py define to_minutes(hours) returning hours * 60. Import it in main.py and save to_minutes(2.5) as minutes.",
  "Definieer in helpers.py to_minutes(hours) die hours * 60 teruggeeft. Importeer deze in main.py en sla to_minutes(2.5) op in minutes.",
  "from helpers import to_minutes\nminutes = to_minutes(2.5)\nprint(minutes)\n",
  "minutes == 150 and to_minutes(1.25) == 75",
  {
    files: { "helpers.py": "# Define your helper here.\n" },
    solutionFiles: {
      "helpers.py": "def to_minutes(hours):\n    return hours * 60\n",
    },
    titleNl: "Een eigen module",
  },
);
R(
  g,
  6,
  "Use import module for a module-qualified name, from module import name for a selected definition, and as for an alias. Choose the form that makes the source of a function clear. Local modules use the same import system.",
  "Gebruik import module voor een naam met moduleprefix, from module import name voor een specifieke definitie en as voor een alias. Kies de vorm die de herkomst van een function duidelijk maakt. Lokale modules gebruiken hetzelfde importsysteem.",
  'from math import ceil\nimport random as rng\nprint(ceil(2.2))\nprint(rng.choice(["blue", "orange"]))\n',
  { titleNl: "Terugblik: imports" },
);
Q(g, [
  [
    "Which statement imports the whole math module?",
    "Welke statement importeert de hele math-module?",
    "",
    ["import math", "include math", "use math"],
    "Python uses import to load and bind a module.",
    "Python gebruikt import om een module te laden en beschikbaar te maken.",
  ],
  P(
    "import math\nprint(math.sqrt(16))",
    ["4.0", "8", "16"],
    "sqrt returns the square root as a float.",
    "sqrt geeft de vierkantswortel als float terug.",
  ),
  [
    "What does as do in an import?",
    "Wat doet as bij een import?",
    "",
    [
      ["Creates a local alias", "Maakt een lokale alias"],
      ["Copies the module file", "Kopieert het modulebestand"],
      ["Changes all function names", "Verandert alle functienamen"],
    ],
    "An alias changes the local name used to refer to the imported object.",
    "Een alias verandert de lokale naam waarmee je naar het geïmporteerde object verwijst.",
  ],
  P(
    "from math import floor\nprint(floor(4.9))",
    ["4", "5", "4.9"],
    "floor returns the greatest integer no larger than the input.",
    "floor geeft de grootste integer die niet groter is dan de invoer.",
  ),
  [
    "Which values can randint(2, 4) produce?",
    "Welke waarden kan randint(2, 4) geven?",
    "",
    ["2, 3, 4", "2, 3", "3, 4"],
    "randint includes both the lower and upper endpoints.",
    "randint omvat de ondergrens en de bovengrens.",
  ],
  [
    "What does random.choice return?",
    "Wat geeft random.choice terug?",
    "",
    [
      ["One element from the sequence", "Eén element uit de sequence"],
      ["The entire sequence shuffled", "De hele sequence geschud"],
      ["Always the first element", "Altijd het eerste element"],
    ],
    "choice selects one existing element.",
    "choice kiest één bestaand element.",
  ],
  [
    "Why use a random seed in a test?",
    "Waarom gebruik je een random seed bij een test?",
    "",
    [
      ["To reproduce the sequence", "Om de reeks te kunnen herhalen"],
      ["To guarantee security", "Om veiligheid te garanderen"],
      [
        "To remove randomness from every program",
        "Om willekeur uit elk programma te verwijderen",
      ],
    ],
    "A fixed seed makes the generator’s sequence reproducible, not cryptographically secure.",
    "Een vaste seed maakt de reeks reproduceerbaar, niet cryptografisch veilig.",
  ],
  P(
    'from decimal import Decimal\nprint(Decimal("0.2") + Decimal("0.3"))',
    ["0.5", "0.23", "0.6"],
    "String inputs preserve the intended decimal values.",
    "String-invoer bewaart de bedoelde decimale waarden.",
  ),
  [
    "Which import loads tools.py from the workspace?",
    "Welke import laadt tools.py uit de werkruimte?",
    "",
    ["import tools", "import tools.py", "open tools"],
    "Use the module name without the .py extension.",
    "Gebruik de modulenaam zonder de extensie .py.",
  ],
  P(
    "import math as m\nprint(m.ceil(2.1))",
    ["3", "2", "2.1"],
    "The alias m refers to math; ceil rounds upward to an integer.",
    "De alias m verwijst naar math; ceil rondt naar boven af tot een integer.",
  ),
  [
    "After from math import sqrt, how can sqrt be called directly?",
    "Hoe roep je sqrt direct aan na from math import sqrt?",
    "",
    ["sqrt(25)", "math(25)", "import.sqrt(25)"],
    "The selected name sqrt is bound in the current namespace.",
    "De gekozen naam sqrt is beschikbaar in de huidige namespace.",
  ],
  [
    "Which module supports calendar dates?",
    "Welke module ondersteunt kalenderdatums?",
    "",
    ["datetime", "random", "decimal"],
    "datetime provides date and time types.",
    "datetime bevat types voor datums en tijden.",
  ],
]);
