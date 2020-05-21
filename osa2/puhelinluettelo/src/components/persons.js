import React from 'react'
import Person from './person'

const Persons = ( {personsToShow, removeHandler} ) => {
    return(
        <>
        {personsToShow.map(person =>
            <Person
                key={person.id}
                person={person}
                removeHandler={removeHandler}
            />
        )}
        </>
    )
}
export default Persons;