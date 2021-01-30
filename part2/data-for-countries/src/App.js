import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './components/InputField'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [weatherData, setWeatherData] = useState(null)


// Fetch country data from api
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (filter !== "") {
          const searchResult = response.data.filter(country =>
            country.name.toLowerCase().includes(filter.toLowerCase())
          )
          setCountries(searchResult)
        }
      })
  }, [filter])

  // Fetch Weather Information from api
  useEffect(() => {
    const baseURL = "http://api.weatherstack.com/current"
    const ACCESS_KEY = process.env.REACT_APP_API_KEY

    if(countries.length === 1) {
      const capital = countries.map(country => country.capital)

      if(capital[0]) {
        axios
          .get(`${baseURL}?access_key=${ACCESS_KEY}&query=${capital[0]}`)
          .then(response => {
            setWeatherData(response.data) 
          })
      }
    }
  }, [countries])

   
  const handleSearchChange = (event) => {
    setFilter(event.target.value)
  }
    // somthing is missing
  const handleClick = countryName => {
   setFilter(countryName)
  }

  return (
  <div>
      <InputField
        type="text"
        label="Find countries"
        value={filter}
        onChange={handleSearchChange}
        />
      <Countries
        handleClick={handleClick}
        countries={countries}
        weatherData={weatherData}
      />
  </div>
  )
}

export default App
