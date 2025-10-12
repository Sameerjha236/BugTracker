import { lazy, Suspense } from "react";

const AuthLayout = lazy(() => import("../components/AuthComp/AuthLayout"));

const AuthPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Auth Page...</div>}>
        <AuthLayout />
      </Suspense>
    </>
  );
};

export default AuthPage;
