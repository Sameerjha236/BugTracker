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

export const getProjectRole = async (projectId: string, userId: string) => {
  const path = `${RootProjectPath}${projectId}/role/${userId}`;
  const res = await axios.get(path);
  return res.data.role; // ✅ matches backend
};

export const getProjectDetails = async (projectId: string) => {
  const path = RootProjectPath + projectId;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleCreateProject = async (data: ICreateProject) => {
  const path = RootProjectPath + "create";
  const res = await axios.post(path, data);
  return res.data;
};

export const updateProject = async (
  projectId: string,
  updatedFields: Partial<ICreateProject>
) => {
  const path = RootProjectPath + "update/" + projectId;
  try {
    const res = await axios.patch(path, updatedFields);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  const path = RootProjectPath + projectId;
  try {
    const res = await axios.delete(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
