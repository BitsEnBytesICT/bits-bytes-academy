import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(19, slug, s);
export const activities = [
  f("records", {
    title: [
      "Name fields with dictionary keys",
      "Benoem velden met dictionarysleutels",
    ],
    topics: "dictionaries dictionary-creation",
    requires: "lists return",
    why: [
      "A dictionary lets you retrieve information by a meaningful key instead of remembering a numeric position.",
      "Een dictionary laat je informatie ophalen met een betekenisvolle sleutel in plaats van een numerieke positie te onthouden.",
    ],
    teach: [
      '{"name": "Bo", "score": 4} maps keys to values. A colon separates each key from its value; commas separate entries. record["score"] looks up that key. Keys are unique: using the same key again replaces its value. Values can have different types.',
      '{"name": "Bo", "score": 4} koppelt sleutels aan waarden. Een dubbele punt scheidt sleutel en waarde; komma’s scheiden invoeren. record["score"] zoekt die sleutel op. Sleutels zijn uniek: dezelfde sleutel opnieuw gebruiken vervangt zijn waarde. Waarden kunnen verschillende typen hebben.',
    ],
    rule: [
      "Dictionary access uses a key, not an automatic list position.",
      "Dictionarytoegang gebruikt een sleutel, niet automatisch een lijstpositie.",
    ],
    example:
      'record = {"name":"Bo","score":4}\nprint(record["name"])\nprint(record["score"])',
    output: "Bo\n4\n",
    predict: [
      "Would record[0] mean the first entry?",
      "Betekent record[0] de eerste invoer?",
    ],
    name: "player",
    params: "name, score",
    body: 'return {"name":name,"score":score}',
    task: [
      "Return a dictionary with keys name and score mapped to the supplied values.",
      "Geef een dictionary terug met sleutels name en score gekoppeld aan de gegeven waarden.",
    ],
    help: [
      "Quote field names, but use parameter values without quotes.",
      "Zet veldnamen tussen aanhalingstekens, maar gebruik parameterwaarden zonder.",
    ],
    fragment: '{"name": name}',
    cases: [
      [["Ada", 3], '_return == {"name":"Ada","score":3}'],
      [["", 0], '_return == {"name":"","score":0}'],
    ],
    change: [
      "Add a Boolean active field in an experiment.",
      "Voeg in een experiment een booleaans active-veld toe.",
    ],
    explain: [
      "Named fields keep the record’s meaning visible when accessed later.",
      "Benoemde velden houden de betekenis van het record zichtbaar bij latere toegang.",
    ],
  }),
  f("keys", {
    title: ["Choose valid keys", "Kies geldige sleutels"],
    topics: "dictionary-keys invalid-keys",
    requires: "dictionaries tuples",
    why: [
      "Keys must remain suitable for finding their associated values. Not every Python value can be a key.",
      "Sleutels moeten geschikt blijven om de bijbehorende waarden te vinden. Niet elke Pythonwaarde kan een sleutel zijn.",
    ],
    teach: [
      "Dictionary keys must be hashable. Strings and numbers are common keys; tuples containing only hashable values work too. Lists and dictionaries are mutable and cannot be keys: Python raises TypeError. tuple(coordinates) converts a coordinate list to an immutable tuple. Values do not have this restriction.",
      "Dictionarysleutels moeten hashbaar zijn. Strings en getallen zijn gebruikelijke sleutels; tuples met alleen hashbare waarden werken ook. Lijsten en dictionaries zijn veranderbaar en kunnen geen sleutel zijn: Python geeft TypeError. tuple(coordinates) zet een coördinatenlijst om in een onveranderbare tuple. Waarden hebben deze beperking niet.",
    ],
    rule: [
      "A mutable list may be a value, but cannot be a dictionary key.",
      "Een veranderbare lijst mag een waarde zijn, maar geen dictionarysleutel.",
    ],
    example: 'places = {(2,3):"start"}\nprint(places[(2,3)])',
    output: "start\n",
    predict: [
      "Why is the coordinate written as a tuple?",
      "Waarom is de coördinaat als tuple geschreven?",
    ],
    name: "location",
    params: "coordinates, label",
    body: "return {tuple(coordinates): label}",
    task: [
      "Given a list of two integer coordinates, return a dictionary mapping its tuple to label.",
      "Geef van een lijst met twee gehele coördinaten een dictionary terug die de tuple aan label koppelt.",
    ],
    help: [
      "Convert only the key to a tuple.",
      "Zet alleen de sleutel om naar een tuple.",
    ],
    fragment: "tuple(coordinates)",
    cases: [
      [[[2, 3], "home"], '_return == {(2,3):"home"}'],
      [[[0, -1], "edge"], '_return == {(0,-1):"edge"}'],
    ],
    change: [
      "Try using the original list as a key and read the resulting TypeError.",
      "Probeer de oorspronkelijke lijst als sleutel te gebruiken en lees de TypeError.",
    ],
    explain: [
      "The tuple of integers is hashable and keeps the pair together as one key.",
      "De tuple van gehele getallen is hashbaar en houdt het paar als één sleutel samen.",
    ],
  }),
  f("update", {
    title: ["Build and update a record", "Bouw en wijzig een record"],
    topics: "empty-dictionaries adding-keys update overwriting",
    requires: "dictionaries assignment",
    why: [
      "Start with an empty mapping when fields become available over time.",
      "Begin met een lege koppeling wanneer velden gaandeweg beschikbaar komen.",
    ],
    teach: [
      "{} creates an empty dictionary. record[key] = value adds a missing key or overwrites its current value. update(other) applies several entries and returns None. If a key appears in both mappings, the incoming value wins. Existing unrelated fields remain present.",
      "{} maakt een lege dictionary. record[key] = value voegt een ontbrekende sleutel toe of overschrijft de huidige waarde. update(other) past meerdere invoeren toe en geeft None terug. Staat een sleutel in beide koppelingen, dan wint de inkomende waarde. Andere bestaande velden blijven aanwezig.",
    ],
    rule: [
      "Assignment adds or replaces one key; update applies several entries.",
      "Toewijzing voegt één sleutel toe of vervangt die; update past meerdere invoeren toe.",
    ],
    example:
      'record = {}\nrecord["score"] = 2\nrecord.update({"score":5,"active":True})\nprint(record)',
    output: "{'score': 5, 'active': True}\n",
    predict: [
      "Why is there only one score key?",
      "Waarom is er maar één score-sleutel?",
    ],
    name: "update_player",
    params: "record, score",
    body: 'record.update({"score":score,"active":True})\nreturn record',
    task: [
      "Set score to the supplied value and active to True, preserving other fields. Return the same record.",
      "Zet score op de gegeven waarde en active op True, behoud andere velden. Geef hetzelfde record terug.",
    ],
    help: [
      "Apply both new fields without replacing the entire dictionary.",
      "Pas beide nieuwe velden toe zonder de hele dictionary te vervangen.",
    ],
    fragment: 'record.update({"score": score, "active": True})',
    cases: [
      [
        [{ name: "Bo", score: 2 }, 5],
        '_return == {"name":"Bo","score":5,"active":True} and _return is _args[0]',
      ],
      [[{}, 0], '_return == {"score":0,"active":True}'],
    ],
    change: [
      "Call again with a different score and inspect which keys remain.",
      "Roep opnieuw aan met een andere score en bekijk welke sleutels blijven.",
    ],
    explain: [
      "Updating entries changes only the selected keys and preserves the remaining record.",
      "Invoeren bijwerken verandert alleen de gekozen sleutels en behoudt het overige record.",
    ],
  }),
  f("lookup", {
    title: ["Handle a missing key", "Verwerk een ontbrekende sleutel"],
    topics: "lookup key-error get dictionary-membership",
    requires: "dictionaries none",
    why: [
      "A missing field is different from a field whose value is zero or None.",
      "Een ontbrekend veld verschilt van een veld met waarde nul of None.",
    ],
    teach: [
      "record[key] raises KeyError if key is absent. record.get(key, default) returns the default only when key is absent; an existing zero or None is preserved. Without an explicit default, get returns None for an absent key. key in record tests keys, not values. Use direct access when missing data is an error and get when a fallback is part of the design.",
      "record[key] veroorzaakt KeyError als key ontbreekt. record.get(key, default) geeft de standaardwaarde alleen bij afwezigheid; een bestaande nul of None blijft behouden. Zonder expliciete standaard geeft get None bij een ontbrekende sleutel. key in record test sleutels, geen waarden. Gebruik directe toegang wanneer ontbrekende gegevens een fout zijn en get wanneer een terugvalwaarde bij het ontwerp hoort.",
    ],
    rule: [
      "A fallback applies to absence, not to every false-like value.",
      "Een terugvalwaarde geldt bij afwezigheid, niet bij elke onwaarachtige waarde.",
    ],
    example:
      'record = {"score":0}\nprint(record.get("score",10))\nprint(record.get("lives",3))\nprint("score" in record)',
    output: "0\n3\nTrue\n",
    predict: [
      "Why does the first lookup return zero instead of ten?",
      "Waarom geeft de eerste zoekactie nul in plaats van tien?",
    ],
    name: "score_of",
    params: "record",
    body: 'return record.get("score", 0)',
    task: [
      "Return the stored score or 0 if the key is absent. Preserve an explicitly stored None.",
      "Geef de bewaarde score terug of 0 als de sleutel ontbreekt. Behoud een expliciet bewaarde None.",
    ],
    help: [
      "Use get with a default; do not use an or fallback.",
      "Gebruik get met standaardwaarde; gebruik geen or-terugvalwaarde.",
    ],
    fragment: 'record.get("score", 0)',
    cases: [
      [[{ score: 4 }], "_return == 4"],
      [[{}], "_return == 0"],
      [[{ score: null }], "_return is None"],
    ],
    change: [
      "Compare absent score, score 0 and score None.",
      "Vergelijk ontbrekende score, score 0 en score None.",
    ],
    explain: [
      "get distinguishes missing keys from present keys with special values.",
      "get onderscheidt ontbrekende sleutels van aanwezige sleutels met speciale waarden.",
    ],
  }),
  f("delete", {
    title: ["Remove a dictionary entry", "Verwijder een dictionary-invoer"],
    topics: "dictionary-delete dictionary-pop",
    requires: "lookup",
    why: [
      "Removing a key and retrieving its old value can be one operation.",
      "Een sleutel verwijderen en de oude waarde ophalen kan één bewerking zijn.",
    ],
    teach: [
      "del record[key] removes an entry and raises KeyError if absent. record.pop(key, default) removes and returns a present value, or returns the default when absent. Without the default, pop also raises KeyError. Dictionary pop selects by key; list pop selects by index.",
      "del record[key] verwijdert een invoer en veroorzaakt KeyError bij afwezigheid. record.pop(key, default) verwijdert een aanwezige waarde en geeft die terug, of geeft de standaard bij afwezigheid. Zonder standaard veroorzaakt pop ook KeyError. Dictionary-pop kiest op sleutel; lijst-pop op index.",
    ],
    rule: [
      "Dictionary pop returns the value associated with the removed key.",
      "Dictionary-pop geeft de waarde van de verwijderde sleutel terug.",
    ],
    example:
      'record = {"name":"Bo","temporary":4}\ndel record["temporary"]\nprint(record.pop("name"))\nprint(record)',
    output: "Bo\n{}\n",
    predict: [
      "How does del differ from an expression returning a value?",
      "Hoe verschilt del van een uitdrukking die een waarde teruggeeft?",
    ],
    name: "take_note",
    params: "record",
    body: 'return record.pop("note", "")',
    task: [
      "Remove note and return its old value; return an empty string if absent. Preserve other fields.",
      "Verwijder note en geef de oude waarde terug; geef een lege string bij afwezigheid. Behoud andere velden.",
    ],
    help: [
      "Supply a fallback directly to pop.",
      "Geef een terugvalwaarde direct aan pop.",
    ],
    fragment: 'record.pop("note", "")',
    cases: [
      [
        [{ note: "hello", score: 2 }],
        '_return == "hello" and _args[0] == {"score":2}',
      ],
      [[{}], '_return == ""'],
    ],
    change: [
      "Call the function twice on the same record and explain the second answer.",
      "Roep de functie tweemaal op hetzelfde record aan en leg het tweede antwoord uit.",
    ],
    explain: [
      "The first call consumes the note; later calls use the absent-key fallback.",
      "De eerste aanroep gebruikt de notitie; latere aanroepen gebruiken de terugvalwaarde bij afwezigheid.",
    ],
  }),
  f("views", {
    title: [
      "Visit keys, values and pairs",
      "Bezoek sleutels, waarden en paren",
    ],
    topics: "keys values items dictionary-iteration",
    requires: "for packing-unpacking",
    why: [
      "Choose the dictionary view that matches the information your loop needs.",
      "Kies de dictionaryweergave die past bij de informatie die je lus nodig heeft.",
    ],
    teach: [
      "Looping over a dictionary visits its keys. keys() exposes keys, values() values, and items() (key, value) pairs. In for name, score in scores.items(), tuple unpacking names both parts. These are live views, not independent list copies. Use list(...) when a separate sequence is needed. Do not add or remove keys while iterating the same mapping.",
      "Een dictionary doorlopen bezoekt zijn sleutels. keys() toont sleutels, values() waarden en items() (sleutel, waarde)-paren. In for name, score in scores.items() benoemt tuple-uitpakken beide delen. Dit zijn levende weergaven, geen onafhankelijke lijstkopieën. Gebruik list(...) als een aparte reeks nodig is. Voeg geen sleutels toe en verwijder ze niet tijdens het doorlopen van dezelfde koppeling.",
    ],
    rule: [
      "items supplies both key and value to each iteration.",
      "items levert bij elke iteratie zowel sleutel als waarde.",
    ],
    example:
      'scores = {"Ada":3,"Bo":5}\nprint(list(scores.keys()))\nprint(list(scores.values()))\nfor name,score in scores.items():\n    print(name,score)',
    output: "['Ada', 'Bo']\n[3, 5]\nAda 3\nBo 5\n",
    predict: [
      "What does a plain for name in scores visit?",
      "Wat bezoekt een gewone for name in scores?",
    ],
    name: "labels",
    params: "scores",
    body: 'result = []\nfor name, score in scores.items():\n    result.append(f"{name}: {score}")\nreturn result',
    task: [
      "Return one name: score string per entry, preserving dictionary insertion order.",
      "Geef per invoer één name: score-string terug met behoud van dictionary-invoegvolgorde.",
    ],
    help: [
      "Unpack items pairs and format both values.",
      "Pak items-paren uit en formatteer beide waarden.",
    ],
    fragment: "for name, score in scores.items():",
    cases: [
      [[{ Ada: 3, Bo: 0 }], '_return == ["Ada: 3","Bo: 0"]'],
      [[{}], "_return == []"],
    ],
    change: [
      "Compare returning keys only with the labelled report.",
      "Vergelijk alleen sleutels teruggeven met het gelabelde rapport.",
    ],
    explain: [
      "items avoids a separate lookup for each key because each pair already contains its value.",
      "items voorkomt een aparte zoekactie voor elke sleutel omdat elk paar de waarde al bevat.",
    ],
  }),
  f("comprehension", {
    title: ["Derive a new mapping", "Leid een nieuwe koppeling af"],
    topics: "dictionary-comprehensions",
    requires: "dictionary-iteration conditional-list-comprehensions",
    why: [
      "A dictionary comprehension creates a mapping with one key/value expression per selected input.",
      "Een dictionary comprehension maakt een koppeling met één sleutel/waarde-uitdrukking per gekozen invoer.",
    ],
    teach: [
      "{key_expression: value_expression for item in source} uses braces and a colon. An optional final if filters entries. Duplicate produced keys overwrite earlier values. Unlike a list comprehension, each output requires both a key and a value. Build a new mapping to preserve the original.",
      "{sleuteluitdrukking: waardeuitdrukking for item in bron} gebruikt accolades en een dubbele punt. Een optionele laatste if filtert invoeren. Dubbele gemaakte sleutels overschrijven eerdere waarden. Anders dan een list comprehension vraagt elke uitvoer zowel een sleutel als een waarde. Maak een nieuwe koppeling om het origineel te bewaren.",
    ],
    rule: [
      "A dictionary comprehension must choose both keys and values.",
      "Een dictionary comprehension moet zowel sleutels als waarden kiezen.",
    ],
    example:
      'scores = {"Ada":3,"Bo":0}\nprint({name:score+1 for name,score in scores.items() if score > 0})',
    output: "{'Ada': 4}\n",
    predict: [
      "Why is Bo missing from the new mapping?",
      "Waarom ontbreekt Bo in de nieuwe koppeling?",
    ],
    name: "double_positive",
    params: "scores",
    body: "return {name:score*2 for name,score in scores.items() if score > 0}",
    task: [
      "Use a dictionary comprehension to double positive scores and omit zero/negative scores.",
      "Gebruik een dictionary comprehension om positieve scores te verdubbelen en nul/negatieve scores weg te laten.",
    ],
    check:
      "any(isinstance(n,_ast.DictComp) for n in _ast.walk(_ast.parse(_source)))",
    help: [
      "Keep each name as key; transform only its positive value.",
      "Behoud elke naam als sleutel; verander alleen zijn positieve waarde.",
    ],
    fragment:
      "{name: score * 2 for name, score in scores.items() if score > 0}",
    cases: [
      [
        [{ A: 2, B: 0, C: -1 }],
        '_return == {"A":4} and _args[0] == {"A":2,"B":0,"C":-1}',
      ],
      [[{}], "_return == {}"],
    ],
    change: [
      "Rewrite the comprehension as an ordinary loop.",
      "Herschrijf de comprehension als een gewone lus.",
    ],
    explain: [
      "The comprehension filters before adding entries and creates a separate dictionary.",
      "De comprehension filtert vóór toevoegen en maakt een aparte dictionary.",
    ],
  }),
  f("registry", {
    title: ["Maintain a small scoreboard", "Beheer een klein scorebord"],
    topics: "dictionary-review",
    practices: "get adding-keys overwriting dictionary-iteration",
    requires: "get dictionary-iteration",
    guidance: "independent",
    minutes: 25,
    why: [
      "Apply records to a new scoring problem with a clear update contract.",
      "Pas records toe op een nieuw scoreprobleem met een duidelijke wijzigingsafspraak.",
    ],
    teach: [
      "Implement award(scores, name, points). Create a separate outer dictionary, add points to that player’s current score or zero for a new player, and return the updated mapping. Negative points are allowed. Keep other players and leave the original mapping unchanged. dict.copy() creates the shallow copy needed for these numeric values.",
      "Implementeer award(scores, name, points). Maak een aparte buitenste dictionary, tel points bij de huidige score van die speler of nul voor een nieuwe speler en geef de gewijzigde koppeling terug. Negatieve punten zijn toegestaan. Behoud andere spelers en laat het origineel ongewijzigd. dict.copy() maakt de oppervlakkige kopie die voor deze numerieke waarden nodig is.",
    ],
    rule: [
      "Read the previous value with a fallback, then update one key in a copy.",
      "Lees de vorige waarde met een terugvalwaarde en wijzig daarna één sleutel in een kopie.",
    ],
    example:
      'stock = {"pens":2}\nupdated = stock.copy()\nupdated["pens"] += 3\nprint(stock)\nprint(updated)',
    output: "{'pens': 2}\n{'pens': 5}\n",
    predict: [
      "Why do the two dictionaries end with different values?",
      "Waarom eindigen beide dictionaries met verschillende waarden?",
    ],
    name: "award",
    params: "scores, name, points",
    body: "result = scores.copy()\nresult[name] = result.get(name, 0) + points\nreturn result",
    task: [
      "Implement the update contract for existing and new players.",
      "Implementeer de wijzigingsafspraak voor bestaande en nieuwe spelers.",
    ],
    help: [
      "Copy before changing the player’s field.",
      "Kopieer vóór het spelersveld te veranderen.",
    ],
    fragment: "result.get(name, 0)",
    cases: [
      [
        [{ Ada: 3 }, "Ada", 2],
        '_return == {"Ada":5} and _args[0] == {"Ada":3}',
      ],
      [[{}, "Bo", 0], '_return == {"Bo":0}'],
      [[{ Ada: 3 }, "Bo", -1], '_return == {"Ada":3,"Bo":-1}'],
    ],
    change: [
      "Award points twice while keeping both the original and updated versions.",
      "Ken tweemaal punten toe en bewaar zowel de oorspronkelijke als gewijzigde versie.",
    ],
    explain: [
      "A copied mapping and an absent-key fallback keep new and existing players on the same update path.",
      "Een gekopieerde koppeling en terugvalwaarde voor ontbrekende sleutels houden nieuwe en bestaande spelers op dezelfde wijzigingsroute.",
    ],
  }),
];
