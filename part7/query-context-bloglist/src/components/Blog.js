import { useState } from 'react';
import './blog.css';
import { useMutation, useQueryClient } from 'react-query';
import { useSetNotification } from '../Context';
import { updateBlog, deleteBlog } from '../requests';

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false);
    const notifyWith = useSetNotification();

    const queryClient = useQueryClient();

    const updateBlogMutation = useMutation(updateBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
        },
    });

    const deleteBlogMutation = useMutation(deleteBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
        },
    });

    const handleLike = async () => {
        try {
            // const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
            const newBlog = { ...blog, likes: blog.likes + 1 };
            updateBlogMutation.mutate(newBlog);
        } catch (error) {
            notifyWith({ text: error.response.data.error, error: true });
        }
    };

    const handleRemove = () => {
        if (window.confirm('Do you really want to delete this item?')) {
            try {
                deleteBlogMutation.mutate(blog.id);
            } catch (error) {
                notifyWith({ text: error.response.data.error, error: true });
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
