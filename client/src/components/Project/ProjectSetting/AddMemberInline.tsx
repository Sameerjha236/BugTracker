import { Button, Space } from "antd";
import { useState } from "react";
import SearchAndSelect from "../../Common/EditableField/SearchAndSelect";
import type { IUserInfo } from "../../../types/IUserState";
import CardLoader from "../../Common/CardLoader";

type AddMemberInlineProps = {
  projectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearch: (value: string) => Promise<any>;
  onAdd: (userId: string) => void;
  isLoading?: boolean;
};

const AddMemberInline = ({
  projectId,
  handleSearch,
  onAdd,
  isLoading,
}: AddMemberInlineProps) => {
  const [isAdding, setIsAdding] = useState(false);

  if (isLoading) {
    return <CardLoader />;
  }
  if (!isAdding) {
    return (
      <Button type="dashed" onClick={() => setIsAdding(true)}>
        + Add member
      </Button>
    );
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SearchAndSelect
        handleSearch={handleSearch}
        handleSelect={(user: IUserInfo) => {
          if (user.userId) {
            onAdd(user.userId);
            setIsAdding(false);
          }
        }}
        queryKey={["project-user-search", projectId]}
      />

      <Button
        type="link"
        danger
        onClick={() => setIsAdding(false)}
        style={{ padding: 0 }}
      >
        Cancel
      </Button>
    </Space>
  );
};

export default AddMemberInline;
