import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            state.push(action.payload);
        },
        updateExistingBlog(state, action) {
            const updatedBlog = action.payload;
            return state.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            );
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload);
        },
    },
});

export const { setBlogs, addBlog, updateExistingBlog, removeBlog } =
    blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog);
        dispatch(addBlog(newBlog));
    };
};

export const updateBlog = (id, modifiedBlog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(id, modifiedBlog);
        dispatch(updateExistingBlog(updatedBlog));
    };
};

export const deleteBlog = (id) => {
    return (dispatch) => {
        blogService.remove(id);
        dispatch(removeBlog(id));
    };
};

export default blogSlice.reducer;
