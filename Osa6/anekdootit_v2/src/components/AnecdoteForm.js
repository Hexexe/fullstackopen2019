import React from 'react'
import { addAnecdoteN } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
	const addAnecdote = e => {
		e.preventDefault()
		const a = e.target.anecdote.value
		e.target.anecdote.value = ''
		props.store.dispatch(addAnecdoteN(a))
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
