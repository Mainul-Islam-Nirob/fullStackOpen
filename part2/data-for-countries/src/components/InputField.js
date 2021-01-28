import React from 'react'

const InputField = ({label, type, value, onChange}) => (
    <>
        <label>{label}</label>
        <input 
           type={type}
           value={value}
           onChange={onChange}
        />
   </>
)


export default InputField
