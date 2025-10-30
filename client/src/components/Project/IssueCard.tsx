import { Card, Flex, Tag, Typography } from "antd";
import type { IIssueSummary } from "../../types/IIssueState";
import { statusColors, priorityColors } from "../../ Constants";

const { Text, Title } = Typography;

const IssueCard = (issue: IIssueSummary) => {
  return (
    <Card hoverable>
      <Flex vertical gap={6}>
        <Title level={5} style={{ margin: 0 }}>
          {issue.title}
        </Title>

        <Flex gap={8} wrap>
          <Tag color={statusColors[issue.status]}>
            {issue.status.toUpperCase()}
          </Tag>
          <Tag color={priorityColors[issue.priority]}>
            {issue.priority.toUpperCase()}
          </Tag>
        </Flex>

        <Text type="secondary" style={{ fontSize: 12 }}>
          Created: {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </Flex>
    </Card>
  );
};

export default IssueCard;
