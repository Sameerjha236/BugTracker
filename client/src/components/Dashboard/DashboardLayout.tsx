import { Col, Flex, Row } from "antd";
import { lazy, Suspense } from "react";
import { getProjectsForUser } from "../../utils/ProjectUtil";
import CardLoader from "../Common/CardLoader";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/storeHook";
import type { IProjectState } from "../../types/IProjectState";
import "./Dashboard.css";

const ProjectCard = lazy(() => import("../Project/ProjectCard"));
const NewProject = lazy(() => import("../Project/NewProject/NewProject"));

const DashboardLayout = () => {
  const {
    userInfo: { userId },
  } = useAppSelector((state) => state.user);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", userId],
    queryFn: () => getProjectsForUser(userId || ""),
    enabled: !!userId,
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

  return (
    <section className="dashboard">
      <Flex justify="space-between" align="center" className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your Projects</h1>
          <p className="dashboard-subtitle">
            Track progress, bugs, and team activity
          </p>
        </div>
        <Suspense fallback={null}>
          <NewProject />
        </Suspense>
      </Flex>

      <Row gutter={[16, 16]} className="dashboard-grid">
        {projects?.map((project: IProjectState) => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.projectId}>
            <Suspense fallback={<CardLoader />}>
              <ProjectCard {...project} />
            </Suspense>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default DashboardLayout;
