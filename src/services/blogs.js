import axios from 'axios'
const url = 'http://localhost:3001/api/blogs'

let token = null

const takeToken = newToken => {
	token = `bearer ${newToken}`
}

const getBlogs = () => axios.get(url)

const postBlog = async (newBlog) => {
	const config = {
		headers: { authorization: token }
	}

	const res = await axios.post(url, newBlog, config)
	return res.data
}

const changeBlog = async (update) => {
	const res = await axios.put(`${url}/${update.id}`, update)
	return res.data
}

const dltBlogs = async (id) => {
	const config = {
		headers: { authorization: token }
	}

	const res = await axios.delete(`${url}/${id}`, config)
	return res.data
}

export default {getBlogs, postBlog, changeBlog, dltBlogs, takeToken}