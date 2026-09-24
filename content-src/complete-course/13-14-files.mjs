import { lesson, S, C, F } from "./authoring.mjs";
const files = (code, fixtures = {}) => ({ ...fixtures, "main.py": code });
const readText = (name) =>
  `__import__("pathlib").Path(${JSON.stringify(name)}).read_text(encoding="utf-8")`;
const loadJson = (name) => `__import__("json").loads(${readText(name)})`;
export const activities = [
  lesson(13, 1, {
    explanation: [
      "Read a supplied UTF-8 text file and inspect it beside your code. Browser files live in this activity’s workspace; they are not automatically files in your computer’s folders.",
      "Lees een meegeleverd UTF-8-tekstbestand en bekijk het naast je code. Browserbestanden staan in de werkruimte van deze activiteit; ze worden niet automatisch bestanden in de mappen op je computer.",
    ],
    sections: [
      {
        ...S(
          "with read utf-8 browser-filesystem",
          ["Open, use, close", "Open, gebruik, sluit"],
          [
            'with open(filename, "r", encoding="utf-8") as handle opens a text file for reading and closes it when the block ends, including after an exception. handle.read() returns the remaining text, including newlines. This app restores saved workspace files before Run and captures supported generated text files afterward. Inspect file tabs and use backup export to keep a portable copy; a bare Pyodide filesystem alone would not guarantee persistence across page reloads. See [Pyodide filesystems](https://pyodide.org/en/stable/usage/file-system.html).',
            'with open(bestandsnaam, "r", encoding="utf-8") as handle opent een tekstbestand om te lezen en sluit het wanneer het blok eindigt, ook na een uitzondering. handle.read() geeft resterende tekst terug, inclusief nieuwe regels. Deze app herstelt opgeslagen werkruimtebestanden vóór Uitvoeren en bewaart ondersteunde gegenereerde tekstbestanden daarna. Bekijk bestandstabbladen en exporteer een back-up voor een draagbare kopie; een los Pyodide-bestandssysteem garandeert geen behoud na herladen. Zie [Pyodide-bestandssystemen](https://pyodide.org/en/stable/usage/file-system.html).',
          ],
          'with open("example.txt", "r", encoding="utf-8") as handle:\n    text = handle.read()\nprint(text, end="")',
          "Café\nWelcome\n",
          [
            "When does the file close? Are newlines part of text?",
            "Wanneer sluit het bestand? Zijn nieuwe regels onderdeel van text?",
          ],
        ),
        exampleFiles: { "example.txt": "Café\nWelcome\n" },
      },
    ],
    starter: files(
      'def read_note(filename):\n    return ""\n\nprint(read_note("note.txt"), end="")\n',
      { "note.txt": "Café lab\nBring a notebook.\n" },
    ),
    solution: files(
      'def read_note(filename):\n    with open(filename, "r", encoding="utf-8") as handle:\n        return handle.read()\n\nprint(read_note("note.txt"), end="")\n',
      { "note.txt": "Café lab\nBring a notebook.\n" },
    ),
    tasks: [
      C(
        "with read",
        [
          "Use with to implement read_note(filename), returning the complete text without trimming it.",
          "Gebruik with om read_note(filename) te implementeren en geef de volledige tekst zonder trimmen terug.",
        ],
        'read_note("note.txt") == "Café lab\nBring a notebook.\n" and any(isinstance(n,_ast.With) for n in _ast.walk(_ast.parse(_source)))',
        [
          [
            "Return the text while the file is open.",
            "Geef de tekst terug terwijl het bestand open is.",
          ],
          [
            "Call read without a size limit.",
            "Roep read zonder groottelimiet aan.",
          ],
          [
            'with open(filename, "r", encoding="utf-8") as handle:',
            'with open(filename, "r", encoding="utf-8") as handle:',
          ],
        ],
        [
          "Do not lose the final newline or hard-code the example file’s contents.",
          "Verlies de laatste nieuwe regel niet en leg de voorbeeldinhoud niet vast in code.",
        ],
        [
          F("read_note", ["other.txt"], '_return == "line 1\nline 2\n"', {
            files: { "other.txt": "line 1\nline 2\n" },
          }),
        ],
      ),
      C(
        "utf-8 browser-filesystem",
        [
          "Read accented text and an empty workspace file correctly. Open note.txt in its file tab and compare it with the terminal.",
          "Lees tekst met accenten en een leeg werkruimtebestand correct. Open note.txt in zijn tabblad en vergelijk het met de terminal.",
        ],
        '_stdout == "Café lab\nBring a notebook.\n"',
        [
          [
            "UTF-8 keeps the text encoding explicit.",
            "UTF-8 maakt de tekstcodering expliciet.",
          ],
          [
            "Reading an empty file returns an empty string.",
            "Een leeg bestand lezen geeft een lege string terug.",
          ],
          ["return handle.read()", "return handle.read()"],
        ],
        [
          "Use the supplied filename and preserve all characters.",
          "Gebruik de meegegeven bestandsnaam en behoud alle tekens.",
        ],
        [
          F("read_note", ["empty.txt"], '_return == ""', {
            files: { "empty.txt": "" },
          }),
          F("read_note", ["unicode.txt"], '_return == "Zoë — welkom\n"', {
            files: { "unicode.txt": "Zoë — welkom\n" },
          }),
        ],
      ),
    ],
    note: [
      "The context manager controls the file’s lifetime. Returning read() preserves the exact text while UTF-8 makes non-ASCII characters portable.",
      "De contextmanager beheert de levensduur van het bestand. read() teruggeven behoudt de exacte tekst terwijl UTF-8 niet-ASCII-tekens overdraagbaar maakt.",
    ],
    experiment: [
      "Edit one line in note.txt, Run, navigate away and return. The saved file should keep your edit. Explain why that app behaviour differs from writing directly into a desktop folder.",
      "Bewerk één regel in note.txt, voer uit, navigeer weg en keer terug. Het opgeslagen bestand hoort je wijziging te behouden. Leg uit waarom dat appgedrag verschilt van direct schrijven in een desktopmap.",
    ],
  }),
  lesson(13, 2, {
    explanation: [
      "Read a header and then process the remaining lines. Reading advances a file position; the next operation continues from there.",
      "Lees een kop en verwerk daarna de resterende regels. Lezen verplaatst een bestandspositie; de volgende bewerking gaat daar verder.",
    ],
    sections: [
      {
        ...S(
          "line-iteration readline file-position",
          ["The cursor moves forward", "De positie gaat vooruit"],
          [
            'readline() reads one line, including its newline if present. At end-of-file it returns ""; a blank line is "\\n", which is different. Iterating for line in handle reads remaining lines from the current position. read() also starts at the current position, not automatically at the beginning. Reopening a file creates a new reading position.',
            'readline() leest één regel, inclusief zijn nieuwe regel als die aanwezig is. Aan het einde geeft het "" terug; een lege regel is "\\n", wat anders is. for line in handle leest resterende regels vanaf de huidige positie. read() begint ook bij de huidige positie, niet vanzelf aan het begin. Een bestand opnieuw openen maakt een nieuwe leespositie.',
          ],
          'with open("example.txt", encoding="utf-8") as handle:\n    first = handle.readline()\n    rest = handle.read()\n    end = handle.readline()\nprint(first.strip())\nprint(rest.strip())\nprint(end == "")',
          "Names\nAda\nBo\nTrue\n",
          ["Why does rest not include Names?", "Waarom bevat rest niet Names?"],
        ),
        exampleFiles: { "example.txt": "Names\nAda\nBo\n" },
      },
    ],
    starter: files(
      'def load_lines(filename):\n    return "", []\n\nprint(load_lines("guests.txt"))\n',
      { "guests.txt": "Guests\n Ada \n\nBo\n" },
    ),
    solution: files(
      'def load_lines(filename):\n    with open(filename, encoding="utf-8") as handle:\n        header = handle.readline().strip()\n        entries = []\n        for line in handle:\n            entry = line.strip()\n            if entry != "":\n                entries.append(entry)\n    return header, entries\n\nprint(load_lines("guests.txt"))\n',
      { "guests.txt": "Guests\n Ada \n\nBo\n" },
    ),
    tasks: [
      C(
        "readline file-position",
        [
          "Use readline for the stripped header, then read only the remaining lines. Return (header, entries).",
          "Gebruik readline voor de getrimde kop en lees daarna alleen resterende regels. Geef (header, entries) terug.",
        ],
        'load_lines("guests.txt") == ("Guests",["Ada","Bo"])',
        [
          [
            "The first read already consumes the header.",
            "De eerste leesactie verbruikt de kop al.",
          ],
          [
            "Do not reopen the file before iterating over its remaining lines.",
            "Open het bestand niet opnieuw voordat je de resterende regels doorloopt.",
          ],
          [
            "header = handle.readline().strip()",
            "header = handle.readline().strip()",
          ],
        ],
        [
          "The header should not appear again as an entry.",
          "De kop mag niet opnieuw als item verschijnen.",
        ],
        [
          F("load_lines", ["one.txt"], '_return == ("Header",[])', {
            files: { "one.txt": "Header\n" },
          }),
        ],
      ),
      C(
        "line-iteration",
        [
          'Strip each remaining line, skip empty entries and handle an empty file as ("", []).',
          'Trim elke resterende regel, sla lege items over en handel een leeg bestand af als ("", []).',
        ],
        'load_lines("guests.txt")[1] == ["Ada","Bo"]',
        [
          [
            "A blank data line is not end-of-file.",
            "Een lege gegevensregel is niet het einde van het bestand.",
          ],
          [
            "Keep iterating after blank lines.",
            "Blijf na lege regels doorlopen.",
          ],
          [
            'if entry != "":\n    entries.append(entry)',
            'if entry != "":\n    entries.append(entry)',
          ],
        ],
        [
          "Blank lines in the middle must not hide later entries.",
          "Lege regels in het midden mogen latere items niet verbergen.",
        ],
        [
          F("load_lines", ["empty.txt"], '_return == ("",[])', {
            files: { "empty.txt": "" },
          }),
          F("load_lines", ["extra.txt"], '_return == ("People",["A","B"])', {
            files: { "extra.txt": "People\nA\n\nB" },
          }),
        ],
      ),
    ],
    note: [
      "One file handle has one advancing position. Reading the header first and iterating afterward naturally separates metadata from data lines.",
      "Eén bestandshandle heeft één voortgaande positie. Eerst de kop lezen en daarna doorlopen scheidt vanzelf metadata van gegevensregels.",
    ],
    experiment: [
      "Add a second read() after the loop and predict its result. Then reopen the file and explain why reading starts over.",
      "Voeg na de lus nog een read() toe en voorspel het resultaat. Open daarna het bestand opnieuw en leg uit waarom lezen opnieuw begint.",
    ],
  }),
  lesson(13, 3, {
    explanation: [
      "Compare replacing file contents with adding to the end. Only write to the activity’s named log files; inspect the generated text in its file tab after Run.",
      "Vergelijk bestandsinhoud vervangen met achteraan toevoegen. Schrijf alleen naar de benoemde logbestanden van de activiteit; bekijk na Uitvoeren de gegenereerde tekst in zijn tabblad.",
    ],
    sections: [
      S(
        "write append-file persistence missing-file",
        ["Modes express intention", "Modi drukken bedoeling uit"],
        [
          'Opening with "w" creates a file or truncates its old contents immediately. "a" creates or appends. write(text) does not add a newline automatically. Reading a nonexistent file raises FileNotFoundError; choose a specific fallback when absence is expected. The app saves supported generated text files with your workspace, so a later Run can read the captured version.',
          'Openen met "w" maakt een bestand of wist direct de oude inhoud. "a" maakt een bestand of voegt toe. write(tekst) voegt niet automatisch een nieuwe regel toe. Een niet-bestaand bestand lezen geeft FileNotFoundError; kies een specifieke terugval als afwezigheid verwacht is. De app slaat ondersteunde gegenereerde tekstbestanden bij je werkruimte op, zodat een latere uitvoering de bewaarde versie kan lezen.',
        ],
        'with open("example.txt", "w", encoding="utf-8") as handle:\n    handle.write("First\\n")\nwith open("example.txt", "a", encoding="utf-8") as handle:\n    handle.write("Second\\n")\nwith open("example.txt", encoding="utf-8") as handle:\n    print(handle.read(), end="")',
        "First\nSecond\n",
        [
          "What would change if the second mode were w?",
          "Wat zou veranderen als de tweede modus w was?",
        ],
      ),
    ],
    starter: files(
      'def reset_log(filename, title):\n    pass\n\ndef append_event(filename, event):\n    pass\n\ndef read_log(filename):\n    return ""\n\nreset_log("events.txt", "Session")\nappend_event("events.txt", "Started")\nprint(read_log("events.txt"), end="")\n',
    ),
    solution: files(
      'def reset_log(filename, title):\n    with open(filename, "w", encoding="utf-8") as handle:\n        handle.write(title + "\\n")\n\ndef append_event(filename, event):\n    with open(filename, "a", encoding="utf-8") as handle:\n        handle.write(event + "\\n")\n\ndef read_log(filename):\n    try:\n        with open(filename, encoding="utf-8") as handle:\n            return handle.read()\n    except FileNotFoundError:\n        return ""\n\nreset_log("events.txt", "Session")\nappend_event("events.txt", "Started")\nprint(read_log("events.txt"), end="")\n',
    ),
    tasks: [
      C(
        "write",
        [
          "Implement reset_log to replace the contents with title plus one newline.",
          "Implementeer reset_log om de inhoud door title plus één nieuwe regel te vervangen.",
        ],
        "callable(reset_log)",
        [
          [
            "The reset action deliberately discards old log text.",
            "De resetactie verwijdert bewust oude logtekst.",
          ],
          [
            "Use mode w and append a newline to the written string.",
            "Gebruik modus w en voeg een nieuwe regel aan de geschreven string toe.",
          ],
          ['handle.write(title + "\\n")', 'handle.write(title + "\\n")'],
        ],
        [
          "Reset must not append to an existing file.",
          "Reset mag niet aan een bestaand bestand toevoegen.",
        ],
        [
          F(
            "reset_log",
            ["probe.txt", "New"],
            `${readText("probe.txt")} == "New\n"`,
            { files: { "probe.txt": "Old\nOld\n" } },
          ),
        ],
      ),
      C(
        "append-file persistence",
        [
          "Implement append_event to add event plus one newline while preserving existing contents.",
          "Implementeer append_event om event plus één nieuwe regel toe te voegen en bestaande inhoud te behouden.",
        ],
        '_stdout == "Session\nStarted\n"',
        [
          [
            "The log must survive the next event.",
            "Het log moet de volgende gebeurtenis overleven.",
          ],
          ["Use append mode a.", "Gebruik toevoegmodus a."],
          [
            'with open(filename, "a", encoding="utf-8") as handle:',
            'with open(filename, "a", encoding="utf-8") as handle:',
          ],
        ],
        [
          "Check the old text remains before the new line.",
          "Controleer dat oude tekst vóór de nieuwe regel blijft staan.",
        ],
        [
          F(
            "append_event",
            ["probe.txt", "Café"],
            `${readText("probe.txt")} == "Old\nCafé\n"`,
            { files: { "probe.txt": "Old\n" } },
          ),
        ],
      ),
      C(
        "missing-file",
        [
          'Implement read_log to return all text, or "" only when the file is missing.',
          'Implementeer read_log om alle tekst terug te geven, of alleen "" wanneer het bestand ontbreekt.',
        ],
        'read_log("events.txt") == "Session\nStarted\n"',
        [
          [
            "Absence is an expected case for a first-time log.",
            "Afwezigheid is een verwacht geval bij een eerste log.",
          ],
          [
            "Catch FileNotFoundError around opening for reading.",
            "Vang FileNotFoundError rond openen voor lezen op.",
          ],
          [
            'except FileNotFoundError:\n    return ""',
            'except FileNotFoundError:\n    return ""',
          ],
        ],
        [
          "Do not hide every file error with a broad except.",
          "Verberg niet elke bestandsfout met een brede except.",
        ],
        [
          F(
            "read_log",
            ["not-created.txt"],
            '_return == "" and _error is None',
          ),
        ],
      ),
    ],
    note: [
      "Reset and append express different intentions with different modes. The read fallback handles an absent first log without pretending every read failure means an empty file.",
      "Reset en toevoegen drukken verschillende bedoelingen uit met verschillende modi. De leesterugval handelt een ontbrekend eerste log af zonder te doen alsof elke leesfout een leeg bestand betekent.",
    ],
    experiment: [
      "After passing, remove the reset call from main.py and Run twice. Inspect events.txt after each run and after reload. Restore reset if you want the demonstration’s original output.",
      "Verwijder na slagen de reset-aanroep uit main.py en voer twee keer uit. Bekijk events.txt na elke uitvoering en na herladen. Herstel reset als je de oorspronkelijke demonstratie-uitvoer terug wilt.",
    ],
  }),
  lesson(13, 4, {
    explanation: [
      "Generate a text report from a list of names stored in a file. Trim each line, ignore empty lines, title-case names, and write a count followed by one name per line.",
      "Maak een tekstrapport van namen in een bestand. Trim elke regel, negeer lege regels, geef namen titelnotatie en schrijf een aantal gevolgd door één naam per regel.",
    ],
    sections: [
      S(
        "files-review",
        ["Keep input and output separate", "Houd invoer en uitvoer apart"],
        [
          "Read from source and write to a different target filename. This preserves the source for another report. Assemble the meaningful data before formatting the output. A report with no names still has a count line. All text files in this task use UTF-8.",
          "Lees uit source en schrijf naar een andere target-bestandsnaam. Dit bewaart de bron voor een ander rapport. Verzamel de betekenisvolle gegevens vóór opmaak van de uitvoer. Een rapport zonder namen heeft nog steeds een telregel. Alle tekstbestanden in deze taak gebruiken UTF-8.",
        ],
        'names = ["Ada", "Bo"]\nreport = f"Participants: {len(names)}\\n"\nfor name in names:\n    report += name + "\\n"\nprint(report, end="")',
        "Participants: 2\nAda\nBo\n",
        [
          "Why should the original file remain unchanged?",
          "Waarom moet het oorspronkelijke bestand ongewijzigd blijven?",
        ],
      ),
    ],
    starter: files(
      'def write_report(source, target):\n    return 0\n\nprint(write_report("guests.txt", "report.txt"))\n',
      { "guests.txt": " ada \n\nBO\nzoë\n" },
    ),
    solution: files(
      'def write_report(source, target):\n    names = []\n    with open(source, encoding="utf-8") as handle:\n        for line in handle:\n            name = line.strip().title()\n            if name != "":\n                names.append(name)\n    with open(target, "w", encoding="utf-8") as handle:\n        handle.write(f"Participants: {len(names)}\\n")\n        for name in names:\n            handle.write(name + "\\n")\n    return len(names)\n\nprint(write_report("guests.txt", "report.txt"))\n',
      { "guests.txt": " ada \n\nBO\nzoë\n" },
    ),
    tasks: [
      C(
        "files-review",
        [
          "Write the cleaned report to target and return the number of names. Its first line is Participants: count; every line ends with a newline.",
          "Schrijf het opgeschoonde rapport naar target en geef het aantal namen terug. De eerste regel is Participants: aantal; elke regel eindigt met een nieuwe regel.",
        ],
        `${readText("report.txt")} == "Participants: 3\nAda\nBo\nZoë\n"`,
        [
          [
            "Read and clean before opening the report for writing.",
            "Lees en schoon op voordat je het rapport opent om te schrijven.",
          ],
          [
            "Keep a list so its length gives the count.",
            "Houd een lijst bij zodat de lengte het aantal geeft.",
          ],
          [
            'handle.write(f"Participants: {len(names)}\\n")',
            'handle.write(f"Participants: {len(names)}\\n")',
          ],
        ],
        [
          "The generated file, not only the terminal output, must contain the report.",
          "Het gegenereerde bestand moet het rapport bevatten, niet alleen de terminaluitvoer.",
        ],
        [
          F(
            "write_report",
            ["source.txt", "target.txt"],
            `_return == 1 and ${readText("target.txt")} == "Participants: 1\nÉva\n"`,
            { files: { "source.txt": " éva \n" } },
          ),
        ],
      ),
      C(
        "files-review",
        [
          "Preserve source and handle an empty or whitespace-only source with Participants: 0 and no name lines.",
          "Behoud source en handel een lege bron of alleen witruimte af met Participants: 0 en zonder naamregels.",
        ],
        `${readText("guests.txt")} == " ada \n\nBO\nzoë\n"`,
        [
          [
            "The input must remain available for future processing.",
            "De invoer moet beschikbaar blijven voor latere verwerking.",
          ],
          [
            "Open source only for reading; write only to target.",
            "Open source alleen voor lezen; schrijf alleen naar target.",
          ],
          [
            'with open(target, "w", encoding="utf-8") as handle:',
            'with open(target, "w", encoding="utf-8") as handle:',
          ],
        ],
        [
          "Check both the empty report and unchanged source file.",
          "Controleer zowel het lege rapport als het ongewijzigde bronbestand.",
        ],
        [
          F(
            "write_report",
            ["empty.txt", "target.txt"],
            `_return == 0 and ${readText("target.txt")} == "Participants: 0\n" and ${readText("empty.txt")} == " \n"`,
            { files: { "empty.txt": " \n" } },
          ),
        ],
      ),
    ],
    note: [
      "The source and target have separate roles. Cleaning happens before counting, so blank lines do not inflate the report.",
      "Bron en doel hebben aparte rollen. Opschonen gebeurt vóór tellen zodat lege regels het rapport niet opblazen.",
    ],
    experiment: [
      "Inspect report.txt after Run, then add a name to guests.txt and Run again. Confirm the count changes once and the report does not accumulate duplicate old runs.",
      "Bekijk report.txt na Uitvoeren, voeg een naam aan guests.txt toe en voer opnieuw uit. Bevestig dat het aantal één keer verandert en het rapport geen dubbele oude uitvoeringen verzamelt.",
    ],
  }),
  lesson(14, 1, {
    explanation: [
      "Read tabular data with Python’s csv module. CSV fields arrive as strings; convert only the columns whose meaning is numeric.",
      "Lees tabelgegevens met Pythons csv-module. CSV-velden komen als strings binnen; zet alleen kolommen om waarvan de betekenis numeriek is.",
    ],
    sections: [
      {
        ...S(
          "csv-structure csv-reader csv-dictreader csv-conversion",
          ["Rows or named fields", "Rijen of benoemde velden"],
          [
            'CSV stores records with separators and optional quoting. csv.reader(handle) produces lists of string fields. csv.DictReader(handle) uses the first row as field names and produces dictionaries for the remaining rows. Open CSV with newline="" so the parser handles line endings correctly. Convert numeric fields explicitly; identifiers such as "001" may need to stay text.',
            'CSV bewaart records met scheidingstekens en optionele aanhalingstekens. csv.reader(handle) geeft lijsten met stringvelden. csv.DictReader(handle) gebruikt de eerste rij als veldnamen en geeft dictionaries voor de overige rijen. Open CSV met newline="" zodat de parser regeleinden correct afhandelt. Zet numerieke velden expliciet om; codes zoals "001" moeten mogelijk tekst blijven.',
          ],
          'import csv\nwith open("example.csv", newline="", encoding="utf-8") as handle:\n    for row in csv.DictReader(handle):\n        print(row["name"], int(row["score"]) + 1)',
          "Ada 4\n",
          [
            "Why is int needed before adding one?",
            "Waarom is int nodig vóór één optellen?",
          ],
        ),
        exampleFiles: { "example.csv": "name,score\nAda,3\n" },
      },
    ],
    starter: files(
      'import csv\n\ndef headings(filename):\n    return []\n\ndef read_scores(filename):\n    return []\n\nprint(read_scores("scores.csv"))\n',
      { "scores.csv": "name,score\nAda,2\nBo,5\n" },
    ),
    solution: files(
      'import csv\n\ndef headings(filename):\n    with open(filename, newline="", encoding="utf-8") as handle:\n        rows = list(csv.reader(handle))\n    if rows:\n        return rows[0]\n    return []\n\ndef read_scores(filename):\n    records = []\n    with open(filename, newline="", encoding="utf-8") as handle:\n        for row in csv.DictReader(handle):\n            records.append({"name": row["name"], "score": int(row["score"])})\n    return records\n\nprint(read_scores("scores.csv"))\n',
      { "scores.csv": "name,score\nAda,2\nBo,5\n" },
    ),
    tasks: [
      C(
        "csv-structure csv-reader",
        [
          "Use csv.reader in headings to return the first row’s fields, or [] for an empty file.",
          "Gebruik csv.reader in headings om de velden van de eerste rij terug te geven, of [] voor een leeg bestand.",
        ],
        'headings("scores.csv") == ["name","score"]',
        [
          [
            "A CSV row is a list of fields.",
            "Een CSV-rij is een lijst velden.",
          ],
          [
            "Read rows through the parser, then select the header.",
            "Lees rijen via de parser en selecteer de kop.",
          ],
          [
            "rows = list(csv.reader(handle))",
            "rows = list(csv.reader(handle))",
          ],
        ],
        [
          "Do not treat an empty file as though it contains a header.",
          "Behandel een leeg bestand niet alsof het een kop bevat.",
        ],
        [
          F("headings", ["empty.csv"], "_return == []", {
            files: { "empty.csv": "" },
          }),
          F("headings", ["custom.csv"], '_return == ["full name","score"]', {
            files: { "custom.csv": "full name,score\n" },
          }),
        ],
      ),
      C(
        "csv-dictreader csv-conversion",
        [
          "Use DictReader to return name/score dictionaries, keeping names as strings and converting scores to int.",
          "Gebruik DictReader om name/score-dictionaries terug te geven, met namen als strings en scores als int.",
        ],
        'read_scores("scores.csv") == [{"name":"Ada","score":2},{"name":"Bo","score":5}]',
        [
          [
            "DictReader already consumes the header.",
            "DictReader verwerkt de kop al.",
          ],
          [
            'Convert row["score"] for each record.',
            'Zet row["score"] voor elk record om.',
          ],
          [
            '{"name": row["name"], "score": int(row["score"])}',
            '{"name": row["name"], "score": int(row["score"])}',
          ],
        ],
        [
          "A numeric-looking string is not yet a numeric score.",
          "Een numeriek ogende string is nog geen numerieke score.",
        ],
        [
          F(
            "read_scores",
            ["case.csv"],
            '_return == [{"name":"001","score":-2}]',
            { files: { "case.csv": "name,score\n001,-2\n" } },
          ),
          F("read_scores", ["header.csv"], "_return == []", {
            files: { "header.csv": "name,score\n" },
          }),
        ],
      ),
    ],
    note: [
      "The parser owns CSV syntax while the program owns column meaning. That division preserves names and makes score arithmetic reliable.",
      "De parser beheert CSV-syntax terwijl het programma kolombetekenis beheert. Die verdeling behoudt namen en maakt scoreberekeningen betrouwbaar.",
    ],
    experiment: [
      "Add a negative score and a name with leading zeros. Explain why only one column should be converted.",
      "Voeg een negatieve score en een naam met voorloopnullen toe. Leg uit waarom slechts één kolom moet worden omgezet.",
    ],
  }),
  lesson(14, 2, {
    explanation: [
      "Read quoted fields and different delimiters without splitting the raw lines yourself. A quoted field may contain a delimiter or even a newline.",
      "Lees velden met aanhalingstekens en verschillende scheidingstekens zonder zelf ruwe regels te splitsen. Een veld met aanhalingstekens kan een scheidingsteken of zelfs een nieuwe regel bevatten.",
    ],
    sections: [
      {
        ...S(
          "csv-quoting csv-delimiters",
          [
            "Let the CSV parser find boundaries",
            "Laat de CSV-parser grenzen vinden",
          ],
          [
            'A semicolon-separated file is still parsed by csv when delimiter=";" is supplied. Quotes group field contents, so "North; Hall" is one field. Doubled quotes inside a quoted field represent one literal quote. Use newline="" and do not splitlines before passing data to the reader: that can break multiline fields.',
            'Een puntkomma-gescheiden bestand wordt ook door csv verwerkt met delimiter=";". Aanhalingstekens groeperen veldinhoud, dus "North; Hall" is één veld. Dubbele aanhalingstekens binnen een aangehaald veld stellen één letterlijk aanhalingsteken voor. Gebruik newline="" en pas niet eerst splitlines toe: dat kan meerregelige velden breken.',
          ],
          'import csv\nwith open("example.csv", newline="", encoding="utf-8") as handle:\n    for row in csv.DictReader(handle, delimiter=";"):\n        print(row["label"])',
          "North; Hall\n",
          [
            'Why would split(";") produce too many pieces?',
            'Waarom zou split(";") te veel delen geven?',
          ],
        ),
        exampleFiles: { "example.csv": 'label;count\n"North; Hall";2\n' },
      },
    ],
    starter: files(
      'import csv\n\ndef read_labels(filename, delimiter=";"):\n    return []\n\nprint(read_labels("labels.csv"))\n',
      { "labels.csv": 'label;count\n"North; Hall";2\n"Say ""Hi""";3\n' },
    ),
    solution: files(
      'import csv\n\ndef read_labels(filename, delimiter=";"):\n    records = []\n    with open(filename, newline="", encoding="utf-8") as handle:\n        for row in csv.DictReader(handle, delimiter=delimiter):\n            records.append((row["label"], int(row["count"])))\n    return records\n\nprint(read_labels("labels.csv"))\n',
      { "labels.csv": 'label;count\n"North; Hall";2\n"Say ""Hi""";3\n' },
    ),
    tasks: [
      C(
        "csv-quoting",
        [
          "Return (label, count) tuples, preserving delimiters, quotes and newlines inside quoted labels.",
          "Geef (label, count)-tuples terug en behoud scheidingstekens, aanhalingstekens en nieuwe regels binnen aangehaalde labels.",
        ],
        'read_labels("labels.csv")[0] == ("North; Hall",2)',
        [
          [
            "CSV quoting defines the field boundaries.",
            "CSV-aanhalingstekens bepalen veldgrenzen.",
          ],
          [
            "Pass the file handle directly to DictReader.",
            "Geef de bestandshandle direct aan DictReader.",
          ],
          [
            "csv.DictReader(handle, delimiter=delimiter)",
            "csv.DictReader(handle, delimiter=delimiter)",
          ],
        ],
        [
          "A raw string split cannot reliably handle quoted fields.",
          "Een ruwe stringsplit kan aangehaalde velden niet betrouwbaar afhandelen.",
        ],
        [
          F(
            "read_labels",
            ["quoted.csv"],
            '_return == [("Line 1\nLine 2",4)]',
            { files: { "quoted.csv": 'label;count\n"Line 1\nLine 2";4\n' } },
          ),
          F(
            "read_labels",
            ["labels.csv"],
            '_return[1][0] == "Say " + chr(34) + "Hi" + chr(34)',
          ),
        ],
      ),
      C(
        "csv-delimiters",
        [
          "Honour a supplied delimiter argument, including comma and tab, and convert counts to integers.",
          "Respecteer een meegegeven delimiter-argument, inclusief komma en tab, en zet aantallen om naar gehele getallen.",
        ],
        "callable(read_labels)",
        [
          [
            "The default is only used when omitted.",
            "De standaard geldt alleen als het argument ontbreekt.",
          ],
          [
            "Forward delimiter to the reader unchanged.",
            "Geef delimiter ongewijzigd aan de reader door.",
          ],
          [
            "for row in csv.DictReader(handle, delimiter=delimiter):",
            "for row in csv.DictReader(handle, delimiter=delimiter):",
          ],
        ],
        [
          "Do not hard-code semicolons in a function that accepts a delimiter.",
          "Leg puntkomma’s niet vast in een functie die een scheidingsteken accepteert.",
        ],
        [
          F("read_labels", ["tabs.csv", "\t"], '_return == [("A",0)]', {
            files: { "tabs.csv": "label\tcount\nA\t0\n" },
          }),
          F("read_labels", ["comma.csv", ","], '_return == [("A, B",2)]', {
            files: { "comma.csv": 'label,count\n"A, B",2\n' },
          }),
        ],
      ),
    ],
    note: [
      "The delimiter is configuration for the parser, not a reason to write a new splitting algorithm. CSV quoting is preserved across physical line breaks.",
      "Het scheidingsteken is parserinstelling, geen reden voor een nieuw splitsalgoritme. CSV-aanhaling blijft over fysieke regeleinden heen behouden.",
    ],
    experiment: [
      "Inspect the supplied doubled quotes. Add a label containing both a semicolon and a quote, then predict the parsed value.",
      "Bekijk de meegeleverde dubbele aanhalingstekens. Voeg een label met zowel puntkomma als aanhalingsteken toe en voorspel de verwerkte waarde.",
    ],
  }),
  lesson(14, 3, {
    explanation: [
      "Export records as CSV that another program can read safely. Let the writer quote fields rather than building comma-separated lines yourself.",
      "Exporteer records als CSV die een ander programma veilig kan lezen. Laat de schrijver velden aanhalen in plaats van zelf kommaregels samen te stellen.",
    ],
    sections: [
      S(
        "csv-writer",
        ["Write a stable schema", "Schrijf een vaste structuur"],
        [
          'csv.DictWriter needs fieldnames to choose column names and order. writeheader() writes those names; writerows(records) writes dictionaries. csv.writer instead writes sequences with writerow or writerows. Open with newline="", mode="w" and UTF-8. The writer adds quoting where needed.',
          'csv.DictWriter heeft fieldnames nodig voor kolomnamen en volgorde. writeheader() schrijft die namen; writerows(records) schrijft dictionaries. csv.writer schrijft daarentegen reeksen met writerow of writerows. Open met newline="", modus="w" en UTF-8. De schrijver voegt waar nodig aanhalingstekens toe.',
        ],
        'import csv\nwith open("example.csv", "w", newline="", encoding="utf-8") as handle:\n    writer = csv.writer(handle)\n    writer.writerow(["name", "score"])\n    writer.writerow(["Ada, A.", 3])\nwith open("example.csv", newline="", encoding="utf-8") as handle:\n    print(list(csv.reader(handle)))',
        "[['name', 'score'], ['Ada, A.', '3']]\n",
        [
          "Why is the comma inside the name safe after writing?",
          "Waarom is de komma binnen de naam veilig na schrijven?",
        ],
      ),
    ],
    starter: files(
      'import csv\n\ndef save_scores(filename, records):\n    pass\n\nsave_scores("export.csv", [{"name": "Zoë, Z.", "score": 3}])\n',
    ),
    solution: files(
      'import csv\n\ndef save_scores(filename, records):\n    with open(filename, "w", newline="", encoding="utf-8") as handle:\n        writer = csv.DictWriter(handle, fieldnames=["name", "score"])\n        writer.writeheader()\n        writer.writerows(records)\n\nsave_scores("export.csv", [{"name": "Zoë, Z.", "score": 3}])\n',
    ),
    tasks: [
      C(
        "csv-writer",
        [
          "Write a CSV with name,score header in that order and one row per supplied record. Replace any old output.",
          "Schrijf een CSV met de kop name,score in die volgorde en één rij per meegegeven record. Vervang oude uitvoer.",
        ],
        'list(csv.reader(open("export.csv",newline="",encoding="utf-8")))[0] == ["name","score"]',
        [
          [
            "Choose a schema before writing rows.",
            "Kies een structuur voordat je rijen schrijft.",
          ],
          [
            "Write the header even when records is empty.",
            "Schrijf de kop ook als records leeg is.",
          ],
          [
            'writer = csv.DictWriter(handle, fieldnames=["name", "score"])',
            'writer = csv.DictWriter(handle, fieldnames=["name", "score"])',
          ],
        ],
        [
          "The output must remain readable when there are no data rows.",
          "De uitvoer moet leesbaar blijven zonder gegevensrijen.",
        ],
        [
          F(
            "save_scores",
            ["empty.csv", []],
            'list(__import__("csv").reader(open("empty.csv",newline="",encoding="utf-8"))) == [["name","score"]]',
            { files: { "empty.csv": "Old\nData\n" } },
          ),
        ],
      ),
      C(
        "csv-writer",
        [
          "Preserve accented names, commas, quotes and newlines so a CSV round trip recovers the original field contents.",
          "Behoud namen met accenten, komma’s, aanhalingstekens en nieuwe regels zodat heen-en-terug lezen de oorspronkelijke veldinhoud herstelt.",
        ],
        'list(csv.DictReader(open("export.csv",newline="",encoding="utf-8"))) == [{"name":"Zoë, Z.","score":"3"}]',
        [
          [
            "The writer knows when quoting is required.",
            "De schrijver weet wanneer aanhalen nodig is.",
          ],
          [
            "Use writerows rather than manually joining with commas.",
            "Gebruik writerows in plaats van handmatig met komma’s samenvoegen.",
          ],
          ["writer.writerows(records)", "writer.writerows(records)"],
        ],
        [
          "Check parsed fields, not only what the raw CSV looks like.",
          "Controleer verwerkte velden, niet alleen hoe ruwe CSV eruitziet.",
        ],
        [
          F(
            "save_scores",
            ["special.csv", [{ name: 'A, "B"\nC', score: -2 }]],
            'list(__import__("csv").DictReader(open("special.csv",newline="",encoding="utf-8"))) == [{"name":_args[1][0]["name"],"score":"-2"}]',
          ),
        ],
      ),
    ],
    note: [
      "A standard writer handles the syntax needed for a faithful round trip. Numeric scores become text fields in CSV and must be converted again by a reader.",
      "Een standaard schrijver regelt de syntax voor betrouwbaar heen-en-terug lezen. Numerieke scores worden tekstvelden in CSV en moeten door een lezer opnieuw worden omgezet.",
    ],
    experiment: [
      "Open export.csv after Run and compare its raw quoting with the parsed name. Re-run with an empty record list and check that only the header remains.",
      "Open export.csv na Uitvoeren en vergelijk ruwe aanhalingstekens met de verwerkte naam. Voer opnieuw uit met een lege lijst en controleer dat alleen de kop overblijft.",
    ],
  }),
  lesson(14, 4, {
    explanation: [
      "Load nested records from JSON. The decoder converts JSON arrays and objects into familiar Python lists and dictionaries.",
      "Laad geneste records uit JSON. De decoder zet JSON-arrays en -objecten om naar bekende Python-lijsten en -dictionaries.",
    ],
    sections: [
      {
        ...S(
          "json-load nested-data",
          ["Follow the structure", "Volg de structuur"],
          [
            "json.load(handle) reads one complete JSON document. Arrays become lists, objects become dictionaries with string keys, true/false become True/False, and null becomes None. Access one layer at a time and inspect the type of each layer. JSONDecodeError reports malformed JSON; a filename is not itself the document.",
            "json.load(handle) leest één volledig JSON-document. Arrays worden lijsten, objecten dictionaries met stringsleutels, true/false worden True/False en null wordt None. Bekijk één laag tegelijk en inspecteer het type van elke laag. JSONDecodeError meldt ongeldige JSON; een bestandsnaam is niet het document zelf.",
          ],
          'import json\nwith open("example.json", encoding="utf-8") as handle:\n    state = json.load(handle)\nprint(state["players"][0]["name"])\nprint(state["paused"], state["winner"])',
          "Ada\nFalse None\n",
          [
            "Which access selects a list item, and which selects a named field?",
            "Welke toegang kiest een lijstitem en welke een benoemd veld?",
          ],
        ),
        exampleFiles: {
          "example.json":
            '{"players":[{"name":"Ada"}],"paused":false,"winner":null}',
        },
      },
    ],
    starter: files(
      'import json\n\ndef load_state(filename):\n    return {}\n\ndef player_names(state):\n    return []\n\nstate = load_state("state.json")\nprint(player_names(state))\n',
      {
        "state.json":
          '{"players":[{"name":"Ada","score":2},{"name":"Bo","score":0}],"paused":false,"winner":null}',
      },
    ),
    solution: files(
      'import json\n\ndef load_state(filename):\n    with open(filename, encoding="utf-8") as handle:\n        return json.load(handle)\n\ndef player_names(state):\n    return [player["name"] for player in state.get("players", [])]\n\nstate = load_state("state.json")\nprint(player_names(state))\n',
      {
        "state.json":
          '{"players":[{"name":"Ada","score":2},{"name":"Bo","score":0}],"paused":false,"winner":null}',
      },
    ),
    tasks: [
      C(
        "json-load",
        [
          "Load and return the full JSON document from filename, preserving its decoded values.",
          "Laad en geef het volledige JSON-document uit filename terug en behoud de gedecodeerde waarden.",
        ],
        'state["paused"] is False and state["winner"] is None',
        [
          [
            "Use json.load on an open text handle.",
            "Gebruik json.load op een geopende teksthandle.",
          ],
          [
            "Do not evaluate JSON as Python source.",
            "Voer JSON niet uit als Python-code.",
          ],
          ["return json.load(handle)", "return json.load(handle)"],
        ],
        [
          "JSON booleans and null become Python values, not strings.",
          "JSON-booleans en null worden Python-waarden, geen strings.",
        ],
        [
          F(
            "load_state",
            ["other.json"],
            '_return == {"enabled":True,"values":[1,2],"empty":None}',
            {
              files: {
                "other.json": '{"enabled":true,"values":[1,2],"empty":null}',
              },
            },
          ),
        ],
      ),
      C(
        "nested-data",
        [
          "Return player names in order; a missing or empty players list gives []. Assume listed players have name fields.",
          "Geef spelersnamen op volgorde terug; een ontbrekende of lege players-lijst geeft []. Neem aan dat genoemde spelers name-velden hebben.",
        ],
        'player_names(state) == ["Ada","Bo"]',
        [
          [
            "The outer dictionary contains a list of inner dictionaries.",
            "De buitenste dictionary bevat een lijst binnenste dictionaries.",
          ],
          [
            'Iterate state.get("players", []).',
            'Doorloop state.get("players", []).',
          ],
          ['player["name"]', 'player["name"]'],
        ],
        [
          "Do not try to read a name directly from the players list.",
          "Probeer een naam niet rechtstreeks uit de players-lijst te lezen.",
        ],
        [
          F("player_names", [{}], "_return == []"),
          F(
            "player_names",
            [{ players: [{ name: "Zoë" }] }],
            '_return == ["Zoë"]',
          ),
        ],
      ),
    ],
    note: [
      "The decoder builds the nested Python structures. The second function processes those structures without needing to know how the file was read.",
      "De decoder maakt de geneste Python-structuren. De tweede functie verwerkt die structuren zonder te hoeven weten hoe het bestand is gelezen.",
    ],
    experiment: [
      "Add a third player in state.json, Run and inspect the result. Temporarily remove a comma to read the JSONDecodeError, then repair the file.",
      "Voeg een derde speler toe in state.json, voer uit en bekijk het resultaat. Verwijder tijdelijk een komma om JSONDecodeError te lezen en herstel daarna het bestand.",
    ],
  }),
  lesson(14, 5, {
    explanation: [
      "Save and reload settings using a JSON round trip. Keep only JSON-compatible data: strings, numbers, booleans, None, lists and dictionaries with string keys.",
      "Bewaar en herlaad instellingen via JSON heen en terug. Gebruik alleen JSON-geschikte gegevens: strings, getallen, booleans, None, lijsten en dictionaries met stringsleutels.",
    ],
    sections: [
      S(
        "json-dump round-trips",
        ["Check by loading again", "Controleer door opnieuw te laden"],
        [
          "For JSON held in a string, json.loads(text) decodes it and json.dumps(value) returns JSON text. The final s means string; file handles use load/dump instead. json.dump(value, handle) writes one JSON document; indent=2 makes it readable and ensure_ascii=False keeps non-ASCII text visible in UTF-8. Do not append independent JSON documents to one file: that is no longer one valid document. A round trip may change unsupported assumptions: tuples become lists and non-string object keys are converted, so choose a clear JSON-shaped model.",
          "Voor JSON in een string decodeert json.loads(tekst) de tekst en geeft json.dumps(waarde) JSON-tekst terug. De laatste s betekent string; bestandshandles gebruiken load/dump. json.dump(waarde, handle) schrijft één JSON-document; indent=2 maakt het leesbaar en ensure_ascii=False houdt niet-ASCII-tekst zichtbaar in UTF-8. Voeg geen onafhankelijke JSON-documenten achter elkaar toe: dat is niet meer één geldig document. Heen-en-terug lezen kan ongeldige aannames veranderen: tuples worden lijsten en niet-stringobjectsleutels worden omgezet, dus kies een duidelijk JSON-geschikt model.",
        ],
        'import json\nsettings = {"name": "Zoë", "sound": False}\nwith open("example.json", "w", encoding="utf-8") as handle:\n    json.dump(settings, handle, ensure_ascii=False, indent=2)\nwith open("example.json", encoding="utf-8") as handle:\n    restored = json.load(handle)\nprint(restored == settings)',
        "True\n",
        [
          "Why is appending a second object different from saving a list of objects?",
          "Waarom verschilt een tweede object toevoegen van een lijst objecten bewaren?",
        ],
      ),
    ],
    starter: files(
      'import json\n\ndef save_settings(filename, settings):\n    pass\n\ndef load_settings(filename):\n    return {}\n\nsave_settings("settings.json", {"name": "Zoë", "sound": False, "scores": [2, 3]})\nprint(load_settings("settings.json"))\n',
    ),
    solution: files(
      'import json\n\ndef save_settings(filename, settings):\n    with open(filename, "w", encoding="utf-8") as handle:\n        json.dump(settings, handle, ensure_ascii=False, indent=2)\n\ndef load_settings(filename):\n    try:\n        with open(filename, encoding="utf-8") as handle:\n            return json.load(handle)\n    except FileNotFoundError:\n        return {}\n\nsave_settings("settings.json", {"name": "Zoë", "sound": False, "scores": [2, 3]})\nprint(load_settings("settings.json"))\n',
    ),
    tasks: [
      C(
        "json-dump",
        [
          "Save settings as one UTF-8 JSON document, replacing old contents. Keep Unicode readable.",
          "Bewaar settings als één UTF-8-JSON-document en vervang oude inhoud. Houd Unicode leesbaar.",
        ],
        `${loadJson("settings.json")} == {"name":"Zoë","sound":False,"scores":[2,3]}`,
        [
          [
            "Use the JSON encoder for the structure.",
            "Gebruik de JSON-encoder voor de structuur.",
          ],
          [
            "Open with w and use ensure_ascii=False.",
            "Open met w en gebruik ensure_ascii=False.",
          ],
          [
            "json.dump(settings, handle, ensure_ascii=False, indent=2)",
            "json.dump(settings, handle, ensure_ascii=False, indent=2)",
          ],
        ],
        [
          "Writing str(settings) produces Python text, not reliable JSON.",
          "str(settings) schrijven maakt Python-tekst, geen betrouwbare JSON.",
        ],
        [
          F(
            "save_settings",
            ["probe.json", { name: "Éva", value: null }],
            `${loadJson("probe.json")} == {"name":"Éva","value":None} and "Éva" in ${readText("probe.json")}`,
            { files: { "probe.json": '{"old": true}' } },
          ),
        ],
      ),
      C(
        "round-trips",
        [
          "Reload saved settings unchanged. Return {} only if the file is missing; leave malformed JSON visible as JSONDecodeError.",
          "Herlaad opgeslagen instellingen ongewijzigd. Geef alleen {} als het bestand ontbreekt; laat ongeldige JSON zichtbaar als JSONDecodeError.",
        ],
        'load_settings("settings.json") == {"name":"Zoë","sound":False,"scores":[2,3]}',
        [
          [
            "Missing and damaged files are different situations.",
            "Ontbrekende en beschadigde bestanden zijn verschillende situaties.",
          ],
          [
            "Catch only FileNotFoundError in this loader.",
            "Vang alleen FileNotFoundError in deze lezer op.",
          ],
          ["return json.load(handle)", "return json.load(handle)"],
        ],
        [
          "Do not silently treat damaged saved settings as an empty dictionary.",
          "Behandel beschadigde opgeslagen instellingen niet stilzwijgend als een lege dictionary.",
        ],
        [
          F(
            "load_settings",
            ["missing.json"],
            "_return == {} and _error is None",
          ),
          F("load_settings", ["bad.json"], '_error == "JSONDecodeError"', {
            files: { "bad.json": "{broken" },
          }),
        ],
      ),
    ],
    note: [
      "The writer replaces a complete document and the reader validates its JSON syntax. The missing-file fallback does not hide damage to an existing file.",
      "De schrijver vervangt een volledig document en de lezer controleert zijn JSON-syntax. De terugval voor een ontbrekend bestand verbergt geen schade aan een bestaand bestand.",
    ],
    experiment: [
      "Save a nested list of records, reopen the generated file tab and reload it. Compare the restored Python value, not just the raw formatting.",
      "Bewaar een geneste lijst records, open het gegenereerde bestandstabblad en herlaad die. Vergelijk de herstelde Python-waarde, niet alleen de ruwe opmaak.",
    ],
  }),
  lesson(14, 6, {
    explanation: [
      "Transform a CSV of team point changes into a JSON report. Normalise team names with strip and lower. Add valid integer points by team; count rows with a blank team or invalid/missing points as rejected exactly once.",
      "Transformeer een CSV met puntenwijzigingen per team tot een JSON-rapport. Normaliseer teamnamen met strip en lower. Tel geldige gehele punten per team op; tel rijen met leeg team of ongeldige/ontbrekende punten precies één keer als afgewezen.",
    ],
    sections: [
      S(
        "structured-files-review",
        ["Parse, validate, aggregate, save", "Lees, valideer, tel op, bewaar"],
        [
          'Use the CSV parser for fields, a specific conversion check for points, a dictionary for totals and the JSON writer for the report. The output is {"totals": {...}, "rejected": number}. Negative and zero points are valid. Return the same report that you save, and preserve the CSV source.',
          'Gebruik de CSV-parser voor velden, een specifieke omzettingscontrole voor punten, een dictionary voor totalen en de JSON-schrijver voor het rapport. De uitvoer is {"totals": {...}, "rejected": aantal}. Negatieve en nulpunten zijn geldig. Geef hetzelfde rapport terug dat je bewaart en behoud de CSV-bron.',
        ],
        'totals = {}\nteam, points = "blue", 3\ntotals[team] = totals.get(team, 0) + points\nprint({"totals": totals, "rejected": 0})',
        "{'totals': {'blue': 3}, 'rejected': 0}\n",
        [
          "Which parts of the final task concern file syntax, and which concern domain rules?",
          "Welke delen van de eindtaak gaan over bestandssyntax en welke over inhoudelijke regels?",
        ],
      ),
    ],
    starter: files(
      'import csv\nimport json\n\ndef summarise_file(source, target):\n    return {}\n\nprint(summarise_file("points.csv", "summary.json"))\n',
      { "points.csv": "team,points\n Red ,3\nblue,2\nred,-1\nblue,bad\n,4\n" },
    ),
    solution: files(
      'import csv\nimport json\n\ndef summarise_file(source, target):\n    totals = {}\n    rejected = 0\n    with open(source, newline="", encoding="utf-8") as handle:\n        for row in csv.DictReader(handle):\n            team = (row.get("team") or "").strip().lower()\n            try:\n                points = int(row.get("points") or "")\n            except ValueError:\n                rejected += 1\n                continue\n            if team == "":\n                rejected += 1\n                continue\n            totals[team] = totals.get(team, 0) + points\n    report = {"totals": totals, "rejected": rejected}\n    with open(target, "w", encoding="utf-8") as handle:\n        json.dump(report, handle, ensure_ascii=False, indent=2)\n    return report\n\nprint(summarise_file("points.csv", "summary.json"))\n',
      { "points.csv": "team,points\n Red ,3\nblue,2\nred,-1\nblue,bad\n,4\n" },
    ),
    tasks: [
      C(
        "structured-files-review",
        [
          "Aggregate normalised teams and count invalid rows once. Return a report with totals and rejected.",
          "Tel genormaliseerde teams op en tel ongeldige rijen één keer. Geef een rapport met totals en rejected terug.",
        ],
        `${loadJson("summary.json")} == {"totals":{"red":2,"blue":2},"rejected":2}`,
        [
          [
            "Separate field parsing from validation and accumulation.",
            "Scheid velden lezen van validatie en optellen.",
          ],
          [
            "A rejected row must continue before it updates totals.",
            "Een afgewezen rij moet met continue doorgaan vóór die totals bijwerkt.",
          ],
          [
            "totals[team] = totals.get(team, 0) + points",
            "totals[team] = totals.get(team, 0) + points",
          ],
        ],
        [
          "Normalise before grouping and do not count the same bad row twice.",
          "Normaliseer vóór groeperen en tel dezelfde slechte rij niet twee keer.",
        ],
        [
          F(
            "summarise_file",
            ["case.csv", "out.json"],
            '_return == {"totals":{"a":0},"rejected":3}',
            { files: { "case.csv": "team,points\nA,0\n,bad\nB,2.5\nC,\n" } },
          ),
        ],
      ),
      C(
        "structured-files-review",
        [
          "Save the returned report as JSON without changing source. A header-only CSV gives empty totals and zero rejected.",
          "Bewaar het teruggegeven rapport als JSON zonder source te wijzigen. Een CSV met alleen kop geeft lege totalen en nul afgewezen.",
        ],
        `${readText("points.csv")} == "team,points\n Red ,3\nblue,2\nred,-1\nblue,bad\n,4\n"`,
        [
          [
            "The in-memory result and saved result must agree.",
            "Het resultaat in het geheugen en het opgeslagen resultaat moeten overeenkomen.",
          ],
          [
            "Use json.dump with a separate target file.",
            "Gebruik json.dump met een apart doelbestand.",
          ],
          [
            "json.dump(report, handle, ensure_ascii=False, indent=2)",
            "json.dump(report, handle, ensure_ascii=False, indent=2)",
          ],
        ],
        [
          "Inspect the generated JSON as well as the printed dictionary.",
          "Bekijk de gegenereerde JSON én de afgedrukte dictionary.",
        ],
        [
          F(
            "summarise_file",
            ["empty.csv", "out.json"],
            `_return == {"totals":{},"rejected":0} and ${loadJson("out.json")} == _return and ${readText("empty.csv")} == "team,points\n"`,
            { files: { "empty.csv": "team,points\n" } },
          ),
          F(
            "summarise_file",
            ["quoted.csv", "out.json"],
            `${loadJson("out.json")} == {"totals":{"a, b":3},"rejected":0}`,
            { files: { "quoted.csv": 'team,points\n"A, B",3\n' } },
          ),
        ],
      ),
    ],
    note: [
      "Each stage has one role, making failures easier to locate. One continue per rejected path ensures a row cannot both count as rejected and affect team totals.",
      "Elke stap heeft één rol, waardoor fouten makkelijker te vinden zijn. Eén continue per afgewezen route zorgt dat een rij niet zowel afgewezen kan tellen als teamtotalen beïnvloeden.",
    ],
    experiment: [
      "Add a quoted team containing a comma, a missing score and an exact duplicate team in different case. Predict totals and rejected before running.",
      "Voeg een aangehaald team met komma, een ontbrekende score en een gelijk team in andere hoofdletters toe. Voorspel totals en rejected voordat je uitvoert.",
    ],
  }),
];
