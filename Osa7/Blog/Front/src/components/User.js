import React from 'react'

const User = ({ user }) => {
	if (!user) {
		return null
	}
	console.log(user)
	return (
		<div>
			<br />
			<h1>{user.name}</h1>
			<br />
			<h3>Added blogs:</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}
export default User
