import { Card, Flex, Typography } from "antd";
import type { IUserProject } from "../../types/IUserState";
import { Link } from "react-router-dom";

const { Title } = Typography;

const ProjectCard = (project: IUserProject) => {
  return (
    <Link to={`/project/${project.projectId}`}>
      <Card hoverable>
        <Flex vertical gap={6}>
          <Title level={5} style={{ margin: 0 }}>
            {project.name}
          </Title>
          {/* <Text>Owned by: {project.owner}</Text> */}
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
