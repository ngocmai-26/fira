import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../constants/api"
import { setAllNotifications } from "../slices/NotificationSlice"
import { setAlert } from "../slices/AlertSlice"
import { TOAST_ERROR } from "../constants/toast"

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

  export const readNotification = createAsyncThunk(
    '/account/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('auth_token')
        const resp = await fetch(`${API.uri}/notifications/${id}`, {
          method: 'PUT',
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
        dispatch(getAllNotification())
      } catch (e) {
        console.log(e)
      }
    },
  )