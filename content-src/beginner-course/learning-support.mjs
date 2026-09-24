import { L } from "./authoring.mjs";
// Small, concrete traces for the new mental models identified in the audit.
// These are analogous examples, not the learner's complete assignment answer.
const supports = [
  [
    "06-greater-less",
    "At the boundary",
    "Op de grens",
    "A strict limit excludes equality. For a limit of 5: 4 < 5 is True; 5 < 5 and 6 < 5 are False. Trace the equal case before choosing an operator.",
    "Een strikte grens sluit gelijkheid uit. Bij grens 5: 4 < 5 is True; 5 < 5 en 6 < 5 zijn False. Volg het gelijke geval vóór je een operator kiest.",
  ],
  [
    "06-inclusive-boundaries",
    "Below, on, above",
    "Onder, op, boven",
    "Compare three cases: 4 <= 5 → True; 5 <= 5 → True; 6 <= 5 → False. The equals part changes only the boundary case.",
    "Vergelijk drie gevallen: 4 <= 5 → True; 5 <= 5 → True; 6 <= 5 → False. Het gelijkteken verandert alleen het grensgeval.",
  ],
  [
    "06-and",
    "Trace both conditions",
    "Volg beide voorwaarden",
    "For A and B, the four cases are: True/True → True; True/False → False; False/True → False; False/False → False. One successful condition cannot compensate for the other failing.",
    "Bij A and B zijn de vier gevallen: True/True → True; True/False → False; False/True → False; False/False → False. Eén geslaagde voorwaarde compenseert geen mislukte andere voorwaarde.",
  ],
  [
    "06-or",
    "Compare twice",
    "Vergelijk tweemaal",
    "For A or B: True/True, True/False and False/True all give True; only False/False gives False. Write command == 'go' or command == 'start'. In command == 'go' or 'start', the second part is nonempty text, which counts as true without comparing command.",
    "Bij A or B geven True/True, True/False en False/True allemaal True; alleen False/False geeft False. Schrijf command == 'go' or command == 'start'. Bij command == 'go' or 'start' is het tweede deel niet-lege tekst die als waar telt zonder command te vergelijken.",
  ],
  [
    "06-access-rule",
    "Design counterexamples",
    "Bedenk tegenvoorbeelden",
    "For a rule that requires a ticket and allows either membership or age >= 18, compare: ticket=True/member=False/age=18 → allowed; the same at 17 → denied; ticket=False/member=True/age=18 → denied. Work through the parentheses before the outer and.",
    "Bij een regel die een kaartje vereist en lidmaatschap of age >= 18 toestaat: ticket=True/member=False/age=18 → toegestaan; hetzelfde bij 17 → geweigerd; ticket=False/member=True/age=18 → geweigerd. Werk eerst de haakjes uit en dan de buitenste and.",
  ],
  [
    "07-delivery-adviser",
    "Check your price table",
    "Controleer je prijstabel",
    "Expected costs: 1 kg local → 3.0; 2 kg local → 3.0; 3 kg local → 6.0. For remote, the same weights cost 5.0, 5.0 and 8.0. Example conversation: Weight: 2, then Destination: REMOTE, then output 5.0. All weights here are positive numeric input; recovery comes later.",
    "Verwachte prijzen: 1 kg local → 3.0; 2 kg local → 3.0; 3 kg local → 6.0. Voor remote kosten die gewichten 5.0, 5.0 en 8.0. Voorbeeldgesprek: Weight: 2, daarna Destination: REMOTE en uitvoer 5.0. Alle gewichten zijn hier positieve getalinvoer; foutherstel komt later.",
  ],
  [
    "08-accumulate",
    "Counter and total are different",
    "Teller en totaal verschillen",
    "To add 1, 2 and 3, begin total=0. After value=1: total=1. After value=2: total=3. After value=3: total=6. The current value tells you what to add; total remembers everything already added. Initialise total once before the loop.",
    "Begin met total=0 om 1, 2 en 3 op te tellen. Na value=1: total=1. Na value=2: total=3. Na value=3: total=6. De huidige waarde zegt wat je optelt; total onthoudt alles wat al is opgeteld. Initialiseer total eenmaal vóór de lus.",
  ],
  [
    "08-continue",
    "Trace a skipped turn",
    "Volg een overgeslagen beurt",
    "Suppose count becomes 2 and the body continues for even numbers. Statements below continue are skipped. If the only count update were below it, count would stay 2 forever. Move the update before a possible continue, then trace 1 → 2 → 3.",
    "Stel dat count 2 wordt en het blok continue gebruikt bij even getallen. Instructies onder continue worden overgeslagen. Als de enige verhoging daar stond, bleef count altijd 2. Zet verhogen vóór een mogelijke continue en volg 1 → 2 → 3.",
  ],
  [
    "08-session-summary",
    "The empty session matters",
    "Het lege gesprek telt ook",
    "Try quit as the first answer. The loop should record no items and the final summary should still appear once. Then record one item: only its contribution changes. The summary belongs after repetition, not inside it.",
    "Probeer quit als eerste antwoord. De lus hoort geen artikelen vast te leggen en de samenvatting verschijnt toch eenmaal. Leg daarna één artikel vast: alleen diens bijdrage verandert. De samenvatting hoort na herhaling, niet erin.",
  ],
  [
    "09-none",
    "Predict the caller, then repair it",
    "Voorspel de aanroeper en herstel die",
    "First predict both lines below. show prints 6 internally, then returns None implicitly. The outer print displays that None. For reusable calculation, return value * 2 and let the caller print; predict the changed output before editing the required task.",
    "Voorspel eerst beide regels hieronder. show drukt intern 6 af en geeft daarna impliciet None terug. De buitenste print toont die None. Geef voor herbruikbare berekening value * 2 terug en laat de aanroeper afdrukken; voorspel de gewijzigde uitvoer vóór je de opdracht bewerkt.",
    "def show(value):\n    print(value * 2)\nprint(show(3))",
    "6\nNone\n",
  ],
  [
    "09-named-and-default",
    "Bind arguments one at a time",
    "Koppel argumenten één voor één",
    "For def cost(count, price=4): cost(2) binds count=2, price=4. cost(2,3) binds count=2, price=3. cost(price=3,count=2) binds those same values by name. The default is used only when that argument is omitted; it does not replace an explicitly supplied 0.",
    "Bij def cost(count, price=4): cost(2) koppelt count=2, price=4. cost(2,3) koppelt count=2, price=3. cost(price=3,count=2) koppelt dezelfde waarden op naam. De standaard wordt alleen gebruikt als dat argument ontbreekt; een expliciete 0 wordt niet vervangen.",
  ],
  [
    "09-early-return",
    "Follow the early exit",
    "Volg de vroege uitgang",
    "Read the first call: count=0 makes the first condition true, so return None ends this call. The calculation is never reached. For count=2 the condition is false, so execution reaches the division. Each call starts this choice again.",
    "Lees de eerste aanroep: count=0 maakt de eerste voorwaarde waar, dus return None beëindigt deze aanroep. De berekening wordt nooit bereikt. Bij count=2 is de voorwaarde onwaar en bereikt uitvoering de deling. Elke aanroep maakt deze keuze opnieuw.",
    "def share(total, count):\n    if count == 0:\n        return None\n    return total / count\nprint(share(6, 0))\nprint(share(6, 2))",
    "None\n3.0\n",
  ],
  [
    "10-diagnose",
    "Read a traceback from the end",
    "Lees een traceback vanaf het einde",
    "Example diagnostic text: File 'main.py', line 2 → number = int(text) → ValueError: invalid literal for int() with base 10: 'cat'. The final line names failed conversion; line 2 tells you which statement to inspect. Compare with a SyntaxError (Python could not parse the file) and a logic error such as 7 // 2 for a fractional average (runs, but gives the wrong result). This task repairs the logic case.",
    "Voorbeeld van fouttekst: File 'main.py', line 2 → number = int(text) → ValueError: invalid literal for int() with base 10: 'cat'. De laatste regel benoemt mislukte omzetting; regel 2 zegt welke instructie je onderzoekt. Vergelijk met SyntaxError (Python kon het bestand niet ontleden) en een logische fout zoals 7 // 2 voor een gebroken gemiddelde (draait maar geeft een verkeerd resultaat). Deze opdracht herstelt het logische geval.",
  ],
  [
    "10-validate",
    "Parsing and permission",
    "Omzetten en toestaan",
    "Test parse_percent with '0' → 0.0, '100' → 100.0 and '25.5' → 25.5. Test '-1', '101', 'cat' and '' → None. The first two rejected cases convert successfully but fail the range rule; the last two fail conversion itself.",
    "Test parse_percent met '0' → 0.0, '100' → 100.0 en '25.5' → 25.5. Test '-1', '101', 'cat' en '' → None. De eerste twee afwijzingen worden wel omgezet maar vallen buiten het bereik; de laatste twee mislukken bij omzetting.",
  ],
  [
    "11-create",
    "Read the list's shape",
    "Lees de vorm van de lijst",
    "Square brackets mark the list. Commas separate its elements, and order is preserved. ['Bo', 3, True] has three elements with three different types. Use the visible print call below to inspect the list your function returns.",
    "Vierkante haakjes markeren de lijst. Komma's scheiden elementen en de volgorde blijft behouden. ['Bo', 3, True] heeft drie elementen met drie verschillende typen. Gebruik de zichtbare print-aanroep hieronder om de lijst uit je functie te bekijken.",
  ],
  [
    "11-length-copy",
    "Your function's interface",
    "De interface van je functie",
    "Write with_count(items). with_count(['a','b']) must return ['a','b',2]; with_count([]) must return [0]. Keep the original list unchanged. To inspect this, store original=['a','b'], print(with_count(original)), then print(original). The second print should still show ['a','b'].",
    "Schrijf with_count(items). with_count(['a','b']) geeft ['a','b',2] terug; with_count([]) geeft [0] terug. Houd de oorspronkelijke lijst gelijk. Bewaar om dit te bekijken original=['a','b'], voer print(with_count(original)) uit en daarna print(original). De tweede print hoort nog ['a','b'] te tonen.",
  ],
  [
    "13-multiple-results",
    "Name and order both results",
    "Benoem en orden beide resultaten",
    "Write pack_groups(items, size). For 11 items and size 4 return (2,3): two whole groups, three left over. For zero items return (0,0). size is always a positive integer in this task. The caller can use groups, remainder = pack_groups(11,4) to name the two results.",
    "Schrijf pack_groups(items, size). Geef bij 11 artikelen en grootte 4 (2,3) terug: twee hele groepen, drie over. Geef bij nul artikelen (0,0) terug. size is in deze opdracht altijd een positief geheel getal. De aanroeper kan groups, remainder = pack_groups(11,4) gebruiken om beide resultaten te benoemen.",
  ],
  [
    "14-selected-and-alias",
    "Two names, two call styles",
    "Twee namen, twee aanroepvormen",
    "from math import floor introduces the local name floor: call floor(3.8). import math as m introduces m: call m.ceil(3.8). As a small practice edit, remove the two supplied import lines, type them back yourself, and rerun. Both imports are needed by this task's two calculations.",
    "from math import floor introduceert de lokale naam floor: roep floor(3.8) aan. import math as m introduceert m: roep m.ceil(3.8) aan. Verwijder als kleine oefening de twee aangeleverde importregels, typ ze zelf terug en voer opnieuw uit. Beide imports zijn nodig voor de twee berekeningen van deze opdracht.",
  ],
  [
    "14-guessing-game",
    "Start a real game",
    "Start een echt spel",
    "Run starts main.py, which chooses a secret from 1 through 10 and calls your play function in game.py. Enter answers in the terminal until Correct or quit. To test a known conversation, temporarily change the caller to print(play(5)): 2 → Higher, 8 → Lower, 5 → Correct, then 3 valid attempts. Invalid words do not count.",
    "Uitvoeren start main.py, dat een geheim van 1 tot en met 10 kiest en je play-functie in game.py aanroept. Voer antwoorden in de terminal in tot Correct of quit. Verander voor een bekend gesprek de aanroeper tijdelijk in print(play(5)): 2 → Higher, 8 → Lower, 5 → Correct en daarna 3 geldige pogingen. Ongeldige woorden tellen niet mee.",
  ],
  [
    "15-coordinates",
    "Where to edit and where pixels go",
    "Waar je bewerkt en waar pixels komen",
    "Edit game.py; main.py supplies the browser loop. The top-left corner is (0,0). Increasing x moves right; increasing y moves down. In a 640×400 scene the centre is (320,200). A rectangle's x,y describe its top-left corner, while our ball's x,y describe its centre; subtract the radius when building its Rect.",
    "Bewerk game.py; main.py levert de browserlus. Linksboven is (0,0). x verhogen gaat naar rechts; y verhogen naar beneden. In een scène van 640×400 is het midden (320,200). De x,y van een rechthoek beschrijven zijn linkerbovenhoek; de x,y van onze bal beschrijven zijn middelpunt. Trek de straal af bij het maken van zijn Rect.",
  ],
  [
    "16-wall-bounce",
    "Position and direction change together",
    "Positie en richting veranderen samen",
    "At the top with radius 6: before correction y=3, vy=-100; after correction y=6, vy=100. Next frame the ball moves down. If y=6, vy=100 already, do not reverse it again. At the bottom, use height-radius and a negative outgoing vy.",
    "Bovenaan met straal 6: vóór herstel y=3, vy=-100; na herstel y=6, vy=100. Het volgende beeld beweegt de bal omlaag. Als y=6, vy=100 al geldt, keer niet opnieuw om. Gebruik onderaan hoogte-straal en een negatieve vertrekkende vy.",
  ],
  [
    "16-score-once",
    "Follow two frames",
    "Volg twee beelden",
    "Frame 1 starts x=-7, vx=-100, right=0: award right=1 and reset x=320, vx=0. Frame 2 starts with that returned state: x is inside the court, so right stays 1. If x stayed -7, frame 2 would wrongly award another point.",
    "Beeld 1 begint met x=-7, vx=-100, right=0: ken right=1 toe en zet x=320, vx=0. Beeld 2 begint met die teruggegeven toestand: x ligt binnen het veld, dus right blijft 1. Als x -7 bleef, zou beeld 2 ten onrechte nog een punt geven.",
  ],
  [
    "17-slicing",
    "Inspect the intermediate slice",
    "Bekijk de tussenliggende deelreeks",
    "First inspect the slice, then count within it. For [2,9,2,4], [:3] is [2,9,2]; that slice's count(2) is 2. Counting the original list and counting a slice are different requests. An omitted stop includes the end; stop itself is always excluded.",
    "Bekijk eerst de deelreeks en tel daarna daarin. Bij [2,9,2,4] is [:3] gelijk aan [2,9,2]; count(2) van die deelreeks is 2. In de oorspronkelijke lijst of in een deelreeks tellen zijn verschillende opdrachten. Een ontbrekende eindgrens neemt het einde mee; de eindgrens zelf telt nooit mee.",
  ],
  [
    "17-nested-grid",
    "Choose a row, then a cell",
    "Kies een rij en dan een cel",
    "For grid=[[1,2],[3,4]], grid[1] selects row [3,4]; grid[1][0] then selects 3. Assigning grid[1][0]=9 changes just that cell. list(grid) copies only the outer list: its rows are still shared. To keep rows independent, copy each row too.",
    "Bij grid=[[1,2],[3,4]] kiest grid[1] de rij [3,4]; grid[1][0] kiest daarna 3. grid[1][0]=9 verandert alleen die cel. list(grid) kopieert alleen de buitenste lijst: rijen blijven gedeeld. Kopieer elke rij ook om rijen onafhankelijk te houden.",
  ],
  [
    "17-nested-loops",
    "Trace one row at a time",
    "Volg één rij tegelijk",
    "For [[2,1],[],[4]], total starts at 0. First row: add 2 → 2, add 1 → 3. Empty row: inner loop runs zero times, total stays 3. Last row: add 4 → 7. The outer loop selects rows; the inner loop selects values within the current row.",
    "Bij [[2,1],[],[4]] begint total op 0. Eerste rij: tel 2 op → 2, tel 1 op → 3. Lege rij: de binnenste lus draait nul keer en total blijft 3. Laatste rij: tel 4 op → 7. De buitenste lus kiest rijen; de binnenste lus kiest waarden binnen de huidige rij.",
  ],
  [
    "17-comprehensions",
    "Translate a familiar loop",
    "Vertaal een bekende lus",
    "First compare the ordinary loop with the unconditional comprehension below. Then add if value > 1 at the end to filter before transforming. Read the expression as: for each value, keep it if allowed, then calculate value * 2. Practise the unconditional form before adding the condition in your task.",
    "Vergelijk eerst de gewone lus met de onvoorwaardelijke comprehensie hieronder. Voeg daarna if value > 1 achteraan toe om vóór omzetting te filteren. Lees: neem elke waarde, behoud die indien toegestaan en bereken dan value * 2. Oefen eerst de onvoorwaardelijke vorm vóór je de voorwaarde in de opdracht toevoegt.",
    "result = []\nfor value in [1, 3]:\n    result.append(value * 2)\nprint(result)\nprint([value * 2 for value in [1, 3]])",
    "[2, 6]\n[2, 6]\n",
  ],
  [
    "18-split-delimiter",
    "Whitespace or an exact separator?",
    "Witruimte of een exact scheidingsteken?",
    "split() groups whitespace and drops empty edge pieces; split(',') separates exactly at commas and keeps empty fields. A newline or tab can also be the explicit separator: write '\\n' or '\\t' in the source. The examples below make each boundary visible.",
    "split() groepeert witruimte en laat lege randdelen weg; split(',') scheidt precies bij komma's en bewaart lege velden. Een nieuwe regel of tab kan ook een expliciet scheidingsteken zijn: schrijf '\\n' of '\\t' in de broncode. De voorbeelden maken elke grens zichtbaar.",
    'print(" a  b ".split())\nprint(",a,,b,".split(","))\nprint("a\\nb\\n".split("\\n"))\nprint("a\\tb".split("\\t"))',
    "['a', 'b']\n['', 'a', '', 'b', '']\n['a', 'b', '']\n['a', 'b']\n",
  ],
  [
    "18-replace-find",
    "Search first, replace separately",
    "Zoek eerst en vervang apart",
    "find returns an index or -1; replace returns new text. Neither changes the original string. Searching after replacement may produce a different index, so follow the task's requested order. A match at 0 is valid; -1 means absent.",
    "find geeft een index of -1; replace geeft nieuwe tekst. Geen van beide verandert de oorspronkelijke string. Na vervanging zoeken kan een andere index opleveren; volg de gevraagde volgorde. Een match op 0 is geldig; -1 betekent afwezig.",
    'text = "red-blue"\nprint(text.find("red"))\nprint(text.replace("red", "green"))\nprint(text.find("green"))',
    "0\ngreen-blue\n-1\n",
  ],
  [
    "20-position",
    "Imagine a reading cursor",
    "Stel je een leescursor voor",
    "For a file containing Header, newline, Ada, newline: initially the cursor is before H. readline() returns 'Header\\n' and leaves the cursor before A. read() then returns only 'Ada\\n' and leaves the cursor at the end. Another read() returns ''. Opening the file again starts a new cursor at the beginning.",
    "Bij een bestand met Header, nieuwe regel, Ada, nieuwe regel staat de cursor eerst vóór H. readline() geeft 'Header\\n' en zet de cursor vóór A. read() geeft daarna alleen 'Ada\\n' en zet de cursor aan het einde. Nogmaals read() geeft ''. Opnieuw openen begint met een nieuwe cursor aan het begin.",
  ],
  [
    "20-missing",
    "Three distinct file cases",
    "Drie verschillende bestandsgevallen",
    "An absent file raises FileNotFoundError; an existing empty file reads as ''; a nonempty file returns its contents. Catch the missing-file exception only. An empty string does not prove a file is missing. The checks use their own files, so your workspace experiments remain yours.",
    "Een ontbrekend bestand veroorzaakt FileNotFoundError; een bestaand leeg bestand leest als ''; een niet-leeg bestand geeft zijn inhoud. Vang alleen de fout voor een ontbrekend bestand. Een lege string bewijst niet dat een bestand ontbreekt. De controles gebruiken eigen bestanden; jouw experimenten blijven in je werkruimte.",
  ],
  [
    "21-named-records",
    "A row before and after conversion",
    "Een rij vóór en na omzetting",
    "DictReader can produce {'name':'Bo','score':'0'}. Looking up row['score'] returns text '0'; int(row['score']) returns number 0. Read → select field → convert → calculate. This task assumes valid headers and integer score text; malformed rows are handled in the later club book.",
    "DictReader kan {'name':'Bo','score':'0'} maken. row['score'] opzoeken geeft tekst '0'; int(row['score']) geeft getal 0. Lees → kies veld → zet om → bereken. Deze opdracht veronderstelt geldige koppen en gehele scoretekst; ongeldige rijen worden in het latere clubboek verwerkt.",
  ],
  [
    "22-club-book",
    "Trace rows into the saved book",
    "Volg rijen naar het opgeslagen boek",
    "The supplied CSV has headers name,score and exactly two fields per row. Ada,3 starts Ada's total at 3; Bo,2 adds Bo:2; Ada,4 changes Ada to 7. A blank name and Bo,bad are skipped, so accepted is 3, not the number of distinct players. The returned structure and saved JSON both contain totals {Ada:7, Bo:2} and accepted:3. Negative and zero integer scores are valid. Broken headers or rows with missing fields are outside this exercise's input contract.",
    "De aangeleverde CSV heeft koppen name,score en precies twee velden per rij. Ada,3 begint Ada's totaal op 3; Bo,2 voegt Bo:2 toe; Ada,4 verandert Ada naar 7. Een lege naam en Bo,bad worden overgeslagen, dus accepted is 3 en niet het aantal unieke spelers. De teruggegeven structuur en opgeslagen JSON bevatten beide totals {Ada:7, Bo:2} en accepted:3. Negatieve en nul-gehele scores zijn geldig. Kapotte koppen of rijen met ontbrekende velden vallen buiten de invoerafspraak van deze oefening.",
  ],
  [
    "23-class",
    "One class, two objects",
    "Eén klasse, twee objecten",
    "Think of a class as a description; calling it creates an object. first = Marker() and second = Marker() create different instances of the same type. first → instance A, second → instance B. Changing one object's future state need not change the other. The next lesson gives each instance its own named data.",
    "Zie een klasse als een beschrijving; aanroepen maakt een object. first = Marker() en second = Marker() maken verschillende instanties van hetzelfde type. first → instantie A, second → instantie B. De toekomstige toestand van het ene object wijzigen hoeft de andere niet te veranderen. De volgende les geeft elke instantie eigen benoemde gegevens.",
    "class Marker:\n    pass\nfirst = Marker()\nsecond = Marker()\nprint(type(first) == type(second))\nprint(first is second)",
    "True\nFalse\n",
  ],
  [
    "23-initialise",
    "Trace construction",
    "Volg het maken van een instantie",
    "Calling Player('Bo') creates one new object and passes it to __init__ as self; the string 'Bo' becomes name. self.name = name stores that string on this object. A later Player('Ada') runs __init__ again with a different self. You supply name; Python supplies self. __init__ prepares the object rather than returning a replacement object.",
    "Player('Bo') maakt één nieuw object en geeft dat als self aan __init__; de string 'Bo' wordt name. self.name = name bewaart die string op dit object. Een latere Player('Ada') draait __init__ opnieuw met een andere self. Jij levert name; Python levert self. __init__ bereidt het object voor en geeft geen vervangend object terug.",
  ],
  [
    "23-shared-state",
    "Draw the references",
    "Teken de verwijzingen",
    "Before repair: bag A.items → shared list ← bag B.items. After repair: bag A.items → list A; bag B.items → list B. Assign self.items = [] inside __init__ to create the separate list on each construction. The category string can stay at class level. add only needs to change this bag; its return value is not restricted by this task.",
    "Vóór herstel: tas A.items → gedeelde lijst ← tas B.items. Na herstel: tas A.items → lijst A; tas B.items → lijst B. Wijs self.items = [] binnen __init__ toe om bij elke constructie een aparte lijst te maken. De string category kan op klasseniveau blijven. add hoeft alleen deze tas te veranderen; de opdracht beperkt de terugkeerwaarde niet.",
  ],
  [
    "23-inspect",
    "Ask three separate questions",
    "Stel drie aparte vragen",
    "hasattr(obj,'name') asks whether an attribute exists. getattr(obj,'name','Unknown') fetches its value or the fallback when absent. dir(obj) lists available names for exploration. An existing name=None still exists: hasattr is True and getattr returns None, not 'Unknown'. Check existence separately from the stored value.",
    "hasattr(obj,'name') vraagt of een attribuut bestaat. getattr(obj,'name','Unknown') haalt de waarde op of het alternatief bij afwezigheid. dir(obj) geeft beschikbare namen om te onderzoeken. Een bestaande name=None bestaat nog: hasattr is True en getattr geeft None, niet 'Unknown'. Controleer bestaan apart van de bewaarde waarde.",
  ],
];
export function addLearningSupport(activities) {
  const byId = new Map(
    activities.map((a) => [a.id.replace("python-v4-", ""), a]),
  );
  for (const [id, en, nl, bodyEn, bodyNl, code, output] of supports) {
    const a = byId.get(id);
    if (!a) throw Error(`Missing support destination ${id}`);
    a.sections.splice(1, 0, {
      id: `${a.id}-trace`,
      topicIds: [],
      heading: L(en, nl),
      body: L(bodyEn, bodyNl),
      ...(code ? { code, output } : {}),
    });
  }
  for (const id of [
    "01-announcement",
    "02-profile",
    "03-receipt",
    "04-visitor-card",
    "05-trip-report",
  ]) {
    const a = byId.get(id),
      s = a.sections.find((s) => s.role === "experiment");
    s.body.en =
      `You have made a working ${a.title.en.toLowerCase()}. ` + s.body.en;
    s.body.nl =
      `Je hebt een werkend programma gemaakt: ${a.title.nl.toLowerCase()}. ` +
      s.body.nl;
  }
  const pet = byId.get("23-virtual-pet");
  pet.sections.splice(-1, 0, {
    id: "pet-visible-driver",
    topicIds: [],
    role: "practice",
    heading: L("Play with two pets", "Speel met twee huisdieren"),
    body: L(
      "After implementing Pet, add this caller below the class and Run. Inspect the two representations after each action. Only Bo should change; the class decides whether play succeeds.",
      "Voeg na het maken van Pet deze aanroeper onder de klasse toe en voer uit. Bekijk beide weergaven na elke actie. Alleen Bo hoort te veranderen; de klasse beslist of spelen lukt.",
    ),
    code: 'bo = Pet("Bo")\nada = Pet("Ada")\nprint(bo, ada)\nprint(bo.play())\nbo.feed(2)\nprint(bo, ada)',
  });
  const callers = {
    "12-activity-log": [
      'records = [20, 0, -4, 30]\nreport = summarise(records)\nprint("Total minutes:", report[0])\nprint("Active days:", report[1])',
      "Expected: Total minutes: 50 and Active days: 2. Empty records give 0 and 0. Negative records do not contribute.",
      "Verwacht: Total minutes: 50 en Active days: 2. Lege gegevens geven 0 en 0. Negatieve gegevens dragen niet bij.",
    ],
    "18-text-cleaner": [
      'lines = ["  Red\\tFOX ", " ", "Blue  Sky"]\nprint(clean_report(lines))',
      "Expected two lines: red fox, then blue sky. The blank source line disappears; the duplicate-line case should preserve duplicates.",
      "Verwacht twee regels: red fox en dan blue sky. De lege bronregel verdwijnt; bij dubbele regels blijven duplicaten behouden.",
    ],
    "23-class": [
      "print(type(first))\nprint(first is second)",
      "Expected Ticket as the type and False for identity: two constructions give two objects.",
      "Verwacht Ticket als type en False voor identiteit: twee constructies geven twee objecten.",
    ],
    "23-initialise": [
      'player = Player("Bo")\nprint(player.name, player.score)',
      "Expected Bo 0. Create another player and compare its own name and score.",
      "Verwacht Bo 0. Maak nog een speler en vergelijk zijn eigen naam en score.",
    ],
    "23-methods": [
      "lamp = Lamp()\nprint(lamp.on)\nlamp.toggle()\nprint(lamp.on)",
      "Expected False, then True. Call toggle again to return to False.",
      "Verwacht False en dan True. Roep toggle nogmaals aan om terug te gaan naar False.",
    ],
    "23-method-arguments": [
      "counter = Counter(3)\nprint(counter.add())\nprint(counter.add(amount=-2))",
      "Expected 4, then 2. The second call uses the state left by the first.",
      "Verwacht 4 en dan 2. De tweede aanroep gebruikt de toestand die de eerste achterlaat.",
    ],
    "23-shared-state": [
      'first = Bag()\nsecond = Bag()\nfirst.add("map")\nprint(first.items)\nprint(second.items)',
      "Expected ['map'], then []. Both bags share the category but keep separate lists.",
      "Verwacht ['map'] en dan []. Beide tassen delen de categorie maar hebben aparte lijsten.",
    ],
  };
  for (const [id, en, nl] of [
    [
      "20-report",
      "With source lines 2, blank, -1, 4, expect summary.txt to contain count=3 followed by total=5, each on its own line. The function also returns 5; the source stays unchanged. An empty source produces count=0 and total=0.",
      "Bij bronregels 2, leeg, -1, 4 bevat summary.txt count=3 gevolgd door total=5, elk op een eigen regel. De functie geeft ook 5 terug; de bron blijft gelijk. Een lege bron geeft count=0 en total=0.",
    ],
    [
      "21-csv-report",
      'For source rows "A, B",3 and C,-2, expect destination headers name,doubled, followed by "A, B",6 and C,-4. Return 2 data rows. The comma inside A, B belongs to the name and stays quoted by the writer.',
      'Bij bronrijen "A, B",3 en C,-2 verwacht je uitvoerkoppen name,doubled, gevolgd door "A, B",6 en C,-4. Geef 2 gegevensrijen terug. De komma binnen A, B hoort bij de naam en blijft door de schrijver aangehaald.',
    ],
  ]) {
    const a = byId.get(id);
    a.sections.splice(1, 0, {
      id: `${a.id}-sample-files`,
      topicIds: [],
      heading: L(
        "Inspect the input and expected file",
        "Bekijk de invoer en het verwachte bestand",
      ),
      body: L(en, nl),
    });
  }
  for (const [id, [code, en, nl]] of Object.entries(callers)) {
    const a = byId.get(id);
    a.sections.splice(-1, 0, {
      id: `${a.id}-visible-report`,
      role: "practice",
      topicIds: [],
      heading: L("Run a visible report", "Voer een zichtbaar verslag uit"),
      body: L(
        "After completing the required definition, add this caller below it and Run. " +
          en,
        "Voeg na het afmaken van de vereiste definitie deze aanroeper eronder toe en voer uit. " +
          nl,
      ),
      code,
    });
  }
}
