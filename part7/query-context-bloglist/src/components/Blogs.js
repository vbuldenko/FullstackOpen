import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { useRemoveUser } from '../Context';

const Blogs = ({ user, blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); //Implemented sorting by likes
    return (
        <div className="blogs">
            <h2>Blogs</h2>
            <p>
                {user.name} logged in{' '}
                <button onClick={useRemoveUser}>logout</button>
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
