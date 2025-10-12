import type { IUserProject } from "../types/IUserState";

export const getProjectsForUser = (userId: string) => {
  console.log("Fetching projects for user:", userId);
  const dummyProjects: IUserProject[] = [
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
    { name: "Phoenix UI", owner: "alice", projectId: "1" },
  ];
  return dummyProjects;
};
