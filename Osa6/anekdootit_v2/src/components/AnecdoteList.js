import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
	const anecdotes = props.store.getState()
	const addVote = id => props.store.dispatch(vote(id))
	return (
		<div>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => addVote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
