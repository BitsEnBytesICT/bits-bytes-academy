import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "use-python-list";
const C = (step, rows) => ({
  ...step,
  cases: rows.map(([inputs, check]) => ({ inputs, check })),
});
const method = (name) =>
  `any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == '${name}' for n in _ast.walk(_ast.parse(_source)))`;

G(g, 1, {
  titleNl: "Kies de bewerking die bij je doel past",
  intro: loc(
    "A delivery desk needs more than a place to store items. It must insert urgent jobs, remove completed ones, count the remaining work and prepare a report. Each operation answers a different question. Before choosing one, decide whether you want to change the collection or calculate something from it.",
    "Een uitgiftebalie heeft meer nodig dan een plek om items te bewaren. Spoedklussen moeten ertussen, afgeronde klussen eruit, en de resterende taken moeten worden geteld en gerapporteerd. Elke bewerking beantwoordt een andere vraag. Bepaal eerst of je de verzameling wilt wijzigen of er iets uit wilt berekenen.",
  ),
  sections: [
    S(
      "Methods belong to an object",
      "Methods horen bij een object",
      "A method starts with the list name and a dot: jobs.insert(...). A built-in function receives the list inside parentheses: len(jobs). Parentheses perform the call in both forms. We will use these tools before studying how to write our own functions.",
      "Een method begint met de naam van de list en een punt: jobs.insert(...). Een ingebouwde functie krijgt de list tussen haakjes: len(jobs). In beide vormen voeren de haakjes de aanroep uit. We gebruiken deze hulpmiddelen voordat we eigen functies leren schrijven.",
      'jobs = ["scan", "pack"]\njobs.insert(1, "check")\nprint(jobs)\nprint(len(jobs))',
      "['scan', 'check', 'pack']\n3",
    ),
    S(
      "Change, calculate, or copy?",
      "Wijzigen, berekenen of kopiëren?",
      "insert changes the list; len calculates its size without changing it. sorted produces a new ordered list. Run the supplied preview and compare the original queue with the report. Try a different urgent job or insertion position. The next pages unpack each operation, including its return value.",
      "insert wijzigt de list; len berekent de grootte zonder de list te veranderen. sorted maakt een nieuwe gesorteerde list. Voer de meegeleverde demonstratie uit en vergelijk de oorspronkelijke wachtrij met het rapport. Probeer een andere spoedklus of invoegpositie. De volgende pagina’s behandelen elke bewerking en de bijbehorende return value.",
      "arrival = [8, 3, 6]\nreport = sorted(arrival)\nprint(arrival)\nprint(report)",
      "[8, 3, 6]\n[3, 6, 8]",
    ),
  ],
  starter:
    'jobs = ["scan", "pack", "label"]\nprint("Arrival order:", jobs)\njobs.insert(1, "check")\nprint("Working order:", jobs)\nprint("Job count:", len(jobs))\nprint("Alphabetical report:", sorted(jobs))\nprint("Queue still:", jobs)\n',
  solution:
    'jobs = ["scan", "pack", "label"]\nprint("Arrival order:", jobs)\njobs.insert(1, "check")\nprint("Working order:", jobs)\nprint("Job count:", len(jobs))\nprint("Alphabetical report:", sorted(jobs))\nprint("Queue still:", jobs)\n',
  steps: [],
  solutionNote: loc(
    "The insertion changes working order. Sorting for a report does not have to change that order: sorted gives a separate list, so the last print still shows the queue.",
    "Het invoegen verandert de werkvolgorde. Sorteren voor een rapport hoeft die volgorde niet te veranderen: sorted geeft een aparte list, dus de laatste print toont nog steeds de wachtrij.",
  ),
});

G(g, 2, {
  titleNl: "Voeg een stop in zonder andere stops te verliezen",
  intro: loc(
    "A route already has three stops, but two new collections must fit into it. Replacing an item would lose a stop; appending would put it at the end. insert(index, value) opens a position before the existing element and shifts the later elements one place to the right.",
    "Een route heeft al drie stops, maar er moeten twee ophaaladressen tussen. Vervangen zou een stop laten verdwijnen; append zou deze achteraan zetten. insert(index, value) maakt ruimte vóór het bestaande element en schuift de latere elementen één plaats naar rechts.",
  ),
  sections: [
    S(
      "Position first, value second",
      "Eerst de positie, dan de waarde",
      "Inserting at index 1 means before the current second element. The index is not the value being inserted. Negative indexes count from the end before the insertion; inserting at -1 places an item before the current last item.",
      "Invoegen op index 1 betekent vóór het huidige tweede element. De index is niet de waarde die je invoegt. Negatieve indexes tellen vóór het invoegen vanaf het einde; invoegen op -1 zet een item vóór het huidige laatste item.",
      'route = ["Depot", "Museum", "Harbor"]\nroute.insert(1, "Park")\nroute.insert(-1, "School")\nprint(route)',
      "['Depot', 'Park', 'Museum', 'School', 'Harbor']",
    ),
    S(
      "Read indexes again after an edit",
      "Lees indexes opnieuw na een wijziging",
      "The starter prints the original route. Add the priority stop first, then inspect the new positions before inserting the clinic. Keep the Priority print before the second insertion: it records an earlier state even though the list changes again.",
      "De starter print de oorspronkelijke route. Voeg eerst de spoedstop toe en bekijk daarna de nieuwe posities voordat je de kliniek invoegt. Laat de Priority-print vóór de tweede invoeging staan: die legt een eerdere toestand vast, ook als de list daarna opnieuw verandert.",
    ),
  ],
  starter:
    'route = ["Depot", "Bridge", "Museum"]\nprint("Original:", route)\n# Add Hub before the current first stop.\nprint("Priority:", route)\n# Add Clinic between Depot and Bridge.\nprint("Ready:", route)\n',
  solution:
    'route = ["Depot", "Bridge", "Museum"]\nprint("Original:", route)\nroute.insert(0, "Hub")\nprint("Priority:", route)\nroute.insert(2, "Clinic")\nprint("Ready:", route)\nshifted = route[3]\nprint("Shifted stop:", shifted)\n',
  steps: [
    C(
      T(
        'Use `insert()` to put "Hub" first. Keep the supplied Priority print immediately after this change and run the program.',
        'Gebruik `insert()` om "Hub" vooraan te zetten. Laat de meegeleverde Priority-print direct na deze wijziging staan en voer het programma uit.',
        `${method("insert")} and "Priority: ['Hub', 'Depot', 'Bridge', 'Museum']" in _stdout.splitlines()`,
        "The first position has index 0. Supply the position before the new string.",
        "De eerste positie heeft index 0. Geef de positie vóór de nieuwe string mee.",
        "Insert one Hub before Depot and print that intermediate route before making another change.",
        "Voeg één Hub vóór Depot in en print die tussenstand voordat je iets anders verandert.",
      ),
      [
        [
          { route: ["A", "B"] },
          "\"Priority: ['Hub', 'A', 'B']\" in _stdout.splitlines()",
        ],
      ],
    ),
    C(
      T(
        'Now insert "Clinic" between Depot and Bridge. Keep every previous stop. Run and inspect the Ready line.',
        'Voeg nu "Clinic" tussen Depot en Bridge in. Behoud elke bestaande stop. Voer uit en bekijk de Ready-regel.',
        `route == ['Hub','Depot','Clinic','Bridge','Museum'] and ${method("insert")}`,
        "After Hub is inserted, Depot is at 1 and Bridge is at 2. Insert before Bridge.",
        "Na het invoegen van Hub staat Depot op 1 en Bridge op 2. Voeg vóór Bridge in.",
        "Recalculate positions after the first insertion; do not replace or remove a stop.",
        "Bereken de posities opnieuw na de eerste invoeging; vervang of verwijder geen stop.",
      ),
      [
        [
          { route: ["A", "B", "C", "D"] },
          "route == ['Hub','A','Clinic','B','C','D']",
        ],
      ],
    ),
    T(
      'Store the item now at index 3 in `shifted`, then print it with the label "Shifted stop:". It should be Bridge.',
      'Bewaar het item dat nu op index 3 staat in `shifted` en print het met het label "Shifted stop:". Dit hoort Bridge te zijn.',
      "shifted == route[3] == 'Bridge' and 'Shifted stop: Bridge' in _stdout.splitlines()",
      "Use a lookup after both insertions: route[3].",
      "Vraag de waarde na beide invoegingen op met route[3].",
      "Read the final route at index 3 and include the selected item in your report.",
      "Lees index 3 uit de uiteindelijke route en neem het gekozen item op in je rapport.",
    ),
  ],
  solutionNote: loc(
    "Hub shifts every original stop right. Clinic shifts Bridge and Museum again. The intermediate output and final lookup make those moves visible rather than relying on a guessed final literal.",
    "Hub schuift elke oorspronkelijke stop naar rechts. Clinic schuift Bridge en Museum opnieuw op. De tussenliggende output en de laatste opvraag maken die verschuivingen zichtbaar.",
  ),
});

G(g, 3, {
  titleNl: "Verwijder een klus en bewaar wat eruit ging",
  intro: loc(
    "The last job in a queue is canceled and the first job is ready to process. You need both the remaining queue and a record of the removed jobs. pop() removes an item and returns that same item, so one call can update the list and supply a value for a report.",
    "De laatste klus in een wachtrij wordt geannuleerd en de eerste kan worden verwerkt. Je hebt zowel de resterende wachtrij als een overzicht van de verwijderde klussen nodig. pop() verwijdert een element en geeft datzelfde element terug: één aanroep wijzigt de list en levert een waarde voor een rapport.",
  ),
  sections: [
    S(
      "Default end, optional index",
      "Standaard achteraan, optioneel op index",
      "With no argument, pop removes the last element. With an index, it removes that position and shifts later elements left. Store the return value before you need it: printing the shortened list does not tell you everything that was removed.",
      "Zonder argument verwijdert pop het laatste element. Met een index verwijdert het die positie en schuiven latere elementen naar links. Bewaar de return value: alleen de ingekorte list printen vertelt niet alles over wat werd verwijderd.",
      'jobs = ["wash", "dry", "fold"]\ncanceled = jobs.pop()\ncurrent = jobs.pop(0)\nprint(canceled, current)\nprint(jobs)',
      "fold wash\n['dry']",
    ),
    S(
      "A position is not a value",
      "Een positie is geen waarde",
      "pop(2) removes index 2; remove(2) searches for the value 2. An invalid index or popping an empty list raises IndexError. Try a deliberately invalid pop in the console, then repair it. Keep the actual program valid while completing its checks.",
      "pop(2) verwijdert index 2; remove(2) zoekt de waarde 2. Een ongeldige index of pop op een lege list geeft IndexError. Probeer een ongeldige pop in de console en herstel die daarna. Houd het eigenlijke programma geldig terwijl je de taken afrondt.",
    ),
  ],
  starter:
    'jobs = ["scan", "pack", "label", "test"]\nprint("Queued:", jobs)\n# Cancel the last job and keep its name.\n# Take the first remaining job for processing.\nprint("Remaining:", jobs)\n',
  solution:
    'jobs = ["scan", "pack", "label", "test"]\nprint("Queued:", jobs)\ncanceled = jobs.pop()\ncurrent = jobs.pop(0)\nprint("Remaining:", jobs)\nprint("Canceled:", canceled)\nprint("Processing:", current)\n',
  steps: [
    C(
      T(
        "Cancel the last job using `pop()` and save its returned name in `canceled`. Run to see the shorter queue.",
        "Annuleer de laatste klus met `pop()` en bewaar de teruggegeven naam in `canceled`. Voer uit om de kortere wachtrij te zien.",
        `canceled == 'test' and ${method("pop")}`,
        "Assign the call itself: canceled = jobs.pop(). Do not call it twice.",
        "Sla de aanroep zelf op: canceled = jobs.pop(). Roep de method niet twee keer aan.",
        "Keep the actual removed item in canceled; a second pop would remove an extra job.",
        "Bewaar het werkelijk verwijderde item in canceled; een tweede pop zou nog een klus verwijderen.",
      ),
      [[{ jobs: ["a", "b", "c"] }, "canceled == 'c'"]],
    ),
    C(
      T(
        "Use another `pop()` to take the first remaining job. Store its name in `current`; jobs should then contain pack and label.",
        "Gebruik nog een `pop()` om de eerste resterende klus te pakken. Bewaar de naam in `current`; jobs hoort daarna pack en label te bevatten.",
        "current == 'scan' and jobs == ['pack','label']",
        "The front of a list is index 0, even after the last item was removed.",
        "De voorkant van een list is index 0, ook nadat het laatste element is verwijderd.",
        "Remove the first remaining item and retain the middle jobs in their original order.",
        "Verwijder het eerste resterende item en behoud de middelste klussen in hun oorspronkelijke volgorde.",
      ),
      [
        [
          { jobs: ["a", "b", "c", "d", "e"] },
          "current == 'a' and jobs == ['b','c','d']",
        ],
      ],
    ),
    T(
      'Finish the report with `print("Canceled:", canceled)` and `print("Processing:", current)`. Keep the Remaining line after both removals.',
      'Maak het rapport af met `print("Canceled:", canceled)` en `print("Processing:", current)`. Laat de Remaining-regel na beide verwijderingen staan.',
      "('Remaining: ' + str(jobs)) in _stdout.splitlines() and 'Canceled: test' in _stdout.splitlines() and 'Processing: scan' in _stdout.splitlines()",
      "The stored strings survive later list changes; print those variables rather than popping again.",
      "De bewaarde strings blijven bestaan na latere list-wijzigingen; print die variabelen in plaats van opnieuw pop aan te roepen.",
      "Report both removed names and the remaining two jobs without removing anything else.",
      "Rapporteer beide verwijderde namen en de twee resterende klussen zonder nog iets te verwijderen.",
    ),
  ],
  solutionNote: loc(
    "Each pop has two observable effects: the queue becomes shorter and its return value is assigned to a name. The report uses those saved names, so reporting does not change the queue again.",
    "Elke pop heeft twee zichtbare effecten: de wachtrij wordt korter en de return value wordt aan een naam gekoppeld. Het rapport gebruikt die namen en verandert de wachtrij dus niet opnieuw.",
  ),
});

G(g, 4, {
  titleNl: "Nummer werkstations met range",
  intro: loc(
    "A workshop has a configurable number of stations. Typing every station number by hand creates work each time that number changes. range(stop) describes consecutive integers beginning at zero and stopping before stop. A range object is a compact description, not a list literal.",
    "Een werkplaats heeft een instelbaar aantal stations. Alle stationsnummers handmatig typen levert extra werk op zodra dat aantal verandert. range(stop) beschrijft opeenvolgende gehele getallen vanaf nul tot vóór stop. Een range-object is een compacte beschrijving, geen list-literal.",
  ),
  sections: [
    S(
      "One boundary, two useful forms",
      "Eén grens, twee bruikbare vormen",
      "range(4) contains the values 0, 1, 2 and 3. Printing the object shows its boundaries; list(...) materializes the values as a list. Keep those forms distinct: the range is the recipe and the list is the expanded result.",
      "range(4) bevat de waarden 0, 1, 2 en 3. Het object printen toont de grenzen; list(...) werkt de waarden uit tot een list. Houd die vormen uit elkaar: de range is het recept en de list het uitgewerkte resultaat.",
      "numbers = range(4)\nprint(numbers)\nprint(list(numbers))",
      "range(0, 4)\n[0, 1, 2, 3]",
    ),
    S(
      "The last value is one less",
      "De laatste waarde is één lager",
      "With five stations numbered from zero, the last station is 4. To include a last value of 5 you would need stop 6. The tasks assume at least one station; range(0) is empty, so it has no last element to look up.",
      "Bij vijf stations die vanaf nul worden genummerd, is het laatste station 4. Om 5 als laatste waarde op te nemen heb je stop 6 nodig. De taken gaan uit van minstens één station; range(0) is leeg en heeft dus geen laatste element om op te vragen.",
    ),
  ],
  starter:
    'station_count = 5\nstation_numbers = range(3)\nprint("Range:", station_numbers)\n# Expand the range into a list, then inspect the final number.\n',
  solution:
    'station_count = 5\nstation_numbers = range(station_count)\nprint("Range:", station_numbers)\nstation_list = list(station_numbers)\nprint("Stations:", station_list)\nlast_station = station_list[-1]\nprint("Last station:", last_station)\n',
  steps: [
    C(
      T(
        "Repair `station_numbers` so it remains a range object but uses `station_count` as its excluded stop. Run and inspect the Range line.",
        "Herstel `station_numbers` zodat het een range-object blijft, maar `station_count` als uitgesloten stop gebruikt. Voer uit en bekijk de Range-regel.",
        "type(station_numbers) is range and station_numbers == range(station_count) and station_count == 5",
        "Pass station_count to range without converting the result yet.",
        "Geef station_count mee aan range zonder het resultaat al om te zetten.",
        "Generate a range from zero using the configured count, rather than typing fixed values.",
        "Maak een range vanaf nul met het ingestelde aantal in plaats van vaste waarden te typen.",
      ),
      [
        [
          { station_count: 1 },
          "type(station_numbers) is range and list(station_numbers) == [0]",
        ],
        [{ station_count: 8 }, "station_numbers == range(8)"],
      ],
    ),
    C(
      T(
        'Create `station_list` by converting `station_numbers` with `list()`. Print it with "Stations:" to see all generated numbers.',
        'Maak `station_list` door `station_numbers` met `list()` om te zetten. Print deze met "Stations:" om alle gegenereerde nummers te zien.',
        "station_list == [0,1,2,3,4] and 'Stations: [0, 1, 2, 3, 4]' in _stdout.splitlines()",
        "list receives the range object as its single argument.",
        "list krijgt het range-object als enige argument.",
        "Convert the range into a list and display it; printing only the range boundaries is not the expanded result.",
        "Zet de range om in een list en toon die; alleen de range-grenzen printen is niet het uitgewerkte resultaat.",
      ),
      [[{ station_count: 7 }, "station_list == list(range(7))"]],
    ),
    C(
      T(
        'Read the last item into `last_station` and print it with "Last station:". Then try station_count = 1 in the console or editor and explain why the last value is 0; restore the supplied count before submitting.',
        'Lees het laatste item uit naar `last_station` en print het met "Last station:". Probeer daarna station_count = 1 in de console of editor en verklaar waarom de laatste waarde 0 is; herstel het meegeleverde aantal voordat je inlevert.',
        "last_station == 4 and 'Last station: 4' in _stdout.splitlines()",
        "A negative index still selects the end after the station count changes.",
        "Een negatieve index kiest nog steeds het einde nadat het aantal stations verandert.",
        "Read the last generated value instead of assuming it equals the station count.",
        "Lees de laatste gegenereerde waarde uit in plaats van aan te nemen dat die gelijk is aan het aantal stations.",
      ),
      [
        [{ station_count: 1 }, "last_station == 0"],
        [{ station_count: 8 }, "last_station == 7"],
      ],
    ),
  ],
  solutionNote: loc(
    "The count drives the range, the range drives the list, and the list supplies its last value. Changing the count therefore updates all three results without editing separate literals.",
    "Het aantal bepaalt de range, de range bepaalt de list en de list levert de laatste waarde. Een ander aantal werkt daardoor door in alle drie resultaten zonder losse literals te wijzigen.",
  ),
});

G(g, 5, {
  titleNl: "Bouw een rooster met begin, grens en stap",
  intro: loc(
    "A shuttle starts at a chosen hour and leaves at a regular interval. range(start, stop, step) expresses that rule directly. Start is included, stop is excluded, and step is the distance from one generated value to the next.",
    "Een shuttle begint op een gekozen uur en vertrekt daarna met vaste tussenpozen. range(start, stop, step) drukt die regel direct uit. Start telt mee, stop is uitgesloten en step is het verschil tussen opeenvolgende waarden.",
  ),
  sections: [
    S(
      "Stop is a boundary, not a promised final value",
      "Stop is een grens, geen beloofde eindwaarde",
      "Add the step repeatedly until the next value would reach or pass stop. A boundary does not need to be one of the generated values. Keep the argument order start, stop, step; swapping the last two changes the rule.",
      "Tel de stap steeds op totdat de volgende waarde stop zou bereiken of voorbijgaan. De grens hoeft zelf niet in de reeks te vallen. Houd de volgorde start, stop, step aan; de laatste twee verwisselen verandert de regel.",
      "departures = range(7, 18, 3)\nprint(list(departures))",
      "[7, 10, 13, 16]",
    ),
    S(
      "Count down with a negative step",
      "Tel terug met een negatieve stap",
      "A positive step cannot move from a larger start toward a smaller stop, so that range is empty. Use a negative step to count down. To include zero, put the excluded stop below zero. Step zero is invalid and raises ValueError.",
      "Een positieve stap kan niet van een hoger begin naar een lagere stop bewegen; die range is leeg. Gebruik een negatieve stap om terug te tellen. Om nul op te nemen moet de uitgesloten stop onder nul liggen. Stap nul is ongeldig en geeft ValueError.",
      "print(list(range(3, -1)))\nprint(list(range(3, -1, -1)))",
      "[]\n[3, 2, 1, 0]",
    ),
  ],
  starter:
    'start = 6\nstop = 19\ninterval = 4\ndepartures = range(start, stop)\nprint("Departures:", list(departures))\n# This countdown currently has the wrong direction.\ncountdown = list(range(3, -1))\nprint("Countdown:", countdown)\n',
  solution:
    'start = 6\nstop = 19\ninterval = 4\ndepartures = range(start, stop, interval)\nprint("Departures:", list(departures))\nlast_departure = list(departures)[-1]\nprint("Last departure:", last_departure)\ncountdown = list(range(3, -1, -1))\nprint("Countdown:", countdown)\n',
  steps: [
    C(
      T(
        "Repair `departures` to use all three supplied settings. Its expanded values should be 6, 10, 14 and 18.",
        "Herstel `departures` zodat alle drie instellingen worden gebruikt. De uitgewerkte waarden horen 6, 10, 14 en 18 te zijn.",
        "type(departures) is range and departures == range(start, stop, interval) and list(departures) == [6,10,14,18]",
        "The interval is the third argument, after the excluded stop.",
        "De tussenpoos is het derde argument, na de uitgesloten stop.",
        "Build the schedule from start, stop and interval; do not hard-code this one schedule.",
        "Bouw het rooster op uit start, stop en interval; leg niet alleen dit ene rooster vast.",
      ),
      [[{ start: 8, stop: 17, interval: 3 }, "list(departures) == [8,11,14]"]],
    ),
    C(
      T(
        'Read the final generated hour into `last_departure`, then print it with "Last departure:". Derive it from the range instead of using stop - 1.',
        'Lees het laatste gegenereerde uur uit naar `last_departure` en print het met "Last departure:". Leid het af uit de range in plaats van stop - 1 te gebruiken.',
        "last_departure == 18 and 'Last departure: 18' in _stdout.splitlines()",
        "Convert the range to a list and select its last item. The final value need not be one below stop.",
        "Zet de range om in een list en kies het laatste item. De laatste waarde ligt niet altijd één onder stop.",
        "Select the last scheduled hour; the excluded boundary is not itself a departure.",
        "Kies het laatste geplande uur; de uitgesloten grens is zelf geen vertrek.",
      ),
      [[{ start: 8, stop: 17, interval: 3 }, "last_departure == 14"]],
    ),
    T(
      "Repair `countdown` to contain 3, 2, 1, 0, using a negative step. Keep its Countdown print and run the complete program.",
      "Herstel `countdown` zodat deze 3, 2, 1, 0 bevat, met een negatieve stap. Behoud de Countdown-print en voer het hele programma uit.",
      "countdown == [3,2,1,0] and 'Countdown: [3, 2, 1, 0]' in _stdout.splitlines()",
      "The start and stop are already suitable. Add a step of -1.",
      "Het begin en de stop zijn al geschikt. Voeg een stap van -1 toe.",
      "Move down one unit each time and include zero before reaching the excluded -1 boundary.",
      "Ga telkens één omlaag en neem nul op voordat de uitgesloten grens -1 wordt bereikt.",
    ),
  ],
  solutionNote: loc(
    "The forward schedule follows configurable intervals. The last value comes from the generated sequence, not arithmetic on the boundary. The countdown demonstrates that step direction controls whether a range contains any values.",
    "Het rooster volgt instelbare tussenpozen. De laatste waarde komt uit de gegenereerde reeks, niet uit een berekening met de grens. De aftelling laat zien dat de staprichting bepaalt of een range waarden bevat.",
  ),
});

G(g, 6, {
  titleNl: "Tel elementen, geen indexnummers",
  intro: loc(
    "A monitoring report needs counts: how many readings arrived, how many scheduled samples fit, and how many station records exist. len(collection) returns an integer count without changing the collection. A count of five means the valid positive indexes end at four.",
    "Een monitorrapport heeft aantallen nodig: hoeveel metingen kwamen binnen, hoeveel geplande meetmomenten passen erin en hoeveel stationsrecords bestaan er? len(collection) geeft een geheel aantal terug zonder de verzameling te wijzigen. Bij vijf elementen eindigen de geldige positieve indexes bij vier.",
  ),
  sections: [
    S(
      "Count a range without expanding it",
      "Tel een range zonder die uit te werken",
      "len works on a range object directly. Larger gaps can produce fewer values over the same interval. Count the actual sequence rather than assuming stop - start is always the answer.",
      "len werkt direct op een range-object. Grotere stappen kunnen binnen hetzelfde interval minder waarden opleveren. Tel de werkelijke reeks in plaats van aan te nemen dat stop - start altijd het antwoord is.",
      "regular = range(1, 18, 3)\nsparse = range(1, 18, 6)\nprint(len(regular), len(sparse))",
      "6 3",
    ),
    S(
      "Nested lists have several possible counts",
      "Geneste lists hebben verschillende aantallen",
      "len(rows) counts the outer records. len(rows[0]) counts fields in the first record. Neither expression automatically totals every nested value. First decide which level your report needs.",
      "len(rows) telt de buitenste records. len(rows[0]) telt de velden in het eerste record. Geen van beide telt automatisch alle geneste waarden op. Bepaal eerst welk niveau je rapport nodig heeft.",
      'rows = [["A", 12, True], ["B", 8, False]]\nprint(len(rows))\nprint(len(rows[0]))\nprint(len([]))',
      "2\n3\n0",
    ),
  ],
  starter:
    'readings = [18, 19, 18, 21, 20, 19]\ntick_step = 3\nticks = range(2, 32, tick_step)\nstations = [["North", 4, True], ["South", 7, False]]\nreading_count = 0\nprint("Readings:", reading_count)\n# Count the schedule, compare a sparser one, then count station records.\n',
  solution:
    'readings = [18, 19, 18, 21, 20, 19]\ntick_step = 3\nticks = range(2, 32, tick_step)\nstations = [["North", 4, True], ["South", 7, False]]\nreading_count = len(readings)\nprint("Readings:", reading_count)\ntick_count = len(ticks)\nprint("Scheduled:", tick_count)\nsparse_ticks = range(2, 32, tick_step * 2)\nsparse_count = len(sparse_ticks)\nprint("Sparse:", sparse_count)\nstation_count = len(stations)\nfield_count = len(stations[0])\nprint("Stations and fields:", station_count, field_count)\n',
  steps: [
    C(
      T(
        "Replace the placeholder `reading_count` with the length of `readings`. Keep the Readings print; duplicates still count as separate elements.",
        "Vervang de tijdelijke `reading_count` door de lengte van `readings`. Behoud de Readings-print; dubbele waarden tellen nog steeds als aparte elementen.",
        "reading_count == 6 and 'Readings: 6' in _stdout.splitlines()",
        "Call len(readings), not readings.len().",
        "Roep len(readings) aan, niet readings.len().",
        "Count every list element, including repeated measurements.",
        "Tel elk list-element mee, inclusief herhaalde metingen.",
      ),
      [
        [{ readings: [] }, "reading_count == 0"],
        [{ readings: [5, 5, 5] }, "reading_count == 3"],
      ],
    ),
    C(
      T(
        'Store `len(ticks)` in `tick_count` and print it with "Scheduled:". You do not need to convert the range into a list.',
        'Bewaar `len(ticks)` in `tick_count` en print dit met "Scheduled:". Je hoeft de range niet in een list om te zetten.',
        "tick_count == 10 and 'Scheduled: 10' in _stdout.splitlines()",
        "ticks already represents the sequence; len can count it directly.",
        "ticks stelt de reeks al voor; len kan die rechtstreeks tellen.",
        "Count generated moments, not the numeric distance between the endpoints.",
        "Tel de gegenereerde momenten, niet de numerieke afstand tussen de grenzen.",
      ),
      [
        [{ tick_step: 5 }, "tick_count == 6"],
        [{ tick_step: 4 }, "tick_count == 8"],
      ],
    ),
    C(
      T(
        'Create `sparse_ticks` over the same boundaries but double `tick_step`. Store its length in `sparse_count` and print "Sparse:" followed by that count.',
        'Maak `sparse_ticks` met dezelfde grenzen maar het dubbele van `tick_step`. Bewaar de lengte in `sparse_count` en print "Sparse:" gevolgd door dat aantal.',
        "type(sparse_ticks) is range and sparse_ticks == range(2,32,6) and sparse_count == 5 and 'Sparse: 5' in _stdout.splitlines()",
        "Use tick_step * 2 as the third range argument, then call len on the new range.",
        "Gebruik tick_step * 2 als derde range-argument en roep daarna len aan op de nieuwe range.",
        "Keep both schedules; calculate the sparse count from its own doubled-step range.",
        "Behoud beide roosters; bereken het kleinere aantal uit de eigen range met dubbele stap.",
      ),
      [
        [
          { tick_step: 4 },
          "sparse_ticks == range(2,32,8) and sparse_count == 4",
        ],
      ],
    ),
    C(
      T(
        'Create `station_count` for the number of station records and `field_count` for the first record’s fields. Print both with "Stations and fields:".',
        'Maak `station_count` voor het aantal stationsrecords en `field_count` voor de velden in het eerste record. Print beide met "Stations and fields:".',
        "station_count == 2 and field_count == 3 and 'Stations and fields: 2 3' in _stdout.splitlines()",
        "Compare len(stations) with len(stations[0]).",
        "Vergelijk len(stations) met len(stations[0]).",
        "Distinguish rows from fields; the outer list counts each whole record once.",
        "Maak onderscheid tussen rijen en velden; de buitenste list telt elk volledig record één keer.",
      ),
      [
        [
          {
            stations: [
              ["A", 1],
              ["B", 2],
              ["C", 3],
            ],
          },
          "station_count == 3 and field_count == 2",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "len measures the supplied collection, so it handles duplicate readings and changed range steps correctly. Nested counts name their level explicitly: station records versus fields in one record.",
    "len meet de meegegeven verzameling en verwerkt daardoor dubbele metingen en gewijzigde range-stappen correct. Bij geneste aantallen benoemen we het niveau: stationsrecords tegenover velden in één record.",
  ),
});

G(g, 7, {
  titleNl: "Selecteer een meetvenster met een slice",
  intro: loc(
    "A sensor log has six readings, but a report needs only a consecutive window. A slice uses two boundaries: readings[start:stop]. Start is included and stop is excluded. The result is a new list; selecting a window does not remove readings from the log.",
    "Een sensorlog heeft zes metingen, maar een rapport heeft alleen een aaneengesloten venster nodig. Een slice gebruikt twee grenzen: readings[start:stop]. Start telt mee en stop is uitgesloten. Het resultaat is een nieuwe list; een venster kiezen verwijdert geen metingen uit het log.",
  ),
  sections: [
    S(
      "Think in positions and boundaries",
      "Denk in posities en grenzen",
      "To include indexes 1, 2 and 3, stop at 4. The number of selected positions is stop - start when both boundaries are inside the list and increasing. A comma is not a slice separator: use a colon.",
      "Om indexes 1, 2 en 3 mee te nemen, stop je op 4. Het aantal gekozen posities is stop - start als beide grenzen binnen de list liggen en oplopen. Een komma scheidt geen slice-grenzen: gebruik een dubbele punt.",
      "readings = [30, 12, 16, 14, 28]\nwindow = readings[1:4]\nprint(window)\nprint(readings)",
      "[12, 16, 14]\n[30, 12, 16, 14, 28]",
    ),
    S(
      "A flat slice can be edited separately",
      "Een vlakke slice kun je apart wijzigen",
      "Replacing an element in a sliced list does not replace that element in the original list. This is useful for a trial correction. This example uses numbers; a slice is only a shallow copy, so nested mutable records need more care. Equal slice boundaries select no elements and produce [].",
      "Een element vervangen in de geslicete list vervangt dat element niet in de oorspronkelijke list. Dat is handig voor een proefcorrectie. Dit voorbeeld gebruikt getallen; een slice is alleen een oppervlakkige kopie, dus bij geneste wijzigbare records is meer aandacht nodig. Gelijke slice-grenzen kiezen geen elementen en leveren [] op.",
      "source = [4, 8, 12]\ntrial = source[0:2]\ntrial[0] = 99\nprint(trial)\nprint(source)\nprint(source[2:2])",
      "[99, 8]\n[4, 8, 12]\n[]",
    ),
  ],
  starter:
    'readings = [12, 18, 9, 14, 17, 11]\nwindow = readings[1:3]\nprint("Window:", window)\n# Make a trial correction in the slice after the Window print.\nprint("Original:", readings)\n',
  solution:
    'readings = [12, 18, 9, 14, 17, 11]\nwindow = readings[1:4]\nprint("Window:", window)\nwindow[0] = 99\nprint("Trial:", window)\nprint("Original:", readings)\nempty_window = readings[4:4]\nprint("Empty:", empty_window)\n',
  steps: [
    C(
      T(
        "Repair `window` to select indexes 1 through 3 inclusive. Keep the Window print before later edits; it should show [18, 9, 14].",
        "Herstel `window` zodat indexes 1 tot en met 3 worden gekozen. Laat de Window-print vóór latere wijzigingen staan; deze hoort [18, 9, 14] te tonen.",
        "'Window: [18, 9, 14]' in _stdout.splitlines()",
        "The final included index is 3, so the excluded stop must be 4.",
        "De laatste inbegrepen index is 3, dus de uitgesloten stop moet 4 zijn.",
        "Select three consecutive readings starting at index 1 and print that original window.",
        "Selecteer drie opeenvolgende metingen vanaf index 1 en print dat oorspronkelijke venster.",
      ),
      [
        [
          { readings: [2, 4, 6, 8, 10, 12] },
          "'Window: [4, 6, 8]' in _stdout.splitlines()",
        ],
      ],
    ),
    C(
      T(
        'After that print, replace only the first value in `window` with 99. Print it with "Trial:". Keep `readings` unchanged and its Original print.',
        'Vervang na die print alleen de eerste waarde in `window` door 99. Print deze met "Trial:". Laat `readings` ongewijzigd en behoud de Original-print.',
        "window == [99,9,14] and readings == [12,18,9,14,17,11] and 'Trial: [99, 9, 14]' in _stdout.splitlines()",
        "Edit window[0], not readings[1]. The slice is a separate outer list.",
        "Wijzig window[0], niet readings[1]. De slice is een aparte buitenste list.",
        "Apply the trial correction to the slice while preserving every original reading.",
        "Pas de proefcorrectie op de slice toe en behoud elke oorspronkelijke meting.",
      ),
      [
        [
          { readings: [2, 4, 6, 8, 10, 12] },
          "window == [99,6,8] and readings == [2,4,6,8,10,12]",
        ],
      ],
    ),
    T(
      'Create `empty_window` with the slice `readings[4:4]` and print it with "Empty:". Predict its length before running.',
      'Maak `empty_window` met de slice `readings[4:4]` en print deze met "Empty:". Voorspel de lengte voordat je uitvoert.',
      "empty_window == [] and 'Empty: []' in _stdout.splitlines()",
      "Both boundaries are the same; no position lies between them.",
      "Beide grenzen zijn gelijk; er ligt geen positie tussen.",
      "An empty slice is [], not one selected element and not an error.",
      "Een lege slice is [], niet één geselecteerd element en ook geen fout.",
    ),
  ],
  solutionNote: loc(
    "The Window line records the selection before correction. The Trial line then shows a changed copy while the Original line stays intact. Equal boundaries demonstrate that slicing can legitimately produce an empty result.",
    "De Window-regel legt de selectie vóór de correctie vast. De Trial-regel toont daarna een gewijzigde kopie terwijl Original intact blijft. Gelijke grenzen laten zien dat een slice terecht een leeg resultaat kan opleveren.",
  ),
});

G(g, 8, {
  titleNl: "Kies het begin, einde of alles behalve de staart",
  intro: loc(
    "An activity log grows during the day. A fixed ending index will eventually point to the wrong place. Omitted boundaries and negative indexes let a report keep asking for the first or last few events even as the log grows.",
    "Een activiteitenlog groeit gedurende de dag. Een vaste eindindex wijst uiteindelijk naar de verkeerde plek. Weggelaten grenzen en negatieve indexes laten een rapport steeds de eerste of laatste paar gebeurtenissen opvragen, ook als het log groeit.",
  ),
  sections: [
    S(
      "Three slices, three different questions",
      "Drie slices, drie verschillende vragen",
      "items[:2] selects the first two. items[-2:] starts two positions from the end and continues to the end. items[:-2] starts at the beginning and excludes the final two. The same number on the other side of the colon changes the question.",
      "items[:2] kiest de eerste twee. items[-2:] begint twee posities voor het einde en loopt door tot het einde. items[:-2] begint vooraan en sluit de laatste twee uit. Hetzelfde getal aan de andere kant van de dubbele punt verandert de vraag.",
      'events = ["a", "b", "c", "d", "e"]\nprint(events[:2])\nprint(events[-2:])\nprint(events[:-2])',
      "['a', 'b']\n['d', 'e']\n['a', 'b', 'c']",
    ),
    S(
      "Short lists and the zero trap",
      "Korte lists en de valkuil van nul",
      "Slices stop at the list boundaries, so asking for more available elements simply returns what exists. Unlike an individual out-of-range index, that is not an IndexError. Be careful with a configurable tail count of zero: -0 is 0, so items[-0:] means the whole list, not an empty tail.",
      "Slices stoppen bij de grenzen van de list; als je meer elementen vraagt dan beschikbaar zijn, krijg je wat er is. Anders dan bij één ongeldige index geeft dit geen IndexError. Let op bij een instelbaar staartaantal nul: -0 is 0, dus items[-0:] betekent de hele list, niet een lege staart.",
      'events = ["only"]\nprint(events[:3])\nprint(events[-2:])\nprint(events[:-2])\nprint(events[-0:])',
      "['only']\n['only']\n[]\n['only']",
    ),
  ],
  starter:
    'events = ["open", "load", "scan", "pack", "close", "archive"]\nprint("Full log:", events)\n# Build three reports without editing the log.\n',
  solution:
    'events = ["open", "load", "scan", "pack", "close", "archive"]\nprint("Full log:", events)\nfirst_two = events[:2]\nlast_two = events[-2:]\nwithout_last_two = events[:-2]\nprint("Beginning:", first_two)\nprint("Ending:", last_two)\nprint("Earlier:", without_last_two)\n',
  steps: [
    C(
      T(
        'Create `first_two` as a slice containing the first two events, then print it with "Beginning:".',
        'Maak `first_two` als slice met de eerste twee gebeurtenissen en print deze met "Beginning:".',
        "first_two == ['open','load'] and ('Beginning: ' + str(first_two)) in _stdout.splitlines()",
        "Omit the start boundary and stop before index 2.",
        "Laat de begingrens weg en stop vóór index 2.",
        "Take the beginning of the supplied log rather than constructing a fixed report.",
        "Neem het begin van het meegegeven log in plaats van een vast rapport te maken.",
      ),
      [
        [{ events: ["a", "b", "c"] }, "first_two == ['a','b']"],
        [{ events: [] }, "first_two == []"],
      ],
    ),
    C(
      T(
        'Create `last_two` from the final two events and print "Ending:" followed by that slice. It must still work when events grows.',
        'Maak `last_two` uit de laatste twee gebeurtenissen en print "Ending:" gevolgd door die slice. Dit moet blijven werken als events groeit.',
        "last_two == ['close','archive'] and ('Ending: ' + str(last_two)) in _stdout.splitlines()",
        "Start at -2 and leave the stop boundary open.",
        "Begin op -2 en laat de stopgrens open.",
        "Anchor the selection at the end; a fixed start of 4 only fits this example.",
        "Veranker de selectie aan het einde; een vast begin van 4 past alleen bij dit voorbeeld.",
      ),
      [
        [
          { events: ["a", "b", "c", "d", "e", "f", "g"] },
          "last_two == ['f','g']",
        ],
        [{ events: ["only"] }, "last_two == ['only']"],
      ],
    ),
    C(
      T(
        'Create `without_last_two`, containing everything except the final two events. Print it with "Earlier:" and leave the full events list unchanged.',
        'Maak `without_last_two` met alles behalve de laatste twee gebeurtenissen. Print deze met "Earlier:" en laat de volledige list events ongewijzigd.',
        "without_last_two == ['open','load','scan','pack'] and events == ['open','load','scan','pack','close','archive'] and ('Earlier: ' + str(without_last_two)) in _stdout.splitlines()",
        "Put -2 after the colon; you want to stop before the final two positions.",
        "Zet -2 na de dubbele punt; je wilt vóór de laatste twee posities stoppen.",
        "Exclude the tail with a slice, without popping items from the original log.",
        "Sluit de staart uit met een slice, zonder elementen uit het oorspronkelijke log te poppen.",
      ),
      [
        [
          { events: ["a", "b", "c", "d"] },
          "without_last_two == ['a','b'] and events == ['a','b','c','d']",
        ],
        [{ events: ["only"] }, "without_last_two == []"],
      ],
    ),
  ],
  solutionNote: loc(
    "The three reports share one input but answer different positional questions. Open boundaries adapt to length changes and slicing leaves the log available for other reports.",
    "De drie rapporten delen één invoer maar beantwoorden verschillende vragen over posities. Open grenzen passen zich aan een andere lengte aan en slicing houdt het log beschikbaar voor andere rapporten.",
  ),
});

G(g, 9, {
  titleNl: "Tel resultaten en vergelijk vóór en na",
  intro: loc(
    'A scanner records one status per package. len(statuses) tells you how many packages were scanned, while statuses.count("ok") tells you how many entries equal "ok". count returns an integer and leaves the list unchanged.',
    'Een scanner registreert één status per pakket. len(statuses) vertelt hoeveel pakketten zijn gescand; statuses.count("ok") vertelt hoeveel waarden gelijk zijn aan "ok". count geeft een geheel getal terug en laat de list ongewijzigd.',
  ),
  sections: [
    S(
      "A saved count is a snapshot",
      "Een bewaard aantal is een momentopname",
      "If you append a new value later, an earlier integer count does not update itself. Call count again when you need a new total. An absent value has count zero; that is an ordinary result, not an error.",
      "Als je later een nieuwe waarde toevoegt, werkt een eerder geheel aantal zichzelf niet bij. Roep count opnieuw aan wanneer je een nieuw totaal nodig hebt. Een ontbrekende waarde heeft aantal nul; dat is een gewoon resultaat, geen fout.",
      'statuses = ["ok", "wait", "ok"]\nbefore = statuses.count("ok")\nstatuses.append("ok")\nafter = statuses.count("ok")\nprint(before, after)\nprint(statuses.count("error"))',
      "2 3\n0",
    ),
    S(
      "Count whole nested records",
      "Tel volledige geneste records",
      "A list can contain other lists. count compares each outer element with the entire value you provide. It does not search every field recursively. A matching row must have the same values in the same order.",
      "Een list kan andere lists bevatten. count vergelijkt elk buitenste element met de volledige meegegeven waarde. Het doorzoekt niet automatisch elk veld. Een overeenkomende rij moet dezelfde waarden in dezelfde volgorde bevatten.",
      'batches = [["ok", 2], ["wait", 1], ["ok", 2]]\nprint(batches.count(["ok", 2]))\nprint(batches.count("ok"))',
      "2\n0",
    ),
  ],
  starter:
    'statuses = ["ok", "wait", "ok", "error", "ok"]\nbatches = [["ok", 2], ["wait", 1], ["ok", 2], ["ok", 3]]\nprint("Statuses:", statuses)\n# Count current successes before appending the next successful scan.\n',
  solution:
    'statuses = ["ok", "wait", "ok", "error", "ok"]\nbatches = [["ok", 2], ["wait", 1], ["ok", 2], ["ok", 3]]\nprint("Statuses:", statuses)\nbefore = statuses.count("ok")\nstatuses.append("ok")\nafter = statuses.count("ok")\nprint("Successes:", before, after)\nmissing = statuses.count("offline")\nprint("Offline:", missing)\npair_count = batches.count(["ok", 2])\nprint("Matching batches:", pair_count)\n',
  steps: [
    C(
      T(
        'Use `count()` to save the current number of "ok" statuses in `before`. Keep this assignment before adding another scan.',
        'Gebruik `count()` om het huidige aantal "ok"-statussen in `before` te bewaren. Laat deze toewijzing vóór het toevoegen van een nieuwe scan staan.',
        `before == 3 and ${method("count")}`,
        'Count the exact string "ok", including its lowercase spelling.',
        'Tel de exacte string "ok", inclusief de kleine letters.',
        "Count matching statuses rather than the total number of entries.",
        "Tel de overeenkomende statussen in plaats van het totale aantal elementen.",
      ),
      [
        [{ statuses: ["wait", "ok"] }, "before == 1"],
        [{ statuses: [] }, "before == 0"],
      ],
    ),
    C(
      T(
        'Append one "ok" status. Count again into `after`, then print both snapshots with "Successes:". The earlier count should remain 3.',
        'Voeg één "ok"-status toe met append. Tel opnieuw naar `after` en print beide momentopnamen met "Successes:". Het eerdere aantal hoort 3 te blijven.',
        "after == 4 and before == 3 and statuses == ['ok','wait','ok','error','ok','ok'] and 'Successes: 3 4' in _stdout.splitlines()",
        "Store a new count after append; do not overwrite before.",
        "Bewaar een nieuw aantal na append; overschrijf before niet.",
        "Keep the earlier count and calculate a fresh count from the extended list.",
        "Behoud het eerdere aantal en bereken een nieuw aantal uit de aangevulde list.",
      ),
      [
        [
          { statuses: ["wait", "ok"] },
          "before == 1 and after == 2 and statuses == ['wait','ok','ok']",
        ],
      ],
    ),
    C(
      T(
        'Count "offline" into `missing` and print "Offline:" followed by that value. This status is absent from the supplied data.',
        'Tel "offline" naar `missing` en print "Offline:" gevolgd door die waarde. Deze status ontbreekt in de meegeleverde gegevens.',
        "missing == 0 and 'Offline: 0' in _stdout.splitlines()",
        "Call count even when you expect zero; the data may change.",
        "Roep count ook aan als je nul verwacht; de gegevens kunnen veranderen.",
        "Calculate the absence as a count instead of treating it as a missing-index error.",
        "Bereken de afwezigheid als een aantal in plaats van als een fout door een ontbrekende index.",
      ),
      [[{ statuses: ["offline", "ok", "offline"] }, "missing == 2"]],
    ),
    C(
      T(
        'Count the complete row ["ok", 2] in `batches`, save it as `pair_count`, and print it with "Matching batches:".',
        'Tel de volledige rij ["ok", 2] in `batches`, bewaar dit als `pair_count` en print het met "Matching batches:".',
        "pair_count == 2 and 'Matching batches: 2' in _stdout.splitlines()",
        "Pass the inner list as the argument to batches.count(...).",
        "Geef de binnenste list als argument mee aan batches.count(...).",
        'Count equal whole rows; ["ok", 3] is a different row and should not count.',
        'Tel gelijke volledige rijen; ["ok", 3] is een andere rij en hoort niet mee te tellen.',
      ),
      [
        [
          {
            batches: [
              ["ok", 2],
              ["ok", 3],
            ],
          },
          "pair_count == 1",
        ],
        [{ batches: [] }, "pair_count == 0"],
      ],
    ),
  ],
  solutionNote: loc(
    "Counts are values calculated at a particular moment. The second count sees the appended status; the first remains a useful snapshot. Counting an inner list compares the whole record rather than individual fields.",
    "Aantallen zijn waarden die op een bepaald moment worden berekend. De tweede telling ziet de toegevoegde status; de eerste blijft een bruikbare momentopname. Een binnenste list tellen vergelijkt het hele record, niet losse velden.",
  ),
});

G(g, 10, {
  titleNl: "Sorteer dezelfde list en begrijp None",
  intro: loc(
    "The dispatch desk wants numeric priorities and alphabetical labels. list.sort() rearranges the existing list. It returns None, because the result is stored in the list itself. Assigning that return value over the list name would lose your reference to the sorted list.",
    "De uitgiftebalie wil numerieke prioriteiten en alfabetische labels. list.sort() herschikt de bestaande list. De method geeft None terug, omdat het resultaat in de list zelf wordt bewaard. Die return value over de naam van de list heen opslaan zou je verwijzing naar de gesorteerde list verliezen.",
  ),
  sections: [
    S(
      "Observe both the list and the return value",
      "Bekijk zowel de list als de return value",
      "The default order is increasing for numbers. reverse=True requests decreasing order; it is not the same as simply reversing whatever order happened to be present. Another name for the same list sees the change too.",
      "De standaardvolgorde is oplopend voor getallen. reverse=True vraagt om aflopende volgorde; dat is niet hetzelfde als simpelweg de toevallige bestaande volgorde omdraaien. Een andere naam voor dezelfde list ziet de wijziging ook.",
      "priority = [4, 9, 2]\nalias = priority\nresult = priority.sort(reverse=True)\nprint(priority)\nprint(alias)\nprint(result)",
      "[9, 4, 2]\n[9, 4, 2]\nNone",
    ),
    S(
      "Method syntax and comparable values",
      "Method-syntaxis en vergelijkbare waarden",
      "sort(values) is not a built-in function; use values.sort(). Lowercase strings can be sorted alphabetically, but general string sorting follows character order, so capitalization matters. Python cannot generally order mixed strings and numbers; keep the values comparable in these tasks.",
      "sort(values) is geen ingebouwde functie; gebruik values.sort(). Strings met kleine letters kun je alfabetisch sorteren, maar strings volgen in het algemeen tekenvolgorde, dus hoofdletters tellen mee. Python kan strings en getallen meestal niet door elkaar ordenen; houd de waarden in deze taken vergelijkbaar.",
      'labels = ["tripod", "cable", "lamp"]\nlabels.sort()\nprint(labels)',
      "['cable', 'lamp', 'tripod']",
    ),
  ],
  starter:
    'priorities = [4, 1, 7, 3]\npriority_alias = priorities\nlabels = ["tripod", "cable", "lamp"]\n# Sort priorities before this print.\nprint("Increasing:", priorities)\n# Repair and activate this method call.\n# sort(labels)\n# Finally sort priorities in decreasing order and inspect its return value.\n',
  solution:
    'priorities = [4, 1, 7, 3]\npriority_alias = priorities\nlabels = ["tripod", "cable", "lamp"]\npriorities.sort()\nprint("Increasing:", priorities)\nlabels.sort()\nprint("Labels:", labels)\nresult = priorities.sort(reverse=True)\nprint("Decreasing:", priorities)\nprint("Return value:", result)\n',
  steps: [
    C(
      T(
        "Sort `priorities` in place in increasing order before the Increasing print. Keep the existing alias assignment.",
        "Sorteer `priorities` direct in oplopende volgorde vóór de Increasing-print. Behoud de bestaande alias-toewijzing.",
        `${method("sort")} and 'Increasing: [1, 3, 4, 7]' in _stdout.splitlines() and priority_alias is priorities`,
        "Call priorities.sort() on its own line. Do not assign the result back to priorities.",
        "Roep priorities.sort() op een eigen regel aan. Wijs het resultaat niet opnieuw aan priorities toe.",
        "Change the existing list rather than replacing its name or printing a separate sorted copy.",
        "Wijzig de bestaande list in plaats van de naam te vervangen of een aparte gesorteerde kopie te printen.",
      ),
      [
        [
          { priorities: [8, 2, 8, -1] },
          "'Increasing: [-1, 2, 8, 8]' in _stdout.splitlines() and priority_alias is priorities",
        ],
      ],
    ),
    C(
      T(
        'Activate and repair the commented `sort(labels)` call. Use the list method, then print "Labels:" followed by the alphabetical labels.',
        'Activeer en herstel de uitgecommentarieerde aanroep `sort(labels)`. Gebruik de list-method en print daarna "Labels:" gevolgd door de alfabetisch gesorteerde labels.',
        "labels == ['cable','lamp','tripod'] and ('Labels: ' + str(labels)) in _stdout.splitlines()",
        "Move labels before the dot: labels.sort(). Remove any indentation left by uncommenting.",
        "Zet labels vóór de punt: labels.sort(). Verwijder eventuele inspringing die na het weghalen van commentaar overblijft.",
        "Call sort on labels; a standalone sort name would cause NameError.",
        "Roep sort aan op labels; een losse naam sort zou NameError geven.",
      ),
      [[{ labels: ["z", "a", "m"] }, "labels == ['a','m','z']"]],
    ),
    C(
      T(
        'After the Increasing print, sort the same priorities list with `reverse=True`. Save the return value in `result`. Print "Decreasing:" with the list and "Return value:" with result.',
        'Sorteer na de Increasing-print dezelfde priorities-list met `reverse=True`. Bewaar de return value in `result`. Print "Decreasing:" met de list en "Return value:" met result.',
        "priorities == [7,4,3,1] and priority_alias is priorities and result is None and 'Decreasing: [7, 4, 3, 1]' in _stdout.splitlines() and 'Return value: None' in _stdout.splitlines()",
        "Assign to result, not priorities: result = priorities.sort(reverse=True).",
        "Wijs toe aan result, niet aan priorities: result = priorities.sort(reverse=True).",
        "Keep the list and its alias intact; the method changes them and returns None separately.",
        "Behoud de list en de alias; de method wijzigt de list en geeft afzonderlijk None terug.",
      ),
      [
        [
          { priorities: [8, 2, 8, -1] },
          "priorities == [8,8,2,-1] and priority_alias is priorities and result is None",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The printed Increasing snapshot remains valid after the later decreasing sort. Both names still refer to the same list. result contains None, making the distinction between mutation and return value explicit.",
    "De geprinte oplopende momentopname blijft geldig na de latere aflopende sortering. Beide namen verwijzen nog steeds naar dezelfde list. result bevat None, waardoor het verschil tussen wijzigen en teruggeven zichtbaar wordt.",
  ),
});

G(g, 11, {
  titleNl: "Maak een ranglijst zonder aankomstvolgorde te verliezen",
  intro: loc(
    "Arrival order matters for a log, but a report also needs the smallest and largest readings. sorted(arrival) returns a new ordered list while leaving arrival alone. Keeping both lists lets different views of the same data coexist.",
    "Aankomstvolgorde is belangrijk voor een log, maar een rapport heeft ook de kleinste en grootste metingen nodig. sorted(arrival) geeft een nieuwe gesorteerde list terug en laat arrival met rust. Door beide lists te bewaren kunnen verschillende weergaven van dezelfde gegevens naast elkaar bestaan.",
  ),
  sections: [
    S(
      "Function syntax, separate result",
      "Functie-syntaxis, apart resultaat",
      "Pass the source list inside sorted(...), then save the returned list. The source keeps its order, even if the returned list is later edited. Using arrival.sort() instead would change the source and return None.",
      "Geef de bronlist mee tussen de haakjes van sorted(...) en bewaar de teruggegeven list. De bron behoudt haar volgorde, ook als de nieuwe list later verandert. arrival.sort() zou juist de bron wijzigen en None teruggeven.",
      "arrival = [13, 5, 9]\nranked = sorted(arrival)\nranked[0] = 0\nprint(arrival)\nprint(ranked)",
      "[13, 5, 9]\n[0, 9, 13]",
    ),
    S(
      "Choose the direction for each report",
      "Kies per rapport de sorteerrichting",
      "sorted also accepts reverse=True. Build an increasing report and a decreasing report from the same arrival log, then slice the decreasing report to select its two largest values. Equal values remain separate elements.",
      "sorted accepteert ook reverse=True. Maak een oplopend en een aflopend rapport uit hetzelfde aankomstlog en neem vervolgens een slice van het aflopende rapport voor de twee grootste waarden. Gelijke waarden blijven aparte elementen.",
      "values = [3, 8, 8, 1]\nprint(sorted(values))\nprint(sorted(values, reverse=True)[:2])",
      "[1, 3, 8, 8]\n[8, 8]",
    ),
  ],
  starter:
    'arrival = [8, 2, 5, 9, 2]\nprint("Arrival:", arrival)\n# Create separate increasing and decreasing reports.\n',
  solution:
    'arrival = [8, 2, 5, 9, 2]\nprint("Arrival:", arrival)\nranked = sorted(arrival)\nprint("Increasing:", ranked)\ndescending = sorted(arrival, reverse=True)\nprint("Decreasing:", descending)\ntop_two = descending[:2]\nprint("Top two:", top_two)\nprint("Arrival still:", arrival)\n',
  steps: [
    C(
      T(
        'Create `ranked` using `sorted(arrival)` and print it with "Increasing:". Keep arrival in its original order.',
        'Maak `ranked` met `sorted(arrival)` en print deze met "Increasing:". Houd arrival in de oorspronkelijke volgorde.',
        "ranked == [2,2,5,8,9] and ranked is not arrival and arrival == [8,2,5,9,2] and 'Increasing: [2, 2, 5, 8, 9]' in _stdout.splitlines()",
        "Save the return value of the built-in function rather than calling the in-place method.",
        "Bewaar de return value van de ingebouwde functie in plaats van de method die direct wijzigt aan te roepen.",
        "Return a separate ordered list while preserving arrival order and duplicates.",
        "Maak een aparte geordende list en behoud aankomstvolgorde en dubbele waarden.",
      ),
      [
        [
          { arrival: [7, -1, 7, 3] },
          "ranked == [-1,3,7,7] and arrival == [7,-1,7,3] and ranked is not arrival",
        ],
      ],
    ),
    C(
      T(
        'Create another new list, `descending`, using `sorted()` with `reverse=True`. Print it with "Decreasing:" and leave ranked unchanged.',
        'Maak nog een nieuwe list, `descending`, met `sorted()` en `reverse=True`. Print deze met "Decreasing:" en laat ranked ongewijzigd.',
        "descending == [9,8,5,2,2] and ranked == [2,2,5,8,9] and descending is not ranked and 'Decreasing: [9, 8, 5, 2, 2]' in _stdout.splitlines()",
        "A fresh sorted call gives an independent result; do not sort ranked in place.",
        "Een nieuwe sorted-aanroep geeft een onafhankelijk resultaat; sorteer ranked niet direct.",
        "Keep both reports usable: increasing order in ranked, decreasing order in descending.",
        "Houd beide rapporten bruikbaar: oplopend in ranked, aflopend in descending.",
      ),
      [
        [
          { arrival: [7, -1, 7, 3] },
          "descending == [7,7,3,-1] and ranked == [-1,3,7,7] and arrival == [7,-1,7,3]",
        ],
      ],
    ),
    C(
      T(
        'Slice the first two values from descending into `top_two`. Print "Top two:" with that slice and "Arrival still:" with the original log.',
        'Slice de eerste twee waarden uit descending naar `top_two`. Print "Top two:" met die slice en "Arrival still:" met het oorspronkelijke log.',
        "top_two == [9,8] and arrival == [8,2,5,9,2] and 'Top two: [9, 8]' in _stdout.splitlines() and 'Arrival still: [8, 2, 5, 9, 2]' in _stdout.splitlines()",
        "Use descending[:2]. The sorted order is what makes these the largest values.",
        "Gebruik descending[:2]. Door de sorteervolgorde zijn dit de grootste waarden.",
        "Choose the largest two from the decreasing report and demonstrate that the original order survived.",
        "Kies de grootste twee uit het aflopende rapport en laat zien dat de oorspronkelijke volgorde behouden bleef.",
      ),
      [
        [{ arrival: [7, -1, 7, 3] }, "top_two == [7,7]"],
        [{ arrival: [4] }, "top_two == [4]"],
      ],
    ),
  ],
  solutionNote: loc(
    "Each sorted call creates its own list. The top-two report is a slice of the decreasing copy, so neither reporting nor selection mutates the arrival log.",
    "Elke sorted-aanroep maakt een eigen list. Het top-twee-rapport is een slice van de aflopende kopie, dus rapporteren en selecteren wijzigen het aankomstlog niet.",
  ),
});

G(g, 12, {
  titleNl: "Maak het verzendrapport van de materiaalruimte",
  intro: loc(
    "The equipment room has a shipment manifest in packing order. One item is canceled, one urgent item must be inserted, and the desk needs counts, a catalog and dispatch numbers. Build this as one program in stages. Run after each step and inspect the variables or output before continuing.",
    "De materiaalruimte heeft een verzendlijst in inpakvolgorde. Eén item wordt geannuleerd, een spoeditem moet ertussen en de balie heeft aantallen, een catalogus en verzendnummers nodig. Bouw dit als één programma in stappen. Voer na elke stap uit en bekijk de variabelen of output voordat je verdergaat.",
  ),
  sections: [
    S(
      "Separate earlier facts from later changes",
      "Scheid eerdere feiten van latere wijzigingen",
      "Calculate the initial count, endpoints and preview before changing the manifest. Those values describe what arrived. Store pop’s return value when canceling, and print the edited manifest after inserting the urgent item. A later sorted catalog must not replace packing order.",
      "Bereken het eerste aantal, de uiteinden en de preview voordat je de verzendlijst wijzigt. Die waarden beschrijven wat binnenkwam. Bewaar de return value van pop bij het annuleren en print de gewijzigde lijst na het invoegen van het spoeditem. Een latere gesorteerde catalogus mag de inpakvolgorde niet vervangen.",
    ),
    S(
      "Choose tools from the question",
      "Kies hulpmiddelen vanuit de vraag",
      "How many? Use len or count. Which positions? Use indexing or a slice. Remove and remember? Use pop. Add at a position? Use insert. A separate alphabetical view? Use sorted. Consecutive labels? Use range with an excluded stop. You have used each tool already; now connect their results.",
      "Hoeveel? Gebruik len of count. Welke posities? Gebruik indexes of een slice. Verwijderen en onthouden? Gebruik pop. Op een positie toevoegen? Gebruik insert. Een aparte alfabetische weergave? Gebruik sorted. Opeenvolgende labels? Gebruik range met een uitgesloten stop. Je hebt elk hulpmiddel al gebruikt; verbind nu hun resultaten.",
      'items = ["rope", "case", "rope"]\nlabels = list(range(100, 100 + len(items)))\nprint(labels)\nprint(sorted(items))\nprint(items)',
      "[100, 101, 102]\n['case', 'rope', 'rope']\n['rope', 'case', 'rope']",
    ),
  ],
  starter:
    'manifest = ["cable", "lamp", "case", "lamp", "strap", "tripod", "lamp"]\ncanceled_index = 4\nrush_item = "battery"\nprint("Received:", manifest)\n\n# 1-3: Describe the received manifest before changing it.\n\n# 4: Cancel one item and retain its name.\n\n# 5: Insert the urgent item before index 1.\n\n# 6-8: Build a separate catalog, dispatch numbers and a small preview.\n',
  solution:
    'manifest = ["cable", "lamp", "case", "lamp", "strap", "tripod", "lamp"]\ncanceled_index = 4\nrush_item = "battery"\nprint("Received:", manifest)\noriginal_count = len(manifest)\nfirst = manifest[0]\nlast = manifest[-1]\nprint("Received summary:", original_count, first, last)\npreview = manifest[1:4]\nprint("Initial preview:", preview)\nlamp_count = manifest.count("lamp")\nprint("Lamps:", lamp_count)\ncanceled = manifest.pop(canceled_index)\nprint("Canceled:", canceled)\nmanifest.insert(1, rush_item)\nprint("Ready:", manifest)\ncatalog = sorted(manifest)\nprint("Catalog:", catalog)\ndispatch_ids = list(range(100, 100 + len(manifest)))\nprint("Dispatch IDs:", dispatch_ids)\nnext_two = manifest[:2]\nearlier = manifest[:-2]\nprint("Next two:", next_two)\nprint("Before final two:", earlier)\n',
  steps: [
    C(
      T(
        'Before editing manifest, save its length in `original_count`, first item in `first` and last item in `last`. Print all three after "Received summary:".',
        'Bewaar vóór het wijzigen van manifest de lengte in `original_count`, het eerste item in `first` en het laatste in `last`. Print alle drie na "Received summary:".',
        "original_count == 7 and first == 'cable' and last == 'lamp' and 'Received summary: 7 cable lamp' in _stdout.splitlines()",
        "Use len, index 0 and index -1 before any pop or insert call.",
        "Gebruik len, index 0 en index -1 vóór een aanroep van pop of insert.",
        "Describe the original received sequence, not a later edited version.",
        "Beschrijf de oorspronkelijke ontvangen reeks, niet een latere gewijzigde versie.",
      ),
      [
        [
          { manifest: ["a", "b", "c", "d", "e", "f"] },
          "original_count == 6 and first == 'a' and last == 'f'",
        ],
      ],
    ),
    C(
      T(
        'Save the original items at indexes 1, 2 and 3 in `preview`, using a slice. Print it with "Initial preview:".',
        'Bewaar de oorspronkelijke items op indexes 1, 2 en 3 via een slice in `preview`. Print deze met "Initial preview:".',
        "preview == ['lamp','case','lamp'] and ('Initial preview: ' + str(preview)) in _stdout.splitlines()",
        "Use an excluded stop of 4, before modifying manifest.",
        "Gebruik een uitgesloten stop van 4, voordat je manifest wijzigt.",
        "Capture the three-item window from the original packing order.",
        "Leg het venster van drie items uit de oorspronkelijke inpakvolgorde vast.",
      ),
      [
        [
          { manifest: ["a", "b", "c", "d", "e", "f"] },
          "preview == ['b','c','d']",
        ],
      ],
    ),
    C(
      T(
        'Count the received lamps into `lamp_count` and print it with "Lamps:". Count before canceling anything.',
        'Tel de ontvangen lampen naar `lamp_count` en print dit met "Lamps:". Tel voordat je iets annuleert.',
        "lamp_count == 3 and 'Lamps: 3' in _stdout.splitlines()",
        'Call manifest.count("lamp"); len would count every kind of item.',
        'Roep manifest.count("lamp") aan; len zou elk soort item meetellen.',
        "Count matching received items, including each duplicate lamp.",
        "Tel de overeenkomende ontvangen items, inclusief elke dubbele lamp.",
      ),
      [
        [
          {
            manifest: [
              "lamp",
              "cable",
              "lamp",
              "case",
              "lamp",
              "tripod",
              "lamp",
            ],
          },
          "lamp_count == 4",
        ],
      ],
    ),
    C(
      T(
        'Remove the item at `canceled_index` with `pop()`, retain its name in `canceled`, and print it with "Canceled:".',
        'Verwijder het item op `canceled_index` met `pop()`, bewaar de naam in `canceled` en print deze met "Canceled:".',
        `canceled == 'strap' and 'Canceled: strap' in _stdout.splitlines() and ${method("pop")}`,
        "The cancellation setting is an index. Save the return value of that pop call.",
        "De annuleringsinstelling is een index. Bewaar de return value van die pop-aanroep.",
        "Remove the configured position and report the actual removed name.",
        "Verwijder de ingestelde positie en rapporteer de werkelijk verwijderde naam.",
      ),
      [[{ canceled_index: 2 }, "canceled == 'case'"]],
    ),
    C(
      T(
        'Insert `rush_item` before index 1 of the remaining manifest. Print "Ready:" with the resulting packing order.',
        'Voeg `rush_item` vóór index 1 van de resterende verzendlijst in. Print "Ready:" met de nieuwe inpakvolgorde.',
        `manifest == ['cable','battery','lamp','case','lamp','tripod','lamp'] and ${method("insert")} and ('Ready: ' + str(manifest)) in _stdout.splitlines()`,
        "After cancellation, insert at position 1; use the rush_item variable as the value.",
        "Voeg na het annuleren op positie 1 in; gebruik rush_item als waarde.",
        "Keep the remaining items in order and insert one urgent item after the first.",
        "Behoud de resterende volgorde en voeg één spoeditem na het eerste toe.",
      ),
      [
        [
          { canceled_index: 2, rush_item: "adapter" },
          "manifest == ['cable','adapter','lamp','lamp','strap','tripod','lamp']",
        ],
      ],
    ),
    C(
      T(
        'Create an alphabetical `catalog` with `sorted(manifest)`. Print it with "Catalog:" and preserve the Ready packing order in manifest.',
        'Maak een alfabetische `catalog` met `sorted(manifest)`. Print deze met "Catalog:" en behoud de Ready-inpakvolgorde in manifest.',
        "catalog == ['battery','cable','case','lamp','lamp','lamp','tripod'] and catalog is not manifest and manifest == ['cable','battery','lamp','case','lamp','tripod','lamp'] and ('Catalog: ' + str(catalog)) in _stdout.splitlines()",
        "A separate sorted result is appropriate for a catalog; the in-place sort would change packing order.",
        "Een apart sorted-resultaat past bij een catalogus; de sort-method zou de inpakvolgorde wijzigen.",
        "Preserve the working order while making an independent alphabetical view.",
        "Behoud de werkvolgorde terwijl je een onafhankelijke alfabetische weergave maakt.",
      ),
      [
        [
          { rush_item: "adapter" },
          "catalog == sorted(manifest) and catalog[0] == 'adapter' and manifest[0] == 'cable' and manifest[1] == 'adapter'",
        ],
      ],
    ),
    C(
      T(
        'Create `dispatch_ids` as a list of consecutive integers starting at 100, with one number for each final manifest item. Print it with "Dispatch IDs:".',
        'Maak `dispatch_ids` als list met opeenvolgende gehele getallen vanaf 100, één nummer per item van de uiteindelijke verzendlijst. Print deze met "Dispatch IDs:".',
        "dispatch_ids == list(range(100,107)) and 'Dispatch IDs: [100, 101, 102, 103, 104, 105, 106]' in _stdout.splitlines()",
        "The excluded stop is 100 + len(manifest). Convert the range to a list.",
        "De uitgesloten stop is 100 + len(manifest). Zet de range om in een list.",
        "Generate exactly one ID per current item, without hard-coding seven IDs.",
        "Genereer precies één ID per huidig item, zonder zeven vaste IDs te typen.",
      ),
      [
        [
          { manifest: ["a", "b", "c", "d", "e", "f"] },
          "dispatch_ids == list(range(100,106))",
        ],
      ],
    ),
    C(
      T(
        'Finish with two slices of the final manifest: `next_two` for the first two items and `earlier` for everything except its last two. Print "Next two:" and "Before final two:" with those lists.',
        'Sluit af met twee slices van de uiteindelijke verzendlijst: `next_two` voor de eerste twee items en `earlier` voor alles behalve de laatste twee. Print "Next two:" en "Before final two:" met die lists.',
        "next_two == ['cable','battery'] and earlier == ['cable','battery','lamp','case','lamp'] and ('Next two: ' + str(next_two)) in _stdout.splitlines() and ('Before final two: ' + str(earlier)) in _stdout.splitlines()",
        "Use [:2] and [:-2]. Select from manifest, because the catalog has a different order.",
        "Gebruik [:2] en [:-2]. Selecteer uit manifest, want de catalogus heeft een andere volgorde.",
        "Build the previews from final packing order without removing any more items.",
        "Bouw de previews uit de uiteindelijke inpakvolgorde zonder nog items te verwijderen.",
      ),
      [
        [
          { manifest: ["a", "b", "c", "d", "e", "f"] },
          "next_two == ['a','battery'] and earlier == ['a','battery','b','c']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The program first records received facts, then applies cancellation and urgency, then builds reports from the final manifest. A sorted copy preserves packing order. The ID range depends on the actual final length, and the final slices select positions without mutation.",
    "Het programma legt eerst de ontvangen gegevens vast, verwerkt daarna annulering en spoed en maakt vervolgens rapporten uit de definitieve verzendlijst. Een gesorteerde kopie behoudt de inpakvolgorde. De ID-range hangt af van de werkelijke eindlengte en de laatste slices selecteren posities zonder iets te wijzigen.",
  ),
});
