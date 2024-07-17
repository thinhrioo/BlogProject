// src/pages/write/Write.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./write.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([{ id: 1, name: "" }]);
  const [imageLinks, setImageLinks] = useState([{ id: 1, name: "" }]);
  const [bulletpoints, setBulletpoints] = useState([{ id: 1, name: "" }]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState("");
  const [createdat, setCreatedAt] = useState(new Date().toISOString().substring(0, 10)); // Get current date in YYYY-MM-DD format
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9999/blog")
      .then(res => {
        const uniqueCategories = [...new Set(res.data.map(b => b.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (setter) => (id, name) => {
    setter(prevState => prevState.map(item => item.id === id ? { ...item, name } : item));
  };

  const addField = (setter, prevState) => {
    const newId = prevState.length > 0 ? prevState[prevState.length - 1].id + 1 : 1;
    setter([...prevState, { id: newId, name: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const newBlog = {
        id: Date.now(), // Sử dụng timestamp để tạo ID duy nhất dạng số
        title,
        bulletpoints,
        content,
        author,
        createdat,
        category,
        image: imageLinks,
      };

      const response = await axios.post("http://localhost:9999/blog", newBlog);
      if (response.status === 201) {
        navigate('/');
      } else {
        setError('Failed to create the blog post');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="write container mt-4">
      <h2 className="writeTitle">Create a New Blog Post</h2>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
            placeholder="Enter the title..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-control"
            placeholder="Enter the author name..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Creation Date</label>
          <input
            type="date"
            value={createdat}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-select"
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Image Links</label>
          {imageLinks.map(link => (
            <div key={link.id} className="d-flex mb-2">
              <input
                type="text"
                value={link.name}
                onChange={(e) => handleInputChange(setImageLinks)(link.id, e.target.value)}
                required
                className="form-control me-2"
                placeholder="Enter image link..."
              />
            </div>
          ))}
          <button type="button" onClick={() => addField(setImageLinks, imageLinks)} className="btn btn-secondary">Add Image Link</button>
        </div>

        <div className="mb-3">
          <label className="form-label">Bullet Points</label>
          {bulletpoints.map(point => (
            <div key={point.id} className="d-flex mb-2">
              <input
                type="text"
                value={point.name}
                onChange={(e) => handleInputChange(setBulletpoints)(point.id, e.target.value)}
                required
                className="form-control me-2"
                placeholder="Enter bullet point..."
              />
            </div>
          ))}
          <button type="button" onClick={() => addField(setBulletpoints, bulletpoints)} className="btn btn-secondary">Add Bullet Point</button>
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          {content.map(cont => (
            <div key={cont.id} className="mb-2">
              <textarea
                value={cont.name}
                onChange={(e) => handleInputChange(setContent)(cont.id, e.target.value)}
                required
                className="form-control"
                placeholder="Enter content..."
              />
            </div>
          ))}
          <button type="button" onClick={() => addField(setContent, content)} className="btn btn-secondary">Add Content</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
}
