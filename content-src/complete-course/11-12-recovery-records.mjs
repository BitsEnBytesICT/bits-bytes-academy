import { lesson, S, C, F } from "./authoring.mjs";
const readerFiles = (code, call = "reader.read_amount()") => ({
  "reader.py": code,
  "main.py": `import reader\nresult = ${call}\nprint(result)\n`,
});
const R = (name, args, stdin, check) =>
  F(name, args, check, { module: "reader", stdin });
export const activities = [
  lesson(11, 1, {
    explanation: [
      "Diagnose before editing. A syntax error prevents parsing, a runtime error interrupts execution, and a logic error produces an incorrect result without necessarily raising an exception.",
      "Diagnosticeer vóór je wijzigt. Een syntaxfout verhindert ontleden, een runtimefout onderbreekt de uitvoering en een logische fout geeft een onjuist resultaat zonder noodzakelijk een uitzondering te veroorzaken.",
    ],
    sections: [
      S(
        "tracebacks syntax-errors runtime-errors logic-errors",
        [
          "Read the final line, then the call chain",
          "Lees de laatste regel en daarna de aanroepketen",
        ],
        [
          'For a traceback, start with the final exception type and message, then find the nearest line in your own code. SyntaxError commonly points at incomplete punctuation; ValueError can mean int received nonnumeric text. Neither is the same as a calculation that runs but answers the wrong question. Reproduce one small failing input and change one cause at a time. Compare these reports: `def average(total, count)` without a colon gives SyntaxError before running. Calling average("five", 2) gives a traceback ending in TypeError; the relevant function line is `return total / count`. The original 5 // 2 result has neither failure: it is a logic error.',
          'Begin bij een traceback met het laatste uitzonderingstype en bericht en zoek dan de dichtstbijzijnde regel in je eigen code. SyntaxError wijst vaak op onvolledige leestekens; ValueError kan betekenen dat int niet-numerieke tekst kreeg. Geen van beide is hetzelfde als een berekening die draait maar de verkeerde vraag beantwoordt. Herhaal één kleine mislukte invoer en wijzig één oorzaak tegelijk. Vergelijk deze meldingen: `def average(total, count)` zonder dubbele punt geeft SyntaxError vóór uitvoering. average("five", 2) geeft een traceback die eindigt met TypeError; de relevante functieregel is `return total / count`. Het oorspronkelijke resultaat 5 // 2 geeft geen van beide fouten: het is een logische fout.',
        ],
        "total, count = 5, 2\nprint(total // count)\nprint(total / count)",
        "2\n2.5\n",
        [
          "Which result answers the question “what is the average”?",
          "Welk resultaat beantwoordt de vraag “wat is het gemiddelde”?",
        ],
      ),
    ],
    starter:
      'def average(total, count):\n    return total // count\n\nerror_kind = "runtime"\nsyntax_kind = ""\nruntime_kind = ""\nfault_line = ""\nprint(average(5, 2))\n',
    solution:
      'def average(total, count):\n    return total / count\n\nerror_kind = "logic"\nsyntax_kind = "syntax"\nruntime_kind = "runtime"\nfault_line = "return total / count"\nprint(average(5, 2))\n',
    tasks: [
      C(
        "logic-errors",
        [
          "Repair average(total, count) to preserve fractional results. Assume count > 0.",
          "Repareer average(total, count) zodat fracties behouden blijven. Neem count > 0 aan.",
        ],
        "average(5,2) == 2.5",
        [
          [
            "The program runs, but one operator answers a different question.",
            "Het programma draait, maar één operator beantwoordt een andere vraag.",
          ],
          ["Compare / with //.", "Vergelijk / met //."],
          ["return total / count", "return total / count"],
        ],
        [
          "An average is not automatically a whole number.",
          "Een gemiddelde is niet automatisch een geheel getal.",
        ],
        [
          F("average", [1, 4], "_return == 0.25"),
          F("average", [-5, 2], "_return == -2.5"),
        ],
      ),
      C(
        "tracebacks syntax-errors runtime-errors",
        [
          'Classify the three reports: set error_kind, syntax_kind and runtime_kind to "logic", "syntax" and "runtime". Put the relevant function line from the TypeError report in fault_line. Run the repaired program and confirm 2.5.',
          'Classificeer de drie meldingen: stel error_kind, syntax_kind en runtime_kind in op "logic", "syntax" en "runtime". Zet de relevante functieregel uit de TypeError-melding in fault_line. Voer het herstelde programma uit en bevestig 2.5.',
        ],
        'error_kind == "logic" and syntax_kind == "syntax" and runtime_kind == "runtime" and fault_line.strip() == "return total / count" and _stdout.strip() == "2.5"',
        [
          [
            "No exception was raised by the original valid numeric call.",
            "De oorspronkelijke geldige numerieke aanroep gaf geen uitzondering.",
          ],
          [
            "A wrong result without a failure is a logic error.",
            "Een fout resultaat zonder onderbreking is een logische fout.",
          ],
          ['error_kind = "logic"', 'error_kind = "logic"'],
        ],
        [
          "Distinguish a wrong result from a program that cannot parse or stops with an exception.",
          "Onderscheid een fout resultaat van een programma dat niet kan ontleden of stopt met een uitzondering.",
        ],
      ),
    ],
    note: [
      "The fault was a floor-division operator, not missing syntax or bad input. A fractional test exposes it while an evenly divisible test can hide it.",
      "De fout was een naar-beneden-deling, geen ontbrekende syntax of slechte invoer. Een test met een fractie onthult die terwijl een exact deelbare test die kan verbergen.",
    ],
    experiment: [
      'Temporarily remove the function’s colon and read the SyntaxError line. Restore it, then call average("five", 2) and locate the TypeError and your function line in the traceback. Repair each change before continuing.',
      'Verwijder tijdelijk de dubbele punt en lees de SyntaxError-regel. Herstel die, roep daarna average("five", 2) aan en zoek TypeError en je functieregel in de traceback. Herstel elke wijziging voordat je verdergaat.',
    ],
  }),
  lesson(11, 2, {
    explanation: [
      "Handle expected conversion and division failures with specific exceptions. Keep unexpected programming errors visible so they can be repaired.",
      "Handel verwachte omzettings- en deelfouten af met specifieke uitzonderingen. Houd onverwachte programmeerfouten zichtbaar zodat je ze kunt repareren.",
    ],
    sections: [
      S(
        "value-error try-except zero-division-error",
        ["Protect a small operation", "Bescherm een kleine bewerking"],
        [
          "try runs its indented block. If a matching exception occurs, the corresponding except block runs instead of the remaining try statements. float can raise ValueError for invalid numeric text; division by zero raises ZeroDivisionError. Catch these named failures rather than using a bare except that would hide unrelated bugs.",
          "try voert zijn ingesprongen blok uit. Bij een passende uitzondering wordt het bijbehorende except-blok uitgevoerd in plaats van de resterende try-opdrachten. float kan ValueError geven bij ongeldige getaltekst; delen door nul geeft ZeroDivisionError. Vang deze benoemde fouten op in plaats van een kale except die niet-gerelateerde fouten zou verbergen.",
        ],
        'try:\n    value = int("ten")\nexcept ValueError:\n    value = None\nprint(value)',
        "None\n",
        [
          "Which statement is skipped after conversion fails?",
          "Welke opdracht wordt overgeslagen nadat omzetting mislukt?",
        ],
      ),
    ],
    starter:
      'def divide(left, right):\n    return float(left) / float(right)\n\nprint(divide("6", "2"))\n',
    solution:
      'def divide(left, right):\n    try:\n        return float(left) / float(right)\n    except ValueError:\n        return None\n    except ZeroDivisionError:\n        return None\n\nprint(divide("6", "2"))\n',
    tasks: [
      C(
        "value-error try-except",
        [
          "Convert both text arguments to floats and return their quotient. Return None for ValueError.",
          "Zet beide tekstargumenten om naar floats en geef hun quotiënt terug. Geef None bij ValueError.",
        ],
        'divide("6","2") == 3',
        [
          [
            "Wrap the operation that can fail.",
            "Zet de bewerking die kan mislukken in het beschermde blok.",
          ],
          [
            "Handle a ValueError from either conversion.",
            "Handel ValueError van beide omzettingen af.",
          ],
          [
            "except ValueError:\n    return None",
            "except ValueError:\n    return None",
          ],
        ],
        [
          "Try malformed text in the first and second argument.",
          "Probeer ongeldige tekst in het eerste en tweede argument.",
        ],
        [
          F("divide", ["oops", "2"], "_return is None and _error is None"),
          F("divide", ["3", ""], "_return is None and _error is None"),
          F("divide", ["-5", "2"], "_return == -2.5"),
        ],
      ),
      C(
        "zero-division-error",
        [
          "Also return None for ZeroDivisionError, while allowing unrelated TypeError failures to remain visible.",
          "Geef ook None bij ZeroDivisionError, maar laat niet-gerelateerde TypeError-fouten zichtbaar blijven.",
        ],
        'divide("3","0") is None',
        [
          [
            "Use another specific exception branch.",
            "Gebruik nog een specifieke uitzonderingstak.",
          ],
          [
            "Do not catch Exception or use a bare except.",
            "Vang niet Exception op en gebruik geen kale except.",
          ],
          [
            "except ZeroDivisionError:\n    return None",
            "except ZeroDivisionError:\n    return None",
          ],
        ],
        [
          "A zero divisor is expected input; a wrong argument type can be a caller bug.",
          "Een nuldeler is verwachte invoer; een verkeerd argumenttype kan een fout van de aanroeper zijn.",
        ],
        [
          F("divide", ["2", "0"], "_return is None and _error is None"),
          F("divide", [[], "2"], '_error == "TypeError"'),
        ],
      ),
    ],
    note: [
      "The two except branches cover different failure causes. Returning None signals no numeric result; it is different from a legitimate quotient of zero.",
      "De twee except-takken behandelen verschillende foutoorzaken. None teruggeven betekent geen numeriek resultaat; dat verschilt van een geldig quotiënt nul.",
    ],
    experiment: [
      'Compare divide("0", "2") and divide("2", "0"). Explain why a caller should compare with None rather than treating all false-like results as failure.',
      'Vergelijk divide("0", "2") en divide("2", "0"). Leg uit waarom een aanroeper met None moet vergelijken in plaats van alle onwaarachtige resultaten als fout te zien.',
    ],
  }),
  lesson(11, 3, {
    explanation: [
      "Separate parsing from validation. A value can be a valid integer but still outside the application’s allowed range.",
      "Scheid omzetten van valideren. Een waarde kan een geldig geheel getal zijn maar toch buiten het toegestane bereik van de toepassing vallen.",
    ],
    sections: [
      S(
        "validation",
        ["Two different questions", "Twee verschillende vragen"],
        [
          'Parsing asks whether text represents the expected type. Validation asks whether that value follows a rule. int("-4") succeeds, but -4 may be an invalid age. Use an explicit inclusive range and return None for rejected input. int accepts surrounding whitespace; decimal text such as "2.5" is not whole-number text.',
          'Omzetten vraagt of tekst het verwachte type voorstelt. Valideren vraagt of die waarde aan een regel voldoet. int("-4") lukt, maar -4 kan een ongeldige leeftijd zijn. Gebruik een expliciet inclusief bereik en geef None bij afwijzing. int accepteert witruimte eromheen; decimale tekst zoals "2.5" is geen gehele-getaltekst.',
        ],
        'value = int(" -4 ")\nvalid = 0 <= value <= 120\nprint(value, valid)',
        "-4 False\n",
        [
          "Did parsing fail, or did the range rule reject the value?",
          "Mislukte het omzetten of wees de bereikregel de waarde af?",
        ],
      ),
    ],
    starter:
      'def parse_age(text):\n    return None\n\nprint(parse_age("18"))\n',
    solution:
      'def parse_age(text):\n    try:\n        age = int(text)\n    except ValueError:\n        return None\n    if 0 <= age <= 120:\n        return age\n    return None\n\nprint(parse_age("18"))\n',
    tasks: [
      C(
        "validation",
        [
          "Return an int for text representing an age from 0 through 120, including both boundaries.",
          "Geef een int terug voor tekst met een leeftijd van 0 tot en met 120, inclusief beide grenzen.",
        ],
        'parse_age("18") == 18',
        [
          [
            "Parse first so comparisons use a number.",
            "Zet eerst om zodat vergelijkingen een getal gebruiken.",
          ],
          ["Accept 0 <= age <= 120.", "Accepteer 0 <= age <= 120."],
          [
            "if 0 <= age <= 120:\n    return age",
            "if 0 <= age <= 120:\n    return age",
          ],
        ],
        [
          "Zero is valid here, even though it is false-like in a condition.",
          "Nul is hier geldig hoewel die in een voorwaarde onwaarachtig is.",
        ],
        [
          F("parse_age", ["0"], "_return == 0 and type(_return) is int"),
          F("parse_age", [" 120 "], "_return == 120"),
        ],
      ),
      C(
        "validation",
        [
          "Return None for malformed text or out-of-range integers.",
          "Geef None voor ongeldige tekst of gehele getallen buiten bereik.",
        ],
        'parse_age("-1") is None',
        [
          [
            "Conversion success is only the first requirement.",
            "Geslaagde omzetting is alleen de eerste eis.",
          ],
          [
            "Handle ValueError, then reject numeric values outside the range.",
            "Handel ValueError af en wijs daarna numerieke waarden buiten bereik af.",
          ],
          [
            "except ValueError:\n    return None",
            "except ValueError:\n    return None",
          ],
        ],
        [
          "Do not truncate a float to make invalid whole-number text seem valid.",
          "Kap geen float af om ongeldige gehele-getaltekst geldig te laten lijken.",
        ],
        [
          F("parse_age", ["121"], "_return is None"),
          F("parse_age", ["18.5"], "_return is None"),
          F("parse_age", ["age"], "_return is None"),
          F("parse_age", [""], "_return is None"),
        ],
      ),
    ],
    note: [
      "The function makes conversion failure and range rejection explicit. The caller receives either a valid integer, including zero, or None.",
      "De functie maakt omzettingsfouten en bereikafwijzing expliciet. De aanroeper ontvangt ofwel een geldig geheel getal, inclusief nul, ofwel None.",
    ],
    experiment: [
      'Write a test table with -1, 0, 120, 121 and "unknown". Label which values fail parsing and which fail validation.',
      'Schrijf een testtabel met -1, 0, 120, 121 en "unknown". Benoem welke waarden bij omzetting en welke bij validatie falen.',
    ],
  }),
  lesson(11, 4, {
    explanation: [
      "Repair a conversation that gives up after bad input. Keep reading until a valid nonnegative number, cancel, or end-of-input.",
      "Repareer een gesprek dat bij slechte invoer opgeeft. Blijf lezen tot een geldig niet-negatief getal, cancel of einde van invoer.",
    ],
    sections: [
      S(
        "retry cancel end-of-input",
        ["Every path has a next action", "Elke route heeft een volgende actie"],
        [
          'Normalise commands with strip().lower() before comparing. Catch EOFError around input when no more input is available; the terminal’s end-input action can trigger it. Cancellation and EOF both return None. On a conversion or range failure, explain what to try and continue the loop. A valid result returns immediately. float also accepts "inf" and "nan": these are not finite amounts. Check amount >= 0 and amount < float("inf"); NaN fails these comparisons.',
          'Normaliseer commando’s met strip().lower() vóór vergelijken. Vang EOFError rond input op wanneer geen invoer meer beschikbaar is; de terminalactie voor einde invoer kan dit activeren. Annuleren en EOF geven beide None. Leg bij omzettings- of bereikfouten uit wat te proberen en vervolg de lus. Een geldig resultaat wordt direct teruggegeven. float accepteert ook "inf" en "nan": dit zijn geen eindige bedragen. Controleer amount >= 0 en amount < float("inf"); NaN faalt deze vergelijkingen.',
        ],
        'raw = " CANCEL "\nprint(raw.strip().lower() == "cancel")',
        "True\n",
        [
          "Why is normalisation useful before cancellation?",
          "Waarom is normalisatie nuttig vóór annuleren?",
        ],
      ),
    ],
    starter: readerFiles(
      'def read_amount():\n    raw = input("Amount or cancel: ")\n    if raw == "cancel":\n        return None\n    return float(raw)\n',
    ),
    solution: readerFiles(
      'def read_amount():\n    while True:\n        try:\n            raw = input("Amount or cancel: ")\n        except EOFError:\n            return None\n        if raw.strip().lower() == "cancel":\n            return None\n        try:\n            amount = float(raw)\n        except ValueError:\n            print("Try a number")\n            continue\n        if amount >= 0 and amount < float("inf"):\n            return amount\n        print("Use a finite number of 0 or more")\n',
    ),
    inputs: ["bad", "-2", "4"],
    tasks: [
      C(
        "retry",
        [
          "In reader.py retry after malformed or negative input, with a message explaining what to change. Return a finite nonnegative float when valid.",
          "Probeer in reader.py opnieuw na ongeldige of negatieve invoer met een bericht over wat te veranderen. Geef bij geldige invoer een eindige niet-negatieve float terug.",
        ],
        "result == 4",
        [
          [
            "A failed attempt should return to input, not return from the function.",
            "Een mislukte poging moet naar input terugkeren, niet uit de functie teruggeven.",
          ],
          [
            'Keep the whole conversation inside while True. The upper bound float("inf") excludes infinity; NaN fails the range test.',
            'Houd het hele gesprek binnen while True. De bovengrens float("inf") sluit oneindig uit; NaN faalt de bereiktest.',
          ],
          [
            'except ValueError:\n    print("Try a number")\n    continue',
            'except ValueError:\n    print("Try a number")\n    continue',
          ],
        ],
        [
          "Check that a later good value is still accepted after two bad attempts.",
          "Controleer dat een latere goede waarde na twee slechte pogingen nog wordt geaccepteerd.",
        ],
        [
          R(
            "read_amount",
            [],
            ["oops", "-2", "0"],
            '_return == 0 and _call_stdout.count(chr(10)) >= 2',
          ),
          R("read_amount", [], ["nan", "inf", "3.5"], "_return == 3.5"),
        ],
      ),
      C(
        "cancel end-of-input",
        [
          "Return None for a normalised cancel command or EOF, even after failed attempts.",
          "Geef None bij een genormaliseerd cancel-commando of EOF, ook na mislukte pogingen.",
        ],
        "reader.read_amount is not None",
        [
          [
            "No result is different from a valid amount of zero.",
            "Geen resultaat verschilt van een geldig bedrag nul.",
          ],
          [
            "Catch EOFError at input; compare stripped lowercase text before numeric conversion.",
            "Vang EOFError bij input op; vergelijk getrimde kleine letters vóór getalomzetting.",
          ],
          [
            "except EOFError:\n    return None",
            "except EOFError:\n    return None",
          ],
        ],
        [
          "Cancellation must not be treated as malformed numeric input that repeats forever.",
          "Annuleren mag niet als ongeldige numerieke invoer worden behandeld die eindeloos herhaalt.",
        ],
        [
          R(
            "read_amount",
            [],
            ["  CANCEL  "],
            "_return is None and _error is None",
          ),
          R("read_amount", [], [], "_return is None and _error is None"),
          R("read_amount", [], ["bad"], "_return is None and _error is None"),
        ],
      ),
    ],
    note: [
      "Separate exception boundaries make every path clear: input may end, conversion may fail, validation may reject, or the function may return a result.",
      "Aparte uitzonderingsgrenzen maken elke route duidelijk: invoer kan eindigen, omzetting kan mislukken, validatie kan afwijzen of de functie kan een resultaat teruggeven.",
    ],
    experiment: [
      "Try invalid text, a negative number, zero, a mixed-case cancel, and end-input. Explain which branch handles each.",
      "Probeer ongeldige tekst, een negatief getal, nul, cancel met gemengde hoofdletters en einde invoer. Leg uit welke tak elk geval afhandelt.",
    ],
  }),
  lesson(11, 5, {
    explanation: [
      "Build an input helper for a bounded whole-number choice. The caller supplies inclusive low and high limits. Retry with useful feedback, or return None on cancel or EOF.",
      "Bouw een invoerhelper voor een begrensde gehele-getalkeuze. De aanroeper geeft inclusieve onder- en bovengrenzen mee. Herhaal met bruikbare feedback of geef None bij cancel of EOF.",
    ],
    sections: [
      S(
        "recovery-review",
        ["A reusable conversation", "Een herbruikbaar gesprek"],
        [
          "A reusable helper should use its supplied bounds rather than a sample range. Decide separately whether text can become an integer and whether the integer is permitted. The caller chooses what to do with the returned number or None.",
          "Een herbruikbare helper moet de meegegeven grenzen gebruiken in plaats van een voorbeeldbereik. Bepaal apart of tekst een geheel getal kan worden en of dat getal toegestaan is. De aanroeper kiest wat te doen met het teruggegeven getal of None.",
        ],
        "low, high, value = -2, 2, 0\nprint(low <= value <= high)",
        "True\n",
        [
          "Why must zero not mean cancellation in this helper?",
          "Waarom mag nul bij deze helper niet annuleren betekenen?",
        ],
      ),
    ],
    starter: readerFiles(
      "def read_between(low, high):\n    return None\n",
      "reader.read_between(1, 5)",
    ),
    solution: readerFiles(
      'def read_between(low, high):\n    while True:\n        try:\n            raw = input(f"Whole number {low}..{high}, or cancel: ")\n        except EOFError:\n            return None\n        if raw.strip().lower() == "cancel":\n            return None\n        try:\n            value = int(raw)\n        except ValueError:\n            print("Enter a whole number")\n            continue\n        if low <= value <= high:\n            return value\n        print(f"Use {low} through {high}")\n',
      "reader.read_between(1, 5)",
    ),
    inputs: ["3"],
    tasks: [
      C(
        "recovery-review",
        [
          "Implement read_between(low, high) to retry invalid input and return an in-range integer. Give feedback on every rejected attempt.",
          "Implementeer read_between(low, high) om ongeldige invoer te herhalen en een geheel getal binnen bereik terug te geven. Geef feedback bij elke afgewezen poging.",
        ],
        "result == 3",
        [
          [
            "Write down the successful, rejected and cancelled paths first.",
            "Schrijf eerst de geslaagde, afgewezen en geannuleerde routes op.",
          ],
          [
            "Use int inside a specific try/except, then compare both limits.",
            "Gebruik int in een specifieke try/except en vergelijk daarna beide grenzen.",
          ],
          [
            "if low <= value <= high:\n    return value",
            "if low <= value <= high:\n    return value",
          ],
        ],
        [
          "Use the caller’s limits, including negative ranges and exact endpoints.",
          "Gebruik de grenzen van de aanroeper, ook negatieve bereiken en exacte eindpunten.",
        ],
        [
          R(
            "read_between",
            [-2, 2],
            ["bad", "3", "0"],
            "_return == 0 and len(_call_stdout.splitlines()) >= 2",
          ),
          R("read_between", [4, 4], ["3", "4"], "_return == 4"),
          R("read_between", [1, 5], ["2.5", "1"], "_return == 1"),
        ],
      ),
      C(
        "recovery-review",
        [
          "Handle cancel with case/whitespace normalisation, and handle EOF after any number of attempts.",
          "Handel cancel af met hoofdletter- en witruimtenormalisatie en handel EOF na elk aantal pogingen af.",
        ],
        "callable(reader.read_between)",
        [
          [
            "Cancellation is a command, not a bad number.",
            "Annuleren is een commando, geen slecht getal.",
          ],
          [
            "Recognise cancel before conversion and keep EOF handling around input.",
            "Herken cancel vóór omzetting en houd EOF-afhandeling rond input.",
          ],
          [
            'if raw.strip().lower() == "cancel":\n    return None',
            'if raw.strip().lower() == "cancel":\n    return None',
          ],
        ],
        [
          "The helper must always provide a deliberate exit route.",
          "De helper moet altijd een bewuste uitweg bieden.",
        ],
        [
          R(
            "read_between",
            [1, 5],
            ["invalid", " Cancel "],
            "_return is None and _error is None",
          ),
          R("read_between", [1, 5], [], "_return is None and _error is None"),
        ],
      ),
    ],
    note: [
      "The helper owns the retry conversation while the caller owns the next action. Parameterised limits make the same code suitable for menus or game settings.",
      "De helper beheert het herhaalgesprek terwijl de aanroeper de volgende actie bepaalt. Grenzen als parameters maken dezelfde code geschikt voor menu’s of spelinstellingen.",
    ],
    experiment: [
      "Use this helper from a second main.py call with bounds -5 and -1. Revisit your early menu and describe how this input helper could improve it.",
      "Gebruik deze helper vanuit een tweede main.py-aanroep met grenzen -5 en -1. Bekijk je vroege menu opnieuw en beschrijf hoe deze invoerhelper het kan verbeteren.",
    ],
  }),
  lesson(12, 1, {
    explanation: [
      "Use dictionary keys to name information instead of remembering positions. A dictionary maps unique hashable keys to values.",
      "Gebruik dictionarysleutels om informatie te benoemen in plaats van posities te onthouden. Een dictionary koppelt unieke hashbare sleutels aan waarden.",
    ],
    sections: [
      S(
        "dictionaries empty-dictionaries valid-keys invalid-keys",
        ["Names instead of positions", "Namen in plaats van posities"],
        [
          '{} creates an empty dictionary. {"name": "Ada", "score": 2} pairs keys with values using colons. Strings and integers can be keys. A tuple can be a key if all its parts are hashable; a list or dictionary cannot. Invalid keys raise TypeError. A key identifies one entry, so repeating it replaces that entry rather than adding a duplicate.',
          '{} maakt een lege dictionary. {"name": "Ada", "score": 2} koppelt sleutels aan waarden met dubbele punten. Strings en gehele getallen kunnen sleutels zijn. Een tuple kan een sleutel zijn als alle onderdelen hashbaar zijn; een lijst of dictionary kan dat niet. Ongeldige sleutels geven TypeError. Een sleutel identificeert één item, dus herhalen vervangt dat item in plaats van een duplicaat toe te voegen.',
        ],
        'record = {}\nrecord["name"] = "Ada"\nrecord[(0, 0)] = "origin"\nprint(record["name"], record[(0, 0)])',
        "Ada origin\n",
        [
          "Why might a coordinate tuple work as a key while a coordinate list does not?",
          "Waarom kan een coördinatentuple als sleutel werken maar een coördinatenlijst niet?",
        ],
      ),
    ],
    starter:
      'def make_record(name):\n    return {}\n\ndef accepts_key(key):\n    return True\n\nprint(make_record("Jo"))\n',
    solution:
      'def make_record(name):\n    record = {}\n    record["name"] = name\n    record["score"] = 0\n    return record\n\ndef accepts_key(key):\n    try:\n        sample = {key: "value"}\n        return True\n    except TypeError:\n        return False\n\nprint(make_record("Jo"))\n',
    tasks: [
      C(
        "dictionaries empty-dictionaries",
        [
          "Build and return a record with name from the argument and score=0. Create a fresh dictionary per call.",
          "Maak en geef een record terug met name uit het argument en score=0. Maak per aanroep een nieuwe dictionary.",
        ],
        'make_record("Jo") == {"name":"Jo","score":0}',
        [
          [
            "Use keys to describe what each value means.",
            "Gebruik sleutels om te beschrijven wat elke waarde betekent.",
          ],
          [
            "Start from {} and assign the two keys, or use a literal.",
            "Begin met {} en wijs twee sleutels toe of gebruik een literal.",
          ],
          ['record["name"] = name', 'record["name"] = name'],
        ],
        [
          "Different calls should not share a record accidentally.",
          "Verschillende aanroepen mogen niet per ongeluk een record delen.",
        ],
        [
          F(
            "make_record",
            ["Mia"],
            '_return == {"name":"Mia","score":0} and _return is not make_record("Mia")',
          ),
        ],
      ),
      C(
        "valid-keys invalid-keys",
        [
          "Implement accepts_key by attempting a one-entry dictionary and catching TypeError; return a Boolean.",
          "Implementeer accepts_key door een dictionary met één item te proberen en TypeError op te vangen; geef een boolean terug.",
        ],
        'accepts_key("name") is True',
        [
          [
            "Let Python test the key’s actual contract.",
            "Laat Python de echte sleutelafspraak testen.",
          ],
          [
            'Try {key: "value"}; reject TypeError.',
            'Probeer {key: "value"}; wijs TypeError af.',
          ],
          [
            "except TypeError:\n    return False",
            "except TypeError:\n    return False",
          ],
        ],
        [
          "Checking only whether the object is a tuple is insufficient: its contents matter too.",
          "Alleen controleren of het object een tuple is volstaat niet: de inhoud telt ook.",
        ],
        [
          F("accepts_key", [[1, 2]], "_return is False"),
          F("accepts_key", [3], "_return is True"),
          {
            check:
              "accepts_key((1,2)) is True and accepts_key(([1],2)) is False",
          },
        ],
      ),
    ],
    note: [
      "Named fields make the record readable. The key test delegates hashability to the dictionary operation, covering nested invalid tuple contents correctly.",
      "Benoemde velden maken het record leesbaar. De sleuteltest laat hashbaarheid aan de dictionarybewerking over en behandelt ongeldige geneste tuple-inhoud correct.",
    ],
    experiment: [
      "Try a string, an integer, a tuple and a list as keys. Explain why immutability of the outer tuple alone is not sufficient.",
      "Probeer een string, een geheel getal, een tuple en een lijst als sleutel. Leg uit waarom onveranderlijkheid van de buitenste tuple alleen niet volstaat.",
    ],
  }),
  lesson(12, 2, {
    explanation: [
      "Update named fields without replacing unrelated information. The order of assignments matters when two updates target the same key.",
      "Werk benoemde velden bij zonder niet-gerelateerde informatie te vervangen. De toewijzingsvolgorde telt wanneer twee updates dezelfde sleutel hebben.",
    ],
    sections: [
      S(
        "add-key update overwrite",
        ["Add or replace", "Voeg toe of vervang"],
        [
          "record[key] = value adds a missing key or replaces an existing value. record.update(other) applies several pairs with the same overwrite rule. It changes the dictionary and returns None. Fields not mentioned in an update remain unchanged.",
          "record[key] = value voegt een ontbrekende sleutel toe of vervangt een bestaande waarde. record.update(other) past meerdere paren toe met dezelfde overschrijfregel. Het verandert de dictionary en geeft None terug. Velden die niet in een update staan blijven ongewijzigd.",
        ],
        'record = {"score": 2, "team": "blue"}\nrecord["score"] = 5\nrecord.update({"active": True, "team": "red"})\nprint(record)',
        "{'score': 5, 'team': 'red', 'active': True}\n",
        ["Which assignment wins for team?", "Welke toewijzing wint voor team?"],
      ),
    ],
    starter:
      'def update_record(record, name, extras):\n    return record\n\nprint(update_record({"score": 4}, "Ada", {"team": "red"}))\n',
    solution:
      'def update_record(record, name, extras):\n    record["name"] = name\n    record["active"] = True\n    record.update(extras)\n    return record\n\nprint(update_record({"score": 4}, "Ada", {"team": "red"}))\n',
    tasks: [
      C(
        "add-key overwrite",
        [
          "In update_record, assign name and active=True on the supplied dictionary; preserve unrelated fields.",
          "Wijs in update_record name en active=True toe aan de meegegeven dictionary; behoud andere velden.",
        ],
        "callable(update_record)",
        [
          [
            "Update fields on the existing object.",
            "Werk velden op het bestaande object bij.",
          ],
          [
            "Assign by key instead of constructing a replacement record.",
            "Wijs op sleutel toe in plaats van een vervangend record te maken.",
          ],
          ['record["name"] = name', 'record["name"] = name'],
        ],
        [
          "The caller’s dictionary should receive the changes.",
          "De dictionary van de aanroeper moet de wijzigingen ontvangen.",
        ],
        [
          F(
            "update_record",
            [{ score: 4, name: "Old" }, "New", {}],
            '_return is _args[0] and _return == {"score":4,"name":"New","active":True}',
          ),
        ],
      ),
      C(
        "update",
        [
          "Then apply extras with update and return the same dictionary. extras wins if it repeats a key.",
          "Pas daarna extras toe met update en geef dezelfde dictionary terug. extras wint als die een sleutel herhaalt.",
        ],
        'update_record({},"Jo",{"team":"blue"}) == {"name":"Jo","active":True,"team":"blue"}',
        [
          [
            "The order is part of the requirement.",
            "De volgorde is deel van de eis.",
          ],
          [
            "Apply extras after the fixed field assignments.",
            "Pas extras na de vaste veldtoewijzingen toe.",
          ],
          ["record.update(extras)", "record.update(extras)"],
        ],
        [
          "Do not return the result of update; it is None.",
          "Geef het resultaat van update niet terug; dat is None.",
        ],
        [
          F(
            "update_record",
            [{}, "Ada", { name: "Guest", active: false }],
            '_return == {"name":"Guest","active":False} and _return is _args[0]',
          ),
        ],
      ),
    ],
    note: [
      "The existing dictionary retains unmentioned fields. Applying extras last makes the override policy explicit and predictable.",
      "De bestaande dictionary behoudt niet-genoemde velden. extras als laatste toepassen maakt het overschrijfbeleid expliciet en voorspelbaar.",
    ],
    experiment: [
      "Move update before the two assignments and predict a repeated name field. Explain why that changes the contract.",
      "Verplaats update vóór de twee toewijzingen en voorspel een herhaald name-veld. Leg uit waarom dit de afspraak verandert.",
    ],
  }),
  lesson(12, 3, {
    explanation: [
      "Choose direct lookup when a key is required and safe lookup when missing information is expected. Distinguish deleting an entry from reading its value.",
      "Kies directe toegang als een sleutel verplicht is en veilige toegang als ontbrekende informatie verwacht wordt. Onderscheid een item verwijderen van zijn waarde lezen.",
    ],
    sections: [
      S(
        "get-key key-error get delete-key dict-pop",
        ["Missing is not zero", "Ontbrekend is niet nul"],
        [
          "record[key] raises KeyError when absent. record.get(key, default) returns a fallback without adding the key. A stored 0 or None is still an existing value. del record[key] deletes without returning a value. record.pop(key, default) removes and returns a value, or the default when absent.",
          "record[key] geeft KeyError bij afwezigheid. record.get(key, standaard) geeft een terugvalwaarde zonder de sleutel toe te voegen. Een opgeslagen 0 of None is nog steeds een bestaande waarde. del record[key] verwijdert zonder waarde terug te geven. record.pop(key, standaard) verwijdert en geeft een waarde terug, of de standaard bij afwezigheid.",
        ],
        'record = {"score": 0, "temporary": 9}\nprint(record.get("score", 5))\nprint(record.get("missing", 5))\nremoved = record.pop("temporary")\nprint(removed, record)',
        "0\n5\n9 {'score': 0}\n",
        [
          "Why does the fallback not replace the stored zero?",
          "Waarom vervangt de terugvalwaarde de opgeslagen nul niet?",
        ],
      ),
    ],
    starter:
      'def required(record, key):\n    return None\n\ndef optional(record, key, fallback):\n    return None\n\ndef discard(record, key):\n    return None\n\ndef delete_note(record):\n    pass\n\nprint(optional({}, "score", 0))\n',
    solution:
      'def required(record, key):\n    return record[key]\n\ndef optional(record, key, fallback):\n    return record.get(key, fallback)\n\ndef discard(record, key):\n    return record.pop(key, None)\n\ndef delete_note(record):\n    if "note" in record:\n        del record["note"]\n\nprint(optional({}, "score", 0))\n',
    tasks: [
      C(
        "get-key key-error get",
        [
          "Implement required with direct lookup and optional with get(key, fallback), preserving existing zero and None values.",
          "Implementeer required met directe toegang en optional met get(key, fallback); behoud bestaande nul- en None-waarden.",
        ],
        'optional({},"score",0) == 0',
        [
          [
            "A fallback depends on absence, not truthiness.",
            "Een terugvalwaarde hangt van afwezigheid af, niet van waarachtigheid.",
          ],
          [
            "Use record[key] for required and record.get for optional.",
            "Gebruik record[key] voor required en record.get voor optional.",
          ],
          [
            "return record.get(key, fallback)",
            "return record.get(key, fallback)",
          ],
        ],
        [
          "Do not use record.get(key) or fallback: it replaces valid false-like values.",
          "Gebruik niet record.get(key) or fallback: dat vervangt geldige onwaarachtige waarden.",
        ],
        [
          F("required", [{ x: 2 }, "x"], "_return == 2"),
          F("required", [{}, "x"], '_error == "KeyError"'),
          F("optional", [{ x: 0 }, "x", 9], "_return == 0"),
          F("optional", [{ x: null }, "x", 9], "_return is None"),
        ],
      ),
      C(
        "dict-pop",
        [
          "In discard, remove key and return its value, or None if missing.",
          "Verwijder in discard key en geef zijn waarde terug, of None als die ontbreekt.",
        ],
        "callable(discard)",
        [
          [
            "Use the method that both removes and returns.",
            "Gebruik de methode die verwijdert én teruggeeft.",
          ],
          ["Pass None as the pop fallback.", "Geef None als pop-terugval mee."],
          ["return record.pop(key, None)", "return record.pop(key, None)"],
        ],
        [
          "The removed key must no longer be present.",
          "De verwijderde sleutel mag niet meer aanwezig zijn.",
        ],
        [
          F(
            "discard",
            [{ x: 4, y: 2 }, "x"],
            '_return == 4 and _args[0] == {"y":2}',
          ),
          F("discard", [{}, "x"], "_return is None and _error is None"),
        ],
      ),
      C(
        "delete-key",
        [
          "In delete_note, use del to remove note when present; missing note is allowed. Return no value.",
          "Gebruik in delete_note del om note te verwijderen als aanwezig; ontbrekende note is toegestaan. Geef geen waarde terug.",
        ],
        "callable(delete_note)",
        [
          [
            "Check membership before deleting an optional field.",
            "Controleer lidmaatschap vóór een optioneel veld te verwijderen.",
          ],
          [
            "A dictionary membership test checks keys.",
            "Een lidmaatschapstest bij een dictionary controleert sleutels.",
          ],
          [
            'if "note" in record:\n    del record["note"]',
            'if "note" in record:\n    del record["note"]',
          ],
        ],
        [
          "Do not delete unrelated fields or raise on an absent note.",
          "Verwijder geen andere velden en geef geen fout bij een ontbrekende notitie.",
        ],
        [
          F(
            "delete_note",
            [{ note: "hi", score: 1 }],
            '_return is None and _args[0] == {"score":1}',
          ),
          F("delete_note", [{}], "_return is None and _error is None"),
        ],
      ),
    ],
    note: [
      "Each function states a different absence policy. get only reads, pop reads and removes, and del removes without a return value.",
      "Elke functie verwoordt een ander afwezigheidsbeleid. get leest alleen, pop leest en verwijdert en del verwijdert zonder terugkeerwaarde.",
    ],
    experiment: [
      "Create a dictionary with a missing key, a zero value and a None value. Explain all three optional results with fallback=9.",
      "Maak een dictionary met een ontbrekende sleutel, een nulwaarde en een None-waarde. Verklaar alle drie optional-resultaten met fallback=9.",
    ],
  }),
  lesson(12, 4, {
    explanation: [
      "Inspect keys and values separately, then process their associations together. Use items to keep each label paired with its own score.",
      "Bekijk sleutels en waarden apart en verwerk daarna hun koppelingen samen. Gebruik items om elk label bij zijn eigen score te houden.",
    ],
    sections: [
      S(
        "keys values items dictionary-iteration",
        ["Views and pairs", "Weergaven en paren"],
        [
          "keys(), values() and items() return views of a dictionary. Convert with list(...) when a snapshot list is needed. Iterating a dictionary directly visits keys; iterating items() gives (key, value) pairs that can be unpacked. Python dictionaries preserve insertion order. Do not add or remove keys while traversing a live view.",
          "keys(), values() en items() geven weergaven van een dictionary terug. Zet om met list(...) als een momentopnamelijst nodig is. Een dictionary direct doorlopen bezoekt sleutels; items() doorlopen geeft (sleutel, waarde)-paren die uitgepakt kunnen worden. Python-dictionaries behouden invoegvolgorde. Voeg geen sleutels toe en verwijder ze niet terwijl je een actuele weergave doorloopt.",
        ],
        'scores = {"Ada": 2, "Bo": 4}\nprint(list(scores.keys()))\nfor name, score in scores.items():\n    print(name, score)',
        "['Ada', 'Bo']\nAda 2\nBo 4\n",
        ["What does each loop variable hold?", "Wat bevat elke lusvariabele?"],
      ),
    ],
    starter:
      'def describe(scores):\n    return [], [], []\n\nprint(describe({"Ada": 2, "Bo": 4}))\n',
    solution:
      'def describe(scores):\n    names = list(scores.keys())\n    values = list(scores.values())\n    lines = []\n    for name, score in scores.items():\n        lines.append(f"{name}: {score}")\n    return names, values, lines\n\nprint(describe({"Ada": 2, "Bo": 4}))\n',
    tasks: [
      C(
        "keys values",
        [
          "Return names and values as snapshot lists in dictionary order, as the first two tuple items.",
          "Geef names en values als momentopnamelijsten in dictionaryvolgorde terug als eerste twee tuple-items.",
        ],
        'describe({"Ada":2,"Bo":4})[:2] == (["Ada","Bo"],[2,4])',
        [
          [
            "Views are not lists until converted.",
            "Weergaven zijn pas lijsten na omzetting.",
          ],
          [
            "Use list(scores.keys()) and list(scores.values()).",
            "Gebruik list(scores.keys()) en list(scores.values()).",
          ],
          ["names = list(scores.keys())", "names = list(scores.keys())"],
        ],
        [
          "Keep labels and values in their shared insertion order.",
          "Houd labels en waarden in hun gedeelde invoegvolgorde.",
        ],
        [F("describe", [{ z: 0, a: 2 }], '_return[:2] == (["z","a"],[0,2])')],
      ),
      C(
        "items dictionary-iteration",
        [
          'Build lines using items and return them as the third item, each formatted "name: score".',
          'Maak lines met items en geef die als derde item terug, elk geformatteerd als "naam: score".',
        ],
        'describe({"Ada":2,"Bo":4})[2] == ["Ada: 2","Bo: 4"]',
        [
          [
            "Each pair already contains both needed values.",
            "Elk paar bevat beide benodigde waarden al.",
          ],
          [
            "Unpack name and score in the for header.",
            "Pak name en score in de for-kop uit.",
          ],
          [
            "for name, score in scores.items():",
            "for name, score in scores.items():",
          ],
        ],
        [
          "Do not zip independently sorted names and scores; that breaks associations.",
          "Combineer geen apart gesorteerde namen en scores; dat verbreekt koppelingen.",
        ],
        [
          F("describe", [{}], "_return == ([],[],[])"),
          F("describe", [{ B: -1, A: 5 }], '_return[2] == ["B: -1","A: 5"]'),
        ],
      ),
    ],
    note: [
      "The snapshots are useful for separate inspection. items preserves the relationship for reporting without repeated lookups or parallel-index bookkeeping.",
      "De momentopnamen zijn nuttig voor apart bekijken. items behoudt de relatie voor rapportage zonder herhaalde toegang of parallelle indexadministratie.",
    ],
    experiment: [
      "Create a keys view and a list snapshot, then add a key after iteration ends. Compare the view and snapshot and explain the difference.",
      "Maak een keys-weergave en een lijstkopie en voeg na het doorlopen een sleutel toe. Vergelijk weergave en kopie en verklaar het verschil.",
    ],
  }),
  lesson(12, 5, {
    explanation: [
      "Derive a new dictionary using a comprehension. Keep the original mapping available for comparison.",
      "Leid met een comprehensie een nieuwe dictionary af. Houd de oorspronkelijke mapping beschikbaar voor vergelijking.",
    ],
    sections: [
      S(
        "dictionary-comprehensions",
        ["Transform pairs", "Transformeer paren"],
        [
          "{key_expression: value_expression for key, value in mapping.items()} creates a new dictionary. A trailing if filters entries. Unlike a list comprehension, the result specifies both a key and a value separated by a colon. If produced keys repeat, the later value wins.",
          "{sleutelexpressie: waardeexpressie for sleutel, waarde in mapping.items()} maakt een nieuwe dictionary. Een afsluitende if filtert items. Anders dan een lijstcomprehensie bevat het resultaat zowel een sleutel als een waarde gescheiden door een dubbele punt. Bij herhaalde sleutels wint de latere waarde.",
        ],
        'scores = {"Ada": 2, "Bo": 5}\nboosted = {name: score + 1 for name, score in scores.items() if score >= 3}\nprint(boosted)',
        "{'Bo': 6}\n",
        [
          "Is filtering done before or after the bonus is applied?",
          "Wordt er vóór of na toepassing van de bonus gefilterd?",
        ],
      ),
    ],
    starter:
      'def qualified(scores, minimum, bonus):\n    return {}\n\nprint(qualified({"A": 2, "B": 5}, 3, 10))\n',
    solution:
      'def qualified(scores, minimum, bonus):\n    return {name: score + bonus for name, score in scores.items() if score >= minimum}\n\nprint(qualified({"A": 2, "B": 5}, 3, 10))\n',
    tasks: [
      C(
        "dictionary-comprehensions",
        [
          "Use a dictionary comprehension to keep scores >= minimum, retaining names and adding bonus to each retained score.",
          "Gebruik een dictionarycomprehensie om scores >= minimum te behouden, met dezelfde namen en bonus bij elke behouden score.",
        ],
        'qualified({"A":2,"B":5},3,10) == {"B":15} and any(isinstance(n,_ast.DictComp) for n in _ast.walk(_ast.parse(_source)))',
        [
          [
            "The result needs a key:value pair.",
            "Het resultaat heeft een sleutel:waarde-paar nodig.",
          ],
          [
            "Filter the original score, not the boosted score.",
            "Filter de oorspronkelijke score, niet de verhoogde score.",
          ],
          [
            "{name: score + bonus for name, score in scores.items() if score >= minimum}",
            "{name: score + bonus for name, score in scores.items() if score >= minimum}",
          ],
        ],
        [
          "The exact minimum qualifies; a bonus must not rescue an otherwise excluded score.",
          "Het exacte minimum voldoet; een bonus mag een anders uitgesloten score niet redden.",
        ],
        [
          F("qualified", [{ A: 3, B: 2 }, 3, 10], '_return == {"A":13}'),
          F(
            "qualified",
            [{ A: -2, B: 0 }, -2, -1],
            '_return == {"A":-3,"B":-1}',
          ),
        ],
      ),
      C(
        "dictionary-comprehensions",
        [
          "Return a new mapping, preserving the input even when nothing qualifies.",
          "Geef een nieuwe mapping terug en behoud de invoer ook als niets voldoet.",
        ],
        "qualified({},0,1) == {}",
        [
          [
            "Comprehensions create a result instead of modifying the source.",
            "Comprehensies maken een resultaat in plaats van de bron te wijzigen.",
          ],
          [
            "Do not assign new scores back into scores.",
            "Wijs nieuwe scores niet terug aan scores toe.",
          ],
          [
            "Return the comprehension directly.",
            "Geef de comprehensie direct terug.",
          ],
        ],
        [
          "A filtered-out entry must remain in the original dictionary.",
          "Een weggefilterd item moet in de oorspronkelijke dictionary blijven.",
        ],
        [
          F(
            "qualified",
            [{ A: 1 }, 5, 2],
            '_return == {} and _args[0] == {"A":1} and _return is not _args[0]',
          ),
        ],
      ),
    ],
    note: [
      "The original score controls inclusion; the bonus changes only the returned value. This separation makes filtering and transformation predictable.",
      "De oorspronkelijke score bepaalt opname; de bonus verandert alleen de teruggegeven waarde. Deze scheiding maakt filteren en transformeren voorspelbaar.",
    ],
    experiment: [
      "Change bonus without changing minimum. Explain why the set of retained names must stay the same.",
      "Wijzig bonus zonder minimum te wijzigen. Leg uit waarom de verzameling behouden namen gelijk moet blijven.",
    ],
  }),
  lesson(12, 6, {
    explanation: [
      "Maintain a scoreboard from a batch of (name, delta) updates. Start missing names at zero, apply repeated names in order, and return a new dictionary without changing the original. Negative and zero deltas are valid.",
      "Beheer een scorebord uit een reeks (naam, wijziging)-updates. Begin ontbrekende namen op nul, pas herhaalde namen op volgorde toe en geef een nieuwe dictionary terug zonder het origineel te veranderen. Negatieve en nulwijzigingen zijn geldig.",
    ],
    sections: [
      S(
        "dictionary-review",
        ["Accumulate by name", "Tel per naam op"],
        [
          "A dictionary lets each name keep its own total. A copied dictionary provides an independent result for flat numeric values. Use the old value or a missing-key default before adding a delta. Tuple unpacking makes each update easy to read.",
          "Een dictionary laat elke naam een eigen totaal bijhouden. Een gekopieerde dictionary geeft een onafhankelijk resultaat bij vlakke numerieke waarden. Gebruik de oude waarde of een standaard voor een ontbrekende sleutel voordat je een wijziging optelt. Tuples uitpakken maakt elke update leesbaar.",
        ],
        'counts = {"red": 2}\ncounts["blue"] = counts.get("blue", 0) + 1\nprint(counts)',
        "{'red': 2, 'blue': 1}\n",
        [
          "How would the same expression behave for red?",
          "Hoe zou dezelfde expressie werken voor red?",
        ],
      ),
    ],
    starter:
      'def apply_updates(scores, updates):\n    pass\n\nprint(apply_updates({"Ada": 2}, [("Bo", 3), ("Ada", -1), ("Bo", 2)]))\n',
    solution:
      'def apply_updates(scores, updates):\n    result = scores.copy()\n    for name, delta in updates:\n        result[name] = result.get(name, 0) + delta\n    return result\n\nprint(apply_updates({"Ada": 2}, [("Bo", 3), ("Ada", -1), ("Bo", 2)]))\n',
    tasks: [
      C(
        "dictionary-review",
        [
          "Apply all updates and return totals for old and newly encountered names.",
          "Pas alle updates toe en geef totalen terug voor oude en nieuw aangetroffen namen.",
        ],
        'apply_updates({"Ada":2},[("Bo",3),("Ada",-1),("Bo",2)]) == {"Ada":1,"Bo":5}',
        [
          [
            "Each update builds on the latest total for that name.",
            "Elke update bouwt voort op het nieuwste totaal voor die naam.",
          ],
          [
            "Read from result, not the original scores, inside the loop.",
            "Lees binnen de lus uit result, niet uit het oorspronkelijke scores.",
          ],
          [
            "result[name] = result.get(name, 0) + delta",
            "result[name] = result.get(name, 0) + delta",
          ],
        ],
        [
          "Repeated names must accumulate rather than overwrite with the last delta.",
          "Herhaalde namen moeten optellen in plaats van overschrijven met de laatste wijziging.",
        ],
        [
          F(
            "apply_updates",
            [
              {},
              [
                ["X", 2],
                ["X", -3],
                ["Y", 0],
              ],
            ],
            '_return == {"X":-1,"Y":0}',
          ),
        ],
      ),
      C(
        "dictionary-review",
        [
          "Preserve both inputs and return an independent dictionary even for an empty update batch.",
          "Behoud beide invoerwaarden en geef ook bij een lege updatereeks een onafhankelijke dictionary terug.",
        ],
        "apply_updates({},[]) == {}",
        [
          [
            "Make the result before processing updates.",
            "Maak het resultaat voordat je updates verwerkt.",
          ],
          [
            "A shallow copy is enough for these numeric values.",
            "Een oppervlakkige kopie volstaat voor deze numerieke waarden.",
          ],
          ["result = scores.copy()", "result = scores.copy()"],
        ],
        [
          "Do not accidentally turn an alias into a destructive update.",
          "Maak van een alias niet per ongeluk een vernietigende update.",
        ],
        [
          F(
            "apply_updates",
            [{ A: 2 }, [["A", 3]]],
            '_return == {"A":5} and _args[0] == {"A":2} and _args[1] == [["A",3]]',
          ),
          F(
            "apply_updates",
            [{ A: 2 }, []],
            '_return == {"A":2} and _return is not _args[0]',
          ),
        ],
      ),
    ],
    note: [
      "The result dictionary becomes the evolving state during the batch. Missing names get a starting value only once, and the caller’s earlier snapshot remains intact.",
      "De resultaatdictionary wordt de veranderende toestand tijdens de reeks. Ontbrekende namen krijgen slechts één keer een beginwaarde en de eerdere momentopname van de aanroeper blijft intact.",
    ],
    experiment: [
      "Apply the same batch twice, once using the original scores and once using the first result. Explain why the totals differ.",
      "Pas dezelfde reeks twee keer toe, één keer met de oorspronkelijke scores en één keer met het eerste resultaat. Leg uit waarom de totalen verschillen.",
    ],
  }),
];
