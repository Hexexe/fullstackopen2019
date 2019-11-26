import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
	const addAnecdoteN = async e => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		props.addAnecdote(content)
		props.setNotification(`You added '${content}'`, 5)
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdoteN}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}
const mapDispatchToProps = { setNotification, addAnecdote }
const ConnectedAnecdotes = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdotes
