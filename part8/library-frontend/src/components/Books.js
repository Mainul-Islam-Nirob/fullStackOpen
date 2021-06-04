import React, { useEffect } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery, useLazyQuery } from "@apollo/client"

const Books = ({ show }) => {
  // const [genre, setGenre] = useState("")
  const { loading, error, data } = useQuery(ALL_BOOKS)

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    getBooks()
  }, []) //eslint-disable-line

   let genres = data?.allBooks?.flatMap((book) => book.genres)

  // remove duplicates
  genres = [...new Set(genres)]

  const books = result?.data?.allBooks
    ? result?.data?.allBooks
    : data?.allBooks

  if (!show) {
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
          {books.map((a, i) => (
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
          genres.map((g, i) => (
            <button key={i} onClick={() => {
              // setGenre(g)
              getBooks({
                variables: { filterByGenre: g },
              })
            }}>{g}</button>
        ))
        }
      </div>
    </div>
  )
}

export default Books
