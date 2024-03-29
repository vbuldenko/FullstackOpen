import axios from 'axios';
// import storageService from './storage';
const baseUrl = '/blogs'; ///api/blogs' /

// const token = storageService.loadUser()
//     ? `Bearer ${storageService.loadUser().token}`
//     : null;
// const config = {
//     headers: { Authorization: token },
// };

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (newObject) => {
    // const response = await axios.post(baseUrl, newObject, config)
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};
const addcomment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments/`, {
        comment,
    });
    // sends object to appropriately handle deeply nested request to json server
    console.log(response.data);
    return response.data;
};

const update = async (id, newBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog);
    return response.data;
};

const remove = (id) => {
    // axios.delete(`${baseUrl}/${id}`, config);
    axios.delete(`${baseUrl}/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, addcomment, update, remove };
