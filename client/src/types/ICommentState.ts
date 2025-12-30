import type { IUserInfo } from "./IUserState";

export type IComment = {
  commentId: string;
  createdAt: string;
  issueId: string;
  text: string;
  author: IUserInfo;
};
