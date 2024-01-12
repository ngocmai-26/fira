import { createSlice } from "@reduxjs/toolkit"

const initState = {
    logged: false,
    authToken: '',
    user: {},
    refresh: false,
    actionStatusCode: 0,
  }
  const AuthSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
      setLogged: (state, { payload }) => {
        state.logged = payload
      },
      setAuthData: (state, { payload }) => {
        state.user = payload
      },
      setUser: (state, { payload }) => {
        state.user = payload
      },
      setActionStatus: (state, { payload }) => {
        state.actionStatusCode = payload
      },
      setRefresh: (state, { payload }) => {
        state.refresh = payload
      },
      setEmailAuth: (state, { payload }) => {
        state.email = payload
      },
      loadUser: (state) => {
        const token = localStorage.getItem('auth_token')                                                    
        if ( token ) {
          state.authToken = token
          state.logged = true
        } else {
          state = initState
        }
      },
      logout: (state) => {
        localStorage.removeItem('auth_token')
        state = initState
        window.location.assign(window.location.href)
      },
    },
  })
  
  export const {
    setLogged,
    loadUser,
    logout,
    setRefresh,
    setActionStatus,
    setUser,
    setEmailAuth
  } = AuthSlice.actions
  
  export default AuthSlice.reducer
  