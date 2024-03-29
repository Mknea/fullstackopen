const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction, most likes',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of list with single entry is calculated right', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(blogs[0].likes)
  })

  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(34)
  })
})

describe('favourite blog', () => {

  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(null)
  })

  test('of list with single entry is that entry', () => {
    const result = listHelper.favouriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })

  test('of two blogs with same amount of likes is the one checked later', () => {
    const result = listHelper.favouriteBlog([blogs[0], blogs[1]])
    expect(result).toEqual(blogs[1])
  })

  test('of many blogs is the one with most likes', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {

  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('of many blogs is one with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      'author': 'Robert C. Martin',
      'blogs': 3
    })
  })
})

describe('most likes', () => {

  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('of single blog with 0 likes is still with that blog', () => {
    const result = listHelper.mostLikes([blogs[4]])
    expect(result).toEqual({
      'author': blogs[4].author,
      'likes': 0
    })
  })

  test('of single blog is its author with the blog\'s like amount', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({
      'author': blogs[0].author,
      'likes': blogs[0].likes
    })
  })

  test('of many blogs is one with largest combined amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      'author': blogs[2].author,
      'likes': 17
    })
  })
})