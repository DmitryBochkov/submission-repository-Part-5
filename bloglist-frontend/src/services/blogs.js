import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObj => {
  const config = {
    headers:  { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

export default { getAll, setToken, create }