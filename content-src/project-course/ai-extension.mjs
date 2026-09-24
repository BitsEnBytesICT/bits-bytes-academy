import { L } from "./authoring.mjs";
import { pongProject } from "./projects.mjs";

export const aiExtension = {
  ...pongProject,
  id: "python-v2-pong-ai",
  group: "python-v2-pong-ai",
  optional: true,
  title: L(
    "Optional: a computer opponent",
    "Optioneel: een computertegenstander",
  ),
  estimatedMinutes: 60,
  continueFrom: "python-v2-pong-project",
  explanation: L(
    "Extend your own Pong with a computer-controlled paddle. Use “Copy my Pong” to start from your saved project, including all helper files. This creates an independent copy; your two-player version stays yours to revisit. Choose your own design and mark the extension complete when you are satisfied. No automated checker or mandatory function names are involved.",
    "Breid je eigen Pong uit met een computergestuurde paddle. Gebruik “Kopieer mijn Pong” om te beginnen met je opgeslagen project, inclusief alle hulpbestanden. Dit maakt een onafhankelijke kopie; je tweespelerversie blijft beschikbaar. Kies je eigen ontwerp en markeer de uitbreiding als afgerond wanneer je tevreden bent. Er zijn geen automatische checker of verplichte functienamen.",
  ),
  milestones: [
    {
      id: "tracking",
      title: L("Let it choose a direction", "Laat hem een richting kiezen"),
      description: L(
        "Replace one player’s input with a decision based on the ball and paddle positions. Start with a simple follower you can explain.",
        "Vervang de invoer van één speler door een beslissing op basis van bal- en paddleposities. Begin met een eenvoudige volger die je kunt uitleggen.",
      ),
      hints: [
        L(
          "Compare the target with the paddle centre.",
          "Vergelijk het doel met het paddlemiddelpunt.",
        ),
        L(
          "The controller can produce the same direction values as your keyboard controls.",
          "De besturing kan dezelfde richtingswaarden leveren als je toetsenbordbesturing.",
        ),
        L(
          "A small difference near the centre can count as “stay still” to avoid jitter.",
          "Een klein verschil bij het middelpunt kan “blijf stil” betekenen om trillen te vermijden.",
        ),
      ],
    },
    {
      id: "fairness",
      title: L("Make it beatable", "Maak hem verslaanbaar"),
      description: L(
        "Limit its speed and consider when it should react. Test whether a human has a fair chance rather than making it teleport to every ball.",
        "Beperk zijn snelheid en bedenk wanneer hij reageert. Test of een mens een eerlijke kans heeft in plaats van de paddle naar elke bal te laten teleporteren.",
      ),
      hints: [
        L(
          "A computer can obey the same movement limits as a player.",
          "Een computer kan dezelfde bewegingsgrenzen volgen als een speler.",
        ),
        L(
          "Try a slower maximum speed or a delay between decisions.",
          "Probeer een lagere maximumsnelheid of vertraging tussen beslissingen.",
        ),
        L(
          "Keep actual movement time-based even if decisions update less often.",
          "Houd de beweging tijdsafhankelijk, ook als beslissingen minder vaak worden bijgewerkt.",
        ),
      ],
    },
    {
      id: "playtest",
      title: L(
        "Compare two difficulty settings",
        "Vergelijk twee moeilijkheidsinstellingen",
      ),
      description: L(
        "Choose two configurations, play both, and note what makes each feel easier or harder. Keep a way to return to two-player control if you want.",
        "Kies twee instellingen, speel beide en noteer wat elke instelling makkelijker of moeilijker maakt. Behoud desgewenst een manier om terug te gaan naar tweespelerbesturing.",
      ),
      hints: [
        L(
          "Change one design variable at a time.",
          "Verander één ontwerpvariabele tegelijk.",
        ),
        L(
          "Test serves, corners, long rallies, and a ball moving away from the computer.",
          "Test services, hoeken, lange rally’s en een bal die van de computer af beweegt.",
        ),
        L(
          "A short note about what you changed helps you compare later versions.",
          "Een korte notitie over je wijziging helpt latere versies vergelijken.",
        ),
      ],
    },
  ],
  suggestedTests: [
    L(
      "Try the centre, the top and bottom edges, and a fast diagonal ball.",
      "Probeer het midden, boven- en onderranden en een snelle diagonale bal.",
    ),
    L(
      "Check that the computer stays inside the court and respects its speed limit.",
      "Controleer dat de computer binnen het veld blijft en zijn snelheidslimiet respecteert.",
    ),
    L(
      "Restart after a win and switch focus away from and back to the preview.",
      "Herstart na winst en verplaats de focus van het voorbeeld weg en terug.",
    ),
  ],
  references: ["python-v2-pong-project", "python-v2-9-02", "python-v2-9-03"],
};
