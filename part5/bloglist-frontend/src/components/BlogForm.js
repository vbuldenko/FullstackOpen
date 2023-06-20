import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setBlogs, setMessage }) => {
    const initBlogForm = { title: '', author: '', url: '' };
    const [newBlog, setNewBlog] = useState(initBlogForm);

    const addBlog = (event) => {
        event.preventDefault()

        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs( prev => prev.concat(returnedBlog))
                setNewBlog(initBlogForm)
                setMessage({ text: `a new blog titled ${returnedBlog.title} by ${returnedBlog.author} was added!`, error: false })
            }).cath(error => setMessage({ text: error.response.data.error, error: true }))
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewBlog( prev => ({ ...prev, [name]:value }))
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                Title 
                    <input
                        value={newBlog.title}
                        name="title"
                        onChange={handleChange}
                    />
            </div>
            
            <div>
                Author
                <input
                    value={newBlog.author}
                    name="author"
                    onChange={handleChange}
                />
            </div>
            
            <div>
                Url
                <input
                    value={newBlog.url}
                    name="url"
                    onChange={handleChange}
                />
            </div>

            <button type="submit">save</button>
        </form>  
    )
}

export default BlogForm;
