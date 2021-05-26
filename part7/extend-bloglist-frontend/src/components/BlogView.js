import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Button from './Button'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comment from '../components/Comment'
import CommentForm from './CommentForm'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const addLike = async () => {
    try {
      const { id, author, url, title } = blog
      const updatedBlog = {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        title,
        author,
        url,
      }

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
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        // delete blog from db
        dispatch(removeBlog(id))
        history.push('/blogs')
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

  if (!blog) {
    return null
  }
  return (
    <>
      <div>
        <h1>{blog.title}</h1>
        <div>{blog.author}</div>
        <a>
          {blog.url}
        </a>
        <div>
          <span data-cy='likes'>
            {blog.likes}
          </span>
          <Button dataCy='like-btn' onClick={addLike} >
            like
          </Button>
          <span> &#8226;</span>
          <span>Added by </span>
          <span>{blog.user?.name}</span>
        </div>
        {blog.user?.username === user?.username && (
          <Button
            onClick={() => deleteBlog(blog.id, blog)}
            type='button'
          >
            Remove
          </Button>
        )}
      </div>
      <h2>Comments</h2>
      <CommentForm />
      {
        blog.comments && blog.comments.length !== 0 ? (
          <ul>
            {
              blog.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            }
          </ul>
        ) : 'No comments for this post yet'
      }

    </>
  )
}

export default BlogView