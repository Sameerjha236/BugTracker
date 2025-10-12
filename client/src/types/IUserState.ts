export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserRegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface IUserInfo {
  name: string | null;
  email: string | null;
  userId: string | null;
}

export interface IUserState {
  userInfo: IUserInfo;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface IUserProject {
  name: string;
  owner: string;
  projectId: string;
}
