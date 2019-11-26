import anecdoteService from '../services/anecdotes'

export const vote = anecdote => {
	return async dispatch => {
		const vote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
		dispatch({
			type: 'VOTE',
			data: vote
		})
	}
}
export const addAnecdote = a => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(a)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}
export const initializeAnecdotes = anecdotes => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}
const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'VOTE':
			const id = action.data.id
			const votePost = state.find(n => n.id === id)
			const voted = { ...votePost, votes: votePost.votes + 1 }
			return state.map(p => (p.id !== id ? p : voted))
		case 'NEW_ANECDOTE':
			return state.concat(action.data)
		case 'INIT_ANECDOTES':
			return action.data
		default:
			return state
	}
}

export default anecdoteReducer
