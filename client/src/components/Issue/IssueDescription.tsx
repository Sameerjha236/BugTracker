import { Card, Typography } from "antd";
import type { IIssue } from "../../types/IIssueState";

const IssueDescription = ({ issue }: { issue: IIssue }) => {
  return (
    <Card title="Description">
      <Typography.Paragraph>
        {issue.description || "No description provided."}
      </Typography.Paragraph>
    </Card>
  );
};

export default IssueDescription;
