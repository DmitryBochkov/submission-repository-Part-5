import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogsService from './services/blogs';

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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
    </div>
  )

  return (
    <div>
      { user === null ? loginForm() : blogRows() }
    </div>
  )
}

export default App;
