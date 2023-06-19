import Blog from './Blog';
import BlogForm from './BlogForm';

const Blogs = ({user, blogs, setBlogs }) => (
    <div>
        <h2>Blogs</h2>
        <p>{user.username} logged in <button>logout</button></p>

        <BlogForm setBlogs={setBlogs} />

        {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </div>  
)

export default Blogs