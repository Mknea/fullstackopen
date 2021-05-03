const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes,
    url: body.url,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    likes: request.body.likes
  }
  const updateResult = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  )
  response.json(updateResult)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const userId = request.user._id
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({
      error: 'Cannot find the blog to be deleted'
    })
  }
  else if (blog.user.toString() !== userId.toString()) {
    //console.log(blog.user.toString())
    //console.log(userId.toString())
    return response.status(401).json({
      error: 'Cannot remove other author\'s blog'
    })
  }
  else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

})

module.exports = blogsRouter