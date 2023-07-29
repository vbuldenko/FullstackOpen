import { useState } from 'react';
import './loginform.css';

import { useSetNotification, useSetUser } from '../Context';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setNotification = useSetNotification();
    const setUser = useSetUser();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setUser({ username, password });
            setUsername('');
            setPassword('');
        } catch (exception) {
            setNotification({ text: 'Wrong credentials', error: true });
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">
                login
            </button>
        </form>
    );
};

export default LoginForm;
