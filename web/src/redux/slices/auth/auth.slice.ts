/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import { ResetApiState } from "../../redux.util";
import { AuthStateTypes, LoginResponse, SignupResponse } from "./auth.util";

const name = "auth";
const extraActions = createExtraActions();

const AuthInitialState: AuthStateTypes = {
  login: ResetApiState({}),
  signup: ResetApiState({}),
};

function createExtraActions() {
  const login = createAsyncThunk<LoginResponse, any>(
    `${name}/login`,
    async (data: any, thunkApi) =>
      axios
        .post(`/auth/login`, data)
        .then((response) => {
          if (response.data.token) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => {
          return thunkApi.rejectWithValue(error?.response?.data)
        })
  );

  const signup = createAsyncThunk<SignupResponse, any>(
    `${name}/signup`,
    async (data: any, thunkApi) =>
      axios
        .post(`/auth/signup`, data)
        .then((response) => {
          if (response.data.user) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const resetLogin = createAction(`${name}/reset-login`);
  const resetSignup = createAction(`${name}/reset-signup`);

  return {
    login,
    signup,
    resetLogin,
    resetSignup,
  };
}

function createExtraReducers(builder: ActionReducerMapBuilder<AuthStateTypes>) {
  return {
    ...loginReducer(),
    ...signupReducer(),
    ...resetLoginReducer(),
    ...resetSignupReducer(),
  };

  function loginReducer() {
    return {
      ...builder.addCase(extraActions.login.pending, (state) => {
        state.login = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.login.fulfilled, (state, action) => {
        state.login = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.login.rejected, (state, action) => {
        state.login = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function signupReducer() {
    return {
      ...builder.addCase(extraActions.signup.pending, (state) => {
        state.signup = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.signup.fulfilled, (state, action) => {
        state.signup = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.signup.rejected, (state, action) => {
        state.signup = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function resetLoginReducer() {
    return builder.addCase(extraActions.resetLogin, (state) => {
      state.login = {
        loading: false,
        payload: null,
        successful: false,
        error: null,
      };
    });
  }

  function resetSignupReducer() {
    return builder.addCase(extraActions.resetSignup, (state) => {
      state.signup = {
        loading: false,
        payload: null,
        successful: false,
        error: null,
      };
    });
  }
}

const AuthSlice = createSlice({
  name,
  initialState: AuthInitialState,
  reducers: {},
  extraReducers: (builder) => createExtraReducers(builder),
});

export const authActions = { ...AuthSlice.actions, ...extraActions };
export const authReducer = AuthSlice.reducer;
