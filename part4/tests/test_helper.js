const Blog = require('../models/blog');

const initialPosts = [
    {
        "title": "Awesome text",
        "author": "Some James",
        "url": "https://wwww.google.com",
        "likes": 5
    },
    {
        "title": "Second awesome text",
        "author": "Mike James",
        "url": "https://wwww.google.com",
        "likes": 10
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

module.exports = {
    initialPosts,
    nonExistingId
}