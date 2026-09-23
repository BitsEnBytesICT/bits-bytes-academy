import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "python-hello-world";
// Outcome checks accept equivalent Python; syntax checks appear only when the
// learning objective explicitly asks the learner to practise that construct.
const assigns = (name, op, dependencies = []) =>
  `any(isinstance(n, _ast.Assign) and any(isinstance(t, _ast.Name) and t.id == '${name}' for t in n.targets) and isinstance(n.value, _ast.BinOp) and isinstance(n.value.op, _ast.${op}) and all(key in [x.id for x in _ast.walk(n.value) if isinstance(x, _ast.Name)] for key in ${JSON.stringify(dependencies)}) for n in _ast.walk(_ast.parse(_source)))`;
const comment =
  "any(t.type == __import__('tokenize').COMMENT and t.start[1] == 0 and len(t.string.lstrip('# ').strip()) > 0 and t.start[0] < next((i + 1 for i, line in enumerate(_source.splitlines()) if line.strip().startswith('print(')), 0) for t in __import__('tokenize').generate_tokens(__import__('io').StringIO(_source).readline))";

G(g, 1, {
  titleNl: "Welkom in je werkruimte",
  intro: loc(
    "A program is a set of instructions a computer can follow. Python lets us write those instructions in a language designed to be readable. You will learn it by changing real programs, predicting what they do, and testing your ideas.",
    "Een programma is een reeks instructies die een computer kan uitvoeren. Met Python schrijf je die instructies in een taal die goed leesbaar is. Je leert de taal door echte programma's aan te passen, te voorspellen wat ze doen en je ideeën uit te proberen.",
  ),
  sections: [
    S(
      "From code to output",
      "Van code naar output",
      "The editor contains a file called `main.py`. When you choose Run code, Python reads that file from top to bottom. The terminal shows what the program prints. Here, the quoted words are the message and `print()` is the instruction that displays it.",
      "In de editor staat een bestand met de naam `main.py`. Met Code uitvoeren laat je Python dit bestand van boven naar beneden lezen. De terminal toont wat het programma afdrukt. De woorden tussen aanhalingstekens vormen het bericht; `print()` zorgt dat het verschijnt.",
      'print("Hello, explorer!")\nprint("Your journey starts here.")',
      "Hello, explorer!\nYour journey starts here.",
      "Two instructions produce two lines. Python does not print the surrounding quotes or parentheses: those tell Python how to interpret the code.",
      "Twee instructies leveren twee regels op. Python drukt de omringende aanhalingstekens en haakjes niet af: die vertellen Python hoe de code gelezen moet worden.",
    ),
    S(
      "Try it in your workspace",
      "Probeer het in je werkruimte",
      "Run the starter program first. Then replace `explorer` with your name inside the quotes and run it again. Change only the message: keep the matching quotes and parentheses. What changes in the output?\n\nLater lessons contain numbered tasks with individual checks and hints. Run after each small change. An error is feedback about the program, not a reason to start over.",
      "Voer eerst de startcode uit. Vervang daarna `explorer` tussen de aanhalingstekens door je naam en voer de code opnieuw uit. Verander alleen de tekst: laat de bij elkaar passende aanhalingstekens en haakjes staan. Wat verandert er in de output?\n\nVolgende lessen bevatten genummerde opdrachten met eigen controles en hints. Voer je code na elke kleine wijziging uit. Een foutmelding geeft informatie over je programma; je hoeft niet opnieuw te beginnen.",
    ),
    S(
      "Your files and the console",
      "Je bestanden en de console",
      "Your files and course progress are saved automatically. The terminal also accepts short Python commands at `>`. These experiments do not complete tasks; use Run code to check your saved program. Reset restores the starter files for this activity, so use it only when you want to discard your current edits.",
      "Je bestanden en cursusvoortgang worden automatisch opgeslagen. Bij `>` in de terminal kun je ook korte Python-opdrachten invoeren. Deze experimenten voltooien geen taken; gebruik Code uitvoeren om je opgeslagen programma te controleren. Herstellen zet de startbestanden van deze activiteit terug, dus gebruik dit alleen als je je huidige aanpassingen wilt weggooien.",
    ),
  ],
  starter: 'print("Hello, explorer!")\nprint("I am learning Python.")\n',
  solution: 'print("Hello, Sam!")\nprint("I am learning Python.")\n',
  solutionNote: loc(
    "Only the text inside the first pair of quotes changes. Any name is fine. Run the program again to see the new message, then continue to comments.",
    "Alleen de tekst binnen de eerste aanhalingstekens verandert. Elke naam is goed. Voer het programma opnieuw uit om je nieuwe bericht te zien en ga daarna verder met comments.",
  ),
});

G(g, 2, {
  titleNl: "Comments",
  intro: loc(
    "Code has two audiences: Python executes it, and people read it. A comment is a note for the reader. It can explain a decision, describe a section, or temporarily disable an instruction while you investigate a problem.",
    "Code heeft twee doelgroepen: Python voert de code uit en mensen lezen de code. Een comment is een notitie voor de lezer. Je kunt een keuze uitleggen, een onderdeel beschrijven of een instructie tijdelijk uitschakelen terwijl je een probleem onderzoekt.",
  ),
  sections: [
    S(
      "What Python skips",
      "Wat Python overslaat",
      "Outside a string, `#` starts a comment that continues to the end of that line. A comment can occupy its own line or follow an instruction. Python still executes any code before the `#`.",
      "Buiten een string begint `#` een comment die doorloopt tot het einde van de regel. Een comment kan op een eigen regel staan of achter een instructie. Code vóór de `#` wordt gewoon uitgevoerd.",
      '# Explain why this message is shown\nprint("Boarding soon")  # Passenger update\n# print("Cancelled")',
      "Boarding soon",
      "The last line looks like an instruction, but its leading `#` makes the whole line a comment. Removing that character would enable the instruction again.",
      "De laatste regel lijkt op een instructie, maar door de `#` vooraan is de hele regel een comment. Verwijder dat teken en de instructie wordt weer uitgevoerd.",
    ),
    S(
      "Text is different",
      "Tekst is iets anders",
      "A `#` inside quotes is ordinary text. Good comments add useful context instead of repeating exactly what the code already says. For this exercise, leave the old forecast visible in the file but prevent it from running.",
      "Een `#` tussen aanhalingstekens is gewone tekst. Goede comments geven extra context in plaats van letterlijk te herhalen wat de code al zegt. Laat in deze oefening het oude weerbericht in het bestand staan, maar zorg dat het niet wordt uitgevoerd.",
      'print("Platform #4")',
      "Platform #4",
    ),
  ],
  starter: 'print("Sunny")\nprint("Rain yesterday")\n',
  solution:
    '# Current forecast for passengers\nprint("Sunny")\n# print("Rain yesterday")\n',
  steps: [
    T(
      "Add a comment on its own line above the first `print()` explaining that this is the current forecast.",
      "Voeg boven de eerste `print()` op een eigen regel een comment toe die uitlegt dat dit het huidige weerbericht is.",
      comment,
      "Start the note with `#`. Write it outside the quoted message.",
      "Begin de notitie met `#`. Schrijf deze buiten de tekst tussen aanhalingstekens.",
      "Add an actual Python comment; a `#` inside a string does not count.",
      "Voeg een echte Python-comment toe; een `#` in een string telt niet mee.",
    ),
    T(
      "Comment out the line that prints `Rain yesterday`. Keep that line in the file, then run the program. Only `Sunny` should appear.",
      "Schakel de regel met `Rain yesterday` uit met een comment. Laat de regel in het bestand staan en voer het programma uit. Alleen `Sunny` mag verschijnen.",
      "_stdout == 'Sunny\\n' and any(t.type == __import__('tokenize').COMMENT and 'print(' in t.string and 'Rain yesterday' in t.string for t in __import__('tokenize').generate_tokens(__import__('io').StringIO(_source).readline))",
      "Put `#` before the second `print`, not inside its quotes.",
      "Zet `#` vóór de tweede `print`, niet binnen de aanhalingstekens.",
      "Keep the old print instruction as a comment and check that the terminal contains just Sunny.",
      "Bewaar de oude print-instructie als comment en controleer dat de terminal alleen Sunny bevat.",
    ),
  ],
  solutionNote: loc(
    "The descriptive comment helps the reader. The second comment keeps the previous instruction for reference while preventing its output. Neither comment changes the remaining print call.",
    "De beschrijvende comment helpt de lezer. De tweede comment bewaart de vorige instructie als naslag en voorkomt dat deze wordt uitgevoerd. Beide comments laten de overgebleven print-opdracht ongemoeid.",
  ),
});

G(g, 3, {
  titleNl: "Output afdrukken",
  intro: loc(
    "A program can calculate quietly, but people often need to see its results. The built-in `print()` function sends information to the terminal. Calling a function means asking it to perform its job; the parentheses contain the information you give it.",
    "Een programma kan op de achtergrond rekenen, maar mensen willen de resultaten vaak zien. De ingebouwde functie `print()` stuurt informatie naar de terminal. Een functie aanroepen betekent dat je deze een taak laat uitvoeren; tussen de haakjes geef je de benodigde informatie mee.",
  ),
  sections: [
    S(
      "One call, one line",
      "Eén aanroep, één regel",
      "Put a quoted message between the parentheses. A normal `print()` call ends its output with a newline, so the next call starts on a new line. The order of the calls determines the order of the messages.",
      "Zet een bericht tussen aanhalingstekens binnen de haakjes. Een gewone `print()` sluit de output af met een regeleinde. Daardoor begint de volgende aanroep op een nieuwe regel. De volgorde van de aanroepen bepaalt de volgorde van de berichten.",
      'print("Train status")\nprint("On time")',
      "Train status\nOn time",
      "Read the code aloud as: display Train status, then display On time. The quotes and the word print are instructions, not part of the displayed message.",
      "Lees de code als: toon Train status en toon daarna On time. De aanhalingstekens en het woord print zijn instructies en horen niet bij het getoonde bericht.",
    ),
    S(
      "Predict, then run",
      "Voorspel en voer uit",
      "You are building a two-line departure board. Before running your code, predict the exact lines, including spaces and capitals. If the result differs, compare one character at a time. Output checks are useful because a program can run without errors and still display the wrong information.",
      "Je bouwt een vertrekbord met twee regels. Voorspel vóór het uitvoeren de exacte regels, inclusief spaties en hoofdletters. Vergelijk bij een afwijking de tekst teken voor teken. Outputcontroles zijn nuttig: een programma kan zonder fouten draaien en toch verkeerde informatie tonen.",
    ),
  ],
  starter:
    '# The screen needs a title and a platform number.\nprint("Untitled board")\n# Add the platform message below.\n',
  solution: 'print("Departure board")\nprint("Platform 4")\n',
  steps: [
    T(
      "Print `Departure board` as the first line. Run your code to check the spelling and spacing.",
      "Druk `Departure board` af als eerste regel. Voer de code uit om de spelling en spaties te controleren.",
      "_stdout.splitlines()[:1] == ['Departure board']",
      'Use `print("your message")` with the required text inside the quotes.',
      'Gebruik `print("je bericht")` met de gevraagde tekst tussen de aanhalingstekens.',
      "The first output line must be exactly Departure board.",
      "De eerste outputregel moet precies Departure board zijn.",
    ),
    T(
      "Add a second `print()` call below the first. It must display `Platform 4` on the next line, with no extra output.",
      "Voeg onder de eerste aanroep een tweede `print()` toe. Deze moet `Platform 4` op de volgende regel tonen, zonder extra output.",
      "_stdout == 'Departure board\\nPlatform 4\\n' and sum(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Name) and n.func.id == 'print' for n in _ast.walk(_ast.parse(_source))) == 2",
      "Keep the first call. Write another call on its own code line below it.",
      "Laat de eerste aanroep staan. Schrijf daaronder een nieuwe aanroep op een eigen coderegel.",
      "Use two print calls in order: Departure board, then Platform 4.",
      "Gebruik twee print-aanroepen in deze volgorde: Departure board en daarna Platform 4.",
    ),
  ],
  solutionNote: loc(
    "Each print call supplies one line. Keeping the two calls in reading order makes the program match the display. A third print call would add unwanted output.",
    "Elke print-aanroep levert één regel. Door de aanroepen in leesvolgorde te plaatsen, komt de code overeen met het scherm. Een derde aanroep zou ongewenste output toevoegen.",
  ),
});

G(g, 4, {
  titleNl: "Strings: tekst in Python",
  intro: loc(
    "Python calls a piece of text a string. A string literal is text written directly in your code between quotes. The quotes mark where the text starts and ends; they are not part of the string's contents.",
    "Python noemt een stukje tekst een string. Een string literal is tekst die je direct tussen aanhalingstekens in de code schrijft. De aanhalingstekens geven aan waar de tekst begint en eindigt; ze horen niet bij de inhoud van de string.",
  ),
  sections: [
    S(
      "Two ways to quote text",
      "Twee manieren om tekst te schrijven",
      "Single quotes and double quotes create the same kind of value. Choose one style for a string and close it with the same type of quote. Spaces inside the quotes are preserved.",
      "Enkele en dubbele aanhalingstekens maken hetzelfde soort waarde. Kies voor een string één soort en sluit af met hetzelfde teken. Spaties binnen de aanhalingstekens blijven behouden.",
      'print("Harbor")\nprint(\'Harbor\')\nprint("North gate")',
      "Harbor\nHarbor\nNorth gate",
      'The first two lines have different Python spelling but identical output. Quoting digits also makes text: `"42"` is a string, whereas `42` is a number.',
      'De eerste twee regels zijn anders geschreven in Python, maar hebben dezelfde output. Cijfers tussen aanhalingstekens zijn ook tekst: `"42"` is een string en `42` is een getal.',
    ),
    S(
      "Quotes inside a message",
      "Aanhalingstekens in een bericht",
      "An apostrophe can accidentally close a single-quoted string. An easy solution is to surround that message with double quotes. The apostrophe then belongs to the text. You will learn other ways to represent special characters later.",
      "Een apostrof kan onbedoeld een string met enkele aanhalingstekens afsluiten. Een eenvoudige oplossing is om dubbele aanhalingstekens om het bericht te zetten. De apostrof hoort dan bij de tekst. Andere manieren om bijzondere tekens te schrijven komen later aan bod.",
      'print("It\'s boarding time")',
      "It's boarding time",
    ),
  ],
  starter:
    '# Change this message, then add the other two calls below.\nprint("Station name")\n',
  solution:
    'print("Harbor")\nprint(\'Harbor\')\nprint("It\'s boarding time")\n',
  steps: [
    T(
      "Print `Harbor` using double quotes. Run the file and look at whether the quote marks appear in the output.",
      "Druk `Harbor` af met dubbele aanhalingstekens. Voer het bestand uit en bekijk of de aanhalingstekens in de output verschijnen.",
      "_stdout.splitlines()[:1] == ['Harbor']",
      "The opening and closing quotes go inside the parentheses.",
      "De aanhalingstekens staan binnen de haakjes.",
      "Your first printed line should contain Harbor, without quotation marks.",
      "De eerste afgedrukte regel moet Harbor bevatten, zonder aanhalingstekens.",
    ),
    T(
      "Add a second line that prints `Harbor`, this time using single quotes. Keep both calls so you can compare their output.",
      "Voeg een tweede regel toe die `Harbor` afdrukt, nu met enkele aanhalingstekens. Laat beide aanroepen staan zodat je de output kunt vergelijken.",
      "_stdout.splitlines()[:2] == ['Harbor', 'Harbor']",
      "Use a matching pair of single quotes around the same text.",
      "Zet dezelfde tekst tussen twee enkele aanhalingstekens.",
      "The first two output lines should be identical: Harbor.",
      "De eerste twee outputregels moeten gelijk zijn: Harbor.",
    ),
    T(
      "Print `It's boarding time` on a third line. Choose quotes that allow the apostrophe to be part of your message.",
      "Druk `It's boarding time` af op een derde regel. Kies aanhalingstekens waarbij de apostrof bij je bericht hoort.",
      '_stdout.splitlines() == ["Harbor", "Harbor", "It\'s boarding time"]',
      "Double quotes around the whole message leave the apostrophe inside it.",
      "Met dubbele aanhalingstekens rond het hele bericht blijft de apostrof erin staan.",
      "Keep the first two messages and check the apostrophe, spaces and capitals in the third.",
      "Laat de eerste twee berichten staan en controleer de apostrof, spaties en hoofdletters in het derde.",
    ),
  ],
  solutionNote: loc(
    "The two Harbor strings hold the same text despite their different delimiters. Double quotes around the last message let the apostrophe remain an ordinary character.",
    "De twee Harbor-strings bevatten dezelfde tekst, ondanks hun verschillende begrenzing. Door dubbele aanhalingstekens om het laatste bericht is de apostrof een gewoon teken.",
  ),
});

G(g, 5, {
  titleNl: "Variabelen en namen",
  intro: loc(
    "Programs need to refer to information more than once. A variable gives a value a name. Instead of repeating a destination throughout your program, you can store it once and use its name whenever you need the current value.",
    "Programma's gebruiken dezelfde informatie vaak meerdere keren. Een variabele geeft een waarde een naam. In plaats van een bestemming steeds te herhalen, kun je deze opslaan en de naam gebruiken wanneer je de huidige waarde nodig hebt.",
  ),
  sections: [
    S(
      "Assign, then use",
      "Toewijzen en gebruiken",
      "In an assignment, `=` associates the name on the left with the value on the right. It does not print anything. To display the value, pass the unquoted variable name to `print()`. Quoting the name would display those letters instead.",
      "Bij een toewijzing koppelt `=` de naam links aan de waarde rechts. Dit drukt niets af. Geef de variabelenaam zonder aanhalingstekens aan `print()` om de waarde te tonen. Met aanhalingstekens zou je juist de letters van de naam tonen.",
      'status = "Ready"\nprint(status)\nprint("status")',
      "Ready\nstatus",
    ),
    S(
      "A name can refer to a new value",
      "Een naam kan een nieuwe waarde krijgen",
      "A later assignment to the same name replaces its current value. Earlier output stays as it was: Python does not go back and change text it already printed. Names are case-sensitive, cannot contain spaces and cannot start with a digit. Use descriptive names such as `arrival_station`.",
      "Een latere toewijzing aan dezelfde naam vervangt de huidige waarde. Eerdere output blijft staan: Python verandert tekst die al is afgedrukt niet achteraf. Namen zijn hoofdlettergevoelig, mogen geen spaties bevatten en mogen niet met een cijfer beginnen. Gebruik duidelijke namen, zoals `arrival_station`.",
      'status = "Ready"\nprint(status)\nstatus = "Boarding"\nprint(status)',
      "Ready\nBoarding",
      "Read each line in order and track the current value. This habit will help when programs grow longer.",
      "Lees de regels op volgorde en houd de huidige waarde bij. Die gewoonte helpt wanneer programma's langer worden.",
    ),
  ],
  starter:
    '# First destination: update the value and use the variable in print.\ndestination = "Unknown"\nprint("destination")\n\n# Update the same variable, then print it again below.\n',
  solution:
    'destination = "Delft"\nprint(destination)\ndestination = "Leiden"\nprint(destination)\n',
  steps: [
    T(
      "Assign the string `Delft` to `destination`, then print the variable. Do not put quotes around the variable name in the print call.",
      "Wijs de string `Delft` toe aan `destination` en druk de variabele af. Zet in de print-aanroep geen aanhalingstekens om de variabelenaam.",
      "_stdout.splitlines()[:1] == ['Delft'] and any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Name) and n.func.id == 'print' and any(isinstance(x, _ast.Name) and x.id == 'destination' for x in n.args) for n in _ast.walk(_ast.parse(_source)))",
      'The pattern is `name = "text"`, followed by `print(name)`.',
      'Het patroon is `naam = "tekst"`, gevolgd door `print(naam)`.',
      "Assign destination before using it, and pass the variable itself to print.",
      "Wijs destination een waarde toe voordat je deze gebruikt en geef de variabele zelf aan print.",
    ),
    T(
      "Below the first print call, assign `Leiden` to the same variable. Print it again. The output should show Delft followed by Leiden.",
      "Wijs onder de eerste print-aanroep `Leiden` toe aan dezelfde variabele. Druk deze opnieuw af. De output moet Delft tonen, gevolgd door Leiden.",
      "destination == 'Leiden' and _stdout.splitlines() == ['Delft', 'Leiden']",
      "Keep the original assignment and print. Add the new assignment after them.",
      "Laat de oorspronkelijke toewijzing en print staan. Voeg daarna de nieuwe toewijzing toe.",
      "The final destination must be Leiden, with both destinations printed in order.",
      "De eindwaarde van destination moet Leiden zijn, met beide bestemmingen in de juiste volgorde afgedrukt.",
    ),
  ],
  solutionNote: loc(
    "destination first refers to Delft and later to Leiden. Each print call reads the value at that moment. Reassigning the variable does not rewrite the first output line.",
    "destination verwijst eerst naar Delft en later naar Leiden. Elke print-aanroep leest de waarde van dat moment. Opnieuw toewijzen verandert de eerste outputregel niet.",
  ),
});

G(g, 6, {
  titleNl: "Foutmeldingen onderzoeken",
  intro: loc(
    "An error message is a clue about the instruction Python could not carry out. Read the last line for the error type and explanation, then inspect the indicated line in your file. Change one thing and run again: fixing one problem can reveal another.",
    "Een foutmelding geeft een aanwijzing over de instructie die Python niet kon uitvoeren. Lees de laatste regel voor het type fout en de uitleg. Bekijk daarna de aangewezen regel in je bestand. Verander één ding en voer opnieuw uit: na het oplossen van één probleem kan een volgend probleem zichtbaar worden.",
  ),
  sections: [
    S(
      "SyntaxError: Python cannot read the instruction",
      "SyntaxError: Python kan de instructie niet lezen",
      "A missing closing quote or parenthesis breaks Python's grammar. With a syntax error, Python cannot start executing this file. The marker shows where it noticed the problem, which can be just after the character you need to fix.",
      "Een ontbrekend aanhalingsteken of haakje maakt de Python-syntax ongeldig. Met een syntaxfout kan Python dit bestand niet uitvoeren. De markering wijst aan waar Python het probleem opmerkte; dat kan net na het teken zijn dat je moet herstellen.",
      'print("Ready")',
      "Ready",
      "Compare the matching pairs: the opening parenthesis has a closing parenthesis, and the opening quote has a closing quote.",
      "Vergelijk de paren: tegenover het openingshaakje staat een sluithaakje en tegenover het eerste aanhalingsteken staat een tweede.",
    ),
    S(
      "NameError: Python cannot find the name",
      "NameError: Python kan de naam niet vinden",
      "The syntax of `print(message)` is valid, but Python needs an earlier assignment to `message`. A typo such as `mesage` refers to a different name. If you mean literal text instead of a variable, put it in quotes.",
      "De syntax van `print(message)` is geldig, maar Python heeft eerst een toewijzing aan `message` nodig. Een typefout zoals `mesage` verwijst naar een andere naam. Bedoel je letterlijke tekst in plaats van een variabele, zet die dan tussen aanhalingstekens.",
      'message = "Doors closing"\nprint(message)',
      "Doors closing",
    ),
  ],
  starter: 'print("Gate open)\nmessage = "Welcome aboard"\nprint(mesage)\n',
  solution: 'print("Gate open")\nmessage = "Welcome aboard"\nprint(message)\n',
  steps: [
    T(
      "Run the broken starter and read the SyntaxError. Repair the first line's quotation marks. Run again: the new error will point to a misspelled name. Both checks become green after the whole file runs successfully.",
      "Voer de kapotte startcode uit en lees de SyntaxError. Herstel de aanhalingstekens op de eerste regel. Voer opnieuw uit: de nieuwe fout wijst naar een verkeerd gespelde naam. Beide controles worden groen zodra het hele bestand succesvol draait.",
      "_stdout.splitlines()[:1] == ['Gate open']",
      'Compare your first line with `print("Ready")`. Every opened quote needs a matching closing quote.',
      'Vergelijk je eerste regel met `print("Ready")`. Elk geopend aanhalingsteken heeft een passend sluitend teken nodig.',
      "Repair the string on line 1, then fix the remaining NameError so the whole program can run.",
      "Herstel de string op regel 1 en daarna de resterende NameError, zodat het hele programma kan draaien.",
    ),
    T(
      "Fix the misspelled variable in the last print call without changing the assignment to `message`. Run again. The two lines must be Gate open and Welcome aboard.",
      "Herstel de verkeerd gespelde variabele in de laatste print-aanroep, zonder de toewijzing aan `message` te veranderen. Voer opnieuw uit. De twee regels moeten Gate open en Welcome aboard zijn.",
      "message == 'Welcome aboard' and _stdout.splitlines() == ['Gate open', 'Welcome aboard'] and any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Name) and n.func.id == 'print' and any(isinstance(x, _ast.Name) and x.id == 'message' for x in n.args) for n in _ast.walk(_ast.parse(_source)))",
      "Compare the spelling of the name in the assignment with the name inside the last print call.",
      "Vergelijk de spelling van de naam in de toewijzing met de naam in de laatste print-aanroep.",
      "Print the existing message variable, with exactly the same spelling as its assignment.",
      "Druk de bestaande variabele message af, met precies dezelfde spelling als in de toewijzing.",
    ),
  ],
  solutionNote: loc(
    "First the closing quote repairs the grammar. Python can then run far enough to expose mesage, a name never assigned. Correcting it to message retrieves the stored text. The two errors have different causes even though both stop a run.",
    "Eerst herstelt het afsluitende aanhalingsteken de syntax. Python kan daarna ver genoeg uitvoeren om mesage tegen te komen, een naam die nooit is toegewezen. Met message haal je de opgeslagen tekst op. Beide fouten stoppen een uitvoering, maar hebben een andere oorzaak.",
  ),
});

G(g, 7, {
  titleNl: "Gehele en decimale getallen",
  intro: loc(
    "A passenger count and a travel distance are both numbers, but they represent different kinds of information. Python uses integers (`int`) for whole numbers and floating-point numbers (`float`) for values such as 7.5. Numeric literals are written without quotes.",
    "Een aantal passagiers en een reisafstand zijn allebei getallen, maar stellen andere informatie voor. Python gebruikt integers (`int`) voor gehele getallen en floating-point-getallen (`float`) voor waarden zoals 7.5. Je schrijft getallen zonder aanhalingstekens.",
  ),
  sections: [
    S(
      "Choose the value that fits",
      "Kies een passende waarde",
      "An integer can be positive, zero or negative. A literal with a decimal point is a float, even if its fractional part is zero: `3.0` differs in type from `3`. Python uses a point for decimals, not a comma.",
      "Een integer kan positief, nul of negatief zijn. Een getal met een decimale punt is een float, ook als het deel achter de punt nul is: `3.0` heeft een ander type dan `3`. Python gebruikt een punt voor decimalen, geen komma.",
      "seats = 18\ndistance = 4.75\nprint(seats)\nprint(distance)",
      "18\n4.75",
    ),
    S(
      "Numbers versus text",
      "Getallen tegenover tekst",
      'Quotation marks change the meaning. `"12"` is text; `12` is a number you can calculate with. Floats are useful approximations, but many decimal fractions cannot be stored exactly. Keep this in mind for later calculations; you do not need to solve that limitation in this task.',
      'Aanhalingstekens veranderen de betekenis. `"12"` is tekst; `12` is een getal waarmee je kunt rekenen. Floats zijn bruikbare benaderingen, maar veel decimale breuken kunnen niet exact worden opgeslagen. Houd dit in gedachten bij latere berekeningen; in deze opdracht hoef je die beperking niet op te lossen.',
      'print(12 + 3)\nprint("12" + "3")',
      "15\n123",
      "For numbers, + adds. For strings, it joins text. We will examine both operations in the next lessons.",
      "Bij getallen telt + op. Bij strings voegt + tekst samen. In de volgende lessen bekijken we beide bewerkingen.",
    ),
  ],
  starter:
    "# These placeholder values need the real passenger information.\npassenger_count = 0\ndistance = 0.0\nprint(passenger_count)\nprint(distance)\n",
  solution:
    "passenger_count = 24\ndistance = 7.5\nprint(passenger_count)\nprint(distance)\n",
  steps: [
    T(
      "Create `passenger_count` with the integer value `24`. Print it on the first line.",
      "Maak `passenger_count` met de integerwaarde `24`. Druk deze af op de eerste regel.",
      "type(passenger_count) is int and passenger_count == 24 and _stdout.splitlines()[:1] == ['24']",
      "Write the number without quotes or a decimal point.",
      "Schrijf het getal zonder aanhalingstekens of decimale punt.",
      "Use the integer 24, not the string '24' or the float 24.0, and print it first.",
      "Gebruik de integer 24, niet de string '24' of de float 24.0, en druk deze als eerste af.",
    ),
    T(
      "Create `distance` with the float value `7.5`. Print it after the passenger count. Keep the two values on separate output lines.",
      "Maak `distance` met de floatwaarde `7.5`. Druk deze na het aantal passagiers af. Zet de twee waarden op afzonderlijke outputregels.",
      "type(distance) is float and distance == 7.5 and _stdout.splitlines() == ['24', '7.5']",
      "Use a decimal point. Add a separate print call after the first one.",
      "Gebruik een decimale punt. Voeg na de eerste print-aanroep een aparte aanroep toe.",
      "distance must be the numeric value 7.5, printed on the second line.",
      "distance moet de numerieke waarde 7.5 zijn, afgedrukt op de tweede regel.",
    ),
  ],
  solutionNote: loc(
    "The passenger count is a whole-number count, so it is an int. The distance includes a fraction, so it is a float. Printing the values does not change their types.",
    "Het aantal passagiers is een geheel aantal en dus een int. De afstand bevat een breukdeel en is daarom een float. Afdrukken verandert de types niet.",
  ),
});

G(g, 8, {
  titleNl: "Rekenen met expressies",
  intro: loc(
    "An expression combines values and operators to produce a result. Python can add with `+`, subtract with `-`, multiply with `*` and divide with `/`. You can print a calculation directly or assign its result to a useful name.",
    "Een expressie combineert waarden en operators tot een resultaat. Python telt op met `+`, trekt af met `-`, vermenigvuldigt met `*` en deelt met `/`. Je kunt een berekening direct afdrukken of het resultaat aan een handige naam toewijzen.",
  ),
  sections: [
    S(
      "Order changes the result",
      "De volgorde verandert het resultaat",
      "Multiplication and division happen before addition and subtraction. Parentheses make a group that is evaluated first. Predict these two results before reading the output: only the parentheses change.",
      "Vermenigvuldigen en delen gaan vóór optellen en aftrekken. Haakjes maken een groep die eerst wordt uitgerekend. Voorspel de twee resultaten voordat je de output leest: alleen de haakjes verschillen.",
      "print(2 + 3 * 4)\nprint((2 + 3) * 4)",
      "14\n20",
      "The first expression adds 2 to 12. The second multiplies 5 by 4. Writing spaces around an operator improves readability but does not change precedence.",
      "De eerste expressie telt 2 op bij 12. De tweede vermenigvuldigt 5 met 4. Spaties rond een operator maken de code leesbaarder, maar veranderen de rekenvolgorde niet.",
    ),
    S(
      "Division and units",
      "Delen en eenheden",
      "The `/` operator produces a float, including when the division is exact. Dividing by zero raises `ZeroDivisionError`. In your task, calculate minutes first, then convert that value to seconds. Keeping track of the units helps you choose the correct operation.",
      "De operator `/` geeft een float, ook wanneer de deling precies uitkomt. Delen door nul veroorzaakt `ZeroDivisionError`. Bereken in je opdracht eerst minuten en zet die waarde daarna om naar seconden. Door de eenheden bij te houden kies je makkelijker de juiste bewerking.",
      "print(12 / 3)\nprint(7 / 2)",
      "4.0\n3.5",
    ),
  ],
  starter:
    "# A journey has three 15-minute segments and one 5-minute wait.\nsegments = 3\nminutes_per_segment = 15\nwait = 5\n\n# Replace 0 with a calculation using the journey data.\nduration = 0\nprint(duration)\n\n# Convert the minutes to seconds.\nduration_seconds = 0\nprint(duration_seconds)\n",
  solution:
    "duration = 3 * 15 + 5\nprint(duration)\nduration_seconds = duration * 60\nprint(duration_seconds)\n",
  steps: [
    T(
      "A journey has three 15-minute segments and one 5-minute wait. Calculate `duration` using multiplication and addition, then print the total minutes.",
      "Een reis bestaat uit drie stukken van 15 minuten en één wachttijd van 5 minuten. Bereken `duration` met vermenigvuldigen en optellen en druk het totaal in minuten af.",
      `duration == 50 and _stdout.splitlines()[:1] == ['50'] and ${assigns("duration", "Add")}`,
      "Multiply the number of segments by their length, then add the single wait. Do not add the wait three times.",
      "Vermenigvuldig het aantal stukken met hun duur en tel daarna de ene wachttijd op. Tel de wachttijd niet drie keer mee.",
      "Use an arithmetic expression for duration. The total should be 50 minutes.",
      "Gebruik een rekenexpressie voor duration. Het totaal moet 50 minuten zijn.",
    ),
    T(
      "Calculate `duration_seconds` from `duration`: there are 60 seconds in a minute. Print the result on the second line.",
      "Bereken `duration_seconds` vanuit `duration`: er zitten 60 seconden in een minuut. Druk het resultaat op de tweede regel af.",
      `duration_seconds == 3000 and _stdout.splitlines() == ['50', '3000'] and ${assigns("duration_seconds", "Mult", ["duration"])}`,
      "Multiply the stored duration by 60 rather than retyping the journey calculation.",
      "Vermenigvuldig de opgeslagen duur met 60 in plaats van de reisberekening opnieuw te typen.",
      "Store 3000 in duration_seconds using multiplication and print it after the minutes.",
      "Sla met een vermenigvuldiging 3000 op in duration_seconds en druk dit na de minuten af.",
    ),
  ],
  solutionNote: loc(
    "Multiplication calculates the 45 travel minutes before the five-minute wait is added. Multiplying the resulting duration by 60 converts minutes to seconds without duplicating the first formula.",
    "De vermenigvuldiging berekent eerst de 45 reisminuten, waarna vijf minuten wachttijd worden opgeteld. Door duration met 60 te vermenigvuldigen zet je minuten om naar seconden zonder de eerste formule te herhalen.",
  ),
});

G(g, 9, {
  titleNl: "Waarden opnieuw berekenen",
  intro: loc(
    "Assignment stores the result of an expression at that moment. It does not create a live spreadsheet formula. If a value used in the calculation changes later, you must run the calculation again to obtain an updated result.",
    "Een toewijzing slaat het resultaat van een expressie op dat moment op. Er ontstaat geen formule die automatisch wordt bijgewerkt zoals in een spreadsheet. Verandert later een gebruikte waarde, dan moet je de berekening opnieuw uitvoeren om een bijgewerkt resultaat te krijgen.",
  ),
  sections: [
    S(
      "Stored results do not update themselves",
      "Opgeslagen resultaten veranderen niet vanzelf",
      "Trace the current value of each name after every line. Changing `tickets` does not change the already calculated `cost`.",
      "Houd na iedere regel de huidige waarde van elke naam bij. Het veranderen van `tickets` verandert de al berekende `cost` niet.",
      "tickets = 2\nprice = 4\ncost = tickets * price\ntickets = 3\nprint(cost)\ncost = tickets * price\nprint(cost)",
      "8\n12",
      "Only the second assignment to cost uses the new ticket count. The first printed result still reflects two tickets.",
      "Pas de tweede toewijzing aan cost gebruikt het nieuwe aantal kaartjes. Het eerste afgedrukte resultaat hoort nog bij twee kaartjes.",
    ),
    S(
      "Using the old value in a new assignment",
      "De oude waarde gebruiken bij een nieuwe toewijzing",
      "In `score = score + 2`, Python reads the old score, adds 2, and associates the resulting value with the name score. Assignment is not an algebraic equation: the right side is evaluated before the name on the left is updated.",
      "Bij `score = score + 2` leest Python de oude score, telt 2 op en koppelt het resultaat aan de naam score. Een toewijzing is geen wiskundige vergelijking: de rechterkant wordt uitgerekend voordat de naam links wordt bijgewerkt.",
      "score = 10\nscore = score + 2\nprint(score)",
      "12",
    ),
  ],
  starter:
    "# Original order: correct the quantity and fill in the calculation.\nkits = 0\nprice = 8\noriginal_total = 0\nprint(original_total)\n\n# A customer adds another kit. Update kits here.\n\n# Recalculate from the current data.\nupdated_total = 0\nprint(updated_total)\n",
  solution:
    "kits = 3\nprice = 8\noriginal_total = kits * price\nprint(original_total)\nkits = kits + 1\nupdated_total = kits * price\nprint(updated_total)\n",
  steps: [
    T(
      "An order starts with 3 kits at 8 euros each. Assign `kits = 3` and `price = 8`, then calculate `original_total = kits * price` and print it.",
      "Een bestelling begint met 3 kits van 8 euro per stuk. Wijs `kits = 3` en `price = 8` toe, bereken `original_total = kits * price` en druk dit af.",
      "price == 8 and original_total == 24 and _stdout.splitlines()[:1] == ['24']",
      "Calculate the original total before changing kits.",
      "Bereken het oorspronkelijke totaal voordat je kits verandert.",
      "original_total should remain 24 and be printed first.",
      "original_total moet 24 blijven en als eerste worden afgedrukt.",
    ),
    T(
      "Below the original calculation, increase `kits` by 1 using `kits = kits + 1`. Keep `original_total` unchanged.",
      "Verhoog onder de oorspronkelijke berekening `kits` met 1 via `kits = kits + 1`. Laat `original_total` ongewijzigd.",
      `kits == 4 and original_total == 24 and ${assigns("kits", "Add", ["kits"])}`,
      "Use kits on both sides of the assignment. The right side reads its previous value.",
      "Gebruik kits aan beide kanten van de toewijzing. Rechts wordt de vorige waarde gelezen.",
      "Update kits with addition; the final count is 4 and the original total stays 24.",
      "Werk kits bij met een optelling; het uiteindelijke aantal is 4 en het oorspronkelijke totaal blijft 24.",
    ),
    T(
      "Calculate `updated_total` from the current `kits` and `price`, then print it on the second line. Compare the old and new totals.",
      "Bereken `updated_total` met de huidige `kits` en `price` en druk dit op de tweede regel af. Vergelijk het oude en nieuwe totaal.",
      `updated_total == 32 and _stdout.splitlines() == ['24', '32'] and ${assigns("updated_total", "Mult", ["kits", "price"])}`,
      "Reuse the multiplication with the same names after increasing kits.",
      "Gebruik na het verhogen van kits opnieuw de vermenigvuldiging met dezelfde namen.",
      "Recalculate the order after the change. The output should be 24, then 32.",
      "Bereken de bestelling opnieuw na de wijziging. De output moet 24 zijn, gevolgd door 32.",
    ),
  ],
  solutionNote: loc(
    "original_total preserves the first calculation. Increasing kits updates only kits. The later multiplication uses the new count and produces updated_total, so both snapshots can be displayed.",
    "original_total bewaart de eerste berekening. Het verhogen van kits verandert alleen kits. De latere vermenigvuldiging gebruikt het nieuwe aantal voor updated_total, zodat je beide momenten kunt tonen.",
  ),
});

G(g, 10, {
  titleNl: "Machtsverheffen",
  intro: loc(
    "Repeated multiplication appears in areas, volumes and growth. Python's `**` operator raises a number to a power: the left value is the base and the right value is the exponent. `3 ** 2` means 3 multiplied by itself, not 3 multiplied by 2.",
    "Herhaald vermenigvuldigen komt voor bij oppervlakten, volumes en groei. Met `**` verhef je een getal tot een macht: links staat het grondtal en rechts de exponent. `3 ** 2` betekent 3 met zichzelf vermenigvuldigen, niet 3 keer 2.",
  ),
  sections: [
    S(
      "Squares, cubes and roots",
      "Kwadraten, derde machten en wortels",
      "Squaring a side length gives the area of a square; cubing it gives the volume of a cube. A fractional exponent can calculate a root for a positive number. The `^` character is a different Python operator and does not calculate a power.",
      "Het kwadraat van een zijde geeft de oppervlakte van een vierkant; de derde macht geeft het volume van een kubus. Met een gebroken exponent kun je bij een positief getal een wortel berekenen. Het teken `^` is in Python een andere operator en berekent geen macht.",
      "print(5 ** 2)\nprint(5 ** 3)\nprint(25 ** 0.5)",
      "25\n125\n5.0",
    ),
    S(
      "A doubling pattern",
      "Een verdubbelingspatroon",
      "A storage demonstration starts with one unit and doubles it at each stage. After one stage there are 2 units; after two stages there are 4; after three there are 8. A power describes the whole pattern without writing a long chain of multiplications.",
      "Een opslagdemonstratie begint met één eenheid en verdubbelt deze bij iedere stap. Na één stap zijn er 2 eenheden, na twee stappen 4 en na drie stappen 8. Een macht beschrijft het hele patroon zonder een lange rij vermenigvuldigingen.",
    ),
  ],
  starter:
    "# These formulas multiply once, but the task needs powers.\ncapacity = 2 * 10\nprint(capacity)\n\npanel_area = 6 * 2\nprint(panel_area)\n",
  solution:
    "capacity = 2 ** 10\nprint(capacity)\npanel_area = 6 ** 2\nprint(panel_area)\n",
  steps: [
    T(
      "Calculate `capacity` after ten doublings using `2 ** 10`. Print the result.",
      "Bereken `capacity` na tien verdubbelingen met `2 ** 10`. Druk het resultaat af.",
      `capacity == 1024 and _stdout.splitlines()[:1] == ['1024'] and ${assigns("capacity", "Pow")}`,
      "The base is 2 and the exponent is 10. Use two adjacent asterisks.",
      "Het grondtal is 2 en de exponent is 10. Gebruik twee sterretjes direct naast elkaar.",
      "Use exponentiation for capacity; the result must be 1024.",
      "Gebruik machtsverheffing voor capacity; het resultaat moet 1024 zijn.",
    ),
    T(
      "A square panel has sides of length 6. Calculate `panel_area` with exponentiation and print it on the second line.",
      "Een vierkant paneel heeft zijden van lengte 6. Bereken `panel_area` met machtsverheffing en druk dit af op de tweede regel.",
      `panel_area == 36 and _stdout.splitlines() == ['1024', '36'] and ${assigns("panel_area", "Pow")}`,
      "An area uses the second power, not the third.",
      "Een oppervlakte gebruikt de tweede macht, niet de derde.",
      "Square the side length with **. The second output line should be 36.",
      "Kwadrateer de zijde met **. De tweede outputregel moet 36 zijn.",
    ),
  ],
  solutionNote: loc(
    "2 ** 10 represents ten factors of 2. The panel uses 6 ** 2 because an area multiplies two lengths. Both expressions use the same operator for different modelling problems.",
    "2 ** 10 staat voor tien factoren van 2. Voor het paneel gebruik je 6 ** 2 omdat een oppervlakte twee lengtes vermenigvuldigt. Beide expressies gebruiken dezelfde operator voor verschillende situaties.",
  ),
});

G(g, 11, {
  titleNl: "Wat blijft er over?",
  intro: loc(
    "Division can tell us the size of a share, but sometimes we need to know what remains after making whole groups. The modulo operator `%` returns that remainder. It is not a percentage calculation.",
    "Een deling kan vertellen hoe groot een aandeel is, maar soms willen we weten wat er overblijft nadat we hele groepen hebben gemaakt. De modulo-operator `%` geeft die rest terug. Het is geen percentageberekening.",
  ),
  sections: [
    S(
      "Count complete groups first",
      "Tel eerst de volledige groepen",
      "With 17 items and boxes of 5, three full boxes use 15 items. The remainder is 2. If the items fit exactly, the remainder is zero. For positive integers, the remainder is always smaller than the divisor.",
      "Met 17 items en dozen van 5 gebruiken drie volle dozen 15 items. De rest is 2. Als de items precies passen, is de rest nul. Bij positieve gehele getallen is de rest altijd kleiner dan de deler.",
      "print(17 % 5)\nprint(20 % 5)",
      "2\n0",
    ),
    S(
      "Repeating patterns",
      "Herhalende patronen",
      "Modulo also helps with cycles: dividing a number by 2 leaves 0 for an even number and 1 for an odd number. Later you will use comparisons to make decisions with those remainders. For now, practise calculating and interpreting them.",
      "Modulo helpt ook bij patronen: delen door 2 laat bij een even getal 0 over en bij een oneven getal 1. Later gebruik je vergelijkingen om met deze resten beslissingen te nemen. Oefen nu eerst met het berekenen en begrijpen van de rest.",
      "print(8 % 2)\nprint(9 % 2)",
      "0\n1",
    ),
  ],
  starter:
    "# A packing machine fills boxes with six items each.\nitems = 29\nbox_size = 6\n\n# Replace each placeholder with the calculation for that step.\nleftover = 0\nprint(leftover)\n\nitems_added = 0\nprint(items_added)\n\nnew_leftover = 0\nprint(new_leftover)\n\nparity_remainder = 0\nprint(parity_remainder)\n",
  solution:
    "leftover = 29 % 6\nprint(leftover)\nitems_added = 6 - leftover\nprint(items_added)\nnew_leftover = (29 + items_added) % 6\nprint(new_leftover)\nparity_remainder = 29 % 2\nprint(parity_remainder)\n",
  steps: [
    T(
      "Pack 29 items into boxes of 6. Calculate `leftover` using `%` and print it.",
      "Verpak 29 items in dozen van 6. Bereken `leftover` met `%` en druk de rest af.",
      `leftover == 5 and _stdout.splitlines()[:1] == ['5'] and ${assigns("leftover", "Mod")}`,
      "Four full boxes use 24 items. Ask what remains from 29.",
      "Vier volle dozen gebruiken 24 items. Bepaal wat er van 29 overblijft.",
      "leftover must be the remainder 5, calculated with %.",
      "leftover moet de rest 5 zijn, berekend met %.",
    ),
    T(
      "How many extra items fill the incomplete box? Calculate `items_added` as `6 - leftover` and print it next.",
      "Hoeveel extra items vullen de onvolledige doos? Bereken `items_added` als `6 - leftover` en druk dit daarna af.",
      "items_added == 1 and _stdout.splitlines()[:2] == ['5', '1']",
      "The partly filled box already has five of its six items.",
      "De gedeeltelijk gevulde doos heeft al vijf van de zes items.",
      "Only one extra item is needed; print 1 after the remainder.",
      "Er is maar één extra item nodig; druk 1 af na de rest.",
    ),
    T(
      "Calculate `new_leftover` from `(29 + items_added) % 6` and print it. A zero remainder means every box is full.",
      "Bereken `new_leftover` met `(29 + items_added) % 6` en druk deze af. Een rest van nul betekent dat elke doos vol is.",
      `new_leftover == 0 and _stdout.splitlines()[:3] == ['5', '1', '0'] and ${assigns("new_leftover", "Mod")}`,
      "Group the addition in parentheses before applying modulo.",
      "Zet de optelling tussen haakjes voordat je modulo toepast.",
      "The new total is 30, which leaves zero when divided into groups of six.",
      "Het nieuwe totaal is 30; dat laat nul over bij groepen van zes.",
    ),
    T(
      "Finally, calculate `parity_remainder = 29 % 2` and print it on a fourth line. Does the result describe an even or an odd number?",
      "Bereken tot slot `parity_remainder = 29 % 2` en druk deze op een vierde regel af. Beschrijft de uitkomst een even of een oneven getal?",
      "parity_remainder == 1 and _stdout.splitlines() == ['5','1','0','1']",
      "An odd number leaves one item when divided into pairs.",
      "Een oneven getal laat één item over als je paren maakt.",
      "The four output lines should be 5, 1, 0 and 1.",
      "De vier outputregels moeten 5, 1, 0 en 1 zijn.",
    ),
  ],
  solutionNote: loc(
    "29 is four groups of six with five left over. Adding one makes 30, or five complete groups. The final modulo uses groups of two instead: a remainder of one identifies 29 as odd.",
    "29 bestaat uit vier groepen van zes met vijf over. Eén toevoegen maakt 30: vijf volledige groepen. De laatste modulo gebruikt groepen van twee; een rest van één laat zien dat 29 oneven is.",
  ),
});

G(g, 12, {
  titleNl: "Tekst samenvoegen",
  intro: loc(
    "The same operator can have different meanings for different types. With numbers, `+` adds. With strings, `+` joins the left text to the right text. This operation is called concatenation and produces a new string.",
    "Dezelfde operator kan voor verschillende types iets anders betekenen. Bij getallen telt `+` op. Bij strings voegt `+` de rechtertekst aan de linkertekst toe. Dit heet concatenatie en levert een nieuwe string op.",
  ),
  sections: [
    S(
      "You control the separators",
      "Jij bepaalt de scheiding",
      "Python does not insert spaces when you concatenate strings. Include every space and punctuation mark you want in the result. The original strings keep their values unless you assign a new value to their names.",
      "Python voegt bij het samenvoegen geen spaties in. Neem alle gewenste spaties en leestekens op in de strings. De oorspronkelijke strings behouden hun waarde, tenzij je een nieuwe waarde aan hun namen toewijst.",
      'first = "Gate"\nsecond = "B"\nprint(first + second)\nprint(first + " " + second)',
      "GateB\nGate B",
    ),
    S(
      "Joining a number to text",
      "Een getal aan tekst toevoegen",
      "A string and an integer cannot be joined directly with `+`; that raises `TypeError`. Convert the number with `str()` when building a single string. Passing separate values to `print()` with commas is another way to display them, but does not store a combined string for later use.",
      "Een string en een integer kun je niet direct met `+` samenvoegen; dat geeft `TypeError`. Zet het getal om met `str()` wanneer je één string wilt opbouwen. Met komma's kun je ook losse waarden aan `print()` geven, maar daarmee sla je geen gecombineerde string op voor later gebruik.",
      'platform = 3\nnotice = "Platform " + str(platform)\nprint(notice)\nprint("Platform", platform)',
      "Platform 3\nPlatform 3",
    ),
  ],
  starter:
    'origin = "North"\ndestination = "Pier"\nplatform = 4\n\n# Extend each expression to build the complete message.\nroute = origin\nprint(route)\n\nannouncement = route\nprint(announcement)\n',
  solution:
    'origin = "North"\ndestination = "Pier"\nplatform = 4\nroute = origin + " → " + destination\nprint(route)\nannouncement = route + " | Platform " + str(platform)\nprint(announcement)\n',
  steps: [
    T(
      "Build `route` from `origin`, a separator ` → ` with spaces, and `destination`. Print the result: North → Pier.",
      "Bouw `route` op uit `origin`, het scheidingsteken ` → ` met spaties en `destination`. Druk het resultaat af: North → Pier.",
      `route == 'North → Pier' and _stdout.splitlines()[:1] == ['North → Pier'] and ${assigns("route", "Add", ["origin", "destination"])}`,
      "Use + between the three strings. Include a space on both sides of the arrow.",
      "Gebruik + tussen de drie strings. Zet aan beide kanten van de pijl een spatie.",
      "Combine the strings into route and check the spaces around the arrow.",
      "Voeg de strings samen in route en controleer de spaties rond de pijl.",
    ),
    T(
      "Build `announcement` by joining `route`, ` | Platform ` and the string form of `platform`. Print it on the second line. Keep platform as an integer.",
      "Bouw `announcement` op door `route`, ` | Platform ` en de stringvorm van `platform` samen te voegen. Druk dit op de tweede regel af. Laat platform een integer blijven.",
      "type(platform) is int and platform == 4 and announcement == 'North → Pier | Platform 4' and _stdout.splitlines() == ['North → Pier', announcement]",
      "Use str(platform) inside the concatenation. You do not need to reassign platform.",
      "Gebruik str(platform) binnen de concatenatie. Je hoeft platform niet opnieuw toe te wijzen.",
      "Convert the number while building announcement; its exact value should be North → Pier | Platform 4.",
      "Zet het getal om tijdens het opbouwen van announcement; de exacte waarde moet North → Pier | Platform 4 zijn.",
    ),
  ],
  solutionNote: loc(
    "route joins three pieces of text, including the spaces around the arrow. str(platform) creates text for the announcement without changing the original numeric platform variable.",
    "route voegt drie stukken tekst samen, inclusief de spaties rond de pijl. str(platform) maakt tekst voor de aankondiging zonder de oorspronkelijke numerieke variabele platform te veranderen.",
  ),
});

G(g, 13, {
  titleNl: "Waarden stapsgewijs bijwerken",
  intro: loc(
    "Updating an existing value is so common that Python provides a shorter assignment form. For the numbers and strings in this lesson, `value += change` has the same effect as `value = value + change`. The name must already have a value.",
    "Het bijwerken van een bestaande waarde komt zo vaak voor dat Python er een kortere toewijzing voor heeft. Voor de getallen en strings in deze les doet `value += change` hetzelfde als `value = value + change`. De naam moet al een waarde hebben.",
  ),
  sections: [
    S(
      "Accumulate one update at a time",
      "Werk één wijziging tegelijk bij",
      "Each `+=` starts with the current value, not the original one. Related forms include `-=` for subtraction and `*=` for multiplication. Keep the operator and equals sign together.",
      "Elke `+=` begint met de huidige waarde, niet met de oorspronkelijke. Vergelijkbare vormen zijn `-=` voor aftrekken en `*=` voor vermenigvuldigen. Schrijf de operator en het gelijkteken direct naast elkaar.",
      "balance = 10\nbalance += 3\nbalance += 4\nprint(balance)",
      "17",
      "The value moves from 10 to 13 to 17. Replacing the second update with balance = 4 would discard the accumulated amount.",
      "De waarde gaat van 10 naar 13 naar 17. Vervang je de tweede wijziging door balance = 4, dan verdwijnt het opgebouwde bedrag.",
    ),
    S(
      "The same pattern works for strings",
      "Hetzelfde patroon werkt met strings",
      "With strings, `+=` adds text to the end and assigns the joined result back to the name. It still inserts no automatic spaces. Decide which side of the join supplies the space.",
      "Bij strings voegt `+=` tekst aan het einde toe en wijst het samengevoegde resultaat opnieuw aan de naam toe. Er komen nog steeds geen automatische spaties bij. Bepaal welk deel van de samenvoeging de spatie bevat.",
      'status = "Gate"\nstatus += " open"\nprint(status)',
      "Gate open",
    ),
  ],
  starter:
    'energy = 12\nstatus = "Charge"\n\n# First charging session: add 8 before printing.\nprint(energy)\n\n# Second charging session: add 5 before printing.\nprint(energy)\n\n# Extend the status message before printing.\nprint(status)\n',
  solution:
    'energy = 12\nstatus = "Charge"\nenergy += 8\nprint(energy)\nenergy += 5\nprint(energy)\nstatus += " complete"\nprint(status)\n',
  steps: [
    T(
      "Increase `energy` by 8 using `+=` and print the updated value. Keep the starter value 12.",
      "Verhoog `energy` met 8 via `+=` en druk de bijgewerkte waarde af. Laat de startwaarde 12 staan.",
      "_stdout.splitlines()[:1] == ['20'] and any(isinstance(n,_ast.AugAssign) and isinstance(n.target,_ast.Name) and n.target.id == 'energy' and isinstance(n.op,_ast.Add) for n in _ast.walk(_ast.parse(_source)))",
      "Place energy += 8 after the starting assignment.",
      "Zet energy += 8 na de starttoewijzing.",
      "Use += on energy, then print the intermediate value 20.",
      "Gebruik += bij energy en druk daarna de tussenwaarde 20 af.",
    ),
    T(
      "Add another 5 to `energy` with a second `+=` statement and print it again. Keep the earlier update and print call.",
      "Tel met een tweede `+=` nog 5 op bij `energy` en druk deze opnieuw af. Laat de eerdere wijziging en print-aanroep staan.",
      "energy == 25 and _stdout.splitlines()[:2] == ['20','25'] and sum(isinstance(n,_ast.AugAssign) and isinstance(n.target,_ast.Name) and n.target.id == 'energy' and isinstance(n.op,_ast.Add) for n in _ast.walk(_ast.parse(_source))) >= 2",
      "The second update begins with 20, so do not reset energy to 12.",
      "De tweede wijziging begint met 20, dus zet energy niet terug naar 12.",
      "Keep both += updates and print 20 followed by 25.",
      "Laat beide +=-wijzigingen staan en druk 20 af, gevolgd door 25.",
    ),
    T(
      "Use `+=` to add ` complete` to `status`, including the leading space. Print status as the third line.",
      "Gebruik `+=` om ` complete` aan `status` toe te voegen, inclusief de spatie vooraan. Druk status af als derde regel.",
      "status == 'Charge complete' and _stdout.splitlines() == ['20','25','Charge complete'] and any(isinstance(n,_ast.AugAssign) and isinstance(n.target,_ast.Name) and n.target.id == 'status' and isinstance(n.op,_ast.Add) for n in _ast.walk(_ast.parse(_source)))",
      'Append the string with `status += " complete"`.',
      'Voeg de string toe met `status += " complete"`.',
      "Use += for the text update too, with one space between Charge and complete.",
      "Gebruik ook += voor de tekstwijziging, met één spatie tussen Charge en complete.",
    ),
  ],
  solutionNote: loc(
    "The numeric updates accumulate: 12 becomes 20, then 25. The string update joins text instead of adding numbers. Both forms require an existing value and store the new result back under the same name.",
    "De getalswijzigingen stapelen op: 12 wordt 20 en daarna 25. Bij de string wordt tekst samengevoegd in plaats van getallen opgeteld. Beide vormen hebben een bestaande waarde nodig en slaan het nieuwe resultaat onder dezelfde naam op.",
  ),
});

G(g, 14, {
  titleNl: "Strings op meerdere regels",
  intro: loc(
    "An announcement, address or short document may contain actual line breaks. Triple-quoted strings let a single string literal continue over several code lines. Use three matching single or double quotes at both ends.",
    "Een aankondiging, adres of kort document kan echte regeleinden bevatten. Met drie aanhalingstekens kan één string literal over meerdere coderegels doorlopen. Gebruik aan beide kanten drie passende enkele of dubbele aanhalingstekens.",
  ),
  sections: [
    S(
      "Line breaks are part of the value",
      "Regeleinden horen bij de waarde",
      "Everything inside the delimiters becomes part of the string, including newlines and indentation. Starting the text on the line after the opening quotes adds a leading newline. To avoid it, start the text immediately after the opening quotes.",
      "Alles binnen de begrenzing hoort bij de string, inclusief regeleinden en inspringing. Begin je de tekst op de regel na de openingsaanhalingstekens, dan voeg je een regeleinde vooraan toe. Begin de tekst direct na de aanhalingstekens om dit te voorkomen.",
      'notice = """Service update\nUse the side entrance"""\nprint(notice)',
      "Service update\nUse the side entrance",
    ),
    S(
      "Another way to represent a newline",
      "Een andere manier om een regeleinde te schrijven",
      "Inside an ordinary string, `\\n` represents a newline. Triple quotes are often easier to read for longer text. They can also contain ordinary quote marks. A triple-quoted string is still a string, not a comment. In specific positions it can document a module or function as a docstring; ordinary comments use `#`.",
      "Binnen een gewone string staat `\\n` voor een regeleinde. Drie aanhalingstekens maken langere tekst vaak beter leesbaar. Gewone aanhalingstekens kunnen er ook in staan. Zo'n string blijft een string en is geen comment. Op bepaalde posities kan deze een module of functie documenteren als docstring; gewone comments gebruiken `#`.",
      'print("Line one\\nLine two")',
      "Line one\nLine two",
    ),
  ],
  starter:
    '# This one-line placeholder needs the two-line announcement.\nbulletin = "Announcement pending"\n\n# Display the bulletin below.\n',
  solution:
    'bulletin = """Welcome aboard\nNext stop: Delft"""\nprint(bulletin)\n',
  steps: [
    T(
      "Create `bulletin` as a triple-quoted string with exactly two lines: `Welcome aboard` and `Next stop: Delft`. Do not add a blank line at either end.",
      "Maak `bulletin` als een string met drie aanhalingstekens en precies twee regels: `Welcome aboard` en `Next stop: Delft`. Voeg aan het begin en einde geen lege regel toe.",
      "bulletin == 'Welcome aboard\\nNext stop: Delft'",
      "Put the first word directly after the opening triple quotes and close the string directly after Delft.",
      "Zet het eerste woord direct na de drie openingsaanhalingstekens en sluit de string direct na Delft.",
      "Check the exact two lines and remove any leading or trailing newline or indentation.",
      "Controleer de twee exacte regels en verwijder regeleinden of inspringing aan het begin of einde.",
    ),
    T(
      "Print `bulletin` with one print call. Run the program and compare the output's two lines with the layout of your string.",
      "Druk `bulletin` met één print-aanroep af. Voer het programma uit en vergelijk de twee outputregels met de indeling van je string.",
      "_stdout == 'Welcome aboard\\nNext stop: Delft\\n' and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Name) and n.func.id == 'print' and any(isinstance(x,_ast.Name) and x.id == 'bulletin' for x in n.args) for n in _ast.walk(_ast.parse(_source)))",
      "Pass bulletin without quotes to print; the newline is already stored inside it.",
      "Geef bulletin zonder aanhalingstekens aan print; het regeleinde is al in de string opgeslagen.",
      "Print the bulletin variable itself, without extra messages or blank lines.",
      "Druk de variabele bulletin zelf af, zonder extra berichten of lege regels.",
    ),
  ],
  solutionNote: loc(
    "The internal newline separates the two announcement lines. print adds one final newline after the whole string. Keeping the text flush with the left edge avoids storing unintended indentation.",
    "Het interne regeleinde scheidt de twee aankondigingsregels. print voegt na de hele string nog één regeleinde toe. Door de tekst links te laten beginnen sla je geen onbedoelde inspringing op.",
  ),
});

G(g, 15, {
  titleNl: "Terugblik: van gegevens naar een bon",
  intro: loc(
    "You can now write a small program that turns named data into useful output. This review combines strings, numbers, arithmetic, assignment and text conversion. You will build a short order receipt, checking one part at a time.",
    "Je kunt nu een klein programma schrijven dat benoemde gegevens omzet in nuttige output. Deze terugblik combineert strings, getallen, rekenen, toewijzen en tekstomzetting. Je bouwt een korte bestelbon en controleert telkens één onderdeel.",
  ),
  sections: [
    S(
      "Plan before typing",
      "Maak een plan voordat je typt",
      "Separate the input data, the calculation and the presentation. Ask: which values are text, which are numbers, and which are calculated from other values? Store the result of a calculation rather than typing its answer by hand.",
      "Scheid de invoergegevens, de berekening en de presentatie. Vraag jezelf af: welke waarden zijn tekst, welke zijn getallen en welke worden uit andere waarden berekend? Sla het resultaat van een berekening op in plaats van het antwoord met de hand te typen.",
      'item = "Notebook"\nquantity = 2\nprice = 3.5\namount = quantity * price\nprint(item)\nprint("Total: " + str(amount))',
      "Notebook\nTotal: 7.0",
      "If the quantity changes, the same calculation can produce the new amount when you run the program. The displayed text is built from the calculated value.",
      "Als de hoeveelheid verandert, berekent dezelfde formule het nieuwe bedrag wanneer je het programma uitvoert. De getoonde tekst wordt opgebouwd uit de berekende waarde.",
    ),
    S(
      "A debugging checklist",
      "Een controlelijst bij fouten",
      "If the file will not run, check matching quotes and parentheses, then the spelling of names. If it runs but gives the wrong answer, trace assignments in order and check arithmetic precedence. If the number is right but the display is wrong, check spaces and whether you printed a name or quoted text.",
      "Als het bestand niet draait, controleer dan bij elkaar passende aanhalingstekens en haakjes en daarna de spelling van namen. Draait het wel maar klopt het antwoord niet, volg dan de toewijzingen op volgorde en controleer de rekenvolgorde. Klopt het getal maar niet de weergave, controleer dan spaties en of je een naam of tekst tussen aanhalingstekens afdrukt.",
    ),
  ],
  starter:
    '# Adapt this unfinished receipt for a sensor-kit order.\nlabel = "Notebook"\nunits = 2\nunit_price = 3.5\n\n# The total currently ignores the unit price. Repair the formula.\ntotal = units\n\n# Extend the summary to include the total amount.\nsummary = label\n\nprint(label)\nprint(total)\n# Print the complete summary below.\n',
  solution:
    'label = "Sensor kit"\nunits = 6\nunit_price = 4.5\ntotal = units * unit_price\nsummary = label + " | Total: " + str(total)\nprint(label)\nprint(total)\nprint(summary)\n',
  steps: [
    T(
      "Create the order data: `label` is the string `Sensor kit`, `units` is the integer `6`, and `unit_price` is the float `4.5`.",
      "Maak de bestelgegevens: `label` is de string `Sensor kit`, `units` is de integer `6` en `unit_price` is de float `4.5`.",
      "label == 'Sensor kit' and type(units) is int and units == 6 and type(unit_price) is float and unit_price == 4.5",
      "Only the label needs quotes. Use a decimal point in the price.",
      "Alleen het label heeft aanhalingstekens nodig. Gebruik een decimale punt in de prijs.",
      "Check the three names, values and types before calculating.",
      "Controleer de drie namen, waarden en types voordat je rekent.",
    ),
    T(
      "Calculate `total` by multiplying `units` by `unit_price`. Do not hard-code the result.",
      "Bereken `total` door `units` met `unit_price` te vermenigvuldigen. Typ het resultaat niet rechtstreeks in.",
      `total == 27.0 and ${assigns("total", "Mult", ["units", "unit_price"])}`,
      "The calculation should still work if you change units at the start of the program.",
      "De berekening moet blijven werken als je units aan het begin van het programma verandert.",
      "Use multiplication to store the numeric total 27.0.",
      "Gebruik een vermenigvuldiging om het numerieke totaal 27.0 op te slaan.",
    ),
    T(
      "Build `summary` by joining the label, ` | Total: ` and the string form of total. Its value should be `Sensor kit | Total: 27.0`.",
      "Bouw `summary` op uit het label, ` | Total: ` en de stringvorm van total. De waarde moet `Sensor kit | Total: 27.0` zijn.",
      "summary == 'Sensor kit | Total: 27.0'",
      "Use str(total) when joining the number to text.",
      "Gebruik str(total) wanneer je het getal aan tekst toevoegt.",
      "Check the separators and convert total to text when building summary.",
      "Controleer de scheidingstekens en zet total om naar tekst tijdens het opbouwen van summary.",
    ),
    T(
      "Print `label`, `total` and `summary` on three separate lines, in that order. After passing, try changing the quantity and predict the new result before running again.",
      "Druk `label`, `total` en `summary` op drie afzonderlijke regels af, in die volgorde. Verander na het slagen eens de hoeveelheid en voorspel het nieuwe resultaat voordat je opnieuw uitvoert.",
      "_stdout.splitlines() == ['Sensor kit','27.0','Sensor kit | Total: 27.0']",
      "Use one print call for each value. Restore the requested inputs if you want to check the original exercise again.",
      "Gebruik één print-aanroep per waarde. Herstel de gevraagde invoer als je de oorspronkelijke oefening opnieuw wilt controleren.",
      "The output must contain exactly the label, numeric total and full summary, in order.",
      "De output moet precies het label, het numerieke totaal en de volledige samenvatting bevatten, in die volgorde.",
    ),
  ],
  solutionNote: loc(
    "The data assignments come first because the multiplication needs their values. The summary uses str(total) to combine numeric information with text. The three print calls display different views of the same order.",
    "De gegevens worden eerst toegewezen omdat de vermenigvuldiging deze waarden nodig heeft. De samenvatting gebruikt str(total) om numerieke informatie met tekst te combineren. De drie print-aanroepen tonen verschillende weergaven van dezelfde bestelling.",
  ),
});
