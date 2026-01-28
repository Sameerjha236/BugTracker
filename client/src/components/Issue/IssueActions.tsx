import { Menu, Modal } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteIssue } from "../../utils/IssueUtil";
import "./IssueActions.css";

type MenuItem = Required<MenuProps>["items"][number];

const IssueActions = () => {
  const { id: issueId } = useParams<{ id: string }>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => deleteIssue(issueId!),
    onSuccess: () => {
      setOpenDeleteModal(false);
      navigate(-1);
    },
  });

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "delete") setOpenDeleteModal(true);
  };

  const items: MenuItem[] = [
    {
      key: "delete",
      label: "Delete Issue",
      danger: true,
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        items={items}
        onClick={handleMenuClick}
        className="IssueActionsMenu"
      />
      <Modal
        title="Delete Issue"
        open={openDeleteModal}
        onOk={() => mutate()}
        onCancel={() => setOpenDeleteModal(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        className="IssueDeleteModal"
      >
        Are you sure you want to delete this issue?
        <br />
        This action cannot be undone.
      </Modal>
    </>
  );
};

export default IssueActions;
