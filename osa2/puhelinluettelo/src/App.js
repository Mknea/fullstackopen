import React, { useState, useEffect } from 'react'
import FilterForm from './components/filterForm'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('') // Text input in name form
  const [ newNumber, setNewNumber] = useState('') // Text input in number form
  const [ filterName, setFilterName] = useState('') // Text input in filter form

  const [ notification, setNotification] = useState(null)
  const [ isNotificationError, setIsNotificationError] = useState(true)

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) // Perform at start

  const displayNotification = (text, isError) => {
    console.log(text)
    setNotification(text)
    setIsNotificationError(isError)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      const doReplace = window.confirm(
        `${newName} is already added to phonebook, ` +
        `replace the old number with a new one?`)
      if (doReplace) {
        const changedPerson = {...foundPerson, number: newNumber}
        personService
          .update(changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id === returnedPerson.id ? returnedPerson : person)
            )
            displayNotification(`${returnedPerson.name}'s number was succesfully modified.`, false)
          })
          .catch((error) => {
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            displayNotification(`Information of ${changedPerson.name} has already been removed from server`, true)
          })
      }
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
          displayNotification(`${addedPerson.name} was succesfully added.`, false)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => displayNotification(`Error encountered while adding a new person`, true))
    }
  }
  const removePerson = (personToBeDeleted) => {
    if (window.confirm(`Delete ${personToBeDeleted.name}?`)) {
      personService
      .remove(personToBeDeleted)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
        displayNotification(`${personToBeDeleted.name} was succesfully removed.`, false)
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
        displayNotification(`Information of ${personToBeDeleted.name} has already been removed from server`, true)
      })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        text={notification}
        isError={isNotificationError}
      />
      <FilterForm 
        name={filterName}
        handler={handleFilterChange}
      />

      <h3>Add a new entry</h3>
      <PersonForm
        submitHandler={addPerson}
        newName={newName}
        nameChangeHandler={handleNameChange}
        newNumber={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        removeHandler={removePerson}
      />
    </div>
  )
}

export default App
