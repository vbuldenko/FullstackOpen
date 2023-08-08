import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Menu from './components/Menu';
import Users from './components/Users';
import User from './components/User';

import { initializeBlogs } from './reducers/blogReducer';
import { loadLoggedInUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const blogs = useSelector(({ blogs }) => blogs);
    const users = useSelector(({ users }) => users);
    const match = useMatch('/users/:id');
    const matchedUser = match
        ? users.find((user) => user.id === match.params.id) // if user.id is a number format matched id to number as well
        : null;

    console.log(matchedUser);

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
                    <Route
                        path="/users/:id"
                        element={<User user={matchedUser} />}
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;
