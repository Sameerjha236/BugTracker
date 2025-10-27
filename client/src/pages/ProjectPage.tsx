import { lazy, Suspense } from "react";

const ProjectLayout = lazy(() => import("../components/Project/ProjectLayout"));

const ProjectPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectLayout />
      </Suspense>
    </>
  );
};

export default ProjectPage;
