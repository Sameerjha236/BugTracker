import { Button, Flex } from "antd";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { userActions } from "../store/userSlice";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);

  return (
    <Flex justify="space-between" align="center">
      <Title level={3}>
        <Link to="/">BugTracker</Link>
      </Title>

      {loggedIn ? (
        <Button danger onClick={() => dispatch(userActions.logout())}>
          Logout
        </Button>
      ) : (
        <Button type="primary">
          <Link to="/auth">Login</Link>
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
