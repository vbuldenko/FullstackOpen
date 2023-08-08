import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ user, blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); //Implemented sorting by likes

    return (
        <div className="blogs">
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
