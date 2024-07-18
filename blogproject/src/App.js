// src/App.js
import { useState, useEffect } from "react";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyBlog from "./pages/MyBlog";
import EditBlog from "./pages/editBlog/EditBlog";

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setCurrentUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setCurrentUser(null);
  };
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <BrowserRouter>
      <Topbar currentUser={currentUser} handleLogout={handleLogout} handleInputChange={handleInputChange}/>
      <Routes>
        <Route path="/" element={<Homepage currentUser={currentUser} search={search} />} />
        <Route path="/login" element={currentUser ? <Homepage /> : <Login setCurrentUser={setCurrentUser} />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={currentUser ? <Write /> : <Login setCurrentUser={setCurrentUser} />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={currentUser ? <Homepage /> : <Register />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
