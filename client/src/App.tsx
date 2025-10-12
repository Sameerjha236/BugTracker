import { Outlet } from "react-router-dom";
import "./App.css";
import { lazy } from "react";

const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
