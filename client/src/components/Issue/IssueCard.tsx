import { Card, Flex, Tag, Typography } from "antd";
import type { IIssueSummary } from "../../types/IIssueState";
import { Link } from "react-router-dom";
import { statusColors, priorityColors } from "../../ Constants";
import "./IssueCard.css";

const { Text, Title } = Typography;

const IssueCard = (issue: IIssueSummary) => {
  return (
    <Card hoverable className="IssueCard">
      <Link to={`/issue/${issue.issueId}`} className="IssueCardLink">
        <Flex vertical className="IssueCardContent" gap={6}>
          <Title level={5} className="IssueCardTitle">
            {issue.title}
          </Title>

          <Flex gap={8} wrap>
            <Tag color={statusColors[issue.status]} className="IssueCardTag">
              {issue.status.toUpperCase()}
            </Tag>
            <Tag
              color={priorityColors[issue.priority]}
              className="IssueCardTag"
            >
              {issue.priority.toUpperCase()}
            </Tag>
          </Flex>

          <Text className="IssueCardDate">
            Created: {new Date(issue.createdAt).toLocaleDateString()}
          </Text>
        </Flex>
      </Link>
    </Card>
  );
};

export default IssueCard;
