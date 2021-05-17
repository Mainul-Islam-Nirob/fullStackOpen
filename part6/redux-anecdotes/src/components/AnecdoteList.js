import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, clearNotification } from '../reducers/notificatinReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>{
        if (state.filter.filter === "") return state.anecdotes

        return state.anecdotes
            .filter((anecdote) =>
                anecdote.content
                    .toLowerCase()
                    .includes(state.filter.filter.toLowerCase())
            )

        })
    const dispatch = useDispatch()
    const vote = (votedAnecdote) => {
        dispatch(voteAnecdote(votedAnecdote));
        dispatch(
            setNotificationMessage(
                {
                    message: `You voted "${votedAnecdote.content}"`
                }, 10)
        )
    }

    return (
        <>
      {   
        anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    { anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    }
    </>
    )
}

export default AnecdoteList