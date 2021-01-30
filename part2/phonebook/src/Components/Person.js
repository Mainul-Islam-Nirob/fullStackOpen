import React from 'react'

    
    

const Person = ({person, handleDelete}) => (
    <div>
        <span>{person.name} : </span>
        <span>{person.number} </span>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>  
    )

export default Person