const mongoose = require('mongoose')

if (process.argv.length<3 || process.argv.length === 4) {
  console.log(
    'Either give password as argument, or password, name and phone number!'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb://fullstack:${password}@localhost:27017/fullstack?retryWrites=true`

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

const createNewEntry = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const readAllEntries= () => {
  Person
    .find()
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (name !== undefined && number !== undefined) {
  createNewEntry(name, number)
}
else {
  readAllEntries()
}