import './blog.css';
import { useDispatch } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { notifyWith } from '../reducers/notificationReducer';

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch();
    if (!blog) {
        return null;
    }

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

    return (
        <div className="blog">
            <h2>
                {blog.title} - {blog.author}
            </h2>
            <p>{blog.url}</p>
            <p className="likes">
                {blog.likes} likes{' '}
                <button className="likeButton" onClick={handleLike}>
                    like
                </button>
            </p>
            {blog.user && (
                <>
                    <p>added by {blog.user.name}</p>
                    {blog.user.username === user.username && (
                        <button className="deleteButton" onClick={handleRemove}>
                            delete
                        </button>
                    )}
                </>
            )}

            <h3>comments</h3>
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
