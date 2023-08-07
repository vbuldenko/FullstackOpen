import './App.css';
import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { loadLoggedInUser } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const blogs = useSelector(({ blogs }) => blogs);

    useEffect(() => {
        dispatch(loadLoggedInUser());
        dispatch(initializeBlogs());
    }, []);

    return (
        <div className="App">
            <Notification />
            {!user ? (
                <LoginForm />
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={<Blogs user={user} blogs={blogs} />}
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;
