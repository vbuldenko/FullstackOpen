import { useState } from "react";
import './loginform.css';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({setUser, setMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            blogService.setToken(user.token) //May be should be refactored later
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessage({ text: 'Wrong credentials', error: true })
        }
    }

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            <div>
                username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
            </div>
            <div>
                password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
            </div>
            <button type="submit">login</button>
        </form>
        )
}
  
export default LoginForm
