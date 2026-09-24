export type Language = "en" | "nl";
export type Localized = { en: string; nl: string };
export type CheckInput =
  | string
  | number
  | boolean
  | null
  | CheckInput[]
  | { [key: string]: CheckInput };
export interface BehaviorProbe {
  /** Grade declared fixture data independently of generated learner files. */
  isolatedFixtures?: boolean;
  /** Load definitions without running an optional interactive demonstration. */
  definitionsOnly?: boolean;
  /** Prompt wording is not part of this behaviour contract. */
  ignorePrompts?: boolean;
  /** Test a reusable module without starting the interactive main.py loop. */
  moduleOnly?: boolean;
  files?: Record<string, string>;
  inputs?: Record<string, CheckInput>;
  stdin?: string[];
  call?: {
    module?: string;
    name: string;
    args?: CheckInput[];
    kwargs?: Record<string, CheckInput>;
  };
  check: string;
}
export interface Checkpoint {
  id: string;
  task: Localized;
  hint: Localized;
  hints?: Localized[];
  check: string;
  expectedError?: string;
  feedback?: Localized;
  probes?: BehaviorProbe[];
  cases?: {
    inputs: Record<string, CheckInput>;
    check: string;
  }[];
}
export interface LessonSection {
  role?: "teaching" | "experiment" | "practice";
  exampleInputs?: string[];
  exampleFiles?: Record<string, string>;
  heading: Localized;
  body: Localized;
  code?: string;
  output?: string;
  takeaway?: Localized;
  prediction?: Localized;
  codeLanguage?: "python" | "shell";
  callout?: { title: Localized; body: Localized };
}
export interface Exercise {
  checkpointMode?: "sequential" | "all-at-once";
  retrievals?: {
    id: string;
    sourceActivityId: string;
    objectiveIds: string[];
    prompt: Localized;
    code?: string;
  }[];
  estimatedMinutes: number;
  id: string;
  chapter: number;
  group: string;
  title: Localized;
  kind: "reading" | "coding" | "challenge";
  runtime?: "terminal" | "pygame";
  guidance?: "guided" | "adapt" | "independent";
  presentation?: "workspace" | "article";
  optional: boolean;
  explanation: Localized;
  example: string;
  sections?: LessonSection[];
  files: Record<string, string>;
  solution: Record<string, string>;
  checkpoints: Checkpoint[];
  solutionNote: Localized;
  inputs?: string[];
}
export interface Project extends Omit<Exercise, "kind" | "checkpoints"> {
  kind: "project";
  continueFrom?: string;
  checkpoints: [];
  milestones: {
    id: string;
    title: Localized;
    description: Localized;
    hints: Localized[];
  }[];
  suggestedTests: Localized[];
  manualTests?: { input: Localized; expected: Localized }[];
  references: string[];
}
export interface ProjectStage extends Omit<Project, "kind"> {
  kind: "project-stage";
  projectId: string;
}
export interface Question {
  id: string;
  prompt: Localized;
  code?: string;
  choices: { id: string; label: Localized; reason: Localized }[];
  answer: string;
  objectiveIds?: string[];
  reviewActivityIds?: string[];
  category?: "prediction" | "completion" | "debugging" | "application";
  codeBlank?: {
    prompt: Localized;
    segments: string[];
    tokens: { id: string; code: string; reason?: Localized }[];
    blanks: { answer: string; reason: Localized }[];
    output: string;
  };
}
export interface Quiz {
  estimatedMinutes: number;
  id: string;
  chapter: number;
  group: string;
  title: Localized;
  kind: "quiz";
  optional: boolean;
  questions: Question[];
  alternateQuestions?: Question[];
}
export type Activity = Exercise | Quiz | Project | ProjectStage;
export interface Chapter {
  number: number;
  slug: string;
  title: Localized;
  outcome: string;
  outcomes?: Localized[];
  activityIds: string[];
  pathId?: string;
}
export interface Course {
  version: number;
  chapters: Chapter[];
  activities: Activity[];
  paths?: {
    id: string;
    title: Localized;
    description: Localized;
    chapterNumbers: number[];
    projectId: string;
  }[];
  availability?: "available";
  description?: Localized;
  reviewMinutes?: [number, number];
  groups: {
    id: string;
    chapter: number;
    title: Localized;
    activityIds: string[];
  }[];
}
export interface CourseSummary {
  slug: string;
  title: string;
  status: "available" | "coming-soon";
  estimatedHours: number | null;
  description: Localized;
  topics: Localized[];
}
export interface Progress {
  complete: boolean;
  assisted?: boolean;
  checkpoints?: string[];
  score?: number;
  best?: number;
}
export interface Workspace {
  files: Record<string, string>;
  revision: number;
  project?: { milestones: string[] };
  quiz?: {
    index: number;
    orders: string[][];
    answers: Record<string, string>;
    finished: boolean;
    attempt: number;
    format?: 2;
    formId?: "a" | "b";
    placements?: Record<string, (string | null)[]>;
  };
}
export interface State {
  progress: Record<string, Progress>;
  settings: { language?: Language; lastActivity?: string };
  unlocks: string[];
}
