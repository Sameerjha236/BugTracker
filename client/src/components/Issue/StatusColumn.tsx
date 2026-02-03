import { Typography } from "antd";
import { Suspense } from "react";
import CardLoader from "../Common/CardLoader";
import IssueCard from "./IssueCard";
import type { IIssueSummary } from "../../types/IIssueState";
import { useDroppable } from "@dnd-kit/core";

type StatusColumnProps = {
  status: IIssueSummary["status"];
  issues: IIssueSummary[];
};

const StatusColumn = ({ status, issues }: StatusColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="kanban-column">
      <Typography.Title level={5} className="kanban-title">
        {status.toUpperCase()} ({issues.length})
      </Typography.Title>

      <div className="kanban-issues">
        {issues.length === 0 ? (
          <div className="empty-column">No issues</div>
        ) : (
          issues.map((issue) => (
            <Suspense fallback={<CardLoader />} key={issue.issueId}>
              <IssueCard {...issue} />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;
