import { useEffect, useState } from "react";
import { Input, Typography } from "antd";
import "./Edit.css";

type EditableTextProps = {
  value: string;
  onSave: (value: string) => void;
  renderView: (value: string) => React.ReactNode;
};

const EditableText = ({ value, onSave, renderView }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      if (temp !== value) onSave(temp);
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setTemp(value);
      setIsEditing(false);
    }
  };

  return (
    <div className="EditableTextContainer">
      {isEditing ? (
        <Input
          autoFocus
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Typography.Text onClick={() => setIsEditing(true)}>
          {renderView(value)}
        </Typography.Text>
      )}
    </div>
  );
};

export default EditableText;
