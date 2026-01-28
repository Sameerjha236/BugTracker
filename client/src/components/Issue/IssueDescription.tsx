import { Card, Typography } from "antd";
import type { IIssue } from "../../types/IIssueState";
import EditableTextWithButton from "../Common/EditableField/EditableTextWithButton";

type IssueDescriptionProps = {
  issue: IIssue;
  mutate: (params: { updatedFields: Partial<IIssue> }) => void;
};

const IssueDescription = ({ issue, mutate }: IssueDescriptionProps) => {
  const handleSaveDescription = (newDescription: string) => {
    mutate({ updatedFields: { description: newDescription } });
  };

  return (
    <Card className="IssueDescriptionCard" title="Description">
      <EditableTextWithButton
        value={issue.description || ""}
        onSave={handleSaveDescription}
        renderView={(value) => (
          <Typography.Paragraph className="IssueDescriptionText">
            {value || "No description provided."}
          </Typography.Paragraph>
        )}
      />
    </Card>
  );
};

export default IssueDescription;
