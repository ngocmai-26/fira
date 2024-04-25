import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { API } from '../constants/api'
import {
  setAllKPICategories,
  setPaginationKPICategories,
  setSingleKPICategories,
} from '../slices/KPICategoriesSlice'

export const getAllKPICategories = createAsyncThunk(
  '/kpisCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(
        `${API.uri}/kpi-categories?page=${data || 0}&size=20`,
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
      dispatch(setAllKPICategories(dataJson.data.content))
      dispatch(setPaginationKPICategories(dataJson.data))
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewKpiCategories = createAsyncThunk(
  'kpisCategories/add',
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
    const resp = await fetch(`${API.uri}/kpi-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Thêm thành công' }))
      dispatch(getAllKPICategories())
    } else {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
      )
    }
  },
)

export const deleteKPICategories = createAsyncThunk(
  '/KPICategories/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpi-categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: resp.json()?.defaultMessage ?? 'Lỗi khi xóa kpi',
          }),
        )
        return rejectWithValue()
      }
      dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Xóa thành công' }))
      dispatch(getAllKPICategories())
    } catch (e) {
      dispatch(setAlert({ type: TOAST_ERROR, content: 'Lỗi khi xóa kpi' }))
    }
  },
)

export const updateKPICategories = createAsyncThunk(
  '/kpiCategories/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpi-categories/${data.id}`, {
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

      dispatch(getAllKPICategories())
    } catch (e) {
      console.log(e)
    }
  },
)

export const getKpiCategoriesById = createAsyncThunk(
  '/KpiCategories/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      let uri = `${API.uri}/kpi-categories/${id}`

      const resp = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(setSingleKPICategories(jsonData?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const searchKPICategoriesAsync = createAsyncThunk(
  '/kpiCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpi-categories/search-by-name?name=${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        dispatch(setAllKPICategories(dataJson.data.content))
      }
    } catch (e) {
      console.log(e)
    }
  },
)
