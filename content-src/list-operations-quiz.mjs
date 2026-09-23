import { loc } from "./helpers.mjs";

export function enhanceOperationsQuiz(quiz) {
  const reasons = [
    [
      loc(
        "A one-argument range starts at zero, not one. Stop 4 is excluded.",
        "Een range met één argument begint bij nul, niet bij één. Stop 4 is uitgesloten.",
      ),
      loc(
        "The stop boundary does not belong to the range; 4 is excluded.",
        "De stopgrens hoort niet bij de range; 4 is uitgesloten.",
      ),
    ],
    [
      loc(
        "The third argument is the step. Add 3 after each value, rather than including every integer.",
        "Het derde argument is de stap. Tel na elke waarde 3 op in plaats van elk geheel getal op te nemen.",
      ),
      loc(
        "The first argument sets the start to 2. The step is 3, and stop 9 is excluded.",
        "Het eerste argument zet het begin op 2. De stap is 3 en stop 9 is uitgesloten.",
      ),
    ],
    [
      loc(
        "len counts the two outer records, not all four values inside them.",
        "len telt de twee buitenste records, niet alle vier waarden daarin.",
      ),
      loc(
        "The outer list has two elements. Each inner list counts as one whole element.",
        "De buitenste list heeft twee elementen. Elke binnenste list telt als één volledig element.",
      ),
    ],
    [
      loc(
        "Start index 1 selects value 2. Indexing begins at zero.",
        "Beginindex 1 kiest waarde 2. Indexes beginnen bij nul.",
      ),
      loc(
        "The value at stop index 3 is excluded, leaving values at indexes 1 and 2.",
        "De waarde op stopindex 3 is uitgesloten; de waarden op indexes 1 en 2 blijven over.",
      ),
    ],
    [
      loc(
        "The negative start anchors the slice at the end, not the beginning.",
        "Het negatieve begin verankert de slice aan het einde, niet aan het begin.",
      ),
      loc(
        "Index -2 is the second-to-last value, 3. The open stop includes the final 4 too.",
        "Index -2 is de op één na laatste waarde, 3. Door de open stop telt de laatste 4 ook mee.",
      ),
    ],
    [
      loc(
        "Index 1 inserts before the second item, so the first item remains first.",
        "Index 1 voegt vóór het tweede item in, dus het eerste item blijft vooraan.",
      ),
      loc(
        "insert opens the requested position. It does not append the new item at the end.",
        "insert maakt ruimte op de gevraagde positie. Het voegt het nieuwe element niet achteraan toe.",
      ),
    ],
    [
      loc(
        "Without an index, pop removes and returns the last value, 6. pop(0) would return 4.",
        "Zonder index verwijdert pop de laatste waarde, 6, en geeft die terug. pop(0) zou 4 teruggeven.",
      ),
      loc(
        "Unlike sort, pop returns the removed item. Here that item is 6.",
        "Anders dan sort geeft pop het verwijderde item terug. Hier is dat 6.",
      ),
    ],
    [
      loc(
        "2 is the value being counted. It occurs three times, not twice.",
        "2 is de waarde die wordt geteld. Die komt drie keer voor, niet twee keer.",
      ),
      loc(
        "There are four total entries, but only three match 2. count differs from len.",
        "Er zijn vier elementen in totaal, maar slechts drie zijn gelijk aan 2. count verschilt van len.",
      ),
    ],
    [
      loc(
        "The list becomes [1, 2, 3], but this prints the method’s return value: None.",
        "De list wordt [1, 2, 3], maar dit print de return value van de method: None.",
      ),
      loc(
        "The default sort is increasing, and its return value is None regardless of direction.",
        "De standaard-sortering is oplopend en de return value is None, ongeacht de richting.",
      ),
    ],
    [
      loc(
        "That is the new list stored in y. sorted leaves the printed original x unchanged.",
        "Dat is de nieuwe list in y. sorted laat de geprinte oorspronkelijke x ongewijzigd.",
      ),
      loc(
        "sorted returns a new list to y; x still refers to its original list, not None.",
        "sorted geeft een nieuwe list terug aan y; x verwijst nog steeds naar de oorspronkelijke list, niet naar None.",
      ),
    ],
    [
      loc(
        "reverse=True requests decreasing order, so the largest value comes first.",
        "reverse=True vraagt om aflopende volgorde, dus de grootste waarde komt vooraan.",
      ),
      loc(
        "This is the unchanged input order. The printed sorted copy is decreasing.",
        "Dit is de ongewijzigde invoervolgorde. De geprinte gesorteerde kopie is aflopend.",
      ),
    ],
    [
      loc(
        "Stop 0 is excluded. There are no positions before it in this slice.",
        "Stop 0 is uitgesloten. Er liggen geen posities vóór deze grens in de slice.",
      ),
      loc(
        "An omitted start begins at zero, but the explicit stop is also zero, so the slice is empty.",
        "Een weggelaten begin start op nul, maar de opgegeven stop is ook nul, dus de slice is leeg.",
      ),
    ],
  ];
  quiz.questions.forEach((q, i) =>
    q.choices.slice(1).forEach((c, j) => (c.reason = reasons[i][j])),
  );
  const tokens = (values) =>
    values.map((code, i) => ({ id: `token-${i + 1}`, code }));
  const blank = (answer, en, nl) => ({ answer, reason: loc(en, nl) });
  quiz.questions[5].codeBlank = {
    prompt: loc(
      'Insert "Clinic" as the third stop, keeping every existing stop in order.',
      'Voeg "Clinic" als derde stop in en behoud alle bestaande stops in hun volgorde.',
    ),
    segments: [
      'route = ["Depot", "Bridge", "Dock"]\n',
      ".",
      "(",
      ", ",
      ")\nprint(route)",
    ],
    tokens: tokens(["route", "insert", "2", '"Clinic"', "append", "3", "1"]),
    blanks: [
      blank(
        "route",
        "Call the method on the route list itself.",
        "Roep de method aan op de route-list zelf.",
      ),
      blank(
        "insert",
        "insert adds at a position and shifts existing stops; append only adds at the end.",
        "insert voegt op een positie toe en schuift bestaande stops op; append voegt alleen achteraan toe.",
      ),
      blank(
        "2",
        "The third position has index 2 because indexing starts at zero.",
        "De derde positie heeft index 2, omdat indexes bij nul beginnen.",
      ),
      blank(
        '"Clinic"',
        "The inserted stop is a string, so its literal needs quotes.",
        "De ingevoegde stop is een string, dus de literal heeft aanhalingstekens nodig.",
      ),
    ],
    output: "['Depot', 'Bridge', 'Clinic', 'Dock']\n",
  };
  quiz.questions[6].codeBlank = {
    prompt: loc(
      "Cancel the third queued job using pop and keep its name in canceled.",
      "Annuleer de derde klus in de wachtrij met pop en bewaar de naam in canceled.",
    ),
    segments: [
      'queue = ["scan", "pack", "calibrate", "label"]\ncanceled = ',
      ".",
      "(",
      ")\nprint(canceled)\nprint(queue)",
    ],
    tokens: tokens(["queue", "pop", "2", "3", "remove", "0"]),
    blanks: [
      blank(
        "queue",
        "Remove from queue; the returned value is assigned to canceled.",
        "Verwijder uit queue; de teruggegeven waarde wordt aan canceled toegewezen.",
      ),
      blank(
        "pop",
        "pop removes by index and returns the item. remove instead searches by value.",
        "pop verwijdert op index en geeft het item terug. remove zoekt juist op waarde.",
      ),
      blank(
        "2",
        "The third item is at index 2. Index 3 would cancel the fourth job.",
        "Het derde item staat op index 2. Index 3 zou de vierde klus annuleren.",
      ),
    ],
    output: "calibrate\n['scan', 'pack', 'label']\n",
  };
}
