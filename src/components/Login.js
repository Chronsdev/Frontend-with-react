import React, { useState } from 'react'

const Form = ({token, loginInfo}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const userInfo = e => {
		e.preventDefault()

		loginInfo({
			username: username,
			password: password
		})

		setUsername('')
		setPassword('')
	}	

	if (token === null) {
		return(
			<form onSubmit={userInfo}>
			<input type="text"
			value={username}
			placeholder="Username"
			onChange={({ target }) => setUsername(target.value)}
			/><br/>
			<input type="password"
			placeholder="Password"
			onChange={({ target }) => setPassword(target.value)}
			/><br/>
			<button type="submit">Login</button>
			</form>
			)
	} else {
		return null
	}
}

export default Form