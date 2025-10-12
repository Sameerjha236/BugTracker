import { Button, Flex, Row } from "antd";
import { lazy, Suspense, useEffect, useState } from "react";
import { getProjectsForUser } from "../../utils/ProjectUtil";
import type { IUserProject } from "../../types/IUserState";
import CardLoader from "../Common/CardLoader";

const ProjectCard = lazy(() => import("./ProjectCard"));

const DashboardLayout = () => {
  const [projects, setProjects] = useState<IUserProject[]>([]);

  const fetchProjects = async () => {
    const response: IUserProject[] = getProjectsForUser("userId");
    setProjects(response);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Flex vertical gap={10}>
      <Flex justify="flex-end" style={{ width: "100%" }}>
        <Button type="primary">New Project</Button>
      </Flex>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {projects.map((project) => (
          <Suspense fallback={<CardLoader />} key={project.projectId}>
            <ProjectCard {...project} />
          </Suspense>
        ))}
      </Row>
    </Flex>
  );
};

export default DashboardLayout;
