import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector((state) => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match ? users?.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }
  return (
    <>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p>No blogs added yet.</p>
      ) : (
        <ul>
          {user.blogs?.map((blog) => (
            <li
              key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default User