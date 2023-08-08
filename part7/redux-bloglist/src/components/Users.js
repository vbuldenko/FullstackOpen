import './users.css';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
    // const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length); //Implemented sorting by number of blogs

    return (
        <div className="users">
            <h2>Users</h2>
            <h3 className="blogs-created">blogs created</h3>

            <div className="user-list">
                {users.map((user) => (
                    <div className="user-item" key={user.id}>
                        <Link className="user-name" to={`/users/${user.id}`}>
                            {user.name}
                        </Link>
                        <p className="blogs-count">{user.blogs.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
