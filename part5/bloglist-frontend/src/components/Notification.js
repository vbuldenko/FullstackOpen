const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={ `notification ${message.error? 'error': ''}`>
        {message.text}
      </div>
    )
}
  
export default Notification
