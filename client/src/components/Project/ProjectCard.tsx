import { Card, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import type { IProjectState } from "../../types/IProjectState";
import "./Project.css";
const { Title } = Typography;

const ProjectCard = (project: IProjectState) => {
  return (
    <Link to={`/project/${project.projectId}`} className="project-card-link">
      <Card hoverable className="project-card">
        <Flex vertical gap={6}>
          <Title level={5} style={{ margin: 0 }}>
            {project.name} yo
          </Title>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
