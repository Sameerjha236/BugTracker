import { Card, Col, Flex, Typography } from "antd";
import type { IUserProject } from "../../types/IUserState";
import { Link } from "react-router-dom";

const { Text } = Typography;

const ProjectCard = (project: IUserProject) => {
  return (
    <Col
      key={project.projectId}
      xs={24}
      sm={12}
      md={8}
      style={{ marginBottom: 16 }}
    >
      <Link to={`/project/${project.projectId}`}>
        <Card hoverable>
          <Flex vertical>
            <Text strong>{project.name}</Text>
            {/* <Text>Owned by: {project.owner}</Text> */}
          </Flex>
        </Card>
      </Link>
    </Col>
  );
};

export default ProjectCard;
