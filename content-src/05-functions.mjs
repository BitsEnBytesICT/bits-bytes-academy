import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
} from "./helpers.mjs";
const g = "intro-to-functions";
R(
  g,
  1,
  "A function groups a useful operation under a name. Define it once, then call it whenever that behavior is needed. Parameters supply inputs; return sends a result back to the caller.",
  "Een function groepeert een nuttige bewerking onder een naam. Definieer deze één keer en roep haar aan wanneer je dat gedrag nodig hebt. Parameters leveren invoer; return geeft een resultaat terug aan de aanroeper.",
  'def greet():\n    print("Welcome, explorer!")\n\ngreet()\n',
  { titleNl: "Functions ontdekken" },
);
L(
  g,
  2,
  "A function reduces duplication and gives a repeated action a meaningful name. Calling the same function several times reuses the same instructions without copying its body.",
  "Een function vermindert dubbele code en geeft een herhaalde actie een duidelijke naam. Meerdere aanroepen hergebruiken dezelfde instructies zonder de body te kopiëren.",
  "Define show_status() to print Ready. Call it twice.",
  "Definieer show_status() zodat deze Ready afdrukt. Roep de function twee keer aan.",
  'def show_status():\n    print("Ready")\n\nshow_status()\nshow_status()\n',
  "callable(show_status) and _stdout.splitlines() == ['Ready','Ready']",
  { titleNl: "Dubbele code voorkomen" },
);
L(
  g,
  3,
  "Use def, a function name, parentheses, and a colon to define a function. Its body must be indented. Defining the function does not execute the body immediately.",
  "Gebruik def, een functienaam, haakjes en een dubbele punt om een function te definiëren. De body moet inspringen. De definitie voert de body nog niet direct uit.",
  "Define announce() to print System ready. Do not call it yet.",
  "Definieer announce() zodat deze System ready afdrukt. Roep de function nog niet aan.",
  'def announce():\n    print("System ready")\n',
  "callable(announce) and _stdout == ''",
  {
    example: 'def wave():\n    print("Hello")',
    titleNl: "Een function definiëren",
  },
);
L(
  g,
  4,
  "Call a function by writing its name followed by parentheses. Python runs the body, then continues on the next line after the call. A bare name refers to the function without calling it.",
  "Roep een function aan met de naam gevolgd door haakjes. Python voert de body uit en gaat daarna verder na de aanroep. Alleen de naam verwijst naar de function zonder haar uit te voeren.",
  "Call announce() and then print Complete.",
  "Roep announce() aan en druk daarna Complete af.",
  'def announce():\n    print("System ready")\n\nannounce()\nprint("Complete")\n',
  "_stdout.splitlines() == ['System ready','Complete']",
  {
    starter: 'def announce():\n    print("System ready")\n\n',
    titleNl: "Een function aanroepen",
  },
);
L(
  g,
  5,
  "Indentation separates a function body from surrounding code. A line outside the body runs as the script reaches it, while an indented line waits for a call.",
  "Inspringing scheidt de body van een function van omliggende code. Een regel buiten de body draait zodra het script die bereikt; een ingesprongen regel wacht op een aanroep.",
  "Make prepare() print Check and Pack. Print Begin before calling prepare(), and Done afterward.",
  "Laat prepare() Check en Pack afdrukken. Druk Begin af vóór de aanroep en Done erna.",
  'def prepare():\n    print("Check")\n    print("Pack")\n\nprint("Begin")\nprepare()\nprint("Done")\n',
  "_stdout.splitlines() == ['Begin','Check','Pack','Done'] and callable(prepare)",
  { titleNl: "Inspringing en volgorde" },
);
L(
  g,
  6,
  "A parameter is a name in a function definition. An argument is the value supplied during a call. Each call can supply a different value to the same parameter.",
  "Een parameter is een naam in de function-definitie. Een argument is de waarde die je bij de aanroep meegeeft. Elke aanroep kan een andere waarde aan dezelfde parameter geven.",
  "Define label(name) to return Station: followed by a space and name. Test it with Pier.",
  "Definieer label(name) zodat Station: gevolgd door een spatie en name wordt teruggegeven. Test met Pier.",
  'def label(name):\n    return "Station: " + name\n\nprint(label("Pier"))\n',
  "label('Pier') == 'Station: Pier' and label('Forest') == 'Station: Forest'",
  {
    example: "def double(number):\n    return number * 2",
    titleNl: "Parameters en arguments",
  },
);
L(
  g,
  7,
  "Separate multiple parameters with commas. Positional arguments are matched in the same order. A function can combine inputs while keeping its calculation reusable.",
  "Scheid meerdere parameters met komma’s. Positional arguments worden in dezelfde volgorde gekoppeld. Een function kan invoer combineren en de berekening herbruikbaar houden.",
  "Define travel_time(distance, speed) to return distance divided by speed.",
  "Definieer travel_time(distance, speed) die distance gedeeld door speed teruggeeft.",
  "def travel_time(distance, speed):\n    return distance / speed\n\nprint(travel_time(90, 30))\n",
  "travel_time(90,30) == 3 and travel_time(24,8) == 3 and travel_time(10,4) == 2.5",
  { titleNl: "Meerdere parameters" },
);
L(
  g,
  8,
  "Arguments can be matched by position or by keyword. A default value is used when an argument is omitted. Required parameters must come before ordinary parameters with defaults.",
  "Arguments worden gekoppeld op positie of via een keyword. Een default value wordt gebruikt als een argument ontbreekt. Verplichte parameters staan vóór gewone parameters met defaults.",
  "Define ticket(price, quantity=1) to return their product. Store ticket(6) in single and ticket(quantity=3, price=6) in group.",
  "Definieer ticket(price, quantity=1) die het product teruggeeft. Sla ticket(6) op in single en ticket(quantity=3, price=6) in group.",
  "def ticket(price, quantity=1):\n    return price * quantity\n\nsingle = ticket(6)\ngroup = ticket(quantity=3, price=6)\nprint(single, group)\n",
  "single == 6 and group == 18 and ticket(7) == 7 and ticket(quantity=4,price=2) == 8",
  { titleNl: "Positional, keyword en default arguments" },
);
L(
  g,
  9,
  "Built-in functions such as len, min, max, and sum are already available. Your own functions can combine them into an operation that matches a particular task.",
  "Built-in functions zoals len, min, max en sum zijn direct beschikbaar. Je eigen functions kunnen ze combineren tot een bewerking voor een specifieke taak.",
  "Define spread(values) to return the maximum minus the minimum. Assume values is nonempty.",
  "Definieer spread(values) die het maximum min het minimum teruggeeft. Neem aan dat values niet leeg is.",
  "def spread(values):\n    return max(values) - min(values)\n\nprint(spread([4, 9, 6]))\n",
  "spread([4,9,6]) == 5 and spread([-3,8,2]) == 11 and spread([7]) == 0",
  { titleNl: "Built-ins combineren" },
);
L(
  g,
  10,
  "Names assigned inside a function are normally local to that call. A local name can have the same spelling as an outer name without changing the outer value. Return a value when it must leave the function.",
  "Namen die je binnen een function toewijst, zijn normaal lokaal voor die aanroep. Een lokale naam kan dezelfde spelling hebben als een buitenste naam zonder die buitenste waarde te wijzigen. Gebruik return om een waarde mee naar buiten te geven.",
  "Keep outer level = 5. Define next_level() with a local level = 8 and return it. Store the call result in result.",
  "Houd buiten de function level = 5. Definieer next_level() met een lokale level = 8 en geef deze terug. Sla de aanroep op in result.",
  "level = 5\ndef next_level():\n    level = 8\n    return level\n\nresult = next_level()\nprint(level, result)\n",
  "level == 5 and result == 8 and next_level() == 8",
  { titleNl: "Variable scope" },
);
L(
  g,
  11,
  "return ends a function call and gives a value back to its caller. Printing only displays information; it does not provide the same return value. A function with no explicit return returns None.",
  "return beëindigt een function-aanroep en geeft een waarde terug. print toont informatie, maar levert niet dezelfde return value. Een function zonder expliciete return geeft None terug.",
  "Define usable(total, reserved) to return the difference. Store usable(30, 7) in available.",
  "Definieer usable(total, reserved) die het verschil teruggeeft. Sla usable(30, 7) op in available.",
  "def usable(total, reserved):\n    return total - reserved\n\navailable = usable(30, 7)\nprint(available)\n",
  "available == 23 and usable(9,4) == 5 and usable(4,4) == 0",
  { titleNl: "Return values" },
);
L(
  g,
  12,
  "A function can return several values separated by commas; Python packs them into a tuple. Assigning to the same number of names unpacks the values in order.",
  "Een function kan meerdere waarden teruggeven, gescheiden door komma’s. Python verpakt deze in een tuple. Met evenveel namen aan de linkerkant pak je de waarden in volgorde uit.",
  "Define bounds(values) to return min(values), max(values). Unpack bounds([8, 2, 6]) into low and high.",
  "Definieer bounds(values) die min(values), max(values) teruggeeft. Pak bounds([8, 2, 6]) uit in low en high.",
  "def bounds(values):\n    return min(values), max(values)\n\nlow, high = bounds([8, 2, 6])\nprint(low, high)\n",
  "low == 2 and high == 8 and bounds([5,9,1]) == (1,9)",
  { titleNl: "Meerdere return values" },
);
L(
  g,
  13,
  "Build larger behavior by composing small functions. Each function should have a clear input and result. Test with more than one input so a hard-coded answer cannot hide a mistake.",
  "Bouw groter gedrag door kleine functions te combineren. Elke function heeft een duidelijke invoer en uitkomst. Test met meerdere waarden, zodat een vast antwoord geen fout kan verbergen.",
  "Define average(values) as sum divided by length. Define describe(values) to return a tuple of length, average, and maximum. Assume a nonempty list.",
  "Definieer average(values) als som gedeeld door lengte. Definieer describe(values) die een tuple met lengte, gemiddelde en maximum teruggeeft. Neem een niet-lege list aan.",
  "def average(values):\n    return sum(values) / len(values)\n\ndef describe(values):\n    return len(values), average(values), max(values)\n\nprint(describe([2, 4, 9]))\n",
  "average([2,4,9]) == 5 and describe([2,4,9]) == (3,5,9) and describe([8]) == (1,8,8)",
  { titleNl: "Terugblik: functions" },
);
Q(g, [
  P(
    "def double(x):\n    return x * 2\nprint(double(6))",
    ["12", "6", "None"],
    "The argument 6 is assigned to x, then multiplied by 2.",
    "Het argument 6 wordt aan x gekoppeld en daarna met 2 vermenigvuldigd.",
  ),
  [
    "What happens when a function is defined but not called?",
    "Wat gebeurt er als je een function definieert maar niet aanroept?",
    "",
    [
      ["Its body does not run yet", "De body wordt nog niet uitgevoerd"],
      ["Its body runs once", "De body wordt één keer uitgevoerd"],
      ["Python raises an error", "Python geeft een fout"],
    ],
    "def creates the function; a call executes its body.",
    "def maakt de function; een aanroep voert de body uit.",
  ],
  P(
    "def scale(x, factor=3):\n    return x * factor\nprint(scale(4))",
    ["12", "4", "3"],
    "The omitted factor uses its default value of 3.",
    "De ontbrekende factor gebruikt de default value 3.",
  ),
  P(
    "def difference(a, b):\n    return a - b\nprint(difference(b=2, a=9))",
    ["7", "-7", "11"],
    "Keywords bind values by parameter name, regardless of their call order.",
    "Keywords koppelen waarden op parameternaam, ongeacht de volgorde bij de aanroep.",
  ),
  P(
    "x = 4\ndef work():\n    x = 9\nwork()\nprint(x)",
    ["4", "9", "None"],
    "The assignment inside work is local and does not replace outer x.",
    "De assignment binnen work is lokaal en vervangt de buitenste x niet.",
  ),
  P(
    "def empty():\n    pass\nprint(empty())",
    ["None", "0", "False"],
    "A function without an explicit returned value returns None.",
    "Een function zonder expliciete return value geeft None terug.",
  ),
  P(
    "def pair():\n    return 3, 8\na, b = pair()\nprint(b)",
    ["8", "3", "(3, 8)"],
    "Unpacking assigns the second tuple value to b.",
    "Uitpakken wijst de tweede tuplewaarde toe aan b.",
  ),
]);
