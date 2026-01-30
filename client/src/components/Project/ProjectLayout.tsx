import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssueForProject, updateIssue } from "../../utils/IssueUtil";
import { message, Row, Spin } from "antd";
import CardLoader from "../Common/CardLoader";
import type { ICreateIssue, IIssueSummary } from "../../types/IIssueState";
import "./Project.css";
import { DndContext } from "@dnd-kit/core";

const StatusColumn = lazy(() => import("../Issue/StatusColumn"));
const ProjectHeader = lazy(() => import("./ProjectHeader"));

const statuses: IIssueSummary["status"][] = [
  "open",
  "in progress",
  "in review",
  "resolved",
  "closed",
];

const ProjectLayout = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", "issues", projectId],
    queryFn: () => getIssueForProject(projectId || ""),
    enabled: !!projectId,
  });

  const { mutate } = useMutation({
    mutationFn: ({
      issueId,
      updatedFields,
    }: {
      issueId: string;
      updatedFields: Partial<ICreateIssue>;
    }) => updateIssue(issueId, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", "issues", projectId],
      });
      message.success("Issue updated");
    },
  });

  if (isLoading) {
    return (
      <Row gutter={[16, 16]} className="project-loading">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <CardLoader key={i} />
          ))}
      </Row>
    );
  }

  if (isError) {
    return <div className="project-empty-state">Something went wrong</div>;
  }

  // Group issues by status
  const issuesByStatus: Record<string, IIssueSummary[]> = {};
  statuses.forEach((status) => {
    issuesByStatus[status] = issues.filter(
      (issue: IIssueSummary) => issue.status === status,
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const issueId = event.active.id;
    const updatedStatus = event.over.id;

    console.log("Dragged issue:", issueId, "to status:", updatedStatus);
    mutate({
      issueId,
      updatedFields: { status: updatedStatus },
    });
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <section className="project-layout">
          <Suspense fallback={<Spin tip="Loading Project Header..." />}>
            <ProjectHeader projectId={projectId || ""} />
          </Suspense>
          <Row gutter={16} className="kanban-board">
            {statuses.map((status) => {
              const filteredIssues = issues.filter(
                (issue: IIssueSummary) => issue.status === status,
              );

              return (
                <Suspense fallback={<Spin tip="Loading Issues..." />}>
                  <StatusColumn
                    key={status}
                    status={status}
                    issues={filteredIssues}
                  />
                </Suspense>
              );
            })}
          </Row>
        </section>
      </DndContext>
    </>
  );
};

export default ProjectLayout;
