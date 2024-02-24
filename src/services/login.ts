import axios from "axios"

const baseUrl = 'http://localhost:3001/api/login'

interface Credentials {
  username: string,
  password: string
}

const login = async (credentials: Credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data
};

export default {
  login
}