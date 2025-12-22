import axios from "axios";
import type { ICreateIssue } from "../types/IIssueState";

const RootIssuePath = "http://localhost:8080/api/issue/";

export const getIssueForProject = async (projectId: string) => {
  const path = RootIssuePath + "project/" + projectId;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createIssue = async (newIssue: ICreateIssue) => {
  const path = RootIssuePath + "create";
  try {
    const res = await axios.post(path, newIssue);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIssueDetail = async (issueId: string) => {
  const path = RootIssuePath + issueId;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateIssue = async (
  issueId: string,
  updatedFields: Partial<ICreateIssue>
) => {
  const path = RootIssuePath + "update/" + issueId;
  try {
    const res = await axios.patch(path, updatedFields);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteIssue = async (issueId: string) => {
  const path = RootIssuePath + issueId;
  try {
    const res = await axios.delete(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
