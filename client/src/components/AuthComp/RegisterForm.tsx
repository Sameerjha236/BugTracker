import { App, Button, Typography, Flex, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/userSlice";

const { Text } = Typography;

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerAttempted, setRegisterAttempted] = useState(false);

  const { message } = App.useApp();

  const handleRegister = useCallback(() => {
    if (!email || !password || !name) {
      message.warning("Please enter all fields!");
      return;
    }
    setRegisterAttempted(true);
    dispatch(registerUserThunk({ email, password, name }));
  }, [dispatch, email, message, name, password]);

  useEffect(() => {
    if (!registerAttempted) return;
    if (error) {
      message.error(error);
    } else {
      message.success("Registered successfully! Please log in.");
      setEmail("");
      setPassword("");
      setName("");
      navigate("/login");
    }
  }, [error, message, navigate, registerAttempted]);

  return (
    <Flex vertical gap={16} align="center" className="authForm">
      <Flex vertical gap={8} className="authFormField">
        <Text strong>Name</Text>
        <Input
          size="large"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </Flex>

      <Flex vertical gap={8} className="authFormField">
        <Text strong>Email</Text>
        <Input
          size="large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </Flex>

      <Flex vertical gap={8} className="authFormField">
        <Text strong>Password</Text>
        <Input.Password
          size="large"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </Flex>

      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={handleRegister}
        block
      >
        Register
      </Button>
    </Flex>
  );
};

export default RegisterForm;
