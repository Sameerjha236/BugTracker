import React, { useEffect } from "react";
import { App, Button, Flex, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { loginUserThunk } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import type { LoginFormFields } from "../../types/FormFields";

const { Text } = Typography;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormFields>();

  const { loading, loggedIn, error } = useAppSelector((state) => state.user);
  const { message } = App.useApp();

  // ✅ When the form is successfully submitted
  const onFinish: FormProps<LoginFormFields>["onFinish"] = async (values) => {
    await dispatch(loginUserThunk(values));
  };

  // ❌ When validation fails
  const onFinishFailed: FormProps<LoginFormFields>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation Failed:", errorInfo);
  };

  // ✅ Watch login state changes
  useEffect(() => {
    if (loggedIn) {
      message.success("Logged in successfully!");
      form.resetFields();
      navigate("/");
    } else if (error) {
      message.error(error);
    }
  }, [loggedIn, error, message, navigate, form]);

  return (
    <Flex vertical align="center" gap={16} className="authForm">
      <Text strong style={{ fontSize: "1.2rem" }}>
        Login to your account
      </Text>

      <Form
        form={form}
        name="login-form"
        layout="vertical"
        style={{ width: "100%", maxWidth: 350 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<LoginFormFields>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email address!" },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item<LoginFormFields>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginForm;
