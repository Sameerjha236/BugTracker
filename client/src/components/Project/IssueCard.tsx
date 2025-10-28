import type { IIssueSummary } from "../../types/IIssueState";

const IssueCard = (issue: IIssueSummary) => {
  return <div>{issue.title}</div>;
};

export default IssueCard;
