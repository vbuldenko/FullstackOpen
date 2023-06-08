const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(item => {
            if (item) {
                response.json(item)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
    //Adding likes property equeling to zero if it was not declared in the first place
    const { body } = request
    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog(body)

    try {
        const savedItem = await blog.save()
        response.status(201).json(savedItem)
    } catch(error) {
        next(error)
    }
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = body

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedItem => {
            response.json(updatedItem)
        })
        .catch(error => next(error))
})

module.exports = blogRouter
