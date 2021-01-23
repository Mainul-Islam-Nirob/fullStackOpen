import React, { useState } from 'react'
import Persons from "./Components/Persons"

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [filteredPersons, setFilteredPersons] = useState(null)

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

        setPersons(persons.concat(newPerson))
        // clear input fields
        setNewName('')
        setNewNumber('')
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
            <div>
                filter shown with 
                <input 
                 value={filter}
                 onChange={handleFilterChange} />
            </div>

            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                           value={newName}
                           onChange={handleNameChange} />
                </div>
                <div>
                    Number: <input 
                        required
                        value={newNumber}
                        onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
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