import { Space, Typography } from "antd";
import "./Field.css";

const { Text } = Typography;

type FieldRowProps = {
  label: string;
  children: React.ReactNode;
};

const FieldRow = ({ label, children }: FieldRowProps) => (
  <Space className="FieldRowContainer" align="start">
    <Text className="FieldRowLabel">{label}</Text>
    <div className="FieldRowContent">{children}</div>
  </Space>
);

export default FieldRow;
