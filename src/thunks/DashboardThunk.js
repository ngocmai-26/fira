import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAllDashboard } from "../slices/DashboardSlice"
import { API } from "../constants/api"

export const getAllDashboard = createAsyncThunk(
    '/dashboard',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(
          `${API.uri}/dashboard`,
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
          return rejectWithValue()
        }
        console.log("dataJson.data", dataJson.data)
        dispatch(setAllDashboard(dataJson.data))
      } catch (e) {
        console.log('Error')
      }
    },
  )