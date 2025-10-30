import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import CreateIssue from "./CreateIssue";
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
    return <Card loading style={{ width: "80%" }} />;
  }

  if (isError) return <Flex>Something went wrong</Flex>;

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        padding: "12px 20px",
        background: "#fff",
        borderRadius: 8,
        marginBottom: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Back Button */}
      <Tooltip title="Back">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
      </Tooltip>

      {/* Project Title */}
      <Title level={4} style={{ margin: 0, textAlign: "center" }}>
        {projectDetail?.name}
      </Title>

      {/* Right-side buttons */}
      <Flex align="center" gap={8}>
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
