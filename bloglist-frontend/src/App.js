import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import blogsService from './services/blogs';

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogsService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)      
    }
    
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogListUser')
  }

  const addBlog = async e => {
    e.preventDefault()
    const returnedBlog = await blogsService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label>
            Username
            <input 
              type="text"
              name="username"
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Password
            <input 
              type="password"
              name="password"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </label>
        </p>
        <button type="submit">Log in</button>
      </form>
    </div>
  )

  const blogRows = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button type="button" onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      <br />
      <BlogForm addBlog={addBlog} blog={newBlog} setBlog={setNewBlog} />
    </div>
  )

  return (
    <div>
      { user === null ? loginForm() : blogRows() }
    </div>
  )
}

export default App;
