import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(11, slug, s);
export const activities = [
  f("create", {
    title: [
      "Keep several values in a list",
      "Bewaar meerdere waarden in een lijst",
    ],
    topics: "lists list-contents",
    requires: "return strings integers",
    why: [
      "A list keeps values together in order. It can hold more than one kind of value.",
      "Een lijst bewaart waarden samen op volgorde. Er kunnen verschillende soorten waarden in staan.",
    ],
    teach: [
      'Square brackets [] make a list. Commas separate its elements. The order matters, and repeated values are allowed. A mixed list such as ["Bo", 8, True] is valid, although lists of similar records are often easier to process. A list is one value that can be stored, returned and printed.',
      'Vierkante haakjes [] maken een lijst. Komma’s scheiden de elementen. De volgorde telt en herhaalde waarden zijn toegestaan. Een gemengde lijst zoals ["Bo", 8, True] is geldig, hoewel lijsten met gelijksoortige gegevens vaak eenvoudiger te verwerken zijn. Een lijst is één waarde die je kunt bewaren, teruggeven en afdrukken.',
    ],
    rule: [
      "Brackets group elements; commas separate them.",
      "Haakjes groeperen elementen; komma’s scheiden ze.",
    ],
    example: 'record = ["Bo", 8, True]\nprint(record)',
    output: "['Bo', 8, True]\n",
    predict: [
      "How many elements are in this list?",
      "Hoeveel elementen staan in deze lijst?",
    ],
    name: "record",
    params: "name, score",
    body: "return [name, score, True]",
    task: [
      "Return a list containing name, score and True in that order.",
      "Geef een lijst terug met name, score en True in die volgorde.",
    ],
    help: [
      "Use the parameters as elements, keeping the Boolean unquoted.",
      "Gebruik de parameters als elementen en zet het booleaanse woord niet tussen aanhalingstekens.",
    ],
    fragment: "[name, score, True]",
    cases: [
      [["Mila", 5], '_return == ["Mila",5,True]'],
      [["", 0], '_return == ["",0,True]'],
    ],
    change: [
      "Swap two elements and explain why this changes the record.",
      "Wissel twee elementen om en leg uit waarom dit het record verandert.",
    ],
    explain: [
      "The list retains the supplied values and their order, including their different types.",
      "De lijst bewaart de gegeven waarden en hun volgorde, inclusief de verschillende typen.",
    ],
  }),
  f("append", {
    title: ["Start empty and append", "Begin leeg en voeg achteraan toe"],
    topics: "empty-lists list-methods append",
    requires: "lists",
    why: [
      "You often do not know all values when a program starts. An empty list can grow as data arrives.",
      "Je kent vaak nog niet alle waarden wanneer een programma start. Een lege lijst kan groeien wanneer gegevens binnenkomen.",
    ],
    teach: [
      "[] is an empty list. A method is a function accessed through a value: history.append(4) calls the list’s append method. The dot connects the list to the method; parentheses supply the new element. append changes the existing list and returns None. Do not assign that return value back to history.",
      "[] is een lege lijst. Een methode is een functie die je via een waarde benadert: history.append(4) roept de append-methode van de lijst aan. De punt verbindt de lijst met de methode; haakjes leveren het nieuwe element. append verandert de bestaande lijst en geeft None terug. Wijs die terugkeerwaarde niet opnieuw toe aan history.",
    ],
    rule: [
      "append changes the list in place and adds one element at the end.",
      "append verandert de lijst zelf en voegt één element achteraan toe.",
    ],
    example:
      "history = []\nhistory.append(4)\nhistory.append(7)\nprint(history)",
    output: "[4, 7]\n",
    predict: [
      "What would printing history.append(9) display?",
      "Wat toont het afdrukken van history.append(9)?",
    ],
    name: "pair",
    params: "first, second",
    body: "values = []\nvalues.append(first)\nvalues.append(second)\nreturn values",
    task: [
      "Start an empty list, append first then second, and return the list. Practise append here.",
      "Begin met een lege lijst, voeg first en daarna second toe met append en geef de lijst terug. Oefen hier append.",
    ],
    check:
      'any(isinstance(n,_ast.Attribute) and n.attr == "append" for n in _ast.walk(_ast.parse(_source)))',
    help: [
      "Keep the list variable; call its method without replacing it.",
      "Bewaar de lijstvariabele; roep de methode aan zonder de lijst te vervangen.",
    ],
    fragment: "values.append(first)",
    cases: [
      [[2, 4], "_return == [2,4]"],
      [["a", "b"], '_return == ["a","b"]'],
    ],
    change: [
      "Append an empty string and explain why the list is no longer empty.",
      "Voeg een lege string toe en leg uit waarom de lijst niet meer leeg is.",
    ],
    explain: [
      "Each call mutates values; return sends the completed list to the caller.",
      "Elke aanroep verandert values; return stuurt de voltooide lijst naar de aanroeper.",
    ],
  }),
  f("combine", {
    title: ["Combine two lists", "Combineer twee lijsten"],
    topics: "list-concatenation",
    requires: "lists concatenation",
    why: [
      "List + joins two sequences of elements into a new list.",
      "Lijst + voegt twee reeksen elementen samen tot een nieuwe lijst.",
    ],
    teach: [
      "Both operands of list concatenation must be lists. [1] + [2, 3] gives [1, 2, 3]. It does not add the numbers, and it does not create a nested list. The originals stay unchanged. To add one number this way, wrap it in a one-element list.",
      "Beide kanten van lijstsamenvoeging moeten lijsten zijn. [1] + [2, 3] geeft [1, 2, 3]. Het telt de getallen niet op en maakt geen geneste lijst. De oorspronkelijke lijsten blijven ongewijzigd. Om zo één getal toe te voegen, zet je het in een lijst met één element.",
    ],
    rule: [
      "List + creates a new list containing both sets of elements in order.",
      "Lijst + maakt een nieuwe lijst met beide reeksen elementen op volgorde.",
    ],
    example: "left = [1, 2]\nright = [3]\nprint(left + right)\nprint(left)",
    output: "[1, 2, 3]\n[1, 2]\n",
    predict: [
      "Does left gain a third element?",
      "Krijgt left een derde element?",
    ],
    name: "combine",
    params: "first, second",
    body: "return first + second",
    task: [
      "Return the elements of first followed by second, leaving both input lists unchanged.",
      "Geef de elementen van first gevolgd door second terug en laat beide invoerlijsten ongewijzigd.",
    ],
    help: [
      "Use list concatenation to create the result.",
      "Gebruik lijstsamenvoeging om het resultaat te maken.",
    ],
    fragment: "first + second",
    cases: [
      [[[1], [2, 3]], "_return == [1,2,3] and _args == [[1],[2,3]]"],
      [[[], [4]], "_return == [4]"],
      [[[], []], "_return == []"],
    ],
    change: [
      "Compare combining with [] to appending [] as one element.",
      "Vergelijk samenvoegen met [] met [] als één element toevoegen.",
    ],
    explain: [
      "Concatenation copies the outer sequence of elements into a new list.",
      "Samenvoegen kopieert de buitenste reeks elementen naar een nieuwe lijst.",
    ],
  }),
  f("indexes", {
    title: ["Select a position", "Kies een positie"],
    topics: "indexing negative-indexing",
    requires: "lists",
    why: [
      "An index selects one item from an ordered list.",
      "Een index kiest één item uit een geordende lijst.",
    ],
    teach: [
      "items[0] selects the first element: Python counts forward from zero. items[-1] selects the last element and [-2] the one before it. The brackets after a list mean access, unlike brackets used to create a list. An index outside the list raises IndexError. An empty list has no first or last item.",
      "items[0] kiest het eerste element: Python telt vooruit vanaf nul. items[-1] kiest het laatste element en [-2] het element daarvoor. Haakjes na een lijst betekenen toegang, anders dan haakjes om een lijst te maken. Een index buiten de lijst veroorzaakt IndexError. Een lege lijst heeft geen eerste of laatste item.",
    ],
    rule: [
      "Positive indexes start at zero; negative indexes count back from the end.",
      "Positieve indexen beginnen bij nul; negatieve indexen tellen terug vanaf het einde.",
    ],
    example:
      'colours = ["red", "green", "blue"]\nprint(colours[0])\nprint(colours[-1])',
    output: "red\nblue\n",
    predict: ["What does colours[1] select?", "Wat kiest colours[1]?"],
    name: "ends",
    params: "items",
    body: "return [items[0], items[-1]]",
    task: [
      "For a nonempty list, return a list containing its first and last elements.",
      "Geef voor een niet-lege lijst een lijst terug met het eerste en laatste element.",
    ],
    help: [
      "Use one forward index and one index relative to the end.",
      "Gebruik één voorwaartse index en één index vanaf het einde.",
    ],
    fragment: "items[-1]",
    cases: [
      [[[2, 4, 8]], "_return == [2,8]"],
      [[["only"]], '_return == ["only","only"]'],
    ],
    change: [
      "Explain why the single-element case repeats the same value.",
      "Leg uit waarom het geval met één element dezelfde waarde herhaalt.",
    ],
    explain: [
      "The first and last position may refer to the same element.",
      "De eerste en laatste positie kunnen hetzelfde element aanwijzen.",
    ],
  }),
  f("change-element", {
    title: ["Replace an element", "Vervang een element"],
    topics: "list-mutation",
    requires: "indexing assignment",
    why: [
      "Lists are mutable: you can update one position without rebuilding the whole list.",
      "Lijsten zijn veranderbaar: je kunt één positie bijwerken zonder de hele lijst opnieuw te maken.",
    ],
    teach: [
      "scores[1] = 9 assigns a new value to an existing position. It replaces rather than inserts; the length stays the same. The index must already exist. This mutates the caller’s list when passed into a function, because the function and caller refer to the same list object.",
      "scores[1] = 9 wijst een nieuwe waarde toe aan een bestaande positie. Het vervangt in plaats van invoegen; de lengte blijft gelijk. De index moet al bestaan. Dit verandert de lijst van de aanroeper wanneer die aan een functie is meegegeven, omdat functie en aanroeper naar hetzelfde lijstobject verwijzen.",
    ],
    rule: [
      "Indexed assignment replaces an existing element in place.",
      "Toewijzing via een index vervangt een bestaand element in de lijst.",
    ],
    example: "scores = [3, 5, 7]\nscores[1] = 9\nprint(scores)",
    output: "[3, 9, 7]\n",
    predict: [
      "Did the number of elements change?",
      "Is het aantal elementen veranderd?",
    ],
    name: "replace_last",
    params: "items, value",
    body: "items[-1] = value\nreturn items",
    task: [
      "Replace the last element of nonempty items with value and return the same list.",
      "Vervang het laatste element van niet-lege items door value en geef dezelfde lijst terug.",
    ],
    help: [
      "Assign to the final position before returning the list.",
      "Wijs toe aan de laatste positie voordat je de lijst teruggeeft.",
    ],
    fragment: "items[-1] = value",
    cases: [
      [[[1, 2], 9], "_return == [1,9] and _return is _args[0]"],
      [[[4], 0], "_return == [0]"],
    ],
    change: [
      "Have the caller print its original variable after the call.",
      "Laat de aanroeper zijn oorspronkelijke variabele na de aanroep afdrukken.",
    ],
    explain: [
      "The method changes the existing object, so the caller observes the replacement.",
      "De functie verandert het bestaande object; de aanroeper ziet daardoor de vervanging.",
    ],
  }),
  f("length-copy", {
    title: ["Count and copy a list", "Tel en kopieer een lijst"],
    topics: "length copying",
    requires: "list-mutation",
    why: [
      "Sometimes you want a changed result while keeping the original data intact.",
      "Soms wil je een veranderd resultaat terwijl de oorspronkelijke gegevens intact blijven.",
    ],
    teach: [
      "len(items) returns the number of elements; an empty list has length zero. copy = items makes another name for the same list. items.copy() makes a new outer list. This shallow copy is sufficient for the flat lists here; nested mutable elements need extra care later.",
      "len(items) geeft het aantal elementen; een lege lijst heeft lengte nul. copy = items maakt een andere naam voor dezelfde lijst. items.copy() maakt een nieuwe buitenste lijst. Deze oppervlakkige kopie is voldoende voor de platte lijsten hier; geneste veranderbare elementen vragen later extra zorg.",
    ],
    rule: [
      "Assignment shares a list; .copy() makes a separate outer list.",
      "Toewijzing deelt een lijst; .copy() maakt een aparte buitenste lijst.",
    ],
    example:
      "original = [2, 4]\ncopy = original.copy()\ncopy.append(6)\nprint(len(copy))\nprint(original)",
    output: "3\n[2, 4]\n",
    predict: [
      "What would happen if copy = original were used instead?",
      "Wat gebeurt er als je copy = original gebruikt?",
    ],
    name: "with_count",
    params: "items",
    body: "result = items.copy()\nresult.append(len(items))\nreturn result",
    task: [
      "Return a copy with the original length appended. Leave items unchanged, including for an empty list.",
      "Geef een kopie terug met de oorspronkelijke lengte achteraan. Laat items ongewijzigd, ook bij een lege lijst.",
    ],
    help: [
      "Copy first, then append the length of the original list.",
      "Kopieer eerst en voeg dan de lengte van de oorspronkelijke lijst toe.",
    ],
    fragment: "result = items.copy()",
    cases: [
      [[[5, 9]], "_return == [5,9,2] and _args[0] == [5,9]"],
      [[[]], "_return == [0] and _args[0] == []"],
    ],
    change: [
      "Call the function twice with the same original list.",
      "Roep de functie tweemaal aan met dezelfde oorspronkelijke lijst.",
    ],
    explain: [
      "Copying prevents an appended count from contaminating the next use of the original data.",
      "Kopiëren voorkomt dat een toegevoegd aantal het volgende gebruik van de oorspronkelijke gegevens beïnvloedt.",
    ],
    guidance: "independent",
  }),
];
