import { lazy, useState, Suspense } from "react";
import { Typography, Flex, Card } from "antd";
import AuthSkeleton from "./AuthSkeleton";
import { Content } from "antd/es/layout/layout";
import "./Auth.css";

const { Title } = Typography;

const LoginForm = lazy(() => import("./LoginForm"));
const RegisterForm = lazy(() => import("./RegisterForm"));

const AuthLayout = () => {
  const [login, setLogin] = useState(true);

  return (
    <Flex vertical align="center" justify="center" className="authLayout">
      <Card className="authCard" variant="borderless">
        <Flex justify="center" gap={32} className="authTabs">
          <Title
            level={4}
            className={`authTab ${login ? "active" : ""}`}
            onClick={() => setLogin(true)}
          >
            Login
          </Title>
          <Title
            level={4}
            className={`authTab ${!login ? "active" : ""}`}
            onClick={() => setLogin(false)}
          >
            Signup
          </Title>
        </Flex>

        <Content className="authFormWrapper">
          <Suspense fallback={<AuthSkeleton />}>
            {login ? <LoginForm /> : <RegisterForm setLogin={setLogin} />}
          </Suspense>
        </Content>
      </Card>
    </Flex>
  );
};

export default AuthLayout;
