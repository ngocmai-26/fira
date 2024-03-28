import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import {
  setAllRole,
  setPaginationRole,
  setSingleRole,
} from '../slices/RolesSlice'
import { setListPermission } from '../slices/PermissionsSlice'

export const getAllRole = createAsyncThunk(
  '/roles',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles?page=${data || 0}&size=20`, {
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
      dispatch(setAllRole(dataJson.data.content))
      dispatch(setPaginationRole(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)
export const getRoleById = createAsyncThunk(
  '/roles/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles/${id}`, {
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
      dispatch(setSingleRole(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)
export const deleteRoles = createAsyncThunk(
  '/roles/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles/${id}`, {
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
        setAlert({ type: TOAST_SUCCESS, content: 'Xóa chức vụ thành công' }),
      )
      dispatch(getAllRole())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)
export const updatePermission = createAsyncThunk(
  '/add-perm/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles/add-perm/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.list),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Update permission success',
          }),
        )

        dispatch(setListPermission(resp))
        return rejectWithValue()
      } else {
        dispatch(
          setAlert({
            type: 'error',
            content: resp.json()?.defaultMessage ?? 'Update permission error ',
          }),
        )
      }
    } catch (e) {
      console.log(e)
    }
  },
)
export const removePermission = createAsyncThunk(
  '/remove-perm/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles/remove-perm/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.list),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Remove permission success',
          }),
        )

        dispatch(setListPermission(resp))
        return rejectWithValue()
      } else {
        dispatch(
          setAlert({
            type: 'error',
            content: resp.json()?.defaultMessage ?? 'Remove permission error ',
          }),
        )
      }
    } catch (e) {
      console.log(e)
    }
  },
)
export const addNewRole = createAsyncThunk(
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
    const resp = await fetch(`${API.uri}/roles`, {
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
      setAlert({ type: TOAST_SUCCESS, content: 'Thêm chức vụ thành công' }),
    )
    dispatch(getAllRole())
  },
)
export const updateRole = createAsyncThunk(
  '/roles/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/roles/${data.id}`, {
        method: 'PUT',
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
        setAlert({
          type: TOAST_SUCCESS,
          content: 'Cập nhật chức vụ thành công',
        }),
      )
      dispatch(getAllRole())
    } catch (e) {
      console.log(e)
    }
  },
)
