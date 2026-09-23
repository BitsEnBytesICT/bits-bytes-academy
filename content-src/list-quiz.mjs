import { loc } from "./helpers.mjs";

// Keep legacy multiple-choice questions intact. Format 2 attempts use these
// independently authored code-blank variants; older attempts keep their meaning.
export function enhanceListQuiz(quiz) {
  const wrongReasons = [
    [
      loc(
        "7 is at index 1. Index 0 selects the first value, 4.",
        "7 staat op index 1. Index 0 kiest de eerste waarde, 4.",
      ),
      loc(
        "9 is at index 2, or -1. Index 0 selects 4.",
        "9 staat op index 2 of -1. Index 0 kiest 4.",
      ),
    ],
    [
      loc(
        "4 is the first value. Negative indexing starts at the other end: -1 selects 9.",
        "4 is de eerste waarde. Negatieve indexes beginnen aan de andere kant: -1 kiest 9.",
      ),
      loc(
        "7 is one place before the last value, at index -2. Index -1 selects 9.",
        "7 staat één plek voor de laatste waarde, op index -2. Index -1 kiest 9.",
      ),
    ],
    [
      loc(
        "append places 3 after existing items, not before them. The result is [1, 2, 3].",
        "append plaatst 3 na de bestaande elementen, niet ervoor. Het resultaat is [1, 2, 3].",
      ),
      loc(
        "append changes x in place even without assigning a return value. x now contains 3 too.",
        "append verandert x direct, ook zonder een return value op te slaan. x bevat nu ook 3.",
      ),
    ],
    [
      loc(
        "{} creates an empty dictionary. An empty list uses square brackets: [].",
        "{} maakt een lege dictionary. Een lege list gebruikt vierkante haken: [].",
      ),
      loc(
        "() creates an empty tuple. A list uses square brackets: [].",
        "() maakt een lege tuple. Een list gebruikt vierkante haken: [].",
      ),
      loc(
        "An empty quoted value is a string, not a list. Use [].",
        "Een lege waarde tussen aanhalingstekens is een string, geen list. Gebruik [].",
      ),
    ],
    [
      loc(
        "Index 1 refers to the second item, so a stays and b becomes c.",
        "Index 1 verwijst naar het tweede element, dus a blijft staan en b wordt c.",
      ),
      loc(
        "Indexed assignment replaces an item; it does not append another one.",
        "Een toewijzing via een index vervangt een element; er komt geen extra element bij.",
      ),
    ],
    [
      loc(
        "remove deletes the first match only. The second 2 remains, giving [2, 3].",
        "remove verwijdert alleen de eerste overeenkomst. De tweede 2 blijft staan: [2, 3].",
      ),
      loc(
        "The argument 2 is a value to remove, not an index. The first 2 is removed; 3 stays.",
        "Het argument 2 is de te verwijderen waarde, geen index. De eerste 2 verdwijnt; 3 blijft staan.",
      ),
    ],
    [
      loc(
        "Adding lists joins their elements; it does not add numeric pairs. The result is [1, 2, 3].",
        "Lists optellen voegt hun elementen samen; getallen worden niet paarsgewijs opgeteld. Het resultaat is [1, 2, 3].",
      ),
      loc(
        "Concatenation takes both elements from [2, 3]. Appending that list as one item would create nesting.",
        "Samenvoegen neemt beide elementen uit [2, 3] over. Die list als één element toevoegen zou een geneste list maken.",
      ),
    ],
    [
      loc(
        "8 is the second field of the second row: rows[1][1]. This code selects field 0, B.",
        "8 is het tweede veld van de tweede rij: rows[1][1]. Deze code kiest veld 0, B.",
      ),
      loc(
        "A belongs to row 0. The first index is 1, so the selected row begins with B.",
        "A hoort bij rij 0. De eerste index is 1, dus de gekozen rij begint met B.",
      ),
      loc(
        "6 is in row 0, field 1. This code selects row 1, field 0: B.",
        "6 staat in rij 0, veld 1. Deze code kiest rij 1, veld 0: B.",
      ),
    ],
    [
      loc(
        "An out-of-range element lookup raises IndexError; Python does not substitute None.",
        "Een element opvragen buiten de beschikbare indexes geeft IndexError; Python vult niet automatisch None in.",
      ),
      loc(
        "Some slices can return an empty list, but a single invalid element index raises IndexError.",
        "Sommige slices geven een lege list, maar een ongeldige index voor één element geeft IndexError.",
      ),
    ],
    [
      loc(
        "A list can mix strings, numbers and Boolean values. Each item keeps its own type.",
        "Een list mag strings, getallen en Booleans combineren. Elk element behoudt zijn eigen type.",
      ),
    ],
    [
      loc(
        "x becomes [5, 6], but append returns None. This code prints the return value stored in result.",
        "x wordt [5, 6], maar append geeft None terug. Deze code print de return value in result.",
      ),
      loc(
        "6 is the item being added, not the return value. append returns None.",
        "6 is het toegevoegde element, niet de return value. append geeft None terug.",
      ),
    ],
  ];
  quiz.questions.forEach((question, i) =>
    question.choices.slice(1).forEach((choice, j) => {
      choice.reason = wrongReasons[i][j];
    }),
  );
  const tokens = (values) =>
    values.map((code, i) => ({ id: `token-${i + 1}`, code }));
  const blank = (answer, en, nl) => ({ answer, reason: loc(en, nl) });
  quiz.questions[2].codeBlank = {
    prompt: loc(
      "Build two stock records: a lamp with quantity 6 and a cable with quantity 9. Each record is an inner list. Keep that order.",
      "Maak twee voorraadregels: een lamp met aantal 6 en een cable met aantal 9. Elke regel is een binnenste list. Houd die volgorde aan.",
    ),
    segments: [
      "stock = ",
      '["lamp", ',
      "]",
      ' ["cable", ',
      "]",
      "\nprint(stock)",
    ],
    tokens: tokens(["[", "6", ",", "9", "]", "(", "0"]),
    blanks: [
      blank(
        "[",
        "The outer list contains two records, so start it with a square bracket.",
        "De buitenste list bevat twee regels en begint dus met een vierkante haak.",
      ),
      blank(
        "6",
        "The lamp quantity belongs in the second field of its record.",
        "Het aantal lampen hoort in het tweede veld van de regel.",
      ),
      blank(
        ",",
        "A comma separates the two inner lists inside the outer list.",
        "Een komma scheidt de twee binnenste lists in de buitenste list.",
      ),
      blank(
        "9",
        "The cable quantity belongs alongside its name in the second record.",
        "Het aantal cables hoort naast de naam in de tweede regel.",
      ),
      blank(
        "]",
        "Close the outer list after both complete records.",
        "Sluit de buitenste list na beide volledige regels.",
      ),
    ],
    output: "[['lamp', 6], ['cable', 9]]\n",
  };
  quiz.questions[4].codeBlank = {
    prompt: loc(
      "Update only the cable quantity to 12. Keep both names and the lamp quantity unchanged.",
      "Verander alleen het aantal cables in 12. Behoud beide namen en het aantal lampen.",
    ),
    segments: [
      'stock = [["lamp", 6], ["cable", 9]]\nstock[',
      "][",
      "] = ",
      "\nprint(stock)",
    ],
    tokens: tokens(["1", "1", "12", "0", "2", '"12"']),
    blanks: [
      blank(
        "1",
        "Row index 1 selects the cable record; index 0 would change the lamp.",
        "Rij-index 1 kiest de cable-regel; index 0 zou de lamp veranderen.",
      ),
      blank(
        "1",
        "Field index 1 selects the quantity; index 0 would overwrite the name.",
        "Veldindex 1 kiest het aantal; index 0 zou de naam overschrijven.",
      ),
      blank(
        "12",
        "Use the integer 12, without quotes, so the quantity remains a number.",
        "Gebruik het gehele getal 12 zonder aanhalingstekens, zodat het aantal een getal blijft.",
      ),
    ],
    output: "[['lamp', 6], ['cable', 12]]\n",
  };
  quiz.questions[9].codeBlank = {
    prompt: loc(
      'Repair the second label: replace "cabell" with "cable". Do not add or remove a label.',
      'Herstel het tweede label: vervang "cabell" door "cable". Voeg geen label toe en verwijder er geen.',
    ),
    segments: [
      'labels = ["lamp", "cabell", "tripod"]\nlabels[',
      "] = ",
      "\nprint(labels)",
    ],
    tokens: tokens(["1", '"cable"', "2", "0", "cable"]),
    blanks: [
      blank(
        "1",
        "The second element has index 1 because indexing starts at zero.",
        "Het tweede element heeft index 1, omdat tellen bij nul begint.",
      ),
      blank(
        '"cable"',
        "Quotes make a string value. Bare cable would refer to a variable that this program has not defined.",
        "Aanhalingstekens maken een stringwaarde. Zonder aanhalingstekens verwijst cable naar een variabele die dit programma niet heeft.",
      ),
    ],
    output: "['lamp', 'cable', 'tripod']\n",
  };
}
