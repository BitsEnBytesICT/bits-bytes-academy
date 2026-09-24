import { L } from "./authoring.mjs";
import { lessonId } from "./syllabus.mjs";
import { rallyMain } from "./game-support.mjs";
import { aiExtension as previousExtension } from "../project-course/ai-extension.mjs";

const milestone = (id, title, description, hints) => ({
  id,
  title: L(...title),
  description: L(...description),
  hints: hints.map((h) => L(...h)),
});
const project = (id, chapter, minutes, title, explanation, files) => ({
  id,
  chapter,
  estimatedMinutes: minutes,
  group: id,
  kind: "project",
  optional: false,
  runtime: "terminal",
  guidance: "independent",
  title: L(...title),
  explanation: L(...explanation),
  files,
  example: "",
  sections: [],
  solution: {},
  checkpoints: [],
  solutionNote: L(
    "There is no single reference solution. You choose the design and assess it with your own tests.",
    "Er is geen enkele referentieoplossing. Jij kiest het ontwerp en beoordeelt het met je eigen tests.",
  ),
  milestones: [],
  suggestedTests: [],
  references: [],
});
const calculatorFiles = {
  "main.py":
    "# Your calculator. Keep and improve this program across both visits.\n",
};
const pongFiles = {
  "main.py": rallyMain,
  "game.py":
    "import pygame\n\ndef step(x, y, vx, vy, dt, left_y, right_y):\n    # Build your rally rules here. The supplied caller handles display and keys.\n    return x, y, vx, vy\n",
};

export const calculator = {
  ...project(
    "python-v3-calculator-project",
    14,
    90,
    [
      "Calculator: reliable and reusable",
      "Rekenmachine: betrouwbaar en herbruikbaar",
    ],
    [
      "Reopen the calculator you made after module 2. These are the same saved files; build on your working version. First record a baseline of ordinary calculations, then improve one behaviour at a time. Suggested milestones cover reusable calculations, repeated use, recovery, a readable history and saving/loading it. You decide when the project is complete. Classes are not required and have not been taught yet. If you used an older course, you can explicitly copy that archived calculator instead; this replaces the current project files only after you choose the copy action.",
      "Open de rekenmachine van na module 2 opnieuw. Dit zijn dezelfde opgeslagen bestanden; bouw voort op je werkende versie. Noteer eerst een uitgangstabel met gewone berekeningen en verbeter dan één gedrag tegelijk. Voorgestelde mijlpalen omvatten herbruikbare berekeningen, herhaald gebruik, herstel, leesbare geschiedenis en opslaan/laden. Jij bepaalt wanneer het project af is. Klassen zijn niet vereist en nog niet behandeld. Gebruikte je een oudere cursus, dan kun je die gearchiveerde rekenmachine expliciet kopiëren; dit vervangt de huidige projectbestanden pas nadat je de kopieeractie kiest.",
    ],
    calculatorFiles,
  ),
  continueFrom: "python-v2-calculator-project",
  milestones: [
    milestone(
      "calculator-upgrade-functions",
      ["Keep arithmetic reusable", "Houd berekeningen herbruikbaar"],
      [
        "Move calculations into functions with clear arguments and returned values. Keep your baseline results working after each change.",
        "Verplaats berekeningen naar functies met duidelijke argumenten en terugkeerwaarden. Houd je uitgangsresultaten na elke wijziging werkend.",
      ],
      [
        [
          "Identify calculations that do not need input or printing.",
          "Bepaal welke berekeningen geen input of print nodig hebben.",
        ],
        [
          "Let the caller read text and display the returned answer.",
          "Laat de aanroeper tekst lezen en het teruggegeven antwoord tonen.",
        ],
        [
          "Start by extracting just one operation and test it independently.",
          "Begin met één bewerking uit te pakken en test die apart.",
        ],
      ],
    ),
    milestone(
      "calculator-upgrade-recovery",
      ["Repeat and recover", "Herhaal en herstel"],
      [
        "Support another calculation, cancellation, malformed numeric text and division by zero. Decide how to handle unknown commands and end-of-input.",
        "Ondersteun nog een berekening, annuleren, ongeldige getaltekst en delen door nul. Bepaal hoe je onbekende commando’s en einde invoer behandelt.",
      ],
      [
        [
          "Sketch the conversation, including an exit from every retry.",
          "Schets het gesprek met een uitweg uit elke herhaling.",
        ],
        [
          "Separate conversion failures from domain rules.",
          "Scheid omzettingsfouten van inhoudelijke regels.",
        ],
        [
          "Revisit read_between for the pattern, then adapt it to calculator operations.",
          "Bekijk read_between voor het patroon en pas het aan voor rekenbewerkingen.",
        ],
      ],
    ),
    milestone(
      "calculator-upgrade-history",
      ["Keep useful history", "Bewaar bruikbare geschiedenis"],
      [
        "Record successful calculations with their operands, operation and result. Format a readable view without altering the original records.",
        "Leg geslaagde berekeningen vast met getallen, bewerking en resultaat. Formatteer een leesbare weergave zonder oorspronkelijke records te veranderen.",
      ],
      [
        [
          "Choose a record shape you can explain.",
          "Kies een recordvorm die je kunt uitleggen.",
        ],
        [
          "A list of dictionaries can keep named fields in order.",
          "Een lijst dictionaries kan benoemde velden op volgorde bewaren.",
        ],
        [
          "Format one record first, then apply that formatter to the history.",
          "Formatteer eerst één record en pas die formatter daarna op de geschiedenis toe.",
        ],
      ],
    ),
    milestone(
      "calculator-upgrade-files",
      ["Save and reopen", "Bewaar en heropen"],
      [
        "Save and load history using JSON or CSV. Keep a text export if useful. Define what happens for missing or damaged files; do not silently overwrite a damaged history. Choose float or Decimal deliberately for your context.",
        "Bewaar en laad geschiedenis via JSON of CSV. Houd zo nodig een tekstexport bij. Bepaal wat bij ontbrekende of beschadigde bestanden gebeurt; overschrijf beschadigde geschiedenis niet stilzwijgend. Kies bewust float of Decimal voor je context.",
      ],
      [
        [
          "A file format needs a clear data model.",
          "Een bestandsformaat heeft een duidelijk gegevensmodel nodig.",
        ],
        [
          "Store Decimal amounts as strings if you choose them; JSON does not directly encode Decimal.",
          "Bewaar Decimal-bedragen als strings als je die kiest; JSON codeert Decimal niet direct.",
        ],
        [
          "Test a save/load round trip on two records before connecting the whole conversation.",
          "Test heen-en-terug opslaan/laden met twee records voordat je het hele gesprek aansluit.",
        ],
      ],
    ),
  ],
  suggestedTests: [
    L(
      "Baseline: 2 + 3 → 5; 7 - 10 → -3; -2 × 4 → -8; 9 / 2 → 4.5; 0 × 5 → 0; 5 / 0 → a handled message. Repeat after every refactor.",
      "Uitgangstests: 2 + 3 → 5; 7 - 10 → -3; -2 × 4 → -8; 9 / 2 → 4.5; 0 × 5 → 0; 5 / 0 → een afgehandeld bericht. Herhaal na elke refactor.",
    ),
    L(
      "Try invalid input, an empty line, cancellation after one operand, end-input and another successful calculation afterward.",
      "Probeer ongeldige invoer, een lege regel, annuleren na één getal, einde invoer en daarna nog een geslaagde berekening.",
    ),
    L(
      "Save two calculations, close the activity, reopen it and load them. Try an empty history, a missing file and deliberately malformed data in a copy.",
      "Bewaar twee berekeningen, sluit de activiteit, heropen en laad ze. Probeer lege geschiedenis, een ontbrekend bestand en bewust ongeldige gegevens in een kopie.",
    ),
  ],
  references: [
    lessonId(4, 5),
    lessonId(6, 3),
    lessonId(9, 6),
    lessonId(10, 6),
    lessonId(11, 5),
    lessonId(12, 6),
    lessonId(14, 6),
  ],
};
export const calculatorFirst = {
  ...project(
    "python-v3-calculator-first",
    2,
    35,
    [
      "Calculator: first useful version",
      "Rekenmachine: eerste bruikbare versie",
    ],
    [
      "Build your first calculator from a small brief: ask for two numbers and an operation, then show the result. Support +, -, * and /. Use a decision to handle a zero divisor. For this first version, assume the number inputs are valid numeric text. You have learned everything required; loops, functions and exception handling come later. Keep this code: the calculator upgrade after module 14 opens these same files. Use the readiness lessons below if you need a refresher, and mark the stage complete when you are satisfied.",
      "Bouw je eerste rekenmachine uit een korte beschrijving: vraag twee getallen en een bewerking en toon het resultaat. Ondersteun +, -, * en /. Gebruik een beslissing voor een nuldeler. Neem voor deze eerste versie aan dat de getalinvoer geldige numerieke tekst is. Je hebt alles geleerd wat nodig is; lussen, functies en uitzonderingen komen later. Bewaar deze code: de uitbreiding na module 14 opent dezelfde bestanden. Gebruik de herhaallessen hieronder als opfrisser en rond de stap af wanneer je tevreden bent.",
    ],
    calculatorFiles,
  ),
  kind: "project-stage",
  projectId: calculator.id,
  continueFrom: "python-v2-calculator-project",
  milestones: [
    milestone(
      "calculator-first-input",
      ["Read two numbers", "Lees twee getallen"],
      [
        "Choose clear prompts and convert the entered text into numbers. Make addition work first.",
        "Kies duidelijke invoervragen en zet ingevoerde tekst om naar getallen. Laat eerst optellen werken.",
      ],
      [
        [
          "Write an example interaction before coding.",
          "Schrijf een voorbeeldinteractie vóór coderen.",
        ],
        [
          "Use float for decimal operands.",
          "Gebruik float voor decimale getallen.",
        ],
        [
          'A small start is left = float(input("First number: ")).',
          'Een klein begin is left = float(input("First number: ")).',
        ],
      ],
    ),
    milestone(
      "calculator-first-choice",
      ["Choose an operation", "Kies een bewerking"],
      [
        "Use decisions to support addition, subtraction, multiplication and division. Give unknown operations a clear response.",
        "Gebruik beslissingen voor optellen, aftrekken, vermenigvuldigen en delen. Geef een duidelijk antwoord bij onbekende bewerkingen.",
      ],
      [
        [
          "Only one operation should run.",
          "Er moet maar één bewerking worden uitgevoerd.",
        ],
        [
          "Use an if/elif chain and a final else.",
          "Gebruik een if/elif-keten en een laatste else.",
        ],
        [
          'Compare the operator text with symbols such as "+".',
          'Vergelijk de bewerkingstekst met symbolen zoals "+".',
        ],
      ],
    ),
    milestone(
      "calculator-first-zero",
      ["Handle a zero divisor", "Handel een nuldeler af"],
      [
        "Before division, check whether the second number is zero. Explain the problem instead of dividing.",
        "Controleer vóór delen of het tweede getal nul is. Leg het probleem uit in plaats van te delen.",
      ],
      [
        [
          "Zero is valid for some operations but not as a divisor.",
          "Nul is bij sommige bewerkingen geldig maar niet als deler.",
        ],
        [
          "Put the zero decision inside the division choice.",
          "Zet de nulbeslissing binnen de deelkeuze.",
        ],
        [
          "if right == 0: is a useful first line for that decision.",
          "if right == 0: is een bruikbare eerste regel voor die beslissing.",
        ],
      ],
    ),
  ],
  suggestedTests: calculator.suggestedTests.slice(0, 1),
  references: [lessonId(1, 5), lessonId(2, 2), lessonId(2, 5)],
};
export const pong = {
  ...project(
    "python-v3-pong-project",
    16,
    150,
    ["Pong: finish your game", "Pong: maak je spel af"],
    [
      "Reopen your earlier Pong and turn rallies into a complete match. Your saved files are shared with the first visit. Preserve a playable version while adding scoring, serving, winning, restarting, reliable collisions and one personal enhancement. Classes and saved settings/results are available design choices, not a prescribed architecture. You decide how to organise the program and when it is finished. Use your playtest table from module 16 and explain one design decision in a comment or notes file.",
      "Open je eerdere Pong opnieuw en maak van rally’s een volledige wedstrijd. Je opgeslagen bestanden worden met het eerste bezoek gedeeld. Behoud een speelbare versie terwijl je score, serveren, winnen, herstarten, betrouwbare botsingen en één persoonlijke uitbreiding toevoegt. Klassen en opgeslagen instellingen/resultaten zijn beschikbare ontwerpkeuzes, geen verplichte architectuur. Jij bepaalt de programmaorganisatie en wanneer het af is. Gebruik je speltesttabel uit module 16 en verklaar één ontwerpkeuze in commentaar of een notitiebestand.",
    ],
    pongFiles,
  ),
  runtime: "pygame",
  continueFrom: "python-v2-pong-project",
  milestones: [
    milestone(
      "pong-upgrade-match",
      ["A complete match", "Een volledige wedstrijd"],
      [
        "Add one point per miss, a serve phase, a winning target and a deliberate restart. Keep the current result visible.",
        "Voeg één punt per misser, een serveerfase, een winstdoel en een bewuste herstart toe. Houd het huidige resultaat zichtbaar.",
      ],
      [
        [
          "Draw the phase transitions before changing the loop.",
          "Teken de faseovergangen vóór je de lus wijzigt.",
        ],
        [
          "Scoring must leave the playing phase.",
          "Scoren moet de speelfase verlaten.",
        ],
        [
          "Test a target of 1 to reach the winning state quickly.",
          "Test een doel van 1 om snel de winsttoestand te bereiken.",
        ],
      ],
    ),
    milestone(
      "pong-upgrade-contact",
      ["Reliable control and contact", "Betrouwbare besturing en contact"],
      [
        "Support simultaneous controls, keep paddles inside the court, correct overlap and check approach direction before reflecting. Playtest both sides and several frame timings.",
        "Ondersteun gelijktijdige besturing, houd batjes binnen het veld, corrigeer overlap en controleer naderingsrichting vóór terugkaatsen. Test beide kanten en verschillende beeldtijden.",
      ],
      [
        [
          "Test position and direction together at contact.",
          "Test positie en richting samen bij contact.",
        ],
        [
          "Separate the ball just beyond the contacted edge.",
          "Zet de bal net voorbij de geraakte rand.",
        ],
        [
          "If you raise speed, consider smaller physics steps to avoid skipping a paddle.",
          "Overweeg bij hogere snelheid kleinere simulatiestappen om overslaan van een batje te voorkomen.",
        ],
      ],
    ),
    milestone(
      "pong-upgrade-design",
      ["Make the structure explainable", "Maak de structuur uitlegbaar"],
      [
        "Separate drawing, controls and rules where useful. Choose functions, modules and/or small classes based on the responsibilities you can name. Preserve independent object state if using classes.",
        "Scheid tekenen, besturing en regels waar nuttig. Kies functies, modules en/of kleine klassen op basis van benoembare verantwoordelijkheden. Behoud onafhankelijke objecttoestand bij klassen.",
      ],
      [
        [
          "Look for repeated groups of state and behaviour.",
          "Zoek herhaalde groepen toestand en gedrag.",
        ],
        [
          "Refactor one responsibility at a time and replay baseline tests.",
          "Refactor één verantwoordelijkheid tegelijk en herhaal uitgangstests.",
        ],
        [
          "A paddle object can own position and movement without owning the entire match.",
          "Een batjesobject kan positie en beweging beheren zonder de hele wedstrijd te beheren.",
        ],
      ],
    ),
    milestone(
      "pong-upgrade-personal",
      ["Make it yours", "Maak het van jou"],
      [
        "Add one personal feature: a pause menu, configurable target, saved results, a visual theme or another idea you can test. Explain its controls and test its interaction with restart.",
        "Voeg één persoonlijke functie toe: pauzemenu, instelbaar doel, opgeslagen resultaten, een visueel thema of een ander testbaar idee. Leg de bediening uit en test de samenhang met herstart.",
      ],
      [
        [
          "Keep the feature small enough to complete and explain.",
          "Houd de functie klein genoeg om af te maken en uit te leggen.",
        ],
        [
          "Define a normal case and a boundary case before implementation.",
          "Definieer een gewoon geval en een grensgeval vóór implementatie.",
        ],
        [
          "For saved settings, validate loaded values before applying them to the game.",
          "Valideer bij opgeslagen instellingen de geladen waarden vóór toepassen in het spel.",
        ],
      ],
    ),
  ],
  suggestedTests: [
    L(
      "Hold W and Down together; then press opposite controls for one paddle. Check both edges and focus loss/return.",
      "Houd W en Omlaag samen ingedrukt; druk daarna tegengestelde besturing voor één batje. Controleer beide randen en focusverlies/terugkeer.",
    ),
    L(
      "Bounce from both walls and both paddles, including edge overlaps and an already retreating ball. A bounce must not flicker back and forth.",
      "Bots tegen beide muren en batjes, inclusief randoverlap en een al teruggaande bal. Een botsing mag niet heen en weer flikkeren.",
    ),
    L(
      "Miss on each side, wait before serving, reach a winning target, and restart. Each miss counts once; restart clears the intended state.",
      "Mis aan beide kanten, wacht vóór serveren, bereik een winstdoel en herstart. Elke misser telt één keer; herstart wist de bedoelde toestand.",
    ),
    L(
      "Finish normally, Stop during play, then Run again. If using saved data, reopen its file after navigation and reload.",
      "Rond normaal af, gebruik Stop tijdens spelen en voer opnieuw uit. Gebruik je opgeslagen gegevens, heropen het bestand na navigatie en herladen.",
    ),
  ],
  references: [
    lessonId(8, 5),
    lessonId(14, 6),
    lessonId(15, 6),
    lessonId(16, 2),
    lessonId(16, 3),
    lessonId(16, 5),
  ],
};
export const pongFirst = {
  ...project(
    "python-v3-pong-first",
    8,
    75,
    ["Pong: first playable version", "Pong: eerste speelbare versie"],
    [
      "Build your first two-player rally. The supplied main.py opens the browser game, handles W/S and Up/Down, clamps the paddles and draws the court. You own game.py: combine motion, wall responses, paddle contact and a reset after a miss. Reuse and adapt your earlier helper code. You may also customise the scene or controls. Scoring, menus, classes and saved data come later. Keep the async browser entry point intact and keep your files: the final Pong visit opens this same workspace.",
      "Bouw je eerste rally voor twee spelers. De meegeleverde main.py opent het browserspel, behandelt W/S en Omhoog/Omlaag, begrenst batjes en tekent het veld. Jij beheert game.py: combineer beweging, muurreacties, batjescontact en herstart na een misser. Hergebruik en pas je eerdere helpers aan. Je mag ook de scène of besturing aanpassen. Score, menu’s, klassen en opgeslagen gegevens komen later. Behoud het async-browserstartpunt en je bestanden: het laatste Pong-bezoek opent dezelfde werkruimte.",
    ],
    pongFiles,
  ),
  kind: "project-stage",
  projectId: pong.id,
  runtime: "pygame",
  continueFrom: "python-v2-pong-project",
  milestones: [
    milestone(
      "pong-first-controls",
      ["Own the court and controls", "Beheer veld en besturing"],
      [
        "Run the supplied entry point, try both paddles simultaneously and explain how their coordinates change. Make one deliberate visual or control adjustment.",
        "Voer het meegeleverde startpunt uit, probeer beide batjes tegelijk en verklaar hoe coördinaten veranderen. Maak één bewuste visuele of besturingsaanpassing.",
      ],
      [
        [
          "Separate the part you own from stable browser setup.",
          "Onderscheid jouw deel van de vaste browseropzet.",
        ],
        [
          "The supplied drawing uses the same Rect and coordinate ideas as module 7.",
          "Het meegeleverde tekenen gebruikt dezelfde Rect- en coördinatenideeën als module 7.",
        ],
        [
          "Try a different paddle colour or speed and test the effect.",
          "Probeer een andere batjeskleur of snelheid en test het effect.",
        ],
      ],
    ),
    milestone(
      "pong-first-rally",
      ["Make a rally work", "Laat een rally werken"],
      [
        "Implement game.step to move the ball using dt, bounce from top/bottom and respond to both paddles. Keep the returned tuple in the supplied order.",
        "Implementeer game.step om de bal met dt te bewegen, boven/onder terug te kaatsen en op beide batjes te reageren. Houd de teruggegeven tuple in de meegeleverde volgorde.",
      ],
      [
        [
          "Assemble one tested behaviour at a time.",
          "Stel één getest gedrag tegelijk samen.",
        ],
        [
          "Use Pygame’s colliderect and check the approach direction.",
          "Gebruik Pygames colliderect en controleer naderingsrichting.",
        ],
        [
          "Start with x += vx * dt and y += vy * dt.",
          "Begin met x += vx * dt en y += vy * dt.",
        ],
      ],
    ),
    milestone(
      "pong-first-reset",
      ["Recover after a miss", "Herstel na een misser"],
      [
        "Reset a fully missed ball to a playable starting position. Play a rally on each side and decide whether your first version feels ready.",
        "Zet een volledig gemiste bal terug op een speelbare beginpositie. Speel een rally aan elke kant en bepaal of je eerste versie klaar voelt.",
      ],
      [
        [
          "A centre slightly outside the court can still leave part of the ball visible.",
          "Een middelpunt iets buiten het veld kan nog een deel van de bal zichtbaar laten.",
        ],
        [
          "Include the radius in the miss test.",
          "Neem de straal mee in de missertest.",
        ],
        [
          "The earlier rally lesson uses x < -6 or x > 646 for this court.",
          "De eerdere rallyles gebruikt x < -6 of x > 646 voor dit veld.",
        ],
      ],
    ),
  ],
  suggestedTests: pong.suggestedTests
    .slice(0, 2)
    .concat([
      L(
        "Miss on each side and confirm another rally can begin. Stop, Run again, and verify both controls still respond.",
        "Mis aan elke kant en bevestig dat een nieuwe rally kan beginnen. Stop, voer opnieuw uit en controleer dat beide besturingen reageren.",
      ),
    ]),
  references: [lessonId(5, 5), lessonId(6, 5), lessonId(7, 4), lessonId(8, 5)],
};
// Same optional task and self-assessment contract: keep its saved identity.
export const aiExtension = {
  ...previousExtension,
  chapter: 16,
  continueFrom: pong.id,
  references: [lessonId(8, 2), lessonId(16, 3), lessonId(16, 5)],
};
