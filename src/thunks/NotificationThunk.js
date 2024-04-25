import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../constants/api"
import { setAllNotifications } from "../slices/NotificationSlice"

export const getAllNotification = createAsyncThunk(
    '/notification',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(
          `${API.uri}/notifications/by-user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
            },
          },
        )
        const dataJson = await resp.json()
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(setAllNotifications(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )