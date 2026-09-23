import "./foundations-lessons.mjs";
import { quiz as Q, loc } from "./helpers.mjs";
const g = "python-hello-world";
Q(
  g,
  [
    [
      "What does this program print?",
      "Wat drukt dit programma af?",
      'print("Dock")',
      ["Dock", '"Dock"', "print(Dock)"],
      "print displays the string contents; the quotation marks belong to Python syntax.",
      "print toont de inhoud van de string; de aanhalingstekens horen bij de Python-syntax.",
    ],
    [
      "Which line creates a comment?",
      "Welke regel maakt een comment?",
      "",
      [["# status note"], ["// status note"], ["comment status note"]],
      "Python comments begin with # outside a string.",
      "Python-comments beginnen met # buiten een string.",
    ],
    [
      "What is the final value of count?",
      "Wat is de eindwaarde van count?",
      "count = 8\ncount += 5",
      ["13", "8", "5", "85"],
      "+= adds to the current numeric value and saves the result.",
      "+= telt op bij de huidige numerieke waarde en slaat het resultaat op.",
    ],
    [
      "Which value is a string?",
      "Welke waarde is een string?",
      "",
      ['"42"', "42", "4.2", "True"],
      "Quotes make 42 text rather than an integer.",
      "Door de aanhalingstekens is 42 tekst en geen integer.",
    ],
    [
      "What is the result?",
      "Wat is het resultaat?",
      "print(2 + 3 * 4)",
      ["14", "20", "24", "9"],
      "Multiplication happens before addition: 3 * 4 is 12, then add 2.",
      "Vermenigvuldigen gaat eerst: 3 * 4 is 12; tel daar 2 bij op.",
    ],
    [
      "What is printed?",
      "Wat wordt afgedrukt?",
      "print(19 % 5)",
      ["4", "3", "3.8", "5"],
      "Three groups of five use 15, leaving a remainder of 4.",
      "Drie groepen van vijf gebruiken 15; de rest is 4.",
    ],
    [
      "Which expression calculates a power?",
      "Welke expressie berekent een macht?",
      "",
      ["4 ** 3", "4 ^ 3", "4 * 3", "4 // 3"],
      "** is Python’s exponentiation operator.",
      "** is de operator voor machtsverheffen in Python.",
    ],
    [
      "What does = do here?",
      "Wat doet = hier?",
      'city = "Leiden"',
      [
        ["Assigns a value to a name", "Wijst een waarde toe aan een naam"],
        ["Compares two values", "Vergelijkt twee waarden"],
        ["Prints the value", "Drukt de waarde af"],
      ],
      "Assignment associates the name city with the string Leiden.",
      "Assignment koppelt de naam city aan de string Leiden.",
    ],
    [
      "What is the output?",
      "Wat is de output?",
      'print("Gate" + "B")',
      ["GateB", "Gate B", "Gate+B", "Gate, B"],
      "String concatenation does not insert a space automatically.",
      "Bij het samenvoegen van strings wordt niet automatisch een spatie toegevoegd.",
    ],
    [
      "Which number is a float literal?",
      "Welk getal is een float literal?",
      "",
      ["3.0", "3", '"3"'],
      "A decimal point distinguishes this float literal from an integer literal.",
      "Het decimale punt onderscheidt deze float literal van een integer literal.",
    ],
    [
      "Why will this fail?",
      "Waarom gaat dit fout?",
      'print("Ready)',
      [
        [
          "The string has no closing quote",
          "De string mist een afsluitend aanhalingsteken",
        ],
        ["print requires two arguments", "print heeft twee arguments nodig"],
        ["Text cannot be printed", "Tekst kan niet worden afgedrukt"],
      ],
      "Close the quote before the parenthesis to make a valid string literal.",
      "Sluit het aanhalingsteken vóór het haakje om een geldige string literal te maken.",
    ],
    [
      "Which value is printed?",
      "Welke waarde wordt afgedrukt?",
      "level = 2\nlevel = 9\nprint(level)",
      ["9", "2", "11", "29"],
      "The second assignment replaces the value associated with level.",
      "De tweede assignment vervangt de waarde die bij level hoort.",
    ],
    [
      "How can a literal string span several lines?",
      "Hoe kan een string literal meerdere regels beslaan?",
      "",
      [
        ["Use triple quotes", "Gebruik drie aanhalingstekens"],
        ["Put # at the start", "Zet # aan het begin"],
        ["Use a variable name only", "Gebruik alleen een variablenaam"],
      ],
      "Triple-quoted strings can include actual line breaks.",
      "Strings met drie aanhalingstekens kunnen echte regeleinden bevatten.",
    ],
  ],
  {
    feedback: [
      [
        undefined,
        loc(
          "The quotes delimit the string in your code. print displays its contents, so the output is Dock without quotes.",
          "De aanhalingstekens begrenzen de string in je code. print toont de inhoud, dus de output is Dock zonder aanhalingstekens.",
        ),
        loc(
          "print(Dock) describes code, not its output. The function displays only the supplied string: Dock.",
          "print(Dock) beschrijft code, niet de output. De functie toont alleen de meegegeven string: Dock.",
        ),
      ],
      [
        undefined,
        loc(
          "// is Python's floor-division operator, not its comment marker. Start a comment with # outside a string.",
          "// is de Python-operator voor gehele deling, niet het commentteken. Begin een comment met # buiten een string.",
        ),
        loc(
          "comment is not a keyword for creating notes. Python needs # to know it should ignore the rest of the line.",
          "comment is geen keyword om notities te maken. Python heeft # nodig om de rest van de regel te negeren.",
        ),
      ],
      [
        undefined,
        loc(
          "8 is the starting value. += 5 adds five and stores the new value, so count ends at 13.",
          "8 is de startwaarde. += 5 telt vijf op en slaat de nieuwe waarde op, dus count eindigt op 13.",
        ),
        loc(
          "count = 5 would replace the value. count += 5 instead adds to the existing 8, giving 13.",
          "count = 5 zou de waarde vervangen. count += 5 telt juist bij de bestaande 8 op en geeft 13.",
        ),
        loc(
          "Joining the digits would require strings. These values are integers, so + performs addition: 8 + 5 is 13.",
          "Voor het samenvoegen van cijfers zijn strings nodig. Deze waarden zijn integers, dus + telt op: 8 + 5 is 13.",
        ),
      ],
      [
        undefined,
        loc(
          "Without quotes, 42 is an integer. The quoted version is a string containing two characters.",
          "Zonder aanhalingstekens is 42 een integer. De versie met aanhalingstekens is een string met twee tekens.",
        ),
        loc(
          'The decimal point makes 4.2 a float. A string literal is marked by quotes, such as "42".',
          'De decimale punt maakt 4.2 een float. Een string literal herken je aan aanhalingstekens, zoals "42".',
        ),
        loc(
          "True is a Boolean value, which the next chapter explores. It is not a string unless quoted.",
          "True is een Boolean-waarde, die in het volgende hoofdstuk aan bod komt. Zonder aanhalingstekens is het geen string.",
        ),
      ],
      [
        undefined,
        loc(
          "20 would be the result of (2 + 3) * 4. Here multiplication happens first: 3 * 4 is 12, then 2 + 12 is 14.",
          "20 zou het resultaat zijn van (2 + 3) * 4. Hier gaat vermenigvuldigen eerst: 3 * 4 is 12, daarna is 2 + 12 gelijk aan 14.",
        ),
        loc(
          "The first operator is addition, not multiplication. Calculate 3 * 4, then add 2: the result is 14.",
          "De eerste operator is optellen, niet vermenigvuldigen. Bereken 3 * 4 en tel daarna 2 op: het resultaat is 14.",
        ),
        loc(
          "Do not add all three numbers. The * groups 3 and 4 into a multiplication before the addition of 2.",
          "Tel niet alle drie de getallen op. De * groepeert 3 en 4 in een vermenigvuldiging voordat 2 wordt opgeteld.",
        ),
      ],
      [
        undefined,
        loc(
          "3 is the number of complete groups of five. % asks for the remainder: 19 minus 15 leaves 4.",
          "3 is het aantal volledige groepen van vijf. % vraagt naar de rest: 19 min 15 laat 4 over.",
        ),
        loc(
          "3.8 is the result of 19 / 5. Modulo returns the remainder after whole groups, which is 4.",
          "3.8 is het resultaat van 19 / 5. Modulo geeft de rest na volledige groepen: 4.",
        ),
        loc(
          "5 is the group size, not the remainder. Three groups use 15 items, leaving 4 from the original 19.",
          "5 is de groepsgrootte, niet de rest. Drie groepen gebruiken 15 items en laten 4 over van de oorspronkelijke 19.",
        ),
      ],
      [
        undefined,
        loc(
          "^ performs a bitwise operation in Python. Use ** for powers: 4 ** 3 means 4 * 4 * 4.",
          "^ voert in Python een bitwise-bewerking uit. Gebruik ** voor machten: 4 ** 3 betekent 4 * 4 * 4.",
        ),
        loc(
          "One asterisk multiplies once: 4 * 3 is 12. Two asterisks calculate a power: 4 ** 3 is 64.",
          "Eén sterretje vermenigvuldigt één keer: 4 * 3 is 12. Twee sterretjes berekenen een macht: 4 ** 3 is 64.",
        ),
        loc(
          "// is floor division. Exponentiation uses **, so 4 ** 3 calculates the third power of 4.",
          "// is gehele deling. Machtsverheffen gebruikt **, dus 4 ** 3 berekent de derde macht van 4.",
        ),
      ],
      [
        undefined,
        loc(
          "A single = assigns. Comparing equality uses ==, which you will practise in the next chapter.",
          "Een enkele = wijst toe. Gelijkheid vergelijken doe je met ==; dat oefen je in het volgende hoofdstuk.",
        ),
        loc(
          "Assignment does not display a value. After storing it in city, print(city) would display Leiden.",
          "Een toewijzing toont geen waarde. Na het opslaan in city zou print(city) Leiden tonen.",
        ),
      ],
      [
        undefined,
        loc(
          "+ does not insert a space. A space would need to be included in one of the strings.",
          "+ voegt geen spatie in. Die spatie zou in een van de strings moeten staan.",
        ),
        loc(
          "The + is an operator outside the quotes. It joins the strings and is not included in the resulting text.",
          "De + is een operator buiten de aanhalingstekens. Deze voegt de strings samen en hoort niet bij de resulterende tekst.",
        ),
        loc(
          "There is no comma in either string. Concatenation simply appends B directly to Gate, giving GateB.",
          "In geen van de strings staat een komma. Concatenatie voegt B direct aan Gate toe en geeft GateB.",
        ),
      ],
      [
        undefined,
        loc(
          "3 is an integer literal. Adding a decimal point, as in 3.0, makes it a float literal.",
          "3 is een integer literal. Met een decimale punt, zoals bij 3.0, wordt het een float literal.",
        ),
        loc(
          "The quotes make this text, not a number. The float literal in these choices is 3.0.",
          "Door de aanhalingstekens is dit tekst, geen getal. De float literal bij deze opties is 3.0.",
        ),
      ],
      [
        undefined,
        loc(
          "print can take a single message. The failure happens because the opening quote is never closed.",
          "print kan één bericht meekrijgen. De fout ontstaat doordat het openingsaanhalingsteken nooit wordt gesloten.",
        ),
        loc(
          "Printing text is valid. Add a matching closing quote after Ready and before the closing parenthesis.",
          "Tekst afdrukken is geldig. Voeg een passend aanhalingsteken toe na Ready en vóór het sluithaakje.",
        ),
      ],
      [
        undefined,
        loc(
          "2 is the old value. The next assignment replaces it with 9 before print reads level.",
          "2 is de oude waarde. De volgende toewijzing vervangt deze door 9 voordat print level leest.",
        ),
        loc(
          "Assignment replaces; it does not add. There is no + or += here, so the final value is simply 9.",
          "Toewijzen vervangt; het telt niet op. Hier staat geen + of +=, dus de eindwaarde is gewoon 9.",
        ),
        loc(
          "These are separate assignments, not text concatenation. The second assignment leaves level equal to 9.",
          "Dit zijn afzonderlijke toewijzingen, geen tekstconcatenatie. Door de tweede toewijzing is level gelijk aan 9.",
        ),
      ],
      [
        undefined,
        loc(
          "# starts a comment and Python ignores the rest of that line. It does not create a multiline string.",
          "# begint een comment en Python negeert de rest van die regel. Het maakt geen string op meerdere regels.",
        ),
        loc(
          "A name can refer to a string, but it does not define the string's contents. Triple quotes allow literal line breaks inside those contents.",
          "Een naam kan naar een string verwijzen, maar bepaalt niet de inhoud. Met drie aanhalingstekens kun je echte regeleinden in die inhoud opnemen.",
        ),
      ],
    ],
  },
);
