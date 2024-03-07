import { API } from "../constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast";
import { setAllRole, setSingleRole } from "../slices/RolesSlice";
import { setListPermission } from "../slices/PermissionsSlice";

export const getAllRole = createAsyncThunk(
  "/roles",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    const resp = await fetch(`${API.uri}/roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dataJson = await resp.json();
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }));
      return rejectWithValue();
    }
    dispatch(setAllRole(dataJson.data.content));
  }
);
export const getRoleById = createAsyncThunk(
  "/roles/id",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    const resp = await fetch(`${API.uri}/roles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dataJson = await resp.json();
    console.log(dataJson.data);
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }));
      return rejectWithValue();
    }
    dispatch(setSingleRole(dataJson.data));
  }
);
export const deleteRoles = createAsyncThunk(
  "/roles/id",
  async (id, { dispatch, rejectWithValue }) => {
    console.log("resp");
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/roles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }));
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllRole());
    } catch (e) {
      dispatch(setAlert({ type: "error", content: "Error when delete role" }));
    }
  }
);
export const updatePermission = createAsyncThunk(
  "/permission",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(
        `${API.uri}/roles/give_permission_for_role/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update product success" })
        );

        dispatch(setListPermission(resp));
        return rejectWithValue();
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update product error ",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const addNewRole = createAsyncThunk(
  "roles",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setAllRole({
          type: "error",
          content: "Phiên đăng nhập đã hết hạn vui lòng thử lại",
        })
      );
    }
    const resp = await fetch(`${API.uri}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const dataJson = await resp.json();
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }));
      return rejectWithValue();
    }
    dispatch(setAlert({ type: TOAST_SUCCESS, content: dataJson.message[0] }));
    dispatch(getAllRole());
  }
);
export const updateRole = createAsyncThunk(
  "/roles/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/roles/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }));
        return rejectWithValue();
      }
      dispatch(setAlert({ type: TOAST_SUCCESS, content: dataJson.message[0] }));
      dispatch(getAllRole());
    } catch (e) {
      console.log(e);
    }
  }
);
