import { createSlice } from "@reduxjs/toolkit";

const initState = {
  logged: false,
  authToken: "",
  user: {},
  account: {},
  refresh: null,
  actionStatusCode: 0,
  isFetching: false,
  errors: {},
  errorsRegister: {}
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setErrorsRegister: (state, { payload }) => {
      state.errorsRegister = payload;
    },
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload;
    },
    setRefresh: (state, { payload }) => {
      state.refresh = { fresh: !state.refresh, uri: payload };
    },
    setAuthFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    setEmailAuth: (state, { payload }) => {
      state.email = payload;
    },
    loadUser: (state) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.authToken = token;
        state.logged = true;
      } else {
        state = initState;
      }
    },
    logout: (state) => {
      localStorage.removeItem("auth_token");
      state = initState;
      window.location.assign(window.location.href);
    },
  },
});

export const {
  setLogged,
  loadUser,
  logout,
  setRefresh,
  setActionStatus,
  setUser,
  setEmailAuth,
  setErrors,
  setAuthFetching,
  setErrorsRegister,
} = AuthSlice.actions;

export default AuthSlice.reducer;
