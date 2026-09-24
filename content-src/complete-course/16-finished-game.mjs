import { lesson, S, C } from "./authoring.mjs";
import { preview, G, frameCheck } from "./game-support.mjs";
import {
  matchFiles,
  transitions,
  scoring,
  paddles,
  persistence,
  pause,
} from "./full-game-support.mjs";
export const activities = [
  lesson(16, 1, {
    runtime: "pygame",
    explanation: [
      "Trace a match through serve, playing and won states. The supplied game fixture is complete around your transition helper, so you can focus on the rules. Space serves, R restarts, and P pauses.",
      "Volg een wedstrijd door de toestanden serve, playing en won. De meegeleverde spelfixture is compleet rond je overgangshelper zodat je op de regels kunt focussen. Space serveert, R herstart en P pauzeert.",
    ],
    sections: [
      S(
        "game-state serving winning restarting",
        ["Write down allowed transitions", "Schrijf toegestane overgangen op"],
        [
          "From serve, space enters playing. From playing, a point enters won if either score reaches target, otherwise serve. A restart always returns serve; the caller resets scores and positions. Other actions preserve state. Keeping these transitions in one function prevents input handling and scoring from disagreeing.",
          "Vanuit serve gaat space naar playing. Vanuit playing gaat een punt naar won als één score target bereikt, anders naar serve. Een herstart geeft altijd serve; de aanroeper reset scores en posities. Andere acties behouden toestand. Deze overgangen in één functie houden voorkomt dat invoer en score elkaar tegenspreken.",
        ],
        'state = "serve"\naction = "space"\nif state == "serve" and action == "space":\n    state = "playing"\nprint(state)',
        "playing\n",
        [
          "Why should Space after winning not accidentally resume the old match?",
          "Waarom mag Space na winst niet per ongeluk de oude wedstrijd hervatten?",
        ],
      ),
      preview,
    ],
    starter: matchFiles({
      transitions:
        "def next_state(state, action, left, right, target):\n    return state\n",
    }),
    solution: matchFiles(),
    tasks: [
      C(
        "game-state serving restarting",
        [
          "Implement next_state for serve+space, any restart, and unchanged unrelated actions.",
          "Implementeer next_state voor serve+space, elke restart en ongewijzigde niet-gerelateerde acties.",
        ],
        frameCheck,
        [
          [
            "Treat state and action as separate inputs.",
            "Behandel toestand en actie als aparte invoer.",
          ],
          [
            "Check restart first, then a serve-to-playing transition.",
            "Controleer eerst restart en dan een overgang van serve naar playing.",
          ],
          [
            'if action == "restart":\n    return "serve"',
            'if action == "restart":\n    return "serve"',
          ],
        ],
        [
          "Space must not restart a won match; R is the explicit restart.",
          "Space mag een gewonnen wedstrijd niet herstarten; R is de expliciete herstart.",
        ],
        [
          G("next_state", ["serve", "space", 0, 0, 3], '_return == "playing"'),
          G("next_state", ["won", "space", 3, 1, 3], '_return == "won"'),
          G("next_state", ["won", "restart", 3, 1, 3], '_return == "serve"'),
        ],
      ),
      C(
        "winning",
        [
          "On a point while playing, return won if either score is at least target; otherwise return serve.",
          "Geef bij een punt tijdens playing won als één score minstens target is, anders serve.",
        ],
        frameCheck,
        [
          [
            "Test both players against the same goal.",
            "Test beide spelers tegen hetzelfde doel.",
          ],
          [
            "Use or to combine the two winning conditions.",
            "Gebruik or om beide winstvoorwaarden te combineren.",
          ],
          [
            'if left >= target or right >= target:\n    return "won"',
            'if left >= target or right >= target:\n    return "won"',
          ],
        ],
        [
          "Winning must work for either side and for a changed target.",
          "Winnen moet voor beide kanten en een gewijzigd doel werken.",
        ],
        [
          G("next_state", ["playing", "point", 2, 1, 3], '_return == "serve"'),
          G("next_state", ["playing", "point", 3, 0, 3], '_return == "won"'),
          G("next_state", ["playing", "point", 0, 1, 1], '_return == "won"'),
        ],
      ),
    ],
    note: [
      "The helper selects a state; the caller performs reset actions. This separates the rule “what happens next” from changing every piece of game data.",
      "De helper kiest een toestand; de aanroeper voert resetacties uit. Dit scheidt de regel “wat gebeurt hierna” van elk spelgegeven wijzigen.",
    ],
    experiment: [
      "Trace serve → playing → serve → playing → won → restart on paper. Play a short target-1 match and confirm the same sequence.",
      "Volg serve → playing → serve → playing → won → restart op papier. Speel een korte wedstrijd tot 1 en bevestig dezelfde reeks.",
    ],
  }),
  lesson(16, 2, {
    runtime: "pygame",
    explanation: [
      "Repair duplicate scoring. A ball beyond an edge can remain there for more than one update; the match state must make a point a one-time transition.",
      "Repareer dubbele puntentelling. Een bal buiten een rand kan daar meerdere updates blijven; de wedstrijdtoestand moet een punt tot een eenmalige overgang maken.",
    ],
    sections: [
      S(
        "scoring-once",
        ["A score changes the phase", "Een punt verandert de fase"],
        [
          "score_miss receives state, ball centre x, scores and target. Only playing can award a point. x < -6 awards the right player; x > 646 awards the left. A point leaves playing for serve or won, so repeating the same out-of-bounds observation cannot award another point. Exactly -6 and 646 are not full misses.",
          "score_miss ontvangt toestand, balmiddelpunt x, scores en doel. Alleen playing mag een punt toekennen. x < -6 geeft rechts een punt; x > 646 geeft links een punt. Een punt verlaat playing voor serve of won, zodat dezelfde waarneming buiten het veld niet opnieuw een punt oplevert. Precies -6 en 646 zijn geen volledige missers.",
        ],
        'state = "serve"\nmissed = True\nprint(state == "playing" and missed)',
        "False\n",
        [
          "What prevents the same missed ball from scoring twice?",
          "Wat voorkomt dat dezelfde gemiste bal twee keer scoort?",
        ],
      ),
      preview,
    ],
    starter: matchFiles({
      scoring: scoring.replace(
        '    if state != "playing":\n        return state, left, right\n',
        "",
      ),
    }),
    solution: matchFiles(),
    tasks: [
      C(
        "scoring-once",
        [
          "Allow scoring only in playing, preserving all values in serve or won.",
          "Sta punten alleen toe in playing en behoud alle waarden in serve of won.",
        ],
        frameCheck,
        [
          [
            "State determines whether a miss is currently actionable.",
            "Toestand bepaalt of een misser nu behandeld moet worden.",
          ],
          [
            "Use an early return before edge checks.",
            "Gebruik een vroege return vóór randcontroles.",
          ],
          [
            'if state != "playing":\n    return state, left, right',
            'if state != "playing":\n    return state, left, right',
          ],
        ],
        [
          "A stopped or completed rally must not award additional points.",
          "Een gestopte of voltooide rally mag geen extra punten toekennen.",
        ],
        [
          G("score_miss", ["serve", 700, 1, 0, 3], '_return == ("serve",1,0)'),
          G("score_miss", ["won", -20, 3, 1, 3], '_return == ("won",3,1)'),
        ],
      ),
      C(
        "scoring-once",
        [
          "Preserve correct side, strict miss boundaries and the transition after scoring; verify a repeated observation scores once.",
          "Behoud de juiste kant, strikte missergrenzen en overgang na scoren; controleer dat een herhaalde waarneming één keer scoort.",
        ],
        frameCheck,
        [
          [
            "The side the ball leaves is the side that missed.",
            "De kant waar de bal vertrekt is de kant die miste.",
          ],
          [
            "Update one score, then call next_state with the new totals.",
            "Werk één score bij en roep next_state met de nieuwe totalen aan.",
          ],
          [
            'return next_state(state, "point", left, right, target), left, right',
            'return next_state(state, "point", left, right, target), left, right',
          ],
        ],
        [
          "Check both missed sides and the exact boundary positions.",
          "Controleer beide gemiste kanten en exacte grensposities.",
        ],
        [
          G("score_miss", ["playing", -7, 1, 1, 3], '_return == ("serve",1,2)'),
          G("score_miss", ["playing", 647, 2, 0, 3], '_return == ("won",3,0)'),
          G(
            "score_miss",
            ["playing", 646, 0, 0, 3],
            '_return == ("playing",0,0)',
          ),
          {
            moduleOnly: true,
            check:
              '(lambda first: __import__("game").score_miss(first[0],700,first[1],first[2],3) == first)(__import__("game").score_miss("playing",700,0,0,3))',
          },
        ],
      ),
    ],
    note: [
      "The guard makes scoring conditional on the match phase. Returning a different phase after one point prevents duplicate scoring even before the caller resets the ball.",
      "De controle maakt scoren afhankelijk van de wedstrijdfase. Een andere fase teruggeven na één punt voorkomt dubbele telling al voordat de aanroeper de bal reset.",
    ],
    experiment: [
      "Miss deliberately, wait several seconds before serving, and check the score stays unchanged. Repeat on the other side and at the winning point.",
      "Mis bewust, wacht enkele seconden vóór serveren en controleer dat de score gelijk blijft. Herhaal aan de andere kant en bij het winnende punt.",
    ],
  }),
  lesson(16, 3, {
    runtime: "pygame",
    explanation: [
      "Refactor one responsibility into a Paddle class, then correct contact geometry. Keep the rest of the working game fixture while changing how one object owns movement.",
      "Refactor één verantwoordelijkheid naar een Paddle-klasse en corrigeer daarna contactgeometrie. Behoud de rest van de werkende spelfixture terwijl je verandert hoe één object beweging beheert.",
    ],
    sections: [
      S(
        "game-classes collision-correction",
        [
          "Own state; separate after contact",
          "Beheer toestand; scheid na contact",
        ],
        [
          "Paddle owns x, y and height, moves at 240 pixels/second and returns its Rect. Its whole body stays inside height 400. reflect(x,y,vx,paddle) receives a rectangle tuple; on an approaching overlap return the corrected ball centre just outside the paddle and the reversed vx. For a left paddle that centre is right+6; for a right paddle it is left-6. Without overlap or while moving away, preserve the original float x.",
          "Paddle beheert x, y en height, beweegt met 240 pixels/seconde en geeft zijn Rect terug. Het hele batje blijft binnen hoogte 400. reflect(x,y,vx,paddle) ontvangt een rechthoektuple; geef bij naderende overlap het gecorrigeerde balmiddelpunt net buiten het batje en omgekeerde vx terug. Links is dat middelpunt right+6; rechts left-6. Zonder overlap of bij weg bewegen blijft de oorspronkelijke float x behouden.",
        ],
        "import pygame\npaddle = pygame.Rect(20, 100, 10, 60)\nprint(paddle.right + 6)",
        "36\n",
        [
          "Why is reversing velocity without separating the shapes less reliable?",
          "Waarom is alleen snelheid omkeren zonder vormen te scheiden minder betrouwbaar?",
        ],
      ),
      preview,
    ],
    starter: matchFiles({
      paddles: paddles
        .replace(
          "        self.y = max(0, min(400 - self.height, self.y))",
          "        self.y = max(0, min(400, self.y))",
        )
        .replace("return target.right + 6, -vx", "return x, -vx")
        .replace("return target.left - 6, -vx", "return x, -vx"),
    }),
    solution: matchFiles(),
    tasks: [
      C(
        "game-classes",
        [
          "Repair Paddle.move so its instance height determines the bottom boundary. Keep independent state and opposite-control cancellation.",
          "Repareer Paddle.move zodat zijn instantiehoogte de ondergrens bepaalt. Behoud onafhankelijke toestand en opheffing van tegengestelde besturing.",
        ],
        frameCheck,
        [
          [
            "The class already groups position and movement.",
            "De klasse groepeert positie en beweging al.",
          ],
          [
            "Subtract self.height when finding the largest valid top.",
            "Trek self.height af bij het bepalen van de grootste geldige bovenpositie.",
          ],
          [
            "self.y = max(0, min(400 - self.height, self.y))",
            "self.y = max(0, min(400 - self.height, self.y))",
          ],
        ],
        [
          "A taller paddle needs a smaller maximum y.",
          "Een hoger batje heeft een kleinere maximale y nodig.",
        ],
        [
          G(
            "Paddle",
            [20, 350, 80],
            "_return.move(False,True,1) is None and _return.y == 320 and tuple(_return.rect()) == (20,320,10,80)",
          ),
          G(
            "Paddle",
            [20, 100, 60],
            '_return.move(True,True,0.1) is None and _return.y == 100 and __import__("game").Paddle(610,200).y == 200',
          ),
        ],
      ),
      C(
        "collision-correction",
        [
          "Repair reflect to separate overlapping shapes after a direction-aware bounce on either paddle, preserving x when no correction is needed.",
          "Repareer reflect om overlappende vormen te scheiden na een richtingsbewuste botsing op elk batje en behoud x als correctie niet nodig is.",
        ],
        frameCheck,
        [
          [
            "Position and direction must both agree after contact.",
            "Positie en richting moeten na contact beide kloppen.",
          ],
          [
            "Place the centre one radius beyond the contacted paddle edge.",
            "Zet het middelpunt één straal voorbij de geraakte batjesrand.",
          ],
          ["return target.right + 6, -vx", "return target.right + 6, -vx"],
        ],
        [
          "Do not round x merely because a Rect was used for detection.",
          "Rond x niet af alleen omdat een Rect voor detectie werd gebruikt.",
        ],
        [
          G(
            "reflect",
            [28, 130, -100, [20, 100, 10, 60]],
            "_return == (36,100)",
          ),
          G(
            "reflect",
            [613, 130, 100, [610, 100, 10, 60]],
            "_return == (604,-100)",
          ),
          G(
            "reflect",
            [28.5, 130, 100, [20, 100, 10, 60]],
            "_return == (28.5,100)",
          ),
          G(
            "reflect",
            [100.25, 130, -100, [20, 100, 10, 60]],
            "_return == (100.25,-100)",
          ),
        ],
      ),
    ],
    note: [
      "The class owns paddle state while the collision function handles a geometry rule. Correcting overlap and checking approach jointly prevent sticking and repeated reversals.",
      "De klasse beheert batjestoestand terwijl de botsingsfunctie een geometrieregel behandelt. Overlap corrigeren en naderen controleren voorkomen samen vastplakken en herhaald omkeren.",
    ],
    experiment: [
      "Test edge contacts and a ball already leaving a paddle. Keep the supplied moderate speed: discrete overlap tests can miss very fast crossings, so increased speeds require further collision design.",
      "Test randcontacten en een bal die al van een batje weg beweegt. Behoud de meegeleverde gematigde snelheid: discrete overlaptests kunnen snelle passages missen, dus hogere snelheden vereisen extra botsingsontwerp.",
    ],
  }),
  lesson(16, 4, {
    runtime: "pygame",
    explanation: [
      "Connect saved settings and a match result to the game. Validate loaded data before using it as a rule, and inspect the JSON produced when the preview closes normally.",
      "Verbind opgeslagen instellingen en een wedstrijdresultaat met het spel. Valideer geladen gegevens voordat je die als regel gebruikt en bekijk de JSON na normaal sluiten van het voorbeeld.",
    ],
    sections: [
      S(
        "game-persistence",
        [
          "File validity and rule validity",
          "Bestandsgeldigheid en regelgeldigheid",
        ],
        [
          "load_target reads a JSON object with integer target from 1 through 21. Return default 5 for missing, malformed or invalid settings, without rewriting the settings file. A JSON boolean is not an accepted target even though bool is related to int in Python. save_result writes one object with left and right scores. The fixture calls it on normal close; Stop is an interruption and need not save a result.",
          "load_target leest een JSON-object met geheel target van 1 tot en met 21. Geef standaard 5 bij ontbrekende, ongeldige of ongeschikte instellingen zonder het bestand te herschrijven. Een JSON-boolean is geen toegestaan doel hoewel bool in Python met int verwant is. save_result schrijft één object met left- en right-scores. De fixture roept dit bij normaal sluiten aan; Stop onderbreekt en hoeft geen resultaat te bewaren.",
        ],
        "value = True\nprint(isinstance(value, int))\nprint(type(value) is int)",
        "True\nFalse\n",
        [
          "Which check enforces the exact integer rule?",
          "Welke controle dwingt de exacte gehele-getalregel af?",
        ],
      ),
      preview,
    ],
    starter: matchFiles({
      persistence:
        "def load_target(filename):\n    return 5\n\ndef save_result(filename, left, right):\n    pass\n",
    }),
    solution: matchFiles(),
    tasks: [
      C(
        "game-persistence",
        [
          "Implement load_target with the stated validation and default. Keep invalid saved data untouched for inspection.",
          "Implementeer load_target met de genoemde validatie en standaard. Laat ongeldige opgeslagen gegevens ongewijzigd voor inspectie.",
        ],
        frameCheck,
        [
          [
            "Reading JSON successfully does not prove the target is usable.",
            "JSON succesvol lezen bewijst niet dat het doel bruikbaar is.",
          ],
          [
            "Handle missing/JSONDecodeError, then validate dictionary shape and exact integer range.",
            "Handel ontbreken/JSONDecodeError af en valideer dan dictionaryvorm en exact geheel bereik.",
          ],
          [
            "if type(value) is int and 1 <= value <= 21:\n    return value",
            "if type(value) is int and 1 <= value <= 21:\n    return value",
          ],
        ],
        [
          "Check malformed JSON, booleans and values outside the range.",
          "Controleer ongeldige JSON, booleans en waarden buiten bereik.",
        ],
        [
          G("load_target", ["settings.json"], "_return == 3"),
          ...[
            '{"target":true}',
            '{"target":0}',
            '{"target":22}',
            "[]",
            "{bad",
          ].map((text) =>
            G(
              "load_target",
              ["probe.json"],
              '_return == 5 and __import__("pathlib").Path("probe.json").read_text() == _args[1]',
              {
                files: { "probe.json": text },
                call: {
                  module: "game",
                  name: "load_target",
                  args: ["probe.json"],
                },
                check: `_return == 5 and __import__("pathlib").Path("probe.json").read_text() == ${JSON.stringify(text)}`,
              },
            ),
          ),
          G("load_target", ["missing.json"], "_return == 5"),
        ],
      ),
      C(
        "game-persistence",
        [
          'Write {"left": left, "right": right} as JSON in save_result. Finish the preview and inspect result.json.',
          'Schrijf {"left": left, "right": right} als JSON in save_result. Rond het voorbeeld af en bekijk result.json.',
        ],
        frameCheck,
        [
          [
            "Keep the saved data model simple and explicit.",
            "Houd het opgeslagen model eenvoudig en expliciet.",
          ],
          [
            "Write one complete object using json.dump.",
            "Schrijf één volledig object met json.dump.",
          ],
          [
            'json.dump({"left": left, "right": right}, handle)',
            'json.dump({"left": left, "right": right}, handle)',
          ],
        ],
        [
          "The file must contain parseable JSON with both scores.",
          "Het bestand moet leesbare JSON met beide scores bevatten.",
        ],
        [
          G(
            "save_result",
            ["probe.json", 3, 1],
            '__import__("json").loads(__import__("pathlib").Path("probe.json").read_text()) == {"left":3,"right":1}',
          ),
          G(
            "save_result",
            ["probe.json", 0, 0],
            '__import__("json").loads(__import__("pathlib").Path("probe.json").read_text()) == {"left":0,"right":0}',
          ),
        ],
      ),
    ],
    note: [
      "The loader applies a recoverable default without destroying evidence of a bad file. The writer serialises only the result data, not Pygame objects.",
      "De lezer past een herstelbare standaard toe zonder bewijs van een slecht bestand te vernietigen. De schrijver bewaart alleen resultaatgegevens, geen Pygame-objecten.",
    ],
    experiment: [
      "Change target to 1, reload and play a short match. Finish normally, inspect result.json, navigate away and return to verify the saved file.",
      "Wijzig target in 1, herlaad en speel een korte wedstrijd. Rond normaal af, bekijk result.json, navigeer weg en keer terug om het opgeslagen bestand te controleren.",
    ],
  }),
  lesson(16, 5, {
    runtime: "pygame",
    explanation: [
      "Add a pause controller to an existing game from a brief. P toggles a paused Boolean, only playing and unpaused matches advance, and restart clears pause. Preserve the rest of the fixture and use manual tests as well as checks.",
      "Voeg vanuit een beschrijving een pauzeregelaar aan een bestaand spel toe. P wisselt een paused-boolean, alleen spelende en ongepauzeerde wedstrijden gaan verder en herstart wist pauze. Behoud de rest van de fixture en gebruik handmatige tests naast controles.",
    ],
    sections: [
      S(
        "playtesting game-review",
        [
          "Test sequences, not only moments",
          "Test reeksen, niet alleen momenten",
        ],
        [
          "The supplied main loop calls handle_key on KEYDOWN, should_update before moving anything and reset on restart. Implement that interface without putting an input loop inside the class. Check sequences such as serve → pause → wait → resume and win → pause → restart. Rendering and close events must continue during pause. Browser focus pausing is separate and already supplied.",
          "De meegeleverde hoofdlus roept handle_key bij KEYDOWN aan, should_update vóór beweging en reset bij herstart. Implementeer die interface zonder een invoerlus in de klasse te zetten. Controleer reeksen zoals serveren → pauze → wachten → hervatten en winnen → pauze → herstart. Tekenen en sluitgebeurtenissen moeten tijdens pauze doorgaan. Browserfocuspauze is apart en al meegeleverd.",
        ],
        'state, paused = "playing", True\nprint(state == "playing" and not paused)',
        "False\n",
        [
          "Which actions should still work while movement is paused?",
          "Welke acties moeten nog werken terwijl beweging gepauzeerd is?",
        ],
      ),
      preview,
    ],
    starter: matchFiles({
      pause:
        'class PauseControl:\n    def __init__(self):\n        self.paused = False\n\n    def handle_key(self, key):\n        pass\n\n    def should_update(self, state):\n        return state == "playing"\n\n    def reset(self):\n        pass\n',
    }),
    solution: matchFiles(),
    tasks: [
      C(
        "game-review",
        [
          "Implement independent PauseControl state. Toggle only on pygame.K_p and clear pause on reset.",
          "Implementeer onafhankelijke PauseControl-toestand. Wissel alleen bij pygame.K_p en wis pauze bij reset.",
        ],
        frameCheck,
        [
          [
            "State persists between event calls on the same object.",
            "Toestand blijft tussen gebeurtenisaanroepen op hetzelfde object bestaan.",
          ],
          [
            "Only the P key changes the Boolean.",
            "Alleen de P-toets verandert de boolean.",
          ],
          ["self.paused = not self.paused", "self.paused = not self.paused"],
        ],
        [
          "An unrelated key must not resume or pause the match.",
          "Een andere toets mag de wedstrijd niet hervatten of pauzeren.",
        ],
        [
          G(
            "PauseControl",
            [],
            '_return.handle_key(__import__("pygame").K_p) is None and _return.paused is True and _return.handle_key(__import__("pygame").K_SPACE) is None and _return.paused is True and __import__("game").PauseControl().paused is False',
          ),
          G(
            "PauseControl",
            [],
            '_return.handle_key(__import__("pygame").K_p) is None and _return.reset() is None and _return.paused is False',
          ),
        ],
      ),
      C(
        "playtesting",
        [
          'Return True from should_update only for state="playing" while unpaused. Playtest pause, resume, restart, close, Stop and Run again.',
          'Geef alleen True vanuit should_update bij state="playing" terwijl ongepauzeerd. Test pauze, hervatten, herstart, sluiten, Stop en opnieuw Uitvoeren.',
        ],
        frameCheck,
        [
          [
            "Movement depends on both match phase and pause state.",
            "Beweging hangt van wedstrijdfase én pauzetoestand af.",
          ],
          [
            "Combine the state comparison with not self.paused.",
            "Combineer de toestandsvergelijking met not self.paused.",
          ],
          [
            'return state == "playing" and not self.paused',
            'return state == "playing" and not self.paused',
          ],
        ],
        [
          "Serve and won phases must not move, even when unpaused.",
          "Serve en won mogen niet bewegen, ook niet ongepauzeerd.",
        ],
        [
          G(
            "PauseControl",
            [],
            '_return.should_update("playing") is True and _return.should_update("serve") is False and _return.should_update("won") is False',
          ),
          G(
            "PauseControl",
            [],
            '_return.handle_key(__import__("pygame").K_p) is None and _return.should_update("playing") is False and _return.handle_key(__import__("pygame").K_p) is None and _return.should_update("playing") is True',
          ),
        ],
      ),
    ],
    note: [
      "The controller decides whether simulation advances, while the main loop continues handling events and drawing. This avoids a pause implementation that freezes the entire interface.",
      "De regelaar beslist of de simulatie verdergaat terwijl de hoofdlus gebeurtenissen en tekenen blijft afhandelen. Dat voorkomt een pauze die de hele interface bevriest.",
    ],
    experiment: [
      "Record expected and actual results for simultaneous keys, wall/paddle contact, misses, scoring once, restart, focus loss, Stop and another Run. Carry this table into your Pong upgrade.",
      "Noteer verwachte en werkelijke resultaten voor gelijktijdige toetsen, muur-/batjescontact, missers, één keer scoren, herstart, focusverlies, Stop en opnieuw Uitvoeren. Neem deze tabel mee naar je Pong-uitbreiding.",
    ],
  }),
];
