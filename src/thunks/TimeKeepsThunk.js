import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from "../constants/api"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"
import { setAllTimeKeep, setPaginationTimeKeep } from "../slices/TimeKeepsSlice"

export const getAllTimeKeep = createAsyncThunk(
    '/time-keeper',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/time-keeper?page=${data || 0}&size=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (resp.status >= 200 && resp.status < 300) {
          const dataJson = await resp.json()
          const contents = dataJson?.data?.content || dataJson?.response

          dispatch(setAllTimeKeep(contents))
          dispatch(setPaginationTimeKeep(dataJson?.data))
        }
      } catch (e) {
        console.log(e)
      }
    },
  )

  
export const newCheckIn = createAsyncThunk(
    '/time-keeper/add',
    async (data, { dispatch, rejectWithValue }) => {
      const token = localStorage.getItem('auth_token')
   
      const resp = await fetch(`${API.uri}/time-keeper/checkin/${data.userId}?shift=${data.shift}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Thêm kế hoạch thành công' }),
        )
        dispatch(getAllTimeKeep())
      } else {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
        )
      }
    },
  )

export const Checkout = createAsyncThunk(
    '/time-keeper/add',
    async (data, { dispatch, rejectWithValue }) => {
      const token = localStorage.getItem('auth_token')
   
      const resp = await fetch(`${API.uri}/time-keeper/checkout/${data.userId}?shift=${data.shift}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      })
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'checkout thành công' }),
        )
        dispatch(getAllTimeKeep())
      } else {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: 'Hãy kiểm tra lại dữ liệu' }),
        )
      }
    },
  )

  export const getUserTimeKeep = createAsyncThunk(
    '/time-keeper',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/time-keeper/by-user/${data.id}?page=${data.data || 0}&size=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (resp.status >= 200 && resp.status < 300) {
          const dataJson = await resp.json()
          const contents = dataJson?.data || dataJson?.response

          dispatch(setAllTimeKeep(contents))
          dispatch(setPaginationTimeKeep(dataJson?.data))
        }
      } catch (e) {
        console.log(e)
      }
    },
  )
  export const getUserManagerTimeKeep = createAsyncThunk(
    '/time-keeper/by-user-manager',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/time-keeper/by-user-manager/${data.id}?page=${data.data || 0}&size=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (resp.status >= 200 && resp.status < 300) {
          const dataJson = await resp.json()
          const contents = dataJson?.data || dataJson?.response

          dispatch(setAllTimeKeep(contents))
          dispatch(setPaginationTimeKeep(dataJson?.data))
        }
      } catch (e) {
        console.log(e)
      }
    },
  )

