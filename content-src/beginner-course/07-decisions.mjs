import { lesson, step, probe, output, uses } from "./authoring.mjs";
export const activities = [
  lesson(7, "first-if", {
    title: [
      "Run an instruction only when needed",
      "Voer een instructie alleen uit als dat nodig is",
    ],
    topics: "if",
    requires: "boolean-variables print",
    minutes: 15,
    intro: [
      "A comparison produces a Boolean. An if statement uses that Boolean to decide whether to run a block of code.",
      "Een vergelijking levert een booleaanse waarde op. Een if-instructie gebruikt die waarde om te beslissen of een blok code wordt uitgevoerd.",
    ],
    teach: [
      "Write if, a condition and a colon. On the next line, indent the action with four spaces. Python checks the condition: if it is True, the indented block runs; if it is False, the block is skipped.\n\nThe line after the block returns to the left margin. It runs regardless of the condition. Indentation therefore changes behaviour, not just appearance. The example's final message is outside the condition.",
      "Schrijf if, een voorwaarde en een dubbele punt. Spring op de volgende regel de actie met vier spaties in. Python controleert de voorwaarde: bij True wordt het ingesprongen blok uitgevoerd; bij False wordt het overgeslagen.\n\nDe regel na het blok keert terug naar de linkermarge. Die wordt ongeacht de voorwaarde uitgevoerd. Inspringing verandert dus gedrag, niet alleen het uiterlijk. Het laatste bericht van het voorbeeld staat buiten de voorwaarde.",
    ],
    idea: [
      "An if block runs only when its condition is true.",
      "Een if-blok wordt alleen uitgevoerd als zijn voorwaarde waar is.",
    ],
    example:
      'door_open = True\nif door_open:\n    print("Come in")\nprint("Check finished")',
    output: "Come in\nCheck finished\n",
    predict: [
      "Which line still prints if door_open becomes False?",
      "Welke regel verschijnt nog als door_open False wordt?",
    ],
    starter: "has_ticket = True\n",
    solution: 'has_ticket = True\nif has_ticket:\n    print("Enter")\n',
    steps: [
      step(
        [
          'Use if to print "Enter" only when has_ticket is True.',
          'Gebruik if om "Enter" alleen af te drukken wanneer has_ticket True is.',
        ],
        `${uses("If")} and _stdout == "Enter\n"`,
        [
          "End the condition line with a colon and indent the print underneath it.",
          "Eindig de voorwaarderegel met een dubbele punt en spring de print eronder in.",
        ],
        "if has_ticket:",
        [probe({ has_ticket: false }, '_stdout == ""')],
      ),
    ],
    experiment: [
      "Change has_ticket to False. An empty output is the correct behaviour in that case.",
      "Verander has_ticket in False. Lege uitvoer is in dat geval het juiste gedrag.",
    ],
    note: [
      "The print belongs inside the conditional block. Its absence when the condition is False is intentional.",
      "De print hoort binnen het voorwaardelijke blok. Dat hij ontbreekt wanneer de voorwaarde False is, is de bedoeling.",
    ],
  }),
  lesson(7, "indentation", {
    title: [
      "See which lines belong together",
      "Zie welke regels bij elkaar horen",
    ],
    topics: "indentation",
    requires: "if",
    guidance: "adapt",
    minutes: 13,
    intro: [
      "A block can contain more than one statement. Repair a program whose indentation puts a message in the wrong place.",
      "Een blok kan meer dan één instructie bevatten. Herstel een programma waarin inspringing een bericht op de verkeerde plaats zet.",
    ],
    teach: [
      "All statements in one block use the same indentation. Returning to the previous indentation ends that block. Python does not use braces to group these statements.\n\nUse four spaces consistently and let the editor help with indentation. A program can have valid syntax but the wrong block structure: a message outside an if will run even when the condition is False. Trace the False case to find that mistake.",
      "Alle instructies in één blok gebruiken dezelfde inspringing. Terugkeren naar de vorige inspringing beëindigt het blok. Python gebruikt geen accolades om deze instructies te groeperen.\n\nGebruik consequent vier spaties en laat de editor helpen met inspringen. Een programma kan geldige syntaxis maar een verkeerde blokstructuur hebben: een bericht buiten een if verschijnt ook als de voorwaarde False is. Volg het False-geval om die fout te vinden.",
    ],
    idea: [
      "Indentation determines which statements the condition controls.",
      "Inspringing bepaalt welke instructies door de voorwaarde worden bestuurd.",
    ],
    example:
      'sunny = False\nif sunny:\n    print("Take sunglasses")\n    print("Enjoy the sun")\nprint("Have a good day")',
    output: "Have a good day\n",
    predict: [
      "Which statements are skipped together?",
      "Welke instructies worden samen overgeslagen?",
    ],
    starter:
      'raining = True\nif raining:\n    print("Take a coat")\nprint("Take an umbrella")\nprint("Ready")\n',
    solution:
      'raining = True\nif raining:\n    print("Take a coat")\n    print("Take an umbrella")\nprint("Ready")\n',
    steps: [
      step(
        [
          'Make both weather tips conditional on raining. Keep "Ready" unconditional.',
          'Maak beide weertips afhankelijk van raining. Laat "Ready" altijd verschijnen.',
        ],
        output("Take a coat\nTake an umbrella\nReady\n"),
        [
          "Align the two tips inside the block and keep the final print at the left margin.",
          "Lijn de twee tips binnen het blok uit en houd de laatste print aan de linkermarge.",
        ],
        '    print("Take an umbrella")',
        [probe({ raining: false }, '_stdout == "Ready\n"')],
      ),
    ],
    experiment: [
      "Move Ready inside the block, test False, then restore the intended behaviour.",
      "Verplaats Ready naar het blok, test False en herstel daarna het bedoelde gedrag.",
    ],
    note: [
      "Both tips share the if block. The final status line stays outside it.",
      "Beide tips delen het if-blok. De laatste statusregel blijft erbuiten.",
    ],
  }),
  lesson(7, "else", {
    title: ["Choose between two actions", "Kies tussen twee acties"],
    topics: "else",
    requires: "if indentation inclusive-comparisons",
    minutes: 15,
    intro: [
      "Use else when a program needs an action for the False case too.",
      "Gebruik else wanneer een programma ook een actie voor het False-geval nodig heeft.",
    ],
    teach: [
      "else follows an if block at the same indentation as if. It has a colon but no condition of its own. Its block runs when the if condition is False. Exactly one of the two blocks runs.\n\nChoose a boundary deliberately. In the example, a score of exactly 6 passes because the condition uses >=. Test below, at and above the boundary.",
      "else volgt na een if-blok op dezelfde inspringing als if. Het heeft een dubbele punt maar geen eigen voorwaarde. Het blok wordt uitgevoerd wanneer de if-voorwaarde False is. Precies één van beide blokken wordt uitgevoerd.\n\nKies een grens bewust. In het voorbeeld is precies 6 voldoende omdat de voorwaarde >= gebruikt. Test onder, op en boven de grens.",
    ],
    idea: [
      "if/else chooses exactly one of two blocks.",
      "if/else kiest precies één van twee blokken.",
    ],
    example:
      'score = 5\nif score >= 6:\n    print("Pass")\nelse:\n    print("Try again")',
    output: "Try again\n",
    predict: ["What changes for score = 6?", "Wat verandert bij score = 6?"],
    starter: "age = 12\n",
    solution:
      'age = 12\nif age >= 12:\n    print("Welcome")\nelse:\n    print("Too young")\n',
    steps: [
      step(
        [
          'Print "Welcome" when age is at least 12.',
          'Druk "Welcome" af wanneer age minstens 12 is.',
        ],
        output("Welcome\n"),
        [
          "Include the exact boundary age in the allowed branch.",
          "Neem de exacte grensleeftijd op in de toegestane tak.",
        ],
        "if age >= 12:",
        [probe({ age: 13 }, '_stdout == "Welcome\n"')],
      ),
      step(
        [
          'Add else to print "Too young" for a lower age.',
          'Voeg else toe om "Too young" af te drukken bij een lagere leeftijd.',
        ],
        "any(isinstance(n,_ast.If) and n.orelse for n in _ast.walk(_ast.parse(_source)))",
        [
          "The fallback belongs to this if, at matching indentation.",
          "De terugvaltak hoort bij deze if, op dezelfde inspringing.",
        ],
        "else:",
        [probe({ age: 11 }, '_stdout == "Too young\n"')],
      ),
    ],
    experiment: [
      "Predict and test ages 11, 12 and 13. Explain the equality case.",
      "Voorspel en test leeftijden 11, 12 en 13. Leg het geval met gelijkheid uit.",
    ],
    note: [
      "The >= comparison includes 12. The else block handles every lower value.",
      "De vergelijking >= omvat 12. Het else-blok verwerkt elke lagere waarde.",
    ],
  }),
  lesson(7, "elif", {
    title: ["Choose among several actions", "Kies tussen meerdere acties"],
    topics: "elif",
    requires: "else relational-operators",
    minutes: 16,
    intro: [
      "When there are more than two categories, an elif chain keeps the alternatives together.",
      "Wanneer er meer dan twee categorieën zijn, houdt een elif-keten de alternatieven bij elkaar.",
    ],
    teach: [
      "elif means else if. Python checks the if condition first, then each elif only if earlier conditions were False. Once one branch matches, the remaining alternatives are skipped. The final else handles everything not matched.\n\nOrder broad thresholds carefully. The example checks the highest score first. Otherwise a high score could match a lower category before Python reaches the intended branch.",
      "elif betekent else if. Python controleert eerst de if-voorwaarde en daarna elke elif alleen als eerdere voorwaarden False waren. Zodra één tak past, worden de overige alternatieven overgeslagen. De laatste else verwerkt alles wat nog niet paste.\n\nZet brede grenzen zorgvuldig op volgorde. Het voorbeeld controleert eerst het hoogste cijfer. Anders kan een hoog cijfer een lagere categorie raken voordat Python de bedoelde tak bereikt.",
    ],
    idea: [
      "An if/elif/else chain runs the first matching branch only.",
      "Een if/elif/else-keten voert alleen de eerste passende tak uit.",
    ],
    example:
      'score = 8\nif score >= 9:\n    print("Excellent")\nelif score >= 6:\n    print("Pass")\nelse:\n    print("Review")',
    output: "Pass\n",
    predict: [
      "Why is the first comparison checked before the second?",
      "Waarom wordt de eerste vergelijking vóór de tweede gecontroleerd?",
    ],
    starter: "temperature = 15\n",
    solution:
      'temperature = 15\nif temperature < 10:\n    print("Cold")\nelif temperature < 20:\n    print("Mild")\nelse:\n    print("Warm")\n',
    steps: [
      step(
        [
          'Print "Cold" below 10, "Mild" from 10 up to but not including 20, otherwise "Warm".',
          'Druk "Cold" af onder 10, "Mild" vanaf 10 tot maar niet inclusief 20, anders "Warm".',
        ],
        output("Mild\n"),
        [
          "Use an ordered chain. The second branch is reached only after the first condition failed.",
          "Gebruik een geordende keten. De tweede tak wordt pas bereikt nadat de eerste voorwaarde niet gold.",
        ],
        "elif temperature < 20:",
        [
          probe({ temperature: 9 }, '_stdout == "Cold\n"'),
          probe({ temperature: 10 }, '_stdout == "Mild\n"'),
          probe({ temperature: 20 }, '_stdout == "Warm\n"'),
        ],
      ),
    ],
    experiment: [
      "Test 9, 10, 19 and 20. Explain why 20 belongs to Warm.",
      "Test 9, 10, 19 en 20. Leg uit waarom 20 bij Warm hoort.",
    ],
    note: [
      "The earlier failed condition already tells the elif branch that temperature is at least 10.",
      "De eerder mislukte voorwaarde vertelt de elif-tak al dat temperature minstens 10 is.",
    ],
  }),
  lesson(7, "separate-or-chain", {
    title: ["Separate checks or one choice?", "Aparte controles of één keuze?"],
    topics: "branch-order",
    requires: "elif",
    guidance: "adapt",
    minutes: 15,
    intro: [
      "Separate if statements can all run. A chain represents alternatives. Repair a program that accidentally gives two labels.",
      "Aparte if-instructies kunnen allemaal worden uitgevoerd. Een keten stelt alternatieven voor. Herstel een programma dat per ongeluk twee labels geeft.",
    ],
    teach: [
      "Python treats two separate if statements independently. If both conditions are True, both blocks run. This is useful for independent warnings but wrong when exactly one category should be chosen.\n\nThe example intentionally prints two observations. Your task needs just one award. Check the highest threshold first and connect the lower threshold as an alternative.",
      "Python behandelt twee aparte if-instructies onafhankelijk. Als beide voorwaarden True zijn, worden beide blokken uitgevoerd. Dat is nuttig voor onafhankelijke waarschuwingen maar verkeerd als precies één categorie moet worden gekozen.\n\nHet voorbeeld drukt bewust twee observaties af. Jouw opdracht heeft maar één onderscheiding nodig. Controleer de hoogste grens eerst en verbind de lagere grens als alternatief.",
    ],
    idea: [
      "Use separate if statements for independent actions and elif for alternatives.",
      "Gebruik aparte if-instructies voor onafhankelijke acties en elif voor alternatieven.",
    ],
    example:
      'score = 9\nif score >= 6:\n    print("Passed")\nif score >= 8:\n    print("High score")',
    output: "Passed\nHigh score\n",
    predict: [
      "Why are two messages correct in this example?",
      "Waarom zijn twee berichten juist in dit voorbeeld?",
    ],
    starter:
      'score = 9\nif score >= 8:\n    print("Gold")\nif score >= 6:\n    print("Silver")\nelse:\n    print("Practice")\n',
    solution:
      'score = 9\nif score >= 8:\n    print("Gold")\nelif score >= 6:\n    print("Silver")\nelse:\n    print("Practice")\n',
    steps: [
      step(
        [
          "Repair the selection: Gold from 8, Silver from 6, otherwise Practice. Print one label only.",
          "Herstel de selectie: Gold vanaf 8, Silver vanaf 6, anders Practice. Druk maar één label af.",
        ],
        output("Gold\n"),
        [
          "The second threshold is an alternative to the first, so connect it to the same chain.",
          "De tweede grens is een alternatief voor de eerste, dus verbind die met dezelfde keten.",
        ],
        "elif score >= 6:",
        [
          probe({ score: 6 }, '_stdout == "Silver\n"'),
          probe({ score: 5 }, '_stdout == "Practice\n"'),
        ],
      ),
    ],
    experiment: [
      "Try score = 8 and explain why Silver is skipped.",
      "Probeer score = 8 en leg uit waarom Silver wordt overgeslagen.",
    ],
    note: [
      "Changing the second if to elif prevents a high score from receiving both awards.",
      "De tweede if in elif veranderen voorkomt dat een hoog cijfer beide onderscheidingen krijgt.",
    ],
  }),
  lesson(7, "command-menu", {
    title: ["Respond to a typed choice", "Reageer op een getypte keuze"],
    topics: "decision-review",
    practices: "if elif else normalisation",
    requires: "elif normalisation input",
    guidance: "independent",
    minutes: 20,
    intro: [
      "Connect input to a decision. This menu handles one command each time the program runs.",
      "Verbind invoer met een beslissing. Dit menu verwerkt één opdracht per uitvoering van het programma.",
    ],
    teach: [
      "Read the answer, normalise it, then compare it with supported commands. Keep input handling separate from the branch chain so you can inspect the cleaned value.\n\nA final else gives a helpful response for an unsupported command. It does not mean Python crashed; it is behaviour you deliberately designed. Repeating a menu is taught in the next module.",
      "Lees het antwoord, normaliseer het en vergelijk het daarna met ondersteunde opdrachten. Houd invoerafhandeling gescheiden van de keuzeketen zodat je de opgeschoonde waarde kunt onderzoeken.\n\nEen laatste else geeft een nuttige reactie op een onbekende opdracht. Dat betekent niet dat Python is gecrasht; het is gedrag dat je bewust ontwierp. Een menu herhalen leer je in de volgende module.",
    ],
    idea: [
      "Normalise first, compare second, and provide a fallback response.",
      "Normaliseer eerst, vergelijk daarna en geef een terugvalreactie.",
    ],
    example:
      'command = "  HELP ".strip().lower()\nif command == "help":\n    print("Choose a command")\nelse:\n    print("Unknown")',
    output: "Choose a command\n",
    predict: [
      "Why does the uppercase input match lowercase help?",
      "Waarom komt invoer in hoofdletters overeen met help in kleine letters?",
    ],
    starter: "",
    solution:
      'choice = input("Choice: ").strip().lower()\nif choice == "open":\n    print("Opening")\nelif choice == "help":\n    print("Commands: open, help")\nelse:\n    print("Unknown choice")\n',
    inputs: [" OPEN "],
    steps: [
      step(
        [
          "Read Choice: into a trimmed lowercase variable choice.",
          "Lees Choice: in een getrimde variabele choice met kleine letters.",
        ],
        "choice == choice.strip().lower()",
        [
          "Keep the returned text from both normalisation methods.",
          "Bewaar de teruggegeven tekst van beide normalisatiemethoden.",
        ],
        'choice = input("Choice: ").strip().lower()',
        [{ stdin: [" HELP "], check: 'choice == "help"' }],
      ),
      step(
        [
          'Respond to open with "Opening", help with "Commands: open, help", and anything else with "Unknown choice".',
          'Reageer op open met "Opening", op help met "Commands: open, help" en anders met "Unknown choice".',
        ],
        '_stdout.endswith("Opening\n")',
        [
          "Use a single chain with two recognised commands and a fallback.",
          "Gebruik één keten met twee herkende opdrachten en een terugvaltak.",
        ],
        'elif choice == "help":',
        [
          {
            stdin: ["help"],
            check: '_stdout.endswith("Commands: open, help\n")',
          },
          { stdin: ["other"], check: '_stdout.endswith("Unknown choice\n")' },
        ],
      ),
    ],
    experiment: [
      "Test both commands with spaces and mixed case. Try an empty answer too.",
      "Test beide opdrachten met spaties en gemengde hoofdletters. Probeer ook een leeg antwoord.",
    ],
    note: [
      "The command is cleaned once. The chain produces exactly one response, including for unknown input.",
      "De opdracht wordt eenmaal opgeschoond. De keten produceert precies één reactie, ook voor onbekende invoer.",
    ],
  }),
  lesson(7, "delivery-adviser", {
    title: [
      "Mini project: delivery-price adviser",
      "Miniproject: bezorgprijsadviseur",
    ],
    topics: "delivery-project",
    practices: "input conversion if else inclusive-comparisons plus-equals",
    requires: "decision-review float-conversion plus-equals",
    kind: "challenge",
    guidance: "independent",
    minutes: 35,
    intro: [
      "Build a price adviser from a small set of rules. All inputs in this project are valid: weight is positive and the destination is local or remote.",
      "Bouw een prijsadviseur vanuit een kleine verzameling regels. Alle invoer in dit project is geldig: het gewicht is positief en de bestemming is local of remote.",
    ],
    teach: [
      "Read the rules before writing code. A parcel up to and including 2 kg costs 3.0; a heavier parcel costs 6.0. A remote destination adds 2.0 once. First select the base cost, then apply the independent remote surcharge.\n\nThe example uses the same pattern for a different service. Your program must read Weight: and Destination:, store weight and destination, calculate cost, and print the numeric cost. Normalise the destination. Test 1 kg, exactly 2 kg, and 3 kg with both destinations.",
      "Lees de regels voordat je code schrijft. Een pakket tot en met 2 kg kost 3.0; een zwaarder pakket kost 6.0. Een afgelegen bestemming voegt eenmaal 2.0 toe. Kies eerst de basisprijs en pas daarna de onafhankelijke toeslag toe.\n\nHet voorbeeld gebruikt hetzelfde patroon voor een andere dienst. Jouw programma leest Weight: en Destination:, bewaart weight en destination, berekent cost en drukt de numerieke prijs af. Normaliseer de bestemming. Test 1 kg, precies 2 kg en 3 kg met beide bestemmingen.",
    ],
    idea: [
      "Choose a base price with a chain, then apply a separate optional surcharge.",
      "Kies een basisprijs met een keten en pas daarna een aparte mogelijke toeslag toe.",
    ],
    example:
      "hours = 3\nweekend = True\nif hours <= 2:\n    cost = 4.0\nelse:\n    cost = 7.0\nif weekend:\n    cost += 1.0\nprint(cost)",
    output: "8.0\n",
    predict: [
      "Why is the weekend check separate from the price chain?",
      "Waarom staat de weekendcontrole los van de prijsketen?",
    ],
    starter: "",
    solution:
      'weight = float(input("Weight: "))\ndestination = input("Destination: ").strip().lower()\nif weight <= 2:\n    cost = 3.0\nelse:\n    cost = 6.0\nif destination == "remote":\n    cost += 2.0\nprint(cost)\n',
    inputs: ["3", "local"],
    steps: [
      step(
        [
          "Read and store the weight and normalised destination.",
          "Lees het gewicht en de genormaliseerde bestemming en bewaar ze.",
        ],
        'type(weight) is float and destination in ("local", "remote")',
        [
          "Convert weight to float and clean only the text destination.",
          "Zet weight om naar float en schoon alleen de tekstbestemming op.",
        ],
        'weight = float(input("Weight: "))',
        [
          {
            stdin: ["1.5", " REMOTE "],
            check: 'weight == 1.5 and destination == "remote"',
          },
        ],
      ),
      step(
        [
          "Calculate cost from the two rules, then print it.",
          "Bereken cost met de twee regels en druk het af.",
        ],
        'cost == (3.0 if weight <= 2 else 6.0) + (2.0 if destination == "remote" else 0.0) and _stdout.endswith(str(cost) + "\n")',
        [
          "Include 2 kg in the cheaper category and add the remote charge once.",
          "Neem 2 kg op in de goedkopere categorie en voeg de afgelegentoeslag eenmaal toe.",
        ],
        "if weight <= 2:",
        [
          { stdin: ["2", "local"], check: "cost == 3.0" },
          { stdin: ["1", "remote"], check: "cost == 5.0" },
          { stdin: ["3", "remote"], check: "cost == 8.0" },
        ],
      ),
    ],
    experiment: [
      "Write a six-case test table from the suggested weights and destinations. Check every predicted cost.",
      "Schrijf een testtabel met zes gevallen uit de voorgestelde gewichten en bestemmingen. Controleer elke voorspelde prijs.",
    ],
    note: [
      "The base-price branches are alternatives. The surcharge is an independent condition that can apply to either base price.",
      "De takken voor de basisprijs zijn alternatieven. De toeslag is een onafhankelijke voorwaarde die bij beide basisprijzen kan gelden.",
    ],
  }),
];
