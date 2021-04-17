const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favouriteBlog = (blogs) => {
  /**
   * Finds the single blog with most likes in given list.
   */
  let favourite = null
  let mostLikes = 0
  blogs.forEach(blog => {
    if (blog.likes >= mostLikes) {
      favourite = blog
      mostLikes = blog.likes
    }
  })
  return favourite
}

const mostBlogs = (blogs) => {
  let mostBlogsAuthor = { 'blogs': null }
  _(blogs)
    .countBy('author')
    .forEach((count, name) => {
      if (mostBlogsAuthor.blogs <= count) {
        mostBlogsAuthor = {
          'author': name,
          'blogs': count
        }
      }
    })
  if (mostBlogsAuthor.blogs === null) {
    return undefined
  } else {
    return mostBlogsAuthor
  }
}

const mostLikes = (blogs) => {
  /**
   * Finds the author with most likes combined of all given blogs.
   * @returns Object with author's name and combined amount of likes
   */
  let mostLikedAuthor = { 'likes': null }
  _.forEach(blogs, (base_blog) => {
    let likesPerAuthor = {
      'author': base_blog.author,
      'likes' : _.reduce(blogs, (acc, blog) => {
        if (base_blog.author === blog.author) {
          return blog.likes + acc
        } else {
          return acc
        }
      }, 0)
    }
    if (mostLikedAuthor.likes <= likesPerAuthor.likes) {
      mostLikedAuthor = likesPerAuthor
    }
  })
  if (mostLikedAuthor.likes === null) {
    return undefined
  } else {
    return mostLikedAuthor
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}