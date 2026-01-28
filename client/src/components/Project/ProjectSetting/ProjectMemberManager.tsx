import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Flex,
  List,
  Popconfirm,
  Space,
  Typography,
  message,
} from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import type { IUserInfo } from "../../../types/IUserState";
import {
  addProjectMember,
  getAllMembers,
  removeProjectMember,
  searchUsersToAdd,
} from "../../../utils/ProjectUtil";
import AddMemberInline from "./AddMemberInline";

const { Title, Text } = Typography;

type ProjectMemberManagerProps = { projectId: string };

const ProjectMemberManager = ({ projectId }: ProjectMemberManagerProps) => {
  const queryClient = useQueryClient();

  const {
    data: projectMembers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", projectId, "members"],
    queryFn: () => getAllMembers(projectId, ""),
    enabled: !!projectId,
  });

  const addMemberMutation = useMutation({
    mutationFn: (userId: string) => addProjectMember(projectId, userId),
    onSuccess: () => {
      message.success("Member added");
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "members"],
      });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) => removeProjectMember(projectId, userId),
    onSuccess: () => {
      message.success("Member removed");
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "members"],
      });
    },
  });

  const handleSearch = async (value: string) =>
    searchUsersToAdd(projectId, value);

  if (isError) return <Text type="danger">Failed to load members</Text>;

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Flex justify="space-between" align="center">
        <Title level={4} style={{ margin: 0 }}>
          Members
        </Title>

        <AddMemberInline
          projectId={projectId}
          handleSearch={handleSearch}
          onAdd={(userId) => addMemberMutation.mutate(userId)}
        />
      </Flex>

      <div className="project-members-list">
        <List
          loading={isLoading}
          dataSource={projectMembers}
          locale={{ emptyText: "No members found" }}
          renderItem={(member: IUserInfo) => (
            <List.Item
              actions={[
                <Popconfirm
                  key="remove"
                  title="Remove member?"
                  description="This user will be removed from the project."
                  okText="Remove"
                  okButtonProps={{ danger: true }}
                  onConfirm={() =>
                    member.userId && removeMemberMutation.mutate(member.userId)
                  }
                >
                  <Button danger type="text" icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={member.name}
                description={member.email}
              />
            </List.Item>
          )}
        />
      </div>
    </Space>
  );
};

export default ProjectMemberManager;
