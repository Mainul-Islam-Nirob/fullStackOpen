import React, { useState, useEffect } from 'react'
import "./index.css"
import Persons from "./Components/Persons"
import InputField from './Components/InputField'
import PersonForm from './Components/PersonForm'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [filteredPersons, setFilteredPersons] = useState(null)
    const [notification, setNotification] = useState(null)
    
  
    useEffect(() => {
        personService
            .getAll()
            .then(initialPerson => {
                setPersons(initialPerson)
            })

    }, [])

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
            const person = persons.find(p => p.name === newName)
            const changedPerson = {...person, number: newNumber}
            const {id} = person
            
            const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replact the old number with a new one?`
            )
           
            if (confirmUpdate) {
                personService
                    .update(id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(
                            persons.map(person =>
                                person.id !== id ? person : returnedPerson
                                )
                         ) 
                         setNotification({
                             success: `Number updated for ${person.name}`
                         })
                         setTimeout(() => {
                             setNotification(null)
                         }, 5000)
                    })
                    
            }
            setNewName("")
            setNewNumber("")
            return
        }

        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))

                setNotification({
                    success: `Added ${returnedPerson.name}`
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                // clear input fields
                setNewName('')
                setNewNumber('')
            })        
    }
    
 

    const handleDelete = id => {
        const person = persons.find(person => person.id === id)
        const confirmDelete = window.confirm(`Delete ${person.name}?`)

        if (confirmDelete) {
            personService
                .deletePerson(id)
                .then(() => {
                    const filteredPersons = persons.filter(person => person.id!== id) 
                    setPersons(filteredPersons)

                    setFilter("")})
                .catch(error => {
                    setNotification({
                        error: `Information of ${person.name} has already been removed from server`
                    })
                    setTimeout(() => {
                        setNotification({error: null})
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id))
                })
                

        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
        
           <Notification
                message={notification?.success || notification?.error} 
                className={notification?.success ? "success" : notification?.error ? "error" : null}
            />
    {
                console.log(notification?.success ? "success" : "error")
    }
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
             handleDelete={handleDelete}
            />
        </div>
    )
}

export default App