import { App, Button, Flex, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { loginUserThunk } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import type { LoginFormFields } from "../../types/FormFields";

const { Text } = Typography;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormFields>();
  const { loading } = useAppSelector((state) => state.user);
  const { message } = App.useApp();

  const onFinish: FormProps<LoginFormFields>["onFinish"] = async (values) => {
    try {
      await dispatch(loginUserThunk(values)).unwrap();

      message.success("Logged in successfully!");
      form.resetFields();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err || "Login failed");
    }
  };

  return (
    <Flex vertical align="center" gap={16} className="authForm">
      <Text strong style={{ fontSize: "1.2rem" }}>
        Login to your account
      </Text>

      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%", maxWidth: 350 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
    </Flex>
  );
};

export default LoginForm;
