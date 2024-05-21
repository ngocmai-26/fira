import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import {
  setAllUser,
  setPaginationUser,
  setSingleUser,
} from '../slices/UsersSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'

export const getAllUsers = createAsyncThunk(
  '/users',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/users?page=${data || 0}&size=20`, {
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
      dispatch(setAllUser(dataJson.data.content))
      dispatch(setPaginationUser(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: TOAST_ERROR, content: TOAST_ERROR }))
    }
  },
)

export const getUserById = createAsyncThunk(
  '/users/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/users/${id}`, {
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
      dispatch(setSingleUser(dataJson.data))
    } catch (e) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Error when delete role' }),
      )
    }
  },
)

export const deleteUsers = createAsyncThunk(
  '/users/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/users/${id}`, {
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
      dispatch(getAllUsers())
    } catch (e) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Error when delete role' }),
      )
    }
  },
)

export const updateUser = createAsyncThunk(
  '/users/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log('data', data)
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/users/${data.id}`, {
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
          content: 'Cập nhật tài khoản thành công',
        }),
      )
      dispatch(getAllUsers())
    } catch (e) {
      console.log(e)
    }
  },
)
