import axios from "axios";
import type { ICreateProject } from "../types/IProjectState";

const RootProjectPath = "http://localhost:8080/api/project/";

export const getProjectsForUser = async (userId: string) => {
  const path = RootProjectPath + "user/" + userId;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const handleCreateProject = async (data: ICreateProject) => {
  const res = await axios.post(
    "http://localhost:8080/api/project/create",
    data
  );
  console.log(res.data);
};
