import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/filterForm'

const Content = ({countries, weatherDetails, buttonHandler}) => {
  return(
    <div>
    {countries.length === 1
      ? (
        <>
        <CountryDetails country={countries[0]} />
        {Object.keys(weatherDetails).length !== 0 &&
          <WeatherDetails capital={countries[0].capital} data={weatherDetails} />
        }
        </>
      )
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

const WeatherDetails = ({capital, data}) => {
  return(
    <>
    <h2>Weather in {capital}</h2>
    <div>Temperature {data.temp.toFixed(2)} celcius</div>
    <div>Humidity {data.humidity}%</div>
    <img src={data.weatherImgUrl} alt={data.weatherName}/>
    <a href={data.moreInfoUrl}>More information</a>
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
  const [ weatherDetails, setWeatherDetails] = useState({})

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

  useEffect( () => {
    setWeatherDetails({})
    if (currentCountries.length === 1) {
      const proxyurl = "https://cors-anywhere.herokuapp.com/" // CORS proxy
      const metaWeatherUrl = "https://www.metaweather.com"
      const locationSearchUrl = `/api/location/search/?query=${currentCountries[0].capital}`
      axios
        .get(proxyurl + metaWeatherUrl + locationSearchUrl)
        .then(response => {
            console.log(response) 
            if (response.data.length === 0) {
              return Promise.reject('No weather data on given capital')
            }
            return(response.data[0].woeid)
        })
        .then(woeid=> {
          const locationUrl = `/api/location/${woeid}`
          axios
            .get(proxyurl + metaWeatherUrl + locationUrl)
            .then(response => {
              if (response.data.length === 0) {
                return Promise.reject('No weather data providers on given capital')
              }
              console.log(response)
              const data = response.data.consolidated_weather[0]
              setWeatherDetails(
                {
                  'temp': data.the_temp,
                  'humidity' : data.humidity,
                  'weatherName': data.weather_state_name,
                  'weatherImgUrl' : (metaWeatherUrl + `/static/img/weather/${data.weather_state_abbr}.svg`),
                  'moreInfoUrl': (metaWeatherUrl + `/${woeid}`)
                }
              )
            })
        })
      .catch(error => console.log('Error while getting weather data:', error))
    }
  }, [currentCountries]) // Get weather data on capital for single country searches
  return (
    <div>
      <h2>Country search</h2>
      <FilterForm name={filterName} handler={handleFilterChange} />
      <>
      <Content 
        countries={currentCountries}
        buttonHandler={handleCountrySelection}
        weatherDetails={weatherDetails}/>
      </>
    </div>
  )
}

export default App;
