import {
  lesson as L,
  reading as R,
  quiz as Q,
  predict as P,
  loc,
} from "./helpers.mjs";
const g = "introduction-to-strings";
L(
  g,
  1,
  "Text is data you can inspect and transform. A string contains an ordered sequence of Unicode characters. Its quotation marks tell Python where the literal begins and ends.",
  "Tekst is data die je kunt onderzoeken en bewerken. Een string bevat een geordende reeks Unicode-tekens. De aanhalingstekens geven aan waar de literal begint en eindigt.",
  "Store NL-204 in location_code and print it.",
  "Sla NL-204 op in location_code en druk deze af.",
  'location_code = "NL-204"\nprint(location_code)\n',
  "location_code == 'NL-204' and _stdout.strip() == location_code",
  { titleNl: "Tekst als data" },
);
L(
  g,
  2,
  "Strings support indexing because they are sequences. They are not lists: an indexed character is another string, and you cannot replace a character in place. Indexes still start at zero.",
  "Strings ondersteunen indexes omdat het sequences zijn. Het zijn geen lists: een opgehaald teken is weer een string en je kunt een teken niet op zijn plek vervangen. Indexes beginnen ook hier bij nul.",
  "Get the first and fourth characters of code into first and fourth.",
  "Haal het eerste en vierde teken van code op in first en fourth.",
  'code = "NL-204"\nfirst = code[0]\nfourth = code[3]\nprint(first, fourth)\n',
  "first == 'N' and fourth == '2'",
  { starter: 'code = "NL-204"\n', titleNl: "String-indexes" },
);
L(
  g,
  3,
  "String slicing selects characters from start up to an excluded stop index. It produces a new string. The original value stays unchanged.",
  "Een string-slice kiest tekens vanaf start tot de uitgesloten stopindex. Het resultaat is een nieuwe string. De oorspronkelijke waarde blijft ongewijzigd.",
  "Extract LAB from sensor-LAB-42 into section using a slice.",
  "Haal LAB met een slice uit sensor-LAB-42 en sla het op in section.",
  'label = "sensor-LAB-42"\nsection = label[7:10]\nprint(section)\n',
  "section == 'LAB'",
  {
    starter: 'label = "sensor-LAB-42"\n',
    example: 'word = "garden"\nprint(word[1:4])',
    titleNl: "Strings slicen",
  },
);
L(
  g,
  4,
  "Concatenation joins strings in order and creates a new value. To combine a number with text, convert it using str() or use formatting rather than adding unlike types.",
  "Concatenation voegt strings in volgorde samen tot een nieuwe waarde. Zet een getal eerst om met str(), of gebruik formatting, voordat je het met tekst combineert.",
  "Build display as Gate 7 from prefix = Gate and number = 7.",
  "Maak display als Gate 7 met prefix = Gate en number = 7.",
  'prefix = "Gate"\nnumber = 7\ndisplay = prefix + " " + str(number)\nprint(display)\n',
  "display == 'Gate 7'",
  {
    starter: 'prefix = "Gate"\nnumber = 7\n',
    titleNl: "String-fragmenten samenvoegen",
  },
);
L(
  g,
  5,
  "len(text) counts the characters in a string. Use the result to compute indexes or boundaries. The last valid positive index is len(text) - 1.",
  "len(text) telt de tekens in een string. Gebruik de uitkomst voor indexes of slice-grenzen. De laatste geldige positieve index is len(text) - 1.",
  "Store the length of word in size and its first half in half. Use integer division for the midpoint.",
  "Sla de lengte van word op in size en de eerste helft in half. Gebruik integer division voor het midden.",
  'word = "notebook"\nsize = len(word)\nhalf = word[:size // 2]\nprint(size, half)\n',
  "size == 8 and half == 'note'",
  { starter: 'word = "notebook"\n', titleNl: "Lengte en slice-grenzen" },
);
L(
  g,
  6,
  "Negative indexes work on strings as they do on lists. text[-1] is the final character and text[-3:] gives the final three characters.",
  "Negatieve indexes werken bij strings net als bij lists. text[-1] is het laatste teken en text[-3:] geeft de laatste drie tekens.",
  "Get the final character into last and the final three characters into suffix.",
  "Sla het laatste teken op in last en de laatste drie tekens in suffix.",
  'code = "route-ABC"\nlast = code[-1]\nsuffix = code[-3:]\nprint(last, suffix)\n',
  "last == 'C' and suffix == 'ABC'",
  { starter: 'code = "route-ABC"\n', titleNl: "Negatieve string-indexes" },
);
L(
  g,
  7,
  "Strings are immutable. Assigning to text[0] raises TypeError because an existing string cannot be edited in place. Build a new string and assign it to a variable instead.",
  "Strings zijn immutable. Een assignment naar text[0] geeft TypeError, omdat je een bestaande string niet op haar plek kunt wijzigen. Bouw een nieuwe string en wijs die toe aan een variable.",
  "Repair the code by building corrected as Boat from word = goat. Keep word unchanged.",
  "Herstel de code door corrected als Boat te maken uit word = goat. Laat word ongewijzigd.",
  'word = "goat"\ncorrected = "B" + word[1:]\nprint(corrected)\n',
  "word == 'goat' and corrected == 'Boat'",
  { starter: 'word = "goat"\nword[0] = "B"\n', titleNl: "String-immutability" },
);
L(
  g,
  8,
  "A backslash introduces an escape sequence. \\n represents a newline, \\t a tab, and an escaped quote can appear inside a quoted string. The escape is interpreted when the literal is created.",
  "Een backslash begint een escape sequence. \\n is een nieuwe regel, \\t een tab en een escaped aanhalingsteken kan binnen een string staan. Python verwerkt de escape bij het maken van de literal.",
  'Create message with first line He said "Go" and second line Now. Print it.',
  'Maak message met als eerste regel He said "Go" en als tweede regel Now. Druk de string af.',
  `message = 'He said "Go"\\nNow'\nprint(message)\n`,
  "message == 'He said \"Go\"\\nNow' and _stdout.strip() == message",
  { example: 'text = "Line one\\nLine two"', titleNl: "Escape sequences" },
);
L(
  g,
  9,
  "A for loop over a string receives one character at a time. You can inspect each character or build a result using an accumulator outside the loop.",
  "Een for loop over een string krijgt telkens één teken. Je kunt elk teken onderzoeken of een resultaat opbouwen met een accumulator buiten de loop.",
  "Loop over code and print each character on its own line.",
  "Loop over code en druk elk teken op een eigen regel af.",
  'code = "A7B"\nfor character in code:\n    print(character)\n',
  "_stdout.splitlines() == ['A','7','B']",
  { starter: 'code = "A7B"\n', titleNl: "Tekens doorlopen" },
);
L(
  g,
  10,
  "Conditions inside a character loop can count or select matches. Initialize the count before the loop; increment it only when the condition is true.",
  "Voorwaarden binnen een loop over tekens kunnen overeenkomsten tellen of selecteren. Initialiseer de teller vóór de loop en verhoog deze alleen als de voorwaarde waar is.",
  "Count lowercase a characters in banana and save the result in count.",
  "Tel de kleine a-tekens in banana en sla het resultaat op in count.",
  'word = "banana"\ncount = 0\nfor character in word:\n    if character == "a":\n        count += 1\nprint(count)\n',
  "count == 3",
  { starter: 'word = "banana"\ncount = 0\n', titleNl: "Voorwaarden per teken" },
);
L(
  g,
  11,
  "in checks whether a substring occurs anywhere within a string. It is case-sensitive. not in negates the membership test and is often clearer than manually searching.",
  "in controleert of een substring ergens in een string voorkomt. Hoofdletters en kleine letters verschillen. not in keert de test om en is vaak duidelijker dan zelf zoeken.",
  "For message = Gate open, set has_gate for Gate in message and lacks_closed for closed not in message.",
  "Gebruik message = Gate open. Bepaal has_gate met Gate in message en lacks_closed met closed not in message.",
  'message = "Gate open"\nhas_gate = "Gate" in message\nlacks_closed = "closed" not in message\nprint(has_gate, lacks_closed)\n',
  "has_gate is True and lacks_closed is True",
  { titleNl: "Membership tests" },
);
L(
  g,
  12,
  "Use slices, length, and concatenation to construct identifiers without changing the source text. Be explicit about boundaries so shorter or longer values remain understandable.",
  "Gebruik slices, lengte en samenvoeging om identifiers te maken zonder de brontekst te veranderen. Kies duidelijke grenzen, zodat het gedrag ook bij kortere of langere waarden begrijpelijk blijft.",
  "With name = Forest and number = 27, create identifier from the first three characters, a hyphen, and the number. Store its length in size.",
  "Gebruik name = Forest en number = 27. Maak identifier van de eerste drie tekens, een streepje en het getal. Sla de lengte op in size.",
  'name = "Forest"\nnumber = 27\nidentifier = name[:3] + "-" + str(number)\nsize = len(identifier)\nprint(identifier, size)\n',
  "identifier == 'For-27' and size == 6",
  { titleNl: "Terugblik: strings" },
);
const m = "string-methods";
R(
  m,
  1,
  "String methods create new strings or return information; they do not edit the original string. Save the returned value when you want to use a transformation later.",
  "String-methods maken nieuwe strings of geven informatie terug. Ze wijzigen de oorspronkelijke string niet. Bewaar de return value als je de bewerking later wilt gebruiken.",
  'label = "Harbor"\nprint(label.upper())\nprint(label)\n',
  { titleNl: "String-methods ontdekken" },
);
L(
  m,
  2,
  "lower(), upper(), and title() return case-converted strings. Normalizing case is useful before a case-insensitive comparison. The original string remains unchanged.",
  "lower(), upper() en title() geven strings met aangepaste hoofdletters terug. Normaliseer tekst vóór een vergelijking die niet hoofdlettergevoelig moet zijn. De oorspronkelijke string blijft ongewijzigd.",
  "From label = nORTH gATE, create lower_label, upper_label, and title_label using the corresponding methods.",
  "Maak uit label = nORTH gATE de variables lower_label, upper_label en title_label met de bijbehorende methods.",
  'label = "nORTH gATE"\nlower_label = label.lower()\nupper_label = label.upper()\ntitle_label = label.title()\nprint(lower_label, upper_label, title_label)\n',
  "lower_label == 'north gate' and upper_label == 'NORTH GATE' and title_label == 'North Gate'",
  { titleNl: "Hoofdletters aanpassen" },
);
L(
  m,
  3,
  "split() without an argument separates on whitespace and handles repeated spaces. It returns a list of substrings, which you can process using familiar list operations.",
  "split() zonder argument scheidt op whitespace en verwerkt herhaalde spaties. De uitkomst is een list van substrings, waarop je bekende list-bewerkingen kunt toepassen.",
  "Split sentence into words.",
  "Splits sentence op in words.",
  'sentence = "pack   the map"\nwords = sentence.split()\nprint(words)\n',
  "words == ['pack','the','map']",
  {
    starter: 'sentence = "pack   the map"\n',
    titleNl: "Splitsen op whitespace",
  },
);
L(
  m,
  4,
  "Give split a separator to divide a string at that exact text. Unlike whitespace splitting, consecutive explicit separators may produce empty strings.",
  "Geef split een separator mee om op precies die tekst te splitsen. Anders dan bij whitespace kunnen opeenvolgende expliciete separators lege strings opleveren.",
  "Split tags on the | separator into parts.",
  "Splits tags op de separator | en sla het resultaat op in parts.",
  'tags = "blue|orange|white"\nparts = tags.split("|")\nprint(parts)\n',
  "parts == ['blue','orange','white']",
  {
    starter: 'tags = "blue|orange|white"\n',
    titleNl: "Splitsen op een separator",
  },
);
L(
  m,
  5,
  "Newlines and tabs can act as separators too. Split a table into rows first, then split one row into its cells. Escaped characters are real characters in the string value.",
  "Nieuwe regels en tabs kunnen ook separators zijn. Splits een tabel eerst in rijen en daarna een rij in cellen. Escaped tekens zijn echte tekens in de stringwaarde.",
  "Split table on newlines into rows. Split the first row on tabs into first_cells.",
  "Splits table op nieuwe regels in rows. Splits de eerste rij op tabs in first_cells.",
  'table = "A\\t2\\nB\\t5"\nrows = table.split("\\n")\nfirst_cells = rows[0].split("\\t")\nprint(first_cells)\n',
  "rows == ['A\\t2','B\\t5'] and first_cells == ['A','2']",
  { starter: 'table = "A\\t2\\nB\\t5"\n', titleNl: "Regels en tabs splitsen" },
);
L(
  m,
  6,
  "separator.join(strings) puts the separator between neighboring strings. The method is called on the separator, not on the list. All elements must be strings.",
  "separator.join(strings) zet de separator tussen opeenvolgende strings. Je roept de method aan op de separator, niet op de list. Alle elementen moeten strings zijn.",
  "Join words with spaces into sentence.",
  "Voeg words met spaties samen tot sentence.",
  'words = ["Take", "the", "trail"]\nsentence = " ".join(words)\nprint(sentence)\n',
  "sentence == 'Take the trail'",
  {
    starter: 'words = ["Take", "the", "trail"]\n',
    titleNl: "Samenvoegen met spaties",
  },
);
L(
  m,
  7,
  "The join separator can contain any text, including several characters. No separator is added before the first or after the final element.",
  "De join-separator kan elke tekst bevatten, ook meerdere tekens. Er verschijnt geen separator vóór het eerste of na het laatste element.",
  "Join segments with / to produce path_label.",
  "Voeg segments samen met / tot path_label.",
  'segments = ["home", "notes", "today"]\npath_label = "/".join(segments)\nprint(path_label)\n',
  "path_label == 'home/notes/today'",
  {
    starter: 'segments = ["home", "notes", "today"]\n',
    titleNl: "Een separator kiezen",
  },
);
L(
  m,
  8,
  "strip() removes leading and trailing whitespace. With an argument, it removes any of the listed characters from both ends, not a whole substring. It leaves characters in the middle untouched.",
  "strip() verwijdert whitespace aan het begin en einde. Met een argument verwijdert de method elk opgegeven teken aan beide kanten, niet een volledige substring. Tekens in het midden blijven staan.",
  "Strip whitespace from raw into clean. Strip # characters from marked into unmarked.",
  "Verwijder whitespace uit de randen van raw naar clean. Verwijder # aan de randen van marked naar unmarked.",
  'raw = "  gate A  "\nmarked = "##ready##"\nclean = raw.strip()\nunmarked = marked.strip("#")\nprint(clean, unmarked)\n',
  "clean == 'gate A' and unmarked == 'ready'",
  { titleNl: "Randen opschonen" },
);
L(
  m,
  9,
  "replace(old, new) returns a string with matching substrings replaced. By default it replaces all occurrences. The optional third argument limits the number of replacements.",
  "replace(old, new) geeft een string terug waarin passende substrings vervangen zijn. Standaard worden alle voorkomens vervangen. Het optionele derde argument beperkt het aantal vervangingen.",
  "Replace every ? in template with ready and save status.",
  "Vervang elke ? in template door ready en sla het resultaat op in status.",
  'template = "A: ?; B: ?"\nstatus = template.replace("?", "ready")\nprint(status)\n',
  "status == 'A: ready; B: ready'",
  { starter: 'template = "A: ?; B: ?"\n', titleNl: "Substrings vervangen" },
);
L(
  m,
  10,
  "find(substring) returns the first matching index, or -1 when the substring is absent. Do not treat -1 as a found position; it is a special not-found result.",
  "find(substring) geeft de eerste passende index terug, of -1 als de substring ontbreekt. Gebruik -1 niet als gevonden positie; het is een speciaal resultaat voor niet gevonden.",
  "Find the colon in text as position and the absent ? as missing.",
  "Zoek de dubbele punt in text als position en de ontbrekende ? als missing.",
  'text = "code:42"\nposition = text.find(":")\nmissing = text.find("?")\nprint(position, missing)\n',
  "position == 4 and missing == -1",
  { titleNl: "Een substring zoeken" },
);
L(
  m,
  11,
  "format() inserts values into brace placeholders. Positional placeholders receive arguments in order. Formatting can convert numbers to text without a separate str() call.",
  "format() vult waarden in op plaatsen tussen accolades. Positional placeholders krijgen arguments in volgorde. Formatting kan getallen naar tekst omzetten zonder een losse str()-aanroep.",
  "Use format to make summary equal to 4 sensors online.",
  "Gebruik format om summary de waarde 4 sensors online te geven.",
  'summary = "{} sensors {}".format(4, "online")\nprint(summary)\n',
  "summary == '4 sensors online' and '.format(' in _source",
  {
    example: 'message = "{} items".format(3)',
    titleNl: "Positional formatting",
  },
);
L(
  m,
  12,
  "Named placeholders describe the role of each value. Supply matching keyword arguments to format(). The call order does not need to match the placeholder order.",
  "Named placeholders beschrijven de rol van elke waarde. Geef bij format() passende keyword arguments mee. De volgorde bij de aanroep hoeft niet dezelfde te zijn als die van de placeholders.",
  "Format message as Gate B: 12 seats using named placeholders gate and count.",
  "Maak message als Gate B: 12 seats met named placeholders gate en count.",
  'message = "Gate {gate}: {count} seats".format(count=12, gate="B")\nprint(message)\n',
  "message == 'Gate B: 12 seats' and '.format(' in _source",
  { titleNl: "Named formatting" },
);
const steps = [
  [
    "Strip raw into clean.",
    "Strip raw naar clean.",
    "clean == 'north,4; south,7'",
  ],
  [
    "Uppercase clean into loud.",
    "Zet clean in hoofdletters in loud.",
    "loud == 'NORTH,4; SOUTH,7'",
  ],
  [
    "Split clean at semicolons into rows.",
    "Splits clean op puntkomma’s naar rows.",
    "rows == ['north,4',' south,7']",
  ],
  [
    "Strip the second row into second.",
    "Strip de tweede rij naar second.",
    "second == 'south,7'",
  ],
  [
    "Split second at its comma into cells.",
    "Splits second op de komma naar cells.",
    "cells == ['south','7']",
  ],
  [
    "Title-case cells[0] into name.",
    "Gebruik title op cells[0] naar name.",
    "name == 'South'",
  ],
  [
    "Convert cells[1] to integer count.",
    "Zet cells[1] om naar integer count.",
    "count == 7 and type(count) is int",
  ],
  [
    "Join cells with : into compact.",
    "Voeg cells samen met : naar compact.",
    "compact == 'south:7'",
  ],
  [
    "Replace south with east in compact into changed.",
    "Vervang south door east in compact naar changed.",
    "changed == 'east:7'",
  ],
  [
    "Format summary as South has 7 units, then print it.",
    "Maak summary als South has 7 units met formatting en druk dit af.",
    "summary == 'South has 7 units' and _stdout.strip() == summary",
  ],
].map(([en, nl, check]) => ({ task: loc(en, nl), check }));
L(
  m,
  13,
  "A text-processing pipeline turns raw input into structured output one step at a time. Save meaningful intermediate results and inspect them if later output is wrong. These ten small steps combine the string methods from this chapter.",
  "Een reeks tekstbewerkingen zet ruwe invoer stap voor stap om naar gestructureerde output. Bewaar duidelijke tussenresultaten en controleer die als de latere output niet klopt. Deze tien kleine stappen combineren de string-methods uit dit hoofdstuk.",
  "",
  "",
  'raw = "  north,4; south,7  "\nclean = raw.strip()\nloud = clean.upper()\nrows = clean.split(";")\nsecond = rows[1].strip()\ncells = second.split(",")\nname = cells[0].title()\ncount = int(cells[1])\ncompact = ":".join(cells)\nchanged = compact.replace("south", "east")\nsummary = "{} has {} units".format(name, count)\nprint(summary)\n',
  "True",
  {
    starter: 'raw = "  north,4; south,7  "\n',
    steps,
    titleNl: "Terugblik: tekst opschonen",
  },
);
Q(g, [
  P(
    'print("harbor"[1])',
    ["a", "h", "r"],
    "Index 1 is the second character.",
    "Index 1 is het tweede teken.",
  ),
  P(
    'print("notebook"[0:4])',
    ["note", "noteb", "book"],
    "The slice includes indexes 0 through 3.",
    "De slice omvat indexes 0 tot en met 3.",
  ),
  P(
    'print("abc"[-1])',
    ["c", "a", "b"],
    "-1 selects the final character.",
    "-1 kiest het laatste teken.",
  ),
  [
    'What happens when you assign text[0] = "X" to an existing string?',
    'Wat gebeurt er bij text[0] = "X" op een bestaande string?',
    "",
    [
      ["TypeError"],
      ["The string changes", "De string verandert"],
      ["A new list appears", "Er ontstaat een nieuwe list"],
    ],
    "Strings are immutable; construct a replacement string instead.",
    "Strings zijn immutable; maak een vervangende string.",
  ],
  P(
    'print("at" in "station")',
    ["True", "False"],
    "The consecutive substring at occurs in station.",
    "De opeenvolgende substring at komt voor in station.",
  ),
  P(
    'print(len("A B"))',
    ["3", "2", "4"],
    "The space is a character and counts toward the length.",
    "De spatie is een teken en telt mee voor de lengte.",
  ),
]);
Q(m, [
  P(
    'print("North".lower())',
    ["north", "NORTH", "North"],
    "lower returns a lowercase copy.",
    "lower geeft een kopie in kleine letters terug.",
  ),
  P(
    'print("a|b|c".split("|"))',
    ["['a', 'b', 'c']", "a b c", "['a|b|c']"],
    "split creates a list by removing the separators between parts.",
    "split maakt een list door de separators tussen onderdelen te verwijderen.",
  ),
  P(
    'print("-".join(["A", "B"]))',
    ["A-B", "-AB-", "AB-"],
    "join inserts the separator only between neighboring elements.",
    "join zet de separator alleen tussen opeenvolgende elementen.",
  ),
  P(
    'print("..ok..".strip("."))',
    ["ok", "..ok", "ok.."],
    "strip removes the specified characters from both ends.",
    "strip verwijdert de opgegeven tekens aan beide kanten.",
  ),
  P(
    'print("gate".find("x"))',
    ["-1", "0", "None"],
    "find returns -1 when the substring is absent.",
    "find geeft -1 terug als de substring ontbreekt.",
  ),
  P(
    'print("a-a".replace("a", "b"))',
    ["b-b", "b-a", "a-b"],
    "replace changes all matching substrings unless a count limits it.",
    "replace vervangt alle passende substrings, tenzij een count dit beperkt.",
  ),
  P(
    'print("{name}: {n}".format(n=5, name="East"))',
    ["East: 5", "5: East", "{name}: {n}"],
    "Named placeholders use the matching keyword arguments.",
    "Named placeholders gebruiken de bijbehorende keyword arguments.",
  ),
]);
