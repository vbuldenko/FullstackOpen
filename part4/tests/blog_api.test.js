const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog')

const api = supertest(app);

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialPosts[0])
    await blogObject.save()
    blogObject = new Blog(initialPosts[1])
    await blogObject.save()
})

test('the app returns correct amount of blogs in json format', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(initialPosts.length)
})

test('the first blog _id key is obtained as id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('the POST request creates a new blog post', async () => {
    const newBlogPost = {
        title: "Third awesome text",
        author: "Mike Mouse",
        url: "https://wwww.google.com",
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(p => p.title)

    expect(response.body).toHaveLength(initialPosts.length + 1)
    expect(titles).toContain('Third awesome text')
})

test('if likes are missing in the POST request it defaults to 0', async () => {
    const newBlogPost = {
        title: "One more awesome text",
        author: "Mike Mouse M",
        url: "https://wwww.google.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(p => p.likes)

    expect(response.body).toHaveLength(initialPosts.length + 1)
    expect(likes).toContain('0')
})

test('if the title or url is missing from the request data, the backend responds with the status code 400', async () => {
    const newBlogPost = {
        author: "Mike Mouse M",
        url: "https://wwww.google.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialPosts.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})
