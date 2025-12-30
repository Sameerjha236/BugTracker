import { Card, Flex, Typography } from "antd";

import { Link } from "react-router-dom";
import type { IProjectState } from "../../types/IProjectState";

const { Title } = Typography;

const ProjectCard = (project: IProjectState) => {
  return (
    <Link to={`/project/${project.projectId}`}>
      <Card hoverable>
        <Flex vertical gap={6}>
          <Title level={5} style={{ margin: 0 }}>
            {project.name}
          </Title>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
