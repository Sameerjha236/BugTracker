import { Button, Flex, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { userActions } from "../store/userSlice";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const { Title } = Typography;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);

  return (
    <header className="navbar">
      <div className="navbar-glow" />

      <div className="navbar-inner">
        <Title level={3} className="navbar-logo">
          <Link to="/">BugTracker</Link>
        </Title>

        <Flex align="center" className="navbar-actions">
          <ThemeToggle />

          {loggedIn ? (
            <Button
              danger
              size="middle"
              onClick={() => dispatch(userActions.logout())}
            >
              Logout
            </Button>
          ) : (
            <Button type="primary" size="middle">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </Flex>
      </div>
    </header>
  );
};

export default Navbar;
