import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = existingObject => {
  const request = axios.delete(baseUrl + '/' + existingObject.id)
  return request
}

export default { 
  getAll, 
  create,
  remove
}