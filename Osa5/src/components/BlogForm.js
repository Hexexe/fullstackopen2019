import React from 'react'
import PropTypes from 'prop-types'

const purgeReset = p => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...purged } = p
  return purged
}
const blogForm = ({ addBlog, titleS, authorS, urlS }) => (
  <div>
    <h1>Create new</h1>
    <form onSubmit={addBlog}>
      <div>Title:<input {...purgeReset(titleS)} /></div>
      <div>Author:<input {...purgeReset(authorS)} /></div>
      <div>Url:<input {...purgeReset(urlS)} /></div>
      <button type="submit">Create</button>
    </form>
  </div>
)

blogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  titleS: PropTypes.object.isRequired,
  authorS: PropTypes.object.isRequired,
  urlS: PropTypes.object.isRequired
}
export default blogForm