import React, { useState } from 'react'

const Blogform = ({createBlog, token}) => {
	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')

	const addBloger = e => {
		e.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	if (token === null) {
		return null
	} else {
		return(
		<div>
		  <h2>Create a new Blog</h2>
		  <form onSubmit={addBloger}>
		  Title: <input type="text" value={title}
		  placeholder='Title of blog'
		  onChange={({ target }) => setTitle(target.value)}
		  /><br/>
		  Author: <input type="text" value={author}
		  placholder='Author of the blog'
		  onChange={({ target }) => setAuthor(target.value)}
		  /><br/>
		  Url: <input type="text" value={url}
		  placholder='Url of the blog'
		  onChange={({ target }) => setUrl(target.value)}
		  /><br/>
		  <button type='submit'>Send blog</button>
		  </form>
		</div>
		)
	}
} 

export default Blogform