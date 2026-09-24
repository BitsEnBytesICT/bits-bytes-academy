import { lesson, S, C, F } from "./authoring.mjs";
export const activities = [
  lesson(15, 1, {
    explanation: [
      "Inspect familiar Python values as objects. Every value has a type; functions are values too, so they can be stored and passed to other functions.",
      "Bekijk bekende Python-waarden als objecten. Elke waarde heeft een type; functies zijn ook waarden en kunnen dus bewaard en aan andere functies meegegeven worden.",
    ],
    sections: [
      S(
        "types everything-is-object functions-as-objects",
        ["A function without parentheses", "Een functie zonder haakjes"],
        [
          "type(value) returns its type object. The type’s __name__ attribute gives a readable name. Lists, numbers, strings and functions are all objects, although their supported operations differ. Writing double refers to a function object; double(3) calls it. A function parameter can receive another function and call it later.",
          "type(waarde) geeft het typeobject terug. Het __name__-attribuut van dat type geeft een leesbare naam. Lijsten, getallen, strings en functies zijn allemaal objecten, hoewel hun bewerkingen verschillen. double verwijst naar een functieobject; double(3) roept het aan. Een functieparameter kan een andere functie ontvangen en die later aanroepen.",
        ],
        "def double(value):\n    return value * 2\noperation = double\nprint(type(3).__name__)\nprint(type(operation).__name__)\nprint(operation(4))",
        "int\nfunction\n8\n",
        [
          "Why is operation = double different from operation = double(4)?",
          "Waarom verschilt operation = double van operation = double(4)?",
        ],
      ),
    ],
    starter:
      'def type_name(value):\n    return "unknown"\n\ndef apply_twice(operation, value):\n    return value\n\ndef double(value):\n    return value * 2\n\nprint(type_name([1, 2]))\nprint(apply_twice(double, 3))\n',
    solution:
      "def type_name(value):\n    return type(value).__name__\n\ndef apply_twice(operation, value):\n    return operation(operation(value))\n\ndef double(value):\n    return value * 2\n\nprint(type_name([1, 2]))\nprint(apply_twice(double, 3))\n",
    tasks: [
      C(
        "types everything-is-object",
        [
          "Return the actual type name from type_name(value), without a hand-written list of cases.",
          "Geef de echte typenaam terug vanuit type_name(value), zonder handgeschreven gevallenlijst.",
        ],
        'type_name([1,2]) == "list"',
        [
          [
            "Ask the object’s type rather than guessing from its printed value.",
            "Vraag het objecttype in plaats van te raden op basis van uitvoer.",
          ],
          ["Read __name__ from type(value).", "Lees __name__ van type(value)."],
          ["return type(value).__name__", "return type(value).__name__"],
        ],
        [
          "A numeric-looking string must still report str.",
          "Een numeriek ogende string moet nog steeds str melden.",
        ],
        [
          F("type_name", ["12"], '_return == "str"'),
          F("type_name", [true], '_return == "bool"'),
          F("type_name", [null], '_return == "NoneType"'),
        ],
      ),
      C(
        "functions-as-objects",
        [
          "Apply the supplied operation twice, using the first result as the next input.",
          "Pas de meegegeven operation twee keer toe en gebruik het eerste resultaat als volgende invoer.",
        ],
        "apply_twice(double,3) == 12",
        [
          [
            "The parameter is callable, not its result.",
            "De parameter is aanroepbaar, niet het resultaat ervan.",
          ],
          [
            "Call operation once, then call it again on that result.",
            "Roep operation één keer aan en daarna opnieuw met dat resultaat.",
          ],
          [
            "return operation(operation(value))",
            "return operation(operation(value))",
          ],
        ],
        [
          "Do not hard-code doubling: a different function must also work.",
          "Leg verdubbelen niet vast: een andere functie moet ook werken.",
        ],
        [
          {
            check:
              "apply_twice(abs,-4) == 4 and apply_twice(lambda n: n+1,5) == 7",
          },
        ],
      ),
    ],
    note: [
      "Type inspection works uniformly because values are objects. Passing the function itself keeps apply_twice independent of the particular operation.",
      "Type-inspectie werkt uniform omdat waarden objecten zijn. De functie zelf meegeven houdt apply_twice onafhankelijk van de specifieke bewerking.",
    ],
    experiment: [
      "Pass str as the operation with a numeric value. Explain why its second application still returns a string. Compare callable(double) with callable(double(2)).",
      "Geef str mee als operation met een numerieke waarde. Leg uit waarom de tweede toepassing nog een string teruggeeft. Vergelijk callable(double) met callable(double(2)).",
    ],
  }),
  lesson(15, 2, {
    explanation: [
      "Define a class to group related state and behaviour. Calling the class creates an instance; __init__ gives that new instance its starting state.",
      "Definieer een klasse om bijbehorende toestand en gedrag te groeperen. De klasse aanroepen maakt een instantie; __init__ geeft die nieuwe instantie zijn begintoestand.",
    ],
    sections: [
      S(
        "class instantiation oop constructors self instance-variables",
        [
          "One definition, many instances",
          "Eén definitie, meerdere instanties",
        ],
        [
          'class introduces a new type. Calling Label("Ada") creates an instance and runs __init__ on it. self is the instance receiving the call; self.name stores an attribute on that object. name without self is only a local parameter. __init__ initialises the object and must not return a separate result. Grouping state with its operations is the core idea of object-oriented programming.',
          'class introduceert een nieuw type. Label("Ada") aanroepen maakt een instantie en voert daarop __init__ uit. self is de instantie die de aanroep ontvangt; self.name bewaart een attribuut op dat object. name zonder self is slechts een lokale parameter. __init__ initialiseert het object en mag geen apart resultaat teruggeven. Toestand met zijn bewerkingen groeperen is het kernidee van objectgeoriënteerd programmeren.',
        ],
        'class Label:\n    def __init__(self, name):\n        self.name = name\n\nfirst = Label("Ada")\nsecond = Label("Bo")\nprint(first.name, second.name)',
        "Ada Bo\n",
        [
          "Why does second.name not replace first.name?",
          "Waarom vervangt second.name niet first.name?",
        ],
      ),
    ],
    starter:
      "class Counter:\n    def __init__(self, start=0):\n        value = start\n\nfirst = Counter(2)\nsecond = Counter(5)\n# Print both instance values.\n",
    solution:
      "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\nfirst = Counter(2)\nsecond = Counter(5)\nprint(first.value, second.value)\n",
    tasks: [
      C(
        "class constructors self instance-variables",
        [
          "Initialise Counter.value on self using start, defaulting to zero.",
          "Initialiseer Counter.value op self met start, standaard nul.",
        ],
        'hasattr(first,"value") and first.value == 2',
        [
          [
            "State must be stored on the new object.",
            "Toestand moet op het nieuwe object worden bewaard.",
          ],
          [
            "Use self.value rather than a local value variable.",
            "Gebruik self.value in plaats van een lokale value-variabele.",
          ],
          ["self.value = start", "self.value = start"],
        ],
        [
          "A local variable disappears after __init__ finishes.",
          "Een lokale variabele verdwijnt nadat __init__ klaar is.",
        ],
        [
          F("Counter", [], "_return.value == 0"),
          F("Counter", [-3], "_return.value == -3"),
        ],
      ),
      C(
        "instantiation oop",
        [
          "Create the supplied two Counter instances and print their values. Changing one must not replace the other’s state.",
          "Maak de twee meegeleverde Counter-instanties en druk hun waarden af. Eén wijzigen mag de toestand van de andere niet vervangen.",
        ],
        'isinstance(first,Counter) and isinstance(second,Counter) and first is not second and _stdout.strip() == "2 5"',
        [
          [
            "A class is a definition; each call creates an object.",
            "Een klasse is een definitie; elke aanroep maakt een object.",
          ],
          [
            "Use Counter(2) and Counter(5), then access attributes with dots.",
            "Gebruik Counter(2) en Counter(5) en lees attributen met punten.",
          ],
          [
            "print(first.value, second.value)",
            "print(first.value, second.value)",
          ],
        ],
        [
          "Two names for one instance would still share state.",
          "Twee namen voor één instantie zouden nog steeds toestand delen.",
        ],
        [
          F(
            "Counter",
            [7],
            "_return.value == 7 and Counter(0).value == 0 and _return.value == 7",
          ),
        ],
      ),
    ],
    note: [
      "self.value belongs to each instance. The class defines how all counters are initialised, but does not force them to share one current value.",
      "self.value hoort bij elke instantie. De klasse bepaalt hoe alle tellers worden geïnitialiseerd maar laat ze niet één huidige waarde delen.",
    ],
    experiment: [
      "Set first.value = 9, then inspect second.value. Compare that with alias = first and explain what alias shares.",
      "Zet first.value = 9 en bekijk second.value. Vergelijk dat met alias = first en leg uit wat alias deelt.",
    ],
  }),
  lesson(15, 3, {
    explanation: [
      "Add methods that operate on an instance’s own state. The object supplies self automatically when a method is called through that object.",
      "Voeg methoden toe die op de eigen toestand van een instantie werken. Het object levert self automatisch wanneer een methode via dat object wordt aangeroepen.",
    ],
    sections: [
      S(
        "methods method-arguments",
        ["Behaviour next to state", "Gedrag naast toestand"],
        [
          "A method is a function defined in a class. counter.add(3) calls add with counter as self and 3 as amount. Use self.value to read and update that instance. Methods can take defaults, return values or return None, just like other functions. Decide which behaviour the caller needs.",
          "Een methode is een functie die in een klasse is gedefinieerd. counter.add(3) roept add aan met counter als self en 3 als amount. Gebruik self.value om die instantie te lezen en bij te werken. Methoden kunnen standaarden en terugkeerwaarden hebben of None teruggeven, net als andere functies. Bepaal welk gedrag de aanroeper nodig heeft.",
        ],
        "class Meter:\n    def __init__(self):\n        self.value = 0\n    def add(self, amount):\n        self.value += amount\n        return self.value\n\nmeter = Meter()\nprint(meter.add(3))\nprint(meter.add(2))",
        "3\n5\n",
        [
          "Where is the total stored between the two calls?",
          "Waar wordt het totaal tussen de twee aanroepen bewaard?",
        ],
      ),
    ],
    starter:
      "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def add(self, amount=1):\n        return self.value\n\n    def reset(self):\n        pass\n\ncounter = Counter(2)\nprint(counter.add())\n",
    solution:
      "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def add(self, amount=1):\n        self.value += amount\n        return self.value\n\n    def reset(self):\n        self.value = 0\n\ncounter = Counter(2)\nprint(counter.add())\n",
    tasks: [
      C(
        "methods method-arguments",
        [
          "Implement add(amount=1) to update this counter and return its new value. Negative and zero amounts are allowed.",
          "Implementeer add(amount=1) om deze teller bij te werken en zijn nieuwe waarde terug te geven. Negatieve en nulbedragen zijn toegestaan.",
        ],
        'counter.value == 3 and _stdout.strip() == "3"',
        [
          [
            "Read and write the same instance attribute.",
            "Lees en schrijf hetzelfde instantieattribuut.",
          ],
          [
            "Update self.value before returning it.",
            "Werk self.value bij voordat je die teruggeeft.",
          ],
          [
            "self.value += amount\nreturn self.value",
            "self.value += amount\nreturn self.value",
          ],
        ],
        [
          "Returning a changed local number without updating self loses the state.",
          "Een gewijzigd lokaal getal teruggeven zonder self bij te werken verliest de toestand.",
        ],
        [
          F(
            "Counter",
            [5],
            "_return.add(-2) == 3 and _return.add(0) == 3 and _return.add() == 4 and _return.value == 4",
          ),
        ],
      ),
      C(
        "methods",
        [
          "Implement reset() to set this counter to zero and return None.",
          "Implementeer reset() om deze teller op nul te zetten en None terug te geven.",
        ],
        "callable(counter.reset)",
        [
          [
            "Reset is an action on an existing object.",
            "Reset is een actie op een bestaand object.",
          ],
          ["Assign zero to self.value.", "Wijs nul aan self.value toe."],
          ["self.value = 0", "self.value = 0"],
        ],
        [
          "Do not create a new Counter instead of resetting this one.",
          "Maak geen nieuwe Counter in plaats van deze te resetten.",
        ],
        [
          F(
            "Counter",
            [7],
            "_return.reset() is None and _return.value == 0 and _return.add(2) == 2",
          ),
        ],
      ),
    ],
    note: [
      "Both methods act on the same instance. add returns a useful new total; reset communicates its effect through state and returns None.",
      "Beide methoden werken op dezelfde instantie. add geeft een bruikbaar nieuw totaal; reset communiceert zijn effect via toestand en geeft None terug.",
    ],
    experiment: [
      "Make two counters, add to one and reset the other. Explain how Python supplies self for each call.",
      "Maak twee tellers, tel bij één op en reset de andere. Leg uit hoe Python self voor elke aanroep meegeeft.",
    ],
  }),
  lesson(15, 4, {
    explanation: [
      "Repair notebooks that accidentally share one list. Use a class attribute for shared descriptive information and instance attributes for each notebook’s changing contents.",
      "Repareer notitieboeken die per ongeluk één lijst delen. Gebruik een klasseattribuut voor gedeelde beschrijvende informatie en instantieattributen voor de veranderende inhoud van elk notitieboek.",
    ],
    sections: [
      S(
        "class-variables independent-instances",
        ["Shared by design or by mistake", "Bewust of per ongeluk gedeeld"],
        [
          'Assignments in the class body create class attributes. Instances can read those shared defaults. A mutable list placed there is one list shared by every instance unless overridden. Create per-instance collections inside __init__ with self.notes = []. A class attribute such as category = "practice" is appropriate when the same label describes all notebooks.',
          'Toewijzingen in het klasseblok maken klasseattributen. Instanties kunnen die gedeelde standaarden lezen. Een veranderlijke lijst daar is één lijst die elke instantie deelt tenzij overschreven. Maak verzamelingen per instantie binnen __init__ met self.notes = []. Een klasseattribuut zoals category = "practice" is geschikt wanneer hetzelfde label alle notitieboeken beschrijft.',
        ],
        'class Card:\n    category = "study"\n    def __init__(self, title):\n        self.title = title\n\na = Card("Loops")\nb = Card("Files")\nprint(a.category, b.category)\nprint(a.title, b.title)',
        "study study\nLoops Files\n",
        [
          "Which value is deliberately shared?",
          "Welke waarde wordt bewust gedeeld?",
        ],
      ),
    ],
    starter:
      'class Notebook:\n    category = "practice"\n    notes = []\n\n    def __init__(self, name):\n        self.name = name\n\n    def add_note(self, text):\n        self.notes.append(text)\n\nfirst = Notebook("A")\nsecond = Notebook("B")\nfirst.add_note("Loops")\nprint(first.notes, second.notes)\n',
    solution:
      'class Notebook:\n    category = "practice"\n\n    def __init__(self, name):\n        self.name = name\n        self.notes = []\n\n    def add_note(self, text):\n        self.notes.append(text)\n\nfirst = Notebook("A")\nsecond = Notebook("B")\nfirst.add_note("Loops")\nprint(first.notes, second.notes)\n',
    tasks: [
      C(
        "independent-instances",
        [
          "Give every Notebook its own empty notes list so additions do not leak to another instance.",
          "Geef elke Notebook een eigen lege notes-lijst zodat toevoegingen niet naar een andere instantie lekken.",
        ],
        'first.notes == ["Loops"] and second.notes == [] and first.notes is not second.notes',
        [
          [
            "Mutable collections usually belong to individual objects.",
            "Veranderlijke verzamelingen horen meestal bij afzonderlijke objecten.",
          ],
          [
            "Create self.notes inside __init__.",
            "Maak self.notes binnen __init__.",
          ],
          ["self.notes = []", "self.notes = []"],
        ],
        [
          "Resetting one shared class list whenever an instance is made still breaks earlier notebooks.",
          "Eén gedeelde klasselijst bij elke nieuwe instantie resetten breekt eerdere notitieboeken nog steeds.",
        ],
        [
          F(
            "Notebook",
            ["C"],
            '_return.add_note("one") is None and Notebook("D").notes == [] and _return.notes == ["one"]',
          ),
        ],
      ),
      C(
        "class-variables",
        [
          'Keep category="practice" on the class, shared by all notebooks, while names remain instance-specific.',
          'Behoud category="practice" op de klasse, gedeeld door alle notitieboeken, terwijl namen per instantie verschillen.',
        ],
        'Notebook.category == "practice" and first.name == "A" and second.name == "B"',
        [
          [
            "Shared labels and shared mutable state have different uses.",
            "Gedeelde labels en gedeelde veranderlijke toestand dienen verschillende doelen.",
          ],
          [
            "Leave category in the class body and name on self.",
            "Laat category in het klasseblok en name op self.",
          ],
          ['category = "practice"', 'category = "practice"'],
        ],
        [
          "Do not remove the class-level description when repairing the list.",
          "Verwijder de beschrijving op klasseniveau niet bij het repareren van de lijst.",
        ],
        [
          F(
            "Notebook",
            ["E"],
            '_return.category == "practice" and _return.name == "E"',
          ),
        ],
      ),
    ],
    note: [
      "The repair changes where the list is created, not how append works. Each constructor call now allocates its own list while the category remains shared.",
      "De reparatie verandert waar de lijst wordt gemaakt, niet hoe append werkt. Elke constructoraanroep maakt nu een eigen lijst terwijl de categorie gedeeld blijft.",
    ],
    experiment: [
      "Create a third notebook after adding several notes to the first. Confirm the earlier notes survive and the new notebook begins empty.",
      "Maak een derde notitieboek nadat je meerdere notities aan het eerste hebt toegevoegd. Bevestig dat eerdere notities blijven en het nieuwe boek leeg begint.",
    ],
  }),
  lesson(15, 5, {
    explanation: [
      "Make objects easier to inspect. Attribute tools help discover available information, while __repr__ and __str__ give objects useful textual representations.",
      "Maak objecten makkelijker te inspecteren. Attribuuthulpmiddelen helpen beschikbare informatie ontdekken, terwijl __repr__ en __str__ bruikbare tekstvoorstellingen geven.",
    ],
    sections: [
      S(
        "hasattr getattr dir repr str",
        ["Inspect without guessing", "Bekijk zonder te raden"],
        [
          "hasattr(obj, name) asks whether an attribute is available. getattr(obj, name, default) reads it with a fallback. dir(obj) lists discoverable attribute names, including many internal ones. Dictionary keys are not automatically object attributes. repr(obj) calls __repr__ for a diagnostic representation; str(obj) and print use __str__ for a friendly form. In f-strings, !r applies repr to a value so string quotes remain visible.",
          "hasattr(obj, naam) vraagt of een attribuut beschikbaar is. getattr(obj, naam, standaard) leest het met een terugvalwaarde. dir(obj) noemt vindbare attributen, inclusief veel interne. Dictionarysleutels zijn niet automatisch objectattributen. repr(obj) roept __repr__ aan voor een diagnostische voorstelling; str(obj) en print gebruiken __str__ voor een vriendelijke vorm. In f-strings past !r repr op een waarde toe zodat stringaanhalingstekens zichtbaar blijven.",
        ],
        'class Token:\n    def __init__(self, text):\n        self.text = text\n    def __repr__(self):\n        return f"Token({self.text!r})"\n    def __str__(self):\n        return self.text\n\ntoken = Token("Hi")\nprint(repr(token))\nprint(str(token))\nprint(hasattr(token, "text"), getattr(token, "missing", 0))',
        "Token('Hi')\nHi\nTrue 0\n",
        [
          "Which form is useful for a user, and which reveals the stored string clearly?",
          "Welke vorm is nuttig voor een gebruiker en welke toont de opgeslagen string duidelijk?",
        ],
      ),
    ],
    starter:
      'class Badge:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\n    def __repr__(self):\n        return "Badge"\n\n    def __str__(self):\n        return "Badge"\n\ndef inspect_badge(obj):\n    return "anonymous", False, False\n\nprint(repr(Badge("Ada", 3)))\n',
    solution:
      'class Badge:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\n    def __repr__(self):\n        return f"Badge({self.name!r}, {self.score!r})"\n\n    def __str__(self):\n        return f"{self.name} ({self.score})"\n\ndef inspect_badge(obj):\n    return getattr(obj, "name", "anonymous"), hasattr(obj, "score"), "name" in dir(obj)\n\nprint(repr(Badge("Ada", 3)))\n',
    tasks: [
      C(
        "repr",
        [
          "Implement __repr__ as Badge(repr(name), repr(score)), for example Badge('Ada', 3).",
          "Implementeer __repr__ als Badge(repr(name), repr(score)), bijvoorbeeld Badge('Ada', 3).",
        ],
        'repr(Badge("Ada",3)) == "Badge(" + repr("Ada") + ", 3)"',
        [
          [
            "A diagnostic representation should identify type and state.",
            "Een diagnostische voorstelling moet type en toestand tonen.",
          ],
          [
            "Use !r on the two attribute values.",
            "Gebruik !r bij de twee attribuutwaarden.",
          ],
          [
            'return f"Badge({self.name!r}, {self.score!r})"',
            'return f"Badge({self.name!r}, {self.score!r})"',
          ],
        ],
        [
          "Do not assume every name can be safely wrapped in hard-coded quote characters.",
          "Neem niet aan dat elke naam veilig tussen vastgelegde aanhalingstekens past.",
        ],
        [
          F(
            "Badge",
            ["O'Neil", -2],
            'repr(_return) == "Badge(" + repr(_args[0]) + ", -2)"',
          ),
        ],
      ),
      C(
        "str",
        [
          "Implement __str__ as a friendly name followed by score in parentheses, such as Ada (3).",
          "Implementeer __str__ als een vriendelijke naam gevolgd door score tussen haakjes, zoals Ada (3).",
        ],
        'str(Badge("Ada",3)) == "Ada (3)"',
        [
          [
            "Friendly output need not look like source code.",
            "Vriendelijke uitvoer hoeft niet op broncode te lijken.",
          ],
          [
            "Read the same instance values without !r.",
            "Lees dezelfde instantiewaarden zonder !r.",
          ],
          [
            'return f"{self.name} ({self.score})"',
            'return f"{self.name} ({self.score})"',
          ],
        ],
        [
          "__str__ must return a string rather than print one.",
          "__str__ moet een string teruggeven in plaats van afdrukken.",
        ],
        [F("Badge", ["Zoë", 0], 'str(_return) == "Zoë (0)"')],
      ),
      C(
        "hasattr getattr dir",
        [
          "Return (name_or_anonymous, has_score, name_in_dir) from inspect_badge using getattr, hasattr and dir.",
          "Geef (naam_of_anonymous, heeft_score, naam_in_dir) terug vanuit inspect_badge met getattr, hasattr en dir.",
        ],
        'inspect_badge(Badge("Bo",2)) == ("Bo",True,True)',
        [
          [
            "Attribute existence is different from a value being truthy.",
            "Attribuutbestaan verschilt van een waarde die waarachtig is.",
          ],
          [
            "Use an explicit default for a missing name.",
            "Gebruik een expliciete standaard voor een ontbrekende naam.",
          ],
          [
            'getattr(obj, "name", "anonymous")',
            'getattr(obj, "name", "anonymous")',
          ],
        ],
        [
          "A dictionary containing a name key does not automatically have a name attribute.",
          "Een dictionary met een name-sleutel heeft niet automatisch een name-attribuut.",
        ],
        [
          F(
            "inspect_badge",
            [{ name: "Ada" }],
            '_return == ("anonymous",False,False)',
          ),
          { check: 'inspect_badge(Badge("",0)) == ("",True,True)' },
        ],
      ),
    ],
    note: [
      "Representation methods return strings for Python to display. Attribute inspection tests availability directly, so empty names and zero scores remain valid present values.",
      "Voorstellingsmethoden geven strings terug die Python toont. Attribuutinspectie test beschikbaarheid direct, zodat lege namen en nulscores geldige aanwezige waarden blijven.",
    ],
    experiment: [
      "Print a list of Badge objects and compare it with printing one Badge. Explain why containers often show the diagnostic representation.",
      "Druk een lijst Badge-objecten af en vergelijk dat met één Badge afdrukken. Leg uit waarom verzamelingen vaak de diagnostische voorstelling tonen.",
    ],
  }),
  lesson(15, 6, {
    explanation: [
      "Implement a small countdown object from a behaviour contract. Timer(duration) starts with that nonnegative duration remaining. tick(seconds=1) reduces remaining time without going below zero; negative ticks do nothing. reset restores the original duration.",
      "Implementeer een klein aftelobject uit een gedragsafspraak. Timer(duration) begint met die niet-negatieve resterende duur. tick(seconds=1) verlaagt de resterende tijd zonder onder nul te gaan; negatieve tikken doen niets. reset herstelt de oorspronkelijke duur.",
    ],
    sections: [
      S(
        "classes-review",
        [
          "Design the state before the methods",
          "Ontwerp toestand vóór methoden",
        ],
        [
          "Identify which values persist across calls: the original duration and the current remaining time. Methods update the current time while reset needs the original value. Each timer owns both fields. The tick method returns the new remaining time; reset returns None.",
          "Bepaal welke waarden tussen aanroepen blijven: de oorspronkelijke duur en de huidige resterende tijd. Methoden werken de huidige tijd bij terwijl reset de oorspronkelijke waarde nodig heeft. Elke timer bezit beide velden. tick geeft de nieuwe resterende tijd terug; reset geeft None terug.",
        ],
        "original = 5\nremaining = max(0, original - 8)\nprint(remaining)\nremaining = original\nprint(remaining)",
        "0\n5\n",
        [
          "Why do reset and tick need different pieces of state?",
          "Waarom hebben reset en tick verschillende stukjes toestand nodig?",
        ],
      ),
    ],
    starter:
      "class Timer:\n    def __init__(self, duration):\n        pass\n\n    def tick(self, seconds=1):\n        pass\n\n    def reset(self):\n        pass\n\ntimer = Timer(5)\nprint(timer.tick(2))\n",
    solution:
      "class Timer:\n    def __init__(self, duration):\n        self.duration = duration\n        self.remaining = duration\n\n    def tick(self, seconds=1):\n        if seconds >= 0:\n            self.remaining = max(0, self.remaining - seconds)\n        return self.remaining\n\n    def reset(self):\n        self.remaining = self.duration\n\ntimer = Timer(5)\nprint(timer.tick(2))\n",
    tasks: [
      C(
        "classes-review",
        [
          "Implement initialisation and tick with default seconds=1, clamping at zero and ignoring negative seconds.",
          "Implementeer initialisatie en tick met standaard seconds=1, begrens op nul en negeer negatieve seconden.",
        ],
        'timer.remaining == 3 and _stdout.strip() == "3"',
        [
          [
            "Store both original and current values on self.",
            "Bewaar oorspronkelijke en huidige waarden op self.",
          ],
          [
            "Update only for nonnegative ticks, then return remaining.",
            "Werk alleen bij voor niet-negatieve tikken en geef daarna remaining terug.",
          ],
          [
            "self.remaining = max(0, self.remaining - seconds)",
            "self.remaining = max(0, self.remaining - seconds)",
          ],
        ],
        [
          "A large tick must not make time negative and a negative tick must not add time.",
          "Een grote tik mag tijd niet negatief maken en een negatieve tik mag geen tijd toevoegen.",
        ],
        [
          F(
            "Timer",
            [3],
            "_return.tick() == 2 and _return.tick(-4) == 2 and _return.tick(9) == 0",
          ),
          F("Timer", [0], "_return.tick() == 0"),
        ],
      ),
      C(
        "classes-review",
        [
          "Implement reset and keep two timer instances independent, including when one is reset.",
          "Implementeer reset en houd twee timerinstanties onafhankelijk, ook wanneer één wordt gereset.",
        ],
        "callable(timer.reset)",
        [
          [
            "Reset needs the original duration, not a fixed example number.",
            "Reset heeft de oorspronkelijke duur nodig, geen vast voorbeeldgetal.",
          ],
          [
            "Read self.duration and assign self.remaining.",
            "Lees self.duration en wijs self.remaining toe.",
          ],
          ["self.remaining = self.duration", "self.remaining = self.duration"],
        ],
        [
          "Creating another timer must not overwrite this timer’s original duration.",
          "Een andere timer maken mag de oorspronkelijke duur van deze timer niet overschrijven.",
        ],
        [
          F(
            "Timer",
            [8],
            "_return.tick(3) == 5 and Timer(2).remaining == 2 and _return.reset() is None and _return.remaining == 8",
          ),
        ],
      ),
    ],
    note: [
      "The class keeps the original duration separate from changing state. Methods make the state transitions explicit and preserve object independence.",
      "De klasse houdt de oorspronkelijke duur apart van veranderende toestand. Methoden maken toestandsovergangen expliciet en behouden objectonafhankelijkheid.",
    ],
    experiment: [
      "Create two timers with different durations and interleave tick/reset calls. Add your own diagnostic representation and use it to trace the state.",
      "Maak twee timers met verschillende duren en wissel tick/reset-aanroepen af. Voeg een eigen diagnostische voorstelling toe en gebruik die om de toestand te volgen.",
    ],
  }),
];
