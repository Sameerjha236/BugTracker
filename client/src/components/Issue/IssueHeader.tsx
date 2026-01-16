import { Card, Typography, Space, Flex, Button } from "antd";
import type { IIssue } from "../../types/IIssueState";
import EditableText from "../Common/EditableField/EditableText";
import IssueActions from "./IssueActions";
import EditableOptions from "../Common/EditableField/EditableOptions";
import {
  priorityColors,
  priorityOptions,
  statusColors,
  statusOptions,
} from "../../ Constants";
import EditableAssignee from "./EditableAssignee";
import { updateIssue } from "../../utils/IssueUtil";
import { getAllMembers } from "../../utils/ProjectUtil";

type IssueHeaderProps = {
  issue: IIssue;
  mutate: (params: { updatedFields: Partial<IIssue> }) => void;
};

const IssueHeader = ({ issue, mutate }: IssueHeaderProps) => {
  const handleTitleSave = (newTitle: string) => {
    mutate({ updatedFields: { title: newTitle } });
  };

  const handleStatusChange = (newStatus: string) => {
    mutate({ updatedFields: { status: newStatus as IIssue["status"] } });
  };

  const handlePriorityChange = (newPriority: string) => {
    mutate({ updatedFields: { priority: newPriority as IIssue["priority"] } });
  };

  const statusColor = statusColors[issue.status];
  const priorityColor = priorityColors[issue.priority];

  const handleSelect = async (query: string) => {
    updateIssue(issue.issueId, { assigneeId: query });
  };

  const handleSearch = async (query: string) => {
    const data = await getAllMembers(issue.projectId, query);
    return data;
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Space>
            <EditableOptions
              value={issue.status}
              options={statusOptions}
              onChange={handleStatusChange}
              color={statusColor}
            />
            <EditableOptions
              value={issue.priority}
              options={priorityOptions}
              onChange={handlePriorityChange}
              color={priorityColor}
            />
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
        <EditableAssignee
          assigneeName={issue.assignee?.name || null}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
        />

        <Button
          onClick={() => {
            console.log(issue);
            getAllMembers(issue.projectId, "");
          }}
        >
          check
        </Button>
      </Space>
    </Card>
  );
};

export default IssueHeader;
