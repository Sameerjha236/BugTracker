import { Button, Card, Flex, Tag, Typography } from "antd";
import type { IIssueSummary } from "../../types/IIssueState";
import { useNavigate } from "react-router-dom";
import { HolderOutlined } from "@ant-design/icons";
import "./IssueCard.css";
import { useDraggable } from "@dnd-kit/core";
import { statusColors, priorityColors } from "../../ Constants";
import type { CSSProperties } from "react";

const { Text, Title } = Typography;

const IssueCard = (issue: IIssueSummary) => {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: issue.issueId,
    });

  const style: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 50 : undefined,
    position: isDragging ? "relative" : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      hoverable
      className="IssueCard"
      onClick={() => navigate(`/issue/${issue.issueId}`)}
    >
      {/* 🔹 Top bar */}
      <Flex justify="flex-end">
        <Button
          size="small"
          className="drag-handle"
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
        >
          <HolderOutlined />
        </Button>
      </Flex>

      <Flex vertical className="IssueCardContent" gap={8}>
        <Title level={5} className="IssueCardTitle">
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

        <Text className="IssueCardDate">
          Created: {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </Flex>
    </Card>
  );
};

export default IssueCard;
