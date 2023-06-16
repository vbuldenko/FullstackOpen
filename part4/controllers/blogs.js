const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    const { body, user } = request

    try {
        //responds with status 400 if there no title or url properties in the request
        if (!body.title || !body.url) {
            return response.status(400).json({ error: 'Title or URL is missing' })
        }

        //Adding likes property equeling to zero if it was not declared in the first place
        if (!body.likes) {
            body.likes = 0
        }

        const blog = new Blog({ ...body, user: user.id })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch(error) {
        next(error)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(404).json({ error: 'Blog is not found' });
        }

        if ( blog.user.toString() !== request.user.id ) {
            return response.status(403).json({ error: 'User is not authorized to delete this blog' })
        }

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
