import { focus } from "./focused.mjs";
import { call } from "./authoring.mjs";
const f = (slug, s) => focus(23, slug, s);
export const activities = [
  f("class", {
    title: [
      "Define a new type with class",
      "Definieer een nieuw type met class",
    ],
    topics: "classes instantiation oop",
    practices: "types pygame-objects",
    requires: "types attributes",
    why: [
      "You have used objects such as lists and Rects. A class defines a type of your own, grouping state with related behaviour.",
      "Je hebt objecten zoals lijsten en Rects gebruikt. Een class definieert een eigen type dat toestand met bijbehorend gedrag groepeert.",
    ],
    teach: [
      "class Badge: defines a class named Badge. The colon and indentation mark its body. pass is an explicit do-nothing placeholder for an otherwise empty body. Badge() creates a new instance. Two calls create two independent objects. type(instance) identifies its type; isinstance(instance, Badge) tests membership of that type. Creating classes is useful when several objects share behaviour but have their own state. A simple function is still appropriate when no stored state is needed.",
      "class Badge: definieert een klasse Badge. De dubbele punt en inspringing markeren de inhoud. pass is een expliciete nietsdoen-instructie voor een anders lege inhoud. Badge() maakt een nieuwe instantie. Twee aanroepen maken twee onafhankelijke objecten. type(instance) benoemt het type; isinstance(instance, Badge) test of het object bij dat type hoort. Klassen zijn nuttig wanneer meerdere objecten gedrag delen maar eigen toestand hebben. Een eenvoudige functie blijft geschikt als geen bewaarde toestand nodig is.",
    ],
    rule: [
      "A class is a definition; an instance is one object created from it.",
      "Een klasse is een definitie; een instantie is één daaruit gemaakt object.",
    ],
    example:
      "class Badge:\n    pass\nfirst = Badge()\nsecond = Badge()\nprint(isinstance(first,Badge))\nprint(first is second)",
    output: "True\nFalse\n",
    predict: [
      "Which line defines the type and which creates an object?",
      "Welke regel definieert het type en welke maakt een object?",
    ],
    starter: "",
    solution: "class Ticket:\n    pass\nfirst = Ticket()\nsecond = Ticket()\n",
    tasks: [
      {
        task: [
          "Define Ticket and create two distinct instances named first and second.",
          "Definieer Ticket en maak twee aparte instanties first en second.",
        ],
        check:
          "isinstance(first,Ticket) and isinstance(second,Ticket) and first is not second",
        help: [
          "Call the class twice rather than assigning a second name to the first object.",
          "Roep de klasse tweemaal aan in plaats van een tweede naam aan het eerste object te koppelen.",
        ],
        fragment: "second = Ticket()",
      },
    ],
    change: [
      "Compare second = first with second = Ticket().",
      "Vergelijk second = first met second = Ticket().",
    ],
    explain: [
      "Each constructor call creates a new instance, while assignment alone creates another reference.",
      "Elke constructoraanroep maakt een nieuwe instantie, terwijl alleen toewijzing een andere verwijzing maakt.",
    ],
  }),
  f("initialise", {
    title: [
      "Give each instance initial state",
      "Geef elke instantie begintoestand",
    ],
    topics: "constructors self instance-attributes",
    requires: "classes parameters-arguments",
    why: [
      "An object usually needs information at creation time, such as a name or starting score.",
      "Een object heeft bij maken meestal informatie nodig, zoals een naam of beginscore.",
    ],
    teach: [
      "__init__ is called when an instance is created. Its first parameter, conventionally self, refers to that new instance. Python supplies self automatically; Counter(3) passes 3 to the next parameter. self.value = start stores state on the instance. A local value = start would disappear after the call. __init__ initialises the object and should not return a value.",
      "__init__ wordt aangeroepen wanneer een instantie wordt gemaakt. De eerste parameter, volgens gewoonte self, verwijst naar die nieuwe instantie. Python levert self automatisch; Counter(3) geeft 3 aan de volgende parameter. self.value = start bewaart toestand op de instantie. Een lokale value = start verdwijnt na de aanroep. __init__ initialiseert het object en hoort geen waarde terug te geven.",
    ],
    rule: [
      "Use self.attribute to keep state on this instance.",
      "Gebruik self.attribuut om toestand op deze instantie te bewaren.",
    ],
    example:
      "class Counter:\n    def __init__(self,start):\n        self.value = start\ncounter = Counter(3)\nprint(counter.value)",
    output: "3\n",
    predict: [
      "Why does the caller supply only one argument when __init__ has two parameters?",
      "Waarom geeft de aanroeper één argument terwijl __init__ twee parameters heeft?",
    ],
    starter: "class Player:\n    def __init__(self,name):\n        pass\n",
    solution:
      "class Player:\n    def __init__(self,name):\n        self.name = name\n        self.score = 0\n",
    tasks: [
      {
        task: [
          "Initialise Player(name) with its own name and a score of zero.",
          "Initialiseer Player(name) met zijn eigen name en score nul.",
        ],
        check: "callable(Player)",
        help: [
          "Assign both fields through self inside __init__.",
          "Wijs beide velden via self toe binnen __init__.",
        ],
        fragment: "self.name = name",
        probes: [
          call(
            "Player",
            ["Ada"],
            '_return.name == "Ada" and _return.score == 0',
          ),
          call("Player", ["Bo"], '_return.name == "Bo" and _return.score == 0'),
        ],
      },
    ],
    change: [
      "Create two players with different names and inspect both.",
      "Maak twee spelers met verschillende namen en bekijk beide.",
    ],
    explain: [
      "self distinguishes the current instance, so each constructor stores its own name.",
      "self onderscheidt de huidige instantie; elke constructor bewaart dus zijn eigen naam.",
    ],
  }),
  f("methods", {
    title: [
      "Let an object perform an action",
      "Laat een object een actie uitvoeren",
    ],
    topics: "methods",
    requires: "self instance-attributes",
    why: [
      "Methods keep operations close to the state they use.",
      "Methoden houden bewerkingen dicht bij de toestand die ze gebruiken.",
    ],
    teach: [
      "A method is a function defined in a class. In counter.increment(), Python supplies counter as self to increment(self). The body can read or change self.value. A method with no explicit return returns None, just like an ordinary function. Keep the method definition at the same class-body indentation as __init__.",
      "Een methode is een functie binnen een klasse. In counter.increment() levert Python counter als self aan increment(self). De inhoud kan self.value lezen of veranderen. Een methode zonder expliciete return geeft None, net als een gewone functie. Zet de methodedefinitie op dezelfde klasse-inspringing als __init__.",
    ],
    rule: [
      "Calling instance.method() supplies the instance as self.",
      "instance.method() aanroepen levert de instantie als self.",
    ],
    example:
      "class Counter:\n    def __init__(self):\n        self.value = 0\n    def increment(self):\n        self.value += 1\ncounter = Counter()\ncounter.increment()\nprint(counter.value)",
    output: "1\n",
    predict: [
      "Which object’s state does self.value identify?",
      "Van welk object benoemt self.value de toestand?",
    ],
    starter:
      "class Lamp:\n    def __init__(self):\n        self.on = False\n    def toggle(self):\n        pass\n",
    solution:
      "class Lamp:\n    def __init__(self):\n        self.on = False\n    def toggle(self):\n        self.on = not self.on\n",
    tasks: [
      {
        task: [
          "Make toggle() reverse this lamp’s on state on every call.",
          "Laat toggle() de on-toestand van dit lampje bij elke aanroep omkeren.",
        ],
        check: "callable(Lamp)",
        help: [
          "Use not on the instance’s current Boolean value.",
          "Gebruik not op de huidige booleaanse waarde van de instantie.",
        ],
        fragment: "self.on = not self.on",
        probes: [
          call(
            "Lamp",
            [],
            "_return.on is False and (_return.toggle(), _return.on)[1] is True and (_return.toggle(), _return.on)[1] is False",
          ),
        ],
      },
    ],
    change: [
      "Create two lamps and toggle only one.",
      "Maak twee lampjes en schakel er maar één om.",
    ],
    explain: [
      "The method updates its own instance, and applying not twice restores the original state.",
      "De methode verandert zijn eigen instantie en tweemaal not herstelt de oorspronkelijke toestand.",
    ],
  }),
  f("method-arguments", {
    title: [
      "Pass an argument to a method",
      "Geef een argument aan een methode",
    ],
    topics: "method-arguments",
    requires: "methods default-arguments",
    why: [
      "A method can combine stored state with new input supplied by a caller.",
      "Een methode kan bewaarde toestand combineren met nieuwe invoer van een aanroeper.",
    ],
    teach: [
      "Define add(self, amount=1); call counter.add(3). self is supplied automatically, while amount comes from the call or its default. A method may return a useful result as well as change state, but its contract should make both effects clear. Here add returns the new total.",
      "Definieer add(self, amount=1); roep counter.add(3) aan. self wordt automatisch geleverd, terwijl amount uit de aanroep of standaardwaarde komt. Een methode mag een nuttig resultaat teruggeven én toestand veranderen, maar de afspraak moet beide gevolgen duidelijk maken. Hier geeft add het nieuwe totaal terug.",
    ],
    rule: [
      "Method arguments after self are supplied by the caller.",
      "Methodeargumenten na self worden door de aanroeper geleverd.",
    ],
    example:
      "class Counter:\n    def __init__(self):\n        self.value = 0\n    def add(self,amount):\n        self.value += amount\n        return self.value\ncounter = Counter()\nprint(counter.add(3))\nprint(counter.add(2))",
    output: "3\n5\n",
    predict: [
      "Why is the second result five instead of two?",
      "Waarom is het tweede resultaat vijf in plaats van twee?",
    ],
    starter:
      "class Counter:\n    def __init__(self,start=0):\n        self.value = start\n    def add(self,amount=1):\n        return self.value\n",
    solution:
      "class Counter:\n    def __init__(self,start=0):\n        self.value = start\n    def add(self,amount=1):\n        self.value += amount\n        return self.value\n",
    tasks: [
      {
        task: [
          "Make add increase the stored value by amount (default 1), then return the updated value.",
          "Laat add de bewaarde waarde met amount verhogen (standaard 1) en daarna de gewijzigde waarde teruggeven.",
        ],
        check: "callable(Counter)",
        help: [
          "Update self.value before returning it.",
          "Werk self.value bij vóór je die teruggeeft.",
        ],
        fragment: "self.value += amount",
        probes: [
          call(
            "Counter",
            [3],
            "_return.add() == 4 and _return.add(-2) == 2 and _return.value == 2",
          ),
          call("Counter", [], "_return.add(0) == 0"),
        ],
      },
    ],
    change: [
      "Call add with a named argument and explain how the stored state changes.",
      "Roep add met een benoemd argument aan en leg uit hoe de bewaarde toestand verandert.",
    ],
    explain: [
      "The result includes previous state because every call updates the same instance field.",
      "Het resultaat bevat eerdere toestand omdat elke aanroep hetzelfde instantieveld bijwerkt.",
    ],
  }),
  f("shared-state", {
    title: [
      "Separate shared defaults from instance data",
      "Scheid gedeelde standaarden van instantiegegevens",
    ],
    topics: "class-attributes independent-instances",
    requires: "constructors methods append",
    why: [
      "A mutable class attribute is shared by all instances. This is a common cause of one object changing another.",
      "Een veranderbaar klasseattribuut wordt door alle instanties gedeeld. Dit veroorzaakt vaak dat één object een ander verandert.",
    ],
    teach: [
      "An attribute assigned directly in the class body belongs to the class. It is suitable for shared constants such as a category label. Instance fields assigned in __init__ belong to each object. Put a new list in self.items for every instance, not one items = [] in the class body. A shallow copy of one shared nested structure may still share inner objects.",
      "Een attribuut direct in de klasse-inhoud hoort bij de klasse. Dat is geschikt voor gedeelde constanten zoals een categorielabel. Instantievelden in __init__ horen bij elk object. Zet voor elke instantie een nieuwe lijst in self.items, niet één items = [] in de klasse-inhoud. Een oppervlakkige kopie van één gedeelde geneste structuur kan binnenste objecten nog delen.",
    ],
    rule: [
      "Create mutable per-object state inside __init__.",
      "Maak veranderbare toestand per object binnen __init__.",
    ],
    example:
      'class Basket:\n    category = "storage"\n    def __init__(self):\n        self.items = []\na = Basket()\nb = Basket()\na.items.append("book")\nprint(b.items)\nprint(Basket.category)',
    output: "[]\nstorage\n",
    predict: [
      "Why can category be shared while items must be separate?",
      "Waarom kan category gedeeld zijn terwijl items apart moeten zijn?",
    ],
    starter:
      'class Bag:\n    category = "travel"\n    items = []\n    def add(self,item):\n        self.items.append(item)\n',
    solution:
      'class Bag:\n    category = "travel"\n    def __init__(self):\n        self.items = []\n    def add(self,item):\n        self.items.append(item)\n',
    tasks: [
      {
        task: [
          "Repair Bag so every instance has an independent items list while category remains shared as travel.",
          "Herstel Bag zodat elke instantie een onafhankelijke items-lijst heeft terwijl category gedeeld travel blijft.",
        ],
        check: "callable(Bag)",
        help: [
          "Move list creation into an initializer and assign it through self.",
          "Verplaats lijstaanmaak naar een initializer en wijs toe via self.",
        ],
        fragment: "self.items = []",
        probes: [
          call(
            "Bag",
            [],
            'Bag.category == "travel" and (_return.add("map"), _return.items)[1] == ["map"] and Bag().items == []',
          ),
        ],
      },
    ],
    change: [
      "Create three bags, add to just one, and inspect all three lists.",
      "Maak drie tassen, voeg aan één toe en bekijk alle drie lijsten.",
    ],
    explain: [
      "Each initializer creates a fresh list; the immutable class label remains a shared description.",
      "Elke initializer maakt een nieuwe lijst; het onveranderbare klasselabel blijft een gedeelde beschrijving.",
    ],
    guidance: "adapt",
  }),
  f("inspect", {
    title: ["Inspect an unfamiliar object", "Onderzoek een onbekend object"],
    topics: "hasattr getattr dir",
    requires: "attributes classes",
    why: [
      "Inspection tools help you understand objects when reading examples or documentation.",
      "Onderzoeksgereedschappen helpen objecten begrijpen bij het lezen van voorbeelden of documentatie.",
    ],
    teach: [
      'hasattr(obj, "name") returns whether attribute access succeeds. getattr(obj, "name", default) reads an attribute with a fallback when it is absent. dir(obj) lists discoverable attribute names, including many special names; it is an aid, not a full API specification. Prefer direct obj.name when the field is known and required.',
      'hasattr(obj, "name") geeft of attribuuttoegang lukt. getattr(obj, "name", default) leest een attribuut met een terugval bij afwezigheid. dir(obj) toont vindbare attribuutnamen, inclusief veel speciale namen; het is een hulpmiddel, geen volledige API-specificatie. Gebruik liever direct obj.name als het veld bekend en verplicht is.',
    ],
    rule: [
      "Inspect deliberately; do not silently hide a missing required field.",
      "Onderzoek bewust; verberg een ontbrekend verplicht veld niet stilzwijgend.",
    ],
    example:
      'class Badge:\n    name = "Visitor"\nbadge = Badge()\nprint(hasattr(badge,"name"))\nprint(getattr(badge,"score",0))\nprint("name" in dir(badge))',
    output: "True\n0\nTrue\n",
    predict: [
      "Which call actually retrieves a value?",
      "Welke aanroep haalt werkelijk een waarde op?",
    ],
    starter:
      'class Record:\n    def __init__(self):\n        self.name = "Bo"\ndef inspect_name(obj):\n    return None\n',
    solution:
      'class Record:\n    def __init__(self):\n        self.name = "Bo"\ndef inspect_name(obj):\n    return hasattr(obj,"name"), getattr(obj,"name","unknown"), "name" in dir(obj)\n',
    tasks: [
      {
        task: [
          "Return a tuple containing whether name exists, its value or unknown, and whether dir lists name.",
          "Geef een tuple met of name bestaat, de waarde of unknown en of dir name vermeldt.",
        ],
        check:
          'inspect_name(Record()) == (True,"Bo",True) and inspect_name(3) == (False,"unknown",False)',
        help: [
          "Use the three inspection operations for their distinct questions.",
          "Gebruik de drie onderzoeksbewerkingen voor hun verschillende vragen.",
        ],
        fragment: 'getattr(obj, "name", "unknown")',
        probes: [
          call("inspect_name", ["text"], '_return == (False,"unknown",False)'),
        ],
      },
    ],
    change: [
      "Use dir on a string and identify one method you already know.",
      "Gebruik dir op een string en herken één methode die je al kent.",
    ],
    explain: [
      "Existence, retrieval and discovery are related but separate operations.",
      "Bestaan, ophalen en ontdekken zijn verwante maar aparte bewerkingen.",
    ],
  }),
  f("representation", {
    title: [
      "Give objects useful text representations",
      "Geef objecten bruikbare tekstweergaven",
    ],
    topics: "repr str-method",
    requires: "methods f-strings",
    why: [
      "Readable object text helps both debugging and user-facing output.",
      "Leesbare objecttekst helpt zowel bij foutonderzoek als bij uitvoer voor gebruikers.",
    ],
    teach: [
      "__repr__(self) returns a developer-oriented description used by repr(obj) and often when objects appear inside collections. __str__(self) returns friendly text for str(obj) and print(obj). Both must return strings. When __str__ is absent, Python can fall back to __repr__. Neither method should print the description itself.",
      "__repr__(self) geeft een beschrijving voor ontwikkelaars, gebruikt door repr(obj) en vaak wanneer objecten in verzamelingen staan. __str__(self) geeft vriendelijke tekst voor str(obj) en print(obj). Beide moeten strings teruggeven. Zonder __str__ kan Python terugvallen op __repr__. Geen van beide methoden hoort de beschrijving zelf af te drukken.",
    ],
    rule: [
      "Return a string representation instead of printing inside the special method.",
      "Geef een stringweergave terug in plaats van binnen de speciale methode af te drukken.",
    ],
    example:
      'class Score:\n    def __init__(self,value):\n        self.value = value\n    def __repr__(self):\n        return f"Score({self.value})"\n    def __str__(self):\n        return f"{self.value} points"\nscore = Score(4)\nprint(repr(score))\nprint(score)',
    output: "Score(4)\n4 points\n",
    predict: [
      "Which method is used by the second print?",
      "Welke methode gebruikt de tweede print?",
    ],
    starter:
      "class Counter:\n    def __init__(self,value):\n        self.value = value\n",
    solution:
      'class Counter:\n    def __init__(self,value):\n        self.value = value\n    def __repr__(self):\n        return f"Counter({self.value})"\n    def __str__(self):\n        return f"Count: {self.value}"\n',
    tasks: [
      {
        task: [
          "Add __repr__ returning Counter(value) and __str__ returning Count: value using the actual stored value.",
          "Voeg __repr__ toe die Counter(value) geeft en __str__ die Count: value geeft met de werkelijk bewaarde waarde.",
        ],
        check: "callable(Counter)",
        help: [
          "Both methods take self and return formatted text.",
          "Beide methoden nemen self en geven geformatteerde tekst terug.",
        ],
        fragment: "def __repr__(self):",
        probes: [
          call(
            "Counter",
            [3],
            'repr(_return) == "Counter(3)" and str(_return) == "Count: 3"',
          ),
          call(
            "Counter",
            [-1],
            'repr(_return) == "Counter(-1)" and str(_return) == "Count: -1"',
          ),
        ],
      },
    ],
    change: [
      "Put two counters in a list and print the list to observe representations.",
      "Zet twee tellers in een lijst en druk die af om weergaven te bekijken.",
    ],
    explain: [
      "Separate representations serve different readers while sharing the same underlying state.",
      "Aparte weergaven bedienen verschillende lezers terwijl ze dezelfde onderliggende toestand gebruiken.",
    ],
  }),
  f("functions-as-values", {
    title: ["A function is an object too", "Een functie is ook een object"],
    topics: "everything-object function-objects",
    requires: "functions-review types",
    why: [
      "Functions can be stored and passed around without calling them immediately.",
      "Functies kunnen worden bewaard en doorgegeven zonder ze direct aan te roepen.",
    ],
    teach: [
      "double names a function object; double(3) calls it and yields its result. Assigning action = double keeps a reference to that function. action(3) then calls it. Numbers, strings, lists, class instances and functions are all objects with a type. This does not mean they support the same operations.",
      "double benoemt een functieobject; double(3) roept het aan en levert het resultaat. action = double toewijzen bewaart een verwijzing naar die functie. action(3) roept die vervolgens aan. Getallen, strings, lijsten, klasse-instanties en functies zijn allemaal objecten met een type. Dat betekent niet dat ze dezelfde bewerkingen ondersteunen.",
    ],
    rule: [
      "Without parentheses you pass the function; with parentheses you call it.",
      "Zonder haakjes geef je de functie door; met haakjes roep je die aan.",
    ],
    example:
      "def double(value):\n    return value * 2\naction = double\nprint(action(3))\nprint(callable(action))",
    output: "6\nTrue\n",
    predict: [
      "What would action contain after action = double(3)?",
      "Wat bevat action na action = double(3)?",
    ],
    starter: "def square(value):\n    return value ** 2\naction = square(3)\n",
    solution: "def square(value):\n    return value ** 2\naction = square\n",
    tasks: [
      {
        task: [
          "Repair action so it stores square itself and can be called with different arguments.",
          "Herstel action zodat die square zelf bewaart en met verschillende argumenten kan worden aangeroepen.",
        ],
        check: "callable(action) and action(3) == 9 and action(-2) == 4",
        help: [
          "Remove the call when assigning the function object.",
          "Verwijder de aanroep wanneer je het functieobject toewijst.",
        ],
        fragment: "action = square",
      },
    ],
    change: [
      "Pass action to another function and have that function call it with a value.",
      "Geef action door aan een andere functie en laat die haar met een waarde aanroepen.",
    ],
    explain: [
      "Keeping the function object postpones execution until the later call.",
      "Het functieobject bewaren stelt uitvoering uit tot de latere aanroep.",
    ],
    guidance: "adapt",
  }),
  f("virtual-pet", {
    title: ["Mini project: virtual pet", "Miniproject: virtueel huisdier"],
    topics: "pet-project objects-review",
    practices:
      "instance-attributes method-arguments independent-instances repr",
    requires: "repr method-arguments independent-instances",
    kind: "challenge",
    guidance: "independent",
    minutes: 45,
    why: [
      "Create several pets with the same behaviour and independent state.",
      "Maak meerdere huisdieren met hetzelfde gedrag en onafhankelijke toestand.",
    ],
    teach: [
      "Implement Pet(name) with name and energy=5. feed(amount=1) adds energy up to a maximum of 10; negative amounts do nothing. play() consumes 2 energy and returns True when at least 2 was available; otherwise leave energy unchanged and return False. __repr__ returns Pet(name, energy=N), for example Pet(Bo, energy=5). Methods must affect only that instance. No input loop is required, but you may add one after the core behaviour works.",
      "Implementeer Pet(name) met name en energy=5. feed(amount=1) voegt energie toe tot maximaal 10; negatieve hoeveelheden doen niets. play() verbruikt 2 energie en geeft True als minstens 2 beschikbaar was; laat anders energie ongewijzigd en geef False. __repr__ geeft Pet(name, energy=N), bijvoorbeeld Pet(Bo, energy=5). Methoden mogen alleen die instantie veranderen. Een invoerlus is niet vereist, maar mag na werkend kerngedrag worden toegevoegd.",
    ],
    rule: [
      "Each object owns its state and enforces the same behaviour contract.",
      "Elk object bezit zijn toestand en handhaaft dezelfde gedragsafspraak.",
    ],
    example:
      "class Battery:\n    def __init__(self):\n        self.charge = 3\n    def use(self):\n        if self.charge < 1:\n            return False\n        self.charge -= 1\n        return True\nbattery = Battery()\nprint(battery.use(),battery.charge)",
    output: "True 2\n",
    predict: [
      "Why must the availability check come before subtraction?",
      "Waarom moet beschikbaarheid vóór aftrekken worden gecontroleerd?",
    ],
    starter: "",
    solution:
      'class Pet:\n    def __init__(self,name):\n        self.name = name\n        self.energy = 5\n    def feed(self,amount=1):\n        if amount > 0:\n            self.energy = min(10,self.energy + amount)\n    def play(self):\n        if self.energy < 2:\n            return False\n        self.energy -= 2\n        return True\n    def __repr__(self):\n        return f"Pet({self.name}, energy={self.energy})"\n',
    tasks: [
      {
        task: [
          "Create Pet with independent initial state and the specified feed behaviour.",
          "Maak Pet met onafhankelijke begintoestand en het beschreven feed-gedrag.",
        ],
        check: "callable(Pet)",
        help: [
          "Initialise fields through self and clamp only nonnegative feeding changes.",
          "Initialiseer velden via self en begrens alleen niet-negatieve voerveranderingen.",
        ],
        fragment: "self.energy = min(10, self.energy + amount)",
        probes: [
          call(
            "Pet",
            ["Bo"],
            '_return.name == "Bo" and _return.energy == 5 and (_return.feed(), _return.energy)[1] == 6 and (_return.feed(100), _return.energy)[1] == 10 and Pet("Ada").energy == 5',
          ),
          call(
            "Pet",
            ["Bo"],
            "(_return.feed(-3), _return.energy)[1] == 5 and (_return.feed(0), _return.energy)[1] == 5",
          ),
        ],
      },
      {
        task: [
          "Implement play and the required representation, including the low-energy boundary.",
          "Implementeer play en de vereiste weergave, inclusief de grens bij lage energie.",
        ],
        check: "callable(Pet)",
        help: [
          "Check energy before spending it, and return a Boolean that describes whether play happened.",
          "Controleer energie vóór verbruik en geef een booleaanse waarde terug die zegt of spelen plaatsvond.",
        ],
        fragment: "if self.energy < 2:",
        probes: [
          call(
            "Pet",
            ["Bo"],
            'repr(_return) == "Pet(Bo, energy=5)" and _return.play() is True and _return.play() is True and _return.energy == 1 and _return.play() is False and _return.energy == 1',
          ),
          call(
            "Pet",
            ["Ada"],
            'setattr(_return,"energy",2) is None and _return.play() is True and _return.energy == 0 and _return.play() is False and _return.energy == 0 and repr(_return) == "Pet(Ada, energy=0)"',
          ),
        ],
      },
    ],
    change: [
      "Create two pets, play with one and feed the other; explain both final states.",
      "Maak twee huisdieren, speel met één en voer de andere; leg beide eindtoestanden uit.",
    ],
    explain: [
      "Instance fields keep pets independent; guards and a maximum maintain the stated energy rules.",
      "Instantievelden houden huisdieren onafhankelijk; bewakingen en een maximum handhaven de afgesproken energieregels.",
    ],
  }),
];
