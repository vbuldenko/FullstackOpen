import Blog from './Blog';

const Blogs = ({user, blogs}) => (
    <div>
        <h2>Blogs</h2>
        <p>{user.username} logged in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </div>  
)

export default Blogs