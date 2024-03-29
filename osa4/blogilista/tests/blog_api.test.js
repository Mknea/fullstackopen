const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./api_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let note of helper.initialBlogs) {
    let noteObject = new Blog(note)
    await noteObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Get blogs', () => {

  test('returns them all in json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('returns blog identifier field as \'id\', not \'_id\'', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body[0]).toHaveProperty('id')
  })
})

describe('Add new blog', () => {

  test('adds that blog to DB', async () => {
    const newBlog = {
      'title': 'Crazy simple way to add new test blog!',
      'author': 'He she',
      'url': 'www.sloggerhost.com',
      'likes': 40000
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog))
  })

  test('adds the blog with 0 likes if they are omitted', async () => {
    const newBlog = {
      'title': 'How to create unliked blog',
      'author': 'He he',
      'url': 'www.muggerhost.com',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const expectedResult = {
      ...newBlog,
      'likes': 0
    }
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(expectedResult))
  })

  test('fails if title or url are omitted', async () => {
    const newBlog1 = {
      'author': 'Harry McNoTitle',
      'url': 'www.sluggerhost.com',
      'likes': 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const newBlog2 = {
      'author': 'Sally McNoURL',
      'title': 'How to create blog without url',
      'likes': 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Delete blog', () => {

  test('removes it from DB', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blog['id']}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(blog))
  })

})

describe('Mofidy blog', () => {

  test('overwrites only \'likes\' and ignores other fields', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let modifiedBlog = { ...blogsAtStart[0] }
    modifiedBlog.likes = 50
    modifiedBlog.title = 'How to update a blog title'
    await api
      .put(`/api/blogs/${modifiedBlog['id']}`)
      .send(modifiedBlog)
      .expect(200)

    let expectedBlog = {
      ...blogsAtStart[0],
      likes: 50
    }
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toContainEqual(expect.objectContaining(expectedBlog))
  })

  test('does nothing without new \'likes\'-value', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let modifiedBlog = { ...blogsAtStart[0] }
    modifiedBlog.title = 'How to update a blog title'
    await api
      .put(`/api/blogs/${modifiedBlog['id']}`)
      .send(modifiedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toContainEqual(expect.objectContaining(blogsAtStart[0]))
  })

})