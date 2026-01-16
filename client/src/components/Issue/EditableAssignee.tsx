import { Space, Tag, Button } from "antd";
import { useState } from "react";
import SearchAndSelect from "../Common/EditableField/SearchAndSelect";
import { Content } from "antd/es/layout/layout";

type EditableAssigneeProps = {
  assigneeName: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearch: (value: string) => Promise<any>;
  handleSelect: (userId: string) => void;
};

const EditableAssignee = ({
  assigneeName,
  handleSearch,
  handleSelect,
}: EditableAssigneeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const onUserSelected = (userId: string) => {
    handleSelect(userId);
    setIsEditing(false);
  };

  return (
    <Content style={{ minHeight: "32px" }}>
      {isEditing ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <SearchAndSelect
            handleSearch={handleSearch}
            handleSelect={onUserSelected}
            queryKey={["project-user-search"]}
          />
          <Button danger size="small" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Space>
      ) : (
        <Tag
          color="green"
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer", padding: "4px 8px" }}
        >
          Assignee: <strong>{assigneeName || "Unassigned"}</strong>
        </Tag>
      )}
    </Content>
  );
};

export default EditableAssignee;
