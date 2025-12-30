import type { IUserInfo } from "./IUserState";

export type IIssue = {
  issueId: string;
  projectId: string;
  title: string;
  description: string;
  status: "open" | "in progress" | "resolved" | "in review" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: IUserInfo;
  createdAt: string;
};

export type IIssueSummary = {
  issueId: string;
  title: string;
  status: "open" | "in progress" | "resolved" | "in review" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: string;
};

export type ICreateIssue = {
  projectId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: string;
};
