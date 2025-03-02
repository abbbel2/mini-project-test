import axiosInstance from "../../axios";
import { ApiState } from "../../redux.util";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRoles;
};

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}

export type LoginResponse = {
  token: string;
  username: string;
};

export type SignupResponse = {
  message: string;
  user: User;
};

export type AuthStateTypes = {
  login: ApiState<LoginResponse | null>;
  signup: ApiState<SignupResponse | null>;
};

export const handleLogout = () => {
  delete axiosInstance.defaults.headers.Authorization;
  localStorage.clear();
};