import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({user, blogs, setBlogs, setUser, setMessage }) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }
    // setVisible={setVisibleNewBlogForm} think about how to close blog form after adding new blog to the database
    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel={ {open: 'create new blog', close: 'cancel'} } >
                <BlogForm setBlogs={setBlogs} setMessage={setMessage} /> 
            </Togglable>
    
            { blogs.map( blog => <Togglable buttonLabel={ {open: 'view', close: 'hide'} } >
                                    <Blog key={blog.id} blog={blog} />
                                </Togglable> 
                )
            }
        </div>
    ) 
}

export default Blogs
