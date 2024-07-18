import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./post.css";

export default function Post({ search , selectedCategories}) {
  const [blog, setBlog] = useState([]);
  const [categories, setCategories] = useState([]);
 

  useEffect(() => {
    axios.get(`http://localhost:9999/blog`)
      .then(res => {
        setBlog(res.data);
        const uniqueCategories = [...new Set(res.data.map(b => b.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.log(err));
  }, []);



  if (!blog) {
    return <div>Loading...</div>;
  }

  const filteredBlog = blog.filter(b => {
    const matchesSearch = b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase()) ||
      b.content?.some(content => content.name?.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(b.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="categories">
        
      </div>
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
                
              </div>
              <div><span className="postAuthor">Author: {b.author}</span></div>
            </div>
            <div className="postDesc">
              {b.content?.map((content) => (
                <p key={content.id}>{content.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
