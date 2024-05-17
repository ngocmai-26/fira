import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllKPI, setListKPIHistory, setPaginationKPI, setSingleKPI } from '../slices/KPIsSlice'

export const getAllKPI = createAsyncThunk(
  '/kpis',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpis?page=${data || 0}&size=20`, {
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
      dispatch(setAllKPI(dataJson.data.content))
      dispatch(setPaginationKPI(dataJson.data))
    } catch (e) {
      console.log(e)
    }
  },
)

export const deleteKPI = createAsyncThunk(
  '/KPIs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpis/${id}`, {
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
      dispatch(getAllKPI())
    } catch (e) {
      dispatch(setAlert({ type: TOAST_ERROR, content: 'Lỗi khi xóa kpi' }))
    }
  },
)

export const addNewKpi = createAsyncThunk(
  'kpis/add',
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
    const resp = await fetch(`${API.uri}/kpis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Đánh giá KPI thành công' }),
      )
      dispatch(getAllKPI())
    } else {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
      )
    }
  },
)

export const getKpisById = createAsyncThunk(
  '/KpiCategories/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      let uri = `${API.uri}/kpis/${id}`

      const resp = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(setSingleKPI(jsonData?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const getKpiVerifyById = createAsyncThunk(
  '/KpiVerify/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      let uri = `${API.uri}/kpis/verify/${id}`

      const resp = await fetch(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(getAllKPI())
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const updateKPI = createAsyncThunk(
    '/kpis/id',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/kpis/${data.id}`, {
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
  
        dispatch(getAllKPI())
      } catch (e) {
        console.log(e)
      }
    },
)

export const cancelKPI = createAsyncThunk(
  '/kpis/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/kpis/${data.id}`, {
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
      // dispatch(setAlert({ type: TOAST_SUCCESS, content: "Thành công" }))

      dispatch(getAllKPI())
    } catch (e) {
      console.log(e)
    }
  },
)


export const updateKPIDetail = createAsyncThunk(
    '/kpis/id',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/kpis/update-detail/${data.id}`, {
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
        dispatch(setAlert({ type: TOAST_SUCCESS, content: "Thành công" }))
        dispatch(getAllKPI())
      } catch (e) {
        console.log(e)
      }
    },
)
export const GetKPIHistory = createAsyncThunk(
    '/kpi-histories/by-user-in-month/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/kpi-histories/by-user-in-month/${id}`, {
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
        dispatch(setListKPIHistory(dataJson.data.body.data.content))
      } catch (e) {
        console.log(e)
      }
    },
)


