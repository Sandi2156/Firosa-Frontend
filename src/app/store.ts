import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import snackBarReducer from "./snackBarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackBar: snackBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
