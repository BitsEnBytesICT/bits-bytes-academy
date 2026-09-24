import { lesson, S, C, B, F } from "./authoring.mjs";
export const activities = [
  lesson(3, 1, {
    explanation: [
      "Replace repeated statements with one loop. Repetition is useful when the number of actions changes with the data.",
      "Vervang herhaalde opdrachten door één lus. Herhaling is nuttig wanneer het aantal acties met de gegevens verandert.",
    ],
    sections: [
      S(
        "why-loops for",
        ["One body, several executions", "Eén blok, meerdere uitvoeringen"],
        [
          "for assigns the next value to its loop variable, then executes the indented body. range(3) supplies 0, 1, 2; it stops before 3. Code after the loop runs once. The loop variable is a changing value, not a list you must create first.",
          "for geeft de volgende waarde aan de lusvariabele en voert dan het ingesprongen blok uit. range(3) levert 0, 1, 2; het stopt vóór 3. Code na de lus wordt één keer uitgevoerd. De lusvariabele is een veranderende waarde, geen lijst die je eerst moet maken.",
        ],
        'for number in range(3):\n    print(number + 1)\nprint("Ready")',
        "1\n2\n3\nReady\n",
        [
          "How many times is each print executed?",
          "Hoe vaak wordt elke print uitgevoerd?",
        ],
      ),
    ],
    starter:
      'count = 4\nprint("Ticket 1")\nprint("Ticket 2")\n# Replace these repeated statements.\n',
    solution:
      'count = 4\nfor number in range(count):\n    print(f"Ticket {number + 1}")\nprint("Done")\n',
    tasks: [
      C(
        "why-loops for",
        [
          "Print Ticket 1 through Ticket count with a for loop.",
          "Druk Ticket 1 tot en met Ticket count af met een for-lus.",
        ],
        '_stdout.splitlines()[:-1] == [f"Ticket {i + 1}" for i in range(count)] and any(isinstance(n,_ast.For) for n in _ast.walk(_ast.parse(_source)))',
        [
          [
            "One changing number can label every ticket.",
            "Eén veranderend getal kan elk kaartje benoemen.",
          ],
          [
            "range(count) starts at zero, so display number + 1.",
            "range(count) begint bij nul, dus toon number + 1.",
          ],
          ["for number in range(count):", "for number in range(count):"],
        ],
        [
          "Check the first and last labels. There should be count tickets.",
          "Controleer de eerste en laatste labels. Er moeten count kaartjes zijn.",
        ],
        [
          B({ count: 1 }, '_stdout.splitlines() == ["Ticket 1", "Done"]'),
          B({ count: 6 }, "len(_stdout.splitlines()) == 7"),
        ],
      ),
      C(
        "for",
        [
          "Print Done once after the loop, including when count is zero.",
          "Druk Done één keer na de lus af, ook als count nul is.",
        ],
        '_stdout.splitlines()[-1] == "Done" and _stdout.splitlines().count("Done") == 1',
        [
          [
            "A shared finishing action is outside the repeated block.",
            "Een afsluitende actie staat buiten het herhaalde blok.",
          ],
          [
            "Remove indentation from the final print.",
            "Haal de inspringing bij de laatste print weg.",
          ],
          ['print("Done")', 'print("Done")'],
        ],
        [
          "Done belongs after the loop, not inside it.",
          "Done hoort na de lus, niet erin.",
        ],
        [B({ count: 0 }, '_stdout.strip() == "Done"')],
      ),
    ],
    note: [
      "The loop generates labels from data; Done is outside the body. range(0) performs no iterations but still reaches the final print.",
      "De lus maakt labels uit gegevens; Done staat buiten het blok. range(0) voert geen iteraties uit maar bereikt wel de laatste print.",
    ],
    experiment: [
      "Try count = 0 and count = 7. Explain how this differs from copying a print statement seven times.",
      "Probeer count = 0 en count = 7. Leg uit hoe dit verschilt van zeven keer een print-opdracht kopiëren.",
    ],
  }),
  lesson(3, 2, {
    explanation: [
      "Use a range with a start, exclusive stop and step. Keep an accumulated total as the loop progresses.",
      "Gebruik een range met een begin, exclusief einde en stap. Houd een oplopend totaal bij terwijl de lus doorgaat.",
    ],
    sections: [
      S(
        "range-start-stop-step accumulators",
        ["Trace before running", "Volg voordat je uitvoert"],
        [
          "range(stop) starts at 0 with step 1. range(start, stop) changes the start; range(start, stop, step) also changes the step. A negative step counts down. Zero is not a valid step. Initialise an accumulator before the loop so it is not reset on every iteration.",
          "range(stop) begint bij 0 met stap 1. range(start, stop) verandert het begin; range(start, stop, step) verandert ook de stap. Een negatieve stap telt terug. Nul is geen geldige stap. Initialiseer een totaal vóór de lus zodat het niet bij elke iteratie opnieuw begint.",
        ],
        "total = 0\nfor n in range(6, 0, -2):\n    total += n\n    print(n, total)",
        "6 6\n4 10\n2 12\n",
        [
          "Write the next n and total for each iteration. Is zero included?",
          "Schrijf voor elke iteratie de volgende n en total op. Wordt nul meegenomen?",
        ],
      ),
    ],
    starter:
      "start = 2\nstop = 9\nstep = 2\ntotal = 0\n# Print each number, then the total.\n",
    solution:
      'start = 2\nstop = 9\nstep = 2\ntotal = 0\nfor number in range(start, stop, step):\n    total += number\n    print(number)\nprint(f"Total: {total}")\n',
    tasks: [
      C(
        "range-start-stop-step",
        [
          "Loop over range(start, stop, step) and print each number.",
          "Doorloop range(start, stop, step) en druk elk getal af.",
        ],
        "_stdout.splitlines()[:-1] == [str(n) for n in range(start,stop,step)]",
        [
          [
            "The stop is a boundary, not another item.",
            "Het einde is een grens, geen extra item.",
          ],
          [
            "Pass all three supplied values to range.",
            "Geef de drie meegeleverde waarden aan range.",
          ],
          [
            "for number in range(start, stop, step):",
            "for number in range(start, stop, step):",
          ],
        ],
        [
          "Check the exclusive stop and a negative step.",
          "Controleer het exclusieve einde en een negatieve stap.",
        ],
        [
          B(
            { start: 5, stop: 0, step: -2 },
            '_stdout.splitlines()[:-1] == ["5","3","1"]',
          ),
        ],
      ),
      C(
        "accumulators",
        [
          "Add each number to total and print Total: followed by total after the loop.",
          "Tel elk getal bij total op en druk na de lus Total: gevolgd door total af.",
        ],
        'total == 20 and _stdout.splitlines()[-1] == "Total: 20"',
        [
          [
            "The running total must survive each iteration.",
            "Het lopende totaal moet elke iteratie blijven bestaan.",
          ],
          [
            "Set total = 0 before the loop and update it inside.",
            "Zet total = 0 vóór de lus en werk het binnen de lus bij.",
          ],
          ["total += number", "total += number"],
        ],
        [
          "Resetting total inside the loop loses earlier numbers.",
          "total binnen de lus opnieuw instellen verliest eerdere getallen.",
        ],
        [
          B(
            { start: 3, stop: 3, step: 1 },
            'total == 0 and _stdout.strip() == "Total: 0"',
          ),
          B({ start: -2, stop: 3, step: 2 }, "total == 0"),
        ],
      ),
    ],
    note: [
      "The loop body prints individual values and updates one accumulator. An empty range leaves that accumulator at its initial value.",
      "Het lusblok drukt losse waarden af en werkt één totaal bij. Een lege range laat dat totaal op zijn beginwaarde staan.",
    ],
    experiment: [
      "Predict range(2, 8, 2) and range(8, 2, -2). Explain why their sums differ even though the boundaries are swapped.",
      "Voorspel range(2, 8, 2) en range(8, 2, -2). Leg uit waarom hun sommen verschillen hoewel de grenzen omgewisseld zijn.",
    ],
  }),
  lesson(3, 3, {
    explanation: [
      "Keep asking for commands until the visitor types quit. A while loop repeats while a condition remains true. Use exact lowercase commands for now.",
      "Blijf om commando’s vragen totdat de bezoeker quit typt. Een while-lus herhaalt zolang een voorwaarde waar blijft. Gebruik voorlopig exacte commando’s in kleine letters.",
    ],
    sections: [
      S(
        "while counters",
        ["Change the condition", "Verander de voorwaarde"],
        [
          "A while condition is checked before every iteration, including the first. Something in the body must make progress toward stopping. A counter records how many events have occurred. The first input can be read before the loop; read the next input at the end of the body.",
          "Een while-voorwaarde wordt vóór elke iteratie gecontroleerd, ook de eerste. Iets in het blok moet bijdragen aan stoppen. Een teller registreert hoeveel gebeurtenissen zijn opgetreden. De eerste invoer kan vóór de lus worden gelezen; lees de volgende invoer aan het einde van het blok.",
        ],
        'remaining = 3\nwhile remaining > 0:\n    print(remaining)\n    remaining -= 1\nprint("Lift off")',
        "3\n2\n1\nLift off\n",
        [
          "What happens when remaining starts at zero?",
          "Wat gebeurt er als remaining op nul begint?",
        ],
      ),
    ],
    starter:
      'command = input("Command: ")\ncount = 0\n# Keep reading commands until quit.\n',
    solution:
      'command = input("Command: ")\ncount = 0\nwhile command != "quit":\n    count += 1\n    print("Received")\n    command = input("Command: ")\nprint(f"Count: {count}")\n',
    inputs: ["help", "status", "quit"],
    tasks: [
      C(
        "while",
        [
          "Print Received for each command except quit. Read a new command every iteration.",
          "Druk Received af voor elk commando behalve quit. Lees elke iteratie een nieuw commando.",
        ],
        '_stdout.count("Received") == 2',
        [
          [
            "The loop stops when the condition becomes false.",
            "De lus stopt als de voorwaarde onwaar wordt.",
          ],
          [
            'Use command != "quit" and update command inside.',
            'Gebruik command != "quit" en werk command binnen de lus bij.',
          ],
          ['command = input("Command: ")', 'command = input("Command: ")'],
        ],
        [
          "Without a new input, the same command repeats forever. Use Stop if that happens.",
          "Zonder nieuwe invoer wordt hetzelfde commando eindeloos herhaald. Gebruik Stop als dat gebeurt.",
        ],
        [
          { stdin: ["quit"], check: '"Received" not in _stdout' },
          { stdin: ["a", "quit"], check: '_stdout.count("Received") == 1' },
        ],
      ),
      C(
        "counters",
        [
          "Count processed commands, excluding quit. Print Count: and count afterward.",
          "Tel verwerkte commando’s, zonder quit. Druk daarna Count: en count af.",
        ],
        'count == 2 and "Count: 2" in _stdout',
        [
          [
            "A command is counted only when the body runs.",
            "Een commando wordt alleen geteld als het blok wordt uitgevoerd.",
          ],
          [
            "Increment count once per iteration.",
            "Verhoog count één keer per iteratie.",
          ],
          ["count += 1", "count += 1"],
        ],
        [
          "Quitting immediately should report zero.",
          "Direct stoppen moet nul melden.",
        ],
        [
          { stdin: ["quit"], check: 'count == 0 and "Count: 0" in _stdout' },
          { stdin: ["a", "b", "c", "quit"], check: "count == 3" },
        ],
      ),
    ],
    note: [
      "The first read lets quit skip the body entirely. Updating command inside the loop ensures each condition uses the latest input.",
      "De eerste leesactie laat quit het blok volledig overslaan. command binnen de lus bijwerken zorgt dat elke voorwaarde de nieuwste invoer gebruikt.",
    ],
    experiment: [
      "Try quit immediately, then three commands before quit. Which lines run once, and which repeat?",
      "Probeer direct quit en daarna drie commando’s vóór quit. Welke regels worden één keer uitgevoerd en welke herhalen?",
    ],
  }),
  lesson(3, 4, {
    explanation: [
      "Repair a loop that exits for skip instead of ignoring that command. Learn the difference between leaving a loop and starting its next iteration.",
      "Repareer een lus die bij skip stopt in plaats van dat commando te negeren. Leer het verschil tussen een lus verlaten en de volgende iteratie beginnen.",
    ],
    sections: [
      S(
        "infinite-loops break continue",
        ["Leave or skip", "Verlaat of sla over"],
        [
          "break exits the nearest loop immediately. continue skips the rest of the current iteration. In a while loop, skipping a necessary update can create an infinite loop. Stop cancels a running program; repair the cause before Run again. while True is intentional when an input branch can break.",
          "break verlaat onmiddellijk de dichtstbijzijnde lus. continue slaat de rest van de huidige iteratie over. In een while-lus kan het overslaan van een nodige update een oneindige lus maken. Stop annuleert een actief programma; herstel de oorzaak vóór opnieuw Uitvoeren. while True is bewust als een invoertak kan stoppen met break.",
        ],
        "for n in range(5):\n    if n == 1:\n        continue\n    if n == 3:\n        break\n    print(n)",
        "0\n2\n",
        [
          "Why are neither 1 nor 3 printed? Why is 4 never reached?",
          "Waarom worden noch 1 noch 3 afgedrukt? Waarom wordt 4 nooit bereikt?",
        ],
      ),
    ],
    starter:
      'count = 0\nwhile True:\n    command = input("Command: ")\n    if command == "quit":\n        break\n    if command == "skip":\n        break  # Wrong action: repair it.\n    count += 1\nprint(count)\n',
    solution:
      'count = 0\nwhile True:\n    command = input("Command: ")\n    if command == "quit":\n        break\n    if command == "skip":\n        continue\n    count += 1\nprint(count)\n',
    inputs: ["skip", "play", "quit"],
    tasks: [
      C(
        "break continue",
        [
          "Ignore skip and continue reading, but exit on quit. Count all other commands.",
          "Negeer skip en blijf lezen, maar stop bij quit. Tel alle andere commando’s.",
        ],
        "count == 1",
        [
          [
            "Skipping one action is different from ending the session.",
            "Eén actie overslaan is anders dan de sessie beëindigen.",
          ],
          [
            "Keep break for quit; use continue for skip.",
            "Behoud break voor quit; gebruik continue voor skip.",
          ],
          [
            'if command == "skip":\n    continue',
            'if command == "skip":\n    continue',
          ],
        ],
        [
          "A skip must not prevent later commands from being counted.",
          "Een skip mag het tellen van latere commando’s niet verhinderen.",
        ],
        [
          {
            stdin: ["skip", "skip", "play", "play", "quit"],
            check: "count == 2",
          },
          { stdin: ["quit"], check: "count == 0" },
        ],
      ),
      C(
        "infinite-loops",
        [
          "Keep the input at the start of the body so skipped commands still reach a fresh read. Print the count once after stopping.",
          "Houd input aan het begin van het blok zodat overgeslagen commando’s weer nieuwe invoer bereiken. Druk de teller één keer na het stoppen af.",
        ],
        '_stdout.rstrip().endswith("1")',
        [
          [
            "Every path that repeats must reach a new input.",
            "Elke herhalende route moet nieuwe invoer bereiken.",
          ],
          [
            "Do not put the only input after continue.",
            "Zet de enige invoer niet na continue.",
          ],
          [
            'while True:\n    command = input("Command: ")',
            'while True:\n    command = input("Command: ")',
          ],
        ],
        [
          "Trace the skip path back to input, then the quit path out of the loop.",
          "Volg de skip-route terug naar input en de quit-route uit de lus.",
        ],
        [
          {
            stdin: ["skip", "quit"],
            check:
              'count == 0 and _stdout.rstrip().endswith("0") and _remaining_input == ""',
          },
        ],
      ),
    ],
    note: [
      "continue returns to the top where input reads another command; break bypasses that next read and reaches the final print. This placement prevents a skipped-input loop.",
      "continue gaat terug naar boven waar input een nieuw commando leest; break slaat die volgende leesactie over en bereikt de laatste print. Deze plaatsing voorkomt een lus die invoer overslaat.",
    ],
    experiment: [
      "Explain what would happen if input moved below the skip branch. Do not run an intentional infinite loop; practise Stop on a waiting-input program, then Run again.",
      "Leg uit wat zou gebeuren als input onder de skip-tak kwam. Voer niet bewust een oneindige lus uit; oefen Stop bij een programma dat op invoer wacht en voer daarna opnieuw uit.",
    ],
  }),
  lesson(3, 5, {
    explanation: [
      "Write a session counter from a brief. add increases points by 2, undo decreases points by 2, quit ends the session, and other commands change nothing. Count only add and undo actions.",
      "Schrijf een sessieteller uit een beschrijving. add verhoogt punten met 2, undo verlaagt punten met 2, quit beëindigt de sessie en andere commando’s veranderen niets. Tel alleen add- en undo-acties.",
    ],
    sections: [
      S(
        "loop-review",
        ["Follow one event at a time", "Volg één gebeurtenis tegelijk"],
        [
          "Choose a clear stopping rule and keep totals outside the loop. A brief can allow negative totals: do not invent a restriction that was not requested. Use a small trace table with columns command, points, actions to check your reasoning.",
          "Kies een duidelijke stopregel en bewaar totalen buiten de lus. Een beschrijving kan negatieve totalen toestaan: verzin geen beperking die niet gevraagd is. Gebruik een kleine volgtabel met kolommen command, points, actions om je redenering te controleren.",
        ],
        "total = 0\nfor n in range(3):\n    total += 2\nprint(total)",
        "6\n",
        [
          "Where must total = 0 stay to preserve earlier updates?",
          "Waar moet total = 0 blijven om eerdere updates te behouden?",
        ],
      ),
    ],
    starter: "# Build the command session here.\n",
    solution:
      'points = 0\nactions = 0\nwhile True:\n    command = input("Action: ")\n    if command == "quit":\n        break\n    if command == "add":\n        points += 2\n    elif command == "undo":\n        points -= 2\n    else:\n        continue\n    actions += 1\nprint(f"Points: {points}")\nprint(f"Actions: {actions}")\n',
    inputs: ["add", "add", "undo", "quit"],
    tasks: [
      C(
        "loop-review",
        [
          "Read commands until quit. Maintain points and actions according to the brief.",
          "Lees commando’s tot quit. Houd points en actions volgens de beschrijving bij.",
        ],
        "points == 2 and actions == 3",
        [
          [
            "Keep the state separate from the current command.",
            "Houd de toestand apart van het huidige commando.",
          ],
          [
            "Use a loop with one update branch for each recognised action.",
            "Gebruik een lus met één updatetak per herkende actie.",
          ],
          [
            'elif command == "undo":\n    points -= 2',
            'elif command == "undo":\n    points -= 2',
          ],
        ],
        [
          "Unknown commands and quit must not count as actions.",
          "Onbekende commando’s en quit mogen niet als acties tellen.",
        ],
        [
          { stdin: ["undo", "quit"], check: "points == -2 and actions == 1" },
          { stdin: ["oops", "quit"], check: "points == 0 and actions == 0" },
          { stdin: ["quit"], check: "points == 0 and actions == 0" },
        ],
      ),
      C(
        "loop-review",
        [
          "After stopping, print Points: and Actions: with their totals on separate lines.",
          "Druk na het stoppen Points: en Actions: met hun totalen op aparte regels af.",
        ],
        '"Points: 2\nActions: 3\n" in _stdout',
        [
          [
            "The report summarises the completed session.",
            "Het rapport vat de afgeronde sessie samen.",
          ],
          [
            "Put two f-string print calls after the loop.",
            "Zet twee f-string-print-aanroepen na de lus.",
          ],
          ['print(f"Actions: {actions}")', 'print(f"Actions: {actions}")'],
        ],
        [
          "Check both totals and print the report once after quit.",
          "Controleer beide totalen en druk het rapport één keer na quit af.",
        ],
        [{ stdin: ["quit"], check: '"Points: 0\nActions: 0\n" in _stdout' }],
      ),
    ],
    note: [
      "The state starts once. Unknown commands skip the counter, while recognised actions update both the points and the action count. A condition-based while loop is also valid.",
      "De toestand begint één keer. Onbekende commando’s slaan de teller over, terwijl herkende acties punten én actieteller bijwerken. Een while-lus met een voorwaarde is ook geldig.",
    ],
    experiment: [
      "Test undo before any add. Then add three unknown commands between recognised commands. The recognised-action count should stay the same.",
      "Test undo vóór een add. Voeg daarna drie onbekende commando’s tussen herkende commando’s toe. Het aantal herkende acties moet gelijk blijven.",
    ],
  }),
  lesson(4, 1, {
    explanation: [
      "Extract a repeated greeting into a function. A function names a reusable behaviour; defining it does not yet run its body.",
      "Haal een herhaalde begroeting uit de code en maak er een functie van. Een functie geeft herbruikbaar gedrag een naam; definiëren voert het blok nog niet uit.",
    ],
    sections: [
      S(
        "why-functions defining-functions calling-functions execution-flow builtins-vs-user-functions",
        ["Define, then call", "Definieer en roep aan"],
        [
          "Python supplies built-in functions such as print and int. def lets you define your own. The colon and indentation mark the function body. Execution skips that body until a call uses parentheses. After the call finishes, execution resumes after the call site.",
          "Python levert ingebouwde functies zoals print en int. Met def definieer je je eigen functies. De dubbele punt en inspringing markeren het functieblok. De uitvoering slaat dat blok over totdat een aanroep haakjes gebruikt. Na de aanroep gaat de uitvoering verder op de aanroepplek.",
        ],
        'def announce():\n    print("Open")\n\nprint("Before")\nannounce()\nprint("After")',
        "Before\nOpen\nAfter\n",
        [
          "Why does Open appear after Before although its print is higher in the file?",
          "Waarom verschijnt Open na Before hoewel die print hoger in het bestand staat?",
        ],
      ),
    ],
    starter: "# Define welcome() then call it twice.\n",
    solution:
      'def welcome():\n    print("Welcome to the lab")\n\nwelcome()\nwelcome()\n',
    tasks: [
      C(
        "defining-functions calling-functions builtins-vs-user-functions",
        [
          'Define welcome() to print "Welcome to the lab" when called.',
          'Definieer welcome() om "Welcome to the lab" af te drukken wanneer aangeroepen.',
        ],
        "callable(welcome)",
        [
          [
            "Give the repeated behaviour a name.",
            "Geef het herhaalde gedrag een naam.",
          ],
          [
            "Indent print under def welcome():.",
            "Spring print in onder def welcome():.",
          ],
          ["def welcome():", "def welcome():"],
        ],
        [
          "A function must be callable, not a variable holding the message.",
          "Een functie moet aanroepbaar zijn, geen variabele met het bericht.",
        ],
        [F("welcome", [], '_call_stdout == "Welcome to the lab\n"')],
      ),
      C(
        "why-functions execution-flow",
        [
          "Call welcome() twice from outside its body.",
          "Roep welcome() twee keer aan buiten het functieblok.",
        ],
        '_stdout == "Welcome to the lab\nWelcome to the lab\n"',
        [
          [
            "The definition does not run the function.",
            "De definitie voert de functie niet uit.",
          ],
          [
            "Use parentheses in each call and return to outer indentation.",
            "Gebruik haakjes bij elke aanroep en ga terug naar de buitenste inspringing.",
          ],
          ["welcome()", "welcome()"],
        ],
        [
          "A call inside welcome would call itself. Place both calls after the definition.",
          "Een aanroep binnen welcome zou zichzelf aanroepen. Zet beide aanroepen na de definitie.",
        ],
      ),
    ],
    note: [
      "The message is written once and executed twice. Python’s built-in print is called inside the user-defined welcome function.",
      "Het bericht wordt één keer geschreven en twee keer uitgevoerd. Pythons ingebouwde print wordt binnen de zelfgedefinieerde welcome aangeroepen.",
    ],
    experiment: [
      "Change the message in one place. Explain why both calls now display it. Add a print before the calls and trace execution order.",
      "Wijzig het bericht op één plek. Leg uit waarom beide aanroepen het nu tonen. Voeg een print vóór de aanroepen toe en volg de uitvoervolgorde.",
    ],
  }),
  lesson(4, 2, {
    explanation: [
      "Return a computed result so another part of a program can use it. Printing a value and returning it serve different purposes.",
      "Geef een berekend resultaat terug zodat een ander deel van het programma het kan gebruiken. Een waarde afdrukken en teruggeven dienen verschillende doelen.",
    ],
    sections: [
      S(
        "return none parameters multiple-parameters",
        ["Inputs and results", "Invoer en resultaten"],
        [
          "Parameters are names in a definition; arguments are the values supplied by a call. Multiple parameters are separated by commas. return sends a value back and ends that call. A function with no return value returns None, a value representing no result. print displays text and itself returns None.",
          "Parameters zijn namen in een definitie; argumenten zijn waarden die een aanroep meegeeft. Meerdere parameters worden door komma’s gescheiden. return stuurt een waarde terug en beëindigt die aanroep. Een functie zonder terugkeerwaarde geeft None terug, een waarde voor geen resultaat. print toont tekst en geeft zelf None terug.",
        ],
        'def area(width, height):\n    return width * height\n\nresult = area(3, 4)\nprint(result + 1)\ndef announce():\n    print("Hello")\nprint(announce())',
        "13\nHello\nNone\n",
        [
          "Which function can be used in a later calculation?",
          "Welke functie kan in een latere berekening worden gebruikt?",
        ],
      ),
    ],
    starter:
      "def total(price, quantity):\n    print(price * quantity)  # Change how the result leaves the function.\n\nresult = total(2.5, 4)\nprint(result)\n",
    solution:
      "def total(price, quantity):\n    return price * quantity\n\nresult = total(2.5, 4)\nprint(result)\n",
    tasks: [
      C(
        "return parameters multiple-parameters",
        [
          "Make total(price, quantity) return their product for any numeric arguments.",
          "Laat total(price, quantity) hun product teruggeven voor elke numerieke invoer.",
        ],
        "result == 10",
        [
          [
            "The caller needs a number, not terminal text.",
            "De aanroeper heeft een getal nodig, geen terminaltekst.",
          ],
          [
            "Use return instead of printing inside total.",
            "Gebruik return in plaats van afdrukken binnen total.",
          ],
          ["return price * quantity", "return price * quantity"],
        ],
        [
          "A printed product leaves result as None.",
          "Een afgedrukt product laat result op None staan.",
        ],
        [
          F("total", [0, 8], "_return == 0"),
          F("total", [3, 2], "_return == 6"),
          F("total", [-2, 4], "_return == -8"),
        ],
      ),
      C(
        "none",
        [
          "Keep display outside total: calling total must not print anything. Print result once in main.py.",
          "Houd uitvoer buiten total: total aanroepen mag niets afdrukken. Druk result één keer in main.py af.",
        ],
        '_stdout.strip() == "10.0"',
        [
          [
            "A reusable calculation can work without a terminal.",
            "Een herbruikbare berekening kan zonder terminal werken.",
          ],
          [
            "Keep only a return statement in the calculation body.",
            "Houd alleen een return-opdracht in het rekenblok.",
          ],
          [
            "result = total(2.5, 4)\nprint(result)",
            "result = total(2.5, 4)\nprint(result)",
          ],
        ],
        [
          "Separate display from the returned value.",
          "Scheid uitvoer van de teruggegeven waarde.",
        ],
        [F("total", [7, 3], '_return == 21 and _call_stdout == ""')],
      ),
    ],
    note: [
      "Returning the product lets the caller print it, store it or combine it with other numbers. Removing the inner print prevents duplicate output.",
      "Het product teruggeven laat de aanroeper het afdrukken, bewaren of met andere getallen combineren. Het verwijderen van de binnenste print voorkomt dubbele uitvoer.",
    ],
    experiment: [
      "Temporarily remove return and run again. Explain why None appears, then restore return and add 1 to result in the caller.",
      "Verwijder return tijdelijk en voer opnieuw uit. Leg uit waarom None verschijnt, herstel return en tel 1 bij result op in de aanroeper.",
    ],
  }),
  lesson(4, 3, {
    explanation: [
      "Repair a function that depends on a global variable. Parameters make the data a function needs visible at the call site.",
      "Repareer een functie die van een globale variabele afhangt. Parameters maken de benodigde gegevens zichtbaar op de aanroepplek.",
    ],
    sections: [
      S(
        "local-scope",
        ["Local names", "Lokale namen"],
        [
          "A parameter and a name assigned inside a function belong to that call’s local scope. Reading an unrelated outer variable hides a dependency. Passing the value explicitly allows different calls to work independently. A local assignment does not replace a same-named variable outside the function.",
          "Een parameter en een naam die binnen een functie wordt toegewezen horen bij het lokale bereik van die aanroep. Een niet-gerelateerde buitenste variabele lezen verbergt een afhankelijkheid. De waarde expliciet meegeven laat verschillende aanroepen onafhankelijk werken. Een lokale toewijzing vervangt geen gelijknamige variabele buiten de functie.",
        ],
        "value = 100\ndef doubled(value):\n    result = value * 2\n    return result\nprint(doubled(3))\nprint(value)",
        "6\n100\n",
        [
          "Which value is used inside doubled, and why does 100 remain?",
          "Welke waarde wordt binnen doubled gebruikt en waarom blijft 100 behouden?",
        ],
      ),
    ],
    starter:
      "distance = 100\ndef travel_cost(km, rate):\n    cost = distance * rate\n    return cost\n\nprint(travel_cost(5, 2))\n",
    solution:
      "distance = 100\ndef travel_cost(km, rate):\n    cost = km * rate\n    return cost\n\nprint(travel_cost(5, 2))\n",
    tasks: [
      C(
        "local-scope",
        [
          "Use km and rate to calculate travel_cost. Do not read the outer distance.",
          "Gebruik km en rate om travel_cost te berekenen. Lees niet de buitenste distance.",
        ],
        '_stdout.strip() == "10"',
        [
          [
            "The parameter is the caller’s chosen distance.",
            "De parameter is de afstand die de aanroeper kiest.",
          ],
          [
            "Replace the hidden dependency in the multiplication.",
            "Vervang de verborgen afhankelijkheid in de vermenigvuldiging.",
          ],
          ["cost = km * rate", "cost = km * rate"],
        ],
        [
          "A different outer distance should not change the function’s answer.",
          "Een andere buitenste distance mag het functieantwoord niet veranderen.",
        ],
        [
          F("travel_cost", [3, 4], "_return == 12", {
            inputs: { distance: 999 },
          }),
          F("travel_cost", [0, 10], "_return == 0"),
        ],
      ),
      C(
        "local-scope",
        [
          "Keep cost local and leave distance unchanged by calls.",
          "Houd cost lokaal en laat distance door aanroepen ongewijzigd.",
        ],
        'distance == 100 and "cost" not in globals()',
        [
          [
            "A temporary calculation belongs inside the function.",
            "Een tijdelijke berekening hoort binnen de functie.",
          ],
          [
            "Avoid a global declaration or reassigning distance.",
            "Vermijd een global-declaratie of opnieuw toewijzen aan distance.",
          ],
          [
            "return cost sends the value out without making its name global.",
            "return cost geeft de waarde terug zonder de naam globaal te maken.",
          ],
        ],
        [
          "Keep the caller’s state independent of this calculation.",
          "Houd de toestand van de aanroeper onafhankelijk van deze berekening.",
        ],
        [
          F(
            "travel_cost",
            [2, 3],
            '_return == 6 and distance == 100 and "cost" not in globals()',
          ),
        ],
      ),
    ],
    note: [
      "The calculation now depends only on its arguments. The local name cost helps explain the step but does not escape into the caller’s namespace.",
      "De berekening hangt nu alleen van de argumenten af. De lokale naam cost verduidelijkt de stap maar komt niet in de naamruimte van de aanroeper terecht.",
    ],
    experiment: [
      "Change outer distance to -50. Call travel_cost with 5 and 2 again. Explain why its result should still be 10.",
      "Verander de buitenste distance in -50. Roep travel_cost opnieuw aan met 5 en 2. Leg uit waarom het resultaat nog steeds 10 moet zijn.",
    ],
  }),
  lesson(4, 4, {
    explanation: [
      "Give a function a useful default while allowing callers to name arguments. Use an early return for a simple special case.",
      "Geef een functie een nuttige standaard terwijl aanroepers argumenten kunnen benoemen. Gebruik een vroege return voor een eenvoudig bijzonder geval.",
    ],
    sections: [
      S(
        "positional-arguments keyword-arguments default-arguments early-return",
        ["Choose how to call", "Kies hoe je aanroept"],
        [
          "Positional arguments match parameters by order. Keyword arguments match by name. A default is used only when the argument is omitted. Required parameters precede default parameters. return ends the call immediately, so an early return can handle a special case before the main calculation.",
          "Positionele argumenten passen op volgorde bij parameters. Benoemde argumenten passen op naam. Een standaard wordt alleen gebruikt als het argument ontbreekt. Verplichte parameters staan vóór standaardparameters. return beëindigt de aanroep direct, dus een vroege return kan een bijzonder geval vóór de hoofdberekening afhandelen.",
        ],
        'def label(name, prefix="Hi"):\n    if name == "":\n        return "Guest"\n    return prefix + " " + name\nprint(label("Ada"))\nprint(label(prefix="Hello", name="Bo"))\nprint(label(""))',
        "Hi Ada\nHello Bo\nGuest\n",
        [
          "Which call uses the default? Which does not reach concatenation?",
          "Welke aanroep gebruikt de standaard? Welke bereikt het samenvoegen niet?",
        ],
      ),
    ],
    starter:
      "def delivery(items, fee=3):\n    # Return zero for no items; otherwise items * fee.\n    return -1\n\nprint(delivery(2))\n",
    solution:
      "def delivery(items, fee=3):\n    if items <= 0:\n        return 0\n    return items * fee\n\nprint(delivery(2))\n",
    tasks: [
      C(
        "default-arguments positional-arguments keyword-arguments",
        [
          "Return items * fee, using fee=3 when omitted. Accept calls by position or by parameter name.",
          "Geef items * fee terug, met fee=3 als die ontbreekt. Accepteer aanroepen op positie of parameternaam.",
        ],
        '_stdout.strip() == "6"',
        [
          [
            "Defaults belong in the definition, not in every call.",
            "Standaarden horen in de definitie, niet in elke aanroep.",
          ],
          [
            "Use the provided parameter fee rather than a fixed multiplier.",
            "Gebruik de parameter fee in plaats van een vaste vermenigvuldiger.",
          ],
          ["def delivery(items, fee=3):", "def delivery(items, fee=3):"],
        ],
        [
          "Check both an omitted fee and an explicitly supplied fee of zero.",
          "Controleer zowel een ontbrekende fee als een expliciete fee van nul.",
        ],
        [
          F("delivery", [4], "_return == 12"),
          F("delivery", [4, 0], "_return == 0"),
          {
            call: { name: "delivery", args: [], kwargs: { fee: 2, items: 5 } },
            check: "_return == 10",
          },
        ],
      ),
      C(
        "early-return",
        [
          "Return 0 for items <= 0 before doing the ordinary calculation.",
          "Geef 0 terug voor items <= 0 voordat je de gewone berekening uitvoert.",
        ],
        "delivery(0) == 0",
        [
          [
            "The special case covers zero and negative counts.",
            "Het bijzondere geval omvat nul en negatieve aantallen.",
          ],
          [
            "Put an if and return at the top of the body.",
            "Zet if en return boven in het blok.",
          ],
          ["if items <= 0:\n    return 0", "if items <= 0:\n    return 0"],
        ],
        [
          "Negative item counts should not create a negative charge.",
          "Negatieve aantallen mogen geen negatieve kosten geven.",
        ],
        [
          F("delivery", [-3, 5], "_return == 0"),
          F("delivery", [0], "_return == 0"),
        ],
      ),
    ],
    note: [
      "A default handles omission, not falsiness: an explicit fee of 0 is honoured. The early return prevents the ordinary calculation for nonpositive item counts.",
      "Een standaard behandelt ontbreken, niet onwaarheid: een expliciete fee van 0 blijft gelden. De vroege return voorkomt de gewone berekening bij niet-positieve aantallen.",
    ],
    experiment: [
      "Compare delivery(3), delivery(3, 0) and delivery(fee=2, items=3). Explain how each parameter gets its value.",
      "Vergelijk delivery(3), delivery(3, 0) en delivery(fee=2, items=3). Leg uit hoe elke parameter zijn waarde krijgt.",
    ],
  }),
  lesson(4, 5, {
    explanation: [
      "Implement a reusable booking calculation. A booking has seats at a price, with a discount applied once. A nonpositive seat count costs zero; the final total must never be negative.",
      "Implementeer een herbruikbare boekingsberekening. Een boeking heeft plaatsen met een prijs en een eenmalige korting. Een niet-positief aantal plaatsen kost nul; het eindtotaal mag nooit negatief zijn.",
    ],
    sections: [
      S(
        "function-review",
        ["Define a contract", "Definieer een afspraak"],
        [
          "A function contract describes inputs and an observable result. Decide which boundary cases follow from that description before coding. Keep input and printing outside a reusable calculation; that makes the function easy to call from a calculator later.",
          "Een functieafspraak beschrijft invoer en een waarneembaar resultaat. Bepaal vóór het coderen welke grensgevallen uit die beschrijving volgen. Houd input en print buiten een herbruikbare berekening; daardoor kan een rekenmachine de functie later gemakkelijk aanroepen.",
        ],
        "def remaining(capacity, used):\n    amount = capacity - used\n    if amount < 0:\n        return 0\n    return amount\nprint(remaining(5, 8))",
        "0\n",
        [
          "Which boundary prevents an impossible negative result?",
          "Welke grens voorkomt een onmogelijk negatief resultaat?",
        ],
      ),
    ],
    starter:
      "def booking_total(seats, price, discount=0):\n    pass\n\nprint(booking_total(3, 4, 2))\n",
    solution:
      "def booking_total(seats, price, discount=0):\n    if seats <= 0:\n        return 0\n    total = seats * price - discount\n    if total < 0:\n        return 0\n    return total\n\nprint(booking_total(3, 4, 2))\n",
    tasks: [
      C(
        "function-review",
        [
          "Implement booking_total(seats, price, discount=0) with the described calculation, returning the number without printing inside the function.",
          "Implementeer booking_total(seats, price, discount=0) met de beschreven berekening en geef het getal terug zonder binnen de functie af te drukken.",
        ],
        '_stdout.strip() == "10"',
        [
          [
            "Reuse the receipt calculation, now with parameters.",
            "Hergebruik de bonberekening, nu met parameters.",
          ],
          [
            "Subtract the discount once from the whole booking.",
            "Trek de korting één keer van de hele boeking af.",
          ],
          [
            "total = seats * price - discount",
            "total = seats * price - discount",
          ],
        ],
        [
          "The result must depend on the supplied arguments and remain available to the caller.",
          "Het resultaat moet afhangen van de argumenten en beschikbaar blijven voor de aanroeper.",
        ],
        [
          F("booking_total", [2, 3], '_return == 6 and _call_stdout == ""'),
          {
            call: {
              name: "booking_total",
              args: [],
              kwargs: { price: 2.5, seats: 4, discount: 1 },
            },
            check: "_return == 9",
          },
        ],
      ),
      C(
        "function-review",
        [
          "Handle zero or negative seats and discounts larger than the subtotal by returning 0.",
          "Handel nul of negatieve plaatsen en kortingen groter dan het subtotaal af door 0 terug te geven.",
        ],
        "booking_total(0,4,0) == 0",
        [
          [
            "There are two different paths to a zero result.",
            "Er zijn twee verschillende routes naar een nulresultaat.",
          ],
          [
            "Check seats first, then check the calculated total.",
            "Controleer eerst seats en daarna het berekende totaal.",
          ],
          ["if total < 0:\n    return 0", "if total < 0:\n    return 0"],
        ],
        [
          "A valid ordinary case is not enough: check an empty booking and an excessive discount.",
          "Een geldig gewoon geval is niet genoeg: controleer een lege boeking en een te hoge korting.",
        ],
        [
          F("booking_total", [-1, 8], "_return == 0"),
          F("booking_total", [1, 2, 5], "_return == 0"),
          F("booking_total", [1, 2, 2], "_return == 0"),
        ],
      ),
    ],
    note: [
      "The two guards state the boundary rules; the normal path computes the price once. max(0, ...) can also express the lower bound when the seat-count rule is preserved.",
      "De twee controles verwoorden de grensregels; de normale route berekent de prijs één keer. max(0, ...) kan ook de ondergrens uitdrukken als de regel voor het aantal plaatsen behouden blijft.",
    ],
    experiment: [
      "Write four calls covering ordinary, omitted discount, no seats and an excessive discount. Explain the expected result before running each.",
      "Schrijf vier aanroepen voor gewoon, ontbrekende korting, geen plaatsen en te hoge korting. Leg het verwachte resultaat vóór elke uitvoering uit.",
    ],
  }),
];
