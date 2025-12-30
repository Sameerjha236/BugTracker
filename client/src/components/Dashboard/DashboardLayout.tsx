import { Col, Flex, Row } from "antd";
import { lazy, Suspense } from "react";
import { getProjectsForUser } from "../../utils/ProjectUtil";
import CardLoader from "../Common/CardLoader";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/storeHook";
import type { IProjectState } from "../../types/IProjectState";

const ProjectCard = lazy(() => import("./ProjectCard"));
const NewProject = lazy(() => import("./NewProject"));

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
    <Flex vertical gap={10}>
      <Flex justify="flex-end">
        <Suspense fallback={<div>Loading...</div>}>
          <NewProject />
        </Suspense>
      </Flex>
      <Row gutter={[16, 16]}>
        {projects?.map((project: IProjectState) => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.projectId}>
            <Suspense fallback={<CardLoader />}>
              <ProjectCard {...project} />
            </Suspense>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default DashboardLayout;
