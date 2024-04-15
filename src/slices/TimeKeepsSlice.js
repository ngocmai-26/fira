import { createSlice } from "@reduxjs/toolkit";

const initState = {
  timeKeeps: [],
  allTimeKeep: [],
  singleTimeKeep: {},
  listTimeKeep: [],
  paginationTimeKeep: {},
};
const TimeKeepsSlice = createSlice({
  name: "TimeKeep",
  initialState: initState,
  reducers: {
    setTimeKeeps: (state, {payload}) => {
      state.timeKeeps = payload;
    },
    setAllTimeKeep: (state, { payload }) => {
      state.allTimeKeep = payload;
    },
    setSingleTimeKeep: (state, { payload }) => {
      state.singleTimeKeep = payload;
    },
    setListTimeKeep: (state, {payload}) => {
      state.listTimeKeep = payload
    },
    setPaginationTimeKeep: (state, { payload }) => {
      state.paginationTimeKeep = payload
    },

  },
});

export const { setTimeKeeps, setAllTimeKeep,setSingleTimeKeep, setListTimeKeep, setPaginationTimeKeep } = TimeKeepsSlice.actions;

export default TimeKeepsSlice.reducer;