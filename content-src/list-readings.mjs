import { loc, section as S } from "./helpers.mjs";

export const tupleReading = {
  intro: loc(
    "A station report contains a name, a platform number and a departure time. These values belong together, and their positions have a fixed meaning. A tuple is a useful way to represent such a record: you can read its items, but cannot replace, add or remove an item in that tuple.\n\nThis is an exploration. Run the supplied station report, predict each experiment below, then extend the program. You can mark the reading complete when you have tried the changes.",
    "Een stationsbericht bevat een naam, een perronnummer en een vertrektijd. Deze waarden horen bij elkaar en hun posities hebben een vaste betekenis. Een tuple is een handige manier om zo'n record vast te leggen: je kunt de onderdelen lezen, maar geen onderdeel in die tuple vervangen, toevoegen of verwijderen.\n\nDit is een verkenning. Voer het meegeleverde stationsbericht uit, voorspel de onderstaande experimenten en breid het programma uit. Je kunt de tekst als voltooid markeren zodra je de wijzigingen hebt geprobeerd.",
  ),
  starter: `# A fixed record: station, platform, departure.
departure = ("Harbor", 3, "09:40")
delays = (4, 0, 4, 7, 2)
print("Departure:", departure)
print("Station:", departure[0])

# 1. Print the remaining fields, then unpack the record.

# 2. Summarise the delay measurements.

# 3. Make a revised departure without changing the old tuple.
`,
  solution: `departure = ("Harbor", 3, "09:40")
delays = (4, 0, 4, 7, 2)
print("Departure:", departure)
print("Station:", departure[0])
print("Platform and time:", departure[1:])
station, platform, time = departure
print("Board:", station, platform, time)
print("Measurements:", len(delays))
print("Shortest and longest:", min(delays), max(delays))
print("Four-minute delays:", delays.count(4))
print("First four-minute delay:", delays.index(4))
revised_departure = (station, platform + 1, time)
print("Original:", departure)
print("Revised:", revised_departure)
single_stop = (station,)
print("One stop:", single_stop)
`,
  solutionNote: loc(
    "The slice keeps the platform and time together as a tuple. Unpacking then gives all three fields meaningful names. The summary functions read delays without changing it; index reports the first position, while count reports the total occurrences. Building revised_departure creates a separate record, so departure still refers to the original. The comma in single_stop makes a one-item tuple rather than a parenthesised string.",
    "De slice houdt perron en tijd bij elkaar in een tuple. Unpacking geeft vervolgens alle drie de velden een betekenisvolle naam. De samenvattende functies lezen delays zonder deze te veranderen; index geeft de eerste positie en count het totale aantal voorkomens. revised_departure is een nieuw record, waardoor departure nog naar het origineel verwijst. De komma in single_stop maakt een tuple met één onderdeel in plaats van een string tussen haakjes.",
  ),
  sections: [
    S(
      "Read a record by position",
      "Lees een record per positie",
      "Tuple indexes start at zero, just like list indexes. Negative indexes count back from the end. Slicing produces another tuple and excludes the stop position. A tuple may contain different types: each field can represent a different kind of information.\n\nBefore running the editor, identify the type of each field in departure. Then add a print of `departure[1:]`. Which two fields should appear?",
      "Tuple-indexen beginnen bij nul, net als list-indexen. Negatieve indexen tellen terug vanaf het einde. Een slice levert een andere tuple op en sluit de eindpositie uit. Een tuple mag verschillende typen bevatten: elk veld kan een ander soort informatie voorstellen.\n\nBepaal vóór het uitvoeren het type van elk veld in departure. Voeg daarna een print van `departure[1:]` toe. Welke twee velden verwacht je?",
      'reading = ("Roof", 18.5, "C")\nprint(reading[0])\nprint(reading[-1])\nprint(reading[1:])',
      "Roof\nC\n(18.5, 'C')",
    ),
    S(
      "The comma matters",
      "De komma is belangrijk",
      "Parentheses make a tuple easy to read, but the comma distinguishes a one-item tuple from an ordinary value in parentheses. `()` is an empty tuple. `len()` counts top-level items.\n\nCreate single_stop from the station name in the editor, with a trailing comma, and print it. Temporarily remove that comma and compare the output of `type(single_stop)`.",
      "Haakjes maken een tuple duidelijk leesbaar, maar de komma onderscheidt een tuple met één onderdeel van een gewone waarde tussen haakjes. `()` is een lege tuple. `len()` telt de onderdelen op het hoogste niveau.\n\nMaak in de editor single_stop van de stationsnaam, met een afsluitende komma, en druk deze af. Haal die komma tijdelijk weg en vergelijk de output van `type(single_stop)`.",
      'label = ("Desk")\none_label = ("Desk",)\nprint(type(label))\nprint(type(one_label))\nprint(len(one_label), len(()))',
      "<class 'str'>\n<class 'tuple'>\n1 0",
    ),
    S(
      "Name the fields; build a new record",
      "Geef velden namen; maak een nieuw record",
      "Unpacking assigns consecutive values to consecutive names. The number of names must match the number of values. It lets you write platform rather than repeatedly remembering which index stores the platform.\n\nYou cannot assign to `departure[1]`. That raises TypeError because tuples do not support item assignment. You can build a new tuple from the existing fields instead. This does not change the old record.\n\nAdd `station, platform, time = departure` and print those three names. Then create revised_departure with a platform one higher. Print both records and check that the original remains intact.",
      "Unpacking wijst opeenvolgende waarden toe aan opeenvolgende namen. Het aantal namen moet overeenkomen met het aantal waarden. Zo schrijf je platform zonder steeds te hoeven onthouden op welke index het perron staat.\n\nJe kunt niet aan `departure[1]` toewijzen. Dat veroorzaakt TypeError omdat tuples geen itemtoewijzing ondersteunen. Je kunt wel een nieuwe tuple maken uit de bestaande velden. Het oude record verandert hierdoor niet.\n\nVoeg `station, platform, time = departure` toe en druk die drie namen af. Maak daarna revised_departure met een perronnummer dat één hoger is. Druk beide records af en controleer dat het origineel intact blijft.",
      "point = (6, 2)\nx, y = point\nmoved = (x + 1, y)\nprint(point)\nprint(moved)",
      "(6, 2)\n(7, 2)",
    ),
    S(
      "Ask questions about the measurements",
      "Stel vragen over de metingen",
      "`min()` and `max()` find the smallest and largest values. The values must be comparable: integers and floats can be compared, but a number and a string generally cannot. Strings compare by their character ordering, not by length.\n\n`tuple.count(value)` counts matches; `tuple.index(value)` locates the first match. A missing value has count zero, but searching for its index raises ValueError.\n\nExtend the delay report: print the number of measurements, the shortest and longest delay, how often 4 occurs, and its first position. Predict which of those results would change if you appended another 4 when writing the delays tuple.",
      "`min()` en `max()` zoeken de kleinste en grootste waarde. De waarden moeten vergelijkbaar zijn: integers en floats kun je vergelijken, maar een getal en een string meestal niet. Strings worden op hun tekenvolgorde vergeleken, niet op hun lengte.\n\n`tuple.count(value)` telt overeenkomsten; `tuple.index(value)` zoekt de eerste overeenkomst. Een ontbrekende waarde heeft aantal nul, maar zoeken naar de index ervan veroorzaakt ValueError.\n\nBreid het vertragingsrapport uit: druk het aantal metingen af, de kortste en langste vertraging, hoe vaak 4 voorkomt en de eerste positie ervan. Voorspel welke resultaten veranderen als je bij het uitschrijven van de tuple delays nog een 4 achteraan toevoegt.",
      "durations = (2, 5.5, 2, 8)\nprint(len(durations), min(durations), max(durations))\nprint(durations.count(2), durations.index(2))\nprint(durations.count(99))",
      "4 2 8\n2 0\n0",
    ),
    S(
      "Explore the boundary",
      "Verken de grens",
      "Try `departure[1] = 8` at the end of your program. Read the TypeError, then remove that line and run again. Next try `delays.index(99)` and compare its ValueError with `delays.count(99)`. Errors here are experiments, not damage to your saved work.\n\nOne subtle point: a tuple fixes which objects occupy its positions. If an item is itself a list, that inner list can still change. The following example changes the list without replacing the tuple's item. You do not need a nested mutable value for the station report, but this explains why immutable does not mean every object inside is frozen.",
      "Probeer `departure[1] = 8` onderaan je programma. Lees de TypeError, verwijder die regel en voer opnieuw uit. Probeer daarna `delays.index(99)` en vergelijk de ValueError met `delays.count(99)`. Deze fouten zijn experimenten en beschadigen je opgeslagen werk niet.\n\nEen subtiel punt: een tuple legt vast welke objecten op zijn posities staan. Als een onderdeel zelf een list is, kan die binnenste list nog veranderen. Het volgende voorbeeld verandert de list zonder het onderdeel van de tuple te vervangen. Voor het stationsbericht heb je geen geneste veranderlijke waarde nodig, maar dit verklaart waarom immutable niet betekent dat elk object binnenin bevroren is.",
      'kit = ("Repair", ["tape"])\nkit[1].append("glue")\nprint(kit)',
      "('Repair', ['tape', 'glue'])",
    ),
  ],
};

export const zipReading = {
  intro: loc(
    "A display receives station names and passenger counts as separate lists. The first count belongs to the first station, the second count to the second station, and so on. zip() brings corresponding positions together into tuples.\n\nThe editor contains a working display with a missing measurement. Run it, find which station disappeared, and extend the report in the experiments below. You do not need loops for this exploration.",
    "Een scherm krijgt stationsnamen en reizigersaantallen als aparte lists. Het eerste aantal hoort bij het eerste station, het tweede bij het tweede station, enzovoort. zip() brengt overeenkomstige posities samen in tuples.\n\nDe editor bevat een werkend scherm met een ontbrekende meting. Voer het uit, zoek welk station verdween en breid het rapport uit met de onderstaande experimenten. Je hebt voor deze verkenning geen loops nodig.",
  ),
  starter: `stations = ["Harbor", "Market", "Park"]
passengers = [18, 7]
platforms = [2, 4, 1]

pairs = list(zip(stations, passengers))
print("Display:", pairs)
print("Stations:", len(stations), "Rows:", len(pairs))

# 1. Find and supply the missing passenger measurement.

# 2. Rebuild the display with station, passengers and platform.

# 3. Save one zip iterator and consume it twice. Predict the results.
`,
  solution: `stations = ["Harbor", "Market", "Park"]
passengers = [18, 7]
platforms = [2, 4, 1]
pairs = list(zip(stations, passengers))
print("Display:", pairs)
print("Stations:", len(stations), "Rows:", len(pairs))
passengers.append(12)
pairs = list(zip(stations, passengers))
print("Complete display:", pairs)
rows = list(zip(stations, passengers, platforms))
print("With platforms:", rows)
print("Last station:", rows[-1][0])
pending = zip(stations, passengers)
saved = list(pending)
print("First read:", saved)
print("Second read:", list(pending))
print("Saved again:", saved)
`,
  solutionNote: loc(
    "The first display ends before Park because there is no third passenger count. Appending 12 and calling zip again gives three pairs. Supplying platforms as a third input creates three-field tuples, so rows[-1][0] reads the station from the last row. pending is consumed by its first conversion to a list. saved keeps those results for reuse; reading the exhausted iterator produces an empty list.",
    "Het eerste scherm stopt vóór Park omdat er geen derde reizigersaantal is. Na het toevoegen van 12 en opnieuw aanroepen van zip ontstaan drie paren. platforms als derde invoer levert tuples met drie velden op; rows[-1][0] leest dus het station uit de laatste rij. pending wordt verbruikt bij de eerste omzetting naar een list. saved bewaart de resultaten voor hergebruik; de uitgeputte iterator opnieuw lezen levert een lege list op.",
  ),
  sections: [
    S(
      "Pair positions, not matching values",
      "Koppel posities, geen gelijke waarden",
      "zip takes one item from each input at a time. The order of its arguments becomes the order of fields inside each tuple. It does not search for related names or sort the inputs. Your lists must already use the same ordering.\n\n`list(zip(...))` collects the resulting tuples so you can print, index and reuse them. The outer square brackets belong to the list; the inner parentheses belong to each tuple.",
      "zip neemt telkens één onderdeel uit elke invoer. De volgorde van de argumenten wordt de volgorde van de velden in elke tuple. Het zoekt geen bijbehorende namen en sorteert de invoer niet. Je lists moeten dus al dezelfde volgorde gebruiken.\n\n`list(zip(...))` verzamelt de tuples zodat je ze kunt afdrukken, indexeren en hergebruiken. De buitenste vierkante haakjes horen bij de list; de binnenste ronde haakjes bij elke tuple.",
      'labels = ["A", "B", "C"]\ncharges = [90, 40, 75]\nprint(list(zip(labels, charges)))\nprint(list(zip(charges, labels)))',
      "[('A', 90), ('B', 40), ('C', 75)]\n[(90, 'A'), (40, 'B'), (75, 'C')]",
    ),
    S(
      "The shortest input sets the limit",
      "De kortste invoer bepaalt de grens",
      "By default, zip stops when any input runs out. It does not fill missing values or raise an error for different lengths. With three stations and two measurements, only two complete pairs exist.\n\nRun the starter and compare the station count with the row count. Add the missing passenger measurement, 12, with append. Rebuild pairs with a new call to zip and print the complete display. Changing passengers does not retroactively rebuild an already collected pairs list.\n\nTry an empty passenger list as a separate experiment. Predict the result before running, then restore the measurements.",
      "Standaard stopt zip zodra één invoer op is. Het vult ontbrekende waarden niet aan en geeft bij verschillende lengtes geen fout. Met drie stations en twee metingen bestaan maar twee volledige paren.\n\nVoer de startcode uit en vergelijk het aantal stations met het aantal rijen. Voeg de ontbrekende reizigersmeting, 12, toe met append. Bouw pairs opnieuw op met een nieuwe aanroep van zip en druk het volledige scherm af. passengers veranderen bouwt een al verzamelde list pairs niet achteraf opnieuw op.\n\nProbeer als apart experiment een lege reizigerslist. Voorspel het resultaat vóór het uitvoeren en herstel daarna de metingen.",
      'labels = ["A", "B", "C"]\nprint(list(zip(labels, [90, 40])))\nprint(list(zip(labels, [])))',
      "[('A', 90), ('B', 40)]\n[]",
    ),
    S(
      "Add another field",
      "Voeg een veld toe",
      "zip can combine more than two inputs. Each result then has one field per input, still matched by position and still limited by the shortest input.\n\nAfter repairing the missing measurement, create rows from stations, passengers and platforms, in that order. Print rows, then print `rows[-1][0]`. Explain why the first index chooses a row and the second chooses a field. Finally swap the last two zip arguments and predict which fields will exchange positions.",
      "zip kan meer dan twee invoeren combineren. Elk resultaat krijgt dan één veld per invoer, nog steeds gekoppeld per positie en beperkt door de kortste invoer.\n\nMaak na het aanvullen van de ontbrekende meting rows van stations, passengers en platforms, in die volgorde. Druk rows af en daarna `rows[-1][0]`. Leg uit waarom de eerste index een rij kiest en de tweede een veld. Verwissel tot slot de laatste twee argumenten van zip en voorspel welke velden van plaats veranderen.",
      'names = ["Lens", "Tripod"]\ncounts = [3, 2]\nshelves = ["R1", "R4"]\nrows = list(zip(names, counts, shelves))\nprint(rows)\nprint(rows[-1][0])',
      "[('Lens', 3, 'R1'), ('Tripod', 2, 'R4')]\nTripod",
    ),
    S(
      "An iterator is consumed; a saved list is reusable",
      "Een iterator raakt op; een bewaarde list kun je hergebruiken",
      "zip returns an iterator: an object that supplies items as they are requested. Printing the zip object itself shows an object description rather than its pairs. list consumes its remaining items. After they are consumed, converting that same iterator again produces an empty list. The original input lists are unchanged.\n\nIn the editor, create pending with zip(stations, passengers). Save `list(pending)` as saved and print it. Now print `list(pending)` again, then print saved. Explain why only the second read is empty. To generate fresh pairs, call zip again; to reuse collected results, keep the list.",
      "zip geeft een iterator terug: een object dat onderdelen levert wanneer je erom vraagt. Het zip-object zelf afdrukken toont een objectbeschrijving in plaats van de paren. list verbruikt de resterende onderdelen. Zijn ze verbruikt, dan levert dezelfde iterator opnieuw omzetten een lege list op. De oorspronkelijke invoerlists blijven ongewijzigd.\n\nMaak in de editor pending met zip(stations, passengers). Bewaar `list(pending)` als saved en druk deze af. Druk daarna nogmaals `list(pending)` af en vervolgens saved. Leg uit waarom alleen de tweede lezing leeg is. Roep zip opnieuw aan voor nieuwe paren; bewaar de list om verzamelde resultaten te hergebruiken.",
      'pending = zip(["red", "blue"], [2, 5])\nsaved = list(pending)\nprint(saved)\nprint(list(pending))\nprint(saved)',
      "[('red', 2), ('blue', 5)]\n[]\n[('red', 2), ('blue', 5)]",
    ),
  ],
};
