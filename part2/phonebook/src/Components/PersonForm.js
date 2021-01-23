import React from 'react'
import InputField from './InputField'

const PersonForm = ({
    onSubmit,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
}) => { 
 return(
 <form onSubmit={onSubmit}>
         <InputField 
            label="Name:"
            type="text"
            value={newName}
            onChange={handleNameChange}
        />

         <InputField
            label="Number:"
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
        />
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
 )
}


export default PersonForm;