import axios from 'axios';

const baseUrl = '/blogs'; //'/api/blogs'
const baseLoginUrl = '/login'; //'/api/login'

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data);

export const createBlog = (newBlog) =>
    axios.post(baseUrl, newBlog).then((res) => res.data);

export const updateBlog = (newBlog) =>
    axios.put(`${baseUrl}/${newBlog.id}`, newBlog).then((res) => res.data);

export const deleteBlog = (id) => axios.delete(`${baseUrl}/${id}`);

export const loginIn = (credentials) =>
    axios.post(baseLoginUrl, credentials).then((res) => res.data);

// export const getBlogs = async () => {
//     const response = await axios.get(baseUrl);
//     return response.data;
// };
