
import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../slices/AlertSlice";
import AuthReducer from "../slices/AuthSlice";
import PermissionsReducer from "../slices/PermissionsSlice";
import RolesReducer from "../slices/RolesSlice";

export const store = configureStore({
    reducer: {
      alertReducer: AlertReducer,
      authReducer: AuthReducer,
      permissionsReducer: PermissionsReducer,
      rolesReducer: RolesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  