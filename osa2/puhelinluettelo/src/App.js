import React, { useState } from 'react'

const Content = ( {text} ) => (
  <div>
    {text}
  </div>
)

const App = () => {
  const [ persons, setPersons] = useState(
    [{ name: 'Arto Hellas' }]
    ) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name : newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Content key={person.name} text={person.name} />)}
    </div>
  )

}

export default App
