import { useState } from "react";


const Togglable = ({ children, buttonLabel}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={{ display: visible ? '' : 'none' }} >
                {children}
            </div>
            <button onClick={toggleVisibility}>{ visible? buttonLabel.close: buttonLabel.open }</button>
        </div>
    )
}

export default Togglable