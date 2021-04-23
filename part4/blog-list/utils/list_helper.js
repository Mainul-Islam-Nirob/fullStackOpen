// eslint-disable-next-line no-unused-vars
const logger = require('./logger')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, currentValue) => {
    return total + currentValue.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  // get most liked blogs
  const max = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })

  // return most liked blog details
  const favBlog = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }

  return favBlog
}



const mostBlogs = (blogs) => {
  // Get all blog authors
  const authors = blogs.map((blog) => blog.author)
  logger.info(authors)

  if (!authors || authors.length === 0) {
    return null
  }

  // Count blogs by author
  const countBlogsByAuthor = authors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)

    return acc
  }, {})


  // Return array with name of author with most blogs and amount of blogs.
  const authorWithMostBlogsArray = Object.entries(
    countBlogsByAuthor,
  ).reduce((a, b) => (countBlogsByAuthor[a] > countBlogsByAuthor[b] ? a : b))

  const authorWithMostBlogs = {
    author: authorWithMostBlogsArray[0],
    blogs: authorWithMostBlogsArray[1],
  }
  return authorWithMostBlogs
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}