
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

import { useApolloClient } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("user-token")
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommand</button>
            <button onClick={ logout }>logout</button>
          </>
        )}
        {!token && (
          <button onClick={() => setPage("login")}>
            login
          </button>
        )}
      </div>
      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        setPage={setPage}
        show={page === 'add'}
      />

      <Login setPage={setPage} setToken={setToken} show={page === "login"} />

      <Recommendations show={page === "recommendations"} />
    </div>
  )
}

export default App