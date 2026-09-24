import { P, B, Q } from "./quiz-authoring.mjs";
const R = (en, nl, why, nlWhy) => [
  [en, nl],
  [why, nlWhy],
];
const D = (topic, code, answers) =>
  Q(
    topic,
    "debugging",
    [
      "Choose the repair or test that addresses the stated problem.",
      "Kies de reparatie of test die het beschreven probleem aanpakt.",
    ],
    code,
    answers,
  );
const A = (topic, code, answers) =>
  Q(
    topic,
    "application",
    [
      "Which statement or test fits this example?",
      "Welke uitspraak of test past bij dit voorbeeld?",
    ],
    code,
    answers,
  );
export const specs = [
  (alt) => {
    const word = alt ? "Welcome" : "Hello";
    return {
      p: P(
        "print",
        `print("${word}")`,
        [word, `"${word}"`, "Nothing"],
        [
          [
            "Quotes delimit the string; print displays its contents.",
            "Aanhalingstekens begrenzen de string; print toont de inhoud.",
          ],
          [
            "The quotation marks are syntax, not part of the text here.",
            "De aanhalingstekens zijn syntax, hier geen onderdeel van de tekst.",
          ],
          ["Calling print produces output.", "print aanroepen maakt uitvoer."],
        ],
      ),
      p2: P(
        "execution-order",
        `print("${word}")\nprint("Ready")`,
        [`${word}\nReady`, `Ready\n${word}`, `${word} Ready`],
        [
          [
            "Statements run from top to bottom.",
            "Instructies draaien van boven naar beneden.",
          ],
          [
            "Python does not reverse the statement order.",
            "Python keert de instructievolgorde niet om.",
          ],
          [
            "Each print adds a line ending.",
            "Elke print voegt een regeleinde toe.",
          ],
        ],
      ),
      b: B(
        "strings",
        `print(___)`,
        `"${word}"`,
        [word, `# ${word}`],
        [
          "Text needs matching quotes; a comment is not an argument.",
          "Tekst heeft passende aanhalingstekens nodig; commentaar is geen argument.",
        ],
        word + "\n",
      ),
      b2: B(
        "comments",
        `___ an explanation\nprint("${word}")`,
        "#",
        ["//", "print"],
        [
          "# begins a Python comment. // is arithmetic, not a comment marker.",
          "Met # begint Pythoncommentaar. // is rekenkunde, geen commentaarteken.",
        ],
        word + "\n",
      ),
      debug: D("syntax-errors", `print("${word}"`, [
        R(
          "Add the closing )",
          "Voeg de afsluitende ) toe",
          "The call needs its closing parenthesis.",
          "De aanroep heeft een afsluitend haakje nodig.",
        ),
        R(
          "Remove the quote",
          "Verwijder het aanhalingsteken",
          "That would leave the string unfinished too.",
          "Dan is de string ook onafgemaakt.",
        ),
        R(
          "Run it twice",
          "Voer tweemaal uit",
          "Running does not change missing syntax.",
          "Uitvoeren verandert ontbrekende syntax niet.",
        ),
      ]),
      app: A("comments", `# Say ${word}\nprint("${word}")`, [
        R(
          "The comment explains; only print produces output.",
          "Het commentaar legt uit; alleen print maakt uitvoer.",
          "Python ignores the comment while executing.",
          "Python negeert het commentaar bij uitvoering.",
        ),
        R(
          "Both lines print text.",
          "Beide regels drukken tekst af.",
          "A comment is not an output statement.",
          "Commentaar is geen uitvoerinstructie.",
        ),
        R(
          "The comment changes the message.",
          "Het commentaar verandert het bericht.",
          "Comments do not modify values.",
          "Commentaar verandert geen waarden.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 8 : 5;
    return {
      p: P(
        "reassignment",
        `score = ${n}\nscore = 2\nprint(score)`,
        ["2", String(n), `${n}\n2`],
        [
          [
            "The later assignment replaces the value.",
            "De latere toewijzing vervangt de waarde.",
          ],
          [
            "The first value has been replaced before printing.",
            "De eerste waarde is vóór afdrukken vervangen.",
          ],
          ["Only one print is called.", "Er wordt maar één print aangeroepen."],
        ],
      ),
      b: B(
        "variables",
        `___ = ${n}\nprint(score)`,
        "score",
        ['"score"', "print(score)"],
        [
          "Assignment needs a variable name on the left.",
          "Toewijzing heeft links een variabelenaam nodig.",
        ],
        `${n}\n`,
      ),
      b2: B(
        "floats",
        `value = ___\nprint(type(value))`,
        `${n}.5`,
        [`"${n}.5"`, String(n)],
        [
          "A decimal point creates a float literal; quotes create a string. type(value) reports the kind of value.",
          "Een decimale punt maakt een float; aanhalingstekens maken een string. type(value) toont het soort waarde.",
        ],
        "<class 'float'>\n",
      ),
      debug: D(
        "name-error",
        `animal = "${alt ? "dog" : "cat"}"\nprint(Animal) # NameError`,
        [
          R(
            "Use animal with the same case.",
            "Gebruik animal met dezelfde letters.",
            "Names are case-sensitive.",
            "Namen zijn hoofdlettergevoelig.",
          ),
          R(
            "Add quotation marks to Animal.",
            "Zet Animal tussen aanhalingstekens.",
            "That prints literal text instead of the stored value.",
            "Dat drukt letterlijke tekst af in plaats van de bewaarde waarde.",
          ),
          R(
            `Change ${alt ? "dog to cat" : "cat to dog"}.`,
            `Verander ${alt ? "dog naar cat" : "cat naar dog"}.`,
            "The stored value does not fix the name mismatch.",
            "De bewaarde waarde herstelt het naamverschil niet.",
          ),
        ],
      ),
      app: A(
        "variable-vs-literal",
        `name = "${alt ? "Bo" : "Ada"}"\nprint("name")`,
        [
          R(
            "It prints the literal word name.",
            "Het drukt het letterlijke woord name af.",
            "Quoted text is not looked up as a variable.",
            "Tekst tussen aanhalingstekens wordt niet als variabele opgezocht.",
          ),
          R(
            "It prints the stored person.",
            "Het drukt de bewaarde persoon af.",
            "That would require print(name) without quotes.",
            "Dat vereist print(name) zonder aanhalingstekens.",
          ),
          R(
            "The variable is deleted.",
            "De variabele wordt verwijderd.",
            "Printing does not delete assignments.",
            "Afdrukken verwijdert geen toewijzingen.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 4 : 3;
    return {
      p: P(
        "precedence",
        `print(${n} + 2 * 5)`,
        [String(n + 10), String((n + 2) * 5), String(n + 7)],
        [
          [
            "Multiplication comes before addition.",
            "Vermenigvuldigen komt vóór optellen.",
          ],
          [
            "That needs parentheses around the addition.",
            "Dat vereist haakjes rond het optellen.",
          ],
          ["2 * 5 is ten, not seven.", "2 * 5 is tien, geen zeven."],
        ],
      ),
      b: B(
        "exponents",
        `print(${n} ___ 2)`,
        "**",
        ["*", "%"],
        [
          "** raises to a power; * multiplies and % returns a remainder.",
          "** verheft tot een macht; * vermenigvuldigt en % geeft een rest.",
        ],
        `${n * n}\n`,
      ),
      debug: D(
        "modulo",
        `items = ${n * 4 + 1}\n# Need leftover items after groups of 4.\nleftover = items // 4`,
        [
          R(
            "Use items % 4.",
            "Gebruik items % 4.",
            "Remainder counts leftovers.",
            "Restdeling telt wat overblijft.",
          ),
          R(
            "Use items / 4.",
            "Gebruik items / 4.",
            "Division gives group size as a ratio, not leftovers.",
            "Delen geeft een verhouding, geen overblijvende items.",
          ),
          R(
            "Keep // unchanged.",
            "Behoud // ongewijzigd.",
            "Floor division counts complete groups.",
            "Gehele deling telt volledige groepen.",
          ),
        ],
      ),
      app: A("plus-equals", `stock = ${n}\nstock += 2`, [
        R(
          "The new stock is the old stock plus two.",
          "De nieuwe stock is de oude stock plus twee.",
          "+= reads and updates the same variable.",
          "+= leest en wijzigt dezelfde variabele.",
        ),
        R(
          "Stock becomes two.",
          "Stock wordt twee.",
          "That would be stock = 2.",
          "Dat zou stock = 2 zijn.",
        ),
        R(
          "Stock is multiplied by two.",
          "Stock wordt met twee vermenigvuldigd.",
          "That would use *=.",
          "Dat zou *= gebruiken.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 6 : 4;
    return {
      p: P(
        "concatenation",
        `print("A" + "${n}")`,
        [`A${n}`, `A ${n}`, String(n)],
        [
          [
            "Concatenation adds no automatic space.",
            "Samenvoegen voegt niet automatisch een spatie toe.",
          ],
          [
            "A space must be present in a string.",
            "Een spatie moet in een string staan.",
          ],
          [
            "The first string remains part of the result.",
            "De eerste string blijft deel van het resultaat.",
          ],
        ],
      ),
      b: B(
        "str-conversion",
        `count = ${n}\nprint("Count: " + ___)`,
        "str(count)",
        ["count", '"count"'],
        [
          "Convert the number to text for string concatenation.",
          "Zet het getal om naar tekst voor stringsamenvoeging.",
        ],
        `Count: ${n}\n`,
      ),
      debug: D(
        "escapes",
        `# Need two output lines.\nprint("First Second ${n}")`,
        [
          R(
            "Put \\n between First and Second.",
            "Zet \\n tussen First en Second.",
            "The newline escape creates a line boundary.",
            "De nieuwe-regeleescape maakt een regelgrens.",
          ),
          R(
            "Add another ordinary space.",
            "Voeg nog een gewone spatie toe.",
            "A space stays on the same line.",
            "Een spatie blijft op dezelfde regel.",
          ),
          R(
            "Remove quotation marks.",
            "Verwijder aanhalingstekens.",
            "Those delimit the string.",
            "Die begrenzen de string.",
          ),
        ],
      ),
      app: A("f-strings", `count = ${n}\nprint(f"Items: {count}")`, [
        R(
          "The expression inside braces is evaluated.",
          "De uitdrukking tussen accolades wordt berekend.",
          "The f prefix enables replacement fields.",
          "Het f-voorvoegsel activeert vervangvelden.",
        ),
        R(
          "The braces are always printed literally.",
          "De accolades worden altijd letterlijk afgedrukt.",
          "Single braces mark a replacement here.",
          "Enkele accolades markeren hier vervanging.",
        ),
        R(
          "count becomes a string variable.",
          "count wordt een stringvariabele.",
          "Formatting does not reassign count.",
          "Formatteren wijst count niet opnieuw toe.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 8 : 5;
    return {
      p: P(
        "input-string-type",
        `answer = "${n}" # value returned by input\nprint(answer + "2")`,
        [`${n}2`, String(n + 2), "TypeError"],
        [
          [
            "Both operands are strings, so + concatenates.",
            "Beide kanten zijn strings, dus + voegt samen.",
          ],
          [
            "Numeric addition requires conversion first.",
            "Numeriek optellen vereist eerst omzetting.",
          ],
          [
            "Adding two strings is valid.",
            "Twee strings samenvoegen is geldig.",
          ],
        ],
      ),
      b: B(
        "int-conversion",
        `answer = "${n}"\nprint(___ + 2)`,
        "int(answer)",
        ["answer", "str(answer)"],
        [
          "int converts whole-number text before addition.",
          "int zet tekst met een geheel getal om vóór optellen.",
        ],
        `${n + 2}\n`,
      ),
      debug: D(
        "float-conversion",
        `# Accept decimal input such as ${n}.5\nvalue = int("${n}.5")`,
        [
          R(
            "Use float on the numeric text.",
            "Gebruik float op de getaltekst.",
            "float accepts a decimal point.",
            "float accepteert een decimale punt.",
          ),
          R(
            "Strip the decimal point away.",
            "Verwijder de decimale punt.",
            "That changes the numeric meaning.",
            "Dat verandert de numerieke betekenis.",
          ),
          R(
            "Put another pair of quotes around it.",
            "Zet er nog een paar aanhalingstekens om.",
            "More quotes do not perform numeric conversion.",
            "Meer aanhalingstekens voeren geen getalomzetting uit.",
          ),
        ],
      ),
      app: A(
        "normalisation",
        `command = " ${alt ? "GO" : "HELP"} ".strip().lower()`,
        [
          R(
            "Outer spaces are removed and letters become lowercase.",
            "Buitenste spaties verdwijnen en letters worden klein.",
            "The returned text from strip is passed to lower.",
            "De teruggegeven tekst van strip gaat naar lower.",
          ),
          R(
            "Every space inside the string is removed.",
            "Elke spatie binnen de string verdwijnt.",
            "strip affects only the ends.",
            "strip verandert alleen de uiteinden.",
          ),
          R(
            "The command is executed by lower.",
            "lower voert het commando uit.",
            "lower changes text case; it does not execute commands.",
            "lower verandert hoofdletters; het voert geen opdrachten uit.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 12 : 10;
    return {
      p: P(
        "and",
        `age = ${n}\nprint(age >= ${n} and age < ${n})`,
        ["False", "True", String(n)],
        [
          [
            "One False operand makes and False here.",
            "Eén onware kant maakt and hier False.",
          ],
          [
            "Both conditions must be true.",
            "Beide voorwaarden moeten waar zijn.",
          ],
          [
            "A comparison combination produces a Boolean here.",
            "Deze combinatie van vergelijkingen geeft een booleaanse waarde.",
          ],
        ],
      ),
      b: B(
        "or",
        `has_ticket = ${alt ? "True" : "False"}\nhas_pass = ${alt ? "False" : "True"}\nprint(has_ticket ___ has_pass)`,
        "or",
        ["and", "=="],
        [
          "Either permission is enough, so use or.",
          "Eén toestemming is genoeg, dus gebruik or.",
        ],
        "True\n",
      ),
      debug: D("equality", `# Compare; do not assign.\nprint(${n} = ${n})`, [
        R(
          "Use == for equality.",
          "Gebruik == voor gelijkheid.",
          "A comparison uses two equals signs.",
          "Een vergelijking gebruikt twee gelijktekens.",
        ),
        R(
          "Use +=.",
          "Gebruik +=.",
          "+= updates a variable, not equality.",
          "+= wijzigt een variabele, geen gelijkheid.",
        ),
        R(
          "Add quotes to the whole expression.",
          "Zet de hele uitdrukking tussen aanhalingstekens.",
          "That would print text instead of comparing.",
          "Dat drukt tekst af in plaats van te vergelijken.",
        ),
      ]),
      app: A(
        "not",
        `blocked = ${alt ? "False" : "True"}\nallowed = not blocked`,
        [
          R(
            "allowed is the opposite Boolean value.",
            "allowed is de tegenovergestelde booleaanse waarde.",
            "not negates the condition.",
            "not keert de voorwaarde om.",
          ),
          R(
            "blocked itself is overwritten.",
            "blocked zelf wordt overschreven.",
            "The assignment targets allowed.",
            "De toewijzing richt zich op allowed.",
          ),
          R(
            "not subtracts one.",
            "not trekt één af.",
            "This is Boolean negation, not arithmetic subtraction.",
            "Dit is booleaanse ontkenning, geen aftrekking.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 8 : 6;
    return {
      p: P(
        "elif",
        `score = ${n}\nif score >= ${n}:\n    print("Pass")\nelif score >= 0:\n    print("Try")`,
        ["Pass", "Pass\nTry", "Try"],
        [
          [
            "The first matching branch runs alone.",
            "Alleen de eerste passende tak draait.",
          ],
          [
            "elif is skipped after a match.",
            "elif wordt na een overeenkomst overgeslagen.",
          ],
          [
            "The equality boundary meets >=.",
            "De gelijkheidsgrens voldoet aan >=.",
          ],
        ],
      ),
      b: B(
        "else",
        `age = ${n - 1}\nif age >= ${n}:\n    print("Allowed")\n___:\n    print("Wait")`,
        "else",
        ["elif", "if"],
        [
          "else needs no condition and covers the failed if.",
          "else heeft geen voorwaarde nodig en verwerkt de onware if.",
        ],
        "Wait\n",
      ),
      debug: D(
        "branch-order",
        `# Need one label.\nscore = ${n}\nif score >= 0:\n    print("Some")\nif score >= ${n}:\n    print("High")`,
        [
          R(
            "Test High first and make Some an elif alternative.",
            "Test High eerst en maak Some een elif-alternatief.",
            "This selects the most specific matching category once.",
            "Dit kiest de specifiekste passende categorie eenmaal.",
          ),
          R(
            "Indent both prints further.",
            "Laat beide prints verder inspringen.",
            "Whitespace alone does not connect separate if statements.",
            "Alleen witruimte verbindt aparte if-instructies niet.",
          ),
          R(
            "Use == for both comparisons.",
            "Gebruik == voor beide vergelijkingen.",
            "That changes the threshold rules instead of fixing alternatives.",
            "Dat verandert de grensregels in plaats van alternatieven te herstellen.",
          ),
        ],
      ),
      app: A(
        "inclusive-comparisons",
        `if weight <= ${n}:\n    price = 3\nelse:\n    price = 6`,
        [
          R(
            `Test ${n - 1}, ${n} and ${n + 1}.`,
            `Test ${n - 1}, ${n} en ${n + 1}.`,
            "These cases surround and include the boundary.",
            "Deze gevallen omringen en omvatten de grens.",
          ),
          R(
            "Test only a very small weight.",
            "Test alleen een heel klein gewicht.",
            "That does not exercise the boundary or else.",
            "Dat oefent de grens of else niet.",
          ),
          R(
            "Test the same weight three times.",
            "Test hetzelfde gewicht driemaal.",
            "Repetition does not cover another branch.",
            "Herhaling dekt geen andere tak.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 4 : 3;
    return {
      p: P(
        "while",
        `count = 0\nwhile count < ${n}:\n    count += 1\nprint(count)`,
        [String(n), String(n - 1), "0"],
        [
          [
            "The final update reaches the excluded bound.",
            "De laatste update bereikt de uitgesloten grens.",
          ],
          [
            "The loop tests again after the last increment.",
            "De lus test opnieuw na de laatste verhoging.",
          ],
          [
            "The body updates count each iteration.",
            "De inhoud wijzigt count elke iteratie.",
          ],
        ],
      ),
      b: B(
        "break",
        `while True:\n    print("${n}")\n    ___`,
        "break",
        ["continue", "True"],
        [
          "break leaves the loop; continue would repeat it.",
          "break verlaat de lus; continue zou herhalen.",
        ],
        `${n}\n`,
      ),
      debug: D(
        "infinite-loops",
        `count = 0\nwhile count < ${n}:\n    print(count)`,
        [
          R(
            "Increment count inside the loop.",
            "Verhoog count binnen de lus.",
            "The condition must eventually change to False.",
            "De voorwaarde moet uiteindelijk False worden.",
          ),
          R(
            "Increment count after the loop.",
            "Verhoog count na de lus.",
            "That statement is never reached while the loop is stuck.",
            "Die instructie wordt bij een vastgelopen lus nooit bereikt.",
          ),
          R(
            "Add another print.",
            "Voeg nog een print toe.",
            "Output does not change the condition.",
            "Uitvoer verandert de voorwaarde niet.",
          ),
        ],
      ),
      app: A(
        "continue",
        `i = 0\nwhile i < ${n}:\n    i += 1\n    if i == 2:\n        continue\n    print(i)`,
        [
          R(
            "Only the remaining body for i = 2 is skipped.",
            "Alleen de resterende inhoud voor i = 2 wordt overgeslagen.",
            "continue starts the next iteration.",
            "continue begint de volgende iteratie.",
          ),
          R(
            "The whole program stops at 2.",
            "Het hele programma stopt bij 2.",
            "continue does not stop the loop or program.",
            "continue stopt de lus of het programma niet.",
          ),
          R(
            "The increment is undone.",
            "De verhoging wordt ongedaan gemaakt.",
            "Earlier statements are not reversed.",
            "Eerdere instructies worden niet teruggedraaid.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 4 : 3;
    return {
      p: P(
        "return",
        `def double(value):\n    return value * 2\nprint(double(${n}) + 1)`,
        [String(n * 2 + 1), String(n * 2), "None"],
        [
          [
            "The returned number participates in addition.",
            "Het teruggegeven getal doet mee aan de optelling.",
          ],
          [
            "The caller adds one after the return.",
            "De aanroeper telt na return één op.",
          ],
          [
            "An explicit numeric return is present.",
            "Er staat een expliciete numerieke return.",
          ],
        ],
      ),
      b: B(
        "default-arguments",
        `def cost(price, fee___):\n    return price + fee\nprint(cost(${n}))`,
        "=2",
        ["==2", ",2"],
        [
          "A default value uses = in the parameter list.",
          "Een standaardwaarde gebruikt = in de parameterlijst.",
        ],
        `${n + 2}\n`,
      ),
      debug: D(
        "scope",
        `price = 100\ndef cost(price):\n    return 100 * 2\n# Must work for cost(${n}).`,
        [
          R(
            "Use return price * 2.",
            "Gebruik return price * 2.",
            "The parameter should determine the result.",
            "De parameter hoort het resultaat te bepalen.",
          ),
          R(
            "Change only the outside price.",
            "Verander alleen de buitenste price.",
            "The hard-coded body still ignores the argument.",
            "De vaste inhoud negeert het argument nog steeds.",
          ),
          R(
            "Print instead of return.",
            "Druk af in plaats van terug te geven.",
            "That changes the contract but not the calculation defect.",
            "Dat verandert de afspraak maar niet de berekeningsfout.",
          ),
        ],
      ),
      app: A("none", `def show():\n    print("${n}")\nresult = show()`, [
        R(
          "result is None because show has no explicit return.",
          "result is None omdat show geen expliciete return heeft.",
          "Printing and returning are separate.",
          "Afdrukken en teruggeven zijn apart.",
        ),
        R(
          `result is ${n}.`,
          `result is ${n}.`,
          "The printed value is not returned.",
          "De afgedrukte waarde wordt niet teruggegeven.",
        ),
        R(
          "The function was not called.",
          "De functie werd niet aangeroepen.",
          "The parentheses call it.",
          "De haakjes roepen haar aan.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 5 : 3;
    return {
      p: P(
        "value-error",
        `try:\n    value = int("${n}.5")\n    print("OK")\nexcept ValueError:\n    print("Retry")`,
        ["Retry", "OK", "OK\nRetry"],
        [
          [
            "int does not accept decimal-point text.",
            "int accepteert geen tekst met decimale punt.",
          ],
          ["The conversion fails before OK.", "De omzetting mislukt vóór OK."],
          [
            "The failed statement skips the rest of try.",
            "De mislukte instructie slaat de rest van try over.",
          ],
        ],
      ),
      b: B(
        "zero-division-recovery",
        `try:\n    print(${n} / 0)\nexcept ___:\n    print("No division")`,
        "ZeroDivisionError",
        ["ValueError", "NameError"],
        [
          "Dividing a number by zero raises ZeroDivisionError.",
          "Een getal delen door nul veroorzaakt ZeroDivisionError.",
        ],
        "No division\n",
      ),
      debug: D(
        "retry-loops",
        `# Need a fresh answer after failure.\ntext = input("Number: ")\nwhile True:\n    try:\n        value = int(text)\n        break\n    except ValueError:\n        print("Retry ${n}")`,
        [
          R(
            "Move input inside the loop.",
            "Verplaats input naar binnen de lus.",
            "Each retry must read new text.",
            "Elke herhaling moet nieuwe tekst lezen.",
          ),
          R(
            "Remove the ValueError handler.",
            "Verwijder de ValueError-afhandeling.",
            "Then invalid input crashes instead of retrying.",
            "Dan crasht ongeldige invoer in plaats van opnieuw te vragen.",
          ),
          R(
            "Print Retry twice.",
            "Druk Retry tweemaal af.",
            "More output does not change text.",
            "Meer uitvoer verandert text niet.",
          ),
        ],
      ),
      app: A(
        "cancellation",
        `value = ${alt ? "0.0" : "None"}\nif value is None:\n    print("Cancelled")`,
        [
          R(
            "This distinguishes cancellation from a valid zero.",
            "Dit onderscheidt annuleren van een geldige nul.",
            "is None checks the explicit absence value.",
            "is None controleert de expliciete afwezigheidswaarde.",
          ),
          R(
            "Zero must also mean cancelled.",
            "Nul moet ook annuleren betekenen.",
            "Zero is a valid calculator operand.",
            "Nul is een geldig rekenmachinegetal.",
          ),
          R(
            "Any negative number is cancelled.",
            "Elk negatief getal is geannuleerd.",
            "The condition tests None, not sign.",
            "De voorwaarde test None, niet het teken.",
          ),
        ],
      ),
    };
  },
  (alt) => {
    const n = alt ? 7 : 4;
    return {
      p: P(
        "negative-indexing",
        `values = [2,${n},9]\nprint(values[-1])`,
        ["9", String(n), "2"],
        [
          ["-1 selects the last element.", "-1 kiest het laatste element."],
          [
            "That is the middle element at index 1 or -2.",
            "Dat is het middelste element op index 1 of -2.",
          ],
          [
            "The first element uses index 0.",
            "Het eerste element gebruikt index 0.",
          ],
        ],
      ),
      b: B(
        "append",
        `values = []\nvalues.___(${n})\nprint(values)`,
        "append",
        ["add", "pop"],
        [
          "append adds one value to the end of a list.",
          "append voegt één waarde achteraan een lijst toe.",
        ],
        `[${n}]\n`,
      ),
      debug: D(
        "copying",
        `original = [${n}]\ncopy = original\ncopy.append(2)\n# Need original unchanged.`,
        [
          R(
            "Use copy = original.copy().",
            "Gebruik copy = original.copy().",
            "A separate outer list prevents this append from affecting original.",
            "Een aparte buitenste lijst voorkomt dat append original verandert.",
          ),
          R(
            "Rename copy to backup.",
            "Hernoem copy naar backup.",
            "Changing a name does not copy the object.",
            "Een naam veranderen kopieert het object niet.",
          ),
          R(
            "Append to original instead.",
            "Voeg in plaats daarvan toe aan original.",
            "That explicitly changes the source.",
            "Dat verandert de bron juist expliciet.",
          ),
        ],
      ),
      app: A("list-mutation", `values = [${n},2]\nvalues[0] = 8`, [
        R(
          "One existing element is replaced; length stays two.",
          "Eén bestaand element wordt vervangen; lengte blijft twee.",
          "Indexed assignment does not insert a new position.",
          "Indextoewijzing voegt geen nieuwe positie in.",
        ),
        R(
          "The list grows to length three.",
          "De lijst groeit naar lengte drie.",
          "That would require insertion or appending.",
          "Dat vereist invoegen of toevoegen.",
        ),
        R(
          "A new list is automatically created.",
          "Er wordt automatisch een nieuwe lijst gemaakt.",
          "This assignment mutates the existing list.",
          "Deze toewijzing verandert de bestaande lijst.",
        ),
      ]),
    };
  },
  (alt) => {
    const n = alt ? 4 : 3;
    return {
      p: P(
        "range",
        `print(list(range(${n})))`,
        [
          JSON.stringify(Array.from({ length: n }, (_, i) => i)).replaceAll(
            ",",
            ", ",
          ),
          JSON.stringify(Array.from({ length: n }, (_, i) => i + 1)).replaceAll(
            ",",
            ", ",
          ),
          String(n),
        ],
        [
          [
            "range starts at zero and excludes stop.",
            "range begint bij nul en sluit stop uit.",
          ],
          [
            "Starting at one requires an explicit start argument.",
            "Bij één beginnen vereist een expliciet beginargument.",
          ],
          [
            "list materialises every range value.",
            "list maakt elke range-waarde concreet.",
          ],
        ],
      ),
      b: B(
        "for",
        `total = 0\nfor value ___ [${n},2]:\n    total += value\nprint(total)`,
        "in",
        ["is", "=="],
        [
          "for uses in to select successive values from a sequence.",
          "for gebruikt in om opeenvolgende waarden uit een reeks te kiezen.",
        ],
        `${n + 2}\n`,
      ),
      debug: D(
        "searching",
        `def contains(items, target):\n    for item in items:\n        if item == target:\n            return True\n        return False\n# Test contains([${n},2],2).`,
        [
          R(
            "Move return False after the loop.",
            "Verplaats return False na de lus.",
            "A later item might match after the first nonmatch.",
            "Na de eerste afwijking kan een later item overeenkomen.",
          ),
          R(
            "Return True before the loop.",
            "Geef True vóór de lus terug.",
            "That claims a match without checking data.",
            "Dat beweert een overeenkomst zonder gegevens te controleren.",
          ),
          R(
            "Remove the equality condition.",
            "Verwijder de gelijkheidsvoorwaarde.",
            "The function still needs to compare each candidate.",
            "De functie moet elke kandidaat nog steeds vergelijken.",
          ),
        ],
      ),
      app: A(
        "filtering",
        `result = []\nfor value in [${n},-1,0]:\n    if value >= 0:\n        result.append(value)`,
        [
          R(
            "A new list keeps matching values in their original order.",
            "Een nieuwe lijst bewaart passende waarden op oorspronkelijke volgorde.",
            "Appending selected items preserves traversal order.",
            "Gekozen items toevoegen bewaart de doorloopvolgorde.",
          ),
          R(
            "Negative values are removed from the original list.",
            "Negatieve waarden worden uit de oorspronkelijke lijst verwijderd.",
            "The source is not mutated.",
            "De bron wordt niet gewijzigd.",
          ),
          R(
            "The loop stops at the first match.",
            "De lus stopt bij de eerste overeenkomst.",
            "There is no early return or break.",
            "Er is geen vroege return of break.",
          ),
        ],
      ),
    };
  },
];
