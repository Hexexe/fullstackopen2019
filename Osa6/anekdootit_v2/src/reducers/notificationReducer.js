export const setNotification = (message, seconds) => {
	return async dispatch => {
		dispatch({
			type: 'MESSAGE',
			message
		})
		setTimeout(function() {
			dispatch({
				type: 'MESSAGE',
				message: null
			})
		}, seconds * 1000)
	}
}
const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'MESSAGE':
			return action.message
		default:
			return state
	}
}
export default notificationReducer
