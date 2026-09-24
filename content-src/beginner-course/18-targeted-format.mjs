import { functionPractice as F } from "./function-practice.mjs";
export const activities = [
  F(18, "both-format-forms", {
    title: [
      "Use positional and named placeholders",
      "Gebruik plaatsaanduidingen op positie en naam",
    ],
    topics: "format-forms-practice",
    practices: "positional-format named-format",
    requires: "named-format tuples",
    name: "labels",
    params: "name, score",
    minutes: 15,
    why: [
      "Practise both ways of matching .format arguments to placeholders, then compare them with an f-string.",
      "Oefen beide manieren om .format-argumenten aan plaatsaanduidingen te koppelen en vergelijk ze daarna met een f-string.",
    ],
    teach: [
      "In '{0}: {1}'.format(name, score), 0 refers to the first argument and 1 to the second. In '{who}: {points}'.format(who=name, points=score), placeholder names match keyword arguments. The names belong to the format call; they do not have to be variable names elsewhere. Both forms produce text. To demonstrate both, return a tuple with the positional result first and the named result second.",
      "In '{0}: {1}'.format(name, score) verwijst 0 naar het eerste argument en 1 naar het tweede. In '{who}: {points}'.format(who=name, points=score) horen namen bij benoemde argumenten. De namen horen bij de format-aanroep; het hoeven geen variabelenamen elders te zijn. Beide vormen maken tekst. Geef om beide te demonstreren een tuple terug met het resultaat op positie eerst en het benoemde resultaat als tweede.",
    ],
    rule: [
      "Positions refer to argument order; names refer to keyword arguments.",
      "Posities verwijzen naar argumentvolgorde; namen naar benoemde argumenten.",
    ],
    example:
      'print("{1} then {0}".format("first", "second"))\nprint("{right} then {left}".format(left="first", right="second"))',
    output: "second then first\nsecond then first\n",
    predict: [
      "Why do both lines put second first?",
      "Waarom zetten beide regels second vooraan?",
    ],
    task: [
      "Implement labels(name, score). Return two strings like ('Ada: 4', 'Ada: 4'): use numeric placeholders and .format for the first, named placeholders and .format for the second.",
      "Implementeer labels(name, score). Geef twee strings zoals ('Ada: 4', 'Ada: 4') terug: gebruik numerieke plaatsen met .format voor de eerste en benoemde plaatsen met .format voor de tweede.",
    ],
    check:
      'callable(labels) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == "format" and isinstance(n.func.value,_ast.Constant) and "{0}" in n.func.value.value and "{1}" in n.func.value.value for n in _ast.walk(_ast.parse(_source))) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == "format" and len(n.keywords) >= 2 for n in _ast.walk(_ast.parse(_source)))',
    body: 'positional = "{0}: {1}".format(name, score)\nnamed = "{who}: {points}".format(who=name, points=score)\nreturn positional, named',
    help: [
      "Build the strings separately, then return the pair. Match each named placeholder to a keyword.",
      "Bouw de strings apart en geef daarna het paar terug. Koppel elke benoemde plaats aan een benoemd argument.",
    ],
    fragment: '"{who}".format(who=name)',
    cases: [
      [["Ada", 4], '_return == ("Ada: 4", "Ada: 4")'],
      [["Bo", 0], '_return == ("Bo: 0", "Bo: 0")'],
    ],
    change: [
      "After passing, write the equivalent f-string and explain which names Python looks up.",
      "Schrijf na slagen de overeenkomstige f-string en leg uit welke namen Python opzoekt.",
    ],
    explain: [
      "The positional call binds indexes 0 and 1. The named call binds who and points. Tuple packing returns both completed strings.",
      "De positionele aanroep bindt indexen 0 en 1. De benoemde aanroep bindt who en points. Tuple-pakken geeft beide complete strings terug.",
    ],
  }),
];
