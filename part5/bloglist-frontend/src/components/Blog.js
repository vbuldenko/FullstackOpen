import { useState } from "react";
import './blog.css'

const Blog = ({blog}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogDetails = <>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
    </>

    return (
        <div className="blog">
            <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible? 'hide': 'view'}</button></p> 
            {visible && blogDetails}
        </div> 
    )
}
  
export default Blog