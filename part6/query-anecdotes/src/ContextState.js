import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFICATION":
        return action.payload
    case "OFF":
        return null
    default:
        return state
  }
}

const Context = createContext()

export const ContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const notificationHandler = (content) => {
    notificationDispatch({type: 'NOTIFICATION', payload: content})
    setTimeout(() => notificationDispatch({type: "OFF"}), 5000)
  }

  return (
    <Context.Provider value={[notification, notificationDispatch, notificationHandler] }>
      {props.children}
    </Context.Provider>
  )
}

export default Context
