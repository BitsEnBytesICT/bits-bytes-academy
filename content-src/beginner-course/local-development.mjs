import { localDevelopment as earlier } from "../complete-course/local-development.mjs";
export const localDevelopment = {
  ...structuredClone(earlier),
  id: "python-v4-24-local-development",
  chapter: 24,
  group: "python-v4-module-24",
  requiredConcepts: [],
  topicIds: [],
};
localDevelopment.sections[3].exampleInputs = ["Ada"];
localDevelopment.sections[3].output = "Your name: Hello, Ada!\n";
localDevelopment.sections[4].body.en +=
  "\n\nIf you see >>>, you are inside Python rather than the shell. Type exit() and press Enter before running a command such as python -m pip install pygame-ce.";
localDevelopment.sections[4].body.nl +=
  "\n\nZie je >>>, dan zit je in Python in plaats van de shell. Typ exit() en druk op Enter voordat je een opdracht zoals python -m pip install pygame-ce uitvoert.";
