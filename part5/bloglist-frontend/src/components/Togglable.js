import PropTypes from 'prop-types';

const Togglable = ({ visible, setVisible, children, buttonLabel}) => {

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className="toggler">
            <div style={{ display: visible ? '' : 'none' }} >
                {children}
            </div>
            <button onClick={toggleVisibility}>{ buttonLabel }</button>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable