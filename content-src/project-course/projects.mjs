import { L } from "./authoring.mjs";

export const calculatorProject = {
  id: "python-v2-calculator-project",
  chapter: 5,
  group: "python-v2-calculator-project",
  kind: "project",
  optional: false,
  runtime: "terminal",
  guidance: "independent",
  estimatedMinutes: 120,
  title: L("Project: your own calculator", "Project: jouw eigen rekenmachine"),
  explanation: L(
    "Build a calculator you would be comfortable handing to someone else. Start with the empty file and choose your own structure, prompts, and presentation. The milestones below are suggestions for organising your work, not a checklist that the website will grade. Run the program, try to break it, and decide when you are satisfied. You can mark this project complete at any time.",
    "Bouw een rekenmachine die je met vertrouwen aan iemand anders zou geven. Begin met het lege bestand en kies zelf de structuur, invoervragen en presentatie. De mijlpalen hieronder zijn suggesties om je werk te organiseren, geen lijst die de website beoordeelt. Voer het programma uit, probeer het te laten misgaan en bepaal wanneer je tevreden bent. Je kunt dit project op elk moment als afgerond markeren.",
  ),
  example: "",
  sections: [],
  files: { "main.py": "# Build your calculator here.\n" },
  solution: {},
  checkpoints: [],
  solutionNote: L(
    "There is no single project solution. Your own design and tests decide what is finished.",
    "Er is niet één projectoplossing. Je eigen ontwerp en tests bepalen wat af is.",
  ),
  milestones: [
    {
      id: "one-calculation",
      title: L("Make one calculation work", "Laat één berekening werken"),
      description: L(
        "Choose how someone enters two numbers and an operation. Start with one useful operation and show its result.",
        "Kies hoe iemand twee getallen en een bewerking invoert. Begin met één nuttige bewerking en toon het resultaat.",
      ),
      hints: [
        L(
          "Sketch an example conversation in the terminal before writing Python.",
          "Schets een voorbeeldgesprek in de terminal voordat je Python schrijft.",
        ),
        L(
          "Separate the text you ask for from the numbers you need for arithmetic.",
          "Maak onderscheid tussen de tekst die je vraagt en de getallen die je voor de berekening nodig hebt.",
        ),
        L(
          "The input and conversion lessons show how text becomes a number.",
          "De lessen over invoer en conversie laten zien hoe tekst een getal wordt.",
        ),
      ],
    },
    {
      id: "operations",
      title: L("Give the user a choice", "Geef de gebruiker een keuze"),
      description: L(
        "Consider supporting addition, subtraction, multiplication, and division. Try decimals and negative numbers too. Choose whether functions would make your program clearer.",
        "Overweeg optellen, aftrekken, vermenigvuldigen en delen te ondersteunen. Probeer ook kommagetallen en negatieve getallen. Bepaal of functies je programma overzichtelijker maken.",
      ),
      hints: [
        L(
          "Which parts change between operations, and which parts stay the same?",
          "Welke onderdelen veranderen per bewerking en welke blijven hetzelfde?",
        ),
        L(
          "Keep the user interaction separate from arithmetic where that helps you test it.",
          "Houd gebruikersinteractie apart van berekeningen waar dat het testen helpt.",
        ),
        L(
          "Revisit the functions module for examples of returning a calculated value.",
          "Kijk in de functiemodule naar voorbeelden van het teruggeven van een berekende waarde.",
        ),
      ],
    },
    {
      id: "another-turn",
      title: L(
        "Let someone keep using it",
        "Laat iemand het blijven gebruiken",
      ),
      description: L(
        "Make it convenient to perform several calculations and leave the program deliberately. Decide what should happen when a person changes their mind halfway through.",
        "Maak het eenvoudig om meerdere berekeningen uit te voeren en het programma bewust af te sluiten. Bepaal wat er moet gebeuren als iemand halverwege van gedachten verandert.",
      ),
      hints: [
        L(
          "Identify which part of the interaction repeats.",
          "Bepaal welk deel van de interactie zich herhaalt.",
        ),
        L(
          "Give every repeating interaction a clear exit route.",
          "Geef elke herhalende interactie een duidelijke uitweg.",
        ),
        L(
          "The repetition module covers a continuing session and a stop command.",
          "De herhalingsmodule behandelt een doorlopende sessie en een stopcommando.",
        ),
      ],
    },
    {
      id: "unexpected",
      title: L("Handle surprises", "Ga om met verrassingen"),
      description: L(
        "Try letters where numbers are expected, an unknown operation, an empty line, and division by zero. Decide how the calculator should respond and whether the user can recover.",
        "Probeer letters waar getallen worden verwacht, een onbekende bewerking, een lege regel en delen door nul. Bepaal hoe de rekenmachine moet reageren en of de gebruiker verder kan.",
      ),
      hints: [
        L(
          "An error message is useful only if the user knows what to do next.",
          "Een foutmelding is alleen nuttig als de gebruiker weet wat die daarna kan doen.",
        ),
        L(
          "Recover around the part that can fail, rather than hiding every error in the whole program.",
          "Herstel rond het onderdeel dat kan misgaan, in plaats van elke fout in het hele programma te verbergen.",
        ),
        L(
          "Review the exception examples for conversion errors and the condition examples for invalid choices.",
          "Bekijk de exception-voorbeelden voor conversiefouten en de conditievoorbeelden voor ongeldige keuzes.",
        ),
      ],
    },
    {
      id: "own-it",
      title: L("Test it and make it yours", "Test het en maak het van jezelf"),
      description: L(
        "Ask someone to try it without instructions from you. Improve what confused them. Calculation history or another operation could be a useful extension, but neither is required.",
        "Laat iemand het proberen zonder jouw mondelinge uitleg. Verbeter wat verwarrend bleek. Een berekeningsgeschiedenis of een extra bewerking kan een nuttige uitbreiding zijn, maar geen van beide is verplicht.",
      ),
      hints: [
        L(
          "Test sequences of actions, not just one correct answer.",
          "Test reeksen handelingen, niet alleen één goed antwoord.",
        ),
        L(
          "Repeat a calculation after an error and check that old values do not leak into it.",
          "Herhaal een berekening na een fout en controleer of oude waarden niet onbedoeld worden hergebruikt.",
        ),
        L(
          "Write down the inputs you tried and what you expected before running them.",
          "Schrijf de invoer die je probeert en de verwachte uitkomst op voordat je die uitvoert.",
        ),
      ],
    },
  ],
  suggestedTests: [
    L(
      "Try 8 + 5, 3 - 9, -2 × 4, and 7 ÷ 2.",
      "Probeer 8 + 5, 3 - 9, -2 × 4 en 7 ÷ 2.",
    ),
    L(
      "Try an exact zero result, decimal inputs, and division by zero.",
      "Probeer een uitkomst van precies nul, kommagetallen en delen door nul.",
    ),
    L(
      "Enter an empty line, letters, and an unknown operation; then try a valid calculation.",
      "Voer een lege regel, letters en een onbekende bewerking in; probeer daarna een geldige berekening.",
    ),
    L(
      "Perform several calculations, then quit. Try ending input with Ctrl+D.",
      "Voer meerdere berekeningen uit en sluit dan af. Probeer de invoer te beëindigen met Ctrl+D.",
    ),
  ],
  references: [
    "python-v2-2-02",
    "python-v2-3-04",
    "python-v2-4-05",
    "python-v2-5-05",
  ],
};

export const pongProject = {
  id: "python-v2-pong-project",
  chapter: 10,
  group: "python-v2-pong-project",
  kind: "project",
  optional: false,
  runtime: "pygame",
  guidance: "independent",
  estimatedMinutes: 240,
  title: L("Project: your own Pong", "Project: jouw eigen Pong"),
  explanation: L(
    "Create your own version of two-player Pong. You decide how to organise the code and how the game looks and feels. The starter contains only the browser-compatible entry point; the playing field, controls, movement, and rules are yours to build. These milestones and test ideas are optional. The website does not grade your project or demand a particular implementation.",
    "Maak je eigen versie van Pong voor twee spelers. Je bepaalt zelf hoe de code is georganiseerd en hoe het spel eruitziet en aanvoelt. De startcode bevat alleen het browsergeschikte startpunt; het speelveld, de besturing, beweging en regels bouw je zelf. Deze mijlpalen en testideeën zijn optioneel. De website beoordeelt je project niet en verlangt geen specifieke implementatie.",
  ),
  example: "",
  sections: [],
  files: {
    "main.py":
      "import asyncio\nimport pygame\n\nasync def main():\n    pygame.init()\n    # Create your game here.\n    # Give the browser a turn inside your game loop:\n    # await asyncio.sleep(1 / 60)\n    pygame.quit()\n\nasyncio.run(main())\n",
  },
  solution: {},
  checkpoints: [],
  solutionNote: L(
    "The browser entry point is provided, but there is no prescribed game structure or project checker.",
    "Het browserstartpunt is gegeven, maar er is geen voorgeschreven spelstructuur of projectcontrole.",
  ),
  milestones: [
    {
      id: "court",
      title: L("Create your playing field", "Maak je speelveld"),
      description: L(
        "Choose a window size and draw two paddles and a ball. Make them easy to distinguish from the background.",
        "Kies een venstergrootte en teken twee paddles en een bal. Zorg dat ze goed van de achtergrond te onderscheiden zijn.",
      ),
      hints: [
        L(
          "Sketch where the objects belong before assigning coordinates.",
          "Schets waar de objecten horen voordat je coördinaten kiest.",
        ),
        L(
          "A frame usually clears the previous image before drawing the current one.",
          "Een frame wist meestal het vorige beeld voordat het huidige wordt getekend.",
        ),
        L(
          "The drawing lessons introduce display.set_mode(), Surface.fill(), and pygame.draw.",
          "De tekenlessen introduceren display.set_mode(), Surface.fill() en pygame.draw.",
        ),
      ],
    },
    {
      id: "controls",
      title: L("Give both players control", "Geef beide spelers controle"),
      description: L(
        "Use W/S for one paddle and the arrow keys for the other, or document your own keys. Keep the paddles inside the court and try both players moving together.",
        "Gebruik W/S voor de ene paddle en de pijltjestoetsen voor de andere, of documenteer je eigen toetsen. Houd de paddles binnen het speelveld en probeer beide spelers tegelijk te laten bewegen.",
      ),
      hints: [
        L(
          "Holding a key is different from pressing it once.",
          "Een toets ingedrukt houden is iets anders dan die eenmaal indrukken.",
        ),
        L(
          "Movement should depend on elapsed time, not the speed of the computer.",
          "Beweging moet afhangen van verstreken tijd, niet van de snelheid van de computer.",
        ),
        L(
          "The movement lessons compare input events with pygame.key.get_pressed().",
          "De bewegingslessen vergelijken invoerevents met pygame.key.get_pressed().",
        ),
      ],
    },
    {
      id: "rally",
      title: L("Make a rally possible", "Maak een rally mogelijk"),
      description: L(
        "Move the ball and make it respond to the top and bottom walls and the paddles. Test contacts near paddle edges and watch for a ball getting stuck or bouncing repeatedly.",
        "Beweeg de bal en laat die reageren op de boven- en onderrand en de paddles. Test contact bij de randen van een paddle en let op een bal die vast komt te zitten of herhaaldelijk terugkaatst.",
      ),
      hints: [
        L(
          "Think about position and direction separately.",
          "Denk apart na over positie en richting.",
        ),
        L(
          "After a collision, the ball should be travelling away from the object it hit.",
          "Na een botsing moet de bal van het geraakte object af bewegen.",
        ),
        L(
          "Revisit rectangle collision tests and direction checks in the game-rules module.",
          "Bekijk de rechthoekige botsingstests en richtingcontroles in de module met spelregels.",
        ),
      ],
    },
    {
      id: "rounds",
      title: L("Turn rallies into a match", "Maak van rally’s een wedstrijd"),
      description: L(
        "Choose how to award points, serve again, and finish or restart a match. Make the score understandable to both players.",
        "Kies hoe je punten toekent, opnieuw serveert en een wedstrijd beëindigt of herstart. Maak de score voor beide spelers begrijpelijk.",
      ),
      hints: [
        L(
          "A missed ball is one event, even if it remains outside the court for several frames.",
          "Een gemiste bal is één gebeurtenis, ook als die meerdere frames buiten het speelveld blijft.",
        ),
        L(
          "Reset the round state without accidentally resetting the whole match.",
          "Reset de toestand van de ronde zonder per ongeluk de hele wedstrijd te resetten.",
        ),
        L(
          "The scoring lessons separate round resets from new-match resets.",
          "De scorelessen maken onderscheid tussen een nieuwe ronde en een nieuwe wedstrijd.",
        ),
      ],
    },
    {
      id: "playtest",
      title: L("Play it with someone", "Speel het met iemand"),
      description: L(
        "Try a real match. Look for unfair starts, stuck controls, difficult speeds, and confusing restarts. Change the design based on what you observe. A computer opponent is an optional next step.",
        "Probeer een echte wedstrijd. Let op oneerlijke starts, vastzittende besturing, onhandige snelheden en verwarrende herstarts. Pas het ontwerp aan op basis van wat je ziet. Een computertegenstander is een optionele volgende stap.",
      ),
      hints: [
        L(
          "Notice how the game behaves when attention moves away from the preview.",
          "Let op hoe het spel zich gedraagt wanneer de aandacht van de preview weggaat.",
        ),
        L(
          "Check the first serve, later serves, and the first frame after a restart.",
          "Controleer de eerste service, latere services en het eerste frame na een herstart.",
        ),
        L(
          "A short written test list makes it easier to repeat checks after changing a rule.",
          "Een korte geschreven testlijst maakt het makkelijker controles te herhalen na een regelwijziging.",
        ),
      ],
    },
  ],
  suggestedTests: [
    L(
      "Move both paddles simultaneously and hold each against both boundaries.",
      "Beweeg beide paddles tegelijk en houd ze elk tegen beide grenzen.",
    ),
    L(
      "Try wall bounces, paddle centres, paddle edges, and a ball moving away from a paddle.",
      "Probeer botsingen met muren, paddle-middens, paddle-randen en een bal die van een paddle af beweegt.",
    ),
    L(
      "Miss a ball on each side. Check that each miss awards only one point.",
      "Mis aan beide kanten een bal. Controleer of elke misser maar één punt oplevert.",
    ),
    L(
      "Play several rounds, restart, click outside the game, return, and try Stop followed by Run.",
      "Speel meerdere rondes, herstart, klik buiten het spel, keer terug en probeer Stop gevolgd door Uitvoeren.",
    ),
  ],
  references: [
    "python-v2-7-05",
    "python-v2-8-05",
    "python-v2-9-05",
    "python-v2-10-05",
  ],
};
