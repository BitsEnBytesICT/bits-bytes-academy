import "./control-flow-lessons.mjs";
import "./debugging-lessons.mjs";
import { quiz as Q, loc } from "./helpers.mjs";
const g = "python-control-flow";
Q(
  g,
  [
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
  ],
  {
    feedback: [
      [
        loc(
          "True: >= allows either a larger value or an equal value. Here both sides are 8.",
          "True: >= staat een grotere of gelijke waarde toe. Hier zijn beide kanten 8.",
        ),
        loc(
          "The equal sign matters: 8 > 8 would be False, but 8 >= 8 is True because equality is included.",
          "Het gelijkteken telt mee: 8 > 8 zou False zijn, maar 8 >= 8 is True omdat gelijkheid meetelt.",
        ),
      ],
      [
        loc(
          "False without quotes is a bool. A Boolean value can represent either truth value; it does not have to be True.",
          "False zonder aanhalingstekens is een bool. Een Boolean kan beide waarheidswaarden voorstellen en hoeft niet True te zijn.",
        ),
        loc(
          'Quotes make "False" a string. Its letters describe a Boolean, but its type is str.',
          'Aanhalingstekens maken "False" een string. De letters beschrijven een Boolean, maar het type is str.',
        ),
        loc(
          "0.0 is a float. A number can be used in a condition, but that does not make its stored type bool.",
          "0.0 is een float. Je kunt een getal in een voorwaarde gebruiken, maar het opgeslagen type wordt daardoor geen bool.",
        ),
        loc(
          '"0" is text because it is quoted. Use the literal False for a Boolean false value.',
          '"0" is tekst omdat het tussen aanhalingstekens staat. Gebruik de literal False voor een onware Boolean-waarde.',
        ),
      ],
      [
        loc(
          "Evaluate not first: not False becomes True. The remaining expression is True and True, so its result is True.",
          "Werk eerst not uit: not False wordt True. Er blijft True and True over, dus de uitkomst is True.",
        ),
        loc(
          "not reverses False before and combines the values. There is no False operand left: both sides of and are True.",
          "not keert False om voordat and de waarden combineert. Er blijft geen False-operand over: beide kanten van and zijn True.",
        ),
      ],
      [
        loc(
          "Two equals signs ask a question about the current value of size; the result is a Boolean.",
          "Twee gelijktekens stellen een vraag over de huidige waarde van size; het resultaat is een Boolean.",
        ),
        loc(
          "A single = stores 10 in size. It is an assignment, not an equality comparison.",
          "Eén = slaat 10 op in size. Dit is een toewijzing en geen gelijkheidsvergelijking.",
        ),
        loc(
          "=> is not a Python comparison operator. >= means greater than or equal to; == is the equality test asked for here.",
          "=> is geen Python-vergelijkingsoperator. >= betekent groter dan of gelijk aan; == is de gevraagde gelijkheidstest.",
        ),
      ],
      [
        loc(
          "12 > 5 is already true, so Python runs the first block and skips the remaining elif branches in this chain.",
          "12 > 5 is al waar, dus Python voert het eerste blok uit en slaat de overige elif-branches in deze keten over.",
        ),
        loc(
          "Although 12 > 10 is true too, elif is only considered after the previous condition fails. The first branch already matched.",
          "Hoewel 12 > 10 ook waar is, wordt elif alleen bekeken als de vorige voorwaarde faalt. De eerste branch paste al.",
        ),
        loc(
          "An if/elif chain selects one branch. Two separate if statements could print both messages; that is not the structure shown here.",
          "Een if/elif-keten kiest één branch. Twee losse if-instructies zouden beide berichten kunnen afdrukken, maar hier staat een keten.",
        ),
        loc(
          "The first comparison is true because 12 is greater than 5, so its print call does run.",
          "De eerste vergelijking is waar omdat 12 groter is dan 5, dus die print-aanroep wordt wel uitgevoerd.",
        ),
      ],
      [
        loc(
          "Neither side of False or False is true. This is the only listed expression that evaluates to False.",
          "Geen van beide kanten van False or False is waar. Dit is de enige genoemde expressie die False oplevert.",
        ),
        loc(
          "or needs just one true operand. The left operand is True, so True or False is True.",
          "or heeft maar één ware operand nodig. Links staat True, dus True or False is True.",
        ),
        loc(
          "not reverses its operand. Reversing False produces True, not False.",
          "not keert de operand om. Het omkeren van False geeft True en niet False.",
        ),
        loc(
          "Both operands are True, so and also returns True. Look for the expression with no true operand.",
          "Beide operands zijn True, dus and geeft ook True. Zoek de expressie zonder ware operand.",
        ),
      ],
      [
        loc(
          "The if header must end with a colon before its indented body. Python cannot parse this header without it.",
          "De if-kop moet eindigen met een dubbele punt vóór het ingesprongen blok. Zonder deze kan Python de kop niet ontleden.",
        ),
        loc(
          "speed is a valid variable name. A missing value could cause NameError later, but this file first fails to parse because its colon is missing.",
          "speed is een geldige variabelenaam. Een ontbrekende waarde kan later NameError geven, maar dit bestand kan eerst al niet worden ontleed doordat de dubbele punt ontbreekt.",
        ),
        loc(
          'The print call already receives the quoted text "Slow". speed is used in the comparison, where a variable name should not be quoted.',
          'De print-aanroep krijgt al de tekst "Slow" tussen aanhalingstekens. speed staat in de vergelijking, waar je de variabelenaam niet tussen aanhalingstekens moet zetten.',
        ),
      ],
      [
        loc(
          "These are two independent if statements. Both comparisons are true for 7, so Python prints A and then B.",
          "Dit zijn twee onafhankelijke if-instructies. Beide vergelijkingen zijn waar voor 7, dus Python drukt eerst A en daarna B af.",
        ),
        loc(
          "The first block runs, but it does not stop the program. Python still checks the second independent if and prints B too.",
          "Het eerste blok voert uit, maar stopt het programma niet. Python controleert ook de tweede onafhankelijke if en drukt B eveneens af.",
        ),
        loc(
          "7 > 2 is true as well as 7 > 5. The first block prints A before execution reaches the second one.",
          "7 > 2 is net als 7 > 5 waar. Het eerste blok drukt A af voordat de uitvoering het tweede bereikt.",
        ),
        loc(
          "Both comparisons succeed: 7 is greater than 2 and greater than 5. Each matching block contains a print call.",
          "Beide vergelijkingen slagen: 7 is groter dan 2 en groter dan 5. Elk passend blok bevat een print-aanroep.",
        ),
      ],
    ],
  },
);
