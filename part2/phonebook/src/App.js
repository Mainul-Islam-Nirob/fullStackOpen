import React, { useState } from 'react'
import Person from "./Components/Person"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map(person => 
                   <Person key={person.name} person={person.name} number={person.number} />

                )}
        </div>
    )
}

export default App