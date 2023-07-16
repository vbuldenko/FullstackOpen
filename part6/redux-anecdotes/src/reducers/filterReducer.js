import { createSlice } from '@reduxjs/toolkit'
  
  // // Action creators
  // export const filter = (filterInfo) => {
  //   return {
  //     type: 'FILTER',
  //     payload: filterInfo
  //   }
  // }
  
  // // Main reducer
  // const reducer = (state = '', action) => {
  //   console.log('state now: ', state)
  //   console.log('action', action)
  
  //   switch(action.type) {
  //     case 'FILTER': 
  //       return action.payload
  //     default:
  //       return state
  //   }
  // }
  
  // export default reducer

  // reducer combined with actioncreator via createSlice
  const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
      filter(state, action) {
        return action.payload
      }
    }
  })

export const { filter } = filterSlice.actions
export default filterSlice.reducer