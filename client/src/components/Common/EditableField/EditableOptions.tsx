import { useState, useRef } from "react";
import { Select, Space, Tag } from "antd";
import "./Edit.css";

type EditableOptionsProps = {
  value: string;
  color?: string;
  options: { label: string; value: string }[];
  onChange: (newValue: string) => void;
};

const EditableOptions = ({
  value,
  color,
  options,
  onChange,
}: EditableOptionsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    setIsEditing(false);
  };

  const toggleEdit = () => setIsEditing(true);
  const closeEdit = () => setIsEditing(false);

  return (
    <Space className="EditableOptionsContainer">
      {isEditing ? (
        <Select
          ref={selectRef}
          defaultOpen
          size="small"
          style={{ minWidth: 120 }}
          defaultValue={value}
          options={options}
          onChange={handleValueChange}
          onBlur={closeEdit}
          autoFocus
        />
      ) : (
        <Tag
          onClick={toggleEdit}
          color={color}
          style={{ cursor: "pointer", margin: 0 }}
        >
          {value.toUpperCase()}
        </Tag>
      )}
    </Space>
  );
};

export default EditableOptions;
