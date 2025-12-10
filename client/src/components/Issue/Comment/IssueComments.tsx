import { Card, Flex, Space, Typography, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import CommentInput from "./CommentInput";
import CardLoader from "../../Common/CardLoader";
import { getCommentsForIssue } from "../../../utils/CommentUtil";
import type { IComment } from "../../../types/ICommentState";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

interface IssueCommentsProps {
  issueId: string;
}

const IssueComments = ({ issueId }: IssueCommentsProps) => {
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", issueId],
    queryFn: () => getCommentsForIssue(issueId),
    enabled: !!issueId,
  });

  if (isLoading) return <CardLoader />;
  if (isError) return <Flex>Something went wrong</Flex>;

  return (
    <Card title="Comments" styles={{ body: { padding: "16px" } }}>
      <CommentInput issueId={issueId} />

      {comments.length === 0 && <Text type="secondary">No comments yet.</Text>}

      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginTop: 16 }}
      >
        {comments.map((comment: IComment) => (
          <Card
            key={comment.commentId}
            size="small"
            styles={{ body: { padding: "12px 16px" } }}
          >
            <Flex align="start" gap={12}>
              <Avatar>{comment.userId.charAt(0).toUpperCase()}</Avatar>

              <Flex vertical style={{ width: "100%" }}>
                <Flex justify="space-between" align="center">
                  <Text strong>{comment.userId}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {dayjs(comment.createdAt).format("DD MMM YYYY, HH:mm")}
                  </Text>
                </Flex>

                <Paragraph style={{ marginTop: 4 }}>{comment.text}</Paragraph>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Space>
    </Card>
  );
};

export default IssueComments;
