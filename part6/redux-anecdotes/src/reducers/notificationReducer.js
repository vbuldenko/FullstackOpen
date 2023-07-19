import { createSlice } from '@reduxjs/toolkit'
  
  const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      setNotification(state, action) {
        return action.payload
      },
      removeNotification(state, action) {
        return null
      }
    }
  })

export const handleNotification = (notification, time) => {
  const seconds = time * 1000

  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
