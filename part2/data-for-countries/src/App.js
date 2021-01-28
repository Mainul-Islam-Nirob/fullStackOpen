import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './components/InputField'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

// Fetch country data from api
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
   
  const handleSearchChange = (event) => {
    setFilter(event.target.value)
    
      const searchResult = countries.filter(country =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setFilteredCountries(searchResult) 
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
        countries={filteredCountries}
      />
  </div>
  )
}

export default App
