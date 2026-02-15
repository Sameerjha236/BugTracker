import { App, Button, Flex, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { registerUserThunk } from "../../store/userSlice";
import type { RegisterFormFields } from "../../types/FormFields";

const { Text } = Typography;

type RegisterFormProps = {
  setLogin: (login: boolean) => void;
};

const RegisterForm = ({ setLogin }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<RegisterFormFields>();
  const { loading } = useAppSelector((state) => state.user);
  const { message } = App.useApp();

  const onFinish: FormProps<RegisterFormFields>["onFinish"] = async (
    values,
  ) => {
    try {
      await dispatch(registerUserThunk(values)).unwrap();

      message.success("Registered successfully! Please log in.");
      form.resetFields();
      setLogin(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err || "Registration failed");
    }
  };

  return (
    <Flex vertical align="center" gap={16} className="authForm">
      <Text strong style={{ fontSize: "1.2rem" }}>
        Register a new account
      </Text>

      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%", maxWidth: 350 }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input size="large" />
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]} // ensures it watches the 'password' field
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Register
        </Button>
      </Form>
    </Flex>
  );
};

export default RegisterForm;
