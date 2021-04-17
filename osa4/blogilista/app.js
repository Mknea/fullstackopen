const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')

logger.info('Connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to mongodb')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())


app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app