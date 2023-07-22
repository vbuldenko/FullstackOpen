

const Notification = ( { info }) => {

    if (!info) {
        return null
    }

    const padding = {
      paddingRight: 5,
      color: 'red'
    }
    return (
      <div style={padding}>
        <p>a new anecdote {info} created!</p>
      </div>
    )
}

export default Notification