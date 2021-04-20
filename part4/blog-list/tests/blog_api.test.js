const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there are some blogs save initially', () => {
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs should contain id property (not _id)', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of new blog', () => {
test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New blog by M',
        author: 'Mainul',
        url: 'http://mainul.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

   const titles = blogsAtEnd.map((b) => b.title)
   expect(titles).toHaveLength(helper.initialBlogs.length + 1)
   expect(titles).toContain('New blog by M')

})

test('if like property is missing from req, it will default to the value 0', async () => {
    const newBlog = {
        title: 'Without likes',
        author: 'like',
        url: 'http://like.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)

})

test('blog without title or url is not added', async () => {
    const newBlog = {
        likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
})

describe('deletion of a blog', () => {
    test('succeeds deletion with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating of likes of blog', () => {
    test('succeeds update with status 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()

        console.log({ blogsAtStart })
        const blogToUpdate = blogsAtStart[0]
        console.log(blogToUpdate)
        
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 12 })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const updatedBlog = blogsAtEnd[0]

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        expect(updatedBlog.likes).toBe(12)
    })
})


afterAll(() => {
    mongoose.connection.close()
})