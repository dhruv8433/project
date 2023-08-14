import React, { useState, useEffect } from "react";
import {Avatar} from '@mui/material'

const Navigation = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 200,
        paddingRight: 200,
        background: "black",
        paddingTop: 10,
        paddingBottom: 10,
        height: 60,
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <div className="logo" style={{ color: "white" }}>
        ImgGallery
      </div>
      <div
        className="links"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <a href="/" style={{ marginLeft: 10, marginRight: 10, color: "white" }}>
          Home
        </a>
        <a href="/" style={{ marginLeft: 10, marginRight: 10, color: "white" }}>
          About
        </a>
        <a href="/" style={{ marginLeft: 10, marginRight: 10, color: "white" }}>
          Contact
        </a>
      </div>
      <div className="Search">
        <Avatar />
      </div>
    </div>
  );
};

export default Navigation;
