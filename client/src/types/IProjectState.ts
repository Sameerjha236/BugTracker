import type { IUserInfo } from "./IUserState";

export type ICreateProject = {
  name: string;
  description: string;
  owner: string;
};

export type IProjectLayoutProps = {
  projectId: string;
};

export type IProjectState = {
  projectId: string;
  name: string;
  description: string;
  owner: IUserInfo;
};
