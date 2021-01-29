import React from 'react'

const Country = ({country, handleClick}) => (
    <div>
        <span>{country.name}</span>
        <button onClick={() => handleClick(country.name)}>Show</button>
    </div>
)

export default Country