import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
} from "./helpers.mjs";
const g = "learn-python-files";
L(
  g,
  1,
  "open() returns a file object. A with block closes it automatically when the block ends, even after an exception. read() returns the remaining text as one string. Files here live in your exercise workspace.",
  "open() geeft een file object terug. Een with-blok sluit dit automatisch na afloop, ook bij een exception. read() geeft de resterende tekst als één string. Bestanden staan hier in de werkruimte van je oefening.",
  "Open notice.txt with a with block, read it into notice, and print notice.",
  "Open notice.txt in een with-blok, lees de inhoud in notice en druk notice af.",
  'with open("notice.txt", encoding="utf-8") as handle:\n    notice = handle.read()\nprint(notice)\n',
  "notice == 'Welcome to the field station.\\n'",
  {
    files: { "notice.txt": "Welcome to the field station.\n" },
    example: 'with open("notes.txt") as handle:\n    text = handle.read()',
    titleNl: "Een tekstbestand lezen",
  },
);
L(
  g,
  2,
  "Iterating over a file yields one line at a time. readlines() instead collects all remaining lines into a list. Each line usually keeps its trailing newline.",
  "Over een bestand loopen levert telkens één regel. readlines() verzamelt alle resterende regels in een list. Elke regel behoudt meestal het afsluitende regeleinde.",
  "Read log.txt and create lines containing each line without its trailing newline.",
  "Lees log.txt en maak lines met elke regel zonder het afsluitende regeleinde.",
  'with open("log.txt", encoding="utf-8") as handle:\n    lines = [line.rstrip("\\n") for line in handle]\nprint(lines)\n',
  "lines == ['ready','running','done']",
  {
    files: { "log.txt": "ready\nrunning\ndone\n" },
    titleNl: "Regels doorlopen",
  },
);
L(
  g,
  3,
  "readline() reads the next line and advances the file position. Repeated calls continue where the previous call stopped. At the end of the file, it returns an empty string.",
  "readline() leest de volgende regel en verplaatst de bestandspositie. Volgende aanroepen gaan verder waar de vorige stopte. Aan het einde van het bestand wordt een lege string teruggegeven.",
  "Read the first two lines into first and second using readline, then read once more into end.",
  "Lees met readline de eerste twee regels naar first en second. Lees daarna nogmaals naar end.",
  'with open("two.txt", encoding="utf-8") as handle:\n    first = handle.readline()\n    second = handle.readline()\n    end = handle.readline()\nprint(first, second, end)\n',
  "first == 'alpha\\n' and second == 'beta\\n' and end == ''",
  { files: { "two.txt": "alpha\nbeta\n" }, titleNl: "Eén regel lezen" },
);
L(
  g,
  4,
  "Mode w creates a text file or replaces the contents of an existing one. write() stores the supplied string and does not add a newline automatically. Inspect the generated file tab after running.",
  "Mode w maakt een tekstbestand of vervangt de bestaande inhoud. write() bewaart de opgegeven string en voegt niet automatisch een regeleinde toe. Bekijk na het uitvoeren het gegenereerde bestandstabblad.",
  "Write Inspection complete followed by a newline to report.txt.",
  "Schrijf Inspection complete gevolgd door een regeleinde naar report.txt.",
  'with open("report.txt", "w", encoding="utf-8") as handle:\n    handle.write("Inspection complete\\n")\n',
  "_os.path.exists('report.txt') and open('report.txt', encoding='utf-8').read() == 'Inspection complete\\n'",
  { titleNl: "Tekst schrijven" },
);
L(
  g,
  5,
  "Mode a appends to the end of a file instead of replacing it. Existing text remains. Running append code again adds another entry, so consider repeated runs when checking your output.",
  "Mode a voegt tekst toe aan het einde in plaats van de inhoud te vervangen. Bestaande tekst blijft staan. Opnieuw uitvoeren voegt nog een entry toe; houd daar rekening mee bij het bekijken van je output.",
  "Append loaded followed by a newline to events.txt. Preserve the existing ready line.",
  "Voeg loaded gevolgd door een regeleinde toe aan events.txt. Behoud de bestaande ready-regel.",
  'with open("events.txt", "a", encoding="utf-8") as handle:\n    handle.write("loaded\\n")\n',
  "open('events.txt', encoding='utf-8').read().startswith('ready\\n') and open('events.txt', encoding='utf-8').read().endswith('loaded\\n')",
  { files: { "events.txt": "ready\n" }, titleNl: "Tekst toevoegen" },
);
L(
  g,
  6,
  "A context manager handles setup and cleanup around a block. For files, with ensures close() happens when the block ends. The variable name may still exist afterward, but the file is closed.",
  "Een context manager regelt voorbereiding en opruimen rond een blok. Bij bestanden zorgt with dat close() na afloop gebeurt. De variablenaam kan daarna nog bestaan, maar het bestand is gesloten.",
  "Read note.txt into text using with. After the block, store handle.closed in is_closed.",
  "Lees note.txt naar text met with. Sla na het blok handle.closed op in is_closed.",
  'with open("note.txt", encoding="utf-8") as handle:\n    text = handle.read()\nis_closed = handle.closed\nprint(is_closed)\n',
  "text == 'Keep the door closed.' and is_closed is True",
  {
    files: { "note.txt": "Keep the door closed." },
    titleNl: "Een context manager",
  },
);
L(
  g,
  7,
  "CSV is plain text with a tabular convention. A header names the columns and subsequent rows contain fields. Quoting allows separators to appear inside fields, so a proper CSV parser is safer than manual splitting.",
  "CSV is gewone tekst volgens een tabelstructuur. Een header benoemt de kolommen en volgende rijen bevatten velden. Door quoting kunnen separators binnen velden staan; een CSV-parser is daarom veiliger dan handmatig splitsen.",
  "Read sensors.csv as plain text into raw_csv and print it.",
  "Lees sensors.csv als gewone tekst naar raw_csv en druk deze af.",
  'with open("sensors.csv", encoding="utf-8") as handle:\n    raw_csv = handle.read()\nprint(raw_csv)\n',
  "raw_csv == 'name,level\\neast,4\\nwest,7\\n'",
  {
    files: { "sensors.csv": "name,level\neast,4\nwest,7\n" },
    titleNl: "CSV als tekst",
  },
);
L(
  g,
  8,
  'csv.DictReader turns CSV rows into dictionaries keyed by column headers. CSV fields arrive as strings; convert numeric fields when you need arithmetic. Use newline="" when opening CSV files.',
  'csv.DictReader maakt dictionaries van CSV-rijen met de kolomheaders als keys. CSV-velden komen als strings binnen; zet numerieke velden om als je ermee wilt rekenen. Gebruik newline="" bij het openen van CSV-bestanden.',
  "Read sensors.csv with DictReader and collect integer levels in levels.",
  "Lees sensors.csv met DictReader en verzamel de levels als integers in levels.",
  'import csv\nwith open("sensors.csv", newline="", encoding="utf-8") as handle:\n    levels = [int(row["level"]) for row in csv.DictReader(handle)]\nprint(levels)\n',
  "levels == [4,7] and all(type(n) is int for n in levels)",
  {
    files: { "sensors.csv": "name,level\neast,4\nwest,7\n" },
    titleNl: "CSV-records lezen",
  },
);
L(
  g,
  9,
  "The delimiter argument tells the CSV reader which character separates fields. It still handles quoting correctly. Different separators do not change the need to parse rows consistently.",
  "Het delimiter-argument vertelt de CSV-reader welk teken velden scheidt. Quoting wordt nog steeds correct verwerkt. Een andere separator verandert niet dat je rijen consistent moet ontleden.",
  "Parse stations.csv with delimiter ; and collect names in names.",
  "Lees stations.csv met delimiter ; en verzamel de namen in names.",
  'import csv\nwith open("stations.csv", newline="", encoding="utf-8") as handle:\n    names = [row["name"] for row in csv.DictReader(handle, delimiter=";")]\nprint(names)\n',
  "names == ['North; Annex','South']",
  {
    files: { "stations.csv": 'name;count\n"North; Annex";3\nSouth;5\n' },
    titleNl: "Een andere CSV-delimiter",
  },
);
L(
  g,
  10,
  "csv.DictWriter serializes dictionaries using a declared field order. Call writeheader() once, then writerow() or writerows() for the data. The writer handles separators and quoting.",
  "csv.DictWriter schrijft dictionaries met een opgegeven veldvolgorde. Roep writeheader() één keer aan en daarna writerow() of writerows() voor de gegevens. De writer verwerkt separators en quoting.",
  "Write rows to output.csv using the fields name and count, including a header.",
  "Schrijf rows naar output.csv met de velden name en count, inclusief header.",
  'import csv\nrows = [{"name": "East", "count": 3}, {"name": "West", "count": 5}]\nwith open("output.csv", "w", newline="", encoding="utf-8") as handle:\n    writer = csv.DictWriter(handle, fieldnames=["name", "count"])\n    writer.writeheader()\n    writer.writerows(rows)\n',
  "_os.path.exists('output.csv') and list(__import__('csv').DictReader(open('output.csv', newline='', encoding='utf-8'))) == [{'name':'East','count':'3'},{'name':'West','count':'5'}]",
  {
    starter:
      'rows = [{"name": "East", "count": 3}, {"name": "West", "count": 5}]\n',
    titleNl: "CSV-records schrijven",
  },
);
L(
  g,
  11,
  "json.load(file) reads JSON into Python data structures. JSON objects become dictionaries and arrays become lists. JSON true becomes Python True, and null becomes None.",
  "json.load(file) leest JSON in Python-datastructuren. JSON-objects worden dictionaries en arrays worden lists. JSON true wordt Python True en null wordt None.",
  'Load config.json into config and read config["display"]["theme"] into theme.',
  'Laad config.json in config en lees config["display"]["theme"] naar theme.',
  'import json\nwith open("config.json", encoding="utf-8") as handle:\n    config = json.load(handle)\ntheme = config["display"]["theme"]\nprint(theme)\n',
  "theme == 'blue' and config['enabled'] is True",
  {
    files: { "config.json": '{"display":{"theme":"blue"},"enabled":true}' },
    titleNl: "JSON laden",
  },
);
L(
  g,
  12,
  "json.dump(value, file) serializes a Python value into a file. Use indent to produce readable output. The JSON spelling may differ from Python literals, so use the library instead of manually writing Python representations.",
  "json.dump(value, file) schrijft een Python-waarde als JSON naar een bestand. Met indent maak je de output leesbaar. De JSON-notatie kan verschillen van Python-literals; gebruik daarom de bibliotheek in plaats van handmatig Python-weergaven te schrijven.",
  "Save payload to snapshot.json with json.dump.",
  "Sla payload met json.dump op in snapshot.json.",
  'import json\npayload = {"station": "East", "active": True, "levels": [2, 4]}\nwith open("snapshot.json", "w", encoding="utf-8") as handle:\n    json.dump(payload, handle, indent=2)\n',
  "_os.path.exists('snapshot.json') and _json.load(open('snapshot.json', encoding='utf-8')) == {'station':'East','active':True,'levels':[2,4]}",
  {
    starter:
      'payload = {"station": "East", "active": True, "levels": [2, 4]}\n',
    titleNl: "JSON opslaan",
  },
);
R(
  g,
  13,
  "Choose a mode intentionally: r reads, w replaces, and a appends. Use with for cleanup, csv for tables, and json for structured values. Generated files appear beside main.py, and you can download the selected file.",
  "Kies bewust een mode: r leest, w vervangt en a voegt toe. Gebruik with voor opruimen, csv voor tabellen en json voor gestructureerde waarden. Gegenereerde bestanden verschijnen naast main.py en je kunt het geselecteerde bestand downloaden.",
  'import json\nwith open("summary.json", "w", encoding="utf-8") as handle:\n    json.dump({"ready": True}, handle)\nprint("Open summary.json to inspect the result.")\n',
  { titleNl: "Terugblik: bestanden" },
);
Q(g, [
  [
    "Which mode appends without replacing existing content?",
    "Welke mode voegt toe zonder bestaande inhoud te vervangen?",
    "",
    ["a", "w", "r"],
    "a opens for appending; w truncates an existing file.",
    "a opent voor toevoegen; w maakt een bestaand bestand leeg.",
  ],
  [
    "What does a with block ensure for a file?",
    "Wat zorgt een with-blok voor bij een bestand?",
    "",
    [
      [
        "The file is closed when the block ends",
        "Het bestand wordt na het blok gesloten",
      ],
      ["The file is deleted", "Het bestand wordt verwijderd"],
      ["The text is encrypted", "De tekst wordt versleuteld"],
    ],
    "The file context manager closes the file during cleanup.",
    "De file context manager sluit het bestand bij het opruimen.",
  ],
  [
    "What does readline return at end-of-file?",
    "Wat geeft readline aan het einde van een bestand terug?",
    "",
    ['""', "None", "False"],
    "An empty string indicates that no more characters were read.",
    "Een lege string geeft aan dat er geen tekens meer zijn gelezen.",
  ],
  [
    "What type is a numeric field read by csv.DictReader before conversion?",
    "Welk type heeft een numeriek veld uit csv.DictReader vóór conversie?",
    "",
    ["str", "int", "float"],
    "CSV fields are text until converted explicitly.",
    "CSV-velden zijn tekst totdat je ze expliciet omzet.",
  ],
  [
    "Which function reads JSON from an open file?",
    "Welke function leest JSON uit een geopend bestand?",
    "",
    ["json.load", "json.dump", "json.write"],
    "load reads and decodes; dump writes and encodes.",
    "load leest en decodeert; dump schrijft en encodeert.",
  ],
  [
    "Why pass delimiter to a CSV reader?",
    "Waarom geef je delimiter mee aan een CSV-reader?",
    "",
    [
      ["To specify the field separator", "Om de veldseparator op te geven"],
      ["To change the filename", "Om de bestandsnaam te wijzigen"],
      ["To count rows", "Om rijen te tellen"],
    ],
    "The delimiter is the character that separates fields.",
    "De delimiter is het teken dat velden scheidt.",
  ],
  P(
    'import json\nprint(json.loads("true"))',
    ["True", "true", '"true"'],
    "JSON true decodes to Python’s Boolean True.",
    "JSON true wordt gedecodeerd naar de Python-Boolean True.",
  ),
]);
