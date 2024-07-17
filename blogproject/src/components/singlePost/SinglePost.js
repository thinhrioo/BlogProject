import { Link } from "react-router-dom";
import "./singlePost.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SinglePost() {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:9999/blog/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      {blog.image && blog.image.length > 0 && (
          <img
            className="singlePostImg"
            src={blog.image[0].name}
            alt={`Sapa Image 1`}
          />
        )}
        <h1 className="singlePostTitle">
          {blog.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author: {blog.author}
            {/* <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                Safak
              </Link>
            </b> */}
          </span>
          <span>{blog.createdat}</span>
        </div>
        
        {blog.bulletpoints && blog.bulletpoints.length>0 && (
            <p className="singlePostDesc">
            <h4>{blog.bulletpoints[0].name}</h4> <br />
            </p>
          )}
          {blog.content && blog.content.length>0 && (
            <p className="singlePostDesc">
            <p>{blog.content[0].name}</p> <br />
            </p>
          )}
          {blog.image && blog.image.length > 0 && (
            <div>
          <img
          style={{width: "80%", height: "auto", margin: "auto", display: "block"}}
            src={blog.image[1].name}
          />
          <p style={{textAlign: "center"}}>{blog.image[1].titleimg}</p>
          </div>
        )}
         {blog.bulletpoints && blog.bulletpoints.length>0 && (
            <p className="singlePostDesc">
            <h4>{blog.bulletpoints[1].name}</h4> <br />
            </p>
          )}
          {blog.content && blog.content.length>0 && (
            <p className="singlePostDesc">
            <p>{blog.content[1].name}</p> <br />
            </p>
          )}
          <br />
          
        {blog.image && blog.image.length > 0 && (
            <div>
          <img
          style={{width: "80%", height: "auto", margin: "auto", display: "block"}}
            src={blog.image[2].name}
          />
          <p style={{textAlign: "center"}}>{blog.image[2].titleimg}</p>
          </div>
        )}
        {blog.image && blog.image.length > 0 && (
            <div>
          <img
          style={{width: "80%", height: "auto", margin: "auto", display: "block"}}
            src={blog.image[3].name}
          />
          <p style={{textAlign: "center"}}>{blog.image[3].titleimg}</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
