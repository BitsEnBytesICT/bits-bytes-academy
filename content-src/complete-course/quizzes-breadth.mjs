import {
  quiz,
  predict as P,
  complete as B,
  choice as Q,
} from "./quiz-authoring.mjs";
export const quizzes = [
  quiz(9, (f) => {
    const n = f ? 7 : 4;
    return [
      P(
        "sort sorted",
        `values = [${n}, 1, 3]\nresult = values.sort()\nprint(result, values[0])`,
        ["None 1", `[1, 3, ${n}] 1`, `${n} 1`],
        [
          [
            "sort changes the list and returns None; its first item becomes 1.",
            "sort verandert de lijst en geeft None terug; het eerste item wordt 1.",
          ],
          [
            "That return contract belongs to sorted, not sort.",
            "Die terugkeerafspraak hoort bij sorted, niet bij sort.",
          ],
          [
            "sort does not return the old first value.",
            "sort geeft niet de oude eerste waarde terug.",
          ],
        ],
      ),
      P(
        "slicing omitted-slice-bounds",
        `values = [1, 2, ${n}, 9]\nprint(values[1:3])`,
        [`[2, ${n}]`, `[2, ${n}, 9]`, `[1, 2, ${n}]`],
        [
          [
            "The slice includes index 1 and excludes index 3.",
            "De slice neemt index 1 mee en sluit index 3 uit.",
          ],
          ["The stop index is excluded.", "De eindindex is uitgesloten."],
          [
            "The slice begins at index 1, not the first item.",
            "De slice begint bij index 1, niet het eerste item.",
          ],
        ],
      ),
      B(
        "pop remove",
        [
          "Remove by index and keep the removed item.",
          "Verwijder op index en bewaar het verwijderde item.",
        ],
        `queue = ["A", "${f ? "C" : "B"}"]\nlast = queue.___()\nprint(last)`,
        "pop",
        ["remove", "count"],
        [
          "pop without an index removes and returns the last item. remove selects a value and returns None.",
          "pop zonder index verwijdert en retourneert het laatste item. remove kiest een waarde en geeft None.",
        ],
        `${f ? "C" : "B"}\n`,
      ),
      B(
        "conditional-comprehensions",
        [
          "Keep only positive doubled values.",
          "Behoud alleen positieve verdubbelde waarden.",
        ],
        `values = [-1, 0, ${n}]\nprint([v * 2 for v in values ___ v > 0])`,
        "if",
        ["else", "while"],
        [
          "A trailing if filters a comprehension’s input values.",
          "Een afsluitende if filtert invoerwaarden van een comprehensie.",
        ],
        `[${n * 2}]\n`,
      ),
      Q(
        "wall-bounce",
        "debugging",
        [
          "What extra condition prevents a second bounce while already moving away?",
          "Welke extra voorwaarde voorkomt een tweede botsing terwijl de bal al weg beweegt?",
        ],
        `y, radius, vy = 6, 6, ${n}\nif y <= radius:\n    vy = -vy`,
        [
          [
            [
              "Require vy < 0 at the top wall.",
              "Vereis vy < 0 bij de bovenmuur.",
            ],
            [
              "Only upward motion approaches the top edge.",
              "Alleen omhoog bewegen nadert de bovenrand.",
            ],
          ],
          [
            [
              "Require vy > 0 at the top wall.",
              "Vereis vy > 0 bij de bovenmuur.",
            ],
            [
              "Positive vy is already moving back into the court.",
              "Positieve vy beweegt al terug het veld in.",
            ],
          ],
          [
            ["Reverse vy twice.", "Keer vy twee keer om."],
            [
              "Two reversals cancel and do not resolve the collision rule.",
              "Twee omkeringen heffen elkaar op en lossen de botsingsregel niet op.",
            ],
          ],
        ],
      ),
      Q(
        "decimal",
        "application",
        f
          ? [
              'A typed price is "0.20". Which construction starts with that exact decimal value?',
              'Een getypte prijs is "0.20". Welke constructie begint met die exacte decimale waarde?',
            ]
          : [
              'A typed price is "0.10". Which construction starts with that exact decimal value?',
              'Een getypte prijs is "0.10". Welke constructie begint met die exacte decimale waarde?',
            ],
        null,
        [
          [
            [
              f ? 'Decimal("0.20")' : 'Decimal("0.10")',
              f ? 'Decimal("0.20")' : 'Decimal("0.10")',
            ],
            [
              "Constructing from text avoids a prior binary float approximation.",
              "Uit tekst construeren vermijdt een voorafgaande binaire floatbenadering.",
            ],
          ],
          [
            [
              f ? "Decimal(0.20)" : "Decimal(0.10)",
              f ? "Decimal(0.20)" : "Decimal(0.10)",
            ],
            [
              "The float argument is already approximated before Decimal sees it.",
              "Het floatargument is al benaderd voordat Decimal het ziet.",
            ],
          ],
          [
            [
              f ? 'Decimal(float("0.20"))' : 'Decimal(float("0.10"))',
              f ? 'Decimal(float("0.20"))' : 'Decimal(float("0.10"))',
            ],
            [
              "Converting through float first defeats the purpose of the text input.",
              "Eerst via float omzetten doet het voordeel van tekstinvoer teniet.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(10, (f) => {
    const name = f ? "Bo" : "Ada";
    return [
      P(
        "string-slicing string-negative-indices",
        `text = "${f ? "CODE" : "LABS"}"\nprint(text[1:-1])`,
        [f ? "OD" : "AB", f ? "ODE" : "ABS", f ? "COD" : "LAB"],
        [
          [
            "The slice excludes the first and last characters.",
            "De slice sluit het eerste en laatste teken uit.",
          ],
          [
            "The -1 stop excludes the last character.",
            "Het einde -1 sluit het laatste teken uit.",
          ],
          ["The start 1 excludes index 0.", "Begin 1 sluit index 0 uit."],
        ],
      ),
      P(
        "find",
        `text = "${name}!"\nprint(text.find("${name[0]}"), text.find("?"))`,
        ["0 -1", "1 0", "False False"],
        [
          [
            "A match at the start is 0; absence is -1.",
            "Een match aan het begin is 0; afwezigheid is -1.",
          ],
          [
            "String indexes start at zero and absence is not zero.",
            "Stringindexen beginnen bij nul en afwezigheid is niet nul.",
          ],
          [
            "find returns positions, not Boolean flags.",
            "find geeft posities, geen booleaanse vlaggen.",
          ],
        ],
      ),
      B(
        "strip case-methods",
        [
          "Trim surrounding whitespace before changing case.",
          "Trim omliggende witruimte vóór hoofdletters veranderen.",
        ],
        `name = "  ${name.toUpperCase()}  "\nprint(name.___().lower())`,
        "strip",
        ["split", "find"],
        [
          "strip returns trimmed text; split would return a list and find needs a search argument.",
          "strip geeft getrimde tekst; split geeft een lijst en find vereist een zoekargument.",
        ],
        name.toLowerCase() + "\n",
      ),
      B(
        "join",
        [
          "Reconstruct the parts with a separator.",
          "Bouw de delen opnieuw op met een scheidingsteken.",
        ],
        `parts = ["${name}", "Lab"]\nprint(" / ".___(parts))`,
        "join",
        ["split", "replace"],
        [
          "join is called on the separator and receives the string parts.",
          "join wordt op het scheidingsteken aangeroepen en ontvangt de stringdelen.",
        ],
        `${name} / Lab\n`,
      ),
      Q(
        "sort sorted",
        "debugging",
        [
          "How can ranking preserve the original order?",
          "Hoe kan rangschikken de oorspronkelijke volgorde behouden?",
        ],
        `scores = [${f ? 8 : 5}, 1, 3]\nranked = scores.sort()`,
        [
          [
            [
              "Use ranked = sorted(scores).",
              "Gebruik ranked = sorted(scores).",
            ],
            [
              "sorted returns a new list without changing scores.",
              "sorted geeft een nieuwe lijst zonder scores te veranderen.",
            ],
          ],
          [
            ["Use scores = scores.sort().", "Gebruik scores = scores.sort()."],
            [
              "This replaces scores with None after mutating the list.",
              "Dit vervangt scores door None nadat de lijst is gewijzigd.",
            ],
          ],
          [
            ["Print scores before calling sort.", "Druk scores af vóór sort."],
            [
              "Earlier output does not preserve the original data for later use.",
              "Eerdere uitvoer bewaart de oorspronkelijke gegevens niet voor later gebruik.",
            ],
          ],
        ],
      ),
      Q(
        "module-scope local-modules",
        "application",
        f
          ? [
              "A helper file contains input at top level. What happens the first time it is imported?",
              "Een hulpbestand bevat input op het hoogste niveau. Wat gebeurt er bij de eerste import?",
            ]
          : [
              "A helper file prints a greeting at top level. What happens the first time it is imported?",
              "Een hulpbestand drukt op het hoogste niveau een begroeting af. Wat gebeurt er bij de eerste import?",
            ],
        null,
        [
          [
            [
              "Its top-level statements execute.",
              "Zijn opdrachten op het hoogste niveau worden uitgevoerd.",
            ],
            [
              "Imports execute module setup, so keep reusable modules free of unwanted conversations.",
              "Imports voeren moduleopzet uit, dus houd herbruikbare modules vrij van ongewenste gesprekken.",
            ],
          ],
          [
            [
              "Only def lines execute; other statements are ignored.",
              "Alleen def-regels worden uitgevoerd; andere worden genegeerd.",
            ],
            [
              "Normal top-level statements are executed during import too.",
              "Gewone opdrachten op het hoogste niveau worden ook bij import uitgevoerd.",
            ],
          ],
          [
            [
              "Python automatically moves those statements into main.py.",
              "Python verplaatst die opdrachten automatisch naar main.py.",
            ],
            [
              "Python does not rearrange source files.",
              "Python herschikt bronbestanden niet.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(11, (f) => {
    const n = f ? 21 : 18;
    return [
      P(
        "value-error try-except",
        `try:\n    value = int("${f ? "two" : "three"}")\nexcept ValueError:\n    value = None\nprint(value)`,
        ["None", "0", "ValueError"],
        [
          [
            "The matching handler assigns None and execution continues.",
            "De passende afhandeling wijst None toe en uitvoering gaat verder.",
          ],
          [
            "No statement assigns zero here.",
            "Geen opdracht wijst hier nul toe.",
          ],
          [
            "The exception is caught, so its name is not printed as an uncaught failure.",
            "De uitzondering wordt opgevangen, dus de naam verschijnt niet als onafgehandelde fout.",
          ],
        ],
      ),
      P(
        "validation",
        `value = ${n}\nprint(0 <= value <= ${n})`,
        ["True", "False", "None"],
        [
          [
            "Both comparisons include the boundary.",
            "Beide vergelijkingen nemen de grens mee.",
          ],
          ["<= permits equality.", "<= staat gelijkheid toe."],
          [
            "The range check returns a Boolean.",
            "De bereikcontrole geeft een boolean.",
          ],
        ],
      ),
      B(
        "zero-division-error",
        [
          "Handle the specific division failure.",
          "Handel de specifieke deelfout af.",
        ],
        `try:\n    result = ${n} / 0\nexcept ___:\n    result = None\nprint(result)`,
        "ZeroDivisionError",
        ["ValueError", "KeyError"],
        [
          "Division by zero has its own exception type.",
          "Delen door nul heeft een eigen uitzonderingstype.",
        ],
        "None\n",
      ),
      B(
        "cancel retry",
        [
          "Recognise a cancellation command despite case and spaces.",
          "Herken een annuleringscommando ondanks hoofdletters en spaties.",
        ],
        `command = " ${f ? "CaNcEl" : "CANCEL"} "\nprint(command.strip().___() == "cancel")`,
        "lower",
        ["upper", "title"],
        [
          "lower makes the command comparable to the lowercase keyword after trimming.",
          "lower maakt het commando na trimmen vergelijkbaar met het kleineletterwoord.",
        ],
        "True\n",
      ),
      Q(
        "string-immutability",
        "debugging",
        [
          "Why does assigning this character fail?",
          "Waarom mislukt dit teken toewijzen?",
        ],
        `text = "${f ? "cat" : "dog"}"\ntext[0] = "X"`,
        [
          [
            [
              "Strings are immutable; construct a new string from parts.",
              "Strings zijn onveranderlijk; maak een nieuwe string uit delen.",
            ],
            [
              "A slice plus a replacement prefix creates a new value.",
              "Een slice plus vervangend voorvoegsel maakt een nieuwe waarde.",
            ],
          ],
          [
            [
              "Index zero is invalid for strings.",
              "Index nul is ongeldig voor strings.",
            ],
            [
              "Index zero can be read; assigning through it is the problem.",
              "Index nul kan gelezen worden; erdoor toewijzen is het probleem.",
            ],
          ],
          [
            [
              "Only lowercase characters can be assigned.",
              "Alleen kleine letters kunnen worden toegewezen.",
            ],
            [
              "No character can be replaced by indexed string assignment.",
              "Geen teken kan via indextoewijzing in een string vervangen worden.",
            ],
          ],
        ],
      ),
      Q(
        "return none",
        "application",
        f
          ? [
              "A helper returns 0 for a valid amount and None on cancel. How should the caller detect cancellation?",
              "Een helper geeft 0 bij een geldig bedrag en None bij annuleren. Hoe herkent de aanroeper annuleren?",
            ]
          : [
              "A parser returns 0 for valid text and None on failure. Which check distinguishes failure?",
              "Een parser geeft 0 bij geldige tekst en None bij mislukken. Welke controle onderscheidt mislukken?",
            ],
        null,
        [
          [
            ["result is None", "result is None"],
            [
              "This preserves a valid false-like numeric result.",
              "Dit behoudt een geldig onwaarachtig numeriek resultaat.",
            ],
          ],
          [
            ["not result", "not result"],
            [
              "Both zero and None are false-like, so this confuses them.",
              "Zowel nul als None is onwaarachtig, dus dit verwart ze.",
            ],
          ],
          [
            ["result == 0", "result == 0"],
            [
              "That recognises the valid zero instead of no result.",
              "Dat herkent de geldige nul in plaats van geen resultaat.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(12, (f) => {
    const n = f ? 8 : 3;
    return [
      P(
        "get get-key",
        `record = {"score": 0}\nprint(record.get("score", ${n}), record.get("missing", ${n}))`,
        [`0 ${n}`, `${n} ${n}`, "None None"],
        [
          [
            "The existing zero is preserved; only the missing key uses the fallback.",
            "De bestaande nul blijft; alleen de ontbrekende sleutel gebruikt de terugval.",
          ],
          [
            "get does not replace a stored zero with the default.",
            "get vervangt een opgeslagen nul niet door de standaard.",
          ],
          [
            "An explicit default is returned for the absent key.",
            "Een expliciete standaard wordt voor de ontbrekende sleutel teruggegeven.",
          ],
        ],
      ),
      P(
        "update overwrite",
        `record = {"score": 1}\nrecord.update({"score": ${n}, "active": True})\nprint(record["score"], len(record))`,
        [`${n} 2`, "1 2", `${n} 3`],
        [
          [
            "The repeated score key is overwritten and active is added.",
            "De herhaalde score-sleutel wordt overschreven en active toegevoegd.",
          ],
          [
            "update replaces existing values for repeated keys.",
            "update vervangt bestaande waarden bij herhaalde sleutels.",
          ],
          [
            "A repeated key does not create a duplicate entry.",
            "Een herhaalde sleutel maakt geen dubbel item.",
          ],
        ],
      ),
      B(
        "items dictionary-iteration",
        [
          "Iterate paired names and scores.",
          "Doorloop gekoppelde namen en scores.",
        ],
        `scores = {"${f ? "Bo" : "Ada"}": ${n}}\nfor name, score in scores.___():\n    print(name, score)`,
        "items",
        ["keys", "values"],
        [
          "items provides two-component pairs for unpacking.",
          "items levert paren met twee onderdelen om uit te pakken.",
        ],
        `${f ? "Bo" : "Ada"} ${n}\n`,
      ),
      B(
        "dictionary-comprehensions",
        [
          "Complete the key/value separator in the comprehension.",
          "Vul het sleutel/waarde-scheidingsteken in de comprehensie aan.",
        ],
        `scores = {"A": ${n}}\nboosted = {name ___ score + 1 for name, score in scores.items()}\nprint(boosted["A"])`,
        ":",
        ["=", ","],
        [
          "A dictionary comprehension specifies key: value before its iteration.",
          "Een dictionarycomprehensie zet sleutel: waarde vóór zijn herhaling.",
        ],
        String(n + 1) + "\n",
      ),
      Q(
        "retry validation",
        "debugging",
        [
          "Why does valid input after a failure never get read?",
          "Waarom wordt geldige invoer na een mislukking nooit gelezen?",
        ],
        `def read_number():\n    while True:\n        text = input("${f ? "Age" : "Count"}: ")\n        try:\n            return int(text)\n        except ValueError:\n            return None`,
        [
          [
            [
              "return exits the helper; retry needs feedback and another iteration.",
              "return verlaat de helper; herhalen vereist feedback en nog een iteratie.",
            ],
            [
              "A retry path must stay in the loop.",
              "Een herhaalroute moet in de lus blijven.",
            ],
          ],
          [
            [
              "The loop needs another True value.",
              "De lus heeft nog een True-waarde nodig.",
            ],
            [
              "The condition is already true; return bypasses it.",
              "De voorwaarde is al waar; return omzeilt die.",
            ],
          ],
          [
            [
              "int cannot parse text from input.",
              "int kan tekst uit input niet omzetten.",
            ],
            [
              "Parsing valid integer text works; the early return prevents another chance.",
              "Geldige getaltekst omzetten werkt; de vroege return verhindert een nieuwe kans.",
            ],
          ],
        ],
      ),
      Q(
        "sort",
        "application",
        f
          ? [
              "You want to sort a list in place and then keep using that list. Which pattern fits?",
              "Je wilt een lijst op zijn plek sorteren en daarna blijven gebruiken. Welk patroon past?",
            ]
          : [
              "A list method sorts in place and returns None. How should its result be handled?",
              "Een lijstmethode sorteert op zijn plek en geeft None. Hoe moet haar resultaat behandeld worden?",
            ],
        null,
        [
          [
            [
              "Call values.sort(); keep using values.",
              "Roep values.sort() aan; blijf values gebruiken.",
            ],
            [
              "The mutation happens to the object; no replacement assignment is needed.",
              "De wijziging gebeurt aan het object; vervangende toewijzing is niet nodig.",
            ],
          ],
          [
            [
              "Assign values = values.sort().",
              "Wijs values = values.sort() toe.",
            ],
            [
              "This overwrites the name with None.",
              "Dit overschrijft de naam met None.",
            ],
          ],
          [
            [
              "Assign values = None before sorting.",
              "Wijs values = None toe vóór sorteren.",
            ],
            [
              "None has no list sort method.",
              "None heeft geen lijstsorteermethode.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(13, (f) => {
    const word = f ? "Bo" : "Ada";
    return [
      P(
        "readline file-position",
        `with open("sample.txt", "w", encoding="utf-8") as h:\n    h.write("Header\\n${word}\\n")\nwith open("sample.txt", encoding="utf-8") as h:\n    h.readline()\n    print(h.read().strip())`,
        [word, "Header", `Header ${word}`],
        [
          [
            "readline has already consumed the first line.",
            "readline heeft de eerste regel al verbruikt.",
          ],
          [
            "The file position is after Header, not at the beginning.",
            "De bestandspositie staat na Header, niet aan het begin.",
          ],
          [
            "read does not automatically rewind the file.",
            "read spoelt het bestand niet automatisch terug.",
          ],
        ],
      ),
      P(
        "write append-file",
        `with open("sample.txt", "w", encoding="utf-8") as h:\n    h.write("A")\nwith open("sample.txt", "${f ? "a" : "w"}", encoding="utf-8") as h:\n    h.write("B")\nwith open("sample.txt", encoding="utf-8") as h:\n    print(h.read())`,
        [f ? "AB" : "B", f ? "B" : "AB", "A"],
        [
          [
            "The second mode determines whether earlier contents survive.",
            "De tweede modus bepaalt of eerdere inhoud blijft.",
          ],
          [
            f
              ? "Append mode preserves A before adding B."
              : "Write mode truncates A before writing B.",
            f
              ? "Toevoegmodus behoudt A vóór B toe te voegen."
              : "Schrijfmodus wist A vóór B te schrijven.",
          ],
          [
            "The second write runs and changes the contents.",
            "De tweede schrijfopdracht wordt uitgevoerd en verandert de inhoud.",
          ],
        ],
      ),
      B(
        "with read",
        [
          "Keep reading inside a context that closes the file.",
          "Houd lezen binnen een context die het bestand sluit.",
        ],
        `with open("sample.txt", "w", encoding="utf-8") as h:\n    h.write("${word}")\n___ open("sample.txt", encoding="utf-8") as h:\n    print(h.read())`,
        "with",
        ["for", "if"],
        [
          "with manages file lifetime, including exceptional exits.",
          "with beheert de bestandslevensduur, inclusief uitzonderlijk verlaten.",
        ],
        word + "\n",
      ),
      B(
        "missing-file",
        [
          "Handle only the expected missing-file case.",
          "Handel alleen het verwachte ontbrekende-bestandsgeval af.",
        ],
        `try:\n    with open("absent-${word}.txt", encoding="utf-8") as h:\n        text = h.read()\nexcept ___:\n    text = "new"\nprint(text)`,
        "FileNotFoundError",
        ["ValueError", "ZeroDivisionError"],
        [
          "An absent path raises FileNotFoundError, not a conversion or arithmetic error.",
          "Een afwezig pad geeft FileNotFoundError, geen omzettings- of rekenfout.",
        ],
        "new\n",
      ),
      Q(
        "get key-error",
        "debugging",
        [
          "What avoids a KeyError while preserving an existing zero?",
          "Wat voorkomt KeyError en behoudt een bestaande nul?",
        ],
        `record = {}\nscore = record["${f ? "points" : "score"}"]`,
        [
          [
            [
              `record.get("${f ? "points" : "score"}", 0)`,
              `record.get("${f ? "points" : "score"}", 0)`,
            ],
            [
              "get supplies a default only when the key is absent.",
              "get geeft alleen een standaard als de sleutel ontbreekt.",
            ],
          ],
          [
            ["Delete the dictionary first.", "Verwijder eerst de dictionary."],
            [
              "That removes the data rather than handling a missing field.",
              "Dat verwijdert de gegevens in plaats van een ontbrekend veld af te handelen.",
            ],
          ],
          [
            [
              "Use an index of zero instead of the key.",
              "Gebruik index nul in plaats van de sleutel.",
            ],
            [
              "A dictionary lookup uses keys, not list positions.",
              "Dictionarytoegang gebruikt sleutels, geen lijstposities.",
            ],
          ],
        ],
      ),
      Q(
        "decimal",
        "application",
        f
          ? [
              'When reusing a price calculation with Decimal, which operand should accompany Decimal("0.2")?',
              'Welk operand past bij Decimal("0.2") als je een prijsberekening hergebruikt?',
            ]
          : [
              'When reusing a price calculation with Decimal, which operand should accompany Decimal("0.1")?',
              'Welk operand past bij Decimal("0.1") als je een prijsberekening hergebruikt?',
            ],
        null,
        [
          [
            [
              "Another Decimal or an integer quantity.",
              "Een andere Decimal of een geheel aantal.",
            ],
            [
              "Decimal works with integer multiplication; decimal values should also be Decimal.",
              "Decimal werkt met gehele vermenigvuldiging; decimale waarden moeten ook Decimal zijn.",
            ],
          ],
          [
            ["A float such as 0.5.", "Een float zoals 0.5."],
            [
              "Mixing Decimal and float arithmetic is not the intended compatible model.",
              "Decimal en float mengen is niet het bedoelde compatibele rekenmodel.",
            ],
          ],
          [
            [
              "An unconverted string in an addition.",
              "Een niet-omgezette string bij optellen.",
            ],
            [
              "The string must be converted with Decimal before arithmetic.",
              "De string moet vóór rekenen met Decimal worden omgezet.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(14, (f) => {
    const n = f ? 7 : 3;
    return [
      P(
        "json-load nested-data",
        `import json\nstate = json.loads('{"scores":[${n},2],"paused":false}')\nprint(state["scores"][0], state["paused"])`,
        [`${n} False`, `${n} false`, "0 False"],
        [
          [
            "JSON arrays become lists and false becomes Python False.",
            "JSON-arrays worden lijsten en false wordt Python False.",
          ],
          [
            "Python displays its Boolean spelling with a capital F.",
            "Python toont zijn booleaanse spelling met hoofdletter F.",
          ],
          [
            "Index zero selects the first stored value, not a value of zero.",
            "Index nul kiest de eerste opgeslagen waarde, niet de waarde nul.",
          ],
        ],
      ),
      P(
        "csv-conversion",
        `row = {"name": "${f ? "Bo" : "Ada"}", "score": "${n}"}\nprint(int(row["score"]) + 2)`,
        [String(n + 2), `${n}2`, "TypeError"],
        [
          [
            "Conversion makes numeric addition possible.",
            "Omzetting maakt numeriek optellen mogelijk.",
          ],
          [
            "The int conversion prevents text concatenation.",
            "De int-omzetting voorkomt tekstsamenvoeging.",
          ],
          [
            "The conversion succeeds for this valid numeric field.",
            "De omzetting slaagt voor dit geldige numerieke veld.",
          ],
        ],
      ),
      B(
        "csv-delimiters csv-quoting",
        [
          "Configure the parser for semicolon fields.",
          "Stel de parser in voor puntkommavelden.",
        ],
        `import csv\nrows = list(csv.reader(['"${f ? "East" : "West"}; Hall";${n}'], delimiter=___))\nprint(len(rows[0]))`,
        '";"',
        ['","', '"\t"'],
        [
          "The configured delimiter separates fields outside quotes; the quoted semicolon stays inside one field.",
          "Het ingestelde teken scheidt velden buiten aanhalingstekens; de aangehaalde puntkomma blijft binnen één veld.",
        ],
        "2\n",
      ),
      B(
        "json-dump round-trips",
        [
          "Encode the report as JSON and load it back.",
          "Codeer het rapport als JSON en laad het terug.",
        ],
        `import json\nreport = {"score": ${n}}\ntext = json.___(report)\nprint(json.loads(text) == report)`,
        "dumps",
        ["loads", "load"],
        [
          "dumps returns JSON text; dump writes to a file handle. loads decodes text.",
          "dumps geeft JSON-tekst; dump schrijft naar een bestandshandle. loads decodeert tekst.",
        ],
        "True\n",
      ),
      Q(
        "write append-file",
        "debugging",
        ["Why did the old log disappear?", "Waarom verdween het oude log?"],
        `with open("${f ? "events" : "history"}.txt", "w", encoding="utf-8") as h:\n    h.write("New event\\n")`,
        [
          [
            [
              "w truncates an existing file; use a to append log entries.",
              "w wist een bestaand bestand; gebruik a om logregels toe te voegen.",
            ],
            [
              "File mode determines whether old contents are preserved.",
              "De bestandsmodus bepaalt of oude inhoud behouden blijft.",
            ],
          ],
          [
            [
              "UTF-8 removes earlier lines.",
              "UTF-8 verwijdert eerdere regels.",
            ],
            [
              "Encoding controls characters, not whether a file is truncated.",
              "Codering beheert tekens, niet of een bestand gewist wordt.",
            ],
          ],
          [
            [
              "with always empties a file when closing.",
              "with leegt een bestand altijd bij sluiten.",
            ],
            [
              "with closes the handle; the opening mode caused truncation.",
              "with sluit de handle; de openingsmodus veroorzaakte wissen.",
            ],
          ],
        ],
      ),
      Q(
        "find",
        "application",
        f
          ? [
              'A search returns 0 for "!" at the beginning. What does that mean?',
              'Een zoekactie geeft 0 voor "!" aan het begin. Wat betekent dat?',
            ]
          : [
              'A search returns -1 for a missing "?". What should the caller conclude?',
              'Een zoekactie geeft -1 voor een ontbrekende "?". Wat moet de aanroeper concluderen?',
            ],
        null,
        [
          [
            [
              f
                ? "A successful match at index zero."
                : "The fragment is absent.",
              f
                ? "Een geslaagde match op index nul."
                : "Het fragment ontbreekt.",
            ],
            [
              "find uses an index for matches and -1 for absence.",
              "find gebruikt een index voor matches en -1 voor afwezigheid.",
            ],
          ],
          [
            [
              f
                ? "The search failed because zero is false-like."
                : "The fragment is the last character.",
              f
                ? "Het zoeken mislukte omdat nul onwaarachtig is."
                : "Het fragment is het laatste teken.",
            ],
            [
              "Do not confuse a search result with Boolean truthiness or negative indexing.",
              "Verwar een zoekresultaat niet met booleaanse waarachtigheid of negatieve indexering.",
            ],
          ],
          [
            [
              "The string was changed by searching.",
              "De string werd door zoeken gewijzigd.",
            ],
            ["find only reads the string.", "find leest de string alleen."],
          ],
        ],
      ),
    ];
  }),
  quiz(15, (f) => {
    const n = f ? 5 : 2;
    return [
      P(
        "repr str",
        `class Token:\n    def __init__(self, value):\n        self.value = value\n    def __repr__(self):\n        return f"Token({self.value})"\n    def __str__(self):\n        return f"Value {self.value}"\nprint(repr(Token(${n})))`,
        [`Token(${n})`, `Value ${n}`, String(n)],
        [
          [
            "repr calls __repr__ for the diagnostic form.",
            "repr roept __repr__ aan voor de diagnostische vorm.",
          ],
          [
            "This is the friendly __str__ result, not the requested repr.",
            "Dit is het vriendelijke __str__-resultaat, niet de gevraagde repr.",
          ],
          [
            "The representation method includes the class label too.",
            "De voorstellingsmethode bevat ook het klasselabel.",
          ],
        ],
      ),
      P(
        "class-variables independent-instances",
        `class Bag:\n    items = []\na = Bag()\nb = Bag()\na.items.append(${n})\nprint(len(b.items))`,
        ["1", "0", "2"],
        [
          [
            "Both instances see the same class-level list.",
            "Beide instanties zien dezelfde lijst op klasseniveau.",
          ],
          [
            "A new instance does not automatically clone a mutable class attribute.",
            "Een nieuwe instantie kloont niet automatisch een veranderlijk klasseattribuut.",
          ],
          ["Only one item was appended.", "Er werd maar één item toegevoegd."],
        ],
      ),
      B(
        "self constructors instance-variables",
        [
          "Store state on the new instance.",
          "Bewaar toestand op de nieuwe instantie.",
        ],
        `class Counter:\n    def __init__(self, value):\n        ___.value = value\nprint(Counter(${n}).value)`,
        "self",
        ["Counter", "value"],
        [
          "self identifies the current instance; assigning on Counter would share class state.",
          "self identificeert de huidige instantie; toewijzen op Counter zou klassetoestand delen.",
        ],
        String(n) + "\n",
      ),
      B(
        "getattr hasattr dir",
        [
          "Read an optional attribute with a default.",
          "Lees een optioneel attribuut met een standaard.",
        ],
        `class Item:\n    pass\nitem = Item()\nprint(___(item, "score", ${n}))`,
        "getattr",
        ["hasattr", "dir"],
        [
          "getattr accepts a default; hasattr answers existence and dir lists names.",
          "getattr accepteert een standaard; hasattr antwoordt over bestaan en dir noemt namen.",
        ],
        String(n) + "\n",
      ),
      Q(
        "csv-quoting",
        "debugging",
        [
          "Why does this split not safely read a CSV record?",
          "Waarom leest deze split een CSV-record niet veilig?",
        ],
        `line = '"${f ? "Bo" : "Ada"}, A.",3'\nparts = line.split(",")`,
        [
          [
            [
              "The comma inside quotes is part of one field; use csv.reader.",
              "De komma binnen aanhalingstekens hoort bij één veld; gebruik csv.reader.",
            ],
            [
              "The parser understands quoting, while string split does not.",
              "De parser begrijpt aanhalingstekens, terwijl stringsplit dat niet doet.",
            ],
          ],
          [
            [
              "CSV records cannot contain commas.",
              "CSV-records mogen geen komma’s bevatten.",
            ],
            [
              "Commas are valid inside quoted fields.",
              "Komma’s zijn geldig binnen aangehaalde velden.",
            ],
          ],
          [
            [
              "Changing split to join parses the record.",
              "split in join veranderen verwerkt het record.",
            ],
            [
              "join reconstructs text from parts; it is not a CSV parser.",
              "join bouwt tekst uit delen; het is geen CSV-parser.",
            ],
          ],
        ],
      ),
      Q(
        "valid-keys invalid-keys",
        "application",
        f
          ? [
              "Which coordinate value is a valid dictionary key?",
              "Welke coördinaatwaarde is een geldige dictionarysleutel?",
            ]
          : [
              "Which value can identify a dictionary entry without an unhashable-key error?",
              "Welke waarde kan een dictionary-item identificeren zonder onhashbare-sleutelfout?",
            ],
        null,
        [
          [
            [f ? "(2, 3)" : "(0, 1)", f ? "(2, 3)" : "(0, 1)"],
            [
              "This tuple contains hashable integer components.",
              "Deze tuple bevat hashbare gehele onderdelen.",
            ],
          ],
          [
            [f ? "[2, 3]" : "[0, 1]", f ? "[2, 3]" : "[0, 1]"],
            [
              "A mutable list is not a valid key.",
              "Een veranderlijke lijst is geen geldige sleutel.",
            ],
          ],
          [
            [f ? "([2], 3)" : "([0], 1)", f ? "([2], 3)" : "([0], 1)"],
            [
              "The tuple contains an unhashable list, so the tuple is not hashable either.",
              "De tuple bevat een onhashbare lijst, dus is zelf ook niet hashbaar.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(16, (f) => {
    const n = f ? 4 : 2;
    return [
      P(
        "game-state scoring-once",
        `state = "serve"\nscore = ${n}\nif state == "playing":\n    score += 1\nprint(score)`,
        [String(n), String(n + 1), "0"],
        [
          [
            "A served-but-not-playing match cannot award a point.",
            "Een wedstrijd vóór de opslag mag geen punt toekennen.",
          ],
          [
            "The playing guard is false in serve state.",
            "De playing-controle is onwaar in serve-toestand.",
          ],
          [
            "The code preserves the existing score rather than resetting it.",
            "De code behoudt de bestaande score in plaats van die te resetten.",
          ],
        ],
      ),
      P(
        "collision-correction",
        `import pygame\npaddle = pygame.Rect(${f ? 30 : 20}, 100, 10, 60)\nradius = 6\nprint(paddle.right + radius)`,
        [
          String((f ? 30 : 20) + 16),
          String((f ? 30 : 20) + 10),
          String((f ? 30 : 20) + 6),
        ],
        [
          [
            "The ball centre goes one radius beyond the paddle’s right edge.",
            "Het balmiddelpunt komt één straal voorbij de rechterrand van het batje.",
          ],
          [
            "That is only the edge; the ball would still overlap it.",
            "Dat is alleen de rand; de bal zou die nog overlappen.",
          ],
          [
            "The right edge also includes the paddle width.",
            "De rechterrand omvat ook de batjesbreedte.",
          ],
        ],
      ),
      B(
        "playtesting game-review",
        [
          "Advance only an unpaused playing match.",
          "Laat alleen een ongepauzeerde spelende wedstrijd doorgaan.",
        ],
        `state = "playing"\npaused = ${f ? "False" : "True"}\nprint(state == "playing" and ___ paused)`,
        "not",
        ["bool", "or"],
        [
          "not reverses the pause flag before combining the requirements.",
          "not keert de pauzevlag om vóór de eisen te combineren.",
        ],
        f ? "True\n" : "False\n",
      ),
      B(
        "game-persistence",
        [
          "Include the maximum allowed target in validation.",
          "Neem het maximaal toegestane doel mee in validatie.",
        ],
        `target = ${f ? 11 : 21}\nvalid = type(target) is int and 1 <= target ___ ${f ? 11 : 21}\nprint(valid)`,
        "<=",
        ["<", ">"],
        [
          "The valid interval includes both endpoints.",
          "Het geldige interval omvat beide eindpunten.",
        ],
        "True\n",
      ),
      Q(
        "independent-instances class-variables",
        "debugging",
        [
          "Where should a separate per-player score history be created?",
          "Waar moet een aparte scoregeschiedenis per speler gemaakt worden?",
        ],
        `class Player:\n    history = []\n    def __init__(self, name):\n        self.name = name\na = Player("${f ? "Bo" : "Ada"}")`,
        [
          [
            [
              "Inside __init__ as self.history = [].",
              "Binnen __init__ als self.history = [].",
            ],
            [
              "Each constructor call then creates its own list.",
              "Elke constructoraanroep maakt dan een eigen lijst.",
            ],
          ],
          [
            [
              "Keep the single mutable class list.",
              "Behoud de ene veranderlijke klasselijst.",
            ],
            [
              "All instances continue to share it.",
              "Alle instanties blijven die delen.",
            ],
          ],
          [
            [
              "Reset Player.history whenever any player scores.",
              "Reset Player.history telkens als iemand scoort.",
            ],
            [
              "That also erases other players’ shared history.",
              "Dat wist ook gedeelde geschiedenis van andere spelers.",
            ],
          ],
        ],
      ),
      Q(
        "json-dump round-trips",
        "application",
        f
          ? [
              "You want to save a paddle’s settings. What is a suitable JSON data model?",
              "Je wilt instellingen van een batje bewaren. Wat is een geschikt JSON-model?",
            ]
          : [
              "You want to save a match result. What is a suitable JSON data model?",
              "Je wilt een wedstrijdresultaat bewaren. Wat is een geschikt JSON-model?",
            ],
        null,
        [
          [
            [
              f
                ? "A dictionary of named numeric settings."
                : "A dictionary of named numeric scores.",
              f
                ? "Een dictionary met benoemde numerieke instellingen."
                : "Een dictionary met benoemde numerieke scores.",
            ],
            [
              "JSON supports ordinary data structures; loading can reconstruct the needed objects later.",
              "JSON ondersteunt gewone gegevensstructuren; laden kan benodigde objecten later reconstrueren.",
            ],
          ],
          [
            [
              "The live pygame.Surface object.",
              "Het actieve pygame.Surface-object.",
            ],
            [
              "A Surface is not directly JSON-serialisable.",
              "Een Surface kan niet direct als JSON worden bewaard.",
            ],
          ],
          [
            [
              "Several JSON objects appended without a containing list.",
              "Meerdere JSON-objecten achter elkaar zonder omvattende lijst.",
            ],
            [
              "That is not one valid JSON document.",
              "Dat is niet één geldig JSON-document.",
            ],
          ],
        ],
      ),
    ];
  }),
];
