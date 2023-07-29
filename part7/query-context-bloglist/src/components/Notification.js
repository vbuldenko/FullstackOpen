import { useNotificationValue } from '../Context';

const Notification = () => {
    const message = useNotificationValue();

    if (!message) {
        return null;
    }

    return (
        <div className={`notification ${message.error ? 'error' : ''}`}>
            {message.text}
        </div>
    );
};

export default Notification;
