import { useEffect, useState } from "react";
import { Input, Button, Space, Typography } from "antd";
import "./Edit.css";

type EditableTextWithButtonProps = {
  value: string;
  onSave: (value: string) => void;
  renderView: (value: string) => React.ReactNode;
};

const EditableTextWithButton = ({
  value,
  onSave,
  renderView,
}: EditableTextWithButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    if (temp !== value) onSave(temp);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTemp(value);
    setIsEditing(false);
  };

  return (
    <div className="EditableTextWithButtonContainer">
      {isEditing ? (
        <>
          <Input.TextArea
            autoFocus
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            rows={4}
          />
          <Space>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </>
      ) : (
        <Typography.Paragraph onClick={() => setIsEditing(true)}>
          {renderView(value)}
        </Typography.Paragraph>
      )}
    </div>
  );
};

export default EditableTextWithButton;
