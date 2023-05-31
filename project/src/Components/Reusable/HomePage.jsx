import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import demo2 from "../../Images/demo2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";
// import required modules
import $ from "jquery";
import { Navigation } from "swiper";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// try to find out location
import { Search, GpsFixed } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
const apiKey = "AIzaSyDArxAFcnCgz7xmveZFLVgWkuocoRfumfA";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const HomePage = () => {
  const searchInput = useRef(null);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    // setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((location) => {
        const place = location.results[0];
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const theme = useTheme();

  return (
    <>
      <Container>
        <Box
          sx={{
            // height: "500px",
            position: "relative",
            marginTop: 5,
            overflow: "hidden",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        >
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{ maxHeight: "500px" }}
          >
            <SwiperSlide>
              <img src={demo2} height={"100%"} width={"100%"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://placeimg.com/640/480/tech"}
                height={"auto"}
                width={"100%"}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://placeimg.com/640/480/tech"}
                height={"auto"}
                width={"100%"}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://placeimg.com/640/480/tech"}
                height={"auto"}
                width={"100%"}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </Box>
        <Box
          sx={{
            marginTop: -2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <button
            style={{
              zIndex: 1,
              height: 40,
              background: theme.palette.background.box,
              // borderRadius:'10px',
            }}
            onClick={findMyLocation}
          >
            <GpsFixed />
          </button>
          {/* 
input  */}

          <TextField
            ref={searchInput}
            size="small"
            type="text"
            id="input_search"
            className="form-control"
            fullWidth
            placeholder="Enter Location name,Area name etc..."
            sx={{
              zIndex: 1,
              background: theme.palette.background.box,
              borderRadius: 0,
            }}
          />

          <span>
            <Button
              variant="contained"
              startIcon={<Search />}
              sx={{ zIndex: 1 }}
            >
              Search
            </Button>
          </span>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
