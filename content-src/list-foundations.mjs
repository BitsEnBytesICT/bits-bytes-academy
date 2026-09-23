import { guided as G, section as S, step as T, loc } from "./helpers.mjs";
const g = "create-python-list";
const C = (step, rows) => ({
  ...step,
  cases: rows.map(([inputs, check]) => ({ inputs, check })),
});
const method = (name) =>
  `any(isinstance(n, _ast.Call) and isinstance(n.func, _ast.Attribute) and n.func.attr == '${name}' for n in _ast.walk(_ast.parse(_source)))`;

G(g, 1, {
  titleNl: "Van losse waarden naar een list",
  intro: loc(
    "An equipment room records several measurements in the order they arrive. Giving every measurement a separate variable soon becomes awkward. A list keeps the sequence under one name. Its square brackets mark the collection; commas separate the elements inside it.",
    "Een materiaalruimte registreert verschillende metingen in de volgorde waarin ze binnenkomen. Elke meting een aparte variabele geven wordt al snel onhandig. Een list bewaart de reeks onder één naam. De vierkante haakjes markeren de verzameling; komma's scheiden de elementen daarin.",
  ),
  sections: [
    S(
      "Order is part of the data",
      "De volgorde hoort bij de gegevens",
      "The first reading stays first, and repeated values are allowed. Spaces after commas make a list easier to read, but the commas themselves are required. Assign a list to a name just as you assigned a number or string.",
      "De eerste meting blijft de eerste en herhaalde waarden zijn toegestaan. Spaties na komma's maken een list leesbaarder, maar de komma's zelf zijn verplicht. Wijs een list toe aan een naam zoals je dat met een getal of string deed.",
      "readings = [12, 15, 12]\nprint(readings)",
      "[12, 15, 12]",
    ),
    S(
      "Extend and repair the manifest",
      "Breid de paklijst uit en herstel deze",
      "The editor contains a valid sequence and a commented-out sequence with missing separators. First add the new reading to the valid list literal. Then repair and activate the second assignment. If you activate it before fixing the commas, observe the SyntaxError and repair it before continuing. Python must parse the entire file before any output appears.",
      "In de editor staat een geldige reeks en een uitgecommentarieerde reeks met ontbrekende scheidingstekens. Voeg eerst de nieuwe meting aan de geldige list toe. Herstel en activeer daarna de tweede toewijzing. Activeer je deze vóór het toevoegen van komma's, bekijk dan de SyntaxError en herstel deze voordat je verdergaat. Python moet het hele bestand ontleden voordat output verschijnt.",
    ),
  ],
  starter:
    "# Recorded package masses, in arrival order.\nmasses = [4, 7, 4]\nprint(masses)\n\n# Repair and activate this second batch.\n# spare_masses = [6 2 9]\n",
  solution:
    "masses = [4, 7, 4, 8]\nprint(masses)\nspare_masses = [6, 2, 9]\nprint(spare_masses)\n",
  steps: [
    T(
      "A fourth package has mass 8. Add 8 at the end of the `masses` list literal, keeping all earlier readings and their order. Run to inspect the updated manifest.",
      "Een vierde pakket heeft massa 8. Voeg 8 achteraan de list `masses` toe en behoud alle eerdere metingen en hun volgorde. Voer uit om de bijgewerkte paklijst te bekijken.",
      "masses == [4,7,4,8] and _stdout.splitlines()[:1] == ['[4, 7, 4, 8]']",
      "Keep both readings of 4. Insert a comma before the new final value.",
      "Behoud beide metingen van 4. Zet een komma vóór de nieuwe laatste waarde.",
      "Keep 4, 7, 4 in order and add one final 8; print the complete list.",
      "Behoud 4, 7, 4 in die volgorde en voeg één laatste 8 toe; druk de hele list af.",
    ),
    T(
      "Uncomment `spare_masses`, repair its missing commas, and print it after the first batch. The second output line should be [6, 2, 9].",
      "Haal het commentaarteken bij `spare_masses` weg, herstel de ontbrekende komma's en druk de list na de eerste partij af. De tweede outputregel moet [6, 2, 9] zijn.",
      "spare_masses == [6,2,9] and _stdout.splitlines() == ['[4, 7, 4, 8]','[6, 2, 9]']",
      "Remove the leading # and separate each pair of numbers with a comma.",
      "Verwijder de # vooraan en scheid elk paar getallen met een komma.",
      "Define a second list containing three separate integers, then display it below masses.",
      "Definieer een tweede list met drie losse integers en toon deze onder masses.",
    ),
  ],
  solutionNote: loc(
    "The added 8 extends the first sequence without removing its duplicate 4. Commas turn the second sequence into three elements. Printing a list displays the surrounding brackets as well as its contents.",
    "De toegevoegde 8 breidt de eerste reeks uit zonder de dubbele 4 te verwijderen. Komma's maken van de tweede reeks drie elementen. Bij het afdrukken van een list zie je naast de inhoud ook de omliggende haakjes.",
  ),
});

G(g, 2, {
  titleNl: "Een record met verschillende types",
  intro: loc(
    "A list can hold strings, numbers and Booleans together. Each element keeps its own type. This lets a small equipment record store a label, quantity, price and availability in a known order. Agreeing on that order makes the record understandable to someone reading it later.",
    "Een list kan strings, getallen en Booleans samen bevatten. Elk element behoudt het eigen type. Zo kan een klein materiaalrecord een label, aantal, prijs en beschikbaarheid in een vaste volgorde bewaren. Een afgesproken volgorde maakt het record later begrijpelijk.",
  ),
  sections: [
    S(
      "Values keep their types",
      "Waarden behouden hun types",
      'Quotes identify text; they are not decoration around every value. A quantity of 3 should be the integer 3, not the string "3". A price can be a float and availability a bool.',
      'Aanhalingstekens geven tekst aan; het is geen versiering rond elke waarde. Een aantal van 3 hoort de integer 3 te zijn, niet de string "3". Een prijs kan een float zijn en beschikbaarheid een bool.',
      'record = ["Tripod", 3, 12.5, True]\nprint(record)',
      "['Tripod', 3, 12.5, True]",
    ),
    S(
      "Build one consistent record",
      "Bouw één consistent record",
      "The starter has imported every field as text. Repair the types while keeping the field order: item name, quantity, price, available. Then create a second record with the same layout. In later lessons you will use indexes to read and change individual fields.",
      "De startcode heeft elk veld als tekst geïmporteerd. Herstel de types en behoud de veldvolgorde: artikelnaam, aantal, prijs, beschikbaar. Maak daarna een tweede record met dezelfde indeling. In latere lessen lees en verander je losse velden met indexes.",
    ),
  ],
  starter:
    '# Field order: label, quantity, price, available.\nsensor = ["Sensor", "4", "2.5", "True"]\nprint(sensor)\n\n# Add a second equipment record below.\n',
  solution:
    'sensor = ["Sensor", 4, 2.5, True]\nprint(sensor)\ncable = ["Cable", 8, 1.75, False]\nprint(cable)\n',
  steps: [
    T(
      "Repair the numeric fields in `sensor`: quantity must be the integer 4 and price the float 2.5. Keep the label first.",
      "Herstel de numerieke velden in `sensor`: het aantal moet de integer 4 zijn en de prijs de float 2.5. Houd het label vooraan.",
      "sensor[:3] == ['Sensor',4,2.5] and type(sensor[1]) is int and type(sensor[2]) is float",
      "Numbers do not need quotes. Keep quotes around Sensor because it is a name.",
      "Getallen hebben geen aanhalingstekens nodig. Behoud ze rond Sensor omdat dat een naam is.",
      "Quantity must be numeric 4 and price numeric 2.5, in their original positions.",
      "Het aantal moet het getal 4 zijn en de prijs het getal 2.5, op de oorspronkelijke posities.",
    ),
    T(
      "Change the final field from text to the Boolean True. Run and compare the printed record with the imported version.",
      "Verander het laatste veld van tekst naar de Boolean True. Voer uit en vergelijk het afgedrukte record met de geïmporteerde versie.",
      "sensor == ['Sensor',4,2.5,True] and type(sensor[3]) is bool",
      "True has a capital T and no quotes when it is a Boolean.",
      "True heeft een hoofdletter T en geen aanhalingstekens wanneer het een Boolean is.",
      "The availability field should have type bool, not str.",
      "Het beschikbaarheidsveld moet type bool hebben, niet str.",
    ),
    T(
      "Create `cable` using the same field order: Cable, 8, 1.75, False. Print it below sensor. Which fields are text, integers, floats and Booleans?",
      "Maak `cable` met dezelfde veldvolgorde: Cable, 8, 1.75, False. Druk het onder sensor af. Welke velden zijn tekst, integers, floats en Booleans?",
      "cable == ['Cable',8,1.75,False] and type(cable[1]) is int and type(cable[2]) is float and type(cable[3]) is bool and _stdout.splitlines() == [str(sensor),str(cable)]",
      "Use a new list literal; only Cable needs quotes.",
      "Gebruik een nieuwe list; alleen Cable heeft aanhalingstekens nodig.",
      "Create a four-field cable record with the correct types, then print both records in order.",
      "Maak een cable-record met vier velden en de juiste types en druk beide records in volgorde af.",
    ),
  ],
  solutionNote: loc(
    'The list groups related fields, but does not convert them. Keeping quantities numeric allows later calculations. The Boolean False represents unavailable stock; the string "False" would merely be text.',
    'De list groepeert gerelateerde velden, maar zet ze niet om. Numerieke aantallen maken latere berekeningen mogelijk. De Boolean False stelt onbeschikbare voorraad voor; de string "False" zou alleen tekst zijn.',
  ),
});

G(g, 3, {
  titleNl: "Nog geen items is ook informatie",
  intro: loc(
    'An empty list represents a collection with no elements yet. It is useful before the first request, measurement or message arrives. `[]` is different from `""`, which is empty text, and from `[""]`, which is a list containing one empty string.',
    'Een lege list stelt een verzameling voor die nog geen elementen bevat. Dat is handig voordat het eerste verzoek, de eerste meting of het eerste bericht binnenkomt. `[]` verschilt van `""`, wat lege tekst is, en van `[""]`, een list met één lege string.',
  ),
  sections: [
    S(
      "Empty does not mean missing",
      "Leeg betekent niet ontbrekend",
      "The variable exists and contains a list; the list simply has no items. You can inspect its type and compare it with another empty list. Methods that add data will work on it when that data arrives.",
      "De variabele bestaat en bevat een list; die list heeft alleen nog geen items. Je kunt het type bekijken en vergelijken met een andere lege list. Methods die gegevens toevoegen werken zodra die gegevens binnenkomen.",
      'pending = []\nprint(type(pending))\nprint(pending == [])\nprint([""] == [])',
      "<class 'list'>\nTrue\nFalse",
    ),
    S(
      "Give the dashboard an honest starting state",
      "Geef het dashboard een eerlijke beginstand",
      "The editor contains a dashboard with a fake placeholder request. Replace that placeholder with a truly empty collection. Then derive a status from the collection itself, so it will stop saying empty when requests arrive.",
      "In de editor staat een dashboard met een nepverzoek als placeholder. Vervang die placeholder door een werkelijk lege verzameling. Leid de status daarna uit de verzameling zelf af, zodat het dashboard niet meer leeg zegt zodra er verzoeken binnenkomen.",
    ),
  ],
  starter:
    'requests = ["waiting for first request"]\nis_empty = False\nprint(requests)\nprint("Empty:", is_empty)\n',
  solution:
    'requests = []\nis_empty = requests == []\nprint(requests)\nprint("Empty:", is_empty)\n',
  steps: [
    T(
      "Replace the placeholder in `requests` with a truly empty list. Run and confirm that the first line is [].",
      "Vervang de placeholder in `requests` door een echt lege list. Voer uit en controleer dat de eerste regel [] is.",
      "type(requests) is list and requests == [] and _stdout.splitlines()[:1] == ['[]']",
      "Leave nothing between the square brackets—not even an empty quoted string.",
      "Laat niets tussen de vierkante haakjes staan, ook geen lege string tussen aanhalingstekens.",
      "Use an empty list, not empty text or a list with a placeholder item.",
      "Gebruik een lege list, niet lege tekst of een list met een placeholder-item.",
    ),
    C(
      T(
        "Set `is_empty` by comparing requests with []. Keep the existing print calls and run again: the dashboard should show Empty: True.",
        "Bereken `is_empty` door requests met [] te vergelijken. Behoud de print-aanroepen en voer opnieuw uit: het dashboard moet Empty: True tonen.",
        "is_empty is True and _stdout.splitlines() == ['[]','Empty: True']",
        "Use the equality comparison you learned earlier: requests == [].",
        "Gebruik de eerder geleerde gelijkheidsvergelijking: requests == [].",
        "Calculate the status from requests so it becomes False for a list that contains a request.",
        "Bereken de status uit requests zodat deze False wordt voor een list met een verzoek.",
      ),
      [[{ requests: ["lamp"] }, "is_empty is False"]],
    ),
  ],
  solutionNote: loc(
    "The empty brackets hold zero elements. Comparing the collection with [] computes the dashboard status. A literal True would describe only this moment; the comparison also works after data arrives.",
    "De lege haakjes bevatten nul elementen. Door de verzameling met [] te vergelijken bereken je de dashboardstatus. Een vaste True beschrijft alleen dit moment; de vergelijking werkt ook nadat gegevens binnenkomen.",
  ),
});

G(g, 4, {
  titleNl: "Een method hoort bij een object",
  intro: loc(
    'A method is an operation you call through an object. In `items.append("map")`, items is the list being changed, append is the method name, and the value in parentheses is its argument. The dot connects the operation to the particular list.',
    'Een method is een bewerking die je via een object aanroept. In `items.append("map")` is items de list die verandert, append de naam van de method en de waarde tussen haakjes het argument. De punt verbindt de bewerking met de specifieke list.',
  ),
  sections: [
    S(
      "Watch before and after",
      "Bekijk vóór en na",
      "This method changes the existing list. Calling print afterward lets you see the effect. The first display is a record of what the list contained then; it does not change retroactively when the list is updated.",
      "Deze method verandert de bestaande list. Door daarna print aan te roepen zie je het effect. De eerste weergave toont wat de list toen bevatte; deze verandert niet achteraf wanneer de list wordt bijgewerkt.",
      'kit = ["map"]\nprint("Before:", kit)\nkit.append("torch")\nprint("After:", kit)',
      "Before: ['map']\nAfter: ['map', 'torch']",
    ),
    S(
      "Change the target, not just the argument",
      "Verander het doel, niet alleen het argument",
      "Run the supplied checkout demonstration. It has separate packed and borrowed lists. Change the appended item and predict which output changes. Then move the append call from packed to borrowed. The same method now changes a different object. Restore your preferred version before continuing; the next lesson practises append in detail.",
      "Voer de meegeleverde uitleendemonstratie uit. Deze heeft afzonderlijke lists packed en borrowed. Verander het toegevoegde item en voorspel welke output verandert. Verplaats de append-aanroep daarna van packed naar borrowed. Dezelfde method verandert nu een ander object. Herstel de gewenste versie voordat je verdergaat; in de volgende les oefen je append uitgebreider.",
    ),
  ],
  starter:
    'packed = ["map"]\nborrowed = []\nprint("Packed before:", packed)\npacked.append("torch")\nprint("Packed after:", packed)\nprint("Borrowed:", borrowed)\n',
  solution:
    'packed = ["map"]\nborrowed = []\nprint("Packed before:", packed)\nborrowed.append("torch")\nprint("Packed after:", packed)\nprint("Borrowed:", borrowed)\n',
  solutionNote: loc(
    "Calling borrowed.append puts the new item in borrowed. packed remains unchanged because it is a separate list. The object before the dot determines where the method operates.",
    "Met borrowed.append komt het nieuwe item in borrowed. packed blijft ongewijzigd omdat het een afzonderlijke list is. Het object vóór de punt bepaalt waar de method werkt.",
  ),
});

G(g, 5, {
  titleNl: "Een inpaklijst stap voor stap aanvullen",
  intro: loc(
    "append adds one element at the end of an existing list. The original order stays intact and duplicate values are allowed. A second call adds its element after the first. You do not need to rewrite the whole list every time a request arrives.",
    "append voegt één element toe aan het einde van een bestaande list. De oorspronkelijke volgorde blijft behouden en dubbele waarden zijn toegestaan. Een tweede aanroep zet het volgende element achter het eerste. Je hoeft niet telkens de hele list te herschrijven wanneer er een verzoek binnenkomt.",
  ),
  sections: [
    S(
      "One call, one element",
      "Eén aanroep, één element",
      "Call append on the list, put one item inside its parentheses, then inspect the list. Two requests mean two calls. Later, a list itself can be one appended element; append does not automatically unpack its contents.",
      "Roep append aan op de list, zet één item tussen de haakjes en bekijk daarna de list. Twee verzoeken betekenen twee aanroepen. Later kan een list zelf één toegevoegd element zijn; append pakt de inhoud niet automatisch uit.",
      'tools = []\ntools.append("ruler")\ntools.append("pencil")\nprint(tools)',
      "['ruler', 'pencil']",
    ),
    S(
      "Change versus return value",
      "Verandering tegenover return value",
      "append changes the list and returns None. Do not write `tools = tools.append(...)`: that would replace your list variable with None. Use a standalone call, then print the list on a separate line.",
      "append verandert de list en geeft None terug. Schrijf niet `tools = tools.append(...)`: daarmee vervang je de listvariabele door None. Gebruik een losse aanroep en druk de list daarna op een aparte regel af.",
      'tools = ["ruler"]\nresult = tools.append("pencil")\nprint(result)\nprint(tools)',
      "None\n['ruler', 'pencil']",
    ),
  ],
  starter:
    'packing = ["map", "water"]\nprint("Before:", packing)\n\n# Add the two new requests below, one at a time.\n\nprint("After:", packing)\n',
  solution:
    'packing = ["map", "water"]\nprint("Before:", packing)\npacking.append("torch")\npacking.append("blanket")\nprint("After:", packing)\n',
  steps: [
    C(
      T(
        "Between the two print calls, append torch to `packing`. Run and compare Before with After.",
        "Voeg tussen de twee print-aanroepen torch toe aan `packing` met append. Voer uit en vergelijk Before met After.",
        `packing[:3] == ['map','water','torch'] and ${method("append")}`,
        "Call packing.append with the string torch. Do not assign the call back to packing.",
        "Roep packing.append aan met de string torch. Wijs de aanroep niet terug aan packing toe.",
        "Append torch after the existing items without replacing the original list.",
        "Voeg torch achter de bestaande items toe zonder de oorspronkelijke list te vervangen.",
      ),
      [[{ packing: ["compass"] }, "packing[:2] == ['compass','torch']"]],
    ),
    C(
      T(
        "A second request arrives for blanket. Add another append call after the torch call. Keep the original Before display and print the final four-item list as After.",
        "Er komt een tweede verzoek voor blanket binnen. Voeg na de torch-aanroep nog een append-aanroep toe. Behoud de oorspronkelijke Before-weergave en toon de uiteindelijke list met vier items als After.",
        "packing == ['map','water','torch','blanket'] and _stdout.splitlines() == [\"Before: ['map', 'water']\",\"After: ['map', 'water', 'torch', 'blanket']\"]",
        "Both append calls belong between the Before and After print calls.",
        "Beide append-aanroepen horen tussen de print-aanroepen voor Before en After.",
        "The final list should retain map and water, then add torch and blanket as separate elements in that order.",
        "De laatste list moet map en water behouden, met daarna torch en blanket als losse elementen in die volgorde.",
      ),
      [
        [{ packing: [] }, "packing == ['torch','blanket']"],
        [{ packing: ["torch"] }, "packing == ['torch','torch','blanket']"],
      ],
    ),
  ],
  solutionNote: loc(
    "The two calls mutate one list. The earlier print records the initial state; the later print shows both additions. Appending a duplicate is valid, and an empty starting list works without any special case.",
    "De twee aanroepen veranderen één list. De eerdere print legt de beginstand vast; de latere print toont beide toevoegingen. Een dubbele waarde toevoegen is geldig en een lege beginlist werkt zonder speciale behandeling.",
  ),
});

G(g, 6, {
  titleNl: "Twee roosters samenvoegen",
  intro: loc(
    "The + operator combines two lists into a new outer list, with every element from the left followed by every element from the right. This is concatenation. It differs from append: appending a list adds that whole list as one element, while + combines the elements of both lists.",
    "De operator + combineert twee lists tot een nieuwe buitenste list, met eerst alle elementen van links en daarna alle elementen van rechts. Dit heet concatenation. Het verschilt van append: bij het toevoegen van een list met append wordt die hele list één element, terwijl + de elementen uit beide lists samenvoegt.",
  ),
  sections: [
    S(
      "The original lists remain available",
      "De oorspronkelijke lists blijven beschikbaar",
      "Assign the combined result to a new name. For a flat list of strings or numbers, later appends to that new list do not append to either original. Nested elements need more care because concatenation does not recursively copy inner lists; we will return to that when we use tables.",
      "Wijs het gecombineerde resultaat toe aan een nieuwe naam. Bij een platte list van strings of getallen voegt een latere append op die nieuwe list niets aan de oorspronkelijke lists toe. Bij geneste elementen is meer aandacht nodig: concatenation kopieert binnenste lists niet afzonderlijk. Daar komen we bij tabellen op terug.",
      "early = [8, 10]\nlate = [14]\nwhole_day = early + late\nwhole_day.append(16)\nprint(whole_day)\nprint(early)\nprint(late)",
      "[8, 10, 14, 16]\n[8, 10]\n[14]",
    ),
    S(
      "Both sides must be lists",
      "Beide kanten moeten lists zijn",
      "`times + 18` raises TypeError: the right side is an integer. Use `times + [18]` to concatenate a one-element list, or times.append(18) to modify times directly. Decide whether you need a new result or a change to the existing collection.",
      "`times + 18` geeft TypeError: rechts staat een integer. Gebruik `times + [18]` om een list met één element samen te voegen, of times.append(18) om times direct te veranderen. Bepaal of je een nieuw resultaat wilt of een wijziging aan de bestaande verzameling.",
    ),
  ],
  starter:
    'morning = [9, 11]\nafternoon = [14, 16]\nschedule = morning\nprint("Schedule:", schedule)\nprint("Morning:", morning)\nprint("Afternoon:", afternoon)\n\n# Create extended from schedule and the additional time 18.\n',
  solution:
    'morning = [9, 11]\nafternoon = [14, 16]\nschedule = morning + afternoon\nprint("Schedule:", schedule)\nprint("Morning:", morning)\nprint("Afternoon:", afternoon)\nextended = schedule + [18]\nprint("Extended:", extended)\n',
  steps: [
    C(
      T(
        "Replace the schedule assignment with a concatenation of morning and afternoon. Run to confirm the complete day appears before the two unchanged input lists.",
        "Vervang de toewijzing van schedule door een samenvoeging van morning en afternoon. Voer uit en controleer dat de volledige dag vóór de twee ongewijzigde invoerlists verschijnt.",
        "schedule == [9,11,14,16] and morning == [9,11] and afternoon == [14,16] and schedule is not morning and schedule is not afternoon",
        "Use morning + afternoon on the right of the assignment.",
        "Gebruik morning + afternoon rechts van de toewijzing.",
        "Make a new flat list in morning-then-afternoon order; preserve both originals.",
        "Maak een nieuwe platte list in de volgorde ochtend-middag en behoud beide oorspronkelijke lists.",
      ),
      [
        [
          { morning: [8], afternoon: [13, 15] },
          "schedule == [8,13,15] and morning == [8] and afternoon == [13,15]",
        ],
      ],
    ),
    C(
      T(
        "Create `extended` by concatenating schedule with a one-element list containing 18. Print it with the label Extended:. Keep schedule unchanged.",
        "Maak `extended` door schedule samen te voegen met een list met alleen 18. Druk het resultaat af met het label Extended:. Laat schedule ongewijzigd.",
        "extended == [9,11,14,16,18] and schedule == [9,11,14,16] and extended is not schedule and _stdout.splitlines()[-1:] == ['Extended: [9, 11, 14, 16, 18]']",
        "Wrap 18 in square brackets. The + operator expects a list on each side.",
        "Zet 18 tussen vierkante haakjes. De operator + verwacht aan beide kanten een list.",
        "Create a separate extended list with a final 18, rather than modifying schedule or nesting a list inside it.",
        "Maak een afzonderlijke extended-list met een laatste 18, in plaats van schedule te wijzigen of er een list in te nesten.",
      ),
      [
        [
          { morning: [], afternoon: [12] },
          "schedule == [12] and extended == [12,18]",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "Both expressions create a new outer list. The original schedules are unchanged, and wrapping 18 in brackets supplies the list operand that + requires. The extended list stays flat.",
    "Beide expressies maken een nieuwe buitenste list. De oorspronkelijke roosters blijven ongewijzigd en de haakjes rond 18 leveren de list die + vereist. De extended-list blijft plat.",
  ),
});

G(g, 7, {
  titleNl: "Een route op positie lezen",
  intro: loc(
    "An index identifies an element's position. Python starts counting at zero: index 0 is the first element, 1 is the second, and 2 is the third. Reading an element does not remove it. Think of the index as a position label rather than an everyday ordinal number.",
    "Een index geeft de positie van een element aan. Python telt vanaf nul: index 0 is het eerste element, 1 het tweede en 2 het derde. Een element lezen verwijdert het niet. Zie de index als een positielabel in plaats van een gewoon volgnummer.",
  ),
  sections: [
    S(
      "Count positions from zero",
      "Tel posities vanaf nul",
      "Put the index in square brackets after the list name. You can store the selected value and use it in a message. In a four-element list, the valid non-negative positions are 0, 1, 2 and 3.",
      "Zet de index tussen vierkante haakjes achter de listnaam. Je kunt de gekozen waarde bewaren en in een bericht gebruiken. In een list met vier elementen zijn de geldige niet-negatieve posities 0, 1, 2 en 3.",
      'route = ["Gate", "Pond", "Tower", "Camp"]\nthird_stop = route[2]\nprint(third_stop)\nprint(route)',
      "Tower\n['Gate', 'Pond', 'Tower', 'Camp']",
    ),
    S(
      "Two different indexing mistakes",
      "Twee verschillende indexfouten",
      "An integer position outside the list raises IndexError. A float such as 2.0 is not a valid list index and raises TypeError, even though it looks like a whole number. In particular, `/` produces a float. Use the intended integer index rather than an unexamined division result.\n\nThe route display below has a commented-out out-of-range access. Try it, read the error, then repair it to select the fourth stop.",
      "Een integerpositie buiten de list veroorzaakt IndexError. Een float zoals 2.0 is geen geldige listindex en geeft TypeError, ook al lijkt het een geheel getal. Vooral belangrijk: `/` geeft een float. Gebruik de bedoelde integerindex in plaats van zomaar een delingsresultaat.\n\nDe routeweergave hieronder bevat een uitgecommentarieerde toegang buiten de list. Probeer deze, lees de fout en herstel de regel zodat deze de vierde stop kiest.",
    ),
  ],
  starter:
    'stops = ["Oak", "Bridge", "Lake", "Hill"]\nfirst = "not selected"\nthird = "not selected"\nprint(first)\nprint(third)\n\n# Try this access, then repair it to select the fourth stop.\n# print(stops[4])\n',
  solution:
    'stops = ["Oak", "Bridge", "Lake", "Hill"]\nfirst = stops[0]\nthird = stops[2]\nprint(first)\nprint(third)\nprint(stops[3])\n',
  steps: [
    C(
      T(
        "Calculate `first` from the first element of stops using index 0. Run and check the first output line.",
        "Bereken `first` uit het eerste element van stops met index 0. Voer uit en controleer de eerste outputregel.",
        "first == 'Oak' and _stdout.splitlines()[:1] == ['Oak']",
        "Write stops[0], not the literal string Oak.",
        "Schrijf stops[0], niet de vaste string Oak.",
        "Read the first position so the result follows a changed route too.",
        "Lees de eerste positie zodat het resultaat ook een gewijzigde route volgt.",
      ),
      [[{ stops: ["Start", "Middle", "End", "Finish"] }, "first == 'Start'"]],
    ),
    C(
      T(
        "Calculate `third` from the third stop with a positive index. Predict its value before running.",
        "Bereken `third` uit de derde stop met een positieve index. Voorspel de waarde voordat je uitvoert.",
        "third == 'Lake' and _stdout.splitlines()[1:2] == ['Lake']",
        "The third element has index 2 because counting starts at 0.",
        "Het derde element heeft index 2 omdat het tellen bij 0 begint.",
        "Select position 2 and print the selected value on the second line.",
        "Kies positie 2 en druk die waarde op de tweede regel af.",
      ),
      [[{ stops: ["Start", "Middle", "End", "Finish"] }, "third == 'End'"]],
    ),
    C(
      T(
        "Activate the commented print call and observe its IndexError. Then change the index to select the fourth stop. The repaired program should print Oak, Lake and Hill on separate lines.",
        "Activeer de uitgecommentarieerde print-aanroep en bekijk de IndexError. Verander de index daarna zodat je de vierde stop kiest. Het herstelde programma moet Oak, Lake en Hill op afzonderlijke regels afdrukken.",
        "stops == ['Oak','Bridge','Lake','Hill'] and _stdout.splitlines() == ['Oak','Lake','Hill']",
        "Four elements have indexes 0 through 3. The error disappears when the final access uses 3.",
        "Vier elementen hebben indexes 0 tot en met 3. De fout verdwijnt wanneer de laatste toegang 3 gebruikt.",
        "Repair the last access without changing the route; display the fourth element after the first and third.",
        "Herstel de laatste toegang zonder de route te veranderen; toon het vierde element na het eerste en derde.",
      ),
      [
        [
          { stops: ["Start", "Middle", "End", "Finish"] },
          "_stdout.splitlines() == ['Start','End','Finish']",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The selected positions are 0, 2 and 3. No elements are removed or reordered. Changing the source route changes the messages because each value is read through an index instead of copied into the program as text.",
    "De gekozen posities zijn 0, 2 en 3. Er worden geen elementen verwijderd of verplaatst. Een andere bronroute verandert de berichten omdat elke waarde via een index wordt gelezen in plaats van als vaste tekst in het programma te staan.",
  ),
});

G(g, 8, {
  titleNl: "Vanaf het einde terugtellen",
  intro: loc(
    "The most recent reading is at the end of a growing list. You could count its position each time, but a negative index expresses the intention directly: -1 means last, -2 means one before last. There is no separate negative zero; -0 is just 0.",
    "De recentste meting staat achteraan een groeiende list. Je zou telkens de positie kunnen tellen, maar een negatieve index drukt de bedoeling direct uit: -1 betekent laatste en -2 voorlaatste. Er is geen afzonderlijke negatieve nul; -0 is gewoon 0.",
  ),
  sections: [
    S(
      "Same element, two addresses",
      "Hetzelfde element, twee adressen",
      "Positive and negative indexes can identify the same element. For a four-item list, index 3 and index -1 both select the last item. After an append, index 3 still selects the old fourth item, while -1 selects the new last item.",
      "Positieve en negatieve indexes kunnen hetzelfde element aanwijzen. Bij vier items kiezen index 3 en index -1 allebei het laatste item. Na een append kiest index 3 nog steeds het oude vierde item, terwijl -1 het nieuwe laatste item kiest.",
      "levels = [3, 6, 5, 8]\nprint(levels[3], levels[-1])\nlevels.append(9)\nprint(levels[3], levels[-1])",
      "8 8\n8 9",
    ),
    S(
      "A selected number is a snapshot",
      "Een gekozen getal is een momentopname",
      "Assigning latest = readings[-1] stores the number currently at that position. It is not a live formula that updates automatically. After appending a new reading, calculate a new selected value if you need the current last number. Negative indexes still require an existing element; an empty list has no last item.",
      "Met latest = readings[-1] bewaar je het getal dat op dat moment op die positie staat. Het is geen formule die vanzelf wordt bijgewerkt. Bereken na het toevoegen van een meting opnieuw de gekozen waarde als je het huidige laatste getal nodig hebt. Ook bij negatieve indexes moet het element bestaan; een lege list heeft geen laatste item.",
    ),
  ],
  starter:
    "readings = [18, 20, 19, 22]\nlatest = 0\nprevious = 0\nprint(latest, previous)\n\n# Add the new reading 24, then read the last position again.\n",
  solution:
    "readings = [18, 20, 19, 22]\nlatest = readings[-1]\nprevious = readings[-2]\nprint(latest, previous)\nreadings.append(24)\nnew_latest = readings[-1]\nprint(new_latest)\nprint(latest)\n",
  steps: [
    C(
      T(
        "Read the last and penultimate values into `latest` and `previous` using negative indexes. Run to see 22 and 19 on the first line.",
        "Lees de laatste en voorlaatste waarde met negatieve indexes in `latest` en `previous`. Voer uit zodat je 22 en 19 op de eerste regel ziet.",
        "latest == 22 and previous == 19 and _stdout.splitlines()[:1] == ['22 19']",
        "Use -1 for the last item and -2 for the one before it.",
        "Gebruik -1 voor het laatste item en -2 voor het item ervoor.",
        "Read from the end of readings, rather than hardcoding its current values or length.",
        "Lees vanaf het einde van readings in plaats van de huidige waarden of lengte vast in te vullen.",
      ),
      [
        [{ readings: [4, 7, 9] }, "latest == 9 and previous == 7"],
        [{ readings: [1, 2, 3, 4, 5] }, "latest == 5 and previous == 4"],
      ],
    ),
    C(
      T(
        "Append the new reading 24. Read the final position again into `new_latest` and print it on the next line. Keep the earlier latest assignment before the append.",
        "Voeg de nieuwe meting 24 toe. Lees de laatste positie opnieuw in `new_latest` en druk deze op de volgende regel af. Laat de eerdere toewijzing aan latest vóór de append staan.",
        "readings == [18,20,19,22,24] and new_latest == 24 and _stdout.splitlines()[1:2] == ['24']",
        "Place new_latest = readings[-1] after the append call.",
        "Zet new_latest = readings[-1] na de append-aanroep.",
        "Append one reading, then select the current last element into a new variable.",
        "Voeg één meting toe en kies daarna het huidige laatste element in een nieuwe variabele.",
      ),
      [
        [
          { readings: [4, 7, 9] },
          "readings == [4,7,9,24] and new_latest == 24 and latest == 9",
        ],
      ],
    ),
    T(
      "Print the original `latest` as the final line. It should still be 22. Explain why the new reading changed the list but not that earlier numeric snapshot.",
      "Druk de oorspronkelijke `latest` als laatste regel af. Deze moet nog steeds 22 zijn. Leg uit waarom de nieuwe meting de list veranderde maar niet de eerdere numerieke momentopname.",
      "latest == 22 and _stdout.splitlines() == ['22 19','24','22']",
      "Do not assign to latest again; simply print the value you stored before appending.",
      "Wijs niet opnieuw toe aan latest; druk alleen de waarde af die je vóór de append bewaarde.",
      "Retain the earlier selected number and display it after the new last reading.",
      "Behoud het eerder gekozen getal en toon dit na de nieuwe laatste meting.",
    ),
  ],
  solutionNote: loc(
    "The first two indexes follow the end of the initial list. Appending changes the list, but latest still refers to the integer selected earlier. new_latest is computed afterward and therefore contains 24.",
    "De eerste twee indexes volgen het einde van de beginlist. De append verandert de list, maar latest verwijst nog steeds naar de eerder gekozen integer. new_latest wordt daarna berekend en bevat daarom 24.",
  ),
});

G(g, 9, {
  titleNl: "Een onderdeel vervangen zonder de volgorde te wijzigen",
  intro: loc(
    "Lists are mutable: you can replace an element at an existing position. Put an indexed access on the left of = to choose the slot to update. Replacement keeps the length and every other position unchanged; it does not add an item or shift the later ones.",
    "Lists zijn mutable: je kunt een element op een bestaande positie vervangen. Zet een toegang met index links van = om de plek te kiezen die je wilt bijwerken. Vervangen behoudt de lengte en alle andere posities; het voegt geen item toe en schuift latere items niet op.",
  ),
  sections: [
    S(
      "Select the slot, then assign",
      "Kies de plek en wijs daarna toe",
      "The same brackets used to read a value can identify where to write one. Positive and negative indexes both work. An index beyond the list still raises IndexError; replacement cannot create a new final position.",
      "Met dezelfde haakjes waarmee je een waarde leest kun je aangeven waar je een waarde schrijft. Positieve en negatieve indexes werken allebei. Een index buiten de list geeft nog steeds IndexError; vervangen kan geen nieuwe laatste positie aanmaken.",
      'kit = ["map", "old battery", "water"]\nkit[1] = "charged battery"\nkit[-1] = "full bottle"\nprint(kit)',
      "['map', 'charged battery', 'full bottle']",
    ),
    S(
      "Keep evidence of the change",
      "Bewaar wat er veranderde",
      "Read the item you are about to replace into a separate variable. Because this item is a string, that variable keeps the old text after the list position changes. This is useful for a repair report. It is different from assigning another name to the entire list, which would refer to the same mutable list.",
      "Lees het item dat je gaat vervangen eerst in een afzonderlijke variabele. Omdat dit item een string is, bewaart die variabele de oude tekst nadat de listpositie verandert. Dat is handig voor een reparatierapport. Dit verschilt van een tweede naam aan de hele list toewijzen: die verwijst naar dezelfde veranderbare list.",
    ),
  ],
  starter:
    'gear = ["map", "broken compass", "water", "worn strap"]\nreplaced = "not recorded"\n\n# Replace the second and last items below.\n\nprint("Removed:", replaced)\nprint("Ready:", gear)\n',
  solution:
    'gear = ["map", "broken compass", "water", "worn strap"]\nreplaced = gear[1]\ngear[1] = "compass"\ngear[-1] = "new strap"\nprint("Removed:", replaced)\nprint("Ready:", gear)\n',
  steps: [
    C(
      T(
        "Before changing gear, store its second item in `replaced`. Then replace that slot with compass using a positive index.",
        "Bewaar het tweede item vóór het wijzigen van gear in `replaced`. Vervang die plek daarna door compass met een positieve index.",
        "replaced == 'broken compass' and gear[:3] == ['map','compass','water']",
        "Read gear[1] first; assign to gear[1] on the following line.",
        "Lees eerst gear[1]; wijs op de volgende regel aan gear[1] toe.",
        "Capture the old second item before replacing it, preserving the surrounding items.",
        "Bewaar het oude tweede item voordat je het vervangt en behoud de omliggende items.",
      ),
      [
        [
          { gear: ["case", "damaged compass", "snack", "strap"] },
          "replaced == 'damaged compass' and gear[:3] == ['case','compass','snack']",
        ],
      ],
    ),
    C(
      T(
        "Replace the last item with new strap using a negative index. Keep four items and preserve map and water.",
        "Vervang het laatste item door new strap met een negatieve index. Houd vier items en behoud map en water.",
        "gear == ['map','compass','water','new strap']",
        "Assign to gear[-1]. Appending would leave the worn strap in the list.",
        "Wijs toe aan gear[-1]. Met append zou de versleten riem in de list blijven staan.",
        "Replace the final slot rather than appending an extra strap or changing another item.",
        "Vervang de laatste plek in plaats van een extra riem toe te voegen of een ander item te wijzigen.",
      ),
      [
        [
          { gear: ["case", "damaged compass", "snack", "rope", "strap"] },
          "gear == ['case','compass','snack','rope','new strap']",
        ],
      ],
    ),
    T(
      "Run the repair report. Keep the old item in the Removed message and show the corrected list after Ready. Compare the two outputs.",
      "Voer het reparatierapport uit. Behoud het oude item in het Removed-bericht en toon de herstelde list na Ready. Vergelijk beide outputs.",
      "_stdout.splitlines() == ['Removed: broken compass',\"Ready: ['map', 'compass', 'water', 'new strap']\"]",
      "Leave the supplied print calls after the assignments, and do not overwrite replaced afterward.",
      "Laat de meegeleverde print-aanroepen na de toewijzingen staan en overschrijf replaced daarna niet.",
      "Show the old second item and the final four-item kit in the supplied report format.",
      "Toon het oude tweede item en de uiteindelijke uitrusting met vier items in de meegeleverde rapportopmaak.",
    ),
  ],
  solutionNote: loc(
    "Reading gear[1] before replacing it preserves the old string. The two indexed assignments change only their selected positions. The negative index continues to mean last even if the kit grows.",
    "Door gear[1] vóór het vervangen te lezen bewaar je de oude string. De twee toewijzingen met index veranderen alleen de gekozen posities. De negatieve index blijft laatste betekenen, ook als de uitrusting groeit.",
  ),
});

G(g, 10, {
  titleNl: "De eerste passende waarde verwijderen",
  intro: loc(
    'Use remove when you know a value to delete rather than its position. `queue.remove("canceled")` searches from the beginning and removes the first equal element. Later elements shift left. If the value occurs twice, one call leaves the second occurrence in place.',
    'Gebruik remove wanneer je de te verwijderen waarde kent in plaats van de positie. `queue.remove("canceled")` zoekt vanaf het begin en verwijdert het eerste gelijke element. Latere elementen schuiven naar links. Staat de waarde er twee keer in, dan blijft na één aanroep de tweede staan.',
  ),
  sections: [
    S(
      "A value, not an index",
      "Een waarde, geen index",
      "Passing 1 removes the value 1 if it exists; it does not mean ‘remove position 1’. Like append, remove changes the list and returns None. Keep the method call separate from any assignment to the list name.",
      "Met argument 1 verwijder je de waarde 1 als deze bestaat; het betekent niet ‘verwijder positie 1’. Net als append verandert remove de list en geeft None terug. Houd de method-aanroep gescheiden van een toewijzing aan de listnaam.",
      'orders = ["lamp", "cable", "lamp", "case"]\norders.remove("lamp")\nprint(orders)',
      "['cable', 'lamp', 'case']",
    ),
    S(
      "What if nothing matches?",
      "Wat als niets overeenkomt?",
      "Removing an absent value raises ValueError and stops the current run. The program does not quietly do nothing. You will repair a stale cancellation in the editor. Later lessons will show how to check whether an item is present before attempting removal.",
      "Een ontbrekende waarde verwijderen geeft ValueError en stopt de huidige uitvoering. Het programma doet dus niet stilletjes niets. In de editor herstel je een verouderde annulering. In latere lessen zie je hoe je vóór het verwijderen controleert of een item aanwezig is.",
    ),
  ],
  starter:
    'queue = ["lamp", "canceled", "tripod", "canceled", "case"]\nprint("Before:", queue)\n\n# Remove the first canceled item here.\n\nprint("After one cancellation:", queue)\n# Stale request: activate to inspect the error, then repair it.\n# queue.remove("missing")\n',
  solution:
    'queue = ["lamp", "canceled", "tripod", "canceled", "case"]\nprint("Before:", queue)\nqueue.remove("canceled")\nprint("After one cancellation:", queue)\nqueue.remove("case")\nprint("Ready:", queue)\n',
  steps: [
    C(
      T(
        "Remove one canceled item between the first two print calls. Run and check that the second canceled item remains after tripod.",
        "Verwijder tussen de eerste twee print-aanroepen één canceled-item. Voer uit en controleer dat het tweede canceled-item na tripod blijft staan.",
        `${method("remove")} and _stdout.splitlines()[1:2] == [\"After one cancellation: ['lamp', 'tripod', 'canceled', 'case']\"]`,
        "Use one queue.remove call with the string canceled.",
        "Gebruik één queue.remove-aanroep met de string canceled.",
        "Remove the first matching value only; retain the second occurrence and the remaining order.",
        "Verwijder alleen de eerste passende waarde; behoud het tweede exemplaar en de overige volgorde.",
      ),
      [
        [
          { queue: ["canceled", "lamp", "canceled", "case"] },
          "_stdout.splitlines()[1:2] == [\"After one cancellation: ['lamp', 'canceled', 'case']\"]",
        ],
      ],
    ),
    C(
      T(
        "Activate the stale request and observe its ValueError. The actual canceled item was case: replace missing with case, then run again without an error.",
        "Activeer het verouderde verzoek en bekijk de ValueError. Het werkelijk geannuleerde item was case: vervang missing door case en voer daarna opnieuw zonder fout uit.",
        "queue == ['lamp','tripod','canceled']",
        "The argument must match an existing value exactly; case is present in the current list.",
        "Het argument moet exact bij een bestaande waarde passen; case staat in de huidige list.",
        "Repair the absent-value request by removing case after the first cancellation.",
        "Herstel het verzoek voor een ontbrekende waarde door na de eerste annulering case te verwijderen.",
      ),
      [
        [
          { queue: ["case", "lamp", "canceled", "tripod", "canceled"] },
          "queue == ['lamp','tripod','canceled']",
        ],
      ],
    ),
    T(
      "Add a final print call labeled Ready: to show the three remaining entries. Explain why one canceled entry is still present.",
      "Voeg een laatste print-aanroep met label Ready: toe om de drie resterende items te tonen. Leg uit waarom er nog één canceled-item aanwezig is.",
      "_stdout.splitlines()[-1:] == [\"Ready: ['lamp', 'tripod', 'canceled']\"] and len(_stdout.splitlines()) == 3",
      "Each remove call deletes one first match, not every matching value.",
      "Elke remove-aanroep verwijdert één eerste overeenkomst, niet alle passende waarden.",
      "Print the final list after both removals, including the surviving duplicate.",
      "Druk de uiteindelijke list na beide verwijderingen af, inclusief het overgebleven dubbele item.",
    ),
  ],
  solutionNote: loc(
    "The first remove deletes the earliest canceled entry. The next remove searches for case in the already-shortened list, so it still works if that item's position changes. The remaining canceled entry demonstrates that remove is not a filter for all matches.",
    "De eerste remove verwijdert het vroegste canceled-item. De volgende remove zoekt case in de al verkorte list en werkt dus ook als dat item op een andere positie staat. Het resterende canceled-item laat zien dat remove niet alle overeenkomsten wegfiltert.",
  ),
});

G(g, 11, {
  titleNl: "Van één record naar een tabel",
  intro: loc(
    "A list can contain other lists. The outer list holds records; each inner list groups the fields for one item. This is often called a two-dimensional list. Python does not enforce a rectangular table, so keeping a consistent row layout is your responsibility.",
    "Een list kan andere lists bevatten. De buitenste list bewaart records; elke binnenste list groepeert de velden van één item. Dit wordt vaak een tweedimensionale list genoemd. Python dwingt geen rechthoekige tabel af, dus je bewaakt zelf een consistente rij-indeling.",
  ),
  sections: [
    S(
      "One pair of brackets per level",
      "Eén paar haakjes per niveau",
      "Here each row has a label and a quantity. Commas separate fields inside a row and also separate the rows in the outer list. Formatting rows on separate lines makes the structure easier to inspect.",
      "Hier heeft elke rij een label en een aantal. Komma's scheiden de velden binnen een rij én de rijen in de buitenste list. Door rijen op aparte regels te zetten kun je de structuur makkelijker bekijken.",
      'stock = [\n    ["Tripod", 2],\n    ["Case", 5]\n]\nprint(stock)',
      "[['Tripod', 2], ['Case', 5]]",
    ),
    S(
      "Appending a row",
      "Een rij toevoegen",
      'An inner list is one element of the outer list. Appending ["Cable", 8] therefore adds one complete row. Appending the label and the number separately would mix loose fields with rows and break the record layout.',
      'Een binnenste list is één element van de buitenste list. Door ["Cable", 8] toe te voegen met append voeg je dus één volledige rij toe. Het label en het getal afzonderlijk toevoegen zou losse velden met rijen mengen en de recordindeling breken.',
      'stock = [["Tripod", 2]]\nstock.append(["Cable", 8])\nprint(stock)',
      "[['Tripod', 2], ['Cable', 8]]",
    ),
  ],
  starter:
    '# Every row uses [item label, quantity].\nstock = [["lamp", 3]]\nprint("Main room:", stock)\n\n# Add the cable row above the print call.\n# Create a second room table below.\n',
  solution:
    'stock = [["lamp", 3]]\nstock.append(["cable", 8])\nprint("Main room:", stock)\nspares = [["battery", 4], ["strap", 6]]\nprint("Spares:", spares)\n',
  steps: [
    C(
      T(
        "Append one complete row for cable with quantity 8 to `stock`. Place the append before the Main room display.",
        "Voeg één volledige rij voor cable met aantal 8 aan `stock` toe. Zet de append vóór de Main room-weergave.",
        `stock == [['lamp',3],['cable',8]] and ${method("append")}`,
        'Pass ["cable", 8] as the single argument to stock.append.',
        'Geef ["cable", 8] als één argument aan stock.append.',
        "Add a nested row rather than appending cable and 8 as separate outer elements.",
        "Voeg een geneste rij toe in plaats van cable en 8 als losse buitenste elementen toe te voegen.",
      ),
      [[{ stock: [["tripod", 2]] }, "stock == [['tripod',2],['cable',8]]"]],
    ),
    T(
      "Create a second table named `spares`, with battery quantity 4 and strap quantity 6 in that order. Print it with the label Spares: below the main table.",
      "Maak een tweede tabel `spares`, met battery aantal 4 en strap aantal 6 in die volgorde. Druk deze met label Spares: onder de hoofdtabel af.",
      "spares == [['battery',4],['strap',6]] and _stdout.splitlines() == [\"Main room: [['lamp', 3], ['cable', 8]]\",\"Spares: [['battery', 4], ['strap', 6]]\"]",
      "Wrap two [label, quantity] rows inside one outer pair of brackets.",
      "Zet twee [label, aantal]-rijen binnen één buitenste paar haakjes.",
      "Keep each label paired with its integer quantity and print both complete tables.",
      "Houd elk label bij het bijbehorende gehele aantal en druk beide volledige tabellen af.",
    ),
  ],
  solutionNote: loc(
    "The outer stock list has two elements and each is a row. append adds the second row as one item. spares follows the same layout, so a later reader knows what each position within a row means.",
    "De buitenste stock-list heeft twee elementen, elk een rij. append voegt de tweede rij als één item toe. spares volgt dezelfde indeling, zodat een latere lezer weet wat elke positie binnen een rij betekent.",
  ),
});

G(g, 12, {
  titleNl: "Eerst de rij, dan het veld",
  intro: loc(
    "Read a nested list in two stages: choose the row from the outer list, then choose the field from that row. `stock[1][1]` means the second field of the second row. The first index does not identify a column; it selects an entire inner list.",
    "Lees een geneste list in twee stappen: kies de rij uit de buitenste list en daarna het veld uit die rij. `stock[1][1]` betekent het tweede veld van de tweede rij. De eerste index wijst geen kolom aan; deze kiest een hele binnenste list.",
  ),
  sections: [
    S(
      "Unpack the expression mentally",
      "Haal de expressie in gedachten uit elkaar",
      "Reading table[0] gives a row. Applying [1] to that row gives its quantity. The compact double-index form does the same work in one expression.",
      "table[0] lezen geeft een rij. Door daarop [1] toe te passen krijg je het aantal. De compacte vorm met twee indexes doet hetzelfde werk in één expressie.",
      'table = [["map", 7], ["torch", 4]]\nrow = table[0]\nprint(row)\nprint(row[1])\nprint(table[0][1])',
      "['map', 7]\n7\n7",
    ),
    S(
      "Negative indexes at either level",
      "Negatieve indexes op beide niveaus",
      "`stock[-1][-1]` chooses the last field of the last row. Each index applies to a different list, so count the outer rows and inner fields separately. Reading a scalar quantity lets you use it in arithmetic without changing the table.",
      "`stock[-1][-1]` kiest het laatste veld van de laatste rij. Elke index geldt voor een andere list, dus tel de buitenste rijen en binnenste velden afzonderlijk. Een losse hoeveelheid lezen maakt rekenen mogelijk zonder de tabel te veranderen.",
    ),
  ],
  starter:
    'stock = [["lamp", 3], ["cable", 8], ["battery", 4]]\ncable_count = 0\nlast_count = 0\nprint("Cables:", cable_count)\nprint("Last row quantity:", last_count)\n\n# Calculate the combined quantity from the two selected values.\n',
  solution:
    'stock = [["lamp", 3], ["cable", 8], ["battery", 4]]\ncable_count = stock[1][1]\nlast_count = stock[-1][-1]\nprint("Cables:", cable_count)\nprint("Last row quantity:", last_count)\nselected_total = cable_count + last_count\nprint("Selected total:", selected_total)\n',
  steps: [
    C(
      T(
        "Read the cable quantity into `cable_count` using two positive indexes. Run and check the Cables line.",
        "Lees het aantal cable in `cable_count` met twee positieve indexes. Voer uit en controleer de Cables-regel.",
        "cable_count == 8 and _stdout.splitlines()[:1] == ['Cables: 8']",
        "Cable is in the second row, and quantity is the second field: both indexes are 1.",
        "Cable staat in de tweede rij en aantal is het tweede veld: beide indexes zijn 1.",
        "Read a number from the table, not the whole cable row or its label.",
        "Lees een getal uit de tabel, niet de hele cable-rij of het label.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 2],
              ["cable", 11],
              ["battery", 6],
            ],
          },
          "cable_count == 11",
        ],
      ],
    ),
    C(
      T(
        "Read the last field of the last row into `last_count`, using negative indexes at both levels. Run and confirm it prints 4.",
        "Lees het laatste veld van de laatste rij in `last_count`, met op beide niveaus negatieve indexes. Voer uit en controleer dat er 4 verschijnt.",
        "last_count == 4 and _stdout.splitlines()[1:2] == ['Last row quantity: 4']",
        "Use -1 to select the final row, then -1 again to select its final field.",
        "Gebruik -1 voor de laatste rij en daarna nogmaals -1 voor het laatste veld daarin.",
        "Select the end at both levels so this still works when another row is added.",
        "Kies op beide niveaus het einde zodat dit ook werkt wanneer er een rij bijkomt.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 2],
              ["cable", 11],
              ["battery", 6],
              ["strap", 9],
            ],
          },
          "last_count == 9",
        ],
      ],
    ),
    C(
      T(
        "Calculate `selected_total` by adding the two selected quantities and print Selected total: 12 on a final line. Keep stock unchanged.",
        "Bereken `selected_total` door de twee gekozen aantallen op te tellen en druk op een laatste regel Selected total: 12 af. Laat stock ongewijzigd.",
        "selected_total == 12 and stock == [['lamp',3],['cable',8],['battery',4]] and _stdout.splitlines() == ['Cables: 8','Last row quantity: 4','Selected total: 12']",
        "Add cable_count and last_count; both should be integers, not lists.",
        "Tel cable_count en last_count op; beide moeten integers zijn, geen lists.",
        "Compute the total from the selected fields and preserve every original row.",
        "Bereken het totaal uit de gekozen velden en behoud elke oorspronkelijke rij.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 2],
              ["cable", 11],
              ["battery", 6],
            ],
          },
          "selected_total == 17 and stock == [['lamp',2],['cable',11],['battery',6]]",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The first index finds a row and the second finds its quantity. The selected values are integers, so + adds them rather than concatenating rows. All operations read the table; none assign to its cells.",
    "De eerste index vindt een rij en de tweede het aantal daarin. De gekozen waarden zijn integers, dus + telt ze op in plaats van rijen samen te voegen. Alle bewerkingen lezen de tabel; geen ervan wijst aan een cel toe.",
  ),
});

G(g, 13, {
  titleNl: "Eén cel bijwerken en de rest behouden",
  intro: loc(
    "To edit a nested value, put both indexes on the left of an assignment. The outer index selects a row and the inner one selects a field. Replacing only the selected cell preserves the other information in that row and every other record.",
    "Zet voor het bewerken van een geneste waarde beide indexes links van een toewijzing. De buitenste index kiest een rij en de binnenste een veld. Door alleen de gekozen cel te vervangen behoud je de overige informatie in die rij en alle andere records.",
  ),
  sections: [
    S(
      "A cell is smaller than a row",
      "Een cel is kleiner dan een rij",
      "`stock[0] = ...` would replace a whole row. `stock[0][1] = ...` replaces only its quantity. You can also read the current number on the right of = before storing the updated number back in the same cell.",
      "`stock[0] = ...` zou een hele rij vervangen. `stock[0][1] = ...` vervangt alleen het aantal. Je kunt rechts van = ook het huidige getal lezen voordat je het bijgewerkte getal in dezelfde cel terugzet.",
      'stock = [["torch", 4], ["map", 7]]\nstock[0][1] = stock[0][1] + 2\nprint(stock)',
      "[['torch', 6], ['map', 7]]",
    ),
    S(
      "Two names can see one row",
      "Twee namen kunnen dezelfde rij zien",
      "Assigning a whole row to another name does not copy it. Both names refer to the same inner list. A change through either name is visible through the other. This differs from the numeric snapshots earlier in the chapter.",
      "Een hele rij aan een andere naam toewijzen kopieert deze niet. Beide namen verwijzen naar dezelfde binnenste list. Een verandering via de ene naam is via de andere zichtbaar. Dit verschilt van de numerieke momentopnamen eerder in het hoofdstuk.",
      'stock = [["torch", 4]]\nrow = stock[0]\nstock[0][1] = 6\nprint(row)',
      "['torch', 6]",
    ),
  ],
  starter:
    'stock = [["lamp", 3], ["cable", 8], ["battery", 4]]\nlamp_row = stock[0]\n\n# Two lamps arrive. Update their quantity.\n# The last item should be labeled rechargeable battery.\n\nprint("Lamp row:", lamp_row)\nprint("Stock:", stock)\n',
  solution:
    'stock = [["lamp", 3], ["cable", 8], ["battery", 4]]\nlamp_row = stock[0]\nstock[0][1] = stock[0][1] + 2\nstock[-1][0] = "rechargeable battery"\nprint("Lamp row:", lamp_row)\nprint("Stock:", stock)\n',
  steps: [
    C(
      T(
        "Two lamps arrive. Increase the quantity in the first row by 2 using the existing value. Update the cell, rather than replacing the row, and run to inspect lamp_row.",
        "Er komen twee lampen binnen. Verhoog het aantal in de eerste rij met 2 vanuit de bestaande waarde. Werk de cel bij in plaats van de rij te vervangen en voer uit om lamp_row te bekijken.",
        "stock[0] == ['lamp',5] and lamp_row is stock[0] and lamp_row[1] == 5",
        "Read stock[0][1], add 2, then assign to stock[0][1]. += works too.",
        "Lees stock[0][1], tel 2 op en wijs toe aan stock[0][1]. += werkt ook.",
        "Add to the current quantity while retaining the original inner list that lamp_row refers to.",
        "Tel bij het huidige aantal op en behoud de oorspronkelijke binnenste list waarnaar lamp_row verwijst.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 10],
              ["cable", 3],
              ["battery", 9],
            ],
          },
          "stock[0][1] == 12 and lamp_row is stock[0]",
        ],
      ],
    ),
    C(
      T(
        "Rename the last item's label to rechargeable battery. Use a negative index to select the last row and preserve its quantity.",
        "Verander het label van het laatste item in rechargeable battery. Kies de laatste rij met een negatieve index en behoud het aantal.",
        "stock[-1] == ['rechargeable battery',4] and stock[1] == ['cable',8]",
        "The last row is stock[-1]; its label is field 0.",
        "De laatste rij is stock[-1]; het label is veld 0.",
        "Change only the last row's label, leaving quantities and other records intact.",
        "Verander alleen het label van de laatste rij en behoud aantallen en andere records.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 10],
              ["cable", 3],
              ["battery", 9],
              ["battery", 6],
            ],
          },
          "stock[-1] == ['rechargeable battery',6] and stock[2] == ['battery',9]",
        ],
      ],
    ),
    T(
      "Run the two supplied displays. Explain why Lamp row now contains quantity 5 even though lamp_row was assigned before the update.",
      "Voer de twee meegeleverde weergaven uit. Leg uit waarom Lamp row nu aantal 5 bevat terwijl lamp_row vóór de wijziging werd toegewezen.",
      "_stdout.splitlines() == [\"Lamp row: ['lamp', 5]\",\"Stock: [['lamp', 5], ['cable', 8], ['rechargeable battery', 4]]\"]",
      "lamp_row refers to the same inner list as stock[0]; it is not a frozen copy.",
      "lamp_row verwijst naar dezelfde binnenste list als stock[0]; het is geen vastgezette kopie.",
      "Print the retained row reference and the complete final table after the edits.",
      "Druk de behouden rijverwijzing en de volledige uiteindelijke tabel na de wijzigingen af.",
    ),
  ],
  solutionNote: loc(
    "The quantity calculation uses the current value, so another starting stock still works. Updating one cell preserves the row's identity; lamp_row therefore sees the new quantity. The last-row label changes independently of that row's position.",
    "De berekening gebruikt de huidige waarde en werkt daardoor ook bij een andere beginvoorraad. Eén cel bijwerken behoudt de identiteit van de rij; lamp_row ziet daarom het nieuwe aantal. Het label van de laatste rij verandert onafhankelijk van de positie van die rij.",
  ),
});

G(g, 14, {
  titleNl: "Houd de materiaalruimte bij",
  intro: loc(
    "Put the list tools together in one equipment-room update. You will complete a table, add a delivery, record a quantity change, remove a canceled record and combine two locations. Each step leaves useful work for the next one; run often and compare the report with the requested changes.",
    "Combineer de list-bewerkingen in één update voor een materiaalruimte. Je maakt een tabel af, voegt een levering toe, past een aantal aan, verwijdert een geannuleerd record en combineert twee locaties. Elke stap levert werk op voor de volgende; voer vaak uit en vergelijk het rapport met de gevraagde wijzigingen.",
  ),
  sections: [
    S(
      "Choose the operation from the change",
      "Kies de bewerking bij de wijziging",
      "Creating a row needs a list literal. Adding one row to the current table suggests append. Updating a field needs two indexes. Removing a known row can use remove with the entire row value. Combining two tables with + creates a new outer list. Keep the order of operations clear: later code sees the result of earlier edits.",
      "Een rij maken vraagt om een list. Eén rij aan de huidige tabel toevoegen past bij append. Een veld bijwerken vraagt om twee indexes. Een bekende rij verwijderen kan met remove en de volledige rijwaarde. Twee tabellen met + combineren maakt een nieuwe buitenste list. Houd de volgorde van bewerkingen duidelijk: latere code ziet het resultaat van eerdere wijzigingen.",
    ),
    S(
      "Combining does not deep-copy rows",
      "Samenvoegen kopieert rijen niet afzonderlijk",
      "A new outer list can still contain the same inner rows. Changing an existing row through the combined table also changes it in the original table. Appending a new row to the combined outer list does not append it to the original outer list. This review only reads the combined result after creating it.",
      "Een nieuwe buitenste list kan dezelfde binnenste rijen bevatten. Een bestaande rij via de gecombineerde tabel veranderen wijzigt deze ook in de oorspronkelijke tabel. Een nieuwe rij aan de gecombineerde buitenste list toevoegen voegt deze niet aan de oorspronkelijke buitenste list toe. In deze terugblik lees je het gecombineerde resultaat alleen na het maken.",
      'room = [["map", 3]]\ncombined = room + [["torch", 2]]\ncombined[0][1] = 4\ncombined.append(["case", 1])\nprint(room)\nprint(combined)',
      "[['map', 4]]\n[['map', 4], ['torch', 2], ['case', 1]]",
    ),
  ],
  starter:
    '# Rows are [label, quantity, ready].\nstock = [\n    ["lamp", 3, True],\n    # Add cable with quantity 8, not ready.\n]\nremote_stock = [["tripod", 2, True]]\n\nprint("Received:", stock)\n\n# Apply the deliveries and corrections here.\n\nprint("Main room:", stock)\nprint("Remote room:", remote_stock)\n# Build the combined report after all edits.\n',
  solution:
    'stock = [["lamp", 3, True], ["cable", 8, False]]\nremote_stock = [["tripod", 2, True]]\nprint("Received:", stock)\nstock.append(["battery", 4, True])\nprint("Delivery:", stock)\nstock[0][1] = stock[0][1] + 3\nstock[1][2] = True\nstock.remove(["battery", 4, True])\nprint("Main room:", stock)\nprint("Remote room:", remote_stock)\ncombined = stock + remote_stock\nlast_label = combined[-1][0]\nprint("Combined:", combined)\nprint("Last item:", last_label)\n',
  steps: [
    T(
      "Complete the starting `stock` table with a second row: cable, quantity 8, ready False. Keep lamp first and retain the supplied remote_stock table. Print the initial stock with the supplied Received: line before making later changes.",
      "Maak de begintabel `stock` af met een tweede rij: cable, aantal 8, ready False. Houd lamp vooraan en behoud de meegeleverde remote_stock-tabel. Druk de beginvoorraad met de meegeleverde Received:-regel af voordat je latere wijzigingen maakt.",
      "_stdout.splitlines()[:1] == [\"Received: [['lamp', 3, True], ['cable', 8, False]]\"] and len(stock) >= 2 and stock[0][0] == 'lamp' and stock[1][0:2] == ['cable',8] and type(stock[1][2]) is bool and remote_stock == [['tripod',2,True]]",
      "Each row has three fields. False is a Boolean, so leave it unquoted.",
      "Elke rij heeft drie velden. False is een Boolean en staat dus niet tussen aanhalingstekens.",
      "Keep complete three-field lamp and cable rows in order, with numeric quantities and a Boolean ready field.",
      "Behoud volledige lamp- en cable-rijen met drie velden in volgorde, met numerieke aantallen en een Boolean ready-veld.",
    ),
    T(
      "A delivery arrives: append one row for battery, quantity 4, ready True. Immediately after the append, print Delivery: followed by stock. Keep that display so the report records the arrival even after a later cancellation.",
      "Er komt een levering: voeg één rij voor battery, aantal 4, ready True toe met append. Druk direct na de append Delivery: gevolgd door stock af. Behoud die weergave zodat het rapport de aankomst ook na een latere annulering vastlegt.",
      `${method("append")} and _stdout.splitlines()[1:2] == ["Delivery: [['lamp', 3, True], ['cable', 8, False], ['battery', 4, True]]"]`,
      "Pass the complete three-field row as one argument to stock.append.",
      "Geef de volledige rij met drie velden als één argument aan stock.append.",
      "Append the battery record as one nested row. Keep that operation in the program for the later cancellation step.",
      "Voeg het battery-record als één geneste rij toe. Behoud die bewerking in het programma voor de latere annulering.",
    ),
    C(
      T(
        "Three more lamps arrive. Increase the first row's quantity by 3. The resulting lamp quantity should be 6; keep its label and ready flag.",
        "Er komen nog drie lampen binnen. Verhoog het aantal in de eerste rij met 3. Het nieuwe aantal moet 6 zijn; behoud het label en de ready-vlag.",
        "stock[0] == ['lamp',6,True]",
        "Use stock[0][1] on both sides of an addition assignment, or += 3.",
        "Gebruik stock[0][1] aan beide kanten van een toewijzing met optelling of gebruik += 3.",
        "Increase only the lamp quantity; preserve its label and Boolean ready value.",
        "Verhoog alleen het lamp-aantal; behoud het label en de Boolean ready-waarde.",
      ),
      [
        [
          {
            stock: [
              ["lamp", 10, true],
              ["cable", 8, false],
            ],
          },
          "stock[0] == ['lamp',13,True]",
        ],
      ],
    ),
    T(
      "The cables have now been checked. Set their ready field to True without changing their label or quantity.",
      "De kabels zijn nu gecontroleerd. Zet hun ready-veld op True zonder label of aantal te veranderen.",
      "stock[1] == ['cable',8,True] and type(stock[1][2]) is bool",
      "Select row 1 and field 2, then assign the Boolean True.",
      "Kies rij 1 en veld 2 en wijs daarna de Boolean True toe.",
      "Update the third field of the cable row to a real Boolean.",
      "Werk het derde veld van de cable-rij bij naar een echte Boolean.",
    ),
    T(
      "The battery delivery is canceled. Remove that entire row by its value. Keep the earlier append line: the program should record the arrival and then the cancellation.",
      "De batterijlevering wordt geannuleerd. Verwijder die hele rij op basis van de waarde. Behoud de eerdere append-regel: het programma moet eerst de aankomst en daarna de annulering verwerken.",
      `stock == [['lamp',6,True],['cable',8,True]] and ${method("remove")}`,
      'The outer list contains rows, so pass ["battery", 4, True] to stock.remove.',
      'De buitenste list bevat rijen, dus geef ["battery", 4, True] aan stock.remove.',
      "Remove the complete battery row while keeping the corrected lamp and cable records.",
      "Verwijder de volledige battery-rij en behoud de gecorrigeerde lamp- en cable-records.",
    ),
    C(
      T(
        "After all edits, create `combined` from stock + remote_stock. Read the last row's label into `last_label`, then print Combined: followed by the table and Last item: followed by the label.",
        "Maak na alle wijzigingen `combined` uit stock + remote_stock. Lees het label van de laatste rij in `last_label` en druk daarna Combined: met de tabel en Last item: met het label af.",
        "combined == [['lamp',6,True],['cable',8,True],['tripod',2,True]] and combined is not stock and last_label == 'tripod' and len(_stdout.splitlines()) == 6 and _stdout.splitlines()[-4:] == [\"Main room: [['lamp', 6, True], ['cable', 8, True]]\",\"Remote room: [['tripod', 2, True]]\",\"Combined: [['lamp', 6, True], ['cable', 8, True], ['tripod', 2, True]]\",'Last item: tripod']",
        "Combine the two outer lists, then use combined[-1][0] to select the last label.",
        "Combineer de twee buitenste lists en gebruik daarna combined[-1][0] voor het laatste label.",
        "Build the final report from the corrected tables, preserving the two original room lists.",
        "Bouw het laatste rapport uit de gecorrigeerde tabellen en behoud de twee oorspronkelijke locatie-lists.",
      ),
      [
        [
          {
            remote_stock: [
              ["case", 7, true],
              ["rope", 9, false],
            ],
          },
          "combined == stock + remote_stock and combined is not stock and last_label == 'rope' and remote_stock == [['case',7,True],['rope',9,False]]",
        ],
      ],
    ),
  ],
  solutionNote: loc(
    "The update processes events in order: create the missing row, append a delivery, update two cells, then remove the canceled row. The final concatenation makes a new outer list while retaining the rows. Reading the last label demonstrates both negative and nested indexing in the finished report.",
    "De update verwerkt gebeurtenissen op volgorde: maak de ontbrekende rij, voeg een levering toe, werk twee cellen bij en verwijder de geannuleerde rij. De uiteindelijke samenvoeging maakt een nieuwe buitenste list maar behoudt de rijen. Het laatste label lezen combineert negatieve en geneste indexes in het voltooide rapport.",
  ),
});
