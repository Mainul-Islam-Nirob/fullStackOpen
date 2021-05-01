import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, removeNotificationMessage } from '../reducers/notificatinReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotificationMessage({
            message: `Successfully added "${content}"`
        }))
        setTimeout(() => {
            dispatch(removeNotificationMessage())
        }, 5000)
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

export default AnecdoteForm