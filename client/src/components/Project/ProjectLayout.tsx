import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getIssueForProject } from "../../utils/IssueUtil";
import { Col, Row, Typography, Spin } from "antd";
import CardLoader from "../Common/CardLoader";
import type { IIssueSummary } from "../../types/IIssueState";
import "./Project.css";

const IssueCard = lazy(() => import("../Issue/IssueCard"));
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

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", "issues", projectId],
    queryFn: () => getIssueForProject(projectId || ""),
    enabled: !!projectId,
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

  return (
    <section className="project-layout">
      <Suspense fallback={<Spin tip="Loading Project Header..." />}>
        <ProjectHeader projectId={projectId || ""} />
      </Suspense>

      <Row gutter={16} className="kanban-board">
        {statuses.map((status) => (
          <Col xs={24} sm={12} md={8} lg={4} key={status}>
            <div className="kanban-column">
              <Typography.Title level={5} className="kanban-title">
                {status.toUpperCase()} ({issuesByStatus[status].length})
              </Typography.Title>
              <div className="kanban-issues">
                {issuesByStatus[status].length === 0 ? (
                  <div className="empty-column">No issues</div>
                ) : (
                  issuesByStatus[status].map((issue) => (
                    <Suspense fallback={<CardLoader />} key={issue.issueId}>
                      <IssueCard {...issue} />
                    </Suspense>
                  ))
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProjectLayout;
