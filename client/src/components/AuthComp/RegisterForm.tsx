import React, { useEffect } from "react";
import { App, Button, Flex, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { registerUserThunk } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import type { RegisterFormFields } from "../../types/FormFields";

const { Text } = Typography;

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterFormFields>();

  const { loading, loggedIn, error } = useAppSelector((state) => state.user);
  const { message } = App.useApp();

  const onFinish: FormProps<RegisterFormFields>["onFinish"] = async (
    values
  ) => {
    await dispatch(registerUserThunk(values));
  };

  const onFinishFailed: FormProps<RegisterFormFields>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation Failed:", errorInfo);
  };

  useEffect(() => {
    if (loggedIn) {
      message.success("Registered successfully! Please log in.");
      form.resetFields();
      navigate("/");
    } else if (error) {
      message.error(error);
    }
  }, [loggedIn, error, message, navigate, form]);

  return (
    <Flex vertical align="center" gap={16} className="authForm">
      <Text strong style={{ fontSize: "1.2rem" }}>
        Register a new account
      </Text>

      <Form
        form={form}
        name="register-form"
        layout="vertical"
        style={{ width: "100%", maxWidth: 350 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<RegisterFormFields>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input size="large" placeholder="Enter your name" />
        </Form.Item>

        <Form.Item<RegisterFormFields>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email address!" },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item<RegisterFormFields>
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default RegisterForm;
