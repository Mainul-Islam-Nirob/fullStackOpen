import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './components/InputField'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")


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
      />
  </div>
  )
}

export default App
