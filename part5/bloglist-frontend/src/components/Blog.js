import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, updateLike, removeBlog, user }) => {
  const [expanded, setExpanded] = useState(false)

  //css
  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const update = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }

    updateLike(id, updatedBlog)
  }

  const deleteBlog = () => {
    const { id } = blog

    removeBlog(id)
  }


  return(
    <div style = {blogStyle} className='blog'>
      {blog.title} --{blog.author}
      <Button
        onClick={toggleExpanded}
        style={hideWhenVisible}
        type="button"
      >
        show
      </Button>
      <Button
        onClick={toggleExpanded}
        style={showWhenVisible}
        type="button"
      >
        hide
      </Button>

      <div style={showWhenVisible} data-testid='hidden-content'>
        <div>
          <span>{blog.url}</span>
        </div>
        <span>Likes : </span>
        <span className='likes'>{blog.likes}</span>
        <Button className='likeBtn' onClick={update} type='button'>
         like
        </Button>
        <div>
          <span> {blog.user.name}</span>
        </div>
        {(blog.user.username === user.username) && (
          <Button onClick={deleteBlog}>
              Remove
          </Button>
        )}
      </div>
    </div>
  )
}

export default Blog