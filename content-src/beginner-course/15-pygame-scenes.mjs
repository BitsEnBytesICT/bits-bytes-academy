import { gameLesson as G } from "./game-authoring.mjs";
const f = (slug, s) => G(15, slug, s);
export const activities = [
  f("coordinates", {
    title: ["Meet the Pygame preview", "Ontmoet het Pygame-voorbeeld"],
    topics: "browser-loop coordinates pygame-objects rect",
    requires: "helper-modules tuples",
    why: [
      "Pygame draws into a window instead of printing a terminal conversation. Start with one rectangle and the supplied browser loop.",
      "Pygame tekent in een venster in plaats van een terminalgesprek af te drukken. Begin met één rechthoek en de aangeleverde browserlus.",
    ],
    teach: [
      "Run opens the preview; Finish & check closes it normally and checks your work, while Stop cancels. main.py supplies scheduling; edit game.py. async and await let the browser draw and process input and are supplied infrastructure. Coordinates begin at (0, 0) in the top-left: x increases rightward and y downward. pygame.Rect(x, y, width, height) creates a rectangle object with integer positions and dimensions. An object groups related information and operations.",
      "Uitvoeren opent het voorbeeld; afronden en controleren sluit normaal af en beoordeelt je werk, terwijl Stop annuleert. main.py levert de planning; bewerk game.py. async en await laten de browser tekenen en invoer verwerken en zijn aangeleverde infrastructuur. Coördinaten beginnen linksboven bij (0, 0): x neemt naar rechts toe en y naar beneden. pygame.Rect(x, y, width, height) maakt een rechthoekobject met gehele posities en afmetingen. Een object groepeert bijbehorende gegevens en bewerkingen.",
    ],
    rule: [
      "Position describes the top-left corner; size describes width and height.",
      "De positie beschrijft de linkerbovenhoek; de afmeting beschrijft breedte en hoogte.",
    ],
    example:
      "import pygame\nbox = pygame.Rect(10, 20, 30, 40)\nprint(box.x, box.y, box.width, box.height)",
    output: "10 20 30 40\n",
    predict: [
      "Which argument moves the rectangle downward?",
      "Welk argument verplaatst de rechthoek naar beneden?",
    ],
    preview: {
      draw: "pygame.draw.rect(screen, (240, 240, 240), game.rectangle(50, 80, 12, 70))",
    },
    starter:
      "def rectangle(x, y, width, height):\n    return pygame.Rect(0, 0, 10, 10)\n",
    solution:
      "def rectangle(x, y, width, height):\n    return pygame.Rect(x, y, width, height)\n",
    tasks: [
      {
        name: "rectangle",
        task: [
          "Return a Rect using all four requested dimensions. Run and finish the preview.",
          "Geef een Rect met alle vier gevraagde waarden terug. Voer het voorbeeld uit en rond af.",
        ],
        help: [
          "Pass the parameters to pygame.Rect in x, y, width, height order.",
          "Geef parameters in de volgorde x, y, width, height aan pygame.Rect.",
        ],
        fragment: "pygame.Rect(x, y, width, height)",
        cases: [
          [[3, 7, 9, 12], "tuple(_return) == (3,7,9,12)"],
          [[-5, 0, 20, 10], "_return.right == 15 and _return.bottom == 10"],
        ],
      },
    ],
    change: [
      "Change x and then y in the supplied call; observe each direction separately.",
      "Verander x en daarna y in de aangeleverde aanroep; bekijk elke richting apart.",
    ],
    explain: [
      "The helper supplies geometry while the browser loop handles the display lifecycle.",
      "De hulp levert geometrie terwijl de browserlus de schermlevenscyclus regelt.",
    ],
  }),
  f("attributes", {
    title: ["Use an object’s attributes", "Gebruik attributen van een object"],
    topics: "attributes object-methods",
    requires: "rect",
    why: [
      "Rect provides meaningful names for edges and centres, so you do not have to repeat every geometry calculation.",
      "Rect biedt betekenisvolle namen voor randen en middelpunten zodat je niet elke geometrieberekening hoeft te herhalen.",
    ],
    teach: [
      "box.right equals box.x + box.width. box.center is a coordinate pair. Assigning box.center moves the rectangle while preserving its size. An attribute such as center is data; a method such as box.move(dx, dy) is called with parentheses and returns a moved copy. The original rectangle stays unchanged with move.",
      "box.right is box.x + box.width. box.center is een coördinatenpaar. Toewijzen aan box.center verplaatst de rechthoek met behoud van afmetingen. Een attribuut zoals center is een gegeven; een methode zoals box.move(dx, dy) wordt met haakjes aangeroepen en geeft een verplaatste kopie terug. Bij move blijft de oorspronkelijke rechthoek ongewijzigd.",
    ],
    rule: [
      "Read attributes directly; call methods with parentheses.",
      "Lees attributen direct; roep methoden met haakjes aan.",
    ],
    example:
      "import pygame\nbox = pygame.Rect(10, 20, 20, 10)\nbox.center = (50, 50)\nprint(box.left, box.top)\nprint(box.move(5, 0).left)",
    output: "40 45\n45\n",
    predict: [
      "Does move change box.left itself?",
      "Verandert move box.left zelf?",
    ],
    preview: {
      draw: "pygame.draw.rect(screen, (240,240,240), game.centered(320,200))",
    },
    starter: "def centered(x, y):\n    return pygame.Rect(0, 0, 20, 40)\n",
    solution:
      "def centered(x, y):\n    box = pygame.Rect(0, 0, 20, 40)\n    box.center = (x, y)\n    return box\n",
    tasks: [
      {
        name: "centered",
        task: [
          "Return a 20×40 Rect whose centre is (x, y).",
          "Geef een Rect van 20×40 terug met middelpunt (x, y).",
        ],
        help: [
          "Set center after creating the rectangle.",
          "Stel center in nadat je de rechthoek maakt.",
        ],
        fragment: "box.center = (x, y)",
        cases: [
          [[100, 80], "_return.center == (100,80) and _return.size == (20,40)"],
          [[0, 0], "_return.topleft == (-10,-20)"],
        ],
      },
    ],
    change: [
      "Move the centre to (0, 0) and explain why part of the shape is outside the window.",
      "Verplaats het middelpunt naar (0, 0) en leg uit waarom een deel buiten het venster valt.",
    ],
    explain: [
      "Centre assignment lets Pygame calculate the top-left position consistently.",
      "Toewijzing aan het middelpunt laat Pygame de linkerbovenpositie consistent berekenen.",
    ],
  }),
  f("surface-colour", {
    title: [
      "Paint an image on a Surface",
      "Teken een afbeelding op een Surface",
    ],
    topics: "surface colours",
    requires: "rect tuples",
    why: [
      "A Surface is an image in memory. You draw onto it before showing it on the screen.",
      "Een Surface is een afbeelding in het geheugen. Je tekent erop voordat je die op het scherm toont.",
    ],
    teach: [
      "pygame.Surface((width, height)) creates an image. fill((red, green, blue)) paints every pixel with RGB channel values from 0 through 255. screen.blit(image, (x, y)) copies an image onto the display; display.flip() presents the frame. Those display operations are supplied in main.py. get_at((x, y)) reads a pixel and returns its red, green, blue and alpha channels.",
      "pygame.Surface((width, height)) maakt een afbeelding. fill((red, green, blue)) kleurt elke pixel met RGB-kanaalwaarden van 0 tot en met 255. screen.blit(image, (x, y)) kopieert een afbeelding naar het scherm; display.flip() toont het beeld. Die schermbewerkingen staan in main.py. get_at((x, y)) leest een pixel en geeft de rood-, groen-, blauw- en alfakanalen terug.",
    ],
    rule: [
      "Make the Surface, paint it, then return it for display.",
      "Maak de Surface, kleur die en geef die terug voor weergave.",
    ],
    example:
      "import pygame\nimage = pygame.Surface((8, 6))\nimage.fill((0, 0, 120))\npixel = image.get_at((2, 2))\nprint(pixel[2])",
    output: "120\n",
    predict: [
      "Which RGB channel makes this image blue?",
      "Welk RGB-kanaal maakt deze afbeelding blauw?",
    ],
    preview: { draw: "screen.blit(game.background(640,400), (0,0))" },
    starter:
      "def background(width, height):\n    return pygame.Surface((width,height))\n",
    solution:
      "def background(width, height):\n    canvas = pygame.Surface((width,height))\n    canvas.fill((20,40,80))\n    return canvas\n",
    tasks: [
      {
        name: "background",
        task: [
          "Return a Surface of the requested size filled with RGB (20, 40, 80).",
          "Geef een Surface van de gevraagde afmetingen terug gevuld met RGB (20, 40, 80).",
        ],
        help: [
          "Call fill on the created image before returning it.",
          "Roep fill op de gemaakte afbeelding aan voordat je die teruggeeft.",
        ],
        fragment: "canvas.fill((20,40,80))",
        cases: [
          [
            [40, 20],
            "_return.get_size() == (40,20) and tuple(_return.get_at((0,0)))[:3] == (20,40,80) and tuple(_return.get_at((39,19)))[:3] == (20,40,80)",
          ],
        ],
      },
    ],
    change: [
      "Change one colour channel at a time and describe the change.",
      "Verander één kleurkanaal tegelijk en beschrijf de verandering.",
    ],
    explain: [
      "Filling the returned image makes its pixels visible when main.py blits it.",
      "De teruggegeven afbeelding vullen maakt de pixels zichtbaar wanneer main.py die kopieert.",
    ],
  }),
  f("drawing-order", {
    title: [
      "Draw the background before the foreground",
      "Teken de achtergrond vóór de voorgrond",
    ],
    topics: "drawing-order drawing",
    requires: "surface colours",
    why: [
      "A later drawing operation covers earlier pixels. Repair a scene whose shape is hidden.",
      "Een latere tekenbewerking bedekt eerdere pixels. Herstel een scène waarvan de vorm verborgen is.",
    ],
    teach: [
      "pygame.draw.rect(surface, colour, rectangle) paints a rectangle on a Surface. Drawing an opaque background after the shape erases the shape. The normal frame order is clear the background, draw objects, then present the image. Redrawing each frame also removes objects from their old positions.",
      "pygame.draw.rect(surface, colour, rectangle) tekent een rechthoek op een Surface. Een dekkende achtergrond na de vorm tekenen wist de vorm. De gewone beeldvolgorde is achtergrond wissen, objecten tekenen en daarna de afbeelding tonen. Elk beeld opnieuw tekenen verwijdert ook objecten op hun oude posities.",
    ],
    rule: [
      "Later pixels cover earlier pixels.",
      "Latere pixels bedekken eerdere pixels.",
    ],
    example:
      "import pygame\nimage = pygame.Surface((10,10))\nimage.fill((0,0,0))\npygame.draw.rect(image,(255,0,0),(2,2,4,4))\nprint(image.get_at((3,3))[0])",
    output: "255\n",
    predict: [
      "What would the pixel be if fill ran last?",
      "Wat is de pixel als fill als laatste draait?",
    ],
    preview: { draw: "screen.blit(game.scene(),(0,0))" },
    starter:
      "def scene():\n    canvas = pygame.Surface((640,400))\n    pygame.draw.rect(canvas,(240,240,240),(20,100,10,60))\n    canvas.fill((20,40,80))\n    return canvas\n",
    solution:
      "def scene():\n    canvas = pygame.Surface((640,400))\n    canvas.fill((20,40,80))\n    pygame.draw.rect(canvas,(240,240,240),(20,100,10,60))\n    return canvas\n",
    tasks: [
      {
        name: "scene",
        task: [
          "Repair the drawing order so the white paddle stays visible on the blue background.",
          "Herstel de tekenvolgorde zodat het witte batje zichtbaar blijft op de blauwe achtergrond.",
        ],
        help: [
          "Fill before drawing the paddle.",
          "Vul vóór het tekenen van het batje.",
        ],
        fragment: "canvas.fill((20,40,80))",
        cases: [
          [
            [],
            "tuple(_return.get_at((25,120)))[:3] == (240,240,240) and tuple(_return.get_at((0,0)))[:3] == (20,40,80)",
          ],
        ],
      },
    ],
    change: [
      "Add a second overlapping rectangle and swap their drawing order.",
      "Voeg een tweede overlappende rechthoek toe en wissel de tekenvolgorde.",
    ],
    explain: [
      "Moving fill before the paddle preserves the foreground pixels.",
      "fill vóór het batje plaatsen bewaart de voorgrondpixels.",
    ],
    guidance: "adapt",
  }),
  f("events", {
    title: ["Respond to a key press", "Reageer op een toetsdruk"],
    topics: "events keyboard-events closing-window",
    requires: "boolean-variables for rect",
    why: [
      "An event represents something that happened, such as pressing a key or closing the window.",
      "Een gebeurtenis stelt iets voor dat gebeurde, zoals een toets indrukken of het venster sluiten.",
    ],
    teach: [
      "The supplied for event in pygame.event.get() consumes waiting events every frame. event.type identifies the kind. Check event.type == pygame.KEYDOWN before reading event.key; not every event has a key attribute. QUIT requests closing. Use a KEYDOWN event for a single action such as toggling a colour. Holding a key for movement is taught next.",
      "De aangeleverde for event in pygame.event.get() verwerkt wachtende gebeurtenissen bij elk beeld. event.type benoemt het soort. Controleer event.type == pygame.KEYDOWN vóór je event.key leest; niet elke gebeurtenis heeft een key-attribuut. QUIT vraagt om sluiten. Gebruik een KEYDOWN-gebeurtenis voor één actie zoals een kleur omschakelen. Een toets vasthouden voor beweging leer je hierna.",
    ],
    rule: [
      "Check an event’s type before reading type-specific attributes.",
      "Controleer het gebeurtenistype vóór je bijbehorende attributen leest.",
    ],
    example:
      "import pygame\nevent = pygame.event.Event(pygame.KEYDOWN, key=pygame.K_SPACE)\nprint(event.type == pygame.KEYDOWN)\nprint(event.key == pygame.K_SPACE)",
    output: "True\nTrue\n",
    predict: [
      "Why should key only be read for a keyboard event?",
      "Waarom hoort key alleen bij een toetsenbordgebeurtenis gelezen te worden?",
    ],
    preview: {
      setup: "bright = False",
      events:
        "if game.should_close(event.type):\n    running = False\nif event.type == pygame.KEYDOWN:\n    bright = game.toggle(bright, event.key)",
      draw: "if bright:\n    screen.fill((240,240,240))",
    },
    starter:
      "def toggle(bright, key):\n    return bright\n\ndef should_close(event_type):\n    return False\n",
    solution:
      "def toggle(bright, key):\n    if key == pygame.K_SPACE:\n        return not bright\n    return bright\n\ndef should_close(event_type):\n    return event_type == pygame.QUIT\n",
    tasks: [
      {
        name: "toggle",
        task: [
          "Toggle bright only for the Space key. Keep other keys unchanged; use Escape or Finish & check to close.",
          "Schakel bright alleen om voor de spatiebalk. Laat andere toetsen onveranderd; gebruik Escape of afronden en controleren om te sluiten.",
        ],
        help: [
          "Compare key with pygame.K_SPACE and return not bright only on a match.",
          "Vergelijk key met pygame.K_SPACE en geef alleen bij een overeenkomst not bright terug.",
        ],
        fragment: "return not bright",
        cases: [
          [[false, 32], "_return is True"],
          [[true, 32], "_return is False"],
          [[false, 97], "_return is False"],
        ],
      },
      {
        name: "should_close",
        task: [
          "Return True for pygame.QUIT and False for other event types. The supplied loop keeps an emergency close path while you finish this helper.",
          "Geef True voor pygame.QUIT en False voor andere gebeurtenistypen. De aangeleverde lus bewaart een nooduitgang terwijl je deze hulp afmaakt.",
        ],
        help: [
          "Compare event_type with pygame.QUIT; the comparison itself returns a Boolean.",
          "Vergelijk event_type met pygame.QUIT; de vergelijking zelf geeft een booleaanse waarde terug.",
        ],
        fragment: "event_type == pygame.QUIT",
        cases: [
          [[256], "_return is True"],
          [[768], "_return is False"],
          [[1024], "_return is False"],
        ],
      },
    ],
    change: [
      "Press and release Space twice; explain the two state changes.",
      "Druk Space tweemaal in en laat los; leg de twee toestandsveranderingen uit.",
    ],
    explain: [
      "The loop filters keyboard events; the helper decides the effect of one key press.",
      "De lus filtert toetsenbordgebeurtenissen; de hulp beslist het gevolg van één toetsdruk.",
    ],
  }),
  f("score-label", {
    title: ["Draw text on the court", "Teken tekst op het speelveld"],
    topics: "pygame-text blit",
    requires: "surface str-conversion f-strings",
    guidance: "independent",
    why: [
      "Score text is another image that can be drawn onto the game screen.",
      "Scoretekst is nog een afbeelding die op het spelscherm kan worden getekend.",
    ],
    teach: [
      "pygame.font.Font(None, size) uses a default font at the requested size. Call render(text, True, colour) to create a Surface of the text; True enables smoother edges. The display loop then blits that Surface. Convert numeric scores into text before rendering. pygame.init() in the supplied startup initialises font support.",
      "pygame.font.Font(None, size) gebruikt een standaardlettertype met de gevraagde grootte. Roep render(text, True, colour) aan om een Surface van de tekst te maken; True maakt de randen gladder. De schermlus kopieert daarna die Surface. Zet numerieke scores vóór tekenen om naar tekst. pygame.init() in de aangeleverde start initialiseert lettertypeondersteuning.",
    ],
    rule: [
      "Render text to a Surface, then blit that Surface.",
      "Teken tekst naar een Surface en kopieer daarna die Surface.",
    ],
    example:
      'import pygame\npygame.font.init()\nfont = pygame.font.Font(None,24)\nlabel = font.render("Ready", True, (255,255,255))\nprint(label.get_width() > 0)',
    output: "True\n",
    predict: [
      "Does render itself place the label on the display?",
      "Plaatst render het label zelf op het scherm?",
    ],
    preview: {
      draw: "font = pygame.font.Font(None,36)\nscreen.blit(font.render(game.label(2,3),True,(240,240,240)),(270,20))",
    },
    starter: 'def label(left, right):\n    return ""\n',
    solution: 'def label(left, right):\n    return f"{left} : {right}"\n',
    tasks: [
      {
        name: "label",
        task: [
          "Return the two scores as text in the form 2 : 3 for the supplied renderer.",
          "Geef de twee scores terug als tekst in de vorm 2 : 3 voor de aangeleverde tekenaar.",
        ],
        help: [
          "Format the parameters, including spaces around the colon.",
          "Formatteer de parameters, inclusief spaties rond de dubbele punt.",
        ],
        fragment: 'f"{left} : {right}"',
        cases: [
          [[0, 0], '_return == "0 : 0"'],
          [[12, 3], '_return == "12 : 3"'],
        ],
      },
    ],
    change: [
      "Change the display font size and the label position separately.",
      "Verander de schermlettergrootte en de labelpositie apart.",
    ],
    explain: [
      "The helper formats data; the supplied rendering code turns it into visible pixels.",
      "De hulp formatteert gegevens; de aangeleverde tekencode zet ze om in zichtbare pixels.",
    ],
  }),
];
