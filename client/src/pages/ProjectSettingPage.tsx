import { lazy, Suspense } from "react";

const ProjectSetting = lazy(
  () => import("../components/Project/ProjectSetting")
);

const ProjectSettingPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Project Setting...</div>}>
        <ProjectSetting />
      </Suspense>
    </div>
  );
};

export default ProjectSettingPage;
