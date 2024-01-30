import { createSlice } from "@reduxjs/toolkit";

const initState = {
  notifications: [],
};
const NotificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initState,
  reducers: {},
});
export const { setSearchContact } = SearchSlice.actions;
export default SearchSlice.reducer;
