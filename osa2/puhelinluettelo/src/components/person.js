import React from 'react'
const Person = ( {person, removeHandler} ) => {
  return (
    <>
    <div>
      {person.name} {person.number}
      <button
      onClick={() => removeHandler(person)} >
        Delete
    </button>
    </div>
    </>
  )
}
export default Person;