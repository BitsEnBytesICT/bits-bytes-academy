// The approved authoring contract. Topics are distinct; repeated syllabus headings
// become retrieval, not duplicate lessons. Each row is one required coding task.
export const syllabus = [
  {
    title: ["First useful programs", "Eerste nuttige programma’s"],
    minutes: 70,
    outcome: [
      "Write, run and explain a short program with text and arithmetic.",
      "Schrijf, voer uit en verklaar een kort programma met tekst en berekeningen.",
    ],
    lessons: [
      [
        "An announcement",
        "Een aankondiging",
        "welcome comments print strings variables",
      ],
      ["A receipt", "Een kassabon", "integers floats arithmetic precedence"],
      [
        "Changing stock",
        "Veranderende voorraad",
        "changing-numbers plus-equals",
      ],
      [
        "Powers and leftovers",
        "Machten en restanten",
        "exponents floor-division modulo",
      ],
      [
        "A small report",
        "Een klein rapport",
        "concatenation multiline-strings errors",
      ],
    ],
  },
  {
    title: ["Input and decisions", "Invoer en beslissingen"],
    minutes: 80,
    outcome: [
      "Read input and choose actions using comparisons and Boolean rules.",
      "Lees invoer en kies acties met vergelijkingen en booleaanse regels.",
    ],
    lessons: [
      [
        "Personalise a report",
        "Maak een persoonlijk rapport",
        "input conversion f-strings",
      ],
      [
        "At the boundary",
        "Op de grens",
        "boolean-expressions boolean-variables relational-operators",
      ],
      ["Choose an action", "Kies een actie", "if else indentation"],
      ["Combine the rules", "Combineer de regels", "and or not"],
      ["A small menu", "Een klein menu", "elif"],
    ],
  },
  {
    title: ["Repetition", "Herhaling"],
    minutes: 80,
    outcome: [
      "Control repetition and explain how a loop terminates.",
      "Beheers herhaling en leg uit hoe een lus eindigt.",
    ],
    lessons: [
      ["Replace repetition", "Vervang herhaling", "why-loops for"],
      [
        "Count in steps",
        "Tel in stappen",
        "range-start-stop-step accumulators",
      ],
      ["Keep a menu running", "Laat een menu doorlopen", "while counters"],
      [
        "Repair an exit",
        "Repareer het stoppen",
        "infinite-loops break continue",
      ],
      ["Summarise a session", "Vat een sessie samen", "loop-review"],
    ],
  },
  {
    title: ["Reusable functions", "Herbruikbare functies"],
    minutes: 85,
    outcome: [
      "Design a function with a clear input, return value and local state.",
      "Ontwerp een functie met duidelijke invoer, een terugkeerwaarde en lokale toestand.",
    ],
    lessons: [
      [
        "Extract a behaviour",
        "Maak gedrag herbruikbaar",
        "why-functions defining-functions calling-functions execution-flow builtins-vs-user-functions",
      ],
      [
        "Return a result",
        "Geef een resultaat terug",
        "return none parameters multiple-parameters",
      ],
      [
        "Remove a hidden dependency",
        "Verwijder een verborgen afhankelijkheid",
        "local-scope",
      ],
      [
        "Defaults and named arguments",
        "Standaarden en benoemde argumenten",
        "positional-arguments keyword-arguments default-arguments early-return",
      ],
      [
        "A reusable calculation",
        "Een herbruikbare berekening",
        "function-review",
      ],
    ],
  },
  {
    title: ["Lists, tuples, and state", "Lijsten, tuples en toestand"],
    minutes: 80,
    outcome: [
      "Store changing collections and unpack coordinates or returned pairs.",
      "Bewaar veranderende verzamelingen en pak coördinaten of teruggegeven paren uit.",
    ],
    lessons: [
      [
        "Keep a history",
        "Houd een geschiedenis bij",
        "lists mixed-lists empty-lists list-methods append list-concatenation",
      ],
      [
        "Inspect and change positions",
        "Bekijk en wijzig posities",
        "indexing negative-indexing list-mutation len aliasing copying",
      ],
      [
        "Two ways to iterate",
        "Twee manieren om te doorlopen",
        "list-for list-while",
      ],
      [
        "Coordinates and pairs",
        "Coördinaten en paren",
        "tuples unpacking multiple-returns",
      ],
      ["Process a recording", "Verwerk een opname", "list-review"],
    ],
  },
  {
    title: [
      "Libraries and your own modules",
      "Bibliotheken en je eigen modules",
    ],
    minutes: 75,
    outcome: [
      "Import documented tools and split a program into reusable files.",
      "Importeer gedocumenteerde hulpmiddelen en verdeel een programma over herbruikbare bestanden.",
    ],
    lessons: [
      [
        "Use a library",
        "Gebruik een bibliotheek",
        "imports from-import aliases documentation install-vs-import",
      ],
      [
        "Repeat a random experiment",
        "Herhaal een willekeurig experiment",
        "random random-seed",
      ],
      ["Exact decimal amounts", "Exacte decimale bedragen", "decimal"],
      [
        "Create a helper module",
        "Maak een hulpmodule",
        "local-modules module-scope",
      ],
      ["Connect two files", "Verbind twee bestanden", "module-review"],
    ],
  },
  {
    title: ["Scenes and events", "Scènes en gebeurtenissen"],
    minutes: 75,
    outcome: [
      "Draw an interactive court using supplied browser loop code.",
      "Teken een interactief speelveld met de meegeleverde browserlus.",
    ],
    lessons: [
      [
        "Inspect a rectangle",
        "Bekijk een rechthoek",
        "pygame-objects attributes rect coordinates",
      ],
      ["Draw a scene", "Teken een scène", "surface colours drawing-order"],
      [
        "Respond to events",
        "Reageer op gebeurtenissen",
        "events close-event key-events browser-loop",
      ],
      ["An interactive court", "Een interactief speelveld", "scene-review"],
    ],
  },
  {
    title: ["Movement and a first rally", "Beweging en een eerste rally"],
    minutes: 90,
    outcome: [
      "Control two paddles and combine movement, contact and a reset.",
      "Bestuur twee batjes en combineer beweging, contact en een herstart.",
    ],
    lessons: [
      ["Movement over time", "Bewegen in de tijd", "velocity elapsed-time"],
      [
        "Hold a control",
        "Houd een toets ingedrukt",
        "held-keys simultaneous-controls",
      ],
      ["Stay inside the court", "Blijf binnen het veld", "boundaries"],
      [
        "Repair a repeated bounce",
        "Repareer een herhaalde botsing",
        "wall-bounce paddle-contact",
      ],
      ["A playable rally", "Een speelbare rally", "miss-reset rally-review"],
    ],
  },
  {
    title: ["Working with collections", "Werken met verzamelingen"],
    minutes: 100,
    outcome: [
      "Reshape collections without confusing mutation, copying and selection.",
      "Bewerk verzamelingen en onderscheid wijzigen, kopiëren en selecteren.",
    ],
    lessons: [
      ["Maintain a queue", "Beheer een wachtrij", "insert remove pop count"],
      [
        "Extract a slice",
        "Haal een deel eruit",
        "slicing omitted-slice-bounds range-as-sequence",
      ],
      [
        "Keep the original order",
        "Behoud de oorspronkelijke volgorde",
        "sort sorted",
      ],
      [
        "Update a small grid",
        "Werk een klein raster bij",
        "2d-lists 2d-access 2d-mutation nested-loops",
      ],
      [
        "Translate a loop",
        "Vertaal een lus",
        "list-comprehensions conditional-comprehensions",
      ],
      [
        "Report from unfamiliar data",
        "Rapporteer over nieuwe gegevens",
        "collections-review",
      ],
    ],
  },
  {
    title: ["Text as data", "Tekst als gegevens"],
    minutes: 95,
    outcome: [
      "Inspect, clean, split and format text while respecting immutability.",
      "Bekijk, schoon op, splits en formatteer tekst met aandacht voor onveranderlijkheid.",
    ],
    lessons: [
      [
        "Inspect identifiers",
        "Bekijk identificatiecodes",
        "string-indexing string-slicing string-length string-negative-indices",
      ],
      [
        "Repair text without mutation",
        "Repareer tekst zonder mutatie",
        "string-immutability escapes string-concatenation",
      ],
      [
        "Normalise names",
        "Normaliseer namen",
        "case-methods strip string-iteration string-membership",
      ],
      [
        "Split and reconstruct",
        "Splits en bouw opnieuw op",
        "split-whitespace split-delimiter split-newlines split-tabs join",
      ],
      [
        "Search and format",
        "Zoek en formatteer",
        "replace find format-positional format-named",
      ],
      ["Clean a text dataset", "Schoon een tekstbestand op", "strings-review"],
    ],
  },
  {
    title: ["Reliable input and recovery", "Betrouwbare invoer en herstel"],
    minutes: 85,
    outcome: [
      "Diagnose errors and recover from invalid input without hiding other failures.",
      "Diagnosticeer fouten en herstel van ongeldige invoer zonder andere fouten te verbergen.",
    ],
    lessons: [
      [
        "Read a failure",
        "Lees een foutmelding",
        "tracebacks syntax-errors runtime-errors logic-errors",
      ],
      [
        "Handle conversion failure",
        "Vang conversiefouten op",
        "value-error try-except zero-division-error",
      ],
      ["Parse, then validate", "Lees in en valideer", "validation"],
      [
        "Repair a retry conversation",
        "Repareer een herhaalgesprek",
        "retry cancel end-of-input",
      ],
      [
        "A reliable input helper",
        "Een betrouwbare invoerhulp",
        "recovery-review",
      ],
    ],
  },
  {
    title: ["Dictionaries and records", "Dictionaries en records"],
    minutes: 95,
    outcome: [
      "Model named records and process missing or changing information.",
      "Modelleer records met benoemde velden en verwerk ontbrekende of veranderende informatie.",
    ],
    lessons: [
      [
        "Model a record",
        "Modelleer een record",
        "dictionaries empty-dictionaries valid-keys invalid-keys",
      ],
      ["Update fields", "Werk velden bij", "add-key update overwrite"],
      [
        "Handle missing information",
        "Verwerk ontbrekende informatie",
        "get-key key-error get delete-key dict-pop",
      ],
      [
        "Iterate over records",
        "Doorloop records",
        "keys values items dictionary-iteration",
      ],
      ["Derive a mapping", "Leid een mapping af", "dictionary-comprehensions"],
      ["Maintain a registry", "Beheer een register", "dictionary-review"],
    ],
  },
  {
    title: ["Text files", "Tekstbestanden"],
    minutes: 70,
    outcome: [
      "Read and create inspectable UTF-8 files in the browser workspace.",
      "Lees en maak controleerbare UTF-8-bestanden in de browserwerkruimte.",
    ],
    lessons: [
      [
        "Read a supplied file",
        "Lees een meegeleverd bestand",
        "with read utf-8 browser-filesystem",
      ],
      [
        "Read a header and lines",
        "Lees een kop en regels",
        "line-iteration readline file-position",
      ],
      [
        "Overwrite or append",
        "Overschrijven of toevoegen",
        "write append-file persistence missing-file",
      ],
      ["Generate a report", "Maak een rapport", "files-review"],
    ],
  },
  {
    title: ["CSV and JSON", "CSV en JSON"],
    minutes: 100,
    outcome: [
      "Read, transform and save structured records with the right parser.",
      "Lees, verander en bewaar gestructureerde records met de juiste parser.",
    ],
    lessons: [
      [
        "Read CSV records",
        "Lees CSV-records",
        "csv-structure csv-reader csv-dictreader csv-conversion",
      ],
      [
        "Quoted fields and delimiters",
        "Velden met aanhalingstekens en scheidingstekens",
        "csv-quoting csv-delimiters",
      ],
      ["Export CSV", "Exporteer CSV", "csv-writer"],
      ["Inspect JSON", "Bekijk JSON", "json-load nested-data"],
      ["Save JSON", "Bewaar JSON", "json-dump round-trips"],
      [
        "Transform a dataset",
        "Transformeer een dataset",
        "structured-files-review",
      ],
    ],
  },
  {
    title: ["Classes and objects", "Klassen en objecten"],
    minutes: 110,
    outcome: [
      "Group state and behaviour while keeping instances independent.",
      "Groepeer toestand en gedrag en houd instanties onafhankelijk.",
    ],
    lessons: [
      [
        "Inspect familiar objects",
        "Bekijk bekende objecten",
        "types everything-is-object functions-as-objects",
      ],
      [
        "Initialise a class",
        "Initialiseer een klasse",
        "class instantiation oop constructors self instance-variables",
      ],
      ["Add behaviour", "Voeg gedrag toe", "methods method-arguments"],
      [
        "Repair shared state",
        "Repareer gedeelde toestand",
        "class-variables independent-instances",
      ],
      [
        "Inspect and represent",
        "Bekijk en presenteer",
        "hasattr getattr dir repr str",
      ],
      ["A stateful class", "Een klasse met toestand", "classes-review"],
    ],
  },
  {
    title: ["A complete Pong match", "Een complete Pong-wedstrijd"],
    minutes: 100,
    outcome: [
      "Build a predictable match with clear responsibilities and testable rules.",
      "Bouw een voorspelbare wedstrijd met duidelijke verantwoordelijkheden en testbare regels.",
    ],
    lessons: [
      [
        "Trace match transitions",
        "Volg wedstrijdtoestanden",
        "game-state serving winning restarting",
      ],
      ["Score exactly once", "Tel een punt precies één keer", "scoring-once"],
      [
        "Separate responsibilities",
        "Verdeel verantwoordelijkheden",
        "game-classes collision-correction",
      ],
      [
        "Connect a saved setting",
        "Gebruik een opgeslagen instelling",
        "game-persistence",
      ],
      [
        "Extend an existing game",
        "Breid een bestaand spel uit",
        "playtesting game-review",
      ],
    ],
  },
];

export const lessonId = (chapter, number) =>
  `python-v3-${chapter}-${String(number).padStart(2, "0")}`;
export const plannedTopics = syllabus.flatMap((module, index) =>
  module.lessons.flatMap((row, i) =>
    row[2].split(" ").map((id) => ({
      id,
      introduction: lessonId(index + 1, i + 1),
      prerequisites: i
        ? [lessonId(index + 1, i)]
        : index
          ? [lessonId(index, syllabus[index - 1].lessons.length)]
          : [],
    })),
  ),
);
if (new Set(plannedTopics.map((t) => t.id)).size !== plannedTopics.length)
  throw Error("Duplicate topic in syllabus");
if (syllabus.reduce((n, m) => n + m.lessons.length, 0) !== 83)
  throw Error("Expected 83 coding activities");
