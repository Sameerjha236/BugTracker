import { Flex, Input, Typography, Button, App } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./Auth.css";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { loginUserThunk } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, loggedIn, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  const { message } = App.useApp();

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      message.warning("Please enter both email and password!");
      return;
    }
    setLoginAttempted(true);
    dispatch(loginUserThunk({ email, password }));
  }, [dispatch, email, message, password]);

  useEffect(() => {
    if (!loginAttempted) return;
    if (loggedIn) {
      message.success("Logged in successfully!");
      setEmail("");
      setPassword("");
      navigate("/");
    } else if (error) {
      message.error(error);
    }
  }, [loggedIn, error, message, navigate, loginAttempted]);

  return (
    <Flex vertical gap={16} align="center" className="authForm">
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
        onClick={handleLogin}
        block
      >
        Login
      </Button>
    </Flex>
  );
};

export default LoginForm;
