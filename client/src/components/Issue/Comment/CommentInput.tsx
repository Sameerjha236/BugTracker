import { Form, Input, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentToIssue } from "../../../utils/CommentUtil";
import { useAppSelector } from "../../../hooks/storeHook";
import "./Comments.css";

const { TextArea } = Input;

interface CommentFormValues {
  comment: string;
}

interface CommentInputProps {
  issueId: string;
}

const CommentInput = ({ issueId }: CommentInputProps) => {
  const {
    userInfo: { userId },
  } = useAppSelector((state) => state.user);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (comment: string) =>
      postCommentToIssue(issueId, comment, userId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", issueId],
      });
      form.resetFields();
    },
  });

  const onFinish = (values: CommentFormValues) => {
    mutate(values.comment);
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ width: "100%" }}>
      <Form.Item
        name="comment"
        rules={[{ required: true, message: "Please enter a comment" }]}
      >
        <TextArea
          rows={3}
          placeholder="Add a comment..."
          disabled={isPending}
          className="CommentInputArea"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="CommentSubmitButton"
        >
          Post Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentInput;
