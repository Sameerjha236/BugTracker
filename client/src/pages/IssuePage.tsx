import { lazy, Suspense } from "react";

const IssueLayout = lazy(() => import("../components/Issue/IssueLayout"));

const IssuePage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <IssueLayout />
      </Suspense>
    </>
  );
};

export default IssuePage;
