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
const setToken = (newToken: string | null) => {
  newToken ? 
  token = `Bearer ${newToken}` :
  token = null
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
  return res
}

const update = async (id: string, newObject: object) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  
  const res = await axios.put<Note>(`${baseUrl}/${id}`, newObject, config)
  return res
}

const deleteNote = async (id: string) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.delete<Note>(`${baseUrl}/${id}`, config)
  return res
}

export default {
  getAll,
  create,
  update,
  deleteNote,
  setToken
}

