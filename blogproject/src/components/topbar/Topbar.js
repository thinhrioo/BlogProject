// src/components/topbar/Topbar.js
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";

export default function Topbar({ currentUser, handleLogout, handleInputChange }) {
  const navigate = useNavigate();

  const handleMyBlogClick = () => {
    if (currentUser) {
      navigate('/myblog');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">WRITE</Link>
          </li>
          <li className="topListItem" onClick={handleMyBlogClick}>
            <span className="link">MY BLOG</span>
          </li>
        </ul>
      </div>
      <div className='nav-container'>
        <input 
          type='text' 
          className='search-input input1' 
          placeholder='Enter your search'
          onChange={handleInputChange}
        />
      </div>
      <div className="topRight">
        {currentUser ? (
          <>
            <div className="btn btn-warning">{currentUser}</div>
            <button onClick={handleLogout} style={{backgroundColor:"teal", color: "white"}} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link style={{backgroundColor:"lightcoral", color: "white"}} className="btn" to="/login">Login</Link>
            <Link className="link" to="/register">Register</Link>
          </>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
