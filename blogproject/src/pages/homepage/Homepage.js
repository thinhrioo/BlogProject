// src/pages/homepage/Homepage.js
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import Post from "../../components/post/Post";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Homepage( {search} ) {
  const location = useLocation();
  console.log(location);

 
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategories(prevState =>
      prevState.includes(category)
        ? prevState.filter(cat => cat !== category)
        : [...prevState, category]
    );
  };
  
  return (
    <div>
      
      <Header />
      <div className="home">
        <Row>
          <Col xs={12} md={9}>
            <Post search={search} selectedCategories={selectedCategories}/>
          </Col>
          <Col xs={12} md={3}>
            <Sidebar handleCategoryChange={handleCategoryChange}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}
