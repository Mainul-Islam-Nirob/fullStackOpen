import React, { useState, useEffect } from 'react'
import Persons from "./Components/Persons"
import InputField from './Components/InputField'
import PersonForm from './Components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [filteredPersons, setFilteredPersons] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPerson => {
                setPersons(initialPerson)
            })

    }, [])

   // Submit Form
    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        // Check if person is already exist to the phonebook
        const alreadyExists = persons.some(person => person.name === newName)

        if (newName === "") {
            return;
        }

        if (alreadyExists) {
            alert(`${newName} is already added to phonebook`)
            return;
        }

        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                // clear input fields
                setNewName('')
                setNewNumber('')
            })        
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        
        const filtered = persons.filter(person =>
             // Check if the search term is exist in the names of phonebook
             person.name.toLowerCase().includes(event.target.value.toLowerCase())
             )
             
             setFilteredPersons(filtered);
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <InputField label="Filter shown with:" 
             value={filter} 
             onChange={handleFilterChange}
            />

            <h2>add a new</h2>
            <PersonForm 
             onSubmit={addPerson}
             newName={newName}
             handleNameChange={handleNameChange}
             newNumber={newNumber}
             handleNumberChange={handleNumberChange}             
            />

            <h2>Numbers</h2>
            <Persons
             filter={filter}
             persons={persons}
             filteredPersons={filteredPersons}
            />
        </div>
    )
}

export default App