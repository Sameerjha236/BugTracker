import { lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout, Flex, Space, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getIssueDetail, updateIssue } from "../../utils/IssueUtil";
import CardLoader from "../Common/CardLoader";
import type { ICreateIssue } from "../../types/IIssueState";
import "./Issue.css";

const IssueHeader = lazy(() => import("./IssueHeader"));
const IssueDescription = lazy(() => import("./IssueDescription"));
const IssueComments = lazy(() => import("./Comment/IssueComments"));

const { Content } = Layout;

const IssueLayout = () => {
  const { id: issueId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: issueDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issue", issueId],
    queryFn: () => getIssueDetail(issueId!),
    enabled: !!issueId,
  });

  const { mutate } = useMutation({
    mutationFn: ({ updatedFields }: { updatedFields: Partial<ICreateIssue> }) =>
      updateIssue(issueId!, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
      message.success("Issue updated");
    },
  });

  if (isLoading) return <CardLoader />;
  if (isError)
    return <Flex className="IssueMessage">Something went wrong</Flex>;
  if (!issueDetail) return <Flex className="IssueMessage">No issue found</Flex>;

  return (
    <Suspense fallback={<CardLoader />}>
      <Layout className="IssueLayout">
        <Content className="IssueContent">
          <Space direction="vertical" className="IssueSpace">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="BackButton"
            >
              Back to Issues
            </Button>

            <IssueHeader issue={issueDetail} mutate={mutate} />
            <IssueDescription issue={issueDetail} mutate={mutate} />
            <IssueComments issueId={issueId!} />
          </Space>
        </Content>
      </Layout>
    </Suspense>
  );
};

export default IssueLayout;
