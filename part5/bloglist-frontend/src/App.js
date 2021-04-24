import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    url: ''
  })

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
    
    } catch (e) {
      console.log(e)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [name] : value,
      }
    })
  }

  //Creating New Blog
  const createBlog = (event) => {
    event.preventDefault()
  
    const blogObject = {
      title: inputValue.title,
      author: inputValue.author,
      url: inputValue.url,
    }

    blogService
      .create(blogObject)
        .then(returendBlog => {
          setBlogs(blogs.concat(returendBlog))
          setInputValue({
            title: '',
            author: '',
            url: ''
          })
        }
     )
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

  const blogs_list = () => (
    <div>
     <h1>blogs</h1>
      <span>{user.name} logged in </span>
      <button onClick={handleLogout} type="button">LogOut</button><br/><br/>

      <form onSubmit={createBlog}>
        <div>
          Title: 
            <input
            type="text"
            value={inputValue.title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          Author:
            <input
            type="text"
            value={inputValue.author}
            name="author"
            onChange={handleInputChange}
          />
        </div>
        <div>
          URL:
            <input
            type="text"
            value={inputValue.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">create</button>
      </form><br/><br/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <>
      { user === null ?
        loginForm() :
        blogs_list()
      }
    </>
  )
}

export default App