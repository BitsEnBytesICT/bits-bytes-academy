import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
} from "./helpers.mjs";
const g = "create-python-list";
L(
  g,
  1,
  "A list stores an ordered sequence of values between square brackets. Separate elements with commas. The order matters and can be changed later.",
  "Een list bewaart een geordende reeks waarden tussen vierkante haakjes. Scheid de elementen met komma’s. De volgorde is belangrijk en kan later veranderen.",
  "Create stops containing Oak, Lake, and Hill in that order.",
  "Maak stops met Oak, Lake en Hill in die volgorde.",
  'stops = ["Oak", "Lake", "Hill"]\nprint(stops)\n',
  "stops == ['Oak','Lake','Hill']",
  { example: 'colors = ["blue", "orange"]', titleNl: "Een list maken" },
);
L(
  g,
  2,
  "List elements can have different types. This is useful for a small mixed record, although named structures may become clearer as records grow. Values retain their individual types.",
  "Elementen in een list kunnen verschillende types hebben. Dat is handig voor een klein gemengd record. Voor grotere records zijn structuren met namen vaak duidelijker. Elke waarde behoudt haar eigen type.",
  "Create record with the string Sensor, integer 4, float 2.5, and Boolean True.",
  "Maak record met de string Sensor, integer 4, float 2.5 en Boolean True.",
  'record = ["Sensor", 4, 2.5, True]\nprint(record)\n',
  "record == ['Sensor',4,2.5,True] and type(record[1]) is int and type(record[3]) is bool",
  { titleNl: "Types in een list" },
);
L(
  g,
  3,
  "An empty list contains no elements. Use [] to create one before data arrives. It is still a list, so methods such as append can be used immediately.",
  "Een lege list bevat geen elementen. Maak deze met [] voordat er gegevens binnenkomen. Het blijft een list, dus je kunt meteen methods zoals append gebruiken.",
  "Create an empty list named readings.",
  "Maak een lege list met de naam readings.",
  "readings = []\nprint(readings)\n",
  "readings == []",
  { titleNl: "Een lege list" },
);
R(
  g,
  4,
  "A method is behavior associated with an object. Write object.method(arguments) to call it. Some methods change the original list; others return information about it. Always check which behavior a method has.",
  "Een method is gedrag dat bij een object hoort. Met object.method(arguments) roep je de method aan. Sommige methods veranderen de oorspronkelijke list; andere geven informatie terug. Controleer altijd welk gedrag een method heeft.",
  'items = ["lamp"]\nitems.append("map")\nprint(items)\n',
  { titleNl: "Methods aanroepen" },
);
L(
  g,
  5,
  "append adds one element to the end of a list. It changes the existing list and returns None. Do not assign its return value back to the list name.",
  "append voegt één element toe aan het einde van een list. De method verandert de bestaande list en geeft None terug. Wijs die return value niet opnieuw toe aan de listnaam.",
  "Append torch and blanket to packing, in that order.",
  "Voeg torch en blanket met append toe aan packing, in die volgorde.",
  'packing = ["map"]\npacking.append("torch")\npacking.append("blanket")\nprint(packing)\n',
  "packing == ['map','torch','blanket']",
  {
    starter: 'packing = ["map"]\n',
    example: 'tools = []\ntools.append("ruler")',
    titleNl: "Toevoegen met append",
  },
);
L(
  g,
  6,
  "The + operator creates a new list containing the left list followed by the right list. Both operands must be lists. The originals remain unchanged unless you reassign a name.",
  "De operator + maakt een nieuwe list met eerst de linker list en daarna de rechter. Beide operands moeten lists zijn. De oorspronkelijke lists blijven ongewijzigd, tenzij je een naam opnieuw toewijst.",
  "Combine morning and afternoon into schedule. Keep both input lists unchanged.",
  "Combineer morning en afternoon tot schedule. Laat beide invoerlists ongewijzigd.",
  "morning = [9, 11]\nafternoon = [14, 16]\nschedule = morning + afternoon\nprint(schedule)\n",
  "schedule == [9,11,14,16] and morning == [9,11] and afternoon == [14,16]",
  {
    starter: "morning = [9, 11]\nafternoon = [14, 16]\n",
    titleNl: "Lists samenvoegen",
  },
);
L(
  g,
  7,
  "List indexes start at zero. items[0] selects the first element and items[1] the second. An index outside the available positions raises IndexError.",
  "List-indexes beginnen bij nul. items[0] kiest het eerste element en items[1] het tweede. Een index buiten de beschikbare posities geeft een IndexError.",
  "Store the first stop in first and the third stop in third.",
  "Sla de eerste stop op in first en de derde in third.",
  'stops = ["Oak", "Lake", "Hill"]\nfirst = stops[0]\nthird = stops[2]\nprint(first, third)\n',
  "first == 'Oak' and third == 'Hill'",
  {
    starter: 'stops = ["Oak", "Lake", "Hill"]\n',
    titleNl: "Positieve indexes",
  },
);
L(
  g,
  8,
  "Negative indexes count from the end: -1 is the last element, -2 is the one before it. This avoids calculating a positive index from the length.",
  "Negatieve indexes tellen vanaf het einde: -1 is het laatste element en -2 het voorlaatste. Zo hoef je geen positieve index uit de lengte te berekenen.",
  "Store the last reading in latest and the previous reading in previous.",
  "Sla de laatste meting op in latest en de vorige meting in previous.",
  "readings = [18, 20, 19, 22]\nlatest = readings[-1]\nprevious = readings[-2]\nprint(latest, previous)\n",
  "latest == 22 and previous == 19",
  { starter: "readings = [18, 20, 19, 22]\n", titleNl: "Negatieve indexes" },
);
L(
  g,
  9,
  "Lists are mutable: you can replace an element at an existing index. Assignment to an index changes that position without moving the surrounding elements.",
  "Lists zijn mutable: je kunt een element op een bestaande index vervangen. Assignment op een index verandert die positie zonder omliggende elementen te verschuiven.",
  "Replace the second item with compass, leaving the other items unchanged.",
  "Vervang het tweede item door compass. Laat de andere items ongewijzigd.",
  'gear = ["map", "broken compass", "water"]\ngear[1] = "compass"\nprint(gear)\n',
  "gear == ['map','compass','water']",
  {
    starter: 'gear = ["map", "broken compass", "water"]\n',
    titleNl: "Een element vervangen",
  },
);
L(
  g,
  10,
  "remove(value) deletes the first equal value from a list. It uses a value, not an index. Removing a value that is absent raises ValueError, so check membership if absence is expected.",
  "remove(value) verwijdert de eerste gelijke waarde uit een list. Je geeft een waarde op, geen index. Een ontbrekende waarde verwijderen veroorzaakt ValueError; controleer membership als de waarde kan ontbreken.",
  "Remove one canceled entry from queue. The second canceled entry must remain.",
  "Verwijder één canceled uit queue. Het tweede canceled-element moet blijven staan.",
  'queue = ["ready", "canceled", "waiting", "canceled"]\nqueue.remove("canceled")\nprint(queue)\n',
  "queue == ['ready','waiting','canceled']",
  {
    starter: 'queue = ["ready", "canceled", "waiting", "canceled"]\n',
    titleNl: "Een waarde verwijderen",
  },
);
L(
  g,
  11,
  "A list can contain other lists. This represents rows of a small table. Each inner list is an element of the outer list.",
  "Een list kan andere lists bevatten. Daarmee kun je rijen van een kleine tabel voorstellen. Elke binnenste list is een element van de buitenste list.",
  "Create stock with two rows: lamp with quantity 3, and cable with quantity 8.",
  "Maak stock met twee rijen: lamp met aantal 3 en cable met aantal 8.",
  'stock = [["lamp", 3], ["cable", 8]]\nprint(stock)\n',
  "stock == [['lamp',3],['cable',8]]",
  { titleNl: "Geneste lists" },
);
L(
  g,
  12,
  "Index a nested list in two stages: choose the row, then the value within that row. table[1][0] reads the first value from the second row.",
  "Gebruik twee indexes voor een geneste list: kies eerst de rij en daarna de waarde in die rij. table[1][0] leest de eerste waarde uit de tweede rij.",
  "Store the cable quantity in cable_count.",
  "Sla het aantal cables op in cable_count.",
  'stock = [["lamp", 3], ["cable", 8]]\ncable_count = stock[1][1]\nprint(cable_count)\n',
  "cable_count == 8",
  {
    starter: 'stock = [["lamp", 3], ["cable", 8]]\n',
    titleNl: "Geneste waarden lezen",
  },
);
L(
  g,
  13,
  "You can assign through two indexes to replace one cell in a nested list. The outer and inner list keep their existing identities; only the selected value changes.",
  "Met twee indexes kun je één cel in een geneste list vervangen. De buitenste en binnenste list blijven dezelfde objecten; alleen de geselecteerde waarde verandert.",
  "Change the lamp quantity to 5 without replacing the cable row.",
  "Verander het aantal lamps naar 5 zonder de cable-rij te vervangen.",
  'stock = [["lamp", 3], ["cable", 8]]\nstock[0][1] = 5\nprint(stock)\n',
  "stock == [['lamp',5],['cable',8]]",
  {
    starter: 'stock = [["lamp", 3], ["cable", 8]]\n',
    titleNl: "Geneste waarden wijzigen",
  },
);
L(
  g,
  14,
  "Use a small table to practice several list operations together. Indexes locate positions, append extends the collection, and remove deletes a matching value. Inspect the final structure rather than relying on intermediate output.",
  "Gebruik een kleine tabel om list-bewerkingen te combineren. Indexes zoeken posities op, append breidt de verzameling uit en remove verwijdert een passende waarde. Controleer de uiteindelijke structuur in plaats van alleen tussentijdse output.",
  'Start with [["lamp", 3], ["cable", 8]]. Change lamps to 6, append ["battery", 4], and save the final row in newest.',
  'Begin met [["lamp", 3], ["cable", 8]]. Verander lamps naar 6, voeg ["battery", 4] toe en sla de laatste rij op in newest.',
  'stock = [["lamp", 3], ["cable", 8]]\nstock[0][1] = 6\nstock.append(["battery", 4])\nnewest = stock[-1]\nprint(stock)\n',
  "stock == [['lamp',6],['cable',8],['battery',4]] and newest == ['battery',4]",
  { titleNl: "Terugblik: lists" },
);
const w = "use-python-list";
R(
  w,
  1,
  "Choose a list operation according to your goal: insert by position, remove by value or position, take a slice, count occurrences, or sort. The distinction between mutation and a new return value is central.",
  "Kies een list-bewerking op basis van je doel: invoegen op positie, verwijderen op waarde of positie, een slice nemen, tellen of sorteren. Het verschil tussen wijzigen en een nieuwe return value is essentieel.",
  'values = [7, 2, 5]\nprint("Original:", values)\nprint("Sorted copy:", sorted(values))\nprint("Still original:", values)\n',
  { titleNl: "List-bewerkingen kiezen" },
);
L(
  w,
  2,
  "insert(index, value) places an element before the selected position. Later elements move to the right. It changes the list in place.",
  "insert(index, value) plaatst een element vóór de gekozen positie. Latere elementen schuiven naar rechts. De oorspronkelijke list wordt aangepast.",
  "Insert Bridge between Oak and Lake in stops.",
  "Voeg Bridge in tussen Oak en Lake in stops.",
  'stops = ["Oak", "Lake"]\nstops.insert(1, "Bridge")\nprint(stops)\n',
  "stops == ['Oak','Bridge','Lake']",
  { starter: 'stops = ["Oak", "Lake"]\n', titleNl: "Invoegen op index" },
);
L(
  w,
  3,
  "pop(index) removes and returns an element. With no argument, it removes the last one. Save the return value when you need the removed item later.",
  "pop(index) verwijdert een element en geeft het terug. Zonder argument wordt het laatste element verwijderd. Bewaar de return value als je het verwijderde item later nodig hebt.",
  "Remove the last entry from queue with pop and store it in removed.",
  "Verwijder met pop het laatste item uit queue en sla het op in removed.",
  'queue = ["A", "B", "C"]\nremoved = queue.pop()\nprint(removed, queue)\n',
  "removed == 'C' and queue == ['A','B']",
  { starter: 'queue = ["A", "B", "C"]\n', titleNl: "Verwijderen met pop" },
);
L(
  w,
  4,
  "range(stop) describes integers from zero up to, but not including, stop. Convert it with list() when you need to see or store every element as a list.",
  "range(stop) beschrijft integers vanaf nul tot stop, waarbij stop zelf niet meetelt. Gebruik list() als je alle elementen als list wilt zien of bewaren.",
  "Create stations as list(range(6)).",
  "Maak stations met list(range(6)).",
  "stations = list(range(6))\nprint(stations)\n",
  "stations == [0,1,2,3,4,5]",
  { titleNl: "Een range gebruiken" },
);
L(
  w,
  5,
  "range(start, stop, step) begins at start and advances by step while staying before the stop boundary. A negative step moves downward. A step of zero is invalid.",
  "range(start, stop, step) begint bij start en gaat met step vooruit tot de stopgrens. Een negatieve step telt terug. Een step van nul is ongeldig.",
  "Create departures containing 8, 10, 12, 14, and 16 using range.",
  "Maak departures met 8, 10, 12, 14 en 16 via range.",
  "departures = list(range(8, 18, 2))\nprint(departures)\n",
  "departures == [8,10,12,14,16] and 'range' in _source",
  { titleNl: "Start, stop en step" },
);
L(
  w,
  6,
  "len() counts the top-level elements in a collection. For a nested list, each inner list counts as one element regardless of how many values it contains.",
  "len() telt de elementen op het hoogste niveau van een verzameling. Bij een geneste list telt elke binnenste list als één element, ongeacht het aantal waarden erin.",
  "Store the number of rows in row_count and the length of the first row in column_count.",
  "Sla het aantal rijen op in row_count en de lengte van de eerste rij in column_count.",
  "grid = [[1, 2, 3], [4, 5, 6]]\nrow_count = len(grid)\ncolumn_count = len(grid[0])\nprint(row_count, column_count)\n",
  "row_count == 2 and column_count == 3",
  { starter: "grid = [[1, 2, 3], [4, 5, 6]]\n", titleNl: "Lengte bepalen" },
);
L(
  w,
  7,
  "A slice items[start:stop] returns a new list. It includes start and excludes stop. Slicing does not remove values from the original list.",
  "Een slice items[start:stop] geeft een nieuwe list terug. start telt mee, stop niet. Een slice verwijdert geen waarden uit de oorspronkelijke list.",
  "Save the values 20, 30, and 40 from route into middle using a slice.",
  "Sla 20, 30 en 40 uit route via een slice op in middle.",
  "route = [10, 20, 30, 40, 50]\nmiddle = route[1:4]\nprint(middle)\n",
  "middle == [20,30,40] and route == [10,20,30,40,50]",
  { starter: "route = [10, 20, 30, 40, 50]\n", titleNl: "Slice-grenzen" },
);
L(
  w,
  8,
  "Omit a slice boundary to use the beginning or end. Negative boundaries count from the end. items[-2:] gives the final two elements.",
  "Laat een slice-grens weg om het begin of einde te gebruiken. Negatieve grenzen tellen vanaf het einde. items[-2:] geeft de laatste twee elementen.",
  "Create prefix with the first two values and suffix with the last two values.",
  "Maak prefix met de eerste twee waarden en suffix met de laatste twee waarden.",
  "values = [2, 4, 6, 8, 10]\nprefix = values[:2]\nsuffix = values[-2:]\nprint(prefix, suffix)\n",
  "prefix == [2,4] and suffix == [8,10]",
  {
    starter: "values = [2, 4, 6, 8, 10]\n",
    titleNl: "Open en negatieve slice-grenzen",
  },
);
L(
  w,
  9,
  "count(value) returns how many elements are equal to value. It leaves the list unchanged and returns zero if the value does not occur.",
  "count(value) geeft het aantal elementen terug dat gelijk is aan value. De list blijft ongewijzigd. Als de waarde ontbreekt, is het resultaat nul.",
  "Count occurrences of ok in statuses and save the number in ok_count.",
  "Tel hoe vaak ok voorkomt in statuses en sla het aantal op in ok_count.",
  'statuses = ["ok", "wait", "ok", "ok"]\nok_count = statuses.count("ok")\nprint(ok_count)\n',
  "ok_count == 3",
  {
    starter: 'statuses = ["ok", "wait", "ok", "ok"]\n',
    titleNl: "Waarden tellen",
  },
);
L(
  w,
  10,
  "sort() rearranges the existing list. It returns None because the result is already stored in the list itself. Use reverse=True for descending order.",
  "sort() herschikt de bestaande list. De method geeft None terug, omdat het resultaat al in de list staat. Met reverse=True sorteer je aflopend.",
  "Sort priorities in descending order in place. Store the return value of sort in result.",
  "Sorteer priorities in de bestaande list aflopend. Sla de return value van sort op in result.",
  "priorities = [4, 1, 7, 3]\nresult = priorities.sort(reverse=True)\nprint(priorities)\n",
  "priorities == [7,4,3,1] and result is None",
  {
    starter: "priorities = [4, 1, 7, 3]\n",
    titleNl: "De bestaande list sorteren",
  },
);
L(
  w,
  11,
  "sorted() returns a new sorted list and leaves the original collection unchanged. This is useful when the original order has meaning you want to preserve.",
  "sorted() geeft een nieuwe gesorteerde list terug en laat de oorspronkelijke verzameling ongewijzigd. Dat is handig als de oorspronkelijke volgorde betekenis heeft.",
  "Create ranked as a sorted copy of arrival. Keep arrival unchanged.",
  "Maak ranked als gesorteerde kopie van arrival. Laat arrival ongewijzigd.",
  "arrival = [8, 2, 5]\nranked = sorted(arrival)\nprint(ranked)\n",
  "ranked == [2,5,8] and arrival == [8,2,5]",
  { starter: "arrival = [8, 2, 5]\n", titleNl: "Een gesorteerde kopie" },
);
L(
  w,
  12,
  "Combine list operations carefully: removing an element changes later indexes, while a slice makes a new list. Keep intermediate values in named variables so you can inspect each stage.",
  "Combineer list-bewerkingen zorgvuldig: na het verwijderen veranderen latere indexes, terwijl een slice een nieuwe list maakt. Bewaar tussenresultaten in variables om elke stap te kunnen bekijken.",
  "Start queue at [7, 3, 5]. Insert 9 at index 1, pop the last value into removed, sort queue, and save its first two entries as first_two.",
  "Begin met queue = [7, 3, 5]. Voeg 9 in op index 1, pop de laatste waarde naar removed, sorteer queue en sla de eerste twee items op in first_two.",
  "queue = [7, 3, 5]\nqueue.insert(1, 9)\nremoved = queue.pop()\nqueue.sort()\nfirst_two = queue[:2]\nprint(queue, removed, first_two)\n",
  "queue == [3,7,9] and removed == 5 and first_two == [3,7]",
  { titleNl: "Terugblik: list-bewerkingen" },
);
Q(g, [
  P(
    "print([4, 7, 9][0])",
    ["4", "7", "9"],
    "Indexes start at zero.",
    "Indexes beginnen bij nul.",
  ),
  P(
    "print([4, 7, 9][-1])",
    ["9", "4", "7"],
    "-1 selects the final element.",
    "-1 kiest het laatste element.",
  ),
  P(
    "x = [1, 2]\nx.append(3)\nprint(x)",
    ["[1, 2, 3]", "[3, 1, 2]", "[1, 2]"],
    "append adds one element at the end.",
    "append voegt één element toe aan het einde.",
  ),
  [
    "Which literal is an empty list?",
    "Welke literal is een lege list?",
    "",
    ["[]", "{}", "()", '""'],
    "Square brackets create a list.",
    "Vierkante haakjes maken een list.",
  ],
  P(
    'x = ["a", "b"]\nx[1] = "c"\nprint(x)',
    ["['a', 'c']", "['c', 'b']", "['a', 'b', 'c']"],
    "Index 1 is the second element, which is replaced.",
    "Index 1 is het tweede element en wordt vervangen.",
  ),
  P(
    "x = [2, 2, 3]\nx.remove(2)\nprint(x)",
    ["[2, 3]", "[3]", "[2, 2]"],
    "remove deletes only the first matching value.",
    "remove verwijdert alleen de eerste passende waarde.",
  ),
  P(
    "print([1] + [2, 3])",
    ["[1, 2, 3]", "[3, 4]", "[1, [2, 3]]"],
    "List addition concatenates the elements in order.",
    "Optellen van lists voegt de elementen in volgorde samen.",
  ),
  P(
    'rows = [["A", 6], ["B", 8]]\nprint(rows[1][0])',
    ["B", "8", "A", "6"],
    "Select the second row, then its first element.",
    "Kies de tweede rij en daarna het eerste element.",
  ),
  [
    "What happens when a requested index is too large?",
    "Wat gebeurt er als een index te groot is?",
    "",
    [["IndexError"], ["None"], ["An empty list", "Een lege list"]],
    "An out-of-range element lookup raises IndexError.",
    "Een element opvragen buiten de beschikbare indexes geeft IndexError.",
  ],
  [
    "Can one list contain different value types?",
    "Kan één list verschillende types bevatten?",
    "",
    [
      ["Yes", "Ja"],
      ["No", "Nee"],
    ],
    "Python lists can hold objects of different types.",
    "Python-lists kunnen objecten van verschillende types bevatten.",
  ],
  P(
    "x = [5]\nresult = x.append(6)\nprint(result)",
    ["None", "[5, 6]", "6"],
    "append mutates x and returns None.",
    "append verandert x en geeft None terug.",
  ),
]);
Q(w, [
  P(
    "print(list(range(4)))",
    ["[0, 1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3, 4]"],
    "The stop value is excluded.",
    "De stopwaarde telt niet mee.",
  ),
  P(
    "print(list(range(2, 9, 3)))",
    ["[2, 5, 8]", "[2, 3, 4, 5, 6, 7, 8]", "[3, 6, 9]"],
    "Begin at 2 and add 3 while staying below 9.",
    "Begin bij 2 en tel telkens 3 op, zolang de waarde kleiner is dan 9.",
  ),
  P(
    "print(len([[1, 2], [3, 4]]))",
    ["2", "4", "1"],
    "len counts the two outer elements.",
    "len telt de twee buitenste elementen.",
  ),
  P(
    "print([1, 2, 3, 4][1:3])",
    ["[2, 3]", "[1, 2, 3]", "[2, 3, 4]"],
    "Index 1 is included and index 3 is excluded.",
    "Index 1 telt mee; index 3 niet.",
  ),
  P(
    "print([1, 2, 3, 4][-2:])",
    ["[3, 4]", "[1, 2]", "[2, 3]"],
    "Start two positions from the end and continue to the end.",
    "Begin twee posities vóór het einde en ga door tot het einde.",
  ),
  P(
    "x = [1, 3]\nx.insert(1, 2)\nprint(x)",
    ["[1, 2, 3]", "[2, 1, 3]", "[1, 3, 2]"],
    "insert places the value before index 1.",
    "insert plaatst de waarde vóór index 1.",
  ),
  P(
    "x = [4, 5, 6]\nprint(x.pop())",
    ["6", "4", "None"],
    "pop without an index removes and returns the last value.",
    "pop zonder index verwijdert de laatste waarde en geeft die terug.",
  ),
  P(
    "print([2, 1, 2, 2].count(2))",
    ["3", "2", "4"],
    "There are three elements equal to 2.",
    "Drie elementen zijn gelijk aan 2.",
  ),
  P(
    "x = [3, 1, 2]\nprint(x.sort())",
    ["None", "[1, 2, 3]", "[3, 2, 1]"],
    "sort changes x in place and returns None.",
    "sort verandert x en geeft None terug.",
  ),
  P(
    "x = [3, 1]\ny = sorted(x)\nprint(x)",
    ["[3, 1]", "[1, 3]", "None"],
    "sorted returns a separate list, leaving x unchanged.",
    "sorted geeft een aparte list terug en laat x ongewijzigd.",
  ),
  P(
    "print(sorted([4, 2, 7], reverse=True))",
    ["[7, 4, 2]", "[2, 4, 7]", "[4, 2, 7]"],
    "reverse=True requests descending order.",
    "reverse=True vraagt om aflopende volgorde.",
  ),
  P(
    "print([1, 2, 3][:0])",
    ["[]", "[1]", "[1, 2, 3]"],
    "The exclusive stop is zero, so no element is selected.",
    "De uitgesloten stopgrens is nul; er wordt geen element gekozen.",
  ),
]);
