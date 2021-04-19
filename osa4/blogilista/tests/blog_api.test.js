const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Blog on testing',
    'author': 'Me me',
    'url': 'www.me.com',
    'likes': 5
  },
  {
    'title': 'Second test blog',
    'author': 'You yu',
    'url': 'www.bloggerhost.com',
    'likes': 400
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let note of initialBlogs) {
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
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})
