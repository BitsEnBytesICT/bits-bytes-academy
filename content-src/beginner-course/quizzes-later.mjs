import { P, B, Q } from "./quiz-authoring.mjs";
const R = (en, nl, why, nlWhy) => [
  [en, nl],
  [why, nlWhy],
];
const D = (topic, code, answers) =>
  Q(
    topic,
    "debugging",
    [
      "Choose the repair or test that addresses the stated problem.",
      "Kies de reparatie of test die het beschreven probleem aanpakt.",
    ],
    code,
    answers,
  );
const A = (topic, code, answers) =>
  Q(
    topic,
    "application",
    [
      "Which explanation applies to this example?",
      "Welke uitleg past bij dit voorbeeld?",
    ],
    code,
    answers,
  );
export const specs = [
  (alt) => {
    const n = alt ? 7 : 4;
    return {
      p: P(
        "packing-unpacking",
        `point = (${n},2)\nx,y = point\nprint(y,x)`,
        [`2 ${n}`, `${n} 2`, `(${n}, 2)`],
        [
          [
            "The print reverses the order of the named values.",
            "De print keert de volgorde van de benoemde waarden om.",
          ],
          ["The caller prints y first.", "De aanroeper drukt y eerst af."],
          [
            "It prints two arguments rather than the tuple object.",
            "Het drukt twee argumenten af in plaats van het tupleobject.",
          ],
        ],
      ),
      b: B(
        "multiple-returns",
        `def pair():\n    return ${n},2\nx, y = ___\nprint(x + y)`,
        "pair()",
        ["pair", "2"],
        [
          "Call the function, then unpack its returned tuple.",
          "Roep de functie aan en pak daarna de teruggegeven tuple uit.",
        ],
        `${n + 2}\n`,
      ),
      debug: D("packing-unpacking", `x,y = (${n},2,3)`, [
        R(
          "Use three target names for three values.",
          "Gebruik drie doelnamen voor drie waarden.",
          "Ordinary unpacking requires matching counts.",
          "Gewoon uitpakken vereist gelijke aantallen.",
        ),
        R(
          "Remove the commas between values.",
          "Verwijder de komma’s tussen waarden.",
          "That removes the tuple syntax instead of matching its shape.",
          "Dat verwijdert tuplesyntax in plaats van bij de vorm te passen.",
        ),
        R(
          "Run it a second time.",
          "Voer nogmaals uit.",
          "The mismatch is structural and repeats.",
          "Het verschil is structureel en herhaalt zich.",
        ),
      ]),
      app: A("tuples", `point = (${n},2)`, [
        R(
          "The tuple is ordered and cannot have an element reassigned.",
          "De tuple is geordend en een element kan niet opnieuw worden toegewezen.",
          "Tuple immutability differs from list mutation.",
          "Onveranderbaarheid van tuples verschilt van lijstwijziging.",
        ),
        R(
          "The first index is one.",
          "De eerste index is één.",
          "Tuples also start indexing at zero.",
          "Tuples beginnen ook bij index nul.",
        ),
        R(
          "A tuple is always exactly two values.",
          "Een tuple heeft altijd precies twee waarden.",
          "Tuples can have other lengths.",
          "Tuples kunnen andere lengten hebben.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 17 : 12;
    return {
      p: P(
        "random-seed",
        `import random\nrandom.seed(${n})\nfirst = random.random()\nrandom.seed(${n})\nprint(first == random.random())`,
        ["True", "False", String(n)],
        [
          [
            "The seed and call sequence repeat.",
            "De seed en aanroepreeks worden herhaald.",
          ],
          [
            "Resetting the same generator state reproduces the draw.",
            "Dezelfde generatortoestand herstellen reproduceert de trekking.",
          ],
          [
            "The seed is not the random output.",
            "De seed is niet de willekeurige uitvoer.",
          ],
        ],
      ),
      b: B(
        "decimal",
        `from decimal import Decimal\nprint(Decimal(___) + Decimal("${alt ? "0.4" : "0.2"}"))`,
        alt ? '"0.2"' : '"0.1"',
        [alt ? "0.2" : "0.1", "1"],
        [
          "A string preserves the written decimal exactly; a float may already be approximate.",
          "Een string bewaart de geschreven decimaal exact; een float kan al benaderd zijn.",
        ],
        alt ? "0.6\n" : "0.3\n",
      ),
      debug: D("aliases", `import math as m\nprint(math.sqrt(${n * n}))`, [
        R(
          "Use m.sqrt with the chosen alias.",
          "Gebruik m.sqrt met de gekozen alias.",
          "The local module name is m.",
          "De lokale modulenaam is m.",
        ),
        R(
          "Install math with pip.",
          "Installeer math met pip.",
          "math is in the standard library; the issue is its local name.",
          "math zit in de standaardbibliotheek; het probleem is de lokale naam.",
        ),
        R(
          "Put the call in quotes.",
          "Zet de aanroep tussen aanhalingstekens.",
          "That prints code text instead of computing.",
          "Dat drukt codetekst af in plaats van te rekenen.",
        ),
      ]),
      app: A("installing", `import ${alt ? "csv" : "random"}`, [
        R(
          "Import makes an available module usable in this file.",
          "Import maakt een beschikbare module bruikbaar in dit bestand.",
          "It does not download a missing package.",
          "Het downloadt geen ontbrekend pakket.",
        ),
        R(
          "Import installs any missing package automatically.",
          "Import installeert elk ontbrekend pakket automatisch.",
          "Installation is a separate operation.",
          "Installeren is een aparte bewerking.",
        ),
        R(
          "Every module requires a pip install.",
          "Elke module vereist pip-installatie.",
          "Standard-library modules are included with Python.",
          "Standaardbibliotheekmodules zitten bij Python.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 30 : 20;
    return {
      p: P(
        "rect",
        `import pygame\nbox = pygame.Rect(10,${n},30,40)\nprint(box.right,box.bottom)`,
        [`40 ${n + 40}`, `30 40`, `10 ${n}`],
        [
          [
            "Edges combine the position and dimensions.",
            "Randen combineren positie en afmetingen.",
          ],
          [
            "Width and height are not right and bottom.",
            "Breedte en hoogte zijn niet rechterrand en onderkant.",
          ],
          [
            "Those are the top-left coordinates.",
            "Dat zijn de linkerbovencoördinaten.",
          ],
        ],
      ),
      b: B(
        "surface",
        `import pygame\nimage = pygame.Surface((10,10))\nimage.___((20,40,${alt ? 120 : 80}))\nprint(image.get_at((0,0))[2])`,
        "fill",
        ["print", "append"],
        [
          "fill paints the Surface; append belongs to lists.",
          "fill kleurt de Surface; append hoort bij lijsten.",
        ],
        `${alt ? 120 : 80}\n`,
      ),
      debug: D(
        "drawing-order",
        `# Paddle should be visible.\npygame.draw.rect(screen,(255,255,255),(20,${n},10,60))\nscreen.fill((0,0,0))`,
        [
          R(
            "Fill before drawing the paddle.",
            "Vul vóór het batje tekenen.",
            "The later fill currently covers the paddle.",
            "De latere fill bedekt nu het batje.",
          ),
          R(
            "Make the paddle colour black.",
            "Maak het batje zwart.",
            "That makes it blend into the background.",
            "Daardoor valt het samen met de achtergrond.",
          ),
          R(
            "Call fill twice afterward.",
            "Roep fill daarna tweemaal aan.",
            "More background painting still covers it.",
            "Meer achtergrond tekenen blijft het bedekken.",
          ),
        ],
      ),
      app: A(
        "events",
        `if event.type == pygame.KEYDOWN:\n    print(event.key) # ${n}`,
        [
          R(
            "The type check ensures this is a keyboard event before reading key.",
            "De typecontrole zorgt dat dit een toetsenbordgebeurtenis is vóór key lezen.",
            "Not all events have a key attribute.",
            "Niet alle gebeurtenissen hebben een key-attribuut.",
          ),
          R(
            "Every event always has key.",
            "Elke gebeurtenis heeft altijd key.",
            "Window events can have different attributes.",
            "Venstergebeurtenissen kunnen andere attributen hebben.",
          ),
          R(
            "The check installs keyboard support.",
            "De controle installeert toetsenbordondersteuning.",
            "It selects an event branch; it installs nothing.",
            "Het kiest een gebeurtenistak en installeert niets.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 120 : 100;
    return {
      p: P(
        "elapsed-time",
        `x = 10\nx += ${n} * 0.5\nprint(x)`,
        [String(10 + n / 2) + ".0", String(10 + n), String(n / 2)],
        [
          [
            "Velocity times seconds gives this frame’s displacement.",
            "Snelheid maal seconden geeft de verplaatsing in dit beeld.",
          ],
          [
            "That would correspond to a full second.",
            "Dat komt overeen met een volle seconde.",
          ],
          [
            "The old position must also be added.",
            "De oude positie moet ook worden opgeteld.",
          ],
        ],
      ),
      b: B(
        "wall-collision",
        `y,vy = 3,-${n}\nif y <= 6 and ___:\n    y,vy = 6,-vy\nprint(vy)`,
        "vy < 0",
        ["vy > 0", "vy == 0"],
        [
          "Reverse only a velocity pointing into the top wall.",
          "Keer alleen een snelheid naar de bovenwand om.",
        ],
        `${n}\n`,
      ),
      debug: D(
        "scoring",
        `# Scores every frame while x stays outside.\nif x < -6:\n    right_score += 1 # speed ${n}`,
        [
          R(
            "Reset position and enter a waiting state in the same update.",
            "Herstel positie en ga in dezelfde update naar de wachttoestand.",
            "This removes the scoring condition before the next frame.",
            "Dit verwijdert de scorevoorwaarde vóór het volgende beeld.",
          ),
          R(
            "Make the score increment larger.",
            "Maak de scoreverhoging groter.",
            "The repeat-scoring cause remains.",
            "De oorzaak van herhaald scoren blijft.",
          ),
          R(
            "Hide the score text.",
            "Verberg de scoretekst.",
            "The data still increments even when invisible.",
            "De gegevens stijgen nog steeds wanneer ze onzichtbaar zijn.",
          ),
        ],
      ),
      app: A(
        "simultaneous-controls",
        `if keys[pygame.K_w]:\n    left_y -= ${n} * dt\nif keys[pygame.K_DOWN]:\n    right_y += ${n} * dt`,
        [
          R(
            "Both players can move in the same frame.",
            "Beide spelers kunnen in hetzelfde beeld bewegen.",
            "Independent checks allow both actions.",
            "Onafhankelijke controles laten beide acties toe.",
          ),
          R(
            "Only the first matching key can move.",
            "Alleen de eerste passende toets kan bewegen.",
            "That would require an alternative chain.",
            "Dat vereist een alternatievenketen.",
          ),
          R(
            "dt must always be one.",
            "dt moet altijd één zijn.",
            "dt measures the actual elapsed seconds.",
            "dt meet de werkelijk verstreken seconden.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 5 : 3;
    return {
      p: P(
        "sort",
        `values = [${n},1,2]\nresult = values.sort()\nprint(result)`,
        ["None", `[1, 2, ${n}]`, String(n)],
        [
          [
            "sort mutates and returns None.",
            "sort wijzigt en geeft None terug.",
          ],
          [
            "That sorted list is stored in values, not result.",
            "Die gesorteerde lijst staat in values, niet result.",
          ],
          [
            "sort does not return the first element.",
            "sort geeft niet het eerste element terug.",
          ],
        ],
      ),
      b: B(
        "conditional-list-comprehensions",
        `values = [-1,0,${n}]\nprint([x * 2 for x in values ___ x > 0])`,
        "if",
        ["else", "while"],
        [
          "The final if filters input elements.",
          "De laatste if filtert invoerelementen.",
        ],
        `[${n * 2}]\n`,
      ),
      debug: D(
        "pop",
        `values = [${n},2]\n# Need to remove and return the first element.\nresult = values.remove(0)`,
        [
          R(
            "Use values.pop(0).",
            "Gebruik values.pop(0).",
            "pop selects by index and returns the removed element.",
            "pop kiest op index en geeft het verwijderde element terug.",
          ),
          R(
            "Use values.remove(1).",
            "Gebruik values.remove(1).",
            "remove still selects by value and returns None.",
            "remove kiest nog steeds op waarde en geeft None.",
          ),
          R(
            "Use values[0] only.",
            "Gebruik alleen values[0].",
            "That reads but does not remove the element.",
            "Dat leest maar verwijdert het element niet.",
          ),
        ],
      ),
      app: A("aliasing", `grid = [[${n},2],[3,4]]\ncopy = grid.copy()`, [
        R(
          "The outer lists differ but their inner rows are shared.",
          "De buitenste lijsten verschillen maar hun binnenste rijen worden gedeeld.",
          "This is a shallow copy.",
          "Dit is een oppervlakkige kopie.",
        ),
        R(
          "Every nested row is automatically copied.",
          "Elke geneste rij wordt automatisch gekopieerd.",
          "Shallow copying does not duplicate inner mutable objects.",
          "Oppervlakkig kopiëren dupliceert binnenste veranderbare objecten niet.",
        ),
        R(
          "The copy has no elements.",
          "De kopie heeft geen elementen.",
          "copy preserves the element references.",
          "copy bewaart de elementverwijzingen.",
        ),
      ]),
    };
  },
  (alt) => {
    const word = alt ? "blue" : "red";
    return {
      p: P(
        "find",
        `text = "${word}-${word}"\nprint(text.find("${word}"))`,
        ["0", "1", "-1"],
        [
          [
            "The first match starts at index zero.",
            "De eerste overeenkomst begint op index nul.",
          ],
          ["Python indexes from zero.", "Python indexeert vanaf nul."],
          [
            "-1 means no match, but this text starts with the target.",
            "-1 betekent geen overeenkomst, maar deze tekst begint met het doel.",
          ],
        ],
      ),
      b: B(
        "join",
        `parts = ["${word}","sky"]\nprint("-".___(parts))`,
        "join",
        ["split", "append"],
        [
          "Call join on the separator to combine strings.",
          "Roep join aan op het scheidingsteken om strings samen te voegen.",
        ],
        `${word}-sky\n`,
      ),
      debug: D("immutability", `text = "${word}"\ntext[0] = "X"`, [
        R(
          'Build new text using "X" + text[1:].',
          'Maak nieuwe tekst met "X" + text[1:].',
          "Strings do not support indexed mutation.",
          "Strings ondersteunen geen indextoewijzing.",
        ),
        R(
          "Use text[-1] instead.",
          "Gebruik in plaats daarvan text[-1].",
          "Changing the index does not make strings mutable.",
          "Een andere index maakt strings niet veranderbaar.",
        ),
        R(
          "Call print before the assignment.",
          "Roep print vóór de toewijzing aan.",
          "Printing does not change the type’s capabilities.",
          "Afdrukken verandert de mogelijkheden van het type niet.",
        ),
      ]),
      app: A("split-delimiters", `parts = "${word},,sky".split(",")`, [
        R(
          "The empty middle field is preserved.",
          "Het lege middenveld blijft behouden.",
          "Explicit separators retain empty fields.",
          "Expliciete scheiding bewaart lege velden.",
        ),
        R(
          "All empty fields are automatically discarded.",
          "Alle lege velden verdwijnen automatisch.",
          "That confuses explicit-delimiter splitting with whitespace splitting.",
          "Dat verwart expliciet splitsen met witruimtesplitsing.",
        ),
        R(
          "The result is one unchanged string.",
          "Het resultaat is één onveranderde string.",
          "split returns a list of fields.",
          "split geeft een lijst velden terug.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 8 : 5;
    return {
      p: P(
        "get",
        `record = {"score":0}\nprint(record.get("score",${n}))`,
        ["0", String(n), "None"],
        [
          [
            "The present zero is preserved.",
            "De aanwezige nul blijft behouden.",
          ],
          [
            "The default is used only for a missing key.",
            "De standaard wordt alleen bij een ontbrekende sleutel gebruikt.",
          ],
          [
            "The score key is present with a numeric value.",
            "De score-sleutel bestaat met een numerieke waarde.",
          ],
        ],
      ),
      b: B(
        "dictionary-comprehensions",
        `values = [${n},2]\nresult = {x ___ x * 2 for x in values}\nprint(result[${n}])`,
        ":",
        ["=", ","],
        [
          "A dictionary entry separates key and value with a colon.",
          "Een dictionary-invoer scheidt sleutel en waarde met een dubbele punt.",
        ],
        `${n * 2}\n`,
      ),
      debug: D("invalid-keys", `record = {[${n},2]: "place"}`, [
        R(
          `Use a tuple (${n}, 2) as the coordinate key.`,
          `Gebruik een tuple (${n}, 2) als coördinaatsleutel.`,
          "A tuple of integers is hashable; a list is not.",
          "Een tuple gehele getallen is hashbaar; een lijst niet.",
        ),
        R(
          "Use an empty list instead.",
          "Gebruik in plaats daarvan een lege lijst.",
          "An empty list is still unhashable.",
          "Een lege lijst is nog steeds niet hashbaar.",
        ),
        R(
          "Change only the value to a number.",
          "Verander alleen de waarde naar een getal.",
          "The invalid key is the problem.",
          "De ongeldige sleutel is het probleem.",
        ),
      ]),
      app: A(
        "items",
        `for name, score in {"Ada":${n}}.items():\n    print(name,score)`,
        [
          R(
            "Each iteration unpacks a key/value pair.",
            "Elke iteratie pakt een sleutel/waarde-paar uit.",
            "items supplies both parts together.",
            "items levert beide delen samen.",
          ),
          R(
            "Both names receive dictionary keys.",
            "Beide namen ontvangen dictionarysleutels.",
            "The second part is the corresponding value.",
            "Het tweede deel is de bijbehorende waarde.",
          ),
          R(
            "The dictionary is deleted by iteration.",
            "De dictionary wordt door iteratie verwijderd.",
            "Reading entries does not delete them.",
            "Invoeren lezen verwijdert ze niet.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const word = alt ? "Top" : "Header";
    return {
      p: P(
        "file-position",
        `with open("quiz.txt","w",encoding="utf-8") as handle:\n    handle.write("${word}\\nBody")\nwith open("quiz.txt",encoding="utf-8") as handle:\n    header = handle.readline()\n    print(handle.read())`,
        ["Body", `${word}\nBody`, word],
        [
          [
            "readline consumed the header before read began.",
            "readline gebruikte de kop vóór read begon.",
          ],
          [
            "The handle does not rewind automatically.",
            "De handle gaat niet automatisch terug naar het begin.",
          ],
          [
            "The second read starts after the header.",
            "De tweede leesactie begint na de kop.",
          ],
        ],
      ),
      b: B(
        "write",
        `with open("quiz.txt",___,encoding="utf-8") as handle:\n    handle.write("${word}")\nwith open("quiz.txt",encoding="utf-8") as handle:\n    print(handle.read())`,
        '"w"',
        ['"r"', '"rb"'],
        [
          "w creates or replaces a file for writing.",
          "w maakt of vervangt een bestand om te schrijven.",
        ],
        `${word}\n`,
      ),
      debug: D(
        "append-files",
        `# Preserve older entries when adding ${word}.\nwith open("log.txt","w",encoding="utf-8") as handle:\n    handle.write("${word}\\n")`,
        [
          R(
            "Use mode a.",
            "Gebruik modus a.",
            "Append preserves previous entries.",
            "Toevoegen bewaart eerdere invoeren.",
          ),
          R(
            "Use read mode.",
            "Gebruik leesmodus.",
            "Reading does not allow this write operation.",
            "Lezen staat deze schrijfbewerking niet toe.",
          ),
          R(
            "Keep w and add a comment.",
            "Behoud w en voeg commentaar toe.",
            "A comment cannot prevent truncation.",
            "Commentaar voorkomt leegmaken niet.",
          ),
        ],
      ),
      app: A(
        "with",
        `with open("${alt ? "notes" : "report"}.txt",encoding="utf-8") as handle:\n    text = handle.read()`,
        [
          R(
            "The handle closes when execution leaves the block.",
            "De handle sluit wanneer uitvoering het blok verlaat.",
            "with manages cleanup even on an exception.",
            "with beheert opruimen ook bij een uitzondering.",
          ),
          R(
            "The file is deleted after reading.",
            "Het bestand wordt na lezen verwijderd.",
            "Closing is not deletion.",
            "Sluiten is niet verwijderen.",
          ),
          R(
            "The text becomes a permanent local computer file.",
            "De tekst wordt een permanent lokaal computerbestand.",
            "The course workspace is separate from computer folders.",
            "De cursuswerkruimte staat los van computermappen.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 7 : 4;
    return {
      p: P(
        "csv-numeric-conversion",
        `row = {"name":"Ada","score":"${n}"}\nprint(int(row["score"]) + 2)`,
        [String(n + 2), `${n}2`, "TypeError"],
        [
          [
            "Conversion happens before numeric addition.",
            "Omzetting gebeurt vóór numeriek optellen.",
          ],
          [
            "That would concatenate two strings.",
            "Dat zou twee strings samenvoegen.",
          ],
          [
            "int converts this valid field successfully.",
            "int zet dit geldige veld met succes om.",
          ],
        ],
      ),
      b: B(
        "dict-reader",
        `import csv\nwith open("quiz.csv","w",newline="",encoding="utf-8") as handle:\n    handle.write("name,score\\nAda,${n}\\n")\nwith open("quiz.csv",newline="",encoding="utf-8") as handle:\n    for row in csv.___(handle):\n        print(row["name"])`,
        "DictReader",
        ["reader", "writer"],
        [
          "DictReader uses the first row as keys. reader gives lists and writer writes output.",
          "DictReader gebruikt de eerste rij als sleutels. reader geeft lijsten en writer schrijft uitvoer.",
        ],
        "Ada\n",
      ),
      debug: D(
        "csv-quoting",
        `# Need two fields: ${alt ? "Bo" : "Ada"} and Paris, France\nline = '${alt ? "Bo" : "Ada"},"Paris, France"'\nfields = line.split(",")`,
        [
          R(
            "Use a CSV reader that understands quoting.",
            "Gebruik een CSV-lezer die aanhalingstekens begrijpt.",
            "The comma inside the quoted city is part of the data.",
            "De komma binnen de aangehaalde stad hoort bij de gegevens.",
          ),
          R(
            "Remove all commas first.",
            "Verwijder eerst alle komma’s.",
            "That destroys both separators and meaningful punctuation.",
            "Dat vernietigt zowel scheidingen als betekenisvolle leestekens.",
          ),
          R(
            "Split twice instead.",
            "Splits in plaats daarvan tweemaal.",
            "Repeated splitting still ignores quoting rules.",
            "Herhaald splitsen negeert nog steeds aanhalingsregels.",
          ),
        ],
      ),
      app: A(
        "csv-write",
        `writer = csv.DictWriter(handle,fieldnames=["name","score"])\nwriter.writeheader() # export ${n}`,
        [
          R(
            "fieldnames determines the exported column order.",
            "fieldnames bepaalt de geëxporteerde kolomvolgorde.",
            "The writer uses these names for the header and values.",
            "De schrijver gebruikt deze namen voor kop en waarden.",
          ),
          R(
            "writeheader converts every score to int.",
            "writeheader zet elke score naar int om.",
            "Writing a header does not parse input values.",
            "Een kop schrijven ontleedt invoerwaarden niet.",
          ),
          R(
            "Quoted commas must be escaped manually first.",
            "Aangehaalde komma’s moeten eerst handmatig worden gecodeerd.",
            "The CSV writer handles field quoting.",
            "De CSV-schrijver verwerkt veldaanhalingstekens.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 7 : 4;
    return {
      p: P(
        "json",
        `import json\ndata = json.loads('{"score":${n},"active":true}')\nprint(data["score"] + 1,data["active"])`,
        [`${n + 1} True`, `${n}1 true`, `${n + 1} true`],
        [
          [
            "JSON numbers and Booleans decode into Python types.",
            "JSON-getallen en booleaanse waarden worden Python-typen.",
          ],
          [
            "The number is not a string and Python prints True with a capital.",
            "Het getal is geen string en Python drukt True met hoofdletter af.",
          ],
          [
            "Python spells the Boolean value True.",
            "Python schrijft de booleaanse waarde als True.",
          ],
        ],
      ),
      b: B(
        "json-save",
        `import json\nwith open("quiz.json","w",encoding="utf-8") as handle:\n    json.___({"count":${n}},handle)\nwith open("quiz.json",encoding="utf-8") as handle:\n    print(json.load(handle)["count"])`,
        "dump",
        ["load", "loads"],
        [
          "dump writes to a handle; load reads a handle and loads reads a string.",
          "dump schrijft naar een handle; load leest een handle en loads leest een string.",
        ],
        `${n}\n`,
      ),
      debug: D(
        "malformed-json",
        `# Damaged existing file: {"count":${n},}\n# Need to preserve it for diagnosis.`,
        [
          R(
            "Catch JSONDecodeError and do not overwrite the file.",
            "Vang JSONDecodeError op en overschrijf het bestand niet.",
            "A trailing comma is malformed JSON and should remain inspectable.",
            "Een afsluitende komma is ongeldige JSON en moet te onderzoeken blijven.",
          ),
          R(
            "Overwrite it with an empty object immediately.",
            "Overschrijf het direct met een leeg object.",
            "That loses the original evidence and data.",
            "Dat verliest de oorspronkelijke informatie en gegevens.",
          ),
          R(
            "Treat it as a missing file.",
            "Behandel het als een ontbrekend bestand.",
            "The file exists; its syntax is damaged.",
            "Het bestand bestaat; de syntax is beschadigd.",
          ),
        ],
      ),
      app: A("json-roundtrip", `data = {"scores":[${n},2],"note":None}`, [
        R(
          "Compare loaded values with the original data after saving.",
          "Vergelijk geladen waarden met de oorspronkelijke gegevens na opslaan.",
          "A round trip tests both encoding and decoding.",
          "Heen en terug testen controleert coderen en decoderen.",
        ),
        R(
          "Require the JSON file to have identical spaces to Python code.",
          "Eis dat JSON identieke spaties als Pythoncode heeft.",
          "Whitespace layout is not the data model.",
          "Witruimteopmaak is niet het gegevensmodel.",
        ),
        R(
          "Assume every Python object can be dumped.",
          "Neem aan dat elk Pythonobject kan worden bewaard.",
          "Arbitrary objects require a chosen serialisable representation.",
          "Willekeurige objecten vragen een gekozen serialiseerbare weergave.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 7 : 4;
    return {
      p: P(
        "independent-instances",
        `class Counter:\n    def __init__(self):\n        self.value = 0\na = Counter()\nb = Counter()\na.value = ${n}\nprint(b.value)`,
        ["0", String(n), "None"],
        [
          [
            "Each instance has its own value attribute.",
            "Elke instantie heeft een eigen value-attribuut.",
          ],
          ["Only a was changed.", "Alleen a werd veranderd."],
          [
            "The initializer explicitly stores zero.",
            "De initializer bewaart expliciet nul.",
          ],
        ],
      ),
      b: B(
        "self",
        `class Counter:\n    def __init__(self,value):\n        ___.value = value\nprint(Counter(${n}).value)`,
        "self",
        ["Counter()", "value"],
        [
          "self identifies the new instance being initialised.",
          "self benoemt de nieuwe instantie die wordt geïnitialiseerd.",
        ],
        `${n}\n`,
      ),
      debug: D(
        "class-attributes",
        `class Bag:\n    items = []\n# Need independent lists for ${n} bags.`,
        [
          R(
            "Create self.items = [] inside __init__.",
            "Maak self.items = [] binnen __init__.",
            "Every constructor call then creates a fresh list.",
            "Elke constructoraanroep maakt dan een nieuwe lijst.",
          ),
          R(
            "Rename items to things.",
            "Hernoem items naar things.",
            "It would still be a shared class attribute.",
            "Het blijft een gedeeld klasseattribuut.",
          ),
          R(
            "Make every variable refer to the same Bag().",
            "Laat elke variabele naar dezelfde Bag() verwijzen.",
            "That shares the whole instance as well.",
            "Dat deelt ook de hele instantie.",
          ),
        ],
      ),
      app: A(
        "repr",
        `class Counter:\n    def __repr__(self):\n        return "Counter(${n})"`,
        [
          R(
            "__repr__ returns useful developer-facing text.",
            "__repr__ geeft nuttige tekst voor ontwikkelaars terug.",
            "Representations return strings and do not print themselves.",
            "Weergaven geven strings terug en drukken zichzelf niet af.",
          ),
          R(
            "__repr__ must print and return None.",
            "__repr__ moet afdrukken en None geven.",
            "The protocol requires a string return value.",
            "Het protocol vereist een stringterugkeerwaarde.",
          ),
          R(
            "__repr__ initialises the object.",
            "__repr__ initialiseert het object.",
            "Initialisation belongs to __init__.",
            "Initialisatie hoort bij __init__.",
          ),
        ],
      ),
    };
  },
];
