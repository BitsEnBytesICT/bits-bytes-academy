import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(17, slug, s);
export const activities = [
  f("insert", {
    title: ["Insert at a chosen position", "Voeg op een gekozen positie in"],
    topics: "insert",
    requires: "append indexing",
    why: [
      "append always adds at the end; insert can put an item before an existing position.",
      "append voegt altijd achteraan toe; insert kan een item vóór een bestaande positie zetten.",
    ],
    teach: [
      "items.insert(index, value) shifts later elements right and changes the list in place. insert(0, value) adds at the front. Like append, insert returns None. Do not replace your list with that return value.",
      "items.insert(index, value) verschuift latere elementen naar rechts en verandert de lijst zelf. insert(0, value) voegt vooraan toe. Net als append geeft insert None terug. Vervang je lijst niet door die terugkeerwaarde.",
    ],
    rule: [
      "Insertion adds a position; indexed assignment replaces one.",
      "Invoegen voegt een positie toe; indextoewijzing vervangt er één.",
    ],
    example: 'queue = ["Bo", "Mila"]\nqueue.insert(1,"Ada")\nprint(queue)',
    output: "['Bo', 'Ada', 'Mila']\n",
    predict: ["Did Mila disappear or move?", "Verdween Mila of verschoof die?"],
    name: "prioritise",
    params: "queue, person",
    body: "queue.insert(0, person)\nreturn queue",
    task: [
      "Use insert to place person at the front of queue and return the same list.",
      "Gebruik insert om person vooraan in queue te zetten en geef dezelfde lijst terug.",
    ],
    check:
      'any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == "insert" for n in _ast.walk(_ast.parse(_source)))',
    help: [
      "Insert at zero without assigning the method result.",
      "Voeg in op nul zonder het methoderesultaat toe te wijzen.",
    ],
    fragment: "queue.insert(0, person)",
    cases: [
      [[["Bo"], "Ada"], '_return == ["Ada","Bo"] and _return is _args[0]'],
      [[[], "A"], '_return == ["A"]'],
    ],
    change: [
      "Insert another person at position one.",
      "Voeg nog iemand op positie één in.",
    ],
    explain: [
      "Inserting shifts the existing queue instead of overwriting its first member.",
      "Invoegen verschuift de bestaande wachtrij in plaats van het eerste lid te overschrijven.",
    ],
  }),
  f("remove", {
    title: ["Remove by value", "Verwijder op waarde"],
    topics: "remove membership-lists",
    requires: "lists if",
    why: [
      "Sometimes you know which value to remove rather than where it is.",
      "Soms weet je welke waarde je wilt verwijderen in plaats van waar die staat.",
    ],
    teach: [
      "items.remove(value) removes the first matching element and returns None. It raises ValueError if the value is absent. value in items tests membership with a Boolean, so you can guard removal. It removes only one occurrence, not every duplicate.",
      "items.remove(value) verwijdert het eerste overeenkomende element en geeft None terug. Bij afwezigheid ontstaat ValueError. value in items test aanwezigheid met een booleaanse waarde, zodat je verwijderen kunt bewaken. Het verwijdert slechts één voorkomen, niet alle duplicaten.",
    ],
    rule: [
      "remove selects by value and removes the first match.",
      "remove kiest op waarde en verwijdert de eerste overeenkomst.",
    ],
    example:
      "items = [4,2,4]\nitems.remove(4)\nprint(items)\nprint(9 in items)",
    output: "[2, 4]\nFalse\n",
    predict: [
      "Why is one 4 still present?",
      "Waarom is er nog één 4 aanwezig?",
    ],
    name: "remove_once",
    params: "items, target",
    body: "if target in items:\n    items.remove(target)\nreturn items",
    task: [
      "Use remove to remove one target if present; preserve the list when absent. Return items.",
      "Gebruik remove om één target te verwijderen als die aanwezig is; behoud de lijst bij afwezigheid. Geef items terug.",
    ],
    check:
      'any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == "remove" for n in _ast.walk(_ast.parse(_source)))',
    help: [
      "Guard the method with a membership check.",
      "Bewaak de methode met een aanwezigheidscontrole.",
    ],
    fragment: "if target in items:",
    cases: [
      [[[2, 2, 3], 2], "_return == [2,3]"],
      [[[2], 9], "_return == [2]"],
      [[[], 1], "_return == []"],
    ],
    change: [
      "Call twice on a list with two copies of the target.",
      "Roep tweemaal aan bij een lijst met twee kopieën van het doel.",
    ],
    explain: [
      "The guard avoids ValueError while each call removes at most one matching item.",
      "De bewaking voorkomt ValueError terwijl elke aanroep maximaal één passend item verwijdert.",
    ],
  }),
  f("pop", {
    title: [
      "Remove by index and keep the value",
      "Verwijder op index en bewaar de waarde",
    ],
    topics: "pop",
    requires: "remove indexing length",
    why: [
      "pop both removes an item and gives that item back to you.",
      "pop verwijdert een item en geeft dat item aan je terug.",
    ],
    teach: [
      "items.pop(index) removes and returns the element at that index. Omitting the index selects the last element. Unlike remove, its argument is a position rather than a value. A missing position raises IndexError; guard an empty list before popping.",
      "items.pop(index) verwijdert het element op die index en geeft het terug. Zonder index wordt het laatste element gekozen. Anders dan bij remove is het argument een positie in plaats van een waarde. Een ontbrekende positie veroorzaakt IndexError; bewaak een lege lijst vóór pop.",
    ],
    rule: [
      "pop returns the removed element, not the remaining list.",
      "pop geeft het verwijderde element terug, niet de overgebleven lijst.",
    ],
    example:
      'queue = ["Ada","Bo"]\nnext_person = queue.pop(0)\nprint(next_person)\nprint(queue)',
    output: "Ada\n['Bo']\n",
    predict: [
      "What would pop() without 0 remove?",
      "Wat verwijdert pop() zonder 0?",
    ],
    name: "take_next",
    params: "queue",
    body: "if len(queue) == 0:\n    return None\nreturn queue.pop(0)",
    task: [
      "Use pop to remove and return the first item, or return None for an empty queue.",
      "Gebruik pop om het eerste item te verwijderen en terug te geven, of geef None bij een lege wachtrij.",
    ],
    check:
      'any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == "pop" for n in _ast.walk(_ast.parse(_source)))',
    help: [
      "Handle the empty case before accessing the first position.",
      "Verwerk het lege geval vóór toegang tot de eerste positie.",
    ],
    fragment: "return queue.pop(0)",
    cases: [
      [[["A", "B"]], '_return == "A" and _args[0] == ["B"]'],
      [[[]], "_return is None"],
    ],
    change: [
      "Explain the different results of pop(0) and remove(0) on [5, 0].",
      "Leg de verschillende resultaten uit van pop(0) en remove(0) op [5, 0].",
    ],
    explain: [
      "The function returns the removed person and leaves the caller’s queue shortened.",
      "De functie geeft de verwijderde persoon terug en laat de wachtrij van de aanroeper verkort achter.",
    ],
  }),
  f("slicing", {
    title: ["Take a slice of a list", "Neem een deel van een lijst"],
    topics: "slicing omitted-slice-bounds count",
    requires: "indexing copying",
    why: [
      "Slices extract a consecutive part without changing the source list.",
      "Deellijsten halen een opeenvolgend deel op zonder de bronlijst te wijzigen.",
    ],
    teach: [
      "items[start:stop] includes start and excludes stop. An omitted start means the beginning; an omitted stop means the end. Negative bounds count from the end. items[:] makes a shallow copy. Unlike single indexing, a slice can safely run past an end. items.count(value) returns how many equal values occur.",
      "items[start:stop] neemt start mee en sluit stop uit. Een ontbrekend begin betekent het begin; een ontbrekend einde betekent het einde. Negatieve grenzen tellen vanaf het einde. items[:] maakt een oppervlakkige kopie. Anders dan één index mag een deelbereik veilig voorbij een einde lopen. items.count(value) geeft hoe vaak gelijke waarden voorkomen.",
    ],
    rule: [
      "A slice excludes its stop and leaves the source intact.",
      "Een deelbereik sluit zijn stop uit en laat de bron intact.",
    ],
    example:
      "values = [1,2,2,4]\nprint(values[1:3])\nprint(values[:2])\nprint(values[-2:])\nprint(values.count(2))",
    output: "[2, 2]\n[1, 2]\n[2, 4]\n2\n",
    predict: [
      "Why does [1:3] contain two elements?",
      "Waarom bevat [1:3] twee elementen?",
    ],
    name: "window",
    params: "values",
    check:
      'any(isinstance(n, _ast.Subscript) and isinstance(n.slice, _ast.Slice) for n in _ast.walk(_ast.parse(_source))) and any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == "count" for n in _ast.walk(_ast.parse(_source)))',
    body: "recent = values[-3:]\nreturn recent, recent.count(0)",
    task: [
      "Return (last_three_values, zero_count_in_those_values), using slicing and count. Shorter lists keep all their values.",
      "Geef (last_three_values, zero_count_in_those_values) terug met een deelbereik en count. Kortere lijsten behouden al hun waarden.",
    ],
    help: [
      "Slice first so the count applies only to the selected part.",
      "Neem eerst het deel zodat het tellen alleen daarop slaat.",
    ],
    fragment: "values[-3:]",
    cases: [
      [[[0, 1, 0, 2]], "_return == ([1,0,2],1)"],
      [[[0]], "_return == ([0],1)"],
      [[[]], "_return == ([],0)"],
    ],
    change: [
      "Compare [:3], [3:] and [-3:] on the same list.",
      "Vergelijk [:3], [3:] en [-3:] op dezelfde lijst.",
    ],
    explain: [
      "Negative slicing naturally handles short lists; count reports occurrences in the selected window.",
      "Negatieve deellijsten verwerken korte lijsten vanzelf; count telt voorkomens in het gekozen deel.",
    ],
  }),
  f("sorting", {
    title: [
      "Sort in place or make a sorted copy",
      "Sorteer ter plaatse of maak een gesorteerde kopie",
    ],
    topics: "sort sorted",
    requires: "copying none",
    why: [
      "Sorting order and preserving original order are different decisions.",
      "Sorteervolgorde en oorspronkelijke volgorde bewaren zijn verschillende beslissingen.",
    ],
    teach: [
      "items.sort() rearranges the existing list and returns None. sorted(items) creates a new sorted list. Both accept reverse=True for descending order. Do not assign items = items.sort(): that loses the list reference. Use sorted when the original order matters.",
      "items.sort() herschikt de bestaande lijst en geeft None terug. sorted(items) maakt een nieuwe gesorteerde lijst. Beide accepteren reverse=True voor aflopende volgorde. Gebruik niet items = items.sort(): daarmee verlies je de lijstverwijzing. Gebruik sorted als de oorspronkelijke volgorde telt.",
    ],
    rule: [
      "sort mutates and returns None; sorted returns a new list.",
      "sort verandert de lijst en geeft None; sorted geeft een nieuwe lijst.",
    ],
    example:
      "scores = [3,1,2]\nprint(sorted(scores))\nprint(scores)\nprint(scores.sort())\nprint(scores)",
    output: "[1, 2, 3]\n[3, 1, 2]\nNone\n[1, 2, 3]\n",
    predict: [
      "Which call changes scores itself?",
      "Welke aanroep verandert scores zelf?",
    ],
    name: "ranked",
    params: "scores",
    body: "return sorted(scores, reverse=True)",
    starter: "def ranked(scores):\n    return scores.sort(reverse=True)\n",
    task: [
      "Repair ranked to return descending scores without changing the input.",
      "Herstel ranked om aflopende scores terug te geven zonder de invoer te veranderen.",
    ],
    help: [
      "Choose the operation that returns a separate list.",
      "Kies de bewerking die een aparte lijst teruggeeft.",
    ],
    fragment: "sorted(scores, reverse=True)",
    cases: [
      [[[3, 1, 2]], "_return == [3,2,1] and _args[0] == [3,1,2]"],
      [[[]], "_return == []"],
      [[[2, 2, -1]], "_return == [2,2,-1]"],
    ],
    change: [
      "Add duplicate values and check they remain in the result.",
      "Voeg dubbele waarden toe en controleer dat ze behouden blijven.",
    ],
    explain: [
      "sorted supplies the list the caller expects while leaving the original order intact.",
      "sorted levert de verwachte lijst aan de aanroeper terwijl de oorspronkelijke volgorde intact blijft.",
    ],
    guidance: "adapt",
  }),
  f("nested-grid", {
    title: ["Read and change a grid", "Lees en verander een raster"],
    topics: "2d-lists 2d-access 2d-mutation aliasing",
    requires: "list-mutation copying",
    why: [
      "A list can contain other lists. This represents rows in a small grid.",
      "Een lijst kan andere lijsten bevatten. Daarmee stel je rijen in een klein raster voor.",
    ],
    teach: [
      "grid[row][column] first selects a row list, then a value in that row. Each dimension starts at zero. Assigning grid[1][0] changes the second row’s first element. A shallow outer copy still shares the inner row lists. Do not build independent rows with [[0,0]] * 2: both positions refer to the same row. Write distinct row lists or create each row separately.",
      "grid[row][column] kiest eerst een rijlijst en daarna een waarde in die rij. Elke dimensie begint bij nul. grid[1][0] toewijzen verandert het eerste element van de tweede rij. Een oppervlakkige buitenste kopie deelt de binnenste rijlijsten nog steeds. Maak geen onafhankelijke rijen met [[0,0]] * 2: beide posities verwijzen naar dezelfde rij. Schrijf aparte rijlijsten of maak elke rij afzonderlijk.",
    ],
    rule: [
      "Nested indexing follows outer row, then inner column.",
      "Genest indexeren volgt eerst de buitenste rij en daarna de binnenste kolom.",
    ],
    example: "grid = [[1,2],[3,4]]\ngrid[1][0] = 9\nprint(grid)",
    output: "[[1, 2], [9, 4]]\n",
    predict: ["Which index selects the row?", "Welke index kiest de rij?"],
    name: "mark",
    params: "grid, row, column",
    body: 'grid[row][column] = "X"\nreturn grid',
    task: [
      "Replace the selected cell with X and return grid. The supplied indexes are valid.",
      "Vervang de gekozen cel door X en geef grid terug. De gegeven indexen zijn geldig.",
    ],
    help: [
      "Apply the row index before the column index.",
      "Pas de rij-index vóór de kolomindex toe.",
    ],
    fragment: 'grid[row][column] = "X"',
    cases: [
      [
        [
          [
            [0, 0],
            [0, 0],
          ],
          1,
          0,
        ],
        '_return == [[0,0],["X",0]]',
      ],
      [[[[1, 2, 3]], 0, 2], '_return == [[1,2,"X"]]'],
    ],
    change: [
      "Copy only the outer grid, modify one inner row, and observe the shared row.",
      "Kopieer alleen het buitenste raster, verander één binnenste rij en bekijk de gedeelde rij.",
    ],
    explain: [
      "The two indexes select one cell while preserving every other position.",
      "De twee indexen kiezen één cel en behouden alle andere posities.",
    ],
  }),
  f("nested-loops", {
    title: ["Visit rows and their elements", "Bezoek rijen en hun elementen"],
    topics: "nested-loops",
    requires: "2d-lists for",
    why: [
      "An outer loop can select each row while an inner loop processes that row’s values.",
      "Een buitenste lus kan elke rij kiezen terwijl een binnenste lus de waarden van die rij verwerkt.",
    ],
    teach: [
      "For each outer iteration, the inner loop runs completely before the outer loop advances. The inner body is indented twice. Rows may have different lengths, including zero; iterating values handles this without fixed dimensions. Initialise a whole-grid accumulator before both loops.",
      "Voor elke buitenste iteratie draait de binnenste lus volledig voordat de buitenste verdergaat. De binnenste inhoud springt tweemaal in. Rijen kunnen verschillende lengten hebben, inclusief nul; waarden doorlopen verwerkt dit zonder vaste afmetingen. Initialiseer een accumulator voor het hele raster vóór beide lussen.",
    ],
    rule: [
      "The inner loop starts again for every outer value.",
      "De binnenste lus begint opnieuw voor elke buitenste waarde.",
    ],
    example:
      "for row in [[1,2],[3]]:\n    for value in row:\n        print(value)",
    output: "1\n2\n3\n",
    predict: [
      "How many times does the inner body run in total?",
      "Hoe vaak draait de binnenste inhoud in totaal?",
    ],
    name: "grid_total",
    params: "grid",
    check:
      "any(isinstance(n, _ast.For) and any(isinstance(inner, _ast.For) and inner is not n for inner in _ast.walk(n)) for n in _ast.walk(_ast.parse(_source)))",
    body: "total = 0\nfor row in grid:\n    for value in row:\n        total += value\nreturn total",
    task: [
      "Use nested loops to return the sum of all numbers, including for empty or uneven rows.",
      "Gebruik geneste lussen om de som van alle getallen terug te geven, ook bij lege of ongelijke rijen.",
    ],
    help: [
      "Keep one total outside both loops.",
      "Houd één totaal buiten beide lussen.",
    ],
    fragment: "for value in row:",
    cases: [
      [[[[1, 2], [], [-1]]], "_return == 2"],
      [[[]], "_return == 0"],
      [[[[], []]], "_return == 0"],
    ],
    change: [
      "Trace the total for each inner iteration of [[2], [3, 4]].",
      "Volg het totaal bij elke binnenste iteratie van [[2], [3, 4]].",
    ],
    explain: [
      "Both loops visit each actual element once without assuming a rectangular shape.",
      "Beide lussen bezoeken elk werkelijk element eenmaal zonder een rechthoekige vorm aan te nemen.",
    ],
  }),
  f("comprehensions", {
    title: [
      "Express a simple transformation compactly",
      "Schrijf een eenvoudige omzetting compact",
    ],
    topics: "list-comprehensions conditional-list-comprehensions",
    requires: "filtering nested-loops",
    why: [
      "A comprehension is a compact way to build a new list from a simple loop.",
      "Een comprehension is een compacte manier om vanuit een eenvoudige lus een nieuwe lijst te maken.",
    ],
    teach: [
      "[expression for value in values] evaluates expression for each value. A final if condition keeps only matching inputs: [n * 2 for n in values if n > 0]. Read the for and if first, then the expression. Prefer ordinary loops when several actions or complex branches would make a comprehension hard to read.",
      "[uitdrukking for waarde in waarden] berekent de uitdrukking voor elke waarde. Een afsluitende if-voorwaarde bewaart alleen passende invoer: [n * 2 for n in values if n > 0]. Lees eerst for en if en daarna de uitdrukking. Gebruik gewone lussen als meerdere acties of complexe takken een comprehension moeilijk leesbaar maken.",
    ],
    rule: [
      "A comprehension builds a list; its optional if filters inputs.",
      "Een comprehension bouwt een lijst; de optionele if filtert invoer.",
    ],
    example:
      "values = [-1,0,3]\nprint([n * 2 for n in values])\nprint([n * 2 for n in values if n > 0])",
    output: "[-2, 0, 6]\n[6]\n",
    predict: [
      "Does the filter test n or n * 2?",
      "Test het filter n of n * 2?",
    ],
    name: "positive_squares",
    params: "values",
    body: "return [n ** 2 for n in values if n > 0]",
    task: [
      "Use a conditional list comprehension to return squares of strictly positive values.",
      "Gebruik een voorwaardelijke list comprehension om kwadraten van strikt positieve waarden terug te geven.",
    ],
    check:
      "any(isinstance(n,_ast.ListComp) and n.generators[0].ifs for n in _ast.walk(_ast.parse(_source)))",
    help: [
      "Put the squared expression first and the positive-input condition last.",
      "Zet de kwadraatuitdrukking vooraan en de voorwaarde voor positieve invoer achteraan.",
    ],
    fragment: "[n ** 2 for n in values if n > 0]",
    cases: [
      [[[-2, 0, 3, 2]], "_return == [9,4]"],
      [[[]], "_return == []"],
    ],
    change: [
      "Rewrite the same behaviour with an ordinary loop and compare the results.",
      "Herschrijf hetzelfde gedrag met een gewone lus en vergelijk de resultaten.",
    ],
    explain: [
      "The filter excludes zero and negative inputs before their square enters the result.",
      "Het filter sluit nul en negatieve invoer uit voordat hun kwadraat in het resultaat komt.",
    ],
  }),
  f("score-report", {
    title: [
      "Build a report without losing the original",
      "Bouw een rapport zonder het origineel te verliezen",
    ],
    topics: "collections-review",
    practices: "sorted slicing copying filtering",
    requires: "sorted slicing filtering",
    guidance: "independent",
    minutes: 25,
    why: [
      "Combine selection and sorting for a changed problem without relying on a required implementation.",
      "Combineer selectie en sorteren voor een nieuw probleem zonder verplichte implementatie.",
    ],
    teach: [
      "Return the highest three nonnegative scores in descending order. Preserve duplicate scores and leave the input unchanged. If fewer than three valid scores exist, return all of them. Choose a loop or comprehension yourself. Test with an unsorted source so mutation mistakes remain visible.",
      "Geef de hoogste drie niet-negatieve scores in aflopende volgorde terug. Behoud dubbele scores en laat de invoer ongewijzigd. Zijn er minder dan drie geldige scores, geef ze allemaal terug. Kies zelf een lus of comprehension. Test met een ongesorteerde bron zodat onbedoelde wijzigingen zichtbaar blijven.",
    ],
    rule: [
      "Select, order and limit are separate decisions.",
      "Selecteren, ordenen en begrenzen zijn aparte beslissingen.",
    ],
    example:
      'names = ["Bo","Ada","Mila"]\nprint(sorted(names)[:2])\nprint(names)',
    output: "['Ada', 'Bo']\n['Bo', 'Ada', 'Mila']\n",
    predict: [
      "Why does the source list keep its order?",
      "Waarom behoudt de bronlijst zijn volgorde?",
    ],
    name: "leaders",
    params: "scores",
    body: "valid = [score for score in scores if score >= 0]\nreturn sorted(valid, reverse=True)[:3]",
    task: [
      "Implement leaders(scores) according to the report rules.",
      "Implementeer leaders(scores) volgens de rapportregels.",
    ],
    help: [
      "Filter invalid values, sort a separate result, then take at most three.",
      "Filter ongeldige waarden, sorteer een apart resultaat en neem daarna maximaal drie.",
    ],
    fragment: "[:3]",
    cases: [
      [[[5, -1, 9, 9, 3]], "_return == [9,9,5] and _args[0] == [5,-1,9,9,3]"],
      [[[0]], "_return == [0]"],
      [[[-1]], "_return == []"],
      [[[]], "_return == []"],
    ],
    change: [
      "Design a test that catches accidentally removing duplicates.",
      "Ontwerp een test die onbedoeld verwijderen van duplicaten ontdekt.",
    ],
    explain: [
      "The pipeline keeps valid scores, orders them and slices without mutating the source.",
      "De stappen bewaren geldige scores, ordenen ze en nemen een deel zonder de bron te wijzigen.",
    ],
  }),
];
