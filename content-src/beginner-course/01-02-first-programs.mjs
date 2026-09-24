import { lesson, step, output, uses } from "./authoring.mjs";
export const activities = [
  lesson(1, "welcome", {
    title: ["Hello, world!", "Hallo, wereld!"],
    topics: "welcome",
    kind: "reading",
    minutes: 5,
    intro: [
      "A program is a set of instructions for a computer. You will write Python instructions in the editor and use Run to ask Python to carry them out. Start by running the one line already in the editor.",
      "Een programma is een verzameling instructies voor een computer. Je schrijft Pythoninstructies in de editor en gebruikt Uitvoeren om Python ze te laten uitvoeren. Begin door de ene regel in de editor uit te voeren.",
    ],
    teach: [
      "The editor contains your program. The terminal shows its output: information the program displays. In this example, print tells Python to display the text between the quotation marks. The parentheses hold what print should display. The quotation marks mark where the text begins and ends; they are not printed.\n\nPress Run. Look for Hello, world! in the terminal. Editing the terminal output does not change the program: make your changes in the editor, then run again. Your editor changes save automatically. Use Stop if a running program does not finish.",
      "De editor bevat je programma. De terminal toont de uitvoer: informatie die het programma laat zien. In dit voorbeeld vertelt print aan Python welke tekst tussen de aanhalingstekens moet verschijnen. Tussen de haakjes staat wat print moet tonen. De aanhalingstekens geven het begin en einde van de tekst aan; ze worden niet afgedrukt.\n\nKlik op Uitvoeren. Zoek Hello, world! in de terminal. Uitvoer in de terminal veranderen wijzigt het programma niet: pas de editor aan en voer opnieuw uit. Je wijzigingen worden automatisch opgeslagen. Gebruik Stoppen als een programma blijft draaien.",
    ],
    idea: [
      "Code is written in the editor; its output appears in the terminal.",
      "Code schrijf je in de editor; de uitvoer verschijnt in de terminal.",
    ],
    example: 'print("Hello, world!")',
    output: "Hello, world!\n",
    predict: [
      "Will the quotation marks appear in the output?",
      "Verschijnen de aanhalingstekens in de uitvoer?",
    ],
    starter: 'print("Hello, world!")\n',
    solution: 'print("Hello, world!")\n',
    steps: [],
    experiment: [
      "Change world to your name and run again. Then continue to write your first line yourself.",
      "Verander world in je naam en voer opnieuw uit. Ga daarna verder om zelf je eerste regel te schrijven.",
    ],
    note: [
      "Python reads the instruction, displays the text and finishes. The punctuation belongs to the program, not its displayed message.",
      "Python leest de instructie, toont de tekst en stopt. De leestekens horen bij het programma, niet bij het getoonde bericht.",
    ],
  }),
  lesson(1, "first-print", {
    title: ["Write your first print", "Schrijf je eerste print"],
    topics: "print",
    requires: "welcome",
    minutes: 8,
    intro: [
      "Now you will write a complete one-line program yourself. The editor is empty on purpose: you already know the one instruction you need.",
      "Nu schrijf je zelf een volledig programma van één regel. De editor is bewust leeg: je kent de instructie die je nodig hebt al.",
    ],
    teach: [
      'print is a built-in function: a named tool that Python already provides. Calling it means writing print followed by parentheses. To display text, put the text inside matching quotation marks inside those parentheses.\n\nIn print("Good morning!"), print names the tool, ( and ) enclose its input, and "Good morning!" is the text. Python is case-sensitive: Print is a different name. A program file does not display text just because you type it; print explicitly requests output.',
      'print is een ingebouwde functie: een hulpmiddel met een naam dat Python al aanbiedt. Je roept het aan door print met haakjes erachter te schrijven. Zet tekst tussen bijpassende aanhalingstekens binnen die haakjes om haar te tonen.\n\nIn print("Good morning!") is print het hulpmiddel, omsluiten ( en ) de invoer en is "Good morning!" de tekst. Python is hoofdlettergevoelig: Print is een andere naam. Een programmabestand toont niet vanzelf de tekst die je typt; print vraagt expliciet om uitvoer.',
    ],
    idea: [
      "Use print(...) to display a value; text inside it needs matching quotes.",
      "Gebruik print(...) om een waarde te tonen; tekst erin heeft bijpassende aanhalingstekens nodig.",
    ],
    example: 'print("Good morning!")',
    output: "Good morning!\n",
    predict: [
      "Which part of this line will appear in the terminal?",
      "Welk deel van deze regel verschijnt in de terminal?",
    ],
    starter: "",
    solution: 'print("Hello, Python!")\n',
    steps: [
      step(
        [
          'Display exactly "Hello, Python!" and run your program.',
          'Toon precies "Hello, Python!" en voer je programma uit.',
        ],
        output("Hello, Python!\n"),
        [
          "Check lowercase print, two parentheses, and matching quotes around the message.",
          "Controleer print met kleine letters, twee haakjes en bijpassende aanhalingstekens om het bericht.",
        ],
        'print("your message")',
      ),
    ],
    experiment: [
      "Change the greeting and predict the output before running. Is anything printed without a print call?",
      "Verander de begroeting en voorspel de uitvoer. Wordt er iets getoond zonder een print-aanroep?",
    ],
    note: [
      "The one call displays the message and adds a newline. Single quotes are equally valid here.",
      "De ene aanroep toont het bericht en voegt een nieuwe regel toe. Enkele aanhalingstekens zijn hier ook geldig.",
    ],
  }),
  lesson(1, "print-order", {
    title: ["One line after another", "De ene regel na de andere"],
    topics: "execution-order",
    requires: "print",
    minutes: 8,
    intro: [
      "A program can contain more than one instruction. Python starts at the top and follows them in order.",
      "Een programma kan meer dan één instructie bevatten. Python begint bovenaan en volgt ze op volgorde.",
    ],
    teach: [
      "Each print call below displays one line. The first call finishes before the second begins. A blank line in the editor can make code easier to read, but it does not print an empty line.\n\nOrder is part of a program's behaviour. Switching these calls changes the order of the messages. You do not need numbers or punctuation between instructions: place each call on its own line.",
      "Elke print-aanroep hieronder toont één regel. De eerste aanroep is klaar voordat de tweede begint. Een lege regel in de editor kan code leesbaarder maken, maar drukt geen lege regel af.\n\nVolgorde hoort bij het gedrag van een programma. Als je deze aanroepen verwisselt, verandert de volgorde van de berichten. Je hebt geen nummers of leestekens tussen instructies nodig: zet elke aanroep op een eigen regel.",
    ],
    idea: [
      "Python executes these statements from top to bottom.",
      "Python voert deze instructies van boven naar beneden uit.",
    ],
    example: 'print("Open the door")\nprint("Come inside")',
    output: "Open the door\nCome inside\n",
    predict: ["Which message appears first?", "Welk bericht verschijnt eerst?"],
    starter: 'print("Ready")\n',
    solution: 'print("Ready")\nprint("Start")\n',
    steps: [
      step(
        [
          'Keep the line that prints "Ready".',
          'Behoud de regel die "Ready" afdrukt.',
        ],
        '_stdout.splitlines()[0] == "Ready"',
        [
          "The first line should still be Ready, including its capital R.",
          "De eerste regel moet Ready blijven, met hoofdletter R.",
        ],
        'print("Ready")',
      ),
      step(
        [
          'Add a second call that prints "Start" on the next line.',
          'Voeg een tweede aanroep toe die "Start" op de volgende regel afdrukt.',
        ],
        output("Ready\nStart\n"),
        [
          "Add a new call underneath the first one; do not join both messages into one string.",
          "Voeg een nieuwe aanroep onder de eerste toe; plak beide berichten niet in één string.",
        ],
        'print("second line")',
      ),
    ],
    experiment: [
      "Swap the calls and run again. Add a blank editor line between them and compare the output.",
      "Verwissel de aanroepen en voer opnieuw uit. Voeg een lege editorregel ertussen toe en vergelijk de uitvoer.",
    ],
    note: [
      "The first instruction already works. Adding the second preserves it, so both requirements are true in the finished program.",
      "De eerste instructie werkt al. De tweede toevoegen behoudt haar, zodat beide eisen gelden in het uiteindelijke programma.",
    ],
  }),
  lesson(1, "strings-quotes", {
    title: ["Text is a string", "Tekst is een string"],
    topics: "strings",
    requires: "print",
    minutes: 10,
    intro: [
      "Python calls a text value a string. Learn where a string starts and ends before using longer messages.",
      "Python noemt een tekstwaarde een string. Leer waar een string begint en eindigt voordat je langere berichten gebruikt.",
    ],
    teach: [
      "A string is text enclosed by matching quotes. You can use double quotes or single quotes. The opening and closing quote of one string must be the same kind. Both forms below display the same word.\n\nThe quotes are syntax: marks that give Python instructions about how to read the code. They are not part of the text value. An apostrophe can go inside a double-quoted string without closing it. Later you will learn escape characters for more complicated text.",
      "Een string is tekst tussen bijpassende aanhalingstekens. Je kunt dubbele of enkele aanhalingstekens gebruiken. De openings- en sluitingstekens van één string moeten van dezelfde soort zijn. Beide vormen hieronder tonen hetzelfde woord.\n\nDe aanhalingstekens zijn syntaxis: tekens die Python vertellen hoe het de code moet lezen. Ze horen niet bij de tekstwaarde. Een apostrof past in een string met dubbele aanhalingstekens zonder die af te sluiten. Later leer je escapetekens voor ingewikkeldere tekst.",
    ],
    idea: [
      "Single and double quotes both define strings when each pair matches.",
      "Enkele en dubbele aanhalingstekens maken allebei strings als elk paar overeenkomt.",
    ],
    example: "print(\"Welcome\")\nprint('Welcome')",
    output: "Welcome\nWelcome\n",
    predict: [
      "Will the two output lines differ?",
      "Verschillen de twee uitvoerregels?",
    ],
    starter: "",
    solution: "print(\"Mila\")\nprint('Mila')\n",
    steps: [
      step(
        [
          'Print "Mila" twice, on separate lines. Try both kinds of quotes.',
          'Druk "Mila" tweemaal af op aparte regels. Probeer beide soorten aanhalingstekens.',
        ],
        output("Mila\nMila\n"),
        [
          "Each call needs a complete quoted string. The spelling of the displayed name stays the same.",
          "Elke aanroep heeft een volledige string nodig. De spelling van de getoonde naam blijft hetzelfde.",
        ],
        "print('a name')",
      ),
    ],
    experiment: [
      'Print "It\'s sunny" using double quotes. Explain why its apostrophe does not end the string.',
      'Druk "It\'s sunny" af met dubbele aanhalingstekens. Leg uit waarom de apostrof de string niet beëindigt.',
    ],
    note: [
      "Both calls produce the same value. The checker accepts either quote style because the requested behaviour is the displayed name.",
      "Beide aanroepen produceren dezelfde waarde. De controle accepteert beide soorten aanhalingstekens omdat het gevraagde gedrag de getoonde naam is.",
    ],
  }),
  lesson(1, "print-numbers", {
    title: [
      "Numbers and quoted numbers",
      "Getallen en getallen tussen aanhalingstekens",
    ],
    topics: "numeric-literals",
    requires: "strings print",
    minutes: 9,
    intro: [
      "print can display numbers as well as text. Two values can look the same in the terminal while being different kinds of value.",
      "print kan getallen én tekst tonen. Twee waarden kunnen er hetzelfde uitzien in de terminal terwijl ze verschillende soorten waarden zijn.",
    ],
    teach: [
      'Without quotes, 12 is a number. With quotes, "12" is text containing two digits. print displays both as 12. The terminal shows their appearance, not their type.\n\nPython also understands zero and negative numbers such as -3. Keep the minus sign next to the number. You do not need to convert a number to text just to give it directly to print. We will inspect types and calculate with numbers in the next modules.',
      'Zonder aanhalingstekens is 12 een getal. Met aanhalingstekens is "12" tekst met twee cijfers. print toont beide als 12. De terminal toont hun uiterlijk, niet hun type.\n\nPython begrijpt ook nul en negatieve getallen zoals -3. Zet het minteken bij het getal. Je hoeft een getal niet naar tekst om te zetten om het rechtstreeks aan print te geven. In de volgende modules onderzoeken we typen en rekenen we met getallen.',
    ],
    idea: [
      "Quotes make text; an unquoted numeric literal is a number.",
      "Aanhalingstekens maken tekst; een getal zonder aanhalingstekens is een getalswaarde.",
    ],
    example: 'print(12)\nprint("12")\nprint(-3)',
    output: "12\n12\n-3\n",
    predict: [
      "Can you tell the first two values apart just by their printed appearance?",
      "Kun je de eerste twee waarden alleen aan hun uitvoer onderscheiden?",
    ],
    starter: "",
    solution: 'print(7)\nprint("7")\nprint(0)\n',
    steps: [
      step(
        [
          'Print the number 7, then the string "7", then the number 0.',
          'Druk het getal 7 af, daarna de string "7" en daarna het getal 0.',
        ],
        `${output("7\n7\n0\n")} and any(isinstance(n, _ast.Constant) and type(n.value) is int and n.value == 7 for n in _ast.walk(_ast.parse(_source))) and any(isinstance(n, _ast.Constant) and n.value == "7" for n in _ast.walk(_ast.parse(_source)))`,
        [
          "Check both the output and the code: one 7 should have quotes and the other should not.",
          "Controleer zowel uitvoer als code: één 7 moet aanhalingstekens hebben en de andere niet.",
        ],
        "print(5)",
      ),
    ],
    experiment: [
      "Change the unquoted 7 to -7. Predict which output line changes.",
      "Verander de 7 zonder aanhalingstekens in -7. Voorspel welke uitvoerregel verandert.",
    ],
    note: [
      "Matching output alone does not show that the types differ. This exercise also checks that the program contains both a number and a text value.",
      "Gelijke uitvoer laat niet zien dat de typen verschillen. Deze oefening controleert daarom ook of het programma een getal én een tekstwaarde bevat.",
    ],
  }),
  lesson(1, "comments", {
    title: ["Comments are for readers", "Commentaar is voor lezers"],
    topics: "comments",
    requires: "print strings",
    minutes: 9,
    intro: [
      "Comments help a person understand your code. They can also temporarily disable an instruction while you investigate a program.",
      "Commentaar helpt een lezer je code te begrijpen. Je kunt er ook tijdelijk een instructie mee uitschakelen terwijl je een programma onderzoekt.",
    ],
    teach: [
      'Outside a string, # starts a comment. Python ignores everything from that mark to the end of the line. A comment on its own line produces no output. An inline comment can explain a statement beside it.\n\nPutting # before an entire print call disables that call. The symbol inside a quoted string is ordinary text, so print("#hello") would display #hello. Good comments explain an intention or a useful detail rather than repeat every word of the code.',
      'Buiten een string begint # een commentaar. Python negeert alles vanaf dat teken tot het einde van de regel. Commentaar op een eigen regel produceert geen uitvoer. Commentaar achter een instructie kan een nuttige uitleg geven.\n\nAls je # voor een hele print-aanroep zet, wordt die uitgeschakeld. Het teken binnen een string is gewone tekst, dus print("#hello") toont #hello. Goed commentaar legt een bedoeling of nuttig detail uit in plaats van elk woord van de code te herhalen.',
    ],
    idea: [
      "A # comment outside a string is ignored for the rest of that line.",
      "Een #-commentaar buiten een string wordt tot het einde van die regel genegeerd.",
    ],
    example: '# Welcome visitors\nprint("Come in")\n# print("Closed")',
    output: "Come in\n",
    predict: [
      "Which print call is disabled?",
      "Welke print-aanroep is uitgeschakeld?",
    ],
    starter: 'print("Opening soon")\nprint("Test message")\n',
    solution:
      '# Announce the opening\nprint("Opening soon")\n# print("Test message")\n',
    steps: [
      step(
        [
          "Add a comment explaining the announcement.",
          "Voeg commentaar toe dat de aankondiging uitlegt.",
        ],
        'any(line.lstrip().startswith("#") for line in _source.splitlines())',
        [
          "Put # and a short explanation on a separate line.",
          "Zet # met een korte uitleg op een eigen regel.",
        ],
        "# Explain the purpose",
      ),
      step(
        [
          'Comment out the test message so only "Opening soon" is displayed.',
          'Zet het testbericht in commentaar zodat alleen "Opening soon" verschijnt.',
        ],
        output("Opening soon\n"),
        [
          "Keep the useful print call active. Place # before the unwanted call.",
          "Laat de nuttige print-aanroep actief. Zet # voor de ongewenste aanroep.",
        ],
        '# print("temporary message")',
      ),
    ],
    experiment: [
      'Add print("# is visible here"). Explain why the # is printed.',
      'Voeg print("# is visible here") toe. Leg uit waarom # wordt afgedrukt.',
    ],
    note: [
      "The comment describes the intention. The disabled print remains available for experimentation, but Python does not execute it.",
      "Het commentaar beschrijft de bedoeling. De uitgeschakelde print blijft beschikbaar om mee te experimenteren, maar Python voert haar niet uit.",
    ],
  }),
  lesson(1, "repair-syntax", {
    title: ["Your first error message", "Je eerste foutmelding"],
    topics: "errors syntax-errors",
    requires: "print strings",
    guidance: "adapt",
    minutes: 12,
    intro: [
      "An error is useful information, not a verdict on you. This starter has one deliberate punctuation mistake. Run it, read the error, then repair it.",
      "Een foutmelding is nuttige informatie, geen oordeel over jou. Deze startcode bevat één opzettelijke fout in de leestekens. Voer haar uit, lees de foutmelding en herstel de fout.",
    ],
    teach: [
      "Python must understand a statement's syntax before it can run the file. A SyntaxError says that the written structure is incomplete or invalid. Look for the file name and line number, the displayed source line, and the final explanation. A caret may point near the problem.\n\nCheck pairs: opening and closing quotes, then opening and closing parentheses. The example below is valid. Compare its shape with the starter. Fix one thing and run again; guessing several changes at once makes diagnosis harder.",
      "Python moet de syntaxis van een instructie begrijpen voordat het het bestand kan uitvoeren. Een SyntaxError betekent dat de geschreven structuur onvolledig of ongeldig is. Zoek de bestandsnaam en het regelnummer, de getoonde coderegel en de laatste uitleg. Een dakje kan naar de omgeving van de fout wijzen.\n\nControleer paren: openings- en sluitingsaanhalingstekens, daarna openings- en sluitingshaakjes. Het voorbeeld hieronder is geldig. Vergelijk de vorm met de startcode. Verander één ding en voer opnieuw uit; meerdere dingen tegelijk raden maakt de oorzaak moeilijker te vinden.",
    ],
    idea: [
      "A syntax error concerns how the code is written. Use the indicated line and check matching punctuation.",
      "Een syntaxisfout gaat over hoe de code is geschreven. Gebruik de aangeduide regel en controleer bijpassende leestekens.",
    ],
    example: 'print("A complete call")',
    output: "A complete call\n",
    predict: [
      "What closes the quoted text, and what closes the call?",
      "Wat sluit de tekst af en wat sluit de aanroep af?",
    ],
    starter: 'print("Ready to learn"\n',
    solution: 'print("Ready to learn")\n',
    expectedStarterError: "SyntaxError",
    steps: [
      step(
        [
          'Repair the call so it prints "Ready to learn".',
          'Herstel de aanroep zodat die "Ready to learn" afdrukt.',
        ],
        output("Ready to learn\n"),
        [
          "The quotes already match. Count the opening and closing parentheses.",
          "De aanhalingstekens kloppen al. Tel de openings- en sluitingshaakjes.",
        ],
        'print("complete")',
      ),
    ],
    experiment: [
      "After passing, deliberately remove a quote. Read the new error, then undo your change.",
      "Verwijder na het slagen bewust een aanhalingsteken. Lees de nieuwe foutmelding en maak je wijziging ongedaan.",
    ],
    note: [
      "Adding the missing closing parenthesis makes the statement valid. The text itself does not need to change.",
      "Het ontbrekende sluitingshaakje maakt de instructie geldig. De tekst zelf hoeft niet te veranderen.",
    ],
  }),
  lesson(1, "announcement", {
    title: ["Make a terminal announcement", "Maak een terminalaankondiging"],
    topics: "first-program-review",
    practices: "print strings comments execution-order",
    requires: "print strings comments",
    guidance: "independent",
    minutes: 15,
    intro: [
      "Use the tools you have practised to make a three-line announcement. The editor is empty. Decide which print calls you need and add a useful comment.",
      "Gebruik de geoefende hulpmiddelen om een aankondiging van drie regels te maken. De editor is leeg. Bepaal welke print-aanroepen je nodig hebt en voeg nuttig commentaar toe.",
    ],
    teach: [
      "Before typing, write down the desired output in order. One statement can display each line. A comment explains the purpose without adding another output line.\n\nThe example advertises a different activity. Your task is to make a repair-café announcement with the exact three lines in the instructions. You can use either quote style. After it works, personalise a copy by changing its wording.",
      "Schrijf voordat je typt de gewenste uitvoer op volgorde op. Met één instructie kun je elke regel tonen. Commentaar legt het doel uit zonder een extra uitvoerregel toe te voegen.\n\nHet voorbeeld kondigt een andere activiteit aan. Jij maakt een aankondiging voor een reparatiecafé met de drie exacte regels uit de instructies. Beide soorten aanhalingstekens zijn toegestaan. Als het werkt, kun je de tekst persoonlijk maken.",
    ],
    idea: [
      "Plan the output, then write one print call for each line.",
      "Plan de uitvoer en schrijf daarna één print-aanroep per regel.",
    ],
    example: '# Invite neighbours\nprint("Book swap")\nprint("Saturday")',
    output: "Book swap\nSaturday\n",
    predict: [
      "How many output lines does the comment add?",
      "Hoeveel uitvoerregels voegt het commentaar toe?",
    ],
    starter: "",
    solution:
      '# Invite visitors to the repair cafe\nprint("Repair cafe")\nprint("Bring one item")\nprint("Everyone welcome")\n',
    steps: [
      step(
        [
          "Add a comment explaining what this program announces.",
          "Voeg commentaar toe dat uitlegt wat dit programma aankondigt.",
        ],
        'any(line.lstrip().startswith("#") for line in _source.splitlines())',
        [
          "A comment begins with # and belongs in the editor.",
          "Commentaar begint met # en hoort in de editor.",
        ],
        "# Purpose of the announcement",
      ),
      step(
        [
          'Print these three lines in order: "Repair cafe", "Bring one item", "Everyone welcome".',
          'Druk deze drie regels op volgorde af: "Repair cafe", "Bring one item", "Everyone welcome".',
        ],
        output("Repair cafe\nBring one item\nEveryone welcome\n"),
        [
          "Compare line count, order and spelling with the brief.",
          "Vergelijk het aantal regels, de volgorde en de spelling met de opdracht.",
        ],
        'print("first line")',
      ),
    ],
    experiment: [
      "Change the final line to your own invitation. Explain what Python does from the first line to the last.",
      "Verander de laatste regel in je eigen uitnodiging. Leg uit wat Python van de eerste tot de laatste regel doet.",
    ],
    note: [
      "The three calls produce three lines in order. The comment stays in the source and does not appear in the announcement.",
      "De drie aanroepen produceren drie regels op volgorde. Het commentaar blijft in de broncode en verschijnt niet in de aankondiging.",
    ],
  }),
  lesson(2, "assignment", {
    title: ["Give a value a name", "Geef een waarde een naam"],
    topics: "variables",
    requires: "strings print",
    minutes: 12,
    intro: [
      "A variable lets you refer to a value by name. Store a message once, then use its name wherever that value is needed.",
      "Met een variabele verwijs je via een naam naar een waarde. Bewaar een bericht eenmaal en gebruik daarna de naam waar je die waarde nodig hebt.",
    ],
    teach: [
      'In message = "Come in", the name is on the left and the value is on the right. The = sign assigns that value to the name. It does not print anything.\n\nThe next line looks up message and passes its value to print. Python must execute the assignment before it can look up the name. A variable name has no quotation marks; a literal text value does.',
      'In message = "Come in" staat de naam links en de waarde rechts. Het =-teken wijst die waarde aan de naam toe. Het drukt niets af.\n\nDe volgende regel zoekt message op en geeft de waarde aan print. Python moet de toewijzing uitvoeren voordat het de naam kan opzoeken. Een variabelenaam heeft geen aanhalingstekens; een letterlijke tekstwaarde wel.',
    ],
    idea: [
      "Assignment names a value; printing the name displays that value.",
      "Toewijzing geeft een waarde een naam; de naam afdrukken toont die waarde.",
    ],
    example: 'message = "Come in"\nprint(message)',
    output: "Come in\n",
    predict: [
      "Does the first line itself display anything?",
      "Toont de eerste regel zelf iets?",
    ],
    starter: "",
    solution: 'place = "Library"\nprint(place)\n',
    steps: [
      step(
        [
          'Create place with the string value "Library".',
          'Maak place met de stringwaarde "Library".',
        ],
        'place == "Library"',
        [
          "Write the name on the left of = and the quoted text on the right.",
          "Schrijf de naam links van = en de tekst tussen aanhalingstekens rechts.",
        ],
        'message = "some text"',
      ),
      step(
        ["Print the value stored in place.", "Druk de waarde in place af."],
        `${output("Library\n")} and any(isinstance(n, _ast.Call) and any(isinstance(a, _ast.Name) and a.id == "place" for a in n.args) for n in _ast.walk(_ast.parse(_source)))`,
        [
          "Pass the variable name to print without quotes.",
          "Geef de variabelenaam zonder aanhalingstekens aan print.",
        ],
        "print(message)",
      ),
    ],
    experiment: [
      "Change only the assigned string. Does the same print call display the new value?",
      "Verander alleen de toegewezen string. Toont dezelfde print-aanroep de nieuwe waarde?",
    ],
    note: [
      "The assignment creates place before it is used. print(place) reads the value instead of displaying the letters p-l-a-c-e.",
      "De toewijzing maakt place voordat het wordt gebruikt. print(place) leest de waarde in plaats van de letters p-l-a-c-e te tonen.",
    ],
  }),
  lesson(2, "name-or-text", {
    title: ["A name or literal text?", "Een naam of letterlijke tekst?"],
    topics: "variable-vs-literal",
    requires: "variables",
    minutes: 10,
    intro: [
      "Quotation marks change the meaning of a word in your code. Learn to predict a common source of confusing output.",
      "Aanhalingstekens veranderen de betekenis van een woord in je code. Leer een veelvoorkomende oorzaak van verwarrende uitvoer voorspellen.",
    ],
    teach: [
      'print(city) asks Python to look up the variable city. print("city") gives Python the literal text city. Both statements are valid, but they request different output.\n\nWhen output is unexpected, inspect whether the argument is a name or a quoted value. You can use a label on one line and a stored value on another without combining strings yet.',
      'print(city) vraagt Python de variabele city op te zoeken. print("city") geeft Python de letterlijke tekst city. Beide instructies zijn geldig, maar vragen om andere uitvoer.\n\nAls de uitvoer onverwacht is, bekijk dan of het argument een naam of een waarde tussen aanhalingstekens is. Je kunt een label op de ene regel en een opgeslagen waarde op de volgende tonen zonder strings te combineren.',
    ],
    idea: [
      "A quoted name is text, not a variable lookup.",
      "Een naam tussen aanhalingstekens is tekst, geen variabele-opzoeking.",
    ],
    example: 'city = "Utrecht"\nprint("city")\nprint(city)',
    output: "city\nUtrecht\n",
    predict: [
      "Which call reads a stored value?",
      "Welke aanroep leest een opgeslagen waarde?",
    ],
    starter: 'animal = "otter"\nprint("animal")\nprint("animal")\n',
    solution: 'animal = "otter"\nprint("animal")\nprint(animal)\n',
    steps: [
      step(
        [
          'Keep the label "animal", then display the value of animal on the next line.',
          'Behoud het label "animal" en toon daarna de waarde van animal op de volgende regel.',
        ],
        output("animal\notter\n"),
        [
          "Only the second call should look up the variable. Remove that argument's quotes.",
          "Alleen de tweede aanroep moet de variabele opzoeken. Verwijder daar de aanhalingstekens om het argument.",
        ],
        "print(city)",
      ),
    ],
    experiment: [
      'Change animal to "fox" without editing the print calls. Predict both lines.',
      'Verander animal in "fox" zonder de print-aanroepen te wijzigen. Voorspel beide regels.',
    ],
    note: [
      "The first call prints a label. The second follows whatever value animal currently refers to.",
      "De eerste aanroep drukt een label af. De tweede volgt de waarde waarnaar animal op dat moment verwijst.",
    ],
  }),
  lesson(2, "names", {
    title: ["Choose readable names", "Kies leesbare namen"],
    topics: "variable-names",
    requires: "variables",
    minutes: 10,
    intro: [
      "A name helps readers understand a value's purpose. Python also has rules for which names are valid.",
      "Een naam helpt lezers het doel van een waarde te begrijpen. Python heeft ook regels voor geldige namen.",
    ],
    teach: [
      "Use letters, digits and underscores in a variable name, but do not begin it with a digit. Spaces are not allowed. Python distinguishes team_name from Team_name. Names such as if are reserved language words; you will meet them later.\n\nPython programmers usually use lowercase words separated by underscores. team_name is easier to understand than x when it stores a team's name. Choose a name and use the same spelling each time.",
      "Gebruik letters, cijfers en underscores in een variabelenaam, maar begin niet met een cijfer. Spaties zijn niet toegestaan. Python maakt onderscheid tussen team_name en Team_name. Namen zoals if zijn gereserveerde taalwoorden; die kom je later tegen.\n\nPythonprogrammeurs gebruiken meestal kleine letters met underscores tussen woorden. team_name is duidelijker dan x als de variabele een teamnaam bewaart. Kies een naam en gebruik steeds dezelfde spelling.",
    ],
    idea: [
      "Use a descriptive, consistently spelled name such as team_name.",
      "Gebruik een beschrijvende, consequent gespelde naam zoals team_name.",
    ],
    example: 'team_name = "Robins"\nprint(team_name)',
    output: "Robins\n",
    predict: [
      "Would Team_name refer to the same variable?",
      "Zou Team_name naar dezelfde variabele verwijzen?",
    ],
    starter: "",
    solution: 'favourite_colour = "blue"\nprint(favourite_colour)\n',
    steps: [
      step(
        [
          'Store "blue" in favourite_colour and print that variable.',
          'Bewaar "blue" in favourite_colour en druk die variabele af.',
        ],
        'favourite_colour == "blue" and _stdout == "blue\n"',
        [
          "Use an underscore between the two words and spell the name identically in both statements.",
          "Gebruik een underscore tussen de twee woorden en spel de naam in beide instructies hetzelfde.",
        ],
        'team_name = "Robins"',
      ),
    ],
    experiment: [
      "Change one letter to uppercase in just the print call. Read the error, then repair the name.",
      "Verander alleen in de print-aanroep één letter in een hoofdletter. Lees de foutmelding en herstel de naam.",
    ],
    note: [
      "The two statements use one consistent name. A readable name explains the stored value's role.",
      "De twee instructies gebruiken één consequente naam. Een leesbare naam verklaart de rol van de opgeslagen waarde.",
    ],
  }),
  lesson(2, "reassignment", {
    title: ["Change a stored value", "Verander een opgeslagen waarde"],
    topics: "reassignment",
    practices: "execution-order",
    requires: "variables",
    minutes: 12,
    intro: [
      "A variable can refer to a new value later in a program. Follow the value at each moment rather than reading only the last assignment.",
      "Een variabele kan later in een programma naar een nieuwe waarde verwijzen. Volg de waarde op elk moment in plaats van alleen de laatste toewijzing te lezen.",
    ],
    teach: [
      "The first assignment stores Morning under message. The first print uses that value. The later assignment changes message to Evening, and the next print uses the new value.\n\nReassignment does not go back in time and change output that was already printed. To trace a program, read one line at a time and write down the current value of each name.",
      "De eerste toewijzing bewaart Morning onder message. De eerste print gebruikt die waarde. De latere toewijzing verandert message in Evening en de volgende print gebruikt de nieuwe waarde.\n\nEen nieuwe toewijzing gaat niet terug in de tijd om eerdere uitvoer te wijzigen. Volg een programma regel voor regel en schrijf de huidige waarde van elke naam op.",
    ],
    idea: [
      "A print call uses the value that exists when that line executes.",
      "Een print-aanroep gebruikt de waarde die bestaat wanneer die regel wordt uitgevoerd.",
    ],
    example:
      'message = "Morning"\nprint(message)\nmessage = "Evening"\nprint(message)',
    output: "Morning\nEvening\n",
    predict: [
      "Why does the first line still say Morning?",
      "Waarom staat op de eerste regel nog Morning?",
    ],
    starter:
      'status = "Preparing"\nprint(status)\n# Update status below, then print it again.\n',
    solution:
      'status = "Preparing"\nprint(status)\nstatus = "Ready"\nprint(status)\n',
    steps: [
      step(
        [
          'After the existing print, assign "Ready" to status.',
          'Wijs na de bestaande print "Ready" toe aan status.',
        ],
        'status == "Ready"',
        [
          "Add another assignment below the first print; keep the original assignment.",
          "Voeg een nieuwe toewijzing onder de eerste print toe; behoud de oorspronkelijke toewijzing.",
        ],
        'message = "Evening"',
      ),
      step(
        [
          "Print status again so both states appear in order.",
          "Druk status opnieuw af zodat beide toestanden op volgorde verschijnen.",
        ],
        output("Preparing\nReady\n"),
        [
          "There should be a print before and after the update.",
          "Er moet een print vóór en na de wijziging staan.",
        ],
        "print(status)",
      ),
    ],
    experiment: [
      "Move the update above the first print. Predict the new two-line output.",
      "Verplaats de wijziging tot boven de eerste print. Voorspel de nieuwe uitvoer van twee regels.",
    ],
    note: [
      "Keeping the first assignment and print records the initial state. The new assignment affects only the later lookup.",
      "De eerste toewijzing en print bewaren de begintoestand in de uitvoer. De nieuwe toewijzing beïnvloedt alleen de latere opzoeking.",
    ],
  }),
  lesson(2, "integers", {
    title: ["Whole numbers", "Gehele getallen"],
    topics: "integers",
    requires: "variables numeric-literals",
    minutes: 10,
    intro: [
      "Use integers to represent whole counts, including zero and negative values when those make sense.",
      "Gebruik gehele getallen om volledige aantallen weer te geven, inclusief nul en negatieve waarden wanneer die zinvol zijn.",
    ],
    teach: [
      'Python calls its whole-number type int. Values such as 8, 0 and -2 are integers. A count of visitors can be zero; a temperature in whole degrees can be negative. An integer literal has no decimal point.\n\nStore the number without quotes. "8" would be text, even though it looks numeric when printed. Choose a meaningful name for each quantity so you can tell what the number measures.',
      'Python noemt zijn type voor gehele getallen int. Waarden zoals 8, 0 en -2 zijn gehele getallen. Het aantal bezoekers kan nul zijn; een temperatuur in hele graden kan negatief zijn. Een geheel getal heeft in deze schrijfwijze geen decimale punt.\n\nBewaar het getal zonder aanhalingstekens. "8" zou tekst zijn, ook al ziet die er als een getal uit wanneer je haar afdrukt. Kies een duidelijke naam voor elke hoeveelheid zodat je weet wat het getal meet.',
    ],
    idea: [
      "An int represents a whole number, including zero and negative whole numbers.",
      "Een int stelt een geheel getal voor, inclusief nul en negatieve gehele getallen.",
    ],
    example:
      "visitors = 8\ntemperature = -2\nprint(visitors)\nprint(temperature)",
    output: "8\n-2\n",
    predict: [
      "Which value is negative, and does that make it text?",
      "Welke waarde is negatief en maakt dat haar tekst?",
    ],
    starter: "",
    solution: "books = 6\nmissing = 0\nprint(books)\nprint(missing)\n",
    steps: [
      step(
        [
          "Create integer variables books = 6 and missing = 0.",
          "Maak de gehele variabelen books = 6 en missing = 0.",
        ],
        "type(books) is int and books == 6 and type(missing) is int and missing == 0",
        [
          "Leave off quotes and decimal points.",
          "Gebruik geen aanhalingstekens of decimale punten.",
        ],
        "visitors = 8",
      ),
      step(
        [
          "Print books and missing on separate lines.",
          "Druk books en missing op aparte regels af.",
        ],
        output("6\n0\n"),
        [
          "Print the stored values in the requested order.",
          "Druk de opgeslagen waarden in de gevraagde volgorde af.",
        ],
        "print(visitors)",
      ),
    ],
    experiment: [
      "Assign -1 to missing and run again. Is it still a whole-number value?",
      "Wijs -1 toe aan missing en voer opnieuw uit. Is het nog steeds een geheel getal?",
    ],
    note: [
      "Both variables hold integer values. Zero is an ordinary integer, not an empty value.",
      "Beide variabelen bevatten gehele getallen. Nul is een gewone int, geen lege waarde.",
    ],
  }),
  lesson(2, "floats", {
    title: ["Numbers with a decimal point", "Getallen met een decimale punt"],
    topics: "floats",
    requires: "integers variables",
    minutes: 11,
    intro: [
      "Some measurements need fractional parts. Python's float type lets you work with numbers such as 2.5.",
      "Sommige metingen hebben een deel achter de komma nodig. Met Pythons type float kun je werken met getallen zoals 2.5.",
    ],
    teach: [
      "A float literal uses a dot as its decimal separator, even when your written language uses a comma. 2.5 is a float; 2 is an int. 2.0 is also a float even though its fractional part is zero.\n\nFloats approximate real-number values using a finite representation. They are useful for measurements, but not every decimal fraction is stored exactly. Later, Decimal will offer another choice when decimal arithmetic matters. For now, focus on choosing a number rather than a quoted numeric string.",
      "Een float gebruikt een punt als decimaalteken, ook wanneer je schrijftaal een komma gebruikt. 2.5 is een float; 2 is een int. 2.0 is ook een float, zelfs als het deel achter de punt nul is.\n\nFloats benaderen reële getallen met een eindige representatie. Ze zijn nuttig voor metingen, maar niet elke decimale breuk wordt exact opgeslagen. Later biedt Decimal een andere keuze wanneer decimale berekeningen belangrijk zijn. Richt je nu op het kiezen van een getal in plaats van een numerieke string.",
    ],
    idea: [
      "Use a dot for a float literal, for example 2.5.",
      "Gebruik een punt voor een float, bijvoorbeeld 2.5.",
    ],
    example:
      "length = 2.5\nwhole_measurement = 3.0\nprint(length)\nprint(whole_measurement)",
    output: "2.5\n3.0\n",
    predict: [
      "Are both assigned values floats?",
      "Zijn beide toegewezen waarden floats?",
    ],
    starter: "",
    solution: "distance = 4.5\nprint(distance)\n",
    steps: [
      step(
        [
          "Store the float 4.5 in distance and print it.",
          "Bewaar de float 4.5 in distance en druk haar af.",
        ],
        'type(distance) is float and distance == 4.5 and _stdout == "4.5\n"',
        [
          "Use a decimal point, no quotes, and print the variable.",
          "Gebruik een decimale punt, geen aanhalingstekens en druk de variabele af.",
        ],
        "length = 2.5",
      ),
    ],
    experiment: [
      "Change distance to 4.0 and then to 4. Compare the displayed values.",
      "Verander distance eerst in 4.0 en daarna in 4. Vergelijk de getoonde waarden.",
    ],
    note: [
      "4.5 is stored as a float and passed directly to print. No string conversion is needed for direct printing.",
      "4.5 wordt als float opgeslagen en rechtstreeks aan print gegeven. Voor rechtstreeks afdrukken is geen stringconversie nodig.",
    ],
  }),
  lesson(2, "inspect-types", {
    title: [
      "Ask Python for a value's type",
      "Vraag Python naar het type van een waarde",
    ],
    topics: "types",
    requires: "integers floats strings",
    minutes: 12,
    intro: [
      "When similar-looking values behave differently, inspect their types. type() is another built-in function.",
      "Als waarden die op elkaar lijken zich anders gedragen, onderzoek je hun typen. type() is een andere ingebouwde functie.",
    ],
    teach: [
      "type(value) produces information about the kind of value. Put it inside print to display that information. In print(type(8)), Python first evaluates type(8), then passes the result to print. Read nested calls from the inside outward.\n\nThe displayed names int, float and str mean whole number, floating-point number and string. The word class in this output is Python's type notation; you will learn to create classes later. You do not need class definitions to inspect these values.",
      "type(waarde) levert informatie over het soort waarde. Zet het binnen print om die informatie te tonen. In print(type(8)) berekent Python eerst type(8) en geeft het resultaat daarna aan print. Lees geneste aanroepen van binnen naar buiten.\n\nDe getoonde namen int, float en str betekenen geheel getal, kommagetal en string. Het woord class in deze uitvoer is Pythons typenotatie; later leer je zelf klassen maken. Je hebt geen klassendefinities nodig om deze waarden te onderzoeken.",
    ],
    idea: [
      "Print type(value) to distinguish a string from an integer or float.",
      "Druk type(waarde) af om een string van een int of float te onderscheiden.",
    ],
    example: 'print(type(8))\nprint(type(8.0))\nprint(type("8"))',
    output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n",
    predict: [
      "Why does the quoted 8 have a different type?",
      "Waarom heeft de 8 tussen aanhalingstekens een ander type?",
    ],
    starter: 'count = 5\nprice = 1.5\nlabel = "5"\n',
    solution:
      'count = 5\nprice = 1.5\nlabel = "5"\nprint(type(count))\nprint(type(price))\nprint(type(label))\n',
    steps: [
      step(
        [
          "Print the types of count, price and label in that order.",
          "Druk de typen van count, price en label in die volgorde af.",
        ],
        output("<class 'int'>\n<class 'float'>\n<class 'str'>\n"),
        [
          "Give each variable to type, then give that result to print.",
          "Geef elke variabele aan type en geef dat resultaat daarna aan print.",
        ],
        "print(type(count))",
      ),
    ],
    experiment: [
      "Replace label's value with the number 5 and inspect its type again.",
      "Vervang de waarde van label door het getal 5 en onderzoek het type opnieuw.",
    ],
    note: [
      "Nested calls run from the inside out. The displayed type explains why digits enclosed in quotes are still text.",
      "Geneste aanroepen werken van binnen naar buiten. Het getoonde type verklaart waarom cijfers tussen aanhalingstekens nog steeds tekst zijn.",
    ],
  }),
  lesson(2, "repair-name", {
    title: ["Read a NameError", "Lees een NameError"],
    topics: "name-error",
    requires: "variables variable-names",
    guidance: "adapt",
    minutes: 10,
    intro: [
      "A correctly shaped statement can still refer to a name that does not exist. This starter contains one misspelled name.",
      "Een correct gevormde instructie kan toch verwijzen naar een naam die niet bestaat. Deze startcode bevat één verkeerd gespelde naam.",
    ],
    teach: [
      "A NameError means Python could not find a name when it tried to use it. Check the name in the final error line against earlier assignments. Capitalisation and underscores matter.\n\nA different cause is using a variable before its assignment executes. The working example stores the value first, then prints it. Follow that order and use the same spelling in both places.",
      "Een NameError betekent dat Python een naam niet kon vinden toen het die wilde gebruiken. Vergelijk de naam op de laatste foutregel met eerdere toewijzingen. Hoofdletters en underscores tellen mee.\n\nEen andere oorzaak is een variabele gebruiken voordat de toewijzing wordt uitgevoerd. Het werkende voorbeeld bewaart eerst de waarde en drukt die daarna af. Volg die volgorde en gebruik op beide plaatsen dezelfde spelling.",
    ],
    idea: [
      "Define a variable before using it and spell its name consistently.",
      "Definieer een variabele vóór gebruik en spel de naam consequent.",
    ],
    example: 'city = "Delft"\nprint(city)',
    output: "Delft\n",
    predict: [
      "What would happen if these lines were reversed?",
      "Wat gebeurt er als je deze regels omdraait?",
    ],
    starter: 'animal = "otter"\nprint(Animal)\n',
    solution: 'animal = "otter"\nprint(animal)\n',
    expectedStarterError: "NameError",
    steps: [
      step(
        [
          "Repair the name lookup so the stored animal is printed.",
          "Herstel het opzoeken van de naam zodat het opgeslagen dier wordt afgedrukt.",
        ],
        'animal == "otter" and _stdout == "otter\n"',
        [
          "Compare the capital letter in the print call with the lowercase assignment.",
          "Vergelijk de hoofdletter in de print-aanroep met de toewijzing in kleine letters.",
        ],
        "print(city)",
      ),
    ],
    experiment: [
      "Move the print above the assignment. Read the error and explain why the spelling is now correct but the order is wrong.",
      "Verplaats de print boven de toewijzing. Lees de fout en leg uit waarom de spelling nu klopt maar de volgorde niet.",
    ],
    note: [
      "Python treats animal and Animal as different names. The repaired call looks up the name that was actually assigned.",
      "Python behandelt animal en Animal als verschillende namen. De herstelde aanroep zoekt de naam op waaraan werkelijk een waarde is toegewezen.",
    ],
  }),
  lesson(2, "profile", {
    title: ["Create a small profile", "Maak een klein profiel"],
    topics: "values-review",
    practices: "variables integers floats types",
    requires: "variables integers floats",
    guidance: "independent",
    minutes: 18,
    intro: [
      "Build a small profile from a brief. Choose the correct value types and print the stored information in order.",
      "Bouw een klein profiel vanuit een opdracht. Kies de juiste waardetypen en druk de opgeslagen informatie op volgorde af.",
    ],
    teach: [
      "Separate the data from the output: assign names and values first, then display them. Read the brief to decide whether each value represents text, a whole count or a measurement.\n\nThe example describes a shop. Your program describes a hiking trip. You can inspect types with extra temporary print calls while debugging; remove that temporary output before checking the required report.",
      "Scheid gegevens van uitvoer: wijs eerst namen en waarden toe en toon ze daarna. Lees de opdracht om te bepalen of elke waarde tekst, een geheel aantal of een meting voorstelt.\n\nHet voorbeeld beschrijft een winkel. Jouw programma beschrijft een wandeltocht. Je kunt tijdens het onderzoeken typen afdrukken met tijdelijke print-aanroepen; verwijder die tijdelijke uitvoer voordat je het gevraagde verslag controleert.",
    ],
    idea: [
      "Store each value using a type that matches what it represents.",
      "Bewaar elke waarde met een type dat past bij wat zij voorstelt.",
    ],
    example:
      'shop = "Corner shop"\nstaff = 3\nopening_time = 8.5\nprint(shop)\nprint(staff)\nprint(opening_time)',
    output: "Corner shop\n3\n8.5\n",
    predict: [
      "Which assignment stores text rather than a number?",
      "Welke toewijzing bewaart tekst in plaats van een getal?",
    ],
    starter: "",
    solution:
      'destination = "Forest"\nwalkers = 4\ndistance = 7.5\nprint(destination)\nprint(walkers)\nprint(distance)\n',
    steps: [
      step(
        [
          'Create destination = "Forest", walkers = 4 and distance = 7.5, using a string, int and float respectively.',
          'Maak destination = "Forest", walkers = 4 en distance = 7.5, met respectievelijk een string, int en float.',
        ],
        'destination == "Forest" and type(walkers) is int and walkers == 4 and type(distance) is float and distance == 7.5',
        [
          "Only the place name needs quotes. The distance needs a decimal point.",
          "Alleen de plaatsnaam heeft aanhalingstekens nodig. De afstand heeft een decimale punt nodig.",
        ],
        'label = "text"',
      ),
      step(
        [
          "Print the destination, walker count and distance, one per line.",
          "Druk bestemming, aantal wandelaars en afstand af, elk op een eigen regel.",
        ],
        output("Forest\n4\n7.5\n"),
        [
          "Use the stored values, in the order of the brief.",
          "Gebruik de opgeslagen waarden in de volgorde van de opdracht.",
        ],
        "print(destination)",
      ),
    ],
    experiment: [
      "Change the destination and both numbers. Predict the report without changing any print calls.",
      "Verander de bestemming en beide getallen. Voorspel het verslag zonder print-aanroepen te wijzigen.",
    ],
    note: [
      "Names separate the information from its presentation. The same output instructions work after the data changes.",
      "Namen scheiden informatie van de presentatie. Dezelfde uitvoerinstructies werken nadat de gegevens veranderen.",
    ],
  }),
];
