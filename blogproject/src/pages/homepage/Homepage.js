import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import Post from "../../components/post/Post";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";

export default function Homepage() {
  const location = useLocation();
  console.log(location);

  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
    <Topbar handleInputChange={handleInputChange}/>
      <Header />
      <div className="home">
        <Post search={search}/>
        <Sidebar />
      </div>
    </>
  );
}
