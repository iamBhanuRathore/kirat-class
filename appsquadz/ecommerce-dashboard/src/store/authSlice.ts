import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, signup as signupApi } from "../services/api";

interface UserDetails {
  email: string;
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserDetails | null;
  userList: UserDetails[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userList: [
    { email: "dummy@gmail.com", username: "dummy", password: "dummy" },
  ],
};

// Types for login thunk
type LoginResponse = UserDetails;
type LoginPayload = Pick<UserDetails, "password" | "username">;
// Types for signup thunk
type SignupPayload = UserDetails;
type SignupResponse = UserDetails;

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { state: { auth: AuthState } }
>(
  "auth/loginUser",
  async ({ username, password }, { getState, rejectWithValue }) => {
    if (!username || !password) {
      return rejectWithValue("No Inputs Found !");
    }
    // mock api call
    await loginApi(username, password);
    const state = getState();
    const user = state.auth.userList.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      return rejectWithValue("User not found");
    }
    return user;
  }
);

export const signUpUser = createAsyncThunk<
  SignupResponse,
  SignupPayload,
  { state: { auth: AuthState } }
>(
  "auth/signUpUser",
  async ({ username, email, password }, { getState, rejectWithValue }) => {
    if (!username || !email || !password) {
      return rejectWithValue("No Inputs Found !");
    }
    // Mock Api Call
    const response = await signupApi(username, email, password);
    const state = getState();
    const user = state.auth.userList.find((user) => user.email === email);
    if (user) {
      return rejectWithValue("This Email Already Exist  !");
    }
    return {
      username: response.username,
      email: response.email,
      password: response.password,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
