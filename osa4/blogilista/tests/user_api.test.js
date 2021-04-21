const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./api_test_helper')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ name: 'McTestiest', username: 'root', passwordHash })

  await user.save()
})

afterAll(() => {
  mongoose.connection.close()
})


describe('when there is initially one user at db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Test Tester',
      password: 'secccccret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short username or password', async () => {
    const usersAtStart = await helper.usersInDb()

    const failingUser1 = {
      username: 't',
      name: 'Test Tester',
      password: 'secccccret',
    }
    const failingUser2 = {
      username: 'testyy',
      name: 'Test Tester',
      password: 'se',
    }
    // For some reason any loop causes async issues
    const result1 = await api
      .post('/api/users')
      .send(failingUser1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const result2 = await api
      .post('/api/users')
      .send(failingUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result1.body.error).toContain('is shorter than the minimum allowed length (3)')
    expect(result2.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})