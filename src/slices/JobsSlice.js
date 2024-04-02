import { createSlice } from "@reduxjs/toolkit";

const initState = {
  jobs: [],
  allJob: [],
  singleJob: {},
  listJob: [],
};
const JobsSlice = createSlice({
  name: "job",
  initialState: initState,
  reducers: {
    setJobs: (state, {payload}) => {
      state.jobs = payload;
    },
    setAllJob: (state, { payload }) => {
      state.allJob = payload;
    },
    setSingleJob: (state, { payload }) => {
      state.singleJob = payload;
    },
    setListJob: (state, {payload}) => {
      state.listJob = payload
    },

  },
});

export const { setJobs, setAllJob,setSingleJob, setListJob } = JobsSlice.actions;

export default JobsSlice.reducer;