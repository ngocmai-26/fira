import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast";
import { API } from "../constants/api";
import { getHeaders } from "../services/ApiService";
import { loadTokenFromStorage } from "../services/AuthService";
import {
  setAddContactRequest,
  setAllContact,
  setContactRequest,
} from "../slices/ContactSlice";
import { searchContactAsync } from "./SearchThunk";

export const sendAddContactRequest = createAsyncThunk(
  "/contact/add",
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      const { searchContent } = getState().searchReducer;

      const resp = await fetch(`${API.uri}/contacts`, {
        method: "POST",
        headers: getHeaders(loadTokenFromStorage()),
        body: JSON.stringify(data),
      });
      if (resp.status > 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: '"Có lỗi xảy ra khi gửi yêu cầu',
          })
        );
        rejectWithValue();
      }
      if (resp.status == 200) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: "Gửi yêu cầu thành công" })
        );
        dispatch(searchContactAsync(searchContent));
        dispatch(getAllAddContactRequestByUser(data.from));
      }

      return;
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
      console.log("error", e);
    }
  }
);
export const getAllContactByUser = createAsyncThunk(
  "/contacts/get-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/contacts/${userId}`, {
        method: "GET",
        headers: getHeaders(loadTokenFromStorage()),
      });
      if (resp.status > 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: '"Có lỗi xảy ra khi gửi yêu cầu',
          })
        );
        return rejectWithValue();
      }
      const jsonData = await resp.json();
      if (resp.status == 200) {
        dispatch(setAllContact(jsonData?.data?.content));
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
    }
  }
);
export const getAllAddContactRequestByUser = createAsyncThunk(
  "/contacts/get-all-add-request-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/contacts/requests/${userId}`, {
        method: "GET",
        headers: getHeaders(loadTokenFromStorage()),
      });
      if (resp.status > 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: '"Có lỗi xảy ra khi gửi yêu cầu',
          })
        );
        return rejectWithValue();
      }
      const jsonData = await resp.json();
      if (resp.status == 200) {
        dispatch(setAddContactRequest(jsonData?.data?.content));
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
    }
  }
);
export const getAllAddContactRequestByUserRelate = createAsyncThunk(
  "/contacts/get-all-add-request-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(
        `${API.uri}/contacts/requests/related/${userId}`,
        {
          method: "GET",
          headers: getHeaders(loadTokenFromStorage()),
        }
      );
      if (resp.status > 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: '"Có lỗi xảy ra khi gửi yêu cầu',
          })
        );
        return rejectWithValue();
      }
      const jsonData = await resp.json();
      if (resp.status == 200) {
        dispatch(setContactRequest(jsonData?.data?.content));
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
    }
  }
);
export const responseContact = createAsyncThunk(
  "/contacts/resp-contact-request",
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer;
      const resp = await fetch(`${API.uri}/contacts/response`, {
        method: "POST",
        headers: getHeaders(loadTokenFromStorage()),
        body: JSON.stringify(data),
      });
      if (resp.status > 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: '"Có lỗi xảy ra khi gửi yêu cầu',
          })
        );
        return rejectWithValue();
      }
      if (resp.status == 200) {
        dispatch(getAllContactByUser(user?.id));
        dispatch(getAllAddContactRequestByUserRelate(user?.id));
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
    }
  }
);
export const destroyContactRequest = createAsyncThunk(
  "/contacts/destroy-contact-request",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer;
      const resp = await fetch(`${API.uri}/contacts/request/delete/${id}`, {
        method: "DELETE",
        headers: getHeaders(loadTokenFromStorage()),
      });

      if (resp.status == 200) {
        dispatch(getAllContactByUser(user?.id));
        dispatch(getAllAddContactRequestByUserRelate(user?.id));
        dispatch(getAllAddContactRequestByUser(user?.id));
        dispatch(setAlert({ type: TOAST_SUCCESS, content: "Đã hủy lời mời" }));
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        })
      );
    }
  }
);
