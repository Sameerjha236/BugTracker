import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import CreateIssue from "./CreateIssue/CreateIssue";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetails } from "../../utils/ProjectUtil";
import { Card, Flex, Typography, Button, Tooltip } from "antd";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";

type ProjectHeaderProps = {
  projectId: string;
};

const { Title } = Typography;

const ProjectHeader = ({ projectId }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  const {
    data: projectDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectDetails(projectId || ""),
    enabled: !!projectId,
  });

  if (isLoading) {
    return <Card loading style={{ width: "100%" }} />;
  }

  if (isError) return <Flex>Something went wrong</Flex>;

  return (
    <Flex className="project-header">
      <Tooltip title="Back">
        <Button
          className="back-button"
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
      </Tooltip>

      <Title level={4} className="project-title">
        {projectDetail?.name}
      </Title>

      <Flex className="header-actions" align="center">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateIssue projectId={projectId} />
        </Suspense>

        <Tooltip title="Project Settings">
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => navigate(`/project/${projectId}/settings`)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default ProjectHeader;
