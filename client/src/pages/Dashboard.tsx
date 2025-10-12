import { lazy, Suspense } from "react";

const DashboardLayout = lazy(
  () => import("../components/Dashboard/DashboardLayout")
);

const Dashboard = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    </>
  );
};

export default Dashboard;
