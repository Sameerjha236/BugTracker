import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  IUserCredentials,
  IUserRegisterCredentials,
  IUserState,
} from "../types/IUserState";
import axios from "axios";

const initialState: IUserState = {
  userInfo: {
    name: null,
    email: null,
    userId: null,
  },
  loggedIn: false,
  loading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials: IUserCredentials, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        credentials
      );
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (credentials: IUserRegisterCredentials, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        credentials
      );
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userInfo.name = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.userInfo.name = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
