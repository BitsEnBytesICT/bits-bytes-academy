import { lesson as L, quiz as Q, predict as P } from "./helpers.mjs";
const g = "dictionaries-introduction";
L(
  g,
  1,
  "A dictionary maps unique keys to values. Use a meaningful key instead of remembering a numeric position. Modern Python dictionaries preserve insertion order, but lookup is still based on keys.",
  "Een dictionary koppelt unieke keys aan values. Gebruik een duidelijke key in plaats van een numerieke positie te onthouden. Moderne Python-dictionaries bewaren de invoegvolgorde, maar opvragen gebeurt via keys.",
  "Create settings with mode mapped to eco and level mapped to 3.",
  "Maak settings waarin mode naar eco verwijst en level naar 3.",
  'settings = {"mode": "eco", "level": 3}\nprint(settings)\n',
  "settings == {'mode':'eco','level':3}",
  {
    example: 'record = {"name": "Sensor", "active": True}',
    titleNl: "Key-value mappings",
  },
);
L(
  g,
  2,
  "Dictionary literals use braces with key: value pairs separated by commas. Values may have different types. Repeated keys do not create separate entries: the later assignment wins.",
  "Dictionary literals gebruiken accolades met key: value-paren, gescheiden door komma’s. Values mogen verschillende types hebben. Een herhaalde key maakt geen extra item: de laatste toewijzing geldt.",
  "Create stock mapping lamp to 4, cable to 9, and battery to 12.",
  "Maak stock met lamp: 4, cable: 9 en battery: 12.",
  'stock = {"lamp": 4, "cable": 9, "battery": 12}\nprint(stock)\n',
  "stock == {'lamp':4,'cable':9,'battery':12}",
  { titleNl: "Een dictionary literal" },
);
L(
  g,
  3,
  "Dictionary keys must be hashable. Strings, numbers, and suitable tuples can be keys; mutable lists cannot. Python raises TypeError when a list is used as a key.",
  "Dictionary-keys moeten hashable zijn. Strings, getallen en geschikte tuples kunnen keys zijn; veranderlijke lists niet. Python geeft TypeError als je een list als key gebruikt.",
  "Run the starter to observe the TypeError. Repair positions by replacing the list key [2, 3] with the tuple (2, 3).",
  "Voer de startcode uit om de TypeError te zien. Herstel positions door de list-key [2, 3] te vervangen door de tuple (2, 3).",
  'positions = {(2, 3): "beacon"}\nprint(positions)\n',
  "positions == {(2,3):'beacon'}",
  { starter: 'positions = {[2, 3]: "beacon"}\n', titleNl: "Hashable keys" },
);
L(
  g,
  4,
  "{} creates an empty dictionary. This is different from an empty list []. You can start with an empty mapping and add entries as observations arrive.",
  "{} maakt een lege dictionary. Dat verschilt van de lege list []. Begin met een lege mapping en voeg items toe zodra er gegevens binnenkomen.",
  "Create an empty dictionary called observations.",
  "Maak een lege dictionary met de naam observations.",
  "observations = {}\nprint(observations)\n",
  "type(observations) is dict and observations == {}",
  { titleNl: "Een lege dictionary" },
);
L(
  g,
  5,
  "Assign to mapping[key] to add a new key-value pair. If the key already exists, assignment replaces its value. A key does not need to exist before this assignment.",
  "Wijs toe aan mapping[key] om een nieuw key-value-paar toe te voegen. Bestaat de key al, dan wordt de value vervangen. De key hoeft vóór de assignment niet te bestaan.",
  "Start counts empty. Add north = 3 and south = 5, then print counts.",
  "Begin met een lege counts. Voeg north = 3 en south = 5 toe en druk counts af.",
  'counts = {}\ncounts["north"] = 3\ncounts["south"] = 5\nprint(counts)\n',
  "counts == {'north':3,'south':5}",
  { titleNl: "Een entry toevoegen" },
);
L(
  g,
  6,
  "update() merges entries into an existing dictionary. New keys are added; existing keys receive the supplied values. The method changes the mapping in place.",
  "update() voegt entries samen met een bestaande dictionary. Nieuwe keys worden toegevoegd; bestaande keys krijgen de opgegeven values. De mapping wordt zelf aangepast.",
  "Update settings with volume = 8 and brightness = 4 while retaining mode.",
  "Werk settings bij met volume = 8 en brightness = 4. Behoud mode.",
  'settings = {"mode": "eco"}\nsettings.update({"volume": 8, "brightness": 4})\nprint(settings)\n',
  "settings == {'mode':'eco','volume':8,'brightness':4}",
  {
    starter: 'settings = {"mode": "eco"}\n',
    titleNl: "Meerdere entries bijwerken",
  },
);
L(
  g,
  7,
  "Assigning to an existing key replaces its value without creating a duplicate key. Unrelated entries remain unchanged. This differs from appending another row to a list.",
  "Een assignment aan een bestaande key vervangt de value zonder een dubbele key te maken. Andere entries blijven ongewijzigd. Dat verschilt van een extra rij toevoegen aan een list.",
  'Change stock["lamp"] to 10 and keep cable at 9.',
  'Verander stock["lamp"] naar 10 en laat cable op 9 staan.',
  'stock = {"lamp": 4, "cable": 9}\nstock["lamp"] = 10\nprint(stock)\n',
  "stock == {'lamp':10,'cable':9}",
  {
    starter: 'stock = {"lamp": 4, "cable": 9}\n',
    titleNl: "Een bestaande value vervangen",
  },
);
L(
  g,
  8,
  "A dictionary comprehension creates pairs from an iterable: {key: value for ...}. zip pairs items from separate iterables, stopping when the shortest input ends.",
  "Een dictionary comprehension maakt paren uit een iterable: {key: value for ...}. zip koppelt items uit aparte iterables en stopt wanneer de kortste invoer eindigt.",
  "Use zip and a dictionary comprehension to map names to levels in mapping.",
  "Gebruik zip en een dictionary comprehension om names aan levels te koppelen in mapping.",
  'names = ["north", "south", "west"]\nlevels = [2, 5, 3]\nmapping = {name: level for name, level in zip(names, levels)}\nprint(mapping)\n',
  "mapping == {'north':2,'south':5,'west':3} and any(isinstance(n,_ast.DictComp) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter: 'names = ["north", "south", "west"]\nlevels = [2, 5, 3]\n',
    titleNl: "Dictionary comprehensions",
  },
);
L(
  g,
  9,
  "Combine construction and updates to maintain a small catalog. Nested dictionaries let one key refer to an entire mapping. Keep names clear so the level you are modifying is obvious.",
  "Combineer opbouwen en bijwerken om een kleine catalogus te onderhouden. Bij geneste dictionaries kan één key naar een volledige mapping verwijzen. Kies duidelijke namen, zodat je weet welk niveau je wijzigt.",
  "Build quantities from names and amounts. Add tape: 6 and change lamp to 8. Put quantities under the key workshop in catalog.",
  "Maak quantities uit names en amounts. Voeg tape: 6 toe en verander lamp naar 8. Zet quantities onder de key workshop in catalog.",
  'names = ["lamp", "cable"]\namounts = [3, 7]\nquantities = {name: amount for name, amount in zip(names, amounts)}\nquantities["tape"] = 6\nquantities["lamp"] = 8\ncatalog = {"workshop": quantities}\nprint(catalog)\n',
  "quantities == {'lamp':8,'cable':7,'tape':6} and catalog == {'workshop':quantities}",
  {
    starter: 'names = ["lamp", "cable"]\namounts = [3, 7]\n',
    titleNl: "Terugblik: dictionaries maken",
  },
);
const u = "using-dictionaries";
L(
  u,
  1,
  "Dictionary operations let you retrieve, update, and summarize data by meaning rather than position. Start by checking the shape of the mapping and the types of its values.",
  "Met dictionary-bewerkingen kun je data op betekenis in plaats van positie opvragen, wijzigen en samenvatten. Bekijk eerst de structuur van de mapping en de types van de values.",
  "Create config with mode: manual. Use update to add speed: 4 and active: True.",
  "Maak config met mode: manual. Voeg met update speed: 4 en active: True toe.",
  'config = {"mode": "manual"}\nconfig.update({"speed": 4, "active": True})\nprint(config)\n',
  "config == {'mode':'manual','speed':4,'active':True}",
  { titleNl: "Dictionaries gebruiken" },
);
L(
  u,
  2,
  "mapping[key] returns the value associated with a key. Unlike list indexing, a numeric dictionary key is a literal key, not a position. The value may itself be another collection.",
  "mapping[key] geeft de value bij een key terug. Een numerieke dictionary-key is een letterlijke key, geen positie zoals bij een list. De value kan zelf weer een verzameling zijn.",
  'Read temperatures["east"] into east_temp and temperatures["west"] into west_temp.',
  'Lees temperatures["east"] naar east_temp en temperatures["west"] naar west_temp.',
  'temperatures = {"east": 18, "west": 21}\neast_temp = temperatures["east"]\nwest_temp = temperatures["west"]\nprint(east_temp, west_temp)\n',
  "east_temp == 18 and west_temp == 21",
  {
    starter: 'temperatures = {"east": 18, "west": 21}\n',
    titleNl: "Een value opvragen",
  },
);
L(
  u,
  3,
  "Looking up an absent key with square brackets raises KeyError. Use key in mapping to check keys before lookup. Membership tests keys, not values.",
  "Een ontbrekende key opvragen met vierkante haakjes geeft KeyError. Controleer eerst key in mapping. Membership controleert keys, niet values.",
  'Fix the missing-key lookup. Set result to readings["south"] if south exists, otherwise set it to unavailable.',
  'Herstel de lookup voor de ontbrekende key. Zet result op readings["south"] als south bestaat, en anders op unavailable.',
  'readings = {"north": 12}\nif "south" in readings:\n    result = readings["south"]\nelse:\n    result = "unavailable"\nprint(result)\n',
  "result == 'unavailable'",
  {
    starter: 'readings = {"north": 12}\nprint(readings["south"])\n',
    titleNl: "Een ontbrekende key",
  },
);
L(
  u,
  4,
  "get(key, default) returns a value when the key exists and the default otherwise. Without an explicit default it returns None. The lookup does not add the missing key.",
  "get(key, default) geeft de value terug als de key bestaat en anders de default. Zonder expliciete default is dat None. De lookup voegt de ontbrekende key niet toe.",
  "Use get to read absent timeout with default 30 into timeout. Leave settings unchanged.",
  "Gebruik get om de ontbrekende timeout met default 30 op te vragen in timeout. Laat settings ongewijzigd.",
  'settings = {"mode": "eco"}\ntimeout = settings.get("timeout", 30)\nprint(timeout)\n',
  "timeout == 30 and settings == {'mode':'eco'}",
  {
    starter: 'settings = {"mode": "eco"}\n',
    titleNl: "Een default value gebruiken",
  },
);
L(
  u,
  5,
  "pop(key, default) removes a key and returns its value. A supplied default handles absence without KeyError. Use it when moving an entry to another collection.",
  "pop(key, default) verwijdert een key en geeft de value terug. Een default voorkomt KeyError als de key ontbreekt. Gebruik dit om een entry naar een andere verzameling te verplaatsen.",
  "Pop lamp into removed, then pop absent battery with default 0 into missing.",
  "Pop lamp naar removed en pop daarna de ontbrekende battery met default 0 naar missing.",
  'stock = {"lamp": 4, "cable": 9}\nremoved = stock.pop("lamp")\nmissing = stock.pop("battery", 0)\nprint(removed, missing, stock)\n',
  "removed == 4 and missing == 0 and stock == {'cable':9}",
  {
    starter: 'stock = {"lamp": 4, "cable": 9}\n',
    titleNl: "Entries verwijderen",
  },
);
L(
  u,
  6,
  "keys() returns a dynamic view of keys. If the dictionary changes, the view reflects it. Convert the view to list when you want an independent snapshot of its current order.",
  "keys() geeft een dynamische view van de keys terug. Als de dictionary verandert, verandert de view mee. Zet de view om naar list voor een onafhankelijke momentopname van de huidige volgorde.",
  "Create view with stock.keys() and snapshot with list(view). Add battery: 2, then compare the view and snapshot.",
  "Maak view met stock.keys() en snapshot met list(view). Voeg battery: 2 toe en vergelijk view met snapshot.",
  'stock = {"lamp": 4, "cable": 9}\nview = stock.keys()\nsnapshot = list(view)\nstock["battery"] = 2\nprint(list(view), snapshot)\n',
  "list(view) == ['lamp','cable','battery'] and snapshot == ['lamp','cable']",
  { starter: 'stock = {"lamp": 4, "cable": 9}\n', titleNl: "Key views" },
);
L(
  u,
  7,
  "values() provides a view of the values, which can be iterated or passed to functions such as sum. Duplicate values remain present because they belong to different keys.",
  "values() geeft een view van de values. Je kunt erover loopen of de view aan functions zoals sum geven. Dubbele values blijven aanwezig omdat ze bij verschillende keys horen.",
  "Sum the values in counts into total.",
  "Tel de values in counts op in total.",
  'counts = {"east": 4, "west": 4, "north": 7}\ntotal = sum(counts.values())\nprint(total)\n',
  "total == 15",
  {
    starter: 'counts = {"east": 4, "west": 4, "north": 7}\n',
    titleNl: "Value views",
  },
);
L(
  u,
  8,
  "items() provides a view of (key, value) pairs. Unpack each pair into two names in a loop. It is a view, not a separate list, unless you convert it.",
  "items() geeft een view van (key, value)-paren. Pak elk paar in een loop uit in twee namen. Het is een view en pas na conversie een aparte list.",
  "Build lines containing east=4 and west=7 by looping over counts.items().",
  "Maak lines met east=4 en west=7 door over counts.items() te loopen.",
  'counts = {"east": 4, "west": 7}\nlines = []\nfor name, count in counts.items():\n    lines.append(name + "=" + str(count))\nprint(lines)\n',
  "lines == ['east=4','west=7']",
  {
    starter: 'counts = {"east": 4, "west": 7}\nlines = []\n',
    titleNl: "Key-value-paren doorlopen",
  },
);
L(
  u,
  9,
  "Use safe lookup, removal, and iteration together when transferring selected data. Distinguish whether an operation should merely read an entry or consume it.",
  "Gebruik veilige lookup, verwijderen en herhalen samen om geselecteerde data te verplaatsen. Bepaal bewust of een bewerking een entry alleen leest of ook verwijdert.",
  "Move red and blue from bins into selected using pop. Leave green in bins and store the sum of selected values in total.",
  "Verplaats red en blue met pop uit bins naar selected. Laat green in bins staan en sla de som van selected-values op in total.",
  'bins = {"red": 3, "blue": 5, "green": 8}\nselected = {}\nfor color in ["red", "blue"]:\n    selected[color] = bins.pop(color)\ntotal = sum(selected.values())\nprint(selected, bins, total)\n',
  "selected == {'red':3,'blue':5} and bins == {'green':8} and total == 8",
  {
    starter: 'bins = {"red": 3, "blue": 5, "green": 8}\n',
    titleNl: "Terugblik: dictionaries gebruiken",
  },
);
Q(g, [
  [
    "Which value can be a dictionary key?",
    "Welke waarde kan een dictionary-key zijn?",
    "",
    ["(2, 3)", "[2, 3]", '{"a": 2}'],
    "A tuple of hashable integers is hashable; lists and dictionaries are mutable and unhashable.",
    "Een tuple met hashable integers is hashable; lists en dictionaries zijn mutable en niet hashable.",
  ],
  P(
    'd = {"a": 1}\nd["b"] = 2\nprint(d["b"])',
    ["2", "1", "b"],
    "Assigning a new key stores its associated value.",
    "Een assignment aan een nieuwe key bewaart de bijbehorende value.",
  ),
  P(
    'd = {"a": 1, "a": 4}\nprint(len(d))',
    ["1", "2", "4"],
    "Keys are unique, so the later value replaces the earlier one.",
    "Keys zijn uniek; de latere value vervangt de eerdere.",
  ),
  P(
    "print({n: n * 2 for n in [1, 3]})",
    ["{1: 2, 3: 6}", "{2: 1, 6: 3}", "[2, 6]"],
    "Each input becomes a key and its double becomes the value.",
    "Elke invoer wordt een key en het dubbele wordt de value.",
  ),
  [
    "How do you create an empty dictionary?",
    "Hoe maak je een lege dictionary?",
    "",
    ["{}", "[]", "()"],
    "Empty braces denote an empty dictionary.",
    "Lege accolades stellen een lege dictionary voor.",
  ],
]);
Q(u, [
  P(
    'd = {"x": 9}\nprint(d["x"])',
    ["9", "x", "0"],
    "A key lookup returns the associated value.",
    "Een key-lookup geeft de bijbehorende value terug.",
  ),
  [
    'What does d["missing"] raise when the key is absent?',
    'Welke fout geeft d["missing"] als de key ontbreekt?',
    "",
    ["KeyError", "IndexError", "NameError"],
    "Bracket lookup on a missing dictionary key raises KeyError.",
    "Een ontbrekende dictionary-key met haakjes opvragen geeft KeyError.",
  ],
  P(
    'print({"x": 9}.get("z", 2))',
    ["2", "9", "None"],
    "The key is missing, so get returns the explicit default.",
    "De key ontbreekt, dus get geeft de opgegeven default terug.",
  ),
  P(
    'print("x" in {"x": 9})',
    ["True", "False"],
    "Dictionary membership tests keys.",
    "Membership bij een dictionary controleert keys.",
  ),
  P(
    'd = {"a": 2, "b": 5}\nprint(d.pop("a"))',
    ["2", "a", "None"],
    "pop removes the key and returns its value.",
    "pop verwijdert de key en geeft de value terug.",
  ),
  P(
    'print(sum({"a": 2, "b": 5}.values()))',
    ["7", "2", "5"],
    "values supplies both numeric values to sum.",
    "values geeft beide numerieke values aan sum.",
  ),
  P(
    'print(list({"a": 2}.items()))',
    ["[('a', 2)]", "['a']", "[2]"],
    "items yields key-value pairs as tuples.",
    "items levert key-value-paren als tuples.",
  ),
  P(
    'd = {"a": 1}\nk = d.keys()\nd["b"] = 2\nprint(list(k))',
    ["['a', 'b']", "['a']", "['b']"],
    "The key view reflects later changes to its dictionary.",
    "De key view weerspiegelt latere wijzigingen in de dictionary.",
  ),
  P(
    'print({}.get("x"))',
    ["None", "0", "False"],
    "Without an explicit default, get returns None for absence.",
    "Zonder expliciete default geeft get None terug bij een ontbrekende key.",
  ),
]);
