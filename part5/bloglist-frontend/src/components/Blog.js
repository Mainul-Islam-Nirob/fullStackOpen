import React, { useState } from 'react'
import Button from './Button'

const Blog = ({blog}) => {
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
  
  return(
    <div style = {blogStyle}>
      {blog.title} --{blog.author} 
      <Button
        onClick={toggleExpanded}
        style={hideWhenVisible}
        type="button"
      >
        View
      </Button>
      <Button
        onClick={toggleExpanded}
        style={showWhenVisible}
        type="button"
      >
        Hide
      </Button>
      <div style={showWhenVisible}>
      <div>
        <span>{blog.url}</span>
      </div>
      <span>Likes</span>
      <span>{blog.likes}</span>
      <Button>
        Like
        </Button>
      <div>
        <span> {blog.user.name}</span>
      </div>
    </div>
    </div>
  ) 
}

export default Blog