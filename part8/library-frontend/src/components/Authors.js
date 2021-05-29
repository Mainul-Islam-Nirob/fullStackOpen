 import React from 'react'
 import { useQuery } from '@apollo/client'
 import { ALL_AUTHORS } from "../queries"
 import SetBirthYear from "./SetBirthYear"


const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error, something is wrong!</p>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  )
}

export default Authors
