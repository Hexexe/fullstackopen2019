import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Worst Blog EU',
    author: 'Random Individual',
    url: 'www.google.fi',
    likes: 1000
  }
  const component = render(<SimpleBlog blog={blog} />)
  expect(component.container).toHaveTextContent('Worst Blog EU')
  expect(component.container).toHaveTextContent('Random Individual')
  expect(component.container).toHaveTextContent(1000)
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Worst Blog EU',
    author: 'Random Individual',
    url: 'www.google.fi',
    likes: 1000
  }
  const mockHandler = jest.fn()
  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})