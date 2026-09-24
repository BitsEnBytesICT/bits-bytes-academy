import { L, S } from "./authoring.mjs";
export const localDevelopment = {
  id: "python-v3-local-development",
  chapter: 17,
  group: "python-v3-module-17",
  kind: "reading",
  presentation: "article",
  optional: false,
  estimatedMinutes: 30,
  title: L("Python on your own computer", "Python op je eigen computer"),
  explanation: L(
    "You can now read, change and build small Python programs. Set up a local project, then choose one useful or enjoyable idea of your own. Follow these steps in your local editor. There is no required third project. Your own idea is outside the course time estimate.",
    "Je kunt nu kleine Python-programma’s lezen, veranderen en bouwen. Stel een lokaal project in en kies daarna zelf één nuttig of leuk idee. Volg deze stappen in je lokale editor. Er is geen verplicht derde project. Je eigen idee valt buiten de geschatte cursustijd.",
  ),
  example: "",
  files: {},
  solution: {},
  checkpoints: [],
  solutionNote: L(
    "Use the official setup guides when your system differs.",
    "Gebruik de officiële installatiegidsen als je systeem afwijkt.",
  ),
  sections: [
    S(
      [],
      ["1. Install the tools", "1. Installeer de hulpmiddelen"],
      [
        "Install a current Python 3 release from [python.org](https://www.python.org/downloads/), [Visual Studio Code](https://code.visualstudio.com/) and Microsoft’s Python extension from VS Code’s Extensions view. VS Code is the editor; Python is the interpreter that executes your program. Follow the [official VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial). On Windows, the Python installer/manager may provide both python and py commands; open a new terminal after installation. On macOS/Linux the command is commonly python3.",
        "Installeer een actuele Python 3-versie via [python.org](https://www.python.org/downloads/), [Visual Studio Code](https://code.visualstudio.com/) en Microsofts Python-extensie via de extensieweergave van VS Code. VS Code is de editor; Python is de interpreter die je programma uitvoert. Volg de [officiële VS Code-Pythonhandleiding](https://code.visualstudio.com/docs/python/python-tutorial). Op Windows kan de Python-installer/-beheerder zowel python als py leveren; open na installatie een nieuwe terminal. Op macOS/Linux is het commando meestal python3.",
      ],
    ),
    S(
      [],
      ["2. Open a project folder", "2. Open een projectmap"],
      [
        "Create a folder such as PythonProjects/my-first-tool. In VS Code choose File → Open Folder and select it. Keep code and its data files together. Browser lesson files do not automatically become local files: copy the code you want into local files with the same names. Save a course backup before leaving your browser work; that backup is an app data export, not a ready-to-run Python project. Start with a small main.py rather than copying the whole course.",
        "Maak een map zoals PythonProjects/my-first-tool. Kies in VS Code File → Open Folder en selecteer die. Houd code en gegevensbestanden bij elkaar. Browserlesbestanden worden niet vanzelf lokale bestanden: kopieer gewenste code naar lokale bestanden met dezelfde namen. Bewaar een cursusback-up voordat je browserwerk verlaat; die back-up is appgegevens, geen direct uitvoerbaar Python-project. Begin met een klein main.py in plaats van de hele cursus te kopiëren.",
      ],
    ),
    S(
      [],
      [
        "3. Create and select an environment",
        "3. Maak en selecteer een omgeving",
      ],
      [
        "Open the Command Palette (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on macOS), run Python: Create Environment, choose Venv and select your installed Python. This creates a .venv folder for this project’s packages. Run Python: Select Interpreter and choose that environment if needed. Open a new integrated terminal after selecting it. The [environment guide](https://code.visualstudio.com/docs/python/environments) covers activation differences. If shell activation is blocked, you can run the environment’s interpreter directly without changing system execution policy. Windows command below; macOS/Linux uses .venv/bin/python instead.",
        "Open het opdrachtpalet (Ctrl+Shift+P op Windows/Linux, Cmd+Shift+P op macOS), voer Python: Create Environment uit, kies Venv en selecteer de geïnstalleerde Python. Dit maakt een .venv-map voor pakketten van dit project. Voer zo nodig Python: Select Interpreter uit en kies die omgeving. Open na selecteren een nieuwe geïntegreerde terminal. De [omgevingsgids](https://code.visualstudio.com/docs/python/environments) behandelt activeringsverschillen. Als shellactivering geblokkeerd is, kun je de omgevingsinterpreter direct uitvoeren zonder systeembeleid te veranderen. Hieronder het Windows-commando; macOS/Linux gebruikt .venv/bin/python.",
      ],
      ".\\.venv\\Scripts\\python.exe --version",
    ),
    S(
      [],
      [
        "4. Save and run a Python file",
        "4. Bewaar en voer een Python-bestand uit",
      ],
      [
        "Create main.py, type the small program below and save it (Ctrl+S / Cmd+S). Use Run Python File in Terminal, normally the play button in the editor. The terminal should show your message. To run explicitly from the project folder on Windows, use .\\.venv\\Scripts\\python.exe main.py. On macOS/Linux use .venv/bin/python main.py. After changing code, save and run again. Relative data filenames are resolved from the working folder where Python is started.",
        "Maak main.py, typ het kleine programma hieronder en sla het op (Ctrl+S / Cmd+S). Gebruik Run Python File in Terminal, meestal de afspeelknop in de editor. De terminal moet je bericht tonen. Gebruik op Windows vanuit de projectmap expliciet .\\.venv\\Scripts\\python.exe main.py. Gebruik op macOS/Linux .venv/bin/python main.py. Sla na codewijzigingen op en voer opnieuw uit. Relatieve gegevensbestandsnamen worden opgelost vanaf de werkmap waarin Python is gestart.",
      ],
      'name = input("Your name: ")\nprint(f"Hello, {name}!")',
    ),
    S(
      [],
      [
        "5. Install a package when you need it",
        "5. Installeer een pakket als je het nodig hebt",
      ],
      [
        "For Pong, install pygame-ce into this project’s selected environment. The command below is a terminal/shell command, not a line for main.py or a Python >>> prompt. In an activated terminal, python -m pip install pygame-ce is equivalent; using the interpreter path makes the target environment explicit. On macOS/Linux use .venv/bin/python -m pip install pygame-ce. The Python import name remains import pygame. Standard modules such as csv, json and decimal need no separate pip installation. The browser’s display setup is course-specific; locally, start from the [pygame-ce quick start](https://pyga.me/docs/) and open a native window. The supplied async loop can remain, but browser preview controls do not exist locally.",
        "Installeer voor Pong pygame-ce in de geselecteerde projectomgeving. Het commando hieronder is een terminal-/shellcommando, geen regel voor main.py of een Python- >>>-prompt. In een geactiveerde terminal is python -m pip install pygame-ce gelijkwaardig; het interpreterpad maakt de doelomgeving expliciet. Gebruik op macOS/Linux .venv/bin/python -m pip install pygame-ce. De Python-importnaam blijft import pygame. Standaardmodules zoals csv, json en decimal vereisen geen aparte pip-installatie. De browserweergave is cursusspecifiek; begin lokaal bij de [pygame-ce-snelstart](https://pyga.me/docs/) en open een eigen venster. De meegeleverde async-lus mag blijven, maar browservoorbeeldknoppen bestaan lokaal niet.",
      ],
      ".\\.venv\\Scripts\\python.exe -m pip install pygame-ce",
    ),
    S(
      [],
      ["6. Start one idea of your own", "6. Begin aan één eigen idee"],
      [
        "Choose something useful or enjoyable: a reading log, a small puzzle, a practice timer or your own game. Write one sentence describing who it helps and one small behaviour you can make work today. Build that first, try an ordinary and a boundary input, then choose the next improvement. You do not need to finish a third assigned project to complete this course. You are ready to turn an idea into a small working program and grow it from there.",
        "Kies iets nuttigs of leuks: een leeslogboek, kleine puzzel, oefentimer of eigen spel. Schrijf één zin over wie het helpt en één klein gedrag dat je vandaag werkend kunt maken. Bouw dat eerst, probeer gewone en grensinvoer en kies daarna de volgende verbetering. Je hoeft geen derde opgelegd project af te maken om deze cursus te voltooien. Je bent klaar om van een idee een klein werkend programma te maken en het verder uit te bouwen.",
      ],
    ),
  ],
};
localDevelopment.sections[2].codeLanguage = "shell";
localDevelopment.sections[4].codeLanguage = "shell";
const closing = localDevelopment.sections[5];
closing.callout = {
  title: L("Quick troubleshooting", "Snel problemen oplossen"),
  body: L(
    "No interpreter → install Python, restart VS Code and select it.\n\nWrong environment → select .venv and open a new terminal.\n\nOld output → save the file and confirm you ran the correct path.\n\nModuleNotFoundError → install the package with that same interpreter’s -m pip.\n\nA >>> prompt → leave Python before entering shell commands.",
    "Geen interpreter → installeer Python, herstart VS Code en selecteer die.\n\nVerkeerde omgeving → kies .venv en open een nieuwe terminal.\n\nOude uitvoer → sla het bestand op en controleer het uitgevoerde pad.\n\nModuleNotFoundError → installeer het pakket met -m pip van diezelfde interpreter.\n\nEen >>>-prompt → verlaat Python voordat je shellcommando’s invoert.",
  ),
};
