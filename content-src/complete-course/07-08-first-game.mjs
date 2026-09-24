import { lesson, S, C } from "./authoring.mjs";
import {
  preview,
  G,
  frameCheck,
  courtMain,
  courtFunction,
  rallySetup,
  rallyDraw,
  heldMovement,
  rallyMain,
  rallyStep,
} from "./game-support.mjs";
const scene = (code, main = courtMain()) => ({
  "main.py": main,
  "game.py": "import pygame\n\n" + code,
});
const rectangleMain = courtMain({
  draw: "pygame.draw.rect(screen, (235, 240, 250), game.make_rect(20, 130, 10, 60))",
});
const eventMain = courtMain({
  setup: "highlight = False",
  events:
    "key = None\nif event.type == pygame.KEYDOWN:\n    key = event.key\nkeep_open, highlight = game.handle_event(event.type, key, highlight)\nif not keep_open:\n    running = False",
  draw: "screen.blit(game.court(640, 400, highlight), (0, 0))",
});
export const activities = [
  lesson(7, 1, {
    runtime: "pygame",
    explanation: [
      "Use an existing Pygame object before defining your own classes. A Rect represents a rectangle; its attributes expose useful positions and sizes. Edit game.py and inspect the preview.",
      "Gebruik een bestaand Pygame-object voordat je eigen klassen definieert. Een Rect stelt een rechthoek voor; attributen geven bruikbare posities en afmetingen. Bewerk game.py en bekijk het voorbeeld.",
    ],
    sections: [
      S(
        "pygame-objects attributes rect coordinates",
        [
          "An object with named information",
          "Een object met benoemde informatie",
        ],
        [
          "pygame.Rect(x, y, width, height) stores an integer rectangle. x increases rightward, y downward; (0, 0) is the top-left of the screen. rect.left, rect.right, rect.top, rect.bottom and rect.center describe the same rectangle. Changing rect.center moves it while preserving its size. These attributes belong to an existing object, not a dictionary.",
          "pygame.Rect(x, y, width, height) bewaart een geheeltallige rechthoek. x neemt naar rechts toe, y naar beneden; (0, 0) is linksboven op het scherm. rect.left, rect.right, rect.top, rect.bottom en rect.center beschrijven dezelfde rechthoek. rect.center wijzigen verplaatst die zonder de grootte te veranderen. Deze attributen horen bij een bestaand object, niet bij een dictionary.",
        ],
        "import pygame\nbox = pygame.Rect(10, 20, 30, 40)\nprint(box.right, box.bottom)\nbox.center = (100, 100)\nprint(box.left, box.top)",
        "40 60\n85 80\n",
        [
          "Why is bottom 60 instead of 40?",
          "Waarom is bottom 60 in plaats van 40?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def make_rect(x, y, width, height):\n    return pygame.Rect(0, 0, 20, 20)\n",
      rectangleMain,
    ),
    solution: scene(
      "def make_rect(x, y, width, height):\n    return pygame.Rect(x, y, width, height)\n",
      rectangleMain,
    ),
    tasks: [
      C(
        "pygame-objects rect",
        [
          "Return a pygame.Rect with the requested x, y, width and height from make_rect.",
          "Geef een pygame.Rect met de gevraagde x, y, width en height terug vanuit make_rect.",
        ],
        frameCheck,
        [
          [
            "Create a rectangle from the arguments.",
            "Maak een rechthoek van de argumenten.",
          ],
          [
            "Return the object, not a printed description.",
            "Geef het object terug, geen afgedrukte beschrijving.",
          ],
          [
            "return pygame.Rect(x, y, width, height)",
            "return pygame.Rect(x, y, width, height)",
          ],
        ],
        [
          "Check both position and size for a different call.",
          "Controleer positie én afmeting voor een andere aanroep.",
        ],
        [
          G(
            "make_rect",
            [3, 7, 9, 12],
            'isinstance(_return,__import__("pygame").Rect) and tuple(_return) == (3,7,9,12)',
          ),
        ],
      ),
      C(
        "attributes coordinates",
        [
          "Preserve edge and centre relationships. Run the preview and finish normally to check.",
          "Behoud de relaties tussen randen en middelpunt. Voer het voorbeeld uit en rond normaal af om te controleren.",
        ],
        frameCheck,
        [
          [
            "Edges are derived from position plus size.",
            "Randen zijn afgeleid van positie plus grootte.",
          ],
          [
            "Use the supplied arguments even for negative positions.",
            "Gebruik de argumenten ook bij negatieve posities.",
          ],
          [
            "A rectangle at x=-5 with width=20 has right=15.",
            "Een rechthoek op x=-5 met width=20 heeft right=15.",
          ],
        ],
        [
          "Do not replace an object with a tuple that only looks similar when printed.",
          "Vervang een object niet door een tuple die er alleen bij afdrukken hetzelfde uitziet.",
        ],
        [
          G(
            "make_rect",
            [-5, 2, 20, 10],
            "_return.right == 15 and _return.bottom == 12 and _return.center == (5,7)",
          ),
        ],
      ),
    ],
    note: [
      "The constructor receives all four arguments, so its derived attributes stay consistent. Pygame handles the object’s details; your function supplies the geometry.",
      "De constructor ontvangt alle vier argumenten, zodat afgeleide attributen consistent blijven. Pygame regelt de objectdetails; jouw functie levert de geometrie.",
    ],
    experiment: [
      "Change the preview’s x and y arguments separately. Explain which direction each change moves the paddle. Restore them before checking.",
      "Wijzig de x- en y-argumenten van het voorbeeld apart. Leg uit in welke richting elke wijziging het batje verplaatst. Herstel ze vóór controleren.",
    ],
  }),
  lesson(7, 2, {
    runtime: "pygame",
    explanation: [
      "Build an image on a Surface and return it to the supplied display loop. The order of drawing determines what remains visible.",
      "Bouw een afbeelding op een Surface en geef die terug aan de meegeleverde schermlus. De tekenvolgorde bepaalt wat zichtbaar blijft.",
    ],
    sections: [
      S(
        "surface colours drawing-order",
        ["Paint the background first", "Teken eerst de achtergrond"],
        [
          "A Surface is an image in memory. fill paints the whole image; pygame.draw.rect paints a region. RGB tuples contain red, green and blue values from 0 to 255. get_at returns a colour with red, green, blue and alpha components; indexes 0, 1 and 2 inspect RGB. A later drawing operation covers earlier pixels. The supplied loop blits your image onto the window and flips the display.",
          "Een Surface is een afbeelding in het geheugen. fill kleurt de hele afbeelding; pygame.draw.rect kleurt een gebied. RGB-tuples bevatten rood, groen en blauw van 0 tot 255. get_at geeft een kleur met rood, groen, blauw en alpha; indexen 0, 1 en 2 bekijken RGB. Een latere tekenbewerking bedekt eerdere pixels. De meegeleverde lus kopieert je afbeelding naar het venster en ververst het scherm.",
        ],
        "import pygame\ncanvas = pygame.Surface((20, 10))\ncanvas.fill((0, 0, 80))\npygame.draw.rect(canvas, (255, 200, 0), (2, 2, 5, 4))\npixel = canvas.get_at((3, 3))\nprint((pixel[0], pixel[1], pixel[2]))",
        "(255, 200, 0)\n",
        [
          "What colour would remain if fill ran last?",
          "Welke kleur zou overblijven als fill als laatste werd uitgevoerd?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def court(width, height, highlight=False):\n    canvas = pygame.Surface((width, height))\n    pygame.draw.rect(canvas, (235, 240, 250), (20, 20, 10, 60))\n    canvas.fill((16, 23, 39))\n    return canvas\n",
    ),
    solution: scene(
      "def court(width, height, highlight=False):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    pygame.draw.rect(canvas, (235, 240, 250), (20, 20, 10, 60))\n    return canvas\n",
    ),
    tasks: [
      C(
        "surface colours",
        [
          "Return a new Surface of the requested dimensions with background (16, 23, 39).",
          "Geef een nieuwe Surface met de gevraagde afmetingen en achtergrond (16, 23, 39) terug.",
        ],
        frameCheck,
        [
          [
            "Use a canvas sized from the parameters.",
            "Gebruik een canvas met de afmetingen uit de parameters.",
          ],
          [
            "Fill it before drawing the paddle.",
            "Vul het voordat je het batje tekent.",
          ],
          ["canvas.fill((16, 23, 39))", "canvas.fill((16, 23, 39))"],
        ],
        [
          "Check the background corner as well as the image size.",
          "Controleer de achtergrondhoek én de afbeeldingsgrootte.",
        ],
        [
          G(
            "court",
            [180, 120],
            "_return.get_size() == (180,120) and tuple(_return.get_at((0,0)))[:3] == (16,23,39)",
          ),
          G(
            "court",
            [200, 150],
            '_return is not __import__("game").court(200,150)',
          ),
        ],
      ),
      C(
        "drawing-order",
        [
          "Repair the drawing order so the light rectangle at (20, 20, 10, 60) remains visible.",
          "Herstel de tekenvolgorde zodat de lichte rechthoek op (20, 20, 10, 60) zichtbaar blijft.",
        ],
        frameCheck,
        [
          [
            "Later paint covers earlier paint.",
            "Latere verf bedekt eerdere verf.",
          ],
          ["Move fill above draw.rect.", "Verplaats fill boven draw.rect."],
          [
            "pygame.draw.rect(canvas, (235, 240, 250), (20, 20, 10, 60))",
            "pygame.draw.rect(canvas, (235, 240, 250), (20, 20, 10, 60))",
          ],
        ],
        [
          "A valid Surface alone does not prove the foreground is visible.",
          "Alleen een geldige Surface bewijst niet dat de voorgrond zichtbaar is.",
        ],
        [
          G(
            "court",
            [180, 120],
            "tuple(_return.get_at((25,40)))[:3] == (235,240,250) and tuple(_return.get_at((35,40)))[:3] == (16,23,39)",
          ),
        ],
      ),
    ],
    note: [
      "Filling first establishes the background. The later rectangle modifies just its region, so both the background and paddle survive.",
      "Eerst vullen maakt de achtergrond. De latere rechthoek wijzigt alleen zijn gebied, zodat achtergrond en batje behouden blijven.",
    ],
    experiment: [
      "Add a differently coloured overlapping rectangle. Predict the overlap colour from the draw order, then verify visually.",
      "Voeg een overlappende rechthoek met een andere kleur toe. Voorspel de overlappingskleur uit de tekenvolgorde en controleer visueel.",
    ],
  }),
  lesson(7, 3, {
    runtime: "pygame",
    explanation: [
      "Respond once to a keyboard event and handle a close request. The supplied loop reads the event queue; your helper decides the response.",
      "Reageer één keer op een toetsenbordgebeurtenis en handel een sluitverzoek af. De meegeleverde lus leest de gebeurtenissen; jouw helper bepaalt de reactie.",
    ],
    sections: [
      S(
        "events close-event key-events browser-loop",
        ["Events describe changes", "Gebeurtenissen beschrijven veranderingen"],
        [
          "pygame.event.get() removes queued events. A QUIT event asks the program to close. KEYDOWN indicates a key press and has a key attribute; other event types may not. Compare event.type before reading event.key. The browser loop yields with await so events and rendering can proceed. Keep that supplied line.",
          "pygame.event.get() haalt wachtende gebeurtenissen op. Een QUIT-gebeurtenis vraagt het programma te sluiten. KEYDOWN betekent een toetsaanslag en heeft een key-attribuut; andere gebeurtenistypes mogelijk niet. Vergelijk event.type voordat je event.key leest. De browserlus geeft met await ruimte zodat gebeurtenissen en tekenen doorgaan. Behoud die meegeleverde regel.",
        ],
        "import pygame\ntype_id = pygame.KEYDOWN\nkey = pygame.K_SPACE\nprint(type_id == pygame.KEYDOWN and key == pygame.K_SPACE)",
        "True\n",
        [
          "Why should key not be read for every event type?",
          "Waarom moet key niet bij elk gebeurtenistype worden gelezen?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def handle_event(type_id, key, highlight):\n    return True, highlight\n\n" +
        courtFunction,
      eventMain,
    ),
    solution: scene(
      "def handle_event(type_id, key, highlight):\n    if type_id == pygame.QUIT:\n        return False, highlight\n    if type_id == pygame.KEYDOWN:\n        if key == pygame.K_ESCAPE:\n            return False, highlight\n        if key == pygame.K_SPACE:\n            return True, not highlight\n    return True, highlight\n\n" +
        courtFunction,
      eventMain,
    ),
    tasks: [
      C(
        "events close-event",
        [
          "Return (False, highlight) on QUIT or Escape KEYDOWN; otherwise keep running.",
          "Geef (False, highlight) terug bij QUIT of Escape KEYDOWN; blijf anders actief.",
        ],
        frameCheck,
        [
          [
            "Return running state and highlight as a pair.",
            "Geef actiefstatus en highlight als paar terug.",
          ],
          [
            "Check QUIT independently from key events.",
            "Controleer QUIT los van toetsgebeurtenissen.",
          ],
          [
            "if type_id == pygame.QUIT:\n    return False, highlight",
            "if type_id == pygame.QUIT:\n    return False, highlight",
          ],
        ],
        [
          "A close request must leave the loop; unrelated events must not close it.",
          "Een sluitverzoek moet de lus verlaten; niet-gerelateerde gebeurtenissen mogen die niet sluiten.",
        ],
        [
          {
            moduleOnly: true,
            check:
              '__import__("game").handle_event(__import__("pygame").QUIT,None,True) == (False,True)',
          },
          {
            moduleOnly: true,
            check:
              '__import__("game").handle_event(__import__("pygame").KEYDOWN,__import__("pygame").K_ESCAPE,False) == (False,False)',
          },
        ],
      ),
      C(
        "key-events browser-loop",
        [
          "Toggle highlight on Space KEYDOWN only. Preserve it for KEYUP and unrelated events; observe the change in the running preview.",
          "Wissel highlight alleen bij Space KEYDOWN. Behoud het bij KEYUP en niet-gerelateerde gebeurtenissen; bekijk de wijziging in het actieve voorbeeld.",
        ],
        frameCheck,
        [
          [
            "A toggle reverses a Boolean once.",
            "Een wissel keert een boolean één keer om.",
          ],
          [
            "Check both the event type and the key.",
            "Controleer zowel gebeurtenistype als toets.",
          ],
          ["return True, not highlight", "return True, not highlight"],
        ],
        [
          "Releasing Space should not toggle a second time.",
          "Space loslaten mag niet opnieuw wisselen.",
        ],
        [
          {
            moduleOnly: true,
            check:
              '__import__("game").handle_event(__import__("pygame").KEYDOWN,__import__("pygame").K_SPACE,False) == (True,True)',
          },
          {
            moduleOnly: true,
            check:
              '__import__("game").handle_event(__import__("pygame").KEYUP,__import__("pygame").K_SPACE,True) == (True,True)',
          },
          G("handle_event", [0, null, false], "_return == (True,False)"),
        ],
      ),
    ],
    note: [
      "A guarded key branch avoids treating every event as a keyboard event. The returned running flag and highlight value have separate roles.",
      "Een afgeschermde toetstak voorkomt dat elke gebeurtenis als toetsenbordgebeurtenis wordt behandeld. De teruggegeven actiefstatus en highlight hebben aparte rollen.",
    ],
    experiment: [
      "Press Space, release it, then press again. Click outside and return focus. Finish normally, Run again, then practise Stop.",
      "Druk Space in, laat los en druk opnieuw. Klik buiten het voorbeeld en keer terug. Rond normaal af, voer opnieuw uit en oefen daarna Stop.",
    ],
  }),
  lesson(7, 4, {
    runtime: "pygame",
    explanation: [
      "Build an interactive court image from a brief. Keep the supplied event handling and browser entry point; design only court(width, height, highlight). Use dimensions of at least 100 × 100.",
      "Bouw een interactief speelveld uit een beschrijving. Behoud gebeurtenisafhandeling en browserstartpunt; ontwerp alleen court(width, height, highlight). Gebruik afmetingen van minstens 100 × 100.",
    ],
    sections: [
      S(
        "scene-review",
        ["Anchor geometry to the size", "Koppel geometrie aan de afmetingen"],
        [
          "A reusable scene computes positions from width and height. Use a background first, then foreground objects. For this court, put 10 × 60 paddles at x=20 and x=width-30, both vertically centred. Put a 6 × 6 square at the centre. White is (235, 240, 250); orange is (255, 170, 40).",
          "Een herbruikbare scène berekent posities uit width en height. Teken eerst de achtergrond en daarna voorgrondobjecten. Zet voor dit veld batjes van 10 × 60 op x=20 en x=width-30, beide verticaal gecentreerd. Zet een vierkant van 6 × 6 in het midden. Wit is (235, 240, 250); oranje is (255, 170, 40).",
        ],
        "width, height = 200, 120\nprint(width // 2, height // 2)",
        "100 60\n",
        [
          "How do the coordinates change for a taller court?",
          "Hoe veranderen de coördinaten bij een hoger veld?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def court(width, height, highlight=False):\n    canvas = pygame.Surface((width, height))\n    return canvas\n",
      courtMain({
        setup: "highlight = False",
        events:
          "if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:\n    highlight = not highlight",
        draw: "screen.blit(game.court(640, 400, highlight), (0, 0))",
      }),
    ),
    solution: scene(
      courtFunction.replace(
        "colour = (255, 170, 40) if highlight else (235, 240, 250)",
        "colour = (235, 240, 250)\n    if highlight:\n        colour = (255, 170, 40)",
      ),
      courtMain({
        setup: "highlight = False",
        events:
          "if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:\n    highlight = not highlight",
        draw: "screen.blit(game.court(640, 400, highlight), (0, 0))",
      }),
    ),
    tasks: [
      C(
        "scene-review",
        [
          "Return the requested Surface with dark blue background and both white paddles positioned from its size.",
          "Geef de gevraagde Surface met donkerblauwe achtergrond en beide witte batjes op posities uit de afmetingen terug.",
        ],
        frameCheck,
        [
          [
            "Reuse the scene and Rect lessons.",
            "Hergebruik de lessen over scènes en Rect.",
          ],
          [
            "The top of a centred 60-pixel paddle is height // 2 - 30.",
            "De bovenkant van een gecentreerd batje van 60 pixels is height // 2 - 30.",
          ],
          [
            "pygame.draw.rect(canvas, (235, 240, 250), (width - 30, height // 2 - 30, 10, 60))",
            "pygame.draw.rect(canvas, (235, 240, 250), (width - 30, height // 2 - 30, 10, 60))",
          ],
        ],
        [
          "Check two court sizes and both paddle positions.",
          "Controleer twee veldafmetingen en beide batjesposities.",
        ],
        [
          G(
            "court",
            [200, 120, false],
            "_return.get_size() == (200,120) and tuple(_return.get_at((0,0)))[:3] == (16,23,39) and tuple(_return.get_at((25,60)))[:3] == (235,240,250) and tuple(_return.get_at((175,60)))[:3] == (235,240,250)",
          ),
          G(
            "court",
            [300, 200, false],
            "tuple(_return.get_at((275,100)))[:3] == (235,240,250)",
          ),
        ],
      ),
      C(
        "scene-review",
        [
          "Draw the centred square white normally and orange when highlight is True. Test Space in the preview.",
          "Teken het gecentreerde vierkant normaal wit en oranje wanneer highlight True is. Test Space in het voorbeeld.",
        ],
        frameCheck,
        [
          [
            "The Boolean chooses a colour, not a new position.",
            "De boolean kiest een kleur, geen nieuwe positie.",
          ],
          [
            "Choose colour before drawing the centre square.",
            "Kies colour voordat je het middelste vierkant tekent.",
          ],
          [
            "if highlight:\n    colour = (255, 170, 40)",
            "if highlight:\n    colour = (255, 170, 40)",
          ],
        ],
        [
          "Both highlight states must preserve the court and paddles.",
          "Beide highlight-toestanden moeten veld en batjes behouden.",
        ],
        [
          G(
            "court",
            [200, 120, true],
            "tuple(_return.get_at((100,60)))[:3] == (255,170,40)",
          ),
          G(
            "court",
            [200, 120, false],
            "tuple(_return.get_at((100,60)))[:3] == (235,240,250)",
          ),
        ],
      ),
    ],
    note: [
      "Geometry depends on parameters rather than the preview’s fixed size. One Boolean selects the centre colour; supplied event code changes that Boolean.",
      "De geometrie hangt van parameters af in plaats van de vaste voorbeeldgrootte. Eén boolean kiest de middenkleur; meegeleverde gebeurteniscode verandert die boolean.",
    ],
    experiment: [
      "Try a wider and a taller court in the caller. Predict the paddle and centre positions, then restore 640 × 400.",
      "Probeer een breder en een hoger veld in de aanroeper. Voorspel de posities van batjes en midden en herstel daarna 640 × 400.",
    ],
  }),
  lesson(8, 1, {
    runtime: "pygame",
    explanation: [
      "Convert velocity into movement using elapsed time. Keep positions as floats so small movements accumulate smoothly; the supplied renderer converts only when drawing.",
      "Zet snelheid om in beweging met verstreken tijd. Houd posities als floats zodat kleine bewegingen vloeiend optellen; de meegeleverde tekenaar zet alleen bij het tekenen om.",
    ],
    sections: [
      S(
        "velocity elapsed-time",
        ["Pixels per second", "Pixels per seconde"],
        [
          "Velocity says how far a position changes per second. Multiply by dt in seconds to obtain this frame’s displacement. Add that displacement to the old position. A negative velocity moves in the opposite direction. Rounding every step loses small movements.",
          "Snelheid zegt hoeveel een positie per seconde verandert. Vermenigvuldig met dt in seconden voor de verplaatsing in dit beeld. Tel die verplaatsing bij de oude positie op. Een negatieve snelheid beweegt in de tegengestelde richting. Elke stap afronden verliest kleine bewegingen.",
        ],
        "position = 10.0\nvelocity = 80.0\ndt = 0.25\nprint(position + velocity * dt)",
        "30.0\n",
        [
          "What happens when dt is zero or velocity is negative?",
          "Wat gebeurt er als dt nul of snelheid negatief is?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def advance(position, velocity, dt):\n    return position\n",
      courtMain({
        setup: rallySetup,
        frame: "x = game.advance(x, vx, dt)\nif x > 640:\n    x = 0",
        draw: rallyDraw,
      }),
    ),
    solution: scene(
      "def advance(position, velocity, dt):\n    return position + velocity * dt\n",
      courtMain({
        setup: rallySetup,
        frame: "x = game.advance(x, vx, dt)\nif x > 640:\n    x = 0",
        draw: rallyDraw,
      }),
    ),
    tasks: [
      C(
        "velocity",
        [
          "Return the new position from position + velocity * dt in advance.",
          "Geef de nieuwe positie uit position + velocity * dt terug in advance.",
        ],
        frameCheck,
        [
          [
            "Multiply rate by duration.",
            "Vermenigvuldig snelheid met tijdsduur.",
          ],
          [
            "Add displacement to the existing position.",
            "Tel de verplaatsing bij de bestaande positie op.",
          ],
          [
            "return position + velocity * dt",
            "return position + velocity * dt",
          ],
        ],
        [
          "A movement calculation needs the old position as well as the displacement.",
          "Een bewegingsberekening heeft de oude positie én de verplaatsing nodig.",
        ],
        [
          G("advance", [10, 80, 0.25], "_return == 30"),
          G("advance", [10, -80, 0.25], "_return == -10"),
        ],
      ),
      C(
        "elapsed-time",
        [
          "Preserve fractional movement and leave the position unchanged for dt=0. Watch the moving ball.",
          "Behoud beweging met decimalen en laat de positie ongewijzigd bij dt=0. Bekijk de bewegende bal.",
        ],
        frameCheck,
        [
          [
            "Do not round the simulated position.",
            "Rond de gesimuleerde positie niet af.",
          ],
          [
            "Let the drawing code decide how to display it.",
            "Laat de tekencode beslissen hoe die wordt getoond.",
          ],
          [
            "A 0.1-second step at 0.5 pixels/second moves 0.05 pixels.",
            "Een stap van 0.1 seconde bij 0.5 pixels/seconde verplaatst 0.05 pixels.",
          ],
        ],
        [
          "Small valid steps must not vanish through integer conversion.",
          "Kleine geldige stappen mogen niet verdwijnen door omzetting naar int.",
        ],
        [
          G("advance", [1, 0.5, 0.1], "_close(_return,1.05)"),
          G("advance", [3, 7, 0], "_return == 3"),
        ],
      ),
    ],
    note: [
      "Multiplication by dt makes speed independent of the number of frames. The renderer can use int(x) without discarding the stored fractional position.",
      "Vermenigvuldigen met dt maakt snelheid onafhankelijk van het aantal beelden. De tekenaar kan int(x) gebruiken zonder de opgeslagen fractie te verliezen.",
    ],
    experiment: [
      "Compare two 0.1-second updates with one 0.2-second update. They should reach the same position at constant velocity.",
      "Vergelijk twee updates van 0.1 seconde met één update van 0.2 seconde. Ze moeten bij constante snelheid dezelfde positie bereiken.",
    ],
  }),
  lesson(8, 2, {
    runtime: "pygame",
    explanation: [
      "Held-key state supports continuous movement. Use independent controls for both paddles; opposite directions pressed together should cancel.",
      "Ingedrukte-toetsstatus ondersteunt doorlopende beweging. Gebruik onafhankelijke besturing voor beide batjes; tegengestelde richtingen tegelijk moeten elkaar opheffen.",
    ],
    sections: [
      S(
        "held-keys simultaneous-controls",
        [
          "A state is different from an event",
          "Een toestand verschilt van een gebeurtenis",
        ],
        [
          "KEYDOWN describes a press. pygame.key.get_pressed() reports which keys are currently held, so the loop can move every frame. Use separate if checks for up and down: an elif would give one direction priority when both are held. The supplied caller checks W/S and Up/Down separately.",
          "KEYDOWN beschrijft een aanslag. pygame.key.get_pressed() meldt welke toetsen nu ingedrukt zijn, zodat de lus elk beeld kan bewegen. Gebruik aparte if-controles voor omhoog en omlaag: elif zou één richting voorrang geven als beide ingedrukt zijn. De meegeleverde aanroeper controleert W/S en Omhoog/Omlaag apart.",
        ],
        "y = 50\nup, down = True, True\nif up:\n    y -= 5\nif down:\n    y += 5\nprint(y)",
        "50\n",
        [
          "Why does the paddle stay still when both are True?",
          "Waarom blijft het batje stil als beide True zijn?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def paddle_y(y, up, down, speed, dt):\n    return y\n",
      courtMain({
        setup: rallySetup,
        frame:
          "left_y = game.paddle_y(left_y, keys[pygame.K_w], keys[pygame.K_s], 240, dt)\nright_y = game.paddle_y(right_y, keys[pygame.K_UP], keys[pygame.K_DOWN], 240, dt)",
        draw: rallyDraw,
      }),
    ),
    solution: scene(
      "def paddle_y(y, up, down, speed, dt):\n    if up:\n        y -= speed * dt\n    if down:\n        y += speed * dt\n    return y\n",
      courtMain({
        setup: rallySetup,
        frame:
          "left_y = game.paddle_y(left_y, keys[pygame.K_w], keys[pygame.K_s], 240, dt)\nright_y = game.paddle_y(right_y, keys[pygame.K_UP], keys[pygame.K_DOWN], 240, dt)",
        draw: rallyDraw,
      }),
    ),
    tasks: [
      C(
        "held-keys",
        [
          "Move y up or down by speed * dt when that direction is held. Return the new y.",
          "Verplaats y omhoog of omlaag met speed * dt als die richting ingedrukt is. Geef de nieuwe y terug.",
        ],
        frameCheck,
        [
          ["Screen y grows downward.", "Scherm-y neemt naar beneden toe."],
          [
            "Subtract for up, add for down.",
            "Trek af voor omhoog, tel op voor omlaag.",
          ],
          ["if up:\n    y -= speed * dt", "if up:\n    y -= speed * dt"],
        ],
        [
          "Use both speed and elapsed time.",
          "Gebruik zowel snelheid als verstreken tijd.",
        ],
        [
          G("paddle_y", [50, true, false, 100, 0.1], "_return == 40"),
          G("paddle_y", [50, false, true, 100, 0.1], "_return == 60"),
        ],
      ),
      C(
        "simultaneous-controls",
        [
          "Keep y unchanged when neither or both directions are held. Test both paddles simultaneously.",
          "Houd y gelijk als geen of beide richtingen ingedrukt zijn. Test beide batjes tegelijkertijd.",
        ],
        frameCheck,
        [
          [
            "Opposite updates can cancel.",
            "Tegengestelde updates kunnen elkaar opheffen.",
          ],
          [
            "Use two independent if statements.",
            "Gebruik twee onafhankelijke if-opdrachten.",
          ],
          ["if down:\n    y += speed * dt", "if down:\n    y += speed * dt"],
        ],
        [
          "An if/elif gives priority to one direction instead of cancelling.",
          "Een if/elif geeft één richting voorrang in plaats van opheffen.",
        ],
        [
          G("paddle_y", [50, true, true, 100, 0.1], "_return == 50"),
          G("paddle_y", [50, false, false, 100, 0.1], "_return == 50"),
        ],
      ),
    ],
    note: [
      "Independent conditions model independent controls. Both players can move in the same frame, and a player’s opposite inputs cancel.",
      "Onafhankelijke voorwaarden modelleren onafhankelijke besturing. Beide spelers kunnen in hetzelfde beeld bewegen en tegengestelde invoer van één speler heft elkaar op.",
    ],
    experiment: [
      "Hold W and Down together, then W and S together. Explain the different outcomes. Leave the court if needed; boundaries are the next lesson.",
      "Houd W en Omlaag samen ingedrukt en daarna W en S. Leg de verschillende uitkomsten uit. Buiten het veld bewegen kan hier nog; grenzen komen in de volgende les.",
    ],
  }),
  lesson(8, 3, {
    runtime: "pygame",
    explanation: [
      "Clamp a paddle’s top position so its whole rectangle stays on the court. The maximum top position depends on the paddle height.",
      "Begrens de bovenkant van een batje zodat de hele rechthoek binnen het veld blijft. De maximale bovenpositie hangt af van de batjeshoogte.",
    ],
    sections: [
      S(
        "boundaries",
        ["Respect the whole object", "Respecteer het hele object"],
        [
          "For a court of height H and a paddle of height h, valid top positions run from 0 through H-h. Comparing only with H allows the bottom to disappear. You can express clamping with if/elif or with the built-in min and max functions, which choose the smaller and larger values.",
          "Voor een veldhoogte H en batjeshoogte h lopen geldige bovenposities van 0 tot en met H-h. Alleen met H vergelijken laat de onderkant verdwijnen. Begrenzen kan met if/elif of met de ingebouwde min- en max-functies, die de kleinste en grootste waarde kiezen.",
        ],
        "court_height = 120\npaddle_height = 30\nprint(court_height - paddle_height)\nprint(max(0, min(90, 110)))",
        "90\n90\n",
        [
          "Which part of the rectangle does y describe?",
          "Welk deel van de rechthoek beschrijft y?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def clamp_y(y, paddle_height, court_height):\n    return y\n",
      courtMain({
        setup: rallySetup,
        frame: heldMovement
          .replaceAll(
            "max(0, min(340, left_y))",
            "game.clamp_y(left_y, 60, 400)",
          )
          .replaceAll(
            "max(0, min(340, right_y))",
            "game.clamp_y(right_y, 60, 400)",
          ),
        draw: rallyDraw,
      }),
    ),
    solution: scene(
      "def clamp_y(y, paddle_height, court_height):\n    if y < 0:\n        return 0\n    if y > court_height - paddle_height:\n        return court_height - paddle_height\n    return y\n",
      courtMain({
        setup: rallySetup,
        frame: heldMovement
          .replaceAll(
            "max(0, min(340, left_y))",
            "game.clamp_y(left_y, 60, 400)",
          )
          .replaceAll(
            "max(0, min(340, right_y))",
            "game.clamp_y(right_y, 60, 400)",
          ),
        draw: rallyDraw,
      }),
    ),
    tasks: [
      C(
        "boundaries",
        [
          "Clamp below-zero and too-large y values into 0..court_height-paddle_height. Assume 0 < paddle_height <= court_height.",
          "Begrens negatieve en te grote y-waarden tot 0..court_height-paddle_height. Ga uit van 0 < paddle_height <= court_height.",
        ],
        frameCheck,
        [
          [
            "Use the paddle’s top as the coordinate.",
            "Gebruik de bovenkant van het batje als coördinaat.",
          ],
          [
            "Subtract paddle height from court height for the upper limit.",
            "Trek de batjeshoogte van de veldhoogte af voor de bovengrens.",
          ],
          [
            "return court_height - paddle_height",
            "return court_height - paddle_height",
          ],
        ],
        [
          "The whole paddle must stay visible at the bottom.",
          "Het hele batje moet onderaan zichtbaar blijven.",
        ],
        [
          G("clamp_y", [-5, 20, 100], "_return == 0"),
          G("clamp_y", [95, 20, 100], "_return == 80"),
          G("clamp_y", [10, 100, 100], "_return == 0"),
        ],
      ),
      C(
        "boundaries",
        [
          "Preserve valid positions, including fractional values and the exact boundaries.",
          "Behoud geldige posities, inclusief decimalen en exacte grenzen.",
        ],
        frameCheck,
        [
          ["Clamping is not rounding.", "Begrenzen is geen afronden."],
          [
            "Return y unchanged if it is already valid.",
            "Geef y ongewijzigd terug als die al geldig is.",
          ],
          ["return y", "return y"],
        ],
        [
          "Do not move an already valid paddle or truncate its fractional position.",
          "Verplaats een geldig batje niet en kap de fractie van zijn positie niet af.",
        ],
        [
          G("clamp_y", [2.5, 20, 100], "_return == 2.5"),
          G("clamp_y", [80, 20, 100], "_return == 80"),
        ],
      ),
    ],
    note: [
      "The lower and upper checks handle out-of-bounds values. The remaining path returns the original value, preserving smooth movement.",
      "De onder- en bovencontrole behandelen waarden buiten bereik. De overige route geeft de oorspronkelijke waarde terug en behoudt vloeiende beweging.",
    ],
    experiment: [
      "Make the paddle taller in a temporary call. Predict how much its maximum top position shrinks. Hold both paddles against both edges in the preview.",
      "Maak het batje hoger in een tijdelijke aanroep. Voorspel hoeveel de maximale bovenpositie krimpt. Houd beide batjes tegen beide randen in het voorbeeld.",
    ],
  }),
  lesson(8, 4, {
    runtime: "pygame",
    explanation: [
      "Repair a repeated wall bounce and use Pygame’s collision tool for a paddle. Contact alone does not tell you whether an object is approaching or already moving away.",
      "Repareer een herhaalde muurbotsing en gebruik Pygames botsingshulpmiddel voor een batje. Contact alleen zegt niet of een object nadert of al weg beweegt.",
    ],
    sections: [
      S(
        "wall-bounce paddle-contact",
        ["Test position and direction", "Test positie en richting"],
        [
          "A ball centre must stay at least radius from each wall. At the top, only a negative vy approaches the wall. Correct the position to radius and reverse vy once. Rect.colliderect(other) reports overlap; touching edges alone is not overlap. For the left paddle, only a negative vx approaches it. The exercise supplies rectangle geometry as four-item tuples.",
          "Een balmiddelpunt moet minstens radius van elke muur blijven. Boven nadert alleen een negatieve vy de muur. Corrigeer de positie naar radius en keer vy één keer om. Rect.colliderect(other) meldt overlap; alleen rakende randen zijn geen overlap. Bij het linkerbatje nadert alleen een negatieve vx. De oefening levert rechthoekgeometrie als tuples met vier items.",
        ],
        "import pygame\nball = pygame.Rect(25, 30, 12, 12)\npaddle = pygame.Rect(20, 20, 10, 60)\nprint(ball.colliderect(paddle))",
        "True\n",
        [
          "Would reversing velocity on every overlapping frame make a clean bounce?",
          "Zou snelheid bij elk overlappend beeld omkeren een zuivere botsing geven?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def bounce_y(y, vy, radius, height):\n    if y <= radius or y >= height - radius:\n        vy = -vy\n    return y, vy\n\ndef left_contact(ball, paddle, vx):\n    return vx\n",
      courtMain({
        setup: rallySetup,
        frame:
          heldMovement +
          "\nx += vx * dt\ny += vy * dt\ny, vy = game.bounce_y(y, vy, 6, 400)\nvx = game.left_contact((x - 6, y - 6, 12, 12), (20, left_y, 10, 60), vx)\nif x > 630:\n    vx = -abs(vx)\nif x < -6:\n    x = 320",
        draw: rallyDraw,
      }),
    ),
    solution: scene(
      "def bounce_y(y, vy, radius, height):\n    if y <= radius and vy < 0:\n        return radius, -vy\n    if y >= height - radius and vy > 0:\n        return height - radius, -vy\n    return y, vy\n\ndef left_contact(ball, paddle, vx):\n    if pygame.Rect(ball).colliderect(pygame.Rect(paddle)) and vx < 0:\n        return -vx\n    return vx\n",
      courtMain({
        setup: rallySetup,
        frame:
          heldMovement +
          "\nx += vx * dt\ny += vy * dt\ny, vy = game.bounce_y(y, vy, 6, 400)\nvx = game.left_contact((x - 6, y - 6, 12, 12), (20, left_y, 10, 60), vx)\nif x > 630:\n    vx = -abs(vx)\nif x < -6:\n    x = 320",
        draw: rallyDraw,
      }),
    ),
    tasks: [
      C(
        "wall-bounce",
        [
          "Correct y and reverse vy only when approaching an upper or lower wall. Return (y, vy).",
          "Corrigeer y en keer vy alleen om bij het naderen van de boven- of ondermuur. Geef (y, vy) terug.",
        ],
        frameCheck,
        [
          [
            "Use both an edge test and a direction test.",
            "Gebruik zowel een randtest als een richtingstest.",
          ],
          [
            "At the top, approaching means vy < 0.",
            "Boven betekent naderen vy < 0.",
          ],
          [
            "if y <= radius and vy < 0:\n    return radius, -vy",
            "if y <= radius and vy < 0:\n    return radius, -vy",
          ],
        ],
        [
          "A ball already moving inward must keep its direction.",
          "Een bal die al naar binnen beweegt moet zijn richting behouden.",
        ],
        [
          G("bounce_y", [2, -80, 6, 100], "_return == (6,80)"),
          G("bounce_y", [98, 80, 6, 100], "_return == (94,-80)"),
          G("bounce_y", [6, 80, 6, 100], "_return == (6,80)"),
        ],
      ),
      C(
        "paddle-contact",
        [
          "In left_contact, reverse negative vx only when the two Rects overlap. Preserve vx otherwise.",
          "Keer in left_contact negatieve vx alleen om wanneer de twee Rects overlappen. Behoud vx anders.",
        ],
        frameCheck,
        [
          [
            "Pygame can do the overlap geometry.",
            "Pygame kan de overlapgeometrie bepalen.",
          ],
          [
            "Combine colliderect with vx < 0.",
            "Combineer colliderect met vx < 0.",
          ],
          [
            "pygame.Rect(ball).colliderect(pygame.Rect(paddle))",
            "pygame.Rect(ball).colliderect(pygame.Rect(paddle))",
          ],
        ],
        [
          "Overlap without approach must not bounce again.",
          "Overlap zonder naderen mag niet opnieuw botsen.",
        ],
        [
          G(
            "left_contact",
            [[25, 30, 12, 12], [20, 20, 10, 60], -100],
            "_return == 100",
          ),
          G(
            "left_contact",
            [[25, 30, 12, 12], [20, 20, 10, 60], 100],
            "_return == 100",
          ),
          G(
            "left_contact",
            [[40, 30, 12, 12], [20, 20, 10, 60], -100],
            "_return == -100",
          ),
        ],
      ),
    ],
    note: [
      "The wall helper corrects both penetration and direction. The paddle helper delegates overlap to Rect and checks approach, preventing repeated reversals while contact remains.",
      "De muurhelper corrigeert zowel doordringing als richting. De batjeshelper laat Rect overlap bepalen en controleert naderen, zodat contact niet herhaaldelijk omkeert.",
    ],
    experiment: [
      "Call bounce_y twice at a wall, passing its first returned pair into the second call. Explain why the second call must not undo the bounce.",
      "Roep bounce_y twee keer bij een muur aan en geef het eerste teruggegeven paar aan de tweede aanroep. Leg uit waarom de tweede de botsing niet mag terugdraaien.",
    ],
  }),
  lesson(8, 5, {
    runtime: "pygame",
    explanation: [
      "Combine known behaviours into one playable rally. The court is 640 × 400; the ball radius is 6. The caller handles paddle controls and drawing. Your step function returns (x, y, vx, vy). No scoring or classes are needed yet.",
      "Combineer bekende gedragingen tot één speelbare rally. Het veld is 640 × 400; de balstraal is 6. De aanroeper regelt batjesbesturing en tekenen. Jouw step-functie geeft (x, y, vx, vy) terug. Score of klassen zijn nog niet nodig.",
    ],
    sections: [
      S(
        "miss-reset rally-review",
        [
          "Give a miss a clear outcome",
          "Geef een misser een duidelijke uitkomst",
        ],
        [
          "Move first, resolve top/bottom walls and paddle overlaps, then check whether the whole ball has left the court. Paddles occupy (20, left_y, 10, 60) and (610, right_y, 10, 60). On a miss (x < -6 or x > 646), reset to (320, 200, 200, 100). Separate a bounced ball from the paddle at x=36 or x=604.",
          "Beweeg eerst, los boven-/ondermuren en batjesoverlap op en controleer daarna of de hele bal buiten het veld is. Batjes staan op (20, left_y, 10, 60) en (610, right_y, 10, 60). Herstart bij een misser (x < -6 of x > 646) naar (320, 200, 200, 100). Zet een teruggekaatste bal los van het batje op x=36 of x=604.",
        ],
        "x = 651\nmissed = x < -6 or x > 646\nprint(missed)",
        "True\n",
        [
          "Why does a centre at x=641 not yet mean the whole ball has left?",
          "Waarom betekent een middelpunt op x=641 nog niet dat de hele bal buiten is?",
        ],
      ),
      preview,
    ],
    starter: scene(
      "def step(x, y, vx, vy, dt, left_y, right_y):\n    # Add movement, walls, paddle contacts and reset.\n    return x, y, vx, vy\n",
      rallyMain,
    ),
    solution: scene(rallyStep, rallyMain),
    tasks: [
      C(
        "rally-review",
        [
          "Update both coordinates with dt, then resolve walls and both paddles using direction-aware responses.",
          "Werk beide coördinaten met dt bij en los daarna muren en beide batjes op met richtingsbewuste reacties.",
        ],
        frameCheck,
        [
          [
            "Reuse the movement and collision rules you just practised.",
            "Hergebruik de bewegings- en botsingsregels die je net oefende.",
          ],
          [
            "Build Rects after moving, then test left and right approaches separately.",
            "Maak Rects na bewegen en test naderen van links en rechts apart.",
          ],
          [
            "if ball.colliderect(right) and vx > 0:\n    x, vx = 604, -vx",
            "if ball.colliderect(right) and vx > 0:\n    x, vx = 604, -vx",
          ],
        ],
        [
          "Check ordinary motion, both walls and both paddle directions.",
          "Controleer gewone beweging, beide muren en beide batjesrichtingen.",
        ],
        [
          G(
            "step",
            [100, 100, 20, 10, 0.5, 170, 170],
            "_return == (110,105,20,10)",
          ),
          G("step", [100, 5, 20, -10, 0, 170, 170], "_return == (100,6,20,10)"),
          G(
            "step",
            [28, 190, -100, 0, 0, 170, 170],
            "_return[0] == 36 and _return[2] == 100",
          ),
          G(
            "step",
            [613, 190, 100, 0, 0, 170, 170],
            "_return[0] == 604 and _return[2] == -100",
          ),
        ],
      ),
      C(
        "miss-reset",
        [
          "Reset after a full miss on either side; keep a partly visible ball in play. Run a rally with both players.",
          "Herstart na een volledige misser aan beide kanten; houd een gedeeltelijk zichtbare bal in het spel. Speel een rally met beide spelers.",
        ],
        frameCheck,
        [
          [
            "Test the centre plus or minus radius.",
            "Test het middelpunt plus of min de straal.",
          ],
          [
            "Return the reset tuple only outside the two miss boundaries.",
            "Geef de herstarttuple alleen buiten beide missergrenzen terug.",
          ],
          [
            "if x < -6 or x > 646:\n    return 320, 200, 200, 100",
            "if x < -6 or x > 646:\n    return 320, 200, 200, 100",
          ],
        ],
        [
          "A left miss and a right miss should both restart.",
          "Een linkse en een rechtse misser moeten beide herstarten.",
        ],
        [
          G(
            "step",
            [-7, 100, -100, 0, 0, 170, 170],
            "_return == (320,200,200,100)",
          ),
          G(
            "step",
            [647, 100, 100, 0, 0, 170, 170],
            "_return == (320,200,200,100)",
          ),
          G(
            "step",
            [642, 100, 100, 0, 0, 170, 170],
            "_return == (642,100,100,0)",
          ),
        ],
      ),
    ],
    note: [
      "The update order keeps a frame understandable. This first game uses discrete overlap checks at modest speeds; very fast balls can skip past a paddle. Later playtesting and collision correction revisit that limitation.",
      "De updatevolgorde houdt een beeld begrijpelijk. Dit eerste spel gebruikt discrete overlapcontroles bij gematigde snelheden; zeer snelle ballen kunnen langs een batje springen. Later keren speltests en botsingscorrectie naar die beperking terug.",
    ],
    experiment: [
      "Test simultaneous controls, top and bottom bounces, each paddle, and a deliberate miss on each side. Record one improvement you want for your own Pong.",
      "Test gelijktijdige besturing, boven- en onderbotsingen, elk batje en een bewuste misser aan beide kanten. Noteer één verbetering voor je eigen Pong.",
    ],
  }),
];
