import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  IUserCredentials,
  IUserRegisterCredentials,
  IUserState,
} from "../types/IUserState";
import { API_BASE_URL } from "../ Constants";

const initialState: IUserState = {
  userInfo: {
    name: null,
    email: null,
    userId: null,
  },
  loggedIn: false,
  loading: false,
};

const RootPath = `${API_BASE_URL}/user/`;

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials: IUserCredentials, thunkApi) => {
    try {
      const res = await axios.post(`${RootPath}login`, credentials);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (credentials: IUserRegisterCredentials, thunkApi) => {
    try {
      const res = await axios.post(`${RootPath}register`, credentials);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response?.data?.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.loggedIn = true;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
      })

      // register
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
