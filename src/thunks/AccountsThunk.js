import { createAsyncThunk } from '@reduxjs/toolkit'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import {
  setAllAccount,
  setPaginationAccount,
  setSingleAccount,
} from '../slices/AccountsSlice'
import { setAlert } from '../slices/AlertSlice'
import { API } from '../constants/api'

export const getAllAccount = createAsyncThunk(
  '/accounts',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(
        `${API.uri}/accounts?page=${data || 0}&size=20`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
        return rejectWithValue()
      }
      dispatch(setAllAccount(dataJson.data.content))
      dispatch(setPaginationAccount(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)

export const addNewAccount = createAsyncThunk(
  'roles',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
          }),
        )
      }
      const resp = await fetch(`${API.uri}/accounts`, {
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
        setAlert({ type: TOAST_SUCCESS, content: 'Thêm tài khoản thành công' }),
      )
      dispatch(getAllAccount())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)

export const deleteAccount = createAsyncThunk(
  '/accounts/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/accounts/${id}`, {
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
        setAlert({
          type: TOAST_SUCCESS,
          content: 'Vô hiệu hóa tài khoản thành công',
        }),
      )
      dispatch(getAllAccount())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)

export const getAccountById = createAsyncThunk(
  '/account/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/accounts/${id}`, {
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
      dispatch(setSingleAccount(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)

export const updateAccount = createAsyncThunk(
  '/account/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/accounts/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.data),
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: dataJson.message[0] }))
        return rejectWithValue()
      }
      dispatch(getAllAccount())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete role' }))
    }
  },
)

