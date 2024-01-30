import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../slices/AlertSlice";
import AuthReducer from "../slices/AuthSlice";
import PermissionsReducer from "../slices/PermissionsSlice";
import RolesReducer from "../slices/RolesSlice";
import SearchReducer from "../slices/SearchSlice";
import ContactSlice from "../slices/ContactSlice";

export const store = configureStore({
  reducer: {
    alertReducer: AlertReducer,
    authReducer: AuthReducer,
    permissionsReducer: PermissionsReducer,
    rolesReducer: RolesReducer,
    searchReducer: SearchReducer,
    contactReducer: ContactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
