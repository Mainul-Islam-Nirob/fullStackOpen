import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: inputValue.title,
      author: inputValue.author,
      url: inputValue.url,
    })

    setInputValue({
      title: '',
      author: '',
      url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
            Title:
        <input
          id="title"
          type="text"
          value={inputValue.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div>
            Author:
        <input
          id="author"
          type="text"
          value={inputValue.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div>
            URL:
        <input
          id="url"
          type="text"
          value={inputValue.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>)
}

export default BlogForm


BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}