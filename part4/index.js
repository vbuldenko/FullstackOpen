const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger')


// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')

// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb+srv://vbfullstack:Transcend29@clustervb0.db8puja.mongodb.net/blogList?retryWrites=true&w=majority'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//     Blog.find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// app.post('/api/blogs', (request, response) => {
//     const blog = new Blog(request.body)

//     blog.save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })

// const PORT = 3001

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})