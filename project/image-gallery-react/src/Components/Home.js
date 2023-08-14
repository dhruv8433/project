import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Config";
import { Button } from "@mui/material";

const ImageGallery = ({ searchQuery, onSearch }) => {
  const [images, setImages] = useState([]);
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let apiUrl = `https://api.unsplash.com/photos/?client_id=${API_KEY}}`;

        if (searchQuery) {
          apiUrl = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${searchQuery}`;
        }

        const response = await axios.get(apiUrl);
        setImages(response.data.results || response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
    }
  };

  return (
    <>
      <div
        style={{
          height: 300,
          width: "100%",
          padding: 13,
          display: "flex",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <input
          style={{ width: "70%", height: "40px" }}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="Search Any Image"
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{ height: "43px" }}
        >
          Search
        </Button>
      </div>
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
