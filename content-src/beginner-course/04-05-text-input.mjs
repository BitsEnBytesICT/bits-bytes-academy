import { lesson, step, output, probe } from "./authoring.mjs";
export const activities = [
  lesson(4, "concatenate", {
    title: ["Join two pieces of text", "Voeg twee stukken tekst samen"],
    topics: "concatenation string-concatenation",
    requires: "strings variables",
    minutes: 12,
    intro: [
      "Build a message from smaller text values. Joining strings is called concatenation.",
      "Bouw een bericht uit kleinere tekstwaarden. Strings samenvoegen heet concatenatie.",
    ],
    teach: [
      "Between two strings, + joins the text in order. It does not insert spaces automatically. The example adds a separate string containing one space between the two words.\n\nConcatenation produces a new string. It does not alter either original value. You can store the new result in another variable. This is the same + symbol used for numeric addition, but its behaviour depends on the value types.",
      "Tussen twee strings voegt + de tekst op volgorde samen. Het voegt niet automatisch spaties in. Het voorbeeld voegt een aparte string met één spatie toe tussen beide woorden.\n\nConcatenatie levert een nieuwe string op. Zij verandert geen van de oorspronkelijke waarden. Je kunt het nieuwe resultaat in een andere variabele bewaren. Dit is hetzelfde +-teken als bij optellen, maar het gedrag hangt af van de waardetypen.",
    ],
    idea: [
      "String + joins text exactly as written, including spaces.",
      "String + voegt tekst precies samen zoals geschreven, inclusief spaties.",
    ],
    example:
      'first = "Good"\nsecond = "morning"\nmessage = first + " " + second\nprint(message)',
    output: "Good morning\n",
    predict: [
      "What would happen without the middle space string?",
      "Wat gebeurt er zonder de middelste string met een spatie?",
    ],
    starter: 'first = "Ada"\nlast = "Lovelace"\n',
    solution:
      'first = "Ada"\nlast = "Lovelace"\nfull_name = first + " " + last\nprint(full_name)\n',
    steps: [
      step(
        [
          "Combine first and last with one space into full_name, then print it.",
          "Combineer first en last met één spatie tot full_name en druk die af.",
        ],
        'full_name == first + " " + last and _stdout.strip() == full_name',
        [
          "Include the separator yourself; + does not add it.",
          "Voeg het scheidingsteken zelf toe; + doet dat niet.",
        ],
        'first + " " + last',
        [probe({ first: "Sam", last: "Lee" }, 'full_name == "Sam Lee"')],
      ),
    ],
    experiment: [
      "Change both names. Then remove the separator and observe the result.",
      "Verander beide namen. Verwijder daarna het scheidingsteken en bekijk het resultaat.",
    ],
    note: [
      "The middle string supplies the space, and full_name stores a new string. The two input variables are unchanged.",
      "De middelste string levert de spatie en full_name bewaart een nieuwe string. De twee invoervariabelen blijven gelijk.",
    ],
  }),
  lesson(4, "convert-to-text", {
    title: ["Include a number in text", "Neem een getal in tekst op"],
    topics: "str-conversion",
    requires: "concatenation integers",
    minutes: 12,
    intro: [
      "Text and numbers are different types. Convert a number deliberately when joining it into a string.",
      "Tekst en getallen zijn verschillende typen. Zet een getal bewust om als je het in een string wilt opnemen.",
    ],
    teach: [
      'The expression "Count: " + 4 raises TypeError because Python does not add a string and an integer together. str(4) creates the text "4", so both sides of + are strings.\n\nstr() returns a new value. Calling str(count) does not turn the original count variable into text. Keeping the original number is useful when you still need to calculate with it.',
      'De expressie "Count: " + 4 veroorzaakt TypeError omdat Python geen string en int samen optelt. str(4) maakt de tekst "4", zodat beide kanten van + strings zijn.\n\nstr() geeft een nieuwe waarde terug. str(count) aanroepen verandert de oorspronkelijke variabele count niet in tekst. Het oorspronkelijke getal behouden is handig als je ermee wilt blijven rekenen.',
    ],
    idea: [
      "Use str(number) when a concatenation needs text.",
      "Gebruik str(getal) wanneer concatenatie tekst nodig heeft.",
    ],
    example:
      'count = 4\nlabel = "Count: " + str(count)\nprint(label)\nprint(type(count))',
    output: "Count: 4\n<class 'int'>\n",
    predict: [
      "Does creating label change the type of count?",
      "Verandert het maken van label het type van count?",
    ],
    starter: "age = 12\n",
    solution: 'age = 12\nmessage = "Age: " + str(age)\nprint(message)\n',
    steps: [
      step(
        [
          'Create message in the form "Age: 12", using age, then print it.',
          'Maak message in de vorm "Age: 12" met age en druk het af.',
        ],
        'message == "Age: " + str(age) and _stdout.strip() == message and type(age) is int',
        [
          "Convert the number inside the expression and leave age numeric.",
          "Zet het getal binnen de expressie om en laat age numeriek.",
        ],
        '"Age: " + str(age)',
        [
          probe({ age: 0 }, 'message == "Age: 0"'),
          probe({ age: 21 }, 'message == "Age: 21"'),
        ],
      ),
    ],
    experiment: [
      "Try age = 0. Explain why the message still contains a visible zero.",
      "Probeer age = 0. Leg uit waarom het bericht nog steeds een zichtbare nul bevat.",
    ],
    note: [
      "str supplies a text representation for concatenation; age keeps its original numeric type.",
      "str levert een tekstweergave voor concatenatie; age behoudt zijn numerieke type.",
    ],
  }),
  lesson(4, "print-values", {
    title: ["Print several values together", "Druk meerdere waarden samen af"],
    topics: "print-arguments",
    requires: "print variables floats",
    minutes: 10,
    intro: [
      "You can give print more than one value. This is useful for quick readable reports.",
      "Je kunt print meer dan één waarde geven. Dat is handig voor snelle, leesbare verslagen.",
    ],
    teach: [
      "Commas separate the arguments passed to print. By default, print displays a space between arguments and ends with a newline. It can display different types together without you converting each number.\n\nThe commas here are Python punctuation, not characters that will appear in the output. Avoid putting trailing spaces in the label when print will already add one.",
      "Komma's scheiden de argumenten die je aan print geeft. Standaard toont print een spatie tussen argumenten en eindigt het met een nieuwe regel. Het kan verschillende typen samen tonen zonder dat je elk getal zelf omzet.\n\nDe komma's zijn hier Pythonleestekens, geen tekens die in de uitvoer verschijnen. Zet geen spatie achter een label als print er al één toevoegt.",
    ],
    idea: [
      "print(label, value) separates displayed arguments with a space.",
      "print(label, waarde) scheidt getoonde argumenten met een spatie.",
    ],
    example: 'distance = 2.5\nprint("Distance:", distance, "km")',
    output: "Distance: 2.5 km\n",
    predict: [
      "Where do the spaces in the output come from?",
      "Waar komen de spaties in de uitvoer vandaan?",
    ],
    starter: "temperature = 18\n",
    solution: 'temperature = 18\nprint("Temperature:", temperature, "C")\n',
    steps: [
      step(
        [
          'Print "Temperature: 18 C" using the stored temperature.',
          'Druk "Temperature: 18 C" af met de opgeslagen temperatuur.',
        ],
        '_stdout.strip() == "Temperature: " + str(temperature) + " C"',
        [
          "Pass a label, the numeric value and the unit to print.",
          "Geef een label, de getalswaarde en de eenheid aan print.",
        ],
        'print("Label:", temperature, "C")',
        [probe({ temperature: -4 }, '_stdout.strip() == "Temperature: -4 C"')],
      ),
    ],
    experiment: [
      "Try a negative temperature. Compare the code with concatenation using str().",
      "Probeer een negatieve temperatuur. Vergelijk de code met concatenatie via str().",
    ],
    note: [
      "print handles the display conversion of separate arguments and inserts the separating spaces.",
      "print verzorgt de weergaveconversie van aparte argumenten en voegt de scheidende spaties in.",
    ],
  }),
  lesson(4, "f-strings", {
    title: [
      "Place values inside a message",
      "Plaats waarden binnen een bericht",
    ],
    topics: "f-strings",
    requires: "variables strings",
    minutes: 13,
    intro: [
      "An f-string makes the shape of a message visible while inserting changing values.",
      "Een f-string maakt de vorm van een bericht zichtbaar en voegt veranderende waarden in.",
    ],
    teach: [
      "Put f immediately before the opening quote. Inside the string, {name} evaluates the expression name and inserts its displayed value. Ordinary text outside braces stays literal.\n\nThe example inserts a string and an integer into one message. You do not need str() around each value in an f-string. Without the f prefix, Python would print the braces and names as ordinary text.",
      "Zet f direct vóór het openingsaanhalingsteken. Binnen de string berekent {name} de expressie name en voegt de getoonde waarde in. Gewone tekst buiten de accolades blijft letterlijk.\n\nHet voorbeeld voegt een string en een int in één bericht in. Je hebt in een f-string geen str() om elke waarde nodig. Zonder de f ervoor drukt Python de accolades en namen als gewone tekst af.",
    ],
    idea: [
      "The f prefix activates value expressions inside braces.",
      "De f ervoor activeert waarde-expressies binnen accolades.",
    ],
    example: 'name = "Noor"\npoints = 8\nprint(f"{name} has {points} points")',
    output: "Noor has 8 points\n",
    predict: [
      "What would the same string display without its f prefix?",
      "Wat toont dezelfde string zonder de f ervoor?",
    ],
    starter: 'name = "Mila"\nbooks = 3\n',
    solution:
      'name = "Mila"\nbooks = 3\nmessage = f"{name} borrowed {books} books"\nprint(message)\n',
    steps: [
      step(
        [
          'Use an f-string to create and print message, such as "Mila borrowed 3 books".',
          'Gebruik een f-string om message te maken en af te drukken, bijvoorbeeld "Mila borrowed 3 books".',
        ],
        'message == f"{name} borrowed {books} books" and _stdout.strip() == message and any(isinstance(n, _ast.JoinedStr) for n in _ast.walk(_ast.parse(_source)))',
        [
          "Put f before the quotes and both variable names inside their own braces.",
          "Zet f vóór de aanhalingstekens en beide variabelenamen binnen hun eigen accolades.",
        ],
        'f"{name} borrowed {books} books"',
        [probe({ name: "Bo", books: 0 }, 'message == "Bo borrowed 0 books"')],
      ),
    ],
    experiment: [
      "Change both inputs and predict the message. Then remove f once to observe the difference.",
      "Verander beide invoerwaarden en voorspel het bericht. Verwijder daarna eenmaal f om het verschil te zien.",
    ],
    note: [
      "The braces insert current values when the f-string is created. The result is a normal string stored in message.",
      "De accolades voegen huidige waarden in wanneer de f-string wordt gemaakt. Het resultaat is een gewone string in message.",
    ],
  }),
  lesson(4, "escapes", {
    title: [
      "Newlines and special characters",
      "Nieuwe regels en speciale tekens",
    ],
    topics: "escapes",
    requires: "strings print",
    minutes: 13,
    intro: [
      "A string can contain characters that are awkward to type directly, including a newline or a quotation mark.",
      "Een string kan tekens bevatten die lastig direct te typen zijn, zoals een nieuwe regel of een aanhalingsteken.",
    ],
    teach: [
      "A backslash begins an escape sequence inside an ordinary Python string. \\n represents a newline, \\t a tab, and \\\\ one literal backslash. An escaped quote belongs to the text instead of closing the string.\n\nThe example is one print call but its string contains a newline, so it displays two lines. Remember that print also adds its own newline at the end. A tab's visual width depends on where it appears.",
      "Een backslash begint een escapereeks binnen een gewone Pythonstring. \\n stelt een nieuwe regel voor, \\t een tab en \\\\ één letterlijke backslash. Een geëscapet aanhalingsteken hoort bij de tekst in plaats van de string af te sluiten.\n\nHet voorbeeld is één print-aanroep maar de string bevat een nieuwe regel, dus verschijnen er twee regels. print voegt ook zelf aan het einde een nieuwe regel toe. De visuele breedte van een tab hangt af van de positie.",
    ],
    idea: [
      "An escape sequence represents a character inside the string value.",
      "Een escapereeks stelt een teken binnen de stringwaarde voor.",
    ],
    example: 'print("Tea\\nCoffee")\nprint("A\\tB")',
    output: "Tea\nCoffee\nA\tB\n",
    predict: [
      "How many output lines come from the first call?",
      "Hoeveel uitvoerregels komen uit de eerste aanroep?",
    ],
    starter: "",
    solution: 'menu = "Soup\\nSalad"\nprint(menu)\n',
    steps: [
      step(
        [
          "Store Soup and Salad, separated by a newline, in one string named menu. Print menu.",
          "Bewaar Soup en Salad, gescheiden door een nieuwe regel, in één string met de naam menu. Druk menu af.",
        ],
        'menu == "Soup\nSalad" and _stdout == "Soup\nSalad\n"',
        [
          "Place the newline escape between the two words inside one string.",
          "Zet het nieuwe-regelteken tussen beide woorden binnen één string.",
        ],
        '"first\\nsecond"',
      ),
    ],
    experiment: [
      "Print a string containing one backslash, then one containing a quoted word. Explain which marks are syntax.",
      "Druk een string met één backslash af en daarna een string met een woord tussen aanhalingstekens. Leg uit welke tekens syntaxis zijn.",
    ],
    note: [
      "The stored string contains a newline character, not the two visible characters backslash and n.",
      "De opgeslagen string bevat een nieuweregelteken, niet de twee zichtbare tekens backslash en n.",
    ],
  }),
  lesson(4, "multiline", {
    title: [
      "Text across several source lines",
      "Tekst over meerdere coderegels",
    ],
    topics: "multiline-strings",
    requires: "strings comments",
    minutes: 12,
    intro: [
      "Triple quotes let a string span several lines in the editor.",
      "Met drievoudige aanhalingstekens kan een string meerdere regels in de editor beslaan.",
    ],
    teach: [
      "Use three matching quotes to open and close a multiline string. Newlines between the quotes become part of the value. Starting the text immediately after the opening quotes avoids an unwanted first blank line.\n\nTriple-quoted text is a string, not a # comment. A string used as the first statement of a module or function can become its documentation string. For ordinary explanatory comments, continue to use #.",
      "Gebruik drie bijpassende aanhalingstekens om een meerregelige string te openen en sluiten. Nieuwe regels tussen de aanhalingstekens worden onderdeel van de waarde. Als je de tekst direct na de opening begint, voorkom je een ongewenste eerste lege regel.\n\nTekst tussen drievoudige aanhalingstekens is een string, geen #-commentaar. Een string als eerste instructie van een module of functie kan de documentatiestring worden. Gebruik voor gewoon verklarend commentaar #.",
    ],
    idea: [
      "Triple quotes preserve text and newlines as a string value.",
      "Drievoudige aanhalingstekens bewaren tekst en nieuwe regels als een stringwaarde.",
    ],
    example: 'notice = """Open today\nCome inside"""\nprint(notice)',
    output: "Open today\nCome inside\n",
    predict: [
      "Would a newline just after the opening quotes appear in the output?",
      "Zou een nieuwe regel direct na de openingsaanhalingstekens in de uitvoer verschijnen?",
    ],
    starter: "",
    solution:
      'notice = """Workshop\nSaturday\nBring a notebook"""\nprint(notice)\n',
    steps: [
      step(
        [
          'Create notice with exactly three lines: "Workshop", "Saturday", "Bring a notebook". Print it.',
          'Maak notice met precies drie regels: "Workshop", "Saturday", "Bring a notebook". Druk het af.',
        ],
        'notice == "Workshop\nSaturday\nBring a notebook" and _stdout == notice + "\n"',
        [
          "Keep all three lines inside one string and avoid leading or trailing blank lines.",
          "Houd alle drie regels binnen één string en vermijd lege regels ervoor of erna.",
        ],
        'notice = """first\nsecond"""',
      ),
    ],
    experiment: [
      "Indent the second line inside the string. Observe that those spaces also become text.",
      "Spring de tweede regel binnen de string in. Bekijk hoe ook die spaties tekst worden.",
    ],
    note: [
      "The line breaks are part of notice. The final print newline comes after the string's final line.",
      "De regeleinden horen bij notice. De laatste print-nieuwe-regel komt na de laatste regel van de string.",
    ],
  }),
  lesson(4, "visitor-card", {
    title: ["Build a visitor card", "Maak een bezoekerskaart"],
    topics: "output-review",
    practices: "f-strings concatenation str-conversion",
    requires: "f-strings",
    guidance: "independent",
    minutes: 18,
    intro: [
      "Combine stored values and readable labels in a small report. Choose a formatting method you understand.",
      "Combineer opgeslagen waarden en leesbare labels in een klein verslag. Kies een opmaakmethode die je begrijpt.",
    ],
    teach: [
      "A report has a predictable shape even when its data changes. First inspect the desired output, then identify the parts that come from variables.\n\nThe example formats a room label. Your card needs a visitor name and a ticket count. Either f-strings, concatenation or separate print arguments can produce the required behaviour.",
      "Een verslag heeft een voorspelbare vorm, ook als de gegevens veranderen. Bekijk eerst de gewenste uitvoer en zoek daarna de onderdelen die uit variabelen komen.\n\nHet voorbeeld maakt een kamerlabel. Jouw kaart heeft een bezoekersnaam en een aantal kaartjes nodig. F-strings, concatenatie of aparte print-argumenten kunnen het gevraagde gedrag produceren.",
    ],
    idea: [
      "Keep the changing data in variables and the fixed wording in the output template.",
      "Houd veranderende gegevens in variabelen en vaste woorden in het uitvoersjabloon.",
    ],
    example: 'room = "Blue"\nprint(f"Room: {room}")',
    output: "Room: Blue\n",
    predict: [
      "Which text stays fixed when room changes?",
      "Welke tekst blijft vast wanneer room verandert?",
    ],
    starter: 'name = "Noor"\ntickets = 2\n',
    solution:
      'name = "Noor"\ntickets = 2\nprint(f"Visitor: {name}")\nprint(f"Tickets: {tickets}")\n',
    steps: [
      step(
        [
          'Print "Visitor: Noor" and then "Tickets: 2", using the variables.',
          'Druk "Visitor: Noor" af en daarna "Tickets: 2", met de variabelen.',
        ],
        '_stdout == f"Visitor: {name}\nTickets: {tickets}\n"',
        [
          "Write two labelled output lines and substitute the current values.",
          "Schrijf twee uitvoerregels met labels en vul de huidige waarden in.",
        ],
        'print(f"Visitor: {name}")',
        [
          probe(
            { name: "Alex", tickets: 0 },
            '_stdout == "Visitor: Alex\nTickets: 0\n"',
          ),
        ],
      ),
    ],
    experiment: [
      "Use a longer name and no tickets. Does the same code still work?",
      "Gebruik een langere naam en geen kaartjes. Werkt dezelfde code nog steeds?",
    ],
    note: [
      "The output template stays fixed while both values are taken from the supplied data.",
      "Het uitvoersjabloon blijft vast terwijl beide waarden uit de meegeleverde gegevens komen.",
    ],
  }),
  lesson(5, "first-input", {
    title: [
      "Ask and wait for an answer",
      "Stel een vraag en wacht op antwoord",
    ],
    topics: "input",
    requires: "variables print strings",
    minutes: 14,
    intro: [
      "Until now, values were written in the program. input() lets the person running it supply a value through the terminal.",
      "Tot nu toe stonden waarden in het programma. Met input() kan de gebruiker via de terminal een waarde invoeren.",
    ],
    teach: [
      'input("Name: ") displays a prompt and waits. Type an answer in the terminal input and press Enter. The function returns the entered text without its final newline. Assignment stores that returned text.\n\nThe program pauses at input until an answer arrives. Click Run once, answer in the terminal, and let the program continue. A prompt is displayed without the newline that print normally adds. In the worked example, the supplied answer is Noor.',
      'input("Name: ") toont een vraag en wacht. Typ een antwoord in de terminalinvoer en druk op Enter. De functie geeft de ingevoerde tekst terug zonder de laatste nieuwe regel. Toewijzing bewaart die teruggegeven tekst.\n\nHet programma wacht bij input totdat een antwoord binnenkomt. Klik eenmaal op Uitvoeren, antwoord in de terminal en laat het programma doorgaan. Een vraag verschijnt zonder de nieuwe regel die print normaal toevoegt. In het werkende voorbeeld is het meegeleverde antwoord Noor.',
    ],
    idea: [
      "input waits for Enter and returns the answer as text.",
      "input wacht op Enter en geeft het antwoord als tekst terug.",
    ],
    example: 'name = input("Name: ")\nprint(name)',
    output: "Name: Noor\n",
    predict: [
      "Where must the person type their answer: editor or terminal?",
      "Waar moet de gebruiker het antwoord typen: editor of terminal?",
    ],
    starter: "",
    solution: 'name = input("Name: ")\nprint(f"Hello, {name}!")\n',
    inputs: ["Mila"],
    steps: [
      step(
        [
          'Ask with input("Name: ") and store the answer in name.',
          'Vraag met input("Name: ") en bewaar het antwoord in name.',
        ],
        "type(name) is str",
        [
          "Assign the returned answer instead of assigning the prompt text.",
          "Wijs het teruggegeven antwoord toe in plaats van de vraagtekst.",
        ],
        'name = input("Name: ")',
        [{ stdin: ["Bo"], check: 'name == "Bo"' }],
      ),
      step(
        [
          'Greet the entered name, for example "Hello, Mila!".',
          'Begroet de ingevoerde naam, bijvoorbeeld "Hello, Mila!".',
        ],
        '_stdout.endswith(f"Hello, {name}!\n")',
        [
          "Use the stored answer in the greeting after the input call.",
          "Gebruik het opgeslagen antwoord in de begroeting na de input-aanroep.",
        ],
        'print(f"Hello, {name}!")',
        [{ stdin: ["Bo"], check: '_stdout.endswith("Hello, Bo!\n")' }],
      ),
    ],
    sections: [],
    experiment: [
      "Run twice with two different names. The code stays the same; the answers change.",
      "Voer tweemaal uit met twee verschillende namen. De code blijft hetzelfde; de antwoorden veranderen.",
    ],
    note: [
      "The program waits once, stores the answer, then formats a greeting from it.",
      "Het programma wacht eenmaal, bewaart het antwoord en maakt er daarna een begroeting van.",
    ],
  }),
  lesson(5, "input-is-text", {
    title: [
      "Digits entered are still text",
      "Ingevoerde cijfers zijn nog steeds tekst",
    ],
    topics: "input-string-type",
    requires: "input types",
    minutes: 12,
    intro: [
      "Typing digits does not make input return a number. Inspect the type before calculating.",
      "Cijfers typen zorgt er niet voor dat input een getal teruggeeft. Onderzoek het type voordat je rekent.",
    ],
    teach: [
      'If someone enters 12, input returns "12", a string. It also returns a string for -3 or 2.5. That is why a numeric-looking answer cannot simply be added to an integer.\n\nFirst capture the raw answer and inspect it. In this example the supplied answer is 12, and type reports str. The next lessons introduce explicit conversion so the intended type is clear.',
      'Als iemand 12 invoert, geeft input "12" terug, een string. Ook bij -3 of 2.5 krijg je een string. Daarom kun je een antwoord dat op een getal lijkt niet zomaar bij een int optellen.\n\nBewaar eerst het onbewerkte antwoord en onderzoek het. In dit voorbeeld is het meegeleverde antwoord 12 en meldt type str. De volgende lessen introduceren expliciete conversie zodat het bedoelde type duidelijk is.',
    ],
    idea: [
      "input always returns a string when it successfully reads an answer.",
      "input geeft altijd een string terug wanneer het succesvol een antwoord leest.",
    ],
    example: 'answer = input("Count: ")\nprint(type(answer))',
    output: "Count: <class 'str'>\n",
    predict: [
      "Would typing 0 instead change the returned type?",
      "Verandert het teruggegeven type als je 0 typt?",
    ],
    starter: "",
    solution: 'answer = input("Count: ")\nprint(type(answer))\n',
    inputs: ["7"],
    steps: [
      step(
        [
          "Read an answer with the prompt Count: and store it in answer. Print its type.",
          "Lees een antwoord met de vraag Count: en bewaar het in answer. Druk het type af.",
        ],
        "type(answer) is str and _stdout.endswith(\"<class 'str'>\n\")",
        [
          "Inspect the answer returned by input, not the prompt string.",
          "Onderzoek het antwoord van input, niet de vraagstring.",
        ],
        "print(type(answer))",
        [{ stdin: ["2.5"], check: 'answer == "2.5"' }],
      ),
    ],
    experiment: [
      "Enter a word, then a decimal number. Explain why both have the same type.",
      "Voer een woord in en daarna een kommagetal. Leg uit waarom beide hetzelfde type hebben.",
    ],
    note: [
      "The digits belong to text until a conversion function interprets them as a number.",
      "De cijfers horen bij tekst totdat een conversiefunctie ze als een getal interpreteert.",
    ],
  }),
  lesson(5, "integer-input", {
    title: ["Convert a whole-number answer", "Zet een geheel antwoord om"],
    topics: "conversion int-conversion",
    requires: "input integers addition",
    minutes: 14,
    intro: [
      "Use int() when the answer is meant to be a whole number. Keep reading and converting as separate steps while learning.",
      "Gebruik int() wanneer het antwoord een geheel getal moet zijn. Houd lezen en omzetten tijdens het leren als aparte stappen.",
    ],
    teach: [
      'int("12") interprets whole-number text and returns the integer 12. Store the converted result under a new name so you can distinguish it from the original text. Then numeric operators perform arithmetic.\n\nText such as "twelve" or "2.5" cannot be interpreted by int as a whole-number string and raises ValueError. This exercise assumes a valid whole-number answer. You will learn how to retry after errors in module 10.',
      'int("12") interpreteert tekst met een geheel getal en geeft de int 12 terug. Bewaar het omgezette resultaat onder een nieuwe naam zodat je het van de oorspronkelijke tekst kunt onderscheiden. Daarna rekenen numerieke operatoren met het getal.\n\nTekst zoals "twelve" of "2.5" kan int niet als een string met een geheel getal lezen en veroorzaakt ValueError. Deze oefening gaat uit van een geldig geheel antwoord. In module 10 leer je na fouten opnieuw vragen.',
    ],
    idea: [
      "Read text, convert it with int, then calculate with the number.",
      "Lees tekst, zet haar om met int en reken daarna met het getal.",
    ],
    example: 'raw = input("Boxes: ")\nboxes = int(raw)\nprint(boxes + 1)',
    output: "Boxes: 5\n",
    predict: [
      "With answer 4, why does the output end in 5 rather than 41?",
      "Waarom eindigt de uitvoer bij antwoord 4 op 5 in plaats van 41?",
    ],
    starter: "",
    solution:
      'raw = input("Visitors: ")\nvisitors = int(raw)\nprint(visitors + 2)\n',
    inputs: ["3"],
    steps: [
      step(
        [
          "Read Visitors: into raw and convert it to the integer visitors.",
          "Lees Visitors: in raw en zet het om naar de int visitors.",
        ],
        "type(visitors) is int and visitors == int(raw)",
        [
          "Assign the result of int(raw); calling it without assignment does not change raw.",
          "Wijs het resultaat van int(raw) toe; aanroepen zonder toewijzing verandert raw niet.",
        ],
        "visitors = int(raw)",
        [{ stdin: ["0"], check: "visitors == 0" }],
      ),
      step(
        [
          "Print the count after two more visitors arrive.",
          "Druk het aantal af nadat er nog twee bezoekers bijkomen.",
        ],
        '_stdout.endswith(str(visitors + 2) + "\n")',
        [
          "Calculate with visitors, which is numeric, instead of raw, which is text.",
          "Reken met visitors, dat numeriek is, in plaats van raw, dat tekst is.",
        ],
        "print(visitors + 2)",
        [{ stdin: ["10"], check: '_stdout.endswith("12\n")' }],
      ),
    ],
    experiment: [
      "Try 0, then -2. Finally try a word, read ValueError, and rerun with a valid number.",
      "Probeer 0 en daarna -2. Probeer ten slotte een woord, lees ValueError en voer opnieuw uit met een geldig getal.",
    ],
    note: [
      "The input remains text in raw while visitors holds the converted whole number.",
      "De invoer blijft tekst in raw terwijl visitors het omgezette gehele getal bevat.",
    ],
  }),
  lesson(5, "float-input", {
    title: ["Read a decimal measurement", "Lees een decimale meting"],
    topics: "float-conversion",
    requires: "input floats conversion",
    minutes: 13,
    intro: [
      "A measurement may contain a fractional part. float() converts suitable numeric text to a floating-point number.",
      "Een meting kan een deel achter de komma hebben. float() zet geschikte getaltekst om naar een kommagetal.",
    ],
    teach: [
      'float("2.5") returns 2.5. It can also read whole-number text such as "2" and returns 2.0. Ask the user to use a decimal point rather than a comma.\n\nAs with int, unsuitable text raises ValueError. Do not silently replace an invalid measurement with zero. For this lesson, enter valid numeric text; recovery is a separate skill taught before the calculator project.',
      'float("2.5") geeft 2.5 terug. Het kan ook tekst met een geheel getal zoals "2" lezen en geeft dan 2.0 terug. Vraag de gebruiker een decimale punt te gebruiken in plaats van een komma.\n\nNet als bij int veroorzaakt ongeschikte tekst ValueError. Vervang een ongeldige meting niet stilzwijgend door nul. Voer voor deze les geldige getaltekst in; herstellen is een aparte vaardigheid die vóór het rekenmachineproject aan bod komt.',
    ],
    idea: [
      "Use float for numeric answers that may include a fractional part.",
      "Gebruik float voor numerieke antwoorden die een deel achter de komma kunnen hebben.",
    ],
    example: 'raw = input("Metres: ")\nmetres = float(raw)\nprint(metres * 2)',
    output: "Metres: 5.0\n",
    predict: [
      "With answer 2.5, does multiplication preserve the fraction?",
      "Blijft bij antwoord 2.5 het breukdeel behouden tijdens vermenigvuldigen?",
    ],
    starter: "",
    solution:
      'raw = input("Hours: ")\nhours = float(raw)\nminutes = hours * 60\nprint(minutes)\n',
    inputs: ["1.5"],
    steps: [
      step(
        [
          "Read Hours: into raw and convert it to the float hours.",
          "Lees Hours: in raw en zet het om naar de float hours.",
        ],
        "type(hours) is float and hours == float(raw)",
        [
          "Use float rather than int so a fractional answer is accepted.",
          "Gebruik float in plaats van int zodat een antwoord met een breukdeel wordt geaccepteerd.",
        ],
        "hours = float(raw)",
        [{ stdin: ["0.25"], check: "hours == 0.25" }],
      ),
      step(
        [
          "Calculate minutes from hours and print minutes.",
          "Bereken minutes uit hours en druk minutes af.",
        ],
        'minutes == hours * 60 and _stdout.endswith(str(minutes) + "\n")',
        [
          "One hour contains 60 minutes. Multiply the numeric measurement by 60.",
          "Een uur bevat 60 minuten. Vermenigvuldig de numerieke meting met 60.",
        ],
        "minutes = hours * 60",
        [
          { stdin: ["0"], check: "minutes == 0" },
          { stdin: ["0.25"], check: "minutes == 15" },
        ],
      ),
    ],
    experiment: [
      "Enter 2 and then 2.5. Compare the converted types and answers.",
      "Voer 2 in en daarna 2.5. Vergelijk de omgezette typen en antwoorden.",
    ],
    note: [
      "The conversion allows fractional hours. Multiplication converts the unit without discarding that fraction.",
      "De conversie laat delen van uren toe. Vermenigvuldigen verandert de eenheid zonder het breukdeel weg te gooien.",
    ],
  }),
  lesson(5, "two-answers", {
    title: ["Ask two questions in order", "Stel twee vragen op volgorde"],
    topics: "multiple-inputs",
    requires: "float-conversion f-strings",
    minutes: 14,
    intro: [
      "A useful calculation often needs more than one answer. Give each input its own prompt and variable.",
      "Een nuttige berekening heeft vaak meer dan één antwoord nodig. Geef elke invoer een eigen vraag en variabele.",
    ],
    teach: [
      "Each input call waits separately. The first answer belongs to the first call; Python reaches the next call only afterward. A clear prompt tells the person what to enter and which unit to use.\n\nThe example reads a length and a width in metres, converts both, then multiplies them. Write and test one input before adding the next. This keeps the conversation understandable.",
      "Elke input-aanroep wacht apart. Het eerste antwoord hoort bij de eerste aanroep; Python bereikt de volgende aanroep pas daarna. Een duidelijke vraag vertelt de gebruiker wat die moet invoeren en in welke eenheid.\n\nHet voorbeeld leest een lengte en breedte in meters, zet beide om en vermenigvuldigt ze. Schrijf en test één invoer voordat je de volgende toevoegt. Zo blijft het gesprek begrijpelijk.",
    ],
    idea: [
      "Answers arrive in the order of the input calls.",
      "Antwoorden komen binnen in de volgorde van de input-aanroepen.",
    ],
    example:
      'length = float(input("Length: "))\nwidth = float(input("Width: "))\nprint(length * width)',
    output: "Length: Width: 6.0\n",
    predict: [
      "With answers 3 then 2, which value becomes width?",
      "Welke waarde wordt width bij antwoorden 3 en daarna 2?",
    ],
    starter: "",
    solution:
      'distance = float(input("Distance: "))\ntime = float(input("Time: "))\nspeed = distance / time\nprint(speed)\n',
    inputs: ["12", "3"],
    steps: [
      step(
        [
          "Read Distance: and Time: into float variables distance and time. Assume time is positive.",
          "Lees Distance: en Time: in de floatvariabelen distance en time. Ga uit van een positieve tijd.",
        ],
        "type(distance) is float and type(time) is float",
        [
          "Use two input calls and convert each answer separately.",
          "Gebruik twee input-aanroepen en zet elk antwoord apart om.",
        ],
        'distance = float(input("Distance: "))',
        [{ stdin: ["7.5", "2.5"], check: "distance == 7.5 and time == 2.5" }],
      ),
      step(
        [
          "Divide distance by time, store speed and print it.",
          "Deel distance door time, bewaar speed en druk het af.",
        ],
        'speed == distance / time and _stdout.endswith(str(speed) + "\n")',
        [
          "Calculate after both answers have been read.",
          "Reken nadat beide antwoorden zijn gelezen.",
        ],
        "speed = distance / time",
        [{ stdin: ["7.5", "2.5"], check: "speed == 3" }],
      ),
    ],
    experiment: [
      "Use the same distance with twice the time. Predict the change in speed.",
      "Gebruik dezelfde afstand met tweemaal de tijd. Voorspel de verandering in snelheid.",
    ],
    note: [
      "The program reads both values before dividing. The positive-time assumption avoids a zero divisor at this stage.",
      "Het programma leest beide waarden voordat het deelt. De aanname van een positieve tijd vermijdt in deze fase een deler nul.",
    ],
  }),
  lesson(5, "normalise-command", {
    title: ["Clean a typed command", "Schoon een getypte opdracht op"],
    topics: "normalisation strip case-methods",
    requires: "input strings",
    minutes: 14,
    intro: [
      "People sometimes type extra spaces or capital letters. Normalise a command so these small differences do not matter later.",
      "Mensen typen soms extra spaties of hoofdletters. Normaliseer een opdracht zodat die kleine verschillen later niet uitmaken.",
    ],
    teach: [
      "A string method is a tool attached to a string value. The dot in raw.strip() selects the method named strip; parentheses call it. strip returns a new string without leading or trailing whitespace. It does not remove spaces in the middle.\n\nlower returns a lowercase copy. In the example we use two assignments so each transformation is visible. Strings do not change themselves: keep the returned values. The supplied input is two spaces, GO, then two spaces.",
      "Een stringmethode is een hulpmiddel dat bij een stringwaarde hoort. De punt in raw.strip() kiest de methode strip; de haakjes roepen haar aan. strip geeft een nieuwe string zonder witruimte aan het begin of einde. Spaties middenin worden niet verwijderd.\n\nlower geeft een kopie met kleine letters terug. In het voorbeeld gebruiken we twee toewijzingen zodat elke verandering zichtbaar is. Strings veranderen zichzelf niet: bewaar de teruggegeven waarden. De meegeleverde invoer is twee spaties, GO en daarna twee spaties.",
    ],
    idea: [
      "Store the new string returned by strip and lower.",
      "Bewaar de nieuwe string die strip en lower teruggeven.",
    ],
    example:
      'raw = input("Command: ")\ntrimmed = raw.strip()\ncommand = trimmed.lower()\nprint(command)',
    output: "Command: go\n",
    predict: [
      "What would happen if you called lower without storing its result?",
      "Wat gebeurt er als je lower aanroept zonder het resultaat te bewaren?",
    ],
    starter: "",
    solution:
      'raw = input("Choice: ")\nchoice = raw.strip().lower()\nprint(choice)\n',
    inputs: ["  HELP  "],
    steps: [
      step(
        [
          "Read Choice: and store a trimmed, lowercase version in choice. Print choice.",
          "Lees Choice: en bewaar een versie zonder randspaties en met kleine letters in choice. Druk choice af.",
        ],
        'choice == raw.strip().lower() and _stdout.endswith(choice + "\n")',
        [
          "Apply both transformations and assign their returned text. You can use separate assignments.",
          "Pas beide veranderingen toe en wijs de teruggegeven tekst toe. Je mag aparte toewijzingen gebruiken.",
        ],
        "trimmed = raw.strip()",
        [
          { stdin: ["  Quit "], check: 'choice == "quit"' },
          { stdin: [" SAVE FILE "], check: 'choice == "save file"' },
        ],
      ),
    ],
    experiment: [
      "Enter SAVE FILE with outer spaces. Which space remains after strip?",
      "Voer SAVE FILE in met spaties eromheen. Welke spatie blijft na strip over?",
    ],
    note: [
      "The method chain feeds the trimmed result into lower. A two-assignment version produces the same behaviour.",
      "De keten van methoden geeft het getrimde resultaat aan lower. Een versie met twee toewijzingen levert hetzelfde gedrag.",
    ],
  }),
  lesson(5, "trip-report", {
    title: [
      "Make an interactive trip report",
      "Maak een interactief reisverslag",
    ],
    topics: "input-review",
    practices: "input conversion f-strings",
    requires: "multiple-inputs float-conversion f-strings",
    guidance: "independent",
    minutes: 20,
    intro: [
      "Build a short conversation from a brief. Reuse your input and formatting skills without a finished program beside the editor.",
      "Bouw een kort gesprek vanuit een opdracht. Gebruik je invoer- en opmaakvaardigheden zonder een voltooid programma naast de editor.",
    ],
    teach: [
      "Plan the conversation before typing: ask, convert if needed, calculate, then report. A person's name is text; a measurement is numeric. Convert only the measurement.\n\nThe example asks for a shop and labels it. Your task adds a numeric conversion and an arithmetic result. Assume a valid numeric answer while practising this combination.",
      "Plan het gesprek voordat je typt: vraag, zet zo nodig om, bereken en rapporteer. Een naam is tekst; een meting is numeriek. Zet alleen de meting om.\n\nHet voorbeeld vraagt naar een winkel en geeft die een label. Jouw opdracht voegt getalconversie en een rekenresultaat toe. Ga bij het oefenen van deze combinatie uit van een geldig numeriek antwoord.",
    ],
    idea: [
      "Choose a type for each answer before calculating or formatting it.",
      "Kies voor elk antwoord een type voordat je ermee rekent of het opmaakt.",
    ],
    example: 'shop = input("Shop: ")\nprint(f"Visiting {shop}")',
    output: "Shop: Visiting Market\n",
    predict: [
      "Does the shop name need numeric conversion?",
      "Moet de winkelnaam naar een getal worden omgezet?",
    ],
    starter: "",
    solution:
      'destination = input("Destination: ")\nkm = float(input("Kilometres: "))\nmetres = km * 1000\nprint(f"{destination}: {metres} m")\n',
    inputs: ["Park", "1.5"],
    steps: [
      step(
        [
          "Ask Destination: for destination and Kilometres: for a float named km.",
          "Vraag Destination: voor destination en Kilometres: voor een float met de naam km.",
        ],
        "type(destination) is str and type(km) is float",
        [
          "Leave the destination as text and convert only the distance.",
          "Laat de bestemming tekst en zet alleen de afstand om.",
        ],
        'km = float(input("Kilometres: "))',
        [
          {
            stdin: ["Beach", "2.25"],
            check: 'destination == "Beach" and km == 2.25',
          },
        ],
      ),
      step(
        [
          'Calculate metres and print a report such as "Park: 1500.0 m".',
          'Bereken metres en druk een verslag af zoals "Park: 1500.0 m".',
        ],
        'metres == km * 1000 and _stdout.endswith(f"{destination}: {metres} m\n")',
        [
          "A kilometre contains 1000 metres. Build the message from the current values.",
          "Een kilometer bevat 1000 meter. Bouw het bericht uit de huidige waarden.",
        ],
        "metres = km * 1000",
        [
          {
            stdin: ["Home", "0"],
            check: 'metres == 0 and _stdout.endswith("Home: 0.0 m\n")',
          },
        ],
      ),
    ],
    experiment: [
      "Try a new destination and a fractional distance. Explain the four stages of the conversation.",
      "Probeer een nieuwe bestemming en een afstand met een breukdeel. Leg de vier stappen van het gesprek uit.",
    ],
    note: [
      "Only the numeric answer is converted. The final message combines the original text answer and the calculated measurement.",
      "Alleen het numerieke antwoord wordt omgezet. Het eindbericht combineert het oorspronkelijke tekstantwoord en de berekende meting.",
    ],
  }),
];

// Documented input fixtures belong to examples, independently of exercise input.
const exampleInputs = {
  "first-input": ["Noor"],
  "input-is-text": ["12"],
  "integer-input": ["4"],
  "float-input": ["2.5"],
  "two-answers": ["3", "2"],
  "normalise-command": ["  GO  "],
  "trip-report": ["Market"],
};
for (const a of activities)
  for (const [slug, inputs] of Object.entries(exampleInputs))
    if (a.id.endsWith(`-${slug}`)) a.sections[0].exampleInputs = inputs;
