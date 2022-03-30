const Display = ({token}) => {
	if (token === null) {
		return <h3>Login users</h3>
	} else {
		return <h3>Hello {token.username} to you account</h3>
	}
}

export default Display