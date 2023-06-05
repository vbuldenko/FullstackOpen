const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
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

blogRouter.post('/', (request, response, next) => {

    const blog = new Blog(request.body)

    blog.save()
        .then(savedItem => {
            response.json(savedItem)
        })
        .catch(error => next(error))
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