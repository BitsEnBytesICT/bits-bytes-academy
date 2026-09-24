import { focus } from "./focused.mjs";
import { call, output } from "./authoring.mjs";
const f = (slug, s) => focus(14, slug, s);
const files = (body) => ({
  "main.py": "import helper\nprint(helper.double(6))\n",
  "helper.py": body,
});
export const activities = [
  f("import", {
    title: [
      "Use a standard-library module",
      "Gebruik een standaardbibliotheekmodule",
    ],
    topics: "modules imports documentation",
    requires: "functions-review",
    why: [
      "Modules package reusable tools. Python includes a standard library, so many useful functions are already available.",
      "Modules bundelen herbruikbare gereedschappen. Python bevat een standaardbibliotheek; veel nuttige functies zijn dus al beschikbaar.",
    ],
    teach: [
      "import math makes the module available under the name math. math.sqrt(9) calls its square-root function. The dot selects a name from the module. Consult the official library reference for arguments, return values and exceptions; do not guess from a function’s name alone. Importing does not install a missing package.",
      "import math maakt de module beschikbaar onder de naam math. math.sqrt(9) roept de vierkantswortelfunctie aan. De punt kiest een naam uit de module. Bekijk de officiële bibliotheekreferentie voor argumenten, terugkeerwaarden en uitzonderingen; gok niet alleen op basis van een functienaam. Importeren installeert geen ontbrekend pakket.",
    ],
    rule: [
      "Import the module, then use its documented tools.",
      "Importeer de module en gebruik daarna de beschreven gereedschappen.",
    ],
    example: "import math\nprint(math.sqrt(9))",
    output: "3.0\n",
    predict: [
      "What does the name before the dot identify?",
      "Wat benoemt de naam vóór de punt?",
    ],
    starter: "number = 16\n",
    solution:
      "import math\nnumber = 16\nresult = math.sqrt(number)\nprint(result)\n",
    tasks: [
      {
        task: [
          "Import math and print the square root of number using math.sqrt. Store it as result.",
          "Importeer math en druk de vierkantswortel van number af met math.sqrt. Bewaar die als result.",
        ],
        check: 'result == 4 and _stdout == "4.0\n"',
        help: [
          "The argument belongs inside the function call, after the module name.",
          "Het argument hoort binnen de functieaanroep, na de modulenaam.",
        ],
        fragment: "math.sqrt(number)",
        probes: [{ inputs: { number: 25 }, check: "result == 5" }],
      },
    ],
    change: [
      "Look up sqrt in the official math documentation and test zero.",
      "Zoek sqrt op in de officiële math-documentatie en test nul.",
    ],
    explain: [
      "math.sqrt returns a float; the module prefix makes the source of the function clear.",
      "math.sqrt geeft een float terug; het modulevoorvoegsel maakt de herkomst duidelijk.",
    ],
    sections: [
      {
        heading: { en: "Documentation", nl: "Documentatie" },
        body: {
          en: "[Python math reference](https://docs.python.org/3/library/math.html)",
          nl: "[Python math-referentie](https://docs.python.org/3/library/math.html)",
        },
      },
    ],
  }),
  f("selected-and-alias", {
    title: [
      "Import a function or choose an alias",
      "Importeer een functie of kies een alias",
    ],
    topics: "selected-imports aliases",
    requires: "imports",
    why: [
      "Import styles affect which names are available in the current file.",
      "Importstijlen bepalen welke namen in het huidige bestand beschikbaar zijn.",
    ],
    teach: [
      "from math import ceil brings only that function name into this file, so call ceil(2.3). import math as maths gives the module the local alias maths; call maths.floor(2.3). An alias changes the local name, not the tool. Avoid import * because it obscures where names came from.",
      "from math import ceil brengt alleen die functienaam in dit bestand, dus roep ceil(2.3) aan. import math as maths geeft de module lokaal de alias maths; roep maths.floor(2.3) aan. Een alias verandert de lokale naam, niet het gereedschap. Vermijd import * omdat het de herkomst van namen verbergt.",
    ],
    rule: [
      "The import statement determines the name used by the caller.",
      "De importinstructie bepaalt welke naam de aanroeper gebruikt.",
    ],
    example:
      "from math import ceil\nimport math as maths\nprint(ceil(2.3))\nprint(maths.floor(2.3))",
    output: "3\n2\n",
    predict: [
      "Why is math.ceil unavailable under the name math in this example?",
      "Waarom is math.ceil in dit voorbeeld niet beschikbaar onder de naam math?",
    ],
    starter:
      "from math import floor\nimport math as m\n# Complete the two calculations.\n",
    solution:
      "from math import floor\nimport math as m\nlower = floor(3.8)\nupper = m.ceil(3.8)\nprint(lower, upper)\n",
    tasks: [
      {
        task: [
          "Using the supplied imports, set lower to floor(3.8), upper to the ceiling, and print both.",
          "Gebruik de aangeleverde imports: zet lower op floor(3.8), upper op het naar boven afgeronde getal en druk beide af.",
        ],
        check: 'lower == 3 and upper == 4 and _stdout == "3 4\n"',
        help: [
          "The selected function is called directly; the aliased module needs its prefix.",
          "De geselecteerde functie roep je direct aan; de modulealias vereist zijn voorvoegsel.",
        ],
        fragment: "m.ceil(3.8)",
      },
    ],
    change: [
      "Change both inputs to -3.8 and predict floor versus ceiling.",
      "Verander beide invoerwaarden naar -3.8 en voorspel omlaag versus omhoog afronden.",
    ],
    explain: [
      "floor and m.ceil refer to tools from the same library through different local names.",
      "floor en m.ceil verwijzen via verschillende lokale namen naar gereedschappen uit dezelfde bibliotheek.",
    ],
  }),
  f("random", {
    title: ["Generate a random choice", "Maak een willekeurige keuze"],
    topics: "random",
    requires: "imports return lists",
    why: [
      "Random values make games less predictable. Tests should check the allowed outcomes rather than demand one lucky draw.",
      "Willekeurige waarden maken spellen minder voorspelbaar. Tests horen toegestane uitkomsten te controleren in plaats van één gelukkige trekking te eisen.",
    ],
    teach: [
      "random.randint(low, high) includes both endpoints. random.choice(items) selects one element from a nonempty sequence. Calling again may produce the same value: random does not mean always different. These tools are for games and simulations, not passwords or security.",
      "random.randint(low, high) omvat beide grenzen. random.choice(items) kiest één element uit een niet-lege reeks. Opnieuw aanroepen kan dezelfde waarde opleveren: willekeurig betekent niet altijd anders. Deze gereedschappen zijn voor spellen en simulaties, niet voor wachtwoorden of beveiliging.",
    ],
    rule: [
      "Test the set or range of valid outcomes.",
      "Test de verzameling of het bereik van geldige uitkomsten.",
    ],
    example:
      "import random\nvalue = random.randint(1, 6)\nprint(1 <= value <= 6)",
    output: "True\n",
    predict: [
      "Could two consecutive rolls both be 6?",
      "Kunnen twee opeenvolgende worpen beide 6 zijn?",
    ],
    starter: "import random\ndef roll():\n    return None\n",
    solution: "import random\ndef roll():\n    return random.randint(1, 6)\n",
    tasks: [
      {
        task: [
          "Implement roll() with random.randint to return an integer from 1 through 6.",
          "Implementeer roll() met random.randint om een geheel getal van 1 tot en met 6 terug te geven.",
        ],
        check:
          'callable(roll) and any(isinstance(n,_ast.Attribute) and n.attr == "randint" for n in _ast.walk(_ast.parse(_source)))',
        help: [
          "Both bounds belong in the randint call.",
          "Beide grenzen horen in de randint-aanroep.",
        ],
        fragment: "random.randint(1, 6)",
        probes: [
          call(
            "roll",
            [],
            "type(_return) is int and 1 <= _return <= 6 and len({roll() for _ in range(30)}) > 1",
          ),
        ],
      },
    ],
    change: [
      "Roll ten times and record repeats instead of treating them as failures.",
      "Werp tienmaal en noteer herhalingen in plaats van ze als fouten te zien.",
    ],
    explain: [
      "randint chooses from the inclusive integer range; repeated results are allowed.",
      "randint kiest uit het inclusieve bereik van gehele getallen; herhaalde resultaten zijn toegestaan.",
    ],
  }),
  f("repeatable-random", {
    title: ["Repeat a random experiment", "Herhaal een willekeurig experiment"],
    topics: "random-seed",
    requires: "random for",
    why: [
      "A repeatable random sequence helps reproduce a game bug or compare experiments.",
      "Een herhaalbare willekeurige reeks helpt een spelfout te reproduceren of experimenten te vergelijken.",
    ],
    teach: [
      "random.seed(value) restarts the generator from a known state. Repeating the same seed and calls in the same environment repeats the sequence. Seed once at the beginning of an experiment, not before every draw: reseeding each time repeatedly draws the first result.",
      "random.seed(value) herstart de generator vanuit een bekende toestand. Dezelfde seed en aanroepen in dezelfde omgeving herhalen de reeks. Stel de seed eenmaal aan het begin van een experiment in, niet vóór elke trekking: telkens opnieuw instellen trekt steeds het eerste resultaat.",
    ],
    rule: [
      "Seed once, then let the generator advance.",
      "Stel de seed eenmaal in en laat de generator daarna doorgaan.",
    ],
    example:
      "import random\nrandom.seed(12)\nfirst = random.random()\nrandom.seed(12)\nprint(first == random.random())",
    output: "True\n",
    predict: [
      "What is being reset by the second seed call?",
      "Wat wordt door de tweede seed-aanroep teruggezet?",
    ],
    starter: "import random\ndef draws(seed, count):\n    return []\n",
    solution:
      "import random\ndef draws(seed, count):\n    random.seed(seed)\n    result = []\n    for i in range(count):\n        result.append(random.randint(1, 6))\n    return result\n",
    tasks: [
      {
        task: [
          "Return count die rolls after setting the supplied seed once.",
          "Geef count dobbelsteenworpen terug nadat je de gegeven seed eenmaal hebt ingesteld.",
        ],
        check: "callable(draws)",
        help: [
          "Set the seed before the loop, and append each new draw.",
          "Stel de seed vóór de lus in en voeg elke nieuwe trekking toe.",
        ],
        fragment: "random.seed(seed)",
        probes: [
          call(
            "draws",
            [12, 6],
            "_return == draws(12,6) and len(_return) == 6 and len(set(_return)) > 1 and all(1 <= v <= 6 for v in _return)",
          ),
          call("draws", [1, 0], "_return == []"),
        ],
      },
    ],
    change: [
      "Compare two seeds, keeping the number of draws fixed.",
      "Vergelijk twee seeds en houd het aantal trekkingen gelijk.",
    ],
    explain: [
      "Reinitialising once reproduces an entire sequence while still allowing varied draws.",
      "Eenmaal opnieuw instellen reproduceert een hele reeks terwijl trekkingen kunnen variëren.",
    ],
  }),
  f("decimal", {
    title: [
      "Use decimal arithmetic deliberately",
      "Gebruik decimale berekeningen bewust",
    ],
    topics: "decimal",
    requires: "selected-imports floats str-conversion",
    why: [
      "Binary floats cannot represent every decimal fraction exactly. Decimal is useful when decimal arithmetic is part of the requirement.",
      "Binaire floats kunnen niet elke decimale breuk exact voorstellen. Decimal is nuttig wanneer decimale berekening een vereiste is.",
    ],
    teach: [
      'from decimal import Decimal imports a decimal number type. Construct it from a string such as Decimal("0.1") to preserve the written decimal value. Decimal(0.1) first receives an already approximated float. Decimal arithmetic still has a configurable precision; it is not unlimited exact arithmetic. Keep Decimal operations separate from floats.',
      'from decimal import Decimal importeert een decimaal getaltype. Maak het vanuit een string zoals Decimal("0.1") om de geschreven decimale waarde te bewaren. Decimal(0.1) ontvangt eerst een al benaderde float. Decimal-berekeningen hebben nog steeds een instelbare precisie; het is geen onbeperkt exacte rekenkunde. Houd Decimal-bewerkingen gescheiden van floats.',
    ],
    rule: [
      "Build Decimal from the original numeric text.",
      "Maak Decimal vanuit de oorspronkelijke getaltekst.",
    ],
    example:
      'from decimal import Decimal\nprint(0.1 + 0.2 == 0.3)\nprint(Decimal("0.1") + Decimal("0.2"))',
    output: "False\n0.3\n",
    predict: [
      "Why do the Decimal arguments have quotation marks?",
      "Waarom staan de Decimal-argumenten tussen aanhalingstekens?",
    ],
    starter:
      "from decimal import Decimal\ndef add_prices(first, second):\n    return None\n",
    solution:
      "from decimal import Decimal\ndef add_prices(first, second):\n    return Decimal(first) + Decimal(second)\n",
    tasks: [
      {
        task: [
          "Given two valid decimal strings, return their Decimal sum without first converting to float.",
          "Geef van twee geldige decimale strings hun Decimal-som terug zonder eerst naar float om te zetten.",
        ],
        check: "callable(add_prices)",
        help: [
          "Construct each Decimal directly from its text argument.",
          "Maak elke Decimal direct vanuit zijn tekstargument.",
        ],
        fragment: "Decimal(first)",
        probes: [
          call(
            "add_prices",
            ["0.1", "0.2"],
            'type(_return).__name__ == "Decimal" and str(_return) == "0.3"',
          ),
          call("add_prices", ["2.50", "-0.25"], 'str(_return) == "2.25"'),
        ],
      },
    ],
    change: [
      'Compare Decimal("0.1") with Decimal(0.1) by printing both.',
      'Vergelijk Decimal("0.1") met Decimal(0.1) door beide af te drukken.',
    ],
    explain: [
      "The original text avoids importing a binary floating-point approximation.",
      "De oorspronkelijke tekst voorkomt dat een binaire floatingpointbenadering wordt overgenomen.",
    ],
  }),
  f("helper-files", {
    title: [
      "Put reusable code in another file",
      "Zet herbruikbare code in een ander bestand",
    ],
    topics: "helper-modules module-scope installing",
    requires: "imports scope",
    why: [
      "Separate files help organise reusable behaviour. A module has its own names and scope.",
      "Aparte bestanden helpen herbruikbaar gedrag organiseren. Een module heeft zijn eigen namen en bereik.",
    ],
    teach: [
      "A file helper.py can be imported with import helper from the same workspace. Do not include .py in the import. Use helper.double(...) to call its function. The imported file executes its top-level statements on its first import; keep demonstrations in the caller so imports do not unexpectedly ask for input. Names in helper are accessed through helper, not automatically copied into the caller. The browser already supplies Python and Pygame. On your computer installing obtains a package; importing makes an installed package available to a file. Module 24 covers installation.",
      "Een bestand helper.py kun je importeren met import helper vanuit dezelfde werkruimte. Zet .py niet in de import. Gebruik helper.double(...) om de functie aan te roepen. Het geïmporteerde bestand voert hoofdinstructies bij de eerste import uit; houd demonstraties bij de aanroeper zodat imports niet onverwacht invoer vragen. Namen in helper benader je via helper; ze worden niet automatisch naar de aanroeper gekopieerd. De browser levert Python en Pygame al. Op je computer haalt installeren een pakket op; importeren maakt een geïnstalleerd pakket beschikbaar voor een bestand. Module 24 behandelt installatie.",
    ],
    rule: [
      "Keep reusable definitions in the helper and the conversation in the caller.",
      "Houd herbruikbare definities in de hulp en het gesprek bij de aanroeper.",
    ],
    example: "import math\nprint(math.pi > 3)",
    output: "True\n",
    predict: [
      "Does import copy every math name into this file?",
      "Kopieert import elke math-naam naar dit bestand?",
    ],
    starter: files("def double(value):\n    return None\n"),
    solution: files("def double(value):\n    return value * 2\n"),
    tasks: [
      {
        task: [
          "Open helper.py and implement double(value). Leave the supplied main.py caller working.",
          "Open helper.py en implementeer double(value). Houd de aangeleverde aanroeper main.py werkend.",
        ],
        check: output("12\n"),
        help: [
          "Edit the definition in helper.py, not the argument in the caller.",
          "Bewerk de definitie in helper.py, niet het argument bij de aanroeper.",
        ],
        fragment: "return value * 2",
        probes: [
          call("double", [-3], "_return == -6", { module: "helper" }),
          call("double", [0], "_return == 0", { module: "helper" }),
        ],
      },
    ],
    change: [
      "Add another call in main.py with a different argument. Explain which file owns the function.",
      "Voeg in main.py nog een aanroep toe met een ander argument. Leg uit welk bestand de functie bevat.",
    ],
    explain: [
      "Importing helper exposes its function through the module name; parameters keep each call independent.",
      "helper importeren stelt de functie via de modulenaam beschikbaar; parameters houden elke aanroep onafhankelijk.",
    ],
  }),
  f("guessing-game", {
    title: [
      "Mini project: number-guessing game",
      "Miniproject: raad het getal",
    ],
    topics: "guessing-project",
    practices: "random helper-modules retry-loops cancellation",
    requires: "helper-modules random recovery-review",
    kind: "challenge",
    guidance: "independent",
    minutes: 40,
    why: [
      "Combine a supplied random caller with your own repeated-input game.",
      "Combineer een aangeleverde willekeurige aanroeper met je eigen spel met herhaalde invoer.",
    ],
    teach: [
      "Write play(secret) in game.py. Ask Guess or quit: repeatedly. Invalid integers print Number needed and do not count as attempts. A valid guess counts once: print Higher if too small, Lower if too large, and Correct on a match. Return the number of valid guesses on success. quit (ignoring spaces/case) or end-of-input returns None. main.py chooses the secret with random.randint; tests use known secrets so failures are reproducible.",
      "Schrijf play(secret) in game.py. Vraag herhaaldelijk Guess or quit:. Ongeldige gehele getallen tonen Number needed en tellen niet als poging. Een geldige gok telt eenmaal: toon Higher bij te klein, Lower bij te groot en Correct bij een overeenkomst. Geef bij succes het aantal geldige gokken terug. quit (ongeacht spaties/hoofdletters) of einde invoer geeft None. main.py kiest het geheim met random.randint; tests gebruiken bekende geheimen zodat fouten herhaalbaar zijn.",
    ],
    rule: [
      "Separate the random choice from the deterministic game rules.",
      "Scheid de willekeurige keuze van de voorspelbare spelregels.",
    ],
    example:
      'def compare(guess, target):\n    if guess < target:\n        return "Higher"\n    if guess > target:\n        return "Lower"\n    return "Correct"\nprint(compare(3, 8))',
    output: "Higher\n",
    predict: [
      "Which comparison handles an exact match?",
      "Welke vergelijking verwerkt een exacte overeenkomst?",
    ],
    starter: {
      "main.py":
        "import random\nfrom game import play\nprint(play(random.randint(1, 10)))\n",
      "game.py":
        "# Implement play(secret) here.\ndef play(secret):\n    return None\n",
    },
    solution: {
      "main.py":
        "import random\nfrom game import play\nprint(play(random.randint(1, 10)))\n",
      "game.py":
        'def play(secret):\n    attempts = 0\n    while True:\n        try:\n            text = input("Guess or quit: ").strip().lower()\n        except EOFError:\n            return None\n        if text == "quit":\n            return None\n        try:\n            guess = int(text)\n        except ValueError:\n            print("Number needed")\n            continue\n        attempts += 1\n        if guess < secret:\n            print("Higher")\n        elif guess > secret:\n            print("Lower")\n        else:\n            print("Correct")\n            return attempts\n',
    },
    inputs: [],
    tasks: [
      {
        task: [
          "Implement the comparison loop and return the valid attempt count after a correct guess.",
          "Implementeer de vergelijkingslus en geef het aantal geldige pogingen terug na een juiste gok.",
        ],
        check: "True",
        help: [
          "Count only after successful int conversion, then compare with the parameter secret.",
          "Tel pas na geslaagde int-omzetting en vergelijk daarna met de parameter secret.",
        ],
        fragment: "attempts += 1",
        probes: [
          call(
            "play",
            [5],
            '_return == 3 and "Higher" in _call_stdout and "Lower" in _call_stdout and "Correct" in _call_stdout',
            { module: "game", stdin: ["2", "8", "5"] },
          ),
        ],
      },
      {
        task: [
          "Handle invalid input, quit and end-of-input without crashing.",
          "Verwerk ongeldige invoer, quit en einde invoer zonder te crashen.",
        ],
        check: "True",
        help: [
          "Keep the retry loop cancellable and do not count failed conversions.",
          "Houd de herhaling annuleerbaar en tel mislukte omzettingen niet.",
        ],
        fragment: "except EOFError:",
        probes: [
          call(
            "play",
            [4],
            '_return == 1 and "Number needed" in _call_stdout',
            { module: "game", stdin: ["bad", "4"] },
          ),
          call("play", [4], "_return is None and _error is None", {
            module: "game",
            stdin: [" QUIT "],
          }),
          call("play", [4], "_return is None and _error is None", {
            module: "game",
            stdin: [],
          }),
        ],
      },
    ],
    change: [
      "Play with a range of 1–20 by editing only the supplied caller.",
      "Speel met een bereik van 1–20 door alleen de aangeleverde aanroeper te wijzigen.",
    ],
    explain: [
      "The helper owns the conversation; the caller supplies the secret. Isolating randomness makes every branch testable.",
      "De hulpfunctie beheert het gesprek; de aanroeper levert het geheim. Willekeur isoleren maakt elke tak testbaar.",
    ],
  }),
];
