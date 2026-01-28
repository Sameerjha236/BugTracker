import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getIssueForProject } from "../../utils/IssueUtil";
import { Col, Flex, Row } from "antd";
import CardLoader from "../Common/CardLoader";
import type { IIssueSummary } from "../../types/IIssueState";
import "./Project.css";

const ProjectHeader = lazy(() => import("./ProjectHeader"));
const IssueCard = lazy(() => import("../Issue/IssueCard"));

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

  if (isError)
    return <Flex className="project-empty-state">Something went wrong</Flex>;

  return (
    <section className="project-layout">
      <Suspense fallback={<div>Loading Project Header...</div>}>
        <ProjectHeader projectId={projectId || ""} />
      </Suspense>

      <Row gutter={[16, 16]} className="project-issues-grid">
        {issues.map((issue: IIssueSummary) => (
          <Col xs={24} sm={12} md={8} lg={6} key={issue.issueId}>
            <Suspense fallback={<CardLoader />}>
              <IssueCard {...issue} />
            </Suspense>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProjectLayout;
