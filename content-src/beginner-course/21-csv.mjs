import { fileLesson as F } from "./file-authoring.mjs";
const f = (slug, s) => F(21, slug, s);
export const activities = [
  f("rows", {
    title: [
      "Read rows and columns with csv.reader",
      "Lees rijen en kolommen met csv.reader",
    ],
    topics: "csv csv-reader csv-quoting",
    requires: "read imports lists",
    why: [
      "CSV stores a table as text. A real CSV reader understands quoted fields that contain commas.",
      "CSV bewaart een tabel als tekst. Een echte CSV-lezer begrijpt velden tussen aanhalingstekens die komma’s bevatten.",
    ],
    teach: [
      'Import csv, open the file with newline="" and UTF-8, then pass its handle to csv.reader. Each row becomes a list of strings. A comma inside a quoted field belongs to that field. Manual split(",") would break it. newline="" lets the CSV module handle newline conventions correctly.',
      'Importeer csv, open het bestand met newline="" en UTF-8 en geef de handle aan csv.reader. Elke rij wordt een lijst strings. Een komma binnen een aangehaald veld hoort bij dat veld. Handmatig split(",") breekt dat. newline="" laat de CSV-module nieuwe-regelconventies correct verwerken.',
    ],
    rule: [
      "Let the CSV parser interpret delimiters and quotes.",
      "Laat de CSV-ontleder scheidingstekens en aanhalingstekens interpreteren.",
    ],
    example:
      'import csv\nwith open("example.csv",newline="",encoding="utf-8") as handle:\n    for row in csv.reader(handle):\n        print(row)',
    exampleFiles: { "example.csv": 'name,city\nAda,"Paris, France"\n' },
    output: "['name', 'city']\n['Ada', 'Paris, France']\n",
    predict: [
      "Why does the data row still have only two columns?",
      "Waarom heeft de gegevensrij nog steeds maar twee kolommen?",
    ],
    fixtures: { "table.csv": 'name,score\n"Bo, Jr",4\nAda,5\n' },
    caller: 'print(work.rows("table.csv"))',
    starter: "def rows(path):\n    return []\n",
    solution:
      'import csv\ndef rows(path):\n    with open(path,newline="",encoding="utf-8") as handle:\n        return list(csv.reader(handle))\n',
    tasks: [
      {
        name: "rows",
        task: [
          "Return all CSV rows, including the header, as lists of strings.",
          "Geef alle CSV-rijen inclusief de kop terug als lijsten strings.",
        ],
        help: [
          "Materialise the reader while the file is still open.",
          "Maak van de lezer een lijst terwijl het bestand nog open is.",
        ],
        fragment: "list(csv.reader(handle))",
        cases: [
          {
            args: ["table.csv"],
            check: '_return == [["name","score"],["Bo, Jr","4"],["Ada","5"]]',
          },
          {
            args: ["empty.csv"],
            files: { "empty.csv": "" },
            check: "_return == []",
          },
        ],
      },
    ],
    change: [
      "Put a quoted comma inside another field and compare with naive splitting.",
      "Zet een aangehaalde komma in een ander veld en vergelijk met eenvoudig splitsen.",
    ],
    explain: [
      "The reader keeps quoted commas inside their field and returns strings even for numeric-looking text.",
      "De lezer houdt aangehaalde komma’s in hun veld en geeft strings, ook voor tekst die op getallen lijkt.",
    ],
  }),
  f("named-records", {
    title: ["Use a header as field names", "Gebruik een kop als veldnamen"],
    topics: "dict-reader csv-numeric-conversion",
    requires: "csv-reader dictionaries conversion",
    why: [
      "Dictionary rows make column meaning explicit and avoid depending on a remembered index.",
      "Dictionaryrijen maken kolombetekenis expliciet en vermijden afhankelijkheid van een onthouden index.",
    ],
    teach: [
      "csv.DictReader uses the first row as field names and produces dictionaries for later rows. Values remain strings. Convert a numeric field explicitly before adding it; otherwise + concatenates text or raises a type error. This task’s score values are valid integers and its required headers are present.",
      "csv.DictReader gebruikt de eerste rij als veldnamen en maakt dictionaries voor latere rijen. Waarden blijven strings. Zet een numeriek veld expliciet om vóór optellen; anders voegt + tekst samen of ontstaat een typefout. De scores van deze taak zijn geldige gehele getallen en de verplichte kopvelden zijn aanwezig.",
    ],
    rule: [
      "A CSV reader parses fields, not application-specific numeric types.",
      "Een CSV-lezer ontleedt velden, geen toepassingsspecifieke getaltypen.",
    ],
    example:
      'import csv\nwith open("example.csv",newline="",encoding="utf-8") as handle:\n    for row in csv.DictReader(handle):\n        print(row["name"],int(row["score"]) + 1)',
    exampleFiles: { "example.csv": "name,score\nAda,4\n" },
    output: "Ada 5\n",
    predict: [
      'What type does row["score"] have before conversion?',
      'Welk type heeft row["score"] vóór omzetting?',
    ],
    fixtures: { "scores.csv": "name,score\nAda,4\nBo,-1\n" },
    caller: 'print(work.total("scores.csv"))',
    starter: "def total(path):\n    return 0\n",
    solution:
      'import csv\ndef total(path):\n    result = 0\n    with open(path,newline="",encoding="utf-8") as handle:\n        for row in csv.DictReader(handle):\n            result += int(row["score"])\n    return result\n',
    tasks: [
      {
        name: "total",
        task: [
          "Return the sum of the score column. A header-only file returns zero.",
          "Geef de som van de scorekolom terug. Een bestand met alleen een kop geeft nul.",
        ],
        help: [
          "Read named fields and convert each score before accumulation.",
          "Lees benoemde velden en zet elke score om vóór optellen.",
        ],
        fragment: 'int(row["score"])',
        cases: [
          { args: ["scores.csv"], check: "_return == 3" },
          {
            args: ["other.csv"],
            files: { "other.csv": "score,name\n5,A\n2,B\n" },
            check: "_return == 7",
          },
          {
            args: ["empty.csv"],
            files: { "empty.csv": "name,score\n" },
            check: "_return == 0",
          },
        ],
      },
    ],
    change: [
      "Reverse the column order but preserve the headers. The result should stay correct.",
      "Draai de kolomvolgorde om maar behoud de kopvelden. Het resultaat hoort juist te blijven.",
    ],
    explain: [
      "Named access follows the header, and explicit int conversion makes arithmetic meaningful.",
      "Benoemde toegang volgt de kop en expliciete int-omzetting maakt rekenkunde zinvol.",
    ],
  }),
  f("delimiter", {
    title: ["Read a different CSV dialect", "Lees een ander CSV-dialect"],
    topics: "csv-delimiters",
    requires: "dict-reader",
    why: [
      "Some exports use semicolons or tabs instead of commas. Quoting rules still matter.",
      "Sommige exports gebruiken puntkomma’s of tabs in plaats van komma’s. Regels voor aanhalingstekens blijven belangrijk.",
    ],
    teach: [
      'Pass delimiter=";" or delimiter="\\t" to the CSV reader. The delimiter must match the file and be one character. Quotes can protect that delimiter inside a field too. Do not replace delimiters globally: doing so would also alter characters inside quoted data.',
      'Geef delimiter=";" of delimiter="\\t" aan de CSV-lezer mee. Het scheidingsteken moet bij het bestand passen en één teken zijn. Aanhalingstekens kunnen ook dat teken binnen een veld beschermen. Vervang scheidingstekens niet overal: dat verandert ook tekens binnen aangehaalde gegevens.',
    ],
    rule: [
      "Configure the parser to match the file’s format.",
      "Stel de ontleder in op het bestandsformaat.",
    ],
    example:
      'import csv\nwith open("example.csv",newline="",encoding="utf-8") as handle:\n    print(list(csv.reader(handle,delimiter=";")))',
    exampleFiles: { "example.csv": 'A;"B;C"\n' },
    output: "[['A', 'B;C']]\n",
    predict: ["Why does B;C remain one field?", "Waarom blijft B;C één veld?"],
    fixtures: { "export.csv": 'name;score\n"Bo; Jr";3\n' },
    caller: 'print(work.read_export("export.csv",";"))',
    starter: "def read_export(path, delimiter):\n    return []\n",
    solution:
      'import csv\ndef read_export(path, delimiter):\n    with open(path,newline="",encoding="utf-8") as handle:\n        return list(csv.DictReader(handle,delimiter=delimiter))\n',
    tasks: [
      {
        name: "read_export",
        task: [
          "Return named CSV records using the supplied delimiter.",
          "Geef benoemde CSV-records terug met het gegeven scheidingsteken.",
        ],
        help: [
          "Pass the delimiter to DictReader itself.",
          "Geef het scheidingsteken aan DictReader zelf.",
        ],
        fragment: "csv.DictReader(handle, delimiter=delimiter)",
        cases: [
          {
            args: ["export.csv", ";"],
            check: '_return == [{"name":"Bo; Jr","score":"3"}]',
          },
          {
            args: ["tabs.tsv", "\t"],
            files: { "tabs.tsv": "name\tscore\nAda\t4\n" },
            check: '_return == [{"name":"Ada","score":"4"}]',
          },
        ],
      },
    ],
    change: [
      "Create a tab-separated fixture and retain a comma inside one field.",
      "Maak een tabgescheiden voorbeeld en behoud een komma binnen één veld.",
    ],
    explain: [
      "Reader configuration changes the separators without modifying the underlying data.",
      "Lezerinstellingen veranderen de scheiding zonder onderliggende gegevens te wijzigen.",
    ],
  }),
  f("write", {
    title: ["Export records to CSV", "Exporteer records naar CSV"],
    topics: "csv-write",
    requires: "dict-reader write",
    why: [
      "A CSV writer quotes fields correctly so another program can read the same data back.",
      "Een CSV-schrijver plaatst aanhalingstekens correct zodat een ander programma dezelfde gegevens kan teruglezen.",
    ],
    teach: [
      'csv.writer(handle).writerow(values) writes one row. csv.DictWriter(handle, fieldnames=[...]) chooses field order for dictionary rows. Call writeheader(), then writerow(record) for each record. Open with mode "w", newline="" and UTF-8. The writer handles quoted commas and newlines; do not hand-build a CSV row by joining values.',
      'csv.writer(handle).writerow(values) schrijft één rij. csv.DictWriter(handle, fieldnames=[...]) kiest de veldvolgorde voor dictionaryrijen. Roep writeheader() aan en daarna writerow(record) voor elk record. Open met modus "w", newline="" en UTF-8. De schrijver verwerkt aangehaalde komma’s en nieuwe regels; maak geen CSV-rij met handmatig samenvoegen.',
    ],
    rule: [
      "Use the CSV writer for both headers and escaped fields.",
      "Gebruik de CSV-schrijver voor zowel koppen als correct gecodeerde velden.",
    ],
    example:
      'import csv\nwith open("example.csv","w",newline="",encoding="utf-8") as handle:\n    writer = csv.writer(handle)\n    writer.writerow(["name","city"])\n    writer.writerow(["Ada","Paris, France"])\nwith open("example.csv",newline="",encoding="utf-8") as handle:\n    print(list(csv.reader(handle)))',
    output: "[['name', 'city'], ['Ada', 'Paris, France']]\n",
    predict: [
      "Why is a comma inside the city safe here?",
      "Waarom is een komma binnen de stad hier veilig?",
    ],
    fixtures: {},
    caller: 'work.export("results.csv",[{"name":"Bo, Jr","score":3}])',
    starter: "def export(path, records):\n    return None\n",
    solution:
      'import csv\ndef export(path, records):\n    with open(path,"w",newline="",encoding="utf-8") as handle:\n        writer = csv.DictWriter(handle,fieldnames=["name","score"])\n        writer.writeheader()\n        for record in records:\n            writer.writerow(record)\n',
    tasks: [
      {
        name: "export",
        task: [
          "Export records with the header name,score and correctly quoted fields. A zero-record export still has its header.",
          "Exporteer records met kop name,score en correct aangehaalde velden. Een export zonder records heeft nog steeds zijn kop.",
        ],
        help: [
          "Use DictWriter and write the header before iterating records.",
          "Gebruik DictWriter en schrijf de kop vóór het doorlopen van records.",
        ],
        fragment: "writer.writeheader()",
        cases: [
          {
            args: ["out.csv", [{ name: "A, B", score: 2 }]],
            check:
              'list(__import__("csv").reader(open("out.csv",newline=""))) == [["name","score"],["A, B","2"]]',
          },
          {
            args: ["empty.csv", []],
            check:
              'list(__import__("csv").reader(open("empty.csv",newline=""))) == [["name","score"]]',
          },
        ],
      },
    ],
    change: [
      "Inspect the generated file, then read it back using csv.reader.",
      "Bekijk het gemaakte bestand en lees het terug met csv.reader.",
    ],
    explain: [
      "The writer preserves field boundaries even when text contains the separator.",
      "De schrijver bewaart veldgrenzen ook wanneer tekst het scheidingsteken bevat.",
    ],
  }),
  f("csv-report", {
    title: ["Transform a CSV export", "Bewerk een CSV-export"],
    topics: "csv-review",
    practices: "csv-write csv-numeric-conversion",
    requires: "csv-write dict-reader",
    guidance: "independent",
    minutes: 25,
    why: [
      "Apply reading and writing together while keeping a source export intact.",
      "Pas lezen en schrijven samen toe en houd een bronexport intact.",
    ],
    teach: [
      "Read name and score columns from source. Write a separate destination CSV with name and doubled columns; doubled is twice the integer score. Preserve row order and quoted names. Return the number of data rows written. Inputs have valid integer scores and required headers.",
      "Lees de kolommen name en score uit source. Schrijf een aparte destination-CSV met name en doubled; doubled is tweemaal de gehele score. Behoud rijvolgorde en aangehaalde namen. Geef het aantal geschreven gegevensrijen terug. Invoer heeft geldige gehele scores en verplichte kopvelden.",
    ],
    rule: [
      "Parse values, transform them, then let the writer encode them.",
      "Ontleed waarden, bewerk ze en laat de schrijver ze daarna coderen.",
    ],
    example:
      'row = {"name":"Ada","score":"3"}\nprint({"name":row["name"],"doubled":int(row["score"])*2})',
    output: "{'name': 'Ada', 'doubled': 6}\n",
    predict: [
      "Which field needs conversion before transformation?",
      "Welk veld vraagt omzetting vóór bewerking?",
    ],
    fixtures: { "source.csv": 'name,score\n"A, B",3\nC,-2\n' },
    caller: 'print(work.transform("source.csv","doubled.csv"))',
    starter: "def transform(source, destination):\n    return None\n",
    solution:
      'import csv\ndef transform(source, destination):\n    rows = []\n    with open(source,newline="",encoding="utf-8") as handle:\n        for row in csv.DictReader(handle):\n            rows.append({"name":row["name"],"doubled":int(row["score"])*2})\n    with open(destination,"w",newline="",encoding="utf-8") as handle:\n        writer = csv.DictWriter(handle,fieldnames=["name","doubled"])\n        writer.writeheader()\n        for row in rows:\n            writer.writerow(row)\n    return len(rows)\n',
    tasks: [
      {
        name: "transform",
        task: [
          "Implement the CSV transformation and return its data-row count.",
          "Implementeer de CSV-bewerking en geef het aantal gegevensrijen terug.",
        ],
        help: [
          "Keep reading and writing separate and use the required destination field names.",
          "Houd lezen en schrijven apart en gebruik de vereiste uitvoerveldnamen.",
        ],
        fragment: 'int(row["score"]) * 2',
        cases: [
          {
            args: ["source.csv", "out.csv"],
            check:
              '_return == 2 and list(__import__("csv").DictReader(open("out.csv"))) == [{"name":"A, B","doubled":"6"},{"name":"C","doubled":"-4"}]',
          },
          {
            args: ["empty.csv", "out.csv"],
            files: { "empty.csv": "name,score\n" },
            check:
              '_return == 0 and list(__import__("csv").reader(open("out.csv"))) == [["name","doubled"]]',
          },
        ],
      },
    ],
    change: [
      "Add a score of zero and verify both the count and exported value.",
      "Voeg een score nul toe en controleer zowel aantal als geëxporteerde waarde.",
    ],
    explain: [
      "The transformation treats score as data, not text, and delegates output quoting to CSV.",
      "De bewerking behandelt score als getal in plaats van tekst en laat uitvoeraanhalingstekens aan CSV over.",
    ],
  }),
];
