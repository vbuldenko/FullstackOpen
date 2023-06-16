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

    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})


describe('POST requests', () => {
    // test('the POST request creates a new blog post with user as its creator', async () => {
    //     const users = await helper.usersInDb()

    //     const newBlogPost = {
    //         title: "Any text",
    //         author: "Mikey Mouse",
    //         url: "https://wwww.google.com",
    //         likes: 3,
    //         user: users[0].id
    //     }

    //     await api
    //         .post('/api/blogs')
    //         .send(newBlogPost)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const response = await api.get('/api/blogs')
    //     const titles = response.body.map(p => p.title)

    //     expect(response.body).toHaveLength(helper.initialPosts.length + 1)
    //     expect(titles).toContain('Any text')
    // })

    test('the POST request creates a new blog post', async () => {
        const [ user ] = await helper.usersInDb()
        
        const { token } = await api.post('/api/login').send(user)
        
        const newBlogPost = {
            title: "Third awesome text",
            author: "Mike Mouse",
            url: "https://wwww.google.com",
            likes: 7
        }

        await api
            .post('/api/blogs')
            .send(newBlogPost)
            .set({ Authorization: token })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        console.log(response.body[2])
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

describe('DELETE request', () => {
    test('completes with a status code 204, shorter list, and missing title ', async () => {
        const res_at_start = await api.get('/api/blogs')
        const blogToDelete = res_at_start.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const res_at_end = await api.get('/api/blogs')
        expect(res_at_end.body).toHaveLength(helper.initialPosts.length - 1)

        const titles = res_at_end.body.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('PUT request', () => {
    test('completes with changed likes property ', async () => {
        const res_at_start = await api.get('/api/blogs')
        const blogToChange = res_at_start.body[0]

        blogToChange.likes = '17'

        await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(blogToChange)

        const res_at_end = await api.get('/api/blogs')
        expect(res_at_end.body).toHaveLength(helper.initialPosts.length)

        const likes = res_at_end.body.map(b => b.likes)
        expect(likes).toContain('17')
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})
