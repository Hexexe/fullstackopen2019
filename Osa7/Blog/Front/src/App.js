import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const username = useField('text')
  const password = useField('password')
  const blogFormRef = React.createRef()

  useEffect(() => { blogService.getAll().then(b => setBlogs(b)) }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notification = (m) => {
    setMessage(m)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notification('wrong username or password')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const blogObject = { title: title.value, author: author.value, url: url.value }
      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      title.reset()
      author.reset()
      url.reset()
      notification(`a new blog ${data.title} by ${data.author} added`)
    } catch (e) {
      notification('Creation of a new blog failed')
      title.reset()
      author.reset()
      url.reset()
    }
  }

  const logout = () => {
    window.localStorage.removeItem('currentUser')
    setUser(null)
  }

  const loginForm = () => <LoginForm handleLogin={handleLogin} username={username} password={password} />
  const content = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in<button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} titleS={title} authorS={author} urlS={url} />
      </Togglable>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {user === null ? loginForm() : content()}
    </div>
  )
}
export default App