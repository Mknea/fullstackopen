import React from 'react'

/**
 * Displays the list of countries during filtering
 * @param {Array} countries 
 * @param {Function} buttonHandler
 */
const ListOptions = ({countries, buttonHandler}) => {
    return(
      <>
      {countries.map((country, i) => {
        return(
        <div key={country.alpha3Code}>{country.name}
        <button
          onClick={() => buttonHandler(country)} // pass obj to handler
          key={country.alpha3Code.concat(i)}>
            Show
        </button>
        </div>
        )}
      )}
      </>
    )
  }

export default ListOptions;