import { useDispatch } from 'react-redux';
import { logUserOut } from '../reducers/userReducer';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ user, blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); //Implemented sorting by likes
    const dispatch = useDispatch();

    return (
        <div className="blogs">
            <h2>Blogs</h2>
            <p>
                {user.name} logged in{' '}
                <button onClick={() => dispatch(logUserOut())}>logout</button>
            </p>

            <Togglable>
                <BlogForm />
            </Togglable>

            {sortedBlogs.map((blog) => (
                <Blog key={blog.id} user={user} blog={blog} />
            ))}
        </div>
    );
};

export default Blogs;
