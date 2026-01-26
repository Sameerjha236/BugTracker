import axios from "axios";
import { API_BASE_URL } from "../ Constants";

const RootIssuePath = `${API_BASE_URL}/comment/`;

export const postCommentToIssue = async (
  issueId: string,
  commentText: string,
  userId: string,
) => {
  const path = RootIssuePath + "create";
  try {
    const body = {
      commentText: commentText,
      issueId: issueId,
      userId: userId,
    };
    const res = await axios.post(path, body);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentsForIssue = async (issueId: string) => {
  const path = RootIssuePath + "issue/" + issueId;
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
