import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(13, slug, s);
export const activities = [
  f("pairs", {
    title: [
      "Keep a coordinate pair in a tuple",
      "Bewaar een coördinatenpaar in een tuple",
    ],
    topics: "tuples",
    requires: "lists indexing return",
    why: [
      "A position has two related coordinates. A tuple keeps them together without allowing element replacement.",
      "Een positie heeft twee bijbehorende coördinaten. Een tuple houdt ze samen zonder vervanging van elementen toe te staan.",
    ],
    teach: [
      "(20, 30) is a tuple. Like a list it is ordered, supports indexing and has a length. Unlike a list, you cannot assign to one of its positions. Tuples are useful for fixed groupings such as (x, y). A one-element tuple needs a comma: (20,). Parentheses alone around a number do not create a tuple.",
      "(20, 30) is een tuple. Net als een lijst is deze geordend, ondersteunt indexen en heeft een lengte. Anders dan bij een lijst kun je niet aan één positie toewijzen. Tuples zijn nuttig voor vaste groepen zoals (x, y). Een tuple met één element heeft een komma nodig: (20,). Alleen haakjes rond een getal maken geen tuple.",
    ],
    rule: [
      "Use a tuple for an ordered grouping that will not be edited by index.",
      "Gebruik een tuple voor een geordende groep die niet via index wordt bewerkt.",
    ],
    example: "position = (20, 30)\nprint(position[0])\nprint(len(position))",
    output: "20\n2\n",
    predict: ["What does position[1] mean?", "Wat betekent position[1]?"],
    name: "position",
    params: "x, y",
    body: "return (x, y)",
    task: [
      "Return x and y as a two-element tuple.",
      "Geef x en y terug als een tuple met twee elementen.",
    ],
    help: [
      "Use a comma-separated pair, not square brackets.",
      "Gebruik een paar met komma, geen vierkante haakjes.",
    ],
    fragment: "return (x, y)",
    cases: [
      [[2, 3], "_return == (2,3) and type(_return) is tuple"],
      [[-1, 0], "_return == (-1,0)"],
    ],
    change: [
      "Compare type((5)) with type((5,)).",
      "Vergelijk type((5)) met type((5,)).",
    ],
    explain: [
      "The comma forms the tuple; the two values keep their order.",
      "De komma vormt de tuple; de twee waarden behouden hun volgorde.",
    ],
  }),
  f("unpack", {
    title: ["Unpack a pair into names", "Pak een paar uit in namen"],
    topics: "packing-unpacking",
    requires: "tuples",
    why: [
      "Descriptive names make coordinate calculations easier to follow than repeated indexes.",
      "Beschrijvende namen maken coördinaatberekeningen eenvoudiger te volgen dan herhaalde indexen.",
    ],
    teach: [
      "x, y = point unpacks two elements into two names. The number of target names must match the number of elements. Packing combines values into a tuple; unpacking gives each element a name again. This also works with a two-element list, but it does not change the original object.",
      "x, y = point pakt twee elementen uit in twee namen. Het aantal doelnamen moet overeenkomen met het aantal elementen. Inpakken combineert waarden tot een tuple; uitpakken geeft elk element weer een naam. Dit werkt ook met een lijst van twee elementen, maar verandert het oorspronkelijke object niet.",
    ],
    rule: [
      "Match the number and order of unpacked names to the values.",
      "Laat aantal en volgorde van uitgepakte namen bij de waarden passen.",
    ],
    example: "point = (4, 7)\nx, y = point\nprint(x + 2, y)",
    output: "6 7\n",
    predict: [
      "Which coordinate changed in the printed result?",
      "Welke coördinaat veranderde in het afgedrukte resultaat?",
    ],
    name: "shift",
    check:
      'callable(shift) and any(isinstance(n,_ast.Assign) and any(isinstance(t,(_ast.Tuple,_ast.List)) for t in n.targets) and isinstance(n.value,_ast.Name) and n.value.id == "point" for n in _ast.walk(_ast.parse(_source)))',
    params: "point, dx, dy",
    body: "x, y = point\nreturn (x + dx, y + dy)",
    task: [
      "Unpack point and return a new tuple moved by dx and dy.",
      "Pak point uit en geef een nieuwe tuple terug die dx en dy is verschoven.",
    ],
    help: [
      "Name both coordinates before adding their corresponding changes.",
      "Benoem beide coördinaten voordat je de bijbehorende veranderingen optelt.",
    ],
    fragment: "x, y = point",
    cases: [
      [[[4, 7], 2, -1], "_return == (6,6)"],
      [[[0, 0], -3, 5], "_return == (-3,5)"],
    ],
    change: [
      "Apply a shift and its opposite. Predict the final position.",
      "Pas een verschuiving en de tegenovergestelde toe. Voorspel de eindpositie.",
    ],
    explain: [
      "Unpacking gives meaningful local names; returning a new tuple preserves the source position.",
      "Uitpakken geeft betekenisvolle lokale namen; een nieuwe tuple teruggeven bewaart de bronpositie.",
    ],
  }),
  f("multiple-results", {
    title: [
      "Return two related answers",
      "Geef twee bijbehorende antwoorden terug",
    ],
    topics: "multiple-returns",
    practices: "return packing-unpacking modulo floor-division",
    requires: "packing-unpacking modulo floor-division",
    guidance: "independent",
    why: [
      "A function can return one tuple containing several results, which the caller then unpacks.",
      "Een functie kan één tuple met meerdere resultaten teruggeven die de aanroeper vervolgens uitpakt.",
    ],
    teach: [
      "return total, count packs two values into one tuple. The caller can store that tuple or unpack it with total, count = summarise(...). This is often called returning multiple values, but one object is returned. Separate return statements are different: only the first reached return runs.",
      "return total, count pakt twee waarden in één tuple. De aanroeper kan die tuple bewaren of uitpakken met total, count = summarise(...). Dit heet vaak meerdere waarden teruggeven, maar er wordt één object teruggegeven. Aparte return-instructies zijn anders: alleen de eerst bereikte return wordt uitgevoerd.",
    ],
    rule: [
      "One returned tuple can carry several named results.",
      "Eén teruggegeven tuple kan meerdere benoemde resultaten bevatten.",
    ],
    example:
      "def split_hours(minutes):\n    return minutes // 60, minutes % 60\nhours, remaining = split_hours(95)\nprint(hours, remaining)",
    output: "1 35\n",
    predict: [
      "What would a single variable receive from split_hours?",
      "Wat ontvangt één variabele van split_hours?",
    ],
    name: "pack_groups",
    params: "items, size",
    body: "return items // size, items % size",
    task: [
      "For nonnegative items and positive size, return (full_groups, leftover).",
      "Geef voor niet-negatieve items en positieve size (full_groups, leftover) terug.",
    ],
    help: [
      "Use floor division for complete groups and remainder for what stays over.",
      "Gebruik gehele deling voor volledige groepen en restdeling voor wat overblijft.",
    ],
    fragment: "items % size",
    cases: [
      [[14, 4], "_return == (3,2)"],
      [[0, 3], "_return == (0,0)"],
      [[12, 4], "_return == (3,0)"],
    ],
    change: [
      "Unpack the result in a caller and print each part with a label.",
      "Pak het resultaat bij de aanroeper uit en druk elk deel met een label af.",
    ],
    explain: [
      "Both results describe the same grouping calculation and travel together in one tuple.",
      "Beide resultaten beschrijven dezelfde groepering en reizen samen in één tuple.",
    ],
  }),
];
