import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/filterForm'
import Content from './components/content'

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
    setWeatherDetails({}) // Empty previous results
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
      <FilterForm
        textAbove={'Find countries'}
        name={filterName}
        handler={handleFilterChange}
      />
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
