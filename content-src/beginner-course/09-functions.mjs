import { focus } from "./focused.mjs";
import { call, output } from "./authoring.mjs";
const f = (slug, s) => focus(9, slug, s);
export const activities = [
  f("define-and-call", {
    title: ["Give instructions a name", "Geef instructies een naam"],
    topics: "functions function-definition function-calls builtins",
    requires: "print indentation",
    why: [
      "Functions let you reuse a named set of instructions. You have already called built-in functions such as print and input; now define your own.",
      "Met functies hergebruik je een benoemde reeks instructies. Je hebt ingebouwde functies zoals print en input al aangeroepen; nu maak je zelf een functie.",
    ],
    teach: [
      "def starts a definition. After the name, () is an empty parameter list and : starts the indented body. Defining a function stores its instructions; it does not run that body. A later name() call runs it. Execution then resumes after the call. Blank lines improve readability but do not call anything.",
      "def begint een definitie. Na de naam is () een lege parameterlijst en : begint de ingesprongen inhoud. Een definitie bewaart instructies; de inhoud wordt nog niet uitgevoerd. Een latere aanroep naam() voert ze uit. Daarna gaat uitvoering verder na de aanroep. Lege regels verbeteren de leesbaarheid maar roepen niets aan.",
    ],
    rule: [
      "Define first, call when the behaviour is needed.",
      "Definieer eerst en roep aan wanneer het gedrag nodig is.",
    ],
    example:
      'def greet():\n    print("Hello")\n\nprint("Before")\ngreet()\nprint("After")',
    output: "Before\nHello\nAfter\n",
    predict: [
      "Which line would disappear if greet() were removed?",
      "Welke regel verdwijnt als greet() wordt verwijderd?",
    ],
    starter: "",
    solution:
      'def show_title():\n    print("Library")\n\nshow_title()\nshow_title()\n',
    tasks: [
      {
        task: [
          "Define show_title() to print Library.",
          "Definieer show_title() om Library af te drukken.",
        ],
        check: "callable(show_title)",
        help: [
          "Indent the print inside def, then test a call.",
          "Laat de print inspringen binnen def en test daarna een aanroep.",
        ],
        fragment: "def show_title():",
        probes: [
          call(
            "show_title",
            [],
            '_call_stdout == "Library\n" and _error is None',
          ),
        ],
      },
      {
        task: ["Call your function twice.", "Roep je functie tweemaal aan."],
        check: output("Library\nLibrary\n"),
        help: [
          "Place two calls outside the function body.",
          "Plaats twee aanroepen buiten de functie.",
        ],
        fragment: "show_title()",
      },
    ],
    change: [
      "Add a third call. Explain why you did not copy the function body.",
      "Voeg een derde aanroep toe. Leg uit waarom je de functie-inhoud niet kopieerde.",
    ],
    explain: [
      "The definition is stored once and the two calls each print one line.",
      "De definitie wordt eenmaal bewaard en de twee aanroepen drukken elk één regel af.",
    ],
  }),
  f("flow", {
    title: ["Follow a function call", "Volg een functieaanroep"],
    topics: "execution-flow",
    requires: "function-calls",
    why: [
      "A function temporarily changes where Python is executing. Trace the caller and body before adding code.",
      "Een functie verandert tijdelijk waar Python uitvoert. Volg de aanroeper en de inhoud voordat je code toevoegt.",
    ],
    teach: [
      "Python reads top-level statements in order. At a call it enters the already defined function, executes its indented body, then returns to the next caller statement. A print indented inside the body runs on every call; an unindented print runs when top-level execution reaches it.",
      "Python leest hoofdinstructies op volgorde. Bij een aanroep gaat het de al gedefinieerde functie binnen, voert de ingesprongen inhoud uit en keert terug naar de volgende instructie van de aanroeper. Een ingesprongen print draait bij elke aanroep; een niet-ingesprongen print draait wanneer de hoofduitvoering die bereikt.",
    ],
    rule: [
      "Indentation decides which instructions belong to the function.",
      "Inspringing bepaalt welke instructies bij de functie horen.",
    ],
    example:
      'def bell():\n    print("Ring")\nprint("Start")\nbell()\nprint("End")',
    output: "Start\nRing\nEnd\n",
    predict: [
      "Does defining bell print Ring immediately?",
      "Drukt het definiëren van bell direct Ring af?",
    ],
    starter:
      'def show():\n    print("Inside")\n    print("Finished")\nshow()\nshow()\n',
    solution:
      'def show():\n    print("Inside")\nshow()\nshow()\nprint("Finished")\n',
    tasks: [
      {
        task: [
          "Move Finished so it prints once, after both Inside lines.",
          "Verplaats Finished zodat het eenmaal verschijnt, na beide Inside-regels.",
        ],
        check: output("Inside\nInside\nFinished\n"),
        help: [
          "Keep only Inside in the function; place Finished after both calls.",
          "Houd alleen Inside in de functie; zet Finished na beide aanroepen.",
        ],
        fragment: "show()",
      },
    ],
    change: [
      "Predict what happens if the final print moves before the calls.",
      "Voorspel wat gebeurt als de laatste print vóór de aanroepen komt.",
    ],
    explain: [
      "The shared action stays in show; the finishing message belongs to the caller.",
      "De gedeelde actie blijft in show; het afsluitbericht hoort bij de aanroeper.",
    ],
    guidance: "adapt",
  }),
  f("parameters", {
    title: ["Pass a value into a function", "Geef een waarde aan een functie"],
    topics: "parameters-arguments",
    requires: "execution-flow variables",
    why: [
      "A parameter lets the same instructions work with different values.",
      "Een parameter laat dezelfde instructies met verschillende waarden werken.",
    ],
    teach: [
      'In def greet(name), name is a parameter: a local name waiting for a value. In greet("Bo"), "Bo" is the argument supplied by this call. The body uses that value for this call only. Parentheses in the definition describe inputs; parentheses in the call supply inputs.',
      'In def greet(name) is name een parameter: een lokale naam die op een waarde wacht. In greet("Bo") is "Bo" het argument van deze aanroep. De inhoud gebruikt die waarde alleen voor deze aanroep. Haakjes in de definitie beschrijven invoer; haakjes in de aanroep leveren invoer.',
    ],
    rule: [
      "A parameter receives the argument of each call.",
      "Een parameter ontvangt het argument van elke aanroep.",
    ],
    example:
      'def greet(name):\n    print("Hello", name)\ngreet("Bo")\ngreet("Mila")',
    output: "Hello Bo\nHello Mila\n",
    predict: [
      "Which value does name hold during the second call?",
      "Welke waarde heeft name tijdens de tweede aanroep?",
    ],
    starter: "",
    solution: 'def label(item):\n    print("Item:", item)\nlabel("Book")\n',
    tasks: [
      {
        task: [
          "Define label(item) to print Item: followed by a space and the supplied item. Call it with Book.",
          "Definieer label(item) om Item: gevolgd door een spatie en het gegeven item af te drukken. Roep aan met Book.",
        ],
        check: output("Item: Book\n"),
        help: [
          "Use the parameter in print instead of a fixed item name.",
          "Gebruik de parameter in print in plaats van een vaste itemnaam.",
        ],
        fragment: 'print("Item:", item)',
        probes: [
          call("label", ["Pen"], '_call_stdout == "Item: Pen\n"'),
          call("label", [""], '_call_stdout == "Item: \n"'),
        ],
      },
    ],
    change: [
      "Call label twice with different items.",
      "Roep label tweemaal aan met verschillende items.",
    ],
    explain: [
      "item is filled by each caller, so the function does not depend on Book.",
      "item wordt door elke aanroeper ingevuld; de functie is dus niet afhankelijk van Book.",
    ],
  }),
  f("multiple-parameters", {
    title: ["Use two arguments", "Gebruik twee argumenten"],
    topics: "multiple-parameters positional-arguments",
    requires: "parameters-arguments arithmetic",
    why: [
      "Many small calculations need more than one input.",
      "Veel kleine berekeningen hebben meer dan één invoer nodig.",
    ],
    teach: [
      "Separate parameters and arguments with commas. Positional arguments are matched left to right: the first argument becomes the first parameter. The number of required arguments must match. A parameter name describes its role, not its current value.",
      "Scheid parameters en argumenten met komma’s. Positionele argumenten worden van links naar rechts gekoppeld: het eerste argument wordt de eerste parameter. Het aantal verplichte argumenten moet kloppen. Een parameternaam beschrijft zijn rol, niet zijn huidige waarde.",
    ],
    rule: [
      "Check argument order against the definition.",
      "Controleer de argumentvolgorde met de definitie.",
    ],
    example:
      "def difference(first, second):\n    print(first - second)\ndifference(8, 3)\ndifference(3, 8)",
    output: "5\n-5\n",
    predict: [
      "Why does swapping the arguments change the result?",
      "Waarom verandert het resultaat als je argumenten omwisselt?",
    ],
    starter: "",
    solution:
      "def show_cost(price, quantity):\n    print(price * quantity)\nshow_cost(3, 4)\n",
    tasks: [
      {
        task: [
          "Define show_cost(price, quantity) to print their product. Call it with 3 and 4.",
          "Definieer show_cost(price, quantity) om hun product af te drukken. Roep aan met 3 en 4.",
        ],
        check: output("12\n"),
        help: [
          "Use both parameters in the expression.",
          "Gebruik beide parameters in de uitdrukking.",
        ],
        fragment: "def show_cost(price, quantity):",
        probes: [
          call("show_cost", [2.5, 2], '_call_stdout == "5.0\n"'),
          call("show_cost", [8, 0], '_call_stdout == "0\n"'),
        ],
      },
    ],
    change: [
      "Try quantity zero and explain the result.",
      "Probeer hoeveelheid nul en leg het resultaat uit.",
    ],
    explain: [
      "The same multiplication works for integer and fractional prices.",
      "Dezelfde vermenigvuldiging werkt voor gehele en gebroken prijzen.",
    ],
  }),
  f("return-values", {
    title: [
      "Return an answer to the caller",
      "Geef een antwoord terug aan de aanroeper",
    ],
    topics: "return",
    requires: "multiple-parameters",
    why: [
      "A returned value can be stored, printed or used in another calculation. Printing alone only displays text.",
      "Een teruggegeven waarde kun je bewaren, afdrukken of gebruiken in een berekening. Printen toont alleen tekst.",
    ],
    teach: [
      "return expression evaluates the expression and sends its value back to the call site. In result = double(4), the call is replaced by its returned value before assignment. return does not print. Keeping calculation separate from output makes it reusable in a terminal or a game.",
      "return uitdrukking berekent de uitdrukking en stuurt de waarde naar de aanroep terug. In result = double(4) wordt de aanroep vóór toewijzing vervangen door de teruggegeven waarde. return drukt niets af. Berekening scheiden van uitvoer maakt hergebruik in een terminal of spel mogelijk.",
    ],
    rule: [
      "Return data; let the caller choose how to display it.",
      "Geef gegevens terug; laat de aanroeper kiezen hoe ze worden getoond.",
    ],
    example:
      "def double(value):\n    return value * 2\nanswer = double(4)\nprint(answer + 1)",
    output: "9\n",
    predict: [
      "What is stored in answer before the print?",
      "Wat staat in answer vóór de print?",
    ],
    starter: "def area(width, height):\n    print(width * height)\n",
    solution: "def area(width, height):\n    return width * height\n",
    tasks: [
      {
        task: [
          "Change area to return width × height without printing.",
          "Verander area zodat die width × height teruggeeft zonder af te drukken.",
        ],
        check: "callable(area)",
        help: [
          "Replace the display operation with a return statement.",
          "Vervang de uitvoerbewerking door een return-instructie.",
        ],
        fragment: "return width * height",
        probes: [
          call("area", [3, 4], '_return == 12 and _call_stdout == ""'),
          call("area", [0, 8], "_return == 0"),
          call("area", [1.5, 2], "_return == 3"),
        ],
      },
    ],
    change: [
      "Store an area result and add a separate print in the caller.",
      "Bewaar een area-resultaat en voeg een aparte print toe bij de aanroeper.",
    ],
    explain: [
      "Returning preserves a numeric result for further work.",
      "Teruggeven bewaart een numeriek resultaat voor verder gebruik.",
    ],
    guidance: "adapt",
  }),
  f("none", {
    title: [
      "A function without a return value",
      "Een functie zonder terugkeerwaarde",
    ],
    topics: "none",
    requires: "return",
    why: [
      "Understanding None explains why assigning the result of print does not store the printed text.",
      "None begrijpen verklaart waarom het resultaat van print toewijzen de afgedrukte tekst niet bewaart.",
    ],
    teach: [
      'A function that reaches the end without return gives back None, Python’s value for absence. print also returns None. None is not zero or the string "None". Use is None to test this special value. A bare return ends a function with None as well.',
      'Een functie die eindigt zonder return geeft None terug: Pythons waarde voor afwezigheid. print geeft ook None terug. None is niet nul of de string "None". Gebruik is None om deze speciale waarde te testen. Een losse return beëindigt een functie ook met None.',
    ],
    rule: [
      "Displaying a value and returning it are separate actions.",
      "Een waarde tonen en teruggeven zijn aparte acties.",
    ],
    example:
      'def announce():\n    print("Ready")\nresult = announce()\nprint(result is None)',
    output: "Ready\nTrue\n",
    predict: [
      "Which line comes from the function body?",
      "Welke regel komt uit de functie-inhoud?",
    ],
    starter: "def triple(number):\n    print(number * 3)\n",
    solution: "def triple(number):\n    return number * 3\n",
    tasks: [
      {
        task: [
          "Repair triple so its caller receives the numeric result and no output is printed.",
          "Herstel triple zodat de aanroeper het numerieke resultaat ontvangt en niets wordt afgedrukt.",
        ],
        check: "callable(triple)",
        help: [
          "The current function prints, then implicitly returns None.",
          "De huidige functie drukt af en geeft daarna impliciet None terug.",
        ],
        fragment: "return number * 3",
        probes: [
          call("triple", [4], '_return == 12 and _call_stdout == ""'),
          call("triple", [-2], "_return == -6"),
        ],
      },
    ],
    change: [
      "Compare print(triple(0)) with triple(0) by itself.",
      "Vergelijk print(triple(0)) met alleen triple(0).",
    ],
    explain: [
      "Replacing print with return makes the function useful in expressions.",
      "print vervangen door return maakt de functie bruikbaar in uitdrukkingen.",
    ],
    guidance: "adapt",
  }),
  f("local-scope", {
    title: ["Keep a function independent", "Houd een functie onafhankelijk"],
    topics: "scope",
    requires: "return parameters-arguments",
    why: [
      "A function should use the inputs its caller supplies. An unrelated outside variable can hide a mistake.",
      "Een functie hoort de invoer van haar aanroeper te gebruiken. Een andere variabele buiten de functie kan een fout verbergen.",
    ],
    teach: [
      "A parameter and a name assigned inside a function are local to that call. The caller cannot read those local names directly. Python can read an outer name if no local name shadows it, but that can make a calculation depend on unrelated state. Pass needed values as arguments and return the answer.",
      "Een parameter en een naam die binnen een functie wordt toegewezen zijn lokaal voor die aanroep. De aanroeper kan die namen niet rechtstreeks lezen. Python kan een buitenliggende naam lezen als geen lokale naam die verbergt, maar daardoor kan een berekening afhankelijk worden van andere toestand. Geef benodigde waarden als argumenten mee en geef het antwoord terug.",
    ],
    rule: [
      "Make the result depend on parameters, not an accidental outside value.",
      "Laat het resultaat afhangen van parameters, niet van een toevallige buitenliggende waarde.",
    ],
    example:
      "value = 100\ndef increment(value):\n    value += 1\n    return value\nprint(increment(4))\nprint(value)",
    output: "5\n100\n",
    predict: [
      "Why does the outer value remain 100?",
      "Waarom blijft de buitenliggende value 100?",
    ],
    starter:
      "rate = 10\ndef charge(hours, hourly_rate):\n    return hours * rate\n",
    solution:
      "rate = 10\ndef charge(hours, hourly_rate):\n    return hours * hourly_rate\n",
    tasks: [
      {
        task: [
          "Repair charge to use its hourly_rate argument.",
          "Herstel charge zodat die het argument hourly_rate gebruikt.",
        ],
        check: "callable(charge)",
        help: [
          "Find the outside name in the expression and use the matching parameter.",
          "Zoek de buitenliggende naam in de uitdrukking en gebruik de bijbehorende parameter.",
        ],
        fragment: "hours * hourly_rate",
        probes: [
          call("charge", [2, 7], "_return == 14"),
          call("charge", [0, 20], "_return == 0"),
          call("charge", [1.5, 4], "_return == 6"),
        ],
      },
    ],
    change: [
      "Change the outer rate to 999. The function result should stay tied to its arguments.",
      "Verander de buitenliggende rate naar 999. Het functieresultaat hoort gekoppeld te blijven aan zijn argumenten.",
    ],
    explain: [
      "hourly_rate is local input; rate no longer influences this calculation.",
      "hourly_rate is lokale invoer; rate beïnvloedt deze berekening niet meer.",
    ],
    guidance: "adapt",
  }),
  f("named-and-default", {
    title: [
      "Optional inputs and named arguments",
      "Optionele invoer en benoemde argumenten",
    ],
    topics: "default-arguments keyword-arguments argument-types",
    requires: "scope multiple-parameters",
    why: [
      "Defaults make common calls short. Named arguments make less obvious calls readable.",
      "Standaardwaarden houden veelvoorkomende aanroepen kort. Benoemde argumenten maken minder duidelijke aanroepen leesbaar.",
    ],
    teach: [
      "In a definition, tax=2 gives tax a default when the caller omits it. In a call, tax=5 explicitly chooses a value by parameter name. Required parameters come before defaulted ones. Positional arguments must come before keyword arguments in a call. Supplying a value twice raises TypeError.",
      "In een definitie geeft tax=2 tax een standaardwaarde als de aanroeper die weglaat. In een aanroep kiest tax=5 expliciet een waarde via de parameternaam. Verplichte parameters komen vóór parameters met standaardwaarden. Positionele argumenten moeten vóór benoemde argumenten staan. Dezelfde waarde tweemaal meegeven veroorzaakt TypeError.",
    ],
    rule: [
      "A default is used only when that argument is omitted.",
      "Een standaardwaarde wordt alleen gebruikt als dat argument ontbreekt.",
    ],
    example:
      "def total(price, tax=2):\n    return price + tax\nprint(total(10))\nprint(total(price=10, tax=0))",
    output: "12\n10\n",
    predict: [
      "Why is the second result not 12?",
      "Waarom is het tweede resultaat niet 12?",
    ],
    starter: "",
    solution: "def delivery(price, fee=3):\n    return price + fee\n",
    tasks: [
      {
        task: [
          "Define delivery(price, fee=3) to return the price plus fee. Support both positional and named calls.",
          "Definieer delivery(price, fee=3) om prijs plus toeslag terug te geven. Ondersteun positionele en benoemde aanroepen.",
        ],
        check: "callable(delivery)",
        help: [
          "Put the default in the definition, not inside the calculation.",
          "Zet de standaardwaarde in de definitie, niet binnen de berekening.",
        ],
        fragment: "def delivery(price, fee=3):",
        probes: [
          call("delivery", [7], "_return == 10"),
          call("delivery", [7, 0], "_return == 7"),
          {
            call: { name: "delivery", args: [], kwargs: { fee: 2, price: 5 } },
            check: "_return == 7",
          },
        ],
      },
    ],
    change: [
      "Compare delivery(5, 1) with delivery(fee=1, price=5).",
      "Vergelijk delivery(5, 1) met delivery(fee=1, price=5).",
    ],
    explain: [
      "The default belongs to the interface; callers can override it explicitly.",
      "De standaardwaarde hoort bij de interface; aanroepers kunnen die expliciet vervangen.",
    ],
  }),
  f("early-return", {
    title: ["Stop a function at a guard", "Stop een functie bij een bewaking"],
    topics: "early-return",
    requires: "return if none",
    why: [
      "A guard handles a special case before the normal calculation.",
      "Een bewaking verwerkt een speciaal geval vóór de normale berekening.",
    ],
    teach: [
      "return immediately ends the current function call. Statements below that return do not run for that call. A guard can return None when no numeric answer is meaningful. This does not stop the whole program: the caller continues and can decide how to display the absence.",
      "return beëindigt direct de huidige functieaanroep. Instructies onder die return worden voor die aanroep niet uitgevoerd. Een bewaking kan None teruggeven wanneer geen numeriek antwoord zinvol is. Dit stopt niet het hele programma: de aanroeper gaat verder en kan beslissen hoe afwezigheid wordt getoond.",
    ],
    rule: [
      "Check the invalid case before the operation that needs valid data.",
      "Controleer het ongeldige geval vóór de bewerking die geldige gegevens nodig heeft.",
    ],
    example:
      "def average(total, count):\n    if count == 0:\n        return None\n    return total / count\nprint(average(10, 0))\nprint(average(10, 2))",
    output: "None\n5.0\n",
    predict: [
      "Is division reached for count zero?",
      "Wordt delen bereikt als count nul is?",
    ],
    starter: "def speed(distance, hours):\n    return distance / hours\n",
    solution:
      "def speed(distance, hours):\n    if hours <= 0:\n        return None\n    return distance / hours\n",
    tasks: [
      {
        task: [
          "Return None for hours at or below zero; otherwise return distance / hours.",
          "Geef None terug voor hours kleiner dan of gelijk aan nul; geef anders distance / hours terug.",
        ],
        check: "callable(speed)",
        help: [
          "Add a guard before the division.",
          "Voeg een bewaking vóór de deling toe.",
        ],
        fragment: "if hours <= 0:",
        probes: [
          call("speed", [12, 0], "_return is None and _error is None"),
          call("speed", [12, -1], "_return is None"),
          call("speed", [12, 2], "_return == 6"),
        ],
      },
    ],
    change: [
      "Store speed(0, 2). Explain why zero is a valid answer unlike None.",
      "Bewaar speed(0, 2). Leg uit waarom nul een geldig antwoord is, anders dan None.",
    ],
    explain: [
      "The guard exits before division; valid zero distance still returns numeric zero.",
      "De bewaking stopt vóór de deling; geldige afstand nul geeft nog steeds numerieke nul terug.",
    ],
    guidance: "adapt",
  }),
  f("ticket-function", {
    title: [
      "Build a reusable ticket calculation",
      "Bouw een herbruikbare ticketberekening",
    ],
    topics: "functions-review",
    practices: "return default-arguments scope early-return",
    requires: "early-return default-arguments",
    guidance: "independent",
    minutes: 22,
    why: [
      "Combine parameters, decisions and returns in a function another program could use.",
      "Combineer parameters, beslissingen en terugkeerwaarden in een functie die een ander programma kan gebruiken.",
    ],
    teach: [
      "Write down the input rules first. For ticket_total(count, price=4), a negative count is invalid and returns None; zero is valid and returns zero; otherwise multiply count by price. The function reads no input and prints nothing. Test the returned value from separate caller code. The example shows the same guard pattern in a different context.",
      "Schrijf eerst de invoerregels op. Voor ticket_total(count, price=4) is een negatief aantal ongeldig en geeft None; nul is geldig en geeft nul; vermenigvuldig anders count met price. De functie leest geen invoer en drukt niets af. Test de teruggegeven waarde vanuit aparte aanroepcode. Het voorbeeld toont hetzelfde bewakingspatroon in een andere context.",
    ],
    rule: [
      "A clear function contract names its inputs, output and exceptional cases.",
      "Een duidelijke functieafspraak benoemt invoer, uitvoer en uitzonderlijke gevallen.",
    ],
    example:
      "def remaining(stock, used=1):\n    if used < 0:\n        return None\n    return stock - used\nprint(remaining(8))",
    output: "7\n",
    predict: [
      "What would remaining(8, -1) return?",
      "Wat geeft remaining(8, -1) terug?",
    ],
    starter: "",
    solution:
      "def ticket_total(count, price=4):\n    if count < 0:\n        return None\n    return count * price\n",
    tasks: [
      {
        task: [
          "Implement ticket_total(count, price=4) using the stated contract.",
          "Implementeer ticket_total(count, price=4) volgens de beschreven afspraak.",
        ],
        check: "callable(ticket_total)",
        help: [
          "Separate the invalid-count guard from the normal product.",
          "Scheid de bewaking voor ongeldige aantallen van het gewone product.",
        ],
        fragment: "if count < 0:",
        probes: [
          call("ticket_total", [3], '_return == 12 and _call_stdout == ""'),
          call("ticket_total", [0], "_return == 0"),
          call("ticket_total", [-1], "_return is None"),
          call("ticket_total", [2, 2.5], "_return == 5"),
        ],
      },
    ],
    change: [
      "Add a named-argument test that overrides price.",
      "Voeg een test met benoemde argumenten toe die price vervangt.",
    ],
    explain: [
      "The independent function has one early exit and one reusable calculation, with no dependence on terminal input.",
      "De onafhankelijke functie heeft één vroege uitgang en één herbruikbare berekening, zonder afhankelijkheid van terminalinvoer.",
    ],
  }),
];
