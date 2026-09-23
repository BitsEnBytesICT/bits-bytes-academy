import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "python-errors";
const C = (step, rows) => ({
  ...step,
  cases: rows.map(([inputs, check]) => ({ inputs, check })),
});

G(g, 1, {
  titleNl: "Van foutmelding naar aanwijzing",
  intro: loc(
    "A program can fail before it starts, stop while it runs, or finish with an incorrect result. Debugging means finding the difference between what you expected and what the program actually does. Start with the evidence: the smallest input that shows the problem, the output so far, and any error message.",
    "Een programma kan al vóór het starten mislukken, tijdens de uitvoering stoppen of eindigen met een verkeerd resultaat. Debuggen betekent het verschil onderzoeken tussen je verwachting en wat het programma werkelijk doet. Begin met de aanwijzingen: de kleinste invoer die het probleem laat zien, de output tot dat moment en een eventuele foutmelding.",
  ),
  sections: [
    S(
      "Three useful clues",
      "Drie bruikbare aanwijzingen",
      "A SyntaxError means Python could not understand the structure of the file. A NameError means execution reached a name that has no value. A TypeError means an operation received an unsupported type. These names narrow your search; they do not explain your entire program for you.\n\nFor runtime errors, read the last line of the traceback for the error type and message, then find the indicated line in main.py. For syntax errors, inspect that line and the one above it: an unfinished quote or parenthesis can make the next line look wrong.",
      "Een SyntaxError betekent dat Python de structuur van het bestand niet begrijpt. Bij een NameError bereikt de uitvoering een naam die geen waarde heeft. Bij een TypeError krijgt een bewerking een ongeschikt type. Deze namen beperken je zoekgebied, maar verklaren niet vanzelf je hele programma.\n\nLees bij runtime-fouten de laatste regel van de traceback voor het fouttype en de melding. Zoek daarna de aangegeven regel in main.py op. Bekijk bij syntaxfouten ook de regel erboven: een onafgesloten aanhalingsteken of haakje kan de volgende regel verdacht maken.",
    ),
    S(
      "Reproduce, inspect, change, rerun",
      "Herhalen, onderzoeken, aanpassen, uitvoeren",
      "The editor contains a working stock report. Run it once to establish a baseline. Then change `print(remaining)` to `print(Remaining)` and run again. Which earlier line still appears? Read the NameError, repair the spelling, and rerun.\n\nNext, temporarily remove the colon after the if condition. This time Python cannot parse the file, so none of its print calls run. Restore the colon. Deliberately making one small change helps you connect the error message to its cause.",
      "In de editor staat een werkend voorraadrapport. Voer het eerst uit als referentie. Verander daarna `print(remaining)` in `print(Remaining)` en voer opnieuw uit. Welke eerdere regel verschijnt nog wel? Lees de NameError, herstel de spelling en voer opnieuw uit.\n\nVerwijder vervolgens tijdelijk de dubbele punt achter de if-voorwaarde. Python kan het bestand nu niet ontleden, dus geen enkele print-aanroep wordt uitgevoerd. Zet de dubbele punt terug. Met één kleine, bewuste wijziging leer je de foutmelding aan de oorzaak koppelen.",
      'stock = 14\nordered = 5\nremaining = stock - ordered\nprint("Stock report")\nprint(remaining)\nif remaining < 10:\n    print("Reorder soon")',
      "Stock report\n9\nReorder soon",
    ),
  ],
  starter:
    'stock = 14\nordered = 5\nremaining = stock - ordered\nprint("Stock report")\nprint(remaining)\nif remaining < 10:\n    print("Reorder soon")\n',
  solution:
    'stock = 14\nordered = 5\nremaining = stock - ordered\nprint("Stock report")\nprint(remaining)\nif remaining < 10:\n    print("Reorder soon")\n',
  solutionNote: loc(
    "The repaired baseline prints three lines. A misspelled name interrupts execution only when that line is reached; a syntax error prevents the file from starting. Keep one working version in mind while making and reversing each experiment.",
    "De herstelde basisversie drukt drie regels af. Een verkeerd gespelde naam onderbreekt de uitvoering pas zodra die regel wordt bereikt; een syntaxfout voorkomt dat het bestand start. Houd de werkende versie in gedachten terwijl je elke wijziging probeert en weer terugdraait.",
  ),
});

G(g, 2, {
  titleNl: "Herstel een kapotte routeplanner",
  intro: loc(
    "Python must parse the whole file before it can run it. A missing colon, a misspelled keyword or an unclosed parenthesis can prevent even earlier print calls from executing. Fix the first reported structural problem and run again: the next error may only become visible after the first is repaired.",
    "Python moet het hele bestand ontleden voordat het wordt uitgevoerd. Een ontbrekende dubbele punt, verkeerd gespeld keyword of onafgesloten haakje kan zelfs eerdere print-aanroepen tegenhouden. Herstel het eerste gemelde structuurprobleem en voer opnieuw uit: de volgende fout wordt soms pas daarna zichtbaar.",
  ),
  sections: [
    S(
      "Read the shape of a branch",
      "Lees de vorm van een branch",
      "A conditional header ends with a colon. Its body is indented. `elif` is one keyword, and all headers in the same chain line up. Each opening parenthesis needs a closing one. Compare the shape of this working example with the route planner in the editor.",
      "De kop van een voorwaardelijk blok eindigt met een dubbele punt. De inhoud springt in. `elif` is één keyword en alle koppen in dezelfde keten staan onder elkaar. Elk openingshaakje heeft een sluithaakje nodig. Vergelijk de vorm van dit werkende voorbeeld met de routeplanner in de editor.",
      'distance = 8\nif distance < 3:\n    print("Walk")\nelif distance < 12:\n    print("Cycle")\nelse:\n    print("Take transit")',
      "Cycle",
    ),
    S(
      "Repair, then test another route",
      "Herstel en test een andere route",
      "The supplied planner contains three syntax defects. Repair them one at a time without deleting its branches. The task checks can turn green only once the whole file is valid Python. After it runs, use different inputs to check that you preserved its decisions, not just its appearance.",
      "De meegeleverde planner bevat drie syntaxfouten. Herstel ze één voor één zonder branches te verwijderen. De taakcontroles kunnen pas groen worden als het hele bestand geldige Python is. Probeer daarna andere invoer om te controleren of je de beslissingen hebt behouden en niet alleen de vorm.",
    ),
  ],
  starter:
    '# Route planner: keep all three choices.\ndistance = 8\nprint("Route planner")\n\nif distance < 3\n    mode = "Walk"\nelsif distance < 12:\n    mode = "Cycle"\nelse:\n    mode = "Transit"\n\nprint(mode\n# Add a distance summary after the repairs.\n',
  solution:
    'distance = 8\nprint("Route planner")\nif distance < 3:\n    mode = "Walk"\nelif distance < 12:\n    mode = "Cycle"\nelse:\n    mode = "Transit"\nprint(mode)\nprint("Distance: " + str(distance))\n',
  steps: [
    C(
      T(
        "Run the broken file and use the reported location to repair the first if header. Keep its condition `distance < 3`. Continue with the next repairs even if this check remains pending.",
        "Voer het kapotte bestand uit en herstel met de gemelde locatie de eerste if-kop. Behoud de voorwaarde `distance < 3`. Ga verder met de volgende reparaties, ook als deze controle nog niet slaagt.",
        "distance == 8 and mode == 'Cycle'",
        "A header needs a colon before its indented body. Other syntax errors still prevent execution.",
        "Een kop heeft een dubbele punt nodig vóór het ingesprongen blok. Andere syntaxfouten houden de uitvoering nog tegen.",
        "Restore a valid if header and keep the short-distance route. All three syntax repairs are needed before the file can run.",
        "Herstel een geldige if-kop en behoud de route voor korte afstanden. Alle drie syntaxreparaties zijn nodig voordat het bestand kan starten.",
      ),
      [
        [{ distance: 2 }, "mode == 'Walk'"],
        [{ distance: 3 }, "mode == 'Cycle'"],
      ],
    ),
    C(
      T(
        "Run again and repair the misspelled middle-branch keyword. Keep all three routes: Walk below 3, Cycle from 3 up to 12, and Transit from 12 onward.",
        "Voer opnieuw uit en herstel het verkeerd gespelde keyword van de middelste branch. Behoud alle routes: Walk onder 3, Cycle vanaf 3 tot 12 en Transit vanaf 12.",
        "mode == 'Cycle' and any(isinstance(n, _ast.If) and n.orelse and isinstance(n.orelse[0], _ast.If) for n in _ast.walk(_ast.parse(_source)))",
        "Python spells the combined else-if keyword elif.",
        "Python schrijft het gecombineerde else-if-keyword als elif.",
        "Use an if/elif/else chain and preserve the boundaries at 3 and 12.",
        "Gebruik een if/elif/else-keten en behoud de grenzen bij 3 en 12.",
      ),
      [
        [{ distance: 11 }, "mode == 'Cycle'"],
        [{ distance: 12 }, "mode == 'Transit'"],
      ],
    ),
    T(
      "Repair the unfinished print call. Run to confirm the first two output lines are Route planner and Cycle.",
      "Herstel de onafgemaakte print-aanroep. Controleer dat de eerste twee outputregels Route planner en Cycle zijn.",
      "_stdout.splitlines()[:2] == ['Route planner','Cycle']",
      "Pair print's opening parenthesis with a closing one after mode.",
      "Sluit het openingshaakje van print na mode af met een sluithaakje.",
      "The program must run and print the planner heading followed by its chosen mode.",
      "Het programma moet uitvoeren en de plannerkop gevolgd door de gekozen reiswijze afdrukken.",
    ),
    C(
      T(
        "Add a final summary line using the distance variable: `Distance: 8`. Test distance = 12, then restore 8 for the graded run.",
        "Voeg een laatste samenvattingsregel met de distance-variabele toe: `Distance: 8`. Test distance = 12 en zet daarna 8 terug voor de beoordeling.",
        "_stdout.splitlines() == ['Route planner','Cycle','Distance: 8']",
        "Combine the label with str(distance). The same line should work for any distance.",
        "Combineer het label met str(distance). Dezelfde regel moet voor elke afstand werken.",
        "Print the numeric distance as text after the chosen route; do not hardcode 8 in the message.",
        "Druk de numerieke afstand als tekst na de gekozen route af; zet geen vaste 8 in het bericht.",
      ),
      [
        [
          { distance: 12 },
          "_stdout.splitlines() == ['Route planner','Transit','Distance: 12']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The colon, elif keyword and closing parenthesis repair the grammar without changing the decisions. At distance 12, both earlier comparisons are false, so the fallback selects Transit. The final message reads the current variable and stays correct when the input changes.",
    "De dubbele punt, het keyword elif en het sluithaakje herstellen de grammatica zonder de beslissingen te veranderen. Bij afstand 12 zijn beide eerdere vergelijkingen onwaar, dus kiest de fallback Transit. Het laatste bericht leest de huidige variabele en blijft kloppen als de invoer verandert.",
  ),
});

G(g, 3, {
  titleNl: "Volg de namen in een scoreprogramma",
  intro: loc(
    "Variables must be assigned before a running statement reads them. A NameError often comes from a spelling mismatch or a missing setup line. A variable's name is case-sensitive: `score`, `Score` and `scroe` are three different names. The traceback tells you where Python first needed the unavailable value.",
    "Variabelen moeten een waarde krijgen voordat een uitgevoerde instructie ze leest. Een NameError komt vaak door verschillende schrijfwijzen of een ontbrekende instelregel. Hoofdletters tellen mee: `score`, `Score` en `scroe` zijn drie verschillende namen. De traceback laat zien waar Python de ontbrekende waarde voor het eerst nodig had.",
  ),
  sections: [
    S(
      "Trace the name back to its assignment",
      "Volg de naam terug naar de toewijzing",
      "Read the failing line, then search above it for the assignment that should supply that name. Repair the intended data flow instead of creating another variable just to silence the error. This example consistently uses total, so its calculation and display agree.",
      "Lees de foutregel en zoek daarboven de toewijzing die de naam een waarde moet geven. Herstel de bedoelde gegevensstroom in plaats van zomaar nog een variabele toe te voegen om de fout te laten verdwijnen. Dit voorbeeld gebruikt overal total, zodat berekening en weergave overeenkomen.",
      'points = 6\nbonus = 3\ntotal = points + bonus\nprint("Total: " + str(total))',
      "Total: 9",
    ),
    S(
      "One repair can expose another",
      "Een reparatie kan een volgende fout tonen",
      "The editor holds a two-round scoring program. One answer is missing; later, the score has a misspelled name. Run after each repair and notice how execution gets farther. Keep the variable called score throughout. Checks become available once both NameErrors are repaired.",
      "In de editor staat een scoreprogramma met twee rondes. Eén antwoord ontbreekt; verderop is de scorenaam verkeerd gespeld. Voer na elke reparatie uit en merk op dat de uitvoering verder komt. Gebruik overal de variabele score. De controles kunnen slagen zodra beide NameErrors zijn hersteld.",
    ),
  ],
  starter:
    'answer_one = "blue"\n# The second submitted answer should be "circle".\nscore = 0\n\nif answer_one == "blue":\n    score += 1\nif answer_two == "circle":\n    scroe += 1\n\nprint("Score: " + str(score))\n# Add a perfect-round message for a score of 2.\n',
  solution:
    'answer_one = "blue"\nanswer_two = "circle"\nscore = 0\nif answer_one == "blue":\n    score += 1\nif answer_two == "circle":\n    score += 1\nprint("Score: " + str(score))\nif score == 2:\n    print("Perfect round")\n',
  steps: [
    T(
      "Run and read the first NameError. Define `answer_two` as the string circle beside answer_one, before the conditions use it. Run again to reveal the next error.",
      "Voer uit en lees de eerste NameError. Definieer `answer_two` als de string circle naast answer_one, voordat de voorwaarden deze gebruiken. Voer opnieuw uit om de volgende fout te zien.",
      "answer_two == 'circle'",
      "An assignment above both if statements makes the second answer available when Python needs it.",
      "Een toewijzing boven beide if-instructies maakt het tweede antwoord beschikbaar wanneer Python het nodig heeft.",
      "Define answer_two before its comparison, then repair the later spelling error so the complete file can run.",
      "Definieer answer_two vóór de vergelijking en herstel daarna de latere spelfout zodat het hele bestand kan uitvoeren.",
    ),
    C(
      T(
        "Repair the misspelled score name in the second branch. Keep the single accumulator `score`, starting at 0 and gaining one point for each correct answer. The printed score should now be 2.",
        "Herstel de verkeerd gespelde scorenaam in de tweede branch. Behoud één teller `score`, beginnend op 0 en met één punt per goed antwoord. De afgedrukte score moet nu 2 zijn.",
        "score == 2 and _stdout.splitlines()[:1] == ['Score: 2']",
        "Both += lines must update the same name assigned to 0 above the conditions.",
        "Beide +=-regels moeten dezelfde naam bijwerken die boven de voorwaarden op 0 staat.",
        "Update score in both branches. One wrong answer should produce 1 point; two wrong answers should produce 0.",
        "Werk in beide branches score bij. Eén fout antwoord moet 1 punt opleveren; twee foute antwoorden 0.",
      ),
      [
        [{ answer_one: "red" }, "score == 1"],
        [{ answer_two: "square" }, "score == 1"],
        [{ answer_one: "red", answer_two: "square" }, "score == 0"],
      ],
    ),
    C(
      T(
        "After the score display, add an if statement that prints Perfect round only when score is 2. Try a wrong answer, then restore both original answers.",
        "Voeg na de scoreweergave een if-instructie toe die alleen bij score 2 Perfect round afdrukt. Probeer een fout antwoord en herstel daarna beide oorspronkelijke antwoorden.",
        "_stdout.splitlines() == ['Score: 2','Perfect round']",
        "Keep the score display unconditional; indent only the celebration under if score == 2.",
        "Laat de score altijd afdrukken; laat alleen het feestbericht inspringen onder if score == 2.",
        "Show Perfect round only for two correct answers; the score itself must always be printed.",
        "Toon Perfect round alleen bij twee goede antwoorden; de score zelf moet altijd worden afgedrukt.",
      ),
      [
        [{ answer_two: "square" }, "_stdout.splitlines() == ['Score: 1']"],
        [
          { answer_one: "red", answer_two: "square" },
          "_stdout.splitlines() == ['Score: 0']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The missing assignment supplies the second answer. Correcting scroe to score restores one shared accumulator instead of creating a second score. The final conditional reads the total after both rounds, so its message describes the complete result.",
    "De ontbrekende toewijzing levert het tweede antwoord. Door scroe in score te veranderen herstel je één gedeelde teller in plaats van een tweede score te maken. De laatste voorwaarde leest het totaal na beide rondes, zodat het bericht het volledige resultaat beschrijft.",
  ),
});

G(g, 4, {
  titleNl: "Kies de juiste typeconversie",
  intro: loc(
    "An operation can be valid Python syntax yet incompatible with its values. Text from a form is still text even when it contains digits. Convert to a number when you need arithmetic, and convert to text when you need string concatenation. Converting everything to strings can hide one error while breaking the calculation.",
    "Een bewerking kan geldige Python-syntax zijn en toch niet passen bij de waarden. Tekst uit een formulier blijft tekst, ook als er cijfers in staan. Zet om naar een getal voor berekeningen en naar tekst voor het samenvoegen van strings. Alles naar strings omzetten kan één fout verbergen maar de berekening kapotmaken.",
  ),
  sections: [
    S(
      "Choose a direction",
      "Kies een richting",
      "For arithmetic, use int on suitable whole-number text or float on suitable decimal text. For a message made with +, use str on a number. Each conversion returns a new value. It does not change the original variable unless you assign the result back to it.",
      "Gebruik voor berekeningen int bij geschikte tekst met gehele getallen of float bij geschikte decimale tekst. Gebruik voor een bericht met + de functie str op een getal. Elke conversie geeft een nieuwe waarde terug. De oorspronkelijke variabele verandert alleen als je het resultaat eraan toewijst.",
      'count_text = "4"\ncount = int(count_text)\ncost = count * 3\nprint("Cost: " + str(cost))\nprint(type(count_text))',
      "Cost: 12\n<class 'str'>",
    ),
    S(
      "Repair the calculation before its label",
      "Herstel de berekening vóór het label",
      "The packing estimator first tries to add a number to text, then tries to attach a numeric total to a message. These are two different boundaries. Repair each at its own point. Keep the original quantity_text unchanged so you can still inspect what arrived from the form. Both repairs are needed before the final output can be checked.",
      "De verpakkingscalculator probeert eerst een getal bij tekst op te tellen en daarna een numeriek totaal aan een bericht te plakken. Dit zijn twee verschillende overgangen. Herstel elk op de juiste plek. Laat quantity_text ongewijzigd zodat je kunt blijven zien wat uit het formulier kwam. Beide reparaties zijn nodig voordat de laatste output kan worden gecontroleerd.",
    ),
  ],
  starter:
    'quantity_text = "6"\nspares = 2\nunit_price = 3\n\nquantity = quantity_text + spares\ntotal = quantity * unit_price\nprint("Packing estimate")\nprint("Total: " + total)\n# Show the number of packed units on the final line.\n',
  solution:
    'quantity_text = "6"\nspares = 2\nunit_price = 3\nquantity = int(quantity_text) + spares\ntotal = quantity * unit_price\nprint("Packing estimate")\nprint("Total: " + str(total))\nprint("Units: " + str(quantity))\n',
  steps: [
    C(
      T(
        "Run and inspect the first TypeError. Convert quantity_text to an integer when calculating `quantity`, then add spares. Keep quantity_text as the original string.",
        "Voer uit en onderzoek de eerste TypeError. Zet quantity_text bij het berekenen van `quantity` om naar een integer en tel daarna spares erbij op. Behoud quantity_text als oorspronkelijke string.",
        "quantity_text == '6' and type(quantity_text) is str and type(quantity) is int and quantity == 8",
        "Use int(quantity_text) on the numeric side of the calculation, not str(spares).",
        "Gebruik int(quantity_text) aan de numerieke kant van de berekening, niet str(spares).",
        "Calculate 6 + 2 numerically to get 8, keeping the original form text intact. Repair the display error next.",
        "Bereken 6 + 2 numeriek tot 8 en behoud de oorspronkelijke formuliertekst. Herstel vervolgens de weergavefout.",
      ),
      [
        [
          { quantity_text: "10", spares: 1 },
          "quantity == 11 and type(quantity) is int",
        ],
      ],
    ),
    C(
      T(
        "Run again. Keep `total` numeric, but convert it to text inside the Total message. The first two lines should be Packing estimate and Total: 24.",
        "Voer opnieuw uit. Houd `total` numeriek, maar zet deze binnen het Total-bericht om naar tekst. De eerste twee regels moeten Packing estimate en Total: 24 zijn.",
        "total == 24 and type(total) is int and _stdout.splitlines()[:2] == ['Packing estimate','Total: 24']",
        "Write str(total) only where you join it to the label.",
        "Schrijf str(total) alleen waar je de waarde aan het label plakt.",
        "Keep total available for arithmetic and convert it at the display boundary.",
        "Houd total beschikbaar voor berekeningen en zet deze pas bij het weergeven om.",
      ),
      [
        [
          { quantity_text: "10", spares: 1 },
          "total == 33 and _stdout.splitlines()[:2] == ['Packing estimate','Total: 33']",
        ],
      ],
    ),
    C(
      T(
        'Add a final line showing Units: 8 from quantity. Test quantity_text = "10", then restore "6". Explain why converting the number to text for display does not change quantity itself.',
        'Voeg een laatste regel toe die Units: 8 uit quantity toont. Test quantity_text = "10" en zet daarna "6" terug. Leg uit waarom omzetten naar tekst voor de weergave quantity zelf niet verandert.',
        "_stdout.splitlines() == ['Packing estimate','Total: 24','Units: 8'] and type(quantity) is int",
        "Use the same display conversion as for total, but read quantity.",
        "Gebruik dezelfde weergaveconversie als bij total, maar lees quantity.",
        "Build Units from the calculated integer so the message follows changed quantities too.",
        "Bouw Units uit de berekende integer zodat het bericht ook gewijzigde aantallen volgt.",
      ),
      [
        [
          { quantity_text: "10", spares: 1 },
          "_stdout.splitlines() == ['Packing estimate','Total: 33','Units: 11']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "int converts the incoming digits before addition, so 6 + 2 produces 8 instead of combining text. The total stays numeric. str creates temporary text for each printed message; quantity and total remain integers afterward.",
    "int zet de binnenkomende cijfers vóór het optellen om, zodat 6 + 2 het getal 8 geeft in plaats van tekst samen te voegen. Het totaal blijft numeriek. str maakt tijdelijke tekst voor elk afgedrukt bericht; quantity en total blijven daarna integers.",
  ),
});

G(g, 5, {
  titleNl: "Een programma zonder foutmelding kan toch fout zijn",
  intro: loc(
    "Once a program runs, compare its result with the rule it is supposed to implement. A logic error can produce plausible output with no exception at all. Use a small table of expected cases, especially values exactly on a boundary, rather than trusting one successful run.",
    "Vergelijk zodra een programma uitvoert het resultaat met de regel die het hoort toe te passen. Een logische fout kan aannemelijke output geven zonder exception. Gebruik een klein overzicht van verwachte gevallen, vooral waarden precies op een grens, in plaats van op één geslaagde uitvoering te vertrouwen.",
  ),
  sections: [
    S(
      "Check the promise",
      "Controleer de afspraak",
      "A fictional shop waives a delivery fee when the order total is at least 20. The supplied program runs, but charges a fee at exactly 20. Predict the output for totals 19, 20 and 21 before testing them. Identify which comparison disagrees with the rule and repair it.\n\nThen extend the rule: members also receive free delivery, even below 20. Add a member Boolean and combine the two qualifying conditions with or. Test both member values at 19 and at 20.",
      "Een fictieve winkel rekent geen verzendkosten bij een ordertotaal van minstens 20. Het meegeleverde programma voert uit, maar rekent bij precies 20 wel kosten. Voorspel de output voor 19, 20 en 21 voordat je test. Zoek welke vergelijking niet bij de regel past en herstel deze.\n\nBreid daarna de regel uit: leden krijgen ook gratis verzending, zelfs onder 20. Voeg een Boolean member toe en combineer de twee voorwaarden met or. Test beide lidmaatschapswaarden bij 19 en bij 20.",
    ),
    S(
      "Keep a debugging routine",
      "Houd een vaste debugroutine aan",
      "Syntax errors: inspect structure and punctuation. Name errors: follow the name to its assignment. Type errors: inspect the operation and the types on both sides. Logic errors: compare expected and actual results for several inputs. Change one cause at a time, rerun, and keep the cases that exposed the bug for later checks.",
      "Syntaxfouten: onderzoek structuur en leestekens. Naamfouten: volg de naam terug naar de toewijzing. Typefouten: onderzoek de bewerking en de types aan beide kanten. Logische fouten: vergelijk verwacht en werkelijk resultaat voor verschillende invoer. Verander steeds één oorzaak, voer opnieuw uit en bewaar de gevallen die de fout zichtbaar maakten voor latere controles.",
      "total = 20\nqualifies = total >= 20\nprint(qualifies)",
      "True",
    ),
  ],
  starter:
    '# Rule: delivery is free for totals of at least 20.\ntotal = 20\nif total > 20:\n    delivery = 0\nelse:\n    delivery = 4\nprint("Delivery: " + str(delivery))\nprint("Pay: " + str(total + delivery))\n',
  solution:
    'total = 20\nmember = False\nif total >= 20 or member:\n    delivery = 0\nelse:\n    delivery = 4\nprint("Delivery: " + str(delivery))\nprint("Pay: " + str(total + delivery))\n',
  solutionNote: loc(
    "At least includes equality, so >= repairs the boundary. The optional member extension uses or because either qualification is sufficient. At total 19, a non-member pays delivery 4 while a member pays 0. At total 20 both receive free delivery. No exception was needed to reveal the original logic mistake.",
    "Minstens omvat gelijkheid, dus >= herstelt de grens. De optionele uitbreiding met member gebruikt or omdat één voorwaarde al genoeg is. Bij totaal 19 betaalt een niet-lid 4 verzendkosten en een lid 0. Bij totaal 20 krijgen beiden gratis verzending. Er was geen exception nodig om de oorspronkelijke logische fout te ontdekken.",
  ),
});
