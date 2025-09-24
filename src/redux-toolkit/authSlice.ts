import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../services/userService";
import { User } from "../types/User";
import { RootState } from "./store";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  showRefreshTokenModal: Boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
  showRefreshTokenModal: false,
};

//async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("accessToken", response.accessToken);
      return {
        user: response.user,
        accessToken: response.accessToken,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "LOGIN FAILED.....",
      );
    }
  },
);

//logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await logoutUser();
    localStorage.removeItem("accessToken");
    dispatch(clearAuth());
  },
);

//slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState["user"]; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
    showRefreshModal(state) {
      state.showRefreshTokenModal = true;
    },
    hideRefreshModal(state) {
      state.showRefreshTokenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const { showRefreshModal, hideRefreshModal } = authSlice.actions;
