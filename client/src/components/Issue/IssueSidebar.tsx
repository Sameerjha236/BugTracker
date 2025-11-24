import { Card, Space, Typography } from "antd";

const IssueSidebar = ({ issue }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Details">
        <Typography.Paragraph>
          <b>Created:</b> {new Date(issue.createdAt).toLocaleString()}
        </Typography.Paragraph>
      </Card>

      <Card title="Project Info">
        <Typography.Paragraph>
          <b>Project ID:</b> {issue.projectId}
        </Typography.Paragraph>
      </Card>
    </Space>
  );
};

export default IssueSidebar;
