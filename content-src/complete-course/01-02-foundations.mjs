import { lesson, S, C, B } from "./authoring.mjs";
export const activities = [
  lesson(1, 1, {
    explanation: [
      "Make a useful announcement. The editor holds your instructions; Run asks Python to execute them from top to bottom. Output appears in the terminal. Your edits save automatically. Read the example, predict its output, then type your own two-line version in the editor.",
      "Maak een nuttige aankondiging. De editor bevat je instructies; Uitvoeren laat Python ze van boven naar beneden uitvoeren. De uitvoer verschijnt in de terminal. Je wijzigingen worden automatisch opgeslagen. Lees het voorbeeld, voorspel de uitvoer en typ daarna je eigen versie van twee regels in de editor.",
    ],
    sections: [
      S(
        "welcome comments print strings variables",
        ["Names and values", "Namen en waarden"],
        [
          "A string is text inside matching quotes. Assignment (=) gives a value a name. print(...) displays a value. A # comment explains an intention to a reader; Python ignores the rest of that line. Change code in the editor, not in the output area.",
          "Een string is tekst tussen bijpassende aanhalingstekens. Toewijzing (=) geeft een waarde een naam. print(...) toont een waarde. Een #-commentaar legt een bedoeling uit aan de lezer; Python negeert de rest van die regel. Wijzig code in de editor, niet in het uitvoervak.",
        ],
        '# Announce a meeting\nplace = "Library"\nprint(place)\nprint("Doors open")',
        "Library\nDoors open\n",
        [
          "Which line gives a name a value, and which lines display text?",
          "Welke regel geeft een naam een waarde en welke regels tonen tekst?",
        ],
      ),
    ],
    starter: "",
    solution:
      '# Welcome visitors\nplace = "Studio"\nprint(place)\nprint("Welcome!")\n',
    tasks: [
      C(
        "comments variables strings",
        [
          'Create a string variable place with the value "Studio" and add a comment explaining the announcement.',
          'Maak een stringvariabele place met de waarde "Studio" en voeg commentaar toe dat de aankondiging uitlegt.',
        ],
        'place == "Studio" and any(line.lstrip().startswith("#") for line in _source.splitlines())',
        [
          [
            "Text values need quotes; variable names do not.",
            "Tekstwaarden hebben aanhalingstekens nodig; variabelenamen niet.",
          ],
          [
            "Assign the location before printing it. A comment begins with #.",
            "Wijs de locatie toe voordat je die afdrukt. Commentaar begint met #.",
          ],
          ['Start with place = "Studio".', 'Begin met place = "Studio".'],
        ],
        [
          "Check the spelling and quotes around Studio.",
          "Controleer de spelling en de aanhalingstekens rond Studio.",
        ],
      ),
      C(
        "welcome print",
        [
          'Print place, then print "Welcome!" on a new line. Run your program.',
          'Druk place af en druk daarna "Welcome!" af op een nieuwe regel. Voer je programma uit.',
        ],
        '_stdout == "Studio\nWelcome!\n"',
        [
          [
            "Each print call ends a line by default.",
            "Elke print-aanroep eindigt standaard een regel.",
          ],
          [
            "Use two print calls, in the requested order.",
            "Gebruik twee print-aanroepen, in de gevraagde volgorde.",
          ],
          [
            "print(place) displays the variable’s value.",
            "print(place) toont de waarde van de variabele.",
          ],
        ],
        [
          "The terminal should contain exactly two lines: the location and the greeting.",
          "De terminal moet precies twee regels bevatten: de locatie en de begroeting.",
        ],
      ),
    ],
    note: [
      "The variable stores the location, so print(place) follows any later change to it. The comment is for people and produces no output.",
      "De variabele bewaart de locatie, zodat print(place) een latere wijziging volgt. Het commentaar is voor mensen en geeft geen uitvoer.",
    ],
    experiment: [
      "After passing, change Studio to your own location. Predict which output line changes, then run it.",
      "Wijzig na het slagen Studio in je eigen locatie. Voorspel welke uitvoerregel verandert en voer uit.",
    ],
  }),
  lesson(1, 2, {
    explanation: [
      "Calculate a receipt from quantities instead of typing a fixed total. This lets the same program handle changed prices.",
      "Bereken een kassabon uit aantallen in plaats van een vast totaal te typen. Zo werkt hetzelfde programma met gewijzigde prijzen.",
    ],
    sections: [
      S(
        "integers floats arithmetic precedence",
        ["Follow the calculation", "Volg de berekening"],
        [
          "An int is a whole number; a float has a decimal point. Python uses +, -, *, / for addition, subtraction, multiplication and division. Multiplication and division happen before addition and subtraction; parentheses group a calculation. / returns a float, even when the division is exact.",
          "Een int is een geheel getal; een float heeft een decimale punt. Python gebruikt +, -, *, / voor optellen, aftrekken, vermenigvuldigen en delen. Vermenigvuldigen en delen gaan vóór optellen en aftrekken; haakjes groeperen een berekening. / geeft een float terug, ook als de deling exact is.",
        ],
        "books = 3\nprice = 4.5\nprint(books * price + 2)\nprint((books + 1) * price)\nprint(9 / 2)",
        "15.5\n18.0\n4.5\n",
        [
          "Why do the first two totals differ?",
          "Waarom verschillen de eerste twee totalen?",
        ],
      ),
    ],
    starter:
      "quantity = 4\nprice = 2.5\ndiscount = 1.0\n# Calculate subtotal and total, then print total.\n",
    solution:
      "quantity = 4\nprice = 2.5\ndiscount = 1.0\nsubtotal = quantity * price\ntotal = subtotal - discount\nprint(total)\n",
    tasks: [
      C(
        "integers floats arithmetic",
        [
          "Calculate subtotal as quantity times price.",
          "Bereken subtotal als quantity maal price.",
        ],
        "subtotal == quantity * price",
        [
          [
            "Separate the item cost from the discount.",
            "Scheid de artikelkosten van de korting.",
          ],
          [
            "Multiply the two existing variables.",
            "Vermenigvuldig de twee bestaande variabelen.",
          ],
          ["subtotal = quantity * price", "subtotal = quantity * price"],
        ],
        [
          "Check that a different quantity changes the subtotal.",
          "Controleer dat een ander aantal het subtotaal verandert.",
        ],
        [
          B({ quantity: 0, price: 3.25 }, "subtotal == 0"),
          B({ quantity: 3, price: 1.5 }, "subtotal == 4.5"),
        ],
      ),
      C(
        "precedence arithmetic",
        [
          "Subtract discount from subtotal to obtain total; print total.",
          "Trek discount van subtotal af voor total; druk total af.",
        ],
        "total == subtotal - discount and _stdout.strip() == str(total)",
        [
          [
            "The discount applies once to the whole receipt.",
            "De korting geldt één keer voor de hele bon.",
          ],
          [
            "Subtract after the multiplication.",
            "Trek af na de vermenigvuldiging.",
          ],
          ["total = subtotal - discount", "total = subtotal - discount"],
        ],
        [
          "Do not subtract the discount from each item price.",
          "Trek de korting niet van elke artikelprijs af.",
        ],
        [
          B(
            { quantity: 2, price: 4.0, discount: 3.0 },
            "total == 5 and _stdout.strip() == str(total)",
          ),
        ],
      ),
    ],
    note: [
      "Computing subtotal first makes the two steps visible. quantity * (price - discount) would apply the discount repeatedly and answer a different question.",
      "Door eerst subtotal te berekenen worden de twee stappen zichtbaar. quantity * (price - discount) zou de korting herhaaldelijk toepassen en een andere vraag beantwoorden.",
    ],
    experiment: [
      "Set quantity to 1, then to 0 with discount also 0. Explain both totals before running.",
      "Zet quantity op 1 en daarna op 0 met ook discount op 0. Verklaar beide totalen voordat je uitvoert.",
    ],
  }),
  lesson(1, 3, {
    explanation: [
      "Track stock as deliveries and sales change it. Each assignment replaces the previous value of that name.",
      "Houd voorraad bij terwijl leveringen en verkopen die veranderen. Elke toewijzing vervangt de vorige waarde van die naam.",
    ],
    sections: [
      S(
        "changing-numbers plus-equals",
        ["Update a value", "Werk een waarde bij"],
        [
          "In score = score + 3, Python reads the old score, adds 3, then stores the result. score += 3 abbreviates that update. -= similarly subtracts. Execution order matters: printing before an update shows the earlier value.",
          "Bij score = score + 3 leest Python de oude score, telt er 3 bij op en bewaart het resultaat. score += 3 verkort die update. -= trekt op dezelfde manier af. De volgorde telt: afdrukken vóór een update toont de eerdere waarde.",
        ],
        "score = 4\nscore += 3\nprint(score)\nscore = score - 2\nprint(score)",
        "7\n5\n",
        [
          "What value is read on the right side of the last assignment?",
          "Welke waarde wordt rechts bij de laatste toewijzing gelezen?",
        ],
      ),
    ],
    starter:
      "stock = 12\ndelivery = 5\nsold = 4\n# Update stock for the delivery and then the sales.\nprint(stock)\n",
    solution:
      "stock = 12\ndelivery = 5\nsold = 4\nstock += delivery\nstock = stock - sold\nprint(stock)\n",
    tasks: [
      C(
        "plus-equals",
        [
          "Use += to add delivery to stock before printing.",
          "Gebruik += om delivery vóór het afdrukken bij stock op te tellen.",
        ],
        "any(isinstance(n, _ast.AugAssign) and isinstance(n.op, _ast.Add) for n in _ast.walk(_ast.parse(_source)))",
        [
          [
            "An update reads and replaces the same variable.",
            "Een update leest en vervangt dezelfde variabele.",
          ],
          [
            "Put the update after all three starting values.",
            "Zet de update na de drie beginwaarden.",
          ],
          ["stock += delivery", "stock += delivery"],
        ],
        [
          "This practice asks for +=; put it on an executable line.",
          "Deze oefening vraagt om +=; zet het op een uitvoerbare regel.",
        ],
        [B({ delivery: 0, sold: 0 }, "stock == 12")],
      ),
      C(
        "changing-numbers",
        [
          "Subtract sold from stock and print the final stock.",
          "Trek sold van stock af en druk de eindvoorraad af.",
        ],
        'stock == 13 and _stdout.strip() == "13"',
        [
          [
            "The final amount includes both changes.",
            "Het eindbedrag bevat beide veranderingen.",
          ],
          [
            "Subtract sales from the updated stock.",
            "Trek de verkopen van de bijgewerkte voorraad af.",
          ],
          ["stock = stock - sold", "stock = stock - sold"],
        ],
        [
          "Do not restart from the initial stock after the delivery.",
          "Begin na de levering niet opnieuw bij de beginvoorraad.",
        ],
        [
          B(
            { stock: 20, delivery: 2, sold: 6 },
            'stock == 16 and _stdout.strip() == "16"',
          ),
          B({ stock: 0, delivery: 4, sold: 4 }, "stock == 0"),
        ],
      ),
    ],
    note: [
      "The two updates model events in order. Printing once at the end reports the remaining stock, not the number sold.",
      "De twee updates modelleren gebeurtenissen op volgorde. Eén keer afdrukken aan het einde toont de resterende voorraad, niet het verkochte aantal.",
    ],
    experiment: [
      "Move print(stock) between the updates. Explain why it now reports a different point in time.",
      "Verplaats print(stock) tussen de updates. Leg uit waarom het nu een ander moment toont.",
    ],
  }),
  lesson(1, 4, {
    explanation: [
      "Use powers for repeated multiplication and quotient/remainder for grouping. These operations describe a result; no rounding-up formula is needed.",
      "Gebruik machten voor herhaald vermenigvuldigen en quotiënt/rest voor groeperen. Deze bewerkingen beschrijven een resultaat; er is geen formule voor naar boven afronden nodig.",
    ],
    sections: [
      S(
        "exponents floor-division modulo",
        ["Three different questions", "Drie verschillende vragen"],
        [
          "a ** b raises a to a power. // finds the floor quotient; % finds the remainder. For positive group sizes, items == groups * size + leftover. // rounds downward, so -7 // 3 is -3 and -7 % 3 is 2. Use parentheses when experimenting with negative bases.",
          "a ** b verheft a tot een macht. // geeft het naar beneden afgeronde quotiënt; % geeft de rest. Bij positieve groepsgrootte geldt items == groups * size + leftover. // rondt naar beneden af, dus -7 // 3 is -3 en -7 % 3 is 2. Gebruik haakjes bij negatieve grondtallen.",
        ],
        "print(3 ** 2)\nprint(17 // 5)\nprint(17 % 5)",
        "9\n3\n2\n",
        [
          "How many complete groups fit, and what remains?",
          "Hoeveel volledige groepen passen en wat blijft over?",
        ],
      ),
    ],
    starter:
      "side = 6\nitems = 23\nsize = 5\n# Calculate area, groups, and leftover.\n",
    solution:
      "side = 6\nitems = 23\nsize = 5\narea = side ** 2\ngroups = items // size\nleftover = items % size\nprint(area, groups, leftover)\n",
    tasks: [
      C(
        "exponents",
        [
          "Set area to side squared using **.",
          "Stel area in op side in het kwadraat met **.",
        ],
        "area == side ** 2 and any(isinstance(n,_ast.BinOp) and isinstance(n.op,_ast.Pow) for n in _ast.walk(_ast.parse(_source)))",
        [
          [
            "A square’s area is side times side.",
            "De oppervlakte van een vierkant is zijde maal zijde.",
          ],
          [
            "The exponent is 2, not the group size.",
            "De exponent is 2, niet de groepsgrootte.",
          ],
          ["area = side ** 2", "area = side ** 2"],
        ],
        [
          "Use Python’s power operator, **. ^ is a different operation.",
          "Gebruik Pythons machtsoperator **. ^ is een andere bewerking.",
        ],
        [B({ side: 0 }, "area == 0"), B({ side: 3 }, "area == 9")],
      ),
      C(
        "floor-division modulo",
        [
          "Calculate complete groups and leftover items. Print area, groups, leftover on one line.",
          "Bereken volledige groepen en overgebleven items. Druk area, groups, leftover op één regel af.",
        ],
        'groups == 4 and leftover == 3 and _stdout.strip() == "36 4 3"',
        [
          [
            "Complete groups exclude the remainder.",
            "Volledige groepen bevatten de rest niet.",
          ],
          [
            "Use // for groups and % for leftover.",
            "Gebruik // voor groups en % voor leftover.",
          ],
          ["leftover = items % size", "leftover = items % size"],
        ],
        [
          "For 23 items of size 5, there are 4 complete groups and 3 left.",
          "Bij 23 items en grootte 5 zijn er 4 volledige groepen en 3 over.",
        ],
        [
          B({ items: 20 }, "groups == 4 and leftover == 0"),
          B({ items: 0 }, "groups == 0 and leftover == 0"),
          B({ items: 3 }, "groups == 0 and leftover == 3"),
        ],
      ),
    ],
    note: [
      "The program answers three independent questions. A partial group is reported as leftover instead of silently counted as a complete group.",
      "Het programma beantwoordt drie onafhankelijke vragen. Een gedeeltelijke groep wordt als rest gemeld en niet stilzwijgend als volledige groep geteld.",
    ],
    experiment: [
      "Try items = 19, 20, 21. Explain why groups changes only once while leftover resets to zero.",
      "Probeer items = 19, 20, 21. Leg uit waarom groups maar één keer verandert terwijl leftover op nul terugkomt.",
    ],
  }),
  lesson(1, 5, {
    explanation: [
      "Build a short event report yourself. Use only familiar calculations and text. The supplied data is the input to your program; you choose the steps. If Python reports an error, read the last line for its kind and the indicated line number before changing code.",
      "Bouw zelf een kort evenementenrapport. Gebruik alleen bekende berekeningen en tekst. De meegeleverde gegevens vormen de invoer; jij kiest de stappen. Meldt Python een fout, lees dan eerst de laatste regel voor de soort fout en het aangegeven regelnummer voordat je code wijzigt.",
    ],
    sections: [
      S(
        "concatenation multiline-strings errors",
        ["Assemble text carefully", "Stel tekst zorgvuldig samen"],
        [
          "+ concatenates strings: it joins them without adding spaces. Triple quotes hold multiline text. Names are case-sensitive: using a name before assigning it causes NameError. A missing closing quote causes SyntaxError. Text plus a number causes TypeError; for now print them as separate comma-separated arguments.",
          "+ plakt strings aan elkaar zonder spaties toe te voegen. Drievoudige aanhalingstekens bevatten tekst met meerdere regels. Namen zijn hoofdlettergevoelig: een naam gebruiken vóór toewijzing veroorzaakt NameError. Een ontbrekend sluitend aanhalingsteken veroorzaakt SyntaxError. Tekst plus een getal veroorzaakt TypeError; druk ze voorlopig af als aparte argumenten met komma’s.",
        ],
        'name = "Makers"\nheading = "Hello " + name\nnotes = """Open\nCome inside"""\nprint(heading)\nprint(notes)\nprint("Seats:", 3 + 2)',
        "Hello Makers\nOpen\nCome inside\nSeats: 5\n",
        [
          "Where does the space after Hello come from?",
          "Waar komt de spatie na Hello vandaan?",
        ],
      ),
    ],
    starter:
      'event = "Code cafe"\ntables = 4\nseats_per_table = 3\nreserved = 2\n',
    solution:
      'event = "Code cafe"\ntables = 4\nseats_per_table = 3\nreserved = 2\nheading = "Welcome to " + event\nnotes = """Bring curiosity\nAsk questions"""\navailable = tables * seats_per_table - reserved\nprint(heading)\nprint(notes)\nprint(available)\n',
    tasks: [
      C(
        "concatenation multiline-strings",
        [
          'Create heading by joining "Welcome to " and event. Set notes to two lines: "Bring curiosity" and "Ask questions" using triple quotes.',
          'Maak heading door "Welcome to " en event samen te voegen. Geef notes twee regels: "Bring curiosity" en "Ask questions" met drievoudige aanhalingstekens.',
        ],
        'heading == "Welcome to " + event and notes == "Bring curiosity\nAsk questions" and (chr(34) * 3 in _source or chr(39) * 3 in _source)',
        [
          [
            "Keep the greeting separate from the event name.",
            "Houd de begroeting apart van de evenementnaam.",
          ],
          [
            "A space belongs inside the first string. Triple quotes can enclose a newline.",
            "Een spatie hoort binnen de eerste string. Drievoudige aanhalingstekens kunnen een nieuwe regel omsluiten.",
          ],
          [
            'heading = "Welcome to " + event',
            'heading = "Welcome to " + event',
          ],
        ],
        [
          "Compare the two text values and preserve the newline between the notes.",
          "Vergelijk de twee tekstwaarden en behoud de nieuwe regel tussen de notities.",
        ],
        [B({ event: "Night lab" }, 'heading == "Welcome to Night lab"')],
      ),
      C(
        "errors",
        [
          "Calculate available seats after reservations. Print heading, notes and available in that order without errors.",
          "Bereken beschikbare plaatsen na reserveringen. Druk heading, notes en available in die volgorde foutloos af.",
        ],
        'available == 10 and _stdout == heading + "\n" + notes + "\n10\n"',
        [
          [
            "Read the data names exactly as spelled.",
            "Lees de namen precies zoals ze gespeld zijn.",
          ],
          [
            "Calculate all seats, then subtract reserved. Print each result separately.",
            "Bereken alle plaatsen en trek reserved af. Druk elk resultaat apart af.",
          ],
          [
            "available = tables * seats_per_table - reserved",
            "available = tables * seats_per_table - reserved",
          ],
        ],
        [
          "Check the error line first, then the order of your print calls and calculations.",
          "Controleer eerst de foutregel, daarna de volgorde van print-aanroepen en berekeningen.",
        ],
        [
          B(
            { tables: 2, seats_per_table: 5, reserved: 10 },
            'available == 0 and _stdout.endswith("\n0\n")',
          ),
        ],
      ),
    ],
    note: [
      "The heading depends on event, the notes use one multiline string, and available follows multiplication before subtraction. No branch or unfamiliar packing formula is required.",
      "De kop hangt af van event, de notities gebruiken één meerregelige string en available vermenigvuldigt vóór het aftrekken. Er is geen vertakking of onbekende verpakkingsformule nodig.",
    ],
    experiment: [
      "Temporarily change print(heading) to print(Heading). Read the error, explain the case difference, then repair it. Change reserved to the total seat count and predict the report.",
      "Verander print(heading) tijdelijk in print(Heading). Lees de fout, verklaar het verschil in hoofdletters en herstel het. Verander reserved in het totale aantal plaatsen en voorspel het rapport.",
    ],
  }),
  lesson(2, 1, {
    explanation: [
      "Ask a visitor for information and show a personalised report. input always returns text, even when the visitor types digits.",
      "Vraag een bezoeker om informatie en toon een persoonlijk rapport. input geeft altijd tekst terug, ook wanneer de bezoeker cijfers typt.",
    ],
    sections: [
      S(
        "input conversion f-strings",
        ["Read, convert, display", "Lees, zet om, toon"],
        [
          "input(prompt) pauses for a line. int(text) converts whole-number text; float(text) accepts decimal text with a dot. Assume valid numeric input in this module; recovery comes later. An f-string evaluates expressions inside braces and formats their values as text.",
          "input(prompt) wacht op een regel. int(text) zet gehele-getaltekst om; float(text) accepteert decimale tekst met een punt. Ga in deze module uit van geldige getallen; herstel volgt later. Een f-string berekent expressies tussen accolades en toont hun waarden als tekst.",
        ],
        'name = "Ada"\ncount = int("3")\nprice = float("2.5")\nprint(f"{name}: {count * price}")',
        "Ada: 7.5\n",
        [
          "How would the result differ if count stayed a string?",
          "Hoe zou het resultaat verschillen als count een string bleef?",
        ],
      ),
    ],
    starter:
      'name = input("Name: ")\n# Read nights and price, then report the total.\n',
    solution:
      'name = input("Name: ")\nnights = int(input("Nights: "))\nprice = float(input("Price: "))\ntotal = nights * price\nprint(f"{name}: {total}")\n',
    inputs: ["Sam", "3", "4.5"],
    tasks: [
      C(
        "input conversion",
        [
          "Read nights as an int and price as a float after name. Compute total = nights * price.",
          "Lees na name nights als int en price als float. Bereken total = nights * price.",
        ],
        'name == "Sam" and nights == 3 and price == 4.5 and total == 13.5',
        [
          [
            "Convert at the point where text becomes a number.",
            "Zet om op het moment dat tekst een getal wordt.",
          ],
          [
            "Wrap each numeric input call in int or float.",
            "Zet elke numerieke input-aanroep in int of float.",
          ],
          [
            'nights = int(input("Nights: "))',
            'nights = int(input("Nights: "))',
          ],
        ],
        [
          "Read name, nights, then price. Numeric strings cannot be multiplied together.",
          "Lees name, nights en daarna price. Numerieke strings kunnen niet met elkaar vermenigvuldigd worden.",
        ],
        [
          {
            stdin: ["Jo", "0", "8.25"],
            check: "total == 0 and nights == 0 and price == 8.25",
          },
        ],
      ),
      C(
        "f-strings",
        [
          "Use an f-string to print the name, a colon and space, and total.",
          "Gebruik een f-string om de naam, een dubbele punt en spatie en total af te drukken.",
        ],
        '"Sam: 13.5" in _stdout and any(isinstance(n,_ast.JoinedStr) for n in _ast.walk(_ast.parse(_source)))',
        [
          [
            "Put f before the opening quote.",
            "Zet f vóór het eerste aanhalingsteken.",
          ],
          [
            "Variable names go inside braces.",
            "Variabelenamen komen tussen accolades.",
          ],
          ['print(f"{name}: {total}")', 'print(f"{name}: {total}")'],
        ],
        [
          "Include both values, not their literal variable names.",
          "Neem beide waarden op, niet hun letterlijke variabelenamen.",
        ],
        [{ stdin: ["Lee", "2", "3.25"], check: '"Lee: 6.5" in _stdout' }],
      ),
    ],
    note: [
      "The conversions prevent string repetition or a TypeError. The f-string converts the numeric total to display text without changing the stored total.",
      "De omzettingen voorkomen stringherhaling of een TypeError. De f-string zet het numerieke totaal om naar schermtekst zonder de opgeslagen total te veranderen.",
    ],
    experiment: [
      "Try one night and a fractional price. Then try zero nights. Explain the types of all four variables.",
      "Probeer één nacht en een prijs met decimalen. Probeer daarna nul nachten. Leg de types van alle vier variabelen uit.",
    ],
  }),
  lesson(2, 2, {
    explanation: [
      "Express eligibility as a True or False value before choosing an action. Test the exact boundary, not just an easy value far from it.",
      "Druk geschiktheid uit als True of False voordat je een actie kiest. Test de exacte grens, niet alleen een gemakkelijke waarde er ver vandaan.",
    ],
    sections: [
      S(
        "boolean-expressions boolean-variables relational-operators",
        ["Comparisons produce values", "Vergelijkingen leveren waarden"],
        [
          "A Boolean expression evaluates to True or False; a variable can store that result. == compares equality and != inequality. < and > exclude the boundary; <= and >= include it. A single = assigns a value and does not compare it.",
          "Een booleaanse expressie geeft True of False; een variabele kan dat resultaat bewaren. == vergelijkt gelijkheid en != ongelijkheid. < en > sluiten de grens uit; <= en >= nemen die mee. Eén = wijst een waarde toe en vergelijkt niet.",
        ],
        "age = 12\nprint(age == 12, age != 12)\nprint(age < 12, age <= 12)\nprint(age > 12, age >= 12)",
        "True False\nFalse True\nFalse True\n",
        [
          "Which comparisons include exactly 12?",
          "Welke vergelijkingen nemen precies 12 mee?",
        ],
      ),
    ],
    starter: "height = 140\nminimum = 140\n# Store comparisons below.\n",
    solution:
      "height = 140\nminimum = 140\nallowed = height >= minimum\nat_limit = height == minimum\ntoo_short = height < minimum\nprint(allowed, at_limit, too_short)\n",
    tasks: [
      C(
        "boolean-expressions boolean-variables",
        [
          "Set allowed to whether height is at least minimum, and at_limit to whether they are equal.",
          "Geef allowed aan of height minstens minimum is en at_limit of ze gelijk zijn.",
        ],
        "allowed is True and at_limit is True",
        [
          [
            "Store comparison results, not quoted words.",
            "Bewaar vergelijkingsresultaten, geen woorden tussen aanhalingstekens.",
          ],
          ["At least includes equality.", "Minstens omvat gelijkheid."],
          ["allowed = height >= minimum", "allowed = height >= minimum"],
        ],
        [
          "The minimum itself qualifies. Use Booleans rather than strings.",
          "Het minimum zelf voldoet. Gebruik booleans in plaats van strings.",
        ],
        [
          B({ height: 139 }, "allowed is False and at_limit is False"),
          B({ height: 141 }, "allowed is True and at_limit is False"),
        ],
      ),
      C(
        "relational-operators",
        [
          "Set too_short to height < minimum and print allowed, at_limit, too_short.",
          "Geef too_short de waarde height < minimum en druk allowed, at_limit, too_short af.",
        ],
        'too_short is False and _stdout.strip() == "True True False"',
        [
          [
            "The rejected side must exclude the accepted boundary.",
            "De afgewezen kant moet de toegestane grens uitsluiten.",
          ],
          ["Compare using <, not <=.", "Vergelijk met <, niet met <=."],
          ["too_short = height < minimum", "too_short = height < minimum"],
        ],
        [
          "At the minimum height, too_short must be False.",
          "Bij de minimumhoogte moet too_short False zijn.",
        ],
        [
          B({ height: -1 }, "too_short is True"),
          B({ height: 200 }, "too_short is False"),
        ],
      ),
    ],
    note: [
      "The same input can make more than one comparison true. allowed includes the boundary while too_short excludes it, so they divide the valid numeric inputs without a gap.",
      "Dezelfde invoer kan meerdere vergelijkingen waar maken. allowed neemt de grens mee en too_short sluit die uit, zodat ze de geldige numerieke invoer zonder gat verdelen.",
    ],
    experiment: [
      "Trace height values 139, 140, 141 on paper. Also compare !=, > and <= for each value before running.",
      "Volg de waarden 139, 140, 141 op papier. Vergelijk voor elke waarde ook !=, > en <= voordat je uitvoert.",
    ],
  }),
  lesson(2, 3, {
    explanation: [
      "Turn a Boolean decision into exactly one action. Indentation tells Python which statements belong to a branch.",
      "Zet een booleaanse beslissing om in precies één actie. Inspringing vertelt Python welke opdrachten bij een tak horen.",
    ],
    sections: [
      S(
        "if else indentation",
        ["Two routes, one program", "Twee routes, één programma"],
        [
          "if evaluates its condition. An indented block runs only when that condition is true. else runs when it is false. End the if and else lines with a colon and indent their bodies consistently, conventionally four spaces. Statements after the branches resume at the outer indentation.",
          "if berekent zijn voorwaarde. Een ingesprongen blok wordt alleen uitgevoerd als die waar is. else wordt uitgevoerd als die onwaar is. Sluit if en else af met een dubbele punt en spring consequent in, gewoonlijk vier spaties. Opdrachten na de takken gaan verder op het buitenste inspringniveau.",
        ],
        'temperature = 8\nif temperature < 10:\n    print("Bring a coat")\nelse:\n    print("Light jacket")\nprint("Ready")',
        "Bring a coat\nReady\n",
        [
          "Which line runs regardless of the temperature?",
          "Welke regel wordt ongeacht de temperatuur uitgevoerd?",
        ],
      ),
    ],
    starter: 'balance = 8\ncost = 8\n# Set message to "Buy" or "Save".\n',
    solution:
      'balance = 8\ncost = 8\nif balance >= cost:\n    message = "Buy"\nelse:\n    message = "Save"\nprint(message)\n',
    tasks: [
      C(
        "if else",
        [
          'Set message to "Buy" if balance covers cost, otherwise "Save".',
          'Stel message in op "Buy" als balance cost dekt, anders op "Save".',
        ],
        'message == "Buy"',
        [
          [
            "Covering the cost includes an equal balance.",
            "De kosten dekken omvat een gelijk saldo.",
          ],
          [
            "Use if for the purchase and else for the other case.",
            "Gebruik if voor kopen en else voor het andere geval.",
          ],
          ["if balance >= cost:", "if balance >= cost:"],
        ],
        [
          "Try a balance just below, equal to, and above the cost.",
          "Probeer een saldo net onder, gelijk aan en boven de kosten.",
        ],
        [
          B({ balance: 7 }, 'message == "Save"'),
          B({ balance: 9 }, 'message == "Buy"'),
        ],
      ),
      C(
        "indentation",
        [
          "Print message once after the branches.",
          "Druk message één keer af na de takken.",
        ],
        "_stdout.strip() == message",
        [
          [
            "A shared action belongs after both alternatives.",
            "Een gedeelde actie hoort na beide alternatieven.",
          ],
          [
            "Move print to the outer indentation.",
            "Zet print op het buitenste inspringniveau.",
          ],
          ["print(message)", "print(message)"],
        ],
        [
          "Both paths should print exactly one message.",
          "Beide routes moeten precies één bericht afdrukken.",
        ],
        [
          B({ balance: 0, cost: 2 }, '_stdout.strip() == "Save"'),
          B({ balance: 0, cost: 0 }, '_stdout.strip() == "Buy"'),
        ],
      ),
    ],
    note: [
      "One if/else selects exactly one message; the shared print runs afterward. This avoids accidentally printing only for an accepted purchase.",
      "Eén if/else kiest precies één bericht; de gedeelde print wordt daarna uitgevoerd. Zo druk je niet per ongeluk alleen iets af bij een toegestane aankoop.",
    ],
    experiment: [
      "Indent print inside else temporarily. Which input now produces no output? Restore it and test that counterexample.",
      "Spring print tijdelijk in binnen else. Welke invoer geeft nu geen uitvoer? Herstel de regel en test dat tegenvoorbeeld.",
    ],
  }),
  lesson(2, 4, {
    explanation: [
      "Combine simple rules for a workshop entrance. Name each fact first so you can explain why the final decision is true or false.",
      "Combineer eenvoudige regels voor toegang tot een workshop. Geef elk feit eerst een naam zodat je kunt verklaren waarom de eindbeslissing waar of onwaar is.",
    ],
    sections: [
      S(
        "and or not",
        ["Combine Boolean facts", "Combineer booleaanse feiten"],
        [
          "and requires both sides to be true. or needs at least one true side. not reverses a Boolean. Parentheses make the intended grouping visible. Trace every input combination; a happy-path test alone cannot tell and from or.",
          "and vereist dat beide kanten waar zijn. or heeft minstens één ware kant nodig. not keert een boolean om. Haakjes maken de bedoelde groepering zichtbaar. Volg elke invoercombinatie; één geslaagd voorbeeld kan and niet van or onderscheiden.",
        ],
        "member = False\nguest = True\nclosed = False\nprint(member and guest)\nprint(member or guest)\nprint((member or guest) and not closed)",
        "False\nTrue\nTrue\n",
        [
          "What changes if closed becomes True?",
          "Wat verandert als closed True wordt?",
        ],
      ),
    ],
    starter:
      "has_ticket = True\nis_helper = False\nis_banned = False\n# Decide whether entrance is allowed.\n",
    solution:
      "has_ticket = True\nis_helper = False\nis_banned = False\neligible = has_ticket or is_helper\nallowed = eligible and not is_banned\nprint(allowed)\n",
    tasks: [
      C(
        "or",
        [
          "Set eligible when someone has a ticket OR is a helper.",
          "Stel eligible in als iemand een kaartje heeft OF helper is.",
        ],
        "eligible is True",
        [
          [
            "Either of two reasons is enough.",
            "Eén van twee redenen is voldoende.",
          ],
          [
            "Combine the first two facts with or.",
            "Combineer de eerste twee feiten met or.",
          ],
          [
            "eligible = has_ticket or is_helper",
            "eligible = has_ticket or is_helper",
          ],
        ],
        [
          "A helper without a ticket is still eligible.",
          "Een helper zonder kaartje is nog steeds geschikt.",
        ],
        [
          B({ has_ticket: false, is_helper: true }, "eligible is True"),
          B({ has_ticket: false, is_helper: false }, "eligible is False"),
        ],
      ),
      C(
        "and not",
        [
          "Set allowed only for eligible people who are NOT banned. Print allowed.",
          "Geef alleen eligible personen die NIET verbannen zijn allowed. Druk allowed af.",
        ],
        'allowed is True and _stdout.strip() == "True"',
        [
          [
            "Eligibility and absence of a ban must both hold.",
            "Geschiktheid en afwezigheid van een verbod moeten beide gelden.",
          ],
          [
            "Reverse is_banned, then combine with eligible.",
            "Keer is_banned om en combineer met eligible.",
          ],
          [
            "allowed = eligible and not is_banned",
            "allowed = eligible and not is_banned",
          ],
        ],
        [
          "The ban must override both a ticket and helper status.",
          "Het verbod moet zowel een kaartje als de helperstatus overrulen.",
        ],
        [
          B(
            { has_ticket: true, is_helper: true, is_banned: true },
            "allowed is False",
          ),
          B(
            { has_ticket: false, is_helper: false, is_banned: false },
            "allowed is False",
          ),
          B(
            { has_ticket: false, is_helper: true, is_banned: false },
            "allowed is True",
          ),
        ],
      ),
    ],
    note: [
      "The named eligible value isolates the or rule. Combining it with not is_banned keeps a ban effective for every eligible visitor.",
      "De benoemde waarde eligible isoleert de or-regel. De combinatie met not is_banned houdt het verbod geldig voor elke geschikte bezoeker.",
    ],
    experiment: [
      "Make a table of all eight True/False combinations. Predict eligible and allowed for each, then check the cases you found hardest.",
      "Maak een tabel van alle acht True/False-combinaties. Voorspel voor elke combinatie eligible en allowed en controleer daarna de moeilijkste gevallen.",
    ],
  }),
  lesson(2, 5, {
    explanation: [
      "Build a tiny menu from a behaviour brief. Read an exact lowercase command: tea costs 2, juice costs 3, and water costs 0. Any other command is unavailable.",
      "Bouw een klein menu uit een gedragsbeschrijving. Lees een exact commando in kleine letters: tea kost 2, juice kost 3 en water kost 0. Elk ander commando is niet beschikbaar.",
    ],
    sections: [
      S(
        "elif",
        ["Several alternatives", "Meerdere alternatieven"],
        [
          "elif means “otherwise, if”. Python tests branches in order and runs only the first matching branch. The final else handles everything remaining. Two separate if statements would be two independent decisions.",
          "elif betekent “anders, als”. Python test takken op volgorde en voert alleen de eerste passende tak uit. De laatste else handelt alle overige gevallen af. Twee losse if-opdrachten zouden twee onafhankelijke beslissingen zijn.",
        ],
        'mode = "walk"\nif mode == "bike":\n    print(10)\nelif mode == "walk":\n    print(30)\nelse:\n    print("Unknown")',
        "30\n",
        [
          "Would the final else run after the matching elif?",
          "Zou de laatste else na de passende elif worden uitgevoerd?",
        ],
      ),
    ],
    starter: "# Read command, choose a price, and display a result.\n",
    solution:
      'command = input("Drink: ")\nif command == "tea":\n    price = 2\nelif command == "juice":\n    price = 3\nelif command == "water":\n    price = 0\nelse:\n    price = -1\nif price >= 0:\n    print(f"Price: {price}")\nelse:\n    print("Unavailable")\n',
    inputs: ["tea"],
    tasks: [
      C(
        "elif",
        [
          "Read command. Set price to 2 for tea, 3 for juice, 0 for water, or -1 for any other command.",
          "Lees command. Geef price 2 voor tea, 3 voor juice, 0 voor water of -1 voor elk ander commando.",
        ],
        "price == 2",
        [
          [
            "Use one ordered selection for mutually exclusive drinks.",
            "Gebruik één geordende keuze voor elkaar uitsluitende dranken.",
          ],
          [
            "Use if, then elif branches, then an else fallback.",
            "Gebruik if, dan elif-takken en daarna een else-terugval.",
          ],
          [
            'elif command == "juice":\n    price = 3',
            'elif command == "juice":\n    price = 3',
          ],
        ],
        [
          "Water is free, not unavailable. Unknown commands use -1.",
          "Water is gratis, niet onbeschikbaar. Onbekende commando’s gebruiken -1.",
        ],
        [
          { stdin: ["juice"], check: "price == 3" },
          { stdin: ["water"], check: "price == 0" },
          { stdin: ["coffee"], check: "price == -1" },
        ],
      ),
      C(
        "elif",
        [
          'For a known drink, display "Price: " followed by price. Otherwise display "Unavailable".',
          'Toon bij een bekende drank "Price: " gevolgd door price. Toon anders "Unavailable".',
        ],
        '"Price: 2" in _stdout',
        [
          [
            "The sentinel -1 is not a price to display.",
            "De signaalwaarde -1 is geen prijs om te tonen.",
          ],
          [
            "A price of zero is valid: include the equality boundary.",
            "Een prijs van nul is geldig: neem de gelijkheidsgrens mee.",
          ],
          [
            'if price >= 0:\n    print(f"Price: {price}")',
            'if price >= 0:\n    print(f"Price: {price}")',
          ],
        ],
        [
          "Check a free drink and an unknown command separately.",
          "Controleer een gratis drank en een onbekend commando apart.",
        ],
        [
          {
            stdin: ["water"],
            check: '"Price: 0" in _stdout and "Unavailable" not in _stdout',
          },
          {
            stdin: [""],
            check: '"Unavailable" in _stdout and "Price:" not in _stdout',
          },
        ],
      ),
    ],
    note: [
      "The menu stores a result first and then displays it. Using >= 0 preserves the free-water case. Equivalent branch arrangements are accepted when they keep the same behaviour.",
      "Het menu bewaart eerst een resultaat en toont het daarna. >= 0 behoudt het geval van gratis water. Andere vertakkingen zijn toegestaan als ze hetzelfde gedrag hebben.",
    ],
    experiment: [
      "Try tea, juice, water, an empty line and Tea. Explain why Tea is unknown here. Later you will learn how to normalise text.",
      "Probeer tea, juice, water, een lege regel en Tea. Leg uit waarom Tea hier onbekend is. Later leer je tekst normaliseren.",
    ],
  }),
];
