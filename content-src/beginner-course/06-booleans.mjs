import { lesson, step, probe, output } from "./authoring.mjs";
function rule(slug, spec) {
  return lesson(6, slug, {
    ...spec,
    requires: spec.requires || "variables integers",
    minutes: 13,
    solution: `${spec.starter}result = ${spec.expression}\nprint(result)\n`,
    steps: [
      step(
        spec.task,
        `type(result) is bool and result == (${spec.expression})`,
        spec.approach,
        spec.expression,
        spec.cases.map((inputs) =>
          probe(
            inputs,
            `type(result) is bool and result == (${spec.expression})`,
          ),
        ),
      ),
      step(
        ["Print the Boolean result.", "Druk het booleaanse resultaat af."],
        "_stdout.strip() == str(result)",
        [
          "Print result itself, so changes to the comparison appear in the output.",
          "Druk result zelf af zodat veranderingen in de vergelijking in de uitvoer verschijnen.",
        ],
        "print(result)",
        spec.cases.map((inputs) =>
          probe(
            inputs,
            `type(result) is bool and _stdout.strip() == str(${spec.expression})`,
          ),
        ),
      ),
    ],
  });
}
export const activities = [
  lesson(6, "boolean-values", {
    title: ["Two Boolean values", "Twee booleaanse waarden"],
    topics: "boolean-expressions boolean-variables",
    requires: "variables types",
    minutes: 12,
    intro: [
      "Programs need values that represent yes/no conditions. Python's bool type has the values True and False.",
      "Programma's hebben waarden nodig voor ja/nee-voorwaarden. Pythons type bool heeft de waarden True en False.",
    ],
    teach: [
      'Write True and False with capital initials and without quotes. They are Boolean values. "True" is a string containing four letters. A Boolean variable stores one of these values and can be printed or inspected with type.\n\nA Boolean expression evaluates a condition and produces a truth value. Start with concrete questions such as whether a door is open. The value False is a valid answer; it does not mean the program failed.',
      'Schrijf True en False met een hoofdletter aan het begin en zonder aanhalingstekens. Het zijn booleaanse waarden. "True" is een string met vier letters. Een booleaanse variabele bewaart zo\'n waarde en kan met print of type worden onderzocht.\n\nEen booleaanse expressie beoordeelt een voorwaarde en levert een waarheidswaarde op. Begin met concrete vragen zoals of een deur open is. False is een geldig antwoord; het betekent niet dat het programma is mislukt.',
    ],
    idea: [
      "True and False are bool values; their quoted versions are strings.",
      "True en False zijn bool-waarden; hun versies tussen aanhalingstekens zijn strings.",
    ],
    example:
      'door_open = True\nprint(door_open)\nprint(type(door_open))\nprint(type("True"))',
    output: "True\n<class 'bool'>\n<class 'str'>\n",
    predict: [
      "Do the last two calls report the same type?",
      "Melden de laatste twee aanroepen hetzelfde type?",
    ],
    starter: "",
    solution: "ready = True\nfinished = False\nprint(ready)\nprint(finished)\n",
    steps: [
      step(
        [
          "Create ready as True and finished as False, using Boolean values.",
          "Maak ready als True en finished als False, met booleaanse waarden.",
        ],
        "ready is True and finished is False",
        [
          "Use capital initials and no quotes.",
          "Gebruik hoofdletters aan het begin en geen aanhalingstekens.",
        ],
        "ready = True",
      ),
      step(
        ["Print ready, then finished.", "Druk ready af en daarna finished."],
        output("True\nFalse\n"),
        [
          "Both values are legitimate results to display.",
          "Beide waarden zijn geldige resultaten om te tonen.",
        ],
        "print(finished)",
      ),
    ],
    experiment: [
      "Assign the string False to finished and inspect its type. Restore the Boolean afterward.",
      "Wijs de string False aan finished toe en onderzoek het type. Herstel daarna de booleaanse waarde.",
    ],
    note: [
      "The values have type bool. Quoting either word would change the type and meaning.",
      "De waarden hebben type bool. Aanhalingstekens om een van de woorden veranderen het type en de betekenis.",
    ],
  }),
  rule("equal", {
    title: ["Compare with ==", "Vergelijk met =="],
    topics: "relational-operators equality",
    requires: "boolean-variables variables",
    intro: [
      "Assignment and comparison use different symbols. Compare values without changing them.",
      "Toewijzing en vergelijking gebruiken verschillende symbolen. Vergelijk waarden zonder ze te veranderen.",
    ],
    teach: [
      'One equals sign assigns: score = 5 stores a value. Two equals signs compare: score == 5 evaluates to True when the values are equal. You can assign that Boolean result to another variable.\n\nNumeric 5 and text "5" are not equal. Comparing them gives False rather than converting the text for you. Read the example from the right side of each assignment first.',
      'Eén gelijkteken wijst toe: score = 5 bewaart een waarde. Twee gelijktekens vergelijken: score == 5 levert True op wanneer de waarden gelijk zijn. Je kunt dat booleaanse resultaat aan een andere variabele toewijzen.\n\nHet getal 5 en de tekst "5" zijn niet gelijk. Ze vergelijken geeft False in plaats van de tekst automatisch om te zetten. Lees bij het voorbeeld eerst de rechterkant van elke toewijzing.',
    ],
    idea: [
      "= stores a value; == asks whether two values are equal.",
      "= bewaart een waarde; == vraagt of twee waarden gelijk zijn.",
    ],
    example: 'score = 5\nprint(score == 5)\nprint(score == "5")',
    output: "True\nFalse\n",
    predict: [
      "Why is the second comparison False?",
      "Waarom is de tweede vergelijking False?",
    ],
    starter: 'entered = "open"\nexpected = "open"\n',
    expression: "entered == expected",
    task: [
      "Compare entered with expected and store the Boolean in result.",
      "Vergelijk entered met expected en bewaar de booleaanse waarde in result.",
    ],
    approach: [
      "Use comparison, leaving both input strings unchanged.",
      "Gebruik vergelijking en laat beide invoerstrings ongewijzigd.",
    ],
    cases: [{ entered: "close" }, { entered: "OPEN" }],
    experiment: [
      "Change only the capitalisation of entered. Is string equality case-sensitive?",
      "Verander alleen de hoofdletters van entered. Is stringgelijkheid hoofdlettergevoelig?",
    ],
    note: [
      "The comparison produces a Boolean value and does not replace either string.",
      "De vergelijking levert een booleaanse waarde op en vervangt geen van de strings.",
    ],
  }),
  rule("not-equal", {
    title: ["Compare with !=", "Vergelijk met !="],
    topics: "inequality",
    requires: "equality",
    intro: [
      "Sometimes the useful condition is that two values differ.",
      "Soms is de nuttige voorwaarde dat twee waarden verschillen.",
    ],
    teach: [
      "The != operator means not equal. It is True when the compared values differ and False when they match. It still compares; it does not change either value.\n\nA familiar use is checking whether a typed command differs from a stop word. For now we only compute the Boolean. Later a decision or loop will use it to choose what happens next.",
      "De operator != betekent niet gelijk. Hij is True wanneer de vergeleken waarden verschillen en False wanneer ze overeenkomen. Hij vergelijkt nog steeds; geen van beide waarden wordt veranderd.\n\nEen bekende toepassing is controleren of een getypte opdracht van een stopwoord verschilt. Nu berekenen we alleen de booleaanse waarde. Later gebruikt een beslissing of lus haar om te kiezen wat er daarna gebeurt.",
    ],
    idea: [
      "!= is True when its two values are different.",
      "!= is True wanneer de twee waarden verschillend zijn.",
    ],
    example:
      'command = "help"\nprint(command != "quit")\nprint(command != "help")',
    output: "True\nFalse\n",
    predict: [
      "Which comparison has equal values on both sides?",
      "Welke vergelijking heeft gelijke waarden aan beide kanten?",
    ],
    starter: 'choice = "play"\n',
    expression: 'choice != "quit"',
    task: [
      'Store whether choice differs from "quit" in result.',
      'Bewaar in result of choice verschilt van "quit".',
    ],
    approach: [
      "Use the not-equal comparison against the stop word.",
      "Gebruik de niet-gelijkvergelijking met het stopwoord.",
    ],
    cases: [{ choice: "quit" }, { choice: "help" }, { choice: "" }],
    experiment: [
      "Try an empty string. Does it equal quit?",
      "Probeer een lege string. Is die gelijk aan quit?",
    ],
    note: [
      "Only the exact stop word makes this comparison False.",
      "Alleen het exacte stopwoord maakt deze vergelijking False.",
    ],
  }),
  rule("greater-less", {
    title: ["Greater than and less than", "Groter dan en kleiner dan"],
    topics: "strict-comparisons",
    requires: "boolean-variables",
    intro: [
      "Compare the size of two numbers using > and <.",
      "Vergelijk de grootte van twee getallen met > en <.",
    ],
    teach: [
      "> means strictly greater than, and < means strictly less than. The value on the left is compared with the value on the right. Neither operator includes equality.\n\nIn the example 8 is greater than 5, but 5 is not greater than itself. Always test an equal value as well as one above or below the boundary.",
      "> betekent strikt groter dan en < betekent strikt kleiner dan. De waarde links wordt met de waarde rechts vergeleken. Geen van beide operatoren omvat gelijkheid.\n\nIn het voorbeeld is 8 groter dan 5, maar 5 is niet groter dan zichzelf. Test altijd een gelijke waarde en ook een waarde boven of onder de grens.",
    ],
    idea: [
      "Strict comparisons exclude the equal boundary.",
      "Strikte vergelijkingen sluiten de gelijke grenswaarde uit.",
    ],
    example: "print(8 > 5)\nprint(5 > 5)\nprint(3 < 5)",
    output: "True\nFalse\nTrue\n",
    predict: [
      "Why is the middle result False?",
      "Waarom is het middelste resultaat False?",
    ],
    starter: "temperature = 21\nlimit = 20\n",
    expression: "temperature > limit",
    task: [
      "Store whether temperature is strictly above limit in result.",
      "Bewaar in result of temperature strikt boven limit ligt.",
    ],
    approach: [
      "The equality case must be False for this rule.",
      "Bij gelijkheid moet deze regel False zijn.",
    ],
    cases: [
      { temperature: 20 },
      { temperature: 19 },
      { temperature: -5, limit: -10 },
    ],
    experiment: [
      "Reverse both operands and use < instead. Do the comparisons describe the same relationship?",
      "Draai beide operanden om en gebruik <. Beschrijven de vergelijkingen hetzelfde verband?",
    ],
    note: [
      "The initial temperature is above the limit. Equal temperatures are intentionally excluded.",
      "De begintemperatuur ligt boven de grens. Gelijke temperaturen zijn bewust uitgesloten.",
    ],
  }),
  rule("inclusive-boundaries", {
    title: ["Include the boundary", "Neem de grenswaarde mee"],
    topics: "inclusive-comparisons",
    requires: "strict-comparisons",
    intro: [
      "Words such as at least and at most include equality. Translate that wording carefully.",
      "Woorden zoals minstens en hoogstens omvatten gelijkheid. Vertaal die formulering zorgvuldig.",
    ],
    teach: [
      ">= means greater than or equal to; <= means less than or equal to. If entry requires at least 12 years, someone aged exactly 12 qualifies. age > 12 would exclude them.\n\nA useful test table has three rows: one below the boundary, the boundary itself, and one above it. Write the expected Boolean before running the code.",
      ">= betekent groter dan of gelijk aan; <= betekent kleiner dan of gelijk aan. Als toegang minstens 12 jaar vereist, mag iemand van precies 12 naar binnen. age > 12 zou die persoon uitsluiten.\n\nEen nuttige testtabel heeft drie regels: één onder de grens, de grens zelf en één erboven. Schrijf de verwachte booleaanse waarde op voordat je de code uitvoert.",
    ],
    idea: [
      "An inclusive comparison accepts equality at its boundary.",
      "Een inclusieve vergelijking accepteert gelijkheid op de grens.",
    ],
    example: "print(12 >= 12)\nprint(11 >= 12)\nprint(4 <= 4)",
    output: "True\nFalse\nTrue\n",
    predict: [
      "Which symbol represents at most?",
      "Welk symbool betekent hoogstens?",
    ],
    starter: "weight = 5\nmaximum = 5\n",
    expression: "weight <= maximum",
    task: [
      "Store whether the parcel weighs at most maximum in result.",
      "Bewaar in result of het pakket hoogstens maximum weegt.",
    ],
    approach: [
      "A parcel exactly at the maximum is allowed.",
      "Een pakket dat precies het maximum weegt is toegestaan.",
    ],
    cases: [{ weight: 4 }, { weight: 5 }, { weight: 6 }],
    experiment: [
      "Write a three-row table for weights 4, 5 and 6, then verify it.",
      "Schrijf een tabel met drie regels voor gewichten 4, 5 en 6 en controleer die.",
    ],
    note: [
      "The equals part of <= makes the boundary case pass.",
      "Het gelijkdeel van <= zorgt dat de grenswaarde wordt geaccepteerd.",
    ],
  }),
  rule("and", {
    title: [
      "Require both conditions with and",
      "Vereis beide voorwaarden met and",
    ],
    topics: "and",
    requires: "boolean-variables inclusive-comparisons",
    intro: [
      "Some rules require two conditions to be satisfied together.",
      "Sommige regels vereisen dat twee voorwaarden tegelijk zijn vervuld.",
    ],
    teach: [
      "For Boolean operands, and is True only when both operands are True. Its truth table is: True and True → True; True and False → False; False and True → False; False and False → False.\n\nEvaluate each small condition first, then combine their Boolean results. Parentheses around comparisons can help you read a longer rule. Python checks the left side first and can skip the right side when the left is already False.",
      "Voor booleaanse operanden is and alleen True als beide operanden True zijn. De waarheidstabel is: True and True → True; True and False → False; False and True → False; False and False → False.\n\nBeoordeel eerst elke kleine voorwaarde en combineer daarna hun booleaanse resultaten. Haakjes om vergelijkingen kunnen een langere regel leesbaarder maken. Python bekijkt links eerst en kan rechts overslaan wanneer links al False is.",
    ],
    idea: [
      "Both requirements must hold for an and rule to be True.",
      "Beide eisen moeten gelden om een and-regel True te maken.",
    ],
    example:
      "has_ticket = True\ndoor_open = False\nprint(has_ticket and door_open)",
    output: "False\n",
    predict: [
      "Is a ticket enough when the door is closed?",
      "Is een kaartje voldoende wanneer de deur dicht is?",
    ],
    starter: "credits = 120\nscore = 7\n",
    expression: "credits >= 120 and score >= 6",
    task: [
      "A learner qualifies with at least 120 credits and a score of at least 6. Store that rule in result.",
      "Een leerling voldoet met minstens 120 punten en een cijfer van minstens 6. Bewaar die regel in result.",
    ],
    approach: [
      "Write each comparison completely and connect them with and.",
      "Schrijf elke vergelijking volledig en verbind ze met and.",
    ],
    cases: [
      { credits: 119, score: 7 },
      { credits: 120, score: 5 },
      { credits: 119, score: 5 },
      { credits: 120, score: 6 },
    ],
    experiment: [
      "Predict all four combinations of meeting and missing the two requirements.",
      "Voorspel alle vier combinaties van wel en niet aan de twee eisen voldoen.",
    ],
    note: [
      "Each comparison produces a Boolean. and combines them so one successful requirement cannot compensate for a failed one.",
      "Elke vergelijking levert een booleaanse waarde op. and combineert ze zodat één geslaagde eis een mislukte eis niet kan compenseren.",
    ],
  }),
  rule("or", {
    title: [
      "Allow either condition with or",
      "Sta een van beide voorwaarden toe met or",
    ],
    topics: "or",
    requires: "and",
    intro: [
      "Other rules accept either of two reasons. Python's or also accepts both together.",
      "Andere regels accepteren een van twee redenen. Pythons or accepteert ook beide tegelijk.",
    ],
    teach: [
      'For Boolean operands, or is False only when both operands are False. Its truth table is: True or True → True; True or False → True; False or True → True; False or False → False.\n\nThis is inclusive or. It does not mean exactly one condition must hold. Also write complete comparisons: command == "help" or command == "info" checks both values. A bare nonempty string on the right would not perform the second comparison.',
      'Voor booleaanse operanden is or alleen False als beide operanden False zijn. De waarheidstabel is: True or True → True; True or False → True; False or True → True; False or False → False.\n\nDit is inclusieve of. Het betekent niet dat precies één voorwaarde moet gelden. Schrijf ook volledige vergelijkingen: command == "help" or command == "info" controleert beide waarden. Een losse niet-lege string rechts voert de tweede vergelijking niet uit.',
    ],
    idea: [
      "or accepts either condition, including both being True.",
      "or accepteert een van beide voorwaarden, inclusief wanneer beide True zijn.",
    ],
    example: "member = False\nhas_pass = True\nprint(member or has_pass)",
    output: "True\n",
    predict: [
      "What if both values were True?",
      "Wat als beide waarden True waren?",
    ],
    starter: 'command = "help"\n',
    expression: 'command == "help" or command == "info"',
    task: [
      'Store whether command is "help" or "info" in result.',
      'Bewaar in result of command "help" of "info" is.',
    ],
    approach: [
      "Repeat the comparison on both sides of or.",
      "Herhaal de vergelijking aan beide kanten van or.",
    ],
    cases: [{ command: "info" }, { command: "quit" }, { command: "" }],
    experiment: [
      "Try a different command. Explain why the rule should now be False.",
      "Probeer een andere opdracht. Leg uit waarom de regel nu False moet zijn.",
    ],
    note: [
      "Both sides compare command with a specific value. An unrelated command fails both comparisons.",
      "Beide kanten vergelijken command met een specifieke waarde. Een andere opdracht faalt voor beide vergelijkingen.",
    ],
  }),
  rule("not", {
    title: [
      "Reverse a Boolean with not",
      "Keer een booleaanse waarde om met not",
    ],
    topics: "not",
    requires: "boolean-variables",
    intro: [
      "The not operator reverses a Boolean condition. It has one operand.",
      "De operator not keert een booleaanse voorwaarde om. Hij heeft één operand.",
    ],
    teach: [
      "not True is False, and not False is True. Put not before the condition to reverse. Parentheses make the scope of a larger condition visible.\n\nA closed door can be represented by not door_open. This does not change door_open: the expression produces another Boolean. Keep that distinction between calculating a value and updating a variable.",
      "not True is False en not False is True. Zet not vóór de voorwaarde die je omkeert. Haakjes maken bij een grotere voorwaarde zichtbaar welk deel wordt omgekeerd.\n\nEen gesloten deur kun je weergeven met not door_open. Dit verandert door_open niet: de expressie levert een andere booleaanse waarde op. Houd dat onderscheid tussen een waarde berekenen en een variabele wijzigen vast.",
    ],
    idea: [
      "not reverses the truth value of its condition.",
      "not keert de waarheidswaarde van een voorwaarde om.",
    ],
    example: "door_open = False\nprint(not door_open)\nprint(door_open)",
    output: "True\nFalse\n",
    predict: [
      "Does evaluating not change the original variable?",
      "Verandert not berekenen de oorspronkelijke variabele?",
    ],
    starter: "paused = True\n",
    expression: "not paused",
    task: [
      "Store whether the activity is running, the opposite of paused, in result.",
      "Bewaar in result of de activiteit draait: het tegenovergestelde van paused.",
    ],
    approach: [
      "Reverse paused with not rather than assigning a fixed answer.",
      "Keer paused om met not in plaats van een vast antwoord toe te wijzen.",
    ],
    cases: [{ paused: false }, { paused: true }],
    experiment: [
      "Set paused to False and trace both values.",
      "Zet paused op False en volg beide waarden.",
    ],
    note: [
      "The result describes the opposite condition while paused retains its value.",
      "Het resultaat beschrijft de tegenovergestelde voorwaarde terwijl paused zijn waarde behoudt.",
    ],
  }),
  rule("access-rule", {
    title: [
      "Combine a complete access rule",
      "Combineer een volledige toegangsregel",
    ],
    topics: "boolean-review",
    practices: "and or not relational-operators",
    requires: "and or not",
    guidance: "independent",
    minutes: 20,
    intro: [
      "Translate a short rule into small Boolean expressions. Test both ordinary and boundary cases.",
      "Vertaal een korte regel in kleine booleaanse expressies. Test gewone gevallen en grensgevallen.",
    ],
    teach: [
      "Separate the positive requirements from a reason to refuse access. The example requires a ticket and an open door. Your task adds an alternative credential and a blocked-account condition.\n\nUse parentheses to show which alternatives belong together. Test one requirement at a time: remove a credential, set the account to blocked, and finally test both credentials together.",
      "Scheid positieve eisen van een reden om toegang te weigeren. Het voorbeeld vereist een kaartje en een open deur. Jouw opdracht voegt een alternatief toegangsbewijs en een geblokkeerde account toe.\n\nGebruik haakjes om te tonen welke alternatieven samen horen. Test één eis tegelijk: verwijder een toegangsbewijs, blokkeer de account en test ten slotte beide toegangsbewijzen tegelijk.",
    ],
    idea: [
      "Combine alternatives first, then apply the requirement shared by all alternatives.",
      "Combineer eerst alternatieven en pas daarna de eis toe die voor alle alternatieven geldt.",
    ],
    example:
      "ticket = True\nopen_now = True\nallowed = ticket and open_now\nprint(allowed)",
    output: "True\n",
    predict: [
      "Which single changed input would make this example False?",
      "Welke ene gewijzigde invoer maakt dit voorbeeld False?",
    ],
    starter: "member = True\nguest_pass = False\nblocked = False\n",
    expression: "(member or guest_pass) and not blocked",
    task: [
      "Access requires membership or a guest pass, and a non-blocked account. Store the decision in result.",
      "Toegang vereist lidmaatschap of een gastenpas en een niet-geblokkeerde account. Bewaar de beslissing in result.",
    ],
    approach: [
      "Group the two credentials with or. Every successful case must also satisfy not blocked.",
      "Groepeer beide toegangsbewijzen met or. Elk succesvol geval moet ook voldoen aan not blocked.",
    ],
    cases: [
      { member: false, guest_pass: true, blocked: false },
      { member: true, guest_pass: false, blocked: true },
      { member: false, guest_pass: false, blocked: false },
      { member: true, guest_pass: true, blocked: false },
    ],
    experiment: [
      "Write the eight possible combinations of these three Boolean inputs and predict each result.",
      "Schrijf de acht mogelijke combinaties van deze drie booleaanse invoerwaarden op en voorspel elk resultaat.",
    ],
    note: [
      "Either credential is enough, but blocking overrides both. The grouped expression makes that shared restriction explicit.",
      "Elk toegangsbewijs is voldoende, maar blokkeren geldt voor beide. De gegroepeerde expressie maakt die gedeelde beperking duidelijk.",
    ],
  }),
];
