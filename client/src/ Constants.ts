import type { IIssueSummary } from "./types/IIssueState";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const API_BASE_URL = `${backendUrl}/api`;

export const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in progress" },
  { label: "Closed", value: "closed" },
  { label: "Resolved", value: "resolved" },
  { label: "In Review", value: "in review" },
];

export const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

export const statusColors: Record<IIssueSummary["status"], string> = {
  open: "blue",
  "in progress": "gold",
  resolved: "green",
  "in review": "purple",
  closed: "red",
};

export const priorityColors: Record<IIssueSummary["priority"], string> = {
  low: "green",
  medium: "blue",
  high: "orange",
  critical: "red",
};
