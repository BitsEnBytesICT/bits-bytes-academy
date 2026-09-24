import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(12, slug, s);
export const activities = [
  f("for-values", {
    title: ["Visit every value with for", "Bezoek elke waarde met for"],
    topics: "for list-iteration",
    requires: "lists accumulators",
    why: [
      "A for loop visits each element without requiring you to manage an index.",
      "Een for-lus bezoekt elk element zonder dat je zelf een index beheert.",
    ],
    teach: [
      "In for value in values:, value receives one element at a time. The colon and indentation mark the repeated body. Elements are visited in list order; an empty list runs the body zero times. The loop variable contains an element, not automatically an index.",
      "In for value in values: krijgt value telkens één element. De dubbele punt en inspringing markeren het herhaalde blok. Elementen worden op lijstvolgorde bezocht; een lege lijst voert de inhoud nul keer uit. De lusvariabele bevat een element, niet automatisch een index.",
    ],
    rule: [
      "for over a list gives its values in order.",
      "for over een lijst geeft zijn waarden op volgorde.",
    ],
    example:
      "total = 0\nfor amount in [2, 5, 3]:\n    total += amount\nprint(total)",
    output: "10\n",
    predict: [
      "What would total be for an empty list?",
      "Wat is total bij een lege lijst?",
    ],
    name: "total",
    params: "values",
    body: "result = 0\nfor value in values:\n    result += value\nreturn result",
    task: [
      "Use a for loop to return the sum of values; return 0 for an empty list.",
      "Gebruik een for-lus om de som van values terug te geven; geef 0 bij een lege lijst.",
    ],
    check:
      "any(isinstance(n,_ast.For) for n in _ast.walk(_ast.parse(_source)))",
    help: [
      "Initialise the accumulator before the loop and return after it.",
      "Initialiseer de accumulator vóór de lus en keer pas erna terug.",
    ],
    fragment: "for value in values:",
    cases: [
      [[[2, -1, 4]], "_return == 5"],
      [[[]], "_return == 0"],
    ],
    change: [
      "Trace the accumulator after each element of [3, 0, -2].",
      "Volg de accumulator na elk element van [3, 0, -2].",
    ],
    explain: [
      "The accumulator survives between iterations and starts at the additive identity zero.",
      "De accumulator blijft tussen iteraties bestaan en begint bij nul.",
    ],
  }),
  f("range-stop", {
    title: [
      "Repeat a known number of times",
      "Herhaal een bekend aantal keren",
    ],
    topics: "range",
    requires: "for",
    why: [
      "range supplies a sequence of integer positions when there is no existing list to traverse.",
      "range levert een reeks gehele posities wanneer er geen bestaande lijst is om te doorlopen.",
    ],
    teach: [
      "range(stop) starts at zero and stops before stop. range(3) therefore supplies 0, 1, 2. range is a sequence object, not a ready-made list. Use list(range(3)) when you need a materialised list; a for loop can use range directly. Negative or zero stops produce no values in this form.",
      "range(stop) begint bij nul en stopt vóór stop. range(3) levert dus 0, 1, 2. range is een reeksobject, geen kant-en-klare lijst. Gebruik list(range(3)) als je een echte lijst nodig hebt; een for-lus kan range direct gebruiken. Een negatieve of nul-stop levert in deze vorm geen waarden.",
    ],
    rule: ["The stop value is excluded.", "De stopwaarde doet niet mee."],
    example:
      "print(list(range(3)))\nfor position in range(2):\n    print(position)",
    output: "[0, 1, 2]\n0\n1\n",
    predict: [
      "How many values does range(0) produce?",
      "Hoeveel waarden produceert range(0)?",
    ],
    name: "positions",
    check:
      'callable(positions) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Name) and n.func.id == "range" for n in _ast.walk(_ast.parse(_source)))',
    params: "count",
    body: "return list(range(count))",
    task: [
      "Return a list of positions from 0 up to but not including count, using range.",
      "Geef met range een lijst van posities van 0 tot maar niet inclusief count terug.",
    ],
    help: [
      "Convert the range object to a list for the requested return type.",
      "Zet het range-object om naar een lijst voor het gevraagde terugkeertype.",
    ],
    fragment: "list(range(count))",
    cases: [
      [[4], "_return == [0,1,2,3]"],
      [[0], "_return == []"],
      [[-1], "_return == []"],
    ],
    change: [
      "Compare printing range(3) with printing list(range(3)).",
      "Vergelijk range(3) afdrukken met list(range(3)) afdrukken.",
    ],
    explain: [
      "The conversion materialises the range values; it does not change the excluded stop.",
      "De omzetting maakt de range-waarden concreet; ze verandert de uitgesloten stop niet.",
    ],
  }),
  f("range-step", {
    title: ["Choose the start and step", "Kies begin en stap"],
    topics: "range-start-stop-step",
    requires: "range",
    why: [
      "A start and step let you count from another position or count backward.",
      "Een begin en stap laten je vanaf een andere positie of terugwaarts tellen.",
    ],
    teach: [
      "range(start, stop, step) begins at start and adds step after each value. stop remains excluded. A negative step moves downward; its stop must be lower for any values to appear. Step zero is invalid. Omitting step uses 1; providing two arguments means start and stop.",
      "range(start, stop, step) begint bij start en telt na elke waarde step op. stop blijft uitgesloten. Een negatieve stap beweegt omlaag; de stop moet dan lager zijn om waarden te krijgen. Stap nul is ongeldig. Zonder step is de stap 1; twee argumenten betekenen start en stop.",
    ],
    rule: [
      "Choose a step that moves toward the excluded stop.",
      "Kies een stap die naar de uitgesloten stop beweegt.",
    ],
    example: "print(list(range(2, 9, 3)))\nprint(list(range(4, 0, -1)))",
    output: "[2, 5, 8]\n[4, 3, 2, 1]\n",
    predict: [
      "Why is 9 absent from the first list?",
      "Waarom ontbreekt 9 in de eerste lijst?",
    ],
    name: "countdown",
    check:
      'callable(countdown) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Name) and n.func.id == "range" for n in _ast.walk(_ast.parse(_source)))',
    params: "start",
    body: "return list(range(start, 0, -1))",
    task: [
      "Return start down through 1 using range; a nonpositive start returns an empty list.",
      "Geef met range start aflopend tot en met 1 terug; een niet-positief begin geeft een lege lijst.",
    ],
    help: [
      "Use zero as the excluded stop and -1 as the step.",
      "Gebruik nul als uitgesloten stop en -1 als stap.",
    ],
    fragment: "range(start, 0, -1)",
    cases: [
      [[3], "_return == [3,2,1]"],
      [[1], "_return == [1]"],
      [[0], "_return == []"],
    ],
    change: [
      "Write down a range for the even values 2, 4, 6, 8.",
      "Schrijf een range voor de even waarden 2, 4, 6, 8.",
    ],
    explain: [
      "The final included value is one because the descending range stops before zero.",
      "De laatste opgenomen waarde is één omdat de aflopende range vóór nul stopt.",
    ],
  }),
  f("indexed-while", {
    title: [
      "Traverse a list with an index",
      "Doorloop een lijst met een index",
    ],
    topics: "while-lists",
    requires: "while indexing length for",
    why: [
      "An indexed while loop is useful when you need explicit control over the current position.",
      "Een while-lus met index is nuttig wanneer je expliciet de huidige positie wilt beheren.",
    ],
    teach: [
      "Start the index at zero and continue while index < len(items). Read items[index], then advance index. Using <= would access one past the end. Forgetting the update can create an infinite loop. Use for over values when this extra index control is unnecessary.",
      "Begin de index bij nul en ga door zolang index < len(items). Lees items[index] en verhoog daarna index. Met <= lees je één positie voorbij het einde. De update vergeten kan een eindeloze lus maken. Gebruik for over waarden als extra indexcontrole niet nodig is.",
    ],
    rule: [
      "The last valid positive index is len(items) - 1.",
      "De laatste geldige positieve index is len(items) - 1.",
    ],
    example:
      "items = [4, 7]\ni = 0\nwhile i < len(items):\n    print(items[i])\n    i += 1",
    output: "4\n7\n",
    predict: [
      "At which index does the loop stop?",
      "Bij welke index stopt de lus?",
    ],
    name: "copy_with_while",
    params: "items",
    body: "result = []\ni = 0\nwhile i < len(items):\n    result.append(items[i])\n    i += 1\nreturn result",
    task: [
      "Use an indexed while loop to return a new list with the same elements.",
      "Gebruik een while-lus met index om een nieuwe lijst met dezelfde elementen terug te geven.",
    ],
    check:
      "any(isinstance(n,_ast.While) for n in _ast.walk(_ast.parse(_source)))",
    help: [
      "Test the bound before indexing, and advance once per iteration.",
      "Test de grens vóór toegang en verhoog eenmaal per iteratie.",
    ],
    fragment: "while i < len(items):",
    cases: [
      [[[1, 3]], "_return == [1,3] and _return is not _args[0]"],
      [[[]], "_return == []"],
    ],
    change: [
      "Compare this function with items.copy() and with a for loop.",
      "Vergelijk deze functie met items.copy() en met een for-lus.",
    ],
    explain: [
      "The bound prevents invalid access, including on the first check of an empty list.",
      "De grens voorkomt ongeldige toegang, ook bij de eerste controle van een lege lijst.",
    ],
  }),
  f("search", {
    title: ["Search until a match", "Zoek tot een overeenkomst"],
    topics: "searching",
    requires: "for early-return",
    why: [
      "Searching can stop as soon as the answer is known.",
      "Zoeken kan stoppen zodra het antwoord bekend is.",
    ],
    teach: [
      "Visit values and test the current value inside the loop. Return True on a match. Return False only after the loop has exhausted every candidate. Returning False inside the loop after the first nonmatch misses later matches. An empty collection has no match.",
      "Bezoek waarden en test de huidige waarde binnen de lus. Geef True terug bij een overeenkomst. Geef pas False terug nadat de lus alle kandidaten heeft geprobeerd. False binnen de lus teruggeven na de eerste afwijking mist latere overeenkomsten. Een lege verzameling heeft geen overeenkomst.",
    ],
    rule: [
      "Do not conclude no match until all candidates have been checked.",
      "Concludeer pas dat er geen overeenkomst is nadat alle kandidaten zijn gecontroleerd.",
    ],
    example:
      "def has_zero(values):\n    for value in values:\n        if value == 0:\n            return True\n    return False\nprint(has_zero([3, 0]))",
    output: "True\n",
    predict: [
      "Why is return False outside the loop?",
      "Waarom staat return False buiten de lus?",
    ],
    name: "contains",
    params: "items, target",
    body: "for item in items:\n    if item == target:\n        return True\nreturn False",
    task: [
      "Return True if target occurs in items, otherwise False.",
      "Geef True terug als target in items voorkomt, anders False.",
    ],
    help: [
      "Check a later match as well as a first-element match.",
      "Controleer zowel een latere overeenkomst als een overeenkomst op de eerste positie.",
    ],
    fragment: "if item == target:",
    cases: [
      [[[1, 3], 3], "_return is True"],
      [[[1, 3], 2], "_return is False"],
      [[[], 1], "_return is False"],
    ],
    change: [
      "Test duplicate target values. Does the answer change?",
      "Test dubbele doelwaarden. Verandert het antwoord?",
    ],
    explain: [
      "An early return proves existence; the final return covers exhausted searches.",
      "Een vroege return bewijst aanwezigheid; de laatste return verwerkt uitgeputte zoekacties.",
    ],
  }),
  f("filter", {
    title: [
      "Build a list of matching values",
      "Bouw een lijst van passende waarden",
    ],
    topics: "filtering",
    requires: "for append comparisons",
    why: [
      "Filtering keeps every matching value, so it must inspect the whole input.",
      "Filteren bewaart elke passende waarde en moet daarom de hele invoer bekijken.",
    ],
    teach: [
      "Create an empty result before the loop. For each value, append only if its condition is True. Return the result after all input values have been considered. Build a new list rather than removing items from the list you are traversing. This preserves both order and the original data.",
      "Maak vóór de lus een leeg resultaat. Voeg voor elke waarde alleen toe als de voorwaarde True is. Geef het resultaat terug nadat alle invoerwaarden zijn bekeken. Bouw een nieuwe lijst in plaats van items te verwijderen uit de lijst die je doorloopt. Dit bewaart zowel volgorde als oorspronkelijke gegevens.",
    ],
    rule: [
      "Filtering collects all matches without changing the source.",
      "Filteren verzamelt alle overeenkomsten zonder de bron te wijzigen.",
    ],
    example:
      "result = []\nfor score in [3, 8, 6]:\n    if score >= 6:\n        result.append(score)\nprint(result)",
    output: "[8, 6]\n",
    predict: [
      "Why must return happen after the loop in a filtering function?",
      "Waarom moet return na de lus komen in een filterfunctie?",
    ],
    name: "nonnegative",
    params: "values",
    body: "result = []\nfor value in values:\n    if value >= 0:\n        result.append(value)\nreturn result",
    task: [
      "Return the nonnegative values in their original order, keeping values unchanged.",
      "Geef de niet-negatieve waarden in oorspronkelijke volgorde terug en laat values ongewijzigd.",
    ],
    help: [
      "Include zero and retain duplicate matches.",
      "Neem nul op en behoud dubbele overeenkomsten.",
    ],
    fragment: "if value >= 0:",
    cases: [
      [[[-1, 0, 2, 2]], "_return == [0,2,2] and _args[0] == [-1,0,2,2]"],
      [[[-1]], "_return == []"],
      [[[]], "_return == []"],
    ],
    change: [
      "Test a list where every value is negative.",
      "Test een lijst waarin elke waarde negatief is.",
    ],
    explain: [
      "The result starts empty and contains only values that pass the comparison.",
      "Het resultaat begint leeg en bevat alleen waarden die de vergelijking doorstaan.",
    ],
  }),
  f("activity-log", {
    title: [
      "Mini project: activity-log analyser",
      "Miniproject: activiteitenlog analyseren",
    ],
    topics: "activity-project",
    practices: "for accumulators filtering length",
    requires: "filtering searching",
    kind: "challenge",
    guidance: "independent",
    minutes: 35,
    why: [
      "Turn a supplied log into a useful summary without altering the original records.",
      "Zet een aangeleverd log om naar een nuttige samenvatting zonder de oorspronkelijke gegevens te veranderen.",
    ],
    teach: [
      "Implement summarise(minutes). Ignore negative records. Return [total, active_days]: total is the sum of valid durations; active_days counts durations strictly above zero. Zero is a valid resting day but not active. Empty input returns [0, 0]. Think through each accumulator separately before combining them.",
      "Implementeer summarise(minutes). Negeer negatieve gegevens. Geef [total, active_days] terug: total is de som van geldige duren; active_days telt duren strikt boven nul. Nul is een geldige rustdag maar niet actief. Lege invoer geeft [0, 0]. Denk elke accumulator apart door voordat je ze combineert.",
    ],
    rule: [
      "Each accumulator answers one clearly stated question.",
      "Elke accumulator beantwoordt één duidelijk gestelde vraag.",
    ],
    example:
      "items = [2, 0, 4]\ncount = 0\nfor amount in items:\n    if amount > 1:\n        count += 1\nprint(count)",
    output: "2\n",
    predict: [
      "Would counting every item answer the same question?",
      "Beantwoordt elk item tellen dezelfde vraag?",
    ],
    name: "summarise",
    params: "minutes",
    body: "total = 0\nactive_days = 0\nfor duration in minutes:\n    if duration >= 0:\n        total += duration\n    if duration > 0:\n        active_days += 1\nreturn [total, active_days]",
    task: [
      "Implement the stated summary contract, leaving the input unchanged.",
      "Implementeer de beschreven samenvatting en laat de invoer ongewijzigd.",
    ],
    help: [
      "Start both counters at zero; a positive day contributes its duration and one active day.",
      "Begin beide tellers bij nul; een positieve dag draagt zijn duur en één actieve dag bij.",
    ],
    fragment: "active_days += 1",
    cases: [
      [[[20, 0, -4, 30]], "_return == [50,2] and _args[0] == [20,0,-4,30]"],
      [[[]], "_return == [0,0]"],
      [[[-1, 0]], "_return == [0,0]"],
      [[[1, 1, 1]], "_return == [3,3]"],
    ],
    change: [
      "Create your own week of seven records and calculate the expected answer on paper.",
      "Maak je eigen week met zeven gegevens en bereken het verwachte antwoord op papier.",
    ],
    explain: [
      "The total ignores invalid negative data; the activity counter distinguishes zero from a positive duration.",
      "Het totaal negeert ongeldige negatieve gegevens; de activiteitenteller onderscheidt nul van een positieve duur.",
    ],
  }),
];
