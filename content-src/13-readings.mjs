import { activities, loc, section as S } from "./helpers.mjs";
function article(chapter, id, enTitle, nlTitle, en, nl, code, options = {}) {
  activities.push({
    id,
    chapter,
    group: "reading",
    title: loc(enTitle, nlTitle),
    kind: "reading",
    optional: false,
    explanation: loc(en, nl),
    example: options.example || "",
    ...(options.sections ? { sections: options.sections } : {}),
    files: { "main.py": code },
    solution: { "main.py": options.solution || code },
    checkpoints: [],
    solutionNote:
      options.solutionNote ||
      loc(
        "This is an exploration activity. Run the example, change one input, and explain the new result in your own words.",
        "Dit is een verkenningsactiviteit. Voer het voorbeeld uit, verander één invoer en leg het nieuwe resultaat in je eigen woorden uit.",
      ),
    ...(options.inputs ? { inputs: options.inputs } : {}),
  });
}
article(
  1,
  "reading-input",
  "Input from the terminal",
  "Invoer via de terminal",
  "Until now, your programs have used values written directly in the file. An interactive program asks the person running it for information. `input()` pauses the program, reads one line from the terminal, and returns that line as a string. You can assign that result to a name just like any other value.",
  "Tot nu toe gebruikten je programma's waarden die direct in het bestand stonden. Een interactief programma vraagt de gebruiker om informatie. `input()` pauzeert het programma, leest één regel uit de terminal en geeft die regel terug als string. Je kunt dit resultaat net als een andere waarde aan een naam toewijzen.",
  '# A ticket machine asks for the information it needs.\nname = input("Your name: ")\ndestination = input("Destination: ")\nprint("Welcome, " + name + "!")\nprint("Your destination is " + destination + ".")\n\n# Add a question about the number of tickets below.\n',
  {
    inputs: ["Alex", "Delft", "3"],
    solution:
      'name = input("Your name: ")\ndestination = input("Destination: ")\nprint("Welcome, " + name + "!")\nprint("Your destination is " + destination + ".")\nticket_text = input("How many tickets? ")\ntickets = int(ticket_text)\ncost = tickets * 4\nprint("Total: " + str(cost))\n',
    solutionNote: loc(
      "Each input call waits for one answer. The first two answers remain text. int(ticket_text) converts the third into a count so multiplication calculates a price. str(cost) converts the result back to text for the message. An invalid quantity raises ValueError; this exploration intentionally leaves that visible.",
      "Elke input-aanroep wacht op één antwoord. De eerste twee antwoorden blijven tekst. int(ticket_text) zet het derde om naar een aantal, zodat de vermenigvuldiging een prijs berekent. str(cost) zet het resultaat terug naar tekst voor het bericht. Een ongeldige hoeveelheid veroorzaakt ValueError; in deze verkenning blijft die fout bewust zichtbaar.",
    ),
    sections: [
      S(
        "Ask, wait, then continue",
        "Vragen, wachten en verdergaan",
        "The optional text inside `input()` is a prompt. It tells the person what to enter. Execution pauses at that call until they type a line and press Enter. The variable receives their answer without the final newline, and Python continues to the next instruction.\n\nRun the ticket-machine starter. Enter your name, press Enter, then enter a destination. While the program is waiting, the terminal sends what you type to the program rather than treating it as a Python command.",
        "De optionele tekst binnen `input()` is een prompt. Deze vertelt de gebruiker wat die moet invoeren. De uitvoering wacht bij die aanroep totdat iemand een regel typt en op Enter drukt. De variabele krijgt het antwoord zonder het afsluitende regeleinde en Python gaat verder met de volgende instructie.\n\nVoer de startcode van de kaartjesautomaat uit. Voer je naam in, druk op Enter en voer daarna een bestemming in. Terwijl het programma wacht, stuurt de terminal je tekst naar het programma in plaats van deze als Python-opdracht te behandelen.",
        'city = input("Where are you going? ")\nprint("Next stop: " + city)',
        undefined,
        "If you enter Delft, the printed response is Next stop: Delft. You can run the same file again and supply a different destination without editing the code.",
        "Voer je Delft in, dan is het afgedrukte antwoord Next stop: Delft. Je kunt hetzelfde bestand opnieuw uitvoeren en een andere bestemming opgeven zonder de code aan te passen.",
      ),
      S(
        "Digits still arrive as text",
        "Cijfers komen ook binnen als tekst",
        'If someone types 3, `input()` returns the string `"3"`, not the integer `3`. Convert suitable text with `int()` before doing a whole-number calculation, or use `float()` when a decimal is allowed. The conversion creates a numeric value; it does not change the original text variable.',
        'Als iemand 3 typt, geeft `input()` de string `"3"` terug, niet de integer `3`. Zet geschikte tekst eerst met `int()` om voordat je met gehele getallen rekent, of gebruik `float()` wanneer decimalen zijn toegestaan. De omzetting maakt een numerieke waarde; de oorspronkelijke tekstvariabele verandert niet.',
        'quantity_text = "3"\nquantity = int(quantity_text)\nprint(quantity * 4)',
        "12",
      ),
      S(
        "Extend the ticket machine",
        "Breid de kaartjesautomaat uit",
        'First, add `ticket_text = input("How many tickets? ")` after the current messages. Run and check that the third question appears only after the first two answers.\n\nNext, convert ticket_text to an integer called `tickets`. Calculate `cost` at 4 euros per ticket and print `"Total: " + str(cost)`. Three tickets should cost 12. Try a different quantity and predict the new total.\n\nFinally, try entering a word when the program expects a number. `int()` raises ValueError because the text cannot be converted. Run again with a valid number to recover. You will learn how programs can handle such errors in a later lesson.',
        'Voeg eerst na de huidige berichten `ticket_text = input("How many tickets? ")` toe. Voer de code uit en controleer dat de derde vraag pas na de eerste twee antwoorden verschijnt.\n\nZet ticket_text vervolgens om naar een integer met de naam `tickets`. Bereken `cost` bij 4 euro per kaartje en druk `"Total: " + str(cost)` af. Drie kaartjes moeten 12 kosten. Probeer een andere hoeveelheid en voorspel het nieuwe totaal.\n\nVoer tot slot eens een woord in waar het programma een getal verwacht. `int()` geeft ValueError omdat de tekst niet kan worden omgezet. Voer opnieuw uit met een geldig getal om verder te gaan. Later leer je hoe programma\'s zulke fouten kunnen afhandelen.',
      ),
    ],
  },
);
article(
  2,
  "reading-match",
  "Pattern matching",
  "Pattern matching",
  "match checks a value against case patterns. For simple literal cases it can express several alternatives clearly. case _ is a wildcard fallback; default is not a special Python keyword.\n\nPattern matching was added in Python 3.10. It supports richer structure matching too, but ordinary if/elif remains useful for comparisons such as ranges and thresholds.",
  "match vergelijkt een waarde met case-patterns. Bij eenvoudige literals maakt dit meerdere alternatieven overzichtelijk. case _ is de wildcard-fallback; default is geen speciaal Python-keyword.\n\nPattern matching bestaat vanaf Python 3.10 en kan ook complexere structuren herkennen. Gewone if/elif blijft handig voor vergelijkingen zoals intervallen en grenswaarden.",
  'command = "start"\nmatch command:\n    case "start":\n        print("Starting")\n    case "stop":\n        print("Stopping")\n    case _:\n        print("Unknown command")\n',
);
article(
  3,
  "reading-tuples",
  "Tuples",
  "Tuples",
  "A tuple is an immutable sequence. Indexing, slicing, len(), count(), and index() work much like they do with lists, but you cannot assign a new element at an index.\n\nCommas create tuples: a one-element tuple needs a trailing comma, such as (7,). Tuple unpacking assigns consecutive values to separate names. Immutability describes the tuple’s element references; a mutable object inside it can still change.",
  "Een tuple is een immutable sequence. Indexes, slices, len(), count() en index() werken vergelijkbaar met lists, maar je kunt geen nieuw element aan een index toewijzen.\n\nKomma’s maken tuples: een tuple met één element heeft een afsluitende komma nodig, zoals (7,). Met tuple unpacking wijs je opeenvolgende waarden toe aan aparte namen. Immutability gaat over de verwijzingen in de tuple; een mutable object erin kan nog wel veranderen.",
  "point = (4, 9)\nx, y = point\nprint(x, y)\nprint(point[0], len(point))\nsingle = (7,)\nprint(type(single))\n",
);
article(
  3,
  "reading-zip",
  "Pairing sequences with zip",
  "Sequences koppelen met zip",
  "zip pairs elements at the same positions from separate iterables. It returns an iterator, so use list() to inspect its pairs. By default it stops at the shortest input.\n\nUse tuple unpacking in a for loop to give each part of a pair a clear name. This is useful when labels and measurements arrive separately.",
  "zip koppelt elementen op dezelfde posities uit verschillende iterables. Het resultaat is een iterator; gebruik list() om de paren te bekijken. Standaard stopt zip bij de kortste invoer.\n\nGebruik tuple unpacking in een for loop om elk deel van het paar een duidelijke naam te geven. Dat is nuttig wanneer labels en metingen apart binnenkomen.",
  'names = ["East", "West", "North"]\nlevels = [3, 7]\npairs = list(zip(names, levels))\nprint(pairs)\nfor name, level in pairs:\n    print(name, level)\n',
);
article(
  5,
  "reading-lambda",
  "Small functions with lambda",
  "Kleine functions met lambda",
  "A lambda creates a small function from one expression. Write lambda parameters: expression. The expression’s value is returned automatically.\n\nUse a regular def when behavior needs several statements or deserves documentation. A short lambda is useful as a key function for sorted(), where it describes what value should determine ordering.",
  "Een lambda maakt een kleine function van één expressie. Schrijf lambda parameters: expression. De waarde van de expressie wordt automatisch teruggegeven.\n\nGebruik een gewone def als gedrag meerdere statements of documentatie nodig heeft. Een korte lambda is handig als key function voor sorted(), waar deze bepaalt op welke waarde gesorteerd wordt.",
  'double = lambda number: number * 2\nprint(double(6))\nlabels = ["compass", "map", "torch"]\nprint(sorted(labels, key=lambda word: len(word)))\n',
);
article(
  5,
  "reading-map",
  "Transforming with map",
  "Bewerken met map",
  "map(function, iterable) applies a function to each input and returns an iterator of results. Convert it to a list when you need all results immediately.\n\nA list comprehension often expresses the same operation clearly. With multiple iterables, map passes one value from each into the function and stops at the shortest input.",
  "map(function, iterable) past een function toe op elke invoer en geeft een iterator met resultaten. Zet deze om naar een list als je alle resultaten direct nodig hebt.\n\nEen list comprehension kan dezelfde bewerking vaak duidelijk uitdrukken. Bij meerdere iterables geeft map telkens één waarde uit elke iterable door en stopt bij de kortste invoer.",
  'texts = ["2", "5", "8"]\nnumbers = list(map(int, texts))\nprint(numbers)\ndoubled = list(map(lambda n: n * 2, numbers))\nprint(doubled)\n',
);
article(
  8,
  "reading-environments",
  "Packages and environments",
  "Packages en environments",
  "The standard library ships with Python. Third-party packages add further capabilities and usually need installation. A virtual environment keeps a project’s installed packages separate from other projects.\n\nOn a desktop Python installation, python -m venv .venv creates an environment and python -m pip installs packages into the active interpreter. Pipenv combines environment and dependency management. Lockfiles help reproduce versions.\n\nThis browser workspace uses Pyodide rather than a desktop shell. The course’s required standard-library modules are already available. Native desktop packages and operating-system commands are outside this runner’s scope.",
  "De standard library wordt met Python meegeleverd. Externe packages voegen mogelijkheden toe en moeten meestal worden geïnstalleerd. Een virtual environment houdt de packages van een project gescheiden van andere projecten.\n\nBij desktop-Python maakt python -m venv .venv een environment en installeert python -m pip packages voor de actieve interpreter. Pipenv combineert environment- en dependencybeheer. Lockfiles helpen dezelfde versies te reproduceren.\n\nDeze browserwerkruimte gebruikt Pyodide in plaats van een desktop-shell. De benodigde standard-library-modules zijn al beschikbaar. Native desktop-packages en besturingssysteemcommando’s vallen buiten deze runner.",
  'import sys\nimport math\nprint("Python:", sys.version.split()[0])\nprint("Standard library:", math.sqrt(49))\n',
);
article(
  13,
  "reading-next",
  "Your next step",
  "Jouw volgende stap",
  "You now have the building blocks to read, write, debug, and organize Python programs. Return to any chapter, revisit a quiz, or use the optional challenges to practice without a step-by-step recipe.\n\nFor further study, explore exception handling with try/except, testing, comprehensions, iterators, and working with a larger codebase. Choose one topic at a time and test your understanding with a small program.\n\nYour code and progress are saved on this computer. Export a backup through Manage learning data on the homepage if you want a portable copy. This final workspace is a scratchpad for your own experiments.",
  "Je hebt nu de bouwstenen om Python-programma’s te lezen, schrijven, debuggen en organiseren. Herhaal een hoofdstuk of quiz, of gebruik de optionele oefeningen om zonder stapsgewijs recept te oefenen.\n\nVerdiep je daarna in exception handling met try/except, testen, comprehensions, iterators en grotere codebases. Kies telkens één onderwerp en toets je kennis met een klein programma.\n\nJe code en voortgang worden op deze computer bewaard. Exporteer via Beheer leergegevens op de startpagina een back-up als je een draagbare kopie wilt. Deze laatste werkruimte is er voor je eigen experimenten.",
  'print("Keep experimenting.")\n',
);
