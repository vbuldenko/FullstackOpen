import './App.css';
import { useQuery } from 'react-query';
import { getBlogs } from './requests';
import storageService from './services/storage';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

function App() {
    const result = useQuery('blogs', getBlogs);
    const user = storageService.loadUser();

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    const blogs = result.data;
    console.log(blogs);

    // useEffect(() => {
    //     dispatch(loadLoggedInUser());
    // }, []);

    return (
        <div className="App">
            <Notification />
            {!user ? <LoginForm /> : <Blogs user={user} blogs={blogs} />}
        </div>
    );
}

export default App;
