import { useState } from 'react';
import './blog.css';

import { useDispatch } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { notifyWith } from '../reducers/notificationReducer';

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            // const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
            const newBlog = { ...blog, likes: blog.likes + 1 };
            dispatch(updateBlog(blog.id, newBlog));
        } catch (error) {
            dispatch(
                notifyWith({ text: error.response.data.error, error: true })
            );
        }
    };

    const handleRemove = () => {
        if (window.confirm('Do you really want to delete this item?')) {
            try {
                dispatch(deleteBlog(blog.id));
            } catch (error) {
                dispatch(
                    notifyWith({ text: error.response.data.error, error: true })
                );
            }
        }
    };

    const blogDetails = (
        <>
            <p>{blog.url}</p>
            <p className="likes">
                likes {blog.likes}{' '}
                <button className="likeButton" onClick={handleLike}>
                    like
                </button>
            </p>
            {blog.user && (
                <>
                    <p>{blog.user.name}</p>
                    {blog.user.username === user.username && (
                        <button className="deleteButton" onClick={handleRemove}>
                            delete
                        </button>
                    )}
                </>
            )}
        </>
    );

    return (
        <div className="blog">
            <p>
                {blog.title} {blog.author}{' '}
                <button
                    className="detailsButton"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? 'hide' : 'view'}
                </button>
            </p>
            {visible && blogDetails}
        </div>
    );
};

export default Blog;
