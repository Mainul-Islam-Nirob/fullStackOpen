import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      dispatch(
        setNotification(
          {
            error: 'Please fill in all fields',
          },
          5,
        ),
      )
    }else {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returendBlog => {
          setBlogs(blogs.concat(returendBlog))

          dispatch(
            setNotification(
              {
                notification:`a new blog ${returendBlog.title} added by ${returendBlog.author}`,
              },
              5,
            ),
          )

          // setCreateBlogVisible(null)
        })
        .catch(err => {
          dispatch(
            setNotification(
              {
                error: `No nooo! ${err}`,
              },
              5,
            ),
          )
        })
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      // Add like to blog and store it in db
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id,
      }

      // Update blogs in state
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
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

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        // delete blog from db
        await blogService.deleteBlog(id)
        // update state to reflect deletion in UI
        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(
          setNotification(
            {
              notification: `Successfully removed ${blog[0].title} by ${blog[0].author}`,
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
          <Blog key={blog.id} blog={blog} updateLike={addLike} removeBlog={deleteBlog} user={user} />
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