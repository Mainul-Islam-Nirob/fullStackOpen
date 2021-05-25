import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog }) => {
  return (
    <div style={ blogStyle }>
      <Link
        to={`/blogs/${blog.id}`}
      >
        {blog.title} --{blog.author}
      </Link>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
}