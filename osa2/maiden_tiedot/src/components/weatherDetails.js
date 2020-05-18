import React from 'react'

/**
 * Displays the data on given capital weather
 * @param {String} capital 
 * @param {Object} data
 */
const WeatherDetails = ({capital, data}) => {
    return(
      <>
      <h2>Weather in {capital}</h2>
        <div>Temperature {data.temp.toFixed(2)} celcius</div>
        <div>Humidity {data.humidity}%</div>
      <img 
        src={data.weatherImgUrl}
        className={'photo'}
        alt={data.weatherName}
      />
      <div>
        <a href={data.moreInfoUrl}>More weather details</a>
      </div>
      </>
    )
}

export default WeatherDetails;