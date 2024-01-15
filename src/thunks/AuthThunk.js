import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { API } from "../constants/api";
import {
  setAuthFetching,
  setErrors,
  setLogged,
  setRefresh,
  setUser,
} from "../slices/AuthSlice";
import {
  dataToBase64,
  delaySync,
  loadTokenFromStorage,
  setAuthInfo,
  setToken,
} from "../services/AuthService";
import { getHeaders } from "../services/ApiService";
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast";

export const register = createAsyncThunk(
  "/register",
  async (regData, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regData.username,
          password: regData.password,
          confirmPassword: regData.confirmPassword,
        }),
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setAlert({ type: "success", content: "Đăng ký thành công" }));
      return jsonData;
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthFetching(true));
      await delaySync(1);
      const resp = await fetch(`${API.uri}/public/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const dataJson = await resp.json();
      dispatch(setAuthFetching(false));

      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          dispatch(setErrors(dataJson?.data));
          return rejectWithValue("something error");
        }
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: dataJson?.message[0],
          })
        );
        dispatch(setErrors({}));
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: "Đăng nhập thành công" })
      );
      setToken(dataJson?.data?.token);
      setAuthInfo(dataToBase64(loginData));
      dispatch(setUser(dataJson?.data?.user));
      dispatch(setLogged(true));
      dispatch(setRefresh({ refresh: true, uri: "/" }));
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);
export const loginWithAuthToken = createAsyncThunk(
  "/login",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthFetching(true));
      await delaySync(1);
      const resp = await fetch(`${API.uri}/public/auth/login-with-token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const dataJson = await resp.json();
      dispatch(setAuthFetching(false));

      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          dispatch(setErrors(dataJson?.data));
          return rejectWithValue("something error");
        }
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: dataJson?.message[0],
          })
        );
        dispatch(setErrors({}));
        return rejectWithValue("something error");
      }
      setToken(dataJson?.data?.token);
      setAuthInfo(dataToBase64(loginData));
      dispatch(setUser(dataJson?.data?.user));
      dispatch(setLogged(true));
      dispatch(setRefresh("/"));
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);
export const createNewUser = createAsyncThunk(
  "/create-new-user",
  async (newUserData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthFetching(true));
      await delaySync(1);
      const token = loadTokenFromStorage();
      if (!token) {
        dispatch(
          setAlert({
            type: "error",
            content: "Phiên bản hết hạn vui lòng đăng nhập lại",
          })
        );
        dispatch(setAuthFetching(true));
        rejectWithValue();
      }
      const resp = await fetch(`${API.uri}/users`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(newUserData),
      });
      dispatch(setAuthFetching(false));
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        if (!jsonData?.valid) {
          dispatch(setErrors(jsonData?.data));
          return rejectWithValue();
        }
        dispatch(setErrors({}));
        dispatch(setAlert({ type: TOAST_ERROR, content: jsonData.message[0] }));
        return rejectWithValue();
      }
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: "Tạo người dùng thành công" })
      );
      dispatch(setUser(jsonData?.data));
      dispatch(setRefresh("/"));
    } catch (e) {
      dispatch(setAuthFetching(true));
      dispatch(setAlert({ type: TOAST_ERROR, content: "Something error" }));
      console.log(e);
    }
  }
);

export const confirmAccount = createAsyncThunk(
  "/verify-email",
  async (confirmData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(confirmData),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(setAlert({ type: "success", content: "Xác nhận thành công" }));
      dispatch(setRefresh(true));
      return dataJson;
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);

export const requestNewCode = createAsyncThunk(
  "/request-new-code",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/request-new-code?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(setAlert({ type: "success", content: "Đã gửi mã mới" }));
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "/forgot-password",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/forgot-password/${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(setAlert({ type: "success", content: "Đã gửi mã mới" }));
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);

export const confirmForgotPassword = createAsyncThunk(
  "/confirm-forgot-password",
  async (confirmData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/confirm-forgot-password/${confirmData?.email}/${confirmData?.code}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(setAlert({ type: "success", content: "Xác nhận thành công" }));
      dispatch(setRefresh(true));
      return dataJson;
    } catch (e) {
      dispatch(setAlert({ type: "warning", content: "" }));
    }
  }
);
