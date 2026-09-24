import { functionPractice as P } from "./function-practice.mjs";
const f = (slug, s) => P(18, slug, s);
export const activities = [
  f("sequence", {
    title: ["Read characters by position", "Lees tekens op positie"],
    topics: "string-indexing string-length string-negative-index",
    requires: "strings indexing length",
    why: [
      "Strings are ordered sequences of characters. Some familiar list operations work on them too.",
      "Strings zijn geordende tekenreeksen. Sommige bekende lijstbewerkingen werken er ook op.",
    ],
    teach: [
      "text[0] selects the first character and text[-1] the last. len(text) counts characters in the string, including spaces and escapes after interpretation. A selected character is itself a string. An empty string has no index 0. Strings share sequence operations with lists; they are not lists.",
      "text[0] kiest het eerste teken en text[-1] het laatste. len(text) telt tekens in de string, inclusief spaties en geïnterpreteerde escapes. Een gekozen teken is zelf een string. Een lege string heeft geen index 0. Strings delen reeksbewerkingen met lijsten; ze zijn geen lijsten.",
    ],
    rule: [
      "Indexing reads one character; guard an empty string.",
      "Indexeren leest één teken; bewaak een lege string.",
    ],
    example: 'text = "Code!"\nprint(text[0],text[-1],len(text))',
    output: "C ! 5\n",
    predict: [
      "What is the index of the exclamation mark?",
      "Wat is de index van het uitroepteken?",
    ],
    name: "edges",
    params: "text",
    body: 'if len(text) == 0:\n    return ""\nreturn text[0] + text[-1]',
    task: [
      "Return first and last characters concatenated, or an empty string for empty text.",
      "Geef het eerste en laatste teken samengevoegd terug, of een lege string bij lege tekst.",
    ],
    help: [
      "Check the length before reading either endpoint.",
      "Controleer de lengte vóór je een uiteinde leest.",
    ],
    fragment: "text[-1]",
    cases: [
      [["Python"], '_return == "Pn"'],
      [["a"], '_return == "aa"'],
      [[""], '_return == ""'],
    ],
    change: [
      "Test a string containing one space.",
      "Test een string met één spatie.",
    ],
    explain: [
      "The guard handles absence; a one-character string has the same first and last character.",
      "De bewaking verwerkt afwezigheid; bij één teken zijn eerste en laatste hetzelfde teken.",
    ],
  }),
  f("slice", {
    title: ["Extract a piece of text", "Haal een deel uit tekst"],
    topics: "string-slicing",
    requires: "string-indexing slicing",
    why: [
      "A slice selects a substring while preserving the original.",
      "Een deelbereik kiest een substring en bewaart het origineel.",
    ],
    teach: [
      "text[start:stop] uses the same excluded-stop rule as list slicing. Omitted and negative bounds also work. A slice returns a string rather than a list. Use this when positions are known; later split will handle separators instead of positions.",
      "text[start:stop] gebruikt dezelfde uitgesloten-stopregel als een lijstdeel. Ontbrekende en negatieve grenzen werken ook. Een deelbereik geeft een string terug in plaats van een lijst. Gebruik dit wanneer posities bekend zijn; split verwerkt straks scheidingstekens in plaats van posities.",
    ],
    rule: [
      "Slices select positions; the stop is excluded.",
      "Deelbereiken kiezen posities; de stop doet niet mee.",
    ],
    example:
      'code = "AB-204"\nprint(code[:2])\nprint(code[3:])\nprint(code[-3:])',
    output: "AB\n204\n204\n",
    predict: [
      "Which part does code[2:3] contain?",
      "Welk deel bevat code[2:3]?",
    ],
    name: "middle",
    params: "text",
    body: "return text[1:-1]",
    task: [
      "Return text without its first and last characters. Strings of length 0, 1 or 2 return an empty string.",
      "Geef text zonder eerste en laatste teken terug. Strings met lengte 0, 1 of 2 geven een lege string.",
    ],
    help: [
      "Use a start of one and an excluded stop at the last character.",
      "Gebruik begin één en een uitgesloten stop bij het laatste teken.",
    ],
    fragment: "text[1:-1]",
    cases: [
      [["[hello]"], '_return == "hello"'],
      [["a"], '_return == ""'],
      [[""], '_return == ""'],
    ],
    change: [
      "Compare slicing beyond the end with indexing beyond the end.",
      "Vergelijk een deelbereik voorbij het einde met indexeren voorbij het einde.",
    ],
    explain: [
      "Slice bounds safely produce an empty result when no interior characters exist.",
      "Deelgrenzen leveren veilig een leeg resultaat als er geen binnenste tekens zijn.",
    ],
  }),
  f("immutable", {
    title: ["Build a changed string", "Maak een veranderde string"],
    topics: "immutability",
    requires: "string-slicing concatenation",
    why: [
      "A string cannot be edited one character at a time by indexed assignment. Build a new string instead.",
      "Een string kun je niet met indextoewijzing teken voor teken veranderen. Maak in plaats daarvan een nieuwe string.",
    ],
    teach: [
      'text[0] = "A" raises TypeError because strings are immutable. Assignment to text itself is allowed: it makes the name refer to a new string. Combine a replacement with a slice to preserve the remaining characters. String methods also return new strings instead of changing the original.',
      'text[0] = "A" veroorzaakt TypeError omdat strings onveranderbaar zijn. Toewijzing aan text zelf mag wel: de naam verwijst dan naar een nieuwe string. Combineer een vervanging met een deelbereik om de overige tekens te bewaren. Stringmethoden geven ook nieuwe strings terug in plaats van het origineel te veranderen.',
    ],
    rule: [
      "Rebind a name to new text instead of mutating characters.",
      "Koppel een naam aan nieuwe tekst in plaats van tekens te veranderen.",
    ],
    example:
      'name = "bo"\nupdated = "B" + name[1:]\nprint(updated)\nprint(name)',
    output: "Bo\nbo\n",
    predict: [
      "Why does name still contain lowercase b?",
      "Waarom bevat name nog steeds een kleine b?",
    ],
    name: "replace_first",
    params: "text, character",
    body: 'if text == "":\n    return ""\nreturn character + text[1:]',
    task: [
      "Return a new string with the first character replaced; return empty text unchanged. Assume character has length one.",
      "Geef een nieuwe string terug met het eerste teken vervangen; laat lege tekst leeg. Neem aan dat character lengte één heeft.",
    ],
    help: [
      "Keep the suffix and concatenate it to the replacement.",
      "Bewaar het achterstuk en voeg het aan de vervanging toe.",
    ],
    fragment: "character + text[1:]",
    cases: [
      [["cat", "b"], '_return == "bat" and _args[0] == "cat"'],
      [["", "X"], '_return == ""'],
    ],
    change: [
      "Try assigning to text[0] in an experiment and read the TypeError.",
      "Probeer in een experiment aan text[0] toe te wijzen en lees de TypeError.",
    ],
    explain: [
      "Concatenation creates a separate string; no character of the source is mutated.",
      "Samenvoegen maakt een aparte string; geen teken van de bron wordt veranderd.",
    ],
  }),
  f("characters", {
    title: [
      "Loop over characters and test membership",
      "Doorloop tekens en test aanwezigheid",
    ],
    topics: "string-iteration string-membership string-conditionals",
    requires: "for membership-lists",
    why: [
      "A character loop can inspect text without managing indexes. Membership can test a character or a whole substring.",
      "Een tekenlus kan tekst onderzoeken zonder indexen te beheren. Aanwezigheid kan een teken of een hele substring testen.",
    ],
    teach: [
      'for character in text visits characters in order. character in "aeiou" checks whether it is one of those letters. "cat" in text instead searches for that consecutive substring. These tests are case-sensitive. Use a loop for per-character counting and direct membership when you only need existence.',
      'for character in text bezoekt tekens op volgorde. character in "aeiou" controleert of het een van die letters is. "cat" in text zoekt juist die opeenvolgende substring. Deze tests zijn hoofdlettergevoelig. Gebruik een lus om per teken te tellen en directe aanwezigheid wanneer je alleen bestaan hoeft te weten.',
    ],
    rule: [
      "Iteration gives characters; membership tests a sequence or a substring.",
      "Iteratie geeft tekens; aanwezigheid test een reeks of substring.",
    ],
    example:
      'count = 0\nfor character in "banana":\n    if character == "a":\n        count += 1\nprint(count)\nprint("ana" in "banana")',
    output: "3\nTrue\n",
    predict: [
      "Does the substring test count how many matches exist?",
      "Telt de substringtest hoeveel overeenkomsten bestaan?",
    ],
    name: "vowels",
    params: "text",
    body: 'count = 0\nfor character in text.lower():\n    if character in "aeiou":\n        count += 1\nreturn count',
    task: [
      "Count a, e, i, o and u ignoring case. All other characters contribute zero.",
      "Tel a, e, i, o en u ongeacht hoofdletters. Alle andere tekens dragen nul bij.",
    ],
    help: [
      "Normalise case before testing each character against the vowel string.",
      "Normaliseer hoofdletters voordat je elk teken tegen de klinkerstring test.",
    ],
    fragment: 'if character in "aeiou":',
    cases: [
      [["AEIOU!"], "_return == 5"],
      [["sky"], "_return == 0"],
      [[""], "_return == 0"],
      [["banana"], "_return == 3"],
    ],
    change: [
      "Explain why y is not counted under this particular brief.",
      "Leg uit waarom y volgens deze specifieke opdracht niet meetelt.",
    ],
    explain: [
      "The function applies the stated character set consistently rather than guessing a language rule.",
      "De functie past de beschreven tekenverzameling consequent toe in plaats van een taalregel te gokken.",
    ],
  }),
  f("case", {
    title: [
      "Return differently cased text",
      "Geef tekst met andere hoofdletters terug",
    ],
    topics: "case-conversion",
    practices: "case-methods normalisation",
    requires: "immutability",
    why: [
      "Case methods help compare or display text consistently. Their returned value must be used.",
      "Hoofdlettermethoden helpen tekst consistent vergelijken of tonen. Hun terugkeerwaarde moet worden gebruikt.",
    ],
    teach: [
      "lower() returns lowercase text; upper() returns uppercase text; title() capitalises word starts using Python’s rule. None edits the original string. title() is a formatting tool, not a guarantee of correct spelling for every person’s name. Store or return the new value.",
      "lower() geeft kleine letters; upper() geeft hoofdletters; title() maakt woordbeginnen hoofdletters volgens Pythons regel. Geen ervan bewerkt de oorspronkelijke string. title() is een opmaakhulp, geen garantie op correcte spelling van elke persoonsnaam. Bewaar of geef de nieuwe waarde terug.",
    ],
    rule: [
      "String methods return changed text that you must keep.",
      "Stringmethoden geven veranderde tekst terug die je moet bewaren.",
    ],
    example:
      'name = "ada lovelace"\nprint(name.title())\nprint(name.upper())\nprint(name)',
    output: "Ada Lovelace\nADA LOVELACE\nada lovelace\n",
    predict: [
      "Which variable was reassigned?",
      "Welke variabele werd opnieuw toegewezen?",
    ],
    name: "shout",
    params: "text",
    body: "return text.upper()",
    starter: "def shout(text):\n    text.upper()\n    return text\n",
    task: [
      "Repair shout so it returns uppercase text.",
      "Herstel shout zodat die tekst in hoofdletters teruggeeft.",
    ],
    help: [
      "Use the value returned by upper instead of discarding it.",
      "Gebruik de waarde die upper teruggeeft in plaats van die weg te gooien.",
    ],
    fragment: "return text.upper()",
    cases: [
      [["Hello"], '_return == "HELLO"'],
      [["123!"], '_return == "123!"'],
      [[""], '_return == ""'],
    ],
    change: [
      "Compare lower, upper and title on text with punctuation.",
      "Vergelijk lower, upper en title op tekst met leestekens.",
    ],
    explain: [
      "Returning the method result fixes the discarded-value bug.",
      "Het methoderesultaat teruggeven herstelt de fout van de weggegooide waarde.",
    ],
    guidance: "adapt",
  }),
  f("split-whitespace", {
    title: ["Split ordinary whitespace", "Splits gewone witruimte"],
    topics: "split-whitespace",
    requires: "lists string-iteration",
    why: [
      "Text often arrives as a line containing several words separated by uneven spaces.",
      "Tekst komt vaak als een regel met meerdere woorden gescheiden door ongelijke spaties.",
    ],
    teach: [
      "text.split() with no separator groups consecutive whitespace and discards whitespace at either end. Spaces, tabs and newlines can all separate words. It returns a list of strings. Empty or whitespace-only text returns an empty list. The original text stays unchanged.",
      "text.split() zonder scheidingsteken groepeert opeenvolgende witruimte en negeert witruimte aan beide uiteinden. Spaties, tabs en nieuwe regels kunnen allemaal woorden scheiden. Het geeft een lijst strings terug. Lege tekst of alleen witruimte geeft een lege lijst. De oorspronkelijke tekst blijft ongewijzigd.",
    ],
    rule: [
      "split() without arguments treats runs of whitespace as separators.",
      "split() zonder argumenten behandelt reeksen witruimte als scheiding.",
    ],
    example: 'text = "  one\\t two\\nthree  "\nprint(text.split())',
    output: "['one', 'two', 'three']\n",
    predict: [
      "Why are there no empty strings in the result?",
      "Waarom staan er geen lege strings in het resultaat?",
    ],
    name: "word_count",
    params: "text",
    body: "return len(text.split())",
    task: [
      "Return the number of whitespace-separated words.",
      "Geef het aantal door witruimte gescheiden woorden terug.",
    ],
    help: [
      "Split without a separator and count the resulting elements.",
      "Splits zonder scheidingsteken en tel de resulterende elementen.",
    ],
    fragment: "text.split()",
    cases: [
      [[" a\t b\nc "], "_return == 3"],
      [["  "], "_return == 0"],
      [["one"], "_return == 1"],
    ],
    change: [
      "Compare a tab character with the two literal characters backslash and t.",
      "Vergelijk een tabteken met de twee letterlijke tekens backslash en t.",
    ],
    explain: [
      "The default split handles varied whitespace without creating empty word entries.",
      "Standaard split verwerkt verschillende witruimte zonder lege woorden te maken.",
    ],
  }),
  f("split-delimiter", {
    title: ["Split a known separator", "Splits een bekend scheidingsteken"],
    topics: "split-delimiters split-newlines split-tabs",
    requires: "split-whitespace escapes",
    why: [
      "A delimiter can carry structure, including an intentionally empty field.",
      "Een scheidingsteken kan structuur geven, inclusief een bewust leeg veld.",
    ],
    teach: [
      'split(",") separates only commas and preserves empty fields. split("\\t") separates tabs; split("\\n") separates newline characters and keeps a trailing empty field if the text ends with a newline. splitlines() understands line boundaries and normally omits that final empty field. Do not use comma splitting for CSV with quoting; a proper CSV reader is taught later.',
      'split(",") scheidt alleen komma’s en bewaart lege velden. split("\\t") scheidt tabs; split("\\n") scheidt nieuwe-regeltekens en bewaart een leeg eindveld als tekst op een nieuwe regel eindigt. splitlines() begrijpt regelgrenzen en laat dat laatste lege veld meestal weg. Gebruik geen kommasplitsing voor CSV met aanhalingstekens; later leer je een echte CSV-lezer.',
    ],
    rule: [
      "An explicit delimiter preserves empty fields between separators.",
      "Een expliciet scheidingsteken bewaart lege velden tussen scheidingen.",
    ],
    example:
      'print("a,,b".split(","))\nprint("a\tb".split("\t"))\nprint("a\\nb\\n".splitlines())',
    output: "['a', '', 'b']\n['a', 'b']\n['a', 'b']\n",
    predict: [
      "What information would removing the empty field lose?",
      "Welke informatie verdwijnt als je het lege veld verwijdert?",
    ],
    name: "fields",
    params: "text, separator",
    body: "return text.split(separator)",
    task: [
      "Split text by the supplied nonempty separator and preserve empty fields.",
      "Splits text op het gegeven niet-lege scheidingsteken en behoud lege velden.",
    ],
    help: [
      "Pass the separator to split instead of using the no-argument form.",
      "Geef het scheidingsteken aan split in plaats van de vorm zonder argumenten.",
    ],
    fragment: "text.split(separator)",
    cases: [
      [["a,,b", ","], '_return == ["a","","b"]'],
      [["a\tb", "\t"], '_return == ["a","b"]'],
      [["a\n", "\n"], '_return == ["a",""]'],
    ],
    change: [
      'Compare splitting the same newline-terminated text with splitlines and split("\\n").',
      'Vergelijk dezelfde tekst met een nieuwe regel aan het einde via splitlines en split("\\n").',
    ],
    explain: [
      "The supplied separator makes field boundaries explicit, including empty fields.",
      "Het opgegeven scheidingsteken maakt veldgrenzen expliciet, inclusief lege velden.",
    ],
  }),
  f("join-strip", {
    title: [
      "Join cleaned pieces of text",
      "Voeg opgeschoonde tekstdelen samen",
    ],
    topics: "join strip-characters",
    practices: "strip",
    requires: "split-delimiters list-comprehensions",
    why: [
      "join rebuilds text from a sequence of strings using a chosen separator.",
      "join bouwt tekst opnieuw op vanuit een reeks strings met een gekozen scheidingsteken.",
    ],
    teach: [
      '" - ".join(parts) places the separator between strings, with no extra separator at either end. Every element must already be a string. strip() removes outer whitespace, not inner spaces. strip("!") removes exclamation marks from both ends; its argument is a set of characters, not a complete prefix to remove.',
      '" - ".join(parts) zet het scheidingsteken tussen strings, zonder extra scheiding aan de uiteinden. Elk element moet al een string zijn. strip() verwijdert buitenste witruimte, geen binnenste spaties. strip("!") verwijdert uitroeptekens van beide uiteinden; zijn argument is een tekenverzameling, geen volledig te verwijderen voorvoegsel.',
    ],
    rule: [
      "Call join on the separator and pass the strings to combine.",
      "Roep join aan op het scheidingsteken en geef de te combineren strings mee.",
    ],
    example:
      'parts = ["  Ada "," Bo"]\nclean = [part.strip() for part in parts]\nprint(" / ".join(clean))',
    output: "Ada / Bo\n",
    predict: [
      "What does joining an empty list produce?",
      "Wat levert een lege lijst samenvoegen op?",
    ],
    name: "line",
    params: "parts",
    body: 'clean = [part.strip() for part in parts]\nreturn ", ".join(clean)',
    task: [
      "Trim outer whitespace from each part, then join with comma-space. Preserve empty parts.",
      "Verwijder buitenste witruimte van elk deel en voeg samen met komma-spatie. Behoud lege delen.",
    ],
    help: [
      "Clean each string before joining the resulting list.",
      "Schoon elke string op vóór je de resulterende lijst samenvoegt.",
    ],
    fragment: '", ".join(clean)',
    cases: [
      [[[" A ", " B"]], '_return == "A, B"'],
      [[[]], '_return == ""'],
      [[["", " B "]], '_return == ", B"'],
    ],
    change: [
      "Use a newline as the join separator to create a multiline report.",
      "Gebruik een nieuwe regel als samenvoegscheiding om een rapport met meerdere regels te maken.",
    ],
    explain: [
      "Cleaning and joining are separate operations so internal content is preserved.",
      "Opschonen en samenvoegen zijn aparte bewerkingen zodat interne inhoud bewaard blijft.",
    ],
  }),
  f("replace-find", {
    title: ["Search and replace text", "Zoek en vervang tekst"],
    topics: "replace find",
    requires: "immutability string-membership",
    why: [
      "Searching locates a substring; replacing creates a revised string.",
      "Zoeken vindt een substring; vervangen maakt een herziene string.",
    ],
    teach: [
      "text.find(part) returns the first starting index, or -1 when absent. Index zero is a valid match, so do not use if text.find(part) as a presence test. Use in when you only need True/False. text.replace(old, new) returns a new string replacing all occurrences unless a count is supplied.",
      "text.find(part) geeft de eerste beginindex of -1 bij afwezigheid. Index nul is een geldige overeenkomst, dus gebruik if text.find(part) niet als aanwezigheidscontrole. Gebruik in als je alleen True/False nodig hebt. text.replace(old, new) geeft een nieuwe string die alle voorkomens vervangt tenzij je een aantal meegeeft.",
    ],
    rule: [
      "find returns a position, including valid zero; -1 means absent.",
      "find geeft een positie, inclusief geldige nul; -1 betekent afwezig.",
    ],
    example:
      'text = "red-red"\nprint(text.find("red"))\nprint(text.find("blue"))\nprint(text.replace("red","green"))',
    output: "0\n-1\ngreen-green\n",
    predict: [
      "Why is a match at zero easy to mishandle in a Boolean test?",
      "Waarom wordt een overeenkomst op nul gemakkelijk verkeerd behandeld in een booleaanse test?",
    ],
    name: "rename",
    params: "text, old, new",
    body: "return text.replace(old, new), text.find(old)",
    task: [
      "Return (replaced_text, first_original_match_index). Assume old is nonempty.",
      "Geef (replaced_text, first_original_match_index) terug. Neem aan dat old niet leeg is.",
    ],
    help: [
      "Search the original text, not the already changed result.",
      "Zoek in de oorspronkelijke tekst, niet in het al veranderde resultaat.",
    ],
    fragment: "text.find(old)",
    cases: [
      [["cat cat", "cat", "dog"], '_return == ("dog dog",0)'],
      [["hello", "x", "y"], '_return == ("hello",-1)'],
      [["a-b", "b", "c"], '_return == ("a-c",2)'],
    ],
    change: [
      "Replace only the first occurrence by trying the optional count argument.",
      "Vervang alleen het eerste voorkomen door het optionele aantalargument te proberen.",
    ],
    explain: [
      "Both answers use the original input, so replacing cannot change the reported search index.",
      "Beide antwoorden gebruiken de oorspronkelijke invoer; vervangen verandert de gemelde zoekindex dus niet.",
    ],
  }),
  f("format", {
    title: [
      "Fill a text template with format",
      "Vul een tekstsjabloon met format",
    ],
    topics: "format positional-format named-format",
    requires: "f-strings keyword-arguments",
    why: [
      "You will encounter format in existing Python code and in reusable templates.",
      "Je komt format tegen in bestaande Pythoncode en herbruikbare sjablonen.",
    ],
    teach: [
      '"{}: {}".format(name, score) fills placeholders in argument order. Numbered fields such as {1} choose a position explicitly. Named fields such as {name} use keyword arguments: template.format(name="Bo"). Braces mark replacement fields. f-strings put expressions directly inside braces, while format takes values in a later call. Both produce strings.',
      '"{}: {}".format(name, score) vult velden op argumentvolgorde. Genummerde velden zoals {1} kiezen expliciet een positie. Benoemde velden zoals {name} gebruiken benoemde argumenten: template.format(name="Bo"). Accolades markeren vervangvelden. f-strings zetten uitdrukkingen direct in accolades, terwijl format waarden in een latere aanroep krijgt. Beide maken strings.',
    ],
    rule: [
      "Match each placeholder to a positional or named argument.",
      "Koppel elk vervangveld aan een positioneel of benoemd argument.",
    ],
    example:
      'print("{1}, {0}".format("Ada","Hello"))\nprint("{name}: {score}".format(name="Bo",score=4))',
    output: "Hello, Ada\nBo: 4\n",
    predict: [
      "Which positional argument does {1} select?",
      "Welk positioneel argument kiest {1}?",
    ],
    name: "label",
    params: "name, score",
    body: 'return "{name}: {score}".format(name=name, score=score)',
    task: [
      "Use .format() to return a label such as Ada: 7 from the supplied values.",
      "Gebruik .format() om vanuit de gegeven waarden een label zoals Ada: 7 terug te geven.",
    ],
    check:
      'any(isinstance(n,_ast.Attribute) and n.attr == "format" for n in _ast.walk(_ast.parse(_source)))',
    help: [
      "Match the template’s field names to keyword arguments.",
      "Koppel de veldnamen van het sjabloon aan benoemde argumenten.",
    ],
    fragment: ".format(name=name, score=score)",
    cases: [
      [["Ada", 7], '_return == "Ada: 7"'],
      [["Bo", 0], '_return == "Bo: 0"'],
    ],
    change: [
      "Write an equivalent f-string and explain where its values are supplied.",
      "Schrijf een gelijkwaardige f-string en leg uit waar de waarden worden geleverd.",
    ],
    explain: [
      "Named replacement fields make the mapping explicit while supporting changed values.",
      "Benoemde vervangvelden maken de koppeling expliciet en ondersteunen andere waarden.",
    ],
  }),
  f("text-cleaner", {
    title: ["Mini project: text cleaner", "Miniproject: tekstopruimer"],
    topics: "text-project",
    practices: "split-whitespace join strip case-conversion list-iteration",
    requires: "join case-conversion",
    kind: "challenge",
    guidance: "independent",
    minutes: 35,
    why: [
      "Turn inconsistent lines into a predictable report while preserving meaningful word order.",
      "Zet inconsistente regels om in een voorspelbaar rapport met behoud van betekenisvolle woordvolgorde.",
    ],
    teach: [
      "Implement clean_report(lines). For each supplied line, trim and collapse all whitespace runs to one ordinary space, then lowercase the text. Omit lines that become empty. Return the cleaned lines joined with newline, with no trailing newline. Preserve duplicates and order. This is plain text, not CSV.",
      "Implementeer clean_report(lines). Verwijder per aangeleverde regel buitenste witruimte, maak van elke reeks witruimte één gewone spatie en zet de tekst in kleine letters. Laat regels weg die leeg worden. Geef opgeschoonde regels terug verbonden met nieuwe regels, zonder afsluitende nieuwe regel. Behoud duplicaten en volgorde. Dit is gewone tekst, geen CSV.",
    ],
    rule: [
      "Define what to preserve before choosing cleaning operations.",
      "Bepaal wat bewaard moet blijven vóór je opschoonbewerkingen kiest.",
    ],
    example: 'text = "  Hello\t WORLD "\nprint(" ".join(text.split()).lower())',
    output: "hello world\n",
    predict: [
      "Which step collapses the tab and repeated spaces?",
      "Welke stap maakt de tab en herhaalde spaties gelijk?",
    ],
    name: "clean_report",
    params: "lines",
    body: 'result = []\nfor line in lines:\n    clean = " ".join(line.split()).lower()\n    if clean != "":\n        result.append(clean)\nreturn "\\n".join(result)',
    task: [
      "Implement the report rules and leave the input list unchanged.",
      "Implementeer de rapportregels en laat de invoerlijst ongewijzigd.",
    ],
    help: [
      "Clean one line, decide whether to keep it, then join only once at the end.",
      "Schoon één regel op, beslis of je die bewaart en voeg pas eenmaal aan het einde samen.",
    ],
    fragment: '" ".join(line.split())',
    cases: [
      [
        [["  Red\tFOX ", " ", "Blue  Sky"]],
        '_return == "red fox\nblue sky" and _args[0][0] == "  Red\tFOX "',
      ],
      [[[]], '_return == ""'],
      [[["A", "A"]], '_return == "a\na"'],
    ],
    change: [
      "Test tabs, blank lines, punctuation and duplicate lines in your own fixture.",
      "Test tabs, lege regels, leestekens en dubbele regels in je eigen gegevens.",
    ],
    explain: [
      "Each line is normalised independently; the final join creates exactly the required separators.",
      "Elke regel wordt onafhankelijk genormaliseerd; het uiteindelijke samenvoegen maakt precies de vereiste scheidingen.",
    ],
  }),
];
