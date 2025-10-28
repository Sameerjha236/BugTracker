import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getIssueForProject } from "../../utils/IssueUtil";
import { Col, Flex, Row } from "antd";
import CardLoader from "../Common/CardLoader";
import type { IIssueSummary } from "../../types/IIssueState";

const ProjectHeader = lazy(() => import("./ProjectHeader"));
const IssueCard = lazy(() => import("./IssueCard"));

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
      <Row gutter={[16, 16]}>
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <CardLoader key={i} />
          ))}
      </Row>
    );
  }

  if (isError) return <Flex>Something went wrong</Flex>;

  console.info("yo", issues);
  return (
    <>
      <Suspense fallback={<div>Loading Project Header...</div>}>
        <ProjectHeader projectId={projectId || ""} />
      </Suspense>

      {issues.map((issue: IIssueSummary) => (
        <Col xs={24} sm={12} md={8} lg={6} key={issue.issueId}>
          <Suspense fallback={<CardLoader />}>
            <IssueCard {...issue} />
          </Suspense>
        </Col>
      ))}
    </>
  );
};

export default ProjectLayout;
