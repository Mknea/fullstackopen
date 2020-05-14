import React from 'react'
import Person from './person'

const Persons = ( {personsToShow} ) => {
    return(
        <>
        {personsToShow.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />)}
        </>
    )
}
export default Persons;