import { focus } from "./focused.mjs";
import { call } from "./authoring.mjs";
const f = (slug, s) => {
  if (["retry", "cancel-safely"].includes(slug)) {
    for (const task of s.tasks)
      for (const probe of task.probes || []) probe.definitionsOnly = true;
  }
  return focus(10, slug, s);
};
export const activities = [
  f("diagnose", {
    title: ["Name the kind of mistake", "Benoem het soort fout"],
    topics: "runtime-errors logic-errors tracebacks",
    practices: "syntax-errors name-error",
    requires: "functions-review floor-division",
    why: [
      "Different mistakes need different investigations. A running program can still give the wrong answer.",
      "Verschillende fouten vragen om verschillend onderzoek. Een werkend programma kan nog steeds het verkeerde antwoord geven.",
    ],
    teach: [
      'Syntax errors prevent Python from understanding the program. Runtime errors happen while executing a valid statement. Logic errors give an unintended result without necessarily raising an exception. For a traceback, read the final exception type and message, then the nearest line in your code. For example, calling int("cat") ends with ValueError; its location points to the failed conversion. A NameError names an unavailable variable. Reproduce one small case before editing.',
      'Syntaxfouten verhinderen dat Python het programma begrijpt. Uitvoeringsfouten ontstaan tijdens een geldige instructie. Logische fouten geven een onbedoeld resultaat zonder noodzakelijk een uitzondering. Lees bij een traceback het laatste uitzonderingstype en bericht, daarna de dichtstbijzijnde regel in je code. int("cat") eindigt bijvoorbeeld met ValueError; de locatie wijst naar de mislukte omzetting. Een NameError benoemt een niet-beschikbare variabele. Herhaal één klein geval voordat je wijzigt.',
    ],
    rule: [
      "A wrong result with no exception is still a bug.",
      "Een verkeerd resultaat zonder uitzondering is nog steeds een fout.",
    ],
    example: "print(7 // 2)\nprint(7 / 2)",
    output: "3\n3.5\n",
    predict: [
      "Which operator preserves the fractional average?",
      "Welke operator bewaart het gebroken gemiddelde?",
    ],
    starter: "def average(total, count):\n    return total // count\n",
    solution: "def average(total, count):\n    return total / count\n",
    tasks: [
      {
        task: [
          "Repair average(total, count) for count > 0 so fractional results are preserved.",
          "Herstel average(total, count) voor count > 0 zodat gebroken resultaten behouden blijven.",
        ],
        check: "callable(average)",
        help: [
          "This is a logic error: compare what / and // mean.",
          "Dit is een logische fout: vergelijk de betekenis van / en //.",
        ],
        fragment: "return total / count",
        probes: [
          call("average", [7, 2], "_return == 3.5"),
          call("average", [1, 4], "_return == 0.25"),
          call("average", [-3, 2], "_return == -1.5"),
        ],
      },
    ],
    change: [
      "Explain why changing the test from 7/2 to 8/2 could hide this bug.",
      "Leg uit waarom een test met 8/2 in plaats van 7/2 deze fout kan verbergen.",
    ],
    explain: [
      "Both divisions run, but floor division discards the fractional part needed for an average.",
      "Beide delingen werken, maar gehele deling verliest het gebroken deel dat een gemiddelde nodig heeft.",
    ],
    guidance: "adapt",
  }),
  f("value-error", {
    title: [
      "Recover from a conversion failure",
      "Herstel een mislukte omzetting",
    ],
    topics: "try-except value-error",
    requires: "float-conversion indentation",
    why: [
      "People sometimes type text where a number is expected. Handle this expected failure with a specific exception.",
      "Mensen typen soms tekst waar een getal wordt verwacht. Vang deze verwachte fout op met een specifieke uitzondering.",
    ],
    teach: [
      "try: starts a block whose statements may fail. except ValueError: runs only if that block raises ValueError. A successful try skips this handler. Keep the try block small so its purpose is clear. Do not use a bare except: it hides unrelated programming mistakes. Code after the handler continues normally.",
      "try: begint een blok waarvan instructies kunnen mislukken. except ValueError: draait alleen als dat blok ValueError veroorzaakt. Een geslaagde try slaat deze afhandeling over. Houd het try-blok klein zodat het doel duidelijk is. Gebruik geen losse except: die verbergt andere programmeerfouten. Code na de afhandeling gaat gewoon verder.",
    ],
    rule: [
      "Catch the failure you expect where it can happen.",
      "Vang de verwachte fout op waar die kan ontstaan.",
    ],
    example:
      'text = "oops"\ntry:\n    number = int(text)\n    print(number)\nexcept ValueError:\n    print("Whole number needed")\nprint("Still running")',
    output: "Whole number needed\nStill running\n",
    predict: [
      "Which print in the try block is skipped?",
      "Welke print in het try-blok wordt overgeslagen?",
    ],
    starter: "def parse_price(text):\n    return float(text)\n",
    solution:
      "def parse_price(text):\n    try:\n        return float(text)\n    except ValueError:\n        return None\n",
    tasks: [
      {
        task: [
          "Make parse_price(text) return a float for numeric text and None for invalid numeric text.",
          "Laat parse_price(text) een float teruggeven bij numerieke tekst en None bij ongeldige getaltekst.",
        ],
        check: "callable(parse_price)",
        help: [
          "Wrap only the conversion in try and catch ValueError.",
          "Zet alleen de omzetting in try en vang ValueError op.",
        ],
        fragment: "except ValueError:",
        probes: [
          call("parse_price", ["2.5"], "_return == 2.5"),
          call("parse_price", ["-3"], "_return == -3"),
          call("parse_price", ["cat"], "_return is None and _error is None"),
          call("parse_price", [""], "_return is None"),
        ],
      },
    ],
    change: [
      'Try " 0 " and explain why spaces around a numeric string can still convert.',
      'Probeer " 0 " en leg uit waarom spaties rond getaltekst omzetting niet verhinderen.',
    ],
    explain: [
      "float accepts valid numeric strings; only its expected ValueError becomes None.",
      "float accepteert geldige getaltekst; alleen de verwachte ValueError wordt None.",
    ],
  }),
  f("zero-division", {
    title: ["Handle division by zero", "Vang delen door nul op"],
    topics: "zero-division-recovery",
    practices: "zero-division-error",
    requires: "try-except return",
    why: [
      "Conversion is not the only runtime failure. Division by a numeric zero raises a different exception.",
      "Omzetting is niet de enige uitvoeringsfout. Delen door numerieke nul veroorzaakt een andere uitzondering.",
    ],
    teach: [
      "ZeroDivisionError is separate from ValueError. A zero denominator is valid numeric data, but the division is undefined. You can prevent the operation with an if guard or handle this specific exception. Here practise the exception form; later choose the clearest form for your program.",
      "ZeroDivisionError is iets anders dan ValueError. Een noemer nul is geldige numerieke invoer, maar de deling is niet gedefinieerd. Je kunt de bewerking voorkomen met een if-bewaking of deze specifieke uitzondering afhandelen. Oefen hier de uitzonderingsvorm; kies later de duidelijkste vorm voor je programma.",
    ],
    rule: [
      "Different operations can fail with different exception types.",
      "Verschillende bewerkingen kunnen verschillende uitzonderingstypen veroorzaken.",
    ],
    example:
      'try:\n    print(6 / 0)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")',
    output: "Cannot divide by zero\n",
    predict: [
      "Would except ValueError catch this failure?",
      "Vangt except ValueError deze fout op?",
    ],
    starter: "def portion(total, people):\n    return total / people\n",
    solution:
      "def portion(total, people):\n    try:\n        return total / people\n    except ZeroDivisionError:\n        return None\n",
    tasks: [
      {
        task: [
          "Use except ZeroDivisionError in portion to return None for zero people; keep ordinary division working.",
          "Gebruik except ZeroDivisionError in portion om None terug te geven bij nul personen; behoud gewone deling.",
        ],
        check:
          'any(isinstance(n,_ast.ExceptHandler) and isinstance(n.type,_ast.Name) and n.type.id == "ZeroDivisionError" for n in _ast.walk(_ast.parse(_source)))',
        help: [
          "Keep the division in try and return None from the specific handler.",
          "Houd de deling in try en geef None terug vanuit de specifieke afhandeling.",
        ],
        fragment: "except ZeroDivisionError:",
        probes: [
          call("portion", [8, 0], "_error is None and _return is None"),
          call("portion", [0, 2], "_return == 0"),
          call("portion", [7, 2], "_return == 3.5"),
        ],
      },
    ],
    change: [
      "Compare 0/2 and 2/0: which operand makes the difference?",
      "Vergelijk 0/2 en 2/0: welk getal maakt het verschil?",
    ],
    explain: [
      "The denominator, not the numerator, determines whether division is defined.",
      "De noemer bepaalt of delen mogelijk is, niet de teller.",
    ],
  }),
  f("validate", {
    title: [
      "A number can still be invalid",
      "Een getal kan nog steeds ongeldig zijn",
    ],
    topics: "validation",
    requires: "value-error early-return",
    why: [
      "Parsing asks whether text is numeric. Validation asks whether that number is allowed by the application.",
      "Ontleden vraagt of tekst numeriek is. Validatie vraagt of dat getal volgens de toepassing is toegestaan.",
    ],
    teach: [
      'Converting "-2" succeeds, but a negative ticket count may be forbidden. Catch conversion failures first; after successful conversion, check domain rules with comparisons. Keep zero separate from None: zero may be a valid answer, so if not value is often the wrong test.',
      'Omzetten van "-2" lukt, maar een negatief aantal kaartjes kan verboden zijn. Vang eerst omzettingsfouten op; controleer na geslaagde omzetting de inhoudelijke regels met vergelijkingen. Houd nul gescheiden van None: nul kan geldig zijn, dus if not value is vaak de verkeerde test.',
    ],
    rule: [
      "Conversion and permission are two separate checks.",
      "Omzetting en toestemming zijn twee aparte controles.",
    ],
    example:
      'text = "-2"\ntry:\n    age = int(text)\nexcept ValueError:\n    age = None\nif age is None:\n    print("Not numeric")\nelif age < 0:\n    print("Out of range")\nelse:\n    print("Allowed")',
    output: "Out of range\n",
    predict: ["Which check rejects -2?", "Welke controle keurt -2 af?"],
    starter: "",
    solution:
      "def parse_percent(text):\n    try:\n        value = float(text)\n    except ValueError:\n        return None\n    if 0 <= value <= 100:\n        return value\n    return None\n",
    tasks: [
      {
        task: [
          "Implement parse_percent(text): return a number from 0 through 100 inclusive, otherwise None.",
          "Implementeer parse_percent(text): geef een getal van 0 tot en met 100 terug, anders None.",
        ],
        check: "callable(parse_percent)",
        help: [
          "Convert first, then require value >= 0 and value <= 100.",
          "Zet eerst om en eis daarna value >= 0 en value <= 100.",
        ],
        fragment: "if value >= 0 and value <= 100:",
        probes: ["0", "100", "25.5"]
          .map((text) =>
            call("parse_percent", [text], `_return == ${Number(text)}`),
          )
          .concat(
            ["-1", "101", "bad", ""].map((text) =>
              call(
                "parse_percent",
                [text],
                "_return is None and _error is None",
              ),
            ),
          ),
      },
    ],
    change: [
      "Test both boundaries and one value just outside each boundary.",
      "Test beide grenzen en één waarde net buiten elke grens.",
    ],
    explain: [
      "The parser rejects malformed text; the range check rejects numeric values outside the allowed interval.",
      "De ontleder keurt ongeldige tekst af; de bereikcontrole keurt getallen buiten het toegestane interval af.",
    ],
    guidance: "independent",
  }),
  f("retry", {
    title: [
      "Try again after invalid input",
      "Probeer opnieuw na ongeldige invoer",
    ],
    topics: "retry-loops",
    requires: "value-error while continue",
    why: [
      "Recovery is more useful when the person can correct their answer without restarting the program.",
      "Herstel is nuttiger als iemand zijn antwoord kan verbeteren zonder het programma opnieuw te starten.",
    ],
    teach: [
      "Put the prompt inside the loop so every retry reads a new answer. On ValueError, show a short message and continue to the next iteration. A successful conversion returns from the function and therefore leaves the loop. An input statement outside the loop would keep converting the same bad text forever.",
      "Zet de vraag binnen de lus zodat elke nieuwe poging een nieuw antwoord leest. Toon bij ValueError een kort bericht en ga met continue naar de volgende iteratie. Een geslaagde omzetting keert terug uit de functie en verlaat daardoor de lus. Een input buiten de lus blijft dezelfde verkeerde tekst eindeloos omzetten.",
    ],
    rule: [
      "A retry needs fresh input and a clear successful exit.",
      "Een nieuwe poging heeft nieuwe invoer en een duidelijke geslaagde uitgang nodig.",
    ],
    example:
      'def parse_or_none(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None\nprint(parse_or_none("bad"))\nprint(parse_or_none("4"))',
    output: "None\n4\n",
    predict: [
      "Why can the same function recover on its second call?",
      "Waarom kan dezelfde functie herstellen bij de tweede aanroep?",
    ],
    starter:
      "def read_count():\n    # Read repeatedly until an integer is supplied.\n    return None\n",
    solution:
      'def read_count():\n    while True:\n        text = input("Count: ")\n        try:\n            return int(text)\n        except ValueError:\n            print("Try an integer")\n',
    tasks: [
      {
        task: [
          "Implement read_count(): prompt Count: until int conversion succeeds, print Try an integer on each failure, then return the integer.",
          "Implementeer read_count(): vraag Count: tot int-omzetting lukt, druk bij elke fout Try an integer af en geef daarna het gehele getal terug.",
        ],
        check: "callable(read_count)",
        help: [
          "Place input inside while True and return only after successful conversion.",
          "Zet input binnen while True en keer alleen terug na een geslaagde omzetting.",
        ],
        fragment: "return int(text)",
        probes: [
          call(
            "read_count",
            [],
            '_return == 3 and _call_stdout.count("Try an integer") == 1',
            { stdin: ["bad", "3"] },
          ),
          call("read_count", [], "_return == -2", { stdin: ["", "1.5", "-2"] }),
          call("read_count", [], "_return == 0", { stdin: ["0"] }),
        ],
      },
    ],
    change: [
      "Test two invalid answers in a row before a valid one.",
      "Test twee ongeldige antwoorden achter elkaar vóór een geldig antwoord.",
    ],
    explain: [
      "Every iteration reads again. Returning a converted integer ends the function immediately.",
      "Elke iteratie leest opnieuw. Een omgezet geheel getal teruggeven beëindigt de functie direct.",
    ],
  }),
  f("cancel-safely", {
    title: ["Give every retry a way out", "Geef elke herhaling een uitgang"],
    topics: "cancellation end-of-input recovery-review",
    practices: "functions-review normalisation break validation",
    requires: "retry-loops none normalisation",
    guidance: "independent",
    minutes: 25,
    why: [
      "Build the input helper you will need for a friendly interactive program. A person must be able to quit even after a mistake.",
      "Bouw de invoerhulp die je nodig hebt voor een vriendelijk interactief programma. Iemand moet ook na een fout kunnen stoppen.",
    ],
    teach: [
      "Check a normalised quit command before converting the answer. An empty input line is text and is different from end-of-input: input raises EOFError when no more input is available. In this terminal use the End input control to test that case. Catch EOFError around input, and ValueError around conversion. Returning None signals cancellation; returning 0.0 means a valid number.",
      "Controleer een genormaliseerd stopcommando vóór omzetting. Een lege invoerregel is tekst en verschilt van einde invoer: input veroorzaakt EOFError als geen invoer meer beschikbaar is. Gebruik in deze terminal de bediening voor einde invoer om dat te testen. Vang EOFError rond input op en ValueError rond omzetting. None teruggeven betekent annuleren; 0.0 teruggeven betekent een geldig getal.",
    ],
    rule: [
      "Check cancellation before parsing; never confuse zero with cancellation.",
      "Controleer annuleren vóór ontleden; verwar nul nooit met annuleren.",
    ],
    example:
      'def convert(text):\n    if text.strip().lower() == "quit":\n        return None\n    return float(text)\nprint(convert(" QUIT "))\nprint(convert("0"))',
    output: "None\n0.0\n",
    predict: [
      "Why must the quit check come before float?",
      "Waarom moet de quit-controle vóór float komen?",
    ],
    starter: "",
    solution:
      'def read_number():\n    while True:\n        try:\n            text = input("Number or quit: ").strip().lower()\n        except EOFError:\n            return None\n        if text == "quit":\n            return None\n        try:\n            return float(text)\n        except ValueError:\n            print("Try a number")\n',
    tasks: [
      {
        task: [
          "Define read_number() to retry invalid numeric text and return a float after a valid answer. Print Try a number on each conversion failure.",
          "Definieer read_number() om ongeldige getaltekst opnieuw te vragen en na een geldig antwoord een float terug te geven. Druk bij elke omzettingsfout Try a number af.",
        ],
        check: "callable(read_number)",
        help: [
          "Use a loop with a new input each time and a specific ValueError handler.",
          "Gebruik een lus met telkens nieuwe invoer en een specifieke ValueError-afhandeling.",
        ],
        fragment: "except ValueError:",
        probes: [
          call(
            "read_number",
            [],
            '_return == -2.5 and _call_stdout.count("Try a number") == 1',
            { stdin: ["bad", "-2.5"] },
          ),
          call("read_number", [], "_return == 0.0", { stdin: ["0"] }),
        ],
      },
      {
        task: [
          "Return None for quit with any surrounding spaces/case, and for end-of-input.",
          "Geef None terug voor quit met willekeurige spaties/hoofdletters en voor einde invoer.",
        ],
        check: "callable(read_number)",
        help: [
          "Catch EOFError around the prompt; check the cleaned command before float.",
          "Vang EOFError rond de vraag op; controleer het opgeschoonde commando vóór float.",
        ],
        fragment: 'if text == "quit":',
        probes: [
          call("read_number", [], "_return is None and _error is None", {
            stdin: [" QUIT "],
          }),
          call("read_number", [], "_return is None and _error is None", {
            stdin: [],
          }),
          call("read_number", [], "_return is None and _error is None", {
            stdin: ["wrong", "quit"],
          }),
        ],
      },
    ],
    change: [
      "Try invalid text followed by quit, and test end-of-input at the first prompt.",
      "Probeer verkeerde tekst gevolgd door quit en test einde invoer bij de eerste vraag.",
    ],
    explain: [
      "The helper has separate exits for a valid number, an explicit cancellation and exhausted input; invalid text alone triggers a retry.",
      "De hulp heeft aparte uitgangen voor een geldig getal, expliciet annuleren en opgebruikte invoer; alleen ongeldige tekst veroorzaakt een nieuwe poging.",
    ],
  }),
];
