import React from 'react'
import CountryDetails from './countryDetails'
import WeatherDetails from './weatherDetails'
import ListOptions from './listOptions'
/**
 * Imposes the rules on how to display the results from filtering countries
 * @param {Array} countries
 * @param {Object} weatherDetails
 * @param {Function} buttonHandler
 */
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

export default Content;