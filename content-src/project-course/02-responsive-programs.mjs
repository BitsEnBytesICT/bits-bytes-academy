import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const visitor = lesson({
  module: 2,
  number: 1,
  title: L(
    "A notice for the person at the keyboard",
    "Een bericht voor de persoon achter het toetsenbord",
  ),
  guidance: "guided",
  minutes: 12,
  explanation: L(
    "The welcome desk currently prints a notice for a fictional visitor. Let the person using the program supply the name and destination instead. A program waiting for input is not broken: click the terminal, type a response, and press Enter.",
    "De ontvangstbalie drukt nu een bericht voor een fictieve bezoeker af. Laat de gebruiker zelf de naam en bestemming opgeven. Een programma dat op invoer wacht is niet kapot: klik in de terminal, typ een antwoord en druk op Enter.",
  ),
  sections: [
    section(
      L("Pause, read, continue", "Pauzeren, lezen, doorgaan"),
      L(
        "input() displays its prompt and waits for one line. It returns that line as a string, without the Enter at the end. Store the returned value if a later statement needs it. The next statement runs only after a response arrives.",
        "input() toont een vraag en wacht op één regel. De functie geeft die regel als string terug, zonder de Enter aan het einde. Bewaar de teruggegeven waarde als een later statement die nodig heeft. Het volgende statement wordt pas na het antwoord uitgevoerd.",
      ),
      'colour = input("Choose a colour: ")\nprint("You chose", colour)',
    ),
    section(
      L("Two responses, in order", "Twee antwoorden, in volgorde"),
      L(
        'Two input calls ask two separate questions. Each assignment stores its own response. A blank line is still a response: it produces the empty string "". Do not put quote marks around your response in the terminal unless you actually want them in the text.',
        'Twee input-aanroepen stellen twee aparte vragen. Elke toekenning bewaart een eigen antwoord. Een lege regel is ook een antwoord: die produceert de lege string "". Zet je antwoord in de terminal niet tussen aanhalingstekens, tenzij je die echt in de tekst wilt hebben.',
      ),
      'animal = input("Animal: ")\nsound = input("Sound: ")\nprint(animal, "says", sound)',
    ),
  ],
  starter:
    'print("Welcome desk")\nvisitor = "Sample visitor"\ndestination = "Sample room"\nprint("Hello", visitor)\nprint("Your destination:", destination)\n',
  solution:
    'print("Welcome desk")\nvisitor = input("Your name: ")\ndestination = input("Where are you going? ")\nprint("Hello", visitor)\nprint("Your destination:", destination)\n',
  inputs: ["Taylor", "Library"],
  tasks: [
    task(
      "",
      L(
        "Ask for a visitor name and store the response in visitor. Keep the welcome heading.",
        "Vraag naar de naam van de bezoeker en bewaar het antwoord in visitor. Behoud de welkomstkop.",
      ),
      'isinstance(visitor, str) and "Welcome desk" in _stdout',
      [
        L(
          "The current assignment always supplies the same visitor.",
          "De huidige toekenning levert altijd dezelfde bezoeker op.",
        ),
        L(
          "An input call can be the value on the right of an assignment.",
          "Een input-aanroep kan de waarde rechts van een toekenning zijn.",
        ),
        L(
          "The colour example stores whatever the person types, rather than a fixed colour.",
          "Het colour-voorbeeld bewaart wat de gebruiker typt, in plaats van een vaste kleur.",
        ),
      ],
      L(
        "The stored visitor should come from the first response.",
        "De opgeslagen bezoeker moet uit het eerste antwoord komen.",
      ),
      [
        {
          stdin: ["Zoë", "Studio"],
          check: '_error is None and visitor == "Zoë"',
        },
        {
          stdin: ["Amir", "Workshop"],
          check: '_error is None and visitor == "Amir"',
        },
      ],
    ),
    task(
      "",
      L(
        "Ask for a destination after the name and store it separately in destination.",
        "Vraag na de naam naar een bestemming en bewaar die apart in destination.",
      ),
      "isinstance(destination, str)",
      [
        L(
          "A second question needs a second response.",
          "Een tweede vraag heeft een tweede antwoord nodig.",
        ),
        L(
          "Keep the two assignments separate so the destination does not replace the name.",
          "Houd de twee toekenningen apart zodat de bestemming de naam niet vervangt.",
        ),
        L(
          "animal and sound in the example hold different answers.",
          "animal en sound in het voorbeeld bevatten verschillende antwoorden.",
        ),
      ],
      L(
        "Check the order of the questions and which variable receives each response.",
        "Controleer de volgorde van de vragen en welke variabele elk antwoord ontvangt.",
      ),
      [
        {
          stdin: ["Zoë", "Studio"],
          check:
            '_error is None and destination == "Studio" and visitor == "Zoë"',
        },
        {
          stdin: ["Amir", "Main hall"],
          check: '_error is None and destination == "Main hall"',
        },
      ],
    ),
    task(
      "",
      L(
        "Keep both personalised lines in the report. Try your own name and a destination containing a space.",
        "Behoud beide gepersonaliseerde regels in het overzicht. Probeer je eigen naam en een bestemming met een spatie.",
      ),
      "visitor in _stdout and destination in _stdout",
      [
        L(
          "Reading a response does not automatically print a finished report.",
          "Een antwoord lezen drukt niet automatisch een afgerond overzicht af.",
        ),
        L(
          "Use the stored responses in the two existing print calls.",
          "Gebruik de opgeslagen antwoorden in de twee bestaande print-aanroepen.",
        ),
        L(
          'print("Selected:", colour) displays a label and a stored response.',
          'print("Selected:", colour) toont een label en een opgeslagen antwoord.',
        ),
      ],
      L(
        "Both responses should appear in the final output.",
        "Beide antwoorden moeten in de uiteindelijke uitvoer voorkomen.",
      ),
      [
        {
          stdin: ["Léa", "Meeting room"],
          check:
            '_error is None and "Léa" in _stdout and "Meeting room" in _stdout and _remaining_input == ""',
        },
      ],
    ),
  ],
  solutionNote: L(
    "The wording of the questions is yours. Each response is stored separately; spaces and accented letters remain part of the text.",
    "De formulering van de vragen kies je zelf. Elk antwoord wordt apart opgeslagen; spaties en letters met accenten blijven deel van de tekst.",
  ),
});

const tickets = lesson({
  module: 2,
  number: 2,
  title: L(
    "From typed text to a ticket price",
    "Van getypte tekst naar een ticketprijs",
  ),
  guidance: "guided",
  minutes: 14,
  explanation: L(
    "A ticket desk needs to calculate a price from a typed quantity. The starter reads a quantity but accidentally treats it as text. Repair that boundary between input and arithmetic, then display the price as an amount of money. For this exercise, enter valid whole-number quantities; handling invalid input comes in the next module.",
    "Een ticketbalie moet een prijs berekenen met een getypt aantal. De startcode leest het aantal, maar behandelt het per ongeluk als tekst. Herstel die grens tussen invoer en rekenen en toon de prijs daarna als een geldbedrag. Voer voor deze opdracht geldige gehele aantallen in; ongeldige invoer behandelen we in de volgende module.",
  ),
  sections: [
    section(
      L("Input returns text", "Invoer geeft tekst terug"),
      L(
        'Typing 5 produces the string "5", not the integer 5. int(text) converts valid whole-number text; float(text) converts valid decimal text. Use a decimal point in Python input, such as 2.5. Multiplying a string by an integer repeats the text instead of doing numeric multiplication.',
        'Als je 5 typt, krijg je de string "5", niet de integer 5. int(text) zet geldige tekst met een geheel getal om; float(text) zet geldige decimale tekst om. Gebruik bij Python-invoer een punt, zoals 2.5. Een string met een integer vermenigvuldigen herhaalt de tekst in plaats van numeriek te rekenen.',
      ),
      'text = "4"\nprint(text * 3)\nprint(int(text) * 3)',
      "444\n12",
    ),
    section(
      L("Values and presentation", "Waarden en presentatie"),
      L(
        "An f-string inserts expressions inside braces. A format such as :.2f displays two digits after the decimal point. Formatting changes the displayed text, not the stored number. Keep a numeric total for further calculations.",
        "Een f-string voegt uitdrukkingen tussen accolades in. Een formaat zoals :.2f toont twee cijfers achter de punt. Formatteren verandert de weergegeven tekst, niet het opgeslagen getal. Bewaar een numeriek totaal voor verdere berekeningen.",
      ),
      'length = 3.5\nprint(f"Length: {length:.2f} m")',
      "Length: 3.50 m",
    ),
  ],
  starter:
    'ticket_price = 4.5\nquantity = input("How many tickets? ")\n\ntotal = quantity * 2\nprint("Ticket total:", total)\n',
  solution:
    'ticket_price = 4.5\nquantity = int(input("How many tickets? "))\n\ntotal = quantity * ticket_price\nprint(f"Ticket total: {total:.2f}")\n',
  inputs: ["3"],
  tasks: [
    task(
      "",
      L(
        "Store the typed quantity as an integer in quantity.",
        "Bewaar het getypte aantal als integer in quantity.",
      ),
      "type(quantity) is int",
      [
        L(
          "The terminal supplies text even when the response looks numeric.",
          "De terminal levert tekst, ook wanneer het antwoord er numeriek uitziet.",
        ),
        L(
          "Convert the response before using it in numeric arithmetic.",
          "Zet het antwoord om voordat je het in een numerieke berekening gebruikt.",
        ),
        L(
          'int("8") produces the integer 8.',
          'int("8") produceert de integer 8.',
        ),
      ],
      L(
        "quantity should be an integer obtained from the response.",
        "quantity moet een integer zijn die uit het antwoord is verkregen.",
      ),
      [
        {
          stdin: ["7"],
          check: "_error is None and type(quantity) is int and quantity == 7",
        },
        { stdin: ["0"], check: "_error is None and quantity == 0" },
      ],
    ),
    task(
      "",
      L(
        "Calculate the numeric total using the requested quantity and ticket_price.",
        "Bereken het numerieke total met het gevraagde aantal en ticket_price.",
      ),
      "isinstance(total, (int, float)) and total == quantity * ticket_price",
      [
        L(
          "The starter uses a number that does not represent the ticket price.",
          "De startcode gebruikt een getal dat niet de ticketprijs voorstelt.",
        ),
        L(
          "Keep the unit price as an input to the calculation.",
          "Behoud de stuksprijs als invoer voor de berekening.",
        ),
        L(
          'A quantity of 2 at 4.5 per item costs 9, not the text "22".',
          'Een aantal van 2 bij 4.5 per stuk kost 9, niet de tekst "22".',
        ),
      ],
      L(
        "The total must change when either the quantity or the price changes.",
        "Het totaal moet veranderen wanneer het aantal of de prijs verandert.",
      ),
      [
        {
          inputs: { ticket_price: 2.25 },
          stdin: ["4"],
          check: "_error is None and total == 9",
        },
      ],
    ),
    task(
      "",
      L(
        "Display the total with exactly two decimal places. Leave total itself as a number.",
        "Toon het totaal met precies twee decimalen. Laat total zelf een getal blijven.",
      ),
      'f"{total:.2f}" in _stdout and isinstance(total, (int, float))',
      [
        L(
          "A numeric value and its printed representation have different jobs.",
          "Een numerieke waarde en de afgedrukte weergave hebben verschillende taken.",
        ),
        L(
          "Format at the point where the value is displayed.",
          "Formatteer op het moment dat de waarde wordt weergegeven.",
        ),
        L(
          "The length example uses {length:.2f} inside an f-string.",
          "Het length-voorbeeld gebruikt {length:.2f} in een f-string.",
        ),
      ],
      L(
        "Show both decimal places, including trailing zeroes.",
        "Toon beide decimalen, ook nullen aan het einde.",
      ),
      [
        { stdin: ["2"], check: '_error is None and "9.00" in _stdout' },
        { stdin: ["0"], check: '_error is None and "0.00" in _stdout' },
      ],
    ),
  ],
  solutionNote: L(
    "Conversion makes arithmetic possible; formatting makes its result readable. Other formatting approaches are fine if they preserve the numeric total and display two decimals.",
    "Conversie maakt rekenen mogelijk; formattering maakt het resultaat leesbaar. Andere manieren van formatteren zijn ook goed als ze het numerieke totaal behouden en twee decimalen tonen.",
  ),
});

const departure = lesson({
  module: 2,
  number: 3,
  title: L("Will you reach the departure?", "Haal je het vertrek?"),
  guidance: "adapt",
  explanation: L(
    "The departure assistant knows how long the walk takes. Ask how many minutes remain before departure and produce an honest report, including when the person is already too late. Reaching the stop exactly at departure counts as making it in this simplified model.",
    "De vertrekassistent weet hoe lang de wandeling duurt. Vraag hoeveel minuten er tot vertrek over zijn en maak een eerlijk overzicht, ook wanneer iemand al te laat is. Precies op het vertrekmoment bij de halte aankomen telt in dit vereenvoudigde model als op tijd.",
  ),
  sections: [
    section(
      L(
        "A comparison produces a Boolean",
        "Een vergelijking produceert een Boolean",
      ),
      L(
        "A comparison evaluates to True or False. Use < and > for strict comparisons, <= and >= when equality is allowed, and == to compare equality. A single = assigns a value; it does not ask whether two values are equal.",
        "Een vergelijking levert True of False op. Gebruik < en > voor strikte vergelijkingen, <= en >= wanneer gelijkheid is toegestaan en == om gelijkheid te vergelijken. Een enkele = kent een waarde toe; die vraagt niet of twee waarden gelijk zijn.",
      ),
      "capacity = 8\nguests = 8\nfits = guests <= capacity\nprint(fits)\nprint(guests < capacity)",
      "True\nFalse",
    ),
    section(
      L("Try the boundary", "Probeer het grensgeval"),
      L(
        "If a rule includes “at most”, “at least”, or “exactly”, equality deserves its own test. Check one value below the boundary, the boundary itself, and one value above it. A Boolean can be stored in a variable and printed like another value.",
        "Als een regel woorden als “hoogstens”, “minstens” of “precies” bevat, verdient gelijkheid een eigen test. Controleer een waarde onder de grens, de grens zelf en een waarde erboven. Je kunt een Boolean net als een andere waarde in een variabele opslaan en afdrukken.",
      ),
    ),
  ],
  starter:
    'walk_minutes = 8\nminutes_left = int(input("Minutes until departure: "))\n\nbuffer = 0\ncan_make_it = False\nprint("Time after walking:", buffer)\nprint("Can make it:", can_make_it)\n',
  solution:
    'walk_minutes = 8\nminutes_left = int(input("Minutes until departure: "))\n\nbuffer = minutes_left - walk_minutes\ncan_make_it = walk_minutes <= minutes_left\nprint("Time after walking:", buffer)\nprint("Can make it:", can_make_it)\n',
  inputs: ["12"],
  tasks: [
    task(
      "",
      L(
        "Calculate buffer: the minutes remaining after the walk. Keep a negative result when the walk takes too long.",
        "Bereken buffer: de minuten die na de wandeling overblijven. Behoud een negatieve uitkomst wanneer de wandeling te lang duurt.",
      ),
      "buffer == minutes_left - walk_minutes",
      [
        L(
          "The available time is spent on walking.",
          "De beschikbare tijd wordt aan de wandeling besteed.",
        ),
        L(
          "Do not replace an inconvenient negative result with zero; it carries useful information.",
          "Vervang een onhandige negatieve uitkomst niet door nul; die bevat nuttige informatie.",
        ),
        L(
          "If an activity needs 10 minutes but only 6 remain, the time margin is -4.",
          "Als een activiteit 10 minuten nodig heeft maar er nog maar 6 over zijn, is de tijdsmarge -4.",
        ),
      ],
      L(
        "The margin should describe how early or late the arrival would be.",
        "De marge moet aangeven hoe vroeg of laat de aankomst zou zijn.",
      ),
      [
        { stdin: ["5"], check: "_error is None and buffer == -3" },
        { stdin: ["13"], check: "_error is None and buffer == 5" },
      ],
    ),
    task(
      "",
      L(
        "Make can_make_it a Boolean that includes an arrival exactly at departure.",
        "Maak can_make_it een Boolean die ook aankomst precies op het vertrekmoment toestaat.",
      ),
      "type(can_make_it) is bool and can_make_it == (minutes_left >= walk_minutes)",
      [
        L(
          "Think about the equality case before choosing the comparison.",
          "Denk aan het gelijkheidsgeval voordat je de vergelijking kiest.",
        ),
        L(
          "The walk must fit within the remaining time.",
          "De wandeling moet binnen de resterende tijd passen.",
        ),
        L(
          "The capacity example distinguishes <= from <.",
          "Het capacity-voorbeeld maakt het verschil tussen <= en < duidelijk.",
        ),
      ],
      L(
        "Check too early, exactly enough time, and too late.",
        "Controleer ruim op tijd, precies genoeg tijd en te laat.",
      ),
      [7, 8, 9].map((n) => ({
        stdin: [String(n)],
        check: `_error is None and can_make_it is ${n >= 8 ? "True" : "False"}`,
      })),
    ),
    task(
      "",
      L(
        "Keep both results in the report. Change walk_minutes once and test the new boundary yourself.",
        "Behoud beide resultaten in het overzicht. Verander walk_minutes eenmaal en test zelf de nieuwe grens.",
      ),
      "str(buffer) in _stdout and str(can_make_it) in _stdout",
      [
        L(
          "The numeric margin explains the Boolean result.",
          "De numerieke marge verklaart de Boolean-uitkomst.",
        ),
        L(
          "Print the values the program calculated rather than fixed example results.",
          "Druk de door het programma berekende waarden af in plaats van vaste voorbeelduitkomsten.",
        ),
        L(
          'print("Fits:", fits) displays a stored Boolean.',
          'print("Fits:", fits) toont een opgeslagen Boolean.',
        ),
      ],
      L(
        "The displayed margin and Boolean should follow the current inputs.",
        "De getoonde marge en Boolean moeten de huidige invoer volgen.",
      ),
      [
        {
          inputs: { walk_minutes: 11 },
          stdin: ["9"],
          check: '_error is None and "-2" in _stdout and "False" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Comparing the two times directly or checking whether buffer is nonnegative are both valid. The important boundary is equality.",
    "De twee tijden direct vergelijken of controleren of buffer niet negatief is, zijn allebei geldig. Het belangrijke grensgeval is gelijkheid.",
  ),
});

const equipment = lesson({
  module: 2,
  number: 4,
  title: L(
    "Choose what the equipment desk does",
    "Kies wat de uitleenbalie doet",
  ),
  guidance: "adapt",
  minutes: 14,
  explanation: L(
    "An equipment desk should lend items only when enough are available. The starter always lends them and can report negative stock. Repair the decision so a request either succeeds as a whole or leaves the stock unchanged.",
    "Een uitleenbalie mag artikelen alleen uitlenen als er genoeg beschikbaar zijn. De startcode leent ze altijd uit en kan een negatieve voorraad tonen. Herstel de beslissing zodat een aanvraag volledig slaagt of de voorraad ongewijzigd laat.",
  ),
  sections: [
    section(
      L("Choose one path", "Kies één pad"),
      L(
        "An if statement runs its indented block when the condition is true. An else block runs otherwise. The colon begins a block; consistent indentation shows which statements belong to it. Unindented statements afterward run whichever path was chosen.",
        "Een if-statement voert het ingesprongen blok uit wanneer de conditie waar is. Een else-blok wordt anders uitgevoerd. De dubbele punt begint een blok; consistente inspringing toont welke statements erbij horen. Statements zonder die inspringing erna worden uitgevoerd ongeacht het gekozen pad.",
      ),
      'temperature = 18\nif temperature < 16:\n    advice = "Take a coat"\nelse:\n    advice = "A light jacket is enough"\nprint(advice)',
      "A light jacket is enough",
    ),
    section(
      L(
        "Keep related updates together",
        "Houd samenhangende updates bij elkaar",
      ),
      L(
        "A branch can contain several statements. If an action is conditional, keep its state changes in the same branch. Merely changing a printed message does not stop an incorrect calculation elsewhere.",
        "Een vertakking kan meerdere statements bevatten. Als een actie voorwaardelijk is, horen de bijbehorende wijzigingen in dezelfde vertakking. Alleen een afgedrukt bericht veranderen stopt een onjuiste berekening ergens anders niet.",
      ),
    ),
  ],
  starter:
    'available = 6\nrequested = int(input("How many kits? "))\n\ncan_lend = True\ndecision = "ready"\nremaining = available - requested\nprint(decision)\nprint("Remaining:", remaining)\n',
  solution:
    'available = 6\nrequested = int(input("How many kits? "))\n\ncan_lend = requested <= available\nif can_lend:\n    decision = "ready"\n    remaining = available - requested\nelse:\n    decision = "wait"\n    remaining = available\nprint(decision)\nprint("Remaining:", remaining)\n',
  inputs: ["4"],
  tasks: [
    task(
      "",
      L(
        "Calculate can_lend from requested and available. A request for the entire available stock is allowed.",
        "Bereken can_lend uit requested en available. Een aanvraag voor de hele beschikbare voorraad is toegestaan.",
      ),
      "type(can_lend) is bool and can_lend == (requested <= available)",
      [
        L(
          "The request must not exceed the available stock.",
          "De aanvraag mag de beschikbare voorraad niet overschrijden.",
        ),
        L(
          "Test a request equal to the stock as well as a larger request.",
          "Test zowel een aanvraag gelijk aan de voorraad als een grotere aanvraag.",
        ),
        L(
          "The departure exercise used an inclusive comparison at its boundary.",
          "De vertrekoefening gebruikte op de grens een vergelijking die gelijkheid toestaat.",
        ),
      ],
      L(
        "The Boolean should reflect whether the complete request can be fulfilled.",
        "De Boolean moet aangeven of de volledige aanvraag kan worden afgehandeld.",
      ),
      [
        { stdin: ["6"], check: "can_lend is True" },
        { stdin: ["7"], check: "can_lend is False" },
      ],
    ),
    task(
      "",
      L(
        'Use an if/else decision to set decision to "ready" for a request that can be fulfilled, or "wait" otherwise.',
        'Gebruik een if/else-beslissing om decision op "ready" te zetten voor een aanvraag die kan worden afgehandeld, of anders op "wait".',
      ),
      'decision == ("ready" if can_lend else "wait") and any(isinstance(n, _ast.If) for n in _ast.walk(_ast.parse(_source)))',
      [
        L(
          "The two messages describe mutually exclusive outcomes.",
          "De twee berichten beschrijven uitkomsten die elkaar uitsluiten.",
        ),
        L(
          "Use the Boolean to select which value is assigned.",
          "Gebruik de Boolean om te kiezen welke waarde wordt toegekend.",
        ),
        L(
          "In the coat example, only one assignment to advice runs.",
          "In het jasvoorbeeld wordt maar één toekenning aan advice uitgevoerd.",
        ),
      ],
      L(
        "One branch should choose ready; the other should choose wait.",
        "De ene vertakking moet ready kiezen; de andere wait.",
      ),
      [
        { stdin: ["8"], check: '_error is None and decision == "wait"' },
        { stdin: ["1"], check: '_error is None and decision == "ready"' },
      ],
    ),
    task(
      "",
      L(
        "Update remaining only for a successful request; otherwise keep the original stock. Print the decision and remaining stock.",
        "Werk remaining alleen bij voor een geslaagde aanvraag; behoud anders de oorspronkelijke voorraad. Druk de beslissing en resterende voorraad af.",
      ),
      "remaining == (available - requested if can_lend else available) and decision in _stdout and str(remaining) in _stdout",
      [
        L(
          "A rejected request should not remove items.",
          "Een afgewezen aanvraag mag geen artikelen weghalen.",
        ),
        L(
          "Review which assignments belong inside each branch.",
          "Bekijk welke toekenningen binnen elke vertakking horen.",
        ),
        L(
          "A branch can choose a message and calculate a new stock value together.",
          "Een vertakking kan tegelijk een bericht kiezen en een nieuwe voorraadwaarde berekenen.",
        ),
      ],
      L(
        "The stock should change only when the request succeeds.",
        "De voorraad moet alleen veranderen wanneer de aanvraag slaagt.",
      ),
      [
        {
          stdin: ["8"],
          check: '_error is None and remaining == 6 and "wait" in _stdout',
        },
        {
          inputs: { available: 3 },
          stdin: ["3"],
          check: '_error is None and remaining == 0 and "ready" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "The message and the stock update need to agree. This exercise explicitly practises an if statement; later independent tasks can choose any equivalent approach.",
    "Het bericht en de voorraadwijziging moeten met elkaar overeenkomen. Deze opdracht oefent expliciet een if-statement; latere zelfstandige opdrachten mogen elke gelijkwaardige aanpak kiezen.",
  ),
});

const booking = lesson({
  module: 2,
  number: 5,
  title: L("Build a small booking desk", "Bouw een kleine boekingsbalie"),
  guidance: "independent",
  minutes: 18,
  explanation: L(
    "A visitor wants to book workshop tickets within a budget. Build the interaction yourself using the supplied ticket price. Ask for a whole-number ticket quantity first and a decimal budget second. Work with valid nonnegative inputs for now. A booking is affordable when its cost is no greater than the budget, including an exact fit.",
    "Een bezoeker wil binnen een budget workshopkaartjes boeken. Bouw de interactie zelf met de gegeven ticketprijs. Vraag eerst een geheel aantal kaartjes en daarna een budget dat decimalen mag bevatten. Werk voorlopig met geldige niet-negatieve invoer. Een boeking is betaalbaar als de kosten niet hoger zijn dan het budget, ook wanneer die precies gelijk zijn.",
  ),
  sections: [
    section(
      L("What the desk should report", "Wat de balie moet melden"),
      L(
        'Keep quantity, budget, total, can_book, and remaining as values that describe the booking. The report should show a two-decimal price and either "booked" or "save more". For an affordable booking, remaining is the budget left after paying. Otherwise, no money is spent and remaining stays equal to the original budget. Choose your own prompts and layout.',
        'Bewaar quantity, budget, total, can_book en remaining als waarden die de boeking beschrijven. Het overzicht moet een prijs met twee decimalen en "booked" of "save more" tonen. Bij een betaalbare boeking is remaining het budget na betaling. Anders wordt geen geld uitgegeven en blijft remaining gelijk aan het oorspronkelijke budget. Kies je eigen invoervragen en indeling.',
      ),
    ),
  ],
  starter:
    "ticket_price = 4.5\n\n# Build the booking interaction and report.\n",
  solution:
    'ticket_price = 4.5\n\nquantity = int(input("Tickets: "))\nbudget = float(input("Budget: "))\ntotal = quantity * ticket_price\ncan_book = total <= budget\nif can_book:\n    remaining = budget - total\n    message = "booked"\nelse:\n    remaining = budget\n    message = "save more"\nprint(f"Price: {total:.2f}")\nprint(message)\nprint(f"Remaining: {remaining:.2f}")\n',
  inputs: ["3", "20"],
  tasks: [
    task(
      "",
      L(
        "Read quantity and budget in the stated order, with suitable numeric types, and calculate total.",
        "Lees quantity en budget in de genoemde volgorde met geschikte numerieke typen en bereken total.",
      ),
      "type(quantity) is int and isinstance(budget, (float, int)) and total == quantity * ticket_price",
      [
        L(
          "The two responses have different numeric meanings.",
          "De twee antwoorden hebben verschillende numerieke betekenissen.",
        ),
        L(
          "A ticket count is whole; a budget may include a fraction.",
          "Een aantal kaartjes is geheel; een budget kan een gebroken deel bevatten.",
        ),
        L(
          "Review int() and float() in the ticket-price lesson if the input still behaves like text.",
          "Bekijk int() en float() in de ticketprijsles als de invoer zich nog als tekst gedraagt.",
        ),
      ],
      L(
        "Use both typed responses as numbers and calculate from the current price.",
        "Gebruik beide getypte antwoorden als getallen en reken met de huidige prijs.",
      ),
      [
        {
          inputs: { ticket_price: 2.25 },
          stdin: ["4", "9.5"],
          check:
            "_error is None and quantity == 4 and budget == 9.5 and total == 9",
        },
      ],
    ),
    task(
      "",
      L(
        "Decide whether the booking fits the budget and store that Boolean in can_book.",
        "Bepaal of de boeking binnen het budget past en bewaar die Boolean in can_book.",
      ),
      "type(can_book) is bool and can_book == (total <= budget)",
      [
        L(
          "Compare what is needed with what is available.",
          "Vergelijk wat nodig is met wat beschikbaar is.",
        ),
        L(
          "Do not reject a booking that uses the budget exactly.",
          "Wijs een boeking die precies het budget gebruikt niet af.",
        ),
        L(
          "Test one budget just below the total and one equal to it.",
          "Test een budget net onder het totaal en een budget dat eraan gelijk is.",
        ),
      ],
      L(
        "Check both affordable and unaffordable bookings, including equality.",
        "Controleer betaalbare en onbetaalbare boekingen, inclusief gelijkheid.",
      ),
      [
        { stdin: ["2", "9"], check: "can_book is True" },
        { stdin: ["2", "8.99"], check: "can_book is False" },
      ],
    ),
    task(
      "",
      L(
        'Set remaining according to whether the booking succeeds. Report the price to two decimals and the correct outcome: "booked" or "save more".',
        'Bepaal remaining op basis van het slagen van de boeking. Toon de prijs met twee decimalen en de juiste uitkomst: "booked" of "save more".',
      ),
      'remaining == (budget - total if can_book else budget) and f"{total:.2f}" in _stdout and ("booked" if can_book else "save more") in _stdout.lower()',
      [
        L(
          "An unsuccessful booking should not spend any money.",
          "Een mislukte boeking mag geen geld uitgeven.",
        ),
        L(
          "Treat each outcome as a consistent message and budget update.",
          "Behandel elke uitkomst als een samenhangend bericht en een budgetwijziging.",
        ),
        L(
          "The equipment-desk exercise keeps its stock unchanged when it rejects a request.",
          "De uitleenbalie-oefening houdt de voorraad ongewijzigd wanneer een aanvraag wordt afgewezen.",
        ),
      ],
      L(
        "The displayed outcome and the remaining budget should agree.",
        "De getoonde uitkomst en het resterende budget moeten overeenkomen.",
      ),
      [
        {
          stdin: ["2", "10"],
          check:
            '_error is None and remaining == 1 and "9.00" in _stdout and "booked" in _stdout.lower()',
        },
        {
          stdin: ["3", "10"],
          check:
            '_error is None and remaining == 10 and "13.50" in _stdout and "save more" in _stdout.lower()',
        },
        {
          stdin: ["0", "0"],
          check:
            "_error is None and total == 0 and remaining == 0 and can_book is True",
        },
      ],
    ),
  ],
  solutionNote: L(
    "Your prompts, branch structure, and report layout may differ. The checks care about the responses, budget rule, and resulting behavior rather than matching this implementation.",
    "Je invoervragen, vertakkingsstructuur en overzicht mogen verschillen. De controles kijken naar antwoorden, de budgetregel en het resulterende gedrag, niet naar overeenkomst met deze implementatie.",
  ),
});

const review = quiz(
  2,
  L(
    "Check your reasoning: input and decisions",
    "Controleer je inzicht: invoer en beslissingen",
  ),
  [
    question(
      "v2-m2-q1",
      L(
        "A person types 6. What is stored in response?",
        "Iemand typt 6. Wat wordt in response opgeslagen?",
      ),
      'response = input("Quantity: ")',
      [
        [
          L('The string "6"', 'De string "6"'),
          L(
            "input returns text; conversion is a separate step.",
            "input geeft tekst terug; conversie is een aparte stap.",
          ),
        ],
        [
          L("The integer 6", "De integer 6"),
          L(
            "You need a numeric conversion to obtain an integer.",
            "Je hebt een numerieke conversie nodig om een integer te krijgen.",
          ),
        ],
        [
          L("The Boolean True", "De Boolean True"),
          L(
            "Typing a nonempty response does not convert it to a Boolean.",
            "Een niet-leeg antwoord typen zet dat niet om in een Boolean.",
          ),
        ],
      ],
    ),
    question(
      "v2-m2-q2",
      L(
        "Which statement best describes the result?",
        "Welke beschrijving past het beste bij het resultaat?",
      ),
      'price = 2.5\nlabel = f"{price:.2f}"',
      [
        [
          L(
            'label is "2.50"; price remains a number',
            'label is "2.50"; price blijft een getal',
          ),
          L(
            "Formatting produces text without changing the source value.",
            "Formatteren produceert tekst zonder de bronwaarde te veranderen.",
          ),
        ],
        [
          L('price becomes "2.50"', 'price wordt "2.50"'),
          L(
            "The assignment stores the formatted text in label, not price.",
            "De toekenning bewaart de geformatteerde tekst in label, niet in price.",
          ),
        ],
        [
          L("label becomes the number 2.50", "label wordt het getal 2.50"),
          L(
            "An f-string produces a string.",
            "Een f-string produceert een string.",
          ),
        ],
      ],
    ),
    question(
      "v2-m2-q3",
      L(
        "A request equal to the stock must succeed. Which comparison expresses that?",
        "Een aanvraag gelijk aan de voorraad moet slagen. Welke vergelijking drukt dat uit?",
      ),
      "",
      [
        [
          L("requested <= available", "requested <= available"),
          L(
            "This allows smaller requests and equality.",
            "Dit staat kleinere aanvragen en gelijkheid toe.",
          ),
        ],
        [
          L("requested < available", "requested < available"),
          L(
            "Strictly smaller excludes an exact fit.",
            "Strikt kleiner sluit een precies passende aanvraag uit.",
          ),
        ],
        [
          L("requested = available", "requested = available"),
          L(
            "A single equals sign assigns a value instead of comparing.",
            "Een enkele gelijkteken kent een waarde toe in plaats van te vergelijken.",
          ),
        ],
      ],
    ),
    question(
      "v2-m2-q4",
      L(
        "Why can this report show the right message but the wrong stock?",
        "Waarom kan dit overzicht het juiste bericht maar de verkeerde voorraad tonen?",
      ),
      'remaining = available - requested\nif requested <= available:\n    print("ready")\nelse:\n    print("wait")',
      [
        [
          L(
            "The subtraction happens even when the request is rejected",
            "De aftrekking gebeurt ook wanneer de aanvraag wordt afgewezen",
          ),
          L(
            "Only the message is conditional; the stock change is outside the branches.",
            "Alleen het bericht is voorwaardelijk; de voorraadwijziging staat buiten de vertakkingen.",
          ),
        ],
        [
          L("else runs before if", "else wordt vóór if uitgevoerd"),
          L(
            "Python tests the condition first and chooses a branch.",
            "Python test eerst de conditie en kiest dan een vertakking.",
          ),
        ],
        [
          L(
            "Printing wait restores the stock automatically",
            "wait afdrukken herstelt de voorraad automatisch",
          ),
          L(
            "Printing text does not reverse a previous calculation.",
            "Tekst afdrukken draait een eerdere berekening niet terug.",
          ),
        ],
      ],
    ),
    question(
      "v2-m2-q5",
      L(
        "A booking costs 9. Which pair of tests is most useful for its affordability boundary?",
        "Een boeking kost 9. Welk paar tests is het nuttigst voor de betaalbaarheidsgrens?",
      ),
      "",
      [
        [
          L("Budgets 8.99 and 9", "Budgetten 8.99 en 9"),
          L(
            "One is just below the price and the other is an exact fit.",
            "Het ene ligt net onder de prijs en het andere past precies.",
          ),
        ],
        [
          L("Budgets 20 and 30", "Budgetten 20 en 30"),
          L(
            "Both are comfortably affordable, so they do not test the boundary.",
            "Beide zijn ruim voldoende en testen de grens dus niet.",
          ),
        ],
        [
          L("Budget 9 twice", "Tweemaal budget 9"),
          L(
            "Equality matters, but repeating it does not test the rejecting side.",
            "Gelijkheid is belangrijk, maar herhaling test de afwijzende kant niet.",
          ),
        ],
      ],
    ),
  ],
);
review.questions[2].codeBlank = {
  prompt: L(
    "Choose the comparison that permits a request equal to the available stock.",
    "Kies de vergelijking die een aanvraag gelijk aan de beschikbare voorraad toestaat.",
  ),
  segments: [
    "requested = 6\navailable = 6\ncan_lend = requested ",
    " available\nprint(can_lend)\n",
  ],
  tokens: [
    { id: "inclusive", code: "<=" },
    { id: "strict", code: "<" },
    { id: "opposite", code: ">" },
    { id: "assign", code: "=" },
  ],
  blanks: [
    {
      answer: "<=",
      reason: L("At most includes equality.", "Hoogstens omvat gelijkheid."),
    },
  ],
  output: "True\n",
};
export const activities = [
  visitor,
  tickets,
  departure,
  equipment,
  booking,
  review,
];
