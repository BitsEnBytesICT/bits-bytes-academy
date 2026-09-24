import { L, section, lesson, quiz, question } from "./authoring.mjs";
import { previewSection, gameTask } from "./game-authoring.mjs";

const probe = (name, args, check) => ({
  moduleOnly: true,
  call: { module: "rules", name, args },
  check: "_error is None and (" + check + ")",
});
function preview(setup, update, draw, events = "") {
  return `import asyncio
import pygame
import rules

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 28)
    running = True
${setup}    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                running = False
${events}        dt = min(clock.tick() / 1000, 0.05)
        keys = pygame.key.get_pressed()
${update}        screen.fill((16, 23, 39))
${draw}        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`;
}
const contactMain = preview(
  "    paddle = pygame.Rect(280, 140, 12, 120)\n    x, y = 320.0, 190.0\n",
  "        x += (int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])) * 140 * dt\n        y += (int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])) * 140 * dt\n        ball = pygame.Rect(round(x), round(y), 16, 16)\n        touching = rules.overlaps(list(ball), list(paddle))\n",
  "        pygame.draw.rect(screen, (80, 180, 255), paddle)\n        pygame.draw.rect(screen, (255, 145, 50) if touching else (255,255,255), ball)\n",
);
const collision = lesson({
  module: 10,
  number: 1,
  title: L("Detect paddle contact", "Detecteer paddlecontact"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 20,
  explanation: L(
    "Use the arrow keys to slide a square ball around a paddle. It should change colour only while their rectangles overlap. This is the collision model we will use for Pong: a rectangular hitbox around the ball, rather than a mathematically exact circle.",
    "Gebruik de pijltjestoetsen om een vierkante bal rond een paddle te schuiven. Die mag alleen van kleur veranderen wanneer de rechthoeken overlappen. Dit is het botsingsmodel voor Pong: een rechthoekig raakvlak rond de bal, geen wiskundig exacte cirkel.",
  ),
  sections: [
    section(
      L("Overlap needs both axes", "Overlap vereist beide assen"),
      L(
        "overlaps(ball, paddle) receives two sequences in (left, top, width, height) order and returns a Boolean. pygame.Rect can be constructed from such a sequence. Rect.colliderect(other) checks for a nonempty overlapping area. Merely touching edges is not overlap. Both horizontal and vertical ranges matter; a ball passing above a paddle should miss.",
        "overlaps(ball, paddle) ontvangt twee reeksen in de volgorde (links, boven, breedte, hoogte) en geeft een Boolean terug. pygame.Rect kan uit zo’n reeks worden gemaakt. Rect.colliderect(other) controleert op een overlappend gebied met oppervlakte. Alleen rakende randen zijn geen overlap. Zowel horizontale als verticale bereiken tellen mee; een bal boven een paddle moet missen.",
      ),
      "import pygame\nfirst = pygame.Rect(0, 0, 10, 10)\nsecond = pygame.Rect(10, 0, 10, 10)\nprint(first.colliderect(second))",
      "False",
    ),
    previewSection,
  ],
  starter: {
    "main.py": contactMain,
    "rules.py":
      "import pygame\n\ndef overlaps(ball, paddle):\n    ball_rect = pygame.Rect(ball)\n    paddle_rect = pygame.Rect(paddle)\n    return ball_rect.left < paddle_rect.right\n",
  },
  solution: {
    "main.py": contactMain,
    "rules.py":
      "import pygame\n\ndef overlaps(ball, paddle):\n    return pygame.Rect(ball).colliderect(pygame.Rect(paddle))\n",
  },
  tasks: [
    gameTask(
      L(
        "Recognise real overlaps, including a ball partly covering a paddle edge.",
        "Herken echte overlap, ook wanneer een bal een paddlerand deels bedekt.",
      ),
      [
        L(
          "One corner does not need to be inside for every possible overlap.",
          "Niet bij elke mogelijke overlap hoeft één hoek binnen te liggen.",
        ),
        L(
          "The library already provides a rectangle-overlap operation.",
          "De bibliotheek biedt al een rechthoek-overlapbewerking.",
        ),
        L(
          "Read the Rect.colliderect documentation and its return type.",
          "Lees de documentatie en het returntype van Rect.colliderect.",
        ),
      ],
      L(
        "Return a Boolean for overlapping hitboxes.",
        "Geef een Boolean voor overlappende raakvlakken terug.",
      ),
      [
        probe(
          "overlaps",
          [
            [30, 60, 16, 16],
            [24, 40, 12, 72],
          ],
          "_return is True",
        ),
        probe(
          "overlaps",
          [
            [20, 20, 100, 100],
            [24, 40, 12, 72],
          ],
          "_return is True",
        ),
      ],
    ),
    gameTask(
      L(
        "Reject misses above, below, left, and right of the paddle.",
        "Wijs missers boven, onder, links en rechts van de paddle af.",
      ),
      [
        L(
          "Overlap on one axis alone is not enough.",
          "Overlap op slechts één as is niet genoeg.",
        ),
        L(
          "Check vertical separation as well as horizontal separation.",
          "Controleer verticale én horizontale scheiding.",
        ),
        L(
          "A shared x coordinate does not imply a shared y range.",
          "Een gedeelde x-coördinaat betekent geen gedeeld y-bereik.",
        ),
      ],
      L(
        "Separated rectangles must not collide.",
        "Gescheiden rechthoeken mogen niet botsen.",
      ),
      [
        [24, 0, 16, 16],
        [24, 130, 16, 16],
        [0, 60, 16, 16],
        [50, 60, 16, 16],
      ].map((ball) =>
        probe("overlaps", [ball, [24, 40, 12, 72]], "_return is False"),
      ),
    ),
    gameTask(
      L(
        "Treat touching edges as a miss and leave both input sequences unchanged. Try the corners in the preview.",
        "Behandel rakende randen als een misser en laat beide invoerreeksen ongemoeid. Probeer de hoeken in het voorbeeld.",
      ),
      [
        L(
          "A zero-width overlap has no area.",
          "Overlap met breedte nul heeft geen oppervlakte.",
        ),
        L(
          "Rect uses an exclusive right and bottom edge for collision.",
          "Rect gebruikt een exclusieve rechter- en onderrand voor botsingen.",
        ),
        L(
          "Creating a Rect from a list need not edit that list.",
          "Een Rect uit een lijst maken hoeft die lijst niet te veranderen.",
        ),
      ],
      L(
        "Respect edge-only contact and preserve the inputs.",
        "Respecteer contact met alleen de rand en behoud de invoer.",
      ),
      [
        probe(
          "overlaps",
          [
            [36, 60, 16, 16],
            [24, 40, 12, 72],
          ],
          "_return is False and _args == [[36,60,16,16],[24,40,12,72]]",
        ),
        probe(
          "overlaps",
          [
            [24, 112, 16, 16],
            [24, 40, 12, 72],
          ],
          "_return is False",
        ),
      ],
    ),
  ],
});

const reflectMain = preview(
  "    paddle = pygame.Rect(24, 164, 12, 72)\n    x = 400.0\n    vx = -180.0\n",
  '        x += vx * dt\n        ball = pygame.Rect(round(x), 190, 16, 16)\n        corrected_x, new_vx = rules.paddle_response(list(ball), list(paddle), vx, "left")\n        if new_vx != vx:\n            x = corrected_x\n        vx = new_vx\n        if x > 620:\n            vx = -abs(vx)\n',
  "        pygame.draw.rect(screen, (80,180,255), paddle)\n        pygame.draw.rect(screen, (255,255,255), (round(x),190,16,16))\n",
);
const reflect = lesson({
  module: 10,
  number: 2,
  title: L("Resolve contact only once", "Los contact één keer op"),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 22,
  explanation: L(
    "A bounce needs more than a sign change. The ball can still overlap the paddle on the next frame, causing repeated reversals. Repair the response by moving it clear of the paddle and checking whether it was travelling toward that paddle.",
    "Een botsing vereist meer dan een tekenwissel. De bal kan in het volgende beeld nog met de paddle overlappen, waardoor hij herhaaldelijk omkeert. Herstel de reactie door hem vrij van de paddle te plaatsen en te controleren of hij naar die paddle bewoog.",
  ),
  sections: [
    section(
      L("Contact, direction, correction", "Contact, richting, correctie"),
      L(
        'paddle_response(ball, paddle, vx, side) returns (new_left, new_vx). ball and paddle are rectangle sequences; side is "left" or "right". Only react if their areas overlap and vx points toward that side. At the left paddle, place the ball’s left at paddle.right and make vx positive. At the right paddle, place its right at paddle.left and make vx negative. Preserve speed magnitude. For a miss, outgoing ball, or zero speed, return the original ball-left and vx. Leave input sequences unchanged.',
        'paddle_response(ball, paddle, vx, side) geeft (new_left, new_vx) terug. ball en paddle zijn rechthoekreeksen; side is "left" of "right". Reageer alleen als hun gebieden overlappen en vx naar die kant wijst. Zet bij de linkerpaddle de bal-links op paddle.right en maak vx positief. Zet bij de rechterpaddle de bal-rechts op paddle.left en maak vx negatief. Behoud de snelheidsomvang. Geef bij een misser, wegbewegende bal of snelheid nul de oorspronkelijke bal-links en vx terug. Laat invoerreeksen ongemoeid.',
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": reflectMain,
    "rules.py":
      "import pygame\n\ndef paddle_response(ball, paddle, vx, side):\n    ball_rect = pygame.Rect(ball)\n    paddle_rect = pygame.Rect(paddle)\n    if ball_rect.colliderect(paddle_rect):\n        vx = -vx\n    return (ball_rect.left, vx)\n",
  },
  solution: {
    "main.py": reflectMain,
    "rules.py":
      'import pygame\n\ndef paddle_response(ball, paddle, vx, side):\n    b, p = pygame.Rect(ball), pygame.Rect(paddle)\n    if b.colliderect(p):\n        if side == "left" and vx < 0:\n            return (p.right, -vx)\n        if side == "right" and vx > 0:\n            return (p.left - b.width, -vx)\n    return (b.left, vx)\n',
  },
  tasks: [
    gameTask(
      L(
        "Reflect incoming contacts on either paddle and keep the speed magnitude.",
        "Kaats inkomend contact bij beide paddles terug en behoud de snelheidsomvang.",
      ),
      [
        L(
          "The two sides face opposite directions.",
          "De twee kanten zijn tegengesteld gericht.",
        ),
        L(
          "Use the side and velocity sign together.",
          "Gebruik kant en snelheidsteken samen.",
        ),
        L(
          "For the left side, a negative vx approaches the paddle.",
          "Aan de linkerkant nadert negatieve vx de paddle.",
        ),
      ],
      L(
        "Incoming left and right contacts need opposite outgoing signs.",
        "Inkomend contact links en rechts vereist tegengestelde uitgaande tekens.",
      ),
      [
        probe(
          "paddle_response",
          [[30, 60, 16, 16], [24, 40, 12, 72], -180, "left"],
          "_return[1] == 180",
        ),
        probe(
          "paddle_response",
          [[290, 60, 16, 16], [300, 40, 12, 72], 180, "right"],
          "_return[1] == -180",
        ),
      ],
    ),
    gameTask(
      L(
        "Place the ball just outside the contacted paddle, accounting for the ball’s width on the right side.",
        "Plaats de bal net buiten de geraakte paddle en houd aan de rechterkant rekening met de balbreedte.",
      ),
      [
        L(
          "A direction change alone leaves the rectangles overlapping.",
          "Alleen van richting veranderen laat de rechthoeken overlappen.",
        ),
        L(
          "Separate the ball and paddle along the horizontal axis.",
          "Scheid bal en paddle langs de horizontale as.",
        ),
        L(
          "If the ball’s right is 300 and its width is 16, its left is 284.",
          "Als bal-rechts 300 en de breedte 16 is, is bal-links 284.",
        ),
      ],
      L(
        "Correct the position to prevent repeated contact.",
        "Corrigeer de positie om herhaald contact te voorkomen.",
      ),
      [
        probe(
          "paddle_response",
          [[30, 60, 16, 16], [24, 40, 12, 72], -180, "left"],
          "_return[0] == 36",
        ),
        probe(
          "paddle_response",
          [[290, 60, 16, 16], [300, 40, 12, 72], 180, "right"],
          "_return[0] == 284",
        ),
      ],
    ),
    gameTask(
      L(
        "Do nothing for misses, stationary balls, or balls already leaving the paddle. Test several rallies in the preview.",
        "Doe niets bij missers, stilstaande ballen of ballen die de paddle al verlaten. Test meerdere rally’s in het voorbeeld.",
      ),
      [
        L(
          "Collision and approach direction are both necessary.",
          "Botsing en naderingsrichting zijn beide nodig.",
        ),
        L(
          "Keep an unchanged-result path for cases without a response.",
          "Behoud een pad met ongewijzigd resultaat voor gevallen zonder reactie.",
        ),
        L(
          "A ball moving right after a left-paddle hit should not flip back left.",
          "Een bal die na een linkerpaddlehit naar rechts beweegt mag niet terug naar links draaien.",
        ),
      ],
      L(
        "Ignore non-contact and outgoing cases without mutating input.",
        "Negeer niet-contact en wegbewegende gevallen zonder invoer te veranderen.",
      ),
      [
        probe(
          "paddle_response",
          [[30, 60, 16, 16], [24, 40, 12, 72], 180, "left"],
          "tuple(_return) == (30,180) and _args[0] == [30,60,16,16]",
        ),
        probe(
          "paddle_response",
          [[30, 0, 16, 16], [24, 40, 12, 72], -180, "left"],
          "tuple(_return) == (30,-180)",
        ),
        probe(
          "paddle_response",
          [[290, 60, 16, 16], [300, 40, 12, 72], -180, "right"],
          "tuple(_return) == (290,-180)",
        ),
        probe(
          "paddle_response",
          [[30, 60, 16, 16], [24, 40, 12, 72], 0, "left"],
          "tuple(_return) == (30,0)",
        ),
      ],
    ),
  ],
});

const scorerMain = preview(
  "    x = 320.0\n",
  "        x += (int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])) * 200 * dt\n        player = rules.scorer(x, 8, 640)\n",
  '        pygame.draw.circle(screen, (255,255,255), (round(x),200),8)\n        label = font.render("Point: " + str(player), True, (255,255,255))\n        screen.blit(label, (20,20))\n',
);
const scoring = lesson({
  module: 10,
  number: 3,
  title: L("Decide when a rally ends", "Bepaal wanneer een rally eindigt"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 18,
  explanation: L(
    "A ball partly beyond the edge is still in play under our rule. Use the arrow keys to move it across either side and decide who earns a point only when it has completely left the court.",
    "Een bal die deels voorbij de rand is, blijft volgens onze regel in het spel. Verplaats die met de pijltjestoetsen over beide kanten en bepaal pas wie een punt krijgt wanneer hij het veld volledig verlaten heeft.",
  ),
  sections: [
    section(
      L("Score for the opposite player", "Een punt voor de andere speler"),
      L(
        'scorer(x, radius, width) receives the ball’s centre x. Return "right" when its rightmost edge is at or left of zero, "left" when its leftmost edge is at or right of width, and None otherwise. The boundary itself is off-screen. Do not award a point merely because the centre crossed an edge. This helper only identifies the scorer; it does not change a score or reset the ball.',
        'scorer(x, radius, width) ontvangt het middelpunt-x van de bal. Geef "right" wanneer zijn meest rechtse rand op of links van nul ligt, "left" wanneer zijn meest linkse rand op of rechts van width ligt en anders None. De grens zelf ligt buiten het scherm. Geef niet al een punt wanneer alleen het middelpunt de rand passeert. Deze helper bepaalt alleen de scorer; die verandert geen score en herstelt de bal niet.',
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": scorerMain,
    "rules.py":
      'def scorer(x, radius, width):\n    if x < 0:\n        return "left"\n    if x > width:\n        return "right"\n    return None\n',
  },
  solution: {
    "main.py": scorerMain,
    "rules.py":
      'def scorer(x, radius, width):\n    if x + radius <= 0:\n        return "right"\n    if x - radius >= width:\n        return "left"\n    return None\n',
  },
  tasks: [
    gameTask(
      L(
        "Award the point to the opposite player when the ball is fully outside either side.",
        "Geef de andere speler het punt wanneer de bal volledig buiten een van beide kanten is.",
      ),
      [
        L(
          "The player who misses does not receive the point.",
          "De speler die mist krijgt het punt niet.",
        ),
        L(
          "Map an exit side to the opposing player.",
          "Koppel een uitstapkant aan de andere speler.",
        ),
        L(
          "Leaving the left side awards the right player.",
          "Links het veld verlaten geeft de rechterspeler een punt.",
        ),
      ],
      L(
        "Choose the opposing scorer on each side.",
        "Kies aan elke kant de andere speler als scorer.",
      ),
      [
        probe("scorer", [-20, 8, 640], '_return == "right"'),
        probe("scorer", [660, 8, 640], '_return == "left"'),
      ],
    ),
    gameTask(
      L(
        "Keep partially visible balls in play. Use the radius, not just the centre.",
        "Houd gedeeltelijk zichtbare ballen in het spel. Gebruik de straal, niet alleen het middelpunt.",
      ),
      [
        L(
          "The ball extends on both sides of its centre.",
          "De bal steekt aan beide kanten van zijn middelpunt uit.",
        ),
        L(
          "Inspect the edge nearest the court when the centre is outside.",
          "Bekijk de rand het dichtst bij het veld wanneer het middelpunt erbuiten is.",
        ),
        L(
          "At x=−3 with radius 8, five pixels still extend into the court.",
          "Bij x=−3 en straal 8 steken nog vijf pixels het veld in.",
        ),
      ],
      L(
        "Return None while any part remains inside.",
        "Geef None zolang een deel nog binnen is.",
      ),
      [
        probe("scorer", [-3, 8, 640], "_return is None"),
        probe("scorer", [643, 8, 640], "_return is None"),
        probe("scorer", [320, 8, 640], "_return is None"),
      ],
    ),
    gameTask(
      L(
        "Handle exact boundary contact and different court widths. Check both edges in the preview.",
        "Handel exact grenscontact en verschillende veldbreedtes af. Controleer beide randen in het voorbeeld.",
      ),
      [
        L(
          "Define equality deliberately, rather than hoping it never happens.",
          "Bepaal gelijkheid bewust in plaats van te hopen dat het nooit voorkomt.",
        ),
        L(
          "Our brief counts a ball with its last edge on the boundary as outside.",
          "Onze opdracht telt een bal met zijn laatste rand op de grens als buiten.",
        ),
        L(
          "Test exactly one radius beyond each court edge.",
          "Test precies één straal voorbij elke veldrand.",
        ),
      ],
      L(
        "Apply the full-exit rule inclusively at both boundaries.",
        "Pas de volledig-buitenregel inclusief op beide grenzen toe.",
      ),
      [
        probe("scorer", [-6, 6, 300], '_return == "right"'),
        probe("scorer", [306, 6, 300], '_return == "left"'),
      ],
    ),
  ],
});

const scoreMain = preview(
  '    state = {"left": 0, "right": 0, "winner": None}\n',
  "",
  '        label = font.render(str(state["left"]) + " : " + str(state["right"]), True, (255,255,255))\n        screen.blit(label, (280,160))\n        status = "Winner: " + str(state["winner"]) if state["winner"] else "A / L: point. R: restart."\n        screen.blit(font.render(status, True, (255,145,50)), (100,220))\n',
  '            if event.type == pygame.KEYDOWN:\n                if event.key == pygame.K_a:\n                    state = rules.award_point(state, "left", 3)\n                elif event.key == pygame.K_l:\n                    state = rules.award_point(state, "right", 3)\n                elif event.key == pygame.K_r:\n                    state = {"left": 0, "right": 0, "winner": None}\n',
);
const match = lesson({
  module: 10,
  number: 4,
  title: L("Keep a match score", "Houd een wedstrijdscore bij"),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 22,
  explanation: L(
    "Test the scoreboard independently of ball physics. A and L award points, R starts a fresh match. Repair the state update so a match ends at its target, stays finished, and does not rewrite the previous state.",
    "Test het scorebord onafhankelijk van balfysica. A en L geven punten, R begint een nieuwe wedstrijd. Repareer de toestandsupdate zodat een wedstrijd bij zijn doel eindigt, afgelopen blijft en de vorige toestand niet overschrijft.",
  ),
  sections: [
    section(
      L("One state transition", "Eén toestandsverandering"),
      L(
        'award_point(state, player, target) returns a new dictionary containing the updated left/right scores and winner. player is "left" or "right"; target is a positive integer. If winner is already set, preserve the whole state. Otherwise add exactly one point to player and set winner when that score reaches or exceeds target. Preserve any other entries and do not mutate state. R in main.py demonstrates a fresh reset.',
        'award_point(state, player, target) geeft een nieuwe dictionary met bijgewerkte left/right-scores en winner terug. player is "left" of "right"; target is een positief geheel getal. Als winner al is ingevuld, behoud je de hele toestand. Anders tel je precies één punt bij player op en stel je winner in wanneer die score target bereikt of overschrijdt. Behoud andere gegevens en verander state niet. R in main.py laat een verse reset zien.',
      ),
    ),
    section(
      L("Text is also an image", "Tekst is ook een afbeelding"),
      L(
        "pygame.font.Font(None, 28) uses the bundled default font. font.render(text, True, colour) returns a Surface containing the text. main.py blits that Surface each frame, just like your earlier scenes. The game redraws the background first so old digits do not remain after a score changes.",
        "pygame.font.Font(None, 28) gebruikt het meegeleverde standaardlettertype. font.render(text, True, colour) geeft een Surface met tekst terug. main.py kopieert die elk beeld met blit, net als je eerdere scènes. Het spel tekent eerst de achtergrond opnieuw zodat oude cijfers niet blijven staan na een scorewijziging.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": scoreMain,
    "rules.py":
      'def award_point(state, player, target):\n    state[player] += 1\n    if state[player] == 5:\n        state["winner"] = player\n    return state\n',
  },
  solution: {
    "main.py": scoreMain,
    "rules.py":
      'def award_point(state, player, target):\n    result = state.copy()\n    if result["winner"] is not None:\n        return result\n    result[player] += 1\n    if result[player] >= target:\n        result["winner"] = player\n    return result\n',
  },
  tasks: [
    gameTask(
      L(
        "Award exactly one point to the chosen player and retain unrelated data without changing the input.",
        "Geef precies één punt aan de gekozen speler en behoud overige gegevens zonder de invoer te veranderen.",
      ),
      [
        L(
          "The previous state may still be needed for display or debugging.",
          "De vorige toestand kan nog nodig zijn voor weergave of debuggen.",
        ),
        L(
          "Make a copy before changing a score.",
          "Maak een kopie voordat je een score verandert.",
        ),
        L(
          "A dictionary copy retains fields you are not updating.",
          "Een dictionarykopie behoudt velden die je niet bijwerkt.",
        ),
      ],
      L(
        "Update only the chosen score in a new dictionary.",
        "Werk alleen de gekozen score in een nieuwe dictionary bij.",
      ),
      [
        probe(
          "award_point",
          [{ left: 1, right: 2, winner: null, round: 4 }, "left", 5],
          '_return == {"left":2,"right":2,"winner":None,"round":4} and _args[0] == {"left":1,"right":2,"winner":None,"round":4} and _return is not _args[0]',
        ),
        probe(
          "award_point",
          [{ left: 1, right: 0, winner: null }, "right", 5],
          '_return["right"] == 1 and _return["left"] == 1',
        ),
      ],
    ),
    gameTask(
      L(
        "Recognise either player winning at the supplied target, including a one-point match.",
        "Herken dat beide spelers bij het opgegeven doel kunnen winnen, ook in een wedstrijd van één punt.",
      ),
      [
        L(
          "The winning target is an argument, not a fixed constant.",
          "Het winnende doel is een argument, geen vaste constante.",
        ),
        L(
          "Check the updated score against that target.",
          "Controleer de bijgewerkte score tegen dat doel.",
        ),
        L(
          "Reaching or exceeding a threshold uses an inclusive comparison.",
          "Een drempel bereiken of overschrijden gebruikt een inclusieve vergelijking.",
        ),
      ],
      L(
        "Use the supplied target for either player.",
        "Gebruik het opgegeven doel voor beide spelers.",
      ),
      [
        probe(
          "award_point",
          [{ left: 2, right: 1, winner: null }, "left", 3],
          '_return["winner"] == "left"',
        ),
        probe(
          "award_point",
          [{ left: 0, right: 0, winner: null }, "right", 1],
          '_return["winner"] == "right"',
        ),
      ],
    ),
    gameTask(
      L(
        "Freeze finished matches until R resets them. Try pressing both scoring keys after a win.",
        "Bevries afgelopen wedstrijden totdat R ze herstelt. Probeer na winst beide scoretoetsen in te drukken.",
      ),
      [
        L(
          "A finished state should reject further score transitions.",
          "Een afgelopen toestand hoort verdere scoreveranderingen te weigeren.",
        ),
        L(
          "Check whether a winner already exists before adding a point.",
          "Controleer vóór het optellen of al een winnaar bestaat.",
        ),
        L(
          "Returning an unchanged copy is still a valid new state.",
          "Een ongewijzigde kopie teruggeven is nog steeds een geldige nieuwe toestand.",
        ),
      ],
      L(
        "Do not award more points after a winner is set.",
        "Geef geen extra punten nadat een winnaar is ingesteld.",
      ),
      [
        probe(
          "award_point",
          [{ left: 3, right: 2, winner: "left" }, "right", 3],
          "_return == _args[0] and _return is not _args[0]",
        ),
      ],
    ),
  ],
});

export const roundMain = preview(
  "    state = fresh_match()\n",
  '        if state["winner"] is None:\n            state["x"] += state["vx"] * dt\n            state["y"] += state["vy"] * dt\n            if state["y"] <= 8 or state["y"] >= 392:\n                state["y"] = max(8, min(392, state["y"]))\n                state["vy"] = -state["vy"]\n        state = rules.step_round(state, 640, 400, 3)\n',
  '        pygame.draw.circle(screen, (255,255,255), (round(state["x"]), round(state["y"])), 8)\n        label = f"{state[\'left\']} : {state[\'right\']}"\n        screen.blit(font.render(label, True, (255,255,255)), (280,20))\n        message = "Winner: " + str(state["winner"]) if state["winner"] else "Watch the round reset. R: restart."\n        screen.blit(font.render(message, True, (255,145,50)), (80,360))\n',
  "            if event.type == pygame.KEYDOWN and event.key == pygame.K_r:\n                state = fresh_match()\n",
).replace(
  "async def main():",
  'def fresh_match():\n    return {"x":320.0, "y":200.0, "vx":180.0, "vy":120.0, "left":0, "right":0, "winner":None}\n\nasync def main():',
);
const rounds = lesson({
  module: 10,
  number: 5,
  title: L("Join rallies into a match", "Verbind rally’s tot een wedstrijd"),
  guidance: "independent",
  runtime: "pygame",
  minutes: 30,
  explanation: L(
    "Combine the scoring rules into a complete round transition before building your own Pong. This test scene deliberately has no paddles, so every serve eventually scores and the difficult reset cases are easy to observe. Design the helper yourself; the brief specifies behavior, not an algorithm.",
    "Combineer de scoreregels tot een volledige rondeovergang voordat je eigen Pong bouwt. Deze testscène heeft bewust geen paddles, zodat elke service uiteindelijk scoort en lastige resetgevallen makkelijk zichtbaar zijn. Ontwerp zelf de helper; de opdracht beschrijft gedrag, geen algoritme.",
  ),
  sections: [
    section(
      L("Round-transition brief", "Opdracht voor rondeovergangen"),
      L(
        "step_round(state, width, height, target) returns a new state dictionary and never mutates its input. The flat state contains ball-centre x/y, velocities vx/vy, integer left/right scores, and winner (None or a player name). The radius is 8. If there is already a winner, leave everything unchanged. Otherwise, a fully exited ball awards exactly one point to the opposing player. Reset its centre to (width / 2, height / 2). For another rally, serve toward the scorer at horizontal speed 180 and vertical velocity +120. If the score reaches target, set winner and stop the centred ball with vx=vy=0. If no point is earned, preserve every value. Preserve extra state fields in every case. Dimensions are positive and large enough for the ball; target is a positive integer.",
        "step_round(state, width, height, target) geeft een nieuwe toestandsdictionary terug en verandert nooit zijn invoer. De platte toestand bevat balmiddelpunt x/y, snelheden vx/vy, gehele left/right-scores en winner (None of een spelersnaam). De straal is 8. Als er al een winnaar is, blijft alles ongewijzigd. Anders geeft een volledig uitgetreden bal precies één punt aan de andere speler. Herstel zijn middelpunt naar (width / 2, height / 2). Serveer voor een volgende rally naar de scorer met horizontale snelheid 180 en verticale snelheid +120. Als de score target bereikt, stel je winner in en stop je de gecentreerde bal met vx=vy=0. Als geen punt verdiend wordt, behoud je elke waarde. Behoud in elk geval extra toestandsvelden. Afmetingen zijn positief en groot genoeg voor de bal; target is een positief geheel getal.",
      ),
    ),
    section(
      L(
        "Check transitions, then assemble",
        "Controleer overgangen en bouw dan samen",
      ),
      L(
        "Try left and right exits, a partially visible ball, a one-point match, and repeated calls after a score. The reset moves the ball back into play, preventing the next frame from awarding the same point again. The next project asks you to combine your own movement, controls, collision, scoring, and presentation. You may look back at these lessons, but you choose the project’s structure.",
        "Probeer links en rechts verlaten, een deels zichtbare bal, een wedstrijd van één punt en herhaalde aanroepen na een score. De reset brengt de bal weer in het spel en voorkomt dat het volgende beeld hetzelfde punt opnieuw geeft. Het volgende project vraagt je eigen beweging, besturing, botsingen, score en presentatie te combineren. Je mag deze lessen terugkijken, maar kiest zelf de projectstructuur.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": roundMain,
    "rules.py":
      "def step_round(state, width, height, target):\n    # Work from the behavior brief. Helpers are welcome.\n    return state.copy()\n",
  },
  solution: {
    "main.py": roundMain,
    "rules.py":
      'def step_round(state, width, height, target):\n    result = state.copy()\n    if result["winner"] is not None:\n        return result\n    if result["x"] + 8 <= 0:\n        player = "right"\n    elif result["x"] - 8 >= width:\n        player = "left"\n    else:\n        return result\n    result[player] += 1\n    result["x"], result["y"] = width / 2, height / 2\n    if result[player] >= target:\n        result["winner"] = player\n        result["vx"], result["vy"] = 0, 0\n    else:\n        result["vx"] = 180 if player == "right" else -180\n        result["vy"] = 120\n    return result\n',
  },
  tasks: [
    gameTask(
      L(
        "Award a single point to the correct player only after a complete exit.",
        "Geef alleen na volledig verlaten één punt aan de juiste speler.",
      ),
      [
        L(
          "Reuse the full-ball exit rule rather than a centre-only test.",
          "Hergebruik de regel voor de hele bal in plaats van alleen het middelpunt.",
        ),
        L(
          "Identify the scorer before altering scores or positions.",
          "Bepaal de scorer voordat je scores of posities verandert.",
        ),
        L(
          "A ball at x=−8 is fully out on the left when its radius is 8.",
          "Een bal op x=−8 is links volledig buiten wanneer zijn straal 8 is.",
        ),
      ],
      L(
        "Apply the scorer rule and increment only that player.",
        "Pas de scorerregel toe en verhoog alleen die speler.",
      ),
      [
        probe(
          "step_round",
          [state(-8), 640, 400, 3],
          '_return["right"] == 1 and _return["left"] == 0',
        ),
        probe(
          "step_round",
          [state(648), 640, 400, 3],
          '_return["left"] == 1 and _return["right"] == 0',
        ),
        probe("step_round", [state(-3), 640, 400, 3], "_return == _args[0]"),
      ],
    ),
    gameTask(
      L(
        "Reset the ball to the centre and serve toward the scorer when the match continues.",
        "Herstel de bal naar het midden en serveer naar de scorer wanneer de wedstrijd doorgaat.",
      ),
      [
        L(
          "A new rally needs position and velocity, not just a score update.",
          "Een nieuwe rally vereist positie en snelheid, niet alleen een score-update.",
        ),
        L(
          "Use the supplied dimensions; choose the horizontal sign from the scorer.",
          "Gebruik de meegegeven afmetingen; kies het horizontale teken uit de scorer.",
        ),
        L(
          "Positive horizontal velocity travels right.",
          "Positieve horizontale snelheid beweegt naar rechts.",
        ),
      ],
      L(
        "Centre the ball and set the requested serve velocities.",
        "Centreer de bal en stel de gevraagde servicesnelheden in.",
      ),
      [
        probe(
          "step_round",
          [state(-10), 300, 200, 5],
          '_return["x"] == 150 and _return["y"] == 100 and _return["vx"] == 180 and _return["vy"] == 120',
        ),
        probe(
          "step_round",
          [state(308), 300, 200, 5],
          '_return["vx"] == -180 and _return["vy"] == 120',
        ),
      ],
    ),
    gameTask(
      L(
        "Do not score again on the next call after resetting a rally.",
        "Scoor niet opnieuw bij de volgende aanroep na het herstellen van een rally.",
      ),
      [
        L(
          "Think about what the next frame receives as input.",
          "Bedenk wat het volgende beeld als invoer ontvangt.",
        ),
        L(
          "A reset ball must no longer satisfy either exit condition.",
          "Een herstelde bal mag aan geen van beide uitvoorwaarden voldoen.",
        ),
        L(
          "Test a transition by feeding its result back into the helper.",
          "Test een overgang door het resultaat opnieuw aan de helper te geven.",
        ),
      ],
      L(
        "A repeated call on the reset state must preserve it.",
        "Een herhaalde aanroep op de herstelde toestand moet die behouden.",
      ),
      [
        probe(
          "step_round",
          [state(-10), 640, 400, 3],
          "_module.step_round(_return,640,400,3) == _return",
        ),
      ],
    ),
    gameTask(
      L(
        "Finish at the target, centre and stop the ball, and keep a finished match unchanged.",
        "Eindig bij het doel, centreer en stop de bal en houd een afgelopen wedstrijd ongewijzigd.",
      ),
      [
        L(
          "Winning and starting another rally are different outcomes.",
          "Winnen en een volgende rally starten zijn verschillende uitkomsten.",
        ),
        L(
          "Handle a finished state before considering another score.",
          "Handel een afgelopen toestand af voordat je een volgende score overweegt.",
        ),
        L(
          "A stopped ball has zero horizontal and vertical velocity.",
          "Een gestopte bal heeft horizontaal en verticaal snelheid nul.",
        ),
      ],
      L(
        "Freeze a winner and prevent further point awards.",
        "Bevries een winnaar en voorkom verdere punten.",
      ),
      [
        probe(
          "step_round",
          [state(648), 640, 400, 1],
          '_return["winner"] == "left" and _return["vx"] == 0 and _return["vy"] == 0 and _return["x"] == 320 and _return["y"] == 200',
        ),
        probe(
          "step_round",
          [{ ...state(-10), winner: "left", left: 3 }, 640, 400, 3],
          "_return == _args[0]",
        ),
      ],
    ),
    gameTask(
      L(
        "Preserve input and extra state fields. Run several rounds, restart with R, and finish the preview.",
        "Behoud invoer en extra toestandsvelden. Speel meerdere rondes, herstart met R en rond het voorbeeld af.",
      ),
      [
        L(
          "Your helper owns only the fields mentioned by the brief.",
          "Je helper beheert alleen de velden die de opdracht noemt.",
        ),
        L(
          "Carry other values into the new state rather than rebuilding a partial dictionary.",
          "Neem andere waarden mee naar de nieuwe toestand in plaats van een gedeeltelijke dictionary opnieuw op te bouwen.",
        ),
        L(
          "state.copy() is one way to retain unrelated flat state.",
          "state.copy() is één manier om overige platte toestand te behouden.",
        ),
      ],
      L(
        "Return a separate dictionary, preserving the old values and extra fields.",
        "Geef een afzonderlijke dictionary terug en behoud oude waarden en extra velden.",
      ),
      [
        probe(
          "step_round",
          [{ ...state(-10), theme: "night" }, 640, 400, 3],
          '_return is not _args[0] and _args[0]["x"] == -10 and _args[0]["right"] == 0 and _return["theme"] == "night"',
        ),
      ],
    ),
  ],
});
function state(x) {
  return { x, y: 100, vx: 180, vy: 120, left: 0, right: 0, winner: null };
}

const review = quiz(10, L("Review: game rules", "Herhaling: spelregels"), [
  question(
    "v2-10-q1",
    L(
      "Two Rects only touch along an edge. What does colliderect report?",
      "Twee Rects raken elkaar alleen langs een rand. Wat geeft colliderect?",
    ),
    "",
    [
      [
        L("False", "False"),
        L(
          "There is no overlapping area.",
          "Er is geen overlappende oppervlakte.",
        ),
      ],
      [
        L("True", "True"),
        L(
          "Edge-only contact is excluded by this collision rule.",
          "Contact met alleen de rand is uitgesloten door deze botsingsregel.",
        ),
      ],
      [
        L("The number of pixels touching.", "Het aantal rakende pixels."),
        L(
          "The result is a Boolean, not an area.",
          "Het resultaat is een Boolean, geen oppervlakte.",
        ),
      ],
    ],
  ),
  question(
    "v2-10-q2",
    L(
      "Why move a ball just outside the paddle after bouncing?",
      "Waarom plaats je een bal na botsen net buiten de paddle?",
    ),
    "",
    [
      [
        L(
          "To resolve the overlap before the next update.",
          "Om de overlap vóór de volgende update op te lossen.",
        ),
        L(
          "Direction alone may leave the hitboxes overlapping.",
          "Alleen richting veranderen kan de raakvlakken laten overlappen.",
        ),
      ],
      [
        L("To award a point immediately.", "Om meteen een punt te geven."),
        L(
          "A paddle hit keeps the rally alive.",
          "Een paddlehit houdt de rally gaande.",
        ),
      ],
      [
        L(
          "To erase the player’s score.",
          "Om de score van de speler te wissen.",
        ),
        L(
          "Collision correction should not reset scores.",
          "Botsingscorrectie hoort scores niet te wissen.",
        ),
      ],
    ],
  ),
  question(
    "v2-10-q3",
    L(
      "The ball centre is x=−4 with radius 8. Under our full-exit rule, what happens?",
      "Het balmiddelpunt is x=−4 met straal 8. Wat gebeurt onder onze volledig-buitenregel?",
    ),
    "",
    [
      [
        L(
          "No point yet; some of the ball is still inside.",
          "Nog geen punt; een deel van de bal is nog binnen.",
        ),
        L(
          "Its rightmost edge is at x=4.",
          "Zijn meest rechtse rand ligt op x=4.",
        ),
      ],
      [
        L("The left player scores.", "De linkerspeler scoort."),
        L(
          "The ball is not fully out, and the opposite player would score a left exit.",
          "De bal is niet volledig buiten en de andere speler zou scoren bij links verlaten.",
        ),
      ],
      [
        L("Both players score.", "Beide spelers scoren."),
        L(
          "One rally awards at most one point.",
          "Eén rally geeft hoogstens één punt.",
        ),
      ],
    ],
  ),
  question(
    "v2-10-q4",
    L(
      "What prevents a missed ball from awarding another point every frame?",
      "Wat voorkomt dat een gemiste bal elk beeld opnieuw een punt geeft?",
    ),
    "",
    [
      [
        L(
          "Resetting the round or moving into a finished-match state.",
          "De ronde herstellen of naar een afgelopen-wedstrijdtoestand gaan.",
        ),
        L(
          "The next update must no longer process the same exit as a new score.",
          "De volgende update mag dezelfde uitstap niet als nieuwe score verwerken.",
        ),
      ],
      [
        L("Printing the score more slowly.", "De score langzamer afdrukken."),
        L(
          "Display frequency does not fix the state transition.",
          "Weergavefrequentie herstelt de toestandsverandering niet.",
        ),
      ],
      [
        L("Renaming the ball variable.", "De balvariabele hernoemen."),
        L(
          "Names do not change the scoring rule.",
          "Namen veranderen de scoreregel niet.",
        ),
      ],
    ],
  ),
  question(
    "v2-10-q5",
    L(
      "How should the final Pong project be organised?",
      "Hoe moet het uiteindelijke Pong-project worden ingedeeld?",
    ),
    "",
    [
      [
        L(
          "Choose your own structure and test the behavior against your design.",
          "Kies je eigen structuur en test het gedrag tegen je ontwerp.",
        ),
        L(
          "The project is self-assessed; lesson helper signatures are not mandatory.",
          "Het project beoordeel je zelf; les-helpersignaturen zijn niet verplicht.",
        ),
      ],
      [
        L(
          "Use exactly the reference function names to unlock completion.",
          "Gebruik precies de referentiefunctienamen om voltooiing vrij te geven.",
        ),
        L(
          "The project has no such checker requirement.",
          "Het project heeft geen dergelijke checker-eis.",
        ),
      ],
      [
        L(
          "Avoid testing until every feature is finished.",
          "Vermijd testen totdat elke functie af is.",
        ),
        L(
          "Small working increments make problems easier to find.",
          "Kleine werkende stappen maken problemen makkelijker vindbaar.",
        ),
      ],
    ],
  ),
]);
export const activities = [collision, reflect, scoring, match, rounds, review];
