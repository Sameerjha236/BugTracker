import { Space, Typography } from "antd";

const { Text } = Typography;

const FieldRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Space
    style={{ width: "100%", justifyContent: "space-between" }}
    align="start"
  >
    <Text type="secondary" style={{ width: 160 }}>
      {label}
    </Text>
    <div style={{ flex: 1 }}>{children}</div>
  </Space>
);

export default FieldRow;
