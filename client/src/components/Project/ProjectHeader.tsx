import { Suspense } from "react";
import CreateIssue from "./CreateIssue";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetails } from "../../utils/ProjectUtil";
import { Card, Flex, Typography } from "antd";

type ProjectHeaderProps = {
  projectId: string;
};

const { Text } = Typography;

const ProjectHeader = ({ projectId }: ProjectHeaderProps) => {
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
    <>
      <Text>{projectDetail?.name}</Text>
      <Suspense fallback={<div>Loading Create Issue...</div>}>
        <CreateIssue projectId={projectId} />
      </Suspense>
    </>
  );
};

export default ProjectHeader;
