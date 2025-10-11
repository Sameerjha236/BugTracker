import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/project/123">Project</Link> |
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
