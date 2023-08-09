import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); //Implemented sorting by likes

    const padding = {
        padding: 0,
    };

    return (
        <div className="blogs">
            <Togglable>
                <BlogForm />
            </Togglable>

            {sortedBlogs.map((blog) => (
                <div key={blog.id}>
                    <Link style={padding} to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
