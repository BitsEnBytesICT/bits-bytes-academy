import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const welcome = lesson({
  module: 1,
  number: 1,
  title: L("A welcome that can change", "Een welkom dat kan veranderen"),
  guidance: "guided",
  minutes: 10,
  explanation: L(
    "A program is a set of instructions that Python follows. This workshop notice already runs. Your first job is to change its message without losing the useful information beneath it. Run the starter once before editing: the terminal is where you see what your program actually does.",
    "Een programma is een reeks instructies die Python uitvoert. Dit workshopbericht werkt al. Je eerste taak is het bericht aanpassen zonder de nuttige informatie eronder kwijt te raken. Voer de startcode eerst uit: in de terminal zie je wat je programma echt doet.",
  ),
  sections: [
    section(
      L("Text and names", "Tekst en namen"),
      L(
        'Quoted text is a string. A variable is a name for a value. On the first line below, = stores the string under the name place. In print(place), Python looks up that value. print("place") would print the word place instead.',
        'Tekst tussen aanhalingstekens is een string. Een variabele is een naam voor een waarde. Op de eerste regel slaat = de string op onder de naam place. In print(place) zoekt Python die waarde op. print("place") zou juist het woord place afdrukken.',
      ),
      'place = "Studio"\nprint(place)\nprint("Bring a notebook")',
      "Studio\nBring a notebook",
    ),
    section(
      L("Notes for people", "Notities voor mensen"),
      L(
        "A # starts a comment. Python ignores the rest of that line. Comments can explain why a line exists; they do not appear in the terminal. Each print() below produces a new output line.",
        "Een # begint een commentaar. Python negeert de rest van die regel. Commentaar kan uitleggen waarom een regel bestaat; het verschijnt niet in de terminal. Elke print() hieronder produceert een nieuwe uitvoerregel.",
      ),
      '# Keep the location in one place\nroom = "Library"\nprint(room)\nprint(room)',
      "Library\nLibrary",
    ),
  ],
  starter:
    '# Workshop notice\nworkshop = "Repair afternoon"\nprint("workshop")\nprint("Bring a broken item")\n',
  solution:
    '# Keep the workshop name in one place\nworkshop = "Robot workshop"\nprint(workshop)\nprint("Bring a broken item")\nprint("Everyone is welcome")\n',
  tasks: [
    task(
      "",
      L(
        "Make the first output line show the value of workshop, instead of the word workshop.",
        "Laat de eerste uitvoerregel de waarde van workshop tonen, in plaats van het woord workshop.",
      ),
      "_stdout.splitlines()[0] == workshop",
      [
        L(
          "Compare a quoted word with an unquoted variable name.",
          "Vergelijk een woord tussen aanhalingstekens met een variabelenaam zonder aanhalingstekens.",
        ),
        L(
          "Keep the variable assignment. Change which value the first print receives.",
          "Behoud de toekenning aan de variabele. Verander welke waarde de eerste print ontvangt.",
        ),
        L(
          "In the example, print(place) uses the stored location.",
          "In het voorbeeld gebruikt print(place) de opgeslagen locatie.",
        ),
      ],
      L(
        "The first output line should contain the current workshop name.",
        "De eerste uitvoerregel moet de huidige workshopnaam bevatten.",
      ),
    ),
    task(
      "",
      L(
        "Choose a different workshop name. Keep the reminder to bring a broken item.",
        "Kies een andere workshopnaam. Behoud de herinnering om een kapot voorwerp mee te nemen.",
      ),
      'isinstance(workshop, str) and workshop.strip() not in ("", "Repair afternoon", "workshop") and "Bring a broken item" in _stdout',
      [
        L(
          "The name and the reminder serve different purposes.",
          "De naam en de herinnering hebben elk een ander doel.",
        ),
        L(
          "Change the value assigned to workshop, not the reminder line.",
          "Verander de waarde die aan workshop wordt toegekend, niet de herinneringsregel.",
        ),
        L(
          'For example, room = "Maker space" changes a stored label.',
          'Bijvoorbeeld: room = "Maker space" verandert een opgeslagen label.',
        ),
      ],
      L(
        "Use a new, nonempty name and retain the existing reminder.",
        "Gebruik een nieuwe, niet-lege naam en behoud de bestaande herinnering.",
      ),
    ),
    task(
      "",
      L(
        "Add a third line welcoming visitors, using your own wording. Run the notice and check the three lines in order.",
        "Voeg een derde regel toe die bezoekers welkom heet, in je eigen woorden. Voer het bericht uit en controleer de drie regels in volgorde.",
      ),
      "len(_stdout.splitlines()) == 3 and bool(_stdout.splitlines()[2].strip())",
      [
        L(
          "Output is produced when Python reaches a print call.",
          "Uitvoer ontstaat wanneer Python een print-aanroep bereikt.",
        ),
        L(
          "Place the new message after the existing reminder.",
          "Plaats het nieuwe bericht na de bestaande herinnering.",
        ),
        L(
          'print("See you soon") is one possible additional message.',
          'print("See you soon") is een mogelijk extra bericht.',
        ),
      ],
      L(
        "The notice needs exactly three nonempty lines.",
        "Het bericht heeft precies drie niet-lege regels nodig.",
      ),
    ),
  ],
  solutionNote: L(
    "The name and welcome sentence are your choice. Quoting the variable name would prevent the notice from following changes to its value.",
    "De naam en welkomstzin kies je zelf. Als je de variabelenaam tussen aanhalingstekens zet, volgt het bericht veranderingen van de waarde niet.",
  ),
});

const order = lesson({
  module: 1,
  number: 2,
  title: L("A price worth checking", "Een prijs om te controleren"),
  guidance: "guided",
  explanation: L(
    "A repair shop sells replacement parts. Someone wrote the order total by hand. You will replace that fragile number with a calculation, then account for a delivery charge and a voucher. When the order changes, the program should still work.",
    "Een reparatiewinkel verkoopt onderdelen. Iemand heeft het ordertotaal met de hand ingevuld. Je vervangt dat kwetsbare getal door een berekening en verwerkt daarna bezorgkosten en een kortingsbon. Als de bestelling verandert, moet het programma blijven werken.",
  ),
  sections: [
    section(
      L("Numbers are values, not labels", "Getallen zijn waarden, geen labels"),
      L(
        "An integer such as 4 represents a whole number; a float such as 2.5 can represent a fractional amount. Leave arithmetic values unquoted. Python uses +, -, *, and / for addition, subtraction, multiplication, and division.",
        "Een integer zoals 4 stelt een heel getal voor; een float zoals 2.5 kan een gebroken hoeveelheid voorstellen. Zet rekenwaarden niet tussen aanhalingstekens. Python gebruikt +, -, * en / voor optellen, aftrekken, vermenigvuldigen en delen.",
      ),
      "hours = 3\nrate = 8.5\npay = hours * rate\nprint(pay)",
      "25.5",
    ),
    section(
      L("Follow the dependencies", "Volg de afhankelijkheden"),
      L(
        "Python works from top to bottom. Calculate a value before using it in another calculation. Multiplication and division happen before addition and subtraction; parentheses let you group an operation explicitly.",
        "Python werkt van boven naar beneden. Bereken een waarde voordat je die in een andere berekening gebruikt. Vermenigvuldigen en delen gaan voor optellen en aftrekken; met haakjes kun je een bewerking expliciet groeperen.",
      ),
      "budget = 40\ntravel = 10\npeople = 3\nprint((budget - travel) / people)",
      "10.0",
    ),
  ],
  starter:
    "quantity = 4\nunit_price = 3.5\ndelivery = 2\nvoucher = 5\n\nsubtotal = 14\ntotal = subtotal\nprint(total)\n",
  solution:
    "quantity = 4\nunit_price = 3.5\ndelivery = 2\nvoucher = 5\n\nsubtotal = quantity * unit_price\ntotal = subtotal + delivery - voucher\nprint(total)\n",
  tasks: [
    task(
      "",
      L(
        "Make subtotal represent the cost of the ordered parts. It must also work when quantity or unit_price changes.",
        "Laat subtotal de kosten van de bestelde onderdelen voorstellen. Het moet ook werken wanneer quantity of unit_price verandert.",
      ),
      "subtotal == quantity * unit_price",
      [
        L(
          "Think about what one part costs and how many are ordered.",
          "Denk aan de prijs van één onderdeel en het bestelde aantal.",
        ),
        L(
          "The starter inputs should be used in the calculation instead of copying a known total.",
          "Gebruik de invoerwaarden uit de startcode in de berekening, in plaats van een bekend totaal over te nemen.",
        ),
        L(
          "For another situation, distance = trips * km_per_trip.",
          "In een andere situatie: distance = trips * km_per_trip.",
        ),
      ],
      L(
        "The parts cost must follow both order inputs.",
        "De onderdelenkosten moeten beide orderwaarden volgen.",
      ),
      [
        {
          inputs: { quantity: 7, unit_price: 2.25 },
          check: "subtotal == 15.75 and _error is None",
        },
      ],
    ),
    task(
      "",
      L(
        "Update total to include one delivery charge and deduct one voucher from the order.",
        "Werk total bij zodat één bezorgbedrag wordt toegevoegd en één kortingsbon van de bestelling wordt afgetrokken.",
      ),
      "total == subtotal + delivery - voucher",
      [
        L(
          "Which amounts add to the bill, and which amount reduces it?",
          "Welke bedragen verhogen de rekening en welk bedrag verlaagt die?",
        ),
        L(
          "Delivery and the voucher apply to the whole order, not to each part.",
          "Bezorgkosten en de kortingsbon gelden voor de hele bestelling, niet voor elk onderdeel.",
        ),
        L(
          "A different budget might use remaining = starting_budget - expense + refund.",
          "Een ander budget kan remaining = starting_budget - expense + refund gebruiken.",
        ),
      ],
      L(
        "Check that delivery and the voucher are applied once each.",
        "Controleer of bezorgkosten en de kortingsbon elk eenmaal zijn verwerkt.",
      ),
      [
        {
          inputs: { quantity: 3, unit_price: 6, delivery: 4, voucher: 2 },
          check: "total == 20 and _error is None",
        },
      ],
    ),
    task(
      "",
      L(
        "Print the calculated total. Test a different quantity yourself, then leave any positive quantity in the editor.",
        "Druk het berekende totaal af. Test zelf een ander aantal en laat daarna een positief aantal in de editor staan.",
      ),
      "quantity > 0 and float(_stdout.strip()) == total",
      [
        L(
          "Printing a number copied from the terminal hides mistakes when an input changes.",
          "Een getal uit de terminal overnemen verbergt fouten wanneer een invoer verandert.",
        ),
        L(
          "The print call should use the result stored by your program.",
          "De print-aanroep moet het resultaat gebruiken dat je programma heeft opgeslagen.",
        ),
        L(
          "print(pay) displays a calculated pay value.",
          "print(pay) toont een berekende waarde voor pay.",
        ),
      ],
      L(
        "The terminal should show the calculated total as a number.",
        "De terminal moet het berekende totaal als getal tonen.",
      ),
      [
        {
          inputs: { quantity: 2, unit_price: 8, delivery: 3, voucher: 1 },
          check: "float(_stdout.strip()) == 18 and _error is None",
        },
      ],
    ),
  ],
  solutionNote: L(
    "The arithmetic must follow the inputs. A result that happens to match the starter order is not enough when a customer changes the quantity.",
    "De berekening moet de invoer volgen. Een resultaat dat toevallig klopt voor de startbestelling is niet voldoende wanneer een klant het aantal verandert.",
  ),
});

const stock = lesson({
  module: 1,
  number: 3,
  title: L(
    "Stock changes during the day",
    "Voorraad verandert gedurende de dag",
  ),
  guidance: "adapt",
  explanation: L(
    "The stock log starts with a working report, but it ignores what happened during the day. Turn it into a sequence of updates. Keep the original opening stock available so the final report can show both the opening and closing position.",
    "Het voorraadlogboek begint met een werkend overzicht, maar negeert wat er gedurende de dag gebeurde. Maak er een reeks updates van. Houd de oorspronkelijke beginvoorraad beschikbaar zodat het eindoverzicht zowel de begin- als eindstand kan tonen.",
  ),
  sections: [
    section(
      L(
        "A variable can receive a new value",
        "Een variabele kan een nieuwe waarde krijgen",
      ),
      L(
        "The right side of an assignment is evaluated before the new value is stored. charge = charge + 4 uses the old charge to calculate the new one. charge += 4 is a shorter way to make the same update. Earlier calculations are not recalculated automatically.",
        "De rechterkant van een toekenning wordt berekend voordat de nieuwe waarde wordt opgeslagen. charge = charge + 4 gebruikt de oude charge om de nieuwe te berekenen. charge += 4 is een kortere manier voor dezelfde update. Eerdere berekeningen worden niet automatisch opnieuw uitgevoerd.",
      ),
      "charge = 10\nstart = charge\ncharge += 4\ncharge -= 3\nprint(start, charge)",
      "10 11",
    ),
  ],
  starter:
    "opening = 18\ndelivered = 7\nsold = 9\nreturned = 2\n\nstock = opening\nafter_delivery = stock\nafter_sales = stock\nclosing = stock\nprint(opening, closing)\n",
  solution:
    "opening = 18\ndelivered = 7\nsold = 9\nreturned = 2\n\nstock = opening\nstock += delivered\nafter_delivery = stock\nstock -= sold\nafter_sales = stock\nstock += returned\nclosing = stock\nprint(opening, closing)\n",
  tasks: [
    task(
      "",
      L(
        "Record the available stock after the delivery in after_delivery.",
        "Leg de beschikbare voorraad na de levering vast in after_delivery.",
      ),
      "after_delivery == opening + delivered",
      [
        L(
          "A delivery brings items into the shop.",
          "Een levering brengt artikelen de winkel binnen.",
        ),
        L(
          "Update stock before taking the after_delivery snapshot.",
          "Werk stock bij voordat je de momentopname after_delivery maakt.",
        ),
        L(
          "A counter can be updated with count += extra.",
          "Een teller kun je bijwerken met count += extra.",
        ),
      ],
      L(
        "The delivery snapshot should include the arriving items.",
        "De momentopname na levering moet de binnengekomen artikelen bevatten.",
      ),
      [
        {
          inputs: { opening: 12, delivered: 4 },
          check: "after_delivery == 16",
        },
      ],
    ),
    task(
      "",
      L(
        "Record the stock after the sales in after_sales. Do not change the earlier snapshot.",
        "Leg de voorraad na de verkopen vast in after_sales. Verander de eerdere momentopname niet.",
      ),
      "after_sales == after_delivery - sold",
      [
        L(
          "Sales remove items from the available stock.",
          "Verkopen halen artikelen uit de beschikbare voorraad.",
        ),
        L(
          "Use the stock after delivery as the starting point for the sales update.",
          "Gebruik de voorraad na levering als uitgangspunt voor de verkoopupdate.",
        ),
        L(
          "A running budget can use budget -= spent.",
          "Een lopend budget kan budget -= spent gebruiken.",
        ),
      ],
      L(
        "The sales snapshot should deduct the sold items from the delivered stock.",
        "De verkoopmomentopname moet verkochte artikelen van de voorraad na levering aftrekken.",
      ),
      [
        {
          inputs: { opening: 20, delivered: 3, sold: 6 },
          check: "after_sales == 17",
        },
      ],
    ),
    task(
      "",
      L(
        "Include the returned items in closing. Print opening and closing, in that order, without losing the original opening value.",
        "Verwerk de teruggebrachte artikelen in closing. Druk opening en closing in die volgorde af zonder de oorspronkelijke beginwaarde te verliezen.",
      ),
      "closing == after_sales + returned and _stdout.split() == [str(opening), str(closing)]",
      [
        L(
          "Returned items become available again.",
          "Teruggebrachte artikelen worden weer beschikbaar.",
        ),
        L(
          "Keep opening separate from the changing stock value.",
          "Houd opening apart van de veranderende stock-waarde.",
        ),
        L(
          "print(start, finish) can display two values on one line.",
          "print(start, finish) kan twee waarden op één regel tonen.",
        ),
      ],
      L(
        "Keep both report values, and include the returns in the closing stock.",
        "Behoud beide overzichtswaarden en verwerk retouren in de eindvoorraad.",
      ),
      [
        {
          inputs: { opening: 9, delivered: 0, sold: 4, returned: 1 },
          check:
            'opening == 9 and closing == 6 and _stdout.split() == ["9", "6"]',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Reassignment and augmented assignment are both valid. Snapshots capture the value at that point in execution; they do not follow later updates.",
    "Opnieuw toekennen en verkorte toekenning zijn allebei geldig. Momentopnamen bewaren de waarde op dat punt in de uitvoering; ze volgen latere updates niet.",
  ),
});

const grouping = lesson({
  module: 1,
  number: 4,
  title: L("The packing report is wrong", "Het inpakoverzicht klopt niet"),
  guidance: "adapt",
  explanation: L(
    "A workshop packs loose items into full boxes. The report claims that there are fractional full boxes and forgets the leftovers. Investigate the calculations and repair the report. The editor deliberately contains incorrect operators.",
    "Een werkplaats verpakt losse artikelen in volle dozen. Het overzicht beweert dat er gebroken aantallen volle dozen zijn en vergeet de rest. Onderzoek de berekeningen en herstel het overzicht. De editor bevat expres verkeerde operatoren.",
  ),
  sections: [
    section(
      L("Quotient and remainder", "Quotiënt en rest"),
      L(
        "For nonnegative quantities, // gives the number of whole groups and % gives the amount left after those groups. Ordinary / gives the division result, which may be fractional. These operators answer different questions.",
        "Bij niet-negatieve hoeveelheden geeft // het aantal hele groepen en % de hoeveelheid die daarna overblijft. Gewone / geeft het deelresultaat, dat gebroken kan zijn. Deze operatoren beantwoorden verschillende vragen.",
      ),
      "minutes = 137\nhours = minutes // 60\nremaining_minutes = minutes % 60\nprint(hours, remaining_minutes)",
      "2 17",
    ),
    section(
      L(
        "Check the story behind an answer",
        "Controleer het verhaal achter een antwoord",
      ),
      L(
        "A packing report should account for every item exactly once. After calculating the whole groups and the remainder, reconstruct the original quantity. This gives you a useful check even before running an automatic checker.",
        "Een inpakoverzicht moet elk artikel precies eenmaal verantwoorden. Bereken de hele groepen en de rest en reconstrueer daarna de oorspronkelijke hoeveelheid. Zo kun je zelf controleren, nog voordat je een automatische controle uitvoert.",
      ),
    ),
  ],
  starter:
    "items = 29\nbox_size = 6\n\nfull_boxes = items / box_size\nloose_items = items - box_size\naccounted_for = full_boxes + loose_items\nprint(full_boxes, loose_items, accounted_for)\n",
  solution:
    "items = 29\nbox_size = 6\n\nfull_boxes = items // box_size\nloose_items = items % box_size\naccounted_for = full_boxes * box_size + loose_items\nprint(full_boxes, loose_items, accounted_for)\n",
  tasks: [
    task(
      "",
      L(
        "Repair full_boxes so it counts only completely filled boxes.",
        "Herstel full_boxes zodat het alleen volledig gevulde dozen telt.",
      ),
      "full_boxes == items // box_size",
      [
        L(
          "Can a completely filled box be fractional?",
          "Kan een volledig gevulde doos een gebroken aantal zijn?",
        ),
        L(
          "Compare the three division-related operators in the example.",
          "Vergelijk de drie operatoren rond delen in het voorbeeld.",
        ),
        L(
          "For example, 17 // 5 evaluates to 3.",
          "Bijvoorbeeld: 17 // 5 heeft als uitkomst 3.",
        ),
      ],
      L(
        "Count whole filled boxes, not a fractional division result.",
        "Tel hele gevulde dozen, niet een gebroken deelresultaat.",
      ),
      [{ inputs: { items: 17, box_size: 4 }, check: "full_boxes == 4" }],
    ),
    task(
      "",
      L(
        "Repair loose_items to report what is left outside the full boxes.",
        "Herstel loose_items zodat het aangeeft wat buiten de volle dozen overblijft.",
      ),
      "loose_items == items % box_size",
      [
        L(
          "Imagine removing each full box from the original pile.",
          "Stel je voor dat je elke volle doos van de oorspronkelijke stapel afhaalt.",
        ),
        L(
          "The leftover quantity must be smaller than one box.",
          "De overgebleven hoeveelheid moet kleiner zijn dan één doos.",
        ),
        L(
          "For example, 17 % 5 evaluates to 2.",
          "Bijvoorbeeld: 17 % 5 heeft als uitkomst 2.",
        ),
      ],
      L(
        "The leftover count should be between zero and one boxful.",
        "Het aantal overgebleven artikelen moet tussen nul en één doosinhoud liggen.",
      ),
      [
        { inputs: { items: 24, box_size: 6 }, check: "loose_items == 0" },
        { inputs: { items: 2, box_size: 6 }, check: "loose_items == 2" },
      ],
    ),
    task(
      "",
      L(
        "Repair accounted_for to reconstruct the original item count using full_boxes, box_size, and loose_items. Try an exact multiple and a quantity smaller than one box.",
        "Herstel accounted_for zodat het oorspronkelijke aantal wordt gereconstrueerd met full_boxes, box_size en loose_items. Probeer een exact veelvoud en een hoeveelheid kleiner dan één doos.",
      ),
      "accounted_for == items and _stdout.split() == [str(full_boxes), str(loose_items), str(accounted_for)]",
      [
        L(
          "A box count and an item count use different units.",
          "Een aantal dozen en een aantal artikelen hebben verschillende eenheden.",
        ),
        L(
          "Convert the full boxes back to an item count before including the loose items.",
          "Zet de volle dozen terug om naar een aantal artikelen voordat je de losse artikelen meeneemt.",
        ),
        L(
          "Three trays with four cups each account for twelve cups.",
          "Drie dienbladen met elk vier kopjes verantwoorden twaalf kopjes.",
        ),
      ],
      L(
        "The reconstructed count must account for every original item.",
        "Het gereconstrueerde aantal moet alle oorspronkelijke artikelen verantwoorden.",
      ),
      [
        {
          inputs: { items: 0, box_size: 8 },
          check: "accounted_for == 0 and full_boxes == 0 and loose_items == 0",
        },
      ],
    ),
  ],
  solutionNote: L(
    "The three values describe the same stock in different ways. Exact multiples and quantities below one box are useful cases because they expose different mistakes.",
    "De drie waarden beschrijven dezelfde voorraad op verschillende manieren. Exacte veelvouden en hoeveelheden kleiner dan één doos zijn nuttige testgevallen omdat ze verschillende fouten blootleggen.",
  ),
});

const supplies = lesson({
  module: 1,
  number: 5,
  title: L("Plan the workshop supplies", "Plan de workshopbenodigdheden"),
  guidance: "independent",
  minutes: 18,
  explanation: L(
    "Each workshop visitor needs one notebook. The shop only sells sealed packs. Build a small planning report that buys enough notebooks without buying an unnecessary extra pack. You already know the Python needed; the challenge is deciding how to combine it. You may refer back to the packing lesson.",
    "Elke workshopbezoeker heeft één notitieboek nodig. De winkel verkoopt alleen gesloten verpakkingen. Bouw een klein planningsoverzicht dat voldoende notitieboeken inkoopt zonder een onnodige extra verpakking te kopen. Je kent de benodigde Python al; de uitdaging is bepalen hoe je die combineert. Je mag terugkijken naar de inpakles.",
  ),
  sections: [
    section(
      L(
        "A specification to reason about",
        "Een beschrijving om over na te denken",
      ),
      L(
        "With 14 visitors and packs of 6, two packs are not enough and three packs leave four notebooks spare. With 12 visitors, two packs are enough. With no visitors, nothing needs to be purchased. Your code should handle all three situations using the input values in the editor.",
        "Bij 14 bezoekers en verpakkingen van 6 zijn twee verpakkingen niet genoeg en laten drie verpakkingen vier notitieboeken over. Bij 12 bezoekers zijn twee verpakkingen genoeg. Zonder bezoekers hoeft niets te worden gekocht. Je code moet alle drie de situaties aankunnen met de invoerwaarden in de editor.",
      ),
    ),
  ],
  starter:
    "visitors = 23\npack_size = 5\npack_price = 7.5\n\n# Build your supply report below.\n",
  solution:
    "visitors = 23\npack_size = 5\npack_price = 7.5\n\npacks = (visitors + pack_size - 1) // pack_size\nspare = packs * pack_size - visitors\ncost = packs * pack_price\nprint(packs, spare, cost)\n",
  tasks: [
    task(
      "",
      L(
        "Calculate packs: the smallest whole number of packs that provides a notebook for every visitor. Zero visitors should require zero packs.",
        "Bereken packs: het kleinste gehele aantal verpakkingen dat elke bezoeker een notitieboek geeft. Nul bezoekers moet nul verpakkingen vereisen.",
      ),
      "packs == (visitors + pack_size - 1) // pack_size",
      [
        L(
          "Whole-group division rounds down. This problem sometimes needs the next whole group.",
          "Delen in hele groepen rondt naar beneden af. Dit probleem heeft soms de volgende hele groep nodig.",
        ),
        L(
          "Think about how much you could add before whole-group division without adding a pack when the original quantity fits exactly.",
          "Bedenk hoeveel je vóór het delen in hele groepen kunt toevoegen zonder een extra verpakking te krijgen wanneer de oorspronkelijke hoeveelheid precies past.",
        ),
        L(
          "For groups of 4, adding 3 before // 4 makes 5 items require 2 groups while 4 items still require 1.",
          "Bij groepen van 4 zorgt 3 optellen vóór // 4 ervoor dat 5 artikelen 2 groepen nodig hebben, terwijl 4 artikelen nog steeds 1 groep nodig hebben.",
        ),
      ],
      L(
        "There must be enough notebooks, with no unnecessary pack.",
        "Er moeten genoeg notitieboeken zijn, zonder een onnodige verpakking.",
      ),
      [0, 1, 12, 14, 25].map((visitors) => ({
        inputs: { visitors, pack_size: 6 },
        check: `packs == ${(visitors + 5 - ((visitors + 5) % 6)) / 6}`,
      })),
    ),
    task(
      "",
      L(
        "Calculate spare: the number of notebooks left after every visitor receives one.",
        "Bereken spare: het aantal notitieboeken dat overblijft nadat elke bezoeker er één heeft gekregen.",
      ),
      "spare == packs * pack_size - visitors",
      [
        L(
          "First distinguish notebooks bought from notebooks needed.",
          "Maak eerst onderscheid tussen gekochte en benodigde notitieboeken.",
        ),
        L(
          "Use the pack count you calculated and the number of notebooks in each pack.",
          "Gebruik het berekende aantal verpakkingen en het aantal notitieboeken per verpakking.",
        ),
        L(
          "If 3 bags contain 4 apples each and 10 apples are used, 2 remain.",
          "Als 3 zakken elk 4 appels bevatten en 10 appels worden gebruikt, blijven er 2 over.",
        ),
      ],
      L(
        "The spare count should describe notebooks, not unopened packs.",
        "Het restant moet notitieboeken beschrijven, niet ongeopende verpakkingen.",
      ),
      [
        { inputs: { visitors: 10, pack_size: 4 }, check: "spare == 2" },
        { inputs: { visitors: 12, pack_size: 4 }, check: "spare == 0" },
      ],
    ),
    task(
      "",
      L(
        "Calculate cost and print packs, spare, and cost in that order. Check the report with at least one exact fit and one non-exact fit.",
        "Bereken cost en druk packs, spare en cost in die volgorde af. Controleer het overzicht met minstens één precies passende en één niet precies passende hoeveelheid.",
      ),
      "cost == packs * pack_price and [float(n) for n in _stdout.split()] == [packs, spare, cost]",
      [
        L(
          "The price belongs to a pack, not to a single notebook.",
          "De prijs hoort bij een verpakking, niet bij één notitieboek.",
        ),
        L(
          "Use your computed quantities so the printed report follows changes to the inputs.",
          "Gebruik je berekende hoeveelheden zodat het afgedrukte overzicht veranderingen van de invoer volgt.",
        ),
        L(
          "print(boxes, remaining, amount) prints three values separated by spaces.",
          "print(boxes, remaining, amount) drukt drie waarden af, gescheiden door spaties.",
        ),
      ],
      L(
        "Check the pack-based price and the order of the three printed values.",
        "Controleer de prijs per verpakking en de volgorde van de drie afgedrukte waarden.",
      ),
      [
        {
          inputs: { visitors: 9, pack_size: 4, pack_price: 2.25 },
          check:
            "_error is None and [float(n) for n in _stdout.split()] == [3, 3, 6.75]",
        },
      ],
    ),
  ],
  solutionNote: L(
    "This solution rounds up using integer arithmetic. Other approaches are welcome if they meet the same behavior for zero, exact fits, and partial packs. The named result variables are the report interface, not a requirement to copy the reference algorithm.",
    "Deze oplossing rondt met gehele rekenkunde naar boven af. Andere aanpakken zijn welkom als ze hetzelfde gedrag hebben bij nul, precies passende hoeveelheden en gedeeltelijke verpakkingen. De genoemde resultaatvariabelen vormen de interface van het overzicht, geen verplichting om het referentie-algoritme over te nemen.",
  ),
});

const review = quiz(
  1,
  L(
    "Check your reasoning: useful programs",
    "Controleer je inzicht: nuttige programma’s",
  ),
  [
    question(
      "v2-m1-q1",
      L("What does the second line print?", "Wat drukt de tweede regel af?"),
      'name = "Workshop"\nprint("name")',
      [
        [
          L("name", "name"),
          L(
            "Quotes make this literal text.",
            "Aanhalingstekens maken dit letterlijke tekst.",
          ),
        ],
        [
          L("Workshop", "Workshop"),
          L(
            "That would require print(name), without quotes.",
            "Daarvoor heb je print(name) zonder aanhalingstekens nodig.",
          ),
        ],
        [
          L("Nothing", "Niets"),
          L(
            "The print call contains a valid string.",
            "De print-aanroep bevat een geldige string.",
          ),
        ],
      ],
    ),
    question(
      "v2-m1-q2",
      L("What is printed?", "Wat wordt afgedrukt?"),
      "amount = 7\nsnapshot = amount\namount += 3\nprint(snapshot, amount)",
      [
        [
          L("7 10", "7 10"),
          L(
            "snapshot keeps the earlier value; only amount is reassigned.",
            "snapshot behoudt de eerdere waarde; alleen amount krijgt een nieuwe waarde.",
          ),
        ],
        [
          L("10 10", "10 10"),
          L(
            "A saved numeric value does not follow later updates to another variable.",
            "Een opgeslagen getalswaarde volgt latere updates van een andere variabele niet.",
          ),
        ],
        [
          L("7 3", "7 3"),
          L(
            "+= adds to the existing value rather than replacing it with 3.",
            "+= telt op bij de bestaande waarde in plaats van die te vervangen door 3.",
          ),
        ],
      ],
    ),
    question(
      "v2-m1-q3",
      L(
        "You have 20 items and boxes of 6. Which result represents full boxes and loose items?",
        "Je hebt 20 artikelen en dozen van 6. Welke uitkomst stelt volle dozen en losse artikelen voor?",
      ),
      "",
      [
        [
          L("3 full boxes, 2 loose items", "3 volle dozen, 2 losse artikelen"),
          L(
            "Three boxes hold 18 items; two remain.",
            "Drie dozen bevatten 18 artikelen; er blijven er twee over.",
          ),
        ],
        [
          L("4 full boxes, 0 loose items", "4 volle dozen, 0 losse artikelen"),
          L(
            "Four full boxes would require 24 items.",
            "Vier volle dozen vereisen 24 artikelen.",
          ),
        ],
        [
          L("3 full boxes, 6 loose items", "3 volle dozen, 6 losse artikelen"),
          L(
            "That accounts for 24 items instead of 20.",
            "Dat verantwoordt 24 artikelen in plaats van 20.",
          ),
        ],
      ],
    ),
    question(
      "v2-m1-q4",
      L(
        "A program works for 13 visitors and packs of 5. Which test best checks that it avoids buying an extra pack when none is needed?",
        "Een programma werkt voor 13 bezoekers en verpakkingen van 5. Welke test controleert het beste of het geen extra verpakking koopt wanneer dat niet nodig is?",
      ),
      "",
      [
        [
          L("15 visitors, packs of 5", "15 bezoekers, verpakkingen van 5"),
          L(
            "An exact fit checks the boundary between needing another pack and not needing one.",
            "Een precies passende hoeveelheid controleert de grens tussen wel en geen extra verpakking nodig hebben.",
          ),
        ],
        [
          L("14 visitors, packs of 5", "14 bezoekers, verpakkingen van 5"),
          L(
            "This still leaves a partial pack; it does not check an exact fit.",
            "Dit laat nog steeds een gedeeltelijke verpakking over; het controleert geen precies passende hoeveelheid.",
          ),
        ],
        [
          L(
            "13 visitors, packs of 5 again",
            "Opnieuw 13 bezoekers, verpakkingen van 5",
          ),
          L(
            "Repeating the same input gives no new boundary evidence.",
            "Dezelfde invoer herhalen geeft geen nieuw bewijs over grensgevallen.",
          ),
        ],
      ],
    ),
    question(
      "v2-m1-q5",
      L(
        "The price should follow both inputs. Which line does that?",
        "De prijs moet beide invoerwaarden volgen. Welke regel doet dat?",
      ),
      "quantity = 3\nprice = 4",
      [
        [
          L("total = quantity * price", "total = quantity * price"),
          L(
            "Both stored inputs are used, so changing either affects the result.",
            "Beide opgeslagen invoerwaarden worden gebruikt, dus een verandering van een van beide beïnvloedt het resultaat.",
          ),
        ],
        [
          L("total = 12", "total = 12"),
          L(
            "This matches one order but ignores future changes.",
            "Dit klopt voor één bestelling maar negeert toekomstige veranderingen.",
          ),
        ],
        [
          L("total = quantity + price", "total = quantity + price"),
          L(
            "Adding a count and a unit price does not calculate an order price.",
            "Een aantal en een stuksprijs optellen berekent geen bestelprijs.",
          ),
        ],
      ],
    ),
  ],
);

review.questions[1].codeBlank = {
  prompt: L(
    "Preserve the original amount, then increase amount by 3. Complete the two missing expressions.",
    "Bewaar het oorspronkelijke bedrag en verhoog daarna amount met 3. Vul de twee ontbrekende uitdrukkingen in.",
  ),
  segments: [
    "amount = 7\nsnapshot = ",
    "\namount = ",
    "\nprint(snapshot, amount)\n",
  ],
  tokens: [
    { id: "saved", code: "amount" },
    { id: "update", code: "amount + 3" },
    { id: "literal", code: '"amount"' },
    { id: "replace", code: "3" },
  ],
  blanks: [
    {
      answer: "amount",
      reason: L(
        "Save the value before updating the other variable.",
        "Bewaar de waarde voordat je de andere variabele bijwerkt.",
      ),
    },
    {
      answer: "amount + 3",
      reason: L(
        "Use the current value as part of the new value.",
        "Gebruik de huidige waarde als onderdeel van de nieuwe waarde.",
      ),
    },
  ],
  output: "7 10\n",
};
export const activities = [welcome, order, stock, grouping, supplies, review];
