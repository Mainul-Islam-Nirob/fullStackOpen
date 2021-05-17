import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificatinReducer'

const AnecdoteForm = ({createAnecdote, setNotificationMessage}) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        createAnecdote(content)
        setNotificationMessage(
            {
                message: `Successfully added "${content}"`
            }, 10)
        }

    return (
        <>
        < h2 > create new</h2 >
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

const ConnectedAnecdoteForm = connect(null, {
    createAnecdote,
    setNotificationMessage
})(AnecdoteForm)
export default ConnectedAnecdoteForm