import { Space, Tag, Button } from "antd";
import { useState } from "react";
import SearchAndSelect from "../Common/EditableField/SearchAndSelect";
import { Content } from "antd/es/layout/layout";
import type { IUserInfo } from "../../types/IUserState";

type EditableAssigneeProps = {
  assigneeName: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearch: (value: string) => Promise<any>;
  handleSelect: (user: IUserInfo) => void;
};

const EditableAssignee = ({
  assigneeName,
  handleSearch,
  handleSelect,
}: EditableAssigneeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const onUserSelected = (user: IUserInfo) => {
    handleSelect(user);
    setIsEditing(false);
  };

  return (
    <Content style={{ minHeight: "32px" }}>
      {isEditing ? (
        <Space direction="vertical" style={{ width: "30%" }}>
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
          className="TagCursor"
          onClick={() => setIsEditing(true)}
        >
          Assignee: <strong>{assigneeName || "Unassigned"}</strong>
        </Tag>
      )}
    </Content>
  );
};

export default EditableAssignee;
