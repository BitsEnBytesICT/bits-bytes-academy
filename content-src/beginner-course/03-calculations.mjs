import { lesson, step, probe, output, uses } from "./authoring.mjs";
function calculation(slug, spec) {
  const cases = spec.cases.map((inputs) =>
    probe(inputs, `result == (${spec.expression})`),
  );
  return lesson(3, slug, {
    ...spec,
    requires: "variables integers floats",
    minutes: spec.minutes || 12,
    starter: spec.starter,
    solution: `${spec.starter}result = ${spec.expression}\nprint(result)\n`,
    steps: [
      step(
        spec.task,
        `result == (${spec.expression})${slug === "powers" ? " and " + uses("Pow") : ""}`,
        spec.approach,
        spec.fragment,
        cases,
      ),
      step(
        [
          "Print result after calculating it.",
          "Druk result af nadat je het hebt berekend.",
        ],
        `float(_stdout.strip()) == result`,
        [
          "Display the variable that holds the calculation, rather than typing the expected answer.",
          "Toon de variabele met de berekening in plaats van het verwachte antwoord te typen.",
        ],
        "print(result)",
        spec.cases.map((inputs) =>
          probe(inputs, `float(_stdout.strip()) == (${spec.expression})`),
        ),
      ),
    ],
  });
}
export const activities = [
  calculation("addition", {
    title: ["Add quantities", "Tel hoeveelheden op"],
    topics: "arithmetic addition",
    intro: [
      "Use Python to combine two counts. A calculation produces a value that can be stored or printed.",
      "Gebruik Python om twee aantallen samen te voegen. Een berekening levert een waarde op die je kunt bewaren of afdrukken.",
    ],
    teach: [
      "The + operator adds numeric values. In total = apples + pears, Python first reads the two values, adds them, then assigns the result to total. The original counts stay unchanged.\n\nYou can also put an expression directly inside print. Storing the result first is useful when you want to use it again. Here, an expression means a piece of code that produces a value.",
      "De operator + telt getalswaarden op. In total = apples + pears leest Python eerst beide waarden, telt ze op en wijst het resultaat daarna aan total toe. De oorspronkelijke aantallen blijven onveranderd.\n\nJe kunt een expressie ook direct binnen print zetten. Het resultaat eerst bewaren is handig als je het opnieuw wilt gebruiken. Een expressie is hier een stukje code dat een waarde oplevert.",
    ],
    idea: [
      "Addition reads two numbers and produces their sum without changing them.",
      "Optellen leest twee getallen en levert hun som op zonder ze te wijzigen.",
    ],
    example: "apples = 3\npears = 2\ntotal = apples + pears\nprint(total)",
    output: "5\n",
    predict: [
      "What value is assigned to total?",
      "Welke waarde wordt aan total toegewezen?",
    ],
    starter: "morning = 7\nafternoon = 5\n",
    expression: "morning + afternoon",
    task: [
      "Calculate the total number of visitors and store it in result.",
      "Bereken het totale aantal bezoekers en bewaar het in result.",
    ],
    approach: [
      "Add the two existing counts. Both visits contribute to the total.",
      "Tel de twee bestaande aantallen op. Beide bezoeken dragen bij aan het totaal.",
    ],
    fragment: "result = morning + afternoon",
    cases: [
      { morning: 0, afternoon: 4 },
      { morning: 9, afternoon: 2 },
    ],
    experiment: [
      "Set morning to zero. Explain why the answer becomes the afternoon count.",
      "Zet morning op nul. Leg uit waarom het antwoord het middagaantal wordt.",
    ],
    note: [
      "The program combines the current counts. It also works when one group has no visitors.",
      "Het programma combineert de huidige aantallen. Het werkt ook wanneer één groep geen bezoekers heeft.",
    ],
  }),
  calculation("subtraction", {
    title: ["Find what remains", "Bepaal wat overblijft"],
    topics: "subtraction",
    intro: [
      "Subtraction is useful for stock, remaining time and differences. The order of its two numbers matters.",
      "Aftrekken is nuttig voor voorraad, resterende tijd en verschillen. De volgorde van de twee getallen telt.",
    ],
    teach: [
      "The - operator subtracts the right value from the left value. If a shelf holds 10 books and 3 are borrowed, 10 - 3 leaves 7. Reversing the operands gives 3 - 10, which is -7.\n\nA negative result is a number, not a Python error. Whether it is sensible depends on your problem. Later you will use decisions to reject impossible quantities.",
      "De operator - trekt de rechterwaarde van de linkerwaarde af. Als een plank 10 boeken bevat en er 3 worden geleend, blijven er met 10 - 3 nog 7 over. Omkeren geeft 3 - 10, oftewel -7.\n\nEen negatief resultaat is een getal, geen Pythonfout. Of het zinvol is, hangt van je probleem af. Later gebruik je beslissingen om onmogelijke hoeveelheden af te wijzen.",
    ],
    idea: [
      "Start with the available quantity and subtract the quantity used.",
      "Begin met de beschikbare hoeveelheid en trek de gebruikte hoeveelheid af.",
    ],
    example: "books = 10\nborrowed = 3\nprint(books - borrowed)",
    output: "7\n",
    predict: [
      "What would borrowed - books produce?",
      "Wat zou borrowed - books opleveren?",
    ],
    starter: "tickets = 20\nsold = 8\n",
    expression: "tickets - sold",
    task: [
      "Store the unsold ticket count in result.",
      "Bewaar het aantal onverkochte kaartjes in result.",
    ],
    approach: [
      "Subtract sold from tickets, in that order.",
      "Trek sold van tickets af, in die volgorde.",
    ],
    fragment: "result = tickets - sold",
    cases: [
      { tickets: 4, sold: 4 },
      { tickets: 10, sold: 2 },
    ],
    experiment: [
      "Try selling exactly all the tickets. Then try one more than available and interpret the negative answer.",
      "Probeer precies alle kaartjes te verkopen. Probeer daarna één meer dan beschikbaar en verklaar het negatieve antwoord.",
    ],
    note: [
      "The starting stock is the left operand. Selling every ticket leaves zero.",
      "De beginvoorraad is de linkeroperand. Alle kaartjes verkopen laat nul over.",
    ],
  }),
  calculation("multiplication", {
    title: ["Multiply equal groups", "Vermenigvuldig gelijke groepen"],
    topics: "multiplication",
    intro: [
      "Multiplication calculates the total for several equal groups without writing repeated additions.",
      "Vermenigvuldigen berekent het totaal van gelijke groepen zonder herhaald optellen te schrijven.",
    ],
    teach: [
      "Python uses * for multiplication, not the letter x. Three bags with four apples each contain 3 * 4 apples. Read this as three groups of four.\n\nYou can multiply an integer quantity by a float price. The result is a float. No multiplication changes the operands unless you assign a new value to one of their names.",
      "Python gebruikt * voor vermenigvuldigen, niet de letter x. Drie zakken met elk vier appels bevatten 3 * 4 appels. Lees dit als drie groepen van vier.\n\nJe kunt een geheel aantal met een floatprijs vermenigvuldigen. Het resultaat is een float. Vermenigvuldigen verandert de operanden niet, tenzij je een nieuwe waarde aan een van hun namen toewijst.",
    ],
    idea: [
      "Use * to multiply a quantity by the value for one item.",
      "Gebruik * om een aantal te vermenigvuldigen met de waarde per stuk.",
    ],
    example: "bags = 3\nper_bag = 4\nprint(bags * per_bag)",
    output: "12\n",
    predict: [
      "How many apples are there altogether?",
      "Hoeveel appels zijn er samen?",
    ],
    starter: "quantity = 4\nprice = 2.5\n",
    expression: "quantity * price",
    task: [
      "Calculate the price for all items and store it in result.",
      "Bereken de prijs voor alle artikelen en bewaar die in result.",
    ],
    approach: [
      "Each item has the same price. Multiply the number of items by that price.",
      "Elk artikel heeft dezelfde prijs. Vermenigvuldig het aantal artikelen met die prijs.",
    ],
    fragment: "result = quantity * price",
    cases: [
      { quantity: 0, price: 2.5 },
      { quantity: 3, price: 1.25 },
    ],
    experiment: [
      "Double quantity and predict the new result. Then set quantity to zero.",
      "Verdubbel quantity en voorspel het nieuwe resultaat. Zet quantity daarna op nul.",
    ],
    note: [
      "The expression uses both inputs, so changing the quantity or price changes the answer.",
      "De expressie gebruikt beide invoerwaarden, zodat een ander aantal of een andere prijs het antwoord verandert.",
    ],
  }),
  calculation("division", {
    title: ["Share a quantity equally", "Verdeel een hoeveelheid gelijk"],
    topics: "division zero-division-error",
    intro: [
      "Division answers how much each equal share receives. First practise a nonzero divisor.",
      "Delen vertelt hoeveel elk gelijk deel krijgt. Oefen eerst met een deler die niet nul is.",
    ],
    teach: [
      "Python uses / for division. A 9-metre ribbon shared among 4 people gives 9 / 4, or 2.25 metres each. Division with / produces a float, even when the answer is a whole number: 8 / 4 produces 2.0.\n\nDividing by zero is undefined and raises ZeroDivisionError. You may observe that error, but handling it comes after decisions and exception handling. The current exercise assumes a positive number of people.",
      "Python gebruikt / voor delen. Een lint van 9 meter verdeeld over 4 mensen geeft 9 / 4, oftewel 2.25 meter per persoon. Delen met / levert een float op, ook als het antwoord geheel is: 8 / 4 geeft 2.0.\n\nDelen door nul is niet gedefinieerd en veroorzaakt ZeroDivisionError. Je mag die fout bekijken, maar afhandelen komt na beslissingen en foutafhandeling. Deze oefening gaat uit van een positief aantal mensen.",
    ],
    idea: [
      "Divide the total by a nonzero number of equal shares.",
      "Deel het totaal door een aantal gelijke delen dat niet nul is.",
    ],
    example: "length = 9\npeople = 4\nprint(length / people)",
    output: "2.25\n",
    predict: [
      "Does each person receive a whole number of metres?",
      "Krijgt elke persoon een geheel aantal meters?",
    ],
    starter: "total = 15\npeople = 4\n",
    expression: "total / people",
    task: [
      "Calculate the share per person and store it in result.",
      "Bereken het deel per persoon en bewaar het in result.",
    ],
    approach: [
      "The total is divided by the number of people, not the other way around.",
      "Het totaal wordt gedeeld door het aantal mensen, niet andersom.",
    ],
    fragment: "result = total / people",
    cases: [
      { total: 0, people: 3 },
      { total: 10, people: 2 },
    ],
    experiment: [
      "Try total = 10 and people = 2. Observe the decimal point. Temporarily try people = 0, read the error, then restore a valid count.",
      "Probeer total = 10 en people = 2. Bekijk de decimale punt. Probeer tijdelijk people = 0, lees de foutmelding en herstel een geldig aantal.",
    ],
    note: [
      "The calculation returns 3.75 for the initial data. It preserves fractional shares.",
      "De berekening geeft 3.75 voor de begingegevens. Zij behoudt delen achter de komma.",
    ],
  }),
  calculation("precedence", {
    title: [
      "Control the order of a calculation",
      "Bepaal de volgorde van een berekening",
    ],
    topics: "precedence",
    intro: [
      "An expression can contain several operators. Parentheses make the intended grouping explicit.",
      "Een expressie kan verschillende operatoren bevatten. Haakjes maken de bedoelde groepering duidelijk.",
    ],
    teach: [
      "Multiplication and division happen before addition and subtraction. In 2 + 3 * 4, Python multiplies 3 by 4 first, then adds 2: the answer is 14. In (2 + 3) * 4, parentheses make the addition happen first: the answer is 20.\n\nRead the problem before selecting the grouping. A fee charged once for a whole order differs from a fee charged for every item. Intermediate variables can make a longer calculation easier to explain.",
      "Vermenigvuldigen en delen gaan vóór optellen en aftrekken. In 2 + 3 * 4 vermenigvuldigt Python eerst 3 met 4 en telt daarna 2 op: het antwoord is 14. In (2 + 3) * 4 zorgen haakjes dat het optellen eerst gebeurt: het antwoord is 20.\n\nLees het probleem voordat je de groepering kiest. Een toeslag voor een hele bestelling verschilt van een toeslag voor elk artikel. Tussenvariabelen kunnen een langere berekening makkelijker uitlegbaar maken.",
    ],
    idea: [
      "Parentheses group the part that must be calculated first.",
      "Haakjes groeperen het deel dat eerst moet worden berekend.",
    ],
    example: "print(2 + 3 * 4)\nprint((2 + 3) * 4)",
    output: "14\n20\n",
    predict: [
      "Why do the same numbers produce two different answers?",
      "Waarom geven dezelfde getallen twee verschillende antwoorden?",
    ],
    starter: "adults = 3\nchildren = 2\nprice = 4\n",
    expression: "(adults + children) * price",
    task: [
      "Everyone pays the same price. Store the total ticket cost in result.",
      "Iedereen betaalt dezelfde prijs. Bewaar de totale kaartjesprijs in result.",
    ],
    approach: [
      "Add the people first, then multiply that whole count by price.",
      "Tel eerst de mensen op en vermenigvuldig daarna dat hele aantal met price.",
    ],
    fragment: "(adults + children) * price",
    cases: [
      { adults: 0, children: 3, price: 5 },
      { adults: 2, children: 0, price: 7 },
    ],
    experiment: [
      "Remove the parentheses temporarily and explain which group no longer gets multiplied.",
      "Verwijder de haakjes tijdelijk en leg uit welke groep niet meer wordt vermenigvuldigd.",
    ],
    note: [
      "The parentheses make the price apply to everyone. Without them, only children would be multiplied by price.",
      "De haakjes zorgen dat de prijs voor iedereen geldt. Zonder haakjes zou alleen children met price worden vermenigvuldigd.",
    ],
  }),
  lesson(3, "update-a-number", {
    title: [
      "Update a number step by step",
      "Werk een getal stap voor stap bij",
    ],
    topics: "changing-numbers",
    requires: "variables addition subtraction",
    minutes: 13,
    intro: [
      "Calculating with a variable does not automatically change it. Assign the new result back when you want an update.",
      "Rekenen met een variabele verandert haar niet automatisch. Wijs het nieuwe resultaat terug toe als je een wijziging wilt.",
    ],
    teach: [
      "In points = points + 2, Python reads the old points on the right, adds 2, then binds points to the new result on the left. This is an instruction over time, not a mathematical equation that must hold forever.\n\nBy contrast, print(points + 2) displays a larger number but leaves points unchanged. Trace the two print calls in the example to see the difference.",
      "In points = points + 2 leest Python rechts de oude points, telt er 2 bij op en koppelt points links daarna aan het nieuwe resultaat. Dit is een instructie in de tijd, geen wiskundige vergelijking die altijd moet gelden.\n\nprint(points + 2) toont daarentegen een groter getal maar laat points onveranderd. Volg de twee print-aanroepen in het voorbeeld om het verschil te zien.",
    ],
    idea: [
      "An update needs assignment: calculate from the old value, then store the result.",
      "Een wijziging vereist toewijzing: reken met de oude waarde en bewaar daarna het resultaat.",
    ],
    example:
      "points = 5\nprint(points + 2)\nprint(points)\npoints = points + 2\nprint(points)",
    output: "7\n5\n7\n",
    predict: [
      "Which line actually changes points?",
      "Welke regel verandert points werkelijk?",
    ],
    starter: "stock = 10\ndelivered = 4\nsold = 3\n",
    solution:
      "stock = 10\ndelivered = 4\nsold = 3\nstock = stock + delivered\nprint(stock)\nstock = stock - sold\nprint(stock)\n",
    steps: [
      step(
        [
          "Add delivered to stock and print the updated stock.",
          "Tel delivered bij stock op en druk de bijgewerkte voorraad af.",
        ],
        '_stdout.splitlines()[0] == "14"',
        [
          "Assign the sum back to stock before the first print.",
          "Wijs de som terug aan stock toe vóór de eerste print.",
        ],
        "stock = stock + delivered",
      ),
      step(
        [
          "Then subtract sold from stock and print it again.",
          "Trek daarna sold van stock af en druk opnieuw af.",
        ],
        'stock == 11 and _stdout == "14\n11\n"',
        [
          "Use the already updated stock. Do not restart from 10 for the sale.",
          "Gebruik de al bijgewerkte voorraad. Begin voor de verkoop niet opnieuw bij 10.",
        ],
        "stock = stock - sold",
        [
          probe(
            { delivered: 0, sold: 2 },
            'stock == 8 and _stdout == "10\n8\n"',
          ),
        ],
      ),
    ],
    experiment: [
      "Try no delivery and no sales. Explain why both printed values match.",
      "Probeer geen levering en geen verkoop. Leg uit waarom beide afgedrukte waarden gelijk zijn.",
    ],
    note: [
      "Each assignment uses the most recent stock value. The two prints expose the intermediate and final state.",
      "Elke toewijzing gebruikt de meest recente voorraad. De twee prints tonen de tussenstand en eindstand.",
    ],
  }),
  lesson(3, "short-updates", {
    title: ["The += and -= shortcuts", "De afkortingen += en -="],
    topics: "plus-equals minus-equals",
    requires: "changing-numbers",
    minutes: 11,
    intro: [
      "Once you understand an update, Python offers a shorter way to write it.",
      "Wanneer je een wijziging begrijpt, biedt Python een kortere schrijfwijze.",
    ],
    teach: [
      "For numbers, score += 3 means score = score + 3. Similarly, score -= 2 subtracts 2 and stores the result in score. The name must already have a value.\n\nRead the symbols together. score =+ 3 is a different statement that assigns positive 3; it does not add to the old value. First trace the longer form mentally, then use the shortcut.",
      "Voor getallen betekent score += 3 hetzelfde als score = score + 3. Op dezelfde manier trekt score -= 2 er 2 af en bewaart het resultaat in score. De naam moet al een waarde hebben.\n\nLees de symbolen samen. score =+ 3 is een andere instructie die positieve 3 toewijst; zij telt niet bij de oude waarde op. Volg eerst de lange vorm in gedachten en gebruik daarna de afkorting.",
    ],
    idea: [
      "+= and -= read and update the same existing number.",
      "+= en -= lezen en wijzigen hetzelfde bestaande getal.",
    ],
    example: "score = 8\nscore += 3\nscore -= 2\nprint(score)",
    output: "9\n",
    predict: [
      "What is score after each update?",
      "Wat is score na elke wijziging?",
    ],
    starter: "balance = 20\ndeposit = 6\npurchase = 4\n",
    solution:
      "balance = 20\ndeposit = 6\npurchase = 4\nbalance += deposit\nbalance -= purchase\nprint(balance)\n",
    steps: [
      step(
        [
          "Use += to add deposit to balance.",
          "Gebruik += om deposit bij balance op te tellen.",
        ],
        'any(isinstance(n, _ast.AugAssign) and isinstance(n.op, _ast.Add) and isinstance(n.target, _ast.Name) and n.target.id == "balance" for n in _ast.walk(_ast.parse(_source)))',
        [
          "Put the shortcut after the starting values. Its left side is balance.",
          "Zet de afkorting na de beginwaarden. Links staat balance.",
        ],
        "balance += deposit",
      ),
      step(
        [
          "Use -= for the purchase, then print the final balance.",
          "Gebruik -= voor de aankoop en druk daarna het eindsaldo af.",
        ],
        `balance == 22 and ${output("22\n")} and any(isinstance(n, _ast.AugAssign) and isinstance(n.op, _ast.Sub) for n in _ast.walk(_ast.parse(_source)))`,
        [
          "Subtract purchase after adding deposit. The starting balance must still contribute.",
          "Trek purchase af nadat je deposit hebt toegevoegd. Het beginsaldo moet blijven meetellen.",
        ],
        "balance -= purchase",
        [probe({ deposit: 0, purchase: 20 }, "balance == 0")],
      ),
    ],
    experiment: [
      "Replace += with =+ temporarily and trace the changed result. Restore += afterward.",
      "Vervang += tijdelijk door =+ en volg het veranderde resultaat. Herstel daarna +=.",
    ],
    note: [
      "The two update operators retain the starting balance and apply each change once.",
      "De twee wijzigingsoperatoren behouden het beginsaldo en passen elke verandering één keer toe.",
    ],
  }),
  calculation("powers", {
    title: [
      "Repeated multiplication with **",
      "Herhaald vermenigvuldigen met **",
    ],
    topics: "exponents",
    requires: "multiplication",
    intro: [
      "An exponent repeats multiplication. Start with squares so the arithmetic stays visible.",
      "Een macht herhaalt vermenigvuldigen. Begin met kwadraten zodat de berekening zichtbaar blijft.",
    ],
    teach: [
      "A square with sides of length 3 has area 3 * 3. Python can write this as 3 ** 2: three to the power of two. A cube with side 3 uses 3 ** 3, which is 3 * 3 * 3.\n\nThe ** operator is not the same as multiplying by the exponent. 3 ** 2 gives 9; 3 * 2 gives 6. Read the example aloud before running it.",
      "Een vierkant met zijden van lengte 3 heeft oppervlakte 3 * 3. Python kan dit schrijven als 3 ** 2: drie tot de tweede macht. Een kubus met zijde 3 gebruikt 3 ** 3, oftewel 3 * 3 * 3.\n\nDe operator ** is niet hetzelfde als vermenigvuldigen met de exponent. 3 ** 2 geeft 9; 3 * 2 geeft 6. Lees het voorbeeld hardop voordat je het uitvoert.",
    ],
    idea: [
      "side ** 2 squares side; it does not double it.",
      "side ** 2 kwadrateert side; het verdubbelt de waarde niet.",
    ],
    example: "side = 3\nprint(side ** 2)\nprint(side ** 3)",
    output: "9\n27\n",
    predict: [
      "How many factors of side occur in the second calculation?",
      "Hoeveel factoren side staan er in de tweede berekening?",
    ],
    starter: "side = 6\n",
    expression: "side ** 2",
    task: [
      "Calculate the square's area in result, using **.",
      "Bereken de oppervlakte van het vierkant in result met **.",
    ],
    approach: [
      "Square the side length rather than multiplying it by two.",
      "Kwadrateer de zijlengte in plaats van haar met twee te vermenigvuldigen.",
    ],
    fragment: "side ** 2",
    cases: [{ side: 0 }, { side: 4 }],
    experiment: [
      "Try side = 1, then side = 2. Compare side ** 2 with side * 2.",
      "Probeer side = 1 en daarna side = 2. Vergelijk side ** 2 met side * 2.",
    ],
    note: [
      "A square has the same width and height, so squaring its side gives its area.",
      "Een vierkant heeft dezelfde breedte en hoogte, dus het kwadraat van de zijde geeft de oppervlakte.",
    ],
  }),
  calculation("whole-groups", {
    title: ["Count complete groups with //", "Tel volledige groepen met //"],
    topics: "floor-division",
    requires: "division",
    intro: [
      "Sometimes you need a count of complete groups rather than a fractional share.",
      "Soms heb je een aantal volledige groepen nodig in plaats van een deel achter de komma.",
    ],
    teach: [
      "If 17 stickers go into packs of 5, you can fill three complete packs. 17 // 5 gives 3. For positive values, floor division tells you how many complete groups fit. / instead gives 3.4.\n\nMore precisely, // rounds the quotient down toward negative infinity. That distinction matters for negative numbers: -7 // 3 is -3, not -2. Use nonnegative stock quantities in the current exercise.",
      "Als 17 stickers in pakjes van 5 gaan, kun je drie volledige pakjes vullen. 17 // 5 geeft 3. Voor positieve waarden vertelt gehele deling hoeveel volledige groepen passen. / geeft in plaats daarvan 3.4.\n\nNauwkeuriger gezegd rondt // het quotiënt naar beneden af, richting negatief oneindig. Dat telt bij negatieve getallen: -7 // 3 is -3, niet -2. Gebruik in deze oefening niet-negatieve voorraadaantallen.",
    ],
    idea: [
      "For nonnegative stock, // counts the complete groups that fit.",
      "Bij niet-negatieve voorraad telt // hoeveel volledige groepen passen.",
    ],
    example:
      "stickers = 17\npack_size = 5\nprint(stickers // pack_size)\nprint(stickers / pack_size)",
    output: "3\n3.4\n",
    predict: [
      "Why is the first result a smaller whole number?",
      "Waarom is het eerste resultaat een kleiner geheel getal?",
    ],
    starter: "items = 23\nbox_size = 6\n",
    expression: "items // box_size",
    task: [
      "Store the number of completely filled boxes in result.",
      "Bewaar het aantal volledig gevulde dozen in result.",
    ],
    approach: [
      "Count complete boxes only. A leftover item does not fill another box.",
      "Tel alleen volledige dozen. Een overgebleven artikel vult geen nieuwe doos.",
    ],
    fragment: "items // box_size",
    cases: [
      { items: 0, box_size: 4 },
      { items: 12, box_size: 6 },
      { items: 5, box_size: 6 },
    ],
    experiment: [
      "Try one fewer item than box_size. How many complete boxes can you fill?",
      "Probeer één artikel minder dan box_size. Hoeveel volledige dozen kun je vullen?",
    ],
    note: [
      "The result is 3 complete boxes. This task deliberately does not ask for rounding up or packing a partial box.",
      "Het resultaat is 3 volledige dozen. Deze opdracht vraagt bewust niet om naar boven afronden of een gedeeltelijk gevulde doos inpakken.",
    ],
  }),
  calculation("remainder", {
    title: ["Find the leftovers with %", "Vind de rest met %"],
    topics: "modulo",
    requires: "floor-division",
    intro: [
      "After counting complete groups, find what remains. The remainder operator complements floor division.",
      "Bepaal na het tellen van volledige groepen wat overblijft. De restoperator vult gehele deling aan.",
    ],
    teach: [
      "17 stickers make three packs of 5 and leave 2 stickers. 17 % 5 produces 2. The % operator means remainder here, not percentage. If a quantity divides exactly, the remainder is zero.\n\nFor nonnegative counts and a positive group size, the remainder is smaller than the group size. You can check the relationship: complete groups times group size, plus leftovers, equals the original count.",
      "17 stickers vormen drie pakjes van 5 en laten 2 stickers over. 17 % 5 levert 2 op. De operator % betekent hier rest, niet percentage. Als een hoeveelheid precies deelbaar is, is de rest nul.\n\nBij niet-negatieve aantallen en een positieve groepsgrootte is de rest kleiner dan de groepsgrootte. Je kunt het verband controleren: volledige groepen maal groepsgrootte, plus rest, is het oorspronkelijke aantal.",
    ],
    idea: [
      "% gives the remainder after making complete groups.",
      "% geeft de rest na het vormen van volledige groepen.",
    ],
    example: "print(17 % 5)\nprint(20 % 5)",
    output: "2\n0\n",
    predict: [
      "Why does the second calculation leave nothing?",
      "Waarom laat de tweede berekening niets over?",
    ],
    starter: "items = 23\nbox_size = 6\n",
    expression: "items % box_size",
    task: [
      "Store the number of items left outside the complete boxes in result.",
      "Bewaar in result het aantal artikelen dat buiten de volledige dozen overblijft.",
    ],
    approach: [
      "Use remainder, not division or the count of complete boxes.",
      "Gebruik de rest, niet deling of het aantal volledige dozen.",
    ],
    fragment: "items % box_size",
    cases: [
      { items: 0, box_size: 4 },
      { items: 12, box_size: 6 },
      { items: 5, box_size: 6 },
    ],
    experiment: [
      "Try 10 % 2 and 11 % 2. Explain how the results identify even and odd numbers.",
      "Probeer 10 % 2 en 11 % 2. Leg uit hoe de resultaten even en oneven getallen herkennen.",
    ],
    note: [
      "Three groups use 18 of the 23 items, leaving 5. An exact multiple leaves zero.",
      "Drie groepen gebruiken 18 van de 23 artikelen; er blijven 5 over. Een exact veelvoud laat nul over.",
    ],
  }),
  lesson(3, "receipt", {
    title: ["Calculate a simple receipt", "Bereken een eenvoudige kassabon"],
    topics: "arithmetic-review",
    practices: "arithmetic multiplication subtraction precedence",
    requires: "multiplication subtraction",
    guidance: "independent",
    minutes: 20,
    intro: [
      "Combine familiar calculations in a new situation. The brief supplies all the quantities; you choose the expressions.",
      "Combineer bekende berekeningen in een nieuwe situatie. De opdracht geeft alle hoeveelheden; jij kiest de expressies.",
    ],
    teach: [
      "Break the problem into intermediate results with descriptive names. The example first calculates the cost of several notebooks, then adds a single delivery charge. Each line answers one small question.\n\nYour receipt applies a discount once to the whole purchase. Check the wording carefully: subtracting the discount from each item's price would describe a different offer.",
      "Verdeel het probleem in tussenresultaten met duidelijke namen. Het voorbeeld berekent eerst de prijs van enkele notitieboeken en voegt daarna één bezorgbedrag toe. Elke regel beantwoordt één kleine vraag.\n\nJouw kassabon past eenmaal een korting toe op de hele aankoop. Lees de formulering zorgvuldig: korting van elk artikel aftrekken zou een andere aanbieding beschrijven.",
    ],
    idea: [
      "Separate the item subtotal from the one-time change to the total.",
      "Scheid het subtotaal van de artikelen van de eenmalige wijziging van het totaal.",
    ],
    example:
      "books = 2\nprice = 3.5\nsubtotal = books * price\ntotal = subtotal + 2\nprint(total)",
    output: "9.0\n",
    predict: [
      "Is delivery added once or once per book?",
      "Wordt bezorging eenmaal toegevoegd of eenmaal per boek?",
    ],
    starter: "quantity = 3\nunit_price = 4.0\ndiscount = 2.0\n",
    solution:
      "quantity = 3\nunit_price = 4.0\ndiscount = 2.0\nsubtotal = quantity * unit_price\ntotal = subtotal - discount\nprint(subtotal)\nprint(total)\n",
    steps: [
      step(
        [
          "Calculate subtotal from quantity and unit_price.",
          "Bereken subtotal uit quantity en unit_price.",
        ],
        "subtotal == quantity * unit_price",
        [
          "The subtotal includes every item and no discount yet.",
          "Het subtotaal bevat elk artikel en nog geen korting.",
        ],
        "subtotal = quantity * unit_price",
        [probe({ quantity: 0, discount: 0 }, "subtotal == 0")],
      ),
      step(
        [
          "Subtract the discount once to calculate total. Print subtotal, then total.",
          "Trek de korting eenmaal af voor total. Druk subtotal af en daarna total.",
        ],
        "total == subtotal - discount and _stdout.splitlines() == [str(subtotal), str(total)]",
        [
          "Apply the discount after calculating the full item cost.",
          "Pas de korting toe nadat je de volledige artikelprijs hebt berekend.",
        ],
        "total = subtotal - discount",
        [
          probe(
            { quantity: 2, unit_price: 1.5, discount: 1.0 },
            "total == 2.0",
          ),
        ],
      ),
    ],
    experiment: [
      "Use quantity = 1 and discount = 0, then quantity = 0. Explain both receipts.",
      "Gebruik quantity = 1 en discount = 0 en daarna quantity = 0. Leg beide kassabonnen uit.",
    ],
    note: [
      "The first result is 12.0; the one-time discount leaves 10.0. Named intermediate values make the order visible.",
      "Het eerste resultaat is 12.0; de eenmalige korting laat 10.0 over. Benoemde tussenwaarden maken de volgorde zichtbaar.",
    ],
  }),
];
