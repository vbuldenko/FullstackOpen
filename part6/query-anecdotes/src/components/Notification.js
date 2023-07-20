import { useContext } from "react"
import Context from "../ContextState"

const Notification = () => {
  const context = useContext(Context)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (context[0] === null ) return null

  return (
    <div style={style}>
      {context[0]}
    </div>
  )
}

export default Notification
