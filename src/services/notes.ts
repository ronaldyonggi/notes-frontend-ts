import axios from "axios"
import { Note } from "../types/note"
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  return axios.get<Note[]>(baseUrl)
}

const create = (newObject: object) => {
  return axios.post<Note>(baseUrl, newObject)
}

const update = (id: number, newObject: object) => {
  return axios.put<Note>(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll,
  create,
  update
}

