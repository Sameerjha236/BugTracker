import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Button, Modal, message, Typography } from "antd";
import { useState } from "react";
import { deleteProject, getProjectRole } from "../../utils/ProjectUtil";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHook";
import CardLoader from "../Common/CardLoader";

const ProjectDeleteModal = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    userInfo: { userId },
  } = useAppSelector((state) => state.user);

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["project", projectId, "role"],
    queryFn: () => getProjectRole(projectId!, userId!),
    enabled: !!projectId && !!userId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(projectId || ""),
    onSuccess: () => {
      message.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/", { replace: true });
    },
  });

  if (roleLoading) return <CardLoader />;
  const isDisabled = role !== "admin";

  return (
    <>
      <Card title="Danger Zone" styles={{ header: { color: "#ff4d4f" } }}>
        <Button
          danger
          disabled={isDisabled}
          onClick={() => setOpenDeleteModal(true)}
        >
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
        <Typography.Text>
          Are you sure you want to delete this project?
          <br />
          <strong>This action cannot be undone.</strong>
        </Typography.Text>
      </Modal>
    </>
  );
};

export default ProjectDeleteModal;
