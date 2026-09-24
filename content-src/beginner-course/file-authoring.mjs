import { focus } from "./focused.mjs";
import { call } from "./authoring.mjs";
export function fileLesson(chapter, slug, s) {
  const caller = `import work\n${s.caller}\n`;
  const a = focus(chapter, slug, {
    ...s,
    minutes: s.minutes || 18,
    starter: { ...s.fixtures, "main.py": caller, "work.py": s.starter },
    solution: { ...s.fixtures, "main.py": caller, "work.py": s.solution },
    tasks: s.tasks.map((t) => ({
      ...t,
      check: "True",
      probes: t.cases.map((c) =>
        call(t.name, c.args, `(${c.check}) and _error is None`, {
          module: "work",
          files: c.files || {},
        }),
      ),
    })),
  });
  a.sections[0].exampleFiles = s.exampleFiles || {};
  a.explanation.en +=
    "\n\nOpen work.py to write the requested function. main.py is a supplied caller: Run always starts there and imports your function. The other file tabs contain input data. After a successful run, open any new output file tab to inspect what your program saved.";
  a.explanation.nl +=
    "\n\nOpen work.py om de gevraagde functie te schrijven. main.py is de aangeleverde aanroeper: Uitvoeren begint daar en importeert je functie. De andere bestandstabbladen bevatten invoergegevens. Open na een geslaagde uitvoering een nieuw uitvoerbestand om te bekijken wat je programma heeft opgeslagen.";
  if (s.example.includes("end=")) {
    a.sections[0].body.en +=
      '\n\nThe optional print argument end="" prevents print from adding its own newline. This is useful when the text already contains line endings.';
    a.sections[0].body.nl +=
      '\n\nHet optionele print-argument end="" voorkomt dat print zelf een nieuwe regel toevoegt. Dat is handig als de tekst al regeleinden bevat.';
  }
  if (s.example.includes("json.loads(")) {
    a.sections[0].body.en +=
      "\n\njson.loads(text) parses JSON already stored in a Python string. json.load(handle) reads it from an open file. Both produce Python values; the extra s identifies the string version.";
    a.sections[0].body.nl +=
      "\n\njson.loads(text) verwerkt JSON die al in een Pythonstring staat. json.load(handle) leest die uit een geopend bestand. Beide maken Pythonwaarden; de extra s geeft de stringversie aan.";
  }
  return a;
}
