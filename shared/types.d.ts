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
  inputs?: Record<string, CheckInput>;
  stdin?: string[];
  call?: {
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
  heading: Localized;
  body: Localized;
  code?: string;
  output?: string;
  takeaway?: Localized;
}
export interface Exercise {
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
  checkpoints: [];
  milestones: {
    id: string;
    title: Localized;
    description: Localized;
    hints: Localized[];
  }[];
  suggestedTests: Localized[];
  references: string[];
}
export interface Question {
  id: string;
  prompt: Localized;
  code?: string;
  choices: { id: string; label: Localized; reason: Localized }[];
  answer: string;
  codeBlank?: {
    prompt: Localized;
    segments: string[];
    tokens: { id: string; code: string }[];
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
}
export type Activity = Exercise | Quiz | Project;
export interface Chapter {
  number: number;
  slug: string;
  title: Localized;
  outcome: string;
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
    placements?: Record<string, (string | null)[]>;
  };
}
export interface State {
  progress: Record<string, Progress>;
  settings: { language?: Language; lastActivity?: string };
  unlocks: string[];
}
