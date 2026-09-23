import { L, lesson, section, task } from "./authoring.mjs";

export const localFilesLesson = lesson({
  module: 7,
  number: 4,
  title: L("One program, two files", "Eén programma, twee bestanden"),
  guidance: "adapt",
  minutes: 12,
  explanation: L(
    "A project can have more than one Python file. The Run button starts main.py; that file can import reusable code from another file in the same workspace. You will create a small delivery-pricing module and use it from the existing parcel report. The point is to separate responsibilities, not to make the program longer.",
    "Een project kan meer dan één Pythonbestand hebben. De knop Uitvoeren start main.py; dat bestand kan herbruikbare code importeren uit een ander bestand in dezelfde werkruimte. Je maakt een kleine module voor bezorgprijzen en gebruikt die vanuit het bestaande pakketoverzicht. Het doel is verantwoordelijkheden scheiden, niet het programma langer maken.",
  ),
  sections: [
    section(
      L(
        "Create a file in this workspace",
        "Maak een bestand in deze werkruimte",
      ),
      L(
        "Use the + button beside the file tabs to create shipping.py. Click a tab to edit that file; switching tabs keeps your changes. All tabs belong to this activity and are saved together. Run still starts main.py even if shipping.py is the selected tab.",
        "Gebruik de knop + naast de bestandstabs om shipping.py te maken. Klik op een tab om dat bestand te bewerken; wisselen tussen tabs bewaart je wijzigingen. Alle tabs horen bij deze activiteit en worden samen opgeslagen. Uitvoeren start nog steeds main.py, ook wanneer shipping.py de geselecteerde tab is.",
      ),
    ),
    section(
      L(
        "Import the module name, without .py",
        "Importeer de modulenaam, zonder .py",
      ),
      L(
        'Suppose greetings.py contains the function below. In main.py, import greetings makes the module available; greetings.welcome("Mina") then calls its function. Alternatively, from greetings import welcome makes the function name directly available. Both forms import real Python code from the second file.',
        'Stel dat greetings.py de onderstaande functie bevat. In main.py maakt import greetings de module beschikbaar; greetings.welcome("Mina") roept daarna de functie aan. Je kunt ook from greetings import welcome gebruiken om de functienaam direct beschikbaar te maken. Beide vormen importeren echte Pythoncode uit het tweede bestand.',
      ),
      'def welcome(name):\n    return "Welcome, " + name\n',
    ),
    section(
      L(
        "A caller and a reusable module",
        "Een aanroeper en een herbruikbare module",
      ),
      L(
        "This is the corresponding main.py. The imported file should usually define useful functions without asking for input or printing its own report. Top-level statements in an imported file run during the first import, so an unexpected print there also appears in your terminal.",
        "Dit is het bijbehorende main.py. Het geïmporteerde bestand definieert meestal nuttige functies zonder zelf invoer te vragen of een eigen overzicht af te drukken. Losse statements in een geïmporteerd bestand worden tijdens de eerste import uitgevoerd; een onverwachte print daar verschijnt dus ook in je terminal.",
      ),
      'import greetings\n\nmessage = greetings.welcome("Mina")\nprint(message)',
      "Welcome, Mina",
    ),
    section(
      L("Changes and common mistakes", "Wijzigingen en veelvoorkomende fouten"),
      L(
        "After editing a helper file, use Run again: each full run reloads the current files. The interactive console keeps imports until you reset it or run the script again. Use simple module filenames such as shipping.py, not shipping-cost.py, and match the spelling and case in the import. Avoid naming your own file pygame.py or random.py, which can clash with a library name. A missing local file causes ModuleNotFoundError; a missing imported function causes ImportError.",
        "Gebruik Uitvoeren opnieuw nadat je een hulpbestand hebt bewerkt: elke volledige uitvoering laadt de huidige bestanden opnieuw. De interactieve console behoudt imports totdat je die reset of het script opnieuw uitvoert. Gebruik eenvoudige modulenamen zoals shipping.py, niet shipping-cost.py, en laat spelling en hoofdletters overeenkomen met de import. Noem je eigen bestand liever niet pygame.py of random.py, omdat dat kan botsen met een bibliotheeknaam. Een ontbrekend lokaal bestand veroorzaakt ModuleNotFoundError; een ontbrekende geïmporteerde functie veroorzaakt ImportError.",
      ),
    ),
  ],
  starter:
    "parcel_weight = 3\n\n# Use your shipping module to calculate the delivery quote.\nquote = 0\nprint(quote)\n",
  solution: {
    "main.py":
      "import shipping\n\nparcel_weight = 3\nquote = shipping.delivery_cost(parcel_weight)\nprint(quote)\n",
    "shipping.py": "def delivery_cost(weight):\n    return 3 + weight * 1.5\n",
  },
  tasks: [
    task(
      "",
      L(
        "Create shipping.py. Define delivery_cost(weight) there: the delivery service charges 3 plus 1.5 per kilogram. Return the price so another file can use it.",
        "Maak shipping.py. Definieer daarin delivery_cost(weight): de bezorgdienst rekent 3 plus 1.5 per kilogram. Geef de prijs terug zodat een ander bestand die kan gebruiken.",
      ),
      '_os.path.isfile("shipping.py")',
      [
        L(
          "The new file is a place for reusable behavior. It does not need a separate program loop.",
          "Het nieuwe bestand is een plek voor herbruikbaar gedrag. Het heeft geen eigen programmalus nodig.",
        ),
        L(
          "Create the file with +, then write a function with one parameter and a returned numeric result.",
          "Maak het bestand met + en schrijf daarna een functie met één parameter en een numeriek resultaat.",
        ),
        L(
          "For another service, def storage(days): return 2 + days * 0.5 separates a base charge from a per-day charge.",
          "Voor een andere dienst scheidt def storage(days): return 2 + days * 0.5 een basisbedrag van kosten per dag.",
        ),
      ],
      L(
        "The shipping module needs a delivery_cost function that handles different weights.",
        "De shipping-module heeft een delivery_cost-functie nodig die met verschillende gewichten werkt.",
      ),
      [
        {
          call: { module: "shipping", name: "delivery_cost", args: [0] },
          check: "_error is None and _return == 3",
        },
        {
          call: { module: "shipping", name: "delivery_cost", args: [2.5] },
          check: "_error is None and _return == 6.75",
        },
      ],
    ),
    task(
      "",
      L(
        "Import the reusable function into main.py using either import style. Use parcel_weight to calculate quote through the module, then run the project.",
        "Importeer de herbruikbare functie in main.py met een van beide importvormen. Gebruik parcel_weight om quote via de module te berekenen en voer daarna het project uit.",
      ),
      'quote == 3 + parcel_weight * 1.5 and any(isinstance(node, (_ast.Import, _ast.ImportFrom)) and (getattr(node, "module", None) == "shipping" or any(alias.name == "shipping" for alias in node.names)) for node in _ast.walk(_ast.parse(_source)))',
      [
        L(
          "Choose whether you want to call shipping.delivery_cost or delivery_cost in the main file.",
          "Kies of je shipping.delivery_cost of delivery_cost in het hoofdbestand wilt aanroepen.",
        ),
        L(
          "The two import forms introduce different names. Match the function call to the form you chose.",
          "De twee importvormen introduceren verschillende namen. Laat je functieaanroep aansluiten op de gekozen vorm.",
        ),
        L(
          'The greetings example shows the module form. from greetings import welcome would instead let you call welcome("Mina").',
          'Het greetings-voorbeeld toont de modulevorm. Met from greetings import welcome kun je in plaats daarvan welcome("Mina") aanroepen.',
        ),
      ],
      L(
        "The main file should import shipping and use its calculation with the current parcel weight.",
        "Het hoofdbestand moet shipping importeren en de berekening met het huidige pakketgewicht gebruiken.",
      ),
      [
        {
          inputs: { parcel_weight: 0 },
          check: "_error is None and quote == 3",
        },
        {
          inputs: { parcel_weight: 4 },
          check: "_error is None and quote == 9",
        },
        {
          files: {
            "shipping.py":
              "def delivery_cost(weight):\n    return 100 + weight\n",
          },
          inputs: { parcel_weight: 2 },
          check: "_error is None and quote == 102",
        },
      ],
    ),
    task(
      "",
      L(
        "Keep the printed report in main.py and the calculation in shipping.py. The terminal should show one numeric quote. Try changing parcel_weight and running while the shipping.py tab is selected.",
        "Houd het afgedrukte overzicht in main.py en de berekening in shipping.py. De terminal moet één numerieke prijs tonen. Verander parcel_weight en probeer uit te voeren terwijl de shipping.py-tab geselecteerd is.",
      ),
      "len(_stdout.splitlines()) == 1 and float(_stdout.strip()) == quote",
      [
        L(
          "Importing a module runs its top-level statements once. Where should the report be produced?",
          "Een module importeren voert de losse statements in dat bestand eenmaal uit. Waar hoort het overzicht te worden gemaakt?",
        ),
        L(
          "Let the helper return a value and let the main file decide how to display it.",
          "Laat het hulpbestand een waarde teruggeven en laat het hoofdbestand bepalen hoe die wordt weergegeven.",
        ),
        L(
          "A function definition in the helper does not print anything by itself; a top-level print call does.",
          "Een functiedefinitie in het hulpbestand drukt op zichzelf niets af; een losse print-aanroep doet dat wel.",
        ),
      ],
      L(
        "Run main.py to produce one quote; the imported module should not print an extra report.",
        "Voer main.py uit om één prijs te tonen; de geïmporteerde module moet geen extra overzicht afdrukken.",
      ),
      [
        {
          inputs: { parcel_weight: 1.5 },
          check:
            "_error is None and len(_stdout.split()) == 1 and _close(float(_stdout.strip()), 5.25)",
        },
      ],
    ),
  ],
  solutionNote: L(
    "Both import styles work. main.py owns the report, while shipping.py exposes a reusable function. The full Run reloads edited files; imports entered into an already running console follow normal Python caching rules.",
    "Beide importvormen werken. main.py verzorgt het overzicht en shipping.py biedt een herbruikbare functie aan. Volledig Uitvoeren laadt gewijzigde bestanden opnieuw; imports in een al actieve console volgen de normale cacheregels van Python.",
  ),
});
