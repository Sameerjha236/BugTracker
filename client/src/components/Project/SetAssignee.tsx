import { Space, Button, Form, Input, Typography, Flex } from "antd";
import { useState } from "react";
import SearchAndSelect from "../Common/EditableField/SearchAndSelect";
import type { IUserInfo } from "../../types/IUserState";

const { Text } = Typography;

type SetAssigneeProps = {
  projectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearch: (value: string) => Promise<any>;
};

const SetAssignee = ({ projectId, handleSearch }: SetAssigneeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const form = Form.useFormInstance();

  const onUserSelected = (user: IUserInfo) => {
    form.setFieldsValue({ assigneeId: user.userId });
    setDisplayName(user?.name || null);
    setIsEditing(false);
  };

  return (
    <Form.Item label="Assignee" required>
      <Flex vertical gap={4}>
        {isEditing ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            <SearchAndSelect
              handleSearch={handleSearch}
              handleSelect={onUserSelected}
              queryKey={["project-user-search", projectId]}
            />
            <Button
              type="link"
              danger
              size="small"
              onClick={() => setIsEditing(false)}
              style={{ padding: 0 }}
            >
              Cancel
            </Button>
          </Space>
        ) : (
          <Flex
            align="center"
            onClick={() => setIsEditing(true)}
            className="setAssigneeBox"
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#4096ff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#d9d9d9")
            }
          >
            <Text style={{ color: displayName ? "inherit" : "#bfbfbf" }}>
              {displayName || "Select a user..."}
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Hidden field for form validation */}
      <Form.Item
        name="assigneeId"
        noStyle
        rules={[{ required: true, message: "Please select an assignee" }]}
      >
        <Input type="hidden" />
      </Form.Item>
    </Form.Item>
  );
};

export default SetAssignee;
