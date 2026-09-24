import { L, section, lesson, quiz, question } from "./authoring.mjs";
import { previewSection, gameTask } from "./game-authoring.mjs";

const probe = (name, args, check) => ({
  moduleOnly: true,
  call: { module: "motion", name, args },
  check: "_error is None and (" + check + ")",
});
const near = (x, y) => `abs(${x} - (${y})) < 1e-7`;
function preview(setup, update, draw) {
  return `import asyncio
import pygame
import motion

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    clock = pygame.time.Clock()
    running = True
${setup}    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                running = False
        # Seconds, capped to avoid a large jump after pausing the preview.
        dt = min(clock.tick() / 1000, 0.05)
        keys = pygame.key.get_pressed()
${update}        screen.fill((16, 23, 39))
${draw}        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`;
}
const timeSection = section(
  L("Speed is not distance per frame", "Snelheid is geen afstand per beeld"),
  L(
    "Velocity describes pixels per second. Multiply it by elapsed seconds to obtain this frame’s displacement. Clock.tick() reports milliseconds, so main.py divides by 1000. It also caps the interval at 0.05 seconds to avoid a large jump after focus returns. Keep positions as floats while updating; convert to integers only for drawing. Rounding every update can make slow motion disappear.",
    "Snelheid beschrijft pixels per seconde. Vermenigvuldig die met verstreken seconden voor de verplaatsing van dit beeld. Clock.tick() geeft milliseconden; main.py deelt daarom door 1000. Het begrenst het interval ook op 0,05 seconde om een grote sprong na terugkerende focus te voorkomen. Houd posities tijdens bijwerken als floats; zet ze alleen voor tekenen om naar integers. Elke update afronden kan langzame beweging laten verdwijnen.",
  ),
  "distance = 150 * 0.02\nprint(distance)",
  "3.0",
);
const advanceMain = preview(
  "    position = (40.0, 80.0)\n    velocity = (100.0, 45.0)\n",
  "        position = motion.advance(position, velocity, dt)\n        position = (position[0] % 640, position[1] % 400)\n",
  "        pygame.draw.circle(screen, (255, 255, 255), (round(position[0]), round(position[1])), 8)\n",
);
const advance = lesson({
  module: 9,
  number: 1,
  title: L("Move with elapsed time", "Beweeg met verstreken tijd"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 20,
  explanation: L(
    "The ball currently moves by a fixed amount every frame. On a faster computer that makes it faster. Repair advance(position, velocity, dt) so motion depends on elapsed seconds instead. The preview wraps around its edges to keep the ball visible.",
    "De bal beweegt nu elk beeld een vaste afstand. Op een snellere computer gaat hij daardoor sneller. Repareer advance(position, velocity, dt) zodat beweging afhangt van verstreken seconden. Het voorbeeld laat de bal aan de andere rand terugkomen zodat hij zichtbaar blijft.",
  ),
  sections: [
    timeSection,
    section(
      L("A small reusable calculation", "Een kleine herbruikbare berekening"),
      L(
        "position and velocity are coordinate pairs. Return a new pair containing the updated x and y; leave supplied lists or tuples untouched. A negative velocity moves left or up. A zero dt should change nothing. No screen or keyboard is needed inside this function.",
        "position en velocity zijn coördinatenparen. Geef een nieuw paar met de bijgewerkte x en y terug; laat meegegeven lijsten of tuples ongemoeid. Negatieve snelheid beweegt naar links of boven. dt=0 mag niets veranderen. In deze functie zijn geen scherm of toetsenbord nodig.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": advanceMain,
    "motion.py":
      "def advance(position, velocity, dt):\n    x, y = position\n    vx, vy = velocity\n    return (x + vx, y + vy)\n",
  },
  solution: {
    "main.py": advanceMain,
    "motion.py":
      "def advance(position, velocity, dt):\n    x, y = position\n    vx, vy = velocity\n    return (x + vx * dt, y + vy * dt)\n",
  },
  tasks: [
    gameTask(
      L(
        "Make both coordinates advance by the correct distance for the elapsed seconds.",
        "Laat beide coördinaten de juiste afstand voor de verstreken seconden afleggen.",
      ),
      [
        L(
          "The units should end in pixels, not pixels per second.",
          "De eenheid moet pixels worden, niet pixels per seconde.",
        ),
        L(
          "Apply the same time interval separately to horizontal and vertical speed.",
          "Pas hetzelfde tijdsinterval afzonderlijk toe op horizontale en verticale snelheid.",
        ),
        L(
          "At 60 pixels per second, 0.5 seconds covers 30 pixels.",
          "Bij 60 pixels per seconde leg je in 0,5 seconde 30 pixels af.",
        ),
      ],
      L(
        "Use elapsed time for both axes.",
        "Gebruik verstreken tijd voor beide assen.",
      ),
      [
        probe(
          "advance",
          [[10, 20], [80, 40], 0.25],
          near("_return[0]", 30) + " and " + near("_return[1]", 30),
        ),
        probe(
          "advance",
          [[1, 2], [9, 12], 0],
          "_return[0] == 1 and _return[1] == 2",
        ),
      ],
    ),
    gameTask(
      L(
        "Preserve fractional movement and support negative velocities. Try a small speed in the preview.",
        "Behoud beweging met decimalen en ondersteun negatieve snelheden. Probeer een lage snelheid in het voorbeeld.",
      ),
      [
        L(
          "A coordinate can lie between two display pixels.",
          "Een coördinaat kan tussen twee schermpixels liggen.",
        ),
        L(
          "Do not round the stored position inside this calculation.",
          "Rond de opgeslagen positie niet binnen deze berekening af.",
        ),
        L(
          "A displacement of −0.25 moves a quarter pixel toward the smaller coordinate.",
          "Een verplaatsing van −0,25 beweegt een kwart pixel naar de kleinere coördinaat.",
        ),
      ],
      L(
        "Keep signed fractional displacements accurate.",
        "Houd verplaatsingen met teken en decimalen nauwkeurig.",
      ),
      [
        probe(
          "advance",
          [[2.5, 4.25], [-5, 2.5], 0.05],
          near("_return[0]", 2.25) + " and " + near("_return[1]", 4.375),
        ),
      ],
    ),
    gameTask(
      L(
        "Return a new coordinate pair without changing the input values. Run and finish the preview.",
        "Geef een nieuw coördinatenpaar terug zonder de invoerwaarden te veranderen. Start en rond het voorbeeld af.",
      ),
      [
        L(
          "A helper can calculate a result without editing its arguments.",
          "Een hulpfunctie kan een resultaat berekenen zonder argumenten te bewerken.",
        ),
        L(
          "Unpacking reads a pair; assigning into a list changes that list.",
          "Uitpakken leest een paar; toewijzen aan een lijstpositie verandert die lijst.",
        ),
        L(
          "return (new_x, new_y) creates a result pair.",
          "return (new_x, new_y) maakt een resultaatpaar.",
        ),
      ],
      L(
        "Preserve position and velocity inputs.",
        "Behoud de ingevoerde positie en snelheid.",
      ),
      [
        probe(
          "advance",
          [[3, 7], [2, -4], 0.5],
          "_args == [[3,7],[2,-4],0.5] and _return is not _args[0]",
        ),
      ],
    ),
  ],
});

const axisMain = preview(
  "    y = 164.0\n",
  "        direction = motion.axis(bool(keys[pygame.K_w]), bool(keys[pygame.K_s]))\n        y = max(0, min(328, y + direction * 220 * dt))\n",
  "        pygame.draw.rect(screen, (80, 180, 255), (24, round(y), 12, 72))\n",
);
const controls = lesson({
  module: 9,
  number: 2,
  title: L(
    "Held keys and opposing input",
    "Ingedrukte toetsen en tegengestelde invoer",
  ),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 18,
  explanation: L(
    "The paddle moves down even when neither key is pressed. Repair the direction helper for W and S. Decide what should happen when both are held before writing code; our rule is that opposing inputs cancel.",
    "De paddle beweegt omlaag terwijl geen toets is ingedrukt. Repareer de richtingsfunctie voor W en S. Bepaal vóór het programmeren wat er gebeurt als beide ingedrukt zijn; onze regel is dat tegengestelde invoer elkaar opheft.",
  ),
  sections: [
    section(
      L("State versus events", "Toestand tegenover gebeurtenissen"),
      L(
        "KEYDOWN is useful for one-time actions such as pausing. Continuous movement needs the current key state on every frame. pygame.key.get_pressed() provides that state. main.py turns the W and S entries into Booleans and calls axis(negative, positive). Return −1 for only the negative key, +1 for only the positive key, and 0 for neither or both. Screen y increases downward, so W is negative.",
        "KEYDOWN is nuttig voor eenmalige acties zoals pauzeren. Voortdurende beweging vraagt elk beeld de huidige toetstoestand. pygame.key.get_pressed() levert die toestand. main.py zet de W- en S-waarden om naar Booleans en roept axis(negative, positive) aan. Geef −1 bij alleen de negatieve toets, +1 bij alleen de positieve toets en 0 bij geen of beide toetsen. Scherm-y neemt naar beneden toe; W is dus negatief.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": axisMain,
    "motion.py":
      "def axis(negative, positive):\n    if negative:\n        return -1\n    return 1\n",
  },
  solution: {
    "main.py": axisMain,
    "motion.py":
      "def axis(negative, positive):\n    if negative == positive:\n        return 0\n    return -1 if negative else 1\n",
  },
  tasks: [
    gameTask(
      L(
        "Keep a released paddle still. Return zero when neither key is held.",
        "Houd een losgelaten paddle stil. Geef nul als geen van beide toetsen is ingedrukt.",
      ),
      [
        L(
          "A final else currently means more than “positive is held”.",
          "Een laatste else betekent nu meer dan “positief is ingedrukt”.",
        ),
        L(
          "Work through all four Boolean pairs.",
          "Doorloop alle vier Booleanparen.",
        ),
        L(
          "False, False is a separate input combination.",
          "False, False is een afzonderlijke invoercombinatie.",
        ),
      ],
      L(
        "No pressed key means no movement.",
        "Geen ingedrukte toets betekent geen beweging.",
      ),
      [probe("axis", [false, false], "_return == 0")],
    ),
    gameTask(
      L(
        "Make single-key input move in the expected direction: W up, S down.",
        "Laat invoer van één toets in de verwachte richting bewegen: W omhoog, S omlaag.",
      ),
      [
        L(
          "A screen’s vertical coordinate grows downward.",
          "De verticale schermcoördinaat groeit omlaag.",
        ),
        L(
          "Return a direction; main.py already applies speed and time.",
          "Geef een richting terug; main.py past snelheid en tijd al toe.",
        ),
        L(
          "The direction values are −1, 0 and +1.",
          "De richtingswaarden zijn −1, 0 en +1.",
        ),
      ],
      L(
        "Opposite single keys need opposite signs.",
        "Tegengestelde enkele toetsen hebben tegengestelde tekens nodig.",
      ),
      [
        probe("axis", [true, false], "_return == -1"),
        probe("axis", [false, true], "_return == 1"),
      ],
    ),
    gameTask(
      L(
        "Cancel movement when both keys are held. Try releasing either one, then finish the preview.",
        "Hef beweging op wanneer beide toetsen ingedrukt zijn. Laat daarna één ervan los en rond het voorbeeld af.",
      ),
      [
        L(
          "The result should not depend on which if appears first.",
          "Het resultaat mag niet afhangen van welke if eerst komt.",
        ),
        L(
          "Handle equal input states consistently, or combine their contributions.",
          "Behandel gelijke invoertoestanden consequent of combineer hun bijdragen.",
        ),
        L(
          "Two opposite contributions can add to zero.",
          "Twee tegengestelde bijdragen kunnen samen nul zijn.",
        ),
      ],
      L(
        "Both held should produce zero direction.",
        "Beide ingedrukt moet richting nul opleveren.",
      ),
      [probe("axis", [true, true], "_return == 0")],
    ),
  ],
});

const clampMain = preview(
  "    y = 164.0\n",
  "        direction = int(bool(keys[pygame.K_s])) - int(bool(keys[pygame.K_w]))\n        y = motion.move_paddle(y, direction, 240, dt, 400, 72)\n",
  "        pygame.draw.rect(screen, (80, 180, 255), (24, round(y), 12, 72))\n",
);
const clamp = lesson({
  module: 9,
  number: 3,
  title: L("Keep the whole paddle inside", "Houd de hele paddle binnen"),
  guidance: "guided",
  runtime: "pygame",
  minutes: 20,
  explanation: L(
    "The paddle should reach a boundary and stay there, even during a large update. Repair move_paddle so it accounts for the paddle’s height. Testing only whether its top has reached the bottom edge leaves most of it outside the court.",
    "De paddle moet een grens bereiken en daar blijven, ook tijdens een grote update. Repareer move_paddle zodat de paddlehoogte meetelt. Alleen controleren of zijn bovenkant de onderrand bereikt laat het grootste deel buiten het veld.",
  ),
  sections: [
    section(
      L("Clamp the proposed position", "Begrens de voorgestelde positie"),
      L(
        "move_paddle(y, direction, speed, dt, court_height, paddle_height) returns the next top coordinate. First consider the requested movement, then restrict it to the legal interval. Top cannot be below zero; bottom is top + paddle_height and cannot exceed court_height. All supplied time intervals are nonnegative and the paddle fits in the court. Handle even a one-second test step; do not rely on main.py’s usual time cap.",
        "move_paddle(y, direction, speed, dt, court_height, paddle_height) geeft de volgende bovenkantcoördinaat terug. Bekijk eerst de gevraagde beweging en begrens die daarna tot het toegestane interval. Boven mag niet onder nul komen; onder is boven + paddle_height en mag court_height niet overschrijden. Alle tijdsintervallen zijn niet-negatief en de paddle past in het veld. Handel zelfs een teststap van één seconde af; vertrouw niet op de gebruikelijke tijdslimiet van main.py.",
      ),
    ),
    timeSection,
    previewSection,
  ],
  starter: {
    "main.py": clampMain,
    "motion.py":
      "def move_paddle(y, direction, speed, dt, court_height, paddle_height):\n    proposed = y + direction * speed * dt\n    if proposed < 0:\n        return 0\n    if proposed > court_height:\n        return court_height\n    return proposed\n",
  },
  solution: {
    "main.py": clampMain,
    "motion.py":
      "def move_paddle(y, direction, speed, dt, court_height, paddle_height):\n    proposed = y + direction * speed * dt\n    return max(0, min(court_height - paddle_height, proposed))\n",
  },
  tasks: [
    gameTask(
      L(
        "Preserve normal movement and fractional coordinates away from the edges.",
        "Behoud normale beweging en decimale coördinaten weg van de randen.",
      ),
      [
        L(
          "A boundary rule should not alter already legal movement.",
          "Een grensregel mag al toegestane beweging niet veranderen.",
        ),
        L(
          "Compare the proposed coordinate to the legal interval.",
          "Vergelijk de voorgestelde coördinaat met het toegestane interval.",
        ),
        L(
          "Keep the result as a number; drawing handles rounding.",
          "Houd het resultaat als getal; het tekenen regelt afronding.",
        ),
      ],
      L(
        "Use speed and elapsed seconds without premature rounding.",
        "Gebruik snelheid en verstreken seconden zonder te vroeg af te ronden.",
      ),
      [
        probe(
          "move_paddle",
          [100, 1, 75, 0.1, 400, 72],
          near("_return", 107.5),
        ),
        probe(
          "move_paddle",
          [100, -1, 50, 0.25, 400, 72],
          near("_return", 87.5),
        ),
      ],
    ),
    gameTask(
      L(
        "Stop at the top boundary, including a large overshoot. Zero movement must preserve a legal position.",
        "Stop bij de bovengrens, ook bij een grote overschrijding. Geen beweging moet een toegestane positie behouden.",
      ),
      [
        L(
          "A proposed coordinate may jump past the boundary in one update.",
          "Een voorgestelde coördinaat kan in één update voorbij de grens springen.",
        ),
        L(
          "Use the boundary itself as the limited result.",
          "Gebruik de grens zelf als begrensd resultaat.",
        ),
        L(
          "Do not merely reverse direction after the paddle has left the court.",
          "Keer niet alleen de richting om nadat de paddle het veld heeft verlaten.",
        ),
      ],
      L(
        "Never return a negative top coordinate.",
        "Geef nooit een negatieve bovenkantcoördinaat terug.",
      ),
      [
        probe("move_paddle", [3, -1, 240, 1, 400, 72], "_return == 0"),
        probe("move_paddle", [0, -1, 240, 0.1, 400, 72], "_return == 0"),
        probe("move_paddle", [17.5, 0, 240, 1, 400, 72], "_return == 17.5"),
      ],
    ),
    gameTask(
      L(
        "Keep the entire paddle above the bottom edge at different court and paddle sizes. Test both boundaries in the preview.",
        "Houd de hele paddle boven de onderrand bij verschillende veld- en paddlegroottes. Test beide grenzen in het voorbeeld.",
      ),
      [
        L(
          "The returned coordinate describes the top, not the bottom.",
          "De teruggegeven coördinaat beschrijft de bovenkant, niet de onderkant.",
        ),
        L(
          "Find the highest legal top coordinate from the two heights.",
          "Bepaal uit de twee hoogtes de hoogste toegestane bovenkantcoördinaat.",
        ),
        L(
          "A 30-pixel object in a 100-pixel container can start at most at 70.",
          "Een object van 30 pixels in een container van 100 pixels kan maximaal op 70 beginnen.",
        ),
      ],
      L(
        "Subtract paddle height when finding the lower limit.",
        "Trek de paddlehoogte af bij het bepalen van de ondergrens.",
      ),
      [
        probe("move_paddle", [310, 1, 240, 1, 400, 72], "_return == 328"),
        probe("move_paddle", [150, 1, 80, 1, 240, 90], "_return == 150"),
        probe("move_paddle", [0, 1, 80, 1, 72, 72], "_return == 0"),
      ],
    ),
  ],
});

const bounceMain = preview(
  "    y = 100.0\n    vy = 160.0\n",
  "        y, vy = motion.bounce(y + vy * dt, vy, 8, 400)\n",
  "        pygame.draw.circle(screen, (255, 255, 255), (320, round(y)), 8)\n",
);
const bounce = lesson({
  module: 9,
  number: 4,
  title: L("Bounce without getting stuck", "Bots zonder vast te lopen"),
  guidance: "adapt",
  runtime: "pygame",
  minutes: 22,
  explanation: L(
    "The ball changes direction at a wall, then sometimes flips again while it is still touching. Repair the response using both position and travel direction. This lesson uses a simple clamp-and-reflect model; it discards any leftover distance after contact.",
    "De bal verandert bij een muur van richting en draait soms opnieuw terwijl hij nog contact maakt. Herstel de reactie met zowel positie als bewegingsrichting. Deze les gebruikt een eenvoudig begrens-en-kaatsmodel; het laat resterende afstand na contact vervallen.",
  ),
  sections: [
    section(
      L("A centre has a radius", "Een middelpunt heeft een straal"),
      L(
        "bounce(y, vy, radius, height) receives a proposed ball-centre coordinate and vertical velocity. Return (new_y, new_vy). Legal centres run from radius to height − radius. Clamp an outside centre to the nearest legal boundary. At the top, only an upward (negative) velocity should reverse. At the bottom, only a downward (positive) velocity should reverse. A ball already moving away must keep its direction; keep speed magnitude unchanged.",
        "bounce(y, vy, radius, height) ontvangt een voorgestelde balmiddelpuntcoördinaat en verticale snelheid. Geef (new_y, new_vy) terug. Toegestane middelpunten lopen van radius tot height − radius. Begrens een middelpunt buiten het veld tot de dichtstbijzijnde toegestane grens. Boven moet alleen een opwaartse (negatieve) snelheid omkeren. Onder moet alleen een neerwaartse (positieve) snelheid omkeren. Een bal die al wegbeweegt moet zijn richting houden; behoud de snelheidsomvang.",
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": bounceMain,
    "motion.py":
      "def bounce(y, vy, radius, height):\n    if y <= radius or y >= height - radius:\n        vy = -vy\n    return (y, vy)\n",
  },
  solution: {
    "main.py": bounceMain,
    "motion.py":
      "def bounce(y, vy, radius, height):\n    if y <= radius:\n        y = radius\n        if vy < 0:\n            vy = -vy\n    elif y >= height - radius:\n        y = height - radius\n        if vy > 0:\n            vy = -vy\n    return (y, vy)\n",
  },
  tasks: [
    gameTask(
      L(
        "Reflect a ball travelling into either wall, preserving the speed magnitude.",
        "Kaats een bal die naar een van beide muren beweegt terug, met behoud van de snelheidsomvang.",
      ),
      [
        L(
          "Negative y velocity means upward travel.",
          "Negatieve y-snelheid betekent omhoog bewegen.",
        ),
        L(
          "Compare velocity direction with the wall being touched.",
          "Vergelijk de snelheidsrichting met de muur die geraakt wordt.",
        ),
        L(
          "Negating a number changes its sign, not its magnitude.",
          "Een getal negatief maken verandert zijn teken, niet zijn omvang.",
        ),
      ],
      L(
        "An incoming ball must leave each wall facing inward.",
        "Een inkomende bal moet elke muur naar binnen gericht verlaten.",
      ),
      [
        probe(
          "bounce",
          [8, -140, 8, 400],
          "_return[0] == 8 and _return[1] == 140",
        ),
        probe(
          "bounce",
          [392, 140, 8, 400],
          "_return[0] == 392 and _return[1] == -140",
        ),
      ],
    ),
    gameTask(
      L(
        "Repair positions beyond a wall so the whole ball is inside the court after the response.",
        "Herstel posities voorbij een muur zodat de hele bal na de reactie binnen het veld is.",
      ),
      [
        L(
          "Reversing velocity does not repair position.",
          "Snelheid omkeren herstelt de positie niet.",
        ),
        L(
          "Limit the centre using the radius, not zero and height.",
          "Begrens het middelpunt met de straal, niet met nul en hoogte.",
        ),
        L(
          "For radius 6, the topmost legal centre is y=6.",
          "Bij straal 6 is het bovenste toegestane middelpunt y=6.",
        ),
      ],
      L(
        "Clamp overshoots to the centre boundaries.",
        "Begrens overschrijdingen tot de middelpuntgrenzen.",
      ),
      [
        probe(
          "bounce",
          [-20, -90, 6, 200],
          "_return[0] == 6 and _return[1] == 90",
        ),
        probe(
          "bounce",
          [250, 90, 6, 200],
          "_return[0] == 194 and _return[1] == -90",
        ),
      ],
    ),
    gameTask(
      L(
        "Leave an outgoing or stationary ball alone. Watch several bounces for sticking or jitter.",
        "Laat een wegbewegende of stilstaande bal ongemoeid. Bekijk meerdere botsingen op vastlopen of trillen.",
      ),
      [
        L(
          "Contact alone is not enough reason to reverse.",
          "Contact alleen is niet genoeg reden om om te keren.",
        ),
        L(
          "Check motion toward the boundary before reflecting.",
          "Controleer beweging naar de grens voordat je terugkaatst.",
        ),
        L(
          "At the top, positive vy already points back into the court.",
          "Boven wijst positieve vy al terug het veld in.",
        ),
      ],
      L(
        "Do not reverse outgoing velocity or alter free movement.",
        "Keer wegbewegende snelheid niet om en verander vrije beweging niet.",
      ),
      [
        probe("bounce", [8, 140, 8, 400], "_return[1] == 140"),
        probe("bounce", [392, -140, 8, 400], "_return[1] == -140"),
        probe("bounce", [8, 0, 8, 400], "_return[1] == 0"),
        probe(
          "bounce",
          [100.5, -12.25, 8, 400],
          "_return[0] == 100.5 and _return[1] == -12.25",
        ),
      ],
    ),
  ],
});

const playersMain = preview(
  '    state = {"left": 164.0, "right": 164.0, "score": [0, 0]}\n',
  '        controls = {"w": bool(keys[pygame.K_w]), "s": bool(keys[pygame.K_s]), "up": bool(keys[pygame.K_UP]), "down": bool(keys[pygame.K_DOWN])}\n        state = motion.update_players(state, controls, dt, 400)\n',
  '        pygame.draw.rect(screen, (80, 180, 255), (24, round(state["left"]), 12, 72))\n        pygame.draw.rect(screen, (255, 145, 50), (604, round(state["right"]), 12, 72))\n',
);
const players = lesson({
  module: 9,
  number: 5,
  title: L(
    "Give two players independent control",
    "Geef twee spelers onafhankelijke besturing",
  ),
  guidance: "independent",
  runtime: "pygame",
  minutes: 28,
  explanation: L(
    "Combine input, time, boundaries, and dictionary state in a two-player controller. The preview supplies all four key states. Your job is to produce the next state without tying one player’s movement to the other.",
    "Combineer invoer, tijd, grenzen en dictionarytoestand in een besturing voor twee spelers. Het voorbeeld levert alle vier toetstoestanden. Jij maakt de volgende toestand zonder de beweging van de ene speler aan de andere te koppelen.",
  ),
  sections: [
    section(
      L("Controller contract", "Besturingsafspraak"),
      L(
        'update_players(state, controls, dt, court_height) returns a new dictionary. state["left"] and state["right"] hold paddle-top coordinates; other entries must be preserved. Both paddles are 72 pixels high and move at 240 pixels/second. controls contains Boolean w, s, up, down entries: W/S control left, arrows control right. Opposite keys cancel for that player. Clamp both paddles inside the court. Do not mutate either input dictionary. dt is nonnegative and the court is at least 72 pixels high. You may reuse helpers or choose another structure.',
        'update_players(state, controls, dt, court_height) geeft een nieuwe dictionary terug. state["left"] en state["right"] bevatten paddle-bovenkantcoördinaten; andere gegevens moeten behouden blijven. Beide paddles zijn 72 pixels hoog en bewegen met 240 pixels/seconde. controls bevat de Booleans w, s, up, down: W/S bestuurt links, de pijlen rechts. Tegengestelde toetsen heffen elkaar voor die speler op. Begrens beide paddles binnen het veld. Verander geen van de invoerdictionaries. dt is niet-negatief en het veld is minstens 72 pixels hoog. Je mag helpers hergebruiken of een andere structuur kiezen.',
      ),
    ),
    previewSection,
  ],
  starter: {
    "main.py": playersMain,
    "motion.py":
      "def update_players(state, controls, dt, court_height):\n    # Return the next state without modifying the inputs.\n    pass\n",
  },
  solution: {
    "main.py": playersMain,
    "motion.py":
      'def update_players(state, controls, dt, court_height):\n    result = state.copy()\n    left_direction = int(controls["s"]) - int(controls["w"])\n    right_direction = int(controls["down"]) - int(controls["up"])\n    for player, direction in [("left", left_direction), ("right", right_direction)]:\n        proposed = state[player] + direction * 240 * dt\n        result[player] = max(0, min(court_height - 72, proposed))\n    return result\n',
  },
  tasks: [
    gameTask(
      L(
        "Move each paddle from its own keys and elapsed time. Both players must be able to move during the same frame.",
        "Beweeg elke paddle met zijn eigen toetsen en verstreken tijd. Beide spelers moeten in hetzelfde beeld kunnen bewegen.",
      ),
      [
        L(
          "Two independent decisions are different from a single either/or branch.",
          "Twee onafhankelijke beslissingen verschillen van één of/of-tak.",
        ),
        L(
          "Work out one direction per player before updating their coordinates.",
          "Bepaal één richting per speler voordat je hun coördinaten bijwerkt.",
        ),
        L(
          "At 240 pixels/second, a quarter-second update covers 60 pixels.",
          "Bij 240 pixels/seconde is een kwartseconde-update 60 pixels.",
        ),
      ],
      L(
        "Keep left and right controls independent and time-based.",
        "Houd links en rechts onafhankelijk en tijdsafhankelijk.",
      ),
      [
        probe(
          "update_players",
          [
            { left: 100, right: 200 },
            { w: true, s: false, up: false, down: true },
            0.25,
            400,
          ],
          '_return["left"] == 40 and _return["right"] == 260',
        ),
        probe(
          "update_players",
          [
            { left: 100, right: 200 },
            { w: false, s: true, up: true, down: false },
            0.125,
            400,
          ],
          '_return["left"] == 130 and _return["right"] == 170',
        ),
      ],
    ),
    gameTask(
      L(
        "Handle opposing or released keys and both boundaries without affecting the other player.",
        "Handel tegengestelde of losgelaten toetsen en beide grenzen af zonder de andere speler te beïnvloeden.",
      ),
      [
        L(
          "Treat each paddle’s direction and legal interval separately.",
          "Behandel richting en toegestaan interval van elke paddle afzonderlijk.",
        ),
        L(
          "Test all keys held, none held, and one player at a boundary.",
          "Test alle toetsen ingedrukt, geen toets ingedrukt en één speler bij een grens.",
        ),
        L(
          "The legal top range depends on court_height and the fixed paddle height.",
          "Het toegestane bovenkantbereik hangt af van court_height en de vaste paddlehoogte.",
        ),
      ],
      L(
        "Respect cancellation and full-paddle boundaries.",
        "Respecteer opheffing en grenzen voor de hele paddle.",
      ),
      [
        probe(
          "update_players",
          [
            { left: 100, right: 200 },
            { w: true, s: true, up: false, down: false },
            1,
            400,
          ],
          '_return["left"] == 100 and _return["right"] == 200',
        ),
        probe(
          "update_players",
          [
            { left: 10, right: 100 },
            { w: true, s: false, up: false, down: true },
            1,
            240,
          ],
          '_return["left"] == 0 and _return["right"] == 168',
        ),
      ],
    ),
    gameTask(
      L(
        "Preserve unrelated state and leave the inputs unchanged. Play with both controls, then finish the preview.",
        "Behoud overige toestand en laat invoer ongemoeid. Speel met beide besturingen en rond het voorbeeld af.",
      ),
      [
        L(
          "Other parts of the game may still hold the current state.",
          "Andere speldelen kunnen nog de huidige toestand gebruiken.",
        ),
        L(
          "Copy before replacing the coordinates you own.",
          "Kopieer voordat je de coördinaten vervangt die jij beheert.",
        ),
        L(
          "A shallow dictionary copy is sufficient when only numeric top coordinates are changed.",
          "Een oppervlakkige dictionarykopie volstaat wanneer alleen numerieke bovenkantcoördinaten worden veranderd.",
        ),
      ],
      L(
        "Return a separate state dictionary and preserve extra fields.",
        "Geef een afzonderlijke toestandsdictionary terug en behoud extra velden.",
      ),
      [
        probe(
          "update_players",
          [
            { left: 100, right: 120, score: [2, 3], round: 7 },
            { w: false, s: true, up: false, down: false },
            0.1,
            400,
          ],
          '_return is not _args[0] and _args[0] == {"left":100,"right":120,"score":[2,3],"round":7} and _return["score"] == [2,3] and _return["round"] == 7 and _args[1] == {"w":False,"s":True,"up":False,"down":False}',
        ),
      ],
    ),
  ],
});

const review = quiz(
  9,
  L("Review: movement and control", "Herhaling: beweging en besturing"),
  [
    question(
      "v2-9-q1",
      L(
        "How far does a ball travel at 120 pixels/second during a 0.25-second update?",
        "Hoe ver beweegt een bal bij 120 pixels/seconde tijdens een update van 0,25 seconde?",
      ),
      "",
      [
        [
          L("30 pixels", "30 pixels"),
          L(
            "Speed multiplied by seconds gives displacement.",
            "Snelheid maal seconden geeft verplaatsing.",
          ),
        ],
        [
          L("480 pixels", "480 pixels"),
          L(
            "Dividing by time makes shorter frames move farther.",
            "Delen door tijd laat kortere beelden verder bewegen.",
          ),
        ],
        [
          L("120 pixels", "120 pixels"),
          L(
            "That assumes a full second has passed.",
            "Dat neemt aan dat een hele seconde verstreken is.",
          ),
        ],
      ],
    ),
    question(
      "v2-9-q2",
      L(
        "Which input source suits continuously moving a paddle?",
        "Welke invoerbron past bij voortdurend een paddle bewegen?",
      ),
      "",
      [
        [
          L(
            "Current held-key state, read every frame.",
            "Huidige ingedrukte-toetstoestand, elk beeld gelezen.",
          ),
          L(
            "It represents whether the key remains down.",
            "Die beschrijft of de toets ingedrukt blijft.",
          ),
        ],
        [
          L("One input() call per frame.", "Eén input()-aanroep per beeld."),
          L(
            "That waits for terminal text instead of game controls.",
            "Die wacht op terminaltekst in plaats van spelbesturing.",
          ),
        ],
        [
          L(
            "A single KEYDOWN event from the start of the game.",
            "Eén KEYDOWN-gebeurtenis bij het begin van het spel.",
          ),
          L(
            "A past press does not tell you whether the key is still held.",
            "Een eerdere druk vertelt niet of de toets nog ingedrukt is.",
          ),
        ],
      ],
    ),
    question(
      "v2-9-q3",
      L(
        "A paddle is 72 pixels high in a 400-pixel court. What is its maximum legal top coordinate?",
        "Een paddle is 72 pixels hoog op een veld van 400 pixels. Wat is zijn maximale toegestane bovenkantcoördinaat?",
      ),
      "",
      [
        [
          L("328", "328"),
          L(
            "Its bottom is top + 72, so 328 + 72 = 400.",
            "Zijn onderkant is boven + 72, dus 328 + 72 = 400.",
          ),
        ],
        [
          L("400", "400"),
          L(
            "That puts the entire paddle below the court.",
            "Dat zet de hele paddle onder het veld.",
          ),
        ],
        [
          L("364", "364"),
          L(
            "That accounts for only half the paddle height.",
            "Dat houdt slechts rekening met de halve paddlehoogte.",
          ),
        ],
      ],
    ),
    question(
      "v2-9-q4",
      L(
        "A ball touches the top wall with positive vertical velocity. Should you reverse it?",
        "Een bal raakt de bovenmuur met positieve verticale snelheid. Moet je die omkeren?",
      ),
      "",
      [
        [
          L(
            "No: it is already moving down, away from that wall.",
            "Nee: hij beweegt al omlaag, van die muur af.",
          ),
          L(
            "Reflect only motion directed into the wall.",
            "Kaats alleen beweging terug die naar de muur gericht is.",
          ),
        ],
        [
          L(
            "Yes: all contact must reverse velocity.",
            "Ja: elk contact moet snelheid omkeren.",
          ),
          L(
            "That can trap the ball in repeated reversals.",
            "Dat kan de bal vastzetten in herhaalde omkeringen.",
          ),
        ],
        [
          L(
            "Set the velocity to zero permanently.",
            "Zet de snelheid permanent op nul.",
          ),
          L(
            "That stops the rally instead of resolving a bounce.",
            "Dat stopt de rally in plaats van de botsing op te lossen.",
          ),
        ],
      ],
    ),
    question(
      "v2-9-q5",
      L(
        "Why retain a floating-point paddle position instead of rounding after every update?",
        "Waarom bewaar je een paddlepositie met decimalen in plaats van na elke update af te ronden?",
      ),
      "",
      [
        [
          L(
            "Small movements can accumulate instead of disappearing.",
            "Kleine bewegingen kunnen optellen in plaats van verdwijnen.",
          ),
          L(
            "Round for display, while the model retains subpixel movement.",
            "Rond af voor weergave, terwijl het model beweging kleiner dan één pixel bewaart.",
          ),
        ],
        [
          L(
            "Floats automatically prevent all collisions.",
            "Floats voorkomen automatisch alle botsingen.",
          ),
          L(
            "Collision rules still need to be implemented.",
            "Botsingsregels moeten nog steeds worden gemaakt.",
          ),
        ],
        [
          L(
            "pygame cannot draw at integer coordinates.",
            "Pygame kan niet op gehele coördinaten tekenen.",
          ),
          L(
            "Integer display coordinates are normal; this is about preserving state precision.",
            "Gehele schermcoördinaten zijn normaal; dit gaat over nauwkeurige toestand bewaren.",
          ),
        ],
      ],
    ),
  ],
);
export const activities = [advance, controls, clamp, bounce, players, review];
