import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAllJob, setSingleJob } from '../slices/JobsSlice'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'

export const getAllJob = createAsyncThunk(
  '/jobs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data?.content || dataJson?.response
        dispatch(setAllJob(contents))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewJob = createAsyncThunk(
  'job/add',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(
        setAllJob({
          type: TOAST_ERROR,
          content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        }),
      )
    }
    const resp = await fetch(`${API.uri}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Thêm công việc thành công' }),
      )
      dispatch(getAllJob())
    } else {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
      )
    }
  },
)

export const deleteJob = createAsyncThunk(
  '/jobs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/jobs/${id}`, {
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
            content: resp.json()?.defaultMessage ?? 'Lỗi khi xóa công việc',
          }),
        )
        return rejectWithValue()
      }
      dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Success' }))
      dispatch(getAllJob())
    } catch (e) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Lỗi khi xóa công việc' }),
      )
    }
  },
)

export const getJobById = createAsyncThunk(
  '/jobs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      let uri = `${API.uri}/jobs/${id}`

      const resp = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(setSingleJob(jsonData))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const updateJob = createAsyncThunk(
  '/jobs/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/jobs/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Update role success' }),
        )
        dispatch(getAllJob())
      } else {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: resp?.defaultMessage ?? 'Update role error ',
          }),
        )
        dispatch(getAllJob())
      }
    } catch (e) {
      console.log(e)
    }
  },
)
