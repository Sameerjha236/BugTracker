import { App, Button, Flex, Form, Input, Modal, type FormProps } from "antd";

import { useState } from "react";
import type { CreateProjectFormFields } from "../../types/FormFields";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateProject } from "../../utils/ProjectUtil";
import type { ICreateProject } from "../../types/IProjectState";
import { useAppSelector } from "../../hooks/storeHook";

const NewProject = () => {
  const queryClient = useQueryClient();

  const {
    userInfo: { userId },
  } = useAppSelector((state) => state.user);

  const { message } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm<CreateProjectFormFields>();

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (newProject: ICreateProject) => handleCreateProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
      message.success("New Project created");
      form.resetFields();
      handleCloseModal();
    },
  });

  const onFinish: FormProps<CreateProjectFormFields>["onFinish"] = (values) => {
    const data: ICreateProject = { ...values, owner: userId || "" };
    mutate(data);
  };

  return (
    <Flex>
      <Button type="primary" onClick={handleOpenModal}>
        New Project
      </Button>
      <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null}>
        <Form
          form={form}
          name="create-Project-form"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<CreateProjectFormFields>
            label="Project Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your project name" },
            ]}
          >
            <Input size="large" placeholder="Enter Project name" />
          </Form.Item>
          <Form.Item<CreateProjectFormFields>
            label="Project Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter your project description",
              },
            ]}
          >
            <Input size="large" placeholder="Enter Project description" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isPending}
            >
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default NewProject;
