import { lesson, step, probe, output, uses } from "./authoring.mjs";
export const activities = [
  lesson(8, "why-repeat", {
    title: ["Repeat a small block", "Herhaal een klein blok"],
    topics: "why-loops while counters",
    requires: "if changing-numbers",
    minutes: 16,
    intro: [
      "A loop repeats instructions. Use it when the number of repetitions can change or repeated lines would be awkward to maintain.",
      "Een lus herhaalt instructies. Gebruik haar als het aantal herhalingen kan veranderen of herhaalde regels lastig te onderhouden worden.",
    ],
    teach: [
      "while checks a condition before each repetition. If it is True, the indented body runs; Python then checks again. When it is False, execution continues after the loop.\n\nThe example starts count at 0. Each repetition prints a message and increases count by 1. Counts 0, 1 and 2 enter the body; count 3 stops it. The update gives the loop a way to finish. An iteration means one execution of the body.",
      "while controleert vóór elke herhaling een voorwaarde. Bij True wordt het ingesprongen blok uitgevoerd; daarna controleert Python opnieuw. Bij False gaat de uitvoering verder na de lus.\n\nHet voorbeeld begint count op 0. Elke herhaling drukt een bericht af en verhoogt count met 1. Bij 0, 1 en 2 wordt het blok uitgevoerd; 3 stopt de lus. De wijziging geeft de lus een manier om te eindigen. Een iteratie is één uitvoering van het blok.",
    ],
    idea: [
      "A while loop rechecks its condition before every iteration.",
      "Een while-lus controleert haar voorwaarde vóór elke iteratie opnieuw.",
    ],
    example:
      'count = 0\nwhile count < 3:\n    print("Hello")\n    count += 1\nprint("Done")',
    output: "Hello\nHello\nHello\nDone\n",
    predict: [
      "How many times is the body entered, and why?",
      "Hoe vaak wordt het blok betreden en waarom?",
    ],
    starter: "count = 0\nlimit = 3\n",
    solution:
      'count = 0\nlimit = 3\nwhile count < limit:\n    print("Ready")\n    count += 1\n',
    steps: [
      step(
        [
          'Use while to print "Ready" limit times, updating count each time.',
          'Gebruik while om "Ready" limit keer af te drukken en count elke keer bij te werken.',
        ],
        `${uses("While")} and count == limit and _stdout == "Ready\n" * limit`,
        [
          "Start the counter once, test it before each repetition, and update it inside the body.",
          "Begin de teller eenmaal, test hem vóór elke herhaling en werk hem binnen het blok bij.",
        ],
        "while count < limit:",
        [
          probe({ limit: 0 }, 'count == 0 and _stdout == ""'),
          probe({ limit: 2 }, '_stdout == "Ready\nReady\n"'),
        ],
      ),
    ],
    experiment: [
      "Try limits 0, 1 and 4. Explain why zero repetitions are possible.",
      "Probeer grenzen 0, 1 en 4. Leg uit waarom nul herhalingen mogelijk zijn.",
    ],
    note: [
      "The update eventually makes count < limit false. A false initial condition skips the body entirely.",
      "De wijziging maakt count < limit uiteindelijk onwaar. Een aanvankelijk onware voorwaarde slaat het hele blok over.",
    ],
  }),
  lesson(8, "trace-counter", {
    title: ["Trace the counter", "Volg de teller"],
    topics: "loop-tracing",
    requires: "while counters",
    minutes: 14,
    intro: [
      "Follow a loop one iteration at a time. The order of printing and updating determines which numbers appear.",
      "Volg een lus één iteratie tegelijk. De volgorde van afdrukken en bijwerken bepaalt welke getallen verschijnen.",
    ],
    teach: [
      "Create a trace with columns for the counter before the test, the condition, the printed value and the counter after the update. In the example, printing happens before subtraction, so 3 appears and 0 does not.\n\nDo not reset the counter inside the loop: it would lose its progress. The initial assignment belongs before while. Test the smallest useful case to catch an extra or missing iteration.",
      "Maak een spoor met kolommen voor de teller vóór de test, de voorwaarde, de afgedrukte waarde en de teller na de wijziging. In het voorbeeld komt afdrukken vóór aftrekken, zodat 3 verschijnt en 0 niet.\n\nZet de teller niet binnen de lus terug: dan gaat de voortgang verloren. De begintoewijzing hoort vóór while. Test het kleinste nuttige geval om een extra of ontbrekende herhaling te vinden.",
    ],
    idea: [
      "Track the counter at the exact line where it is used.",
      "Volg de teller op de precieze regel waar hij wordt gebruikt.",
    ],
    example: "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
    output: "3\n2\n1\n",
    predict: [
      "Would moving the update before print change the output?",
      "Verandert de uitvoer als de wijziging vóór print komt?",
    ],
    starter: "start = 4\ncount = start\n",
    solution:
      'start = 4\ncount = start\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Go")\n',
    steps: [
      step(
        [
          'Count down from start to 1, then print "Go" once outside the loop.',
          'Tel terug van start tot 1 en druk daarna eenmaal "Go" af buiten de lus.',
        ],
        'count == 0 and _stdout == "4\n3\n2\n1\nGo\n"',
        [
          "Print the positive counter before decreasing it. The final message is unindented.",
          "Druk de positieve teller af voordat je hem verlaagt. Het laatste bericht staat zonder inspringing.",
        ],
        "count -= 1",
        [
          probe({ start: 1 }, '_stdout == "1\nGo\n"'),
          probe({ start: 0 }, '_stdout == "Go\n"'),
        ],
      ),
    ],
    experiment: [
      "Write a trace for start = 2 before running. Compare each row to the output.",
      "Schrijf vóór het uitvoeren een spoor voor start = 2. Vergelijk elke regel met de uitvoer.",
    ],
    note: [
      "The loop includes the starting value and excludes zero. Go is outside the repeated block.",
      "De lus omvat de beginwaarde en sluit nul uit. Go staat buiten het herhaalde blok.",
    ],
  }),
  lesson(8, "accumulate", {
    title: ["Keep a running total", "Houd een lopend totaal bij"],
    topics: "accumulators",
    requires: "while plus-equals",
    minutes: 16,
    intro: [
      "A counter tracks repetitions; an accumulator combines results across those repetitions.",
      "Een teller volgt herhalingen; een accumulator combineert resultaten over die herhalingen.",
    ],
    teach: [
      "Initialise total before the loop so it starts once. Add the current contribution during each iteration. The example sums 1, 2 and 3: total changes from 0 to 1, then 3, then 6.\n\nThe counter and total have different jobs. Updating one does not update the other. Print the final total after the loop if you want one summary rather than a line for every intermediate value.",
      "Initialiseer total vóór de lus zodat het eenmaal begint. Voeg tijdens elke iteratie de huidige bijdrage toe. Het voorbeeld telt 1, 2 en 3 op: total verandert van 0 naar 1, dan 3 en dan 6.\n\nDe teller en het totaal hebben verschillende taken. De ene bijwerken verandert de andere niet. Druk het eindtotaal na de lus af als je één samenvatting wilt in plaats van een regel voor elke tussenwaarde.",
    ],
    idea: [
      "Initialise an accumulator once and update it inside the loop.",
      "Initialiseer een accumulator eenmaal en werk hem binnen de lus bij.",
    ],
    example:
      "number = 1\ntotal = 0\nwhile number <= 3:\n    total += number\n    number += 1\nprint(total)",
    output: "6\n",
    predict: [
      "What is total just after adding 2?",
      "Wat is total direct nadat 2 is toegevoegd?",
    ],
    starter: "limit = 4\nnumber = 1\ntotal = 0\n",
    solution:
      "limit = 4\nnumber = 1\ntotal = 0\nwhile number <= limit:\n    total += number\n    number += 1\nprint(total)\n",
    steps: [
      step(
        [
          "Add every whole number from 1 through limit into total, then print total.",
          "Tel elk geheel getal van 1 tot en met limit op in total en druk total af.",
        ],
        "total == limit * (limit + 1) // 2 and _stdout.strip() == str(total)",
        [
          "Include limit with <=, add the current number, then advance it.",
          "Neem limit mee met <=, tel het huidige getal op en verhoog het daarna.",
        ],
        "total += number",
        [
          probe({ limit: 0 }, "total == 0"),
          probe({ limit: 1 }, "total == 1"),
          probe({ limit: 5 }, "total == 15"),
        ],
      ),
    ],
    experiment: [
      "Temporarily move total = 0 into the body. Predict why the accumulated history disappears.",
      "Verplaats total = 0 tijdelijk naar het blok. Voorspel waarom de opgebouwde geschiedenis verdwijnt.",
    ],
    note: [
      "The accumulator keeps earlier contributions. The counter advances independently toward the stopping condition.",
      "De accumulator behoudt eerdere bijdragen. De teller gaat onafhankelijk verder richting de stopvoorwaarde.",
    ],
  }),
  lesson(8, "stop-endless-loop", {
    title: [
      "Recognise and stop an endless loop",
      "Herken en stop een eindeloze lus",
    ],
    topics: "infinite-loops",
    requires: "while counters",
    guidance: "adapt",
    minutes: 14,
    intro: [
      "A loop needs a reason to stop. Learn to notice a missing update and use the Stop control if a program keeps running.",
      "Een lus heeft een reden nodig om te stoppen. Leer een ontbrekende wijziging herkennen en gebruik Stoppen als een programma blijft draaien.",
    ],
    teach: [
      "If count begins at 0 and the body never changes it, the condition count < 3 stays True forever. Repeated output may flood the terminal. Press Stop; wait for execution to end; then repair the code and Run again. The browser also has execution limits, but those limits are not a program's intended stopping rule.\n\nThe working example deliberately changes the counter toward its boundary. Ask two questions for every while loop: can the condition become False, and does the body actually make that happen? If you experiment by removing the update, restore it after using Stop.",
      "Als count op 0 begint en het blok het nooit verandert, blijft count < 3 altijd True. Herhaalde uitvoer kan de terminal overspoelen. Klik op Stoppen, wacht tot de uitvoering eindigt, herstel de code en kies opnieuw Uitvoeren. De browser heeft ook uitvoeringsgrenzen, maar die zijn niet de bedoelde stopregel van een programma.\n\nHet werkende voorbeeld verandert de teller bewust richting de grens. Stel bij elke while-lus twee vragen: kan de voorwaarde False worden en zorgt het blok daar werkelijk voor? Als je experimenteert door de wijziging te verwijderen, herstel die dan nadat je Stoppen hebt gebruikt.",
    ],
    idea: [
      "A stopping condition only helps if execution can reach it.",
      "Een stopvoorwaarde helpt alleen als de uitvoering haar kan bereiken.",
    ],
    example: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
    output: "0\n1\n2\n",
    predict: [
      "Which line prevents this loop from running forever?",
      "Welke regel voorkomt dat deze lus altijd blijft draaien?",
    ],
    starter: "count = 0\n# Write a loop that reaches 3, then finishes.\n",
    solution: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1\n",
    steps: [
      step(
        [
          "Write a terminating loop that prints 0, 1 and 2 and leaves count at 3.",
          "Schrijf een eindigende lus die 0, 1 en 2 afdrukt en count op 3 achterlaat.",
        ],
        `${uses("While")} and count == 3 and _stdout == "0\n1\n2\n"`,
        [
          "Advance the variable used in the condition on every iteration.",
          "Verhoog de variabele uit de voorwaarde tijdens elke herhaling.",
        ],
        "count += 1",
      ),
    ],
    experiment: [
      "With the Stop button in view, remove the update and try the program. Stop it, restore the update and verify a subsequent Run works.",
      "Verwijder met de knop Stoppen in beeld de wijziging en probeer het programma. Stop het, herstel de wijziging en controleer of opnieuw Uitvoeren werkt.",
    ],
    note: [
      "The finite version advances count until the condition becomes False. Stop interrupts execution; it does not repair the source.",
      "De eindige versie verhoogt count totdat de voorwaarde False wordt. Stoppen onderbreekt de uitvoering; het repareert de broncode niet.",
    ],
  }),
  lesson(8, "repeat-input", {
    title: ["Keep asking until a stop word", "Blijf vragen tot een stopwoord"],
    topics: "repeated-input",
    requires: "while input inequality normalisation",
    minutes: 17,
    intro: [
      "Use a changing answer as the loop condition. This is the foundation of a repeated menu.",
      "Gebruik een veranderend antwoord als lusvoorwaarde. Dit is de basis van een herhaald menu.",
    ],
    teach: [
      "Read the first answer before the loop. While it differs from the stop word, respond and read another answer inside the body. The second input updates the value used by the next condition check.\n\nForgetting that second input repeats the same response forever. Keep the stop word out of the ordinary response: when it arrives, the next test should skip the body. The example uses answers tea and quit.",
      "Lees het eerste antwoord vóór de lus. Zolang het verschilt van het stopwoord, reageer je en lees je binnen het blok een nieuw antwoord. De tweede input wijzigt de waarde voor de volgende voorwaardecontrole.\n\nAls je die tweede input vergeet, herhaalt steeds dezelfde reactie. Houd het stopwoord buiten de gewone reactie: zodra het binnenkomt moet de volgende test het blok overslaan. Het voorbeeld gebruikt de antwoorden tea en quit.",
    ],
    idea: [
      "Refresh the answer inside a loop whose condition depends on that answer.",
      "Ververs het antwoord binnen een lus waarvan de voorwaarde van dat antwoord afhangt.",
    ],
    example:
      'choice = input("Drink: ").strip().lower()\nwhile choice != "quit":\n    print(f"You chose {choice}")\n    choice = input("Drink: ").strip().lower()\nprint("Bye")',
    output: "Drink: You chose tea\nDrink: Bye\n",
    predict: [
      "What happens if the very first answer is quit?",
      "Wat gebeurt er als het allereerste antwoord quit is?",
    ],
    starter: "",
    solution:
      'choice = input("Item: ").strip().lower()\nwhile choice != "quit":\n    print(f"Added {choice}")\n    choice = input("Item: ").strip().lower()\nprint("Done")\n',
    inputs: ["book", "pen", "quit"],
    steps: [
      step(
        [
          'Read Item: repeatedly; print "Added " plus each normalised item until quit.',
          'Lees Item: herhaaldelijk; druk "Added " plus elk genormaliseerd artikel af tot quit.',
        ],
        '_stdout.removesuffix("Done\n") == "Item: Added book\nItem: Added pen\nItem: "',
        [
          "Read another answer inside the body so the condition can change.",
          "Lees een nieuw antwoord binnen het blok zodat de voorwaarde kan veranderen.",
        ],
        'choice = input("Item: ").strip().lower()',
        [
          {
            stdin: [" MAP ", "quit"],
            check:
              '_stdout.removesuffix("Done\n") == "Item: Added map\nItem: "',
          },
        ],
      ),
      step(
        [
          'Print "Done" once after stopping and never add quit as an item.',
          'Druk eenmaal "Done" af na het stoppen en voeg quit nooit als artikel toe.',
        ],
        '_stdout.endswith("Done\n") and _stdout.count("Done\n") == 1 and "Added quit" not in _stdout',
        [
          "Place the finishing message after the loop, with no indentation.",
          "Zet het eindbericht na de lus, zonder inspringing.",
        ],
        'print("Done")',
        [{ stdin: [" QUIT "], check: '_stdout == "Item: Done\n"' }],
      ),
    ],
    experiment: [
      "Quit immediately, then try two items before quitting. Trace where each answer is read.",
      "Stop onmiddellijk en probeer daarna twee artikelen vóór het stoppen. Volg waar elk antwoord wordt gelezen.",
    ],
    note: [
      "Both input calls use the same normalisation. The loop condition excludes the stop word from processing.",
      "Beide input-aanroepen gebruiken dezelfde normalisatie. De lusvoorwaarde sluit het stopwoord uit van verwerking.",
    ],
  }),
  lesson(8, "break", {
    title: ["Exit a loop with break", "Verlaat een lus met break"],
    topics: "break",
    requires: "while if input",
    minutes: 16,
    intro: [
      "break exits the nearest enclosing loop immediately. It lets you put the input and stop test together.",
      "break verlaat onmiddellijk de dichtstbijzijnde omvattende lus. Daarmee kun je invoer en stoptest bij elkaar zetten.",
    ],
    teach: [
      "while True repeats until something inside exits it. Read a command at the top of the body, then use if to recognise the stop word and break. Statements later in that iteration are skipped when break executes.\n\nThe statement after the loop still runs. Make the exit reachable; while True without a working break is endless. This pattern avoids repeating the input call before and inside the loop.",
      "while True herhaalt totdat iets binnenin de lus verlaat. Lees een opdracht bovenaan het blok en herken daarna met if het stopwoord en gebruik break. Instructies later in die iteratie worden overgeslagen wanneer break wordt uitgevoerd.\n\nDe instructie na de lus wordt nog steeds uitgevoerd. Zorg dat de uitgang bereikbaar is; while True zonder werkende break is eindeloos. Dit patroon voorkomt een dubbele input-aanroep vóór en binnen de lus.",
    ],
    idea: [
      "break exits the loop and continues with the statement after it.",
      "break verlaat de lus en gaat verder met de instructie erna.",
    ],
    example:
      'while True:\n    command = input("Command: ")\n    if command == "quit":\n        break\n    print(command)\nprint("Stopped")',
    output: "Command: help\nCommand: Stopped\n",
    predict: [
      "Does the stop word reach the print inside the loop?",
      "Bereikt het stopwoord de print binnen de lus?",
    ],
    starter: "",
    solution:
      'while True:\n    command = input("Command: ").strip().lower()\n    if command == "quit":\n        break\n    print("Working")\nprint("Stopped")\n',
    inputs: ["go", "quit"],
    steps: [
      step(
        [
          'Use while True and break to stop on quit; other commands print "Working". After the loop print "Stopped".',
          'Gebruik while True en break om bij quit te stoppen; andere opdrachten drukken "Working" af. Druk na de lus "Stopped" af.',
        ],
        `${uses("Break")} and _stdout == "Working\nStopped\n"`,
        [
          "Check for quitting before doing ordinary work in the loop.",
          "Controleer stoppen voordat je gewoon werk binnen de lus uitvoert.",
        ],
        'if command == "quit":',
        [{ stdin: [" QUIT "], check: '_stdout == "Stopped\n"' }],
        { ignorePrompts: true },
      ),
    ],
    experiment: [
      "Enter two work commands before quit. Explain which print is repeated and which runs once.",
      "Voer twee werkopdrachten in vóór quit. Leg uit welke print wordt herhaald en welke eenmaal draait.",
    ],
    note: [
      "The stop test comes before Working, so the quit command ends the loop without ordinary work.",
      "De stoptest staat vóór Working, zodat quit de lus beëindigt zonder gewoon werk.",
    ],
  }),
  lesson(8, "continue", {
    title: [
      "Skip one iteration with continue",
      "Sla één iteratie over met continue",
    ],
    topics: "continue",
    requires: "break while modulo",
    minutes: 16,
    intro: [
      "continue skips the rest of the current iteration and returns to the loop's next condition check.",
      "continue slaat de rest van de huidige iteratie over en keert terug naar de volgende voorwaardecontrole.",
    ],
    teach: [
      "Unlike break, continue does not leave the loop. It is useful when one value should be ignored but later values should still be processed.\n\nUpdate a counter before a continue can skip that update. Otherwise the same rejected value may repeat forever. The example advances first, then skips the value 2 and prints the other values.",
      "Anders dan break verlaat continue de lus niet. Het is nuttig wanneer één waarde moet worden genegeerd maar latere waarden nog verwerkt moeten worden.\n\nWerk een teller bij voordat continue die wijziging kan overslaan. Anders kan dezelfde afgewezen waarde altijd terugkomen. Het voorbeeld verhoogt eerst, slaat daarna 2 over en drukt de andere waarden af.",
    ],
    idea: [
      "continue skips this iteration's remaining work, not the entire loop.",
      "continue slaat het resterende werk van deze iteratie over, niet de hele lus.",
    ],
    example:
      "number = 0\nwhile number < 4:\n    number += 1\n    if number == 2:\n        continue\n    print(number)",
    output: "1\n3\n4\n",
    predict: [
      "Why does 3 still appear after 2 is skipped?",
      "Waarom verschijnt 3 nog nadat 2 is overgeslagen?",
    ],
    starter: "number = 0\nlimit = 6\n",
    solution:
      "number = 0\nlimit = 6\nwhile number < limit:\n    number += 1\n    if number % 2 == 0:\n        continue\n    print(number)\n",
    steps: [
      step(
        [
          "Count from 1 through limit. Use continue to skip even numbers and print only odd ones.",
          "Tel van 1 tot en met limit. Gebruik continue om even getallen over te slaan en druk alleen oneven getallen af.",
        ],
        `${uses("Continue")} and _stdout == "1\n3\n5\n" and number == limit`,
        [
          "Advance number first. An even number has remainder zero when divided by two.",
          "Verhoog number eerst. Een even getal heeft rest nul bij delen door twee.",
        ],
        "if number % 2 == 0:",
        [
          probe({ limit: 1 }, '_stdout == "1\n"'),
          probe({ limit: 0 }, '_stdout == ""'),
        ],
      ),
    ],
    experiment: [
      "Replace continue with break and compare the output. Explain why later odd values disappear.",
      "Vervang continue door break en vergelijk de uitvoer. Leg uit waarom latere oneven waarden verdwijnen.",
    ],
    note: [
      "Updating before the skip guarantees progress. The remainder test selects the values to ignore.",
      "Bijwerken vóór het overslaan garandeert voortgang. De resttest selecteert de waarden die worden genegeerd.",
    ],
  }),
  lesson(8, "repair-exit", {
    title: [
      "Repair a loop that exits too soon",
      "Herstel een lus die te vroeg stopt",
    ],
    topics: "loop-debugging",
    requires: "continue break",
    guidance: "adapt",
    minutes: 14,
    intro: [
      "This program finishes, but its output is incomplete. Diagnose the difference between skipping and stopping.",
      "Dit programma eindigt, maar de uitvoer is onvolledig. Onderzoek het verschil tussen overslaan en stoppen.",
    ],
    teach: [
      "A logic error can produce valid Python and incorrect behaviour. Run the starter, compare its output with the intended sequence, then locate the first iteration where they differ.\n\nThe example shows an intentional early exit at 3. Your starter should skip only 3 and continue to 4 and 5. Change the control statement that does not match that requirement.",
      "Een logische fout kan geldige Python en onjuist gedrag opleveren. Voer de startcode uit, vergelijk de uitvoer met de bedoelde reeks en zoek de eerste iteratie waarin ze verschillen.\n\nHet voorbeeld laat bewust een vroege uitgang bij 3 zien. Jouw startcode moet alleen 3 overslaan en verdergaan met 4 en 5. Verander de besturingsinstructie die niet bij die eis past.",
    ],
    idea: [
      "Compare the first unexpected iteration with the intended behaviour.",
      "Vergelijk de eerste onverwachte iteratie met het bedoelde gedrag.",
    ],
    example:
      "n = 0\nwhile n < 5:\n    n += 1\n    if n == 3:\n        break\n    print(n)",
    output: "1\n2\n",
    predict: [
      "Where does control go immediately after break?",
      "Waar gaat de uitvoering direct na break heen?",
    ],
    starter:
      "n = 0\nwhile n < 5:\n    n += 1\n    if n == 3:\n        break\n    print(n)\n",
    solution:
      "n = 0\nwhile n < 5:\n    n += 1\n    if n == 3:\n        continue\n    print(n)\n",
    steps: [
      step(
        [
          "Repair the program so it prints 1, 2, 4 and 5, each on a new line.",
          "Herstel het programma zodat het 1, 2, 4 en 5 afdrukt, elk op een nieuwe regel.",
        ],
        output("1\n2\n4\n5\n"),
        [
          "Only the current iteration should end at 3; the whole loop should keep going.",
          "Alleen de huidige iteratie moet bij 3 eindigen; de hele lus moet doorgaan.",
        ],
        "continue",
      ),
    ],
    experiment: [
      "Change the skipped value to 1, then 5. Predict which lines remain.",
      "Verander de overgeslagen waarde in 1 en daarna 5. Voorspel welke regels overblijven.",
    ],
    note: [
      "continue transfers control to the next loop test. The counter has already advanced, so the repaired loop still terminates.",
      "continue brengt de uitvoering naar de volgende lustest. De teller is al verhoogd, dus de herstelde lus eindigt nog steeds.",
    ],
  }),
  lesson(8, "session-summary", {
    title: ["Summarise a short session", "Vat een korte sessie samen"],
    topics: "loop-review",
    practices: "while break counters input",
    requires: "break repeated-input counters",
    guidance: "independent",
    minutes: 22,
    intro: [
      "Build a repeated conversation and report how much work it performed. This combines input, a stopping rule and a counter.",
      "Bouw een herhaald gesprek en rapporteer hoeveel werk het deed. Dit combineert invoer, een stopregel en een teller.",
    ],
    teach: [
      "Decide what counts as work before updating the counter. A stop command should finish the conversation, not count as another completed item. Keep the summary after the loop.\n\nThe example counts three fixed rounds. Your program counts actual answers until quit. Accept zero items: quitting immediately should produce a count of zero.",
      "Bepaal wat als werk telt voordat je de teller bijwerkt. Een stopopdracht moet het gesprek beëindigen en niet als nog een voltooid artikel meetellen. Houd de samenvatting na de lus.\n\nHet voorbeeld telt drie vaste rondes. Jouw programma telt echte antwoorden tot quit. Accepteer nul artikelen: onmiddellijk stoppen moet een telling van nul opleveren.",
    ],
    idea: [
      "Count accepted work, then print one summary after the loop finishes.",
      "Tel geaccepteerd werk en druk daarna één samenvatting af wanneer de lus eindigt.",
    ],
    example:
      'rounds = 0\nwhile rounds < 3:\n    rounds += 1\nprint(f"Rounds: {rounds}")',
    output: "Rounds: 3\n",
    predict: [
      "Why is the summary outside the loop?",
      "Waarom staat de samenvatting buiten de lus?",
    ],
    starter: "",
    solution:
      'count = 0\nwhile True:\n    item = input("Item: ").strip().lower()\n    if item == "quit":\n        break\n    count += 1\nprint(f"Items: {count}")\n',
    inputs: ["book", "map", "quit"],
    steps: [
      step(
        [
          "Read Item: repeatedly until a normalised quit command. Count the other answers in count.",
          "Lees Item: herhaaldelijk tot een genormaliseerde quit-opdracht. Tel de andere antwoorden in count.",
        ],
        "type(count) is int and count == 2",
        [
          "Initialise count before the loop and update it only after the stop check.",
          "Initialiseer count vóór de lus en werk het pas na de stopcontrole bij.",
        ],
        "count += 1",
        [
          { stdin: ["quit"], check: "count == 0" },
          { stdin: ["one", "two", "three", "quit"], check: "count == 3" },
        ],
      ),
      step(
        [
          'Print a final line such as "Items: 2" once after the loop.',
          'Druk eenmaal na de lus een laatste regel af zoals "Items: 2".',
        ],
        '_stdout.endswith(f"Items: {count}\n") and _stdout.count("Items:") == 1',
        [
          "The summary uses the counter and should not repeat for each item.",
          "De samenvatting gebruikt de teller en mag niet voor elk artikel worden herhaald.",
        ],
        'print(f"Items: {count}")',
        [{ stdin: [" QUIT "], check: '_stdout.endswith("Items: 0\n")' }],
      ),
    ],
    experiment: [
      "Quit immediately, then after one answer. Explain why the stop command is excluded from the count.",
      "Stop onmiddellijk en daarna na één antwoord. Leg uit waarom de stopopdracht niet wordt meegeteld.",
    ],
    note: [
      "The counter starts once and increments only for work. The break leads directly to the final report.",
      "De teller begint eenmaal en stijgt alleen voor werk. De break leidt rechtstreeks naar het eindverslag.",
    ],
  }),
];
for (const a of activities) {
  if (a.id.endsWith("-repeat-input"))
    a.sections[0].exampleInputs = ["tea", "quit"];
  if (a.id.endsWith("-break")) a.sections[0].exampleInputs = ["help", "quit"];
}
