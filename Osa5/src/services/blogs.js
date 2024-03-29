import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const remove = async (id) => {
  const promise = await axios.delete(`${baseUrl}/${id}`)
  return promise.then(response => response.data)
}
const replace = async (person) => {
  const promise = await axios.put(`${baseUrl}/${person.id}`, person)
  return promise.then(response => response.data)
}
export default { getAll, create, remove, replace, setToken }