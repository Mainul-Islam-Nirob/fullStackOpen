import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
// import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(initializeAnecdotes())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter />
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App