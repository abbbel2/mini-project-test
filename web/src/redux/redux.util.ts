/* eslint-disable @typescript-eslint/no-explicit-any */

export type ResponseType<T> = {
  message: T;
  status: number;
  success: boolean;
};

export type ApiState<T> = {
  loading: boolean;
  payload: T;
  successful: boolean;
  error: any;
};

export type PaginationType<T> = {
  page: number;
  limit: number;
  count: number;
  rows: T;
};

export type LoginResponse = {
  token: string
}

export const ResetApiState = (payload: any) => ({
  loading: false,
  payload,
  successful: false,
  error: null,
});
