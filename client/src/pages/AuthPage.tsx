import { lazy } from "react";

const AuthLayout = lazy(() => import("../components/AuthComp/AuthLayout"));

const AuthPage = () => {
  return (
    <>
      <AuthLayout />
    </>
  );
};

export default AuthPage;
