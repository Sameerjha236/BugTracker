import { Card, Typography, Space, Flex } from "antd";
import type { IIssue, ICreateIssue } from "../../types/IIssueState";
import EditableText from "../Common/EditableField/EditableText";
import IssueActions from "./IssueActions";
import EditableOptions from "../Common/EditableField/EditableOptions";
import EditableAssignee from "./EditableAssignee";
import { getAllMembers } from "../../utils/ProjectUtil";
import type { IUserInfo } from "../../types/IUserState";
import {
  statusOptions,
  statusColors,
  priorityOptions,
  priorityColors,
} from "../../ Constants";

type IssueHeaderProps = {
  issue: IIssue;
  mutate: (params: { updatedFields: Partial<ICreateIssue> }) => void;
};

const IssueHeader = ({ issue, mutate }: IssueHeaderProps) => {
  const handleTitleSave = (title: string) => {
    mutate({ updatedFields: { title } });
  };

  const handleStatusChange = (status: string) => {
    mutate({ updatedFields: { status } });
  };

  const handlePriorityChange = (priority: string) => {
    mutate({ updatedFields: { priority } });
  };

  const handleSelect = (user: IUserInfo) => {
    if (!user.userId) return;

    mutate({
      updatedFields: {
        assigneeId: user.userId,
      },
    });
  };

  const handleSearch = async (query: string) => {
    return getAllMembers(issue.projectId, query);
  };

  return (
    <Card className="IssueHeaderCard">
      <Space direction="vertical" className="IssueHeaderSpace">
        {/* Status / Priority / Actions Row */}
        <Flex justify="space-between" className="IssueHeaderRow">
          <Space>
            <EditableOptions
              value={issue.status}
              options={statusOptions}
              onChange={handleStatusChange}
              color={statusColors[issue.status]}
            />
            <EditableOptions
              value={issue.priority}
              options={priorityOptions}
              onChange={handlePriorityChange}
              color={priorityColors[issue.priority]}
            />
          </Space>
          <IssueActions />
        </Flex>

        {/* Editable Title */}
        <EditableText
          value={issue.title}
          onSave={handleTitleSave}
          renderView={(value) => (
            <Typography.Title level={3} className="IssueHeaderTitle">
              {value}
            </Typography.Title>
          )}
        />

        {/* Assignee */}
        <EditableAssignee
          assigneeName={issue.assignee?.name || null}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
        />
      </Space>
    </Card>
  );
};

export default IssueHeader;
