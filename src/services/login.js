import axios from 'axios'
const url = 'http://localhost:3001/api/login'

const postLogin = async loginData => {
	const res = await axios.post(url, loginData)
	return res.data
}

export default {postLogin}
