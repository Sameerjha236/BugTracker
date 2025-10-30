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
      >
        <Form
          form={form}
          name="create-issue-form"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<CreateIssueFormFields>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter issue title" }]}
          >
            <Input size="large" placeholder="Enter issue title" />
          </Form.Item>

          <Form.Item<CreateIssueFormFields>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter issue description" },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder="Enter issue description"
              rows={3}
            />
          </Form.Item>

          <Form.Item<CreateIssueFormFields>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              size="large"
              placeholder="Select issue status"
              options={statusOptions}
            />
          </Form.Item>

          <Form.Item<CreateIssueFormFields>
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select
              size="large"
              placeholder="Select issue priority"
              options={priorityOptions}
            />
          </Form.Item>

          <Form.Item<CreateIssueFormFields>
            label="Assignee ID"
            name="assigneeId"
            rules={[{ required: true, message: "Please enter assignee ID" }]}
          >
            <Input size="large" placeholder="Enter assignee user ID" />
          </Form.Item>

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
