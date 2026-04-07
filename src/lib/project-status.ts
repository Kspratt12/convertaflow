/**
 * Project status state machine.
 *
 * The DB stores a single status string. The order is the canonical
 * lifecycle. Each status has a label, percent-complete, and a tone.
 */

export type ProjectStatus =
  | "not_started"
  | "onboarding_in_progress"
  | "onboarding_submitted"
  | "planning"
  | "in_progress"
  | "milestone_25"
  | "milestone_50"
  | "milestone_75"
  | "revision_round"
  | "final_review"
  | "delivered"
  | "completed";

export interface ProjectStatusInfo {
  id: ProjectStatus;
  label: string;
  shortLabel: string;
  description: string;
  percent: number;
  /** Tone for the badge color */
  tone: "neutral" | "blue" | "purple" | "amber" | "emerald";
}

export const PROJECT_STATUSES: ProjectStatusInfo[] = [
  { id: "not_started", label: "Not started", shortLabel: "Not started", description: "Your project is created but hasn't kicked off yet.", percent: 0, tone: "neutral" },
  { id: "onboarding_in_progress", label: "Onboarding in progress", shortLabel: "Onboarding", description: "You're filling out your project questionnaire.", percent: 5, tone: "blue" },
  { id: "onboarding_submitted", label: "Onboarding submitted", shortLabel: "Submitted", description: "Our team is reviewing everything you sent us.", percent: 15, tone: "blue" },
  { id: "planning", label: "Planning", shortLabel: "Planning", description: "We're mapping out structure, content, and strategy.", percent: 25, tone: "purple" },
  { id: "in_progress", label: "In progress", shortLabel: "Building", description: "Your build is actively underway.", percent: 35, tone: "purple" },
  { id: "milestone_25", label: "25% complete", shortLabel: "25%", description: "We've finished the first quarter of the build.", percent: 25, tone: "purple" },
  { id: "milestone_50", label: "50% complete", shortLabel: "50%", description: "We're halfway through your build.", percent: 50, tone: "purple" },
  { id: "milestone_75", label: "75% complete", shortLabel: "75%", description: "Final stretch — almost ready for review.", percent: 75, tone: "purple" },
  { id: "revision_round", label: "Revision round", shortLabel: "Revisions", description: "You're reviewing the build and we're applying changes.", percent: 85, tone: "amber" },
  { id: "final_review", label: "Final review", shortLabel: "Final review", description: "Last look before we hand it over.", percent: 95, tone: "amber" },
  { id: "delivered", label: "Delivered", shortLabel: "Delivered", description: "Your project is delivered and live.", percent: 100, tone: "emerald" },
  { id: "completed", label: "Completed", shortLabel: "Completed", description: "Project wrapped — your portal stays open for changes and uploads.", percent: 100, tone: "emerald" },
];

const STATUS_BY_ID = Object.fromEntries(
  PROJECT_STATUSES.map((s) => [s.id, s])
) as Record<ProjectStatus, ProjectStatusInfo>;

export function getStatusInfo(status: string | null | undefined): ProjectStatusInfo {
  if (!status) return STATUS_BY_ID.not_started;
  return STATUS_BY_ID[status as ProjectStatus] || STATUS_BY_ID.not_started;
}

export function getStatusPercent(status: string | null | undefined): number {
  return getStatusInfo(status).percent;
}

/** Stages shown on the visual timeline (not every status — milestones collapse) */
export const TIMELINE_STAGES: ProjectStatus[] = [
  "onboarding_in_progress",
  "onboarding_submitted",
  "planning",
  "in_progress",
  "revision_round",
  "final_review",
  "delivered",
  "completed",
];

export function timelinePosition(status: string | null | undefined): number {
  const info = getStatusInfo(status);
  // Milestones collapse into "in_progress" on the visual timeline
  if (info.id === "milestone_25" || info.id === "milestone_50" || info.id === "milestone_75") {
    return TIMELINE_STAGES.indexOf("in_progress");
  }
  const idx = TIMELINE_STAGES.indexOf(info.id);
  return idx >= 0 ? idx : 0;
}

/** Whether the project is in a state where the client can request changes */
export function canRequestRevisions(status: string | null | undefined): boolean {
  const id = getStatusInfo(status).id;
  return id === "revision_round" || id === "final_review" || id === "delivered" || id === "completed";
}

/** Whether the project is delivered/completed (post-launch state) */
export function isPostLaunch(status: string | null | undefined): boolean {
  const id = getStatusInfo(status).id;
  return id === "delivered" || id === "completed";
}
