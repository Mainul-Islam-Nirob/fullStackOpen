import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


test('renders blog title and author, but not url and number of likes by default', () => {

  const user = {
    username: 'uname',
    name: 'name'
  }
  const blog = {
    user: user,
    author: 'Just me',
    title: 'Blog title',
    url: 'http://blog-title.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const defaultBlogContent = component.container.querySelector('.blog')
  const defaultHiddenContent = component.getByTestId('hidden-content')

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(defaultBlogContent).not.toHaveStyle('display: none')
  expect(defaultBlogContent).toBeVisible()
  expect(defaultHiddenContent).toHaveStyle('display: none')

})