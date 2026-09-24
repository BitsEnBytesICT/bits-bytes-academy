import {
  quiz,
  predict as P,
  complete as B,
  choice as Q,
} from "./quiz-authoring.mjs";
export const quizzes = [
  quiz(1, (f) => {
    const n = f ? 4 : 3;
    return [
      P(
        "arithmetic precedence",
        `print(${n} + 2 * 5)`,
        [String(n + 10), String((n + 2) * 5), String(n + 7)],
        [
          [
            "Multiplication happens before addition.",
            "Vermenigvuldigen gaat vóór optellen.",
          ],
          [
            "That result would require parentheses around the addition.",
            "Dat resultaat vereist haakjes rond het optellen.",
          ],
          [
            "Multiplying 2 by 5 gives 10, not adding them to get 7.",
            "2 maal 5 geeft 10, niet 7 door optellen.",
          ],
        ],
      ),
      P(
        "plus-equals changing-numbers",
        `stock = ${n}\nstock += 2\nprint(stock)`,
        [String(n + 2), String(n), String(n * 2)],
        [
          [
            "+= replaces stock with its old value plus 2.",
            "+= vervangt stock door de oude waarde plus 2.",
          ],
          [
            "The update happens before printing.",
            "De update gebeurt vóór afdrukken.",
          ],
          [
            "+= adds; it does not multiply.",
            "+= telt op; het vermenigvuldigt niet.",
          ],
        ],
      ),
      B(
        "exponents",
        ["Complete the power calculation.", "Vul de machtsberekening aan."],
        `print(${n} ___ 2)`,
        "**",
        ["*", "%"],
        [
          "** means exponentiation; * multiplies and % finds a remainder.",
          "** betekent machtsverheffen; * vermenigvuldigt en % geeft de rest.",
        ],
        String(n ** 2) + "\n",
      ),
      B(
        "modulo floor-division",
        [
          "Complete the expression for leftover items.",
          "Vul de expressie voor overgebleven items aan.",
        ],
        `items = ${n * 5 + 2}\nprint(items ___ 5)`,
        "%",
        ["//", "/"],
        [
          "% gives the remainder; // gives complete groups and / a quotient.",
          "% geeft de rest; // geeft volledige groepen en / een quotiënt.",
        ],
        "2\n",
      ),
      Q(
        "errors variables",
        "debugging",
        [
          "Which change repairs this NameError?",
          "Welke wijziging herstelt deze NameError?",
        ],
        `name = "${f ? "Bo" : "Ada"}"\nprint(Name)`,
        [
          [
            ["Use print(name).", "Gebruik print(name)."],
            [
              "Names are case-sensitive; the defined name is lowercase.",
              "Namen zijn hoofdlettergevoelig; de gedefinieerde naam is klein geschreven.",
            ],
          ],
          [
            ['Use print("Name").', 'Gebruik print("Name").'],
            [
              "That prints literal text instead of the stored name.",
              "Dat drukt letterlijke tekst af in plaats van de opgeslagen naam.",
            ],
          ],
          [
            ["Add another print before it.", "Voeg ervoor nog een print toe."],
            [
              "Another print does not define the missing variable.",
              "Nog een print definieert de ontbrekende variabele niet.",
            ],
          ],
        ],
      ),
      Q(
        "comments welcome",
        "application",
        f
          ? [
              "You want to explain why a report exists without adding output. What belongs in the source?",
              "Je wilt uitleggen waarom een rapport bestaat zonder uitvoer toe te voegen. Wat hoort in de bron?",
            ]
          : [
              "You want a note for someone reading your program, not a displayed message. What should you use?",
              "Je wilt een notitie voor iemand die je programma leest, geen getoond bericht. Wat gebruik je?",
            ],
        null,
        [
          [
            ["A # comment.", "Een #-commentaar."],
            [
              "Comments explain source code without being executed as output.",
              "Commentaar verklaart broncode zonder als uitvoer te worden uitgevoerd.",
            ],
          ],
          [
            ["A print call.", "Een print-aanroep."],
            [
              "print changes the terminal output.",
              "print verandert de terminaluitvoer.",
            ],
          ],
          [
            ["An undefined variable.", "Een ongedefinieerde variabele."],
            [
              "Reading an undefined name raises an error; it is not documentation.",
              "Een ongedefinieerde naam lezen geeft een fout; het is geen documentatie.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(2, (f) => {
    const n = f ? 18 : 12;
    return [
      P(
        "relational-operators boolean-variables",
        `age = ${n}\nprint(age > ${n}, age >= ${n})`,
        ["False True", "True True", "False False"],
        [
          ["Only >= includes equality.", "Alleen >= neemt gelijkheid mee."],
          ["> excludes the equal boundary.", "> sluit de gelijke grens uit."],
          [">= accepts an equal value.", ">= accepteert een gelijke waarde."],
        ],
      ),
      P(
        "and or not",
        `ticket = ${f ? "False" : "True"}\nhelper = ${f ? "True" : "False"}\nbanned = True\nprint((ticket or helper) and not banned)`,
        ["False", "True", "None"],
        [
          [
            "The ban makes not banned False, so the and fails.",
            "Het verbod maakt not banned False, dus and faalt.",
          ],
          [
            "Eligibility cannot override the ban in this expression.",
            "Geschiktheid kan het verbod in deze expressie niet overrulen.",
          ],
          [
            "Boolean operators here produce a Boolean, not None.",
            "Booleaanse operatoren geven hier een boolean, geen None.",
          ],
        ],
      ),
      B(
        "conversion input",
        [
          "Convert numeric text before doing arithmetic.",
          "Zet getaltekst om vóór rekenen.",
        ],
        `text = "${n}"\nnumber = ___(text)\nprint(number + 1)`,
        "int",
        ["str", "input"],
        [
          "int converts text to a whole number; str keeps text and input asks for new text.",
          "int zet tekst in een geheel getal om; str behoudt tekst en input vraagt nieuwe tekst.",
        ],
        String(n + 1) + "\n",
      ),
      B(
        "elif",
        [
          "Complete the alternative decision.",
          "Vul de alternatieve beslissing aan.",
        ],
        `choice = "${f ? "juice" : "tea"}"\nif choice == "water":\n    print(0)\n___ choice == "${f ? "juice" : "tea"}":\n    print(${f ? 3 : 2})\nelse:\n    print(-1)`,
        "elif",
        ["else", "and"],
        [
          "elif takes a condition after an earlier if; else does not take a condition.",
          "elif krijgt een voorwaarde na een eerdere if; else krijgt geen voorwaarde.",
        ],
        String(f ? 3 : 2) + "\n",
      ),
      Q(
        "if else indentation",
        "debugging",
        [
          "Which input exposes the missing equality case?",
          "Welke invoer onthult de ontbrekende gelijkheidsgrens?",
        ],
        `balance = ${n}\nif balance > ${n}:\n    print("Buy")\nelse:\n    print("Save")`,
        [
          [
            [String(n), String(n)],
            [
              "Exactly the cost should permit buying, but > rejects it.",
              "Precies de kosten moet kopen toestaan, maar > wijst het af.",
            ],
          ],
          [
            [String(n + 1), String(n + 1)],
            [
              "This already reaches Buy and does not expose the boundary error.",
              "Dit bereikt al Buy en onthult de grensfout niet.",
            ],
          ],
          [
            [String(n - 1), String(n - 1)],
            [
              "This correctly reaches Save; the equality boundary is the issue.",
              "Dit bereikt terecht Save; de gelijkheidsgrens is het probleem.",
            ],
          ],
        ],
      ),
      Q(
        "concatenation",
        "application",
        f
          ? [
              'A greeting loses its space: "Hi" + "Bo". Which result follows?',
              'Een begroeting mist zijn spatie: "Hi" + "Bo". Welk resultaat volgt?',
            ]
          : [
              'A label uses "Team" + "Ada". What does concatenation insert automatically?',
              'Een label gebruikt "Team" + "Ada". Wat voegt samenvoegen automatisch toe?',
            ],
        null,
        [
          [
            [
              f ? "HiBo" : "Nothing; the result is TeamAda.",
              f ? "HiBo" : "Niets; het resultaat is TeamAda.",
            ],
            [
              "Concatenation adds no spaces. A space must be in one string.",
              "Samenvoegen voegt geen spaties toe. Een spatie moet in een string staan.",
            ],
          ],
          [
            ["A space between the words.", "Een spatie tussen de woorden."],
            [
              "+ joins exactly the existing characters.",
              "+ voegt precies de bestaande tekens samen.",
            ],
          ],
          [
            [
              "A newline between the words.",
              "Een nieuwe regel tussen de woorden.",
            ],
            [
              "A newline requires an explicit newline character or separate print calls.",
              "Een nieuwe regel vereist een expliciet regelteken of aparte print-aanroepen.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(3, (f) => {
    const n = f ? 6 : 4;
    return [
      P(
        "range-start-stop-step accumulators",
        `total = 0\nfor n in range(0, ${n}, 2):\n    total += n\nprint(total)`,
        [String(f ? 6 : 2), String(f ? 12 : 6), "0"],
        [
          [
            "The stop is excluded; accumulate only 0, 2 and any next value below it.",
            "Het einde is uitgesloten; tel alleen 0, 2 en eventuele volgende lagere waarden op.",
          ],
          [
            "This includes the excluded stop value.",
            "Dit neemt de uitgesloten eindwaarde mee.",
          ],
          [
            "The range is not empty, so the accumulator does change.",
            "De range is niet leeg, dus het totaal verandert wel.",
          ],
        ],
      ),
      P(
        "while counters",
        `remaining = ${n}\ncount = 0\nwhile remaining > 0:\n    remaining -= 2\n    count += 1\nprint(count)`,
        [String(n / 2), String(n), String(n / 2 + 1)],
        [
          [
            "Each iteration removes 2 and adds 1 to the count.",
            "Elke iteratie haalt 2 weg en telt 1 bij de teller op.",
          ],
          [
            "The loop counts iterations, not removed units.",
            "De lus telt iteraties, niet verwijderde eenheden.",
          ],
          [
            "The condition is checked before a zero-remaining iteration.",
            "De voorwaarde wordt vóór een iteratie met nul resterend gecontroleerd.",
          ],
        ],
      ),
      B(
        "break",
        ["Stop at the selected number.", "Stop bij het gekozen getal."],
        `for n in range(5):\n    if n == ${f ? 2 : 1}:\n        ___\n    print(n)`,
        "break",
        ["continue", "pass"],
        [
          "break exits the loop; continue skips only this iteration and pass does nothing.",
          "break verlaat de lus; continue slaat alleen deze iteratie over en pass doet niets.",
        ],
        f ? "0\n1\n" : "0\n",
      ),
      B(
        "continue",
        [
          "Skip one number and keep looping.",
          "Sla één getal over en blijf herhalen.",
        ],
        `for n in range(3):\n    if n == ${f ? 0 : 1}:\n        ___\n    print(n)`,
        "continue",
        ["break", "pass"],
        [
          "continue skips the remaining body for one iteration.",
          "continue slaat het resterende blok voor één iteratie over.",
        ],
        f ? "1\n2\n" : "0\n2\n",
      ),
      Q(
        "relational-operators",
        "debugging",
        [
          "Which comparison includes the exact threshold?",
          "Welke vergelijking neemt de exacte grens mee?",
        ],
        `height = ${f ? 150 : 140}\nminimum = height`,
        [
          [
            ["height >= minimum", "height >= minimum"],
            ["At least includes equality.", "Minstens omvat gelijkheid."],
          ],
          [
            ["height > minimum", "height > minimum"],
            [
              "> rejects exactly equal values.",
              "> wijst precies gelijke waarden af.",
            ],
          ],
          [
            ["height != minimum", "height != minimum"],
            [
              "Inequality does not describe a minimum threshold.",
              "Ongelijkheid beschrijft geen minimumgrens.",
            ],
          ],
        ],
      ),
      Q(
        "variables changing-numbers",
        "application",
        f
          ? [
              "A loop changes stock each turn. Where should its initial stock be assigned?",
              "Een lus verandert stock elke beurt. Waar moet de beginvoorraad worden toegewezen?",
            ]
          : [
              "A loop accumulates points. Where should points = 0 go?",
              "Een lus telt punten op. Waar hoort points = 0?",
            ],
        null,
        [
          [
            ["Before the loop.", "Vóór de lus."],
            [
              "Initialise once so later updates preserve earlier work.",
              "Initialiseer één keer zodat latere updates eerder werk behouden.",
            ],
          ],
          [
            [
              "At the start of every iteration.",
              "Aan het begin van elke iteratie.",
            ],
            [
              "That resets accumulated state repeatedly.",
              "Dat reset verzamelde toestand herhaaldelijk.",
            ],
          ],
          [
            ["Only after printing the total.", "Pas na het totaal afdrukken."],
            [
              "The value must exist before it can be updated or printed.",
              "De waarde moet bestaan vóór bijwerken of afdrukken.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(4, (f) => {
    const n = f ? 5 : 3;
    return [
      P(
        "return multiple-parameters",
        `def add(a, b):\n    return a + b\nprint(add(${n}, 2) * 2)`,
        [String((n + 2) * 2), String(n + 4), "None"],
        [
          [
            "The returned sum is multiplied by 2 in the caller.",
            "De teruggegeven som wordt in de aanroeper met 2 vermenigvuldigd.",
          ],
          [
            "The multiplication applies after the function has returned its full sum.",
            "Vermenigvuldiging gebeurt nadat de functie de hele som heeft teruggegeven.",
          ],
          [
            "An explicit return supplies a number, not None.",
            "Een expliciete return levert een getal, geen None.",
          ],
        ],
      ),
      P(
        "local-scope",
        `value = ${n}\ndef change(value):\n    value += 10\n    return value\nchange(value)\nprint(value)`,
        [String(n), String(n + 10), "None"],
        [
          [
            "The local parameter changes; the outer value is not reassigned.",
            "De lokale parameter verandert; de buitenste waarde wordt niet opnieuw toegewezen.",
          ],
          [
            "A returned value changes the caller only if the caller uses it.",
            "Een teruggegeven waarde verandert de aanroeper alleen als die haar gebruikt.",
          ],
          [
            "The outer variable still contains its original number.",
            "De buitenste variabele bevat nog zijn oorspronkelijke getal.",
          ],
        ],
      ),
      B(
        "default-arguments keyword-arguments",
        [
          "Complete the named-argument call.",
          "Vul de aanroep met benoemd argument aan.",
        ],
        `def cost(items, fee=3):\n    return items * fee\nprint(cost(${n}, ___=2))`,
        "fee",
        ["items", "cost"],
        [
          "The keyword must match the parameter name whose default is being overridden.",
          "Het benoemde argument moet passen bij de parameter waarvan de standaard wordt overschreven.",
        ],
        String(n * 2) + "\n",
      ),
      B(
        "early-return none",
        [
          "Return no result for a rejected value.",
          "Geef geen resultaat terug bij een afgewezen waarde.",
        ],
        `def accepted(n):\n    if n < 0:\n        return ___\n    return n\nprint(accepted(-${n}))`,
        "None",
        ["0", "False"],
        [
          "None explicitly represents no result; zero and False are different values.",
          "None betekent expliciet geen resultaat; nul en False zijn andere waarden.",
        ],
        "None\n",
      ),
      Q(
        "while infinite-loops",
        "debugging",
        [
          "What missing step makes this loop stop?",
          "Welke ontbrekende stap laat deze lus stoppen?",
        ],
        `remaining = ${n}\nwhile remaining > 0:\n    print(remaining)`,
        [
          [
            [
              "Decrease remaining inside the body.",
              "Verlaag remaining binnen het blok.",
            ],
            [
              "The condition must eventually become false.",
              "De voorwaarde moet uiteindelijk onwaar worden.",
            ],
          ],
          [
            ["Print remaining again.", "Druk remaining opnieuw af."],
            [
              "Printing does not change the condition.",
              "Afdrukken verandert de voorwaarde niet.",
            ],
          ],
          [
            [
              "Assign remaining to the same starting value each time.",
              "Wijs elke keer dezelfde beginwaarde toe.",
            ],
            [
              "That keeps the condition true forever.",
              "Dat houdt de voorwaarde eeuwig waar.",
            ],
          ],
        ],
      ),
      Q(
        "and or not",
        "application",
        f
          ? [
              "Access needs membership and no ban. Which rule fits?",
              "Toegang vereist lidmaatschap en geen verbod. Welke regel past?",
            ]
          : [
              "Playing needs a ready player and no pause. Which rule fits?",
              "Spelen vereist een klaarstaande speler en geen pauze. Welke regel past?",
            ],
        null,
        [
          [
            [
              f ? "member and not banned" : "ready and not paused",
              f ? "member and not banned" : "ready and not paused",
            ],
            [
              "Both requirements must hold, including the reversed restriction.",
              "Beide eisen moeten gelden, inclusief de omgekeerde beperking.",
            ],
          ],
          [
            [
              f ? "member or not banned" : "ready or not paused",
              f ? "member or not banned" : "ready or not paused",
            ],
            [
              "or allows either requirement alone, which is too permissive.",
              "or laat één eis alleen toe, wat te ruim is.",
            ],
          ],
          [
            [
              f ? "member and banned" : "ready and paused",
              f ? "member and banned" : "ready and paused",
            ],
            [
              "The restriction must be absent, not present.",
              "De beperking moet afwezig zijn, niet aanwezig.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(5, (f) => {
    const n = f ? 8 : 4;
    return [
      P(
        "aliasing copying list-mutation",
        `values = [${n}, 2]\nalias = values\ncopy = values.copy()\nalias[0] = 9\nprint(values[0], copy[0])`,
        [`9 ${n}`, "9 9", `${n} ${n}`],
        [
          [
            "The alias shares the changed list; the copy retains its earlier value.",
            "De alias deelt de gewijzigde lijst; de kopie behoudt de eerdere waarde.",
          ],
          [
            "A separate flat copy is not changed by alias mutation.",
            "Een aparte vlakke kopie verandert niet door aliasmutatie.",
          ],
          [
            "The alias and original refer to the same list.",
            "Alias en origineel verwijzen naar dezelfde lijst.",
          ],
        ],
      ),
      P(
        "negative-indexing len",
        `values = [${n}, 2, 7]\nprint(values[-1], len(values))`,
        ["7 3", `${n} 3`, "7 2"],
        [
          [
            "-1 selects the last item; length counts all three items.",
            "-1 kiest het laatste item; lengte telt alle drie items.",
          ],
          [
            "Negative indexes count from the end, not the beginning.",
            "Negatieve indexen tellen vanaf het einde, niet het begin.",
          ],
          [
            "The last positive index is 2, but length is 3.",
            "De laatste positieve index is 2, maar de lengte is 3.",
          ],
        ],
      ),
      B(
        "append",
        [
          "Add one item without replacing the list.",
          "Voeg één item toe zonder de lijst te vervangen.",
        ],
        `values = []\nvalues.___(${n})\nprint(values)`,
        "append",
        ["copy", "clear"],
        [
          "append adds one item in place. copy and clear do not add the supplied item.",
          "append voegt één item op zijn plek toe. copy en clear voegen het meegegeven item niet toe.",
        ],
        `[${n}]\n`,
      ),
      B(
        "tuples unpacking multiple-returns",
        [
          "Unpack the returned coordinates.",
          "Pak de teruggegeven coördinaten uit.",
        ],
        `def point():\n    return ${n}, 2\nx, ___ = point()\nprint(x, y)`,
        "y",
        ["point", "x"],
        [
          "The two names receive the two tuple components in order.",
          "De twee namen ontvangen de twee tuple-onderdelen op volgorde.",
        ],
        `${n} 2\n`,
      ),
      Q(
        "return none",
        "debugging",
        ["Why is result None?", "Waarom is result None?"],
        `def calculate():\n    print(${n} * 2)\nresult = calculate()`,
        [
          [
            [
              "The function prints but does not return the number.",
              "De functie drukt af maar geeft het getal niet terug.",
            ],
            [
              "Add return for a value the caller can use.",
              "Voeg return toe voor een waarde die de aanroeper kan gebruiken.",
            ],
          ],
          [
            [
              "Multiplication cannot be used in a function.",
              "Vermenigvuldigen kan niet in een functie.",
            ],
            [
              "Arithmetic is allowed; the missing return is the issue.",
              "Rekenen is toegestaan; de ontbrekende return is het probleem.",
            ],
          ],
          [
            [
              "The call needs an extra pair of parentheses.",
              "De aanroep heeft extra haakjes nodig.",
            ],
            [
              "The function is already called correctly.",
              "De functie wordt al correct aangeroepen.",
            ],
          ],
        ],
      ),
      Q(
        "range-start-stop-step",
        "application",
        f
          ? ["Which range counts 6, 4, 2?", "Welke range telt 6, 4, 2?"]
          : ["Which range counts 5, 3, 1?", "Welke range telt 5, 3, 1?"],
        null,
        [
          [
            [
              f ? "range(6, 0, -2)" : "range(5, 0, -2)",
              f ? "range(6, 0, -2)" : "range(5, 0, -2)",
            ],
            [
              "A negative step moves toward the excluded lower stop.",
              "Een negatieve stap gaat naar het uitgesloten lagere einde.",
            ],
          ],
          [
            [
              f ? "range(6, 0, 2)" : "range(5, 0, 2)",
              f ? "range(6, 0, 2)" : "range(5, 0, 2)",
            ],
            [
              "A positive step cannot move from this start down to the stop.",
              "Een positieve stap kan niet vanaf dit begin naar het lagere einde gaan.",
            ],
          ],
          [
            [
              f ? "range(0, 6, -2)" : "range(0, 5, -2)",
              f ? "range(0, 6, -2)" : "range(0, 5, -2)",
            ],
            [
              "The start and stop are reversed for this negative step.",
              "Begin en einde zijn omgedraaid voor deze negatieve stap.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(6, (f) => {
    const n = f ? 7 : 3;
    return [
      P(
        "decimal",
        `from decimal import Decimal\nprint(Decimal("0.1") * ${n} == Decimal("0.${n}"))`,
        ["True", "False", "None"],
        [
          [
            "Decimal from text preserves these exact tenths.",
            "Decimal uit tekst behoudt deze exacte tienden.",
          ],
          [
            "These inputs are strings, not approximated floats.",
            "Deze invoer is tekst, geen benaderde floats.",
          ],
          [
            "The equality expression produces a Boolean.",
            "De gelijkheidsexpressie geeft een boolean.",
          ],
        ],
      ),
      P(
        "random random-seed",
        `import random\nrandom.seed(${n})\na = random.randint(1, 6)\nrandom.seed(${n})\nb = random.randint(1, 6)\nprint(a == b)`,
        ["True", "False", "None"],
        [
          [
            "Resetting to the same seed replays the same first draw.",
            "Op dezelfde seed herstarten herhaalt dezelfde eerste trekking.",
          ],
          [
            "The seed deliberately makes this experiment reproducible.",
            "De seed maakt dit experiment bewust herhaalbaar.",
          ],
          [
            "The comparison has a definite Boolean result.",
            "De vergelijking heeft een bepaald booleaans resultaat.",
          ],
        ],
      ),
      B(
        "imports aliases",
        ["Complete the aliased import.", "Vul de import met alias aan."],
        `import math ___ m\nprint(m.ceil(${n}.2))`,
        "as",
        ["from", "in"],
        [
          "as binds the imported module to another name.",
          "as koppelt de geïmporteerde module aan een andere naam.",
        ],
        String(n + 1) + "\n",
      ),
      B(
        "from-import",
        ["Import one named function.", "Importeer één benoemde functie."],
        `from math ___ floor\nprint(floor(${n}.8))`,
        "import",
        ["as", "return"],
        [
          "from module import name introduces that member directly.",
          "from module import naam introduceert dat onderdeel direct.",
        ],
        String(n) + "\n",
      ),
      Q(
        "copying aliasing",
        "debugging",
        [
          "Why did the original history change too?",
          "Waarom veranderde de oorspronkelijke geschiedenis ook?",
        ],
        `history = [${n}]\nbackup = history\nbackup.append(9)`,
        [
          [
            [
              "backup is an alias; use a copy for an independent flat snapshot.",
              "backup is een alias; gebruik een kopie voor een onafhankelijke vlakke momentopname.",
            ],
            [
              "Assignment does not clone a list.",
              "Toewijzing kloont een lijst niet.",
            ],
          ],
          [
            [
              "append always updates every list in a program.",
              "append werkt altijd elke lijst in een programma bij.",
            ],
            [
              "Only references to this same list see the mutation.",
              "Alleen verwijzingen naar dezelfde lijst zien de wijziging.",
            ],
          ],
          [
            [
              "Numbers inside lists are all global variables.",
              "Getallen in lijsten zijn allemaal globale variabelen.",
            ],
            [
              "Shared list identity, not numeric scope, causes this.",
              "Gedeelde lijstidentiteit, niet getalbereik, veroorzaakt dit.",
            ],
          ],
        ],
      ),
      Q(
        "local-scope",
        "application",
        f
          ? [
              "A helper should work with different prices. Where should price come from?",
              "Een helper moet met verschillende prijzen werken. Waar moet price vandaan komen?",
            ]
          : [
              "A helper should work with different distances. Where should distance come from?",
              "Een helper moet met verschillende afstanden werken. Waar moet distance vandaan komen?",
            ],
        null,
        [
          [
            [
              "An explicit parameter supplied by its caller.",
              "Een expliciete parameter van de aanroeper.",
            ],
            [
              "Parameters expose dependencies and allow independent calls.",
              "Parameters maken afhankelijkheden zichtbaar en laten onafhankelijke aanroepen toe.",
            ],
          ],
          [
            [
              "A hidden unrelated global variable.",
              "Een verborgen niet-gerelateerde globale variabele.",
            ],
            [
              "That makes the result depend on state outside the call contract.",
              "Dat maakt het resultaat afhankelijk van toestand buiten de aanroepafspraak.",
            ],
          ],
          [
            [
              "A fixed sample number inside the function.",
              "Een vast voorbeeldgetal binnen de functie.",
            ],
            [
              "A fixed example ignores other caller needs.",
              "Een vast voorbeeld negeert andere behoeften van de aanroeper.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(7, (f) => {
    const n = f ? 15 : 10;
    return [
      P(
        "rect attributes coordinates",
        `import pygame\nbox = pygame.Rect(${n}, 20, 30, 40)\nprint(box.right, box.bottom)`,
        [`${n + 30} 60`, `${n} 20`, "30 40"],
        [
          [
            "Right and bottom add size to the top-left coordinates.",
            "Rechts en onder tellen afmeting bij linksboven op.",
          ],
          [
            "These are the left and top coordinates, not opposite edges.",
            "Dit zijn links en boven, niet de tegenoverliggende randen.",
          ],
          [
            "Width and height are sizes, not edge coordinates.",
            "Breedte en hoogte zijn afmetingen, geen randcoördinaten.",
          ],
        ],
      ),
      P(
        "surface colours drawing-order",
        `import pygame\ncanvas = pygame.Surface((10, 10))\ncanvas.fill((0, 0, ${n}))\npygame.draw.rect(canvas, (255, 0, 0), (0, 0, 5, 5))\npixel = canvas.get_at((2, 2))\nprint((pixel[0], pixel[1], pixel[2]))`,
        ["(255, 0, 0)", `(0, 0, ${n})`, "(0, 0, 0)"],
        [
          [
            "The rectangle was drawn last over this pixel.",
            "De rechthoek is als laatste over deze pixel getekend.",
          ],
          [
            "The later rectangle covers the background in its region.",
            "De latere rechthoek bedekt de achtergrond in zijn gebied.",
          ],
          [
            "The initial black pixel was replaced by both drawing operations.",
            "De aanvankelijk zwarte pixel is door beide tekenbewerkingen vervangen.",
          ],
        ],
      ),
      B(
        "key-events",
        [
          "Check the event type before reading a key.",
          "Controleer het gebeurtenistype vóór een toets lezen.",
        ],
        `import pygame\nevent = pygame.event.Event(pygame.KEYDOWN, key=pygame.K_${f ? "p" : "SPACE"})\nif event.type == pygame.___:\n    print(event.key == pygame.K_${f ? "p" : "SPACE"})`,
        "KEYDOWN",
        ["QUIT", "KEYUP"],
        [
          "Only this KEYDOWN branch matches the supplied key-press event.",
          "Alleen deze KEYDOWN-tak past bij de meegegeven toetsaanslag.",
        ],
        "True\n",
      ),
      B(
        "close-event",
        ["Recognise a close request.", "Herken een sluitverzoek."],
        `import pygame\nrunning = True\nevent_type = pygame.QUIT\nif event_type == pygame.___:\n    running = False\nprint(${f ? "not running" : "running"})`,
        "QUIT",
        ["KEYDOWN", "KEYUP"],
        [
          "QUIT is the close event, independent of keyboard events.",
          "QUIT is de sluitgebeurtenis, onafhankelijk van toetsgebeurtenissen.",
        ],
        f ? "True\n" : "False\n",
      ),
      Q(
        "random-seed",
        "debugging",
        [
          "Why might every serve repeat the same random choice?",
          "Waarom kan elke opslag dezelfde willekeurige keuze herhalen?",
        ],
        `import random\ndef serve():\n    random.seed(${n})\n    return random.choice([-1, 1])`,
        [
          [
            [
              "The same seed is reset inside every call.",
              "Dezelfde seed wordt binnen elke aanroep opnieuw ingesteld.",
            ],
            [
              "Seed once around an experiment, not before every draw.",
              "Stel de seed één keer rond een experiment in, niet vóór elke trekking.",
            ],
          ],
          [
            [
              "choice cannot accept negative values.",
              "choice accepteert geen negatieve waarden.",
            ],
            [
              "choice can select any supplied item, including negative numbers.",
              "choice kan elk meegegeven item kiezen, ook negatieve getallen.",
            ],
          ],
          [
            [
              "Functions cannot use imported modules.",
              "Functies kunnen geen geïmporteerde modules gebruiken.",
            ],
            [
              "Imports are available to functions in their module.",
              "Imports zijn beschikbaar voor functies in hun module.",
            ],
          ],
        ],
      ),
      Q(
        "tuples multiple-returns",
        "application",
        f
          ? [
              "A helper returns width, height. How many values does one return statement send back?",
              "Een helper geeft width, height terug. Hoeveel waarden stuurt één return-opdracht terug?",
            ]
          : [
              "A helper returns x, y. What does the caller receive before unpacking?",
              "Een helper geeft x, y terug. Wat ontvangt de aanroeper vóór uitpakken?",
            ],
        null,
        [
          [
            [
              "One tuple containing two components.",
              "Eén tuple met twee onderdelen.",
            ],
            [
              "Comma-separated returned values are packed into one tuple.",
              "Door komma’s gescheiden terugkeerwaarden worden in één tuple verpakt.",
            ],
          ],
          [
            [
              "Two unrelated returns executed in sequence.",
              "Twee losse returns achter elkaar.",
            ],
            [
              "The first return would already finish the call.",
              "De eerste return zou de aanroep al beëindigen.",
            ],
          ],
          [
            ["A string containing a comma.", "Een string met een komma."],
            [
              "No string conversion is implied by tuple packing.",
              "Tupleverpakking impliceert geen stringomzetting.",
            ],
          ],
        ],
      ),
    ];
  }),
  quiz(8, (f) => {
    const n = f ? 40 : 20;
    return [
      P(
        "velocity elapsed-time",
        `position = ${n}\nvelocity = -80\ndt = 0.25\nprint(position + velocity * dt)`,
        [String(n - 20) + ".0", String(n - 80), String(n + 20) + ".0"],
        [
          [
            "The displacement is -20, so position decreases by 20.",
            "De verplaatsing is -20, dus positie daalt met 20.",
          ],
          [
            "Velocity must be multiplied by elapsed seconds, not added directly.",
            "Snelheid moet met verstreken seconden vermenigvuldigd worden, niet direct opgeteld.",
          ],
          [
            "The negative velocity moves in the opposite direction.",
            "De negatieve snelheid beweegt in de tegengestelde richting.",
          ],
        ],
      ),
      P(
        "held-keys simultaneous-controls",
        `y = ${n}\nup, down = True, True\nif up:\n    y -= 5\nif down:\n    y += 5\nprint(y)`,
        [String(n), String(n - 5), String(n + 5)],
        [
          [
            "The independent opposite updates cancel.",
            "De onafhankelijke tegengestelde updates heffen elkaar op.",
          ],
          [
            "The down branch also runs; this is not if/elif.",
            "De omlaagtak draait ook; dit is geen if/elif.",
          ],
          [
            "The up branch runs before the down branch.",
            "De omhoogtak draait vóór de omlaagtak.",
          ],
        ],
      ),
      B(
        "boundaries",
        [
          "Keep the entire paddle visible at the bottom.",
          "Houd het hele batje onderaan zichtbaar.",
        ],
        `height = ${f ? 80 : 60}\ncourt_height = 400\nmax_y = court_height ___ height\nprint(max_y)`,
        "-",
        ["+", "*"],
        [
          "The top can reach court height minus the object’s own height.",
          "De bovenkant kan veldhoogte min de eigen objecthoogte bereiken.",
        ],
        String(400 - (f ? 80 : 60)) + "\n",
      ),
      B(
        "wall-bounce",
        [
          "Bounce only while approaching the upper wall.",
          "Bots alleen bij het naderen van de bovenmuur.",
        ],
        `y, radius, vy = ${f ? 4 : 2}, 6, -100\nif y <= radius and vy ___ 0:\n    vy = -vy\nprint(vy)`,
        "<",
        [">", "=="],
        [
          "A negative vertical velocity approaches the top edge.",
          "Een negatieve verticale snelheid nadert de bovenrand.",
        ],
        "100\n",
      ),
      Q(
        "drawing-order",
        "debugging",
        [
          "Why is the drawn object invisible?",
          "Waarom is het getekende object onzichtbaar?",
        ],
        `import pygame\ncanvas = pygame.Surface((100, 100))\npygame.draw.rect(canvas, (255, 0, 0), (${n}, 10, 20, 20))\ncanvas.fill((0, 0, 0))`,
        [
          [
            [
              "The later fill covers the rectangle.",
              "De latere fill bedekt de rechthoek.",
            ],
            [
              "Paint the background before the foreground.",
              "Teken de achtergrond vóór de voorgrond.",
            ],
          ],
          [
            [
              "Red cannot be drawn on a Surface.",
              "Rood kan niet op een Surface getekend worden.",
            ],
            [
              "The colour is valid; the order overwrites it.",
              "De kleur is geldig; de volgorde overschrijft die.",
            ],
          ],
          [
            [
              "Rectangles need a dictionary first.",
              "Rechthoeken hebben eerst een dictionary nodig.",
            ],
            [
              "Drawing accepts a rectangle tuple directly.",
              "Tekenen accepteert direct een rechthoektuple.",
            ],
          ],
        ],
      ),
      Q(
        "imports install-vs-import",
        "application",
        f
          ? [
              "A local project cannot import pygame yet. What is the difference between install and import?",
              "Een lokaal project kan pygame nog niet importeren. Wat is het verschil tussen installeren en importeren?",
            ]
          : [
              "The browser bundles pygame-ce already. What does import pygame do in a lesson?",
              "De browser bundelt pygame-ce al. Wat doet import pygame in een les?",
            ],
        null,
        [
          [
            [
              "Installation provides the package to an environment; import loads it for the program.",
              "Installeren levert het pakket aan een omgeving; import laadt het voor het programma.",
            ],
            [
              "These are separate steps; an import statement is not a package installer.",
              "Dit zijn aparte stappen; een import-opdracht is geen pakketinstaller.",
            ],
          ],
          [
            [
              "import downloads and installs any missing package automatically.",
              "import downloadt en installeert elk ontbrekend pakket automatisch.",
            ],
            [
              "An unavailable package still raises ModuleNotFoundError.",
              "Een niet-beschikbaar pakket geeft nog steeds ModuleNotFoundError.",
            ],
          ],
          [
            [
              "Every standard module needs pip installation first.",
              "Elke standaardmodule moet eerst met pip worden geïnstalleerd.",
            ],
            [
              "Standard-library modules already come with Python.",
              "Standaardmodules worden al met Python meegeleverd.",
            ],
          ],
        ],
      ),
    ];
  }),
];
