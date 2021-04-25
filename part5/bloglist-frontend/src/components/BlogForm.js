import React from 'react'

const BlogForm = (props) => {
    return (
    <form onSubmit={props.createBlog}>
        <div>
            Title: 
            <input
            type="text"
            value={props.inputValue.title}
            name="title"
            onChange={props.handleInputChange}
          />
        </div>
        <div>
            Author:
            <input
            type="text"
            value={props.inputValue.author}
            name="author"
            onChange={props.handleInputChange}
          />
        </div>
        <div>
            URL:
            <input
            type="text"
            value={props.inputValue.url}
            name="url"
            onChange={props.handleInputChange}
          />
        </div>
        <button type="submit">create</button>
    </form>)
}

export default BlogForm;