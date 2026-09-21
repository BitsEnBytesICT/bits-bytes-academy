import { lesson as L, reading as R, quiz as Q, loc } from "./helpers.mjs";
const g = "python-control-flow";
R(
  g,
  1,
  "Control flow is the order in which a program performs work. A condition lets Python choose whether a block should run. Read the condition before predicting the output.",
  "Control flow is de volgorde waarin een programma werk uitvoert. Een voorwaarde bepaalt of Python een blok uitvoert. Lees eerst de voorwaarde en voorspel daarna de output.",
  'temperature = 28\nif temperature > 25:\n    print("Open a window")\nprint("Check complete")\n',
  { titleNl: "Uitvoeringsvolgorde" },
);
L(
  g,
  2,
  "A Boolean represents one of two values: True or False. A factual proposition can be checked against data. An opinion has no single objective truth value without additional criteria.",
  "Een Boolean heeft één van twee waarden: True of False. Een feitelijke bewering kun je aan gegevens toetsen. Een mening heeft zonder extra criteria geen eenduidige waarheidswaarde.",
  "Set water_freezes_at_zero to True and five_is_even to False. Print both.",
  "Zet water_freezes_at_zero op True en five_is_even op False. Druk beide af.",
  "water_freezes_at_zero = True\nfive_is_even = False\nprint(water_freezes_at_zero, five_is_even)\n",
  "water_freezes_at_zero is True and five_is_even is False",
  { example: "is_ready = True", titleNl: "Boolean-beweringen" },
);
L(
  g,
  3,
  "== compares values for equality; != checks that they differ. These comparisons return Booleans. A single = assigns a value and cannot replace == in a condition.",
  "== vergelijkt of waarden gelijk zijn; != controleert of ze verschillen. Deze vergelijkingen geven Booleans terug. Een enkele = wijst een waarde toe en vervangt == niet in een voorwaarde.",
  "With expected = 17 and received = 12, set matches using == and differs using !=.",
  "Gebruik expected = 17 en received = 12. Bepaal matches met == en differs met !=.",
  "expected = 17\nreceived = 12\nmatches = expected == received\ndiffers = expected != received\nprint(matches, differs)\n",
  "matches is False and differs is True",
  {
    starter: "expected = 17\nreceived = 12\n",
    example: "same = 4 == 4",
    titleNl: "Gelijkheid vergelijken",
  },
);
L(
  g,
  4,
  'True is a Boolean, while "True" is a string. Types matter even when values look similar when printed. Store the comparison itself instead of a quoted description of its result.',
  'True is een Boolean, terwijl "True" een string is. Het type is belangrijk, ook als waarden op de output lijken. Sla de vergelijking zelf op in plaats van een tekstbeschrijving van het resultaat.',
  "Set enabled to Boolean True and status_text to string True.",
  "Zet enabled op de Boolean True en status_text op de string True.",
  'enabled = True\nstatus_text = "True"\nprint(type(enabled), type(status_text))\n',
  "enabled is True and status_text == 'True' and type(status_text) is str",
  { titleNl: "Boolean-variables" },
);
L(
  g,
  5,
  "An if statement executes its indented block when the condition is true. End the condition with a colon. Consistent indentation tells Python which statements belong to the block.",
  "Een if statement voert het ingesprongen blok uit als de voorwaarde waar is. Sluit de voorwaarde af met een dubbele punt. Consistente inspringing vertelt Python welke regels bij het blok horen.",
  "If temperature is above 30, print Heat warning. Keep temperature at 34.",
  "Druk Heat warning af als temperature hoger is dan 30. Houd temperature op 34.",
  'temperature = 34\nif temperature > 30:\n    print("Heat warning")\n',
  "temperature == 34 and _stdout.strip() == 'Heat warning' and any(isinstance(n,_ast.If) for n in _ast.walk(_ast.parse(_source)))",
  {
    starter: "temperature = 34\n",
    example: 'if speed > 10:\n    print("Slow down")',
    titleNl: "If statements",
  },
);
L(
  g,
  6,
  "< and > exclude the boundary; <= and >= include it. Choose the comparison that matches the wording of the requirement. At most includes equality; less than does not.",
  "< en > sluiten de grenswaarde uit; <= en >= nemen deze mee. Kies de vergelijking die bij de opdracht past. Hoogstens omvat gelijkheid; kleiner dan niet.",
  "For load = 80 and limit = 80, set within_limit using <= and below_limit using <.",
  "Gebruik load = 80 en limit = 80. Bepaal within_limit met <= en below_limit met <.",
  "load = 80\nlimit = 80\nwithin_limit = load <= limit\nbelow_limit = load < limit\nprint(within_limit, below_limit)\n",
  "within_limit is True and below_limit is False",
  { titleNl: "Grenswaarden vergelijken" },
);
L(
  g,
  7,
  "and requires both conditions to be true. Python checks the left side first and only evaluates the right side if needed. Parentheses can make combined comparisons easier to read.",
  "and vereist dat beide voorwaarden waar zijn. Python controleert eerst links en beoordeelt rechts alleen als dat nodig is. Haakjes kunnen gecombineerde vergelijkingen duidelijker maken.",
  "Set can_start using charged and lid_closed. Use charged = True and lid_closed = False.",
  "Bepaal can_start met charged and lid_closed. Gebruik charged = True en lid_closed = False.",
  "charged = True\nlid_closed = False\ncan_start = charged and lid_closed\nprint(can_start)\n",
  "can_start is False and 'and' in _source",
  { titleNl: "Voorwaarden combineren met and" },
);
L(
  g,
  8,
  "or is true when at least one condition is true. It is also true when both are true. This is useful when several independent conditions can trigger the same action.",
  "or is waar als minstens één voorwaarde waar is. Ook als beide waar zijn, is het resultaat waar. Dit is handig als meerdere voorwaarden dezelfde actie kunnen activeren.",
  "Set maintenance_needed from hours > 100 or warning. Use hours = 45 and warning = True.",
  "Bepaal maintenance_needed met hours > 100 or warning. Gebruik hours = 45 en warning = True.",
  "hours = 45\nwarning = True\nmaintenance_needed = hours > 100 or warning\nprint(maintenance_needed)\n",
  "maintenance_needed is True and 'or' in _source",
  { titleNl: "Alternatieven met or" },
);
L(
  g,
  9,
  "not reverses a condition’s truth value. It turns True into False and False into True. Prefer a clear positive variable name so the negation remains easy to understand.",
  "not keert de waarheidswaarde om. True wordt False en False wordt True. Kies een duidelijke positieve variablenaam, zodat de ontkenning begrijpelijk blijft.",
  "Use occupied = False and set available to not occupied.",
  "Gebruik occupied = False en zet available op not occupied.",
  "occupied = False\navailable = not occupied\nprint(available)\n",
  "available is True and 'not' in _source",
  { titleNl: "Een voorwaarde ontkennen" },
);
L(
  g,
  10,
  "An else block runs when the preceding if condition is false. One of the two blocks runs, never both. else has a colon but no condition of its own.",
  "Een else-blok wordt uitgevoerd als de voorafgaande if-voorwaarde onwaar is. Eén van de twee blokken wordt uitgevoerd, nooit beide. else krijgt een dubbele punt, maar geen eigen voorwaarde.",
  "For seats = 0, print Full when no seats remain; otherwise print Seats available.",
  "Gebruik seats = 0. Druk Full af als er geen plaatsen over zijn; druk anders Seats available af.",
  'seats = 0\nif seats == 0:\n    print("Full")\nelse:\n    print("Seats available")\n',
  "_stdout.strip() == 'Full' and any(isinstance(n,_ast.If) and n.orelse for n in _ast.walk(_ast.parse(_source)))",
  { starter: "seats = 0\n", titleNl: "Een else-blok" },
);
L(
  g,
  11,
  "An if/elif/else chain tests conditions from top to bottom. The first true branch wins; later branches are skipped. Order narrow conditions before broader ones that would also match.",
  "Een if/elif/else-reeks controleert voorwaarden van boven naar beneden. De eerste ware voorwaarde bepaalt welk blok wordt uitgevoerd. Zet specifieke voorwaarden vóór bredere voorwaarden die ook zouden passen.",
  "With wind = 18, set category to calm below 10, breezy below 25, and strong otherwise. Print category.",
  "Gebruik wind = 18. Geef category de waarde calm onder 10, breezy onder 25 en anders strong. Druk category af.",
  'wind = 18\nif wind < 10:\n    category = "calm"\nelif wind < 25:\n    category = "breezy"\nelse:\n    category = "strong"\nprint(category)\n',
  "category == 'breezy' and 'elif' in _source",
  { starter: "wind = 18\n", titleNl: "Meerdere branches" },
);
R(
  g,
  12,
  "Try changing the input values in this decision program. Predict which branch runs before you press Run. Compare separate if statements with an if/elif chain: independent if statements can run more than one block.",
  "Verander de invoerwaarden in dit beslisprogramma. Voorspel vóór het uitvoeren welke branch wordt gekozen. Vergelijk losse if statements met een if/elif-reeks: meerdere losse if-blokken kunnen worden uitgevoerd.",
  'rain = True\nwind = 12\nif rain and wind > 20:\n    print("Indoor session")\nelif rain:\n    print("Bring a jacket")\nelse:\n    print("Enjoy the trail")\n',
  { titleNl: "Terugblik: beslissingen" },
);
const e = "python-errors";
R(
  e,
  1,
  "Debugging starts with a reproducible problem. Run the code, read the error from the bottom of the traceback, locate the relevant line, and change one thing. Then run again to test your explanation.",
  "Debuggen begint met een probleem dat je opnieuw kunt oproepen. Voer de code uit, lees de fout onderaan de traceback, zoek de relevante regel en verander één ding. Voer de code opnieuw uit om je verklaring te testen.",
  'print("Observe → explain → change → test")\n',
  { titleNl: "Een fout onderzoeken" },
);
L(
  e,
  2,
  "A SyntaxError means the program could not be parsed. Missing colons, unmatched brackets, or incomplete strings are common causes. No statements in the script run until the syntax is valid.",
  "Een SyntaxError betekent dat Python de code niet kan ontleden. Ontbrekende dubbele punten, haakjes of aanhalingstekens zijn veelvoorkomende oorzaken. De code wordt pas uitgevoerd als de syntax klopt.",
  "Run the code to see the SyntaxError. Add the missing colon so Ready is printed.",
  "Voer de code uit om de SyntaxError te zien. Voeg de ontbrekende dubbele punt toe zodat Ready verschijnt.",
  'if True:\n    print("Ready")\n',
  "_stdout.strip() == 'Ready'",
  {
    starter: 'if True\n    print("Ready")\n',
    titleNl: "SyntaxError herstellen",
  },
);
L(
  e,
  3,
  "A NameError occurs when a name has no value in the current scope. Python names are case-sensitive. Compare the spelling at the assignment with the spelling where the name is used.",
  "Een NameError ontstaat als een naam geen waarde heeft in de huidige scope. Python maakt onderscheid tussen hoofdletters en kleine letters. Vergelijk de naam bij de assignment met de naam op de plek waar je deze gebruikt.",
  "Repair the inconsistent name so the program prints 16. Keep the variable named count.",
  "Herstel de verschillende schrijfwijzen zodat het programma 16 afdrukt. Houd de variablenaam count.",
  "count = 16\nprint(count)\n",
  "count == 16 and _stdout.strip() == '16'",
  { starter: "count = 16\nprint(Count)\n", titleNl: "NameError herstellen" },
);
L(
  e,
  4,
  "A TypeError reports an operation that does not support the supplied types. Converting intentionally is better than guessing. int() converts suitable numeric text; str() turns a value into text for display.",
  "Een TypeError meldt dat een bewerking de gebruikte types niet ondersteunt. Kies bewust een conversie. int() zet geschikte numerieke tekst om; str() zet een waarde om in tekst voor weergave.",
  "Convert the string quantity to an integer, add 2, and store the result in updated. Print updated.",
  "Zet de string quantity om naar een integer, tel er 2 bij op en sla het resultaat op in updated. Druk updated af.",
  'quantity = "6"\nupdated = int(quantity) + 2\nprint(updated)\n',
  "updated == 8 and type(updated) is int",
  {
    starter: 'quantity = "6"\nupdated = quantity + 2\nprint(updated)\n',
    titleNl: "TypeError herstellen",
  },
);
R(
  e,
  5,
  "Use the exception type as a clue: SyntaxError points to structure, NameError to an unavailable name, and TypeError to incompatible operations. A traceback is diagnostic information, not a sign that you should stop experimenting.",
  "Gebruik het exception type als aanwijzing: SyntaxError gaat over structuur, NameError over een onbekende naam en TypeError over onverenigbare bewerkingen. Een traceback helpt je onderzoeken; het is geen reden om te stoppen met experimenteren.",
  'quantity = "6"\nprint(int(quantity) + 2)\n',
  { titleNl: "Terugblik: debuggen" },
);
Q(g, [
  [
    "What value is printed?",
    "Welke waarde wordt afgedrukt?",
    "print(8 >= 8)",
    ["True", "False"],
    ">= includes equality, so the comparison is true.",
    ">= omvat gelijkheid, dus de vergelijking is waar.",
  ],
  [
    "Which is a Boolean value?",
    "Welke waarde is een Boolean?",
    "",
    ["False", '"False"', "0.0", '"0"'],
    "False without quotes is a Boolean literal.",
    "False zonder aanhalingstekens is een Boolean literal.",
  ],
  [
    "What does this expression evaluate to?",
    "Wat is het resultaat van deze expressie?",
    "True and not False",
    ["True", "False"],
    "not False is True, and both sides of and are true.",
    "not False is True, en beide kanten van and zijn waar.",
  ],
  [
    "Which comparison tests equality?",
    "Welke vergelijking controleert gelijkheid?",
    "",
    ["size == 10", "size = 10", "size => 10"],
    "== compares; = assigns.",
    "== vergelijkt; = wijst een waarde toe.",
  ],
  [
    "What is printed?",
    "Wat wordt afgedrukt?",
    'n = 12\nif n > 5:\n    print("A")\nelif n > 10:\n    print("B")',
    ["A", "B", "A then B", "Nothing"],
    "The first true branch wins in an if/elif chain.",
    "Bij if/elif wordt alleen de eerste passende branch uitgevoerd.",
  ],
  [
    "Which expression is false?",
    "Welke expressie is onwaar?",
    "",
    ["False or False", "True or False", "not False", "True and True"],
    "or needs at least one true operand. Both operands here are false.",
    "or vereist minstens één ware operand. Hier zijn beide operands onwaar.",
  ],
  [
    "What is wrong with this code?",
    "Wat is er mis met deze code?",
    'if speed > 5\n    print("Slow")',
    [
      ["Missing colon", "Dubbele punt ontbreekt"],
      ["Invalid variable name", "Ongeldige variablenaam"],
      [
        "print needs quotes around speed",
        "print vereist aanhalingstekens rond speed",
      ],
    ],
    "The condition line must end in a colon before its indented block.",
    "De regel met de voorwaarde moet eindigen op een dubbele punt.",
  ],
  [
    "Which lines are printed?",
    "Welke regels worden afgedrukt?",
    'x = 7\nif x > 2:\n    print("A")\nif x > 5:\n    print("B")',
    ["A then B", "A", "B", "Nothing"],
    "These are independent if statements, so both true conditions run their blocks.",
    "Dit zijn losse if statements. Beide ware voorwaarden voeren hun blok uit.",
  ],
]);
