import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const history = lesson({
  module: 6,
  number: 1,
  title: L(
    "Keep the results of several rounds",
    "Bewaar de resultaten van meerdere rondes",
  ),
  guidance: "guided",
  minutes: 16,
  explanation: L(
    "A practice game currently keeps only one score. A list lets it retain the sequence of results, so the latest round does not erase earlier rounds. Add the new score, inspect the updated history, and calculate a short summary.",
    "Een oefenspel bewaart momenteel slechts één score. Met een lijst kan het de reeks resultaten bewaren, zodat de nieuwste ronde eerdere rondes niet wist. Voeg de nieuwe score toe, bekijk de bijgewerkte geschiedenis en bereken een kort overzicht.",
  ),
  sections: [
    section(
      L(
        "One name, several ordered values",
        "Eén naam, meerdere geordende waarden",
      ),
      L(
        "A list stores values in order between square brackets. Indexes start at zero: values[0] is the first item. values[-1] is the last. Accessing an index that does not exist raises IndexError. len(values) counts the items; sum(values) adds numeric items.",
        "Een lijst bewaart waarden op volgorde tussen vierkante haken. Indexen beginnen bij nul: values[0] is het eerste item. values[-1] is het laatste. Een index opvragen die niet bestaat veroorzaakt IndexError. len(values) telt de items; sum(values) telt numerieke items op.",
      ),
      "times = [12, 9, 11]\nprint(times[0], times[-1])\nprint(len(times), sum(times))",
      "12 11\n3 32",
    ),
    section(
      L(
        "Append changes the existing list",
        "append verandert de bestaande lijst",
      ),
      L(
        "values.append(item) adds one item at the end. It changes the list and returns None; do not assign its return value back to the list. Appending to an empty list is valid. After adding one round, the history is guaranteed to contain at least one score.",
        "values.append(item) voegt één item achteraan toe. De methode verandert de lijst en geeft None terug; ken die terugkeerwaarde niet aan de lijst toe. Aan een lege lijst toevoegen is geldig. Na één toegevoegde ronde bevat de geschiedenis gegarandeerd minstens één score.",
      ),
      "times = []\ntimes.append(14)\nprint(times)",
      "[14]",
    ),
  ],
  starter:
    'scores = [4, 7, 5]\nnew_score = 8\n\n# Keep the previous rounds and add this one.\nlatest = new_score\nrounds_played = 1\ntotal = new_score\nprint("Latest:", latest)\nprint("Rounds:", rounds_played)\nprint("Total:", total)\n',
  solution:
    'scores = [4, 7, 5]\nnew_score = 8\nscores.append(new_score)\nlatest = scores[-1]\nrounds_played = len(scores)\ntotal = sum(scores)\nprint("Latest:", latest)\nprint("Rounds:", rounds_played)\nprint("Total:", total)\n',
  tasks: [
    task(
      "",
      L(
        "Add new_score to the end of scores while preserving previous scores in order.",
        "Voeg new_score achteraan scores toe en behoud eerdere scores op volgorde.",
      ),
      "isinstance(scores, list) and len(scores) > 0 and scores[-1] == new_score",
      [
        L(
          "The new round should extend history rather than replace it.",
          "De nieuwe ronde moet de geschiedenis uitbreiden in plaats van vervangen.",
        ),
        L(
          "Use a list operation that adds at the end.",
          "Gebruik een lijstbewerking die achteraan toevoegt.",
        ),
        L(
          "times.append(14) changes times; its return value is not the updated list.",
          "times.append(14) verandert times; de terugkeerwaarde is niet de bijgewerkte lijst.",
        ),
      ],
      L(
        "Preserve earlier values and add exactly one new score.",
        "Behoud eerdere waarden en voeg precies één nieuwe score toe.",
      ),
      [
        {
          inputs: { scores: [2, 9], new_score: 3 },
          check: "_error is None and scores == [2, 9, 3]",
        },
        {
          inputs: { scores: [], new_score: 0 },
          check: "_error is None and scores == [0]",
        },
      ],
    ),
    task(
      "",
      L(
        "Read latest from the updated list, and calculate rounds_played from its length.",
        "Lees latest uit de bijgewerkte lijst en bereken rounds_played uit de lengte.",
      ),
      "latest == scores[-1] and rounds_played == len(scores)",
      [
        L(
          "A list knows both its final item and its current length.",
          "Een lijst bevat zowel zijn laatste item als zijn huidige lengte.",
        ),
        L(
          "Avoid an index that works only for today’s three existing rounds.",
          "Vermijd een index die alleen bij de drie bestaande rondes van vandaag werkt.",
        ),
        L(
          "values[-1] accesses the last item regardless of how many came before it.",
          "values[-1] benadert het laatste item ongeacht hoeveel ervoor staan.",
        ),
      ],
      L(
        "The latest value and round count should follow the actual history.",
        "De nieuwste waarde en het aantal rondes moeten de echte geschiedenis volgen.",
      ),
      [
        {
          inputs: { scores: [1, 2, 3, 4], new_score: 6 },
          check: "latest == 6 and rounds_played == 5",
        },
        {
          inputs: { scores: [], new_score: 7 },
          check: "latest == 7 and rounds_played == 1",
        },
      ],
    ),
    task(
      "",
      L(
        "Calculate total from all scores and keep the three summary values in the report.",
        "Bereken total uit alle scores en behoud de drie overzichtswaarden in het rapport.",
      ),
      "total == sum(scores) and str(total) in _stdout and str(latest) in _stdout and str(rounds_played) in _stdout",
      [
        L(
          "The newest result is only one contribution to the session total.",
          "Het nieuwste resultaat is slechts één bijdrage aan het sessietotaal.",
        ),
        L(
          "Use sum or a loop to combine the numeric items.",
          "Gebruik sum of een lus om de numerieke items te combineren.",
        ),
        L(
          "sum([2, 5]) is 7; an empty list sums to zero.",
          "sum([2, 5]) is 7; een lege lijst telt op tot nul.",
        ),
      ],
      L(
        "Include earlier rounds in the total, including zero-valued rounds.",
        "Neem eerdere rondes mee in het totaal, ook rondes met waarde nul.",
      ),
      [
        {
          inputs: { scores: [0, 10, 0], new_score: 2 },
          check:
            'total == 12 and rounds_played == 4 and "12" in _stdout and "4" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Appending, concatenating with a one-item list, or another equivalent update can preserve the same history. The tests check the result, not one required method call.",
    "Toevoegen met append, samenvoegen met een lijst van één item of een andere gelijkwaardige wijziging kan dezelfde geschiedenis behouden. De controles kijken naar het resultaat, niet naar één verplichte methodeaanroep.",
  ),
});

const positions = lesson({
  module: 6,
  number: 2,
  title: L("Keep coordinates together", "Houd coördinaten bij elkaar"),
  guidance: "guided",
  minutes: 16,
  explanation: L(
    "A position has two related values: x and y. Passing them together makes a movement function easier to use. Build translated(position, offset), which returns a new coordinate pair without changing the pair supplied by its caller.",
    "Een positie heeft twee samenhangende waarden: x en y. Ze samen doorgeven maakt een bewegingsfunctie gemakkelijker te gebruiken. Bouw translated(position, offset), die een nieuw coördinatenpaar teruggeeft zonder het paar van de aanroeper te veranderen.",
  ),
  sections: [
    section(
      L("A fixed group of values", "Een vaste groep waarden"),
      L(
        "A tuple groups values, usually with parentheses: (x, y). Unlike a list, you cannot replace individual tuple items. Unpacking assigns one value to each name: x, y = position. The number of names must match the number of items. Lists can also be unpacked.",
        "Een tuple groepeert waarden, meestal met haakjes: (x, y). Anders dan bij een lijst kun je individuele tuple-items niet vervangen. Uitpakken kent aan elke naam een waarde toe: x, y = position. Het aantal namen moet overeenkomen met het aantal items. Lijsten kunnen ook worden uitgepakt.",
      ),
      "size = (640, 400)\nwidth, height = size\nprint(width, height)",
      "640 400",
    ),
    section(
      L("Translate each axis independently", "Verplaats elke as onafhankelijk"),
      L(
        "An offset describes how much each coordinate changes. Positive x moves right and negative x moves left in the game’s coordinate system. Positive y moves down and negative y moves up. translated should accept any two-item coordinate pair and return a tuple (new_x, new_y).",
        "Een verschuiving beschrijft hoeveel elke coördinaat verandert. Positieve x beweegt naar rechts en negatieve x naar links in het coördinatenstelsel van het spel. Positieve y beweegt naar beneden en negatieve y naar boven. translated moet elk coördinatenpaar met twee items accepteren en een tuple (new_x, new_y) teruggeven.",
      ),
    ),
  ],
  starter:
    'def translated(position, offset):\n    x, y = position\n    dx, dy = offset\n    return (x, y)\n\nstart = (100, 160)\nshift = (12, -8)\nend = translated(start, shift)\nprint("Start:", start)\nprint("End:", end)\n',
  solution:
    'def translated(position, offset):\n    x, y = position\n    dx, dy = offset\n    return (x + dx, y + dy)\n\nstart = (100, 160)\nshift = (12, -8)\nend = translated(start, shift)\nprint("Start:", start)\nprint("End:", end)\n',
  tasks: [
    task(
      "",
      L(
        "Apply each offset to its matching coordinate and return the new pair as a tuple.",
        "Pas elke verschuiving toe op de bijbehorende coördinaat en geef het nieuwe paar als tuple terug.",
      ),
      "callable(translated) and isinstance(end, tuple) and end == (start[0] + shift[0], start[1] + shift[1])",
      [
        L(
          "The horizontal and vertical values have separate roles.",
          "De horizontale en verticale waarden hebben aparte rollen.",
        ),
        L(
          "Use the unpacked values to construct a new pair.",
          "Gebruik de uitgepakte waarden om een nieuw paar te maken.",
        ),
        L(
          "A position of (2, 7) shifted by (3, 0) becomes (5, 7).",
          "Een positie (2, 7) verschoven met (3, 0) wordt (5, 7).",
        ),
      ],
      L(
        "Do not mix the axes or return the unchanged position.",
        "Verwissel de assen niet en geef niet de ongewijzigde positie terug.",
      ),
      [
        {
          call: {
            name: "translated",
            args: [
              [2, 7],
              [3, -4],
            ],
          },
          check:
            "_error is None and isinstance(_return, tuple) and _return == (5, 3)",
        },
      ],
    ),
    task(
      "",
      L(
        "Handle zero, negative, and fractional offsets. Keep the function usable for positions other than start.",
        "Handel nul, negatieve en gebroken verschuivingen af. Houd de functie bruikbaar voor andere posities dan start.",
      ),
      "callable(translated)",
      [
        L(
          "The parameters are the source of truth for each call.",
          "De parameters zijn voor elke aanroep de bron van de waarden.",
        ),
        L(
          "Arithmetic works with fractional coordinates too; avoid unnecessary integer conversion.",
          "Rekenen werkt ook met gebroken coördinaten; vermijd onnodige integerconversie.",
        ),
        L(
          "An offset of (0, 0) should preserve both coordinate values.",
          "Een verschuiving van (0, 0) moet beide coördinaatwaarden behouden.",
        ),
      ],
      L(
        "Respect the supplied values without rounding or global dependencies.",
        "Respecteer de meegegeven waarden zonder afronding of afhankelijkheid van globale waarden.",
      ),
      [
        {
          call: {
            name: "translated",
            args: [
              [-2, 5],
              [0, 0],
            ],
          },
          check: "_return == (-2, 5)",
        },
        {
          call: {
            name: "translated",
            args: [
              [1.25, 2.5],
              [-0.5, 0.75],
            ],
          },
          check: "_return == (0.75, 3.25)",
        },
      ],
    ),
    task(
      "",
      L(
        "Leave the caller’s position and offset unchanged. Keep the start/end report so you can compare the two.",
        "Laat de positie en verschuiving van de aanroeper ongewijzigd. Behoud het begin-/eindoverzicht zodat je beide kunt vergelijken.",
      ),
      "str(start) in _stdout and str(end) in _stdout and callable(translated)",
      [
        L(
          "Calculating a new position need not overwrite the original.",
          "Een nieuwe positie berekenen hoeft het origineel niet te overschrijven.",
        ),
        L(
          "Return newly grouped values instead of assigning into the supplied pair.",
          "Geef nieuw gegroepeerde waarden terug in plaats van in het meegegeven paar toe te kennen.",
        ),
        L(
          "return (a, b) constructs a pair for the caller.",
          "return (a, b) maakt een paar voor de aanroeper.",
        ),
      ],
      L(
        "The function should also preserve mutable pairs supplied as lists.",
        "De functie moet ook veranderlijke paren behouden die als lijsten worden meegegeven.",
      ),
      [
        {
          call: {
            name: "translated",
            args: [
              [10, 20],
              [2, 3],
            ],
          },
          check:
            "_error is None and _return == (12, 23) and _args == [[10, 20], [2, 3]]",
        },
      ],
    ),
  ],
  solutionNote: L(
    "Indexing the pairs is also valid, though unpacking often makes the axis names clearer. Returning a fresh tuple lets callers retain the previous position when they need it.",
    "De paren indexeren is ook geldig, hoewel uitpakken de asnamen vaak duidelijker maakt. Een nieuwe tuple teruggeven laat aanroepers de vorige positie behouden wanneer dat nodig is.",
  ),
});

const namedState = lesson({
  module: 6,
  number: 3,
  title: L(
    "Give match values meaningful names",
    "Geef wedstrijdwaarden betekenisvolle namen",
  ),
  guidance: "adapt",
  minutes: 18,
  explanation: L(
    "A match needs two scores and a winning target. A dictionary groups related values under names, so you can update one without losing the others. Repair award_point(state, side), which should update the supplied match and return its winner or None.",
    "Een wedstrijd heeft twee scores en een winnend doel nodig. Een dictionary groepeert samenhangende waarden onder namen, zodat je er één kunt aanpassen zonder de andere te verliezen. Herstel award_point(state, side), die de meegegeven wedstrijd moet bijwerken en de winnaar of None moet teruggeven.",
  ),
  sections: [
    section(
      L("Look up a value by key", "Zoek een waarde op via een sleutel"),
      L(
        'A dictionary uses key/value pairs: {"name": "Sam", "score": 0}. state["score"] reads a value; assigning to that key updates it. A missing key raises KeyError. state.get("score", 0) supplies a default without inserting the key. Use required keys directly when missing data should be treated as a bug.',
        'Een dictionary gebruikt sleutel-/waardeparen: {"name": "Sam", "score": 0}. state["score"] leest een waarde; toekennen aan die sleutel werkt deze bij. Een ontbrekende sleutel veroorzaakt KeyError. state.get("score", 0) levert een standaardwaarde zonder de sleutel toe te voegen. Gebruik verplichte sleutels direct wanneer ontbrekende gegevens als fout moeten worden behandeld.',
      ),
      'player = {"name": "Sam", "score": 0}\nplayer["score"] += 1\nprint(player["name"], player["score"])',
      "Sam 1",
    ),
    section(
      L("A deliberate update", "Een bewuste wijziging"),
      L(
        'The contract requires keys left, right, and target, with nonnegative scores and a positive target. side must be "left" or "right"; reject other names with ValueError before changing state. Add one to the requested side only. Return that side when its updated score reaches or exceeds target; otherwise return None. Call this only while a match is in progress.',
        'De afspraken vereisen sleutels left, right en target, met niet-negatieve scores en een positief doel. side moet "left" of "right" zijn; wijs andere namen met ValueError af voordat state verandert. Tel alleen bij de gevraagde kant één op. Geef die kant terug wanneer de bijgewerkte score target bereikt of overschrijdt; geef anders None terug. Roep dit alleen aan terwijl een wedstrijd bezig is.',
      ),
    ),
  ],
  starter:
    'def award_point(state, side):\n    state["left"] = 1\n    return None\n\nmatch = {"left": 2, "right": 1, "target": 3}\nwinner = award_point(match, "left")\nprint(match)\nprint("Winner:", winner)\n',
  solution:
    'def award_point(state, side):\n    if side != "left" and side != "right":\n        raise ValueError("Unknown side")\n    state[side] += 1\n    if state[side] >= state["target"]:\n        return side\n    return None\n\nmatch = {"left": 2, "right": 1, "target": 3}\nwinner = award_point(match, "left")\nprint(match)\nprint("Winner:", winner)\n',
  tasks: [
    task(
      "",
      L(
        "Increase only the requested side’s score by one, preserving the other score, target, and any additional keys.",
        "Verhoog alleen de score van de gevraagde kant met één en behoud de andere score, target en eventuele extra sleutels.",
      ),
      'callable(award_point) and match["left"] == 3 and match["right"] == 1 and match["target"] == 3',
      [
        L(
          "Updating a score is different from replacing the entire dictionary.",
          "Een score bijwerken is iets anders dan de volledige dictionary vervangen.",
        ),
        L(
          "A variable can supply a dictionary key: state[side].",
          "Een variabele kan een dictionary-sleutel leveren: state[side].",
        ),
        L(
          'player["score"] += 1 keeps the other player fields.',
          'player["score"] += 1 behoudt de andere spelervelden.',
        ),
      ],
      L(
        "Change one score in the existing match, without discarding other state.",
        "Verander één score in de bestaande wedstrijd zonder andere toestand te wissen.",
      ),
      [
        {
          call: {
            name: "award_point",
            args: [
              { left: 1, right: 2, target: 5, label: "Friendly" },
              "right",
            ],
          },
          check:
            '_error is None and _args[0] == {"left": 1, "right": 3, "target": 5, "label": "Friendly"}',
        },
      ],
    ),
    task(
      "",
      L(
        "Return the side that reaches the target after the update, or None if the match continues.",
        "Geef de kant terug die na de wijziging het doel bereikt, of None als de wedstrijd doorgaat.",
      ),
      'winner == "left"',
      [
        L(
          "Check the updated score, not the score from before this point.",
          "Controleer de bijgewerkte score, niet de score van vóór dit punt.",
        ),
        L(
          "The winning threshold is stored in the match, not fixed globally.",
          "De winnende grens staat in de wedstrijd opgeslagen, niet globaal vast.",
        ),
        L(
          "A target of 1 makes the first point decisive.",
          "Bij een doel van 1 is het eerste punt beslissend.",
        ),
      ],
      L(
        "Use the match’s target and support either winner.",
        "Gebruik het doel van de wedstrijd en ondersteun beide winnaars.",
      ),
      [
        {
          call: {
            name: "award_point",
            args: [{ left: 0, right: 0, target: 1 }, "right"],
          },
          check: '_error is None and _return == "right"',
        },
        {
          call: {
            name: "award_point",
            args: [{ left: 1, right: 0, target: 4 }, "left"],
          },
          check: "_error is None and _return is None",
        },
      ],
    ),
    task(
      "",
      L(
        "Reject an unknown side before changing any match values. Try a misspelled side in the console to see the error.",
        "Wijs een onbekende kant af voordat wedstrijdwaarden veranderen. Probeer een verkeerd gespelde kant in de console om de fout te zien.",
      ),
      "callable(award_point)",
      [
        L(
          "An accidental key should not create a third player.",
          "Een onbedoelde sleutel mag geen derde speler maken.",
        ),
        L(
          "Validate the side before performing the mutation.",
          "Valideer de kant voordat je de wijziging uitvoert.",
        ),
        L(
          "A ValueError can describe an invalid choice supplied to a function.",
          "Een ValueError kan een ongeldige keuze beschrijven die aan een functie is meegegeven.",
        ),
      ],
      L(
        "Keep the match untouched when rejecting invalid arguments.",
        "Houd de wedstrijd ongewijzigd wanneer je ongeldige argumenten afwijst.",
      ),
      [
        {
          call: {
            name: "award_point",
            args: [{ left: 2, right: 3, target: 5 }, "Leftt"],
          },
          check:
            '_error == "ValueError" and _args[0] == {"left": 2, "right": 3, "target": 5}',
        },
      ],
    ),
  ],
  solutionNote: L(
    "This function intentionally changes state; translated intentionally did not. Both are useful interfaces when the behavior is clear to the caller.",
    "Deze functie verandert state bewust; translated deed dat bewust niet. Beide zijn nuttige interfaces wanneer het gedrag voor de aanroeper duidelijk is.",
  ),
});

const reset = lesson({
  module: 6,
  number: 4,
  title: L(
    "Reset the ball without moving its template",
    "Reset de bal zonder zijn sjabloon te verplaatsen",
  ),
  guidance: "adapt",
  minutes: 18,
  explanation: L(
    "The ball moves during a rally. A new round should start from an unchanged template, but the starter accidentally moves that template too. Investigate shared objects and make each round receive an independent ball dictionary.",
    "De bal beweegt tijdens een rally. Een nieuwe ronde moet vanuit een ongewijzigd sjabloon beginnen, maar de startcode verplaatst dat sjabloon per ongeluk ook. Onderzoek gedeelde objecten en geef elke ronde een onafhankelijke baldictionary.",
  ),
  sections: [
    section(
      L(
        "Another name is not another object",
        "Een andere naam is geen ander object",
      ),
      L(
        "Assigning one list or dictionary to another name does not copy it. Both names refer to the same object, so mutation through either name is visible through the other. .copy() makes a new outer container. For the flat dictionaries in this exercise, whose values are numbers, that is enough.",
        "Een lijst of dictionary aan een andere naam toekennen kopieert deze niet. Beide namen verwijzen naar hetzelfde object, dus wijzigingen via de ene naam zijn via de andere zichtbaar. .copy() maakt een nieuwe buitenste container. Voor de platte dictionaries in deze opdracht, waarvan de waarden getallen zijn, is dat genoeg.",
      ),
      'original = {"score": 0}\nseparate = original.copy()\nseparate["score"] = 9\nprint(original["score"], separate["score"])',
      "0 9",
    ),
    section(
      L(
        "Know the limits of a shallow copy",
        "Ken de grenzen van een ondiepe kopie",
      ),
      L(
        "A shallow copy still shares nested lists or dictionaries. We deliberately use flat numeric state here. Later, if your state contains mutable objects inside it, decide which nested values also need copying. Do not reset unrelated match scores just to reset a ball.",
        "Een ondiepe kopie deelt nog steeds geneste lijsten of dictionaries. We gebruiken hier bewust platte numerieke toestand. Als je toestand later veranderlijke objecten bevat, bepaal dan welke geneste waarden ook een kopie nodig hebben. Reset geen ongerelateerde wedstrijdscores alleen om een bal te resetten.",
      ),
    ),
  ],
  starter:
    'def new_ball(template):\n    return template\n\ntemplate = {"x": 320, "y": 200, "vx": 4, "vy": -3}\nmatch = {"left": 2, "right": 1}\nball = new_ball(template)\nball["x"] += 40\nball["y"] -= 12\nnext_ball = new_ball(template)\nprint("Template:", template)\nprint("Moving ball:", ball)\nprint("Next round:", next_ball)\nprint("Match:", match)\n',
  solution:
    'def new_ball(template):\n    return template.copy()\n\ntemplate = {"x": 320, "y": 200, "vx": 4, "vy": -3}\nmatch = {"left": 2, "right": 1}\nball = new_ball(template)\nball["x"] += 40\nball["y"] -= 12\nnext_ball = new_ball(template)\nprint("Template:", template)\nprint("Moving ball:", ball)\nprint("Next round:", next_ball)\nprint("Match:", match)\n',
  tasks: [
    task(
      "",
      L(
        "Make new_ball return an independent dictionary containing the template’s fields and values.",
        "Laat new_ball een onafhankelijke dictionary met de velden en waarden van het sjabloon teruggeven.",
      ),
      "ball is not template and next_ball is not template",
      [
        L(
          "Returning the parameter itself gives the caller another name for the same object.",
          "De parameter zelf teruggeven geeft de aanroeper een andere naam voor hetzelfde object.",
        ),
        L(
          "Construct a new outer dictionary from the supplied template.",
          "Maak een nieuwe buitenste dictionary uit het meegegeven sjabloon.",
        ),
        L(
          "original.copy() preserves the fields but creates a separate container.",
          "original.copy() behoudt de velden maar maakt een aparte container.",
        ),
      ],
      L(
        "Return equivalent state with a different identity.",
        "Geef gelijkwaardige toestand terug met een andere identiteit.",
      ),
      [
        {
          call: {
            name: "new_ball",
            args: [{ x: 10, y: 20, vx: -2, vy: 1, radius: 6 }],
          },
          check:
            "_error is None and _return == _args[0] and _return is not _args[0]",
        },
      ],
    ),
    task(
      "",
      L(
        "Keep the moving ball’s updates while preserving the original template and a fresh next_ball for the next round.",
        "Behoud de wijzigingen van de bewegende bal en behoud tegelijk het oorspronkelijke sjabloon en een verse next_ball voor de volgende ronde.",
      ),
      'template == {"x": 320, "y": 200, "vx": 4, "vy": -3} and ball["x"] == 360 and ball["y"] == 188 and next_ball == template',
      [
        L(
          "The aim is isolation, not removing the movement statements.",
          "Het doel is onafhankelijkheid, niet het verwijderen van de bewegingsstatements.",
        ),
        L(
          "Every call should create a fresh object, not reuse one cached copy.",
          "Elke aanroep moet een nieuw object maken, niet één opgeslagen kopie hergebruiken.",
        ),
        L(
          "Mutating one returned dictionary should not alter a later return.",
          "Eén teruggegeven dictionary veranderen mag een latere terugkeerwaarde niet veranderen.",
        ),
      ],
      L(
        "A played round must not move the starting position of the next round.",
        "Een gespeelde ronde mag de beginpositie van de volgende ronde niet verplaatsen.",
      ),
      [
        {
          call: { name: "new_ball", args: [{ x: 4, y: 9 }] },
          check:
            '_error is None and not _return.update({"x": 999}) and _args[0] == {"x": 4, "y": 9} and new_ball(_args[0]) == {"x": 4, "y": 9}',
        },
      ],
    ),
    task(
      "",
      L(
        "Preserve the match scores and keep all four reports available for inspection. Test a template with an extra numeric field.",
        "Behoud de wedstrijdscores en houd alle vier overzichten beschikbaar voor inspectie. Test een sjabloon met een extra numeriek veld.",
      ),
      'match == {"left": 2, "right": 1} and all(label in _stdout for label in ("Template:", "Moving ball:", "Next round:", "Match:"))',
      [
        L(
          "Ball state and match state have different lifetimes.",
          "Baltoestand en wedstrijdtoestand hebben verschillende levensduren.",
        ),
        L(
          "A generic copy should retain fields the function does not specifically know about.",
          "Een algemene kopie moet velden behouden die de functie niet specifiek kent.",
        ),
        L(
          "Copying a dictionary preserves its key/value pairs, not only x and y.",
          "Een dictionary kopiëren behoudt de sleutel-/waardeparen, niet alleen x en y.",
        ),
      ],
      L(
        "Reset only the state that belongs to the new round.",
        "Reset alleen de toestand die bij de nieuwe ronde hoort.",
      ),
      [
        {
          call: { name: "new_ball", args: [{ x: 1, y: 2, speed: 7 }] },
          check:
            '_return == {"x": 1, "y": 2, "speed": 7} and match == {"left": 2, "right": 1}',
        },
      ],
    ),
  ],
  solutionNote: L(
    "dict(template) or an equivalent fresh dictionary is also valid. If a future game uses nested state, copying only the outer dictionary may not be enough; this lesson does not claim otherwise.",
    "dict(template) of een gelijkwaardige nieuwe dictionary is ook geldig. Als een toekomstig spel geneste toestand gebruikt, is alleen de buitenste dictionary kopiëren mogelijk niet genoeg; deze les beweert niet anders.",
  ),
});

const summary = lesson({
  module: 6,
  number: 5,
  title: L(
    "Work out when a match ended",
    "Bepaal wanneer een wedstrijd eindigde",
  ),
  guidance: "independent",
  minutes: 24,
  explanation: L(
    "A game records the winning side of each rally. Sometimes the recording keeps going after the match has already been won. Build a function that reconstructs the actual match, stops at its winner, and leaves the original recording intact.",
    "Een spel registreert de winnende kant van elke rally. Soms gaat de registratie door nadat de wedstrijd al gewonnen is. Bouw een functie die de echte wedstrijd reconstrueert, bij de winnaar stopt en de oorspronkelijke registratie intact laat.",
  ),
  sections: [
    section(
      L(
        "The result another screen needs",
        "Het resultaat dat een ander scherm nodig heeft",
      ),
      L(
        'summarise_match(rounds, target=3) receives a list of "left"/"right" rally winners and a positive integer target. Return a dictionary with left and right scores, played (rallies actually counted), and winner ("left", "right", or None). Stop counting as soon as a side reaches target. Ignore later entries entirely. Before that point, an unknown side raises ValueError. An empty list represents an unplayed match. Do not mutate rounds. Print the returned summary for the sample recording.',
        'summarise_match(rounds, target=3) ontvangt een lijst met rallywinnaars "left"/"right" en een positief geheel doel. Geef een dictionary terug met scores left en right, played (daadwerkelijk getelde rally’s) en winner ("left", "right" of None). Stop met tellen zodra een kant target bereikt. Negeer latere items volledig. Vóór dat punt veroorzaakt een onbekende kant ValueError. Een lege lijst staat voor een ongespeelde wedstrijd. Verander rounds niet. Druk het teruggegeven overzicht voor de voorbeeldregistratie af.',
      ),
    ),
  ],
  starter:
    'rounds = ["left", "right", "left", "left", "right"]\n\n# Build summarise_match and report what happened.\n',
  solution:
    'def summarise_match(rounds, target=3):\n    result = {"left": 0, "right": 0, "played": 0, "winner": None}\n    for side in rounds:\n        if side != "left" and side != "right":\n            raise ValueError("Unknown rally winner")\n        result[side] += 1\n        result["played"] += 1\n        if result[side] >= target:\n            result["winner"] = side\n            break\n    return result\n\nrounds = ["left", "right", "left", "left", "right"]\nsummary = summarise_match(rounds)\nprint(summary)\n',
  tasks: [
    task(
      "",
      L(
        "Return a fresh summary with both scores and the number of counted rallies, including an empty recording.",
        "Geef een nieuw overzicht terug met beide scores en het aantal getelde rally’s, ook bij een lege registratie.",
      ),
      "callable(summarise_match)",
      [
        L(
          "Decide what the result should contain before the first rally.",
          "Bepaal wat het resultaat moet bevatten vóór de eerste rally.",
        ),
        L(
          "Iterate over the recorded sides and update the appropriate score.",
          "Loop over de geregistreerde kanten en werk de bijbehorende score bij.",
        ),
        L(
          "The named-state lesson updated a dictionary key selected by a variable.",
          "De les over benoemde toestand werkte een dictionary-sleutel bij die door een variabele werd gekozen.",
        ),
      ],
      L(
        "Count the actual rallies without omitting zero scores.",
        "Tel de werkelijke rally’s zonder nulscores weg te laten.",
      ),
      [
        {
          call: { name: "summarise_match", args: [[]] },
          check:
            '_error is None and _return == {"left": 0, "right": 0, "played": 0, "winner": None}',
        },
        {
          call: {
            name: "summarise_match",
            args: [["right", "left", "right"], 5],
          },
          check:
            '_error is None and _return == {"left": 1, "right": 2, "played": 3, "winner": None}',
        },
      ],
    ),
    task(
      "",
      L(
        "Recognise either winner and stop at the first decisive rally. Respect the supplied target.",
        "Herken beide winnaars en stop bij de eerste beslissende rally. Respecteer het meegegeven doel.",
      ),
      "callable(summarise_match)",
      [
        L(
          "An entry after victory belongs outside this match.",
          "Een item na de overwinning hoort buiten deze wedstrijd.",
        ),
        L(
          "Check the winning condition immediately after counting a rally.",
          "Controleer de winconditie direct na het tellen van een rally.",
        ),
        L(
          "break can end a loop before all items have been visited.",
          "break kan een lus beëindigen voordat alle items zijn bezocht.",
        ),
      ],
      L(
        "Do not include post-victory points or assume that left always wins.",
        "Neem geen punten na de overwinning mee en neem niet aan dat left altijd wint.",
      ),
      [
        {
          call: {
            name: "summarise_match",
            args: [["right", "left", "right", "left"], 2],
          },
          check:
            '_return == {"left": 1, "right": 2, "played": 3, "winner": "right"}',
        },
        {
          call: {
            name: "summarise_match",
            kwargs: { rounds: ["left", "right"], target: 1 },
          },
          check:
            '_return == {"left": 1, "right": 0, "played": 1, "winner": "left"}',
        },
      ],
    ),
    task(
      "",
      L(
        "Reject an unknown side only if it occurs before the match ends. Preserve the original list on both successful and rejected recordings.",
        "Wijs een onbekende kant alleen af wanneer deze voorkomt voordat de wedstrijd eindigt. Behoud de oorspronkelijke lijst bij zowel geslaagde als afgewezen registraties.",
      ),
      'callable(summarise_match) and rounds == ["left", "right", "left", "left", "right"]',
      [
        L(
          "Validation follows the part of the recording that actually belongs to the match.",
          "Validatie volgt het deel van de registratie dat daadwerkelijk bij de wedstrijd hoort.",
        ),
        L(
          "Reading the list does not require removing items from it.",
          "De lijst lezen vereist niet dat je er items uit verwijdert.",
        ),
        L(
          "A for loop visits items without consuming the stored list.",
          "Een for-lus bezoekt items zonder de opgeslagen lijst te verbruiken.",
        ),
      ],
      L(
        "Keep the recording intact and apply validation at the correct point.",
        "Houd de registratie intact en pas validatie op het juiste moment toe.",
      ),
      [
        {
          call: { name: "summarise_match", args: [["left", "unknown"], 3] },
          check: '_error == "ValueError" and _args[0] == ["left", "unknown"]',
        },
        {
          call: { name: "summarise_match", args: [["left", "unknown"], 1] },
          check:
            '_error is None and _return["winner"] == "left" and _return["played"] == 1 and _args[0] == ["left", "unknown"]',
        },
      ],
    ),
    task(
      "",
      L(
        "Store the sample result in summary and print it. Keep the function reusable for another match without retaining scores from the previous call.",
        "Bewaar het voorbeeldresultaat in summary en druk het af. Houd de functie herbruikbaar voor een andere wedstrijd zonder scores uit de vorige aanroep te behouden.",
      ),
      "isinstance(summary, dict) and str(summary) in _stdout",
      [
        L(
          "The summary belongs to one call, not every match ever analysed.",
          "Het overzicht hoort bij één aanroep, niet bij alle ooit geanalyseerde wedstrijden.",
        ),
        L(
          "Create the result state inside the function.",
          "Maak de resultaattoestand binnen de functie.",
        ),
        L(
          "A new dictionary per call prevents an earlier result from being reused accidentally.",
          "Een nieuwe dictionary per aanroep voorkomt onbedoeld hergebruik van een eerder resultaat.",
        ),
      ],
      L(
        "A later empty match must still begin with zero scores.",
        "Een latere lege wedstrijd moet nog steeds met nulscores beginnen.",
      ),
      [
        {
          call: { name: "summarise_match", args: [["right"], 1] },
          check:
            '_error is None and _return["winner"] == "right" and summarise_match([]) == {"left": 0, "right": 0, "played": 0, "winner": None} and _return["winner"] == "right"',
        },
      ],
    ),
  ],
  solutionNote: L(
    "One dictionary, separate counters, or a helper function can all work. The important decisions are when to stop, which inputs still belong to the match, and which state must stay independent.",
    "Eén dictionary, aparte tellers of een hulpfunctie kunnen allemaal werken. De belangrijke beslissingen zijn wanneer je stopt, welke invoer nog bij de wedstrijd hoort en welke toestand onafhankelijk moet blijven.",
  ),
});

const review = quiz(
  6,
  L("Check your reasoning: game state", "Controleer je inzicht: speltoestand"),
  [
    question(
      "v2-6-q1",
      L("Why does scores become None?", "Waarom wordt scores None?"),
      "scores = [2, 4]\nscores = scores.append(7)",
      [
        [
          L(
            "append changes the list and returns None; the assignment replaces the name.",
            "append verandert de lijst en geeft None terug; de toekenning vervangt de naam.",
          ),
          L(
            "Call scores.append(7) without assigning its result to scores.",
            "Roep scores.append(7) aan zonder het resultaat aan scores toe te kennen.",
          ),
        ],
        [
          L(
            "Lists cannot contain three values.",
            "Lijsten kunnen geen drie waarden bevatten.",
          ),
          L(
            "Lists can contain many values; the mistaken assignment loses the reference.",
            "Lijsten kunnen veel waarden bevatten; de verkeerde toekenning verliest de verwijzing.",
          ),
        ],
        [
          L(
            "7 is outside the list’s index range.",
            "7 ligt buiten het indexbereik van de lijst.",
          ),
          L(
            "The argument to append is a value, not an index.",
            "Het argument van append is een waarde, geen index.",
          ),
        ],
      ],
    ),
    question(
      "v2-6-q2",
      L("What does unpacking do here?", "Wat doet uitpakken hier?"),
      "position = (80, 120)\nx, y = position",
      [
        [
          L("Assigns 80 to x and 120 to y.", "Kent 80 toe aan x en 120 aan y."),
          L(
            "The values are assigned in order.",
            "De waarden worden op volgorde toegekend.",
          ),
        ],
        [
          L(
            "Changes position to a dictionary.",
            "Verandert position in een dictionary.",
          ),
          L(
            "Unpacking does not change the original tuple.",
            "Uitpakken verandert de oorspronkelijke tuple niet.",
          ),
        ],
        [
          L(
            "Assigns the full tuple to both x and y.",
            "Kent de volledige tuple toe aan zowel x als y.",
          ),
          L(
            "Each name receives one item, not the full group.",
            "Elke naam ontvangt één item, niet de volledige groep.",
          ),
        ],
      ],
    ),
    question(
      "v2-6-q3",
      L("What is printed?", "Wat wordt afgedrukt?"),
      'state = {"left": 1, "right": 2}\nside = "right"\nstate[side] += 1\nprint(state["right"])',
      [
        [
          L("3", "3"),
          L(
            "side supplies the key right, whose value increases.",
            "side levert de sleutel right, waarvan de waarde toeneemt.",
          ),
        ],
        [
          L("2", "2"),
          L(
            "The dictionary is mutable and the update changes its right value.",
            "De dictionary is veranderlijk en de wijziging verandert de waarde van right.",
          ),
        ],
        [
          L(
            "A key named side is added.",
            "Er wordt een sleutel met de naam side toegevoegd.",
          ),
          L(
            'state[side] uses the variable; state["side"] would use the literal key.',
            'state[side] gebruikt de variabele; state["side"] zou de letterlijke sleutel gebruiken.',
          ),
        ],
      ],
    ),
    question(
      "v2-6-q4",
      L("Why does the template also move?", "Waarom beweegt het sjabloon ook?"),
      'template = {"x": 10}\nball = template\nball["x"] += 5',
      [
        [
          L(
            "Both names refer to the same dictionary.",
            "Beide namen verwijzen naar dezelfde dictionary.",
          ),
          L(
            "Assignment does not copy a mutable object.",
            "Toekenning kopieert geen veranderlijk object.",
          ),
        ],
        [
          L(
            "Every dictionary named ball updates template automatically.",
            "Elke dictionary met de naam ball werkt template automatisch bij.",
          ),
          L(
            "The shared object matters, not the chosen names.",
            "Het gedeelde object is bepalend, niet de gekozen namen.",
          ),
        ],
        [
          L(
            "Integers cannot be stored independently.",
            "Integers kunnen niet onafhankelijk worden opgeslagen.",
          ),
          L(
            "Separate dictionaries can keep separate numeric values.",
            "Aparte dictionaries kunnen aparte numerieke waarden bewaren.",
          ),
        ],
      ],
    ),
    question(
      "v2-6-q5",
      L(
        "A first-to-two recording is left, right, right, left. Which summary is correct?",
        "Een registratie tot twee punten is left, right, right, left. Welk overzicht is correct?",
      ),
      "",
      [
        [
          L(
            "Left 1, right 2; three rallies counted; right wins.",
            "Left 1, right 2; drie rally’s geteld; right wint.",
          ),
          L(
            "The match ends at the third rally; the later entry is outside it.",
            "De wedstrijd eindigt bij de derde rally; het latere item valt erbuiten.",
          ),
        ],
        [
          L(
            "Both 2; four rallies counted; a tie.",
            "Beide 2; vier rally’s geteld; gelijkspel.",
          ),
          L(
            "That includes a rally recorded after the match ended.",
            "Dat neemt een rally mee die na het einde van de wedstrijd is geregistreerd.",
          ),
        ],
        [
          L(
            "Left 1, right 1; stop after two rallies.",
            "Left 1, right 1; stop na twee rally’s.",
          ),
          L(
            "The target is points for one side, not total rallies.",
            "Het doel betreft punten voor één kant, niet het totale aantal rally’s.",
          ),
        ],
      ],
    ),
  ],
);

export const activities = [
  history,
  positions,
  namedState,
  reset,
  summary,
  review,
];
