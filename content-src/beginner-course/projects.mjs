import { L, idFor } from "./authoring.mjs";
import { courtMain } from "./game-authoring.mjs";
const milestone = (id, title, description, hints) => ({
  id,
  title: L(...title),
  description: L(...description),
  hints: hints.map((h) => L(...h)),
});
const project = (chapter, slug, title, description, minutes, files) => ({
  id: idFor(chapter, slug),
  chapter,
  group: `python-v4-module-${chapter}`,
  kind: "project",
  runtime: "terminal",
  optional: false,
  guidance: "independent",
  estimatedMinutes: minutes,
  title: L(...title),
  explanation: L(...description),
  example: "",
  sections: [],
  files,
  solution: {},
  checkpoints: [],
  solutionNote: L(
    "Choose your own design and assess it using the manual tests.",
    "Kies je eigen ontwerp en beoordeel het met de handmatige tests.",
  ),
  milestones: [],
  references: [],
  suggestedTests: [],
});
export const calculator = {
  ...project(
    10,
    "calculator-project",
    ["Project: your calculator", "Project: jouw rekenmachine"],
    [
      "Build one complete terminal calculator from a small blank file. Choose +, -, * or /, read two numeric values, show the result, and offer another calculation. Recover from invalid numbers and unsupported operations; handle a zero divisor. Accept negative and decimal values. Allow quit at every prompt and finish cleanly at end-of-input. Use small functions for calculation and input. You decide the exact messages and design. Mark each milestone yourself after testing it.",
      "Bouw één complete terminalrekenmachine vanuit een klein leeg bestand. Kies +, -, * of /, lees twee numerieke waarden, toon het resultaat en bied nog een berekening aan. Herstel van ongeldige getallen en onbekende bewerkingen; verwerk een deler nul. Accepteer negatieve en decimale waarden. Laat quit toe bij elke vraag en sluit netjes af bij einde invoer. Gebruik kleine functies voor berekening en invoer. Jij bepaalt de exacte berichten en het ontwerp. Markeer elke mijlpaal zelf nadat je die hebt getest.",
    ],
    120,
    { "main.py": "# Build your calculator here.\n" },
  ),
  references: [
    "09-ticket-function",
    "10-cancel-safely",
    "07-command-menu",
    "08-session-summary",
    "10-zero-division",
  ].map((s) => `python-v4-${s}`),
  sections: [
    {
      heading: L(
        "Readiness and a sample conversation",
        "Voorbereiding en een voorbeeldgesprek",
      ),
      body: L(
        "Before starting, revisit the linked independent function, menu and recovery exercises if needed. A conversation might be: Operation: + → First: -2.5 → Second: 4 → Result: 1.5 → Operation: quit → Goodbye. After First: apple, explain the problem and ask again. The program must still accept the next valid number. Prompts and wording are your choice.",
        "Bekijk vóór de start zo nodig de gekoppelde onafhankelijke functie-, menu- en hersteloefeningen. Een gesprek kan zijn: Operation: + → First: -2.5 → Second: 4 → Result: 1.5 → Operation: quit → Goodbye. Leg na First: apple het probleem uit en vraag opnieuw. Het programma moet het volgende geldige getal nog steeds accepteren. Vragen en bewoording kies je zelf.",
      ),
    },
  ],
  milestones: [
    milestone(
      "calculator-arithmetic",
      [
        "Calculate with reusable functions",
        "Bereken met herbruikbare functies",
      ],
      [
        "Implement four operations using arguments and return values. Test them separately before adding the conversation.",
        "Implementeer vier bewerkingen met argumenten en terugkeerwaarden. Test ze apart voordat je het gesprek toevoegt.",
      ],
      [
        [
          "Separate calculating from displaying.",
          "Scheid berekenen van tonen.",
        ],
        [
          "Choose a clear result for division by zero.",
          "Kies een duidelijk resultaat voor delen door nul.",
        ],
        [
          "A guard can return None before dividing.",
          "Een bewaking kan None teruggeven vóór delen.",
        ],
      ],
    ),
    milestone(
      "calculator-conversation",
      ["Read and recover", "Lees en herstel"],
      [
        "Read two numbers and an operation; keep asking after an invalid value or unsupported operation.",
        "Lees twee getallen en een bewerking; blijf vragen na een ongeldige waarde of onbekende bewerking.",
      ],
      [
        [
          "Reuse the input patterns from module 10.",
          "Hergebruik de invoerpatronen uit module 10.",
        ],
        [
          "Check quit before converting text.",
          "Controleer quit vóór tekstomzetting.",
        ],
        [
          "Catch ValueError around float(text).",
          "Vang ValueError rond float(text) op.",
        ],
      ],
    ),
    milestone(
      "calculator-session",
      ["Repeat and quit safely", "Herhaal en stop veilig"],
      [
        "Allow several calculations in one run and quit from any prompt, including after a failed conversion.",
        "Sta meerdere berekeningen in één uitvoering toe en stop bij elke vraag, ook na een mislukte omzetting.",
      ],
      [
        [
          "Draw the conversation and every exit.",
          "Teken het gesprek en elke uitgang.",
        ],
        [
          "Keep the operation menu inside an outer while loop.",
          "Houd het bewerkingsmenu binnen een buitenste while-lus.",
        ],
        [
          "Use is None to distinguish cancellation from numeric zero.",
          "Gebruik is None om annuleren van numerieke nul te onderscheiden.",
        ],
      ],
    ),
    milestone(
      "calculator-test",
      ["Test the finished tool", "Test het voltooide gereedschap"],
      [
        "Run all manual cases below. Explain one function and one recovery path before marking the project complete.",
        "Voer alle handmatige gevallen hieronder uit. Leg één functie en één herstelroute uit voordat je het project afrondt.",
      ],
      [
        [
          "Check boundaries and sequences, not only one successful calculation.",
          "Controleer grenzen en reeksen, niet alleen één geslaagde berekening.",
        ],
        [
          "Try invalid input followed by a valid calculation in the same run.",
          "Probeer ongeldige invoer gevolgd door een geldige berekening in dezelfde uitvoering.",
        ],
        [
          "Record expected and actual results in a small table.",
          "Noteer verwachte en werkelijke resultaten in een kleine tabel.",
        ],
      ],
    ),
  ],
  manualTests: [
    { input: L("2 + 3", "2 + 3"), expected: L("5", "5") },
    { input: L("7 - 10", "7 - 10"), expected: L("-3", "-3") },
    { input: L("-2 * 4", "-2 * 4"), expected: L("-8", "-8") },
    { input: L("9 / 2", "9 / 2"), expected: L("4.5", "4.5") },
    { input: L("0 * 5", "0 * 5"), expected: L("0", "0") },
    { input: L("-2.5 + 4", "-2.5 + 4"), expected: L("1.5", "1.5") },
    {
      input: L("5 / 0", "5 / 0"),
      expected: L(
        "Explain the zero divisor and return to a usable prompt.",
        "Leg de deler nul uit en keer terug naar een bruikbare vraag.",
      ),
    },
    {
      input: L(
        "apple, then 3 at a number prompt",
        "apple, daarna 3 bij een getalvraag",
      ),
      expected: L(
        "Explain the invalid number, retry, then accept 3.",
        "Leg het ongeldige getal uit, vraag opnieuw en accepteer 3.",
      ),
    },
    {
      input: L("Unknown operation, then +", "Onbekende bewerking, daarna +"),
      expected: L(
        "Retry the operation without crashing.",
        "Vraag de bewerking opnieuw zonder vast te lopen.",
      ),
    },
    {
      input: L("Two calculations, then quit", "Twee berekeningen, daarna quit"),
      expected: L(
        "Show both results in one run, then finish.",
        "Toon beide resultaten in één uitvoering en stop daarna.",
      ),
    },
    {
      input: L(
        "quit or End input at any prompt",
        "quit of einde invoer bij elke vraag",
      ),
      expected: L(
        "Exit cleanly, including after invalid input.",
        "Sluit netjes af, ook na ongeldige invoer.",
      ),
    },
  ],
  suggestedTests: [
    L(
      "2 + 3 → 5; 7 - 10 → -3; -2 * 4 → -8; 9 / 2 → 4.5; 0 * 5 → 0; 5 / 0 → handled message.",
      "2 + 3 → 5; 7 - 10 → -3; -2 * 4 → -8; 9 / 2 → 4.5; 0 * 5 → 0; 5 / 0 → afgehandeld bericht.",
    ),
    L(
      "Try an empty answer, apple, an unsupported operation, -2.5 and 0. Finish a valid calculation afterward without restarting.",
      "Probeer een leeg antwoord, apple, een onbekende bewerking, -2.5 en 0. Maak daarna een geldige berekening zonder te herstarten.",
    ),
    L(
      "Perform two calculations in one run. Quit at the menu, at the first number and at the second number. Test End input and then a fresh Run.",
      "Voer twee berekeningen in één uitvoering uit. Stop bij het menu, het eerste getal en het tweede getal. Test einde invoer en daarna opnieuw Uitvoeren.",
    ),
  ],
};
const startup = courtMain({
  setup: "# Create your paddles, ball, scores and font here.",
  events: "# Handle a serve key here.",
  frame: "# Update your game here.",
  draw: "# Draw your court, paddles, ball and score here.",
}).replace("import game\n", "");
export const pong = {
  ...project(
    16,
    "pong-project",
    ["Project: a complete Pong rally", "Project: een complete Pong-rally"],
    [
      "Create a minimal two-player Pong game in the supplied browser loop. Build two paddles, a moving ball, simultaneous controls, boundaries, wall and paddle responses, a score display, and a fresh serve after each miss. Keep it procedural: variables and small functions are enough. The startup already handles the browser and window lifecycle. Use your own design and mark milestones after playtesting. Classes, file saving and menus are optional later extensions.",
      "Maak een minimaal Pong-spel voor twee spelers in de aangeleverde browserlus. Bouw twee batjes, een bewegende bal, gelijktijdige bediening, grenzen, reacties op wanden en batjes, een scoreweergave en een nieuwe service na elke misser. Houd het procedureel: variabelen en kleine functies zijn voldoende. De start regelt de browser- en vensterlevenscyclus al. Kies je eigen ontwerp en markeer mijlpalen na speeltests. Klassen, bestanden opslaan en menu’s zijn optionele latere uitbreidingen.",
    ],
    150,
    { "main.py": startup },
  ),
  runtime: "pygame",
  references: [
    "15-drawing-order",
    "15-score-label",
    "16-held-controls",
    "16-wall-bounce",
    "16-paddle-contact",
    "16-score-once",
    "16-serve",
  ].map((s) => `python-v4-${s}`),
  milestones: [
    milestone(
      "pong-court",
      ["Draw and control the court", "Teken en bedien het veld"],
      [
        "Draw two paddles and a ball. Use W/S and Up/Down, allow both players to move together, and keep paddles inside the court.",
        "Teken twee batjes en een bal. Gebruik W/S en Up/Down, laat beide spelers tegelijk bewegen en houd batjes binnen het veld.",
      ],
      [
        [
          "Keep setup outside the repeating loop.",
          "Houd voorbereiding buiten de herhaallus.",
        ],
        [
          "Update each paddle independently from held keys.",
          "Werk elk batje onafhankelijk bij vanuit vastgehouden toetsen.",
        ],
        [
          "The maximum top coordinate is court height minus paddle height.",
          "De maximale bovenpositie is veldhoogte min batjeshoogte.",
        ],
      ],
    ),
    milestone(
      "pong-rally",
      ["Move and bounce", "Beweeg en stuiter"],
      [
        "Use elapsed time for the ball, bounce on top/bottom walls and both paddles, and correct overlap so contacts stay stable.",
        "Gebruik verstreken tijd voor de bal, stuiter tegen boven-/onderwand en beide batjes en herstel overlap zodat contacten stabiel blijven.",
      ],
      [
        [
          "Test wall responses before paddle responses.",
          "Test wandreacties vóór batjesreacties.",
        ],
        [
          "Use colliderect and require velocity toward the paddle.",
          "Gebruik colliderect en eis snelheid naar het batje toe.",
        ],
        [
          "After a left-paddle hit, place the ball centre at paddle.right + radius.",
          "Zet na een treffer links het balmiddelpunt op paddle.right + radius.",
        ],
      ],
    ),
    milestone(
      "pong-score",
      ["Score once and serve again", "Scoor eenmaal en serveer opnieuw"],
      [
        "Award a point to the opposite player after a miss, reset the ball to the centre, wait for Space and display both scores.",
        "Ken na een misser een punt toe aan de andere speler, zet de bal middenin, wacht op Space en toon beide scores.",
      ],
      [
        [
          "Change the score and ball state in one update.",
          "Verander score en baltoestand in één update.",
        ],
        [
          "Use a KEYDOWN event for a single serve request.",
          "Gebruik een KEYDOWN-gebeurtenis voor één serviceverzoek.",
        ],
        [
          "Render a formatted score string to a Surface and blit it.",
          "Teken een geformatteerde scorestring naar een Surface en kopieer die.",
        ],
      ],
    ),
    milestone(
      "pong-test",
      ["Playtest the game", "Test het spel"],
      [
        "Run the cases below with another player or control both sides. Explain one collision and one state transition.",
        "Voer onderstaande gevallen uit met een andere speler of bedien beide kanten. Leg één botsing en één toestandsovergang uit.",
      ],
      [
        [
          "Watch several frames after each contact.",
          "Bekijk meerdere beelden na elk contact.",
        ],
        [
          "Test both sides, not only the left paddle.",
          "Test beide kanten, niet alleen het linkerbatje.",
        ],
        [
          "Stop, Run again, and check that initial scores and positions are reset.",
          "Stop, voer opnieuw uit en controleer dat beginstanden en posities teruggezet zijn.",
        ],
      ],
    ),
  ],
  sections: [
    {
      heading: L(
        "Optional extension: a computer opponent",
        "Optionele uitbreiding: een computertegenstander",
      ),
      body: L(
        "Keep working in these same project files. Replace one player’s input with a direction chosen from the ball’s y coordinate. Give the computer a maximum speed and a small dead zone so it does not shake or teleport. Keep the two-player version selectable with a variable. This extension is optional and has no separate project completion. Later you may apply classes or save scores after those lessons.",
        "Werk verder in dezelfde projectbestanden. Vervang de invoer van één speler door een richting gekozen vanuit de y-coördinaat van de bal. Geef de computer een maximumsnelheid en een kleine dode zone zodat hij niet trilt of teleporteert. Houd de versie voor twee spelers selecteerbaar met een variabele. Deze uitbreiding is optioneel en heeft geen aparte projectafronding. Later kun je klassen toepassen of scores opslaan na die lessen.",
      ),
    },
  ],
  suggestedTests: [
    L(
      "Hold W and Down together; hold each paddle against both boundaries. Both players should stay responsive.",
      "Houd W en Down tegelijk vast; houd elk batje tegen beide grenzen. Beide spelers horen te blijven reageren.",
    ),
    L(
      "Test both walls and both paddles, including a departing ball still near a paddle and a vertical miss. Contacts must not rapidly flip direction.",
      "Test beide wanden en batjes, inclusief een vertrekkende bal nog dicht bij een batje en een verticale misser. Contacten mogen niet snel van richting wisselen.",
    ),
    L(
      "Miss on each side. Check exactly one point, a centred waiting ball and a new Space serve. Space during play must not reset the rally.",
      "Mis aan beide kanten. Controleer precies één punt, een wachtende bal middenin en een nieuwe Space-service. Space tijdens spelen mag de rally niet terugzetten.",
    ),
    L(
      "Change focus, return to the preview, close normally, Stop, and Run again. Check keys do not remain stuck and the new session starts cleanly.",
      "Wissel focus, keer terug naar het voorbeeld, sluit normaal af, stop en voer opnieuw uit. Controleer dat toetsen niet blijven hangen en de nieuwe sessie schoon start.",
    ),
  ],
};
