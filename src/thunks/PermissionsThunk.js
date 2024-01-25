import { setAllPermissions, setSinglePermission } from '../slices/PermissionsSlice'
import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR } from '../constants/toast'

export const getAllPermissions = createAsyncThunk(
  '/permissions',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
    const resp = await fetch(`${API.uri}/permissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const dataJson = await resp.json()
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
      return rejectWithValue();
    }
    dispatch(setAllPermissions(dataJson.data.content))
  },
)

export const getPerById = createAsyncThunk(
  '/permissions/id',
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
    const resp = await fetch(`${API.uri}/permissions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const dataJson = await resp.json()
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
      return rejectWithValue();
    }
    dispatch(setSinglePermission(dataJson.data))
  },
)

export const deletePermissions = createAsyncThunk(
    "/permissions/id",
    async (id, { dispatch, rejectWithValue }) => {
        console.log("resp")
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/permissions/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const dataJson = await resp.json()
        if (resp.status >= 300) {
            dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
            return rejectWithValue();
          }
        dispatch(setAlert({ type: "success", content: "Success" }));
        dispatch(getAllPermissions());
      } catch (e) {
        dispatch(
          setAlert({ type: "error", content: "Error when delete permission" })
        );
      }
    }
  );

  
