import React from 'react'
import PropTypes from 'prop-types'

const purgeReset = p => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...purged } = p
  return purged
}
const LoginForm = ({ handleLogin, username, password }) => (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>username<input {...purgeReset(username)} /></div>
        <div>password<input {...purgeReset(password)} /></div>
        <button type="submit">login</button>
      </form>
    </>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm