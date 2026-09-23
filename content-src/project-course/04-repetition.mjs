import { L, section, task, lesson, quiz, question } from "./authoring.mjs";

const labels = lesson({
  module: 4,
  number: 1,
  title: L(
    "Print a batch without copying lines",
    "Druk een reeks af zonder regels te kopiëren",
  ),
  guidance: "guided",
  minutes: 14,
  explanation: L(
    "A packing station needs numbered labels. The starter repeats nearly identical lines and only works for three packages. Replace that repetition with a loop that respects the requested batch size, including an empty batch. If a loop does not finish, use Stop or Ctrl+C before trying the corrected version.",
    "Een inpakstation heeft genummerde labels nodig. De startcode herhaalt bijna dezelfde regels en werkt alleen voor drie pakketten. Vervang die herhaling door een lus die het gevraagde aantal volgt, ook bij een lege reeks. Als een lus niet stopt, gebruik dan Stop of Ctrl+C voordat je de verbeterde versie probeert.",
  ),
  sections: [
    section(
      L("Repeat while a condition holds", "Herhaal zolang een conditie geldt"),
      L(
        "while checks its condition before each repetition. Its indented body may run many times or not at all. Something in that body usually changes the state that the condition examines. Without progress toward a stopping condition, the loop can run forever.",
        "while controleert de conditie vóór elke herhaling. Het ingesprongen blok kan vaak of helemaal niet worden uitgevoerd. Iets in dat blok verandert meestal de toestand die de conditie onderzoekt. Zonder voortgang naar een stopconditie kan de lus eindeloos doorgaan.",
      ),
      'fuel = 3\nwhile fuel > 0:\n    print("Moving")\n    fuel = fuel - 1\nprint("Stopped")',
      "Moving\nMoving\nMoving\nStopped",
    ),
    section(
      L("Track the next item", "Houd het volgende item bij"),
      L(
        "A counter can identify the next item to process. i += 1 means i = i + 1. Decide the first counter value, the last valid value, and what changes after each repetition. Trace a batch of one by hand before a larger batch.",
        "Een teller kan het volgende te verwerken item aangeven. i += 1 betekent i = i + 1. Bepaal de eerste tellerwaarde, de laatste geldige waarde en wat na elke herhaling verandert. Volg een reeks van één item met de hand voordat je een grotere reeks probeert.",
      ),
    ),
  ],
  starter:
    'batch_size = 3\nlabel_number = 1\nprint("Package", 1)\nprint("Package", 2)\nprint("Package", 3)\nprint("Batch complete")\n',
  solution:
    'batch_size = 3\nlabel_number = 1\nwhile label_number <= batch_size:\n    print("Package", label_number)\n    label_number += 1\nprint("Batch complete")\n',
  tasks: [
    task(
      "",
      L(
        "Use a while loop to print Package 1 through the requested batch_size. Remove the copied print statements.",
        "Gebruik een while-lus om Package 1 tot en met de gevraagde batch_size af te drukken. Verwijder de gekopieerde print-statements.",
      ),
      "any(isinstance(n, _ast.While) for n in _ast.walk(_ast.parse(_source)))",
      [
        L(
          "One print statement can run several times with a changing value.",
          "Eén print-statement kan meerdere keren met een veranderende waarde worden uitgevoerd.",
        ),
        L(
          "The counter starts at the first label and advances after printing.",
          "De teller begint bij het eerste label en gaat na het afdrukken verder.",
        ),
        L(
          "The fuel example changes its counter inside the loop.",
          "Het brandstofvoorbeeld verandert zijn teller binnen de lus.",
        ),
      ],
      L(
        "Generate the labels from the batch size, rather than fixed lines.",
        "Genereer de labels uit het aantal, niet uit vaste regels.",
      ),
      [
        {
          inputs: { batch_size: 5 },
          check:
            '_error is None and _stdout.splitlines() == ["Package " + str(n) for n in range(1, 6)] + ["Batch complete"]',
        },
      ],
    ),
    task(
      "",
      L(
        "Make the last label appear exactly once. After the loop, label_number should identify the next unused label.",
        "Laat het laatste label precies één keer verschijnen. Na de lus moet label_number het volgende ongebruikte label aangeven.",
      ),
      "label_number == batch_size + 1",
      [
        L(
          "There is a difference between the last processed item and the next item.",
          "Er is een verschil tussen het laatst verwerkte item en het volgende item.",
        ),
        L(
          "Check both the comparison and the counter update.",
          "Controleer zowel de vergelijking als de tellerwijziging.",
        ),
        L(
          "After processing label 1 in a one-item batch, the next unused label is 2.",
          "Na label 1 in een reeks van één item is het volgende ongebruikte label 2.",
        ),
      ],
      L(
        "Include the endpoint and advance the counter consistently.",
        "Neem de eindwaarde mee en werk de teller consequent bij.",
      ),
      [
        {
          inputs: { batch_size: 1 },
          check:
            'label_number == 2 and _stdout.splitlines() == ["Package 1", "Batch complete"]',
        },
      ],
    ),
    task(
      "",
      L(
        "Print Batch complete once after the loop. A batch_size of zero should print only that message.",
        "Druk Batch complete één keer na de lus af. Bij batch_size nul mag alleen dat bericht verschijnen.",
      ),
      '_stdout.splitlines().count("Batch complete") == 1 and _stdout.splitlines()[-1] == "Batch complete"',
      [
        L(
          "An empty batch has no labels, but it still finishes.",
          "Een lege reeks heeft geen labels, maar wordt wel afgerond.",
        ),
        L(
          "Statements after the loop are not part of each repetition.",
          "Statements na de lus horen niet bij elke herhaling.",
        ),
        L(
          "A while loop can execute zero times if its first condition is false.",
          "Een while-lus kan nul keer worden uitgevoerd als de eerste conditie onwaar is.",
        ),
      ],
      L(
        "Keep the completion message outside the repeated body.",
        "Houd het afrondingsbericht buiten het herhaalde blok.",
      ),
      [
        {
          inputs: { batch_size: 0 },
          check:
            '_error is None and label_number == 1 and _stdout.splitlines() == ["Batch complete"]',
        },
      ],
    ),
  ],
  solutionNote: L(
    "The condition, update, and message position each have a separate job. Testing zero, one, and several items reveals common loop-boundary mistakes.",
    "De conditie, wijziging en plaats van het bericht hebben elk een eigen taak. Nul, één en meerdere items testen maakt veelvoorkomende fouten op lusgrenzen zichtbaar.",
  ),
});

const desk = lesson({
  module: 4,
  number: 2,
  title: L("Keep the help desk open", "Houd de helpdesk open"),
  guidance: "adapt",
  minutes: 16,
  explanation: L(
    "The help desk currently answers one request and closes. Keep it open until the user enters quit. Count help requests, answer unknown commands, and leave cleanly without treating quit as an error. Read a new response for each turn.",
    "De helpdesk beantwoordt nu één verzoek en sluit dan. Houd hem open totdat de gebruiker quit invoert. Tel help-verzoeken, beantwoord onbekende commando’s en sluit netjes zonder quit als fout te behandelen. Lees elke beurt een nieuw antwoord.",
  ),
  sections: [
    section(
      L("Stop when the user decides", "Stop wanneer de gebruiker beslist"),
      L(
        "Sometimes the number of repetitions is unknown. A sentinel is a special input that ends a sequence. break immediately exits the nearest loop. A while True loop therefore needs a reachable break or another deliberate exit. Statements after the loop still run.",
        "Soms is het aantal herhalingen onbekend. Een sentinel is speciale invoer die een reeks beëindigt. break verlaat direct de dichtstbijzijnde lus. Een while True-lus heeft daarom een bereikbare break of een andere bewuste uitgang nodig. Statements na de lus worden nog uitgevoerd.",
      ),
      'while True:\n    word = input("Word, or stop: ")\n    if word == "stop":\n        break\n    print("You entered", word)\nprint("Session ended")',
    ),
    section(
      L("State lasts between turns", "Toestand blijft tussen beurten bestaan"),
      L(
        "Initialise a session counter before the loop. Resetting it inside the loop erases earlier turns. Check the exit command before ordinary processing, so the sentinel is not counted as useful work.",
        "Initialiseer een sessieteller vóór de lus. Binnen de lus opnieuw beginnen wist eerdere beurten. Controleer het afsluitcommando vóór de gewone verwerking, zodat de sentinel niet als nuttig werk wordt meegeteld.",
      ),
    ),
  ],
  starter:
    'help_count = 0\ncommand = input("help or quit: ").strip().lower()\nif command == "help":\n    help_count += 1\n    print("Ask the welcome desk")\nelse:\n    print("Unknown command")\nprint("Help requests:", help_count)\n',
  solution:
    'help_count = 0\nwhile True:\n    command = input("help or quit: ").strip().lower()\n    if command == "quit":\n        break\n    if command == "help":\n        help_count += 1\n        print("Ask the welcome desk")\n    else:\n        print("Unknown command")\nprint("Help requests:", help_count)\n',
  inputs: ["help", "other", " HELP ", "quit"],
  tasks: [
    task(
      "",
      L(
        "Read and handle repeated commands until quit, allowing surrounding spaces and different letter case.",
        "Lees en behandel herhaalde commando’s tot quit, met ondersteuning voor spaties aan de randen en hoofdletters.",
      ),
      'command == "quit"',
      [
        L(
          "The next response must be read inside the repeating interaction.",
          "Het volgende antwoord moet binnen de herhaalde interactie worden gelezen.",
        ),
        L(
          "Keep the exit condition reachable on every turn.",
          "Houd de stopconditie in elke beurt bereikbaar.",
        ),
        L(
          "The word example reads again after every ordinary response.",
          "Het woordvoorbeeld leest na elk gewoon antwoord opnieuw.",
        ),
      ],
      L(
        "Process the sequence until the cleaned quit command is received.",
        "Verwerk de reeks totdat het opgeschoonde quit-commando wordt ontvangen.",
      ),
      [
        {
          stdin: ["help", "help", " QuIt "],
          check:
            '_error is None and command == "quit" and _remaining_input == ""',
        },
      ],
    ),
    task(
      "",
      L(
        "Count only help requests in help_count. Keep earlier requests when the next turn starts.",
        "Tel alleen help-verzoeken in help_count. Behoud eerdere verzoeken wanneer de volgende beurt begint.",
      ),
      "type(help_count) is int and help_count >= 0",
      [
        L(
          "The counter describes the whole session, not just the latest response.",
          "De teller beschrijft de hele sessie, niet alleen het laatste antwoord.",
        ),
        L(
          "Choose which statements belong before the loop and which belong inside it.",
          "Kies welke statements vóór de lus horen en welke erin.",
        ),
        L(
          "A counter initialised once can be increased on several turns.",
          "Een eenmaal geïnitialiseerde teller kan in meerdere beurten worden verhoogd.",
        ),
      ],
      L(
        "Unknown commands and quit should not increase the help counter.",
        "Onbekende commando’s en quit mogen de helpteller niet verhogen.",
      ),
      [
        {
          stdin: ["help", "other", "HELP", "quit"],
          check:
            'help_count == 2 and _stdout.count("Ask the welcome desk") == 2',
        },
        { stdin: ["quit"], check: "help_count == 0" },
      ],
    ),
    task(
      "",
      L(
        "Report unknown commands during the session and print the final help count once when it ends. quit itself should not produce an unknown-command message.",
        "Meld onbekende commando’s tijdens de sessie en druk bij het einde de definitieve helpteller één keer af. quit zelf mag geen melding van een onbekend commando opleveren.",
      ),
      '_stdout.count("Help requests:") == 1 and str(help_count) in _stdout',
      [
        L(
          "Exiting is a recognised action, even though it is not a help request.",
          "Afsluiten is een herkende actie, ook al is het geen hulpverzoek.",
        ),
        L(
          "Separate session reporting from per-command responses.",
          "Scheid het sessieoverzicht van antwoorden per commando.",
        ),
        L(
          "break skips the rest of its loop body and continues after the loop.",
          "break slaat de rest van het lusblok over en gaat na de lus verder.",
        ),
      ],
      L(
        "Give one response per ordinary command and one final summary.",
        "Geef één antwoord per gewoon commando en één definitief overzicht.",
      ),
      [
        {
          stdin: ["no", "", "quit"],
          check:
            '_error is None and _stdout.count("Unknown command") == 2 and _stdout.count("Help requests:") == 1',
        },
        {
          stdin: ["quit"],
          check:
            '"Unknown command" not in _stdout and "Help requests: 0" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "A sentinel-controlled while condition is also valid. The essential behavior is fresh input, retained state, and a reachable exit.",
    "Een while-conditie die de sentinel controleert is ook geldig. Het essentiële gedrag is nieuwe invoer, behouden toestand en een bereikbare uitgang.",
  ),
});

const retry = lesson({
  module: 4,
  number: 3,
  title: L(
    "Let a person recover from a mistake",
    "Laat iemand herstellen van een fout",
  ),
  guidance: "adapt",
  minutes: 18,
  explanation: L(
    "A donation desk needs one nonnegative decimal amount. A typo should invite another attempt, not close the program. Negative amounts are also rejected. The word cancel ends the interaction without a donation. Keep the count of all submitted responses, including the accepted amount or cancellation.",
    "Een donatiebalie heeft één niet-negatief decimaal bedrag nodig. Een typefout moet een nieuwe poging uitlokken in plaats van het programma af te sluiten. Negatieve bedragen worden ook afgewezen. Het woord cancel beëindigt de interactie zonder donatie. Houd het aantal ingediende antwoorden bij, inclusief het geaccepteerde bedrag of de annulering.",
  ),
  sections: [
    section(
      L("Skip the rest of this turn", "Sla de rest van deze beurt over"),
      L(
        "continue starts the next repetition of the nearest loop. It is useful after rejecting input: later statements in the body should not pretend the input succeeded. Check that every path still makes progress. A continue placed before reading new input can accidentally repeat the same mistake forever.",
        "continue begint de volgende herhaling van de dichtstbijzijnde lus. Dat is nuttig na afgewezen invoer: latere statements in het blok mogen niet doen alsof de invoer is geslaagd. Controleer of elk pad nog voortgang maakt. Een continue vóór het lezen van nieuwe invoer kan dezelfde fout onbedoeld eindeloos herhalen.",
      ),
      'while True:\n    text = input("Name, or stop: ").strip()\n    if text == "stop":\n        break\n    if text == "":\n        print("A name cannot be blank")\n        continue\n    print("Hello", text)',
    ),
    section(
      L("Separate parsing from acceptance", "Scheid ontleden van accepteren"),
      L(
        'A value may convert successfully but still violate a rule, such as a negative donation. Use a temporary candidate until it has passed validation. Store it in amount only on acceptance. status should finish as "accepted" or "cancelled"; amount stays None on cancellation.',
        'Een waarde kan succesvol worden omgezet maar toch een regel schenden, zoals een negatieve donatie. Gebruik een tijdelijke kandidaat totdat deze is gevalideerd. Bewaar de waarde pas bij acceptatie in amount. status moet eindigen als "accepted" of "cancelled"; amount blijft None bij annulering.',
      ),
    ),
  ],
  starter:
    'amount = None\nstatus = "pending"\nattempts = 0\n\ntext = input("Donation or cancel: ").strip()\nattempts += 1\namount = float(text)\nstatus = "accepted"\nprint(status, amount)\nprint("Attempts:", attempts)\n',
  solution:
    'amount = None\nstatus = "pending"\nattempts = 0\n\nwhile True:\n    text = input("Donation or cancel: ").strip()\n    attempts += 1\n    if text.lower() == "cancel":\n        status = "cancelled"\n        break\n    try:\n        candidate = float(text)\n    except ValueError:\n        print("Use a number")\n        continue\n    if candidate < 0:\n        print("Use zero or more")\n        continue\n    amount = candidate\n    status = "accepted"\n    break\nprint(status, amount)\nprint("Attempts:", attempts)\n',
  inputs: ["oops", "-2", "12.5"],
  tasks: [
    task(
      "",
      L(
        "Repeat after invalid numeric text or a negative amount. Accept zero or a positive decimal and store it in amount.",
        "Herhaal na ongeldige getaltekst of een negatief bedrag. Accepteer nul of een positief decimaal getal en bewaar het in amount.",
      ),
      'status in ("accepted", "cancelled") and (status != "accepted" or isinstance(amount, (int, float)) and amount >= 0)',
      [
        L(
          "A failed response should not leave the session in a successful state.",
          "Een mislukt antwoord mag de sessie niet in een geslaagde toestand achterlaten.",
        ),
        L(
          "Handle conversion failure and the negative-value rule before accepting.",
          "Handel conversiefouten en de regel voor negatieve waarden af vóór acceptatie.",
        ),
        L(
          "The name example uses continue to skip processing a rejected response.",
          "Het naamvoorbeeld gebruikt continue om de verwerking van een afgewezen antwoord over te slaan.",
        ),
      ],
      L(
        "Continue asking after rejected responses and stop after a valid donation.",
        "Blijf vragen na afgewezen antwoorden en stop na een geldige donatie.",
      ),
      [
        {
          stdin: ["bad", "-1", "4.25"],
          check:
            '_error is None and status == "accepted" and amount == 4.25 and _remaining_input == ""',
        },
        {
          stdin: ["", "0"],
          check: '_error is None and status == "accepted" and amount == 0',
        },
      ],
    ),
    task(
      "",
      L(
        "Allow cancel at any attempt, regardless of letter case or surrounding spaces. Finish with status cancelled and amount None.",
        "Sta cancel bij elke poging toe, ongeacht hoofdletters of spaties aan de randen. Eindig met status cancelled en amount None.",
      ),
      'status in ("accepted", "cancelled") and (status != "cancelled" or amount is None)',
      [
        L(
          "Cancellation is a command, not numeric text to convert.",
          "Annulering is een commando, geen getaltekst die moet worden omgezet.",
        ),
        L(
          "Recognise the command before attempting conversion.",
          "Herken het commando voordat je de conversie probeert.",
        ),
        L(
          "The help desk checks its exit command before ordinary handling.",
          "De helpdesk controleert zijn afsluitcommando vóór de gewone afhandeling.",
        ),
      ],
      L(
        "Cancellation must work even after one or more failed attempts.",
        "Annulering moet ook na een of meer mislukte pogingen werken.",
      ),
      [
        {
          stdin: [" CANCEL "],
          check: '_error is None and status == "cancelled" and amount is None',
        },
        {
          stdin: ["bad", "-4", "cancel"],
          check: '_error is None and status == "cancelled" and amount is None',
        },
      ],
    ),
    task(
      "",
      L(
        "Count every submitted response in attempts and report the final status and attempt count. Give feedback when you reject a response.",
        "Tel elk ingediend antwoord in attempts en meld de eindstatus en het aantal pogingen. Geef feedback wanneer je een antwoord afwijst.",
      ),
      "type(attempts) is int and attempts >= 1 and status in _stdout and str(attempts) in _stdout",
      [
        L(
          "A counter should advance at one shared point per response.",
          "Een teller moet op één gedeeld punt per antwoord omhooggaan.",
        ),
        L(
          "Putting the update only on success loses rejected attempts.",
          "De wijziging alleen bij succes uitvoeren verliest afgewezen pogingen.",
        ),
        L(
          "Reading a response and counting that response can happen next to each other.",
          "Een antwoord lezen en dat antwoord tellen kunnen direct na elkaar gebeuren.",
        ),
      ],
      L(
        "Do not silently repeat or lose failed attempts from the count.",
        "Herhaal niet stilzwijgend en verlies mislukte pogingen niet uit de teller.",
      ),
      [
        {
          stdin: ["wrong", "-3", "2"],
          check:
            '_error is None and attempts == 3 and "accepted" in _stdout and "3" in _stdout and len(_stdout.splitlines()) >= 4',
        },
        {
          stdin: ["cancel"],
          check: 'attempts == 1 and "cancelled" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "Nested branches can replace continue without changing the behavior. A temporary candidate prevents a rejected negative value from looking like an accepted donation. As in the earlier ratio lesson, use ordinary finite numbers here.",
    "Geneste vertakkingen kunnen continue vervangen zonder het gedrag te veranderen. Een tijdelijke kandidaat voorkomt dat een afgewezen negatieve waarde op een geaccepteerde donatie lijkt. Gebruik hier net als in de eerdere verhoudingsles gewone eindige getallen.",
  ),
});

const savings = lesson({
  module: 4,
  number: 4,
  title: L(
    "Forecast a growing weekly deposit",
    "Voorspel een groeiende wekelijkse inleg",
  ),
  guidance: "guided",
  minutes: 16,
  explanation: L(
    "A saver adds a deposit each week, increasing the next deposit by a fixed amount. Generate a report for a chosen number of weeks. This is bounded repetition: you know how many turns you want before the program starts.",
    "Een spaarder legt elke week geld in en verhoogt de volgende inleg met een vast bedrag. Genereer een overzicht voor een gekozen aantal weken. Dit is begrensde herhaling: vóór de start van het programma weet je hoeveel beurten je wilt.",
  ),
  sections: [
    section(
      L(
        "Use a for loop for a known sequence",
        "Gebruik een for-lus voor een bekende reeks",
      ),
      L(
        "for assigns each item from a sequence to its loop variable. range(stop) produces integers starting at zero, excluding stop. range(start, stop) changes the start; range(start, stop, step) also changes the step. No manual counter update is needed.",
        "for kent elk item uit een reeks toe aan de lusvariabele. range(stop) produceert integers vanaf nul, exclusief stop. range(start, stop) verandert het begin; range(start, stop, step) verandert ook de stap. Je hoeft de teller niet zelf bij te werken.",
      ),
      'for seat in range(2, 7, 2):\n    print("Seat", seat)',
      "Seat 2\nSeat 4\nSeat 6",
    ),
    section(
      L("The order of updates matters", "De volgorde van wijzigingen telt"),
      L(
        "Use this week’s deposit before increasing it for next week. A running balance accumulates the effects of previous weeks. Initialise it once. Each report line should be Week N: amount with two decimal places. Keep balance and next_deposit available after the loop.",
        "Gebruik de inleg van deze week voordat je die voor volgende week verhoogt. Een lopend saldo verzamelt de effecten van eerdere weken. Initialiseer het één keer. Elke overzichtsregel moet Week N: bedrag met twee decimalen zijn. Houd balance en next_deposit na de lus beschikbaar.",
      ),
    ),
  ],
  starter:
    "weeks = 4\nbalance = 20\nnext_deposit = 10\nincrease = 5\n\n# Report the balance after each weekly deposit.\n",
  solution:
    'weeks = 4\nbalance = 20\nnext_deposit = 10\nincrease = 5\n\nfor week in range(1, weeks + 1):\n    balance += next_deposit\n    next_deposit += increase\n    print(f"Week {week}: {balance:.2f}")\n',
  tasks: [
    task(
      "",
      L(
        "Use for and range to produce one numbered report line for every week, starting at week 1.",
        "Gebruik for en range om voor elke week één genummerde overzichtsregel te produceren, beginnend bij week 1.",
      ),
      "any(isinstance(n, _ast.For) for n in _ast.walk(_ast.parse(_source))) and len(_stdout.splitlines()) == weeks",
      [
        L(
          "The upper endpoint of range is excluded.",
          "De bovengrens van range wordt niet meegenomen.",
        ),
        L(
          "Decide how to include the requested final week.",
          "Bepaal hoe je de gevraagde laatste week meeneemt.",
        ),
        L("range(1, 3) supplies 1 and 2.", "range(1, 3) levert 1 en 2."),
      ],
      L(
        "Number the report from 1 through the requested number of weeks.",
        "Nummer het overzicht van 1 tot en met het gevraagde aantal weken.",
      ),
      [
        {
          inputs: { weeks: 2 },
          check:
            '_error is None and len(_stdout.splitlines()) == 2 and _stdout.splitlines()[0].startswith("Week 1:") and _stdout.splitlines()[1].startswith("Week 2:")',
        },
      ],
    ),
    task(
      "",
      L(
        "Add the current deposit to balance, then prepare next week’s deposit using increase. Show the updated balance to two decimals.",
        "Tel de huidige inleg bij balance op en bereid daarna de inleg voor volgende week voor met increase. Toon het bijgewerkte saldo met twee decimalen.",
      ),
      'isinstance(balance, (int, float)) and isinstance(next_deposit, (int, float)) and (weeks == 0 or f"{balance:.2f}" in _stdout)',
      [
        L(
          "Changing the deposit too early changes this week’s payment.",
          "De inleg te vroeg veranderen wijzigt de betaling van deze week.",
        ),
        L(
          "Trace the first two weeks on paper and compare the printed values.",
          "Volg de eerste twee weken op papier en vergelijk de afgedrukte waarden.",
        ),
        L(
          "With a starting balance of 20 and deposits 10 then 15, the balances are 30 then 45.",
          "Met beginsaldo 20 en inleggen 10 en daarna 15 zijn de saldi 30 en vervolgens 45.",
        ),
      ],
      L(
        "Use each deposit once, in the intended order.",
        "Gebruik elke inleg één keer, in de bedoelde volgorde.",
      ),
      [
        {
          inputs: { weeks: 3 },
          check:
            '_error is None and balance == 65 and next_deposit == 25 and _stdout.splitlines() == ["Week 1: 30.00", "Week 2: 45.00", "Week 3: 65.00"]',
        },
        {
          inputs: { weeks: 2, balance: 0, next_deposit: 2.5, increase: 1.25 },
          check:
            '_error is None and balance == 6.25 and next_deposit == 5 and "6.25" in _stdout',
        },
      ],
    ),
    task(
      "",
      L(
        "Handle weeks = 0 without inventing a deposit or report line. The starting balance and next deposit should remain unchanged.",
        "Handel weeks = 0 af zonder een inleg of overzichtsregel te verzinnen. Het beginsaldo en de volgende inleg moeten ongewijzigd blijven.",
      ),
      "isinstance(weeks, int) and isinstance(balance, (int, float))",
      [
        L(
          "An empty range gives the loop no items.",
          "Een leeg bereik geeft de lus geen items.",
        ),
        L(
          "Do not force one iteration just to initialise a value needed later.",
          "Forceer geen herhaling alleen om een later benodigde waarde te initialiseren.",
        ),
        L(
          "range(1, 1) contains no integers.",
          "range(1, 1) bevat geen integers.",
        ),
      ],
      L(
        "Zero weeks should mean zero changes and zero report lines.",
        "Nul weken moet nul wijzigingen en nul overzichtsregels betekenen.",
      ),
      [
        {
          inputs: { weeks: 0, balance: 7, next_deposit: 3 },
          check:
            '_error is None and balance == 7 and next_deposit == 3 and _stdout == ""',
        },
      ],
    ),
  ],
  solutionNote: L(
    "for manages iteration; the balance and deposit remain your state to update. The zero-week case also shows why values needed after a loop should be initialised before it.",
    "for regelt de herhaling; het saldo en de inleg blijven de toestand die je zelf bijwerkt. Het geval met nul weken laat ook zien waarom je waarden die na een lus nodig zijn vóór de lus moet initialiseren.",
  ),
});

const till = lesson({
  module: 4,
  number: 5,
  title: L("Close the community stall", "Sluit de buurtkraam af"),
  guidance: "independent",
  minutes: 24,
  explanation: L(
    "At closing time, a volunteer enters the stall’s sale amounts one at a time. Build a session that keeps valid amounts, rejects mistakes, and finishes on done. This combines the input, error handling, and loop decisions you will need in your calculator.",
    "Bij sluiting voert een vrijwilliger de verkoopbedragen van de kraam één voor één in. Bouw een sessie die geldige bedragen bewaart, fouten afwijst en eindigt bij done. Hiermee combineer je invoer, foutafhandeling en lusbeslissingen die je voor je rekenmachine nodig hebt.",
  ),
  sections: [
    section(
      L("What a trustworthy session does", "Wat een betrouwbare sessie doet"),
      L(
        "Accept nonnegative decimal amounts, including zero. Count accepted amounts in count and add them to total. Invalid text and negative amounts increase rejected and do not change count or total. done ends the session regardless of case or surrounding spaces, and is not a rejected amount. Print a final summary containing count, rejected, and a two-decimal total. Start with no sales. You choose the prompts, feedback, loop structure, and summary wording.",
        "Accepteer niet-negatieve decimale bedragen, inclusief nul. Tel geaccepteerde bedragen in count en tel ze op bij total. Ongeldige tekst en negatieve bedragen verhogen rejected en veranderen count en total niet. done beëindigt de sessie ongeacht hoofdletters of spaties aan de randen en is geen afgewezen bedrag. Druk een eindoverzicht af met count, rejected en total met twee decimalen. Begin zonder verkopen. Je kiest de invoervragen, feedback, lusstructuur en formulering van het overzicht.",
      ),
    ),
  ],
  starter:
    'print("Community stall — closing report")\n\n# Build the session.\n',
  solution:
    'print("Community stall — closing report")\ncount = 0\ntotal = 0.0\nrejected = 0\nwhile True:\n    text = input("Sale amount or done: ").strip()\n    if text.lower() == "done":\n        break\n    try:\n        amount = float(text)\n    except ValueError:\n        rejected += 1\n        print("Please enter an amount")\n        continue\n    if amount < 0:\n        rejected += 1\n        print("Negative sales are not accepted")\n        continue\n    count += 1\n    total += amount\nprint("Sales:", count)\nprint("Rejected:", rejected)\nprint(f"Total: {total:.2f}")\n',
  inputs: ["4", "-2", "wrong", "1.5", "done"],
  tasks: [
    task(
      "",
      L(
        "Keep reading amounts until done. Allow the session to end immediately with no sales.",
        "Blijf bedragen lezen tot done. Sta toe dat de sessie direct zonder verkopen eindigt.",
      ),
      "type(count) is int and count >= 0 and isinstance(total, (int, float))",
      [
        L(
          "Decide what must exist before the first response arrives.",
          "Bepaal wat moet bestaan voordat het eerste antwoord binnenkomt.",
        ),
        L(
          "Recognise the exit command before treating the response as an amount.",
          "Herken het afsluitcommando voordat je het antwoord als bedrag behandelt.",
        ),
        L(
          "The help desk used a sentinel to finish an unknown number of turns.",
          "De helpdesk gebruikte een sentinel om een onbekend aantal beurten af te sluiten.",
        ),
      ],
      L(
        "The session must reach its exit and handle an empty collection.",
        "De sessie moet de uitgang bereiken en een lege verzameling kunnen afhandelen.",
      ),
      [
        {
          stdin: [" DoNe "],
          check:
            '_error is None and count == 0 and total == 0 and rejected == 0 and _remaining_input == ""',
        },
      ],
    ),
    task(
      "",
      L(
        "Accumulate every accepted amount and its count. Accept zero; do not replace earlier totals with the latest amount.",
        "Verzamel elk geaccepteerd bedrag en het aantal bedragen. Accepteer nul; vervang eerdere totalen niet door het laatste bedrag.",
      ),
      "type(count) is int and count >= 0 and isinstance(total, (int, float))",
      [
        L(
          "A running total describes all accepted turns so far.",
          "Een lopend totaal beschrijft alle geaccepteerde beurten tot nu toe.",
        ),
        L(
          "Initialisation and accumulation belong in different places.",
          "Initialisatie en optellen horen op verschillende plaatsen.",
        ),
        L(
          "The savings forecast retained its balance between repetitions.",
          "De spaarvoorspelling behield zijn saldo tussen herhalingen.",
        ),
      ],
      L(
        "Count and add every accepted amount exactly once.",
        "Tel elk geaccepteerd bedrag precies één keer mee in aantal en totaal.",
      ),
      [
        {
          stdin: ["2.25", "0", "3.5", "done"],
          check:
            "_error is None and count == 3 and _close(total, 5.75) and rejected == 0",
        },
        {
          stdin: ["0.1", "0.2", "done"],
          check: "_error is None and count == 2 and _close(total, 0.3)",
        },
      ],
    ),
    task(
      "",
      L(
        "Reject invalid text and negative amounts, counting each in rejected while preserving the accepted sales.",
        "Wijs ongeldige tekst en negatieve bedragen af, tel elk in rejected en behoud de geaccepteerde verkopen.",
      ),
      "type(rejected) is int and rejected >= 0",
      [
        L(
          "A rejected turn must not reach the successful accumulation.",
          "Een afgewezen beurt mag het geslaagde optellen niet bereiken.",
        ),
        L(
          "Check both failed conversion and a converted value outside the allowed range.",
          "Controleer zowel mislukte conversie als een omgezette waarde buiten het toegestane bereik.",
        ),
        L(
          "continue or separate branches can keep invalid data out of later work.",
          "continue of aparte vertakkingen kunnen ongeldige gegevens uit latere verwerking houden.",
        ),
      ],
      L(
        "Recover after errors without discarding or corrupting earlier sales.",
        "Herstel na fouten zonder eerdere verkopen te wissen of te beschadigen.",
      ),
      [
        {
          stdin: ["2", "bad", "-8", "", "3", "done"],
          check:
            "_error is None and count == 2 and total == 5 and rejected == 3",
        },
      ],
    ),
    task(
      "",
      L(
        "Report the accepted count, rejected count, and total to two decimals after the session. Test only-invalid input followed by done.",
        "Meld het geaccepteerde aantal, afgewezen aantal en totaal met twee decimalen na de sessie. Test uitsluitend ongeldige invoer gevolgd door done.",
      ),
      'str(count) in _stdout and str(rejected) in _stdout and f"{total:.2f}" in _stdout',
      [
        L(
          "The final report should describe the complete session.",
          "Het eindoverzicht moet de volledige sessie beschrijven.",
        ),
        L(
          "Formatting the total need not change its numeric value.",
          "Het totaal formatteren hoeft de numerieke waarde niet te veranderen.",
        ),
        L(
          "A session with only rejected entries has a zero total, not a missing total.",
          "Een sessie met alleen afgewezen invoer heeft totaal nul, geen ontbrekend totaal.",
        ),
      ],
      L(
        "Keep the summary useful even when there are no accepted amounts.",
        "Houd het overzicht bruikbaar, ook als er geen geaccepteerde bedragen zijn.",
      ),
      [
        {
          stdin: ["bad", "-1", "done"],
          check:
            '_error is None and count == 0 and rejected == 2 and total == 0 and "0.00" in _stdout and "2" in _stdout',
        },
        {
          stdin: ["2.5", "done"],
          check:
            '_error is None and "2.50" in _stdout and "1" in _stdout and "0" in _stdout',
        },
      ],
    ),
  ],
  solutionNote: L(
    "This example uses continue, but a nested decision can be equally clear. Test the exit, empty session, invalid turns between valid ones, zero amounts, and decimal totals. Formatting hides ordinary floating-point display noise; tolerance-based checks still compare the numeric result.",
    "Dit voorbeeld gebruikt continue, maar een geneste beslissing kan even duidelijk zijn. Test de uitgang, lege sessie, ongeldige beurten tussen geldige, nulbedragen en decimale totalen. Formatteren verbergt gewone weergaveruis van floats; controles met tolerantie vergelijken nog steeds het numerieke resultaat.",
  ),
});

const review = quiz(
  4,
  L("Check your reasoning: repetition", "Controleer je inzicht: herhaling"),
  [
    question(
      "v2-4-q1",
      L("Why does this loop never finish?", "Waarom stopt deze lus nooit?"),
      "remaining = 3\nwhile remaining > 0:\n    print(remaining)",
      [
        [
          L(
            "The condition stays true because remaining never changes.",
            "De conditie blijft waar omdat remaining nooit verandert.",
          ),
          L(
            "The repeated body needs progress toward a stopping condition.",
            "Het herhaalde blok heeft voortgang naar een stopconditie nodig.",
          ),
        ],
        [
          L(
            "print always restarts a program.",
            "print start een programma altijd opnieuw.",
          ),
          L(
            "print only produces output; the unchanged condition causes repetition.",
            "print produceert alleen uitvoer; de ongewijzigde conditie veroorzaakt herhaling.",
          ),
        ],
        [
          L(
            "while cannot compare integers.",
            "while kan geen integers vergelijken.",
          ),
          L(
            "This comparison is valid and remains true.",
            "Deze vergelijking is geldig en blijft waar.",
          ),
        ],
      ],
    ),
    question(
      "v2-4-q2",
      L("Which values does this visit?", "Welke waarden worden hier bezocht?"),
      "for value in range(1, 5):\n    print(value)",
      [
        [
          L("1, 2, 3, 4", "1, 2, 3, 4"),
          L(
            "range includes its start and excludes its stop.",
            "range neemt de beginwaarde mee en sluit de eindwaarde uit.",
          ),
        ],
        [
          L("1, 2, 3, 4, 5", "1, 2, 3, 4, 5"),
          L(
            "The stop value 5 is excluded.",
            "De eindwaarde 5 wordt uitgesloten.",
          ),
        ],
        [
          L("0, 1, 2, 3, 4", "0, 1, 2, 3, 4"),
          L(
            "The explicit start is 1, not the default zero.",
            "Het expliciete begin is 1, niet de standaardwaarde nul.",
          ),
        ],
      ],
    ),
    question(
      "v2-4-q3",
      L(
        "What differs between continue and break?",
        "Wat is het verschil tussen continue en break?",
      ),
      "",
      [
        [
          L(
            "continue starts the next turn; break leaves the loop.",
            "continue begint de volgende beurt; break verlaat de lus.",
          ),
          L(
            "Neither necessarily ends the whole program.",
            "Geen van beide beëindigt noodzakelijk het hele programma.",
          ),
        ],
        [
          L(
            "Both end the whole program.",
            "Beide beëindigen het hele programma.",
          ),
          L(
            "They affect the nearest loop; code afterward can still run.",
            "Ze beïnvloeden de dichtstbijzijnde lus; code erna kan nog worden uitgevoerd.",
          ),
        ],
        [
          L(
            "continue resumes the same line forever.",
            "continue hervat eeuwig dezelfde regel.",
          ),
          L(
            "It moves to the next repetition, including its condition or next item.",
            "Het gaat naar de volgende herhaling, inclusief de conditie of het volgende item.",
          ),
        ],
      ],
    ),
    question(
      "v2-4-q4",
      L("Why is the final count only 1?", "Waarom is de eindteller slechts 1?"),
      "for turn in range(4):\n    count = 0\n    count += 1\nprint(count)",
      [
        [
          L(
            "The count is reset on every turn.",
            "De teller wordt in elke beurt opnieuw ingesteld.",
          ),
          L(
            "Initialise the accumulated count before the loop.",
            "Initialiseer de opgetelde teller vóór de lus.",
          ),
        ],
        [
          L("range(4) has only one item.", "range(4) heeft maar één item."),
          L(
            "It supplies four items: 0, 1, 2, and 3.",
            "Het levert vier items: 0, 1, 2 en 3.",
          ),
        ],
        [
          L(
            "+= cannot be used in a for loop.",
            "+= kan niet in een for-lus worden gebruikt.",
          ),
          L(
            "The operator works; resetting the value causes the mistake.",
            "De operator werkt; het opnieuw instellen veroorzaakt de fout.",
          ),
        ],
      ],
    ),
    question(
      "v2-4-q5",
      L(
        "Which test best checks that rejected input does not erase earlier sales?",
        "Welke test controleert het beste dat afgewezen invoer eerdere verkopen niet wist?",
      ),
      "",
      [
        [
          L(
            "2, bad, 3, done — expect count 2 and total 5.",
            "2, bad, 3, done — verwacht count 2 en total 5.",
          ),
          L(
            "It places an error between successful turns and checks retained state.",
            "Het plaatst een fout tussen geslaagde beurten en controleert behouden toestand.",
          ),
        ],
        [
          L("done immediately.", "Direct done."),
          L(
            "That checks an empty session, not preservation across errors.",
            "Dat controleert een lege sessie, niet behoud na fouten.",
          ),
        ],
        [
          L("One successful amount.", "Eén geslaagd bedrag."),
          L(
            "There is no rejected turn to expose the problem.",
            "Er is geen afgewezen beurt die het probleem zichtbaar maakt.",
          ),
        ],
      ],
    ),
  ],
);

export const activities = [labels, desk, retry, savings, till, review];
