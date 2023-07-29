import { useState } from 'react';
import './blogform.css';
import { useMutation, useQueryClient } from 'react-query';
import { createBlog } from '../requests';
import { useSetNotification } from '../Context';

const BlogForm = ({ toggleVisibility }) => {
    const initBlogForm = { title: '', author: '', url: '' };
    const [newBlog, setNewBlog] = useState(initBlogForm);
    const setNotification = useSetNotification();

    const queryClient = useQueryClient();
    const newBlogMutation = useMutation(createBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
        },
    });

    const addBlog = async (event) => {
        event.preventDefault();
        try {
            newBlogMutation.mutate(newBlog);
            setNotification({
                text: `a new blog titled ${newBlog.title} by ${newBlog.author} was added!`,
                error: false,
            });
            setNewBlog(initBlogForm);
            toggleVisibility();
        } catch (error) {
            setNotification({ text: error.response.data.error, error: true });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewBlog((prev) => ({ ...prev, [name]: value }));
    };

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
    );
};

export default BlogForm;
