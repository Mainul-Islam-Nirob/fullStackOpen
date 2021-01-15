import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(({ name, exercises, id }) => (
                <Part key={id} name={name} exercises={exercises} />
            ))}
        </>
    )
}

export default Content