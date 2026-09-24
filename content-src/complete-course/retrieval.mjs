import { L } from "./authoring.mjs";
import { syllabus, lessonId } from "./syllabus.mjs";

// Short, optional recall prompts after intervening material. These are opportunities
// for retrieval, not a claim that reading the prompt demonstrates mastery.
const prompts = [
  `Without copying, write a comment and print a welcome using a string variable. Explain how Run and an error message help you.||Schrijf zonder kopiëren een commentaarregel en druk een begroeting af met een stringvariabele. Leg uit hoe Uitvoeren en een foutmelding helpen.
Predict 3 + 2 * 1.5, then add parentheses to change it. Which values are integers and which are floats?||Voorspel 3 + 2 * 1.5 en verander de uitkomst met haakjes. Welke waarden zijn integers en welke floats?
Start stock at 7, add 3 with +=, then subtract 2. Trace the value after each change.||Begin met voorraad 7, voeg 3 toe met += en trek 2 af. Volg de waarde na elke wijziging.
For 17 items in groups of 4, predict // and %. Compare 4 ** 2 with 4 * 2.||Voorspel // en % voor 17 artikelen in groepen van 4. Vergelijk 4 ** 2 met 4 * 2.
Build a two-line message using concatenation and a multiline string. Deliberately remove a quote, read the error and repair it.||Bouw een bericht van twee regels met samenvoegen en een meerregelige string. Verwijder bewust een aanhalingsteken, lees de fout en herstel die.`,
  `Read a numeric string, convert it and put the result in an f-string. What happens if you omit conversion?||Lees een numerieke string, zet die om en gebruik het resultaat in een f-string. Wat gebeurt er zonder omzetting?
At exactly the minimum height, compare > with >= and == with !=. Store a Boolean, then trace <= and < just below the limit.||Vergelijk op de minimumlengte > met >= en == met !=. Bewaar een boolean en volg <= en < net onder de grens.
Write an if/else for an exact boundary. Explain which indented block runs and why.||Schrijf een if/else voor een exacte grens. Leg uit welk ingesprongen blok loopt en waarom.
Predict (False or True) and not True. Give one input where replacing or with and changes an entrance rule.||Voorspel (False or True) and not True. Geef invoer waarbij and in plaats van or een toegangsregel verandert.
Sketch a three-choice menu using elif, including an unknown choice. Can more than one branch run?||Schets een menu met drie keuzes met elif, inclusief een onbekende keuze. Kunnen meerdere takken lopen?`,
  `Replace three repeated print calls with a for loop. Explain what changes each iteration.||Vervang drie herhaalde print-aanroepen door een for-lus. Leg uit wat per herhaling verandert.
Predict range(8, 1, -2), then accumulate its total. Explain why the stop value is excluded.||Voorspel range(8, 1, -2) en tel de waarden op. Leg uit waarom de stopwaarde niet meetelt.
Trace a while menu with two commands and quit. Where is its counter updated?||Volg een while-menu met twee opdrachten en quit. Waar verandert de teller?
Explain how continue can skip an update and cause an infinite loop. Where would break exit, and how would you Stop a stuck run?||Leg uit hoe continue een wijziging kan overslaan en een oneindige lus kan veroorzaken. Waar stopt break en hoe stop je een vastgelopen uitvoering?
Write a new session summary with a different command worth three points. Test an unknown command and immediate quit.||Schrijf een nieuwe sessiesamenvatting met een andere opdracht van drie punten. Test een onbekende opdracht en meteen quit.`,
  `Define and call a small function twice. Contrast it with the built-in print and trace when its body executes.||Definieer een kleine functie en roep die tweemaal aan. Vergelijk die met de ingebouwde print en volg wanneer de inhoud wordt uitgevoerd.
Write a function with two parameters that returns a total. What value would its caller receive if it only printed?||Schrijf een functie met twee parameters die een totaal teruggeeft. Welke waarde krijgt de aanroeper als de functie alleen afdrukt?
Give two calls different arguments while a similarly named global exists. Explain which value a local parameter uses.||Geef twee aanroepen verschillende argumenten terwijl er een gelijknamige globale variabele bestaat. Leg uit welke waarde een lokale parameter gebruikt.
Call a function once positionally and once with named arguments, omitting its default in one call. Add an early return for empty input.||Roep een functie eenmaal positioneel en eenmaal met benoemde argumenten aan en laat eenmaal de standaard weg. Voeg een vroege return voor lege invoer toe.
Adapt your booking calculation to a new price and a discount larger than the total. Explain your zero boundary.||Pas je boekingsberekening aan voor een nieuwe prijs en een korting groter dan het totaal. Verklaar je nulgrens.`,
  `Create an empty history, append two results and concatenate a third list. Explain a method call and why a mixed list can contain a name and a score.||Maak een lege geschiedenis, voeg twee resultaten toe met append en voeg een derde lijst samen. Leg een methodeaanroep uit en waarom een gemengde lijst een naam en score kan bevatten.
Copy a list, create an alias, change index 0 and inspect -1 and len. Which names see the change?||Kopieer een lijst, maak een alias, verander index 0 en bekijk -1 en len. Welke namen zien de wijziging?
Sum the same list with for and indexed while. Test an empty list and explain the while boundary.||Tel dezelfde lijst op met for en een geïndexeerde while. Test een lege lijst en verklaar de while-grens.
Return two coordinates and unpack them into x and y. Explain where the tuple is created.||Geef twee coördinaten terug en pak ze uit in x en y. Leg uit waar de tuple ontstaat.
Process a new recording with negative values and an exact threshold. Preserve its original list.||Verwerk een nieuwe opname met negatieve waarden en een exacte grens. Behoud de oorspronkelijke lijst.`,
  `Show import math, from math import floor and an alias. Find one function in official documentation; explain why installing and importing are different actions.||Toon import math, from math import floor en een alias. Zoek een functie in officiële documentatie; leg uit waarom installeren en importeren verschillende handelingen zijn.
Explain where to place a random seed to repeat an experiment without forcing every call to return the same roll.||Leg uit waar een random-seed hoort om een experiment te herhalen zonder elke aanroep dezelfde worp te geven.
Compare Decimal("0.1") + Decimal("0.2") with floating-point addition. Why start Decimal from strings?||Vergelijk Decimal("0.1") + Decimal("0.2") met float-optelling. Waarom begint Decimal met strings?
Describe which file owns a helper’s global variable. Does assigning the same name in main.py change it?||Beschrijf welk bestand de globale variabele van een helper bezit. Verandert een toekenning met dezelfde naam in main.py die waarde?
Move a reusable calculation to another file, import it and test both a default and a named argument.||Verplaats een herbruikbare berekening naar een ander bestand, importeer die en test een standaard en een benoemd argument.`,
  `Describe a Rect’s x, y, width and right attributes at a new position. Which direction increases screen y?||Beschrijf x, y, width en right van een Rect op een nieuwe positie. In welke richting neemt scherm-y toe?
Predict the visible Surface colour when fill happens after drawing a rectangle. Repair the drawing order.||Voorspel de zichtbare Surface-kleur als fill na het tekenen van een rechthoek komt. Herstel de tekenvolgorde.
Explain how a close event and a key event differ. Identify the supplied browser-loop lines that let the page keep responding.||Leg uit hoe een sluitgebeurtenis en een toetsgebeurtenis verschillen. Wijs de meegeleverde browserlusregels aan die de pagina laten reageren.
Sketch a changed court with one interactive colour. Keep the supplied entry point and change your drawing helper.||Schets een gewijzigd veld met één interactieve kleur. Behoud het meegeleverde startpunt en wijzig je tekenhelper.`,
  `Predict displacement at velocity 120 for 0.25 seconds. What changes if elapsed time halves?||Voorspel de verplaatsing bij snelheid 120 gedurende 0,25 seconden. Wat verandert als de verstreken tijd halveert?
Explain why held-key polling supports two moving paddles and a key-down event suits a single toggle.||Leg uit waarom ingedrukte toetsen twee bewegende batjes ondersteunen en een toetsindrukgebeurtenis bij een enkele omschakeling past.
Derive the largest legal paddle y from court height and paddle height. Test both edges.||Leid de hoogste geldige batjes-y af uit veldhoogte en batjeshoogte. Test beide randen.
Trace a ball already moving away from a wall or paddle. Why must contact correction not reverse it again?||Volg een bal die al van een muur of batje af beweegt. Waarom mag contactcorrectie die niet opnieuw omkeren?
Describe a miss, a reset and the next rally. Playtest simultaneous controls and both sides.||Beschrijf een misser, een herstart en de volgende rally. Test gelijktijdige besturing en beide kanten.`,
  `For a queue with duplicate names, contrast insert, remove and pop. Which returns an item, and what does count report?||Vergelijk insert, remove en pop voor een wachtrij met dubbele namen. Welke geeft een element terug en wat meldt count?
Predict values[:2], values[2:] and values[-2:]. Explain range(5) versus list(range(5)).||Voorspel values[:2], values[2:] en values[-2:]. Leg range(5) tegenover list(range(5)) uit.
Predict the result and the original list after sort() and sorted(). Why is assigning the result of sort a mistake?||Voorspel resultaat en oorspronkelijke lijst na sort() en sorted(). Waarom is het resultaat van sort toekennen een fout?
Change one cell in a two-dimensional list and traverse every cell with nested loops. Identify row and column indexes.||Verander een cel in een tweedimensionale lijst en doorloop alle cellen met geneste lussen. Wijs rij- en kolomindex aan.
Rewrite a doubling loop as a comprehension, then filter out negatives. Explain the order of its expression, for and if.||Herschrijf een verdubbellus als comprehension en filter negatieve waarden weg. Leg de volgorde van expressie, for en if uit.
Create a new collection report that retains original order while showing a sorted selection. Test empty data.||Maak een nieuw verzamelingsrapport dat de originele volgorde behoudt en een gesorteerde selectie toont. Test lege gegevens.`,
  `Inspect a new identifier using its first character, last character, len and a slice. What happens at an invalid index?||Bekijk een nieuwe code met het eerste teken, laatste teken, len en een slice. Wat gebeurt er bij een ongeldige index?
Replace one character by constructing a new string. Explain immutability, concatenation and escaped newline or quote characters.||Vervang één teken door een nieuwe string te bouwen. Leg onveranderlijkheid, samenvoegen en escapes voor nieuwe regels of aanhalingstekens uit.
Normalise a name with strip and case conversion, then iterate its characters and test membership.||Normaliseer een naam met strip en hoofdletteromzetting, doorloop de tekens en test lidmaatschap.
Split spaces, a comma, newline and tab deliberately. Join the pieces with a different separator. Why can split() and split(" ") differ?||Splits bewust op witruimte, komma, nieuwe regel en tab. Voeg de delen samen met een ander scheidingsteken. Waarom kunnen split() en split(" ") verschillen?
Replace a label, test find on an absent word, and format one result with positional .format, named .format and an f-string.||Vervang een label, test find met een afwezig woord en formatteer een resultaat met positionele .format, benoemde .format en een f-string.
Clean a new set of tags, including blank text and duplicates. Explain each transformation without copying your solution.||Schoon een nieuwe set tags op, inclusief lege tekst en dubbele waarden. Leg elke stap uit zonder je oplossing te kopiëren.`,
  `Distinguish a syntax failure, runtime traceback and plausible but wrong output. Which line would you inspect first in a traceback?||Onderscheid een syntaxisfout, runtime-traceback en aannemelijke maar foute uitvoer. Welke regel bekijk je eerst in een traceback?
Explain why a converter catches ValueError and division catches ZeroDivisionError. Why avoid catching every exception?||Leg uit waarom een omzetter ValueError vangt en een deling ZeroDivisionError. Waarom niet alle uitzonderingen opvangen?
Give one input that cannot be parsed and one that parses but is outside the allowed range.||Geef invoer die niet kan worden omgezet en invoer die wel wordt omgezet maar buiten het toegestane bereik ligt.
Trace invalid input, a valid retry, cancel and end-of-input. Explain how each route ends or continues the conversation.||Volg ongeldige invoer, een geldige herhaling, annuleren en einde-invoer. Leg uit hoe elke route het gesprek beëindigt of voortzet.
Adapt your reliable reader to different bounds. Include exactly the endpoints and verify that cancellation is not confused with zero.||Pas je betrouwbare lezer aan voor andere grenzen. Neem de eindpunten mee en controleer dat annuleren niet met nul wordt verward.`,
  `Build an empty record and choose valid dictionary keys. Explain why a list and a tuple containing a list cannot be keys.||Maak een leeg record en kies geldige dictionarysleutels. Leg uit waarom een lijst en een tuple met een lijst geen sleutels kunnen zijn.
Add a field, overwrite it and use update for several changes. Which value wins when a key already exists?||Voeg een veld toe, overschrijf het en gebruik update voor meerdere wijzigingen. Welke waarde wint bij een bestaande sleutel?
Compare direct lookup, get, del and pop for present and missing keys. Do not confuse a stored zero with missing information.||Vergelijk directe toegang, get, del en pop voor aanwezige en ontbrekende sleutels. Verwar opgeslagen nul niet met ontbrekende informatie.
Iterate over keys, values and items. Explain what an items loop unpacks and how a view differs from a snapshot list.||Doorloop keys, values en items. Leg uit wat een items-lus uitpakt en hoe een view van een momentopnamelijst verschilt.
Build a dictionary comprehension from a mapping with one filtered-out entry. Show the equivalent ordinary loop.||Bouw een dictionarycomprehension met één weggefilterde invoer. Toon de equivalente gewone lus.
Update a new registry without changing the caller’s dictionary. Test an empty update and a missing record.||Werk een nieuw register bij zonder de dictionary van de aanroeper te wijzigen. Test een lege wijziging en een ontbrekend record.`,
  `Read UTF-8 text with with and explain when the file closes. Where are browser workspace files saved, and how do they reach your computer?||Lees UTF-8-tekst met with en leg uit wanneer het bestand sluit. Waar worden browserwerkruimtebestanden bewaard en hoe komen ze op je computer?
Use readline for a header, then iterate remaining lines. Predict a second read at the end of the file.||Gebruik readline voor een kop en doorloop de overige regels. Voorspel een tweede read aan het einde van het bestand.
Compare write and append across two runs. Explain a missing-file fallback and inspect the saved file after reopening.||Vergelijk schrijven en toevoegen over twee uitvoeringen. Leg een terugval bij een ontbrekend bestand uit en bekijk het opgeslagen bestand na heropenen.
Generate a report from a different source, including empty and Unicode text. Check that the input file remains unchanged.||Maak een rapport van een andere bron, inclusief lege en Unicode-tekst. Controleer dat het invoerbestand ongewijzigd blijft.`,
  `Read new CSV rows both positionally and by header. Explain why numeric-looking fields need conversion.||Lees nieuwe CSV-rijen positioneel en met kopnamen. Leg uit waarom numeriek ogende velden omzetting nodig hebben.
Predict how a CSV reader handles a quoted comma and a semicolon delimiter. Why is plain split unreliable here?||Voorspel hoe een CSV-lezer een komma tussen aanhalingstekens en een puntkommascheiding behandelt. Waarom is gewone split hier onbetrouwbaar?
Export a row containing a comma and newline using a CSV writer, then read it back.||Exporteer een rij met een komma en nieuwe regel met een CSV-schrijver en lees die terug.
Load nested JSON and identify the Python types of arrays, objects, false and null.||Laad geneste JSON en benoem de Python-types van arrays, objecten, false en null.
Save and reload a setting. Contrast one JSON document with appending two objects; distinguish missing from damaged data.||Bewaar en herlaad een instelling. Vergelijk één JSON-document met twee objecten achter elkaar; onderscheid ontbrekende van beschadigde gegevens.
Plan a CSV-to-JSON transformation with malformed and empty records, preserving its source.||Plan een CSV-naar-JSON-transformatie met ongeldige en lege records en behoud de bron.`,
  `Inspect the type of a function and pass it as an argument. Explain how familiar strings, lists and functions are objects.||Bekijk het type van een functie en geef die als argument door. Leg uit hoe bekende strings, lijsten en functies objecten zijn.
Create two instances with different initial values. Explain class, __init__, self and each instance attribute.||Maak twee instanties met verschillende beginwaarden. Leg class, __init__, self en elk instantieattribuut uit.
Call a method with a default and an explicit argument. Explain which object’s state changes.||Roep een methode aan met een standaard en een expliciet argument. Leg uit van welk object de toestand verandert.
Contrast a shared class label with an instance-owned list. Test that changing one object does not change another.||Vergelijk een gedeeld klasselabel met een lijst per instantie. Test dat het ene object wijzigen het andere niet wijzigt.
Use hasattr, getattr with a default and dir on an object. Contrast its repr with its readable str.||Gebruik hasattr, getattr met een standaard en dir op een object. Vergelijk repr met de leesbare str.
Apply your timer to a new duration, oversized tick and reset. Verify independent instances.||Pas je timer toe op een nieuwe duur, een te grote tijdstap en reset. Controleer onafhankelijke instanties.`,
  `Trace serve, playing and won through space, point and restart. State what must reset and what persists.||Volg serve, playing en won bij spatie, punt en herstart. Benoem wat reset en wat bewaard blijft.
Test the same missed-ball position twice. Explain why the match must award exactly one point.||Test dezelfde positie van een gemiste bal tweemaal. Leg uit waarom de wedstrijd precies één punt moet toekennen.
Explain the responsibilities of a paddle class and collision helper. Test overlap while approaching and while moving away.||Leg de verantwoordelijkheden van een batjesklasse en botsingshelper uit. Test overlap bij naderen en bij wegbewegen.
Load a saved setting with missing, malformed and out-of-range data; save a result and reopen it.||Laad een instelling met ontbrekende, ongeldige en buiten-bereikgegevens; bewaar een resultaat en heropen het.
Playtest your personal change, pause/focus, simultaneous controls, Stop and another Run. Record one reproducible bug and its repair.||Test je eigen wijziging, pauze/focus, gelijktijdige besturing, Stop en opnieuw Uitvoeren. Noteer één reproduceerbare fout en de reparatie.`,
];

export function addRetrieval(activities) {
  const byId = new Map(activities.map((a) => [a.id, a]));
  syllabus.forEach((module, m) => {
    const rows = prompts[m].split("\n");
    if (rows.length !== module.lessons.length)
      throw Error(`Retrieval rows for module ${m + 1}`);
    rows.forEach((row, i) => {
      const chapter = m + 1,
        sourceId = lessonId(chapter, i + 1);
      const targetId =
        chapter === 16
          ? "python-v3-pong-project"
          : [11, 14].includes(chapter)
            ? "python-v3-calculator-project"
            : chapter === 15
              ? lessonId(16, Math.min(i + 1, 5))
              : chapter === 13
                ? lessonId(14, i + 1)
                : lessonId(
                    Math.min(chapter + 2, 14),
                    Math.min(
                      i + 1,
                      syllabus[Math.min(chapter + 2, 14) - 1].lessons.length,
                    ),
                  );
      const target = byId.get(targetId);
      const [en, nl] = row.split("||");
      if (!target || !en || !nl) throw Error(`Missing retrieval ${sourceId}`);
      (target.retrievals ||= []).push({
        id: `recall-${sourceId}`,
        sourceActivityId: sourceId,
        objectiveIds: module.lessons[i][2].split(" "),
        prompt: L(en, nl),
      });
    });
  });
}
