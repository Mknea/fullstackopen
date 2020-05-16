import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/filterForm'

const Content = ({countries, buttonHandler}) => {
  return(
    <div>
    {countries.length === 1
      ? <CountryDetails country={countries[0]} />
      : (countries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : <ListOptions countries={countries} buttonHandler={buttonHandler}/>
        )
    }
    </div>
  )
}

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
    <img src={country.flag} alt={`${country.name} flag`}/>
    </>
  )
}
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

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ currentCountries, setCurrentCountries] = useState([])
  const [ filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    setFilterName(event.target.value) // This is asyncronous!
    const filteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase())) // Do not use filtername, may not be updated at the time of this call
    setCurrentCountries(filteredCountries)
  }
  const handleCountrySelection = (countryObj) => {
    console.log(countryObj)
    setFilterName(countryObj.name)
    setCurrentCountries([countryObj])
  }

  useEffect( () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(
        response => {
          console.log(response.data)
          setCountries(response.data)
        }
      )
  }, []) // Get all countries at start

  return (
    <div>
      <h2>Country search</h2>
      <FilterForm name={filterName} handler={handleFilterChange} />
      <>
      <Content countries={currentCountries} buttonHandler={handleCountrySelection}/>
      </>
    </div>
  )
}

export default App;
