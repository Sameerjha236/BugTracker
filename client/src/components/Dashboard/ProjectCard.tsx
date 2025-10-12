import { App, Card, Col, Flex, Typography } from "antd";
import type { IUserProject } from "../../types/IUserState";

const { Text } = Typography;

const ProjectCard = (project: IUserProject) => {
  const { message } = App.useApp();

  const handleClick = () => {
    message.info("Button clicked!");
  };
  return (
    <Col
      key={project.projectId}
      xs={24}
      sm={12}
      md={8}
      style={{ marginBottom: 16 }}
    >
      <Card onClick={handleClick} hoverable>
        <Flex vertical>
          <Text strong>{project.name}</Text>
          <Text>Owned by: {project.owner}</Text>
        </Flex>
      </Card>
    </Col>
  );
};

export default ProjectCard;
