import { P, Q } from "./quiz-authoring.mjs";
export function varyRetry(chapter, own, alternate) {
  if (!alternate) return own;
  const predictions = {
    3: [
      "precedence",
      "print((8 + 2) * 3)",
      ["30", "14", "13"],
      [
        "Evaluate the parentheses before multiplication.",
        "Werk de haakjes vóór vermenigvuldiging uit.",
      ],
    ],
    4: [
      "f-strings",
      'count = 3\nprint("Count: {count}")\nprint(f"Count: {count}")',
      [
        "Count: {count}\nCount: 3",
        "Count: 3\nCount: 3",
        "Count: {count}\nCount: {count}",
      ],
      [
        "Only the f prefix makes braces evaluate an expression.",
        "Alleen het f-voorvoegsel laat haakjes een expressie evalueren.",
      ],
    ],
    6: [
      "and or not",
      "member = False\nclosed = True\nprint(member or not closed)\nprint(member and not closed)",
      ["False\nFalse", "True\nFalse", "False\nTrue"],
      [
        "not closed is False; both combinations therefore stay False.",
        "not closed is False; beide combinaties blijven dus False.",
      ],
    ],
    7: [
      "elif",
      'age = 12\nif age < 12:\n    print("Child")\nelif age == 12:\n    print("Boundary")\nelse:\n    print("Older")',
      ["Boundary", "Child", "Older"],
      [
        "The strict first comparison excludes 12; equality selects the second branch.",
        "De eerste strikte vergelijking sluit 12 uit; gelijkheid kiest de tweede tak.",
      ],
    ],
    9: [
      "return",
      "def discount(price):\n    return price - 2\nvalue = discount(5)\nprint(value * 3)",
      ["9", "3", "15"],
      [
        "The call returns 3 to value; the caller then multiplies that returned value.",
        "De aanroep geeft 3 terug aan value; de aanroeper vermenigvuldigt daarna die waarde.",
      ],
    ],
    14: [
      "random-seed",
      "import random\nrandom.seed(12)\nfirst = random.random()\nsecond = random.random()\nrandom.seed(12)\nprint(random.random() == first)\nprint(random.random() == second)",
      ["True\nTrue", "True\nFalse", "False\nFalse"],
      [
        "Reseeding restarts the sequence. Two subsequent calls repeat its first and second values in order.",
        "De seed opnieuw instellen herstart de reeks. Twee volgende aanroepen herhalen de eerste en tweede waarde in volgorde.",
      ],
    ],
    18: [
      "find",
      'text = "red-blue"\nprint(text.find("red"))\nprint(text.find("green"))',
      ["0\n-1", "True\nFalse", "1\n0"],
      [
        "Index zero is a real match; minus one marks absence.",
        "Index nul is een echte match; min één betekent afwezigheid.",
      ],
    ],
    23: [
      "repr instance-attributes",
      'class Meter:\n    def __init__(self):\n        self.value = 1\n    def __repr__(self):\n        return f"Meter({self.value})"\nmeter = Meter()\nmeter.value += 2\nprint(repr(meter))',
      ["Meter(3)", "Meter(1)", "3"],
      [
        "Representation reads current instance state at the time of the call.",
        "De weergave leest de huidige instantietoestand op het moment van aanroepen.",
      ],
    ],
  };
  if (predictions[chapter]) {
    const [topic, code, answers, reason] = predictions[chapter];
    own.p = P(topic, code, answers, [reason, reason, reason]);
  }
  if (chapter === 15)
    own.app = Q(
      "events",
      "application",
      [
        "A mouse event reaches this branch. Which change safely handles keyboard input?",
        "Een muisgebeurtenis bereikt deze tak. Welke wijziging verwerkt toetsenbordinvoer veilig?",
      ],
      "if event.type == pygame.MOUSEMOTION:\n    print(event.key)",
      [
        [
          [
            "Check for KEYDOWN before reading key.",
            "Controleer KEYDOWN vóór je key leest.",
          ],
          [
            "A mouse-motion event does not carry a keyboard key attribute.",
            "Een muisbewegingsgebeurtenis heeft geen toetsenbordattribuut key.",
          ],
        ],
        [
          ["Remove the type check.", "Verwijder de typecontrole."],
          [
            "Then even more non-keyboard events reach the unsafe access.",
            "Dan bereiken nog meer niet-toetsenbordgebeurtenissen de onveilige toegang.",
          ],
        ],
        [
          ["Call str(event.key).", "Roep str(event.key) aan."],
          [
            "The attribute must exist before its value can be converted.",
            "Het attribuut moet bestaan vóór zijn waarde kan worden omgezet.",
          ],
        ],
      ],
    );
  if (chapter === 16)
    own.debug = Q(
      "direction-aware-collision",
      "debugging",
      [
        "The ball is at the top and already moving down. Which repair prevents an extra bounce?",
        "De bal staat bovenaan en beweegt al omlaag. Welke reparatie voorkomt een extra stuiter?",
      ],
      "y, vy = 6, 100\nif y <= 6:\n    vy = -vy",
      [
        [
          [
            "Also require vy < 0 before reversing.",
            "Eis ook vy < 0 vóór omkeren.",
          ],
          [
            "Only an approaching ball should reverse; this ball is leaving the wall.",
            "Alleen een naderende bal hoort om te keren; deze bal verlaat de muur.",
          ],
        ],
        [
          ["Always reverse twice.", "Keer altijd tweemaal om."],
          [
            "Two reversals cancel, so approaching balls would also fail to bounce.",
            "Twee omkeringen heffen elkaar op; naderende ballen zouden dan ook niet stuiteren.",
          ],
        ],
        [
          ["Change <= to == only.", "Verander alleen <= in ==."],
          [
            "The shown position equals 6, so the erroneous reversal still happens.",
            "De getoonde positie is gelijk aan 6, dus de verkeerde omkering gebeurt nog.",
          ],
        ],
      ],
    );
  return own;
}
