import './App.css';
import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { loadLoggedInUser } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

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
            {!user ? <LoginForm /> : <Blogs user={user} blogs={blogs} />}
        </div>
    );
}

export default App;
