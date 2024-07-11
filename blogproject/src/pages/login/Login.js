// src/pages/login/Login.js
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:9999/users');
      if (response.ok) {
        const users = await response.json();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          localStorage.setItem('token', 'mockToken'); // Simulate token storage
          localStorage.setItem('username', username); // Save username
          setCurrentUser(username); // Update state with username
          navigate('/');
          console.log('Login successful:', user);
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Failed to fetch user data');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="loginInput"
          placeholder="Enter your username..."
        />
        <label>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="loginInput"
          placeholder="Enter your password..."
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" style={{ backgroundColor: "lightcoral", color: "white" }} className="btn">Login</button>
      </form>
      <Link to="/register" style={{ marginTop: "10px", textAlign: "center", width: "300px", backgroundColor: "teal", color: "white" }} className="btn">Register</Link>
    </div>
  );
}
