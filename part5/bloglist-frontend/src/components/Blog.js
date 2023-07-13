import { useState } from "react";
import './blog.css';
import blogService from "../services/blogs";

const Blog = (props) => {
    const [blog, setBlog] = useState(props.blog)
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = async () => {
        try {
            const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
            const updatedBlog = await blogService.update(blog.id, newBlog)
            setBlog(updatedBlog)
        } catch (error) {
            props.setMessage({ text: error.response.data.error, error: true })
        }
    }

    const handleRemove = () => {
        if (window.confirm("Do you really want to delete this item?")) {
            try {
                blogService.remove(blog.id)
                props.setBlogs(prev => prev.filter( b => b.id !== blog.id))
            } catch (error) {
                props.setMessage({ text: error.response.data.error, error: true })
            }
        }
    }


    const blogDetails = <>
        <p>{blog.url}</p>
        <p className="likes">likes {blog.likes} <button className="likeButton" onClick={handleLike}>like</button></p>
        <p>{ blog.user? blog.user.name: '' }</p>
        { blog.user? (props.user.username === blog.user.username && <button className="deleteButton" onClick={handleRemove} >remove</button>): '' }
    </>

    return (
        <div className="blog">
            <p>{blog.title} {blog.author} <button className="detailsButton" onClick={toggleVisibility}>{visible? 'hide': 'view'}</button></p>
            {visible && blogDetails}
        </div>
    )
}

export default Blog
