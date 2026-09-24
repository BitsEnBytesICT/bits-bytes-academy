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
