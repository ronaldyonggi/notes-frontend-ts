import axios from "axios"
import { Note } from "../types/note"
const baseUrl = 'http://localhost:3001/api/notes'

let token: string | null = null;

/**
 * This function is used by Login component. Once user login is successful,
 * the token property from the logged-in user will be fetched for 
 * this setToken function to re-assign the above 'token' variable.
 * @param newToken the token fetched from logged-in user when log-in is successful
 */
const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
};

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
  deleteNote,
  setToken
}

