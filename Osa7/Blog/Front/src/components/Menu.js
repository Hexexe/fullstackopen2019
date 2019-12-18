import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const Menu = ({ user, logout }) => {
	const meme = {
		backgroundColor: 'LightGray'
	}
	const padding = {
		paddingRight: 5
	}
	return (
		<div style={meme}>
			<Link style={padding} to='/'>
				blogs
			</Link>
			<Link style={padding} to='/users'>
				users
			</Link>
			{`${user.name} Logged in`}
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Menu
