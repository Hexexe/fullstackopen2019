import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Blog from './components/Blog'
import Menu from './components/Menu'
import blogService from './services/blogs'
import userService from './services/users'
import User from './components/User'
import loginService from './services/login'
import NewBlog from './components/NewBlog.js'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const Login = ({ notification, handleLogin, username, password }) => {
	return (
		<div>
			<h2>log in to application</h2>

			<Notification notification={notification} />

			<form onSubmit={handleLogin}>
				<div>
					käyttäjätunnus
					<input {...username} />
				</div>
				<div>
					salasana
					<input {...password} />
				</div>
				<button type='submit'>kirjaudu</button>
			</form>
		</div>
	)
}

const App = props => {
	const [username] = useField('text')
	const [password] = useField('password')
	const [blogs, setBlogs] = useState([])
	const [users, setUsers] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState({
		message: null
	})

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(blogs)
		})
		userService.getAll().then(users => {
			setUsers(users)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notify = (message, type = 'success') => {
		setNotification({ message, type })
		setTimeout(() => setNotification({ message: null }), 10000)
	}

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value
			})

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
		} catch (exception) {
			notify('wrong username of password', 'error')
		}
	}

	const handleLogout = () => {
		setUser(null)
		blogService.destroyToken()
		window.localStorage.removeItem('loggedBlogAppUser')
	}

	const createBlog = async blog => {
		const createdBlog = await blogService.create(blog)
		newBlogRef.current.toggleVisibility()
		setBlogs(blogs.concat(createdBlog))
		notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
	}

	const likeBlog = async blog => {
		const likedBlog = { ...blog, likes: blog.likes + 1 }
		const updatedBlog = await blogService.update(likedBlog)
		setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
		notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
	}

	const removeBlog = async blog => {
		const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
		if (ok) {
			const updatedBlog = await blogService.remove(blog)
			setBlogs(blogs.filter(b => b.id !== blog.id))
			notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
		}
	}
	const renderBlogs = blogs => {
		return (
			<div>
				<Togglable buttonLabel='create new' ref={newBlogRef}>
					<NewBlog createBlog={createBlog} />
				</Togglable>
				<Table striped>
					<tbody>
						{blogs.sort(byLikes).map(blog => (
							<tr key={blog.id}>
								<td>
									<Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		)
	}
	const renderUsers = users => {
		return (
			<>
				<br />
				<h3>Users</h3>
				<Table striped>
					<tbody>
						<tr>
							<td>Name:</td>
							<td>Blogs Created:</td>
						</tr>
						{users.map(user => (
							<tr key={user.id}>
								<td>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</>
		)
	}

	const newBlogRef = React.createRef()
	const blogById = id => blogs.find(a => a.id === id)
	const userById = id => users.find(a => a.id === id)
	const byLikes = (b1, b2) => b2.likes - b1.likes

	return user === null ? (
		<Login
			notification={notification}
			handleLogin={handleLogin}
			username={username}
			password={password}
		/>
	) : (
		<div className='container'>
			<Router>
				<Menu user={user} logout={handleLogout} />
				<h2>Blog app</h2>
				<Notification notification={notification} />
				<Route exact path='/' render={() => renderBlogs(blogs)} />
				<Route
					exact
					path='/blogs/:id'
					render={({ match }) => (
						<Blog
							blog={blogById(match.params.id)}
							like={likeBlog}
							remove={removeBlog}
							user={user}
							creator={user.username}
						/>
					)}
				/>
				<Route exact path='/users' render={() => renderUsers(users)} />
				<Route
					exact
					path='/users/:id'
					render={({ match }) => <User user={userById(match.params.id)} />}
				/>
			</Router>
		</div>
	)
}

export default App
