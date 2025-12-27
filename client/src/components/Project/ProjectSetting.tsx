import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Flex,
  message,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  deleteProject,
  getProjectDetails,
  updateProject,
} from "../../utils/ProjectUtil";
import type { ICreateProject } from "../../types/IProjectState";
import EditableText from "../Common/EditableField/EditableText";
import { useState } from "react";
import FieldRow from "../Common/FieldRow";

const { Title, Text } = Typography;

const ProjectSetting = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(projectId || ""),
    onSuccess: () => {
      message.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/", { replace: true });
    },
  });

  if (isLoading) return <div>Loading project...</div>;
  if (isError) return <div>Failed to load project</div>;
  if (!projectDetail) return <div>No project found</div>;

  return (
    <Content style={{ maxWidth: 900 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="start" align="center" gap={16}>
          <Tooltip title="Back">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
          </Tooltip>
          <Title level={2}>Project Settings</Title>
        </Flex>

        {/* Project Details */}
        <Card title="Project Details">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <FieldRow label="Name">
              <EditableText
                value={projectDetail.name}
                onSave={(newName) => {
                  updateMutation.mutate({ updatedFields: { name: newName } });
                }}
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
                onSave={(newDescription) => {
                  updateMutation.mutate({
                    updatedFields: { description: newDescription },
                  });
                }}
                renderView={(value) => (
                  <Text style={{ margin: 0 }}>{value}</Text>
                )}
              />
            </FieldRow>
          </Space>
        </Card>

        {/* Danger Zone */}
        <Card title="Danger Zone" styles={{ header: { color: "#ff4d4f" } }}>
          <Button danger onClick={() => setOpenDeleteModal(true)}>
            Delete Project
          </Button>
        </Card>
        <Modal
          title="Delete Project"
          open={openDeleteModal}
          onOk={() => deleteMutation.mutate()}
          onCancel={() => setOpenDeleteModal(false)}
          okText="Delete"
          okButtonProps={{
            danger: true,
          }}
        >
          <Text>
            Are you sure you want to delete this project?
            <br />
            <strong>This action cannot be undone.</strong>
          </Text>
        </Modal>
      </Space>
    </Content>
  );
};

export default ProjectSetting;
