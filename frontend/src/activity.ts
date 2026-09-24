import type { Activity, Project, ProjectStage } from "../../shared/types";

export const isProject = (
  activity: Activity,
): activity is Project | ProjectStage =>
  activity.kind === "project" || activity.kind === "project-stage";

export const workspaceActivityId = (activity: Activity) =>
  activity.kind === "project-stage" ? activity.projectId : activity.id;
