import React, { useState } from "react"
// import Select from "react-select"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const { loading, error, data } = useQuery(ALL_BOOKS)

   let genres = data?.allBooks?.flatMap((book) => book.genres)

  // remove duplicates
  genres = [...new Set(genres)]

  const filteredBooks = data?.allBooks?.filter((book) =>
    genre ? book.genres.includes(genre.toLowerCase()) : book
  )

  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error (⊙_⊙)</p>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map((a, i) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {
          genres.map((genre, i) => (
            <button key={i} onClick={() => setGenre(genre)}>{genre}</button>
        ))
        }
      </div>
    </div>
  )
}

export default Books