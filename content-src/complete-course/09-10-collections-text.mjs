import { lesson, S, C, F } from "./authoring.mjs";
export const activities = [
  lesson(9, 1, {
    explanation: [
      "Maintain a queue using operations that select by position or by value. Work on a copy so the caller keeps the original queue.",
      "Beheer een wachtrij met bewerkingen die op positie of waarde kiezen. Werk op een kopie zodat de aanroeper de oorspronkelijke rij behoudt.",
    ],
    sections: [
      S(
        "insert remove pop count",
        ["Choose the right removal", "Kies de juiste verwijdering"],
        [
          "insert(index, value) adds before an index. remove(value) deletes the first matching value and raises ValueError if none exists. pop(index) removes by position and returns the removed item; pop() defaults to the last item and raises IndexError on an empty list. count(value) counts equal values. Mutation methods such as insert and remove return None.",
          "insert(index, value) voegt vóór een index toe. remove(value) verwijdert de eerste gelijke waarde en geeft ValueError als die ontbreekt. pop(index) verwijdert op positie en geeft het verwijderde item terug; pop() kiest standaard het laatste item en geeft IndexError bij een lege lijst. count(value) telt gelijke waarden. Wijzigingsmethoden zoals insert en remove geven None terug.",
        ],
        'queue = ["A", "B", "A"]\nqueue.insert(1, "C")\nqueue.remove("A")\nlast = queue.pop()\nprint(queue, last, queue.count("A"))',
        "['C', 'B'] A 0\n",
        [
          "Which A did remove select, and which did pop return?",
          "Welke A koos remove en welke gaf pop terug?",
        ],
      ),
    ],
    starter:
      'def manage(queue, urgent, leaving):\n    result = queue.copy()\n    # Insert urgent first, remove leaving, then pop the last item.\n    return result, None, 0\n\nprint(manage(["Ana", "Bo", "Ana"], "Dax", "Ana"))\n',
    solution:
      'def manage(queue, urgent, leaving):\n    result = queue.copy()\n    result.insert(0, urgent)\n    result.remove(leaving)\n    last = result.pop()\n    remaining = result.count(urgent)\n    return result, last, remaining\n\nprint(manage(["Ana", "Bo", "Ana"], "Dax", "Ana"))\n',
    tasks: [
      C(
        "insert remove",
        [
          "In manage, use insert to add urgent at index 0 and remove to delete the first leaving value from a copy. Assume leaving exists and the original queue has at least two entries.",
          "Gebruik in manage insert om urgent op index 0 toe te voegen en remove om de eerste leaving-waarde uit een kopie te verwijderen. Neem aan dat leaving bestaat en de oorspronkelijke rij minstens twee items heeft.",
        ],
        "callable(manage)",
        [
          [
            "Position and value are different selection rules.",
            "Positie en waarde zijn verschillende selectieregels.",
          ],
          [
            "Call insert(0, urgent), then remove(leaving).",
            "Roep insert(0, urgent) aan en daarna remove(leaving).",
          ],
          ["result.remove(leaving)", "result.remove(leaving)"],
        ],
        [
          "Remove only the first matching value and leave the original queue intact.",
          "Verwijder alleen de eerste gelijke waarde en laat de oorspronkelijke rij intact.",
        ],
        [
          F(
            "manage",
            [["A", "B", "A"], "C", "A"],
            '_return[0] == ["C","B"] and _args[0] == ["A","B","A"]',
          ),
        ],
      ),
      C(
        "pop count",
        [
          "Pop the last remaining item and return (result, last, remaining), where remaining counts urgent in result after popping. Use pop and count.",
          "Haal het laatste resterende item weg met pop en geef (result, last, remaining) terug; remaining telt urgent in result na pop. Gebruik pop en count.",
        ],
        'manage(["Ana","Bo","Ana"],"Dax","Ana") == (["Dax","Bo"],"Ana",1)',
        [
          [
            "pop gives back what it removes.",
            "pop geeft terug wat het verwijdert.",
          ],
          [
            "Store the pop result before counting the final list.",
            "Bewaar het pop-resultaat voordat je de eindlijst telt.",
          ],
          [
            "last = result.pop()\nremaining = result.count(urgent)",
            "last = result.pop()\nremaining = result.count(urgent)",
          ],
        ],
        [
          "Count after all changes, not before the popped entry disappears.",
          "Tel na alle wijzigingen, niet voordat het verwijderde item verdwijnt.",
        ],
        [
          F(
            "manage",
            [["A", "A", "B"], "A", "A"],
            '_return == (["A","A"],"B",2)',
          ),
          F("manage", [["A", "B"], "C", "A"], '_return == (["C"],"B",1)'),
        ],
      ),
    ],
    note: [
      "Each operation has a different selection rule. Copying first protects the caller, while storing pop’s return value preserves the removed item for reporting.",
      "Elke bewerking heeft een andere selectieregel. Eerst kopiëren beschermt de aanroeper; de pop-terugkeerwaarde bewaren behoudt het verwijderde item voor rapportage.",
    ],
    experiment: [
      "Try duplicate urgent names. Explain why remove(0) would search for the value 0 rather than remove the first position.",
      "Probeer dubbele urgent-namen. Leg uit waarom remove(0) de waarde 0 zou zoeken in plaats van de eerste positie te verwijderen.",
    ],
  }),
  lesson(9, 2, {
    explanation: [
      "Extract useful parts of a sequence without changing the original. Learn why range is useful without materialising a list.",
      "Haal bruikbare delen uit een reeks zonder het origineel te veranderen. Leer waarom range bruikbaar is zonder er een lijst van te maken.",
    ],
    sections: [
      S(
        "slicing omitted-slice-bounds range-as-sequence",
        ["Select a half-open interval", "Kies een interval zonder eindpunt"],
        [
          "values[start:stop] includes start and excludes stop. Omit start for the beginning, stop for the end, or both for a shallow copy. Out-of-range slice bounds are safe. range is an immutable sequence object that computes its values; list(range(...)) materialises them. Indexing and len also work on range.",
          "values[start:stop] neemt start mee en sluit stop uit. Laat start weg voor het begin, stop voor het einde of beide voor een oppervlakkige kopie. Slice-grenzen buiten bereik zijn veilig. range is een onveranderlijk reeksobject dat zijn waarden berekent; list(range(...)) maakt er een lijst van. Indexeren en len werken ook bij range.",
        ],
        "values = [2, 4, 6, 8]\nprint(values[:2], values[2:], values[1:3])\nsteps = range(2, 9, 2)\nprint(steps[1], len(steps), list(steps))",
        "[2, 4] [6, 8] [4, 6]\n4 4 [2, 4, 6, 8]\n",
        [
          "Is the slice stop included? Does range itself store a normal list?",
          "Wordt het slice-einde meegenomen? Bewaart range zelf een gewone lijst?",
        ],
      ),
    ],
    starter:
      "def parts(values):\n    return [], [], []\n\n# Create steps = range(1, 8, 2), and materialise it as numbers.\n",
    solution:
      "def parts(values):\n    return values[:2], values[2:], values[:]\n\nsteps = range(1, 8, 2)\nnumbers = list(steps)\nprint(parts(numbers))\n",
    tasks: [
      C(
        "slicing omitted-slice-bounds",
        [
          "Return the first two values, all values from index 2 onward, and a full shallow copy as a tuple of three lists.",
          "Geef de eerste twee waarden, alle waarden vanaf index 2 en een volledige oppervlakkige kopie terug als tuple van drie lijsten.",
        ],
        "parts([1,2,3]) == ([1,2],[3],[1,2,3])",
        [
          [
            "Slices can omit either boundary.",
            "Slices kunnen beide grenzen weglaten.",
          ],
          ["Use [:2], [2:] and [:].", "Gebruik [:2], [2:] en [:]."],
          [
            "return values[:2], values[2:], values[:]",
            "return values[:2], values[2:], values[:]",
          ],
        ],
        [
          "Short and empty inputs should still return three lists.",
          "Korte en lege invoer moet nog steeds drie lijsten teruggeven.",
        ],
        [
          F("parts", [[]], "_return == ([],[],[])"),
          F(
            "parts",
            [[5]],
            "_return == ([5],[],[5]) and _return[2] is not _args[0]",
          ),
        ],
      ),
      C(
        "range-as-sequence",
        [
          "Create steps as range(1, 8, 2) and numbers as list(steps); keep both objects.",
          "Maak steps als range(1, 8, 2) en numbers als list(steps); behoud beide objecten.",
        ],
        "isinstance(steps,range) and numbers == [1,3,5,7] and isinstance(numbers,list)",
        [
          [
            "A range can be iterated without turning it into a list.",
            "Een range kan worden doorlopen zonder er een lijst van te maken.",
          ],
          [
            "Materialisation is an explicit conversion.",
            "Een lijst maken is een expliciete omzetting.",
          ],
          ["numbers = list(steps)", "numbers = list(steps)"],
        ],
        [
          "Do not replace steps with the list; compare their different types.",
          "Vervang steps niet door de lijst; vergelijk hun verschillende types.",
        ],
      ),
    ],
    note: [
      "Slices use the same exclusive-stop idea as range. A full slice copies a list; list(range(...)) creates a list from a different sequence type.",
      "Slices gebruiken hetzelfde exclusieve-einde-idee als range. Een volledige slice kopieert een lijst; list(range(...)) maakt een lijst uit een ander reekstype.",
    ],
    experiment: [
      "Try values[99:] and values[:99]. Explain why these are safe while values[99] can fail.",
      "Probeer values[99:] en values[:99]. Leg uit waarom die veilig zijn terwijl values[99] kan mislukken.",
    ],
  }),
  lesson(9, 3, {
    explanation: [
      "Choose between changing a list and producing a sorted copy. Repair the common mistake of assigning the result of sort.",
      "Kies tussen een lijst veranderen en een gesorteerde kopie maken. Repareer de veelgemaakte fout om het resultaat van sort toe te wijzen.",
    ],
    sections: [
      S(
        "sort sorted",
        [
          "Mutation has a different contract",
          "Wijzigen heeft een andere afspraak",
        ],
        [
          "values.sort() changes values and returns None. sorted(values) returns a new list, leaving values alone. Both default to ascending order; reverse=True chooses descending order. Do not assume the return value of a mutation method is the changed list.",
          "values.sort() verandert values en geeft None terug. sorted(values) geeft een nieuwe lijst terug en laat values ongemoeid. Beide sorteren standaard oplopend; reverse=True kiest aflopend. Neem niet aan dat de terugkeerwaarde van een wijzigingsmethode de gewijzigde lijst is.",
        ],
        "scores = [5, 1, 3]\nranked = sorted(scores, reverse=True)\nresult = scores.sort()\nprint(ranked)\nprint(scores, result)",
        "[5, 3, 1]\n[1, 3, 5] None\n",
        [
          "Which variable holds None, and why?",
          "Welke variabele bevat None en waarom?",
        ],
      ),
    ],
    starter:
      "def ranked(scores):\n    return scores.sort()\n\ndef tidy(scores):\n    return sorted(scores)\n\nprint(ranked([4, 1, 7]))\n",
    solution:
      "def ranked(scores):\n    return sorted(scores, reverse=True)\n\ndef tidy(scores):\n    scores.sort()\n\nprint(ranked([4, 1, 7]))\n",
    tasks: [
      C(
        "sorted",
        [
          "Repair ranked(scores) using sorted: return a descending sorted copy while preserving scores.",
          "Repareer ranked(scores) met sorted: geef een aflopend gesorteerde kopie terug en behoud scores.",
        ],
        "ranked([4,1,7]) == [7,4,1]",
        [
          [
            "Ranking should not destroy the original order.",
            "Rangschikken mag de oorspronkelijke volgorde niet vernietigen.",
          ],
          ["Use sorted with reverse=True.", "Gebruik sorted met reverse=True."],
          [
            "return sorted(scores, reverse=True)",
            "return sorted(scores, reverse=True)",
          ],
        ],
        [
          "Check both the returned order and the unchanged input.",
          "Controleer de teruggegeven volgorde én de ongewijzigde invoer.",
        ],
        [
          F(
            "ranked",
            [[2, -1, 2]],
            "_return == [2,2,-1] and _args[0] == [2,-1,2]",
          ),
          F("ranked", [[]], "_return == [] and _return is not _args[0]"),
        ],
      ),
      C(
        "sort",
        [
          "Repair tidy(scores) using sort: sort the supplied list ascending in place and return None.",
          "Repareer tidy(scores) met sort: sorteer de meegegeven lijst oplopend op zijn plek en geef None terug.",
        ],
        "callable(tidy)",
        [
          [
            "The caller still holds the same list object.",
            "De aanroeper heeft nog steeds hetzelfde lijstobject.",
          ],
          [
            "Call scores.sort() without replacing scores.",
            "Roep scores.sort() aan zonder scores te vervangen.",
          ],
          ["scores.sort()", "scores.sort()"],
        ],
        [
          "A sorted local replacement does not change the caller’s list.",
          "Een gesorteerde lokale vervanging verandert de lijst van de aanroeper niet.",
        ],
        [
          F("tidy", [[3, 1, 2]], "_return is None and _args[0] == [1,2,3]"),
          F("tidy", [[]], "_return is None and _args[0] == []"),
        ],
      ),
    ],
    note: [
      "ranked is a query returning new data. tidy is an action on an existing list and returns None. Their names and briefs make their different side effects visible.",
      "ranked is een vraag die nieuwe gegevens teruggeeft. tidy is een actie op een bestaande lijst en geeft None terug. Namen en beschrijvingen maken hun verschillende neveneffecten zichtbaar.",
    ],
    experiment: [
      "Predict what print(tidy(scores)) displays and what print(scores) displays afterward. Test duplicate and negative scores.",
      "Voorspel wat print(tidy(scores)) toont en wat print(scores) daarna toont. Test dubbele en negatieve scores.",
    ],
  }),
  lesson(9, 4, {
    explanation: [
      "Represent a small grid with a list of rows. Access a cell by selecting its row first, then its column. Use nested loops when every row contains several values to process.",
      "Stel een klein raster voor met een lijst van rijen. Selecteer voor een cel eerst de rij en dan de kolom. Gebruik geneste lussen wanneer elke rij meerdere te verwerken waarden bevat.",
    ],
    sections: [
      S(
        "2d-lists 2d-access 2d-mutation nested-loops",
        ["Rows contain their own lists", "Rijen bevatten hun eigen lijsten"],
        [
          "grid[row][column] first selects a row list, then a value inside it. Assigning that expression changes one cell. Create separate row lists: repeating the same row reference shares its state. A shallow outer copy still shares inner rows. An outer loop visits rows; an inner loop visits cells. Reset a row total inside the outer loop.",
          "grid[row][column] kiest eerst een rijlijst en dan een waarde daarin. Die expressie toewijzen verandert één cel. Maak aparte rijlijsten: dezelfde rijreferentie herhalen deelt de toestand. Een oppervlakkige buitenste kopie deelt nog de binnenste rijen. Een buitenlus bezoekt rijen; een binnenlus bezoekt cellen. Zet een rijtotaal binnen de buitenlus opnieuw op nul.",
        ],
        "grid = [[1, 2], [3, 4]]\ngrid[0][1] = 8\nfor row in grid:\n    for cell in row:\n        print(cell)",
        "1\n8\n3\n4\n",
        ["Which single cell changed?", "Welke ene cel veranderde?"],
      ),
    ],
    starter:
      "def set_cell(grid, row, column, value):\n    pass\n\ndef row_totals(grid):\n    return []\n\nprint(row_totals([[1, 2], [3, 4]]))\n",
    solution:
      "def set_cell(grid, row, column, value):\n    grid[row][column] = value\n\ndef row_totals(grid):\n    totals = []\n    for row in grid:\n        total = 0\n        for cell in row:\n            total += cell\n        totals.append(total)\n    return totals\n\nprint(row_totals([[1, 2], [3, 4]]))\n",
    tasks: [
      C(
        "2d-lists 2d-access 2d-mutation",
        [
          "Implement set_cell to change only grid[row][column]. Assume the supplied indexes exist and rows are independent.",
          "Implementeer set_cell om alleen grid[row][column] te wijzigen. Neem aan dat de indexen bestaan en rijen onafhankelijk zijn.",
        ],
        "callable(set_cell)",
        [
          ["Apply indexing twice.", "Pas indexeren twee keer toe."],
          [
            "The row index comes before the column index.",
            "De rijindex komt vóór de kolomindex.",
          ],
          ["grid[row][column] = value", "grid[row][column] = value"],
        ],
        [
          "Do not replace an entire row when only one cell should change.",
          "Vervang geen hele rij wanneer alleen één cel moet veranderen.",
        ],
        [
          F(
            "set_cell",
            [
              [
                [1, 2],
                [3, 4],
              ],
              1,
              0,
              9,
            ],
            "_args[0] == [[1,2],[9,4]]",
          ),
          F("set_cell", [[[0]], 0, 0, -2], "_args[0] == [[-2]]"),
        ],
      ),
      C(
        "nested-loops",
        [
          "Return a list containing each row’s sum from row_totals using nested loops. An empty row contributes 0.",
          "Geef vanuit row_totals een lijst met elke rijsom terug met geneste lussen. Een lege rij draagt 0 bij.",
        ],
        "row_totals([[1,2],[3,4]]) == [3,7]",
        [
          [
            "Each row needs its own fresh total.",
            "Elke rij heeft een eigen nieuw totaal nodig.",
          ],
          [
            "Reset total inside the row loop, before the cell loop.",
            "Zet total binnen de rijlus opnieuw op nul, vóór de cellus.",
          ],
          [
            "for cell in row:\n    total += cell",
            "for cell in row:\n    total += cell",
          ],
        ],
        [
          "Do not carry a previous row’s total into the next row.",
          "Neem het totaal van een vorige rij niet mee naar de volgende.",
        ],
        [
          F("row_totals", [[[], [3, -1], [0]]], "_return == [0,2,0]"),
          F("row_totals", [[]], "_return == []"),
        ],
      ),
    ],
    note: [
      "One indexing operation finds a row; the next finds a cell. Resetting the accumulator once per row creates independent totals.",
      "Eén indexbewerking vindt een rij; de volgende vindt een cel. Het totaal één keer per rij opnieuw instellen maakt onafhankelijke totalen.",
    ],
    experiment: [
      "Create row=[0,0] and grid=[row,row], change one cell, and explain the surprising shared update. Then create two separate row lists.",
      "Maak row=[0,0] en grid=[row,row], wijzig één cel en verklaar de verrassende gedeelde wijziging. Maak daarna twee aparte rijlijsten.",
    ],
  }),
  lesson(9, 5, {
    explanation: [
      "Translate a familiar build-a-list loop into a list comprehension. Use this compact form when the transformation and condition remain easy to read.",
      "Vertaal een bekende lijst-opbouwlus naar een lijstcomprehensie. Gebruik deze compacte vorm als de transformatie en voorwaarde leesbaar blijven.",
    ],
    sections: [
      S(
        "list-comprehensions conditional-comprehensions",
        [
          "Expression, iteration, condition",
          "Expressie, herhaling, voorwaarde",
        ],
        [
          "[expression for value in values] evaluates the expression once per value. Adding if condition at the end filters which values are included. The expression comes first in the syntax but is evaluated after choosing each value. Keep complicated state changes in ordinary loops.",
          "[expressie for value in values] berekent de expressie één keer per waarde. if voorwaarde achteraan filtert welke waarden worden opgenomen. De expressie staat syntactisch vooraan maar wordt berekend na het kiezen van elke waarde. Houd ingewikkelde toestandswijzigingen in gewone lussen.",
        ],
        "values = [-1, 0, 3]\nprint([v + 1 for v in values])\nprint([v + 1 for v in values if v >= 0])",
        "[0, 1, 4]\n[1, 4]\n",
        [
          "Does the condition inspect v or v + 1?",
          "Bekijkt de voorwaarde v of v + 1?",
        ],
      ),
    ],
    starter:
      "def double_all(values):\n    return []\n\ndef positive_doubles(values):\n    return []\n\nprint(double_all([-1, 0, 3]))\nprint(positive_doubles([-1, 0, 3]))\n",
    solution:
      "def double_all(values):\n    return [value * 2 for value in values]\n\ndef positive_doubles(values):\n    return [value * 2 for value in values if value > 0]\n\nprint(double_all([-1, 0, 3]))\nprint(positive_doubles([-1, 0, 3]))\n",
    tasks: [
      C(
        "list-comprehensions",
        [
          "Use a list comprehension to return twice every value from double_all.",
          "Gebruik een lijstcomprehensie om het dubbele van elke waarde vanuit double_all terug te geven.",
        ],
        'double_all([-1,0,3]) == [-2,0,6] and any(isinstance(n,_ast.ListComp) for n in _ast.walk(next(n for n in _ast.walk(_ast.parse(_source)) if isinstance(n,_ast.FunctionDef) and n.name == "double_all")))',
        [
          [
            "Put the transformation before for.",
            "Zet de transformatie vóór for.",
          ],
          [
            "Use a new variable to name each input value.",
            "Gebruik een nieuwe variabele voor elke invoerwaarde.",
          ],
          [
            "[value * 2 for value in values]",
            "[value * 2 for value in values]",
          ],
        ],
        [
          "The ordinary comprehension must keep zero and negative inputs.",
          "De gewone comprehensie moet nul en negatieve invoer behouden.",
        ],
        [
          F("double_all", [[]], "_return == []"),
          F(
            "double_all",
            [[2, -3]],
            "_return == [4,-6] and _args[0] == [2,-3]",
          ),
        ],
      ),
      C(
        "conditional-comprehensions",
        [
          "Use a conditional comprehension in positive_doubles to double only values strictly above zero.",
          "Gebruik in positive_doubles een voorwaardelijke comprehensie om alleen waarden strikt boven nul te verdubbelen.",
        ],
        "positive_doubles([-1,0,3]) == [6] and any(isinstance(n,_ast.ListComp) and n.generators[0].ifs for n in _ast.walk(_ast.parse(_source)))",
        [
          [
            "Filter the input before including its transformed value.",
            "Filter de invoer voordat de getransformeerde waarde wordt opgenomen.",
          ],
          ["Put if value > 0 at the end.", "Zet if value > 0 achteraan."],
          [
            "[value * 2 for value in values if value > 0]",
            "[value * 2 for value in values if value > 0]",
          ],
        ],
        [
          "The boundary zero must be excluded.",
          "De grens nul moet worden uitgesloten.",
        ],
        [
          F("positive_doubles", [[0, -3]], "_return == []"),
          F("positive_doubles", [[4, 1, 4]], "_return == [8,2,8]"),
        ],
      ),
    ],
    note: [
      "Both forms create new lists. Filtering does not replace rejected values with zero; it leaves them out completely.",
      "Beide vormen maken nieuwe lijsten. Filteren vervangt afgewezen waarden niet door nul; het laat ze helemaal weg.",
    ],
    experiment: [
      "Rewrite positive_doubles as a loop in a scratch file. Compare the order of operations and results on the same inputs.",
      "Herschrijf positive_doubles als lus in een kladbestand. Vergelijk uitvoervolgorde en resultaten bij dezelfde invoer.",
    ],
  }),
  lesson(9, 6, {
    explanation: [
      "Produce a report from recordings grouped by round. Return all round totals in original order and the three largest totals in descending order. Preserve all input rows; empty rounds total zero.",
      "Maak een rapport van opnames per ronde. Geef alle rondetotalen in oorspronkelijke volgorde en de drie grootste totalen in aflopende volgorde terug. Behoud alle invoerrijen; lege rondes tellen als nul.",
    ],
    sections: [
      S(
        "collections-review",
        ["Combine familiar operations", "Combineer bekende bewerkingen"],
        [
          "Separate processing from presentation. First derive one total per row. Then choose a sorted copy for the ranking and a slice for the top three. The report’s original-order totals remain useful even after ranking. Equivalent loop or comprehension approaches are welcome.",
          "Scheid verwerken van presenteren. Leid eerst één totaal per rij af. Kies daarna een gesorteerde kopie voor de rangschikking en een slice voor de beste drie. De totalen in oorspronkelijke volgorde blijven ook na rangschikken bruikbaar. Gelijkwaardige lussen of comprehensies zijn welkom.",
        ],
        "totals = [4, 9, 2, 6]\nprint(sorted(totals, reverse=True)[:2])\nprint(totals)",
        "[9, 6]\n[4, 9, 2, 6]\n",
        [
          "Which operation protects the original order?",
          "Welke bewerking beschermt de oorspronkelijke volgorde?",
        ],
      ),
    ],
    starter:
      "def round_report(rounds):\n    pass\n\nprint(round_report([[3, -1], [], [4, 2], [1]]))\n",
    solution:
      "def round_report(rounds):\n    totals = []\n    for row in rounds:\n        total = 0\n        for value in row:\n            total += value\n        totals.append(total)\n    leaders = sorted(totals, reverse=True)[:3]\n    return totals, leaders\n\nprint(round_report([[3, -1], [], [4, 2], [1]]))\n",
    tasks: [
      C(
        "collections-review",
        [
          "Return (totals, leaders), preserving round order in totals and selecting at most three descending leaders.",
          "Geef (totals, leaders) terug met de rondevolgorde in totals en maximaal drie aflopende leiders.",
        ],
        "round_report([[3,-1],[],[4,2],[1]]) == ([2,0,6,1],[6,2,1])",
        [
          [
            "Build the totals before ranking them.",
            "Maak de totalen voordat je ze rangschikt.",
          ],
          [
            "Sort a copy, then slice its first three items.",
            "Sorteer een kopie en neem de eerste drie items.",
          ],
          [
            "leaders = sorted(totals, reverse=True)[:3]",
            "leaders = sorted(totals, reverse=True)[:3]",
          ],
        ],
        [
          "Sorting totals in place would lose the original round order.",
          "totalen op hun plek sorteren zou de oorspronkelijke rondevolgorde verliezen.",
        ],
        [
          F(
            "round_report",
            [[[2], [9], [3], [7], [1]]],
            "_return == ([2,9,3,7,1],[9,7,3])",
          ),
        ],
      ),
      C(
        "collections-review",
        [
          "Handle empty input, empty rows, duplicate and negative totals without mutating rounds.",
          "Handel lege invoer, lege rijen, dubbele en negatieve totalen af zonder rounds te wijzigen.",
        ],
        "round_report([]) == ([],[])",
        [
          [
            "The same rules apply even when there are fewer than three rounds.",
            "Dezelfde regels gelden ook bij minder dan drie rondes.",
          ],
          [
            "A slice can safely stop beyond the list length.",
            "Een slice mag veilig voorbij de lijstlengte eindigen.",
          ],
          [
            "Start totals as [], and each row total as 0.",
            "Begin totals als [] en elk rijtotaal als 0.",
          ],
        ],
        [
          "Do not invent extra rounds or discard equal scores.",
          "Verzin geen extra rondes en verwijder geen gelijke scores.",
        ],
        [
          F(
            "round_report",
            [[[], [-4], [-4]]],
            "_return == ([0,-4,-4],[0,-4,-4]) and _args[0] == [[],[-4],[-4]]",
          ),
          F("round_report", [[]], "_return == ([],[])"),
        ],
      ),
    ],
    note: [
      "The reference separates aggregation, ordering and selection. This makes each step easy to inspect and keeps the original data reusable for a different report.",
      "De referentie scheidt optellen, ordenen en selecteren. Dat maakt elke stap controleerbaar en houdt de oorspronkelijke gegevens herbruikbaar voor een ander rapport.",
    ],
    experiment: [
      "Change the requirement to the top two and then to ascending order. Explain which single step changes for each request.",
      "Verander de eis naar de beste twee en daarna naar oplopende volgorde. Leg uit welke ene stap voor elk verzoek verandert.",
    ],
  }),
  lesson(10, 1, {
    explanation: [
      "Treat text as a sequence of characters, with indexing and slicing rules you already know. Strings share sequence operations with lists but are not lists.",
      "Behandel tekst als een reeks tekens met index- en sliceregels die je al kent. Strings delen reeksbewerkingen met lijsten maar zijn geen lijsten.",
    ],
    sections: [
      S(
        "string-indexing string-slicing string-length string-negative-indices",
        ["Inspect an identifier", "Bekijk een identificatiecode"],
        [
          "text[0] is the first character, text[-1] the last, and len(text) its length. A slice returns a string and excludes its stop index. An empty string has length zero and no valid single-character index. For this task the identifier is nonempty; a one-character identifier has no middle characters.",
          "text[0] is het eerste teken, text[-1] het laatste en len(text) de lengte. Een slice geeft een string terug en sluit de eindindex uit. Een lege string heeft lengte nul en geen geldige tekenindex. Voor deze taak is de code niet leeg; een code met één teken heeft geen middentekens.",
        ],
        'code = "AB-42"\nprint(code[0], code[-1], len(code))\nprint(code[1:-1])',
        "A 2 5\nB-4\n",
        [
          "Which characters do the slice boundaries leave out?",
          "Welke tekens laten de slicegrenzen weg?",
        ],
      ),
    ],
    starter:
      'def inspect(text):\n    return "", "", "", 0\n\nprint(inspect("LAB-7"))\n',
    solution:
      'def inspect(text):\n    return text[0], text[-1], text[1:-1], len(text)\n\nprint(inspect("LAB-7"))\n',
    tasks: [
      C(
        "string-indexing string-negative-indices",
        [
          "Return first and last characters as the first two items of inspect’s tuple. Assume text is nonempty.",
          "Geef het eerste en laatste teken terug als eerste twee items van inspect’s tuple. Neem aan dat text niet leeg is.",
        ],
        'inspect("LAB-7")[:2] == ("L","7")',
        [
          [
            "The last position can be found without hard-coding its number.",
            "De laatste positie kan zonder vast getal worden gevonden.",
          ],
          ["Use 0 and -1.", "Gebruik 0 en -1."],
          ["text[-1]", "text[-1]"],
        ],
        [
          "A different identifier length must still work.",
          "Een andere codelengte moet nog steeds werken.",
        ],
        [
          F("inspect", ["Z"], '_return[:2] == ("Z","Z")'),
          F("inspect", ["xy"], '_return[:2] == ("x","y")'),
        ],
      ),
      C(
        "string-slicing string-length",
        [
          "Return the middle slice and full length as the final two tuple items.",
          "Geef de middenslice en volledige lengte terug als laatste twee tuple-items.",
        ],
        'inspect("LAB-7")[2:] == ("AB-",5)',
        [
          [
            "Exclude the first and last character from the middle.",
            "Sluit het eerste en laatste teken uit van het midden.",
          ],
          [
            "Slice from index 1 up to -1.",
            "Neem een slice vanaf index 1 tot -1.",
          ],
          ["text[1:-1], len(text)", "text[1:-1], len(text)"],
        ],
        [
          "The middle can be empty even though the identifier is not.",
          "Het midden kan leeg zijn hoewel de code dat niet is.",
        ],
        [
          F("inspect", ["Z"], '_return[2:] == ("",1)'),
          F("inspect", ["abcd"], '_return[2:] == ("bc",4)'),
        ],
      ),
    ],
    note: [
      "Strings reuse sequence selection rules. Slicing preserves the string type and safely produces an empty middle for very short inputs.",
      "Strings hergebruiken regels voor reeksselectie. Slicen behoudt het stringtype en geeft veilig een leeg midden bij heel korte invoer.",
    ],
    experiment: [
      "Predict text[:3], text[3:] and text[-2:] for a chosen identifier. Explain why a slice is different from one indexed character.",
      "Voorspel text[:3], text[3:] en text[-2:] voor een eigen code. Leg uit waarom een slice verschilt van één geïndexeerd teken.",
    ],
  }),
  lesson(10, 2, {
    explanation: [
      "Repair text by constructing a new string. Unlike list elements, string characters cannot be replaced by indexed assignment.",
      "Repareer tekst door een nieuwe string te maken. Anders dan lijstitems kunnen stringtekens niet via indextoewijzing worden vervangen.",
    ],
    sections: [
      S(
        "string-immutability escapes string-concatenation",
        ["Build a replacement value", "Maak een vervangende waarde"],
        [
          'Strings are immutable. text[0] = "X" raises TypeError; "X" + text[1:] constructs a new value. Assigning that value changes the variable, not the original string object. Escapes let a literal include special characters: \\n is a newline, \\t a tab, \\\\ one backslash, and \\" a double quote inside double quotes.',
          'Strings zijn onveranderlijk. text[0] = "X" geeft TypeError; "X" + text[1:] maakt een nieuwe waarde. Die waarde toewijzen verandert de variabele, niet het oorspronkelijke stringobject. Escapes nemen speciale tekens op: \\n is een nieuwe regel, \\t een tab, \\\\ één backslash en \\" een dubbel aanhalingsteken binnen dubbele aanhalingstekens.',
        ],
        'text = "cat"\nnew = "b" + text[1:]\nprint(text, new)\nprint("A\\nB")\nprint("C:\\\\work")',
        "cat bat\nA\nB\nC:\\work\n",
        [
          "Which object changes when new is assigned?",
          "Welk object verandert als new wordt toegewezen?",
        ],
      ),
    ],
    starter:
      'def mark(text):\n    text[0] = "#"\n    return text\n\n# Create path and lines using escapes.\nprint(mark("code"))\n',
    solution:
      'def mark(text):\n    return "#" + text[1:]\n\npath = "C:\\\\temp"\nlines = "first\\nsecond"\nprint(mark("code"))\n',
    tasks: [
      C(
        "string-immutability string-concatenation",
        [
          'Make mark(text) return a new string beginning with # followed by text from index 1 onward. Empty text becomes "#".',
          'Laat mark(text) een nieuwe string teruggeven die begint met # gevolgd door text vanaf index 1. Lege tekst wordt "#".',
        ],
        'mark("code") == "#ode"',
        [
          [
            "Do not assign to a character position.",
            "Wijs niet aan een tekenpositie toe.",
          ],
          [
            "Join a new prefix and a slice.",
            "Voeg een nieuw voorvoegsel en een slice samen.",
          ],
          ['return "#" + text[1:]', 'return "#" + text[1:]'],
        ],
        [
          "Preserve the input text and handle an empty slice.",
          "Behoud de invoertekst en handel een lege slice af.",
        ],
        [
          F("mark", [""], '_return == "#"'),
          F("mark", ["X"], '_return == "#" and _args[0] == "X"'),
        ],
      ),
      C(
        "escapes",
        [
          "Set path to C:\\temp with one literal backslash, and lines to first and second separated by a newline. Use escaped string literals.",
          "Stel path in op C:\\temp met één letterlijke backslash en lines op first en second gescheiden door een nieuwe regel. Gebruik stringliterals met escapes.",
        ],
        'path == "C:" + chr(92) + "temp" and lines == "first\nsecond"',
        [
          [
            "A literal backslash must itself be escaped.",
            "Een letterlijke backslash moet zelf worden ge-escapet.",
          ],
          [
            "Use two backslashes for one, and backslash-n for a newline.",
            "Gebruik twee backslashes voor één en backslash-n voor een nieuwe regel.",
          ],
          ['lines = "first\\nsecond"', 'lines = "first\\nsecond"'],
        ],
        [
          "A single backslash before t creates a tab instead of the intended path.",
          "Eén backslash vóór t maakt een tab in plaats van het bedoelde pad.",
        ],
      ),
    ],
    note: [
      "A slice and concatenation create the corrected text without mutation. Escapes describe characters in a literal; they are not extra characters in the resulting string.",
      "Een slice en samenvoeging maken gecorrigeerde tekst zonder mutatie. Escapes beschrijven tekens in een literal; het zijn geen extra tekens in de resulterende string.",
    ],
    experiment: [
      "Print the path and its length. Then create a string containing a quote and a tab and explain each escape.",
      "Druk het pad en zijn lengte af. Maak daarna een string met een aanhalingsteken en een tab en verklaar elke escape.",
    ],
  }),
  lesson(10, 3, {
    explanation: [
      "Normalise text before comparing it. Create different case forms and inspect characters without changing the original string.",
      "Normaliseer tekst voordat je die vergelijkt. Maak verschillende hoofdlettervormen en bekijk tekens zonder de oorspronkelijke string te wijzigen.",
    ],
    sections: [
      S(
        "case-methods strip string-iteration string-membership",
        ["Normalise and inspect", "Normaliseer en bekijk"],
        [
          'strip() removes leading and trailing whitespace, not spaces in the middle. lower(), upper() and title() return new strings. for char in text iterates characters. char in "0123456789" asks whether a character belongs to that string; "ab" in text can also test a whole substring. not in reverses membership.',
          'strip() verwijdert witruimte voor en achter, niet spaties in het midden. lower(), upper() en title() geven nieuwe strings terug. for char in text doorloopt tekens. char in "0123456789" vraagt of een teken in die string zit; "ab" in text kan ook een hele deelstring testen. not in keert lidmaatschap om.',
        ],
        'name = "  aDa lovelace  "\nprint(name.strip().title())\nprint("ada" in name.lower())\nfor char in "a2":\n    print(char in "0123456789")',
        "Ada Lovelace\nTrue\nFalse\nTrue\n",
        [
          "Why does lower() alone leave the surrounding spaces?",
          "Waarom laat lower() alleen de omliggende spaties staan?",
        ],
      ),
    ],
    starter:
      'def forms(text):\n    return "", "", ""\n\ndef has_digit(text):\n    return False\n\nprint(forms("  aDa  "))\nprint(has_digit("Room 2"))\n',
    solution:
      'def forms(text):\n    clean = text.strip()\n    return clean.lower(), clean.upper(), clean.title()\n\ndef has_digit(text):\n    for char in text:\n        if char in "0123456789":\n            return True\n    return False\n\nprint(forms("  aDa  "))\nprint(has_digit("Room 2"))\n',
    tasks: [
      C(
        "case-methods strip",
        [
          "Return stripped lower, upper and title forms from forms(text), in that order.",
          "Geef vanuit forms(text) de getrimde kleineletter-, hoofdletter- en titelvorm terug, in die volgorde.",
        ],
        'forms("  aDa  ") == ("ada","ADA","Ada")',
        [
          [
            "Clean the edges once, then make the three versions.",
            "Schoon de randen één keer op en maak dan de drie versies.",
          ],
          [
            "Each string method returns a value you can use.",
            "Elke stringmethode geeft een bruikbare waarde terug.",
          ],
          ["clean = text.strip()", "clean = text.strip()"],
        ],
        [
          "Preserve internal spaces and remove leading or trailing tabs too.",
          "Behoud interne spaties en verwijder ook tabs voor of achter.",
        ],
        [
          F("forms", ["\tjo bo \n"], '_return == ("jo bo","JO BO","Jo Bo")'),
          F("forms", ["  "], '_return == ("","","")'),
        ],
      ),
      C(
        "string-iteration string-membership",
        [
          'In has_digit, iterate characters and return True if any is in "0123456789"; otherwise return False.',
          'Doorloop in has_digit tekens en geef True als er één in "0123456789" staat; geef anders False.',
        ],
        'has_digit("Room 2") is True',
        [
          [
            "A successful character can end the search early.",
            "Een gevonden teken kan het zoeken vroeg beëindigen.",
          ],
          [
            "Return False only after every character was checked.",
            "Geef False pas nadat elk teken is gecontroleerd.",
          ],
          [
            'if char in "0123456789":\n    return True',
            'if char in "0123456789":\n    return True',
          ],
        ],
        [
          "Do not return False after only the first nondigit.",
          "Geef niet na alleen het eerste niet-cijfer False terug.",
        ],
        [
          F("has_digit", ["abc9"], "_return is True"),
          F("has_digit", [""], "_return is False"),
          F("has_digit", ["abc"], "_return is False"),
        ],
      ),
    ],
    note: [
      "String methods create new values, so chaining them is natural. The early True and final False handle a match anywhere, including at the last character.",
      "Stringmethoden maken nieuwe waarden, dus ze combineren is logisch. De vroege True en laatste False behandelen een match overal, ook bij het laatste teken.",
    ],
    experiment: [
      'Compare " room " == "room" before and after strip. Try membership with a whole substring, then with a different case.',
      'Vergelijk " room " == "room" vóór en na strip. Probeer lidmaatschap met een hele deelstring en daarna met een andere hoofdlettervorm.',
    ],
  }),
  lesson(10, 4, {
    explanation: [
      "Split plain text according to its actual separator, then join known string parts. Distinguish arbitrary whitespace from an explicit delimiter.",
      "Splits gewone tekst volgens zijn echte scheidingsteken en voeg bekende stringdelen samen. Onderscheid willekeurige witruimte van een expliciet scheidingsteken.",
    ],
    sections: [
      S(
        "split-whitespace split-delimiter split-newlines split-tabs join",
        [
          "Separators change the result",
          "Scheidingstekens veranderen het resultaat",
        ],
        [
          'split() groups runs of whitespace and drops empty edge fields. split(",") splits only commas and preserves empty fields. split("\\t") handles tabs; split("\\n") handles newlines but leaves a final empty field after a trailing newline. splitlines() recognises line endings and avoids that trailing field. separator.join(parts) joins strings using exactly that separator. This is for simple text; CSV requires its own parser later.',
          'split() groepeert reeksen witruimte en laat lege randvelden weg. split(",") splitst alleen komma’s en behoudt lege velden. split("\\t") behandelt tabs; split("\\n") behandelt nieuwe regels maar laat na een afsluitende nieuwe regel een leeg veld. splitlines() herkent regeleinden en vermijdt dat afsluitende veld. scheiding.join(delen) voegt strings samen met precies dat scheidingsteken. Dit is voor eenvoudige tekst; CSV vereist later een eigen parser.',
        ],
        'print(" a  b\\tc ".split())\nprint("a,,b".split(","))\nprint("a\\nb\\n".splitlines())\nprint(" / ".join(["a", "b"]))',
        "['a', 'b', 'c']\n['a', '', 'b']\n['a', 'b']\na / b\n",
        [
          "Why does the comma example retain an empty string?",
          "Waarom behoudt het kommavoorbeeld een lege string?",
        ],
      ),
    ],
    starter:
      'def split_views(text):\n    return [], [], [], []\n\ndef rebuild(parts):\n    return ""\n\nprint(split_views("a,b\\tc\\nd"))\n',
    solution:
      'def split_views(text):\n    return text.split(), text.split(","), text.split("\\n"), text.split("\\t")\n\ndef rebuild(parts):\n    return " | ".join(parts)\n\nprint(split_views("a,b\\tc\\nd"))\n',
    tasks: [
      C(
        "split-whitespace split-delimiter split-newlines split-tabs",
        [
          "Return four lists from split_views: whitespace words, comma fields, newline fields, and tab fields, in that order. Preserve explicit empty fields.",
          "Geef vier lijsten terug vanuit split_views: witruimtewoorden, kommavelden, regelvelden en tabvelden, in die volgorde. Behoud expliciete lege velden.",
        ],
        'len(split_views("a,b")) == 4',
        [
          [
            "The separator is an argument to split.",
            "Het scheidingsteken is een argument van split.",
          ],
          [
            "Use no argument only for arbitrary whitespace.",
            "Gebruik alleen bij willekeurige witruimte geen argument.",
          ],
          [
            'text.split(), text.split(","), text.split("\\n"), text.split("\\t")',
            'text.split(), text.split(","), text.split("\\n"), text.split("\\t")',
          ],
        ],
        [
          "Explicit separators and whitespace splitting treat empty fields differently.",
          "Expliciete scheidingstekens en witruimtesplitsing behandelen lege velden anders.",
        ],
        [
          F(
            "split_views",
            ["a,,b\tc\nd"],
            '_return == (["a,,b","c","d"],["a","","b\tc\nd"],["a,,b\tc","d"],["a,,b","c\nd"])',
          ),
          F("split_views", [""], '_return == ([],[""],[""],[""])'),
        ],
      ),
      C(
        "join",
        [
          'Return parts joined with " | " from rebuild, including empty and one-item lists.',
          'Geef parts samengevoegd met " | " terug vanuit rebuild, ook bij lege lijsten en lijsten met één item.',
        ],
        'rebuild(["red","blue"]) == "red | blue"',
        [
          [
            "The separator owns the join method.",
            "Het scheidingsteken heeft de join-methode.",
          ],
          [
            "The input parts are all strings.",
            "Alle invoerdelen zijn strings.",
          ],
          ['return " | ".join(parts)', 'return " | ".join(parts)'],
        ],
        [
          "Avoid a trailing separator; join places separators only between parts.",
          "Vermijd een scheidingsteken achteraan; join zet ze alleen tussen delen.",
        ],
        [
          F("rebuild", [[]], '_return == ""'),
          F("rebuild", [["x"]], '_return == "x"'),
          F("rebuild", [["a", "", "b"]], '_return == "a |  | b"'),
        ],
      ),
    ],
    note: [
      "Each split uses a deliberately different rule. join does not guess separators or trim fields; it preserves the provided strings and places a separator between them.",
      "Elke split gebruikt bewust een andere regel. join raadt geen scheidingstekens en trimt geen velden; het behoudt de strings en zet er een scheidingsteken tussen.",
    ],
    experiment: [
      'Compare split("\\n") and splitlines() on text ending in a newline. Then split and rejoin a string with an empty middle field.',
      'Vergelijk split("\\n") en splitlines() bij tekst die op een nieuwe regel eindigt. Splits en voeg daarna tekst met een leeg middenveld opnieuw samen.',
    ],
  }),
  lesson(10, 5, {
    explanation: [
      "Search and replace text, then format reports using positional and named placeholders. Learn the older .format interface as well as the f-strings already used.",
      "Zoek en vervang tekst en formatteer rapporten met positionele en benoemde invulvelden. Leer de oudere .format-interface naast de al gebruikte f-strings.",
    ],
    sections: [
      S(
        "replace find format-positional format-named",
        ["Search results are positions", "Zoekresultaten zijn posities"],
        [
          'replace(old, new) returns changed text; find(fragment) returns the first index or -1 when absent. Index 0 is a successful match, so do not use a truthiness test. "{0}: {1}".format(name, value) selects positional arguments; "{who}: {n}".format(who=name, n=value) selects named arguments. An f-string embeds current expressions instead.',
          'replace(oud, nieuw) geeft gewijzigde tekst terug; find(deel) geeft de eerste index of -1 bij afwezigheid. Index 0 is een geslaagde match, dus gebruik geen waarheidstest. "{0}: {1}".format(naam, waarde) kiest positionele argumenten; "{who}: {n}".format(who=naam, n=waarde) kiest benoemde argumenten. Een f-string neemt daarentegen huidige expressies op.',
        ],
        'text = "go?".replace("?", "!")\nprint(text.find("!"))\nprint("{0}: {1}".format("Ada", 4))\nprint("{who}: {n}".format(who="Bo", n=5))',
        "2\nAda: 4\nBo: 5\n",
        [
          "What does find return for a missing exclamation mark?",
          "Wat geeft find terug bij een ontbrekend uitroepteken?",
        ],
      ),
    ],
    starter:
      'def edited(text):\n    return text, -1\n\ndef positional(name, score):\n    return ""\n\ndef named(name, score):\n    return ""\n\nprint(edited("Ready?"))\n',
    solution:
      'def edited(text):\n    clean = text.replace("?", "!")\n    return clean, clean.find("!")\n\ndef positional(name, score):\n    return "{0}: {1}".format(name, score)\n\ndef named(name, score):\n    return "{who}: {points}".format(who=name, points=score)\n\nprint(edited("Ready?"))\n',
    tasks: [
      C(
        "replace find",
        [
          "Return (changed_text, position) from edited: replace every ? with !, then find the first !.",
          "Geef (gewijzigde_tekst, positie) terug vanuit edited: vervang elke ? door ! en zoek dan de eerste !.",
        ],
        'edited("Ready?") == ("Ready!",5)',
        [
          [
            "Search the replacement result, not the original.",
            "Doorzoek het vervangingsresultaat, niet het origineel.",
          ],
          [
            "Store replace’s return value before calling find.",
            "Bewaar de terugkeerwaarde van replace vóór find.",
          ],
          ['return clean, clean.find("!")', 'return clean, clean.find("!")'],
        ],
        [
          "Index zero is a match; absence is -1.",
          "Index nul is een match; afwezigheid is -1.",
        ],
        [
          F("edited", ["?ok?"], '_return == ("!ok!",0)'),
          F("edited", ["plain"], '_return == ("plain",-1)'),
        ],
      ),
      C(
        "format-positional format-named",
        [
          'Implement positional and named with .format using their respective placeholder forms. Both return "name: score".',
          'Implementeer positional en named met .format en hun bijbehorende invulvormen. Beide geven "naam: score" terug.',
        ],
        'positional("Jo",3) == "Jo: 3" and named("Jo",3) == "Jo: 3"',
        [
          [
            "The placeholders choose arguments supplied to format.",
            "De invulvelden kiezen argumenten die aan format worden meegegeven.",
          ],
          [
            "Use numeric placeholders in one function and named placeholders in the other.",
            "Gebruik numerieke invulvelden in de ene functie en benoemde in de andere.",
          ],
          [
            '"{who}: {points}".format(who=name, points=score)',
            '"{who}: {points}".format(who=name, points=score)',
          ],
        ],
        [
          "Keep the name, colon, single space and score in the requested order.",
          "Houd naam, dubbele punt, enkele spatie en score in de gevraagde volgorde.",
        ],
        [
          F("positional", ["X", 0], '_return == "X: 0"'),
          F("named", ["Y", -2], '_return == "Y: -2"'),
        ],
      ),
    ],
    note: [
      "Replacement returns a new value before searching. The two formatting functions have identical behaviour but demonstrate two supported argument-selection styles.",
      "Vervangen geeft een nieuwe waarde terug vóór het zoeken. De twee formatteerfuncties hebben identiek gedrag maar tonen twee ondersteunde stijlen om argumenten te kiezen.",
    ],
    experiment: [
      "Rewrite one report as an f-string and compare the result. Keep the requested .format versions for this practice; independent tasks accept either style.",
      "Herschrijf één rapport als f-string en vergelijk het resultaat. Behoud de gevraagde .format-versies voor deze oefening; zelfstandige taken accepteren beide stijlen.",
    ],
  }),
  lesson(10, 6, {
    explanation: [
      "Clean a supplied text dataset into reusable tags. Each line is a candidate: trim the edges, convert to lowercase, replace internal spaces with hyphens, discard empty tags and duplicates, then return tags alphabetically.",
      "Schoon een tekstverzameling op tot herbruikbare tags. Elke regel is een kandidaat: trim de randen, maak kleine letters, vervang interne spaties door streepjes, verwijder lege tags en duplicaten en geef de tags alfabetisch terug.",
    ],
    sections: [
      S(
        "strings-review",
        ["A small transformation pipeline", "Een korte reeks transformaties"],
        [
          "Write down the order of operations: splitting, cleaning, filtering, deduplicating and ordering. List membership uses in just as string membership does, but compares whole items. Avoid joining too early: keep separate values until processing is finished.",
          "Schrijf de bewerkingsvolgorde op: splitsen, opschonen, filteren, ontdubbelen en ordenen. Lijstlidmaatschap gebruikt in net als strings, maar vergelijkt hele items. Voeg niet te vroeg samen: houd waarden apart tot de verwerking klaar is.",
        ],
        'parts = " A ; B ".split(";")\nclean = [part.strip().lower() for part in parts]\nprint(" / ".join(clean))',
        "a / b\n",
        [
          "Which stage changes the case, and which creates the final text?",
          "Welke stap verandert hoofdletters en welke maakt de eindtekst?",
        ],
      ),
    ],
    starter:
      'def clean_tags(text):\n    pass\n\nprint(clean_tags(" Ada \\nBo\\nada\\n \\nCee Dee"))\n',
    solution:
      'def clean_tags(text):\n    tags = []\n    for line in text.splitlines():\n        tag = line.strip().lower().replace(" ", "-")\n        if tag != "" and tag not in tags:\n            tags.append(tag)\n    return sorted(tags)\n\nprint(clean_tags(" Ada \\nBo\\nada\\n \\nCee Dee"))\n',
    tasks: [
      C(
        "strings-review",
        [
          "Implement clean_tags according to the brief and return a sorted list of strings.",
          "Implementeer clean_tags volgens de beschrijving en geef een gesorteerde lijst strings terug.",
        ],
        'clean_tags(" Ada \nBo\nada\n \nCee Dee") == ["ada","bo","cee-dee"]',
        [
          [
            "Keep each line separate during cleaning.",
            "Houd elke regel apart tijdens opschonen.",
          ],
          [
            "Apply strip, lowercase and space replacement before comparing tags.",
            "Pas trimmen, kleine letters en spatievervanging toe vóór tags vergelijken.",
          ],
          [
            'tag = line.strip().lower().replace(" ", "-")',
            'tag = line.strip().lower().replace(" ", "-")',
          ],
        ],
        [
          "Compare duplicates after normalisation, not before it.",
          "Vergelijk duplicaten na normalisatie, niet ervoor.",
        ],
        [
          F(
            "clean_tags",
            ["Zed\nAlpha Beta\nzed"],
            '_return == ["alpha-beta","zed"]',
          ),
        ],
      ),
      C(
        "strings-review",
        [
          "Handle empty or whitespace-only text and preserve one copy of repeated tags.",
          "Handel lege tekst en alleen witruimte af en behoud één kopie van herhaalde tags.",
        ],
        'clean_tags("") == []',
        [
          [
            "An empty line is not a useful tag.",
            "Een lege regel is geen bruikbare tag.",
          ],
          [
            "Filter empty strings after trimming.",
            "Filter lege strings na trimmen.",
          ],
          [
            'if tag != "" and tag not in tags:',
            'if tag != "" and tag not in tags:',
          ],
        ],
        [
          "Do not include an empty tag or repeat the same cleaned tag.",
          "Neem geen lege tag op en herhaal dezelfde opgeschoonde tag niet.",
        ],
        [
          F("clean_tags", [" \n\t\n"], "_return == []"),
          F("clean_tags", ["A\na\n A "], '_return == ["a"]'),
        ],
      ),
    ],
    note: [
      "Normalising before deduplication makes differently typed versions equivalent. Sorting a finished list separates ordering from the cleanup decisions.",
      "Normaliseren vóór ontdubbelen maakt anders getypte versies gelijkwaardig. De voltooide lijst sorteren scheidt ordening van opschoningsbeslissingen.",
    ],
    experiment: [
      "Add a repeated tag with different case and surrounding whitespace. Then add two internal spaces; explain why the current brief produces two hyphens.",
      "Voeg een herhaalde tag toe met andere hoofdletters en witruimte eromheen. Voeg daarna twee interne spaties toe; leg uit waarom de huidige beschrijving twee streepjes oplevert.",
    ],
  }),
];
