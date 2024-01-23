import axios from "axios"
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject: object) => {
  return axios.post(baseUrl, newObject)
}

const update = (id: number, newObject: object) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll,
  create,
  update
}

