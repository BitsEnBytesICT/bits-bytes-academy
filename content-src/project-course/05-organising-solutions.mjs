import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const notices = lesson({
  module: 5,
  number: 1,
  title: L("Give repeated work a name", "Geef herhaald werk een naam"),
  guidance: "guided",
  minutes: 14,
  explanation: L(
    "Two rooms display the same style of notice. Copying the formatting into every place makes a later change easy to miss. Create a function that owns the format and accepts the part that varies. Defining the function alone should not display a notice: calling it should.",
    "Twee ruimtes tonen dezelfde stijl van bericht. De opmaak naar elke plek kopiëren maakt het gemakkelijk om later een wijziging te missen. Maak een functie die de opmaak beheert en het veranderlijke deel accepteert. Alleen de functie definiëren mag geen bericht tonen: de aanroep moet dat doen.",
  ),
  sections: [
    section(
      L(
        "Define once, call when needed",
        "Definieer één keer, roep aan wanneer nodig",
      ),
      L(
        "def creates a function. Its indented body runs when the function is called, not when it is defined. Parameters name the values it receives. Arguments are the actual values supplied by a call. Put the definition before a call that needs it.",
        "def maakt een functie. Het ingesprongen blok wordt uitgevoerd bij de aanroep, niet bij de definitie. Parameters geven de ontvangen waarden een naam. Argumenten zijn de werkelijke waarden die een aanroep meegeeft. Plaats de definitie vóór een aanroep die deze nodig heeft.",
      ),
      'def announce(event):\n    print("Next event:", event)\n\nannounce("Drawing")\nannounce("Robotics")',
      "Next event: Drawing\nNext event: Robotics",
    ),
    section(
      L("One small responsibility", "Eén kleine verantwoordelijkheid"),
      L(
        'notice(message) should print three lines: a line containing ---, the message, and another ---. Keep the message as a parameter instead of reading a global variable. Use the function for "Quiet room" and "Workshop starts at 10".',
        'notice(message) moet drie regels afdrukken: een regel met ---, het bericht en nog een ---. Houd het bericht als parameter in plaats van een globale variabele te lezen. Gebruik de functie voor "Quiet room" en "Workshop starts at 10".',
      ),
    ),
  ],
  starter:
    'print("---")\nprint("Quiet room")\nprint("---")\n\nprint("---")\nprint("Workshop starts at 10")\nprint("---")\n',
  solution:
    'def notice(message):\n    print("---")\n    print(message)\n    print("---")\n\nnotice("Quiet room")\nnotice("Workshop starts at 10")\n',
  tasks: [
    task(
      "",
      L(
        "Define notice(message) to print the three-line notice for any supplied message.",
        "Definieer notice(message) om het bericht van drie regels voor elk meegegeven bericht af te drukken.",
      ),
      "callable(notice)",
      [
        L(
          "The format is stable; the message varies.",
          "De opmaak blijft gelijk; het bericht verandert.",
        ),
        L(
          "Put the repeated statements inside one function with a message parameter.",
          "Plaats de herhaalde statements in één functie met een berichtparameter.",
        ),
        L(
          "announce(event) uses the value supplied by its caller.",
          "announce(event) gebruikt de waarde die de aanroeper meegeeft.",
        ),
      ],
      L(
        "The function must use its argument, not a fixed example message.",
        "De functie moet het argument gebruiken, niet een vast voorbeeldbericht.",
      ),
      [
        {
          call: { name: "notice", args: ["Library closes at 6"] },
          check:
            '_error is None and _stdout.splitlines()[-3:] == ["---", "Library closes at 6", "---"]',
        },
        {
          call: { name: "notice", args: ["Welkom, Zoë"] },
          check:
            '_error is None and _stdout.splitlines()[-3:] == ["---", "Welkom, Zoë", "---"]',
        },
      ],
    ),
    task(
      "",
      L(
        "Replace the two copied notices with function calls while preserving their order and exact displayed content.",
        "Vervang de twee gekopieerde berichten door functieaanroepen en behoud hun volgorde en exacte getoonde inhoud.",
      ),
      'callable(notice) and _stdout.splitlines() == ["---", "Quiet room", "---", "---", "Workshop starts at 10", "---"]',
      [
        L(
          "A definition does nothing visible until called.",
          "Een definitie doet niets zichtbaars totdat deze wordt aangeroepen.",
        ),
        L(
          "Each call supplies one of the two original messages.",
          "Elke aanroep geeft een van de twee oorspronkelijke berichten mee.",
        ),
        L(
          "The announce example calls the same function twice with different arguments.",
          "Het announce-voorbeeld roept dezelfde functie twee keer met verschillende argumenten aan.",
        ),
      ],
      L(
        "Keep the two original notices and actually call the reusable function.",
        "Behoud de twee oorspronkelijke berichten en roep de herbruikbare functie echt aan.",
      ),
      [
        {
          check:
            'sum(isinstance(n, __import__("ast").Call) and isinstance(n.func, __import__("ast").Name) and n.func.id == "notice" for n in __import__("ast").walk(__import__("ast").parse(open("main.py").read()))) >= 2',
        },
      ],
    ),
    task(
      "",
      L(
        'Make an empty message produce an empty middle line without losing either border. Try notice("") in the console after Run.',
        'Laat een leeg bericht een lege middelste regel produceren zonder een rand te verliezen. Probeer notice("") na Run in de console.',
      ),
      "callable(notice)",
      [
        L(
          "An empty string is still a valid message value.",
          "Een lege string is nog steeds een geldige berichtwaarde.",
        ),
        L(
          "Do not make the borders conditional on the message being nonempty.",
          "Maak de randen niet afhankelijk van het bericht dat niet leeg is.",
        ),
        L(
          'print("") prints a blank line.',
          'print("") drukt een lege regel af.',
        ),
      ],
      L(
        "The format should stay consistent for empty text too.",
        "De opmaak moet ook bij lege tekst consistent blijven.",
      ),
      [
        {
          call: { name: "notice", args: [""] },
          check:
            '_error is None and _stdout.splitlines()[-3:] == ["---", "", "---"]',
        },
      ],
    ),
  ],
  solutionNote: L(
    "This function deliberately prints: its job is presentation. The next lesson separates calculating a value from displaying it.",
    "Deze functie drukt bewust af: de taak is presentatie. De volgende les scheidt het berekenen van een waarde van het tonen ervan.",
  ),
});

const delivery = lesson({
  module: 5,
  number: 2,
  title: L(
    "Return a result instead of losing it",
    "Geef een resultaat terug in plaats van het te verliezen",
  ),
  guidance: "adapt",
  minutes: 16,
  explanation: L(
    "A delivery quote function prints a number but gives its caller nothing useful to calculate with. It also accidentally uses a global shipping charge instead of its parameter. Repair the function so several callers can use it independently.",
    "Een bezorgprijsfunctie drukt een getal af, maar geeft de aanroeper niets bruikbaars om mee te rekenen. De functie gebruikt bovendien per ongeluk een globale bezorgprijs in plaats van de parameter. Herstel de functie zodat verschillende aanroepers deze onafhankelijk kunnen gebruiken.",
  ),
  sections: [
    section(
      L(
        "A returned value belongs to the caller",
        "Een teruggegeven waarde hoort bij de aanroeper",
      ),
      L(
        "return sends a value back to the call and ends the function. The caller can assign, print, or combine that value. print only displays text. A function without an explicit return returns None.",
        "return stuurt een waarde terug naar de aanroep en beëindigt de functie. De aanroeper kan die waarde toekennen, afdrukken of combineren. print toont alleen tekst. Een functie zonder expliciete return geeft None terug.",
      ),
      "def rectangle_area(width, height):\n    return width * height\n\narea = rectangle_area(3, 4)\nprint(area + 2)",
      "14",
    ),
    section(
      L("Use the information passed in", "Gebruik de meegegeven informatie"),
      L(
        "Parameters and variables assigned inside a function are local to that call. A function can see some outside names too, but relying on an unrelated global value makes it difficult to reuse. delivery_total(subtotal, shipping) should use only its arguments and return their sum without printing.",
        "Parameters en variabelen die binnen een functie worden toegekend zijn lokaal voor die aanroep. Een functie kan ook sommige namen erbuiten zien, maar vertrouwen op een ongerelateerde globale waarde maakt hergebruik lastig. delivery_total(subtotal, shipping) moet alleen de argumenten gebruiken en hun som teruggeven zonder af te drukken.",
      ),
    ),
  ],
  starter:
    'shipping_charge = 4\n\ndef delivery_total(subtotal, shipping):\n    total = subtotal + shipping_charge\n    print(total)\n\nfirst = delivery_total(12, 3)\nsecond = delivery_total(5.5, 0)\nprint("Quotes:", first, second)\n',
  solution:
    'shipping_charge = 4\n\ndef delivery_total(subtotal, shipping):\n    total = subtotal + shipping\n    return total\n\nfirst = delivery_total(12, 3)\nsecond = delivery_total(5.5, 0)\nprint("Quotes:", first, second)\n',
  tasks: [
    task(
      "",
      L(
        "Make delivery_total return the numeric sum of its two arguments.",
        "Laat delivery_total de numerieke som van beide argumenten teruggeven.",
      ),
      "callable(delivery_total) and isinstance(first, (int, float))",
      [
        L(
          "The caller currently receives None even though a number appears on screen.",
          "De aanroeper ontvangt momenteel None, ook al verschijnt er een getal op het scherm.",
        ),
        L(
          "Choose the statement that passes a value back to the call.",
          "Kies het statement dat een waarde terugstuurt naar de aanroep.",
        ),
        L(
          "rectangle_area returns a value that another expression can use.",
          "rectangle_area geeft een waarde terug die een andere uitdrukking kan gebruiken.",
        ),
      ],
      L(
        "Return a usable number, not just printed text.",
        "Geef een bruikbaar getal terug, niet alleen afgedrukte tekst.",
      ),
      [
        {
          call: { name: "delivery_total", args: [2.25, 1.5] },
          check: "_error is None and _close(_return, 3.75)",
        },
      ],
    ),
    task(
      "",
      L(
        "Use the shipping argument, so zero and custom shipping charges work independently of shipping_charge outside the function.",
        "Gebruik het shipping-argument, zodat nul en aangepaste bezorgprijzen onafhankelijk van shipping_charge buiten de functie werken.",
      ),
      "first == 15 and second == 5.5",
      [
        L(
          "Two similarly named values can come from different places.",
          "Twee gelijksoortig genoemde waarden kunnen van verschillende plekken komen.",
        ),
        L(
          "Inspect the names used inside the calculation.",
          "Bekijk de namen die binnen de berekening worden gebruikt.",
        ),
        L(
          "A parameter receives a fresh value for each call.",
          "Een parameter ontvangt bij elke aanroep een nieuwe waarde.",
        ),
      ],
      L(
        "Changing the unrelated global must not change the quote.",
        "De ongerelateerde globale waarde veranderen mag de prijs niet veranderen.",
      ),
      [
        {
          inputs: { shipping_charge: 999 },
          call: { name: "delivery_total", args: [8, 0] },
          check:
            "_error is None and _return == 8 and first == 15 and second == 5.5",
        },
        {
          call: { name: "delivery_total", args: [0, 2] },
          check: "_return == 2",
        },
      ],
    ),
    task(
      "",
      L(
        "Keep printing in the caller. The script should display only its Quotes line; calling delivery_total in another calculation should not print extra lines.",
        "Houd het afdrukken bij de aanroeper. Het script moet alleen de Quotes-regel tonen; delivery_total in een andere berekening aanroepen mag geen extra regels afdrukken.",
      ),
      'callable(delivery_total) and len(_stdout.splitlines()) == 1 and _stdout.split()[0] == "Quotes:" and float(_stdout.split()[1]) == 15 and float(_stdout.split()[2]) == 5.5',
      [
        L(
          "A reusable calculation should not decide how the user interface looks.",
          "Een herbruikbare berekening moet niet bepalen hoe de gebruikersinterface eruitziet.",
        ),
        L(
          "Remove printing from the calculation and retain the existing final report.",
          "Verwijder afdrukken uit de berekening en behoud het bestaande eindoverzicht.",
        ),
        L(
          "area = rectangle_area(3, 4) itself produces no output.",
          "area = rectangle_area(3, 4) produceert zelf geen uitvoer.",
        ),
      ],
      L(
        "The calculation should return silently; the caller decides what to show.",
        "De berekening moet stil terugkeren; de aanroeper bepaalt wat wordt getoond.",
      ),
      [
        {
          call: { name: "delivery_total", args: [100, 7] },
          check:
            '_error is None and _return == 107 and _call_stdout == "" and _call_input_chars == 0',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Returning the expression directly is as valid as using a local total variable. Local names do not need to match this reference implementation.",
    "De uitdrukking direct teruggeven is net zo geldig als een lokale total-variabele gebruiken. Lokale namen hoeven niet overeen te komen met deze voorbeeldimplementatie.",
  ),
});

const discount = lesson({
  module: 5,
  number: 3,
  title: L(
    "Make a useful default explicit",
    "Maak een nuttige standaardwaarde expliciet",
  ),
  guidance: "guided",
  minutes: 16,
  explanation: L(
    "A small shop usually applies no discount, but occasional offers use a percentage. Give the pricing function a sensible default and make calls readable with keyword arguments. Reject invalid values rather than quietly producing a negative price.",
    "Een kleine winkel geeft meestal geen korting, maar tijdelijke acties gebruiken een percentage. Geef de prijsfunctie een logische standaardwaarde en maak aanroepen leesbaar met benoemde argumenten. Wijs ongeldige waarden af in plaats van stilzwijgend een negatieve prijs te produceren.",
  ),
  sections: [
    section(
      L(
        "Defaults and named arguments",
        "Standaardwaarden en benoemde argumenten",
      ),
      L(
        "A default is used when an argument is omitted. Required parameters come before parameters with defaults. Keyword arguments name the parameter being supplied, and may be written in a different order. Parameter names therefore become part of the function’s interface.",
        "Een standaardwaarde wordt gebruikt wanneer een argument ontbreekt. Verplichte parameters komen vóór parameters met standaardwaarden. Benoemde argumenten noemen de parameter die wordt meegegeven en mogen in een andere volgorde staan. Parameternamen worden daardoor onderdeel van de interface van de functie.",
      ),
      'def repeated(text, count=2):\n    return text * count\n\nprint(repeated("ha"))\nprint(repeated(count=3, text="!"))',
      "haha\n!!!",
    ),
    section(
      L("State the accepted inputs", "Benoem de geaccepteerde invoer"),
      L(
        'discounted_price(price, percent=0) accepts a nonnegative price and a percentage from 0 through 100. A percentage is a part per hundred: 25% of 80 is 20, leaving 60. Use raise ValueError("message") to reject invalid arguments. Unlike printing an error and continuing, raising sends the failure to the caller, which can catch it.',
        'discounted_price(price, percent=0) accepteert een niet-negatieve prijs en een percentage van 0 tot en met 100. Een percentage is een deel per honderd: 25% van 80 is 20, waardoor 60 overblijft. Gebruik raise ValueError("bericht") om ongeldige argumenten af te wijzen. In tegenstelling tot een fout afdrukken en doorgaan stuurt raise de fout naar de aanroeper, die deze kan opvangen.',
      ),
      'def seats_needed(guests):\n    if guests < 0:\n        raise ValueError("Guests cannot be negative")\n    return guests',
    ),
  ],
  starter:
    "def discounted_price(price, percent):\n    return price - percent\n\nprint(discounted_price(80, 25))\n",
  solution:
    'def discounted_price(price, percent=0):\n    if price < 0 or percent < 0 or percent > 100:\n        raise ValueError("Price and percentage are outside the allowed range")\n    return price * (1 - percent / 100)\n\nprint(discounted_price(80, 25))\n',
  tasks: [
    task(
      "",
      L(
        "Apply a percentage reduction rather than subtracting the percentage as a currency amount.",
        "Pas een procentuele verlaging toe in plaats van het percentage als geldbedrag af te trekken.",
      ),
      "callable(discounted_price)",
      [
        L(
          "The discount amount depends on the original price.",
          "Het kortingsbedrag hangt af van de oorspronkelijke prijs.",
        ),
        L(
          "Convert a percentage to a fraction of the original amount.",
          "Zet een percentage om in een fractie van het oorspronkelijke bedrag.",
        ),
        L(
          "10% of 50 is 5; 10% of 200 is 20.",
          "10% van 50 is 5; 10% van 200 is 20.",
        ),
      ],
      L(
        "Calculate the reduction from the price and percentage together.",
        "Bereken de verlaging uit de prijs en het percentage samen.",
      ),
      [
        {
          call: { name: "discounted_price", args: [80, 25] },
          check: "_error is None and _close(_return, 60)",
        },
        {
          call: { name: "discounted_price", args: [19.5, 10] },
          check: "_error is None and _close(_return, 17.55)",
        },
      ],
    ),
    task(
      "",
      L(
        "Default percent to zero. Support calls that supply price and percent by name, including reversed keyword order.",
        "Geef percent standaard nul. Ondersteun aanroepen die price en percent bij naam meegeven, ook met omgekeerde volgorde van benoemde argumenten.",
      ),
      "callable(discounted_price)",
      [
        L(
          "A default belongs in the function definition, not in every caller.",
          "Een standaardwaarde hoort in de functiedefinitie, niet in elke aanroeper.",
        ),
        L(
          "Keep the parameter names in the published interface.",
          "Behoud de parameternamen uit de afgesproken interface.",
        ),
        L(
          'repeated(count=3, text="!") names the values rather than relying on position.',
          'repeated(count=3, text="!") benoemt de waarden in plaats van op positie te vertrouwen.',
        ),
      ],
      L(
        "Omitting the percentage should preserve the price.",
        "Het percentage weglaten moet de prijs behouden.",
      ),
      [
        {
          call: { name: "discounted_price", args: [12.5] },
          check: "_error is None and _return == 12.5",
        },
        {
          call: {
            name: "discounted_price",
            kwargs: { percent: 100, price: 8 },
          },
          check: "_error is None and _return == 0",
        },
        {
          call: { name: "discounted_price", kwargs: { percent: 0, price: 0 } },
          check: "_error is None and _return == 0",
        },
      ],
    ),
    task(
      "",
      L(
        "Raise ValueError for a negative price or a percentage outside 0–100. Do not reject the allowed endpoints.",
        "Veroorzaak ValueError bij een negatieve prijs of een percentage buiten 0–100. Wijs de toegestane eindwaarden niet af.",
      ),
      "callable(discounted_price)",
      [
        L(
          "The calculation should not hide a caller’s invalid request.",
          "De berekening moet een ongeldig verzoek van de aanroeper niet verbergen.",
        ),
        L(
          "Validate before returning a calculated value.",
          "Valideer voordat je een berekende waarde teruggeeft.",
        ),
        L(
          "The seats_needed example raises a named exception for a broken rule.",
          "Het seats_needed-voorbeeld veroorzaakt een benoemde uitzondering bij een geschonden regel.",
        ),
      ],
      L(
        "Reject invalid arguments with the documented exception type.",
        "Wijs ongeldige argumenten af met het afgesproken uitzonderingstype.",
      ),
      [
        [-1, 10],
        [10, -1],
        [10, 101],
      ].map((args) => ({
        call: { name: "discounted_price", args },
        check: '_error == "ValueError"',
      })),
    ),
  ],
  solutionNote: L(
    "Subtracting price * percent / 100 or multiplying by the remaining fraction both work. Small floating-point differences are tolerated. Exceptions let the interface decide whether to show a message or retry.",
    "price * percent / 100 aftrekken of vermenigvuldigen met de overblijvende fractie werkt allebei. Kleine verschillen door floats worden getolereerd. Uitzonderingen laten de interface bepalen of er een bericht of nieuwe poging komt.",
  ),
});

const reader = lesson({
  module: 5,
  number: 4,
  title: L(
    "Reuse a safe input conversation",
    "Hergebruik een veilige invoerinteractie",
  ),
  guidance: "adapt",
  minutes: 20,
  explanation: L(
    "Several tools need the same conversation: ask for a number, allow mistakes, and let the user cancel. Move this behavior into read_number(prompt). Its caller should receive a number or None, without needing to know how many attempts happened inside.",
    "Verschillende tools hebben dezelfde interactie nodig: vraag om een getal, sta fouten toe en laat de gebruiker annuleren. Verplaats dit gedrag naar read_number(prompt). De aanroeper moet een getal of None ontvangen, zonder te hoeven weten hoeveel pogingen er binnen de functie waren.",
  ),
  sections: [
    section(
      L(
        "Return ends the function, even inside a loop",
        "return beëindigt de functie, ook binnen een lus",
      ),
      L(
        "break leaves a loop; return leaves the whole function and gives its caller a value. Early returns can make successful and cancelled outcomes clear. A function may contain its own loop and try/except blocks.",
        "break verlaat een lus; return verlaat de volledige functie en geeft de aanroeper een waarde. Vroege returns kunnen geslaagde en geannuleerde uitkomsten duidelijk maken. Een functie mag een eigen lus en try/except-blokken bevatten.",
      ),
      'def category(value):\n    if value < 0:\n        return "negative"\n    return "nonnegative"',
    ),
    section(
      L(
        "End of input is not an empty response",
        "Einde van invoer is geen leeg antwoord",
      ),
      L(
        "A blank line is an ordinary response. End-of-input means no more input is available: input() raises EOFError. The terminal can send end-of-input with Ctrl+D. For this function, treat EOF and a cleaned cancel command as cancellation and return None. Retry blank or other invalid numeric text. Negative and zero numbers are valid here.",
        "Een lege regel is een gewoon antwoord. Einde van invoer betekent dat er geen invoer meer beschikbaar is: input() veroorzaakt EOFError. De terminal kan einde van invoer sturen met Ctrl+D. Behandel voor deze functie EOF en een opgeschoond cancel-commando als annulering en geef None terug. Probeer opnieuw bij lege of andere ongeldige getaltekst. Negatieve getallen en nul zijn hier geldig.",
      ),
    ),
  ],
  starter:
    'def read_number(prompt):\n    text = input("Number: ")\n    return float(text)\n\nvalue = read_number("Measurement or cancel: ")\nif value is None:\n    print("Cancelled")\nelse:\n    print("Measurement:", value)\n',
  solution:
    'def read_number(prompt):\n    while True:\n        try:\n            text = input(prompt)\n        except EOFError:\n            return None\n        if text.strip().lower() == "cancel":\n            return None\n        try:\n            return float(text)\n        except ValueError:\n            print("Please enter a number or cancel")\n\nvalue = read_number("Measurement or cancel: ")\nif value is None:\n    print("Cancelled")\nelse:\n    print("Measurement:", value)\n',
  inputs: ["wrong", "2.5"],
  tasks: [
    task(
      "",
      L(
        "Use the supplied prompt and return a numeric value after a valid response, including zero and negative decimals.",
        "Gebruik de meegegeven prompt en geef na een geldig antwoord een numerieke waarde terug, inclusief nul en negatieve decimalen.",
      ),
      "callable(read_number) and (value is None or isinstance(value, (int, float)))",
      [
        L(
          "The function’s caller should choose the question text.",
          "De aanroeper van de functie moet de vraagtekst kiezen.",
        ),
        L(
          "The prompt parameter should reach the input call.",
          "De prompt-parameter moet de input-aanroep bereiken.",
        ),
        L(
          "Returning float(text) supplies a number to the caller.",
          "float(text) teruggeven levert een getal aan de aanroeper.",
        ),
      ],
      L(
        "Accept valid numbers and respect the prompt passed by the caller.",
        "Accepteer geldige getallen en respecteer de door de aanroeper meegegeven vraagtekst.",
      ),
      [
        {
          stdin: ["1", "-2.5"],
          call: { name: "read_number", args: ["Custom question: "] },
          check:
            '_error is None and _return == -2.5 and "Custom question:" in _stdout',
        },
        {
          stdin: ["1", "0"],
          call: { name: "read_number", args: ["Number: "] },
          check: "_error is None and _return == 0",
        },
      ],
    ),
    task(
      "",
      L(
        "Retry invalid numeric responses inside the function and give feedback. Do not return until a valid number or cancellation arrives.",
        "Probeer ongeldige getalantwoorden binnen de functie opnieuw en geef feedback. Keer pas terug bij een geldig getal of annulering.",
      ),
      "callable(read_number)",
      [
        L(
          "A failed conversion belongs to this attempt, not necessarily the whole conversation.",
          "Een mislukte conversie hoort bij deze poging, niet noodzakelijk bij de hele interactie.",
        ),
        L(
          "Keep the retry loop inside the reusable function.",
          "Houd de herhaallus binnen de herbruikbare functie.",
        ),
        L(
          "A return on success naturally leaves both the loop and the function.",
          "Een return bij succes verlaat vanzelf zowel de lus als de functie.",
        ),
      ],
      L(
        "Handle repeated mistakes without losing the eventual valid response.",
        "Handel herhaalde fouten af zonder het uiteindelijke geldige antwoord te verliezen.",
      ),
      [
        {
          stdin: ["1", "oops", "", "4.75"],
          call: { name: "read_number", args: ["Try: "] },
          check:
            '_error is None and _return == 4.75 and _remaining_input == "" and _stdout.count("Try:") == 3 and len(_stdout.splitlines()) >= 4',
        },
      ],
    ),
    task(
      "",
      L(
        "Return None for cancel or end-of-input. Preserve the caller’s existing success/cancellation report.",
        "Geef None terug bij cancel of einde van invoer. Behoud het bestaande succes-/annuleringsbericht van de aanroeper.",
      ),
      'callable(read_number) and ("Cancelled" if value is None else "Measurement:") in _stdout',
      [
        L(
          "EOF is an exception; a blank line is text that can be retried.",
          "EOF is een uitzondering; een lege regel is tekst die opnieuw kan worden gevraagd.",
        ),
        L(
          "Catch EOFError around the input call, separately from conversion errors.",
          "Vang EOFError op rond de input-aanroep, apart van conversiefouten.",
        ),
        L(
          "return None tells the caller that no numeric result is available.",
          "return None laat de aanroeper weten dat geen numeriek resultaat beschikbaar is.",
        ),
      ],
      L(
        "Both explicit cancellation and exhausted input should finish cleanly.",
        "Zowel expliciete annulering als uitgeputte invoer moet netjes eindigen.",
      ),
      [
        {
          stdin: ["1", " CANcel "],
          call: { name: "read_number", args: ["Try: "] },
          check: "_error is None and _return is None",
        },
        {
          stdin: ["1", "bad"],
          call: { name: "read_number", args: ["Try: "] },
          check: "_error is None and _return is None",
        },
        {
          stdin: [],
          check: '_error is None and value is None and "Cancelled" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "The caller receives one simple outcome even though the function may manage many turns. In the calculator project you can reuse this idea, adapt it, or choose a different interaction.",
    "De aanroeper ontvangt één eenvoudige uitkomst, ook als de functie veel beurten beheert. In het rekenmachineproject kun je dit idee hergebruiken, aanpassen of een andere interactie kiezen.",
  ),
});

const bill = lesson({
  module: 5,
  number: 5,
  title: L(
    "Build a bill splitter people can reuse",
    "Bouw een herbruikbare rekeningverdeler",
  ),
  guidance: "independent",
  minutes: 24,
  explanation: L(
    "A group wants to divide a bill and an optional tip fairly. Create a reusable calculation and a small terminal interface. Keep the calculation free of input and printing, so another program could use it later. Choose your own local variable names and structure.",
    "Een groep wil een rekening en een optionele fooi eerlijk verdelen. Maak een herbruikbare berekening en een kleine terminalinterface. Houd de berekening vrij van invoer en afdrukken, zodat een ander programma deze later kan gebruiken. Kies zelf lokale variabelenamen en structuur.",
  ),
  sections: [
    section(
      L("Calculation contract", "Afspraken voor de berekening"),
      L(
        "split_bill(total, people, tip_percent=0) returns the unrounded amount per person after adding the percentage tip. For this interface, total and tip_percent are numbers, and people is a whole-number count. Require total >= 0, people > 0, and tip_percent >= 0; raise ValueError otherwise. Do not round inside the function: the caller chooses how to display the result.",
        "split_bill(total, people, tip_percent=0) geeft het onafgeronde bedrag per persoon terug nadat de procentuele fooi is toegevoegd. Voor deze interface zijn total en tip_percent getallen, en people is een geheel aantal. Vereis total >= 0, people > 0 en tip_percent >= 0; veroorzaak anders ValueError. Rond niet af binnen de functie: de aanroeper kiest hoe het resultaat wordt getoond.",
      ),
    ),
    section(
      L("Terminal contract", "Afspraken voor de terminal"),
      L(
        'Ask for total, people, then tip percentage. Use your function for the calculation and display its result to two decimals. Invalid numeric text or invalid values should produce a message containing "invalid", without an unhandled exception. One attempt is enough in this exercise; a retrying version is an optional improvement. Example: a total of 60, three people, and a 10% tip gives 22 each.',
        'Vraag achtereenvolgens om totaal, aantal personen en fooipercentage. Gebruik je functie voor de berekening en toon het resultaat met twee decimalen. Ongeldige getaltekst of ongeldige waarden moeten een bericht met "invalid" opleveren, zonder onafgehandelde uitzondering. Eén poging is genoeg in deze opdracht; een herhalende versie is een optionele verbetering. Voorbeeld: totaal 60, drie personen en 10% fooi geeft elk 22.',
      ),
    ),
  ],
  starter: "# Build the reusable calculation and its terminal interface.\n",
  solution:
    'def split_bill(total, people, tip_percent=0):\n    if total < 0 or people <= 0 or tip_percent < 0:\n        raise ValueError("Invalid bill values")\n    return total * (1 + tip_percent / 100) / people\n\ntry:\n    total = float(input("Total: "))\n    people = int(input("People: "))\n    tip = float(input("Tip percentage: "))\n    share = split_bill(total, people, tip)\n    print(f"Each pays: {share:.2f}")\nexcept ValueError:\n    print("Invalid bill input")\n',
  inputs: ["60", "3", "10"],
  tasks: [
    task(
      "",
      L(
        "Implement split_bill with the stated parameters and default. Return the share with the tip included, preserving numeric precision.",
        "Implementeer split_bill met de genoemde parameters en standaardwaarde. Geef het aandeel inclusief fooi terug en behoud de numerieke precisie.",
      ),
      "callable(split_bill)",
      [
        L(
          "Work out what the group pays before dividing it.",
          "Bereken wat de groep betaalt voordat je het verdeelt.",
        ),
        L(
          "A percentage tip changes the total, not the number of people.",
          "Een procentuele fooi verandert het totaal, niet het aantal personen.",
        ),
        L(
          "The discount lesson converted percentages into fractions; here an amount is added rather than removed.",
          "De kortingsles zette percentages om in fracties; hier wordt een bedrag toegevoegd in plaats van verwijderd.",
        ),
      ],
      L(
        "The reusable calculation should handle varied totals, counts, and tips.",
        "De herbruikbare berekening moet verschillende totalen, aantallen en fooien afhandelen.",
      ),
      [
        {
          stdin: ["60", "3", "10"],
          call: { name: "split_bill", args: [10, 3] },
          check: "_error is None and _close(_return, 10/3)",
        },
        {
          stdin: ["60", "3", "10"],
          call: {
            name: "split_bill",
            kwargs: { tip_percent: 15, people: 2, total: 40 },
          },
          check: "_error is None and _close(_return, 23)",
        },
        {
          stdin: ["60", "3", "10"],
          call: { name: "split_bill", args: [0, 2, 0] },
          check: "_error is None and _return == 0",
        },
      ],
    ),
    task(
      "",
      L(
        "Reject invalid values with ValueError. Keep zero total and zero tip valid, while rejecting zero people.",
        "Wijs ongeldige waarden af met ValueError. Houd totaal nul en fooi nul geldig, maar wijs nul personen af.",
      ),
      "callable(split_bill)",
      [
        L(
          "The allowed boundary differs for money and the divisor.",
          "De toegestane grens verschilt voor geld en de deler.",
        ),
        L(
          "Validate the documented inputs before dividing.",
          "Valideer de afgesproken invoer voordat je deelt.",
        ),
        L(
          "A caller can catch ValueError and choose how to report it.",
          "Een aanroeper kan ValueError opvangen en kiezen hoe deze wordt gemeld.",
        ),
      ],
      L(
        "Invalid arguments must raise the documented error rather than fabricate a share.",
        "Ongeldige argumenten moeten de afgesproken fout veroorzaken in plaats van een aandeel te verzinnen.",
      ),
      [
        [-1, 2, 0],
        [10, 0, 0],
        [10, -2, 0],
        [10, 2, -1],
      ].map((args) => ({
        stdin: ["60", "3", "10"],
        call: { name: "split_bill", args },
        check: '_error == "ValueError"',
      })),
    ),
    task(
      "",
      L(
        "Use the function in the terminal interaction and display the returned share to two decimals. Keep input and printing outside the function.",
        "Gebruik de functie in de terminalinteractie en toon het teruggegeven aandeel met twee decimalen. Houd invoer en afdrukken buiten de functie.",
      ),
      "callable(split_bill) and len(_stdout.strip()) > 0",
      [
        L(
          "The interface and calculation should have different responsibilities.",
          "De interface en berekening moeten verschillende verantwoordelijkheden hebben.",
        ),
        L(
          "The function can be called again without asking any questions or printing anything.",
          "De functie kan opnieuw worden aangeroepen zonder vragen te stellen of iets af te drukken.",
        ),
        L(
          "The delivery quote lesson returned silently and left the report to its caller.",
          "De bezorgprijsles keerde stil terug en liet het overzicht aan de aanroeper over.",
        ),
      ],
      L(
        "Read the three responses, call the reusable calculation, and format only for display.",
        "Lees de drie antwoorden, roep de herbruikbare berekening aan en formatteer alleen voor weergave.",
      ),
      [
        {
          stdin: ["20", "3", "5"],
          check:
            '_error is None and "7.00" in _stdout and _remaining_input == ""',
        },
        {
          stdin: ["10", "3", "0"],
          call: { name: "split_bill", args: [1234, 2, 0] },
          check:
            '_error is None and "3.33" in _stdout and _call_stdout == "" and _call_stderr == "" and _call_input_chars == 0 and _return == 617',
        },
      ],
    ),
    task(
      "",
      L(
        "Keep the interface usable on invalid text and invalid values. Show an invalid-input message instead of a traceback.",
        "Houd de interface bruikbaar bij ongeldige tekst en ongeldige waarden. Toon een bericht over ongeldige invoer in plaats van een traceback.",
      ),
      "callable(split_bill)",
      [
        L(
          "Both conversion and the calculation may reject input.",
          "Zowel conversie als de berekening kan invoer afwijzen.",
        ),
        L(
          "Handle the expected error at the interface boundary.",
          "Handel de verwachte fout af op de grens met de interface.",
        ),
        L(
          "A try block can protect conversions and a function call together.",
          "Een try-blok kan conversies en een functieaanroep samen beschermen.",
        ),
      ],
      L(
        "A bad response should produce a useful message and finish cleanly.",
        "Een slecht antwoord moet een nuttig bericht opleveren en netjes eindigen.",
      ),
      [
        {
          stdin: ["bad", "3", "0"],
          check: '_error is None and "invalid" in _stdout.lower()',
        },
        {
          stdin: ["10", "0", "0"],
          check: '_error is None and "invalid" in _stdout.lower()',
        },
        {
          stdin: ["10", "2", "-5"],
          check: '_error is None and "invalid" in _stdout.lower()',
        },
      ],
    ),
  ],
  solutionNote: L(
    "The calculation and interface can now change independently. Before the calculator project, try calling split_bill from the console with different arguments and decide which parts of your interaction you would reuse.",
    "De berekening en interface kunnen nu onafhankelijk veranderen. Probeer vóór het rekenmachineproject split_bill vanuit de console met verschillende argumenten aan te roepen en bepaal welke delen van je interactie je zou hergebruiken.",
  ),
});

const review = quiz(
  5,
  L(
    "Check your reasoning: reusable functions",
    "Controleer je inzicht: herbruikbare functies",
  ),
  [
    question(
      "v2-5-q1",
      L("What does answer contain?", "Wat bevat answer?"),
      "def double(number):\n    print(number * 2)\n\nanswer = double(4)",
      [
        [
          L("None", "None"),
          L(
            "The function prints 8 but has no explicit return.",
            "De functie drukt 8 af maar heeft geen expliciete return.",
          ),
        ],
        [
          L("8", "8"),
          L(
            "Printing a value is not returning it to the caller.",
            "Een waarde afdrukken is niet hetzelfde als die teruggeven aan de aanroeper.",
          ),
        ],
        [
          L('The string "8"', 'De string "8"'),
          L(
            "The displayed text is not assigned to answer.",
            "De getoonde tekst wordt niet aan answer toegekend.",
          ),
        ],
      ],
    ),
    question(
      "v2-5-q2",
      L("What is printed?", "Wat wordt afgedrukt?"),
      "number = 10\ndef add_one(number):\n    number += 1\n    return number\n\nresult = add_one(3)\nprint(number, result)",
      [
        [
          L("10 4", "10 4"),
          L(
            "The parameter is local to the call; the outside number is unchanged.",
            "De parameter is lokaal voor de aanroep; number erbuiten blijft ongewijzigd.",
          ),
        ],
        [
          L("4 4", "4 4"),
          L(
            "Using the same name does not make the local parameter the outside variable.",
            "Dezelfde naam gebruiken maakt de lokale parameter niet tot de variabele erbuiten.",
          ),
        ],
        [
          L("11 11", "11 11"),
          L(
            "The supplied argument is 3; the function uses that local value.",
            "Het meegegeven argument is 3; de functie gebruikt die lokale waarde.",
          ),
        ],
      ],
    ),
    question(
      "v2-5-q3",
      L(
        "Which call uses the default border?",
        "Welke aanroep gebruikt de standaardrand?",
      ),
      'def badge(name, border="-"):\n    return border + name + border',
      [
        [
          L('badge("Sam")', 'badge("Sam")'),
          L(
            "Omitting border uses its default value.",
            "border weglaten gebruikt de standaardwaarde.",
          ),
        ],
        [
          L('badge("Sam", "*")', 'badge("Sam", "*")'),
          L(
            "This explicitly replaces the default with an asterisk.",
            "Dit vervangt de standaardwaarde expliciet door een sterretje.",
          ),
        ],
        [
          L("badge()", "badge()"),
          L(
            "name is still required; it has no default.",
            "name is nog steeds verplicht; het heeft geen standaardwaarde.",
          ),
        ],
      ],
    ),
    question(
      "v2-5-q4",
      L("What does return do here?", "Wat doet return hier?"),
      'def first_positive():\n    while True:\n        number = float(input())\n        if number > 0:\n            return number\n    print("After loop")',
      [
        [
          L(
            "Leaves the entire function with a value; the final print is not reached.",
            "Verlaat de volledige functie met een waarde; de laatste print wordt niet bereikt.",
          ),
          L(
            "return is a function exit, even when nested in a loop.",
            "return is een functie-uitgang, ook wanneer deze in een lus staat.",
          ),
        ],
        [
          L("Leaves only the if block.", "Verlaat alleen het if-blok."),
          L(
            "Its effect is larger than the nearest conditional block.",
            "Het effect is groter dan alleen het dichtstbijzijnde voorwaardelijke blok.",
          ),
        ],
        [
          L(
            "Prints the number and repeats.",
            "Drukt het getal af en herhaalt.",
          ),
          L(
            "Returning does not print and does not continue the loop.",
            "Teruggeven drukt niet af en vervolgt de lus niet.",
          ),
        ],
      ],
    ),
    question(
      "v2-5-q5",
      L(
        "Why separate calculation from input and printing?",
        "Waarom scheid je berekening van invoer en afdrukken?",
      ),
      "",
      [
        [
          L(
            "Other callers can reuse and test the calculation without a conversation.",
            "Andere aanroepers kunnen de berekening hergebruiken en testen zonder interactie.",
          ),
          L(
            "A clear argument/return contract makes reuse independent of the terminal layout.",
            "Duidelijke afspraken over argumenten en terugkeerwaarde maken hergebruik onafhankelijk van de terminalindeling.",
          ),
        ],
        [
          L(
            "Functions are forbidden from printing.",
            "Functies mogen niet afdrukken.",
          ),
          L(
            "Presentation functions may print; the separation is a design choice based on responsibility.",
            "Presentatiefuncties mogen afdrukken; de scheiding is een ontwerpkeuze op basis van verantwoordelijkheid.",
          ),
        ],
        [
          L(
            "It makes all bad input impossible.",
            "Het maakt alle slechte invoer onmogelijk.",
          ),
          L(
            "Inputs still need validation and an appropriate response.",
            "Invoer heeft nog steeds validatie en een passende reactie nodig.",
          ),
        ],
      ],
    ),
  ],
);

export const activities = [notices, delivery, discount, reader, bill, review];
