
import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../slices/AlertSlice";
import AuthReducer from "../slices/AuthSlice";

export const store = configureStore({
    reducer: {
      alertReducer: AlertReducer,
      authReducer: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  