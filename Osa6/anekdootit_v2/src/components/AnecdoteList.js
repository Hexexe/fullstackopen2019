import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
	const ane = props.anecdotes
	const voteA = anecdote => {
		props.vote(anecdote)
		props.setNotification(`You voted ${anecdote.content}`, 5)
	}
	return (
		<div>
			{ane.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => voteA(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}
const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes
	}
}
const mapDispatchToProps = { setNotification, vote }
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes
