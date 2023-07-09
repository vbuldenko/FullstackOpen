import { useState } from "react";
import blogService from "../services/blogs";
import './blogform.css';

const BlogForm = ({ setBlogs, setMessage, setVisible }) => {
    const initBlogForm = { title: '', author: '', url: '' };
    const [newBlog, setNewBlog] = useState(initBlogForm);

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            const returnedBlog = await blogService.create(newBlog)
            setBlogs( prev => prev.concat(returnedBlog))
            setNewBlog(initBlogForm)
            setMessage({ text: `a new blog titled ${returnedBlog.title} by ${returnedBlog.author} was added!`, error: false })
            setVisible(false)
        } catch (error) {
            setMessage({ text: error.response.data.error, error: true })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewBlog( prev => ({ ...prev, [name]:value }))
    }

    return (
        <form className="blog-form" onSubmit={addBlog}>
            <div>
                Title
                <input
                    id="title"
                    value={newBlog.title}
                    name="title"
                    onChange={handleChange}
                />
            </div>

            <div>
                Author
                <input
                    id="author"
                    value={newBlog.author}
                    name="author"
                    onChange={handleChange}
                />
            </div>

            <div>
                Url
                <input
                    id="url"
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
