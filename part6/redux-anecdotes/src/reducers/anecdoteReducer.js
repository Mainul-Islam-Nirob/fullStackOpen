const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case "VOTE": {
      const {id} = action.data
    
      const votedAnecdote = state.find((anecdote) => anecdote.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map((anecdote) => 
      anecdote.id !== id ? anecdote : updatedAnecdote
      )
    }
    case "NEW_ANECDOTE": 
      return [...state, action.data]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
    
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer