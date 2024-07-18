// src/pages/myBlog/MyBlog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./myBlog.css";

export default function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9999/blog?author=${username}`)
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, [username]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:9999/blog/${id}`)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="myBlog">
      <h2 className="myBlogTitle">My Blog Posts</h2>
      <div className="posts">
        {blogs.length > 0 ? (
          blogs.map(b => (
            <div className="post" key={b.id}>
              {b.image && b.image[0] && (
                <img
                  className="postImg"
                  src={b.image[0].name}
                  alt={b.title}
                />
              )}
              <div className="postInfo">
                <div className="postCats">
                  <span className="postCat">
                    <Link className="link" to={`/posts?cat=${b.category}`}>
                      {b.category}
                    </Link>
                  </span>
                </div>
                <span className="postTitle">
                  <Link to={`/post/${b.id}`} className="link">
                    {b.title}
                  </Link>
                </span>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="postDate">{new Date(b.createdat).toLocaleDateString()}</span>
                 
                </div>
                <div> <span className="postAuthor">{b.author}</span></div>
              </div>
              <div className="postDesc">
                {b.content?.map((content) => (
                  <p key={content.id}>{content.name}</p>
                ))}
              </div>
              <div className="postActions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/edit/${b.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
