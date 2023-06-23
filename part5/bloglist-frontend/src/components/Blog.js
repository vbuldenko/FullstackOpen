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
            const newBlog = { ...blog, user: blog.user._id, likes: blog.likes + 1 }
            const updatedBlog = await blogService.update(blog.id, newBlog)
            setBlog(updatedBlog)
        } catch (error) {
            props.setMessage({ text: error.response.data.error, error: true })
        }
    }

    const handleRemove = async () => {
        try {
            await blogService.remove(blog.id)
        } catch (error) {
            props.setMessage({ text: error.response.data.error, error: true })
        }
    }

    const blogDetails = <>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={handleRemove} >remove<button/>
    </>

    return (
        <div className="blog">
            <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible? 'hide': 'view'}</button></p> 
            {visible && blogDetails}
        </div> 
    )
}
  
export default Blog
