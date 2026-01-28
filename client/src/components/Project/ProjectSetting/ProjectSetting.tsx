import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Flex, Space, Tooltip, Typography, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ICreateProject } from "../../../types/IProjectState";
import { getProjectDetails, updateProject } from "../../../utils/ProjectUtil";
import EditableText from "../../Common/EditableField/EditableText";
import FieldRow from "../../Common/FieldRow";
import ProjectDeleteModal from "./ProjectDeleteModal";
import ProjectMemberManager from "./ProjectMemberManager";
import "./ProjectSetting.css";

const { Title, Text } = Typography;

const ProjectSetting = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: projectDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectDetails(projectId || ""),
    enabled: !!projectId,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      updatedFields,
    }: {
      updatedFields: Partial<ICreateProject>;
    }) => updateProject(projectId || "", updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      message.success("Project updated successfully");
    },
  });

  if (isLoading) return <div>Loading project...</div>;
  if (isError) return <div>Failed to load project</div>;
  if (!projectDetail) return <div>No project found</div>;

  return (
    <Content className="project-setting-container">
      <Space
        direction="vertical"
        size="large"
        className="project-setting-space"
      >
        {/* Header */}
        <Flex align="center" gap={16} className="project-setting-header">
          <Tooltip title="Back">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="project-back-btn"
              onClick={() => navigate(-1)}
            />
          </Tooltip>
          <Title level={2} className="project-setting-title">
            Project Settings
          </Title>
        </Flex>

        {/* Project Details */}
        <Card title="Project Details" className="project-setting-card">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <FieldRow label="Name">
              <EditableText
                value={projectDetail.name}
                onSave={(newName) =>
                  updateMutation.mutate({ updatedFields: { name: newName } })
                }
                renderView={(value) => (
                  <Title level={3} style={{ margin: 0 }}>
                    {value}
                  </Title>
                )}
              />
            </FieldRow>

            <FieldRow label="Description">
              <EditableText
                value={projectDetail.description}
                onSave={(newDescription) =>
                  updateMutation.mutate({
                    updatedFields: { description: newDescription },
                  })
                }
                renderView={(value) => <Text>{value}</Text>}
              />
            </FieldRow>

            <FieldRow label="Owner">
              <Text className="project-setting-owner">
                {projectDetail.owner.name}
              </Text>
            </FieldRow>
          </Space>
        </Card>

        {/* Members */}
        <Card title="Members" className="project-setting-card">
          <ProjectMemberManager projectId={projectId || ""} />
        </Card>

        {/* Danger Zone */}
        <div className="project-setting-danger">
          <ProjectDeleteModal />
        </div>
      </Space>
    </Content>
  );
};

export default ProjectSetting;
