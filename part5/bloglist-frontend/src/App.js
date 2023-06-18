import './App.css';
import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import Blogs from './services/blogs';

function App() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }, [])

    return (
        <div className="App">
            <Notification message={errorMessage} />

            {user === null ? 
                <LoginForm setUser={setUser} setError={setErrorMessage} />:
                <Blogs user={user} blogs={blogs} />
            }
            
        </div>
    );
}

export default App;
