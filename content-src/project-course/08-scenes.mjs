import { L, section, lesson, quiz, question } from "./authoring.mjs";
import {
  previewSection,
  sceneMain,
  gameTask,
  sceneProbe,
} from "./game-authoring.mjs";

const surface = lesson({
  module: 8,
  number: 1,
  title: L("Your first visible scene", "Je eerste zichtbare scène"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 18,
  explanation: L(
    "Until now, your programs described results with text. A game draws onto a Surface. Repair the scene builder in scene.py, then use the preview to see what the numbers mean. main.py already handles opening, presenting, and closing the window.",
    "Tot nu toe beschreven je programma’s resultaten met tekst. Een spel tekent op een Surface. Repareer de scènebouwer in scene.py en bekijk in het voorbeeld wat de getallen betekenen. main.py regelt al het openen, weergeven en sluiten van het venster.",
  ),
  sections: [
    section(
      L("Pixels need a canvas", "Pixels hebben een canvas nodig"),
      L(
        "pygame.Surface((width, height)) creates an image in memory. fill((red, green, blue)) paints it; each colour channel ranges from 0 to 255. A Surface is not automatically visible. The supplied main program copies it onto the display with blit, then display.flip presents that frame. The builder should return the Surface, not print it.",
        "pygame.Surface((width, height)) maakt een afbeelding in het geheugen. fill((red, green, blue)) kleurt die; elk kleurkanaal loopt van 0 tot 255. Een Surface is niet automatisch zichtbaar. Het meegeleverde hoofdprogramma kopieert die met blit naar het scherm; display.flip toont dat beeld. De bouwer moet de Surface teruggeven, niet afdrukken.",
      ),
      "tile = pygame.Surface((80, 60))\ntile.fill((30, 70, 100))",
    ),
    section(
      L("A reusable size", "Een herbruikbare grootte"),
      L(
        "make_scene(width, height) must work for different positive whole-number sizes, not just the 640 × 400 preview. Use a dark blue background (16, 23, 39). Each call should create an independent Surface; another caller must not overwrite an earlier scene.",
        "make_scene(width, height) moet met verschillende positieve gehele afmetingen werken, niet alleen met het voorbeeld van 640 × 400. Gebruik de donkerblauwe achtergrond (16, 23, 39). Elke aanroep maakt een onafhankelijke Surface; een andere aanroeper mag een eerdere scène niet overschrijven.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": sceneMain(),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height):\n    canvas = pygame.Surface((320, 200))\n    canvas.fill((255, 255, 255))\n    # Give the caller the finished image.\n",
  },
  solution: {
    "main.py": sceneMain(),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    return canvas\n",
  },
  tasks: [
    gameTask(
      L(
        "Return a Surface with the requested width and height. Try swapping the dimensions before restoring the preview.",
        "Geef een Surface met de gevraagde breedte en hoogte terug. Probeer de afmetingen te verwisselen en herstel daarna het voorbeeld.",
      ),
      [
        L(
          "The caller needs the image itself.",
          "De aanroeper heeft de afbeelding zelf nodig.",
        ),
        L(
          "Look at the size tuple and the function’s return value.",
          "Bekijk de afmetingstuple en de returnwaarde van de functie.",
        ),
        L(
          "A 90 × 40 tile uses (90, 40).",
          "Een tegel van 90 × 40 gebruikt (90, 40).",
        ),
      ],
      L(
        "Return the requested Surface for more than one size.",
        "Geef de gevraagde Surface voor meerdere afmetingen terug.",
      ),
      [
        sceneProbe(
          "make_scene",
          [180, 110],
          'isinstance(_return, __import__("pygame").Surface) and _return.get_size() == (180, 110)',
        ),
        sceneProbe("make_scene", [90, 160], "_return.get_size() == (90, 160)"),
      ],
    ),
    gameTask(
      L(
        "Cover the whole image with the specified dark blue. Check the edges as well as its centre.",
        "Bedek de hele afbeelding met het opgegeven donkerblauw. Controleer ook de randen, niet alleen het midden.",
      ),
      [
        L(
          "A blank Surface starts black, not your chosen colour.",
          "Een lege Surface begint zwart, niet met jouw gekozen kleur.",
        ),
        L(
          "Use one fill on the whole Surface.",
          "Gebruik één fill op de hele Surface.",
        ),
        L(
          "Colours are RGB tuples such as (30, 70, 100).",
          "Kleuren zijn RGB-tuples zoals (30, 70, 100).",
        ),
      ],
      L(
        "Every sampled background pixel should be (16, 23, 39).",
        "Elke gecontroleerde achtergrondpixel moet (16, 23, 39) zijn.",
      ),
      [
        sceneProbe(
          "make_scene",
          [137, 91],
          "all(tuple(_return.get_at(p))[:3] == (16,23,39) for p in [(0,0),(136,90),(68,45)])",
        ),
      ],
    ),
    gameTask(
      L(
        "Run the preview and finish it normally. Make sure repeated builder calls produce separate images.",
        "Start het voorbeeld en sluit het normaal af. Zorg dat herhaalde bouwer-aanroepen afzonderlijke afbeeldingen opleveren.",
      ),
      [
        L(
          "Think about where the Surface is created.",
          "Bedenk waar de Surface wordt gemaakt.",
        ),
        L(
          "Create it inside the function rather than keeping one shared image.",
          "Maak die binnen de functie in plaats van één gedeelde afbeelding te bewaren.",
        ),
        L(
          "Two calls to a constructor normally create two objects.",
          "Twee aanroepen van een constructor maken normaal twee objecten.",
        ),
      ],
      L(
        "Create a fresh Surface on each call and show at least one frame.",
        "Maak bij elke aanroep een nieuwe Surface en toon minstens één beeld.",
      ),
      [
        sceneProbe(
          "make_scene",
          [120, 80],
          "_return is not _module.make_scene(120,80)",
        ),
      ],
    ),
  ],
});

const paddles = lesson({
  module: 8,
  number: 2,
  title: L("Place the players", "Plaats de spelers"),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 20,
  explanation: L(
    "The court opens, but both paddles are on the same side and the ball is missing. Use rectangles and centres to repair the composition. Keep the layout responsive to the scene size instead of tracing the preview by eye.",
    "Het veld opent, maar beide paddles staan aan dezelfde kant en de bal ontbreekt. Gebruik rechthoeken en middelpunten om de compositie te herstellen. Laat de indeling reageren op de scènegrootte in plaats van het voorbeeld op het oog na te tekenen.",
  ),
  sections: [
    section(
      L("Coordinates and edges", "Coördinaten en randen"),
      L(
        "The origin (0, 0) is the top-left. x increases rightward; y increases downward. A Rect stores left, top, width, and height, but also offers right and centery. Setting right positions its outer right edge. pygame.draw.rect(surface, colour, rect) fills that rectangle unless you supply an outline width. A circle takes a centre and a radius.",
        "De oorsprong (0, 0) ligt linksboven. x neemt naar rechts toe; y naar beneden. Een Rect bevat links, boven, breedte en hoogte, maar biedt ook right en centery. right instellen plaatst de buitenste rechterrand. pygame.draw.rect(surface, colour, rect) vult die rechthoek tenzij je een lijndikte opgeeft. Een cirkel krijgt een middelpunt en een straal.",
      ),
      "marker = pygame.Rect(0, 0, 10, 30)\nmarker.right = 150\nmarker.centery = 60",
    ),
    section(
      L("Design contract", "Ontwerpafspraak"),
      L(
        "Use paddles 12 wide and 72 high, both vertically centred. Leave a 24-pixel gap between each paddle’s outer edge and the court edge. The left paddle is blue (80, 180, 255), the right orange (255, 145, 50). Put a white radius-8 ball at (width // 2, height // 2). The background stays (16, 23, 39). Tests use widths of at least 200 and heights of at least 120.",
        "Gebruik paddles van 12 breed en 72 hoog, beide verticaal gecentreerd. Laat tussen de buitenrand van elke paddle en de veldrand 24 pixels ruimte. Links is blauw (80, 180, 255), rechts oranje (255, 145, 50). Zet een witte bal met straal 8 op (width // 2, height // 2). De achtergrond blijft (16, 23, 39). Tests gebruiken breedtes vanaf 200 en hoogtes vanaf 120.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": sceneMain(),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    left = pygame.Rect(24, 0, 12, 72)\n    left.centery = height // 2\n    right = left.copy()\n    pygame.draw.rect(canvas, (80, 180, 255), left)\n    pygame.draw.rect(canvas, (255, 145, 50), right)\n    return canvas\n",
  },
  solution: {
    "main.py": sceneMain(),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    left = pygame.Rect(24, 0, 12, 72)\n    left.centery = height // 2\n    right = left.copy()\n    right.right = width - 24\n    pygame.draw.rect(canvas, (80, 180, 255), left)\n    pygame.draw.rect(canvas, (255, 145, 50), right)\n    pygame.draw.circle(canvas, (255, 255, 255), (width // 2, height // 2), 8)\n    return canvas\n",
  },
  tasks: [
    gameTask(
      L(
        "Keep the left paddle visible with the specified size, gap, and vertical alignment.",
        "Houd de linkerpaddle zichtbaar met de opgegeven grootte, afstand en verticale uitlijning.",
      ),
      [
        L(
          "Later drawing can cover earlier drawing.",
          "Later tekenen kan eerder tekenwerk bedekken.",
        ),
        L(
          "Check whether the second paddle still overlaps the first.",
          "Controleer of de tweede paddle nog over de eerste ligt.",
        ),
        L(
          "Rect.copy() initially keeps the same coordinates.",
          "Rect.copy() behoudt in eerste instantie dezelfde coördinaten.",
        ),
      ],
      L(
        "The left paddle should occupy its own blue rectangle.",
        "De linkerpaddle moet zijn eigen blauwe rechthoek innemen.",
      ),
      [
        sceneProbe(
          "make_scene",
          [300, 180],
          "all(tuple(_return.get_at(p))[:3] == (80,180,255) for p in [(24,54),(35,125)]) and tuple(_return.get_at((23,90)))[:3] == (16,23,39)",
        ),
      ],
    ),
    gameTask(
      L(
        "Place the orange paddle symmetrically on the right, including when the window size changes.",
        "Plaats de oranje paddle symmetrisch rechts, ook wanneer de venstergrootte verandert.",
      ),
      [
        L(
          "Mirror the outer gap, not the left coordinate.",
          "Spiegel de buitenste ruimte, niet de linkercoördinaat.",
        ),
        L(
          "The right edge should sit inside the requested width.",
          "De rechterrand hoort binnen de gevraagde breedte te liggen.",
        ),
        L(
          "rect.right = boundary positions an edge, not a centre.",
          "rect.right = boundary plaatst een rand, niet een middelpunt.",
        ),
      ],
      L(
        "Use the width and keep a 24-pixel outer gap.",
        "Gebruik de breedte en houd buitenaan 24 pixels vrij.",
      ),
      [
        ...[
          [300, 180],
          [401, 221],
        ].map(([w, h]) =>
          sceneProbe(
            "make_scene",
            [w, h],
            `all(tuple(_return.get_at(p))[:3] == (255,145,50) for p in [(${w - 36},${Math.floor(h / 2) - 36}),(${w - 25},${Math.floor(h / 2) + 35})]) and tuple(_return.get_at((${w - 24},${Math.floor(h / 2)})))[:3] == (16,23,39)`,
          ),
        ),
      ],
    ),
    gameTask(
      L(
        "Add the centred white ball without covering either paddle. Inspect the whole court and finish the preview.",
        "Voeg de gecentreerde witte bal toe zonder een paddle te bedekken. Bekijk het hele veld en rond het voorbeeld af.",
      ),
      [
        L(
          "Circle coordinates describe its centre.",
          "Cirkelcoördinaten beschrijven het middelpunt.",
        ),
        L(
          "Use both requested dimensions to locate that centre.",
          "Gebruik beide gevraagde afmetingen om het middelpunt te vinden.",
        ),
        L(
          "pygame.draw.circle(canvas, colour, centre, radius) draws a filled circle.",
          "pygame.draw.circle(canvas, colour, centre, radius) tekent een gevulde cirkel.",
        ),
      ],
      L(
        "Keep the ball centred and its radius at eight pixels.",
        "Houd de bal gecentreerd en de straal op acht pixels.",
      ),
      [
        sceneProbe(
          "make_scene",
          [301, 181],
          "tuple(_return.get_at((150,90)))[:3] == (255,255,255) and tuple(_return.get_at((156,90)))[:3] == (255,255,255) and tuple(_return.get_at((160,90)))[:3] == (16,23,39)",
        ),
      ],
    ),
  ],
});

const eventMain = `import asyncio
import pygame
import scene

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    running = True
    paused = False
    while running:
        for event in pygame.event.get():
            action = scene.event_action(event.type, getattr(event, "key", None))
            if action == "quit":
                running = False
            elif action == "toggle":
                paused = not paused
        screen.fill((100, 65, 25) if paused else (16, 23, 39))
        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`;
const events = lesson({
  module: 8,
  number: 3,
  title: L("Listen without blocking", "Luister zonder te blokkeren"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 22,
  explanation: L(
    "A game must redraw while it listens. input() would wait for a line and stop that flow. Instead, pygame supplies a queue of events. Complete a small event translator so the provided loop can close or toggle a pause colour.",
    "Een spel moet blijven tekenen terwijl het luistert. input() wacht op een regel en stopt die stroom. Pygame levert daarom een wachtrij met gebeurtenissen. Maak een kleine vertaler af zodat de meegeleverde lus kan sluiten of een pauzekleur kan omschakelen.",
  ),
  sections: [
    section(
      L("One event, one decision", "Eén gebeurtenis, één beslissing"),
      L(
        'pygame.event.get() retrieves waiting events. Each has a type; KEYDOWN events also have a key. Named constants such as pygame.QUIT and pygame.K_SPACE make the comparisons readable. The main loop passes event.type and, when present, event.key to event_action. Return "quit" for QUIT or an Escape KEYDOWN, "toggle" for a Space KEYDOWN, and None for everything else. KEYUP must not toggle again.',
        'pygame.event.get() haalt wachtende gebeurtenissen op. Elke gebeurtenis heeft een type; KEYDOWN heeft ook een key. Benoemde constanten zoals pygame.QUIT en pygame.K_SPACE maken vergelijkingen leesbaar. De hoofdlus geeft event.type en, indien aanwezig, event.key door aan event_action. Geef "quit" voor QUIT of een Escape-KEYDOWN, "toggle" voor een Space-KEYDOWN en None voor al het andere. KEYUP mag niet opnieuw omschakelen.',
      ),
    ),
    section(
      L("Give the browser a turn", "Geef de browser een beurt"),
      L(
        "async def and asyncio.run provide the browser-compatible entry point. await asyncio.sleep(1 / 60) suspends this task briefly so drawing and input can proceed. A normal while loop with no await can freeze the preview; the site interrupts it. This is scheduling, not an exact promise of 60 frames each second. Later you will measure elapsed time for movement.",
        "async def en asyncio.run vormen het browsergeschikte startpunt. await asyncio.sleep(1 / 60) onderbreekt deze taak even zodat tekenen en invoer verder kunnen. Een gewone while-lus zonder await kan het voorbeeld vastzetten; de site onderbreekt die. Dit is planning, geen exacte belofte van 60 beelden per seconde. Later meet je verstreken tijd voor beweging.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": eventMain,
    "scene.py":
      'import pygame\n\ndef event_action(event_type, key=None):\n    if event_type == pygame.QUIT:\n        return "quit"\n    return None\n',
  },
  solution: {
    "main.py": eventMain,
    "scene.py":
      'import pygame\n\ndef event_action(event_type, key=None):\n    if event_type == pygame.QUIT:\n        return "quit"\n    if event_type == pygame.KEYDOWN:\n        if key == pygame.K_ESCAPE:\n            return "quit"\n        if key == pygame.K_SPACE:\n            return "toggle"\n    return None\n',
  },
  tasks: [
    gameTask(
      L(
        "Keep window closing working and let Escape close the game when pressed.",
        "Behoud het sluiten van het venster en laat Escape het spel sluiten wanneer die wordt ingedrukt.",
      ),
      [
        L(
          "The same action can have more than one trigger.",
          "Dezelfde actie kan meerdere aanleidingen hebben.",
        ),
        L(
          "Test the key only for a KEYDOWN event.",
          "Controleer de toets alleen bij een KEYDOWN-gebeurtenis.",
        ),
        L(
          "pygame.K_ESCAPE names the Escape key.",
          "pygame.K_ESCAPE benoemt de Escape-toets.",
        ),
      ],
      L(
        'QUIT and an Escape press should return "quit".',
        'QUIT en Escape indrukken moeten "quit" teruggeven.',
      ),
      [
        sceneProbe("event_action", [256], '_return == "quit"'),
        sceneProbe("event_action", [768, 27], '_return == "quit"'),
      ],
    ),
    gameTask(
      L(
        "Make Space presses toggle the pause colour. Releasing Space must leave it alone.",
        "Laat Space indrukken de pauzekleur omschakelen. Space loslaten moet die ongemoeid laten.",
      ),
      [
        L(
          "Press and release are separate events.",
          "Indrukken en loslaten zijn afzonderlijke gebeurtenissen.",
        ),
        L(
          'The main loop already flips its paused Boolean for "toggle".',
          'De hoofdlus draait zijn paused-Boolean al om voor "toggle".',
        ),
        L(
          "Compare the event type before checking pygame.K_SPACE.",
          "Vergelijk eerst het gebeurtenistype en daarna pygame.K_SPACE.",
        ),
      ],
      L(
        'Return "toggle" only on a Space KEYDOWN.',
        'Geef "toggle" alleen bij een Space-KEYDOWN terug.',
      ),
      [
        sceneProbe("event_action", [768, 32], '_return == "toggle"'),
        sceneProbe("event_action", [769, 32], "_return is None"),
      ],
    ),
    gameTask(
      L(
        "Ignore unrelated events and keys. Try two Space presses, another key, and Escape in the preview.",
        "Negeer andere gebeurtenissen en toetsen. Probeer in het voorbeeld twee keer Space, een andere toets en Escape.",
      ),
      [
        L(
          "Not every event should produce an action.",
          "Niet elke gebeurtenis hoeft een actie op te leveren.",
        ),
        L(
          "Keep a no-action return after the recognised cases.",
          "Behoud een return zonder actie na de herkende gevallen.",
        ),
        L(
          'None is different from the text "None".',
          'None verschilt van de tekst "None".',
        ),
      ],
      L(
        "Unrelated input must leave the game state unchanged.",
        "Andere invoer moet de speltoestand ongemoeid laten.",
      ),
      [
        sceneProbe("event_action", [768, 119], "_return is None"),
        sceneProbe("event_action", [1024], "_return is None"),
        sceneProbe("event_action", [769, 27], "_return is None"),
      ],
    ),
  ],
});

const animationMain = `import asyncio
import pygame
import scene

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    x = 40
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                running = False
        scene.draw_frame(screen, (x, 200))
        pygame.display.flip()
        x = (x + 2) % 640
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`;
const frameProbe = (positions, check) => ({
  moduleOnly: true,
  files: {
    "frame_probe.py":
      "import pygame\nimport scene\ndef inspect(positions):\n    canvas = pygame.Surface((200, 120))\n    canvas.fill((255,0,255))\n    for position in positions:\n        scene.draw_frame(canvas, position)\n    return canvas\n",
  },
  call: { module: "frame_probe", name: "inspect", args: [positions] },
  check: "_error is None and (" + check + ")",
});
const redraw = lesson({
  module: 8,
  number: 4,
  title: L("Repair the disappearing ball", "Repareer de verdwijnende bal"),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 20,
  explanation: L(
    "This animation updates its position, but its frame renderer paints over the ball. Repair the order of drawing, then make sure old positions do not leave trails. You will work on time-based movement in the next module; here, concentrate on what a single frame means.",
    "Deze animatie verandert zijn positie, maar de beeldtekenaar schildert over de bal heen. Herstel de tekenvolgorde en zorg daarna dat oude posities geen sporen achterlaten. In de volgende module werk je aan tijdsafhankelijke beweging; concentreer je hier op wat één beeld betekent.",
  ),
  sections: [
    section(
      L("A complete image, every time", "Elke keer een volledig beeld"),
      L(
        "Drawing changes pixels on a Surface; it does not remember which pixels were a ball. To show a new position, repaint the background and then draw the current objects. draw_frame(canvas, position) receives the existing display Surface and a coordinate pair. Paint it dark blue (16, 23, 39), then a white radius-8 ball at position. Modify that supplied Surface; returning a different one is not enough for this caller.",
        "Tekenen verandert pixels op een Surface; het onthoudt niet welke pixels een bal waren. Schilder voor een nieuwe positie de achtergrond opnieuw en teken daarna de huidige objecten. draw_frame(canvas, position) ontvangt de bestaande scherm-Surface en een coördinatenpaar. Kleur die donkerblauw (16, 23, 39) en teken daarna een witte bal met straal 8 op position. Bewerk die meegegeven Surface; alleen een andere teruggeven is voor deze aanroeper niet genoeg.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": animationMain,
    "scene.py":
      "import pygame\n\ndef draw_frame(canvas, position):\n    pygame.draw.circle(canvas, (255, 255, 255), position, 8)\n    canvas.fill((16, 23, 39))\n",
  },
  solution: {
    "main.py": animationMain,
    "scene.py":
      "import pygame\n\ndef draw_frame(canvas, position):\n    canvas.fill((16, 23, 39))\n    pygame.draw.circle(canvas, (255, 255, 255), position, 8)\n",
  },
  tasks: [
    gameTask(
      L(
        "Make the ball visible at the supplied position after a frame is drawn.",
        "Maak de bal zichtbaar op de meegegeven positie nadat een beeld is getekend.",
      ),
      [
        L(
          "The last paint at a pixel wins.",
          "De laatste verf op een pixel blijft zichtbaar.",
        ),
        L(
          "The background belongs behind the ball.",
          "De achtergrond hoort achter de bal.",
        ),
        L(
          "Try a small sketch of the two drawing operations in order.",
          "Maak een kleine schets van de twee tekenacties in volgorde.",
        ),
      ],
      L(
        "The current ball position must be white after drawing.",
        "De huidige balpositie moet na het tekenen wit zijn.",
      ),
      [
        frameProbe(
          [[40, 60]],
          "tuple(_return.get_at((40,60)))[:3] == (255,255,255)",
        ),
      ],
    ),
    gameTask(
      L(
        "Remove trails: after a second frame, the previous position must be background again.",
        "Verwijder sporen: na een tweede beeld moet de vorige positie weer achtergrond zijn.",
      ),
      [
        L(
          "The caller reuses the same Surface.",
          "De aanroeper hergebruikt dezelfde Surface.",
        ),
        L(
          "Clearing only once before the loop leaves old pixels behind.",
          "Slechts één keer wissen vóór de lus laat oude pixels staan.",
        ),
        L(
          "A fill belongs inside the function that draws each complete frame.",
          "Een fill hoort in de functie die elk volledig beeld tekent.",
        ),
      ],
      L(
        "Erase old positions while preserving the new ball.",
        "Wis oude posities en behoud de nieuwe bal.",
      ),
      [
        frameProbe(
          [
            [40, 60],
            [120, 70],
          ],
          "tuple(_return.get_at((40,60)))[:3] == (16,23,39) and tuple(_return.get_at((120,70)))[:3] == (255,255,255)",
        ),
      ],
    ),
    gameTask(
      L(
        "Keep the radius at eight and leave all other pixels as background. Run long enough to see the ball wrap around.",
        "Houd de straal op acht en laat alle andere pixels achtergrond blijven. Voer lang genoeg uit om de bal opnieuw te zien verschijnen.",
      ),
      [
        L(
          "Position changes; ball size does not.",
          "De positie verandert; de balgrootte niet.",
        ),
        L(
          "Inspect pixels just beyond the radius.",
          "Bekijk pixels net buiten de straal.",
        ),
        L(
          "The circle API accepts a centre and radius, not a bounding-box width.",
          "De cirkel-API krijgt een middelpunt en straal, geen kaderbreedte.",
        ),
      ],
      L(
        "Keep a clean background and the requested ball size.",
        "Behoud een schone achtergrond en de gevraagde balgrootte.",
      ),
      [
        frameProbe(
          [[100, 60]],
          "tuple(_return.get_at((106,60)))[:3] == (255,255,255) and tuple(_return.get_at((110,60)))[:3] == (16,23,39) and tuple(_return.get_at((0,0)))[:3] == (16,23,39)",
        ),
      ],
    ),
  ],
});

const arena = lesson({
  module: 8,
  number: 5,
  title: L("Build a practice court", "Bouw een oefenveld"),
  guidance: "independent",
  runtime: "pygame",
  minutes: 25,
  explanation: L(
    "Turn a short visual brief into a reusable scene. There is no broken algorithm to repair this time. Decide how to arrange your drawing code, reuse earlier lessons when useful, and inspect both normal and paused versions.",
    "Zet een korte visuele opdracht om in een herbruikbare scène. Deze keer is er geen kapot algoritme om te herstellen. Kies hoe je de tekencode indeelt, gebruik eerdere lessen waar nuttig en bekijk de normale en gepauzeerde versie.",
  ),
  sections: [
    section(
      L("The brief", "De opdracht"),
      L(
        "make_scene(width, height, paused=False) returns a new court Surface. Use the same dark background, paddle colours, 12 × 72 paddle size and 24-pixel outside gaps as before. Both paddles and the radius-8 white ball are vertically centred. Add a one-pixel grey (80, 90, 110) centre line from top to bottom; the ball sits in front of it. When paused is true, show a 40 × 12 orange marker centred horizontally with top=12. When false, that area is ordinary court. Sizes are at least 200 × 120. Change the last argument in main.py to preview both states.",
        "make_scene(width, height, paused=False) geeft een nieuwe veld-Surface terug. Gebruik dezelfde donkere achtergrond, paddlekleuren, paddlegrootte van 12 × 72 en buitenruimte van 24 pixels als eerder. Beide paddles en de witte bal met straal 8 zijn verticaal gecentreerd. Voeg een één pixel brede grijze (80, 90, 110) middenlijn van boven tot onder toe; de bal staat ervoor. Bij paused=True toon je een oranje markering van 40 × 12, horizontaal gecentreerd met top=12. Bij False is dat gebied gewoon veld. Afmetingen zijn minstens 200 × 120. Verander het laatste argument in main.py om beide toestanden te bekijken.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": sceneMain("scene.make_scene(640, 400, False)"),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height, paused=False):\n    # Turn the visual brief into a complete image.\n    pass\n",
  },
  solution: {
    "main.py": sceneMain("scene.make_scene(640, 400, False)"),
    "scene.py":
      "import pygame\n\ndef make_scene(width, height, paused=False):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    pygame.draw.line(canvas, (80, 90, 110), (width // 2, 0), (width // 2, height - 1))\n    for x, colour in [(24, (80,180,255)), (width-36, (255,145,50))]:\n        pygame.draw.rect(canvas, colour, (x, height // 2 - 36, 12, 72))\n    pygame.draw.circle(canvas, (255,255,255), (width // 2, height // 2), 8)\n    if paused:\n        pygame.draw.rect(canvas, (255,145,50), (width // 2 - 20, 12, 40, 12))\n    return canvas\n",
  },
  tasks: [
    gameTask(
      L(
        "Produce a correctly sized court with two distinct, aligned paddles. Support more than the preview size.",
        "Maak een veld met de juiste afmetingen en twee afzonderlijke, uitgelijnde paddles. Ondersteun meer dan alleen de voorbeeldgrootte.",
      ),
      [
        L(
          "Separate the fixed design dimensions from the requested window size.",
          "Scheid vaste ontwerpafmetingen van de gevraagde venstergrootte.",
        ),
        L(
          "Revisit Place the players if an edge feels ambiguous.",
          "Bekijk Plaats de spelers opnieuw als een rand onduidelijk is.",
        ),
        L(
          "A rectangle can be positioned either with calculated coordinates or named edge properties.",
          "Je kunt een rechthoek plaatsen met berekende coördinaten of benoemde randeigenschappen.",
        ),
      ],
      L(
        "Check both paddle centres and the returned dimensions.",
        "Controleer beide paddlemiddelpunten en de teruggegeven afmetingen.",
      ),
      [
        ...[
          [320, 200],
          [401, 221],
        ].map(([w, h]) =>
          sceneProbe(
            "make_scene",
            [w, h],
            `_return.get_size() == (${w},${h}) and tuple(_return.get_at((25,${Math.floor(h / 2)})))[:3] == (80,180,255) and tuple(_return.get_at((${w - 30},${Math.floor(h / 2)})))[:3] == (255,145,50)`,
          ),
        ),
      ],
    ),
    gameTask(
      L(
        "Layer the centred ball in front of the thin centre line. Keep the remaining court dark.",
        "Plaats de gecentreerde bal vóór de dunne middenlijn. Houd de rest van het veld donker.",
      ),
      [
        L(
          "Drawing order determines what remains visible where objects overlap.",
          "Tekenvolgorde bepaalt wat zichtbaar blijft waar objecten overlappen.",
        ),
        L(
          "Build from the background toward the foreground.",
          "Bouw van achtergrond naar voorgrond.",
        ),
        L(
          "A line is drawn with pygame.draw.line(surface, colour, start, end).",
          "Een lijn teken je met pygame.draw.line(surface, colour, start, end).",
        ),
      ],
      L(
        "The centre should be white, the uncovered line grey, and nearby background dark.",
        "Het midden moet wit zijn, de onbedekte lijn grijs en de achtergrond ernaast donker.",
      ),
      [
        sceneProbe(
          "make_scene",
          [320, 200],
          "tuple(_return.get_at((160,100)))[:3] == (255,255,255) and tuple(_return.get_at((160,0)))[:3] == (80,90,110) and tuple(_return.get_at((160,199)))[:3] == (80,90,110) and tuple(_return.get_at((159,40)))[:3] == (16,23,39)",
        ),
      ],
    ),
    gameTask(
      L(
        "Show the pause marker only in the paused state. Compare both versions and finish a successful preview.",
        "Toon de pauzemarkering alleen in de gepauzeerde toestand. Vergelijk beide versies en rond een geslaagd voorbeeld af.",
      ),
      [
        L(
          "The same function should describe both states.",
          "Dezelfde functie moet beide toestanden beschrijven.",
        ),
        L(
          "The marker is an extra foreground element controlled by the argument.",
          "De markering is een extra voorgrondelement dat door het argument wordt bestuurd.",
        ),
        L(
          "Use an if for an optional part of an image.",
          "Gebruik een if voor een optioneel deel van een afbeelding.",
        ),
      ],
      L(
        "Respect the flag and the marker dimensions; do not leave stale pixels between calls.",
        "Respecteer de vlag en de markeringafmetingen; laat geen oude pixels tussen aanroepen staan.",
      ),
      [
        sceneProbe(
          "make_scene",
          [320, 200, true],
          "all(tuple(_return.get_at(p))[:3] == (255,145,50) for p in [(140,12),(179,23),(160,18)]) and tuple(_return.get_at((139,18)))[:3] == (16,23,39)",
        ),
        sceneProbe(
          "make_scene",
          [320, 200, false],
          "tuple(_return.get_at((145,18)))[:3] == (16,23,39)",
        ),
      ],
    ),
  ],
});

const review = quiz(
  8,
  L("Review: scenes and events", "Herhaling: scènes en gebeurtenissen"),
  [
    question(
      "v2-8-q1",
      L(
        "The ball is drawn, then the background is filled. What is visible?",
        "De bal wordt getekend, daarna wordt de achtergrond gevuld. Wat is zichtbaar?",
      ),
      "",
      [
        [
          L("Only the background.", "Alleen de achtergrond."),
          L(
            "The later fill covers the ball pixels.",
            "De latere fill bedekt de balpixels.",
          ),
        ],
        [
          L(
            "Both, because pygame remembers the ball.",
            "Beide, want pygame onthoudt de bal.",
          ),
          L(
            "A Surface stores pixels, not the meaning of previous objects.",
            "Een Surface bewaart pixels, niet de betekenis van eerdere objecten.",
          ),
        ],
        [
          L(
            "A ball with a transparent background.",
            "Een bal met een transparante achtergrond.",
          ),
          L(
            "A normal fill replaces those pixels.",
            "Een gewone fill vervangt die pixels.",
          ),
        ],
      ],
    ),
    question(
      "v2-8-q2",
      L(
        "A 12-pixel paddle must leave 24 pixels clear on the right of a 640-pixel court. What is its left coordinate?",
        "Een paddle van 12 pixels moet rechts 24 pixels vrijlaten op een veld van 640 pixels. Wat is zijn linkercoördinaat?",
      ),
      "",
      [
        [
          L("604", "604"),
          L(
            "640 − 24 − 12 leaves the full outside gap.",
            "640 − 24 − 12 laat de volledige buitenruimte vrij.",
          ),
        ],
        [
          L("616", "616"),
          L(
            "That is the desired right edge, not the left.",
            "Dat is de gewenste rechterrand, niet de linkerrand.",
          ),
        ],
        [
          L("628", "628"),
          L(
            "That places the paddle against the court edge.",
            "Dat plaatst de paddle tegen de veldrand.",
          ),
        ],
      ],
    ),
    question(
      "v2-8-q3",
      L(
        "Why can a Space key press cause two toggles in a careless event handler?",
        "Waarom kan Space indrukken twee omschakelingen veroorzaken in een onzorgvuldige gebeurtenisafhandeling?",
      ),
      "",
      [
        [
          L(
            "It handles both KEYDOWN and KEYUP as a press.",
            "Het behandelt zowel KEYDOWN als KEYUP als indrukken.",
          ),
          L(
            "The release is a separate event; inspect its type.",
            "Loslaten is een afzonderlijke gebeurtenis; controleer het type.",
          ),
        ],
        [
          L(
            "A Boolean cannot be toggled once.",
            "Een Boolean kan niet één keer omschakelen.",
          ),
          L(
            "not paused toggles a Boolean once whenever it runs.",
            "not paused schakelt een Boolean om telkens wanneer het wordt uitgevoerd.",
          ),
        ],
        [
          L(
            "display.flip changes the Boolean.",
            "display.flip verandert de Boolean.",
          ),
          L(
            "Presenting a frame does not alter your pause flag.",
            "Een beeld tonen verandert je pauzevlag niet.",
          ),
        ],
      ],
    ),
    question(
      "v2-8-q4",
      L(
        "What does the await inside the browser game loop make possible?",
        "Wat maakt de await in de browserspellus mogelijk?",
      ),
      "",
      [
        [
          L(
            "The browser can process drawing and input between iterations.",
            "De browser kan tussen iteraties tekenen en invoer verwerken.",
          ),
          L(
            "The task cooperatively yields rather than occupying the main thread continuously.",
            "De taak staat vrijwillig tijd af in plaats van de hoofdthread voortdurend te bezetten.",
          ),
        ],
        [
          L(
            "Every computer runs at exactly 60 frames per second.",
            "Elke computer draait precies op 60 beelden per seconde.",
          ),
          L(
            "Scheduling and workload vary; elapsed time still needs measuring.",
            "Planning en werklast verschillen; verstreken tijd moet nog steeds worden gemeten.",
          ),
        ],
        [
          L(
            "All variables reset after every frame.",
            "Alle variabelen worden na elk beeld gewist.",
          ),
          L(
            "Suspending preserves the task’s state.",
            "Onderbreken behoudt de toestand van de taak.",
          ),
        ],
      ],
    ),
    question(
      "v2-8-q5",
      L(
        "What should you do to check a graphical exercise after trying its preview?",
        "Wat doe je om een grafische oefening te controleren nadat je het voorbeeld hebt geprobeerd?",
      ),
      "",
      [
        [
          L(
            "Use Finish & check, or handle the normal close event.",
            "Gebruik Afronden en controleren, of handel de normale sluitgebeurtenis af.",
          ),
          L(
            "A successful normal exit lets the website check the exercise.",
            "Na normaal afsluiten kan de website de oefening controleren.",
          ),
        ],
        [
          L(
            "Use Stop; interruption always awards completion.",
            "Gebruik Stop; onderbreken levert altijd voltooiing op.",
          ),
          L(
            "Stop is an emergency interruption and does not grade.",
            "Stop is een noodonderbreking en beoordeelt niet.",
          ),
        ],
        [
          L(
            "Type the expected answer in the console.",
            "Typ het verwachte antwoord in de console.",
          ),
          L(
            "Console experiments do not award exercise completion.",
            "Console-experimenten leveren geen oefeningsvoltooiing op.",
          ),
        ],
      ],
    ),
  ],
);
export const activities = [surface, paddles, events, redraw, arena, review];
