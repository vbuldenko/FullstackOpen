import './users.css';

const Users = ({ users }) => {
    // const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); //Implemented sorting by likes

    return (
        <div className="users">
            <h2>Users</h2>
            <h3 className="blogs-created">blogs created</h3>

            <div className="user-list">
                {users.map((user) => (
                    <div className="user-item" key={user.id}>
                        <p className="user-name">{user.name}</p>
                        <p className="blogs-count">{user.blogs.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
