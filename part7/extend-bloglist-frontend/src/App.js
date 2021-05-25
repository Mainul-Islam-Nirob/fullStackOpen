import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { createBlog, removeBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username || username === '' || !password || password === '') {
      dispatch(
        setNotification(
          {
            error: 'Please fill in user and password',
          },
          5,
        ),
      )
    }else {
      try {
        const user = await loginService.login({
          username, password,
        })

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')

      } catch (error) {
        dispatch(
          setNotification(
            {
              error: 'wrong username or password',
            },
            5,
          ),
        )

      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //Creating New Blog
  const addBlog = (blogObject) => {
    //validation
    try{
      // Check if all required fields are filled in
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        dispatch(
          setNotification(
            {
              error: 'Please fill in all fields',
            },
            5
          )
        )
        return
      }
      // hide form after adding a bl
      blogFormRef.current.toggleVisibility()
      // Add new blog to db
      dispatch(createBlog(blogObject, user))

      // set notification message
      dispatch(
        setNotification(
          {
            notification:`a new blog ${blogObject.title} added by ${blogObject.author}`,
          },
          5,
        ),
      )
    }catch (err) {
      dispatch(
        setNotification(
          {
            error: `No nooo! ${err}`,
          },
          5,
        ),
      )
      console.error(err)
    }
  }

  const addLike = async (id, updatedBlog) => {
    try {
      dispatch(likeBlog(id, updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(
        setNotification(
          {
            error: `No nooo! ${err}`,
          },
          5,
        ),
      )
    }
  }

  const deleteBlog = async (id, blog) => {
    console.log(blog)
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        // delete blog from db
        dispatch(removeBlog(id))
        dispatch(
          setNotification(
            {
              notification: `Successfully removed ${blog.title} by ${blog.author}`,
            },
            5,
          ),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(setNotification({ error: `No nooo! ${err}` }, 5))
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>

  )

  const blogs_list = () => (
    <div>
      <h1>blogs</h1>
      <span>{user.name} logged in </span>
      <button onClick={handleLogout} type="button">LogOut</button><br/><br/>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes -a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={addLike}
            removeBlog={deleteBlog}
            user={user} />
        )}
    </div>
  )

  return (
    <>
      <Notification/>
      { user === null ?
        loginForm() :
        blogs_list()
      }
    </>
  )
}

export default App