import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./post.css";

export default function Post({ search }) {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9999/blog`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const filteredBlog = blog.filter(b => {
    const titleMatch = b.title?.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = b.category?.toLowerCase().includes(search.toLowerCase());
    const authorMatch = b.author?.toLowerCase().includes(search.toLowerCase());
    const contentMatch = b.content?.some(content => content.name?.toLowerCase().includes(search.toLowerCase()));
    
    return titleMatch || categoryMatch || authorMatch || contentMatch;
  });

  return (
    <div className="posts">
      {filteredBlog.map((b) => (
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
              <span className="postDate"> {b.author}</span>
            </div>
          </div>
          <div className="postDesc">
            {b.content?.map((content) => (
              <p key={content.id}>{content.name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
