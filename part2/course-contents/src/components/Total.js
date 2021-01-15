import React from 'react'

const Total = ({ parts }) => {
    const total = parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return <p><b>Total Number of exercises {total}</b></p>
}

export default Total