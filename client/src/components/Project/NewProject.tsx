import { Button, Flex, Modal, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

const NewProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Flex>
      <Button type="primary" onClick={handleOpenModal}>
        New Project
      </Button>
      <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null}>
        <Text>Yo bro</Text>
      </Modal>
    </Flex>
  );
};

export default NewProject;
