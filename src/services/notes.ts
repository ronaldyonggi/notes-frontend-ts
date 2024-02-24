import axios from "axios"
import { Note } from "../types/note"
const baseUrl = 'http://localhost:3001/api/notes'

let token: string | null = null;


const getAll = () => {
  return axios.get<Note[]>(baseUrl)
}

const create = async (newObject: object) => {
  // Sets the token to the Authorization header
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.post<Note>(baseUrl, newObject, config)
  return res.data
}

const update = (id: string, newObject: object) => {
  return axios.put<Note>(`${baseUrl}/${id}`, newObject)
}

const deleteNote = (id: string) => {
  return axios.delete<Note>(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  deleteNote
}

