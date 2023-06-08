const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper')
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({})

    for (let post of helper.initialPosts) {
        let blogObject = new Blog(post)
        await blogObject.save()
    }
})

describe('GET requests', () => {
    test('the app returns correct amount of blogs in json format', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialPosts.length)
    })

    test('the first blog _id key is obtained as id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})


describe('POST requests', () => {
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

        expect(response.body).toHaveLength(helper.initialPosts.length + 1)
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

        expect(response.body).toHaveLength(helper.initialPosts.length + 1)
        expect(likes).toContain('0')
    })

    test('if the title or url is missing from the POST request data, the backend responds with the status code 400', async () => {
        const newBlogPost = {
            author: "Mike Mouse M",
            url: "https://wwww.google.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialPosts.length)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})
