import { guided as G, section as S, loc } from "./helpers.mjs";
import { task } from "./loops-lessons.mjs";
const g = "learn-python-loops";

G(g, 7, {
  titleNl: "Begrijp waarom een loop niet stopt",
  intro: loc(
    "A loop finishes only when it runs out of items, its condition becomes false, or it is explicitly stopped. Two common mistakes prevent that: never updating the value in a while condition, and continually adding new items to the very list a for loop is visiting.\n\nThe supplied program is safe to run. It copies pending jobs into a separate completed list. We will inspect the faulty alternatives and practise recovering from one deliberately.",
    "Een loop eindigt alleen als de onderdelen op zijn, de voorwaarde onwaar wordt of de loop expliciet wordt gestopt. Twee veelvoorkomende fouten verhinderen dat: de waarde in een while-voorwaarde nooit bijwerken en steeds nieuwe onderdelen toevoegen aan de list die een for-loop juist doorloopt.\n\nHet meegeleverde programma kun je veilig uitvoeren. Het kopieert wachtende klussen naar een aparte list met afgeronde klussen. We bekijken de foutieve alternatieven en oefenen bewust het herstellen van één ervan.",
  ),
  sections: [
    S(
      "A moving finish line",
      "Een eindpunt dat blijft verschuiven",
      "The editor visits pending but appends to completed. If it appended to pending instead, every visit would create more work to visit. The original list would keep growing. Do not run that growing-list version; trace the first two iterations on paper and explain why the end moves away.",
      "De editor doorloopt pending maar voegt toe aan completed. Als hij juist aan pending zou toevoegen, zou elk bezoek meer werk opleveren om te bezoeken. De oorspronkelijke list zou blijven groeien. Voer die groeiende versie niet uit; volg de eerste twee iteraties op papier en leg uit waarom het einde opschuift.",
      'pending = ["scan", "label"]\ncompleted = ["pack"]\nfor job in pending:\n    completed.append(job)\nprint(pending)\nprint(completed)',
      "['scan', 'label']\n['pack', 'scan', 'label']",
    ),
    S(
      "Stop, repair, rerun",
      "Stoppen, herstellen en opnieuw uitvoeren",
      "Try the finite counter below in the editor after your job report. Then remove only the counter update and run it. The condition now stays true. Press Stop or Ctrl+C to cancel; the workspace also has execution and output limits. Restore the update and run again. Your saved source stays available after interruption.\n\nFinally add a third pending job to the original program. Confirm it is copied exactly once and pending itself remains unchanged. Stopping a run is recovery; correcting the cause is the actual repair.",
      "Probeer de eindige teller hieronder in de editor na je klusrapport. Verwijder vervolgens alleen de tellerwijziging en voer uit. De voorwaarde blijft nu waar. Druk op Stop of Ctrl+C om te annuleren; de werkruimte heeft ook uitvoerings- en outputlimieten. Herstel de wijziging en voer opnieuw uit. Je opgeslagen broncode blijft na onderbreking beschikbaar.\n\nVoeg tot slot een derde wachtende klus toe aan het oorspronkelijke programma. Controleer dat deze precies één keer wordt gekopieerd en pending zelf niet verandert. Een uitvoering stoppen is herstel; de oorzaak corrigeren is de echte reparatie.",
      'counter = 0\nwhile counter < 3:\n    print("Pass", counter)\n    counter += 1\nprint("Finished")',
      "Pass 0\nPass 1\nPass 2\nFinished",
    ),
  ],
  starter:
    'pending = ["scan", "label"]\ncompleted = ["pack"]\nfor job in pending:\n    completed.append(job)\n    print("Completed:", job)\nprint("Pending source:", pending)\nprint("Combined:", completed)\n',
  solution:
    'pending = ["scan", "label", "check"]\ncompleted = ["pack"]\nfor job in pending:\n    completed.append(job)\n    print("Completed:", job)\nprint("Pending source:", pending)\nprint("Combined:", completed)\ncounter = 0\nwhile counter < 3:\n    print("Pass", counter)\n    counter += 1\nprint("Finished")\n',
  steps: [],
  solutionNote: loc(
    "The source and destination lists have different roles. Appending to completed does not extend the sequence currently being visited. The counter example changes the same variable its condition tests, so its stopping condition eventually becomes false.",
    "De bronlist en doellist hebben verschillende rollen. Toevoegen aan completed verlengt de doorlopen verzameling niet. Het tellervoorbeeld verandert dezelfde variabele die de voorwaarde test, waardoor de voorwaarde uiteindelijk onwaar wordt.",
  ),
});

const searchCases = [
  { values: [15, 2, 18], limit: 10 },
  { values: [1, 2, 3], limit: 10 },
  { values: [], limit: 10 },
  { values: [10, 11, 11], limit: 10 },
];
const firstMatch =
  "([v for v in values if v > limit][0] if len([v for v in values if v > limit]) else None)";
G(g, 8, {
  titleNl: "Stop bij de eerste afwijkende meting",
  intro: loc(
    "A monitor needs the first measurement above its limit. Once that first alert is found, later values should not replace it. break immediately exits the nearest loop; it does not end the whole program. We will keep an inspection trail to make the stopping point visible.",
    "Een monitor zoekt de eerste meting boven de grens. Zodra die eerste waarschuwing gevonden is, mogen latere waarden deze niet vervangen. break verlaat meteen de dichtstbijzijnde loop; het beëindigt niet het hele programma. We bewaren een controleverslag om het stoppunt zichtbaar te maken.",
  ),
  sections: [
    S(
      "Record the result before leaving",
      "Bewaar het resultaat voordat je stopt",
      "Check each value inside the loop. When the condition matches, save that value and then break. Anything after break in that iteration is skipped. If nothing matches, the initial None remains; None represents the absence of a result here.",
      "Controleer elke waarde binnen de loop. Bewaar de waarde wanneer de voorwaarde klopt en gebruik daarna break. Alles na break in die iteratie wordt overgeslagen. Als niets past, blijft de beginwaarde None staan; None stelt hier het ontbreken van een resultaat voor.",
      'found = None\nfor value in [2, 9, 12]:\n    if value > 7:\n        found = value\n        break\nprint(found)\nprint("Search ended")',
      "9\nSearch ended",
    ),
    S(
      "Make the work visible",
      "Maak het werk zichtbaar",
      "Append each value to inspected before testing it. This includes the matching value but excludes later ones after break. A match at the beginning needs one visit; no match needs every visit. The final prints belong outside the loop so they also appear for an empty input.",
      "Voeg elke waarde vóór de test toe aan inspected. Daardoor telt de passende waarde mee, maar latere waarden na break niet. Een match aan het begin vraagt één bezoek; zonder match zijn alle bezoeken nodig. De slotprints horen buiten de loop zodat ze ook bij lege invoer verschijnen.",
      "inspected = []\nfor value in [2, 9, 12]:\n    inspected.append(value)\n    if value > 7:\n        break\nprint(inspected)",
      "[2, 9]",
    ),
  ],
  starter:
    'values = [4, 8, 12, 18]\nlimit = 10\nfound = None\ninspected = []\nprint("Limit:", limit)\n# Find the FIRST value above limit and stop searching.\n',
  solution:
    'values = [4, 8, 12, 18]\nlimit = 10\nfound = None\ninspected = []\nprint("Limit:", limit)\nfor value in values:\n    inspected.append(value)\n    if value > limit:\n        found = value\n        break\nprint("Inspected:", inspected)\nprint("First alert:", found)\n',
  steps: [
    task(
      "Use a for loop and break to store the first value strictly above limit in found. Leave found as None when no value matches.",
      "Gebruik een for-loop en break om de eerste waarde strikt boven limit in found te bewaren. Laat found op None staan als geen waarde past.",
      `found == ${firstMatch}`,
      "Save the matching value before break. Use > rather than >= and do not overwrite the first match with a later one.",
      "Bewaar de passende waarde vóór break. Gebruik > in plaats van >= en overschrijf de eerste match niet met een latere.",
      searchCases,
      "Break",
    ),
    task(
      "Append each visited value to inspected before checking the limit. Include the first alert but no later measurements.",
      "Voeg elke bezochte waarde aan inspected toe vóór de grenscontrole. Neem de eerste waarschuwing mee maar geen latere metingen.",
      `found == ${firstMatch} and inspected == (values[:values.index(found) + 1] if found is not None else values)`,
      "Place append before the condition; keep break inside the matching branch. A no-match run must inspect the full list.",
      "Zet append vóór de voorwaarde; houd break binnen de passende branch. Zonder match moet de hele list worden bekeken.",
      searchCases,
    ),
    task(
      "After searching, print Inspected: with the visit list and First alert: with found. Keep the Limit line.",
      "Druk na het zoeken Inspected: met de bezoeklist en First alert: met found af. Behoud de Limit-regel.",
      "_stdout.splitlines() == ['Limit: ' + str(limit), 'Inspected: ' + str(inspected), 'First alert: ' + str(found)]",
      "Both summaries belong after the loop, so no-match and empty-input runs still show their result.",
      "Beide samenvattingen horen na de loop, zodat ook zonder match of met lege invoer het resultaat verschijnt.",
      searchCases,
    ),
  ],
  solutionNote: loc(
    "The inspection is recorded first, then the condition is evaluated. Saving found before break retains the matching value. The final report still executes because break leaves the loop, not the program.",
    "Het bezoek wordt eerst bewaard en daarna wordt de voorwaarde getest. found vóór break opslaan bewaart de passende waarde. Het slotrapport draait nog, omdat break de loop verlaat en niet het programma.",
  ),
});

const filterCases = [
  { values: [0, -2, 5, 0, 3] },
  { values: [] },
  { values: [-4, -1] },
  { values: [2, 2, 7] },
];
G(g, 9, {
  titleNl: "Sla ongeldige metingen over en ga verder",
  intro: loc(
    "This sensor uses negative numbers for failed readings; zero is a valid measurement. A bad reading should be skipped without hiding later good ones. continue skips the rest of the current iteration and starts the next one. Unlike break, it keeps the search through the collection going.",
    "Deze sensor gebruikt negatieve getallen voor mislukte metingen; nul is een geldige meting. Een foutieve meting moet worden overgeslagen zonder latere goede metingen te verbergen. continue slaat de rest van de huidige iteratie over en begint de volgende. Anders dan break blijft het doorlopen van de verzameling doorgaan.",
  ),
  sections: [
    S(
      "Skip before doing the normal work",
      "Sla over vóór het gewone werk",
      "Place the invalid-value condition first. If it matches, continue prevents the later append and print from running for that value. Values after it still get their turn. The boundary matters: < 0 rejects negatives while <= 0 would also reject valid zero readings.",
      "Zet de voorwaarde voor ongeldige waarden eerst. Als deze klopt, voorkomt continue dat de latere append en print voor die waarde draaien. Waarden erna komen nog aan de beurt. De grens is belangrijk: < 0 wijst negatieve waarden af, terwijl <= 0 ook geldige nulmetingen zou afwijzen.",
      'for value in [4, -1, 0, 6]:\n    if value < 0:\n        continue\n    print("Accepted:", value)',
      "Accepted: 4\nAccepted: 0\nAccepted: 6",
    ),
    S(
      "Count the skipped work separately",
      "Tel het overgeslagen werk apart",
      "Increment rejected before continue; placing it after continue would make it unreachable. Initialise counters and result lists once before the loop. After the loop, print the collected accepted values and rejected count. Check an all-invalid list and an empty list as well as mixed data.",
      "Verhoog rejected vóór continue; erna zou die regel onbereikbaar zijn. Initialiseer tellers en resultaatlists één keer vóór de loop. Druk na de loop de verzamelde geldige waarden en het aantal afwijzingen af. Controleer naast gemengde gegevens ook een volledig ongeldige list en een lege list.",
      'rejected = 0\nfor value in [-1, 0, -3]:\n    if value < 0:\n        rejected += 1\n        continue\n    print(value)\nprint("Rejected:", rejected)',
      "0\nRejected: 2",
    ),
  ],
  starter:
    "values = [4, -1, 0, 6, -3, 2]\naccepted = []\nrejected = 0\n# Keep valid readings and skip failed ones.\n",
  solution:
    'values = [4, -1, 0, 6, -3, 2]\naccepted = []\nrejected = 0\nfor value in values:\n    if value < 0:\n        rejected += 1\n        continue\n    accepted.append(value)\nprint("Accepted:", accepted)\nprint("Rejected:", rejected)\n',
  steps: [
    task(
      "Use a for loop with continue to skip negative readings and append every other value to accepted, preserving order and duplicates.",
      "Gebruik een for-loop met continue om negatieve metingen over te slaan en elke andere waarde aan accepted toe te voegen, met behoud van volgorde en duplicaten.",
      "accepted == [v for v in values if v >= 0]",
      "Use value < 0 for the skip condition. Append after that branch so zero and later valid readings are kept.",
      "Gebruik value < 0 voor de overslavoorwaarde. Voeg na die branch toe zodat nul en latere geldige metingen behouden blijven.",
      filterCases,
      "Continue",
    ),
    task(
      "Count each skipped reading in rejected. The supplied data contains two failed readings.",
      "Tel elke overgeslagen meting in rejected. De meegeleverde gegevens bevatten twee mislukte metingen.",
      "rejected == len([v for v in values if v < 0])",
      "Increase rejected inside the invalid branch, before continue. Code after continue is skipped.",
      "Verhoog rejected binnen de ongeldige branch, vóór continue. Code na continue wordt overgeslagen.",
      filterCases,
    ),
    task(
      "Print Accepted: with the collected list and Rejected: with the count once after processing.",
      "Druk na het verwerken één keer Accepted: met de verzamelde list en Rejected: met het aantal af.",
      "_stdout.splitlines() == ['Accepted: ' + str([v for v in values if v >= 0]), 'Rejected: ' + str(len([v for v in values if v < 0]))]",
      "Print the whole accepted list after the loop, followed by the rejected count, not one summary per item.",
      "Druk de hele accepted-list na de loop af, gevolgd door het aantal afwijzingen; maak niet per onderdeel een samenvatting.",
      filterCases,
    ),
  ],
  solutionNote: loc(
    "The invalid branch records the rejection and immediately skips normal processing. A zero reading reaches append. Using break instead would wrongly abandon all readings after the first failure.",
    "De ongeldige branch bewaart de afwijzing en slaat meteen de gewone verwerking over. Een nulmeting bereikt append wel. Met break zouden alle metingen na de eerste fout ten onrechte vervallen.",
  ),
});

const batchCases = [
  { batches: [] },
  { batches: [[], [5, -2], [], [0, 7, 1]] },
  { batches: [[4], [2, 2]] },
];
G(g, 10, {
  titleNl: "Bouw rijtotalen en een eindtotaal",
  intro: loc(
    "Measurements arrive in batches of different sizes. One loop visits a batch; another loop inside it visits that batch's values. The inner loop starts afresh for each outer iteration. We need both a subtotal per batch and a grand total across the complete delivery.",
    "Metingen komen binnen in batches van verschillende grootte. Eén loop bezoekt een batch; een loop daarbinnen bezoekt de waarden van die batch. De binnenste loop begint opnieuw bij elke buitenste iteratie. We hebben zowel een subtotaal per batch als een eindtotaal over de hele levering nodig.",
  ),
  sections: [
    S(
      "Which collection does each loop visit?",
      "Welke verzameling bezoekt elke loop?",
      "The outer variable is a list, not a number. The inner variable is one value from that list. Notice that the inner loop reads row rather than the complete batches collection. An empty row has no inner iterations, but the outer loop still visits it.",
      "De buitenste variabele is een list, geen getal. De binnenste variabele is één waarde uit die list. De binnenste loop leest row en niet de hele verzameling batches. Een lege rij heeft geen binnenste iteraties, maar de buitenste loop bezoekt deze wel.",
      'batches = [[2, 5], [], [8]]\nfor row in batches:\n    print("Batch:", row)\n    for value in row:\n        print("Value:", value)',
      "Batch: [2, 5]\nValue: 2\nValue: 5\nBatch: []\nBatch: [8]\nValue: 8",
    ),
    S(
      "Reset at the right level",
      "Begin op het juiste niveau opnieuw",
      "Create grand_total before both loops so it survives the entire run. Reset row_total inside the outer loop so each batch starts at zero. Add each value to both totals inside the inner loop. Append the row total after the inner loop; even an empty batch contributes a zero subtotal.",
      "Maak grand_total vóór beide loops zodat dit de hele uitvoering behouden blijft. Zet row_total binnen de buitenste loop op nul zodat elke batch opnieuw begint. Tel binnen de binnenste loop elke waarde bij beide totalen op. Voeg het rijtotaal na de binnenste loop toe; ook een lege batch krijgt een subtotaal van nul.",
      "totals = []\nfor row in [[2, 5], [], [8]]:\n    subtotal = 0\n    for value in row:\n        subtotal += value\n    totals.append(subtotal)\nprint(totals)",
      "[7, 0, 8]",
    ),
  ],
  starter:
    'batches = [[3, 5], [2], [4, 1, 6]]\nreadings = []\nrow_totals = []\ngrand_total = 0\nprint("Batches:", len(batches))\n# Outer loop: one batch. Inner loop: one reading.\n',
  solution:
    'batches = [[3, 5], [2], [4, 1, 6]]\nreadings = []\nrow_totals = []\ngrand_total = 0\nprint("Batches:", len(batches))\nfor row in batches:\n    row_total = 0\n    for value in row:\n        readings.append(value)\n        row_total += value\n        grand_total += value\n    row_totals.append(row_total)\nprint("Rows:", row_totals)\nprint("Grand total:", grand_total)\n',
  steps: [
    {
      ...task(
        "Use two nested for loops to append each individual reading to readings, in batch order.",
        "Gebruik twee geneste for-loops om elke afzonderlijke meting in batchvolgorde aan readings toe te voegen.",
        "readings == [v for row in batches for v in row]",
        "Loop over batches first, then over the current row. Append values, not entire rows.",
        "Loop eerst over batches en daarna over de huidige rij. Voeg waarden toe, geen hele rijen.",
        batchCases,
        "For",
      ),
      check: `readings == [v for row in batches for v in row] and any(isinstance(n,_ast.For) and any(isinstance(child,_ast.For) for statement in n.body for child in _ast.walk(statement)) for n in _ast.walk(_ast.parse(_source)))`,
    },
    task(
      "Calculate row_totals and grand_total with your loops. Reset each row's subtotal, but keep the grand total across rows.",
      "Bereken row_totals en grand_total met je loops. Begin het subtotaal per rij opnieuw, maar behoud het eindtotaal tussen rijen.",
      "row_totals == [sum(row) for row in batches] and grand_total == sum([v for row in batches for v in row])",
      "Reset row_total at the start of each outer iteration. Append it after the inner loop, including zero for an empty row.",
      "Zet row_total aan het begin van elke buitenste iteratie op nul. Voeg deze na de binnenste loop toe, inclusief nul bij een lege rij.",
      batchCases,
    ),
    task(
      "After both loops, print Rows: with the subtotals and Grand total: with the overall sum. Keep the Batches line.",
      "Druk na beide loops Rows: met de subtotalen en Grand total: met de totale som af. Behoud de Batches-regel.",
      "_stdout.splitlines() == ['Batches: ' + str(len(batches)), 'Rows: ' + str([sum(row) for row in batches]), 'Grand total: ' + str(sum([v for row in batches for v in row]))]",
      "Place the final report at the left margin. The row list includes one subtotal for every batch.",
      "Zet het slotrapport tegen de linkermarge. De rijlist bevat één subtotaal voor elke batch.",
      batchCases,
    ),
  ],
  solutionNote: loc(
    "The nested loops visit each value once. row_total restarts for every row; grand_total does not. Appending the subtotal outside the inner loop preserves a zero entry for empty batches and prevents partial subtotals from leaking into the report.",
    "De geneste loops bezoeken elke waarde één keer. row_total begint per rij opnieuw; grand_total niet. Het subtotaal buiten de binnenste loop toevoegen bewaart een nul voor lege batches en voorkomt dat tussentotalen in het rapport belanden.",
  ),
});

const transformCases = [
  { raw: [], offset: 3 },
  { raw: [0, -3, 8, 8], offset: 2 },
  { raw: [5, 1], offset: -2 },
];
G(g, 11, {
  titleNl: "Schrijf dezelfde bewerking als comprehension",
  intro: loc(
    "A sensor consistently reads a few units low. Correcting it means producing a new value for each raw reading while keeping the raw data available. You already know how to append transformed values in a loop. A list comprehension expresses that same simple transformation in one expression.",
    "Een sensor meet steeds enkele eenheden te laag. Corrigeren betekent voor elke ruwe meting een nieuwe waarde maken terwijl de ruwe gegevens beschikbaar blijven. Je weet al hoe je met een loop bewerkte waarden toevoegt. Een list comprehension drukt diezelfde eenvoudige bewerking uit in één expressie.",
  ),
  sections: [
    S(
      "Read the for part, then the expression",
      "Lees het for-deel en daarna de expressie",
      "In [value + 2 for value in raw], take each value from raw, calculate value + 2, and collect the result. The outer brackets create a new list. A comprehension is useful for a short transformation; use an ordinary loop when you need several actions or a detailed trace.",
      "Bij [value + 2 for value in raw] neem je elke value uit raw, bereken je value + 2 en verzamel je het resultaat. De buitenste haakjes maken een nieuwe list. Een comprehension is handig voor een korte bewerking; gebruik een gewone loop als je meerdere acties of een uitgebreid verslag nodig hebt.",
      "raw = [1, 4, -2]\ncorrected = [value + 2 for value in raw]\nprint(raw)\nprint(corrected)",
      "[1, 4, -2]\n[3, 6, 0]",
    ),
    S(
      "Compare two implementations",
      "Vergelijk twee uitvoeringen",
      "Complete the supplied explicit loop first. Then write corrected with a comprehension using the same raw data and offset. Compare the two lists before building doubled from corrected. This keeps the calculation rule visible and shows that later transformations can use earlier results without changing them.",
      "Maak eerst de meegeleverde gewone loop af. Schrijf daarna corrected met een comprehension en dezelfde raw-gegevens en offset. Vergelijk de twee lists voordat je doubled uit corrected maakt. Zo blijft de rekenregel zichtbaar en zie je dat latere bewerkingen eerdere resultaten kunnen gebruiken zonder deze te veranderen.",
      "first = [3, 6, 0]\nsecond = [value * 2 for value in first]\nprint(first)\nprint(second)",
      "[3, 6, 0]\n[6, 12, 0]",
    ),
  ],
  starter:
    'raw = [4, 9, -1, 6]\noffset = 2\nby_loop = []\nfor value in raw:\n    # Replace pass with an append of the corrected value.\n    pass\nprint("Raw:", raw)\n# Build corrected with a comprehension, then doubled.\n',
  solution:
    'raw = [4, 9, -1, 6]\noffset = 2\nby_loop = []\nfor value in raw:\n    by_loop.append(value + offset)\nprint("Raw:", raw)\ncorrected = [value + offset for value in raw]\nprint("Corrected:", corrected)\ndoubled = [value * 2 for value in corrected]\nprint("Doubled:", doubled)\n',
  steps: [
    task(
      "Replace pass in the supplied loop with an append to by_loop of value plus offset. Keep raw unchanged.",
      "Vervang pass in de meegeleverde loop door het toevoegen van value plus offset aan by_loop. Laat raw ongewijzigd.",
      "by_loop == [v + offset for v in raw]",
      "Append the calculated value, not offset alone. pass is a placeholder that performs no action.",
      "Voeg de berekende waarde toe, niet alleen offset. pass is een tijdelijke instructie die niets doet.",
      transformCases,
      "For",
    ),
    task(
      "Create corrected with a list comprehension that applies the same correction to raw. Print Corrected: and the new list.",
      "Maak corrected met een list comprehension die dezelfde correctie op raw toepast. Druk Corrected: en de nieuwe list af.",
      "corrected == [v + offset for v in raw] and ('Corrected: ' + str(corrected)) in _stdout.splitlines()",
      "Put value + offset before for, and use raw as the input collection. The result should equal by_loop.",
      "Zet value + offset vóór for en gebruik raw als invoerverzameling. Het resultaat moet gelijk zijn aan by_loop.",
      transformCases,
      "ListComp",
    ),
    task(
      "Build doubled by doubling each value in corrected. Print Doubled: and its list, while keeping both earlier lists available.",
      "Maak doubled door elke waarde in corrected te verdubbelen. Druk Doubled: en de list af terwijl beide eerdere lists beschikbaar blijven.",
      "corrected == [v + offset for v in raw] and doubled == [(v + offset) * 2 for v in raw] and ('Doubled: ' + str(doubled)) in _stdout.splitlines()",
      "Use corrected as the next input. Doubling raw would skip the earlier correction.",
      "Gebruik corrected als volgende invoer. raw verdubbelen zou de eerdere correctie overslaan.",
      transformCases,
    ),
  ],
  solutionNote: loc(
    "The explicit loop and first comprehension calculate equal lists. The second transformation reads corrected and creates doubled. None of these operations needs to replace values in raw.",
    "De gewone loop en de eerste comprehension berekenen gelijke lists. De tweede bewerking leest corrected en maakt doubled. Geen van deze bewerkingen hoeft waarden in raw te vervangen.",
  ),
});

const conditionCases = [
  { values: [], limit: 5 },
  { values: [5, 6, 4, 0, -1, 6], limit: 5 },
  { values: [1, 2, 3], limit: 0 },
];
G(g, 12, {
  titleNl: "Filteren of vervangen: twee verschillende vragen",
  intro: loc(
    "A report needs two views of the same data: only the measurements above a limit, and a status for every measurement. Filtering can shorten a list. A conditional expression chooses a result for every item and keeps the list length. The placement of if tells you which job a comprehension is doing.",
    "Een rapport heeft twee weergaven van dezelfde gegevens nodig: alleen metingen boven een grens en een status voor elke meting. Filteren kan een list korter maken. Een conditionele expressie kiest een resultaat voor elk onderdeel en behoudt de listlengte. De plaats van if vertelt welke taak de comprehension uitvoert.",
  ),
  sections: [
    S(
      "A trailing if selects items",
      "Een if achteraan selecteert onderdelen",
      "Read [value for value in values if value > limit] as: visit each value, keep it only if the condition passes. Equal-to-limit values are excluded by a strict > condition. You can also transform the accepted value, such as calculating how far it exceeds the limit.",
      "Lees [value for value in values if value > limit] als: bezoek elke waarde en behoud deze alleen als de voorwaarde klopt. Waarden gelijk aan de grens worden uitgesloten door een strikte >-voorwaarde. Je kunt de geaccepteerde waarde ook bewerken, bijvoorbeeld berekenen hoeveel deze de grens overschrijdt.",
      "values = [3, 7, 5, 9]\nlimit = 5\nprint([value for value in values if value > limit])\nprint([value - limit for value in values if value > limit])",
      "[7, 9]\n[2, 4]",
    ),
    S(
      "An if/else expression chooses an output",
      "Een if/else-expressie kiest een resultaat",
      "Put the complete choice before for: ['high' if value > limit else 'ok' for value in values]. This produces one label for every input. It does not discard the ok measurements. Do not put else after a trailing filter condition; that is not valid comprehension syntax.",
      "Zet de volledige keuze vóór for: ['high' if value > limit else 'ok' for value in values]. Dit maakt één label per invoerwaarde. De ok-metingen worden niet weggelaten. Zet else niet na een filtervoorwaarde achteraan; dat is geen geldige comprehensionsyntax.",
      'values = [3, 7, 5, 9]\nlabels = ["high" if value > 5 else "ok" for value in values]\nprint(labels)',
      "['ok', 'high', 'ok', 'high']",
    ),
  ],
  starter:
    'values = [3, 8, 5, 0, 11, -2]\nlimit = 5\nprint("Input:", values)\n# 1. Keep values strictly above the limit.\n# 2. Measure each selected value\'s excess.\n# 3. Label EVERY original measurement.\n',
  solution:
    'values = [3, 8, 5, 0, 11, -2]\nlimit = 5\nprint("Input:", values)\nalerts = [value for value in values if value > limit]\nprint("Alerts:", alerts)\nexcess = [value - limit for value in values if value > limit]\nprint("Excess:", excess)\nlabels = ["high" if value > limit else "ok" for value in values]\nprint("Labels:", labels)\n',
  steps: [
    task(
      "Create alerts with a filtering comprehension containing only values strictly above limit. Print Alerts: with the list.",
      "Maak alerts met een filterende comprehension die alleen waarden strikt boven limit bevat. Druk Alerts: met de list af.",
      "alerts == [v for v in values if v > limit] and ('Alerts: ' + str(alerts)) in _stdout.splitlines()",
      "Put if value > limit after the for clause. Values equal to the limit do not qualify.",
      "Zet if value > limit na het for-deel. Waarden gelijk aan de grens voldoen niet.",
      conditionCases,
      "ListComp",
    ),
    task(
      "Create excess with a comprehension: for each alert, store the amount above limit. Print Excess: and that list.",
      "Maak excess met een comprehension: bewaar voor elke waarschuwing de hoeveelheid boven limit. Druk Excess: en die list af.",
      "excess == [v - limit for v in values if v > limit] and ('Excess: ' + str(excess)) in _stdout.splitlines()",
      "Subtract limit from each selected value. Preserve the order and repeated readings.",
      "Trek limit van elke geselecteerde waarde af. Behoud de volgorde en herhaalde metingen.",
      conditionCases,
      "ListComp",
    ),
    task(
      "Create labels for every original value using 'high' above the limit and 'ok' otherwise. Print Labels: with the full list.",
      "Maak labels voor elke oorspronkelijke waarde: 'high' boven de grens en anders 'ok'. Druk Labels: met de volledige list af.",
      "labels == ['high' if v > limit else 'ok' for v in values] and ('Labels: ' + str(labels)) in _stdout.splitlines()",
      "Put the if/else expression before for. This task chooses a label for every value rather than filtering values out.",
      "Zet de if/else-expressie vóór for. Deze taak kiest een label voor elke waarde in plaats van waarden weg te filteren.",
      conditionCases,
      "IfExp",
    ),
  ],
  solutionNote: loc(
    "alerts selects data; excess transforms only the selected data. labels answers a different question for every original measurement. The boundary value belongs to ok and does not appear in alerts.",
    "alerts selecteert gegevens; excess bewerkt alleen de geselecteerde gegevens. labels beantwoordt een andere vraag voor elke oorspronkelijke meting. De grenswaarde hoort bij ok en staat niet in alerts.",
  ),
});

const reviewCases = [
  { batches: [], offset: 2, limit: 6 },
  { batches: [[], [-2, 0, 4], [8, 4]], offset: 1, limit: 5 },
  { batches: [[7], [], [2]], offset: -1, limit: 20 },
];
G(g, 13, {
  titleNl: "Maak een volledig meetrapport",
  intro: loc(
    "Bring the chapter together in one monitoring report. The starter has batches of raw readings and a faulty flattening loop: it stores whole batches instead of their values. Repair that first, then clean, correct and summarise the measurements. Later steps should build on the lists created earlier, so every run reveals a more useful report.",
    "Breng het hoofdstuk samen in één monitorrapport. De startcode bevat batches met ruwe metingen en een foutieve loop om ze samen te voegen: deze bewaart hele batches in plaats van hun waarden. Herstel dat eerst en schoon daarna de metingen op, corrigeer ze en vat ze samen. Latere stappen moeten voortbouwen op eerder gemaakte lists, zodat elke uitvoering een bruikbaarder rapport oplevert.",
  ),
  sections: [
    S(
      "Plan the data flow",
      "Plan de gegevensverwerking",
      "Keep batches unchanged as the source. readings should be a flat list in arrival order. valid keeps nonnegative raw readings, because negatives mark failures and zero is valid. corrected adds offset to those valid readings. Apply the limit to corrected values, not to the original data.\n\nUse a loop when you need multiple actions, an accumulator for a running total, and a comprehension for a simple transformation. Use break for the first alert and continue for a failed reading.",
      "Behoud batches ongewijzigd als bron. readings moet een vlakke list in aankomstvolgorde zijn. valid behoudt niet-negatieve ruwe metingen, omdat negatieve waarden fouten aangeven en nul geldig is. corrected telt offset bij die geldige metingen op. Pas de grens toe op gecorrigeerde waarden, niet op de oorspronkelijke gegevens.\n\nGebruik een loop voor meerdere acties, een accumulator voor een lopend totaal en een comprehension voor een eenvoudige bewerking. Gebruik break voor de eerste waarschuwing en continue voor een mislukte meting.",
      "raw = [2, -1, 0, 5]\nvalid = [value for value in raw if value >= 0]\ncorrected = [value + 1 for value in valid]\nprint(valid)\nprint(corrected)",
      "[2, 0, 5]\n[3, 1, 6]",
    ),
    S(
      "Test each stage before adding the next",
      "Test elke fase voordat je de volgende toevoegt",
      "The supplied Batches line gives you a baseline. Keep each new report line after its calculation so earlier results remain visible. With an empty delivery, readings, valid and corrected are empty, total is zero, and first_alert is None. An empty batch inside a delivery should not discard later readings.\n\nAfter finishing, try changing offset and limit. Predict which report lines should change and which describe the unchanged source data.",
      "De meegeleverde Batches-regel geeft je een beginpunt. Zet elke nieuwe rapportregel na de bijbehorende berekening zodat eerdere resultaten zichtbaar blijven. Bij een lege levering zijn readings, valid en corrected leeg, total is nul en first_alert is None. Een lege batch binnen een levering mag latere metingen niet laten verdwijnen.\n\nProbeer na afloop offset en limit te veranderen. Voorspel welke rapportregels moeten veranderen en welke de ongewijzigde brongegevens beschrijven.",
    ),
  ],
  starter:
    'batches = [[2, -1], [4, 0], [], [6, 9]]\noffset = 2\nlimit = 7\nreadings = []\nprint("Batches:", batches)\nfor batch in batches:\n    readings.append(batch)  # Bug: this adds a whole row.\nprint("Readings:", readings)\n# Continue with valid, corrected, total and first_alert.\n',
  solution:
    'batches = [[2, -1], [4, 0], [], [6, 9]]\noffset = 2\nlimit = 7\nreadings = []\nprint("Batches:", batches)\nfor batch in batches:\n    for value in batch:\n        readings.append(value)\nprint("Readings:", readings)\nvalid = []\nfor value in readings:\n    if value < 0:\n        continue\n    valid.append(value)\nprint("Valid:", valid)\ncorrected = [value + offset for value in valid]\nprint("Corrected:", corrected)\ntotal = 0\nfor value in corrected:\n    total += value\nprint("Total:", total)\nfirst_alert = None\nfor value in corrected:\n    if value > limit:\n        first_alert = value\n        break\nprint("First alert:", first_alert)\nlabels = ["high" if value > limit else "ok" for value in corrected]\nprint("Labels:", labels)\n',
  steps: [
    task(
      "Repair the supplied flattening loop with an inner for loop. readings must contain individual values in arrival order; keep its print.",
      "Herstel de meegeleverde samenvoegloop met een binnenste for-loop. readings moet losse waarden in aankomstvolgorde bevatten; behoud de print.",
      "readings == [v for row in batches for v in row] and ('Readings: ' + str(readings)) in _stdout.splitlines()",
      "The outer variable batch is a list. Visit its values with an inner loop and append one value at a time.",
      "De buitenste variabele batch is een list. Bezoek de waarden met een binnenste loop en voeg telkens één waarde toe.",
      reviewCases,
      "For",
    ),
    task(
      "Use a loop with continue to collect nonnegative readings in valid. Keep zero, preserve order, then print Valid: and the list.",
      "Gebruik een loop met continue om niet-negatieve metingen in valid te verzamelen. Behoud nul en de volgorde en druk daarna Valid: en de list af.",
      "valid == [v for row in batches for v in row if v >= 0] and ('Valid: ' + str(valid)) in _stdout.splitlines()",
      "Skip only negative values. Do not break at the first failure, because later readings still matter.",
      "Sla alleen negatieve waarden over. Stop niet bij de eerste fout, want latere metingen blijven belangrijk.",
      reviewCases,
      "Continue",
    ),
    task(
      "Create corrected with a comprehension that adds offset to every valid reading. Print Corrected: and the result.",
      "Maak corrected met een comprehension die offset bij elke geldige meting optelt. Druk Corrected: en het resultaat af.",
      "corrected == [v + offset for row in batches for v in row if v >= 0] and ('Corrected: ' + str(corrected)) in _stdout.splitlines()",
      "Filter the raw failures before applying the correction. Read from valid and create a separate corrected list.",
      "Filter de ruwe fouten vóór het toepassen van de correctie. Lees uit valid en maak een aparte corrected-list.",
      reviewCases,
      "ListComp",
    ),
    task(
      "Accumulate corrected into total using a loop. Initialise once, then print Total: after all values have contributed.",
      "Tel corrected met een loop op in total. Initialiseer één keer en druk Total: af nadat alle waarden hebben bijgedragen.",
      "total == sum([v + offset for row in batches for v in row if v >= 0]) and ('Total: ' + str(total)) in _stdout.splitlines()",
      "Set total to zero before the loop and add each corrected value. An empty list must leave total at zero.",
      "Zet total vóór de loop op nul en tel elke gecorrigeerde waarde erbij op. Bij een lege list moet total nul blijven.",
      reviewCases,
      "For",
    ),
    task(
      "Search corrected for the first value strictly above limit, store it in first_alert and break. Leave None if no alert exists. Print First alert:.",
      "Zoek in corrected de eerste waarde strikt boven limit, bewaar die in first_alert en gebruik break. Laat None staan zonder waarschuwing. Druk First alert: af.",
      "first_alert == ([v for v in corrected if v > limit][0] if len([v for v in corrected if v > limit]) else None) and ('First alert: ' + str(first_alert)) in _stdout.splitlines()",
      "Compare corrected values with limit and save the first match before stopping. Print after the loop even when nothing matches.",
      "Vergelijk gecorrigeerde waarden met limit en bewaar de eerste match vóór het stoppen. Druk na de loop af, ook als niets past.",
      reviewCases,
      "Break",
    ),
    task(
      "Finish with labels for every corrected reading: 'high' above limit, otherwise 'ok'. Print Labels: and the complete list.",
      "Eindig met labels voor elke gecorrigeerde meting: 'high' boven limit, anders 'ok'. Druk Labels: en de volledige list af.",
      "labels == ['high' if v > limit else 'ok' for v in corrected] and ('Labels: ' + str(labels)) in _stdout.splitlines()",
      "Use an if/else expression that produces one label per corrected value, not a filter that removes normal values.",
      "Gebruik een if/else-expressie die één label per gecorrigeerde waarde maakt, geen filter dat normale waarden verwijdert.",
      reviewCases,
      "IfExp",
    ),
  ],
  solutionNote: loc(
    "Each stage keeps its input available and gives the next stage a clear output. Nested loops flatten the batches, continue excludes failed raw readings, the comprehension calibrates valid values, the accumulator totals them, and break retains only the first alert. Labels deliberately cover every corrected value, unlike the first-alert search.",
    "Elke fase bewaart zijn invoer en geeft de volgende fase een duidelijk resultaat. Geneste loops maken de batches vlak, continue sluit mislukte ruwe metingen uit, de comprehension kalibreert geldige waarden, de accumulator telt ze op en break bewaart alleen de eerste waarschuwing. Labels beschrijven bewust elke gecorrigeerde waarde, anders dan de zoekactie naar de eerste waarschuwing.",
  ),
});
