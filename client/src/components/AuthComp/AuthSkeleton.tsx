import { Flex, Skeleton } from "antd";
import "./Auth.css";

const AuthSkeleton = () => {
  return (
    <Flex vertical gap={20} align="center" className="authForm">
      <Flex vertical gap={10} className="authFormField">
        <Skeleton.Input
          style={{ width: "100%", maxWidth: 300 }}
          active
          size="large"
        />
      </Flex>

      <Flex vertical gap={10} className="authFormField">
        <Skeleton.Input
          style={{ width: "100%", maxWidth: 300 }}
          active
          size="large"
        />
      </Flex>

      <Skeleton.Button
        style={{ width: "10em", height: 40 }}
        active
        size="large"
      />
    </Flex>
  );
};

export default AuthSkeleton;
