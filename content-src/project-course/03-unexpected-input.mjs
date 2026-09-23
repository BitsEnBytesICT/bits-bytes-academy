import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const commands = lesson({
  module: 3,
  number: 1,
  title: L("Recognise the same request", "Herken hetzelfde verzoek"),
  guidance: "guided",
  minutes: 12,
  explanation: L(
    'A help desk understands "help" but rejects " HELP ". People should not have to guess the exact capitalisation. Keep the original response for the receipt, then compare a cleaned version. Do not remove spaces inside someone’s message.',
    'Een helpdesk begrijpt "help", maar wijst " HELP " af. Mensen moeten niet de exacte hoofdletters hoeven raden. Bewaar het oorspronkelijke antwoord voor het ontvangstbewijs en vergelijk vervolgens een opgeschoonde versie. Verwijder geen spaties binnen iemands bericht.',
  ),
  sections: [
    section(
      L("Strings have useful methods", "Strings hebben nuttige methoden"),
      L(
        "A method is a function attached to a value. text.strip() returns a copy without surrounding whitespace; text.lower() returns a lowercase copy. Strings are unchanged unless you assign the returned value. The dot and parentheses matter.",
        "Een methode is een functie die bij een waarde hoort. text.strip() geeft een kopie zonder witruimte aan de randen; text.lower() geeft een kopie met kleine letters. Strings blijven ongewijzigd tenzij je de teruggegeven waarde toekent. De punt en haakjes zijn belangrijk.",
      ),
      'label = "  Blue Sky  "\nclean_label = label.strip().lower()\nprint(clean_label)\nprint(label)',
      "blue sky\n  Blue Sky  ",
    ),
    section(
      L(
        "Keep evidence and interpretation separate",
        "Bewaar invoer en interpretatie apart",
      ),
      L(
        "The original text can explain what the user typed. A separate cleaned value can drive the decision. A response made only of spaces becomes an empty string after strip(). This is different from an unknown command.",
        "De oorspronkelijke tekst laat zien wat de gebruiker typte. Een aparte opgeschoonde waarde kan de beslissing bepalen. Een antwoord met alleen spaties wordt na strip() een lege string. Dat is iets anders dan een onbekend commando.",
      ),
    ),
  ],
  starter:
    'raw_command = input("Command: ")\ncommand = raw_command\nrecognised = command == "help"\nif recognised:\n    print("Available: help")\nelse:\n    print("Unknown command:", raw_command)\n',
  solution:
    'raw_command = input("Command: ")\ncommand = raw_command.strip().lower()\nrecognised = command == "help"\nif recognised:\n    print("Available: help")\nelse:\n    print("Unknown command:", raw_command)\n',
  inputs: [" HELP "],
  tasks: [
    task(
      "",
      L(
        "Keep the response unchanged in raw_command. Store a version without surrounding whitespace in command.",
        "Bewaar het antwoord ongewijzigd in raw_command. Bewaar in command een versie zonder witruimte aan de randen.",
      ),
      "raw_command.strip().lower() == command.lower()",
      [
        L(
          "Change the interpreted value, not the evidence.",
          "Verander de geïnterpreteerde waarde, niet de oorspronkelijke invoer.",
        ),
        L(
          "strip() returns the cleaned text; calling it without using the result has no effect.",
          "strip() geeft de opgeschoonde tekst terug; de methode aanroepen zonder het resultaat te gebruiken heeft geen effect.",
        ),
        L(
          "clean_label = label.strip() leaves label unchanged.",
          "clean_label = label.strip() laat label ongewijzigd.",
        ),
      ],
      L(
        "Preserve the original response and remove only surrounding whitespace.",
        "Behoud het oorspronkelijke antwoord en verwijder alleen witruimte aan de randen.",
      ),
      [
        {
          stdin: ["  HELp  "],
          check:
            '_error is None and raw_command == "  HELp  " and command.lower() == "help"',
        },
        {
          stdin: [" blue sky "],
          check:
            'raw_command == " blue sky " and command.lower() == "blue sky"',
        },
      ],
    ),
    task(
      "",
      L(
        "Make command lowercase so help works with any mixture of capital letters.",
        "Maak command lowercase zodat help met elke combinatie van hoofdletters werkt.",
      ),
      "command == raw_command.strip().lower() and type(recognised) is bool",
      [
        L(
          "Whitespace and letter case are separate issues.",
          "Witruimte en hoofdletters zijn aparte problemen.",
        ),
        L(
          "Use the result of one string method as the input to the next.",
          "Gebruik het resultaat van een stringmethode als invoer voor de volgende.",
        ),
        L('"SuN".lower() gives "sun".', '"SuN".lower() geeft "sun".'),
      ],
      L(
        "The decision should use the cleaned lowercase command.",
        "De beslissing moet het opgeschoonde commando met kleine letters gebruiken.",
      ),
      [
        { stdin: ["HeLp"], check: 'command == "help" and recognised is True' },
        { stdin: ["hello"], check: "recognised is False" },
      ],
    ),
    task(
      "",
      L(
        "Keep the existing report working for recognised and unknown commands. Test a blank response too; it should not count as help.",
        "Laat het bestaande overzicht werken voor herkende en onbekende commando’s. Test ook een leeg antwoord; dat mag niet als help tellen.",
      ),
      '("Available: help" if recognised else "Unknown command:") in _stdout',
      [
        L(
          "Cleaning the text should not remove the report.",
          "Het opschonen van de tekst mag het overzicht niet verwijderen.",
        ),
        L(
          'An empty cleaned string still compares normally with "help".',
          'Een lege opgeschoonde string kan gewoon met "help" worden vergeleken.',
        ),
        L(
          "Use a blank line in the terminal to try the empty response.",
          "Gebruik een lege regel in de terminal om het lege antwoord te proberen.",
        ),
      ],
      L(
        "Show help only for the help command; report other responses without crashing.",
        "Toon hulp alleen voor het help-commando; meld andere antwoorden zonder vast te lopen.",
      ),
      [
        {
          stdin: ["   "],
          check:
            '_error is None and command == "" and recognised is False and "Unknown command:" in _stdout',
        },
        { stdin: [" HeLP "], check: '"Available: help" in _stdout' },
      ],
    ),
  ],
  solutionNote: L(
    "Two separate assignments for strip and lower work just as well as chaining them. The original response remains available for diagnostics.",
    "Twee aparte toekenningen voor strip en lower werken net zo goed als ze achter elkaar aanroepen. Het oorspronkelijke antwoord blijft beschikbaar voor foutonderzoek.",
  ),
});

const range = lesson({
  module: 3,
  number: 2,
  title: L("Check the whole rule", "Controleer de hele regel"),
  guidance: "guided",
  minutes: 14,
  explanation: L(
    "A supervised workshop admits participants aged 12 through 17, and only with consent. The current rule checks one condition and admits people it should not. Make the complete policy visible in the program. Assume the age is a valid integer in this exercise.",
    "Een begeleide workshop laat deelnemers van 12 tot en met 17 jaar toe, en alleen met toestemming. De huidige regel controleert één voorwaarde en laat mensen toe die niet mogen deelnemen. Maak het volledige beleid zichtbaar in het programma. Neem in deze opdracht aan dat de leeftijd een geldige integer is.",
  ),
  sections: [
    section(
      L("Combine conditions", "Combineer voorwaarden"),
      L(
        "and requires both conditions to be true. or accepts either condition. not reverses a Boolean. Parentheses help readers see which parts belong together. Choose the operator from the rule, not from the wording of a particular example.",
        "and vereist dat beide voorwaarden waar zijn. or accepteert een van beide voorwaarden. not keert een Boolean om. Haakjes helpen lezers te zien welke delen bij elkaar horen. Kies de operator op basis van de regel, niet op basis van één voorbeeld.",
      ),
      "temperature = 19\nraining = False\ngood_for_picnic = temperature >= 15 and not raining\nprint(good_for_picnic)",
      "True",
    ),
    section(
      L("Both ends matter", "Beide grenzen tellen"),
      L(
        "A range has a lower and upper boundary. You can use two comparisons joined with and, or a chained comparison such as 3 <= value <= 9. Test below, at, inside, at the upper end, and above the range. Also change the independent permission condition.",
        "Een bereik heeft een onder- en bovengrens. Gebruik twee vergelijkingen met and, of een keten zoals 3 <= value <= 9. Test onder de grens, op de grens, binnen het bereik, op de bovengrens en erboven. Verander ook de onafhankelijke toestemmingsvoorwaarde.",
      ),
    ),
  ],
  starter:
    'age = int(input("Age: "))\nconsent = input("Consent (yes/no): ").strip().lower()\n\nin_age_range = age >= 12\nhas_consent = True\ncan_join = in_age_range\nprint("Can join:", can_join)\n',
  solution:
    'age = int(input("Age: "))\nconsent = input("Consent (yes/no): ").strip().lower()\n\nin_age_range = 12 <= age <= 17\nhas_consent = consent == "yes"\ncan_join = in_age_range and has_consent\nprint("Can join:", can_join)\n',
  inputs: ["14", "yes"],
  tasks: [
    task(
      "",
      L(
        "Set in_age_range to reflect both inclusive age boundaries.",
        "Laat in_age_range beide leeftijdsgrenzen inclusief de grenswaarden controleren.",
      ),
      "type(in_age_range) is bool and in_age_range == (12 <= age <= 17)",
      [
        L(
          "A minimum alone does not enforce a maximum.",
          "Alleen een minimum stelt geen maximum.",
        ),
        L(
          "Both comparisons must be satisfied at once.",
          "Aan beide vergelijkingen moet tegelijk worden voldaan.",
        ),
        L(
          "3 <= value <= 9 includes both 3 and 9.",
          "3 <= value <= 9 bevat zowel 3 als 9.",
        ),
      ],
      L(
        "Include 12 and 17; exclude ages outside that range.",
        "Neem 12 en 17 mee; sluit leeftijden buiten dat bereik uit.",
      ),
      [11, 12, 17, 18].map((n) => ({
        stdin: [String(n), "yes"],
        check: `in_age_range is ${n >= 12 && n <= 17 ? "True" : "False"}`,
      })),
    ),
    task(
      "",
      L(
        "Set has_consent from the cleaned response. Only yes grants consent.",
        "Bepaal has_consent uit het opgeschoonde antwoord. Alleen yes geeft toestemming.",
      ),
      'type(has_consent) is bool and has_consent == (consent == "yes")',
      [
        L(
          "The existence of some text is not permission.",
          "Het bestaan van tekst is geen toestemming.",
        ),
        L(
          "Compare with the one accepted response.",
          "Vergelijk met het enige geaccepteerde antwoord.",
        ),
        L(
          "The previous lesson compared a cleaned command with a recognised word.",
          "De vorige les vergeleek een opgeschoond commando met een herkend woord.",
        ),
      ],
      L(
        "Reject no, blank, and unrelated responses as consent.",
        "Accepteer no, leeg en ongerelateerde antwoorden niet als toestemming.",
      ),
      [
        { stdin: ["14", " YES "], check: "has_consent is True" },
        { stdin: ["14", "no"], check: "has_consent is False" },
        { stdin: ["14", "maybe"], check: "has_consent is False" },
      ],
    ),
    task(
      "",
      L(
        "Make can_join enforce the complete policy and keep it in the report. Find a case that would expose using or instead of and.",
        "Laat can_join het volledige beleid afdwingen en behoud het in het overzicht. Bedenk een geval dat or in plaats van and zou ontmaskeren.",
      ),
      "type(can_join) is bool and can_join == (in_age_range and has_consent) and str(can_join) in _stdout",
      [
        L(
          "Neither age nor consent can compensate for the other.",
          "Leeftijd en toestemming kunnen elkaar niet vervangen.",
        ),
        L(
          "Try a permitted age without consent, then an unpermitted age with consent.",
          "Probeer een toegestane leeftijd zonder toestemming, en een ongeldige leeftijd met toestemming.",
        ),
        L(
          "The picnic example requires suitable temperature and no rain.",
          "Het picknickvoorbeeld vereist een geschikte temperatuur én geen regen.",
        ),
      ],
      L(
        "Participation needs an allowed age and consent together.",
        "Deelname vereist tegelijk een toegestane leeftijd en toestemming.",
      ),
      [
        {
          stdin: ["14", "no"],
          check: 'can_join is False and "False" in _stdout',
        },
        { stdin: ["18", "yes"], check: "can_join is False" },
        { stdin: ["12", "yes"], check: "can_join is True" },
      ],
    ),
  ],
  solutionNote: L(
    "Chained comparisons, two comparisons with and, and clear nested decisions can all express this policy. Boundary cases make an incomplete rule visible.",
    "Vergelijkingsketens, twee vergelijkingen met and en duidelijke geneste beslissingen kunnen dit beleid allemaal uitdrukken. Grensgevallen maken een onvolledige regel zichtbaar.",
  ),
});

const routes = lesson({
  module: 3,
  number: 3,
  title: L("One request, one response", "Eén verzoek, één antwoord"),
  guidance: "adapt",
  minutes: 14,
  explanation: L(
    "A community centre has three information commands. Its starter prints an error even after answering a recognised request. Repair the routing so every request gets exactly one response. You are debugging how the branches relate, not just adding more messages.",
    "Een buurthuis heeft drie informatiecommando’s. De startcode drukt ook na een herkend verzoek een fout af. Herstel de afhandeling zodat elk verzoek precies één antwoord krijgt. Je onderzoekt hoe vertakkingen samenhangen; je voegt niet alleen berichten toe.",
  ),
  sections: [
    section(
      L("A chain of alternatives", "Een reeks alternatieven"),
      L(
        "if / elif / else describes a single decision with several alternatives. Python runs the first matching branch and skips the others. Several separate if statements are different decisions: an else belongs to the nearest if at the same indentation.",
        "if / elif / else beschrijft één beslissing met meerdere alternatieven. Python voert de eerste passende vertakking uit en slaat de rest over. Meerdere losse if-statements zijn verschillende beslissingen: een else hoort bij de dichtstbijzijnde if met dezelfde inspringing.",
      ),
      'score = 72\nif score >= 80:\n    band = "high"\nelif score >= 50:\n    band = "middle"\nelse:\n    band = "low"\nprint(band)',
      "middle",
    ),
    section(
      L(
        "Read the branches as a reader would",
        "Lees de vertakkingen als een lezer",
      ),
      L(
        'Trace one input through the complete program. Mark each condition it reaches and each line it prints. Then repeat with an unknown input. The expected report is one line: hours → "Open 09:00–17:00", address → "14 River Road", help → "Try hours or address". Any other command → "Unknown command".',
        'Volg één invoer door het volledige programma. Markeer elke conditie die wordt bereikt en elke regel die wordt afgedrukt. Herhaal dat met onbekende invoer. Het verwachte overzicht is één regel: hours → "Open 09:00–17:00", address → "14 River Road", help → "Try hours or address". Elk ander commando → "Unknown command".',
      ),
    ),
  ],
  starter:
    'command = input().strip().lower()\nif command == "hours":\n    print("Open 09:00–17:00")\nif command == "address":\n    print("14 River Road")\nif command == "help":\n    print("Try hours or address")\nelse:\n    print("Unknown command")\n',
  solution:
    'command = input().strip().lower()\nif command == "hours":\n    print("Open 09:00–17:00")\nelif command == "address":\n    print("14 River Road")\nelif command == "help":\n    print("Try hours or address")\nelse:\n    print("Unknown command")\n',
  inputs: ["hours"],
  tasks: [
    task(
      "",
      L(
        "Keep each recognised response correct for hours, address, and help, including capitalised or padded input.",
        "Behoud het juiste herkende antwoord voor hours, address en help, ook bij hoofdletters of witruimte.",
      ),
      "command == command.strip().lower() and len(_stdout.strip()) > 0",
      [
        L(
          "First establish which response belongs to each command.",
          "Bepaal eerst welk antwoord bij elk commando hoort.",
        ),
        L(
          "Keep the input cleanup while repairing the decision.",
          "Behoud het opschonen van de invoer terwijl je de beslissing herstelt.",
        ),
        L(
          'Try " HOURS " as well as "hours".',
          'Probeer zowel " HOURS " als "hours".',
        ),
      ],
      L(
        "Each recognised command must retain its own response.",
        "Elk herkend commando moet zijn eigen antwoord behouden.",
      ),
      [
        { stdin: [" HOURS "], check: '"Open 09:00–17:00" in _stdout' },
        { stdin: ["Address"], check: '"14 River Road" in _stdout' },
        { stdin: ["help"], check: '"Try hours or address" in _stdout' },
      ],
    ),
    task(
      "",
      L(
        "Organise the alternatives as an if/elif/else chain so a recognised command prints only its own line.",
        "Organiseer de alternatieven als een if/elif/else-keten zodat een herkend commando alleen zijn eigen regel afdrukt.",
      ),
      "len(_stdout.strip().splitlines()) == 1 and any(isinstance(n, _ast.If) and n.orelse and isinstance(n.orelse[0], _ast.If) for n in _ast.walk(_ast.parse(_source)))",
      [
        L(
          "An else currently belongs to only the last decision.",
          "Een else hoort momenteel alleen bij de laatste beslissing.",
        ),
        L(
          "Make later recognised options alternatives within the same decision.",
          "Maak latere herkende opties alternatieven binnen dezelfde beslissing.",
        ),
        L(
          "In the score example, elif is considered only if the preceding condition was false.",
          "In het scorevoorbeeld wordt elif alleen bekeken als de voorgaande conditie onwaar was.",
        ),
      ],
      L(
        "Recognised requests should not also reach an unrelated error branch.",
        "Herkende verzoeken mogen niet ook in een ongerelateerde foutvertakking belanden.",
      ),
      ["hours", "address", "help"].map((command) => ({
        stdin: [command],
        check:
          '_error is None and len(_stdout.strip().splitlines()) == 1 and "Unknown command" not in _stdout',
      })),
    ),
    task(
      "",
      L(
        "Keep a single fallback response for unknown and blank commands. Test a word that merely contains a known command, such as hoursplease.",
        "Behoud één terugvalantwoord voor onbekende en lege commando’s. Test een woord dat slechts een bekend commando bevat, zoals hoursplease.",
      ),
      "isinstance(command, str) and len(_stdout.strip().splitlines()) == 1",
      [
        L(
          "Containing a word is different from being that command.",
          "Een woord bevatten is iets anders dan dat commando zijn.",
        ),
        L(
          "The fallback belongs after every recognised alternative.",
          "Het terugvalantwoord hoort na alle herkende alternatieven.",
        ),
        L(
          'An empty string fails an equality comparison with "hours".',
          'Een lege string is bij een gelijkheidsvergelijking niet gelijk aan "hours".',
        ),
      ],
      L(
        "Unrecognised inputs should produce only the fallback response.",
        "Onbekende invoer moet alleen het terugvalantwoord produceren.",
      ),
      ["", "hoursplease", "other"].map((command) => ({
        stdin: [command],
        check: '_error is None and _stdout.strip() == "Unknown command"',
      })),
    ),
  ],
  solutionNote: L(
    "This exercise deliberately practises a branch chain. The visible mistake was an extra message; its cause was several independent decisions.",
    "Deze opdracht oefent bewust een vertakkingsketen. De zichtbare fout was een extra bericht; de oorzaak was een reeks onafhankelijke beslissingen.",
  ),
});

const ratio = lesson({
  module: 3,
  number: 4,
  title: L(
    "A failed calculation is still an outcome",
    "Een mislukte berekening is ook een uitkomst",
  ),
  guidance: "guided",
  minutes: 18,
  explanation: L(
    "A ratio tool asks for two decimal numbers and divides the first by the second. Invalid text and a zero divisor currently end the program with a traceback. Handle those two expected problems, keeping an honest status and no pretend numerical result. Trying again will be added when you learn loops.",
    "Een verhoudingstool vraagt om twee decimale getallen en deelt het eerste door het tweede. Ongeldige tekst en een deler nul beëindigen het programma nu met een traceback. Handel deze twee verwachte problemen af, met een eerlijke status en zonder verzonnen numeriek resultaat. Opnieuw proberen voegen we toe wanneer je lussen leert.",
  ),
  sections: [
    section(
      L(
        "An exception interrupts the normal path",
        "Een uitzondering onderbreekt het normale pad",
      ),
      L(
        'float("hello") raises ValueError. Dividing by zero raises ZeroDivisionError. try runs a block normally; a matching except handles that particular exception. Once an exception occurs, the remaining statements in the try block are skipped. A later except does not resume at the failed line.',
        'float("hello") veroorzaakt ValueError. Delen door nul veroorzaakt ZeroDivisionError. try voert een blok normaal uit; een passende except handelt die specifieke uitzondering af. Na een uitzondering worden de resterende statements in het try-blok overgeslagen. Een latere except hervat niet bij de mislukte regel.',
      ),
      'try:\n    amount = int("many")\n    print(amount + 1)\nexcept ValueError:\n    print("Use a whole number")\nprint("Finished")',
      "Use a whole number\nFinished",
    ),
    section(
      L(
        "Handle expected failures, not every mistake",
        "Handel verwachte fouten af, niet elke vergissing",
      ),
      L(
        'Catch the exceptions you understand. A bare except can hide a misspelled variable or other bug that you need to see. None is a useful value for “no result”; it is not the string "None" and is not zero. A failed calculation should leave result as None.',
        'Vang de uitzonderingen op die je begrijpt. Een kale except kan een verkeerd gespelde variabele of andere fout verbergen die je juist wilt zien. None is een bruikbare waarde voor “geen resultaat”; het is niet de string "None" en niet nul. Een mislukte berekening moet result op None laten staan.',
      ),
    ),
  ],
  starter:
    'result = None\nstatus = "pending"\nfirst_text = input("First number: ")\nsecond_text = input("Second number: ")\n\nfirst = float(first_text)\nsecond = float(second_text)\nresult = first / second\nstatus = "ok"\nprint(status, result)\n',
  solution:
    'result = None\nstatus = "pending"\nfirst_text = input("First number: ")\nsecond_text = input("Second number: ")\n\ntry:\n    first = float(first_text)\n    second = float(second_text)\n    result = first / second\n    status = "ok"\nexcept ValueError:\n    status = "invalid number"\nexcept ZeroDivisionError:\n    status = "zero divisor"\nprint(status, result)\n',
  inputs: ["9", "2"],
  tasks: [
    task(
      "",
      L(
        'Keep successful division working for decimal and negative values. Store the numeric result and set status to "ok".',
        'Laat geslaagde delingen werken met decimale en negatieve waarden. Bewaar het numerieke result en zet status op "ok".',
      ),
      'status in ("ok", "invalid number", "zero divisor")',
      [
        L(
          "Handling errors must not replace the calculation on valid inputs.",
          "Foutafhandeling mag de berekening bij geldige invoer niet vervangen.",
        ),
        L(
          "The successful status belongs after the calculation succeeds.",
          "De geslaagde status hoort nadat de berekening slaagt.",
        ),
        L(
          "A quotient of 0 is a valid result when the first number is zero.",
          "Een quotiënt van 0 is geldig wanneer het eerste getal nul is.",
        ),
      ],
      L(
        "Valid values should still produce the correct quotient.",
        "Geldige waarden moeten nog steeds het juiste quotiënt produceren.",
      ),
      [
        {
          stdin: ["-7.5", "2.5"],
          check: '_error is None and result == -3 and status == "ok"',
        },
        {
          stdin: ["0", "4"],
          check: '_error is None and result == 0 and status == "ok"',
        },
      ],
    ),
    task(
      "",
      L(
        'Handle invalid numeric text with status "invalid number". Leave result as None and report the status instead of crashing.',
        'Handel ongeldige getaltekst af met status "invalid number". Laat result op None staan en meld de status in plaats van vast te lopen.',
      ),
      'status in _stdout and (status != "invalid number" or result is None)',
      [
        L(
          "The conversion is where numeric text becomes a number or raises an exception.",
          "Bij de conversie wordt getaltekst een getal of ontstaat een uitzondering.",
        ),
        L(
          "Both conversions belong inside the protected block.",
          "Beide conversies horen binnen het beschermde blok.",
        ),
        L(
          "The amount example handles ValueError specifically.",
          "Het amount-voorbeeld handelt specifiek ValueError af.",
        ),
      ],
      L(
        "Invalid text in either number should give a useful status and no result.",
        "Ongeldige tekst in elk van beide getallen moet een nuttige status zonder resultaat geven.",
      ),
      [
        {
          stdin: ["oops", "2"],
          check:
            '_error is None and result is None and status == "invalid number" and status in _stdout',
        },
        {
          stdin: ["4", ""],
          check:
            '_error is None and result is None and status == "invalid number"',
        },
      ],
    ),
    task(
      "",
      L(
        'Handle a zero divisor separately with status "zero divisor" and no result. Keep the two failure reasons distinguishable.',
        'Handel een deler nul apart af met status "zero divisor" en zonder resultaat. Houd de twee foutoorzaken onderscheidbaar.',
      ),
      'status in _stdout and (status != "zero divisor" or result is None)',
      [
        L(
          "A valid number can still be unsuitable for an operation.",
          "Een geldig getal kan toch ongeschikt zijn voor een bewerking.",
        ),
        L(
          "Use a separate handler or an explicit zero check for this case.",
          "Gebruik hiervoor een aparte afhandeling of een expliciete nulcontrole.",
        ),
        L(
          "ZeroDivisionError describes division by zero; ValueError describes the conversion problem here.",
          "ZeroDivisionError beschrijft delen door nul; ValueError beschrijft hier het conversieprobleem.",
        ),
      ],
      L(
        "Division by zero should be explained without inventing a numeric answer.",
        "Delen door nul moet worden uitgelegd zonder een numeriek antwoord te verzinnen.",
      ),
      [
        {
          stdin: ["8", "0"],
          check:
            '_error is None and result is None and status == "zero divisor" and status in _stdout',
        },
        {
          stdin: ["0", "-0.0"],
          check:
            '_error is None and result is None and status == "zero divisor"',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Checking the divisor explicitly is also valid. Avoid a catch-all handler: it would conceal unrelated programming mistakes. This version accepts ordinary finite decimal input; unusual float values will be revisited with library tools.",
    "De deler expliciet controleren is ook geldig. Vermijd een afhandeling die alles opvangt: die zou ongerelateerde programmeerfouten verbergen. Deze versie accepteert gewone eindige decimale invoer; bijzondere floatwaarden bekijken we opnieuw bij bibliotheektools.",
  ),
});

const meter = lesson({
  module: 3,
  number: 5,
  title: L(
    "Build a trustworthy temperature converter",
    "Bouw een betrouwbare temperatuuromzetter",
  ),
  guidance: "independent",
  minutes: 22,
  explanation: L(
    "A field team records temperatures in Celsius and Fahrenheit. Build a one-shot converter that asks for the source unit first, then a temperature. It should handle imperfect input without making up a result. This is a small independent program: decide how to organise its branches and exception handling.",
    "Een veldteam registreert temperaturen in Celsius en Fahrenheit. Bouw een omzetter voor één meting die eerst de broneenheid vraagt en daarna de temperatuur. De omzetter moet onvolmaakte invoer afhandelen zonder een resultaat te verzinnen. Dit is een klein zelfstandig programma: bepaal zelf hoe je vertakkingen en foutafhandeling organiseert.",
  ),
  sections: [
    section(
      L("The contract", "De afspraken"),
      L(
        'Accept C or F in any letter case with surrounding spaces. Read both responses, even when the unit is unknown. Store a numeric result for success and None for failure. Use status "ok", "unknown unit", or "invalid number". An unknown unit takes priority over invalid numeric text. Display the status; on success display the result to two decimals. Prompt wording and report layout are yours.',
        'Accepteer C of F met elke combinatie van hoofdletters en spaties aan de randen. Lees beide antwoorden, ook wanneer de eenheid onbekend is. Bewaar een numeriek result bij succes en None bij fouten. Gebruik status "ok", "unknown unit" of "invalid number". Een onbekende eenheid heeft voorrang op ongeldige getaltekst. Toon de status; toon bij succes het resultaat met twee decimalen. De invoervragen en indeling kies je zelf.',
      ),
    ),
    section(
      L("The relationship", "Het verband"),
      L(
        "Celsius to Fahrenheit: multiply by 9/5, then add 32. Fahrenheit to Celsius: subtract 32, then multiply by 5/9. Useful checks: 0 C becomes 32 F, 212 F becomes 100 C, and −40 has the same value in both systems. Negative temperatures are normal, not errors.",
        "Celsius naar Fahrenheit: vermenigvuldig met 9/5 en tel dan 32 op. Fahrenheit naar Celsius: trek 32 af en vermenigvuldig dan met 5/9. Nuttige controles: 0 C wordt 32 F, 212 F wordt 100 C en −40 heeft in beide systemen dezelfde waarde. Negatieve temperaturen zijn normaal, geen fouten.",
      ),
    ),
  ],
  starter: "# Read a unit and temperature, then report a trustworthy result.\n",
  solution:
    'unit = input("Source unit (C/F): ").strip().lower()\ntext = input("Temperature: ")\nresult = None\nif unit != "c" and unit != "f":\n    status = "unknown unit"\nelse:\n    try:\n        value = float(text)\n        if unit == "c":\n            result = value * 9 / 5 + 32\n        else:\n            result = (value - 32) * 5 / 9\n        status = "ok"\n    except ValueError:\n        status = "invalid number"\nprint(status)\nif status == "ok":\n    print(f"{result:.2f}")\n',
  inputs: ["C", "18"],
  tasks: [
    task(
      "",
      L(
        "Make both conversions work with valid input. Preserve the numeric result for inspection in the console.",
        "Laat beide omzettingen werken met geldige invoer. Bewaar het numerieke result voor inspectie in de console.",
      ),
      'status in ("ok", "unknown unit", "invalid number") and (status != "ok" or isinstance(result, (int, float)))',
      [
        L(
          "Work out one example by hand before writing the branches.",
          "Reken eerst één voorbeeld met de hand uit voordat je de vertakkingen schrijft.",
        ),
        L(
          "Clean the unit, convert the temperature, and select the appropriate relationship.",
          "Schoon de eenheid op, zet de temperatuur om en kies het juiste verband.",
        ),
        L(
          "Parentheses in (value - 32) make the subtraction happen before multiplication.",
          "Haakjes in (value - 32) zorgen dat de aftrekking vóór de vermenigvuldiging gebeurt.",
        ),
      ],
      L(
        "Both units, negative values, and decimal values should convert correctly.",
        "Beide eenheden, negatieve waarden en decimale waarden moeten correct worden omgezet.",
      ),
      [
        {
          stdin: [" C ", "0"],
          check: '_error is None and status == "ok" and _close(result, 32)',
        },
        {
          stdin: ["f", "212"],
          check: '_error is None and status == "ok" and _close(result, 100)',
        },
        {
          stdin: ["c", "-40"],
          check: "_error is None and _close(result, -40)",
        },
        { stdin: ["F", "33.8"], check: "_error is None and _close(result, 1)" },
      ],
    ),
    task(
      "",
      L(
        "Report unknown units and invalid numbers with the specified status, leaving result as None. Respect the stated priority when both are invalid.",
        "Meld onbekende eenheden en ongeldige getallen met de afgesproken status en laat result op None staan. Houd de genoemde voorrang aan wanneer beide ongeldig zijn.",
      ),
      'status in _stdout and (status == "ok" or result is None)',
      [
        L(
          "Decide which question the program should settle first.",
          "Bepaal welke vraag het programma eerst moet oplossen.",
        ),
        L(
          "An unknown unit does not require trying to interpret a temperature.",
          "Bij een onbekende eenheid hoef je de temperatuur niet te proberen te interpreteren.",
        ),
        L(
          "The ratio tool kept None for failure and caught the conversion’s ValueError.",
          "De verhoudingstool behield None bij fouten en ving ValueError van de conversie op.",
        ),
      ],
      L(
        "Failures need distinct, predictable outcomes without a traceback.",
        "Fouten moeten onderscheidbare, voorspelbare uitkomsten zonder traceback krijgen.",
      ),
      [
        {
          stdin: ["Kelvin", "10"],
          check:
            '_error is None and status == "unknown unit" and result is None',
        },
        {
          stdin: ["c", "warm"],
          check:
            '_error is None and status == "invalid number" and result is None',
        },
        {
          stdin: ["", ""],
          check:
            '_error is None and status == "unknown unit" and result is None and _remaining_input == ""',
        },
      ],
    ),
    task(
      "",
      L(
        "Finish the report: always show status and show a two-decimal result only on success. Try a successful conversion followed by a failed one in separate runs.",
        "Maak het overzicht af: toon altijd status en alleen bij succes een resultaat met twee decimalen. Probeer in aparte runs een geslaagde en daarna een mislukte omzetting.",
      ),
      'status in _stdout and (status != "ok" or f"{result:.2f}" in _stdout)',
      [
        L(
          "A success report and an error report carry different information.",
          "Een succesoverzicht en een foutoverzicht bevatten verschillende informatie.",
        ),
        L(
          "Use the status or result availability to decide whether a number belongs in the report.",
          "Gebruik de status of beschikbaarheid van een resultaat om te bepalen of een getal in het overzicht hoort.",
        ),
        L(
          "Formatting belongs at display time, so the console can still inspect a numeric result.",
          "Formatteren hoort bij de weergave, zodat de console nog een numeriek resultaat kan inspecteren.",
        ),
      ],
      L(
        "The displayed result must agree with the outcome of this run.",
        "Het getoonde resultaat moet overeenkomen met de uitkomst van deze run.",
      ),
      [
        {
          stdin: ["f", "32"],
          check: '_error is None and "ok" in _stdout and "0.00" in _stdout',
        },
        {
          stdin: ["c", "bad"],
          check:
            '_error is None and "invalid number" in _stdout and result is None and "None" not in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "There are several sensible branch structures. The checks exercise outcomes and input combinations rather than requiring this arrangement. A larger program could separate conversion from interaction; that is coming in the functions module.",
    "Er zijn meerdere logische vertakkingsstructuren. De controles testen uitkomsten en invoercombinaties in plaats van deze indeling te eisen. Een groter programma kan omzetting van interactie scheiden; dat komt in de functiemodule.",
  ),
});

const review = quiz(
  3,
  L(
    "Check your reasoning: imperfect input",
    "Controleer je inzicht: onvolmaakte invoer",
  ),
  [
    question(
      "v2-3-q1",
      L("What is printed?", "Wat wordt afgedrukt?"),
      'text = " YES "\ntext.strip()\nprint(text == "YES")',
      [
        [
          L("False", "False"),
          L(
            "strip returns a new string; the result was not stored.",
            "strip geeft een nieuwe string terug; het resultaat is niet opgeslagen.",
          ),
        ],
        [
          L("True", "True"),
          L(
            "The method does not change the original string in place.",
            "De methode verandert de oorspronkelijke string niet ter plaatse.",
          ),
        ],
        [
          L("An error", "Een fout"),
          L(
            "The call is valid; ignoring its result is a logic mistake, not an exception.",
            "De aanroep is geldig; het resultaat negeren is een logische fout, geen uitzondering.",
          ),
        ],
      ],
    ),
    question(
      "v2-3-q2",
      L(
        "Access requires a valid ticket and an open venue. Which case exposes accidentally using or?",
        "Toegang vereist een geldig ticket en een open locatie. Welk geval ontmaskert onbedoeld gebruik van or?",
      ),
      "",
      [
        [
          L("Valid ticket, closed venue", "Geldig ticket, gesloten locatie"),
          L(
            "or accepts one true condition; the actual policy requires both.",
            "or accepteert één ware voorwaarde; het echte beleid vereist beide.",
          ),
        ],
        [
          L("Valid ticket, open venue", "Geldig ticket, open locatie"),
          L(
            "Both and and or accept this case, so it cannot distinguish them.",
            "Zowel and als or accepteert dit geval; het maakt dus geen onderscheid.",
          ),
        ],
        [
          L(
            "Invalid ticket, closed venue",
            "Ongeldig ticket, gesloten locatie",
          ),
          L(
            "Both operators reject this case.",
            "Beide operatoren wijzen dit geval af.",
          ),
        ],
      ],
    ),
    question(
      "v2-3-q3",
      L("Why does this print two lines?", "Waarom drukt dit twee regels af?"),
      'mode = "fast"\nif mode == "fast":\n    print("Fast selected")\nif mode == "slow":\n    print("Slow selected")\nelse:\n    print("Unknown")',
      [
        [
          L(
            "The else belongs only to the second if.",
            "De else hoort alleen bij de tweede if.",
          ),
          L(
            "The first decision succeeds; the second independently takes its else branch.",
            "De eerste beslissing slaagt; de tweede neemt onafhankelijk de else-vertakking.",
          ),
        ],
        [
          L(
            "Python compares strings unpredictably.",
            "Python vergelijkt strings onvoorspelbaar.",
          ),
          L(
            "The equality comparisons are predictable; the decisions are separate.",
            "De gelijkheidsvergelijkingen zijn voorspelbaar; de beslissingen staan los van elkaar.",
          ),
        ],
        [
          L("Every else always runs.", "Elke else wordt altijd uitgevoerd."),
          L(
            "An else runs only when its associated if condition is false.",
            "Een else wordt alleen uitgevoerd wanneer de bijbehorende if-conditie onwaar is.",
          ),
        ],
      ],
    ),
    question(
      "v2-3-q4",
      L(
        "Which input produces the handled message?",
        "Welke invoer produceert het afgehandelde bericht?",
      ),
      'try:\n    number = float(input())\n    print(10 / number)\nexcept ValueError:\n    print("Use a number")',
      [
        [
          L("ten", "ten"),
          L(
            "float cannot convert that text and raises ValueError.",
            "float kan die tekst niet omzetten en veroorzaakt ValueError.",
          ),
        ],
        [
          L("0", "0"),
          L(
            "Zero converts successfully; division then raises an unhandled ZeroDivisionError.",
            "Nul wordt succesvol omgezet; de deling veroorzaakt daarna een niet-afgehandelde ZeroDivisionError.",
          ),
        ],
        [
          L("2.5", "2.5"),
          L(
            "That is valid decimal text and the division succeeds.",
            "Dat is geldige decimale tekst en de deling slaagt.",
          ),
        ],
      ],
    ),
    question(
      "v2-3-q5",
      L(
        "Why keep None rather than 0 after a failed calculation?",
        "Waarom behoud je None in plaats van 0 na een mislukte berekening?",
      ),
      "",
      [
        [
          L(
            "Zero could be a genuine successful result.",
            "Nul kan een echt geslaagd resultaat zijn.",
          ),
          L(
            "None distinguishes absence of a result from a valid numeric zero.",
            "None onderscheidt het ontbreken van een resultaat van een geldige numerieke nul.",
          ),
        ],
        [
          L(
            "None makes every later calculation succeed.",
            "None laat elke latere berekening slagen.",
          ),
          L(
            "Arithmetic with None generally raises an error; you must decide how to handle absence.",
            "Rekenen met None geeft doorgaans een fout; je moet bepalen hoe je afwezigheid afhandelt.",
          ),
        ],
        [
          L(
            'The text "None" and the value None are identical.',
            'De tekst "None" en de waarde None zijn identiek.',
          ),
          L(
            "One is a string, the other represents absence.",
            "De ene is een string; de andere vertegenwoordigt afwezigheid.",
          ),
        ],
      ],
    ),
  ],
);

export const activities = [commands, range, routes, ratio, meter, review];
