import { useState } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({user, blogs, setBlogs, setUser, setMessage }) => {
    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }
    // setVisible={setVisibleNewBlogForm} think about how to close blog form after adding new blog to the database
    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable
                visible={visible}
                setVisible={setVisible}
                buttonLabel={ visible? 'cancel': 'create new blog' }
            >
                <BlogForm
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    setVisible={setVisible}
                /> 
            </Togglable>
    
            { blogs.sort((a, b) => a.likes - b.likes).map( blog => <Blog key={blog.id} user={user} blog={blog} setMessage={setMessage} />) } //Implemented sorting by likes
        </div>
    ) 
}

export default Blogs
