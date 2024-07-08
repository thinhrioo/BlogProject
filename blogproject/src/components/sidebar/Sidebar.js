import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function Sidebar({handleCategoryChange}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9999/blog`)
      .then(res => {
        const uniqueCategories = [...new Set(res.data.map(b => b.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="sidebar">
      <span className="sidebarTitle">CATEGORIES</span>
      <div className="">
        
        {categories.map((category) => (
            <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
            <input
              style={{marginTop: "-20%"}}
              type="checkbox"
              value={category}
              onChange={() => handleCategoryChange(category)}
           />
            <p>{category}</p>
            </div>
        ))}
        
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img style={{borderRadius: "10%"}}
          src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/440850162_2703492486484099_5025557501151953762_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEMQTTWPGqajIlOcTpBFssx07UK-ZZkubzTtQr5lmS5vD782QfLlwob8m29qLnIQ1-ubrAe-PgyTp_NorSukZPw&_nc_ohc=e5QcWVlbLDMQ7kNvgGxPW0H&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDspeuU7_1MVhcoPd_yCd65WB9Cv1x2WS2wqmILGnu_oQ&oe=668DB6FF"
          alt=""
        />
        <p style={{fontFamily:"courier"}}>
        Vậy lý do thực sự tôi tạo ra blog này là gì? Tôi chỉ đơn giản muốn làm cho mọi thứ xung quanh mình trở nên đẹp đẽ. Và sẽ tuyệt vời hơn nếu tôi có thể chia sẻ những điều đó với tất cả mọi người. 
Tôi nghĩ thế!<br/>
  <p>Positive living - Sống tích cực bạn nhé ;)</p>
        </p>
      </div>
      
    </div>
  );
}
