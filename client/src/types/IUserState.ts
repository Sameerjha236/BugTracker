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
  userId: string | null;
  name: string | null;
  email: string | null;
};

export type IUserState = {
  userInfo: IUserInfo;
  loggedIn: boolean;
  loading: boolean;
};
