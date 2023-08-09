import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logUserOut } from '../reducers/userReducer';

const Menu = ({ user }) => {
    const dispatch = useDispatch();

    const padding = {
        paddingRight: 5,
    };

    return (
        <div className="Menu">
            <Link style={padding} to={'/'}>
                blogs
            </Link>
            <Link style={padding} to={'/users'}>
                users
            </Link>
            {user ? (
                <em>
                    {user.name} logged in{' '}
                    <button onClick={() => dispatch(logUserOut())}>
                        logout
                    </button>
                </em>
            ) : (
                <Link style={padding} to="/login">
                    login
                </Link>
            )}
            <h2>Blog App</h2>
        </div>
    );
};

export default Menu;
