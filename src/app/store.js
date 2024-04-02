import { configureStore } from '@reduxjs/toolkit'
import AlertReducer from '../slices/AlertSlice'
import AuthReducer from '../slices/AuthSlice'
import PermissionsReducer from '../slices/PermissionsSlice'
import RolesReducer from '../slices/RolesSlice'
import SearchReducer from '../slices/SearchSlice'
import ContactSlice from '../slices/ContactSlice'
import RoomSlice from '../slices/RoomSlice'
import ToggleSlice from '../slices/ToglleSlice'
import AccountsSlice from '../slices/AccountsSlice'
import UsersSlice from '../slices/UsersSlice'
import JobsSlice from '../slices/JobsSlice'
export const store = configureStore({
  reducer: {
    alertReducer: AlertReducer,
    authReducer: AuthReducer,
    permissionsReducer: PermissionsReducer,
    rolesReducer: RolesReducer,
    searchReducer: SearchReducer,
    contactReducer: ContactSlice,
    roomReducer: RoomSlice,
    toggleReducer: ToggleSlice,
    accountsReducer: AccountsSlice,
    usersReducer: UsersSlice,
    jobsReducer: JobsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
