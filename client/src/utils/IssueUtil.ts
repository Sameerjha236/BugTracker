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
  const res = await axios.post(path, newIssue);
  return res.data;
};
