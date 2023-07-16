import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { notificationAction } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification === null? null: state.notification )

  if (notification === null) {
    return null
  }

  setTimeout(() => { dispatch(notificationAction(null)) }, 5000)

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification