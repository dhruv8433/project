import {
  Box,
  Button,
  Container,
  Skeleton,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import axios from 'axios'
// try to find out location
import { Search, GpsFixed } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { t } from "i18next";

const apiKey = "AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE";
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

const HomePage = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const [location, setLocation] = React.useState("");
  const [swiper, setSwiper] = React.useState([]);




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
  const initAutocomplete = (place) => {
    if (!inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    inputRef.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const location = data.results[0];
        const place = location.formatted_address;
        console.log(place);
      })
      .catch((error) => {
        console.error("Error reverse geocoding:", error);
      });
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);


  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initAutocomplete;
      document.body.appendChild(googleMapsScript);
    };

    const initAutocomplete = () => {
      const google = window.google;
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    };

    if (window.google) {
      initAutocomplete();
    } else {
      loadGoogleMapsAPI();
    }
  }, [onPlaceSelected]);


  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, [initAutocomplete])

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the user's latitude and longitude coordinates.
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Create a unique key for the location value.
      var locationKey = "current-location";

      // Store the latitude and longitude coordinates in local storage using the key.
      localStorage.setItem(locationKey, JSON.stringify({
        latitude: latitude,
        longitude: longitude
      }));
    });
  }

  const theme = useTheme();

  function gmNoop() { console.log('GMap Callback') }
  const navigate = useNavigate();
  const handleSearch = () => {
    const { value } = inputRef.current;
    if (value) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        value
      )}&key=${apiKey}`;

      // Send geocoding API request
      fetch(geocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          const { results } = data;
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            console.log("Lat" + lat);
            console.log("Lng" + lng);

            // Create a new FormData object
            const formData = new FormData();

            // Append latitude and longitude to the FormData object
            formData.append("latitude", lat);
            formData.append("longitude", lng);

            // Prepare provider availability API request data
            const availabilityApiUrl =
              'https://edemand-test.thewrteam.in/api/v1/provider_check_availability';

            // Send provider availability API request with the FormData object
            fetch(availabilityApiUrl, {
              method: 'POST',
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                // Handle the response from the provider availability API
                console.log(data);

                // Check if the response matches the desired condition
                if (data.message === "Providers are available") {
                  console.log("Available", data.message);
                  localStorage.setItem("providerAvailable", true);
                  localStorage.setItem("Lat", lat);
                  localStorage.setItem("Lng", lng);
                  navigate("/", { replace: true });
                  window.location.reload('/')
                  let loc = document.getElementById("locationValue").value;
                  localStorage.setItem("locationValue", loc)
                } else {
                  console.log("Not available", data.message);
                  localStorage.setItem("providerAvailable", '');
                  toast.error("Our service is not available in this Area");
                  // localStorage.setItem("providerAvailable", '');
                  localStorage.removeItem("locationValue")
                  navigate("/");
                  localStorage.removeItem("Lat")
                  localStorage.removeItem("Lng")
                }
              })
              .catch((error) => {
                // Handle error from the provider availability API
                console.error(error);
              });
          }
        })
        .catch((error) => {
          // Handle error from the geocoding API
          console.error(error);
        });
    }
  };

  const [sliderimg, setSliderimg] = useState([])
  const [isLoading, SetIsLoading] = useState(false)
  useEffect(() => {
    var formdata = new FormData()
    formdata.append('latitude', '23.2507356')
    formdata.append('longitude', '69.6339007')
    formdata.append('category_id', '221')

    var requestOptions = {
      method: 'POST',

      body: formdata,
      redirect: 'follow'
    }

    fetch(
      'https://edemand.wrteam.me/api/v1/get_home_screen_data',
      requestOptions
    )
      .then(response => response.json())
      .then(response => setSliderimg(response.data.sliders))
      .then(response => SetIsLoading(true))
      .catch(error => console.log('error', error))
  }, [])

  //on Enter click location searched 
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

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
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            style={{ maxHeight: 500 }}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {isLoading ? (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className='mySwiper'
                style={{ maxHeight: '500px' }}
              >
                {sliderimg.map(response => {
                  return (
                    <SwiperSlide>
                      <img
                        src={response.slider_image}
                        height={'500px'}
                        width={'100%'}
                        alt=''
                        style={{ objectFit: 'cover' }}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              <Skeleton variant='rectangular' height={'500px'} width={'100%'} />
            )}
          </Swiper>
        </Box>
        <Box

          sx={{
            marginTop: -2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            style={{
              zIndex: 1,
              height: 38,
              background: theme.palette.background.box,
              border: 0,
              cursor: "pointer",
              marginTop: "1px"
            }}
            onClick={getCurrentLocation}
          >
            <GpsFixed sx={{ color: theme.palette.color.navLink }} />
          </button>
          <Box style={{ zIndex: 1 }} className="search">
            <input
              ref={inputRef}
              type="text"
              id='locationValue'
              className="myinput"
              placeholder={localStorage.getItem("locationValue")}
              onKeyPress={handleKeyPress}
            />

            <Button variant="contained" onClick={handleSearch} sx={{ mt: "-2px", boxShadow: 0, borderRadius: 0 }}>{t("Search")}</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;


export const HomePageSmallDevice = () => {
  // const inputRef = useRef(null);

  // // init gmap script
  // const initMapScript = () => {
  //   // if script already loaded
  //   if (window.google) {
  //     return Promise.resolve();
  //   }
  //   const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
  //   return loadAsyncScript(src);
  // };

  // // do something on address change
  // const onChangeAddress = (autocomplete) => {
  //   const place = autocomplete.getPlace();
  //   // setAddress(extractAddress(place));
  // };

  // // init autocomplete
  // const initAutocomplete = () => {
  //   if (!inputRef.current) return;

  //   const autocomplete = new window.google.maps.places.Autocomplete(
  //     inputRef.current
  //   );
  //   autocomplete.setFields(["address_component", "geometry"]);
  //   autocomplete.addListener("place_changed", () =>
  //     onChangeAddress(autocomplete)
  //   );
  // };

  // const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
  //   const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
  //   inputRef.current.value = "Getting your location...";
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .then((location) => {
  //       const place = location.results[0];
  //     });
  // };

  // const findMyLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       reverseGeocode(position.coords);
  //     });
  //   }
  // };

  // // load map script after mounted
  // useEffect(() => {
  //   initMapScript().then(() => initAutocomplete());
  // }, []);

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
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            style={{ maxHeight: 250 }}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide>
              <img src={"https://edemand.wrteam.me/public/uploads/sliders/006%20Woodwork%20Carpentry-min.jpg"} height={"100%"} width={"100%"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://edemand.wrteam.me/public/uploads/sliders/electricians-hands-testing-current-electric-control-panel-min-min.jpg"}
                height={"300px"}
                width={"100%"}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://edemand.wrteam.me/public/uploads/sliders/auto-mechanic-checking-car-min-min.jpg"}
                height={"auto"}
                width={"100%"}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://edemand.wrteam.me/public/uploads/sliders/1668427500.jpg"}
                height={"340px"}
                width={"100%"}
                style={{ marginTop: -5, objectFit: "cover" }}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </Box>
        {/* <Box

          sx={{
            marginTop: -2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            style={{
              zIndex: 1,
              height: 40,
              background: theme.palette.background.box,
              border: 0,
            }}
            onClick={findMyLocation}
          >
            <GpsFixed sx={{ color: theme.palette.color.navLink }} />
          </button>
          <Box style={{ zIndex: 1 }} className="search" width={600}>
            <TextField
              ref={inputRef}
              size="small"
              type="text"
              id="input_search"
              fullWidth
              className="form-control"
              placeholder="Enter Location name,Area name etc..."
              sx={{
                zIndex: 1,
                background: theme.palette.background.box,
                // width:{xs: "200px", md: "auto"},
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    startIcon={<Search />}
                    variant="contained"
                    size="small"
                    sx={{ paddingLeft: 2, paddingRight: 2, boxShadow: "none" }}
                  >
                    Search
                  </Button>
                ),
              }}
            />
          </Box> */}
        {/* </Box> */}
      </Container>
    </>
  )
}