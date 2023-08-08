import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Menu from './components/Menu';
import Users from './components/Users';

import { initializeBlogs } from './reducers/blogReducer';
import { loadLoggedInUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const blogs = useSelector(({ blogs }) => blogs);
    const users = useSelector(({ users }) => users);
    console.log(user);

    useEffect(() => {
        dispatch(loadLoggedInUser());
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, []);

    return (
        <div className="App">
            <Notification />
            <Menu user={user} />
            {!user ? (
                <LoginForm />
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={<Blogs user={user} blogs={blogs} />}
                    />
                    <Route path="/users" element={<Users users={users} />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
