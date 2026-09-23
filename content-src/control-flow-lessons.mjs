import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "python-control-flow";
const C = (step, rows) => ({
  ...step,
  cases: rows.map(([inputs, check]) => ({ inputs, check })),
});
const operator = (name) =>
  `any(isinstance(n, _ast.${name}) for n in _ast.walk(_ast.parse(_source)))`;
const pairs = [
  [false, false],
  [false, true],
  [true, false],
  [true, true],
];

G(g, 1, {
  titleNl: "Een programma kiest een route",
  intro: loc(
    "So far, your programs have followed every instruction from top to bottom. Many useful programs need to choose: show a warning only when something needs attention, allow an action only when its requirements are met, or select a message for the current situation. These choices change the program's control flow.",
    "Tot nu toe voerden je programma's alle instructies van boven naar beneden uit. Veel nuttige programma's moeten kiezen: alleen een waarschuwing tonen als iets aandacht nodig heeft, een actie toestaan als aan de voorwaarden is voldaan of een passend bericht kiezen. Deze keuzes veranderen de uitvoeringsvolgorde, oftewel control flow.",
  ),
  sections: [
    S(
      "A gate in the program",
      "Een poort in het programma",
      "Imagine a parcel kiosk that prints a label only after payment is confirmed. The question has two answers: confirmed or not confirmed. A conditional statement uses the answer to decide whether a block of instructions runs. Code after that block can still run either way.",
      "Stel je een pakketautomaat voor die pas een label afdrukt nadat de betaling is bevestigd. Die vraag heeft twee antwoorden: bevestigd of niet bevestigd. Een voorwaardelijke instructie gebruikt het antwoord om te bepalen of een blok code wordt uitgevoerd. Code na dat blok kan in beide gevallen gewoon doorgaan.",
      'paid = True\nif paid:\n    print("Print shipping label")\nprint("Visit complete")',
      "Print shipping label\nVisit complete",
      "The indented line belongs to the condition. The last line is back at the left edge, so it runs regardless of the answer.",
      "De ingesprongen regel hoort bij de voorwaarde. De laatste regel staat weer helemaal links en wordt dus ongeacht het antwoord uitgevoerd.",
    ),
    S(
      "Follow both routes",
      "Volg beide routes",
      "Run the supplied demonstration once. Then change `paid` from `True` to `False` and predict which message will disappear. Run again to test your prediction. Do not worry about memorising the syntax yet: this chapter builds the values, comparisons and conditions that make this work.",
      "Voer de demonstratie één keer uit. Verander daarna `paid` van `True` naar `False` en voorspel welk bericht verdwijnt. Voer opnieuw uit om je voorspelling te testen. Je hoeft de syntax nog niet te onthouden: in dit hoofdstuk bouw je de waarden, vergelijkingen en voorwaarden op die dit mogelijk maken.",
    ),
  ],
  starter:
    'paid = True\nif paid:\n    print("Print shipping label")\nprint("Visit complete")\n',
  solution:
    'paid = False\nif paid:\n    print("Print shipping label")\nprint("Visit complete")\n',
  solutionNote: loc(
    "With paid set to False, Python skips the indented print call. Visit complete still appears because that call is outside the conditional block. Indentation describes structure, not just appearance.",
    "Met paid op False slaat Python de ingesprongen print-aanroep over. Visit complete verschijnt nog steeds, omdat die aanroep buiten het voorwaardelijke blok staat. Inspringing beschrijft de structuur en is niet alleen opmaak.",
  ),
});

G(g, 2, {
  titleNl: "Welke vragen kan code beantwoorden?",
  intro: loc(
    "A Boolean value represents `True` or `False`. To make a reliable decision, first state a question that can be answered from evidence. A false statement can still be testable. A vague opinion needs a clear rule before a program can decide it.",
    "Een Boolean-waarde stelt `True` of `False` voor. Formuleer voor een betrouwbare beslissing eerst een vraag die je met gegevens kunt beantwoorden. Ook een onware bewering kan toetsbaar zijn. Voor een vage mening is eerst een duidelijke regel nodig voordat een programma erover kan beslissen.",
  ),
  sections: [
    S(
      "Testable does not mean true",
      "Toetsbaar betekent niet waar",
      "For a box containing four books, ‘the box contains four books’ is testable and true. ‘The box contains five books’ is also testable, but false. Both questions can guide code. ‘This is the nicest box’ has no objective answer until we define what nicest means.",
      "Bij een doos met vier boeken is ‘de doos bevat vier boeken’ toetsbaar en waar. ‘De doos bevat vijf boeken’ is ook toetsbaar, maar onwaar. Beide vragen kunnen code aansturen. ‘Dit is de mooiste doos’ heeft geen objectief antwoord zolang we niet bepalen wat mooiste betekent.",
      "verified = True\nneeds_more_evidence = False\nprint(verified)\nprint(needs_more_evidence)",
      "True\nFalse",
      "Use capital T and F, without quotes. These are Python values, not text labels.",
      "Gebruik een hoofdletter T en F, zonder aanhalingstekens. Dit zijn Python-waarden en geen tekstlabels.",
    ),
    S(
      "Turn a vague request into a rule",
      "Maak van een vage vraag een regel",
      "A request such as ‘send a parcel when it is light enough’ is incomplete. A measurable rule such as ‘its mass is at most 2 kilograms’ can be tested. Your task classifies three statements for a dispatch checklist. We will turn measurable rules into Python comparisons in the next lesson.",
      "Een vraag zoals ‘verstuur een pakket als het licht genoeg is’ is onvolledig. Een meetbare regel zoals ‘de massa is maximaal 2 kilogram’ kun je wel toetsen. Je classificeert drie beweringen voor een verzendcontrole. In de volgende les zetten we meetbare regels om naar Python-vergelijkingen.",
    ),
  ],
  starter:
    '# Dispatch checklist: replace the text placeholders with Boolean values.\ncount_is_testable = "undecided"\nopinion_is_testable = "undecided"\nfour_is_odd = "undecided"\n\nprint(count_is_testable)\nprint(opinion_is_testable)\nprint(four_is_odd)\n',
  solution:
    "count_is_testable = True\nopinion_is_testable = False\nfour_is_odd = False\nprint(count_is_testable)\nprint(opinion_is_testable)\nprint(four_is_odd)\n",
  steps: [
    T(
      "‘The parcel contains four books’ can be checked by counting. Set `count_is_testable` to the appropriate Boolean value and run the file.",
      "‘Het pakket bevat vier boeken’ kun je controleren door te tellen. Zet `count_is_testable` op de passende Boolean-waarde en voer het bestand uit.",
      "count_is_testable is True",
      "Decide whether evidence can settle the question, not whether this particular parcel really has four books.",
      "Bepaal of gegevens de vraag kunnen beantwoorden, niet of dit specifieke pakket echt vier boeken bevat.",
      "Use the Boolean True: counting can establish whether the statement is correct.",
      "Gebruik de Boolean True: door te tellen kun je vaststellen of de bewering klopt.",
    ),
    T(
      "‘Blue packaging looks best’ gives no measurement or agreed rule. Set `opinion_is_testable` to the appropriate Boolean.",
      "‘Blauwe verpakking is het mooist’ bevat geen meting of afgesproken regel. Zet `opinion_is_testable` op de passende Boolean.",
      "opinion_is_testable is False",
      "Different people can prefer different colours without either being factually wrong.",
      "Mensen kunnen verschillende kleuren mooier vinden zonder dat iemand feitelijk ongelijk heeft.",
      "Without an agreed rule, this preference is not an objectively testable condition.",
      "Zonder afgesproken regel is deze voorkeur geen objectief toetsbare voorwaarde.",
    ),
    T(
      "‘Four is odd’ is testable, but is it true? Set `four_is_odd` to the statement's truth value. The three printed results should be True, False, False.",
      "‘Vier is oneven’ is toetsbaar, maar is het waar? Zet `four_is_odd` op de waarheidswaarde van de bewering. De drie resultaten moeten True, False, False zijn.",
      "four_is_odd is False and _stdout.splitlines() == ['True','False','False']",
      "Four can be divided into pairs with no remainder. A testable statement may be false.",
      "Vier kun je zonder rest in paren verdelen. Een toetsbare bewering mag onwaar zijn.",
      "The last answer describes truth, not testability: four is not odd.",
      "Het laatste antwoord gaat over waarheid, niet toetsbaarheid: vier is niet oneven.",
    ),
  ],
  solutionNote: loc(
    "The first two variables classify whether a statement has an objective test. The third answers a testable question. Keeping those two ideas separate prevents a common misunderstanding: False does not mean ‘not a Boolean’.",
    "De eerste twee variabelen geven aan of een bewering objectief te toetsen is. De derde beantwoordt een toetsbare vraag. Door die ideeën te scheiden voorkom je een veelgemaakte denkfout: False betekent niet ‘geen Boolean’.",
  ),
});

G(g, 3, {
  titleNl: "Waarden vergelijken",
  intro: loc(
    "Instead of typing an answer yourself, let Python compare the data. `==` asks whether two values are equal; `!=` asks whether they differ. Each comparison produces a Boolean. A single `=` still means assignment: it stores a value rather than asking a question.",
    "Laat Python de gegevens vergelijken in plaats van zelf het antwoord in te vullen. `==` vraagt of twee waarden gelijk zijn; `!=` vraagt of ze verschillen. Elke vergelijking levert een Boolean op. Eén `=` blijft een toewijzing: deze slaat een waarde op in plaats van een vraag te stellen.",
  ),
  sections: [
    S(
      "Calculate, then compare",
      "Reken uit en vergelijk",
      "Python evaluates arithmetic on either side before comparing the results. Read the two equals signs as ‘is equal to’. You can assign the comparison result to a descriptive name.",
      "Python rekent eerst de bewerkingen aan beide kanten uit en vergelijkt daarna de resultaten. Lees de twee gelijktekens als ‘is gelijk aan’. Je kunt het vergelijkingsresultaat aan een duidelijke naam toewijzen.",
      "same_amount = 3 * 4 == 6 + 6\nprint(same_amount)\nprint(8 != 10)",
      "True\nTrue",
    ),
    S(
      "A matching appearance is not enough",
      "Hetzelfde uiterlijk is niet genoeg",
      'A printed string of digits may look like a number, but these values have different types. `"12" == 12` is false. That matters when data comes from labels, forms or `input()`. Compare the numeric values or deliberately convert the text; do not assume Python will do that for equality.',
      'Een afgedrukte string met cijfers kan op een getal lijken, maar deze waarden hebben verschillende types. `"12" == 12` is onwaar. Dat is belangrijk bij gegevens uit labels, formulieren of `input()`. Vergelijk numerieke waarden of zet tekst bewust om; neem niet aan dat Python dit bij gelijkheid vanzelf doet.',
      'print("12" == 12)\nprint(int("12") == 12)',
      "False\nTrue",
    ),
  ],
  starter:
    '# Compare an incoming parcel with its manifest.\nexpected = 12\nreceived = 9\nlabel_text = "12"\n\n# Replace these guesses with comparisons.\nmatches = True\ndiffers = False\nlabel_matches_number = True\n\nprint(matches)\nprint(differs)\nprint(label_matches_number)\n',
  solution:
    'expected = 12\nreceived = 9\nlabel_text = "12"\nmatches = expected == received\ndiffers = expected != received\nlabel_matches_number = label_text == expected\nprint(matches)\nprint(differs)\nprint(label_matches_number)\n',
  steps: [
    C(
      T(
        "Replace the guess in `matches` with `expected == received`. Predict its output before running.",
        "Vervang de gok in `matches` door `expected == received`. Voorspel de output voordat je uitvoert.",
        "matches is False",
        "One = assigns the result; two == compare the two counts on the right.",
        "Eén = wijst het resultaat toe; twee == vergelijken de twee aantallen rechts.",
        "Compare the two input variables so matches also works when the counts are equal.",
        "Vergelijk de twee invoervariabelen zodat matches ook werkt wanneer de aantallen gelijk zijn.",
      ),
      [
        [{ expected: 12, received: 12 }, "matches is True"],
        [{ expected: 8, received: 3 }, "matches is False"],
      ],
    ),
    C(
      T(
        "Calculate `differs` using `!=` on the same two counts. It should give the opposite result to matches.",
        "Bereken `differs` met `!=` op dezelfde twee aantallen. De uitkomst moet het tegenovergestelde zijn van matches.",
        "differs is True",
        "Use expected != received rather than a fixed True value.",
        "Gebruik expected != received in plaats van een vaste waarde True.",
        "Use inequality on the input counts; differing counts should be True, equal counts False.",
        "Gebruik ongelijkheid op de invoeraantallen; verschillende aantallen geven True en gelijke False.",
      ),
      [
        [{ expected: 12, received: 12 }, "differs is False"],
        [{ expected: 8, received: 3 }, "differs is True"],
      ],
    ),
    C(
      T(
        "Set `label_matches_number` by comparing `label_text` with `expected`, without converting either value. Run and explain why the last line is False even though both values look like 12.",
        "Bepaal `label_matches_number` door `label_text` met `expected` te vergelijken, zonder een waarde om te zetten. Voer uit en leg uit waarom de laatste regel False is terwijl beide waarden op 12 lijken.",
        "label_matches_number is False and _stdout.splitlines() == ['False','True','False']",
        "The label is text; the expected count is an integer. Equality does not convert between them.",
        "Het label is tekst; het verwachte aantal is een integer. Gelijkheid zet deze types niet om.",
        "Keep label_text as text, compare it directly, and print the three results in order.",
        "Laat label_text tekst blijven, vergelijk direct en druk de drie resultaten in volgorde af.",
      ),
      [[{ label_text: 12 }, "label_matches_number is True"]],
    ),
  ],
  solutionNote: loc(
    "The first two comparisons describe whether the manifest agrees with the delivery. The final comparison deliberately retains the type mismatch. The expressions respond to changed inputs instead of storing a guessed answer.",
    "De eerste twee vergelijkingen beschrijven of de paklijst overeenkomt met de levering. De laatste vergelijking behoudt bewust het typeverschil. De expressies reageren op gewijzigde invoer in plaats van een gegokt antwoord op te slaan.",
  ),
});

G(g, 4, {
  titleNl: "Booleans herkennen en bewaren",
  intro: loc(
    'Boolean values have their own type, `bool`. The strings `"True"` and `"False"` are still text. They can look identical to Booleans when printed, so use `type()` when the appearance of a value is misleading.',
    'Boolean-waarden hebben een eigen type: `bool`. De strings `"True"` en `"False"` blijven tekst. Afgedrukt kunnen ze er hetzelfde uitzien als Booleans. Gebruik daarom `type()` wanneer het uiterlijk van een waarde misleidend is.',
  ),
  sections: [
    S(
      "Inspect the type",
      "Onderzoek het type",
      "`type(value)` reports what kind of value you have. You can pass that result to print. Boolean literals need capital letters and no quotes; lowercase true would be treated as a variable name.",
      "`type(waarde)` vertelt welk soort waarde je hebt. Je kunt het resultaat aan print geven. Boolean literals hebben een hoofdletter en geen aanhalingstekens; true met een kleine letter zou als variabelenaam worden gelezen.",
      'text = "False"\nflag = False\nprint(type(text))\nprint(type(flag))',
      "<class 'str'>\n<class 'bool'>",
    ),
    S(
      "Store a question's answer",
      "Bewaar het antwoord op een vraag",
      "A comparison also produces a Boolean. Assigning it stores that answer at the moment the comparison runs. If the inputs change later, recalculate the comparison when you need an updated answer—just like the arithmetic totals in the previous chapter.",
      "Ook een vergelijking levert een Boolean op. Door deze toe te wijzen sla je het antwoord op het moment van vergelijken op. Veranderen de invoerwaarden later, bereken de vergelijking dan opnieuw voor een bijgewerkt antwoord, net als bij de rekentotalen uit het vorige hoofdstuk.",
      "remaining = 2\nhas_stock = remaining != 0\nprint(has_stock)",
      "True",
    ),
  ],
  starter:
    '# The first two values look alike when printed. Inspect their types.\nstatus_text = "True"\nenabled = "True"\nremaining = 2\n\nprint(status_text)\nprint(enabled)\n\n# Calculate and print has_tickets below.\n',
  solution:
    'status_text = "True"\nenabled = True\nremaining = 2\nprint(type(status_text))\nprint(type(enabled))\nhas_tickets = remaining != 0\nprint(has_tickets)\n',
  steps: [
    T(
      "Keep `status_text` unchanged. Replace its print call with `print(type(status_text))` to inspect what it actually contains.",
      "Laat `status_text` ongewijzigd. Vervang de print-aanroep door `print(type(status_text))` om te onderzoeken wat erin zit.",
      "status_text == 'True' and type(status_text) is str and _stdout.splitlines()[:1] == [\"<class 'str'>\"]",
      "Put type(status_text) inside print's parentheses.",
      "Zet type(status_text) binnen de haakjes van print.",
      "The first output should identify str; keep the original text value.",
      "De eerste output moet str aangeven; behoud de oorspronkelijke tekstwaarde.",
    ),
    T(
      "Fix `enabled` so it contains the Boolean True, then print its type on the second line. Compare the two types.",
      "Herstel `enabled` zodat deze de Boolean True bevat en druk het type op de tweede regel af. Vergelijk de twee types.",
      "enabled is True and _stdout.splitlines()[:2] == [\"<class 'str'>\", \"<class 'bool'>\"]",
      "Remove the quotes around True, but keep its capital T.",
      "Verwijder de aanhalingstekens rond True, maar behoud de hoofdletter T.",
      "enabled must be a Boolean; the second output should identify bool.",
      "enabled moet een Boolean zijn; de tweede output moet bool aangeven.",
    ),
    C(
      T(
        "Create `has_tickets` from the comparison `remaining != 0` and print it as the third line. Try remaining = 0 afterward to observe the change.",
        "Maak `has_tickets` met de vergelijking `remaining != 0` en druk deze als derde regel af. Probeer daarna remaining = 0 om het verschil te zien.",
        "has_tickets is True and _stdout.splitlines() == [\"<class 'str'>\", \"<class 'bool'>\", 'True']",
        "Assign the comparison itself instead of typing the word True as a string.",
        "Wijs de vergelijking zelf toe in plaats van het woord True als string te typen.",
        "Calculate has_tickets from remaining; it must become False when no tickets remain.",
        "Bereken has_tickets uit remaining; deze moet False worden als er geen kaartjes over zijn.",
      ),
      [
        [{ remaining: 0 }, "has_tickets is False"],
        [{ remaining: 5 }, "has_tickets is True"],
      ],
    ),
  ],
  solutionNote: loc(
    "Quotes explain why status_text is str. Removing them makes enabled a bool. The stock comparison computes another bool from live data, rather than from the appearance of text.",
    "De aanhalingstekens verklaren waarom status_text een str is. Door ze weg te halen wordt enabled een bool. De voorraadvergelijking berekent nog een bool uit gegevens, in plaats van uit het uiterlijk van tekst.",
  ),
});

G(g, 5, {
  titleNl: "Voorwaardelijke blokken bouwen",
  intro: loc(
    "An `if` statement connects a Boolean condition to an action. If the condition is true, Python executes the indented block. If it is false, Python skips that block and continues below it. The colon and indentation are part of Python's syntax.",
    "Een `if`-instructie verbindt een Boolean-voorwaarde met een actie. Is de voorwaarde waar, dan voert Python het ingesprongen blok uit. Is deze onwaar, dan slaat Python het blok over en gaat daaronder verder. De dubbele punt en inspringing horen bij de Python-syntax.",
  ),
  sections: [
    S(
      "Which lines belong to the condition?",
      "Welke regels horen bij de voorwaarde?",
      "The colon introduces the block. Use a consistent indentation, normally four spaces. Move back to the left edge to leave the block. Predict what happens if mode changes to another value.",
      "De dubbele punt begint het blok. Gebruik een vaste inspringing, meestal vier spaties. Ga terug naar de linkerrand om het blok te verlaten. Voorspel wat er gebeurt als mode een andere waarde krijgt.",
      'mode = "preview"\nif mode == "preview":\n    print("No parcel is sent")\nprint("Ready for another check")',
      "No parcel is sent\nReady for another check",
      "Only the first message depends on the mode. A missing colon or an assignment where a comparison is needed causes a syntax error before the file runs.",
      "Alleen het eerste bericht hangt van de modus af. Een ontbrekende dubbele punt of een toewijzing waar een vergelijking nodig is, veroorzaakt een syntaxfout voordat het bestand draait.",
    ),
    S(
      "Independent decisions",
      "Onafhankelijke beslissingen",
      "Two separate if statements each get their own test. One, both or neither block may run, depending on the conditions. In this simulator the two mode names cannot both match, but later examples will have overlapping conditions. Keep the provided mode assignment at the top so you can test different routes.",
      "Twee losse if-instructies krijgen elk een eigen test. Eén, beide of geen van de blokken kan draaien, afhankelijk van de voorwaarden. In deze simulator kunnen de twee modusnamen niet tegelijk passen, maar later zie je overlappende voorwaarden. Laat de gegeven modustoewijzing bovenaan staan zodat je verschillende routes kunt testen.",
    ),
  ],
  starter:
    '# A dispatch simulator with one broken condition.\nmode = "test"\n\nif mode = "test":\n    print("Test run")\n\n# Add a separate condition for live mode below.\n\n# Add a final message outside both conditions.\n',
  solution:
    'mode = "test"\nif mode == "test":\n    print("Test run")\nif mode == "live":\n    print("Live run")\nprint("Check complete")\n',
  steps: [
    C(
      T(
        "Run the starter and inspect the SyntaxError. Repair the condition so `Test run` appears for mode = test, but does not appear for mode = live. Keep the input assignment.",
        "Voer de startcode uit en bekijk de SyntaxError. Herstel de voorwaarde zodat `Test run` verschijnt bij mode = test, maar niet bij mode = live. Behoud de invoertoewijzing.",
        "mode == 'test' and _stdout.splitlines()[:1] == ['Test run']",
        "A single = assigns; use == to ask whether mode equals the string test.",
        "Eén = wijst toe; gebruik == om te vragen of mode gelijk is aan de string test.",
        "Use a real comparison so Test run depends on the mode, rather than printing unconditionally.",
        "Gebruik een echte vergelijking zodat Test run van de modus afhangt en niet altijd wordt afgedrukt.",
      ),
      [[{ mode: "live" }, "'Test run' not in _stdout.splitlines()"]],
    ),
    C(
      T(
        "Add a second, separate `if` statement that prints `Live run` only when mode is live. Test both modes, then leave mode set to test.",
        "Voeg een tweede, losse `if`-instructie toe die alleen bij mode = live `Live run` afdrukt. Test beide modi en laat mode daarna op test staan.",
        "sum(isinstance(n, _ast.If) for n in _ast.parse(_source).body) >= 2",
        "Write another if at the left edge and indent its print call below it.",
        "Schrijf nog een if aan de linkerrand en spring de print-aanroep eronder in.",
        "Keep two independent if blocks. The live input must print Live run, without Test run.",
        "Behoud twee onafhankelijke if-blokken. De invoer live moet Live run afdrukken, zonder Test run.",
      ),
      [
        [
          { mode: "live" },
          "_stdout.splitlines()[:1] == ['Live run'] and 'Test run' not in _stdout",
        ],
        [
          { mode: "other" },
          "'Live run' not in _stdout and 'Test run' not in _stdout",
        ],
      ],
    ),
    C(
      T(
        "After both conditions, print `Check complete` without indentation. It must appear for every mode, including an unknown one.",
        "Druk na beide voorwaarden `Check complete` af zonder inspringing. Dit moet bij elke modus verschijnen, ook bij een onbekende.",
        "_stdout.splitlines() == ['Test run','Check complete']",
        "Place the final print at the same indentation level as if, not inside either block.",
        "Zet de laatste print op hetzelfde inspringniveau als if, niet binnen een van de blokken.",
        "The final message belongs outside both conditions and must appear exactly once.",
        "Het laatste bericht hoort buiten beide voorwaarden en moet precies één keer verschijnen.",
      ),
      [
        [
          { mode: "live" },
          "_stdout.splitlines() == ['Live run','Check complete']",
        ],
        [{ mode: "other" }, "_stdout.splitlines() == ['Check complete']"],
      ],
    ),
  ],
  solutionNote: loc(
    "Each if compares mode with a different string. Only its indented print depends on that comparison. The final print is outside both blocks, so it provides a reliable end-of-check message even when neither condition matches.",
    "Elke if vergelijkt mode met een andere string. Alleen de ingesprongen print hangt van die vergelijking af. De laatste print staat buiten beide blokken en geeft dus altijd een eindbericht, ook als geen van de voorwaarden past.",
  ),
});

G(g, 6, {
  titleNl: "Grenswaarden precies vergelijken",
  intro: loc(
    "‘Below the limit’ and ‘within the limit’ sound similar, but disagree exactly at the boundary. `<` and `>` exclude equality. `<=` and `>=` include it. Choosing the correct operator is part of translating a requirement into code.",
    "‘Onder de limiet’ en ‘binnen de limiet’ klinken bijna hetzelfde, maar verschillen precies op de grens. `<` en `>` sluiten gelijkheid uit. `<=` en `>=` nemen gelijkheid mee. De juiste operator kiezen hoort bij het vertalen van een eis naar code.",
  ),
  sections: [
    S(
      "Test the exact boundary",
      "Test precies op de grens",
      "A box may contain at most 10 items. Nine fits, ten fits, eleven does not. At most therefore uses <=. For at least, the matching operator is >=. Write the comparison in the same direction you read the requirement.",
      "Een doos mag maximaal 10 items bevatten. Negen past, tien past en elf niet. Maximaal gebruikt dus <=. Bij minstens hoort >=. Schrijf de vergelijking in dezelfde richting als waarin je de eis leest.",
      "items = 10\nprint(items < 10)\nprint(items <= 10)\nprint(items >= 10)\nprint(items > 10)",
      "False\nTrue\nTrue\nFalse",
    ),
    S(
      "Use the result in a decision",
      "Gebruik het resultaat in een beslissing",
      "The load monitor below has a limit of 80 units. First compute two different comparisons so you can see their difference. Then use the inclusive comparison to print an acceptance message. The checks also try values below and above the limit: hard-coding today's answer would miss those cases.",
      "De belastingsmeter hieronder heeft een limiet van 80 eenheden. Bereken eerst twee verschillende vergelijkingen zodat je het verschil ziet. Gebruik daarna de inclusieve vergelijking voor een acceptatiebericht. De controles proberen ook waarden onder en boven de limiet: een vast antwoord voor vandaag mist die gevallen.",
    ),
  ],
  starter:
    "load = 80\nlimit = 80\n\n# Repair both comparisons, then add an acceptance condition.\nwithin_limit = False\nbelow_limit = True\nprint(within_limit)\nprint(below_limit)\n",
  solution:
    'load = 80\nlimit = 80\nwithin_limit = load <= limit\nbelow_limit = load < limit\nprint(within_limit)\nprint(below_limit)\nif within_limit:\n    print("Accepted")\n',
  steps: [
    C(
      T(
        "Set `within_limit` by checking whether load is at most limit. Keep load and limit at 80 for the normal run.",
        "Bepaal `within_limit` door te controleren of load maximaal limit is. Laat load en limit voor de gewone uitvoering op 80 staan.",
        "within_limit is True",
        "At most includes the case where both values are equal.",
        "Maximaal omvat ook het geval waarin beide waarden gelijk zijn.",
        "Use an inclusive comparison that responds to both load and limit.",
        "Gebruik een inclusieve vergelijking die op zowel load als limit reageert.",
      ),
      [
        [{ load: 79 }, "within_limit is True"],
        [{ load: 81 }, "within_limit is False"],
        [{ limit: 70 }, "within_limit is False"],
      ],
    ),
    C(
      T(
        "Set `below_limit` by checking whether load is strictly less than limit. The first two output lines should now be True and False.",
        "Bepaal `below_limit` door te controleren of load strikt kleiner is dan limit. De eerste twee outputregels moeten nu True en False zijn.",
        "below_limit is False and _stdout.splitlines()[:2] == ['True','False']",
        "Strictly below excludes equality, so do not add an equals sign.",
        "Strikt onder sluit gelijkheid uit, dus voeg geen gelijkteken toe.",
        "below_limit must be False at equality and True for a lower load.",
        "below_limit moet False zijn bij gelijkheid en True bij een lagere belasting.",
      ),
      [
        [{ load: 79 }, "below_limit is True"],
        [{ load: 81 }, "below_limit is False"],
      ],
    ),
    C(
      T(
        "Add an if block that prints `Accepted` only when `within_limit` is true. Keep the two comparison prints before it.",
        "Voeg een if-blok toe dat alleen `Accepted` afdrukt wanneer `within_limit` waar is. Laat de twee vergelijkingsprints ervoor staan.",
        "_stdout.splitlines() == ['True','False','Accepted']",
        "A variable that already contains a Boolean can be used directly after if.",
        "Een variabele die al een Boolean bevat, kun je direct na if gebruiken.",
        "Accept both 79 and 80, but do not print Accepted for 81.",
        "Accepteer zowel 79 als 80, maar druk Accepted niet af bij 81.",
      ),
      [
        [{ load: 79 }, "_stdout.splitlines() == ['True','True','Accepted']"],
        [{ load: 81 }, "_stdout.splitlines() == ['False','False']"],
      ],
    ),
  ],
  solutionNote: loc(
    "At equality, <= is true and < is false. Reusing within_limit in the if block keeps the policy in one comparison. Testing either side of the boundary catches the most common wrong operator.",
    "Bij gelijkheid is <= waar en < onwaar. Door within_limit in het if-blok te hergebruiken staat de regel op één plek. Tests aan beide kanten van de grens vinden de meest voorkomende verkeerde operator.",
  ),
});

G(g, 7, {
  titleNl: "Twee voorwaarden met and",
  intro: loc(
    "Sometimes one condition is not enough. A simulated delivery robot may start only when it is charged and its lid is closed. `and` combines the two requirements: the result is true only when both are true.",
    "Soms is één voorwaarde niet genoeg. Een gesimuleerde bezorgrobot mag alleen starten als deze opgeladen is én het deksel dicht is. `and` combineert die twee eisen: het resultaat is alleen waar als beide waar zijn.",
  ),
  sections: [
    S(
      "All combinations matter",
      "Alle combinaties tellen mee",
      "Read each side separately, then combine their answers. One false requirement is enough to make the whole and expression false. When working with Boolean inputs, these four combinations cover every possibility.",
      "Lees elke kant afzonderlijk en combineer daarna de antwoorden. Eén onware eis maakt de hele and-expressie onwaar. Bij Boolean-invoer dekken deze vier combinaties alle mogelijkheden.",
      "print(True and True)\nprint(True and False)\nprint(False and True)\nprint(False and False)",
      "True\nFalse\nFalse\nFalse",
    ),
    S(
      "Fix the policy, then its use",
      "Herstel de regel en daarna het gebruik",
      "The supplied program currently looks only at the battery. Correct the computed decision first, then make the action use that decision. Python evaluates and from left to right and skips the right side when the left side is false; it already knows the combined Boolean result cannot be true.",
      "Het gegeven programma kijkt nu alleen naar de batterij. Herstel eerst de berekende beslissing en laat de actie daarna die beslissing gebruiken. Python beoordeelt and van links naar rechts en slaat rechts over wanneer links onwaar is: het gecombineerde Boolean-resultaat kan dan niet meer waar zijn.",
    ),
  ],
  starter:
    '# Dispatch simulator: both requirements must hold.\ncharged = True\nlid_closed = False\n\ncan_start = charged\nprint(can_start)\n\nif charged:\n    print("Dispatch started")\n',
  solution:
    'charged = True\nlid_closed = False\ncan_start = charged and lid_closed\nprint(can_start)\nif can_start:\n    print("Dispatch started")\n',
  steps: [
    C(
      T(
        "Change `can_start` to combine charged and lid_closed with `and`. With the starter inputs, its printed value must become False.",
        "Verander `can_start` zodat charged en lid_closed met `and` worden gecombineerd. Bij de startinvoer moet de afgedrukte waarde False worden.",
        `can_start is False and ${operator("And")}`,
        "Both flags must be True; the open lid currently prevents starting.",
        "Beide vlaggen moeten True zijn; het open deksel verhindert nu het starten.",
        "Use and and test all four flag combinations. A battery alone is not enough.",
        "Gebruik and en test alle vier combinaties. Alleen een opgeladen batterij is niet genoeg.",
      ),
      pairs.map(([charged, lid_closed]) => [
        { charged, lid_closed },
        `can_start is ${charged && lid_closed ? "True" : "False"}`,
      ]),
    ),
    C(
      T(
        "The robot still prints Dispatch started! Change the if condition to use `can_start`. It should print that message only when both requirements are met.",
        "De robot drukt nog steeds Dispatch started af! Verander de if-voorwaarde zodat deze `can_start` gebruikt. Het bericht mag alleen verschijnen als aan beide eisen is voldaan.",
        "_stdout.splitlines() == ['False']",
        "The calculation is correct, but the action still reads the old battery-only condition.",
        "De berekening klopt, maar de actie leest nog de oude voorwaarde met alleen de batterij.",
        "Make the action follow the combined decision: only the True/True case may start.",
        "Laat de actie de gecombineerde beslissing volgen: alleen bij True/True mag deze starten.",
      ),
      pairs.map(([charged, lid_closed]) => [
        { charged, lid_closed },
        `_stdout.splitlines() == ${charged && lid_closed ? "['True','Dispatch started']" : "['False']"}`,
      ]),
    ),
  ],
  solutionNote: loc(
    "The first change fixes the policy, but the old if still checks charged. The second change connects the action to can_start. This is why it is useful to test behavior as well as an intermediate variable.",
    "De eerste wijziging herstelt de regel, maar de oude if controleert nog charged. De tweede wijziging koppelt de actie aan can_start. Daarom is het nuttig om zowel het gedrag als een tussenvariabele te testen.",
  ),
});

G(g, 8, {
  titleNl: "Alternatieven met or",
  intro: loc(
    "A maintenance reminder may be needed because a service interval has passed or because a warning flag is active. `or` is true when at least one condition is true. Both conditions being true also counts: Python's or does not mean ‘exactly one’.",
    "Een onderhoudsmelding kan nodig zijn omdat de onderhoudsinterval is verstreken of omdat een waarschuwing actief is. `or` is waar zodra minstens één voorwaarde waar is. Beide voorwaarden tegelijk waar telt ook: or betekent in Python niet ‘precies één’.",
  ),
  sections: [
    S(
      "One reason is enough",
      "Eén reden is voldoende",
      "Only the False/False combination gives False. Compare this with and: and requires every requirement, while or accepts either reason. Python can skip evaluating the right side of or once the left side is true.",
      "Alleen de combinatie False/False geeft False. Vergelijk dit met and: and vereist alle voorwaarden, terwijl or elke afzonderlijke reden accepteert. Python kan de rechterkant van or overslaan zodra links waar is.",
      "print(False or False)\nprint(True or False)\nprint(False or True)\nprint(True or True)",
      "False\nTrue\nTrue\nTrue",
    ),
    S(
      "Combine comparisons with flags",
      "Combineer vergelijkingen met vlaggen",
      "Each side of or can be a comparison or an existing Boolean. In this task, ‘more than 100 hours’ is strict: exactly 100 does not trigger the time rule. A warning must still trigger the reminder at any hour count. Keep the two input assignments so the checks can try each situation.",
      "Elke kant van or kan een vergelijking of een bestaande Boolean zijn. ‘Meer dan 100 uur’ is hier strikt: precies 100 activeert de tijdsregel niet. Een waarschuwing moet de melding bij elk aantal uren activeren. Laat de twee invoertoewijzingen staan zodat de controles elke situatie kunnen proberen.",
    ),
  ],
  starter:
    'hours = 45\nwarning = True\n\n# The current reminder ignores the warning flag.\nmaintenance_needed = hours > 100\nprint(maintenance_needed)\n\nif hours > 100:\n    print("Maintenance needed")\n',
  solution:
    'hours = 45\nwarning = True\nmaintenance_needed = hours > 100 or warning\nprint(maintenance_needed)\nif maintenance_needed:\n    print("Maintenance needed")\n',
  steps: [
    C(
      T(
        "Calculate `maintenance_needed` using `hours > 100 or warning`. The current warning should trigger a True result even though only 45 hours have passed.",
        "Bereken `maintenance_needed` met `hours > 100 or warning`. De huidige waarschuwing moet True opleveren, ook al zijn er pas 45 uur verstreken.",
        `maintenance_needed is True and ${operator("Or")}`,
        "Keep the comparison on one side of or and the Boolean warning flag on the other.",
        "Laat de vergelijking aan één kant van or staan en de Boolean warning aan de andere.",
        "The rule must accept either trigger, including both together; 100 hours without a warning is not enough.",
        "De regel moet elke reden afzonderlijk accepteren, ook beide tegelijk; 100 uur zonder waarschuwing is niet genoeg.",
      ),
      [
        [{ hours: 100, warning: false }, "maintenance_needed is False"],
        [{ hours: 101, warning: false }, "maintenance_needed is True"],
        [{ hours: 101, warning: true }, "maintenance_needed is True"],
        [{ hours: 20, warning: false }, "maintenance_needed is False"],
      ],
    ),
    C(
      T(
        "Update the if block so it uses `maintenance_needed`. Print Maintenance needed when the combined rule is true, and no reminder when both triggers are false.",
        "Werk het if-blok bij zodat het `maintenance_needed` gebruikt. Druk Maintenance needed af als de gecombineerde regel waar is en geen melding als beide redenen onwaar zijn.",
        "_stdout.splitlines() == ['True','Maintenance needed']",
        "Use the named Boolean as the condition instead of repeating the old hours-only test.",
        "Gebruik de benoemde Boolean als voorwaarde in plaats van de oude controle op alleen uren.",
        "The printed reminder must follow either trigger, not just the hours comparison.",
        "De afgedrukte melding moet op elke reden reageren, niet alleen op de urenvergelijking.",
      ),
      [
        [{ hours: 100, warning: false }, "_stdout.splitlines() == ['False']"],
        [
          { hours: 101, warning: false },
          "_stdout.splitlines() == ['True','Maintenance needed']",
        ],
        [
          { hours: 101, warning: true },
          "_stdout.splitlines() == ['True','Maintenance needed']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "or combines an evaluated comparison with the warning flag. Reusing maintenance_needed ensures the display and decision follow the same rule. Exactly 100 is a useful boundary test because the requirement says more than 100.",
    "or combineert een berekende vergelijking met de waarschuwing. Door maintenance_needed te hergebruiken volgen de weergave en beslissing dezelfde regel. Precies 100 is een nuttige grenstest, omdat de eis meer dan 100 luidt.",
  ),
});

G(g, 9, {
  titleNl: "Een voorwaarde omkeren met not",
  intro: loc(
    "`not` reverses the truth value of a condition. It turns True into False and False into True. This lets you express absence clearly: a bay is empty when it is not occupied. Use parentheses when they make the scope of a negation easier to read.",
    "`not` keert de waarheidswaarde van een voorwaarde om. True wordt False en False wordt True. Zo kun je afwezigheid duidelijk uitdrukken: een plek is leeg wanneer deze niet bezet is. Gebruik haakjes wanneer die duidelijker maken waarop de ontkenning werkt.",
  ),
  sections: [
    S(
      "Negate the whole question",
      "Keer de hele vraag om",
      "First evaluate the expression in parentheses, then reverse its answer. Negating a group is different from negating only one part of it.",
      "Bereken eerst de expressie tussen haakjes en keer daarna het antwoord om. Een groep ontkennen is iets anders dan slechts één onderdeel ontkennen.",
      "print(not True)\nprint(not (5 >= 8))\nprint(not (True and False))",
      "False\nTrue\nTrue",
    ),
    S(
      "Empty and usable are different",
      "Leeg en bruikbaar zijn verschillend",
      "A parking bay can be empty but reserved. In this simulator, permission requires both ‘not occupied’ and ‘not reserved’. You will first calculate the empty status, then add two separate messages. An empty, unreserved bay should print both messages; independent if blocks are useful for these overlapping facts.",
      "Een parkeerplek kan leeg maar gereserveerd zijn. In deze simulator is toestemming afhankelijk van zowel ‘niet bezet’ als ‘niet gereserveerd’. Je berekent eerst de leegstatus en voegt daarna twee aparte berichten toe. Een lege, ongereserveerde plek moet beide berichten tonen; losse if-blokken zijn handig voor zulke overlappende feiten.",
    ),
  ],
  starter:
    "occupied = False\nreserved = True\n\n# Repair the empty-status calculation.\navailable = occupied\nprint(available)\n\n# Report when the bay is empty.\n\n# Report when parking is allowed.\n",
  solution:
    'occupied = False\nreserved = True\navailable = not occupied\nprint(available)\nif not occupied:\n    print("Bay is empty")\nif not occupied and not reserved:\n    print("Parking allowed")\n',
  steps: [
    C(
      T(
        "Set `available` to `not occupied` and print it. This variable describes emptiness, not permission to park.",
        "Zet `available` op `not occupied` en druk deze af. Deze variabele beschrijft of de plek leeg is, niet of je mag parkeren.",
        `available is True and ${operator("Not")}`,
        "Reverse the occupied flag; do not change the input to force an answer.",
        "Keer de vlag occupied om; verander de invoer niet om een antwoord af te dwingen.",
        "available should be True for an empty bay and False for an occupied one.",
        "available moet True zijn bij een lege plek en False bij een bezette.",
      ),
      [[{ occupied: true }, "available is False"]],
    ),
    C(
      T(
        "Add an if block using `not occupied` that prints `Bay is empty` when appropriate. Keep the Boolean output first.",
        "Voeg een if-blok met `not occupied` toe dat waar nodig `Bay is empty` afdrukt. Laat de Boolean als eerste output staan.",
        "_stdout.splitlines()[:2] == ['True','Bay is empty']",
        "An empty bay still deserves the factual message even when reserved is True.",
        "Een lege plek krijgt dit feitelijke bericht ook wanneer reserved True is.",
        "The empty-bay message should depend only on occupied.",
        "Het bericht over een lege plek moet alleen van occupied afhangen.",
      ),
      [[{ occupied: true, reserved: false }, "'Bay is empty' not in _stdout"]],
    ),
    C(
      T(
        "Add another if block using `not occupied and not reserved`. Print `Parking allowed` only when both requirements hold. Test reserved = False, then restore the starter inputs.",
        "Voeg nog een if-blok toe met `not occupied and not reserved`. Druk alleen `Parking allowed` af als beide eisen kloppen. Test reserved = False en herstel daarna de startinvoer.",
        `_stdout.splitlines() == ['True','Bay is empty'] and ${operator("And")}`,
        "Negate each flag separately, then combine them with and.",
        "Ontken elke vlag afzonderlijk en combineer ze daarna met and.",
        "Only an empty, unreserved bay may print Parking allowed. An empty reserved bay must not.",
        "Alleen een lege, ongereserveerde plek mag Parking allowed tonen. Een lege gereserveerde plek niet.",
      ),
      pairs.map(([occupied, reserved]) => [
        { occupied, reserved },
        `_stdout.splitlines() == ${occupied ? "['False']" : reserved ? "['True','Bay is empty']" : "['True','Bay is empty','Parking allowed']"}`,
      ]),
    ),
  ],
  solutionNote: loc(
    "The first decision reports one fact: emptiness. The second combines two negated facts to determine permission. With both flags False, both independent blocks run, so two descriptive messages appear.",
    "De eerste beslissing meldt één feit: of de plek leeg is. De tweede combineert twee ontkende feiten om toestemming te bepalen. Bij beide vlaggen False draaien beide losse blokken en verschijnen twee beschrijvende berichten.",
  ),
});

G(g, 10, {
  titleNl: "Een alternatief met else",
  intro: loc(
    "Sometimes a program must produce one of two responses. An `else` block is the fallback when its if condition is false. It has a colon but no condition of its own. Exactly one of the two blocks runs.",
    "Soms moet een programma één van twee reacties geven. Een `else`-blok is het alternatief wanneer de if-voorwaarde onwaar is. Het krijgt een dubbele punt, maar geen eigen voorwaarde. Precies één van de twee blokken draait.",
  ),
  sections: [
    S(
      "Cover the other route",
      "Vang de andere route op",
      "Align else with its if and indent the code beneath it. The fallback saves you from writing the opposite comparison as another independent if. Code after the entire pair continues normally.",
      "Zet else op dezelfde hoogte als de bijbehorende if en spring de code eronder in. Door het alternatief hoef je niet de tegenovergestelde vergelijking als losse if te schrijven. Code na het hele paar gaat gewoon verder.",
      'stock = 0\nif stock > 0:\n    print("Item available")\nelse:\n    print("Restocking")\nprint("Status checked")',
      "Restocking\nStatus checked",
    ),
    S(
      "Extend a booking display",
      "Breid een boekingsscherm uit",
      "The starter only reports available seats, so it goes silent when the count reaches zero. First add the missing response. Then make the successful response more useful by including the seat count. Assume the supplied count is zero or positive; checking invalid input belongs to a later exercise.",
      "De startcode meldt alleen beschikbare plaatsen en blijft dus stil wanneer het aantal nul wordt. Voeg eerst de ontbrekende reactie toe. Maak daarna de positieve reactie nuttiger door het aantal plaatsen te vermelden. Ga uit van een aantal van nul of hoger; ongeldige invoer controleren komt later.",
    ),
  ],
  starter:
    'seats = 0\n\nif seats > 0:\n    print("Seats available")\n# Add a fallback for no seats.\n',
  solution:
    'seats = 0\nif seats > 0:\n    print("Seats available: " + str(seats))\nelse:\n    print("Full")\n',
  steps: [
    C(
      T(
        "Add an `else` block that prints `Full` when no seats remain. Do not add a separate condition to else.",
        "Voeg een `else`-blok toe dat `Full` afdrukt wanneer er geen plaatsen over zijn. Voeg geen aparte voorwaarde aan else toe.",
        "_stdout.splitlines() == ['Full'] and any(isinstance(n,_ast.If) and n.orelse for n in _ast.parse(_source).body)",
        "Write else: aligned with if, then indent its print call.",
        "Schrijf else: op dezelfde hoogte als if en spring de print-aanroep in.",
        "A zero count must print Full, while positive counts must not print it.",
        "Een aantal van nul moet Full tonen; positieve aantallen mogen dit niet tonen.",
      ),
      [[{ seats: 3 }, "'Full' not in _stdout.splitlines()"]],
    ),
    C(
      T(
        "Improve the available-seats branch: print `Seats available: ` followed by the current count. Use str(seats) when joining the text. Try 3 and 1, then restore seats = 0.",
        "Verbeter de tak voor beschikbare plaatsen: druk `Seats available: ` af met daarna het huidige aantal. Gebruik str(seats) bij het samenvoegen. Probeer 3 en 1 en herstel daarna seats = 0.",
        "_stdout.splitlines() == ['Full']",
        "Only change the existing positive branch. The else response should remain Full.",
        "Verander alleen de bestaande positieve tak. Het else-antwoord moet Full blijven.",
        "The positive branch must include the actual seat count and produce only one line.",
        "De positieve tak moet het werkelijke aantal plaatsen bevatten en slechts één regel produceren.",
      ),
      [
        [{ seats: 3 }, "_stdout.splitlines() == ['Seats available: 3']"],
        [{ seats: 1 }, "_stdout.splitlines() == ['Seats available: 1']"],
      ],
    ),
  ],
  solutionNote: loc(
    "A positive count selects the first block and includes that count in the message. Zero selects the fallback. The two outputs cannot both appear because they are alternatives in the same if/else statement.",
    "Een positief aantal kiest het eerste blok en vermeldt dat aantal in het bericht. Nul kiest het alternatief. De twee berichten kunnen niet samen verschijnen omdat ze alternatieven binnen dezelfde if/else-instructie zijn.",
  ),
});

G(g, 11, {
  titleNl: "Meerdere uitkomsten met elif",
  intro: loc(
    "An `if`/`elif`/`else` chain chooses one result from several possibilities. Python checks conditions in order and stops at the first true one. The order matters whenever conditions overlap: a broad early test can hide a more specific later test.",
    "Een `if`/`elif`/`else`-reeks kiest één resultaat uit meerdere mogelijkheden. Python controleert de voorwaarden op volgorde en stopt bij de eerste ware. De volgorde telt wanneer voorwaarden overlappen: een brede test vooraan kan een specifiekere test verderop verbergen.",
  ),
  sections: [
    S(
      "First match wins",
      "De eerste passende tak wint",
      "A score of 95 is also at least 70. Test the higher threshold first when using >=. Replacing elif with separate if statements could print more than one classification.",
      "Een score van 95 is ook minstens 70. Test bij >= eerst de hogere grens. Vervang je elif door losse if-instructies, dan kunnen meerdere classificaties worden afgedrukt.",
      'score = 95\nif score >= 90:\n    print("Excellent")\nelif score >= 70:\n    print("Pass")\nelse:\n    print("Practise again")',
      "Excellent",
    ),
    S(
      "Build ordered ranges",
      "Bouw geordende bereiken",
      "Our fictional wind display uses these categories: below 10 is calm, 10 up to but not including 25 is breezy, 25 up to 40 is strong, and 40 or more is storm. With less-than comparisons, test the lowest threshold first. A later branch already knows the earlier conditions were false.",
      "Ons fictieve windscherm gebruikt deze categorieën: onder 10 is calm, van 10 tot maar niet inclusief 25 is breezy, van 25 tot 40 is strong en vanaf 40 is storm. Test bij kleiner-dan-vergelijkingen eerst de laagste grens. Een latere tak weet al dat eerdere voorwaarden onwaar waren.",
    ),
  ],
  starter:
    '# The first two thresholds are in the wrong order.\nwind = 18\n\nif wind < 25:\n    category = "calm"\nelif wind < 10:\n    category = "breezy"\nelse:\n    category = "unclassified"\n\nprint(category)\n# Add a labelled summary after the category.\n',
  solution:
    'wind = 18\nif wind < 10:\n    category = "calm"\nelif wind < 25:\n    category = "breezy"\nelif wind < 40:\n    category = "strong"\nelse:\n    category = "storm"\nprint(category)\nprint("Wind: " + str(wind) + " | " + category)\n',
  steps: [
    C(
      T(
        "Repair the first two conditions so values below 10 become calm and values from 10 to below 25 become breezy. The starter's 18 should print breezy.",
        "Herstel de eerste twee voorwaarden zodat waarden onder 10 calm worden en waarden van 10 tot onder 25 breezy. De startwaarde 18 moet breezy afdrukken.",
        "category == 'breezy' and _stdout.splitlines()[:1] == ['breezy']",
        "Test wind < 10 before wind < 25. Otherwise the broader condition catches the smaller values too.",
        "Test wind < 10 vóór wind < 25. Anders vangt de bredere voorwaarde ook de lagere waarden op.",
        "Check the ordering at 9, 10 and 24; only the first matching branch runs.",
        "Controleer de volgorde bij 9, 10 en 24; alleen de eerste passende tak draait.",
      ),
      [
        [{ wind: 9 }, "category == 'calm'"],
        [{ wind: 10 }, "category == 'breezy'"],
        [{ wind: 24 }, "category == 'breezy'"],
      ],
    ),
    C(
      T(
        "Add an elif for wind below 40 with category strong. Change the fallback to storm. At exactly 25 the category must be strong; at exactly 40 it must be storm.",
        "Voeg een elif toe voor wind onder 40 met categorie strong. Verander het alternatief naar storm. Precies 25 moet strong geven; precies 40 moet storm geven.",
        "category == 'breezy'",
        "Place the new elif after the below-25 branch and before else.",
        "Zet de nieuwe elif na de tak voor onder 25 en vóór else.",
        "Test both boundaries: 25 and 39 are strong; 40 and above are storm.",
        "Test beide grenzen: 25 en 39 zijn strong; 40 en hoger zijn storm.",
      ),
      [
        [{ wind: 25 }, "category == 'strong'"],
        [{ wind: 39 }, "category == 'strong'"],
        [{ wind: 40 }, "category == 'storm'"],
        [{ wind: 65 }, "category == 'storm'"],
      ],
    ),
    C(
      T(
        "After the category, print a summary in the form `Wind: 18 | breezy`, using the current wind and category variables. Keep wind = 18 for the normal run.",
        "Druk na de categorie een samenvatting af in de vorm `Wind: 18 | breezy`, met de huidige variabelen wind en category. Laat wind voor de gewone uitvoering op 18 staan.",
        "_stdout.splitlines() == ['breezy','Wind: 18 | breezy']",
        "Build the message after the whole chain so every branch shares the same output code.",
        "Bouw het bericht na de hele reeks op zodat elke tak dezelfde outputcode gebruikt.",
        "Use the variables in the summary so it stays correct for other wind values.",
        "Gebruik de variabelen in de samenvatting zodat deze bij andere windwaarden blijft kloppen.",
      ),
      [
        [{ wind: 9 }, "_stdout.splitlines() == ['calm','Wind: 9 | calm']"],
        [{ wind: 40 }, "_stdout.splitlines() == ['storm','Wind: 40 | storm']"],
      ],
    ),
  ],
  solutionNote: loc(
    "The ascending upper bounds form non-overlapping ranges because each later branch is reached only after earlier tests fail. The summary sits outside the chain, which avoids repeating presentation code in every branch.",
    "De oplopende bovengrenzen vormen niet-overlappende bereiken, omdat een latere tak pas wordt bereikt nadat eerdere tests onwaar zijn. De samenvatting staat buiten de reeks, zodat je de presentatiecode niet in elke tak herhaalt.",
  ),
});

G(g, 12, {
  titleNl: "Terugblik: een adviesprogramma uitbreiden",
  intro: loc(
    "You now have the parts of a decision program: comparisons create Boolean answers, and/or/not combine or reverse them, and if/elif/else chooses which instructions run. This optional playground combines those parts in a fictional outdoor-session planner.",
    "Je kent nu de onderdelen van een beslisprogramma: vergelijkingen maken Boolean-antwoorden, and/or/not combineren of ontkennen deze en if/elif/else kiest welke instructies draaien. Deze optionele oefenruimte combineert de onderdelen in een fictieve planner voor een buitenactiviteit.",
  ),
  sections: [
    S(
      "Trace before editing",
      "Volg de code voordat je wijzigt",
      "With rain = True and wind = 12, the first condition fails because both requirements are not met. The second condition matches, so only its message appears. If the first branch matched, Python would skip the later elif even though rain is also true there.",
      "Bij rain = True en wind = 12 faalt de eerste voorwaarde, omdat niet aan beide eisen is voldaan. De tweede voorwaarde past, dus alleen dat bericht verschijnt. Als de eerste tak wel paste, zou Python de latere elif overslaan, ook al is rain daar eveneens waar.",
      'rain = True\nwind = 12\nif rain and wind > 20:\n    print("Indoor session")\nelif rain:\n    print("Bring a jacket")\nelse:\n    print("Enjoy the trail")',
      "Bring a jacket",
    ),
    S(
      "Make the missing route explicit",
      "Maak de ontbrekende route expliciet",
      "Run the supplied program with these inputs and predict each result: rainy with wind 25; rainy with wind 12; dry with wind 12; dry with wind 25. The last case currently falls through to Enjoy the trail.\n\nAdd an elif for a dry day with wind above 20 that prints `Choose a sheltered route`. Place it before the fallback and keep the rainy-day outcomes unchanged. Test wind = 20 too: the requirement says above 20, so equality should still use the ordinary dry-day message.\n\nFinally, explain why turning each elif into an independent if can produce extra messages. This is an exploration: your completion does not depend on matching one solution.",
      "Voer het gegeven programma uit met deze invoer en voorspel telkens het resultaat: regen met wind 25; regen met wind 12; droog met wind 12; droog met wind 25. Het laatste geval valt nu terug op Enjoy the trail.\n\nVoeg een elif toe voor een droge dag met wind boven 20 die `Choose a sheltered route` afdrukt. Plaats deze vóór het alternatief en laat de uitkomsten bij regen gelijk. Test ook wind = 20: de eis zegt boven 20, dus gelijkheid moet nog het gewone bericht voor droog weer geven.\n\nLeg tot slot uit waarom losse if-instructies in plaats van elke elif extra berichten kunnen produceren. Dit is een verkenning: je voltooiing hangt niet af van één specifieke oplossing.",
    ),
  ],
  starter:
    'rain = True\nwind = 12\n\nif rain and wind > 20:\n    print("Indoor session")\nelif rain:\n    print("Bring a jacket")\n# Add the missing dry, windy route here.\nelse:\n    print("Enjoy the trail")\n',
  solution:
    'rain = True\nwind = 12\nif rain and wind > 20:\n    print("Indoor session")\nelif rain:\n    print("Bring a jacket")\nelif wind > 20:\n    print("Choose a sheltered route")\nelse:\n    print("Enjoy the trail")\n',
  solutionNote: loc(
    "The new elif only runs after both rainy-day branches fail, so rain is already false. It can simply test wind > 20. Writing not rain and wind > 20 there is also correct, but repeats information the earlier branches established.",
    "De nieuwe elif wordt pas bereikt nadat beide regentakken falen; rain is dus al onwaar. Daarom volstaat wind > 20. Daar not rain and wind > 20 schrijven is ook correct, maar herhaalt informatie die de eerdere takken al gaven.",
  ),
});
