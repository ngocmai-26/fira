import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { TOAST_ERROR } from "../constants/toast";
import { API } from "../constants/api";
import { getHeaders } from "../services/ApiService";
import { delaySync, loadTokenFromStorage } from "../services/AuthService";
import { setSearchContact, setSearching } from "../slices/SearchSlice";
export const searchContactAsync = createAsyncThunk(
  "/search-contact",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setSearching(true));
      await delaySync(1);
      const resp = await fetch(`${API.uri}/contacts/search/by-email/${email}`, {
        method: "GET",
        headers: getHeaders(loadTokenFromStorage()),
      });
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: "Có lỗi xảy ra" }));
        dispatch(setSearching(false));
        return rejectWithValue();
      }
      const jsonData = await resp.json();
      dispatch(setSearchContact(jsonData?.data || new Array(0)));
      dispatch(setSearching(false));
      return;
    } catch (e) {
      dispatch(setSearching(false));
      dispatch(setAlert({ type: TOAST_ERROR, content: "Có lỗi xảy ra" }));
      console.log(e);
    }
  }
);
