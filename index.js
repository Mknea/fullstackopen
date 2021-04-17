require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find()
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const updatedPersonData = {
    name: req.body.name,
    number: req.body.number
  }
  Person.findByIdAndUpdate(req.params.id, updatedPersonData, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (req, res) => {
  const timestamp = new Date()
  Person
    .find()
    .countDocuments((err, count) => {
      if (err) {
        res.status(500).end()
      }
      else {
        res.send(
          `<div>Phonebook has info for ${count} people</div>` +
          `<div>${timestamp}</div>`
        )
      }
    })
})

app.post('/api/persons', (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person
    .save()
    .then(savedPerson => {
      console.log(
        `Saved ${savedPerson.name} number ${savedPerson.number} to db with id ${savedPerson._id}`)
      res.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then( () => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})