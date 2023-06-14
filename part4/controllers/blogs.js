const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const item = await Blog.findById(request.params.id)
        if (item) {
            response.json(item)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const { body } = request
    const user = await User.findById(body.user)
    //responds with status 400 if there no title or url properties in the request
    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title or URL is missing' })
    }

    //Adding likes property equeling to zero if it was not declared in the first place
    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({...body, user: user.id})

    try {
        const savedItem = await blog.save()
        user.blogs = user.blogs.concat(savedItem._id)
        await user.save()
        response.status(201).json(savedItem)
    } catch(error) {
        next(error)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const newBlog = request.body

    try {
        const updatedItem = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
        response.json(updatedItem)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
