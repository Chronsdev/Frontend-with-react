const Create = ({sub, username, password, usernameFn, passwordFn, name, nameFn}) => {
	return (
		<form onSubmit={sub}>
		<input type="text" value={username} placeholder="Username" 
		onChange={usernameFn}/><br/>
		<input type="text" value={name} placeholder="Name"
		onChange={nameFn}/><br/>
		<input type="password" value={password} placeholder="Password" 
		onChange={passwordFn}/><br/>
		<button type="submit">Create a account</button>
		</form>
		)
}

export default Create