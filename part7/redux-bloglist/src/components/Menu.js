import { useDispatch } from 'react-redux';
import { logUserOut } from '../reducers/userReducer';

const Menu = ({ user }) => {
    const dispatch = useDispatch();

    if (!user) {
        return null;
    }

    return (
        <div className="Menu">
            <h2>Blogs</h2>
            <p>
                {user.name} logged in{' '}
                <button onClick={() => dispatch(logUserOut())}>logout</button>
            </p>
        </div>
    );
};

export default Menu;
