import { Card, Input, Button, Space, Typography } from "antd";

const { Text } = Typography;
const IssueComments = ({ issueId }) => {
  return (
    <Card title="Comments">
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <Text>No comments yet.</Text>

        <Input.TextArea rows={3} placeholder="Add a comment..." />

        <Button type="primary">Post Comment</Button>
      </Space>
    </Card>
  );
};

export default IssueComments;
