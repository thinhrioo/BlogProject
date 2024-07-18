import { Link } from "react-router-dom";
import "./singlePost.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, InputGroup } from "react-bootstrap";

export default function SinglePost() {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const user_id = 1; // Assuming user_id is 1 for now, you might want to fetch it dynamically

  useEffect(() => {
    axios.get(`http://localhost:9999/blog/${id}`)
      .then(res => {
        setBlog(res.data);
        setComments(res.data.comments || []);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      user_id,
      content: comment
    };

    axios.post(`http://localhost:9999/blog/${id}/comments`, newComment)
      .then(res => {
        setComments([...comments, res.data]);
        setComment("");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {blog && (
          <>
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
              </span>
              <span>{new Date(blog.createdat).toLocaleDateString()}</span>
            </div>
            {blog.bulletpoints && blog.bulletpoints.map((bp, index) => (
              <div className="singlePostDesc" key={index}>
                <h4>{bp.name}</h4>
                {blog.content && blog.content[index] && (
                  <p>{blog.content[index].name}</p>
                )}
                {blog.image && blog.image[index + 1] && (
                  <div>
                    <img
                      style={{ width: "80%", height: "auto", margin: "auto", display: "block" }}
                      src={blog.image[index + 1].name}
                    />
                    <p style={{ textAlign: "center" }}>{blog.image[index + 1].titleimg}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Comment Form */}
        <div  className="commentSection">
          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>User {comment.user_id}:</strong> {comment.content}</p>
            </div>
          ))}
          <Form onSubmit={handleCommentSubmit}>
            <textarea
            style={{width:"100%", borderRadius:"10px"}}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              required
              rows="4"
            />
            
            <Button className="btn btn-success" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
