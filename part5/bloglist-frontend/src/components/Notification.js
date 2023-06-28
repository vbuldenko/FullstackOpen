const Notification = ({ message, setMessage }) => {
    if (message === null) {
        return null
    }

    setTimeout(() => { setMessage(null) }, 5000)

    return (
        <div className={ `notification ${message.error? 'error': ''}`}>
            {message.text}
        </div>
    )
}

export default Notification
