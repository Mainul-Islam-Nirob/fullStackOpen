import React, { useState } from 'react'
import { CREATE_BOOK, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client";

const NewBook = ({setPage, show, updateCacheWith}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  let [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS}],
    update: (store, response) => {
      console.log("respons data",response)
      updateCacheWith(response.data.addBook)
    },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    onCompleted: () => {
      setPage("books")
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    published = Number(published)
    createBook({ variables: { title, author, published, genres } })

    // setPage("books")

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook