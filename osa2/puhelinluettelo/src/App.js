import React, { useState, useEffect } from 'react'
import FilterForm from './components/filterForm'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name : newName,
        number : newNumber
      }
      personService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => window.alert(`Error adding a new entry: ${error}`))
    }
  }
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm name={filterName} handler={handleFilterChange} />

      <h3>Add a new entry</h3>
      <PersonForm
        submitHandler={addPerson}
        newName={newName}
        nameChangeHandler={handleNameChange}
        newNumber={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
