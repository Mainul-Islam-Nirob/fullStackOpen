import React from 'react'

const Button = ({ type, style, children, onClick }) => (
    <button style={style} type={type} onClick={onClick}>
        {children}
    </button>
)

export default Button