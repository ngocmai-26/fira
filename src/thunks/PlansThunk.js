import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from "../constants/api"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"
import { setAllPlan, setPaginationPlan, setSinglePlan } from "../slices/PlansSlice"

export const getAllPlan = createAsyncThunk(
    '/plans',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/plans?page=${data || 0}&size=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (resp.status >= 200 && resp.status < 300) {
          const dataJson = await resp.json()
          const contents = dataJson?.data?.content || dataJson?.response
          dispatch(setAllPlan(contents))
          dispatch(setPaginationPlan(dataJson?.data))
        }
      } catch (e) {
        console.log(e)
      }
    },
  )

export const addNewPlan = createAsyncThunk(
    'plans/add',
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
      const resp = await fetch(`${API.uri}/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Thêm kế hoạch thành công' }),
        )
        dispatch(getAllPlan())
      } else {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
        )
      }
    },
  )

  export const deletePlan = createAsyncThunk(
    '/plans/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/plans/${id}`, {
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
              content: resp.json()?.defaultMessage ?? 'Lỗi khi xóa kế hoạch',
            }),
          )
          return rejectWithValue()
        }
        dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Success' }))
        dispatch(getAllPlan())
      } catch (e) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: 'Lỗi khi xóa kế hoạch' }),
        )
      }
    },
  )
  
  
export const updateStatus = createAsyncThunk(
  '/plans/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/plans/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.data),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Update plan success' }),
        )
        dispatch(getAllPlan())
      } else {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: resp?.defaultMessage ?? 'Update plan error ',
          }),
        )
      }                      
    } catch (e) {
      console.log(e)
    }
  },
)

export const getPlanById = createAsyncThunk(
  '/plans',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/plans/${data.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data || dataJson?.response
        dispatch(setSinglePlan(contents))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const updatePlan = createAsyncThunk(
  '/plans/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/plans/${data.id}`, {
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
      dispatch(
        setAlert({
          type: TOAST_SUCCESS,
          content: 'Cập nhật kế hoạch thành công',
        }),
      )
      dispatch(getAllPlan())
    } catch (e) {
      console.log(e)
    }
  },
)
  