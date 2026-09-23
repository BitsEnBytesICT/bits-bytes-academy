import { L, section, task, lesson, quiz, question } from "./authoring.mjs";
import { localFilesLesson } from "./local-files-lesson.mjs";

const finite = lesson({
  module: 7,
  number: 1,
  title: L(
    "Use a library to finish input validation",
    "Gebruik een bibliotheek om invoervalidatie af te maken",
  ),
  guidance: "guided",
  minutes: 16,
  explanation: L(
    "The earlier tools handled ordinary decimal input. Python also accepts special float strings such as nan and inf, which are unsuitable for a game speed. Use the standard library to distinguish a finite positive speed from text that merely converts successfully.",
    "De eerdere tools handelden gewone decimale invoer af. Python accepteert ook bijzondere floatstrings zoals nan en inf, die ongeschikt zijn voor een spelsnelheid. Gebruik de standaardbibliotheek om een eindige positieve snelheid te onderscheiden van tekst die alleen succesvol wordt omgezet.",
  ),
  sections: [
    section(
      L("Import adds a module name", "import voegt een modulenaam toe"),
      L(
        "The standard library ships with Python. import math makes its tools available as math.name. You can also write from math import isfinite and then call isfinite directly. Importing does not itself call a function. Keep your own files from shadowing library names such as math.py or random.py.",
        "De standaardbibliotheek wordt met Python meegeleverd. import math maakt de tools beschikbaar als math.name. Je kunt ook from math import isfinite schrijven en vervolgens isfinite direct aanroepen. Importeren roept zelf geen functie aan. Voorkom dat je eigen bestanden bibliotheeknamen zoals math.py of random.py overschaduwen.",
      ),
      "import math\nprint(math.ceil(2.3))\nprint(math.isfinite(12.5))",
      "3\nTrue",
    ),
    section(
      L(
        "Converting is only one validation step",
        "Omzetten is maar één validatiestap",
      ),
      L(
        "math.isfinite(value) is false for infinity and NaN (“not a number”). Comparisons alone can be misleading for NaN. safe_speed(text) should return a float only when conversion succeeds, the value is finite, and it is greater than zero. Return None for every rejected response. Test nan, inf, -inf, blank text, zero, and an ordinary speed.",
        "math.isfinite(value) is onwaar voor oneindigheid en NaN (“not a number”). Alleen vergelijken kan bij NaN misleidend zijn. safe_speed(text) moet alleen een float teruggeven wanneer de conversie slaagt, de waarde eindig is en groter dan nul. Geef None terug voor elk afgewezen antwoord. Test nan, inf, -inf, lege tekst, nul en een gewone snelheid.",
      ),
    ),
  ],
  starter:
    'def safe_speed(text):\n    return float(text)\n\nraw_speed = input("Speed: ")\nspeed = safe_speed(raw_speed)\nprint("Speed:", speed)\n',
  solution:
    'import math\n\ndef safe_speed(text):\n    try:\n        value = float(text)\n    except ValueError:\n        return None\n    if not math.isfinite(value) or value <= 0:\n        return None\n    return value\n\nraw_speed = input("Speed: ")\nspeed = safe_speed(raw_speed)\nprint("Speed:", speed)\n',
  inputs: ["180"],
  tasks: [
    task(
      "",
      L(
        "Keep valid positive speeds numeric, including decimal and padded text. Return None for text that cannot be converted.",
        "Houd geldige positieve snelheden numeriek, inclusief decimale tekst en spaties aan de randen. Geef None terug voor tekst die niet kan worden omgezet.",
      ),
      "callable(safe_speed) and (speed is None or isinstance(speed, float))",
      [
        L(
          "The function receives text; its caller needs a number or a clear absence.",
          "De functie ontvangt tekst; de aanroeper heeft een getal of duidelijke afwezigheid nodig.",
        ),
        L(
          "Handle the conversion’s ValueError inside the function.",
          "Handel ValueError van de conversie binnen de functie af.",
        ),
        L(
          'float(" 2.5 ") accepts surrounding whitespace.',
          'float(" 2.5 ") accepteert witruimte aan de randen.',
        ),
      ],
      L(
        "Accept usable numeric text and reject conversion failures cleanly.",
        "Accepteer bruikbare getaltekst en wijs conversiefouten netjes af.",
      ),
      [
        {
          stdin: ["180"],
          call: { name: "safe_speed", args: [" 2.5 "] },
          check: "_error is None and _return == 2.5",
        },
        {
          stdin: ["180"],
          call: { name: "safe_speed", args: ["fast"] },
          check: "_error is None and _return is None",
        },
      ],
    ),
    task(
      "",
      L(
        "Use the library’s finite-number check and the positive-speed rule to reject nan, infinities, zero, and negative values.",
        "Gebruik de eindigheidscontrole van de bibliotheek en de regel voor positieve snelheid om nan, oneindigheden, nul en negatieve waarden af te wijzen.",
      ),
      "callable(safe_speed)",
      [
        L(
          "A successful conversion does not guarantee a usable speed.",
          "Een geslaagde conversie garandeert geen bruikbare snelheid.",
        ),
        L(
          "Check finiteness as well as the numeric range.",
          "Controleer eindigheid én het numerieke bereik.",
        ),
        L(
          'math.isfinite(float("inf")) is False.',
          'math.isfinite(float("inf")) is False.',
        ),
      ],
      L(
        "Nonfinite and nonpositive values must not enter the game state.",
        "Niet-eindige en niet-positieve waarden mogen de speltoestand niet bereiken.",
      ),
      ["nan", "INF", "-inf", "0", "-0.0", "-4"].map((text) => ({
        stdin: ["180"],
        call: { name: "safe_speed", args: [text] },
        check: "_error is None and _return is None",
      })),
    ),
    task(
      "",
      L(
        "Keep the terminal report useful for both accepted and rejected speeds, and keep safe_speed reusable without extra input or printing.",
        "Houd het terminaloverzicht bruikbaar voor geaccepteerde en afgewezen snelheden en houd safe_speed herbruikbaar zonder extra invoer of afdrukken.",
      ),
      "callable(safe_speed) and (bool(_stdout.strip()) if speed is None else str(speed) in _stdout)",
      [
        L(
          "The interface already owns input and display.",
          "De interface beheert invoer en weergave al.",
        ),
        L(
          "Leave those actions outside the reusable validation function.",
          "Laat die acties buiten de herbruikbare validatiefunctie.",
        ),
        L(
          "A returned None can be shown or turned into a friendly message by the caller.",
          "Een teruggegeven None kan door de aanroeper worden getoond of in een vriendelijk bericht worden omgezet.",
        ),
      ],
      L(
        "The function should return an outcome without starting its own conversation.",
        "De functie moet een uitkomst teruggeven zonder een eigen interactie te beginnen.",
      ),
      [
        {
          stdin: ["nan"],
          check: '_error is None and speed is None and bool(_stdout.strip())',
        },
        {
          stdin: ["180"],
          call: { name: "safe_speed", args: ["25"] },
          check:
            '_error is None and _return == 25 and _call_stdout == "" and _call_input_chars == 0',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Both import styles and aliases can pass. This adds a library tool to the validation pattern you already know; you can revisit earlier programs and decide whether their inputs also need a finite-number rule.",
    "Beide importvormen en aliassen kunnen slagen. Dit voegt een bibliotheektool toe aan het validatiepatroon dat je al kent; je kunt eerdere programma’s opnieuw bekijken en bepalen of hun invoer ook een regel voor eindige getallen nodig heeft.",
  ),
});

const random = lesson({
  module: 7,
  number: 2,
  title: L(
    "Vary the next serve deliberately",
    "Varieer de volgende opslag bewust",
  ),
  guidance: "adapt",
  minutes: 18,
  explanation: L(
    "A ball should not start every rally in exactly the same direction. Use Python’s random module to choose a direction while keeping the speed controlled. Randomness should vary the choice, not make the game’s rules unpredictable.",
    "Een bal moet niet elke rally in precies dezelfde richting beginnen. Gebruik Pythons random-module om een richting te kiezen en houd tegelijk de snelheid onder controle. Willekeur moet de keuze variëren, niet de spelregels onvoorspelbaar maken.",
  ),
  sections: [
    section(
      L("Choose from allowed values", "Kies uit toegestane waarden"),
      L(
        "random.choice(sequence) selects one item. random.randint(a, b) selects an integer including both endpoints. Import the module before calling its tools. For this exercise, serve_velocity(speed) returns (vx, vy): vx must be either -speed or speed; vy must be either -speed/2 or speed/2.",
        "random.choice(sequence) kiest één item. random.randint(a, b) kiest een integer inclusief beide grenzen. Importeer de module voordat je de tools aanroept. Voor deze opdracht geeft serve_velocity(speed) (vx, vy) terug: vx moet -speed of speed zijn; vy moet -speed/2 of speed/2 zijn.",
      ),
      'import random\ncolour = random.choice(["blue", "orange"])\nprint(colour)',
    ),
    section(
      L(
        "Reproduce an experiment without freezing every call",
        "Herhaal een experiment zonder elke aanroep vast te zetten",
      ),
      L(
        "random.seed(number) starts a repeatable sequence, useful for debugging. Seed once before a series of calls if needed. Seeding to the same value inside every call restarts the sequence and can produce the same “random” choice repeatedly. This generator is for game variation, not passwords or security tokens.",
        "random.seed(number) begint een herhaalbare reeks, handig voor foutonderzoek. Stel indien nodig één keer vóór een reeks aanroepen de seed in. In elke aanroep dezelfde seed instellen herstart de reeks en kan steeds dezelfde “willekeurige” keuze opleveren. Deze generator is voor spelvariatie, niet voor wachtwoorden of beveiligingstokens.",
      ),
    ),
  ],
  starter:
    "def serve_velocity(speed):\n    return (speed, speed / 2)\n\nfor serve in range(6):\n    print(serve_velocity(4))\n",
  solution:
    "import random\n\ndef serve_velocity(speed):\n    vx = random.choice([-1, 1]) * speed\n    vy = random.choice([-1, 1]) * speed / 2\n    return (vx, vy)\n\nfor serve in range(6):\n    print(serve_velocity(4))\n",
  tasks: [
    task(
      "",
      L(
        "Return the specified horizontal and vertical components for any supplied positive speed, as a two-item tuple.",
        "Geef de afgesproken horizontale en verticale componenten voor elke meegegeven positieve snelheid terug als tuple met twee items.",
      ),
      "callable(serve_velocity)",
      [
        L(
          "The choice of sign and the size of a component are separate.",
          "De keuze van het teken en de grootte van een component staan los van elkaar.",
        ),
        L(
          "Derive magnitudes from the speed argument rather than the sample value 4.",
          "Leid de groottes af uit het speed-argument in plaats van de voorbeeldwaarde 4.",
        ),
        L(
          "Multiplying a value by -1 reverses its sign without changing its magnitude.",
          "Een waarde met -1 vermenigvuldigen keert het teken om zonder de grootte te veranderen.",
        ),
      ],
      L(
        "Keep the allowed component magnitudes for varied speeds.",
        "Behoud de toegestane componentgroottes bij verschillende snelheden.",
      ),
      [2, 7, 2.5].map((speed) => ({
        call: { name: "serve_velocity", args: [speed] },
        check: `_error is None and isinstance(_return, tuple) and len(_return) == 2 and abs(_return[0]) == ${speed} and abs(_return[1]) == ${speed / 2}`,
      })),
    ),
    task(
      "",
      L(
        "Use independent random direction choices so repeated serves can go left or right and up or down.",
        "Gebruik onafhankelijke willekeurige richtingskeuzes zodat herhaalde opslagen naar links of rechts en omhoog of omlaag kunnen gaan.",
      ),
      "callable(serve_velocity)",
      [
        L(
          "One sign reused for both axes limits the available directions.",
          "Eén teken dat voor beide assen wordt hergebruikt beperkt de beschikbare richtingen.",
        ),
        L(
          "Choose the direction of each component separately.",
          "Kies de richting van elke component apart.",
        ),
        L(
          "Two calls to choice can select two signs independently.",
          "Twee aanroepen van choice kunnen onafhankelijk twee tekens kiezen.",
        ),
      ],
      L(
        "Allow all four direction combinations over a sequence of serves.",
        "Sta in een reeks opslagen alle vier richtingscombinaties toe.",
      ),
      [
        {
          call: { name: "serve_velocity", args: [4] },
          check:
            "_error is None and {serve_velocity(4) for _ in range(100)} == {(-4, -2), (-4, 2), (4, -2), (4, 2)}",
        },
      ],
    ),
    task(
      "",
      L(
        "Keep the six-serve demonstration, and keep individual calls free of input or printing. Do not restart the random sequence on each call.",
        "Behoud de demonstratie met zes opslagen en houd afzonderlijke aanroepen vrij van invoer of afdrukken. Herstart de willekeurige reeks niet bij elke aanroep.",
      ),
      "callable(serve_velocity) and len(_stdout.splitlines()) == 6",
      [
        L(
          "The demonstration controls how many results to display.",
          "De demonstratie bepaalt hoeveel resultaten worden getoond.",
        ),
        L(
          "The function should supply one result and let the next call advance the generator.",
          "De functie moet één resultaat leveren en de volgende aanroep de generator laten vervolgen.",
        ),
        L(
          "A fixed seed is useful before an experiment; repeatedly setting it defeats variation.",
          "Een vaste seed is nuttig vóór een experiment; deze steeds instellen verhindert variatie.",
        ),
      ],
      L(
        "Each call should supply a fresh choice without its own conversation.",
        "Elke aanroep moet een nieuwe keuze leveren zonder eigen interactie.",
      ),
      [
        {
          call: { name: "serve_velocity", args: [6] },
          check:
            '_error is None and _call_stdout == "" and _call_input_chars == 0 and len({serve_velocity(6) for _ in range(100)}) == 4',
        },
      ],
    ),
  ],
  solutionNote: L(
    "choice, randint with a sign conversion, and equivalent approaches can satisfy the same contract. The checks use a repeatable random seed to avoid random test failures; the six visible demonstration results need not match a particular sequence.",
    "choice, randint met tekenomzetting en gelijkwaardige aanpakken kunnen aan dezelfde afspraken voldoen. De controles gebruiken een herhaalbare seed om willekeurige testfouten te voorkomen; de zes zichtbare demonstratieresultaten hoeven niet met een bepaalde reeks overeen te komen.",
  ),
});

const rectangles = lesson({
  module: 7,
  number: 3,
  title: L(
    "Meet a real Pygame object",
    "Maak kennis met een echt Pygame-object",
  ),
  guidance: "guided",
  minutes: 18,
  explanation: L(
    "Pygame is an external library for games. This site includes pygame-ce, which is imported as pygame. Before opening a game preview, use a rectangle in the terminal and inspect how its named attributes work. You do not need to write your own class to use an object supplied by a library.",
    "Pygame is een externe bibliotheek voor spellen. Deze site bevat pygame-ce, dat als pygame wordt geïmporteerd. Gebruik vóór het openen van een spelvoorbeeld een rechthoek in de terminal en bekijk hoe de benoemde attributen werken. Je hoeft geen eigen klasse te schrijven om een object uit een bibliotheek te gebruiken.",
  ),
  sections: [
    section(
      L(
        "Installing and importing are different",
        "Installeren en importeren zijn verschillend",
      ),
      L(
        "Installing makes a package available in an environment; importing gives a running Python program access to it. The package name pygame-ce differs from its import name pygame. This website loads its bundled version when your code imports it. A normal desktop environment would install it with python -m pip install pygame-ce in the operating-system terminal, not in the Python > prompt. Do not run that command here.",
        "Installeren maakt een pakket beschikbaar in een omgeving; importeren geeft een draaiend Pythonprogramma toegang ertoe. De pakketnaam pygame-ce verschilt van de importnaam pygame. Deze website laadt de meegeleverde versie wanneer je code deze importeert. In een gewone desktopomgeving installeer je met python -m pip install pygame-ce in de terminal van het besturingssysteem, niet achter de Python-prompt >. Voer dat commando hier niet uit.",
      ),
    ),
    section(
      L("Attributes describe the object", "Attributen beschrijven het object"),
      L(
        "pygame.Rect(x, y, width, height) creates an integer rectangle. Attributes such as width, height, and center describe the same object. Assigning center moves it without changing its size. rect.move(dx, dy) returns a moved copy; rect.move_ip(dx, dy) changes the original. The suffix means “in place”.",
        "pygame.Rect(x, y, width, height) maakt een rechthoek met gehele coördinaten. Attributen zoals width, height en center beschrijven hetzelfde object. center toekennen verplaatst het zonder de grootte te veranderen. rect.move(dx, dy) geeft een verplaatste kopie terug; rect.move_ip(dx, dy) verandert het origineel. Het achtervoegsel betekent “in place”.",
      ),
      "import pygame\nbox = pygame.Rect(0, 0, 20, 10)\nbox.center = (50, 30)\nprint(box.topleft, box.size)",
      "(40, 25) (20, 10)",
    ),
  ],
  starter:
    'import pygame\n\npaddle_width = 12\npaddle_height = 80\ncentre_x = 40\ncentre_y = 160\nshift_y = 20\n\npaddle = pygame.Rect(0, 0, 1, 1)\npreview = paddle\nprint("Paddle:", paddle)\nprint("Preview:", preview)\n',
  solution:
    'import pygame\n\npaddle_width = 12\npaddle_height = 80\ncentre_x = 40\ncentre_y = 160\nshift_y = 20\n\npaddle = pygame.Rect(0, 0, paddle_width, paddle_height)\npaddle.center = (centre_x, centre_y)\npreview = paddle.move(0, shift_y)\nprint("Paddle:", paddle)\nprint("Preview:", preview)\n',
  tasks: [
    task(
      "",
      L(
        "Create a real pygame.Rect paddle with the supplied width and height.",
        "Maak een echte pygame.Rect-paddle met de meegegeven breedte en hoogte.",
      ),
      'isinstance(paddle, __import__("pygame").Rect) and paddle.size == (paddle_width, paddle_height)',
      [
        L(
          "The constructor receives position first, then dimensions.",
          "De constructor ontvangt eerst de positie en daarna de afmetingen.",
        ),
        L(
          "Use the named dimension values instead of the placeholder ones.",
          "Gebruik de benoemde afmetingen in plaats van de tijdelijke waarden.",
        ),
        L(
          "The box example constructs a 20-by-10 rectangle.",
          "Het box-voorbeeld maakt een rechthoek van 20 bij 10.",
        ),
      ],
      L(
        "Use the library object and preserve both requested dimensions.",
        "Gebruik het bibliotheekobject en behoud beide gevraagde afmetingen.",
      ),
      [
        {
          inputs: { paddle_width: 16, paddle_height: 60 },
          check:
            '_error is None and isinstance(paddle, __import__("pygame").Rect) and paddle.size == (16, 60)',
        },
      ],
    ),
    task(
      "",
      L(
        "Place the paddle’s centre at (centre_x, centre_y), without changing its dimensions.",
        "Plaats het midden van de paddle op (centre_x, centre_y), zonder de afmetingen te veranderen.",
      ),
      "paddle.center == (centre_x, centre_y) and paddle.size == (paddle_width, paddle_height)",
      [
        L(
          "The requested point is the centre, not the top-left corner.",
          "Het gevraagde punt is het midden, niet de linkerbovenhoek.",
        ),
        L(
          "Use an attribute that expresses the position you want to set.",
          "Gebruik een attribuut dat de gewenste positie uitdrukt.",
        ),
        L(
          "box.center = (50, 30) moves all related rectangle edges together.",
          "box.center = (50, 30) verplaatst alle bijbehorende rechthoekranden samen.",
        ),
      ],
      L(
        "Do not confuse centre coordinates with the constructor’s top-left position.",
        "Verwar midden-coördinaten niet met de linkerbovenpositie van de constructor.",
      ),
      [
        {
          inputs: { centre_x: 80, centre_y: 100 },
          check:
            "_error is None and paddle.center == (80, 100) and paddle.size == (12, 80)",
        },
      ],
    ),
    task(
      "",
      L(
        "Make preview an independent rectangle shifted vertically by shift_y. Keep paddle at its original centre and retain both reports.",
        "Maak preview een onafhankelijke rechthoek die verticaal met shift_y verschoven is. Houd paddle op zijn oorspronkelijke midden en behoud beide overzichten.",
      ),
      'preview is not paddle and preview.center == (centre_x, centre_y + shift_y) and paddle.center == (centre_x, centre_y) and "Paddle:" in _stdout and "Preview:" in _stdout',
      [
        L(
          "A moved copy and an in-place move have different effects.",
          "Een verplaatste kopie en een verplaatsing ter plaatse hebben verschillende effecten.",
        ),
        L(
          "Choose a method that leaves the original rectangle alone.",
          "Kies een methode die de oorspronkelijke rechthoek met rust laat.",
        ),
        L(
          "move returns the copy; move_ip changes the current object.",
          "move geeft de kopie terug; move_ip verandert het huidige object.",
        ),
      ],
      L(
        "Preserve the original while moving the preview by the requested offset.",
        "Behoud het origineel terwijl je het voorbeeld met de gevraagde verschuiving verplaatst.",
      ),
      [
        {
          inputs: { shift_y: -15 },
          check:
            "_error is None and preview.center == (40, 145) and paddle.center == (40, 160) and preview.size == paddle.size",
        },
      ],
    ),
  ],
  solutionNote: L(
    "After Run, try paddle.center, paddle.bottom, or pygame.version.ver in the console. Attribute relationships come from the library; consult its reference when a name or boundary is unclear. Official reference: https://pyga.me/docs/ref/rect.html . The website pins its own compatible runtime version, which can differ from the latest documentation.",
    "Probeer na Run paddle.center, paddle.bottom of pygame.version.ver in de console. De relaties tussen attributen komen uit de bibliotheek; raadpleeg de referentie wanneer een naam of grens onduidelijk is. Officiële referentie: https://pyga.me/docs/ref/rect.html . De website gebruikt een eigen vastgezette compatibele runtimeversie, die kan verschillen van de nieuwste documentatie.",
  ),
});

const layout = lesson({
  module: 7,
  number: 5,
  title: L(
    "Build a reusable paddle layout module",
    "Bouw een herbruikbare module voor paddleposities",
  ),
  guidance: "independent",
  minutes: 24,
  explanation: L(
    "Prepare the two paddles for a court without opening a window yet. main.py already asks a separate layout module for the rectangles. Implement that module so both sides work for different court sizes. This is the same multi-file workflow you can use in your own Pong project.",
    "Bereid de twee paddles voor een speelveld voor zonder al een venster te openen. main.py vraagt de rechthoeken al aan een aparte layout-module. Implementeer die module zodat beide kanten bij verschillende speelveldgrootten werken. Dit is dezelfde werkwijze met meerdere bestanden die je in je eigen Pong-project kunt gebruiken.",
  ),
  sections: [
    section(
      L("A small public interface", "Een kleine publieke interface"),
      L(
        'In layout.py, make_paddle(width, height, side) returns a pygame.Rect that is 12 pixels wide and 72 high. Its vertical centre is height // 2. A left paddle has 24 pixels between its left edge and the court’s left edge. A right paddle has the same gap between its right edge and the court’s right edge. side is "left" or "right"; reject anything else with ValueError. Assume courts are at least 200 by 100. Each call returns a fresh rectangle. The module should not ask for input or print when imported.',
        'In layout.py geeft make_paddle(width, height, side) een pygame.Rect terug die 12 pixels breed en 72 hoog is. Het verticale midden is height // 2. Een linkerpaddle heeft 24 pixels tussen zijn linkerrand en de linkerrand van het veld. Een rechterpaddle heeft dezelfde ruimte tussen zijn rechterrand en de rechterrand van het veld. side is "left" of "right"; wijs iets anders af met ValueError. Neem aan dat velden minstens 200 bij 100 zijn. Elke aanroep geeft een verse rechthoek terug. De module moet bij importeren geen invoer vragen of afdrukken.',
      ),
    ),
  ],
  starter: {
    "main.py":
      'import layout\n\ncourt_width = 640\ncourt_height = 400\nleft = layout.make_paddle(court_width, court_height, "left")\nright = layout.make_paddle(court_width, court_height, "right")\nprint("Left:", left)\nprint("Right:", right)\n',
    "layout.py": "# Create the reusable paddle layout function here.\n",
  },
  solution: {
    "main.py":
      'import layout\n\ncourt_width = 640\ncourt_height = 400\nleft = layout.make_paddle(court_width, court_height, "left")\nright = layout.make_paddle(court_width, court_height, "right")\nprint("Left:", left)\nprint("Right:", right)\n',
    "layout.py":
      'import pygame\n\ndef make_paddle(width, height, side):\n    if side != "left" and side != "right":\n        raise ValueError("Unknown side")\n    paddle = pygame.Rect(0, 0, 12, 72)\n    paddle.centery = height // 2\n    if side == "left":\n        paddle.left = 24\n    else:\n        paddle.right = width - 24\n    return paddle\n',
  },
  tasks: [
    task(
      "",
      L(
        "Implement make_paddle in layout.py, returning the correct rectangle dimensions and vertical centre for either side.",
        "Implementeer make_paddle in layout.py en geef voor beide kanten de juiste rechthoekafmetingen en het verticale midden terug.",
      ),
      "left.size == (12, 72) and right.size == (12, 72) and left.centery == court_height // 2 and right.centery == court_height // 2",
      [
        L(
          "The caller already knows the court; the module should use those arguments.",
          "De aanroeper kent het veld al; de module moet die argumenten gebruiken.",
        ),
        L(
          "Construct an object and set the attributes that describe the layout.",
          "Maak een object en stel de attributen in die de indeling beschrijven.",
        ),
        L(
          "The previous library lesson positioned a rectangle through its centre attribute.",
          "De vorige bibliotheekles plaatste een rechthoek via het center-attribuut.",
        ),
      ],
      L(
        "Return real rectangles that fit the documented size and vertical placement.",
        "Geef echte rechthoeken terug met de afgesproken grootte en verticale plaatsing.",
      ),
      [
        {
          call: {
            module: "layout",
            name: "make_paddle",
            args: [800, 301, "left"],
          },
          check:
            '_error is None and isinstance(_return, __import__("pygame").Rect) and _return.size == (12, 72) and _return.centery == 150',
        },
      ],
    ),
    task(
      "",
      L(
        "Keep a 24-pixel gap at the appropriate outer edge. Make the right-hand position follow the court width.",
        "Houd aan de juiste buitenrand een ruimte van 24 pixels. Laat de rechterpositie de breedte van het veld volgen.",
      ),
      "left.left == 24 and right.right == court_width - 24",
      [
        L(
          "A right-edge gap is not measured from the paddle’s left edge.",
          "Een ruimte aan de rechterrand wordt niet vanaf de linkerrand van de paddle gemeten.",
        ),
        L(
          "Think in terms of edges before converting to a top-left coordinate.",
          "Denk eerst in randen voordat je naar een linkerbovencoördinaat omzet.",
        ),
        L(
          "The rectangle’s right attribute already accounts for its width.",
          "Het right-attribuut van de rechthoek houdt al rekening met zijn breedte.",
        ),
      ],
      L(
        "Both outer gaps should stay equal when the court changes size.",
        "Beide buitenruimtes moeten gelijk blijven wanneer de veldgrootte verandert.",
      ),
      [
        {
          inputs: { court_width: 900, court_height: 500 },
          check:
            "_error is None and left.left == 24 and right.right == 876 and left.centery == 250 and right.centery == 250",
        },
        {
          call: {
            module: "layout",
            name: "make_paddle",
            args: [240, 160, "right"],
          },
          check: "_return.right == 216 and _return.left == 204",
        },
      ],
    ),
    task(
      "",
      L(
        "Reject invalid sides, return a fresh rectangle for each call, and keep layout free of terminal interaction. Run main.py to inspect both paddles.",
        "Wijs ongeldige kanten af, geef bij elke aanroep een nieuwe rechthoek terug en houd layout vrij van terminalinteractie. Voer main.py uit om beide paddles te bekijken.",
      ),
      'left is not right and "Left:" in _stdout and "Right:" in _stdout',
      [
        L(
          "A reusable module should provide objects, not own the whole program.",
          "Een herbruikbare module moet objecten leveren, niet het volledige programma beheren.",
        ),
        L(
          "Validate the side and create the rectangle inside the function.",
          "Valideer de kant en maak de rechthoek binnen de functie.",
        ),
        L(
          "The earlier reset lesson explained why sharing one mutable object can break later calls.",
          "De eerdere resetles legde uit waarom één veranderlijk object delen latere aanroepen kan verstoren.",
        ),
      ],
      L(
        "Keep imports quiet, reject invalid input, and avoid shared paddles.",
        "Houd imports stil, wijs ongeldige invoer af en vermijd gedeelde paddles.",
      ),
      [
        {
          call: {
            module: "layout",
            name: "make_paddle",
            args: [640, 400, "top"],
          },
          check: '_error == "ValueError"',
        },
        {
          call: {
            module: "layout",
            name: "make_paddle",
            args: [640, 400, "left"],
          },
          check:
            '_error is None and _call_stdout == "" and _call_input_chars == 0 and len(_stdout.splitlines()) == 2 and _return is not left and _return is not right',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Setting edge/centre attributes or calculating the top-left coordinates can both work. Run starts main.py even while layout.py is selected. Changing the helper and running again reloads the module; the next scene lessons will draw these same kinds of objects.",
    "Rand-/middenattributen instellen of linkerbovencoördinaten berekenen kan allebei werken. Run start main.py, ook wanneer layout.py is geselecteerd. De helper veranderen en opnieuw uitvoeren herlaadt de module; de volgende scènelessen tekenen ditzelfde soort objecten.",
  ),
});

const review = quiz(
  7,
  L(
    "Check your reasoning: modules and libraries",
    "Controleer je inzicht: modules en bibliotheken",
  ),
  [
    question(
      "v2-7-q1",
      L(
        "Why is successful float conversion not enough to accept a game speed?",
        "Waarom is geslaagde floatconversie niet genoeg om een spelsnelheid te accepteren?",
      ),
      "",
      [
        [
          L(
            "It may produce a nonfinite or nonpositive value.",
            "Het kan een niet-eindige of niet-positieve waarde opleveren.",
          ),
          L(
            "Validate the meaning of a converted value, not only its type.",
            "Valideer de betekenis van een omgezette waarde, niet alleen het type.",
          ),
        ],
        [
          L(
            "float always returns a string.",
            "float geeft altijd een string terug.",
          ),
          L(
            "It returns a float, but that value still needs validation.",
            "Het geeft een float terug, maar die waarde heeft nog validatie nodig.",
          ),
        ],
        [
          L(
            "Imported functions cannot accept floats.",
            "Geïmporteerde functies kunnen geen floats accepteren.",
          ),
          L(
            "Library functions can accept floats when their interface specifies them.",
            "Bibliotheekfuncties kunnen floats accepteren wanneer hun interface dat aangeeft.",
          ),
        ],
      ],
    ),
    question(
      "v2-7-q2",
      L(
        "Why might every serve be identical?",
        "Waarom kan elke opslag identiek zijn?",
      ),
      "def choose_direction():\n    random.seed(7)\n    return random.choice([-1, 1])",
      [
        [
          L(
            "Every call restarts the same pseudo-random sequence.",
            "Elke aanroep herstart dezelfde pseudowillekeurige reeks.",
          ),
          L(
            "Seed once before an experiment, not before every choice.",
            "Stel de seed één keer vóór een experiment in, niet vóór elke keuze.",
          ),
        ],
        [
          L(
            "choice always picks the first list item.",
            "choice kiest altijd het eerste lijstitem.",
          ),
          L(
            "The repeated seed makes the first choice repeat; choice itself can select either item.",
            "De herhaalde seed herhaalt de eerste keuze; choice zelf kan beide items kiezen.",
          ),
        ],
        [
          L(
            "Python cannot generate negative random choices.",
            "Python kan geen negatieve willekeurige keuzes genereren.",
          ),
          L(
            "choice selects values from the supplied sequence, including negative values.",
            "choice kiest waarden uit de meegegeven reeks, inclusief negatieve waarden.",
          ),
        ],
      ],
    ),
    question(
      "v2-7-q3",
      L(
        "Which pair of statements is correct for this website?",
        "Welk paar uitspraken is voor deze website juist?",
      ),
      "",
      [
        [
          L(
            "The bundled package is pygame-ce; Python code uses import pygame.",
            "Het meegeleverde pakket is pygame-ce; Pythoncode gebruikt import pygame.",
          ),
          L(
            "Package names and import names do not always match.",
            "Pakketnamen en importnamen zijn niet altijd gelijk.",
          ),
        ],
        [
          L(
            "Type pip install into the Python prompt before every Run.",
            "Typ vóór elke Run pip install in de Python-prompt.",
          ),
          L(
            "Installation commands belong to an environment’s system terminal; this site already bundles the package.",
            "Installatiecommando’s horen in de systeemterminal van een omgeving; deze site levert het pakket al mee.",
          ),
        ],
        [
          L(
            "Importing pygame immediately creates the complete game.",
            "pygame importeren maakt meteen het volledige spel.",
          ),
          L(
            "Importing makes tools available; your code still defines the game.",
            "Importeren maakt tools beschikbaar; je code bepaalt nog steeds het spel.",
          ),
        ],
      ],
    ),
    question(
      "v2-7-q4",
      L(
        "When layout.py is selected in the editor, what does Run start?",
        "Wat start Run wanneer layout.py in de editor geselecteerd is?",
      ),
      "",
      [
        [
          L(
            "main.py, which can import layout.py.",
            "main.py, dat layout.py kan importeren.",
          ),
          L(
            "The selected tab controls editing; the activity’s script entry point remains main.py.",
            "De geselecteerde tab bepaalt wat je bewerkt; het startpunt van het script blijft main.py.",
          ),
        ],
        [
          L("Only the selected file.", "Alleen het geselecteerde bestand."),
          L(
            "Selecting a helper tab does not change the Run entry point.",
            "Een helpertab selecteren verandert het startpunt van Run niet.",
          ),
        ],
        [
          L(
            "Every file independently, in alphabetical order.",
            "Elk bestand onafhankelijk, op alfabetische volgorde.",
          ),
          L(
            "Imports determine which modules are loaded; files are not all launched separately.",
            "Imports bepalen welke modules worden geladen; bestanden worden niet allemaal apart gestart.",
          ),
        ],
      ],
    ),
    question(
      "v2-7-q5",
      L(
        "Which call creates a moved copy while preserving paddle?",
        "Welke aanroep maakt een verplaatste kopie en behoudt paddle?",
      ),
      "",
      [
        [
          L("preview = paddle.move(0, 10)", "preview = paddle.move(0, 10)"),
          L(
            "move returns a new rectangle.",
            "move geeft een nieuwe rechthoek terug.",
          ),
        ],
        [
          L("preview = paddle", "preview = paddle"),
          L(
            "That creates another reference to the same rectangle.",
            "Dat maakt nog een verwijzing naar dezelfde rechthoek.",
          ),
        ],
        [
          L(
            "preview = paddle.move_ip(0, 10)",
            "preview = paddle.move_ip(0, 10)",
          ),
          L(
            "move_ip changes paddle in place and returns None.",
            "move_ip verandert paddle ter plaatse en geeft None terug.",
          ),
        ],
      ],
    ),
  ],
);

export const activities = [
  finite,
  random,
  rectangles,
  localFilesLesson,
  layout,
  review,
];
