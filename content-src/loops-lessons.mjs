import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "learn-python-loops";
export const syntax = (kind) =>
  kind === "RangeFor"
    ? "any(isinstance(n,_ast.For) and any(isinstance(call,_ast.Call) and isinstance(call.func,_ast.Name) and call.func.id == 'range' for call in _ast.walk(n.iter)) for n in _ast.walk(_ast.parse(_source)))"
    : `any(isinstance(n, _ast.${kind}) for n in _ast.walk(_ast.parse(_source)))`;
// Behaviour is checked again on independent inputs; syntax requirements apply
// only where practising that construct is explicitly part of the instruction.
export const task = (en, nl, check, hintEn, hintNl, inputs = [], kind) => ({
  ...T(
    en,
    nl,
    kind ? `(${check}) and ${syntax(kind)}` : check,
    hintEn,
    hintNl,
    hintEn,
    hintNl,
  ),
  ...(inputs.length
    ? { cases: inputs.map((input) => ({ inputs: input, check })) }
    : {}),
});

// Remaining pages are declared after the foundations below to retain source order.

G(g, 1, {
  titleNl: "Eén regel voor een hele verzameling",
  intro: loc(
    "A station checks several platforms before opening. The rule is the same for every platform; only the platform name changes. A loop expresses that repeated rule once. Each trip through its body is an iteration.\n\nEvery useful loop has a starting situation, repeated work and a way to finish. A for loop visits the values supplied by a collection. A while loop keeps working while a condition is true. We will build both, then decide which fits each job.",
    "Een station controleert verschillende perrons voordat het opent. De regel is voor elk perron hetzelfde; alleen de perronnaam verandert. Een loop beschrijft die herhaalde regel één keer. Elke uitvoering van het blok heet een iteratie.\n\nElke bruikbare loop heeft een beginsituatie, herhaald werk en een manier om te eindigen. Een for-loop bezoekt de waarden uit een verzameling. Een while-loop werkt door zolang een voorwaarde waar is. We bouwen beide en bepalen daarna welke bij de taak past.",
  ),
  sections: [
    S(
      "Follow one item at a time",
      "Volg één onderdeel tegelijk",
      "Read the following program aloud: for each gate in gates, print an inspection line. gate receives the first name, then the next. The indented line repeats; the final unindented line runs once after the collection is exhausted. You do not need to memorise the syntax yet.",
      "Lees het volgende programma hardop: druk voor elke gate in gates een controleregel af. gate krijgt de eerste naam en daarna de volgende. De ingesprongen regel wordt herhaald; de laatste regel zonder inspringing draait één keer nadat de verzameling op is. Je hoeft de syntax nog niet uit je hoofd te kennen.",
      'gates = ["North", "South"]\nfor gate in gates:\n    print("Inspect:", gate)\nprint("Inspection finished")',
      "Inspect: North\nInspect: South\nInspection finished",
    ),
    S(
      "Change the data, keep the rule",
      "Verander de gegevens, behoud de regel",
      "Run the editor preview. Add another platform to platforms and predict which lines will repeat. Then replace the collection with an empty list. The body runs zero times, but the final message still appears. This is how one short program can handle different amounts of work without a new print statement for every item.",
      "Voer de demonstratie in de editor uit. Voeg een perron toe aan platforms en voorspel welke regels worden herhaald. Vervang de verzameling daarna door een lege list. Het blok draait nul keer, maar het slotbericht verschijnt nog steeds. Zo verwerkt één kort programma verschillende hoeveelheden werk zonder een nieuwe print-regel voor elk onderdeel.",
      'gates = []\nfor gate in gates:\n    print("Inspect:", gate)\nprint("Inspection finished")',
      "Inspection finished",
    ),
  ],
  starter:
    'platforms = ["A", "B", "C"]\nprint("Opening checks")\nfor platform in platforms:\n    print("Check platform", platform)\nprint("All listed platforms checked")\n',
  solution:
    'platforms = ["A", "B", "C", "D"]\nprint("Opening checks")\nfor platform in platforms:\n    print("Check platform", platform)\nprint("All listed platforms checked")\n',
  steps: [],
  solutionNote: loc(
    "Only the data gained a fourth platform. The loop applies the same instruction to it automatically. With an empty list there is no current platform, so the body is skipped entirely.",
    "Alleen de gegevens kregen een vierde perron. De loop past daar automatisch dezelfde instructie op toe. Bij een lege list is er geen huidig perron, dus wordt het blok helemaal overgeslagen.",
  ),
});

G(g, 2, {
  titleNl: "Herstel een onvolledig stationsrapport",
  intro: loc(
    "The departure board received a fourth station, but its old program still prints only three. This is a maintenance problem: the program has the same action copied in several places and assumes a particular list length. First make the missing data visible, then replace the repeated rule with a loop.",
    "Het vertrekbord kreeg een vierde station, maar het oude programma drukt er nog maar drie af. Dit is een onderhoudsprobleem: dezelfde actie staat op verschillende plaatsen gekopieerd en het programma gaat uit van een vaste listlengte. Maak eerst de ontbrekende gegevens zichtbaar en vervang daarna de herhaalde regel door een loop.",
  ),
  sections: [
    S(
      "Find the assumption",
      "Zoek de aanname",
      "Run the supplied program. The list has four items but only indexes 0, 1 and 2 are printed. Add the missing print once to see the complete report. That patch works today, but a fifth station would require another edit; an empty list would cause an indexing error.",
      "Voer het meegeleverde programma uit. De list heeft vier onderdelen, maar alleen indexen 0, 1 en 2 worden afgedrukt. Voeg de ontbrekende print één keer toe om het volledige rapport te zien. Dat werkt vandaag, maar een vijfde station zou weer een wijziging vereisen; een lege list zou een indexfout geven.",
      'stops = ["Pier", "Square"]\nprint("Stop:", stops[0])\nprint("Stop:", stops[1])',
      "Stop: Pier\nStop: Square",
    ),
    S(
      "Move the repeated action into a body",
      "Verplaats de herhaalde actie naar een blok",
      "The loop variable receives an item, not its index. Replace all the indexed prints with one for loop. Keep the colon and indent the print by four spaces. A separate summary after the loop can use len to count the stations. Try adding a station and then using an empty list: the same rule should still work.",
      "De loopvariabele krijgt een onderdeel, niet de index ervan. Vervang alle prints met een index door één for-loop. Behoud de dubbele punt en laat de print vier spaties inspringen. Een aparte samenvatting na de loop kan met len het aantal stations tellen. Probeer een station toe te voegen en daarna een lege list: dezelfde regel moet blijven werken.",
      'stops = ["Pier", "Square"]\nfor stop in stops:\n    print("Stop:", stop)\nprint("Count:", len(stops))',
      "Stop: Pier\nStop: Square\nCount: 2",
    ),
  ],
  starter:
    'stations = ["Harbor", "Market", "Park", "Depot"]\nprint("Stop:", stations[0])\nprint("Stop:", stations[1])\nprint("Stop:", stations[2])\n# The board is missing a station.\n',
  solution:
    'stations = ["Harbor", "Market", "Park", "Depot"]\nfor station in stations:\n    print("Stop:", station)\nprint("Count:", len(stations))\n',
  steps: [
    task(
      "Make the report print all four supplied stations as Stop: followed by the name, in order, once each. Run it to confirm the missing station appears.",
      "Laat het rapport alle vier meegeleverde stations afdrukken als Stop: gevolgd door de naam, op volgorde en elk één keer. Voer uit om te controleren dat het ontbrekende station verschijnt.",
      "[line for line in _stdout.splitlines() if line.startswith('Stop:')] == ['Stop: ' + s for s in stations]",
      "Add the missing station without duplicating earlier lines. A later loop refactor should preserve this output.",
      "Voeg het ontbrekende station toe zonder eerdere regels te verdubbelen. De latere loop-aanpassing moet deze output behouden.",
    ),
    task(
      "Replace the repeated indexed prints with a for loop over stations. It must also work when the list grows or is empty.",
      "Vervang de herhaalde prints met indexen door een for-loop over stations. Deze moet ook werken als de list groeit of leeg is.",
      "[line for line in _stdout.splitlines() if line.startswith('Stop:')] == ['Stop: ' + s for s in stations]",
      "Use one indented print with the current station value. Remove the old indexed prints.",
      "Gebruik één ingesprongen print met de huidige stationswaarde. Verwijder de oude prints met indexen.",
      [
        { stations: [] },
        { stations: ["West", "East", "North", "South", "Central"] },
      ],
      "For",
    ),
    task(
      "After the loop, print Count: and the number of stations. It must appear once, after all station lines.",
      "Druk na de loop Count: en het aantal stations af. Dit moet één keer verschijnen, na alle stationsregels.",
      "_stdout.splitlines() == ['Stop: ' + s for s in stations] + ['Count: ' + str(len(stations))]",
      "Put the summary at the left margin and calculate its value with len(stations).",
      "Zet de samenvatting tegen de linkermarge en bereken de waarde met len(stations).",
      [{ stations: [] }, { stations: ["West"] }],
    ),
  ],
  solutionNote: loc(
    "The first repair exposes the hidden fourth item. The loop then removes the fixed-size assumption. The unindented summary runs after every item has been visited and also works when there were no items.",
    "De eerste reparatie maakt het verborgen vierde onderdeel zichtbaar. De loop verwijdert daarna de aanname over de vaste grootte. De samenvatting zonder inspringing draait nadat alle onderdelen zijn bezocht en werkt ook als er geen onderdelen waren.",
  ),
});

G(g, 3, {
  titleNl: "Repareer en breid een for-loop uit",
  intro: loc(
    "A sensor-check program has the right idea but an invalid block. Python uses indentation to decide which statements belong to a loop. Run the starter once to see IndentationError, then repair the block and extend it into a small audit trail.",
    "Een sensorcontrole heeft het juiste idee maar een ongeldig blok. Python gebruikt inspringing om te bepalen welke instructies bij een loop horen. Voer de startcode één keer uit om IndentationError te zien, herstel daarna het blok en breid het uit tot een klein controleverslag.",
  ),
  sections: [
    S(
      "The variable holds the current value",
      "De variabele bevat de huidige waarde",
      "In for code in codes, Python assigns each list value to code in turn. You do not define code beforehand. Choose a descriptive name and use that same name inside the body. All body lines use the same indentation; a line back at the left margin runs after the loop.",
      "In for code in codes wijst Python elke listwaarde om de beurt aan code toe. Je hoeft code niet vooraf te definiëren. Kies een duidelijke naam en gebruik diezelfde naam binnen het blok. Alle regels van het blok springen even ver in; een regel terug aan de linkermarge draait na de loop.",
      'codes = ["R1", "R2"]\nfor code in codes:\n    print("Testing", code)\n    print("Recorded")\nprint("Finished")',
      "Testing R1\nRecorded\nTesting R2\nRecorded\nFinished",
    ),
    S(
      "Keep a record of the visits",
      "Bewaar welke onderdelen zijn bezocht",
      "Initialise visited as an empty list before the loop. Append the current code inside the body, so every iteration contributes one value. Resetting visited inside the loop would discard earlier work. Print its length once at the end; do not hard-code the number of sensors.",
      "Initialiseer visited vóór de loop als een lege list. Voeg de huidige code binnen het blok toe, zodat elke iteratie één waarde bijdraagt. visited binnen de loop opnieuw leegmaken zou eerder werk weggooien. Druk aan het einde één keer de lengte af; zet het aantal sensoren niet als vast getal in de code.",
      'visited = []\nfor code in ["X", "Y"]:\n    visited.append(code)\nprint(visited)',
      "['X', 'Y']",
    ),
  ],
  starter:
    'codes = ["A1", "B2", "C3"]\nvisited = []\n# Repair the indentation, then record each visit inside the loop.\nfor code in codes:\nprint("Testing", code)\n',
  solution:
    'codes = ["A1", "B2", "C3"]\nvisited = []\nfor code in codes:\n    print("Testing", code)\n    visited.append(code)\nprint("Checked:", len(visited))\n',
  steps: [
    task(
      "Repair the indentation so the for loop prints Testing and each code once, in order.",
      "Herstel de inspringing zodat de for-loop Testing en elke code één keer op volgorde afdrukt.",
      "[line for line in _stdout.splitlines() if line.startswith('Testing ')] == ['Testing ' + c for c in codes]",
      "Indent the print beneath for. Print the current code, not the entire codes list.",
      "Laat de print onder for inspringen. Druk de huidige code af, niet de hele list codes.",
      [{ codes: ["Z9", "A0"] }],
      "For",
    ),
    task(
      "Inside that loop, append each code to visited. Keep the initial empty list outside the loop.",
      "Voeg binnen die loop elke code toe aan visited. Laat de aanvankelijk lege list buiten de loop staan.",
      "visited == codes",
      "Append the loop variable once per visit. Do not reset visited on each iteration.",
      "Voeg de loopvariabele één keer per bezoek toe. Maak visited niet bij elke iteratie opnieuw leeg.",
      [{ codes: [] }, { codes: ["Z9", "A0", "Z9"] }],
    ),
    task(
      "After the loop, print Checked: and the number of visited sensors, once.",
      "Druk na de loop één keer Checked: en het aantal bezochte sensoren af.",
      "_stdout.splitlines() == ['Testing ' + c for c in codes] + ['Checked: ' + str(len(codes))]",
      "Use len(visited) in a print outside the loop, after the repeated Testing lines.",
      "Gebruik len(visited) in een print buiten de loop, na de herhaalde Testing-regels.",
      [{ codes: [] }, { codes: ["Z9"] }],
    ),
  ],
  solutionNote: loc(
    "The body both reports and records each visit. visited is created once, so earlier codes remain in it. The final summary is outside the loop and appears only once, including for an empty collection.",
    "Het blok meldt én bewaart elk bezoek. visited wordt één keer gemaakt, zodat eerdere codes erin blijven. De slotsamenvatting staat buiten de loop en verschijnt maar één keer, ook bij een lege verzameling.",
  ),
});

G(g, 4, {
  titleNl: "Maak genummerde meetrondes",
  intro: loc(
    "A calibration device must take a configurable number of measurements. There is no list of sensor names to visit this time: the requirement is a number of repetitions. range supplies the integers for those repetitions without needing a hand-written list.",
    "Een kalibratieapparaat moet een instelbaar aantal metingen doen. Dit keer is er geen list met sensornamen om te bezoeken: de opdracht is een aantal herhalingen. range levert de getallen daarvoor zonder dat je zelf een list hoeft uit te schrijven.",
  ),
  sections: [
    S(
      "Count repetitions from zero",
      "Tel herhalingen vanaf nul",
      "range(3) supplies 0, 1 and 2. Printing a constant repeats that constant three times. Printing the loop variable instead reveals the iteration values. Add one for a human-facing round number, or use range(1, rounds + 1). The stop remains excluded.",
      "range(3) levert 0, 1 en 2. Een constante afdrukken herhaalt die constante drie keer. De loopvariabele afdrukken toont juist de iteratiewaarden. Tel één op voor een rondenummer voor gebruikers, of gebruik range(1, rounds + 1). De stop blijft uitgesloten.",
      'for index in range(3):\n    print("Round", index + 1)',
      "Round 1\nRound 2\nRound 3",
    ),
    S(
      "Build a result alongside the output",
      "Bouw naast de output een resultaat op",
      "Each round contributes samples_per_round samples. Store the cumulative sample counts in totals. For three rounds of two samples, the values are 2, 4 and 6. Keep totals outside the loop, append inside it, and put the final summary after it. With zero rounds the list stays empty and the total is zero.",
      "Elke ronde levert samples_per_round metingen op. Bewaar de cumulatieve aantallen in totals. Bij drie rondes van twee metingen zijn dat 2, 4 en 6. Zet totals buiten de loop, voeg binnen de loop toe en plaats de slotsamenvatting erna. Bij nul rondes blijft de list leeg en is het totaal nul.",
      "totals = []\nfor index in range(3):\n    totals.append((index + 1) * 2)\nprint(totals)",
      "[2, 4, 6]",
    ),
  ],
  starter:
    'rounds = 4\nsamples_per_round = 3\ntotals = []\nprint("Calibration")\n# Add numbered rounds and their cumulative sample totals.\n',
  solution:
    'rounds = 4\nsamples_per_round = 3\ntotals = []\nprint("Calibration")\nfor index in range(rounds):\n    print("Round", index + 1)\n    totals.append((index + 1) * samples_per_round)\nprint("Samples:", rounds * samples_per_round)\n',
  steps: [
    task(
      "Use a for loop with range to print Round 1 through Round 4 beneath Calibration. Use rounds so changing it changes the repetitions.",
      "Gebruik een for-loop met range om Round 1 tot en met Round 4 onder Calibration af te drukken. Gebruik rounds zodat een wijziging daarvan het aantal herhalingen verandert.",
      "[s for s in _stdout.splitlines() if s.startswith('Round ')] == ['Round ' + str(n) for n in range(1, rounds + 1)]",
      "The stop is excluded. Either add one to a zero-based index or stop at rounds + 1.",
      "De stop is uitgesloten. Tel één op bij een index vanaf nul of stop bij rounds + 1.",
      [{ rounds: 0 }, { rounds: 2 }],
      "RangeFor",
    ),
    task(
      "In the same loop, append the cumulative sample count to totals. The supplied settings should produce [3, 6, 9, 12].",
      "Voeg in dezelfde loop het cumulatieve aantal metingen toe aan totals. De meegeleverde instellingen moeten [3, 6, 9, 12] opleveren.",
      "totals == [n * samples_per_round for n in range(1, rounds + 1)]",
      "Multiply the one-based round number by samples_per_round, then append that value.",
      "Vermenigvuldig het rondenummer vanaf één met samples_per_round en voeg die waarde toe.",
      [{ rounds: 0 }, { rounds: 3, samples_per_round: 2 }],
    ),
    task(
      "Finish with one Samples: line showing the total number of samples. Keep it after all rounds, including when rounds is zero.",
      "Eindig met één Samples:-regel met het totale aantal metingen. Zet deze na alle rondes, ook wanneer rounds nul is.",
      "_stdout.splitlines() == ['Calibration'] + ['Round ' + str(n) for n in range(1, rounds + 1)] + ['Samples: ' + str(rounds * samples_per_round)]",
      "Calculate the total without indexing the last item of an empty totals list.",
      "Bereken het totaal zonder het laatste onderdeel van een lege totals-list op te vragen.",
      [{ rounds: 0 }, { rounds: 2, samples_per_round: 5 }],
    ),
  ],
  solutionNote: loc(
    "The loop uses zero-based indexes but displays one-based round numbers. Each appended value is a cumulative count. The final multiplication handles zero rounds without needing a last list item.",
    "De loop gebruikt indexen vanaf nul maar toont rondenummers vanaf één. Elke toegevoegde waarde is een cumulatief aantal. De laatste vermenigvuldiging verwerkt nul rondes zonder een laatste listonderdeel nodig te hebben.",
  ),
});

G(g, 5, {
  titleNl: "Volg een laadproces met while",
  intro: loc(
    "A charging station adds a fixed amount of energy until a target is reached. The decision is a condition: is the charge still below the target? A while loop checks that question before every iteration. The update inside the body must move the state toward stopping.",
    "Een laadstation voegt telkens een vaste hoeveelheid energie toe totdat een doel is bereikt. De beslissing is een voorwaarde: is de lading nog onder het doel? Een while-loop controleert die vraag vóór elke iteratie. De wijziging binnen het blok moet de toestand richting het einde brengen.",
  ),
  sections: [
    S(
      "Test, act, update, test again",
      "Testen, uitvoeren, bijwerken en opnieuw testen",
      "In this example the first test is 4 < 10. The body adds three, then the next test uses 7. After the second update the charge is 10 and the condition is false. Nothing in while updates a variable automatically. Keep the update inside the body.",
      "In dit voorbeeld is de eerste test 4 < 10. Het blok telt drie op; de volgende test gebruikt 7. Na de tweede wijziging is de lading 10 en is de voorwaarde onwaar. while werkt niet automatisch een variabele bij. Laat de wijziging binnen het blok staan.",
      'charge = 4\nwhile charge < 10:\n    print("Before:", charge)\n    charge += 3\nprint("Finished:", charge)',
      "Before: 4\nBefore: 7\nFinished: 10",
    ),
    S(
      "Reach or pass the target",
      "Bereik of passeer het doel",
      "The target is a stopping boundary, not always an exact result. Starting at 4 and adding 3 toward 9 ends at 10. Using != instead of < could keep going forever when the exact target is skipped. If the starting charge already meets the target, the body runs zero times. Use Stop or Ctrl+C if an edit produces a nonterminating loop, then repair the condition or update.",
      "Het doel is een stopgrens, niet altijd het exacte resultaat. Beginnen bij 4 en steeds 3 toevoegen richting 9 eindigt bij 10. Met != in plaats van < zou de loop oneindig kunnen doorgaan wanneer het exacte doel wordt overgeslagen. Als de beginlading al aan het doel voldoet, draait het blok nul keer. Gebruik Stop of Ctrl+C als een wijziging een oneindige loop veroorzaakt en herstel daarna de voorwaarde of wijziging.",
      "charge = 12\nhistory = []\nwhile charge < 10:\n    charge += 3\n    history.append(charge)\nprint(charge, history)",
      "12 []",
    ),
  ],
  starter:
    'start = 12\ntarget = 30\nstep = 6\ncharge = start\nhistory = []\nprint("Initial:", charge)\n# Charge repeatedly while below target.\n# Record each charge AFTER its update.\n',
  solution:
    'start = 12\ntarget = 30\nstep = 6\ncharge = start\nhistory = []\nprint("Initial:", charge)\nwhile charge < target:\n    charge += step\n    history.append(charge)\nprint("Finished:", charge)\nprint("Cycles:", len(history))\n',
  steps: [
    task(
      "Add a while loop that increases charge by step until it reaches or passes target. Keep the supplied input assignments.",
      "Voeg een while-loop toe die charge met step verhoogt totdat target wordt bereikt of gepasseerd. Behoud de meegeleverde invoertoewijzingen.",
      "charge == start + max(0, (target - start + step - 1) // step) * step",
      "Check charge < target before each update. Keep charge += step inside the body; the positive step moves toward stopping.",
      "Controleer charge < target vóór elke wijziging. Laat charge += step binnen het blok staan; de positieve stap beweegt richting het einde.",
      [
        { start: 10, target: 23, step: 5 },
        { start: 40, target: 30, step: 6 },
      ],
      "While",
    ),
    task(
      "After each update, append the new charge to history inside the loop. The supplied run should record [18, 24, 30].",
      "Voeg na elke wijziging de nieuwe charge binnen de loop toe aan history. De meegeleverde uitvoering moet [18, 24, 30] bewaren.",
      "history == list(range(start + step, target + step, step))",
      "Append after increasing charge. Initialise history once before the loop, not during each cycle.",
      "Voeg toe nadat charge is verhoogd. Initialiseer history één keer vóór de loop, niet tijdens elke cyclus.",
      [
        { start: 10, target: 23, step: 5 },
        { start: 40, target: 30, step: 6 },
      ],
    ),
    task(
      "After the loop, print Finished: with the final charge and Cycles: with the number of updates. Each summary appears once.",
      "Druk na de loop Finished: met de eindlading en Cycles: met het aantal wijzigingen af. Elke samenvatting verschijnt één keer.",
      "_stdout.splitlines() == ['Initial: ' + str(start), 'Finished: ' + str(charge), 'Cycles: ' + str(len(history))] and len(history) == max(0, (target - start + step - 1) // step)",
      "Unindent both summary prints. len(history) counts completed updates, including zero when no charging was needed.",
      "Laat beide samenvattingen niet inspringen. len(history) telt afgeronde wijzigingen, ook nul wanneer laden niet nodig was.",
      [
        { start: 10, target: 23, step: 5 },
        { start: 40, target: 30, step: 6 },
      ],
    ),
  ],
  solutionNote: loc(
    "The condition tests the current state; the update changes it for the next test. History records the new charge, not the old one. A strict less-than condition handles an overshoot and skips charging when the starting value already meets the target.",
    "De voorwaarde test de huidige toestand; de wijziging verandert die voor de volgende test. History bewaart de nieuwe lading, niet de oude. Een strikt-kleiner-danvoorwaarde verwerkt het passeren van het doel en slaat laden over wanneer de beginwaarde al voldoet.",
  ),
});

G(g, 6, {
  titleNl: "Doorloop metingen met een index",
  intro: loc(
    "A monitoring report needs both a measurement's position and its value. A while loop can walk a list with an index: start at zero, read only while the index is smaller than the length, then advance. We will first record the visits and then build a running total.",
    "Een monitorrapport heeft zowel de positie als de waarde van een meting nodig. Een while-loop kan met een index door een list lopen: begin bij nul, lees alleen zolang de index kleiner is dan de lengte en ga daarna verder. We bewaren eerst de bezoeken en bouwen vervolgens een lopend totaal op.",
  ),
  sections: [
    S(
      "Length is not a valid last index",
      "De lengte is geen geldige laatste index",
      "A list of three items has indexes 0, 1 and 2. Use index < len(values), not <=. After the last item, increase index to 3; the next test fails before any attempt to read values[3]. An empty list makes the first test false.",
      "Een list met drie onderdelen heeft indexen 0, 1 en 2. Gebruik index < len(values), niet <=. Verhoog index na het laatste onderdeel naar 3; de volgende test is onwaar voordat values[3] wordt gelezen. Bij een lege list is de eerste test meteen onwaar.",
      'values = [7, 2]\nindex = 0\nwhile index < len(values):\n    print(index, values[index])\n    index += 1\nprint("Next index:", index)',
      "0 7\n1 2\nNext index: 2",
    ),
    S(
      "Accumulate instead of replacing",
      "Tel op in plaats van te vervangen",
      "Create total once before the loop. total += value keeps the previous total and adds one contribution. total = value would forget everything except the most recent measurement. In the editor, append each running total to running after adding the current value, then advance the index.",
      "Maak total één keer vóór de loop. total += value behoudt het vorige totaal en telt één bijdrage erbij op. total = value zou alles behalve de recentste meting vergeten. Voeg in de editor elk lopend totaal toe aan running nadat de huidige waarde is opgeteld en verhoog daarna de index.",
      "total = 0\nfor value in [7, 2, 5]:\n    total += value\n    print(total)",
      "7\n9\n14",
    ),
  ],
  starter:
    'values = [3, 5, 7]\nindex = 0\nvisited = []\ntotal = 0\nrunning = []\nprint("Measurements:", values)\n# Read, record, accumulate, then advance the index.\n',
  solution:
    'values = [3, 5, 7]\nindex = 0\nvisited = []\ntotal = 0\nrunning = []\nprint("Measurements:", values)\nwhile index < len(values):\n    visited.append(values[index])\n    total += values[index]\n    running.append(total)\n    index += 1\nprint("Running:", running)\nprint("Total:", total)\n',
  steps: [
    task(
      "Use a while loop to append every measurement to visited in order. Advance index each time; finish at len(values).",
      "Gebruik een while-loop om elke meting op volgorde aan visited toe te voegen. Verhoog index elke keer en eindig bij len(values).",
      "visited == values and index == len(values)",
      "Test index < len(values), read values[index], then increase index by one. Do not read at index len(values).",
      "Test index < len(values), lees values[index] en verhoog index daarna met één. Lees niet op index len(values).",
      [{ values: [] }, { values: [8, 0, -2, 5] }],
      "While",
    ),
    task(
      "In that loop, add each value to total and append the updated total to running. Expect [3, 8, 15] for the supplied data.",
      "Tel in die loop elke waarde op bij total en voeg het bijgewerkte totaal toe aan running. Verwacht [3, 8, 15] voor de meegeleverde gegevens.",
      "total == sum(values) and running == [sum(values[:n]) for n in range(1, len(values) + 1)]",
      "Keep total and running outside the loop. Add the current value before appending the running total.",
      "Laat total en running buiten de loop staan. Tel de huidige waarde op vóór het toevoegen van het lopende totaal.",
      [{ values: [] }, { values: [8, 0, -2, 5] }],
    ),
    task(
      "After traversal, print Running: and the list of running totals, then Total: and the final sum. Keep the Measurements line.",
      "Druk na het doorlopen Running: en de list lopende totalen af, gevolgd door Total: en de eindsom. Behoud de Measurements-regel.",
      "_stdout.splitlines() == ['Measurements: ' + str(values), 'Running: ' + str([sum(values[:n]) for n in range(1, len(values) + 1)]), 'Total: ' + str(sum(values))]",
      "Put both prints outside the loop. For no measurements the running list is empty and the total is zero.",
      "Zet beide prints buiten de loop. Zonder metingen is de list lopende totalen leeg en het totaal nul.",
      [{ values: [] }, { values: [8, 0, -2, 5] }],
    ),
  ],
  solutionNote: loc(
    "Indexing happens only after the bounds check. The current value contributes to both the visit record and the sum. Advancing last avoids skipping the first value; preserving the initial total outside the loop avoids losing earlier contributions.",
    "Indexering gebeurt pas na de grenscontrole. De huidige waarde draagt bij aan zowel het bezoekverslag als de som. Als laatste verdergaan voorkomt dat de eerste waarde wordt overgeslagen; het begintotaal buiten de loop bewaren voorkomt verlies van eerdere bijdragen.",
  ),
});
