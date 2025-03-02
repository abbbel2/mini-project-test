import { Middleware, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { createLogger } from "redux-logger";

import { ticketReducer } from "./slices/ticket/ticket.slice";
import { authReducer } from "./slices/auth/auth.slice";

export * from "./slices/auth/auth.slice";
export * from "./slices/ticket/ticket.slice";

const middlewares: Middleware[] = [];
const logger = createLogger();
middlewares.push(logger);

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([]),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
