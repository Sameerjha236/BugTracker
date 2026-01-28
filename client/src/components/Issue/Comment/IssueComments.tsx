import { Card, Flex, Space, Typography, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import CommentInput from "./CommentInput";
import CardLoader from "../../Common/CardLoader";
import { getCommentsForIssue } from "../../../utils/CommentUtil";
import type { IComment } from "../../../types/ICommentState";
import dayjs from "dayjs";
import "./Comments.css";

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
    <Card className="IssueCommentsCard" title="Comments">
      <CommentInput issueId={issueId} />

      {comments.length === 0 && <Text type="secondary">No comments yet.</Text>}

      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginTop: 16 }}
      >
        {comments.map((comment: IComment) => (
          <Card key={comment.commentId} size="small" className="CommentCard">
            <Flex align="start" gap={12}>
              <Avatar className="CommentAvatar">
                {(comment.author?.name || "").charAt(0).toUpperCase()}
              </Avatar>

              <Flex vertical style={{ width: "100%" }}>
                <Flex justify="space-between" align="center">
                  <Text className="CommentAuthor">{comment.author?.name}</Text>
                  <Text className="CommentDate">
                    {dayjs(comment.createdAt).format("DD MMM YYYY, HH:mm")}
                  </Text>
                </Flex>

                <Paragraph className="CommentText">{comment.text}</Paragraph>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Space>
    </Card>
  );
};

export default IssueComments;
