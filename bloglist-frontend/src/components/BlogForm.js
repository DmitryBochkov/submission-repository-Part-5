import React from 'react'

const BlogForm = ({addBlog, blog, setBlog}) => (
  <div>
    <h3>Create new blog</h3>
    <form onSubmit={addBlog}>
      <p>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={({ target }) => setBlog({...blog, title: target.value})}
          />
        </label>
      </p>
      <p>
        <label>
          Author
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={({ target }) => setBlog({...blog, author: target.value})}
          />
        </label>
      </p>
      <p>
        <label>
          URL
          <input
            type="text"
            name="url"
            value={blog.url}
            onChange={({ target }) => setBlog({...blog, url: target.value})}
          />
        </label>
      </p>
      <button type="submit">Log in</button>
    </form>
  </div>
)

export default BlogForm