import { fileLesson as F } from "./file-authoring.mjs";
const f = (slug, s) => F(22, slug, s);
export const activities = [
  f("load", {
    title: ["Load nested JSON data", "Laad geneste JSON-gegevens"],
    topics: "json json-load nested-records",
    requires: "dictionaries 2d-access read",
    why: [
      "JSON stores structured lists, objects and simple values, not just a table of strings.",
      "JSON bewaart gestructureerde lijsten, objecten en eenvoudige waarden, niet alleen een tabel strings.",
    ],
    teach: [
      "json.load(handle) parses a JSON file into Python values. JSON objects become dictionaries, arrays become lists, true/false become True/False and null becomes None. JSON text uses double-quoted strings. Numbers load as numbers, unlike CSV fields. Follow nested keys and indexes one level at a time.",
      "json.load(handle) ontleedt een JSON-bestand naar Pythonwaarden. JSON-objecten worden dictionaries, arrays worden lijsten, true/false wordt True/False en null wordt None. JSON-tekst gebruikt strings met dubbele aanhalingstekens. Getallen worden als getallen geladen, anders dan CSV-velden. Volg geneste sleutels en indexen één niveau tegelijk.",
    ],
    rule: [
      "JSON decoding creates Python values with structure and types.",
      "JSON-decodering maakt Pythonwaarden met structuur en typen.",
    ],
    example:
      'import json\nwith open("example.json",encoding="utf-8") as handle:\n    data = json.load(handle)\nprint(data["players"][0]["name"])\nprint(data["active"])',
    exampleFiles: {
      "example.json": '{"players":[{"name":"Ada"}],"active":true}',
    },
    output: "Ada\nTrue\n",
    predict: [
      "Which access selects the first player rather than a field?",
      "Welke toegang kiest de eerste speler in plaats van een veld?",
    ],
    fixtures: {
      "club.json":
        '{"players":[{"name":"Ada","score":3},{"name":"Bo","score":4}]}',
    },
    caller: 'print(work.names("club.json"))',
    starter: "def names(path):\n    return []\n",
    solution:
      'import json\ndef names(path):\n    with open(path,encoding="utf-8") as handle:\n        data = json.load(handle)\n    return [player["name"] for player in data["players"]]\n',
    tasks: [
      {
        name: "names",
        task: [
          "Load the file and return names from its players list in order.",
          "Laad het bestand en geef namen uit de players-lijst op volgorde terug.",
        ],
        help: [
          "Select the list first, then the name field of each record.",
          "Kies eerst de lijst en daarna het name-veld van elk record.",
        ],
        fragment: 'data["players"]',
        cases: [
          { args: ["club.json"], check: '_return == ["Ada","Bo"]' },
          {
            args: ["empty.json"],
            files: { "empty.json": '{"players":[]}' },
            check: "_return == []",
          },
        ],
      },
    ],
    change: [
      "Add a second field to each player and confirm name extraction remains stable.",
      "Voeg een tweede veld aan elke speler toe en controleer dat namen ophalen gelijk blijft.",
    ],
    explain: [
      "Decoding yields a dictionary containing a list of dictionaries, so each access matches one structural level.",
      "Decoderen levert een dictionary met een lijst dictionaries; elke toegang past bij één structuurniveau.",
    ],
  }),
  f("save", {
    title: ["Save and reopen JSON", "Bewaar en heropen JSON"],
    topics: "json-save json-roundtrip",
    requires: "json-load write",
    why: [
      "A round trip checks that saved structured data can be loaded back with its meaning intact.",
      "Heen en terug opslaan controleert of bewaarde gegevens met dezelfde betekenis kunnen worden geladen.",
    ],
    teach: [
      "json.dump(data, handle, indent=2) writes JSON to an open file. indent makes the text readable. Use JSON-compatible values: dictionaries with string keys, lists, strings, numbers, Booleans and None. Tuples load back as lists; Decimal and arbitrary objects need an explicit conversion. A round-trip check compares the decoded data, not exact whitespace in the file.",
      "json.dump(data, handle, indent=2) schrijft JSON naar een open bestand. indent maakt de tekst leesbaar. Gebruik JSON-geschikte waarden: dictionaries met stringsleutels, lijsten, strings, getallen, booleaanse waarden en None. Tuples komen terug als lijsten; Decimal en willekeurige objecten vragen een expliciete omzetting. Een heen-en-terugcontrole vergelijkt gedecodeerde gegevens, niet exacte witruimte in het bestand.",
    ],
    rule: [
      "Test the data after loading, not only the text after saving.",
      "Test de gegevens na laden, niet alleen de tekst na opslaan.",
    ],
    example:
      'import json\ndata = {"active":True,"scores":[2,4]}\nwith open("example.json","w",encoding="utf-8") as handle:\n    json.dump(data,handle,indent=2)\nwith open("example.json",encoding="utf-8") as handle:\n    print(json.load(handle) == data)',
    output: "True\n",
    predict: [
      "Why might whitespace differ while the data is equal?",
      "Waarom kan witruimte verschillen terwijl de gegevens gelijk zijn?",
    ],
    fixtures: {},
    caller: 'work.save("settings.json",{"sound":True,"volume":3})',
    starter: "def save(path, data):\n    return None\n",
    solution:
      'import json\ndef save(path, data):\n    with open(path,"w",encoding="utf-8") as handle:\n        json.dump(data,handle,indent=2)\n',
    tasks: [
      {
        name: "save",
        task: [
          "Save the supplied JSON-compatible data so loading it yields the same values.",
          "Bewaar de gegeven JSON-geschikte gegevens zodat laden dezelfde waarden oplevert.",
        ],
        help: [
          "Pass the data and open handle to json.dump.",
          "Geef de gegevens en open handle aan json.dump.",
        ],
        fragment: "json.dump(data, handle, indent=2)",
        cases: [
          {
            args: ["out.json", { name: "Café", items: [1, null, true] }],
            check: '_json.load(open("out.json",encoding="utf-8")) == _args[1]',
          },
          {
            args: ["empty.json", {}],
            check: '_json.load(open("empty.json")) == {}',
          },
        ],
      },
    ],
    change: [
      "Open the generated JSON in the workspace, navigate away, return and run a load.",
      "Open de gemaakte JSON in de werkruimte, navigeer weg, keer terug en laad die.",
    ],
    explain: [
      "The encoder preserves the supported nested values; indentation only improves readability.",
      "De encoder bewaart ondersteunde geneste waarden; inspringing verbetert alleen de leesbaarheid.",
    ],
  }),
  f("update-and-recover", {
    title: [
      "Update saved data and recognise malformed JSON",
      "Wijzig opgeslagen gegevens en herken ongeldige JSON",
    ],
    topics: "json-update malformed-json",
    requires: "json-save missing-files try-except",
    why: [
      "A file can exist but contain invalid JSON. Do not confuse that case with an absent file.",
      "Een bestand kan bestaan maar ongeldige JSON bevatten. Verwar dat niet met een ontbrekend bestand.",
    ],
    teach: [
      "json.load raises json.JSONDecodeError for malformed JSON such as a missing quote or trailing comma. Valid JSON can still have the wrong shape, so syntax and application validation are separate. This task accepts objects with an integer count. Load first, modify in memory, then save only after successful decoding. Never overwrite malformed input as an automatic recovery.",
      "json.load veroorzaakt json.JSONDecodeError bij ongeldige JSON zoals een ontbrekend aanhalingsteken of afsluitende komma. Geldige JSON kan nog steeds de verkeerde vorm hebben, dus syntax en toepassingsvalidatie zijn apart. Deze taak accepteert objecten met een gehele count. Laad eerst, wijzig in geheugen en bewaar pas na geslaagde decodering. Overschrijf ongeldige invoer nooit als automatisch herstel.",
    ],
    rule: [
      "Do not replace a damaged file before the learner can inspect it.",
      "Vervang een beschadigd bestand niet voordat de leerling het kan bekijken.",
    ],
    example:
      'import json\ntry:\n    json.loads("{broken}")\nexcept json.JSONDecodeError:\n    print("Invalid JSON")',
    output: "Invalid JSON\n",
    predict: [
      "Does valid file encoding guarantee valid JSON syntax?",
      "Garandeert geldige bestandscodering geldige JSON-syntax?",
    ],
    fixtures: { "counter.json": '{"count":2,"name":"visits"}' },
    caller: 'print(work.increment("counter.json"))',
    starter: "def increment(path):\n    return None\n",
    solution:
      'import json\ndef increment(path):\n    try:\n        with open(path,encoding="utf-8") as handle:\n            data = json.load(handle)\n    except json.JSONDecodeError:\n        return None\n    data["count"] += 1\n    with open(path,"w",encoding="utf-8") as handle:\n        json.dump(data,handle,indent=2)\n    return data["count"]\n',
    tasks: [
      {
        name: "increment",
        task: [
          "Increase count by one and save, preserving other fields. On malformed JSON return None and leave the file untouched.",
          "Verhoog count met één en bewaar met behoud van andere velden. Geef bij ongeldige JSON None en laat het bestand onaangeraakt.",
        ],
        help: [
          "Finish decoding before opening the same file in write mode.",
          "Rond decodering af voordat je hetzelfde bestand in schrijfmodus opent.",
        ],
        fragment: "except json.JSONDecodeError:",
        cases: [
          {
            args: ["counter.json"],
            check:
              '_return == 3 and _json.load(open("counter.json")) == {"count":3,"name":"visits"}',
          },
          {
            args: ["broken.json"],
            files: { "broken.json": "{broken}" },
            check:
              '_return is None and open("broken.json").read() == "{broken}"',
          },
        ],
      },
    ],
    change: [
      "Use valid JSON with a missing count field and explain why that is a different error.",
      "Gebruik geldige JSON zonder count-veld en leg uit waarom dat een andere fout is.",
    ],
    explain: [
      "Only a successful read reaches the write operation; malformed source text remains available for inspection.",
      "Alleen geslaagd lezen bereikt schrijven; ongeldige brontekst blijft beschikbaar voor onderzoek.",
    ],
  }),
  f("club-book", {
    title: [
      "Mini project: club results book",
      "Miniproject: uitslagenboek van de club",
    ],
    topics: "club-project",
    practices: "csv-numeric-conversion json-save get dictionary-iteration",
    requires: "json-save csv-review dictionary-review",
    kind: "challenge",
    guidance: "independent",
    minutes: 45,
    why: [
      "Import a table, aggregate named records and save a structured result that another program can reopen.",
      "Importeer een tabel, verzamel benoemde gegevens en bewaar een gestructureerd resultaat dat een ander programma kan heropenen.",
    ],
    teach: [
      'Read a CSV with name and score headers. Trim names; skip blank names and scores that cannot convert to int. Add all valid scores for each name, preserving case. Save {"totals": {...}, "accepted": N} to a separate JSON path and return the same dictionary. N counts valid rows, not distinct players. Negative and zero scores are valid. Do not modify the source CSV.',
      'Lees een CSV met kopvelden name en score. Trim namen; sla lege namen en scores over die niet naar int kunnen worden omgezet. Tel alle geldige scores per naam op en behoud hoofdletters. Bewaar {"totals": {...}, "accepted": N} naar een apart JSON-pad en geef dezelfde dictionary terug. N telt geldige rijen, niet verschillende spelers. Negatieve scores en nul zijn geldig. Verander de bron-CSV niet.',
    ],
    rule: [
      "Validate one record, aggregate accepted data, then save the summary.",
      "Valideer één record, verzamel geaccepteerde gegevens en bewaar daarna de samenvatting.",
    ],
    example:
      'totals = {}\nfor name,points in [("Ada",2),("Ada",3)]:\n    totals[name] = totals.get(name,0) + points\nprint(totals)',
    output: "{'Ada': 5}\n",
    predict: [
      "Why is the number of rows different from the number of keys?",
      "Waarom verschilt het aantal rijen van het aantal sleutels?",
    ],
    fixtures: { "results.csv": "name,score\nAda,3\nBo,2\nAda,4\n,9\nBo,bad\n" },
    caller: 'print(work.build_book("results.csv","book.json"))',
    starter: "def build_book(source, destination):\n    return None\n",
    solution:
      'import csv\nimport json\ndef build_book(source, destination):\n    totals = {}\n    accepted = 0\n    with open(source,newline="",encoding="utf-8") as handle:\n        for row in csv.DictReader(handle):\n            name = row["name"].strip()\n            if name == "":\n                continue\n            try:\n                score = int(row["score"])\n            except ValueError:\n                continue\n            totals[name] = totals.get(name,0) + score\n            accepted += 1\n    result = {"totals":totals,"accepted":accepted}\n    with open(destination,"w",encoding="utf-8") as handle:\n        json.dump(result,handle,indent=2)\n    return result\n',
    tasks: [
      {
        name: "build_book",
        task: [
          "Implement validation, aggregation and JSON saving from the brief.",
          "Implementeer validatie, verzamelen en JSON-opslag volgens de opdracht.",
        ],
        help: [
          "Keep the valid-row counter separate from the mapping of player totals.",
          "Houd de teller voor geldige rijen apart van de koppeling met spelerstotalen.",
        ],
        fragment: "totals[name] = totals.get(name, 0) + score",
        cases: [
          {
            args: ["results.csv", "book.json"],
            check:
              '_return == {"totals":{"Ada":7,"Bo":2},"accepted":3} and _json.load(open("book.json")) == _return',
          },
          {
            args: ["other.csv", "out.json"],
            files: { "other.csv": 'name,score\n" A, B ",-2\nA,0\nA,3\n' },
            check:
              '_return == {"totals":{"A, B":-2,"A":3},"accepted":3} and _json.load(open("out.json")) == _return',
          },
          {
            args: ["empty.csv", "out.json"],
            files: { "empty.csv": "name,score\n" },
            check: '_return == {"totals":{},"accepted":0}',
          },
        ],
      },
    ],
    change: [
      "Add duplicate players, a quoted comma in a name and a negative score; reopen the generated JSON.",
      "Voeg dubbele spelers, een aangehaalde komma in een naam en een negatieve score toe; heropen de gemaakte JSON.",
    ],
    explain: [
      "Valid rows contribute to both a player total and the accepted count, then the same structure is returned and encoded.",
      "Geldige rijen dragen bij aan zowel een spelertotaal als het aantal geaccepteerde rijen; daarna wordt dezelfde structuur teruggegeven en gecodeerd.",
    ],
  }),
];
