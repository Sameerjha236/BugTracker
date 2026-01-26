import axios from "axios";
import type { ICreateProject } from "../types/IProjectState";
import { API_BASE_URL } from "../ Constants";

const RootProjectPath = `${API_BASE_URL}/project/`;

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

export const searchUsersToAdd = async (projectId: string, q: string) => {
  const path = `${RootProjectPath}${projectId}/search-users?q=${q}`;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error("Error fetching project members:", error);
    throw error;
  }
};

export const getAllMembers = async (projectId: string, q: string) => {
  const path = `${RootProjectPath}${projectId}/members?q=${q}`;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error("Error fetching project members:", error);
    throw error;
  }
};

export const addProjectMember = async (projectId: string, userId: string) => {
  const path = `${RootProjectPath}${projectId}/addUser`;
  try {
    const res = await axios.post(path, { user_id: userId, role: "member" });
    return res.data;
  } catch (error) {
    console.error("Error adding user to project:", error);
    throw error;
  }
};

export const removeProjectMember = async (
  projectId: string,
  userId: string,
) => {
  const path = `${RootProjectPath}${projectId}/removeUser`;
  try {
    const res = await axios.delete(path, { data: userId });
    return res.data;
  } catch (error) {
    console.error("Error removing user from project:", error);
    throw error;
  }
};

export const getProjectRole = async (projectId: string, userId: string) => {
  const path = `${RootProjectPath}${projectId}/role/${userId}`;
  const res = await axios.get(path);
  return res.data.role;
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
  updatedFields: Partial<ICreateProject>,
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
