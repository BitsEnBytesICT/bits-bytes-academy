import { focus } from "./focused.mjs";
import { call, L } from "./authoring.mjs";
const isolated = (name, args, check, stdin = []) =>
  call(name, args, check + ' and _error is None and _remaining_input == ""', {
    definitionsOnly: true,
    stdin,
  });
export const activities = [
  focus(10, "converter-session", {
    title: [
      "Connect a complete conversion session",
      "Verbind een volledig omzetgesprek",
    ],
    topics: "session-integration",
    practices: "retry-loops cancellation return while validation",
    requires: "recovery-review keyword-arguments",
    guidance: "independent",
    minutes: 30,
    why: [
      "Before building the calculator, connect familiar functions, decisions and repetition in one small program. This service converts minutes to seconds or hours to minutes.",
      "Verbind vóór de rekenmachine bekende functies, keuzes en herhaling tot één klein programma. Deze dienst zet minuten om naar seconden of uren naar minuten.",
    ],
    teach: [
      "Use three responsibilities. convert(value) returns value * 60 without printing. read_value() asks Value or quit: until it gets a float; invalid text prints Number needed, while quit or end-of-input returns None. session() owns the menu: minutes or hours uses read_value(), displays the converted number and asks for the next operation. A cancelled value ends the session. Unknown commands print Unknown operation and ask again. Normalise commands with strip and lower. Zero and negative numbers are valid here. None, not a false value, signals cancellation.\n\nThe outer loop selects work; the inner retry loop only repairs the current answer. Returning a value from read_value does not end session. The caller decides what happens next.",
      "Gebruik drie verantwoordelijkheden. convert(value) geeft value * 60 terug zonder afdrukken. read_value() vraagt Value or quit: tot er een float komt; ongeldige tekst toont Number needed, terwijl quit of einde invoer None teruggeeft. session() beheert het menu: minutes of hours gebruikt read_value(), toont het omgezette getal en vraagt om de volgende bewerking. Een geannuleerde waarde beëindigt het gesprek. Onbekende opdrachten tonen Unknown operation en vragen opnieuw. Normaliseer opdrachten met strip en lower. Nul en negatieve getallen zijn hier geldig. None, niet een onware waarde, betekent annuleren.\n\nDe buitenste lus kiest werk; de binnenste herhaling herstelt alleen het huidige antwoord. Een waarde teruggeven uit read_value beëindigt session niet. De aanroeper bepaalt wat daarna gebeurt.",
    ],
    rule: [
      "Read → validate → calculate → display → repeat. Give each loop a clear exit.",
      "Lees → controleer → bereken → toon → herhaal. Geef elke lus een duidelijke uitgang.",
    ],
    example:
      "def double(value):\n    return value * 2\ndef show(value):\n    answer = double(value)\n    print(answer)\nshow(1.5)\nshow(0)",
    output: "3.0\n0\n",
    predict: [
      "Which function prints? Where does execution return after double finishes?",
      "Welke functie drukt af? Waar gaat uitvoering verder nadat double klaar is?",
    ],
    sections: [
      {
        id: "converter-conversation",
        topicIds: [],
        heading: L("Plan the conversation", "Plan het gesprek"),
        body: L(
          "Try: minutes → bad → 2.5 → hours → 0 → quit. Expected messages: Number needed, 150.0, 0.0, Bye. Also try an unknown operation, a negative value, immediate quit, and quit at the value prompt. Prompt wording is yours; the four result messages are specified. Add one small part and Run before connecting the next.",
          "Probeer: minutes → bad → 2.5 → hours → 0 → quit. Verwachte berichten: Number needed, 150.0, 0.0, Bye. Probeer ook een onbekende opdracht, een negatieve waarde, meteen quit en quit bij de waardevraag. De vraagtekst kies je zelf; de vier resultaatberichten liggen vast. Voeg één klein onderdeel toe en voer uit vóór je het volgende verbindt.",
        ),
      },
    ],
    starter:
      "def convert(value):\n    return None\n\ndef read_value():\n    return None\n\ndef session():\n    # Read an operation, call the helpers, print, and repeat.\n    return None\n\nsession()\n",
    solution:
      'def convert(value):\n    return value * 60\n\ndef read_value():\n    while True:\n        try:\n            text = input("Value or quit: ").strip().lower()\n        except EOFError:\n            return None\n        if text == "quit":\n            return None\n        try:\n            return float(text)\n        except ValueError:\n            print("Number needed")\n\ndef session():\n    while True:\n        try:\n            operation = input("minutes, hours or quit: ").strip().lower()\n        except EOFError:\n            break\n        if operation == "quit":\n            break\n        if operation != "minutes" and operation != "hours":\n            print("Unknown operation")\n            continue\n        value = read_value()\n        if value is None:\n            break\n        print(convert(value))\n    print("Bye")\n\nsession()\n',
    tasks: [
      {
        task: [
          "Implement convert(value) and read_value() using the contracts above. Keep session runnable while it is unfinished.",
          "Implementeer convert(value) en read_value() volgens de afspraken hierboven. Houd session uitvoerbaar terwijl die nog onaf is.",
        ],
        check: "callable(convert) and callable(read_value)",
        help: [
          "Test the pure conversion first; then return None only for cancellation and retry failed float conversions.",
          "Test eerst de zuivere omzetting; geef daarna alleen None terug bij annuleren en herhaal mislukte float-omzettingen.",
        ],
        fragment: 'if text == "quit": return None',
        probes: [
          isolated("convert", [-2.5], "_return == -150"),
          isolated("convert", [0], "_return == 0"),
          isolated(
            "read_value",
            [],
            '_return == 2.5 and "Number needed" in _call_stdout',
            ["bad", "2.5"],
          ),
          isolated("read_value", [], "_return is None", [" QUIT "]),
          isolated("read_value", [], "_return is None"),
        ],
      },
      {
        task: [
          "Complete session() and call it at the bottom. Repeat conversions, reject unknown commands, and print Bye once on quit or end-of-input, including cancellation at the value prompt.",
          "Maak session() af en roep die onderaan aan. Herhaal omzettingen, weiger onbekende opdrachten en druk Bye eenmaal af bij quit of einde invoer, ook bij annuleren aan de waardevraag.",
        ],
        check:
          'any(isinstance(n,_ast.Expr) and isinstance(n.value,_ast.Call) and isinstance(n.value.func,_ast.Name) and n.value.func.id == "session" for n in _ast.parse(_source).body)',
        help: [
          "The menu repeats after a result. Check value is None before calculating; zero must still produce a result.",
          "Het menu herhaalt na een resultaat. Controleer value is None vóór berekenen; nul moet wel een resultaat opleveren.",
        ],
        fragment: "if value is None: break",
        probes: [
          ...[
            [
              ["minutes", "bad", "2.5", "hours", "0", "quit"],
              "Number needed\n150.0\n0.0\nBye\n",
            ],
            [
              ["unknown", " HOURS ", "-2", "quit"],
              "Unknown operation\n-120.0\nBye\n",
            ],
            [["minutes", "quit"], "Bye\n"],
            [["quit"], "Bye\n"],
            [[], "Bye\n"],
          ].map(([stdin, out]) => ({
            ...isolated(
              "session",
              [],
              `_call_stdout == ${JSON.stringify(out)}`,
              stdin,
            ),
            ignorePrompts: true,
          })),
        ],
      },
    ],
    change: [
      "Explain why testing if not value would wrongly treat 0 as cancellation. Sketch where a third conversion would fit before changing code.",
      "Leg uit waarom if not value ten onrechte 0 als annuleren behandelt. Schets waar een derde omzetting past vóór je code wijzigt.",
    ],
    explain: [
      "The conversion has no terminal responsibilities. The reader retries one answer. The session handles operation selection and owns repetition and the final goodbye; this division makes each part testable.",
      "De omzetting heeft geen terminaltaken. De lezer herhaalt één antwoord. Het gesprek verwerkt de opdrachtkeuze, herhaling en het afscheid; door deze verdeling is elk deel te testen.",
    ],
  }),
];
