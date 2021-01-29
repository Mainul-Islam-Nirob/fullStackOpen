import React from 'react'
import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = ({countries, handleClick}) => {
    if (countries.length > 10) {
        return (
            <div>
                <span>Too many matches, specify another filter.</span>
            </div>
        )
    }else if (countries.length > 1 && countries.length < 10) {
        return (
            <div>
                {countries.map(country => (
                    <Country 
                        key={country.name}
                        country={country}  
                        handleClick={handleClick} 
                    />
                ))}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country => (
                    <CountryDetail 
                        key={country.name}
                        country={country}
                    />
                ))}
            </div>
        )
    } else {
        return <></>
    }
}


export default Countries