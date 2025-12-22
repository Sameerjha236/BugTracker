import { Card, Typography, Tag, Space, Flex } from "antd";
import type { IIssue } from "../../types/IIssueState";
import EditableText from "../Common/EditableField/EditableText";
import IssueActions from "./IssueActions";

type IssueHeaderProps = {
  issue: IIssue;
  mutate: (params: { updatedFields: Partial<IIssue> }) => void;
};

const IssueHeader = ({ issue, mutate }: IssueHeaderProps) => {
  const handleTitleSave = (newTitle: string) => {
    mutate({ updatedFields: { title: newTitle } });
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Space>
            <Tag color="blue">{issue.status}</Tag>
            <Tag color="red">{issue.priority}</Tag>
          </Space>
          <IssueActions />
        </Flex>

        <EditableText
          value={issue.title}
          onSave={handleTitleSave}
          renderView={(value) => (
            <Typography.Title level={3} style={{ margin: 0 }}>
              {value}
            </Typography.Title>
          )}
        />

        <Space>
          <Tag color="green">Assignee: {issue.assigneeId || "Unassigned"}</Tag>
        </Space>
      </Space>
    </Card>
  );
};

export default IssueHeader;
