import React from 'react'

const Person = ({person}) => (
    <div>
        <span>{person.name} : </span>
        <span>{person.number}</span>
    </div>  
    )

export default Person