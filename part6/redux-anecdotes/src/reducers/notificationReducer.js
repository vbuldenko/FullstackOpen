import { createSlice } from '@reduxjs/toolkit'
  
  const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      notificationAction(state, action) {
        return action.payload
      }
    }
  })

export const { notificationAction } = notificationSlice.actions
export default notificationSlice.reducer