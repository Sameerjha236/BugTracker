export type IUserCredentials = {
  email: string;
  password: string;
};

export type IUserRegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type IUserInfo = {
  name: string | null;
  email: string | null;
  userId: string | null;
};

export type IUserState = {
  userInfo: IUserInfo;
  loggedIn: boolean;
  loading: boolean;
};

export type IUserProject = {
  name: string;
  owner: string;
  projectId: string;
};
