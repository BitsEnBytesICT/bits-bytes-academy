import { fileLesson as F } from "./file-authoring.mjs";
const f = (slug, s) => F(20, slug, s);
export const activities = [
  f("read", {
    title: ["Read your first text file", "Lees je eerste tekstbestand"],
    topics: "text-files with utf8 read persistence",
    requires: "helper-modules strings",
    why: [
      "A file can preserve text beyond one Python run. Open the supplied note.txt in the workspace to see what your program will read.",
      "Een bestand kan tekst buiten één Pythonuitvoering bewaren. Open note.txt in de werkruimte om te zien wat je programma gaat lezen.",
    ],
    teach: [
      'with open(path, "r", encoding="utf-8") as handle: opens a text file for reading. The indented block uses handle.read() to obtain all text; leaving the block closes the handle even if an error occurs. UTF-8 defines how stored bytes become characters. In this app files live in a browser runtime during execution. Supported generated text files are collected into your saved course workspace after the run. They do not automatically appear in your computer’s Documents folder.',
      'with open(path, "r", encoding="utf-8") as handle: opent een tekstbestand om te lezen. Het ingesprongen blok gebruikt handle.read() voor alle tekst; het blok verlaten sluit de handle ook als een fout optreedt. UTF-8 bepaalt hoe bewaarde bytes tekens worden. In deze app leven bestanden tijdens uitvoering in een browserruntime. Ondersteunde gemaakte tekstbestanden worden na uitvoering opgenomen in je opgeslagen cursuswerkruimte. Ze verschijnen niet automatisch in Documenten op je computer.',
    ],
    rule: [
      "Use with from the first file operation so closing is automatic.",
      "Gebruik with vanaf de eerste bestandsbewerking zodat sluiten automatisch is.",
    ],
    example:
      'with open("example.txt","r",encoding="utf-8") as handle:\n    text = handle.read()\nprint(text)',
    exampleFiles: { "example.txt": "Café" },
    output: "Café\n",
    predict: [
      "When is the handle closed relative to print?",
      "Wanneer wordt de handle gesloten ten opzichte van print?",
    ],
    fixtures: { "note.txt": "Hello\nCafé\n" },
    caller: 'print(work.read_text("note.txt"))',
    starter: 'def read_text(path):\n    return ""\n',
    solution:
      'def read_text(path):\n    with open(path,"r",encoding="utf-8") as handle:\n        return handle.read()\n',
    tasks: [
      {
        name: "read_text",
        sourceCheck:
          'any(isinstance(n,_ast.With) for n in _ast.walk(_ast.parse(_module_source))) and any(isinstance(n,_ast.keyword) and n.arg == "encoding" and isinstance(n.value,_ast.Constant) and n.value.value.lower().replace("-", "") == "utf8" for n in _ast.walk(_ast.parse(_module_source)))',
        task: [
          "Return all text from path without stripping its final newline. Use with and UTF-8.",
          "Geef alle tekst uit path terug zonder de laatste nieuwe regel weg te halen. Gebruik with en UTF-8.",
        ],
        help: [
          "Return read() inside the managed block; the handle still closes on return.",
          "Geef read() binnen het beheerde blok terug; de handle sluit ook bij return.",
        ],
        fragment: 'with open(path, "r", encoding="utf-8") as handle:',
        cases: [
          { args: ["note.txt"], check: '_return == "Hello\nCafé\n"' },
          {
            args: ["other.txt"],
            files: { "other.txt": "" },
            check: '_return == ""',
          },
        ],
      },
    ],
    change: [
      "Change the supplied file, run again, and observe the changed result.",
      "Verander het aangeleverde bestand, voer opnieuw uit en bekijk het gewijzigde resultaat.",
    ],
    explain: [
      "read returns the stored text exactly, including newlines and Unicode characters.",
      "read geeft de bewaarde tekst exact terug, inclusief nieuwe regels en Unicode-tekens.",
    ],
  }),
  f("lines", {
    title: ["Process one line at a time", "Verwerk één regel tegelijk"],
    topics: "line-iteration",
    requires: "read for strip",
    why: [
      "A line loop lets you process a file incrementally instead of handling one large string.",
      "Een regellus laat je een bestand stapsgewijs verwerken in plaats van één grote string te behandelen.",
    ],
    teach: [
      "for line in handle visits each remaining line. A line usually includes its ending newline; the last line may not. strip() removes outer whitespace when that is appropriate for your data. Do not strip automatically when spaces are meaningful. The with block must remain open while iterating.",
      "for line in handle bezoekt elke overgebleven regel. Een regel bevat meestal zijn afsluitende nieuwe regel; de laatste regel mogelijk niet. strip() verwijdert buitenste witruimte wanneer dat bij je gegevens past. Verwijder niet automatisch spaties als die betekenisvol zijn. Het with-blok moet open blijven tijdens doorlopen.",
    ],
    rule: [
      "Iterate while the file is open and decide explicitly how to handle whitespace.",
      "Doorloop terwijl het bestand open is en beslis expliciet hoe witruimte wordt verwerkt.",
    ],
    example:
      'with open("example.txt",encoding="utf-8") as handle:\n    for line in handle:\n        print(line.strip())',
    exampleFiles: { "example.txt": " Ada \nBo" },
    output: "Ada\nBo\n",
    predict: [
      "Why does strip avoid extra blank output lines here?",
      "Waarom voorkomt strip hier extra lege uitvoerregels?",
    ],
    fixtures: { "names.txt": " Ada \n\n Bo\n" },
    caller: 'print(work.names("names.txt"))',
    starter: "def names(path):\n    return []\n",
    solution:
      'def names(path):\n    result = []\n    with open(path,encoding="utf-8") as handle:\n        for line in handle:\n            name = line.strip()\n            if name != "":\n                result.append(name)\n    return result\n',
    tasks: [
      {
        name: "names",
        task: [
          "Return trimmed nonempty lines in order.",
          "Geef getrimde niet-lege regels op volgorde terug.",
        ],
        help: [
          "Clean each line before deciding whether to append it.",
          "Schoon elke regel op vóór je beslist die toe te voegen.",
        ],
        fragment: "for line in handle:",
        cases: [
          { args: ["names.txt"], check: '_return == ["Ada","Bo"]' },
          {
            args: ["empty.txt"],
            files: { "empty.txt": "" },
            check: "_return == []",
          },
        ],
      },
    ],
    change: [
      "Try a final line without a newline and confirm it is still processed.",
      "Probeer een laatste regel zonder nieuwe-regelteken en controleer dat die toch verwerkt wordt.",
    ],
    explain: [
      "The loop preserves order and excludes only lines that are empty after the requested trimming.",
      "De lus bewaart de volgorde en sluit alleen regels uit die na het gevraagde trimmen leeg zijn.",
    ],
  }),
  f("position", {
    title: [
      "Read a header, then the remaining file",
      "Lees een kop en daarna de rest",
    ],
    topics: "readline file-position",
    requires: "read line-iteration multiple-returns",
    why: [
      "Reading advances a file’s current position. This is useful when the first line is a header.",
      "Lezen verplaatst de huidige bestandspositie. Dat is nuttig als de eerste regel een kop is.",
    ],
    teach: [
      'readline() reads one line, including its newline when present. read() after it reads only the remainder, not the whole file again. At end-of-file these methods return an empty string; a blank line is "\\n" and is different. Reopening the file starts at the beginning.',
      'readline() leest één regel, inclusief het nieuwe-regelteken wanneer aanwezig. read() daarna leest alleen de rest, niet opnieuw het hele bestand. Aan het einde geven deze methoden een lege string; een lege regel is "\\n" en is iets anders. Het bestand opnieuw openen begint aan het begin.',
    ],
    rule: [
      "Each read starts where the previous read stopped.",
      "Elke leesactie begint waar de vorige stopte.",
    ],
    example:
      'with open("example.txt",encoding="utf-8") as handle:\n    print(handle.readline().strip())\n    print(handle.read().strip())\n    print(handle.read() == "")',
    exampleFiles: { "example.txt": "Title\nBody\n" },
    output: "Title\nBody\nTrue\n",
    predict: [
      "Why is the final read empty?",
      "Waarom is de laatste leesactie leeg?",
    ],
    fixtures: { "report.txt": "Scores\n2\n4\n" },
    caller: 'print(work.header_and_body("report.txt"))',
    starter: 'def header_and_body(path):\n    return "", ""\n',
    solution:
      'def header_and_body(path):\n    with open(path,encoding="utf-8") as handle:\n        header = handle.readline().strip()\n        body = handle.read()\n    return header, body\n',
    tasks: [
      {
        name: "header_and_body",
        task: [
          "Return (trimmed_first_line, unchanged_remaining_text). An empty file returns two empty strings.",
          "Geef (getrimde_eerste_regel, ongewijzigde_resttekst) terug. Een leeg bestand geeft twee lege strings.",
        ],
        help: [
          "Read the header once, then read from the current position.",
          "Lees de kop eenmaal en lees daarna vanaf de huidige positie.",
        ],
        fragment: "header = handle.readline().strip()",
        cases: [
          { args: ["report.txt"], check: '_return == ("Scores","2\n4\n")' },
          {
            args: ["empty.txt"],
            files: { "empty.txt": "" },
            check: '_return == ("","")',
          },
        ],
      },
    ],
    change: [
      "Use a file whose first line is blank. Explain how that differs from an empty file.",
      "Gebruik een bestand met een lege eerste regel. Leg uit hoe dat verschilt van een leeg bestand.",
    ],
    explain: [
      "The first call consumes exactly one line, leaving all remaining characters for read.",
      "De eerste aanroep gebruikt precies één regel en laat alle overige tekens voor read.",
    ],
  }),
  f("write", {
    title: [
      "Create or replace a text file",
      "Maak of vervang een tekstbestand",
    ],
    topics: "write",
    requires: "with utf8",
    why: [
      "Writing produces an artifact you can reopen and inspect in the workspace.",
      "Schrijven maakt een bestand dat je in de werkruimte opnieuw kunt openen en bekijken.",
    ],
    teach: [
      'Mode "w" creates a missing file or truncates an existing one immediately. handle.write(text) writes exactly that string; it adds no newline automatically. Use "\\n" explicitly when a line ending is required. After running, select the generated file in the file list and inspect its text. Run again to observe replacement.',
      'Modus "w" maakt een ontbrekend bestand of leegt een bestaand bestand direct. handle.write(text) schrijft precies die string; het voegt niet automatisch een nieuwe regel toe. Gebruik expliciet "\\n" wanneer een regeleinde vereist is. Kies na uitvoering het gemaakte bestand in de bestandenlijst en bekijk de tekst. Voer opnieuw uit om vervangen te zien.',
    ],
    rule: [
      "Choose w only when replacing previous content is intended.",
      "Kies w alleen als vervangen van eerdere inhoud de bedoeling is.",
    ],
    example:
      'with open("example.txt","w",encoding="utf-8") as handle:\n    handle.write("Ready\\n")\nwith open("example.txt",encoding="utf-8") as handle:\n    print(handle.read(),end="")',
    output: "Ready\n",
    predict: [
      "Does write add a second newline?",
      "Voegt write een tweede nieuwe regel toe?",
    ],
    fixtures: { "output.txt": "Old content" },
    caller: 'work.save("output.txt","New report\\n")',
    starter: "def save(path, text):\n    return None\n",
    solution:
      'def save(path, text):\n    with open(path,"w",encoding="utf-8") as handle:\n        handle.write(text)\n',
    tasks: [
      {
        name: "save",
        task: [
          "Write exactly text to path, replacing earlier contents. Inspect output.txt after running.",
          "Schrijf precies text naar path en vervang eerdere inhoud. Bekijk output.txt na uitvoering.",
        ],
        help: [
          "Use write mode and do not add extra text or newlines.",
          "Gebruik schrijfmodus en voeg geen extra tekst of nieuwe regels toe.",
        ],
        fragment: "handle.write(text)",
        cases: [
          {
            args: ["output.txt", "Café\n"],
            check: 'open("output.txt",encoding="utf-8").read() == "Café\n"',
          },
          {
            args: ["new.txt", ""],
            check:
              '_os.path.exists("new.txt") and open("new.txt").read() == ""',
          },
        ],
      },
    ],
    change: [
      "Save an empty string and explain the resulting file size.",
      "Bewaar een lege string en leg de resulterende bestandsgrootte uit.",
    ],
    explain: [
      "The with block closes after writing; mode w deliberately replaces previous data.",
      "Het with-blok sluit na schrijven; modus w vervangt bewust eerdere gegevens.",
    ],
  }),
  f("append", {
    title: ["Append a new log entry", "Voeg een nieuwe logregel toe"],
    topics: "append-files",
    requires: "write",
    why: [
      "A log usually preserves previous entries when adding a new one.",
      "Een log bewaart eerdere invoeren meestal wanneer een nieuwe wordt toegevoegd.",
    ],
    teach: [
      'Mode "a" writes at the end and creates the file if it is missing. It does not automatically insert a separator. For this activity each existing entry already ends in a newline, and the new message contains no newline. Write message + "\\n" to add exactly one entry.',
      'Modus "a" schrijft achteraan en maakt het bestand als het ontbreekt. Het voegt niet automatisch een scheiding toe. In deze activiteit eindigt elke bestaande invoer al met een nieuwe regel en bevat het nieuwe bericht geen nieuwe regel. Schrijf message + "\\n" om precies één invoer toe te voegen.',
    ],
    rule: [
      "Append preserves previous bytes; provide the separator yourself.",
      "Toevoegen bewaart eerdere bytes; lever zelf de scheiding.",
    ],
    example:
      'with open("example.txt","a",encoding="utf-8") as handle:\n    handle.write("second\\n")\nwith open("example.txt",encoding="utf-8") as handle:\n    print(handle.read(),end="")',
    exampleFiles: { "example.txt": "first\n" },
    output: "first\nsecond\n",
    predict: [
      "What would w do to the first line?",
      "Wat doet w met de eerste regel?",
    ],
    fixtures: { "log.txt": "Started\n" },
    caller: 'work.add_entry("log.txt","Played")',
    starter: "def add_entry(path, message):\n    return None\n",
    solution:
      'def add_entry(path, message):\n    with open(path,"a",encoding="utf-8") as handle:\n        handle.write(message + "\n")\n'.replace(
        'message + "\n"',
        'message + "\\n"',
      ),
    tasks: [
      {
        name: "add_entry",
        task: [
          "Append message and one newline while preserving the existing log.",
          "Voeg message en één nieuwe regel toe met behoud van het bestaande log.",
        ],
        help: [
          "Use append mode instead of write mode.",
          "Gebruik toevoegmodus in plaats van schrijfmodus.",
        ],
        fragment: 'open(path, "a", encoding="utf-8")',
        cases: [
          {
            args: ["log.txt", "Finished"],
            check: 'open("log.txt").read() == "Started\nFinished\n"',
          },
          {
            args: ["new.txt", "Hi"],
            check: 'open("new.txt").read() == "Hi\n"',
          },
        ],
      },
    ],
    change: [
      "Run twice, navigate away, return and inspect the saved log.",
      "Voer tweemaal uit, navigeer weg, keer terug en bekijk het opgeslagen log.",
    ],
    explain: [
      "Appending adds one new line without truncating the old entries.",
      "Toevoegen plaatst één nieuwe regel zonder eerdere invoeren te wissen.",
    ],
  }),
  f("missing", {
    title: [
      "Handle a missing file explicitly",
      "Verwerk een ontbrekend bestand expliciet",
    ],
    topics: "missing-files",
    requires: "read try-except",
    why: [
      "A file may not exist yet. Decide what that means for this feature rather than hiding every possible failure.",
      "Een bestand bestaat misschien nog niet. Bepaal wat dat voor deze functie betekent in plaats van elke mogelijke fout te verbergen.",
    ],
    teach: [
      "Opening an absent path for reading raises FileNotFoundError. Catch that specific exception when absence has a defined fallback. Do not treat every error as an empty file: a permission or encoding problem is different and should remain visible. A missing optional note can reasonably return an empty string; a required data file may need an error instead.",
      "Een ontbrekend pad openen om te lezen veroorzaakt FileNotFoundError. Vang die specifieke uitzondering wanneer afwezigheid een vastgestelde terugval heeft. Behandel niet elke fout als een leeg bestand: een rechten- of coderingsprobleem is anders en moet zichtbaar blijven. Een ontbrekende optionele notitie kan redelijkerwijs een lege string geven; een verplicht gegevensbestand kan juist een fout nodig hebben.",
    ],
    rule: [
      "A fallback is a product decision for one expected failure.",
      "Een terugvalwaarde is een ontwerpbeslissing voor één verwachte fout.",
    ],
    example:
      'try:\n    with open("absent.txt",encoding="utf-8") as handle:\n        text = handle.read()\nexcept FileNotFoundError:\n    text = "No note yet"\nprint(text)',
    output: "No note yet\n",
    predict: [
      "Would this handler catch ValueError from a conversion?",
      "Vangt deze afhandeling ValueError van een omzetting op?",
    ],
    fixtures: { "note.txt": "Remember" },
    caller: 'print(work.optional_note("note.txt"))',
    starter: 'def optional_note(path):\n    return ""\n',
    solution:
      'def optional_note(path):\n    try:\n        with open(path,encoding="utf-8") as handle:\n            return handle.read()\n    except FileNotFoundError:\n        return ""\n',
    tasks: [
      {
        name: "optional_note",
        task: [
          "Return the optional note’s text, or an empty string only when the file is missing.",
          "Geef de tekst van de optionele notitie terug, of alleen een lege string wanneer het bestand ontbreekt.",
        ],
        help: [
          "Wrap the managed read in a specific FileNotFoundError handler.",
          "Zet de beheerde leesactie in een specifieke FileNotFoundError-afhandeling.",
        ],
        fragment: "except FileNotFoundError:",
        cases: [
          { args: ["note.txt"], check: '_return == "Remember"' },
          { args: ["not-present.txt"], check: '_return == ""' },
        ],
      },
    ],
    change: [
      "Compare an empty existing file with a missing file; decide whether your feature needs to distinguish them.",
      "Vergelijk een leeg bestaand bestand met een ontbrekend bestand; bepaal of je functie ze moet onderscheiden.",
    ],
    explain: [
      "The fallback is limited to absence; other failures retain their diagnostic information.",
      "De terugval is beperkt tot afwezigheid; andere fouten behouden hun diagnostische informatie.",
    ],
  }),
  f("report", {
    title: [
      "Generate a text report from a file",
      "Maak een tekstrapport vanuit een bestand",
    ],
    topics: "file-review",
    practices: "read line-iteration write",
    requires: "write line-iteration",
    guidance: "independent",
    minutes: 25,
    why: [
      "Combine reading, processing and writing in one small file workflow.",
      "Combineer lezen, verwerken en schrijven in één kleine bestandswerkwijze.",
    ],
    teach: [
      "The input contains one valid integer per nonempty line. Ignore blank lines. Write a report to a different output path containing count=<number> then total=<sum>, each ending with newline. Return the sum as well. Keep the source file unchanged. For an empty source both numbers are zero.",
      "De invoer bevat één geldig geheel getal per niet-lege regel. Negeer lege regels. Schrijf naar een ander uitvoerpad een rapport met count=<aantal> en daarna total=<som>, elk met nieuwe regel. Geef ook de som terug. Laat het bronbestand ongewijzigd. Bij een lege bron zijn beide getallen nul.",
    ],
    rule: [
      "Keep source, processing and destination responsibilities clear.",
      "Houd bron, verwerking en bestemming duidelijk gescheiden.",
    ],
    example:
      'values = [2,5]\ntotal = 0\nfor value in values:\n    total += value\nprint(f"count={len(values)}")\nprint(f"total={total}")',
    output: "count=2\ntotal=7\n",
    predict: [
      "Why does the output path need to differ from the source?",
      "Waarom moet het uitvoerpad verschillen van de bron?",
    ],
    fixtures: { "values.txt": "2\n\n-1\n4\n" },
    caller: 'print(work.report("values.txt","summary.txt"))',
    starter: "def report(source, destination):\n    return None\n",
    solution:
      'def report(source, destination):\n    count = 0\n    total = 0\n    with open(source,encoding="utf-8") as handle:\n        for line in handle:\n            if line.strip() != "":\n                count += 1\n                total += int(line)\n    with open(destination,"w",encoding="utf-8") as handle:\n        handle.write(f"count={count}\\ntotal={total}\\n")\n    return total\n',
    tasks: [
      {
        name: "report",
        task: [
          "Implement the report contract for empty and nonempty files. Inspect the generated summary.",
          "Implementeer de rapportafspraak voor lege en niet-lege bestanden. Bekijk de gemaakte samenvatting.",
        ],
        help: [
          "Accumulate while reading; write the formatted report only after reading finishes.",
          "Verzamel tijdens lezen; schrijf het geformatteerde rapport pas nadat lezen klaar is.",
        ],
        fragment: "total += int(line)",
        cases: [
          {
            args: ["values.txt", "summary.txt"],
            check:
              '_return == 5 and open("summary.txt").read() == "count=3\ntotal=5\n" and open("values.txt").read() == "2\n\n-1\n4\n"',
          },
          {
            args: ["empty.txt", "out.txt"],
            files: { "empty.txt": "" },
            check:
              '_return == 0 and open("out.txt").read() == "count=0\ntotal=0\n"',
          },
        ],
      },
    ],
    change: [
      "Add another negative number to the source and predict both report fields.",
      "Voeg nog een negatief getal aan de bron toe en voorspel beide rapportvelden.",
    ],
    explain: [
      "Reading completes before writing the separate output; the original file is never opened in write mode.",
      "Lezen is klaar vóór schrijven naar de aparte uitvoer; het origineel wordt nooit in schrijfmodus geopend.",
    ],
  }),
];
