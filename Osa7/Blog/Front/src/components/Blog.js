import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, creator }) => {
	if (!blog) {
		return null
	}
	const current = creator === blog.user.username
	return (
		<div>
			<br />
			<h2>{`${blog.title} by ${blog.author}`}</h2>
			<a href={blog.url}>{blog.url}</a>
			<p>
				{blog.likes} likes<button onClick={() => like(blog)}>like</button>
			</p>
			<div>added by {blog.user.name}</div>
			{current && <button onClick={() => remove(blog)}>remove </button>}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	like: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	creator: PropTypes.bool.isRequired
}

export default Blog
