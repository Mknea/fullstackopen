import React from 'react'
import './imgStyles.css'
/**
 * Displays information on given country
 * @param {Object} country 
 */
const CountryDetails = ({country}) => {
    return(
      <>
      <h1>{country.name}</h1>
        <div>Code: {country.alpha3Code}</div>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <div>Area: {country.area}</div>
      <h3>Languages</h3>
        <ul>
            {country.languages.map(language =>
            <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
      <img 
        src={country.flag}
        className={'photo'}
        alt={`${country.name} flag`}
      />
      </>
    )
  }

export default CountryDetails;