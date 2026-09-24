import { gameLesson as G } from "./game-authoring.mjs";
const f = (slug, s) => G(16, slug, s);
const dot = "pygame.draw.circle(screen,(240,200,80),(int(x),int(y)),6)";
export const activities = [
  f("velocity", {
    title: ["Move by elapsed time", "Beweeg met verstreken tijd"],
    topics: "velocity elapsed-time",
    requires: "coordinates multiple-returns multiplication",
    why: [
      "Movement should depend on elapsed time, not how many frames a computer draws.",
      "Beweging hoort af te hangen van verstreken tijd, niet van het aantal getekende beelden.",
    ],
    teach: [
      "Position says where an object is. Velocity says how many pixels it travels each second, with sign giving direction. dt is elapsed seconds for this frame. The supplied clock reports milliseconds, so main.py divides by 1000. Update position with velocity * dt. Keep position as a float and convert to int only when drawing. The browser loop caps very long frame gaps to avoid a huge jump.",
      "Positie zegt waar een object is. Snelheid zegt hoeveel pixels het per seconde aflegt, met het teken voor richting. dt is het verstreken aantal seconden voor dit beeld. De aangeleverde klok geeft milliseconden, daarom deelt main.py door 1000. Werk positie bij met snelheid * dt. Bewaar positie als float en zet alleen bij tekenen om naar int. De browserlus begrenst zeer lange tussenpozen om een enorme sprong te voorkomen.",
    ],
    rule: [
      "New position = old position + velocity × elapsed seconds.",
      "Nieuwe positie = oude positie + snelheid × verstreken seconden.",
    ],
    example: "x = 10.0\nspeed = 120\ndt = 0.25\nx += speed * dt\nprint(x)",
    output: "40.0\n",
    predict: [
      "How far would the object move in half as much time?",
      "Hoe ver beweegt het object in half zoveel tijd?",
    ],
    preview: {
      setup: "x,y = 20.0,200.0",
      frame: "x = game.advance(x,80,dt)\nif x > 640:\n    x = 0",
      draw: dot,
    },
    starter: "def advance(position, velocity, dt):\n    return position\n",
    solution:
      "def advance(position, velocity, dt):\n    return position + velocity * dt\n",
    tasks: [
      {
        name: "advance",
        task: [
          "Return the position after moving at velocity for dt seconds.",
          "Geef de positie terug na beweging met velocity gedurende dt seconden.",
        ],
        help: [
          "Multiply velocity by time before adding the old position.",
          "Vermenigvuldig snelheid met tijd voordat je de oude positie optelt.",
        ],
        fragment: "position + velocity * dt",
        cases: [
          [[10, 120, 0.25], "_return == 40"],
          [[10, -20, 0.5], "_return == 0"],
          [[5, 200, 0], "_return == 5"],
        ],
      },
    ],
    change: [
      "Compare one 0.1-second step with two 0.05-second steps.",
      "Vergelijk één stap van 0,1 seconde met twee stappen van 0,05 seconde.",
    ],
    explain: [
      "Elapsed-time scaling keeps distance consistent across different frame rates.",
      "Schalen met verstreken tijd houdt afstand consistent bij verschillende beeldsnelheden.",
    ],
  }),
  f("held-controls", {
    title: [
      "Hold keys to move both paddles",
      "Houd toetsen vast om beide batjes te bewegen",
    ],
    topics: "held-keys simultaneous-controls",
    requires: "keyboard-events velocity",
    why: [
      "A held-key state answers whether a key is down now. It supports smooth continuous controls.",
      "Een vastgehouden-toetstoestand zegt of een toets nu ingedrukt is. Dat ondersteunt vloeiende doorlopende bediening.",
    ],
    teach: [
      "pygame.key.get_pressed() returns states indexed by key constants, such as keys[pygame.K_w]. Check both players independently each frame; an elif between players would prevent simultaneous movement. For one paddle, subtract speed for up and add speed for down. If both are held, these changes cancel. KEYDOWN is still suitable for one-off actions such as serving.",
      "pygame.key.get_pressed() geeft toestanden die je met toetsconstanten benadert, zoals keys[pygame.K_w]. Controleer beide spelers onafhankelijk bij elk beeld; een elif tussen spelers verhindert gelijktijdige beweging. Trek voor één batje snelheid af bij omhoog en tel snelheid op bij omlaag. Als beide vaststaan, heffen veranderingen elkaar op. KEYDOWN blijft geschikt voor eenmalige acties zoals serveren.",
    ],
    rule: [
      "Read held keys every frame and update each player independently.",
      "Lees vastgehouden toetsen bij elk beeld en werk elke speler onafhankelijk bij.",
    ],
    example:
      "up = True\ndown = True\ndirection = 0\nif up:\n    direction -= 1\nif down:\n    direction += 1\nprint(direction)",
    output: "0\n",
    predict: [
      "Why is this two if statements instead of if/elif?",
      "Waarom zijn dit twee if-instructies in plaats van if/elif?",
    ],
    preview: {
      setup: "left,right = 170.0,170.0",
      frame:
        "left += game.direction(keys[pygame.K_w],keys[pygame.K_s]) * 200 * dt\nright += game.direction(keys[pygame.K_UP],keys[pygame.K_DOWN]) * 200 * dt",
      draw: "pygame.draw.rect(screen,(240,240,240),(20,left,10,60))\npygame.draw.rect(screen,(240,240,240),(610,right,10,60))",
    },
    starter: "def direction(up, down):\n    return 0\n",
    solution:
      "def direction(up, down):\n    value = 0\n    if up:\n        value -= 1\n    if down:\n        value += 1\n    return value\n",
    tasks: [
      {
        name: "direction",
        task: [
          "Return -1 for up alone, 1 for down alone, and 0 for both or neither.",
          "Geef -1 bij alleen omhoog, 1 bij alleen omlaag en 0 bij beide of geen.",
        ],
        help: [
          "Apply each key’s contribution separately.",
          "Pas de bijdrage van elke toets apart toe.",
        ],
        fragment: "if down:",
        cases: [
          [[true, false], "_return == -1"],
          [[false, true], "_return == 1"],
          [[true, true], "_return == 0"],
          [[false, false], "_return == 0"],
        ],
      },
    ],
    change: [
      "Hold W and Down simultaneously in the preview. Both paddles should move.",
      "Houd W en Down tegelijk vast in het voorbeeld. Beide batjes horen te bewegen.",
    ],
    explain: [
      "Independent state checks allow simultaneous controls without one player excluding the other.",
      "Onafhankelijke toestandscontroles laten gelijktijdige bediening toe zonder dat de ene speler de andere uitsluit.",
    ],
  }),
  f("boundaries", {
    title: ["Keep a paddle inside the court", "Houd een batje binnen het veld"],
    topics: "boundaries",
    requires: "velocity inclusive-comparisons",
    why: [
      "A paddle has height. Its top-left coordinate must stop before its bottom leaves the court.",
      "Een batje heeft hoogte. Zijn linkerbovenpositie moet stoppen voordat de onderkant het veld verlaat.",
    ],
    teach: [
      "For a court height H and paddle height h, the top coordinate must remain between 0 and H - h. First calculate movement, then clamp to that interval. Clamping means replacing values below the lower bound or above the upper bound with that bound. min and max are built-in functions that can express the same rule, but ordinary if statements work too.",
      "Voor veldhoogte H en batjeshoogte h moet de bovenpositie tussen 0 en H - h blijven. Bereken eerst beweging en begrens daarna tot dat interval. Begrenzen vervangt waarden onder de ondergrens of boven de bovengrens door die grens. min en max zijn ingebouwde functies die dezelfde regel uitdrukken, maar gewone if-instructies werken ook.",
    ],
    rule: [
      "Limit the whole shape, not just its top coordinate.",
      "Begrens de hele vorm, niet alleen zijn bovenpositie.",
    ],
    example:
      "height = 100\npaddle_height = 20\ny = 95\nif y > height - paddle_height:\n    y = height - paddle_height\nprint(y)",
    output: "80\n",
    predict: ["Why is the maximum not 100?", "Waarom is het maximum niet 100?"],
    preview: {
      setup: "y = 170.0",
      frame:
        "if keys[pygame.K_UP]:\n    y -= 200 * dt\nif keys[pygame.K_DOWN]:\n    y += 200 * dt\ny = game.clamp(y,400,60)",
      draw: "pygame.draw.rect(screen,(240,240,240),(20,y,10,60))",
    },
    starter: "def clamp(y, court_height, paddle_height):\n    return y\n",
    solution:
      "def clamp(y, court_height, paddle_height):\n    if y < 0:\n        return 0\n    if y > court_height - paddle_height:\n        return court_height - paddle_height\n    return y\n",
    tasks: [
      {
        name: "clamp",
        task: [
          "Clamp y to the allowed paddle interval. Assume the paddle fits inside the court.",
          "Begrens y tot het toegestane batjesinterval. Neem aan dat het batje in het veld past.",
        ],
        help: [
          "Subtract the paddle height when calculating the bottom limit.",
          "Trek de batjeshoogte af bij het berekenen van de ondergrens.",
        ],
        fragment: "court_height - paddle_height",
        cases: [
          [[-10, 400, 60], "_return == 0"],
          [[390, 400, 60], "_return == 340"],
          [[25, 100, 20], "_return == 25"],
        ],
      },
    ],
    change: [
      "Test a different court and paddle height instead of hard-coding 340.",
      "Test een andere veld- en batjeshoogte in plaats van 340 vast in te vullen.",
    ],
    explain: [
      "The lower edge equals y plus paddle height, so the top’s maximum must subtract that height.",
      "De onderrand is y plus batjeshoogte; het maximum van de bovenkant moet die hoogte dus aftrekken.",
    ],
  }),
  f("wall-bounce", {
    title: ["Bounce once at a wall", "Stuiter eenmaal tegen een wand"],
    topics: "wall-collision direction-aware-collision",
    requires: "velocity boundaries multiple-returns",
    why: [
      "Changing direction without correcting position can leave a ball stuck bouncing repeatedly inside a wall.",
      "Van richting veranderen zonder de positie te herstellen kan een bal in een wand laten blijven stuiteren.",
    ],
    teach: [
      "Treat y as the ball centre and radius as its size. At the top, y must be at least radius. At the bottom, y must be at most height - radius. Reverse vy only when it points into the wall, and put the ball back on the boundary. A ball already moving away should keep its direction.",
      "Beschouw y als het balmiddelpunt en radius als zijn grootte. Boven moet y minstens radius zijn. Onder mag y maximaal height - radius zijn. Keer vy alleen om als het naar de wand wijst en zet de bal terug op de grens. Een bal die al weg beweegt hoort zijn richting te behouden.",
    ],
    rule: [
      "Correct overlap and reverse only an incoming velocity.",
      "Herstel overlap en keer alleen een inkomende snelheid om.",
    ],
    example:
      "y, vy = 3, -100\nif y <= 6 and vy < 0:\n    y, vy = 6, -vy\nprint(y, vy)",
    output: "6 100\n",
    predict: [
      "What happens on the next check when vy is positive?",
      "Wat gebeurt er bij de volgende controle wanneer vy positief is?",
    ],
    preview: {
      setup: "x,y,vy = 320.0,200.0,150.0",
      frame: "y += vy * dt\ny,vy = game.bounce(y,vy,400,6)",
      draw: dot,
    },
    starter: "def bounce(y, vy, height, radius):\n    return y, vy\n",
    solution:
      "def bounce(y, vy, height, radius):\n    if y <= radius and vy < 0:\n        return radius, -vy\n    if y >= height - radius and vy > 0:\n        return height - radius, -vy\n    return y, vy\n",
    tasks: [
      {
        name: "bounce",
        task: [
          "Return corrected (y, vy) at the top and bottom, leaving a departing or interior ball unchanged.",
          "Geef herstelde (y, vy) boven en onder terug en laat een vertrekkende of interne bal ongewijzigd.",
        ],
        help: [
          "Combine each position test with the matching velocity direction.",
          "Combineer elke positietest met de passende snelheidsrichting.",
        ],
        fragment: "if y <= radius and vy < 0:",
        cases: [
          [[2, -100, 400, 6], "_return == (6,100)"],
          [[398, 100, 400, 6], "_return == (394,-100)"],
          [[6, 100, 400, 6], "_return == (6,100)"],
          [[100, -50, 400, 6], "_return == (100,-50)"],
        ],
      },
    ],
    change: [
      "Call bounce twice on the first corrected result and check that direction stays stable.",
      "Roep bounce tweemaal aan op het eerste herstelde resultaat en controleer dat de richting stabiel blijft.",
    ],
    explain: [
      "Position correction removes overlap; the direction condition prevents a second unwanted reversal.",
      "Positieherstel verwijdert overlap; de richtingsvoorwaarde voorkomt een tweede ongewenste omkering.",
    ],
  }),
  f("paddle-contact", {
    title: ["Use Rect collision detection", "Gebruik Rect-botsingsdetectie"],
    topics: "paddle-collision overlap-correction",
    requires: "rect object-methods direction-aware-collision",
    why: [
      "Pygame can detect rectangle overlap, letting you focus on the game response.",
      "Pygame kan overlap tussen rechthoeken detecteren zodat je je op de spelreactie kunt richten.",
    ],
    teach: [
      "ball.colliderect(paddle) returns True for overlapping rectangles; touching edges alone do not overlap. Use a small Rect around the ball for this beginner game. For the left paddle, reverse only vx < 0 and move the ball centre to paddle.right + radius. The right paddle mirrors this with vx > 0 and paddle.left - radius. At very high speeds discrete checks can miss contacts, so keep this first game at modest speeds with the supplied dt cap.",
      "ball.colliderect(paddle) geeft True bij overlappende rechthoeken; alleen rakende randen overlappen niet. Gebruik een kleine Rect rond de bal voor dit beginnersspel. Keer bij het linkerbatje alleen vx < 0 om en verplaats het balmiddelpunt naar paddle.right + radius. Het rechterbatje spiegelt dit met vx > 0 en paddle.left - radius. Bij zeer hoge snelheid kunnen losse controles contacten missen, dus houd dit eerste spel op bescheiden snelheid met de aangeleverde dt-grens.",
    ],
    rule: [
      "Detect contact, correct the position, then send the ball away.",
      "Detecteer contact, herstel de positie en stuur de bal daarna weg.",
    ],
    example:
      "import pygame\na = pygame.Rect(0,0,10,10)\nb = pygame.Rect(9,0,10,10)\nprint(a.colliderect(b))\nb.left = 10\nprint(a.colliderect(b))",
    output: "True\nFalse\n",
    predict: [
      "Why is the second result False?",
      "Waarom is het tweede resultaat False?",
    ],
    preview: {
      setup: "x,y,vx = 200.0,200.0,-100.0",
      frame:
        "x += vx * dt\nx,vx = game.hit_left(x,y,vx,170)\nif x > 630:\n    vx = -100",
      draw: dot + "\npygame.draw.rect(screen,(240,240,240),(20,170,10,60))",
    },
    starter: "def hit_left(x, y, vx, paddle_y):\n    return x, vx\n",
    solution:
      "def hit_left(x, y, vx, paddle_y):\n    ball = pygame.Rect(x-6,y-6,12,12)\n    paddle = pygame.Rect(20,paddle_y,10,60)\n    if ball.colliderect(paddle) and vx < 0:\n        return paddle.right + 6, -vx\n    return x, vx\n",
    tasks: [
      {
        name: "hit_left",
        task: [
          "Handle left-paddle contact for a radius-6 ball and a paddle at x=20 with size 10×60. Return (x, vx).",
          "Verwerk contact met het linkerbatje voor een bal met straal 6 en een batje op x=20 van 10×60. Geef (x, vx) terug.",
        ],
        help: [
          "Build both Rects and require leftward velocity before reversing.",
          "Maak beide Rects en eis linkswaartse snelheid vóór omkeren.",
        ],
        fragment: "ball.colliderect(paddle)",
        cases: [
          [[32, 200, -100, 170], "_return == (36,100)"],
          [[32, 200, 100, 170], "_return == (32,100)"],
          [[32, 100, -100, 170], "_return == (32,-100)"],
        ],
      },
    ],
    change: [
      "Move the paddle vertically so the same x position becomes a miss.",
      "Verplaats het batje verticaal zodat dezelfde x-positie een misser wordt.",
    ],
    explain: [
      "Both axes must overlap and the ball must approach the paddle for a bounce.",
      "Beide assen moeten overlappen en de bal moet het batje naderen voor een stuiter.",
    ],
  }),
  f("score-once", {
    title: ["Score a miss once", "Tel een misser eenmaal"],
    topics: "scoring misses",
    requires: "multiple-returns elif",
    why: [
      "A ball outside the field stays outside on later frames unless the game changes its state. Reset it when awarding a point.",
      "Een bal buiten het veld blijft in latere beelden buiten tenzij het spel zijn toestand verandert. Zet de bal terug wanneer je een punt toekent.",
    ],
    teach: [
      "When the centre is beyond -radius, the right player scores; beyond width + radius, the left player scores. In the same update, put the ball at the centre and set horizontal velocity to zero. On the next frame it is inside the court, so no second point is awarded. Waiting for a serve is a simple state represented here by zero velocity.",
      "Wanneer het middelpunt voorbij -radius is, scoort de rechterspeler; voorbij width + radius scoort de linkerspeler. Zet in dezelfde update de bal in het midden en horizontale snelheid op nul. In het volgende beeld staat hij binnen het veld en wordt geen tweede punt toegekend. Wachten op een service is hier een eenvoudige toestand voorgesteld door snelheid nul.",
    ],
    rule: [
      "Award the point and leave the scoring condition in the same update.",
      "Ken het punt toe en verlaat de scorevoorwaarde in dezelfde update.",
    ],
    example:
      "x, score = -8, 0\nif x < -6:\n    score += 1\n    x = 320\nprint(score,x)",
    output: "1 320\n",
    predict: [
      "Would this condition still match on the next frame?",
      "Geldt deze voorwaarde in het volgende beeld nog steeds?",
    ],
    preview: {
      setup: "x,y,vx,left,right = 320.0,200.0,-180.0,0,0",
      frame: "x += vx * dt\nx,vx,left,right = game.miss(x,vx,left,right)",
      draw:
        dot +
        '\nfont = pygame.font.Font(None,30)\nscreen.blit(font.render(f"{left} : {right}",True,(240,240,240)),(280,20))',
    },
    starter: "def miss(x, vx, left, right):\n    return x, vx, left, right\n",
    solution:
      "def miss(x, vx, left, right):\n    if x < -6:\n        return 320, 0, left, right + 1\n    if x > 646:\n        return 320, 0, left + 1, right\n    return x, vx, left, right\n",
    tasks: [
      {
        name: "miss",
        task: [
          "Implement a single point and centre reset for misses on either side of the 640-wide court. Return (x, vx, left, right).",
          "Implementeer één punt en een terugzetting naar het midden bij missers aan beide kanten van het 640 brede veld. Geef (x, vx, left, right) terug.",
        ],
        help: [
          "Change score and position together; preserve state while the ball is still in bounds.",
          "Verander score en positie samen; behoud toestand zolang de bal nog binnen is.",
        ],
        fragment: "return 320, 0, left, right + 1",
        cases: [
          [[-7, -100, 2, 3], "_return == (320,0,2,4)"],
          [[647, 100, 2, 3], "_return == (320,0,3,3)"],
          [[320, 0, 2, 4], "_return == (320,0,2,4)"],
        ],
      },
    ],
    change: [
      "Leave the preview running after the miss. Check that the score stops increasing.",
      "Laat het voorbeeld na de misser draaien. Controleer dat de score niet verder stijgt.",
    ],
    explain: [
      "Resetting x removes the condition that awarded the point; zero velocity keeps the ball waiting.",
      "x terugzetten verwijdert de voorwaarde die het punt opleverde; snelheid nul laat de bal wachten.",
    ],
  }),
  f("serve", {
    title: [
      "Start the next rally deliberately",
      "Begin de volgende rally bewust",
    ],
    topics: "serving game-state game-review",
    practices: "events velocity scoring",
    requires: "scoring keyboard-events wall-collision",
    guidance: "independent",
    minutes: 22,
    why: [
      "A serve starts a waiting ball without resetting an already active rally.",
      "Een service start een wachtende bal zonder een al actieve rally terug te zetten.",
    ],
    teach: [
      "Treat vx == 0 as waiting and a nonzero vx as playing. A Space KEYDOWN event may start a waiting ball; pressing Space during play leaves its velocity unchanged. Keep the event as a one-frame request. The supplied scene stops the ball after a miss. Add this transition and test repeated key presses, a miss, then a new serve.",
      "Beschouw vx == 0 als wachten en niet-nul vx als spelen. Een Space KEYDOWN-gebeurtenis mag een wachtende bal starten; Space tijdens spelen laat de snelheid ongewijzigd. Houd de gebeurtenis als een verzoek voor één beeld. De aangeleverde scène stopt de bal na een misser. Voeg deze overgang toe en test herhaalde toetsdrukken, een misser en daarna een nieuwe service.",
    ],
    rule: [
      "A control’s effect depends on both the event and the current state.",
      "Het gevolg van bediening hangt af van zowel gebeurtenis als huidige toestand.",
    ],
    example:
      "waiting = True\npressed = True\nif waiting and pressed:\n    waiting = False\nprint(waiting)",
    output: "False\n",
    predict: [
      "Why should a second press not reset an active rally?",
      "Waarom hoort een tweede druk een actieve rally niet terug te zetten?",
    ],
    preview: {
      setup: "x,y,vx = 320.0,200.0,0.0",
      events:
        "if event.type == pygame.KEYDOWN:\n    vx = game.serve(vx,event.key == pygame.K_SPACE)",
      frame: "x += vx * dt\nif x > 646:\n    x,vx = 320.0,0.0",
      draw: dot,
    },
    starter: "def serve(vx, pressed):\n    return vx\n",
    solution:
      "def serve(vx, pressed):\n    if vx == 0 and pressed:\n        return 180\n    return vx\n",
    tasks: [
      {
        name: "serve",
        task: [
          "Return velocity 180 only when the ball is waiting and Space was pressed; otherwise preserve vx.",
          "Geef snelheid 180 alleen als de bal wacht en Space is ingedrukt; behoud anders vx.",
        ],
        help: [
          "Combine the waiting-state test with the event flag.",
          "Combineer de wachttoestandstest met de gebeurteniswaarde.",
        ],
        fragment: "if vx == 0 and pressed:",
        cases: [
          [[0, true], "_return == 180"],
          [[0, false], "_return == 0"],
          [[-120, true], "_return == -120"],
          [[180, false], "_return == 180"],
        ],
      },
    ],
    change: [
      "Click outside the preview, return focus, and serve again. Stop, then start a fresh run.",
      "Klik buiten het voorbeeld, keer terug en serveer opnieuw. Stop en start daarna een nieuwe uitvoering.",
    ],
    explain: [
      "The guard restricts serving to a waiting ball, preserving an active rally.",
      "De bewaking beperkt serveren tot een wachtende bal en bewaart een actieve rally.",
    ],
  }),
];
