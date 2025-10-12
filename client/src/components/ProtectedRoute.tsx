import { useAppSelector } from "../hooks/storeHook";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loggedIn } = useAppSelector((state) => state.user);

  if (!loggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
