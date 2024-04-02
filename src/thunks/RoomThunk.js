import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { getHeaders } from '../services/ApiService'
import { delaySync, loadTokenFromStorage } from '../services/AuthService'
import { API } from '../constants/api'
import {
  setLoading,
  setRoomTags,
  setUserRoom,
  showMediaUploadInRoom,
} from '../slices/RoomSlice'
import { FBStorageService } from '../services/firebase/StorageService'

export const getAllRoomByUser = createAsyncThunk(
  'rooms/all-by-user',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer
      const resp = await fetch(`${API.uri}/rooms/by-member/${user?.id}`, {
        method: 'GET',
        headers: getHeaders(loadTokenFromStorage()),
      })
      const jsonData = await resp.json()
      if (resp.status == 200) {
        dispatch(setUserRoom(jsonData?.data))
      }
    } catch (e) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: '"Có lỗi xảy ra khi gửi yêu cầu',
        }),
      )
    }
  },
)

export const createNewRoom = createAsyncThunk(
  '/room/create',
  async (roomData, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true))
      await delaySync(1)
      const { user } = getState().authReducer
      const resp = await fetch(`${API.uri}/rooms`, {
        method: 'POST',
        headers: getHeaders(loadTokenFromStorage()),
        body: JSON.stringify(roomData),
      })
      const jsonData = await resp.json()
      dispatch(setLoading(false))
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: jsonData?.message[0],
          }),
        )
        return rejectWithValue()
      }
      // success
      dispatch(getAllRoomByUser(user?.id))
      return jsonData
    } catch (e) {
      console.log(e)
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: 'Có lỗi xảy ra vui lòng thử lại sau',
        }),
      )
    }
  },
)

export const getRoomTags = createAsyncThunk(
  '/room/tags',
  async (roomData, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer
      const resp = await fetch(`${API.uri}/rooms/tags`, {
        method: 'GET',
        headers: getHeaders(loadTokenFromStorage()),
      })
      const jsonData = await resp.json()
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: jsonData.message[0],
          }),
        )
        rejectWithValue()
      }
      // success
      dispatch(setRoomTags(jsonData.data))
      return jsonData
    } catch (e) {
      console.log(e)
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: 'Có lỗi xảy ra vui lòng thử lại sau',
        }),
      )
    }
  },
)
export const sendMessage = createAsyncThunk(
  '/room/message/send',
  async (messageData, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer
      //handle when it's has medias
      if (messageData.media.length > 0) {
        const queueMsg = {
          mediaLength: messageData.media.length,
          msg: messageData.content,
          sender: user.id,
          roomId: messageData.roomId,
          avatar: user.avatar,
        }
        dispatch(showMediaUploadInRoom(queueMsg))
        const medias = messageData.media.map((m) => m.mediaLink)

        const uploadedMedia = await FBStorageService.uploadFiles(medias)
        messageData.media = messageData.media.map((m, index) => {
          return {
            ...m,
            mediaLink: uploadedMedia[index],
          }
        })
        console.log('messageData', messageData)
      }
      // then upload image
      messageData['memberId'] = user.id
      const resp = await fetch(`${API.uri}/rooms/send`, {
        method: 'POST',
        headers: getHeaders(loadTokenFromStorage()),
        body: JSON.stringify(messageData),
      })
      const jsonData = await resp.json()
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: jsonData.message[0],
          }),
        )
        rejectWithValue()
      }
      // success
      return jsonData
    } catch (e) {
      console.log(e)
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: 'Có lỗi xảy ra vui lòng thử lại sau',
        }),
      )
    }
  },
)

export const addNewMember = createAsyncThunk(
  'rooms',
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
    const resp = await fetch(`${API.uri}/rooms/add-member/${data.roomId}`, {
      method: 'POST',
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
    dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Thêm thành công' }))
  },
)

export const removeMember = createAsyncThunk(
  'rooms',
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
    const resp = await fetch(`${API.uri}/rooms/remove-member/${data.roomId}`, {
      method: 'POST',
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
    dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Xóa thành công' }))
  },
)

export const deleteRooms = createAsyncThunk(
  '/rooms/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        dispatch(setAlert({ type: TOAST_ERROR, content: 'Đã xảy ra lỗi' }))
        return rejectWithValue()
      }
      dispatch(
        setAlert({
          type: TOAST_SUCCESS,
          content: 'Xóa cuộc trò truyện thành công',
        }),
      )
      dispatch(getAllRoomByUser())
    } catch (e) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: 'Error when delete role' }),
      )
    }
  },
)
