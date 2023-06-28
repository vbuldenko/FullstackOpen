import './App.css';
import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';

function App() {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('1 effect run')
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div className="App">
            <Notification message={message} setMessage={setMessage} />

            {user === null ?
                <LoginForm setUser={setUser} setMessage={setMessage} />:
                <Blogs
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setUser={setUser}
                    setMessage={setMessage}
                />
            }

        </div>
    );
}

export default App;
