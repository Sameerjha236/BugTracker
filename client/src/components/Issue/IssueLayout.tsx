import { useParams } from "react-router-dom";
import { getIssueDetail } from "../../utils/IssueUtil";
import { useQuery } from "@tanstack/react-query";
import { Layout, Flex, Space } from "antd";
import CardLoader from "../Common/CardLoader";
import { lazy, Suspense } from "react";

const IssueHeader = lazy(() => import("./IssueHeader"));
const IssueDescription = lazy(() => import("./IssueDescription"));
const IssueComments = lazy(() => import("./Comment/IssueComments"));
const IssueSidebar = lazy(() => import("./IssueSidebar"));

const { Content, Sider } = Layout;

const IssueLayout = () => {
  const { id: issueId } = useParams<{ id: string }>();

  const {
    data: issueDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issue", issueId],
    queryFn: () => getIssueDetail(issueId || ""),
    enabled: !!issueId,
  });

  if (isLoading) return <CardLoader />;
  if (isError) return <Flex>Something went wrong</Flex>;
  if (!issueDetail) return <Flex>No issue found</Flex>;

  return (
    <Suspense fallback={<CardLoader />}>
      <Layout style={{ padding: 24, gap: 24 }}>
        <Content>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <IssueHeader issue={issueDetail} />
            <IssueDescription issue={issueDetail} />
            <IssueComments issueId={issueId!} />
          </Space>
        </Content>

        <Sider width={320} theme="light">
          <IssueSidebar issue={issueDetail} />
        </Sider>
      </Layout>
    </Suspense>
  );
};

export default IssueLayout;
