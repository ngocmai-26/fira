import {
  setAllPermissions,
  setPaginationPer,
  setSinglePermission,
} from '../slices/PermissionsSlice'
import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'

export const getAllPermissions = createAsyncThunk(
  '/permissions',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
    const resp = await fetch(
      `${API.uri}/permissions?page=${data || 0}&size=20`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const dataJson = await resp.json()
    console.log('dataJson', dataJson)
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
      return rejectWithValue()
    }
    dispatch(setAllPermissions(dataJson.data.content))
    dispatch(setPaginationPer(dataJson.data))
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
      return rejectWithValue()
    }
    dispatch(setSinglePermission(dataJson.data))
  },
)

export const deletePermissions = createAsyncThunk(
  '/permissions/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/permissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
        return rejectWithValue()
      }
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Xóa chức năng thành công' }),
      )
      dispatch(getAllPermissions())
    } catch (e) {
      dispatch(
        setAlert({ type: 'error', content: 'Error when delete permission' }),
      )
    }
  },
)

export const addNewPermission = createAsyncThunk(
  'roles',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        }),
      )
    }
    const resp = await fetch(`${API.uri}/permissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const dataJson = await resp.json()
    if (resp.status >= 300) {
      dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
      return rejectWithValue()
    }
    dispatch(
      setAlert({ type: TOAST_SUCCESS, content: 'Thêm chức năng thành công' }),
    )
    dispatch(getAllPermissions())
  },
)

// export const searchPermissionAsync = createAsyncThunk(
//   "/search-permission",
//   async (email, { dispatch, rejectWithValue }) => {
//     try {
//       dispatch(setSearching(true));
//       await delaySync(1);
//       const resp = await fetch(`${API.uri}/contacts/search/by-email/${email}`, {
//         method: "GET",
//         headers: getHeaders(loadTokenFromStorage()),
//       });
//       if (resp.status >= 300) {
//         dispatch(setAlert({ type: TOAST_ERROR, content: "Có lỗi xảy ra" }));
//         dispatch(setSearching(false));
//         return rejectWithValue();
//       }
//       const jsonData = await resp.json();

//       dispatch(setSearchContact(jsonData?.data || new Array(0)));
//       dispatch(setSearching(false));
//       return;
//     } catch (e) {
//       dispatch(setSearching(false));
//       dispatch(setAlert({ type: TOAST_ERROR, content: "Có lỗi xảy ra" }));
//       console.log(e);
//     }
//   }
// );
