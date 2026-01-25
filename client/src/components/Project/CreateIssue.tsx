import {
  App,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  type FormProps,
} from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateIssue } from "../../types/IIssueState";
import { createIssue } from "../../utils/IssueUtil";
import { statusOptions, priorityOptions } from "../../ Constants";
import { getAllMembers } from "../../utils/ProjectUtil";
import SetAssignee from "./SetAssignee";

type CreateIssueFormFields = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: string;
};

//   "assigneeId": "dc253b49-c465-48a2-9234-1fe318d2bdc9",

const CreateIssue = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CreateIssueFormFields>();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (newIssue: ICreateIssue) => createIssue(newIssue),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", "issues", projectId],
      });
      message.success("New Issue created");
      form.resetFields();
      handleCloseModal();
    },
  });

  const onFinish: FormProps<CreateIssueFormFields>["onFinish"] = (values) => {
    const data: ICreateIssue = { ...values, projectId };
    mutate(data);
  };

  const handleSearch = async (query: string) => {
    return await getAllMembers(projectId, query);
  };

  return (
    <Flex>
      <Button type="primary" onClick={handleOpenModal}>
        New Issue
      </Button>
      <Modal
        title="Create New Issue"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose // Important: resets SetAssignee state when modal closes
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea size="large" rows={3} />
          </Form.Item>

          <Flex gap="small">
            <Form.Item
              name="status"
              label="Status"
              style={{ flex: 1 }}
              rules={[{ required: true }]}
            >
              <Select size="large" options={statusOptions} />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              style={{ flex: 1 }}
              rules={[{ required: true }]}
            >
              <Select size="large" options={priorityOptions} />
            </Form.Item>
          </Flex>

          {/* New Clean Component */}
          <SetAssignee projectId={projectId} handleSearch={handleSearch} />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isPending}
            >
              Create Issue
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default CreateIssue;
