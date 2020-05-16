import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/filterForm'
import PersonForm from './components/personForm'
import Persons from './components/persons'

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
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
