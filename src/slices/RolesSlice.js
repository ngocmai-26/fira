import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allRole: [],
  searchRole: [],
  singleRole: {},
  paginationRole: {},
}
const RolesSlice = createSlice({
  name: 'roles',
  initialState: initState,
  reducers: {
    setAllRole: (state, { payload }) => {
      state.allRole = payload
    },
    setSearchRole: (state, { payload }) => {
      state.searchRole = payload
    },
    setSingleRole: (state, { payload }) => {
      state.singleRole = payload
    },
    setPaginationRole: (state, { payload }) => {
      state.paginationRole = payload
    },
  },
})

export const { setAllRole, setSearchRole, setSingleRole, setPaginationRole } = RolesSlice.actions

export default RolesSlice.reducer
