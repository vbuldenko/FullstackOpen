import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject).sort( (a, b) => b.votes - a.votes) // Ordered by the votes initially

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote ( state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote ).sort((a, b) => b.votes - a.votes)
    },
    createAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  }
}

export const addNewAnecdote = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.create(anecdote)
    dispatch(createAnecdote(response))
  }
}

// // Action creators
// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'CREATE',
//     payload: { 
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// // Main reducer
// const reducer = (state = initialState, action) => {
//   console.log('action', action)

//   switch(action.type) {

//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToVote = state.find(a => a.id === id)
//       const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote ).sort((a, b) => b.votes - a.votes) // Ordered by the votes after voting
//      }
//     case 'CREATE': {
//       return [ ...state, action.payload ]
//     }

//     default:
//       return state
//   }
// }

// export default reducer

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
