import React, {useEffect, useState, useRef} from 'react'
import Form from './components/Login'
import data from './services/blogs'
import user from './services/users'
import login from './services/login'
import blogs from './services/blogs'
import Display from './components/Display'
import Toggeable from './components/togglable'
import BlogForm from './components/blogForm'
import Blog from './components/blog'

const ExitAccount = ({token, exitAcc}) => {
  if (token === null) {
    return null
  } else {
    return(
      <button onClick={exitAcc}>Exit Account</button>
      )
  }
}

const MessageNotification = ({message}) => {
  if (message === null) {
    return null
  } else {
    return <h2>{message}</h2>
  }
}

const App = () => {
  const [setBlogs, setNewBlogs] = useState([])
  const [tokens, setNewToken] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    data
    .getBlogs()
    .then(res => {
      setNewBlogs(res.data)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoTeappUser')
    if (loggedUserJson) {
      const tokens = JSON.parse(loggedUserJson)
      setNewToken(tokens)
      blogs.takeToken(tokens.token)
    }
  }, [])  

  const setObjects = async userObject => {
      const tokens = await login.postLogin(userObject)

      window.localStorage.setItem(
         'loggedNoTeappUser', JSON.stringify(tokens)
        )
      blogs.takeToken(tokens.token)
      setNewToken(tokens)
  }

  const addBlog = async blogObject => {
    blogRef.current.toggleVisiblity()
    const blog = await blogs.postBlog(blogObject)    
    setNewBlogs(setBlogs.concat(blog))
    setMessage(`A new blog with the title: ${blogObject.title}, and by the author: ${blogObject.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const exit = () => {
    console.log('exit')
    window.localStorage.clear()
    setNewToken(null)
  }

  const blogRef = useRef()

  const blog = () => {
    <Toggeable buttonLabel='Log in' ref={blogRef}>
          <Form token = {tokens} loginInfo = {setObjects}/>
          <BlogForm createBlog={addBlog} token={tokens}/>
    </Toggeable>
  }

  const updateBlog = async (BlogToUpdate) => {
      const updatedBlog = await blogs.changeBlog(BlogToUpdate)
      setNewBlogs(setBlogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
  }

  const deleteBlog = async (BlogToDelete) => {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogs.dltBlogs(BlogToDelete.id)
        setNewBlogs(setBlogs.filter(blog => blog.id !== BlogToDelete.id))
  }}


  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h1>Blogs</h1>
      <MessageNotification message= {message}/>
      <Display token= {tokens}/>
      <ExitAccount token= {tokens} exitAcc= {exit}/>     
      <Toggeable buttonLabel='Log in' ref={blogRef}>    
          <Form token = {tokens} loginInfo = {setObjects}/>
          <BlogForm createBlog={addBlog} token={tokens}/>
      </Toggeable>
      <h3>List of blogs</h3>
      {setBlogs.sort(byLikes).map(blog => 
        <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        />)}
    </div>
    )
  
}


export default App;
