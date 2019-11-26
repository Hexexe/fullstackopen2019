import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
	const state = props.notifications
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	return state == null ? null : <div style={style}>{state}</div>
}
const mapStateToProps = state => {
	return {
		notifications: state.notifications
	}
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
