import { gameLesson as G } from "./game-authoring.mjs";
const adapter = {
  module: "_event_fixture",
  files: {
    "_event_fixture.py":
      "import pygame\nimport game\ndef react(kind, key, bright):\n    if key is None:\n        event = pygame.event.Event(kind)\n    else:\n        event = pygame.event.Event(kind, key=key)\n    return game.react(event, bright)\n",
  },
};
export const activities = [
  G(15, "event-wiring", {
    title: [
      "Wire an event to a visible change",
      "Verbind een gebeurtenis aan een zichtbare verandering",
    ],
    topics: "event-dispatch",
    practices: "events keyboard-events closing-window",
    requires: "events blit",
    why: [
      "Previously the loop checked the event type for you. Now handle a complete event safely yourself.",
      "Eerder controleerde de lus het gebeurtenistype voor je. Verwerk nu zelf veilig een volledige gebeurtenis.",
    ],
    teach: [
      "main.py retrieves events and calls react(event, bright) once for each event. Return two values: (keep_running, new_bright). A QUIT event returns False and the unchanged colour state. A Space KEYDOWN toggles bright and keeps running. Other events keep both states unchanged. Some events have no key: only read event.key after checking event.type. The caller unpacks your pair into running and bright; its next draw shows the result. Event creation in the example is just a way to simulate a click or key during a test.",
      "main.py haalt gebeurtenissen op en roept react(event, bright) eenmaal per gebeurtenis aan. Geef twee waarden terug: (keep_running, new_bright). QUIT geeft False en de ongewijzigde kleurtoestand terug. Space KEYDOWN wisselt bright en laat het programma doorgaan. Andere gebeurtenissen houden beide toestanden gelijk. Sommige gebeurtenissen hebben geen key: lees event.key pas nadat je event.type hebt gecontroleerd. De aanroeper pakt je paar uit in running en bright; de volgende tekening toont het resultaat. Gebeurtenissen maken in het voorbeeld is alleen een manier om een klik of toets bij een test na te bootsen.",
    ],
    rule: [
      "Inspect the type, read relevant attributes, then return the new state.",
      "Bekijk het type, lees passende attributen en geef de nieuwe toestand terug.",
    ],
    example:
      "import pygame\nevent = pygame.event.Event(pygame.MOUSEMOTION)\nif event.type == pygame.KEYDOWN:\n    print(event.key)\nelse:\n    print('No keyboard key')",
    output: "No keyboard key\n",
    predict: [
      "Why does this event not cause an attribute error?",
      "Waarom veroorzaakt deze gebeurtenis geen attribuutfout?",
    ],
    preview: {
      setup: "bright = False",
      events:
        "keep_running, bright = game.react(event, bright)\nrunning = running and keep_running",
      draw: "if bright:\n    screen.fill((240,240,240))",
    },
    starter: "def react(event, bright):\n    return True, bright\n",
    solution:
      "def react(event, bright):\n    if event.type == pygame.QUIT:\n        return False, bright\n    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:\n        return True, not bright\n    return True, bright\n",
    tasks: [
      {
        name: "react",
        task: [
          "Complete react(event, bright). Handle QUIT, Space KEYDOWN and events without a key. Return (keep_running, new_bright).",
          "Maak react(event, bright) af. Verwerk QUIT, Space KEYDOWN en gebeurtenissen zonder key. Geef (keep_running, new_bright) terug.",
        ],
        help: [
          "Handle QUIT first. Guard the key comparison with the event type; return unchanged state otherwise.",
          "Verwerk QUIT eerst. Bewaak de toetsvergelijking met het gebeurtenistype; geef anders ongewijzigde toestand terug.",
        ],
        fragment: "if event.type == pygame.KEYDOWN:",
        cases: [
          [[256, null, true], "_return == (False,True)", adapter],
          [[768, 32, false], "_return == (True,True)", adapter],
          [[768, 32, true], "_return == (True,False)", adapter],
          [[768, 97, false], "_return == (True,False)", adapter],
          [[1024, null, true], "_return == (True,True)", adapter],
          [[769, 32, false], "_return == (True,False)", adapter],
        ],
      },
    ],
    change: [
      "Move the mouse, press A, then press and release Space twice. Explain which events change the colour and which leave it alone.",
      "Beweeg de muis, druk A en druk daarna tweemaal Space in en laat los. Leg uit welke gebeurtenissen de kleur veranderen en welke niet.",
    ],
    explain: [
      "The type guard prevents reading a missing key. Returning state lets one caller coordinate events and drawing without global variables.",
      "De typecontrole voorkomt het lezen van een ontbrekende key. Door toestand terug te geven kan één aanroeper gebeurtenissen en tekenen verbinden zonder globale variabelen.",
    ],
  }),
  G(15, "render-label", {
    title: [
      "Render and place your own label",
      "Teken en plaats je eigen label",
    ],
    topics: "text-rendering-practice",
    practices: "pygame-text blit",
    requires: "pygame-text drawing-order",
    why: [
      "Turn text into pixels yourself, then put those pixels on a scene. The preview supplies only the final display.",
      "Zet zelf tekst om in pixels en plaats die pixels op een scène. Het voorbeeld levert alleen het uiteindelijke scherm.",
    ],
    teach: [
      "In labelled(text), create a 240×70 Surface and fill it with (20,40,80). Create pygame.font.Font(None,30). font.render(text, True, (240,240,240)) returns a separate image; it does not draw onto the scene. Use canvas.blit(label, (12,12)) before returning canvas. The preview calls your function with a label and displays the Surface you return. The font system is already started; keep the supplied font.init line for isolated tests.",
      "Maak in labelled(text) een Surface van 240×70 en vul die met (20,40,80). Maak pygame.font.Font(None,30). font.render(text, True, (240,240,240)) geeft een aparte afbeelding terug; die tekent niet op de scène. Gebruik canvas.blit(label, (12,12)) vóór je canvas teruggeeft. Het voorbeeld roept je functie met een label aan en toont de Surface die je teruggeeft. Het lettertypesysteem is al gestart; behoud font.init voor afzonderlijke tests.",
    ],
    rule: [
      "render makes an image; blit places it on another image.",
      "render maakt een afbeelding; blit plaatst die op een andere afbeelding.",
    ],
    example:
      "import pygame\ncanvas = pygame.Surface((20,20))\ncanvas.fill((0,0,0))\nmarker = pygame.Surface((3,3))\nmarker.fill((255,0,0))\ncanvas.blit(marker,(4,5))\nprint(tuple(canvas.get_at((4,5)))[:3])",
    output: "(255, 0, 0)\n",
    predict: [
      "Which Surface changes when blit runs?",
      "Welke Surface verandert wanneer blit draait?",
    ],
    preview: { draw: 'screen.blit(game.labelled("Ready to play"),(200,160))' },
    starter:
      "pygame.font.init()\ndef labelled(text):\n    canvas = pygame.Surface((240,70))\n    canvas.fill((20,40,80))\n    # Render text, then place its Surface here.\n    return canvas\n",
    solution:
      "pygame.font.init()\ndef labelled(text):\n    canvas = pygame.Surface((240,70))\n    canvas.fill((20,40,80))\n    font = pygame.font.Font(None,30)\n    label = font.render(text,True,(240,240,240))\n    canvas.blit(label,(12,12))\n    return canvas\n",
    tasks: [
      {
        name: "labelled",
        task: [
          "Complete labelled(text) with the font, colours, dimensions and placement above. Render the supplied text and blit it onto canvas.",
          "Maak labelled(text) af met het bovenstaande lettertype, kleuren, afmetingen en plaatsing. Teken de gegeven tekst en kopieer die naar canvas.",
        ],
        help: [
          "Keep the background fill first. Store render's returned Surface, then blit it onto canvas.",
          "Houd de achtergrondvulling vooraan. Bewaar de Surface uit render en kopieer die daarna naar canvas.",
        ],
        fragment: "canvas.blit(label, (12,12))",
        cases: ["Ready", "2 : 9", ""].map((text) => [
          [text],
          "_return.get_size() == (240,70) and (lambda expected: (expected.fill((20,40,80)), expected.blit(_module.pygame.font.Font(None,30).render(_args[0],True,(240,240,240)),(12,12)), _module.pygame.image.tobytes(_return,'RGB') == _module.pygame.image.tobytes(expected,'RGB'))[-1])(_module.pygame.Surface((240,70)))",
        ]),
      },
    ],
    change: [
      "After passing, move the label and try a different text. Explain why returning the label alone would lose the scene background.",
      "Verplaats na slagen het label en probeer andere tekst. Leg uit waarom alleen het label teruggeven de scèneachtergrond verliest.",
    ],
    explain: [
      "The canvas is the whole scene. The label is a smaller Surface copied into it at a coordinate pair; the caller displays the combined image.",
      "Het canvas is de hele scène. Het label is een kleinere Surface die op een coördinatenpaar erin wordt gekopieerd; de aanroeper toont de gecombineerde afbeelding.",
    ],
  }),
];
