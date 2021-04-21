const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}