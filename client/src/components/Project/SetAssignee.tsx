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
      <Flex vertical gap={4} className="SetAssigneeContainer">
        {isEditing ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            {/* Search input for selecting user */}
            <SearchAndSelect
              handleSearch={handleSearch}
              handleSelect={onUserSelected}
              queryKey={["project-user-search", projectId]}
            />

            {/* Cancel button */}
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
          >
            {/* Placeholder if no user selected */}
            <Text
              data-selected={displayName ? "true" : "false"}
              style={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayName || "Select a user..."}
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Hidden input for form validation */}
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
