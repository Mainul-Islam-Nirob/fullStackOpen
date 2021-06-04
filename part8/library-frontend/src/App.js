
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

import { useApolloClient, useSubscription } from "@apollo/client"

import { BOOK_ADDED, ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("user-token")
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])


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
        updateCacheWith={updateCacheWith}
      />

      <LoginForm setPage={setPage} setToken={setToken} show={page === "login"} />

      <Recommendations show={page === "recommendations"} />
    </div>
  )
}

export default App