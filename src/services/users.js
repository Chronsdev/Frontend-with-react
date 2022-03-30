import axios from 'axios'
const url = 'http://localhost:3001/api/users'

const postNewUser = (newBlog) => axios.post(url, newBlog)

export default {postNewUser}