import { L, section } from "./authoring.mjs";
export const researchReading = {
  id: "python-v2-finding-answers",
  chapter: 7,
  group: "python-v2-module-7",
  title: L("Finding answers independently", "Zelf antwoorden vinden"),
  kind: "reading",
  optional: false,
  presentation: "article",
  estimatedMinutes: 8,
  runtime: "terminal",
  files: {},
  solution: {},
  checkpoints: [],
  example: "",
  explanation: L(
    "You do not need to memorise an entire library. A useful programming skill is turning an unfamiliar problem into a question, finding a trustworthy explanation, and testing whether you understood it. This page is a reading: there is no exercise to submit.",
    "Je hoeft niet een hele bibliotheek uit je hoofd te kennen. Een nuttige programmeervaardigheid is een onbekend probleem omzetten in een vraag, een betrouwbare uitleg vinden en testen of je die begrijpt. Dit is een leesles: er is geen opdracht om in te leveren.",
  ),
  sections: [
    section(
      L("Ask a small question", "Stel een kleine vraag"),
      L(
        "Instead of searching for “complete Pong code”, ask “pygame Rect overlap” or “pygame held keyboard key”. Name the library and the specific behavior you need. When searching an error, use its type and the relevant final line; remove private file paths and personal information.",
        "Zoek niet naar “complete Pong code”, maar bijvoorbeeld naar “pygame Rect overlap” of “pygame held keyboard key”. Noem de bibliotheek en het specifieke gedrag dat je nodig hebt. Gebruik bij een fout het fouttype en de relevante laatste regel; verwijder privébestandspaden en persoonlijke informatie.",
      ),
    ),
    section(
      L(
        "Start with the library documentation",
        "Begin bij de documentatie van de bibliotheek",
      ),
      L(
        "The official Python tutorial is at https://docs.python.org/3/tutorial/ and pygame-ce documentation is at https://pyga.me/docs/. Check the library and version before copying an example. This course uses pygame-ce, imported as pygame. An example for an old library release or a desktop-only feature may need changes in a browser.",
        "De officiële Python-tutorial staat op https://docs.python.org/3/tutorial/ en de documentatie van pygame-ce op https://pyga.me/docs/. Controleer de bibliotheek en versie voordat je een voorbeeld overneemt. Deze cursus gebruikt pygame-ce, geïmporteerd als pygame. Een voorbeeld voor een oude bibliotheekversie of een functie die alleen op de desktop werkt kan aanpassingen nodig hebben in een browser.",
      ),
    ),
    section(
      L(
        "Read the contract, not just the example",
        "Lees de beschrijving, niet alleen het voorbeeld",
      ),
      L(
        "On the Rect reference page, find colliderect. Identify what it receives, what it returns, and its boundary behavior. Overlap and merely touching edges are different cases. Also watch for methods that change an object versus methods that return a new one. Those details often explain why a plausible program behaves unexpectedly.",
        "Zoek op de Rect-referentiepagina naar colliderect. Bepaal wat de methode ontvangt, wat die teruggeeft en wat er op grenzen gebeurt. Overlap en alleen rakende randen zijn verschillende gevallen. Let ook op methoden die een object veranderen tegenover methoden die een nieuw object teruggeven. Die details verklaren vaak waarom een aannemelijk programma zich onverwacht gedraagt.",
      ),
    ),
    section(
      L(
        "Try the smallest useful experiment",
        "Probeer het kleinste nuttige experiment",
      ),
      L(
        "Before adding an unfamiliar method to a large game, try a tiny example with two rectangles. Change one coordinate so they overlap, then only touch, then separate. Predict the result before each run. If the result differs from your prediction, reread that part of the documentation rather than changing many unrelated lines.",
        "Voordat je een onbekende methode aan een groot spel toevoegt, probeer je een klein voorbeeld met twee rechthoeken. Verander één coördinaat zodat ze overlappen, alleen raken en daarna los van elkaar liggen. Voorspel de uitkomst vóór elke uitvoering. Wijkt die af van je voorspelling, lees dat deel van de documentatie opnieuw in plaats van veel ongerelateerde regels te veranderen.",
      ),
    ),
    section(
      L("Adapt what you find", "Pas toe wat je vindt"),
      L(
        "Explain to yourself what each borrowed line does. Rename values to fit your own program, change the example inputs, and check an edge case. Forums and generated answers can offer useful leads, but verify their claims against documentation and a small test. Do not install a package or run a copied shell command merely because an answer suggests it.",
        "Leg jezelf uit wat elke overgenomen regel doet. Pas namen aan je eigen programma aan, verander de voorbeeldinvoer en controleer een grensgeval. Forums en gegenereerde antwoorden kunnen nuttige aanknopingspunten geven, maar controleer beweringen met documentatie en een kleine test. Installeer niet zomaar een pakket en voer niet zomaar een gekopieerd terminalcommando uit omdat een antwoord dat suggereert.",
      ),
    ),
    section(
      L("Keep a useful note", "Bewaar een bruikbare notitie"),
      L(
        "Record the question, the documentation link, and what your experiment showed. A short note such as “touching edges are not overlap” is more useful later than a large pasted solution you cannot explain. You will use this same process while building your own Pong.",
        "Noteer de vraag, de documentatielink en wat je experiment liet zien. Een korte notitie zoals “rakende randen zijn geen overlap” is later nuttiger dan een grote geplakte oplossing die je niet kunt uitleggen. Tijdens het bouwen van je eigen Pong gebruik je dezelfde aanpak.",
      ),
    ),
  ],
  solutionNote: L(
    "No submission is needed. Continue when you have read the page.",
    "Je hoeft niets in te leveren. Ga verder wanneer je de pagina hebt gelezen.",
  ),
};
