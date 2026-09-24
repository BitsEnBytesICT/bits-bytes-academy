import { functionPractice as F } from "./function-practice.mjs";
export const activities = [
  F(19, "build-record", {
    title: [
      "Build a record from an empty mapping",
      "Bouw een record vanuit een lege koppeling",
    ],
    topics: "record-construction",
    practices: "empty-dictionaries update",
    requires: "update empty-dictionaries",
    name: "new_record",
    params: "name, details",
    minutes: 15,
    why: [
      "Make the empty mapping yourself and apply several incoming fields with update.",
      "Maak zelf de lege koppeling en pas meerdere binnenkomende velden toe met update.",
    ],
    teach: [
      "Start with a fresh {} inside the function. Add name with an assignment, then update with details. Incoming fields may overwrite name; unrelated fields are added. Return the new record, keeping details unchanged. update returns None: do not assign its return value back to your record.",
      "Begin met een nieuwe {} binnen de functie. Voeg name toe met een toewijzing en werk daarna bij met details. Binnenkomende velden mogen name overschrijven; andere velden worden toegevoegd. Geef het nieuwe record terug en houd details ongewijzigd. update geeft None terug: wijs die terugkeerwaarde niet opnieuw toe aan je record.",
    ],
    rule: [
      "Create → add one field → update several fields → return the record.",
      "Maak → voeg één veld toe → werk meerdere velden bij → geef het record terug.",
    ],
    example:
      'item = {}\nitem["count"] = 1\nresult = item.update({"count":3,"ready":True})\nprint(item)\nprint(result)',
    output: "{'count': 3, 'ready': True}\nNone\n",
    predict: [
      "Which variable contains the changed dictionary?",
      "Welke variabele bevat de gewijzigde dictionary?",
    ],
    task: [
      "Write new_record(name, details): begin with {}, assign its name key, call update(details), and return the new mapping. Do not mutate details.",
      "Schrijf new_record(name, details): begin met {}, wijs de sleutel name toe, roep update(details) aan en geef de nieuwe koppeling terug. Verander details niet.",
    ],
    check:
      'callable(new_record) and any(isinstance(n,_ast.Dict) and not n.keys for n in _ast.walk(_ast.parse(_source))) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == "update" for n in _ast.walk(_ast.parse(_source)))',
    body: 'record = {}\nrecord["name"] = name\nrecord.update(details)\nreturn record',
    help: [
      "Store the mapping, then mutate it with update; return the mapping itself.",
      "Bewaar de koppeling, wijzig die met update en geef de koppeling zelf terug.",
    ],
    fragment: "record = {}",
    cases: [
      [
        ["Ada", { score: 0 }],
        '_return == {"name":"Ada","score":0} and _args[1] == {"score":0} and _return is not _args[1]',
      ],
      [
        ["Ada", { name: "Bo" }],
        '_return == {"name":"Bo"} and _args[1] == {"name":"Bo"}',
      ],
      [["Mia", {}], '_return == {"name":"Mia"}'],
    ],
    change: [
      "Create two records and change only one. Explain why the other must stay unchanged.",
      "Maak twee records en verander er maar één. Leg uit waarom de andere gelijk moet blijven.",
    ],
    explain: [
      "Each call creates a new mapping. update applies the incoming values after the original name, so their values win on a duplicate key.",
      "Elke aanroep maakt een nieuwe koppeling. update past de binnenkomende waarden na de oorspronkelijke naam toe; bij een dubbele sleutel winnen hun waarden.",
    ],
  }),
  F(19, "keys-and-values", {
    title: [
      "Choose a dictionary view deliberately",
      "Kies bewust een dictionaryweergave",
    ],
    topics: "view-selection",
    practices: "keys values items",
    requires: "keys values items",
    name: "columns",
    params: "record",
    minutes: 15,
    why: [
      "Extract labels and their values separately while preserving their correspondence.",
      "Haal labels en hun waarden apart op en behoud hun onderlinge verband.",
    ],
    teach: [
      "record.keys() visits labels; record.values() visits the values in the same insertion order. record.items() pairs each label with its value. list(view) captures the contents now. Return (list of keys, list of values). These lists are separate from the mapping; a shallow copy does not recursively clone nested objects.",
      "record.keys() bezoekt labels; record.values() bezoekt waarden in dezelfde invoegvolgorde. record.items() koppelt elk label aan zijn waarde. list(weergave) legt de huidige inhoud vast. Geef (lijst met sleutels, lijst met waarden) terug. Deze lijsten staan los van de koppeling; een oppervlakkige kopie kloont geneste objecten niet recursief.",
    ],
    rule: [
      "keys asks 'which labels?', values asks 'which data?', items keeps the pairs.",
      "keys vraagt 'welke labels?', values vraagt 'welke gegevens?', items houdt de paren bij elkaar.",
    ],
    example:
      'record = {"red":2,"blue":0}\nprint(list(record.keys()))\nprint(list(record.values()))\nprint(list(record.items()))',
    output: "['red', 'blue']\n[2, 0]\n[('red', 2), ('blue', 0)]\n",
    predict: [
      "Which result keeps each colour next to its count?",
      "Welk resultaat houdt elke kleur naast zijn aantal?",
    ],
    task: [
      "Implement columns(record) using keys() and values(). Return two lists in a tuple; preserve insertion order and leave record unchanged.",
      "Implementeer columns(record) met keys() en values(). Geef twee lijsten in een tuple terug; behoud invoegvolgorde en laat record ongewijzigd.",
    ],
    check:
      'callable(columns) and all(any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == method for n in _ast.walk(_ast.parse(_source))) for method in ("keys","values"))',
    body: "return list(record.keys()), list(record.values())",
    help: [
      "Convert each view to a list and pack the two lists as one returned tuple.",
      "Zet elke weergave om naar een lijst en pak beide lijsten in één teruggegeven tuple.",
    ],
    fragment: "list(record.values())",
    cases: [
      [
        [{ b: 0, a: 2 }],
        '_return == (["b","a"],[0,2]) and _args[0] == {"b":0,"a":2}',
      ],
      [[{}], "_return == ([],[])"],
    ],
    change: [
      "Add a new key after making the lists. Predict why the lists do not grow with the dictionary.",
      "Voeg na het maken van de lijsten een sleutel toe. Voorspel waarom de lijsten niet meegroeien met de dictionary.",
    ],
    explain: [
      "The views have matching order; list captures their current elements. Returning two lists makes the interface visible and testable.",
      "De weergaven hebben dezelfde volgorde; list legt hun huidige elementen vast. Twee lijsten teruggeven maakt de interface zichtbaar en testbaar.",
    ],
  }),
];
