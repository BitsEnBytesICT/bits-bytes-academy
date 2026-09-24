import { gameLesson as G } from "./game-authoring.mjs";
import {
  rallyDraw,
  rallySetup,
  heldMovement,
} from "../complete-course/game-support.mjs";
export const activities = [
  G(16, "two-controls", {
    title: [
      "Connect two players' controls",
      "Verbind de besturing van twee spelers",
    ],
    topics: "controls-integration",
    practices: "held-keys boundaries elapsed-time",
    requires: "serving held-keys boundaries",
    minutes: 22,
    why: [
      "Join held keys, elapsed time and boundaries in one update. Both players must be able to move in the same frame.",
      "Verbind ingedrukte toetsen, verstreken tijd en grenzen in één update. Beide spelers moeten in hetzelfde beeld kunnen bewegen.",
    ],
    teach: [
      "controls(left, right, w, s, up, down, dt) returns the new two paddle positions. Each held upward key subtracts 240 * dt; each held downward key adds it. Use independent if statements, including for opposing keys: both held means no net movement. Only after adding movement, clamp each result to 0 through 340. The supplied loop reads the keyboard, calls your update, unpacks its result, then draws. Look at main.py to find those three steps; leave the browser scheduling unchanged.",
      "controls(left, right, w, s, up, down, dt) geeft de twee nieuwe batjeposities terug. Elke ingedrukte omhoogtoets trekt 240 * dt af; elke omlaagtoets telt dat op. Gebruik onafhankelijke if-instructies, ook voor tegengestelde toetsen: beide ingedrukt betekent netto geen beweging. Begrens pas na optellen van beweging elk resultaat tot 0 tot en met 340. De aangeleverde lus leest het toetsenbord, roept je update aan, pakt het resultaat uit en tekent. Zoek die drie stappen in main.py; laat de browserplanning ongewijzigd.",
    ],
    rule: [
      "Read both players, update both positions, clamp, then draw.",
      "Lees beide spelers, werk beide posities bij, begrens en teken.",
    ],
    example:
      "position = 10\nposition -= 100 * 0.2\nprint(position)\nposition = max(0, position)\nprint(position)",
    output: "-10.0\n0\n",
    predict: [
      "Why does clamping need to happen after movement?",
      "Waarom moet begrenzen na bewegen gebeuren?",
    ],
    preview: {
      setup: rallySetup,
      frame:
        "left_y,right_y = game.controls(left_y,right_y,keys[pygame.K_w],keys[pygame.K_s],keys[pygame.K_UP],keys[pygame.K_DOWN],dt)",
      draw: rallyDraw,
    },
    starter:
      "def controls(left, right, w, s, up, down, dt):\n    return left, right\n",
    solution:
      "def controls(left, right, w, s, up, down, dt):\n    if w: left -= 240 * dt\n    if s: left += 240 * dt\n    if up: right -= 240 * dt\n    if down: right += 240 * dt\n    return max(0,min(340,left)), max(0,min(340,right))\n",
    tasks: [
      {
        name: "controls",
        task: [
          "Implement controls with independent controls for both paddles, elapsed time and final boundary clamping. Return (left, right).",
          "Implementeer controls met onafhankelijke besturing van beide batjes, verstreken tijd en begrenzing aan het eind. Geef (left, right) terug.",
        ],
        help: [
          "An elif chain would skip the second player's movement. Four if statements allow simultaneous actions.",
          "Een elif-keten zou beweging van de tweede speler overslaan. Vier if-instructies laten gelijktijdige acties toe.",
        ],
        fragment: "if down: right += 240 * dt",
        cases: [
          [[100, 200, true, false, false, true, 0.1], "_return == (76,224)"],
          [[0, 340, true, false, false, true, 0.1], "_return == (0,340)"],
          [[0, 340, true, true, true, true, 0.1], "_return == (0,340)"],
          [[100, 200, false, true, true, false, 0], "_return == (100,200)"],
          [[100, 200, false, true, true, false, 0.05], "_return == (112,188)"],
        ],
      },
    ],
    change: [
      "Hold W and Down together, then opposing keys for one paddle. Click outside the preview and return; explain why no movement should accumulate while unfocused.",
      "Houd W en Omlaag samen ingedrukt en daarna tegengestelde toetsen voor één batje. Klik buiten het voorbeeld en keer terug; leg uit waarom beweging zich niet hoort op te stapelen zonder focus.",
    ],
    explain: [
      "Every key contributes independently. Both positions are bounded after all contributions, avoiding stuck controls or giving one player priority.",
      "Elke toets draagt onafhankelijk bij. Beide posities worden na alle bijdragen begrensd; zo blijven besturingen vrij en krijgt geen speler voorrang.",
    ],
  }),
  G(16, "mirror-collision", {
    title: [
      "Complete the other side of the court",
      "Maak de andere kant van het veld af",
    ],
    topics: "mirrored-collision",
    practices: "paddle-collision overlap-correction",
    requires: "paddle-collision serving",
    guidance: "independent",
    minutes: 22,
    why: [
      "Apply the left-paddle idea to the right side. Direction and position correction must mirror together.",
      "Pas het idee van het linkerbatje toe op rechts. Richting en positieherstel moeten samen spiegelen.",
    ],
    teach: [
      "The right paddle is a Rect at (610, paddle_y, 10, 60). The ball's centre is (x,y), radius 6. Build its Rect from (x-6,y-6,12,12). Reverse only an overlapping ball that approaches with vx > 0. Move its centre to paddle.left - 6 so it is outside the paddle on its new travel side. Keep x and vx unchanged for misses or a ball already travelling left. The supplied left side in main.py lets you compare the two responses during a rally.",
      "Het rechterbatje is een Rect op (610, paddle_y, 10, 60). Het balmiddelpunt is (x,y), straal 6. Maak zijn Rect met (x-6,y-6,12,12). Keer alleen een overlappende bal om die nadert met vx > 0. Verplaats het middelpunt naar paddle.left - 6 zodat het buiten het batje staat aan de nieuwe bewegingskant. Houd x en vx gelijk bij missers of een bal die al linkswaarts gaat. De aangeleverde linkerkant in main.py laat je beide reacties tijdens een rally vergelijken.",
    ],
    rule: [
      "Overlap and approach are both required; correct position before the next frame.",
      "Overlap en naderen zijn allebei nodig; herstel de positie vóór het volgende beeld.",
    ],
    example:
      "left_edge = 500\nradius = 5\nprint(left_edge - radius)\nprint(-120)",
    output: "495\n-120\n",
    predict: [
      "Which side of left_edge is 495? Which way is the negative velocity?",
      "Aan welke kant van left_edge ligt 495? Welke richting heeft de negatieve snelheid?",
    ],
    preview: {
      setup: rallySetup,
      frame:
        heldMovement +
        "\nx += vx * dt\ny += vy * dt\nif y <= 6 or y >= 394:\n    vy = -vy\n    y = max(6,min(394,y))\nif x <= 36 and vx < 0 and left_y <= y <= left_y + 60:\n    x,vx = 36,-vx\nx,vx = game.hit_right(x,y,vx,right_y)\nif x < -6 or x > 646:\n    x,y = 320,200",
      draw: rallyDraw,
    },
    starter: "def hit_right(x, y, vx, paddle_y):\n    return x, vx\n",
    solution:
      "def hit_right(x, y, vx, paddle_y):\n    ball = pygame.Rect(x-6,y-6,12,12)\n    paddle = pygame.Rect(610,paddle_y,10,60)\n    if ball.colliderect(paddle) and vx > 0:\n        return paddle.left - 6, -vx\n    return x, vx\n",
    tasks: [
      {
        name: "hit_right",
        task: [
          "Implement hit_right(x, y, vx, paddle_y) for the geometry above. Return corrected (x, vx) only for an approaching contact.",
          "Implementeer hit_right(x, y, vx, paddle_y) voor de geometrie hierboven. Geef herstelde (x, vx) alleen bij naderend contact terug.",
        ],
        help: [
          "Mirror both the velocity sign and the paddle edge. An outgoing ball must not bounce again.",
          "Spiegel zowel het snelheidsteken als de batjerand. Een vertrekkende bal mag niet opnieuw stuiteren.",
        ],
        fragment: "paddle.left - 6",
        cases: [
          [[608, 200, 100, 170], "_return == (604,-100)"],
          [[608, 200, -100, 170], "_return == (608,-100)"],
          [[608, 100, 100, 170], "_return == (608,100)"],
          [[604, 200, 100, 170], "_return == (604,100)"],
        ],
      },
    ],
    change: [
      "Explain the exact-touch case: pygame Rect edges that only touch do not overlap. Test a high and low miss too.",
      "Leg het geval van exact raken uit: pygame Rect-randen die alleen raken overlappen niet. Test ook een hoge en lage misser.",
    ],
    explain: [
      "The right-side correction is 610 - 6 = 604, with negative outgoing velocity. Testing direction prevents a second bounce while leaving contact.",
      "Het rechter positieherstel is 610 - 6 = 604, met negatieve vertreksnelheid. Richting testen voorkomt een tweede stuiter bij het verlaten van contact.",
    ],
  }),
  G(16, "rally-session", {
    title: [
      "Connect serve, movement and one-point scoring",
      "Verbind service, beweging en eenmalig scoren",
    ],
    topics: "rally-integration",
    practices: "serving scoring elapsed-time game-state",
    requires: "mirrored-collision controls-integration scoring",
    guidance: "independent",
    minutes: 30,
    why: [
      "Make one complete horizontal rally cycle before building your own Pong. Keep your attention on update order and state.",
      "Maak één volledige horizontale rallycyclus vóór je eigen Pong. Richt je aandacht op updatevolgorde en toestand.",
    ],
    teach: [
      "step(x, vx, left, right, pressed, dt) returns the next (x, vx, left, right). If waiting (vx == 0) and Space was pressed, start at vx = 200. Next move x by vx * dt. Finally check misses: x < -6 awards right one point; x > 646 awards left one point. A miss resets x to 320 and vx to 0 in that same update. Keep scores otherwise. A Space press during play has no effect. This horizontal practice has no paddles or vertical movement; you have already practised those separately. main.py resets the Space request every frame, gathers events, calls step once, unpacks all four results, then draws.",
      "step(x, vx, left, right, pressed, dt) geeft de volgende (x, vx, left, right) terug. Start bij wachten (vx == 0) en Space ingedrukt met vx = 200. Verplaats daarna x met vx * dt. Controleer als laatste missers: x < -6 geeft rechts één punt; x > 646 geeft links één punt. Een misser zet x op 320 en vx op 0 in dezelfde update. Houd scores anders gelijk. Space tijdens spelen heeft geen gevolg. Deze horizontale oefening heeft geen batjes of verticale beweging; die heb je afzonderlijk geoefend. main.py wist het Space-verzoek elk beeld, verzamelt gebeurtenissen, roept step eenmaal aan, pakt alle vier resultaten uit en tekent.",
    ],
    rule: [
      "Apply the event → move → resolve the miss → draw the returned state.",
      "Verwerk de gebeurtenis → beweeg → verwerk de misser → teken de teruggegeven toestand.",
    ],
    example:
      "x, velocity, score = 99, 20, 0\nx += velocity * 0.1\nif x > 100:\n    score += 1\n    x, velocity = 50, 0\nprint(x, velocity, score)",
    output: "50 0 1\n",
    predict: [
      "Would checking the miss before movement award this point in the same update?",
      "Zou een misser vóór beweging controleren dit punt in dezelfde update geven?",
    ],
    preview: {
      setup: "x,vx,left,right = 320.0,0.0,0,0\npressed = False",
      events:
        "if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:\n    pressed = True",
      frame:
        "x,vx,left,right = game.step(x,vx,left,right,pressed,dt)\npressed = False",
      draw: 'pygame.draw.circle(screen,(255,170,40),(int(x),200),6)\nfont = pygame.font.Font(None,30)\nscreen.blit(font.render(f"{left} : {right}   Space to serve",True,(240,240,240)),(150,30))',
    },
    starter:
      "def step(x, vx, left, right, pressed, dt):\n    return x, vx, left, right\n",
    solution:
      "def step(x, vx, left, right, pressed, dt):\n    if vx == 0 and pressed:\n        vx = 200\n    x += vx * dt\n    if x < -6:\n        return 320, 0, left, right + 1\n    if x > 646:\n        return 320, 0, left + 1, right\n    return x, vx, left, right\n",
    tasks: [
      {
        name: "step",
        task: [
          "Write the complete step function following the state contract above. Test an entire cycle: serve, move, miss, wait, serve again.",
          "Schrijf de volledige step-functie volgens de toestandsafspraken hierboven. Test een hele cyclus: service, bewegen, missen, wachten, opnieuw serveren.",
        ],
        help: [
          "Store every returned state value in the caller. A miss changes both velocity and position so it cannot score again next frame.",
          "Bewaar elke teruggegeven toestandswaarde in de aanroeper. Een misser verandert snelheid én positie zodat die volgend beeld niet opnieuw scoort.",
        ],
        fragment: "x += vx * dt",
        cases: [
          [[320, 0, 2, 3, true, 0.1], "_return == (340,200,2,3)"],
          [
            [640, 200, 2, 3, false, 0.1],
            "_return == (320,0,3,3) and _module.step(*_return,False,0.1) == (320,0,3,3) and _module.step(*_return,True,0.1) == (340,200,3,3)",
          ],
          [[0, -200, 2, 3, true, 0.1], "_return == (320,0,2,4)"],
          [[320, 0, 2, 3, false, 1], "_return == (320,0,2,3)"],
          [[600, -100, 2, 3, true, 0.1], "_return == (590,-100,2,3)"],
          [[646, 200, 2, 3, false, 0], "_return == (646,200,2,3)"],
        ],
      },
    ],
    change: [
      "Draw the cycle as waiting → playing → miss → waiting. Say where paddles and wall responses belong when combining this with your earlier work for Pong.",
      "Teken de cyclus als wachten → spelen → missen → wachten. Vertel waar batjes en muurreacties passen wanneer je dit met je eerdere werk voor Pong combineert.",
    ],
    explain: [
      "Serving only changes a waiting ball. Movement happens before miss detection. The returned centred, stopped state prevents duplicate points and is ready for a new serve.",
      "Serveren verandert alleen een wachtende bal. Beweging komt vóór misserdetectie. De teruggegeven gecentreerde, gestopte toestand voorkomt dubbele punten en is klaar voor een nieuwe service.",
    ],
  }),
];
