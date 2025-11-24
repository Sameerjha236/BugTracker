import { Card, Typography, Tag, Space, Button } from "antd";
import type { IIssue } from "../../types/IIssueState";

const IssueHeader = ({ issue }: { issue: IIssue }) => {
  return (
    <Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Tag color="blue">{issue.status}</Tag>
          <Tag color="red">{issue.priority}</Tag>
        </Space>

        <Typography.Title level={3} style={{ margin: 0 }}>
          {issue.title}
        </Typography.Title>

        <Space>
          <Tag color="green">Assignee: {issue.assigneeId || "Unassigned"}</Tag>
          <Button>Edit</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default IssueHeader;
