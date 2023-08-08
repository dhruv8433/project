import { Box, Button, Container, Divider, IconButton, InputBase,Paper,Skeleton,Typography,TextField, Backdrop } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { Search, GpsFixed, Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { Autocomplete } from "@mui/material";
import slugify from "slugify";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { API_URL, GOOGLE_MAP, MAP_API } from "../../../config/config";
import api from '../../../API/Fetch_data_Api'

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

const SwiperHome = ({ sliderData, loading }) => {
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  //--------------------------------------------
  const [sliderimg, setSliderimg] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [service, setService] = useState([]);
  //----------------------------------------------
  const [visible, setVisible] = useState(false);

  // Map Section
  const mapContainerRef = useRef(null);
  const latposition = parseFloat(localStorage.getItem("Lat"));
  const lngposition = parseFloat(localStorage.getItem("Lng"));

  // used in getting locations
  const [markerPosition, setMarkerPosition] = useState({
    lat: latposition,
    lng: lngposition,
  });
  const [locationName, setLocationName] = useState(
    localStorage.getItem("locationValue")
  );

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API}&libraries=places`;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      const mapOptions = {
        center: markerPosition,
        zoom: 12,
      };
      const map = new window.google.maps.Map(
        mapContainerRef.current,
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map,
        draggable: true,
      });

      marker.addListener("dragend", handleMarkerDragEnd);
    };
    loadGoogleMaps();
  }, [latposition, lngposition]);


  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchLocationName(lat, lng);
  };

  const fetchLocationName = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setLocationName(results[0].formatted_address);
        } else {
          setLocationName("Location not found");
        }
      } else {
        setLocationName("Location not found");
      }
    });
  };
  //----------------------------------------------

  const searchClicked = () => {

    const geocoder = new window.google.maps.Geocoder();
    const locationValue = document.getElementById("locationValue").value;

    geocoder.geocode({ address: locationValue }, (results, status) => {
      if (status === "OK") {
        const locationName = results[0].formatted_address;
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();

        localStorage.setItem("locationValue", locationName);
        localStorage.setItem("Lat", latitude);
        localStorage.setItem("Lng", longitude);

        // Update the marker's position state with the new latitude and longitude
        setMarkerPosition({ lat: latitude, lng: longitude });

        // Reinitialize the map with the updated marker position
        // initializeMap(latitude, longitude);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });

    setVisible(true);

    const newLocationName = inputRef1.current.value;
    setLocationName(newLocationName);

    console.log("Loca" + locationName);
  };

  const searchClosed = () => {
    setVisible(false);
  };

  //when user select and search any provider that render on that's page
  const handleInputChange = (event, value, reason) => {
    if (reason) {
      // The user has selected an option, so navigate to the desired page
      const selectedProvider = providerOptions.find(
        (option) => option.company_name === value
      );
      console.log("Selected Provider : ", selectedProvider);
      if (selectedProvider) {
        const providerId = selectedProvider.partner_id;
        const providerName = slugify(selectedProvider.company_name, {
          lower: true,
        });

        const url = `/providers/services/${providerId}/${providerName}`;
        window.location.href = url;
      }
    }
  };

  const handleInputChangeService = (event, value, reason) => {
    if (reason) {
      // The user has selected an option, so navigate to the desired page
      const selectedProvider = providerOptions.find(
        (option) => option.category_name === value
      );
      console.log("Selected Provider : ", selectedProvider);
      if (selectedProvider) {
        const providerId = service.category_id;
        const providerName = slugify(service.company_name, {
          lower: true,
        });

        const url = `/providers/services/${providerId}/${providerName}`;
        window.location.href = url;
      }
    }
  };

  // Consolidate the Google Maps API initialization
  useEffect(() => {
    const initMapScript = () => {
      // if script already loaded
      if (window.google) {
        return Promise.resolve();
      }
      const src = `${GOOGLE_MAP}?key=${MAP_API}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    };

    const initAutocomplete = (place) => {
      if (inputRef.current) {
        const autocompleteXs = new window.google.maps.places.Autocomplete(
          inputRef.current
        );
        autocompleteXs.setFields(["address_component", "geometry"]);
        autocompleteXs.addListener("place_changed", () =>
          onChangeAddress(autocompleteXs)
        );
      }

      if (inputRef1.current) {
        const autocompleteMd = new window.google.maps.places.Autocomplete(
          inputRef1.current
        );
        autocompleteMd.setFields(["address_component", "geometry"]);
        autocompleteMd.addListener("place_changed", () =>
          onChangeAddress(autocompleteMd)
        );
      }

      if (place) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
      }
    };

    initMapScript().then(() => initAutocomplete());
  }, []);

  const onChangeAddress = (autocomplete) => {
    autocomplete.getPlace();
  };

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the user's latitude and longitude coordinates.
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Create a unique key for the location value.
      var locationKey = "current-location";

      // Store the latitude and longitude coordinates in local storage using the key.
      localStorage.setItem(
        locationKey,
        JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        })
      );

      localStorage.setItem("Lat", latitude);
      localStorage.setItem("Lng", longitude);

      // Create a new FormData object
      const formData = new FormData();

      // Append latitude and longitude to the FormData object
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      // Prepare provider availability API request data
      const availabilityApiUrl =
        `${API_URL}/provider_check_availability`;

      // Send provider availability API request with the FormData object
      fetch(availabilityApiUrl, {
        method: "POST",
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
            localStorage.setItem("Lat", latitude);
            localStorage.setItem("Lng", longitude);
            navigate("/", { replace: true });
            window.location.reload("/");
            let loc = document.getElementById("locationValue").value;
            localStorage.setItem("locationValue", loc);
          } else {
            console.log("Not available", data.message);
            localStorage.setItem("providerAvailable", "");
            toast.error("Our service is not available in this Area");
            // localStorage.setItem("providerAvailable", '');
            localStorage.removeItem("locationValue");
            navigate("/");
            localStorage.removeItem("Lat");
            localStorage.removeItem("Lng");
          }
        })
        .catch((error) => {
          // Handle error from the provider availability API
          console.error(error);
        });

      const geocoder = new window.google.maps.Geocoder();

      // Fetch the location name (address) based on the current latitude and longitude
      geocoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const locationName = results[0].formatted_address;
            // Update the location name in state or wherever you want to use it
            console.log("Location Name:", locationName);
            // For example, update it in the component state
            setLocationName(locationName);
          } else {
            console.error(
              "Geocode was not successful for the following reason:",
              status
            );
          }
        }
      );

      window.location.reload();
    });
  }

  function SearchMap(value, inputRef) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      value
    )}&key=${MAP_API}`;

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
          const availabilityApiUrl = `${API_URL}/provider_check_availability`;

          // Send provider availability API request with the FormData object
          fetch(availabilityApiUrl, {
            method: "POST",
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
                window.location.reload("/");
                let loc = document.getElementById("locationValue").value;
                // localStorage.setItem("locationValue", loc);
              } else {
                console.log("Not available", data.message);
                localStorage.setItem("providerAvailable", "");
                toast.error("Our service is not available in this Area");
                // localStorage.setItem("providerAvailable", '');
                localStorage.removeItem("locationValue");
                navigate("/");
                localStorage.removeItem("Lat");
                localStorage.removeItem("Lng");
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

  const handleSearch = () => {
    const { value } = inputRef.current;
    const { value1 } = inputRef1.current;
    if (value) {
      SearchMap(value, inputRef)
    }
    if (value1) {
      SearchMap(value1, inputRef1)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchClicked();
      setVisible(true);
    }
  };

  const debouncedApiCall = useRef(
    debounce((searchInput) => {
      // Call the API with the debounced search input
      handleApiRequest(searchInput);
    }, 500) // Set the debounce delay (in milliseconds) here, e.g., 500ms
  ).current;

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedApiCall(value); // Call the debounced function with the current search input value
  };

  // Function to handle the API request with the search input value
  const handleApiRequest = (searchInput) => {
    // Create a FormData object with the search parameter
    const formData = new FormData();
    formData.append("latitude", "23.2367989");
    formData.append("longitude", "69.6333604");
    formData.append("search", searchInput); // Use the dynamically obtained search input value

    // Prepare the API request options
    const requestOptions = {
      method: "POST",
      headers: { Cookie: "ci_session=1marbnn760pnnl4tb1pv4e4h68bvqa7b" },
      body: formData,
      redirect: "follow",
    };

    // Send the API request
    fetch(`${API_URL}/get_services`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setService(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const theme = useTheme();
  const navigate = useNavigate();

  const providerAvailable = () => {
    api.providerAvailable()
      .then((result) => {
        // Check if the provider is available based on the API response
        if (result.message === "Providers are available") {
          toast.success("Providers are available");
        } else {
          toast.error("Providers are not available");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleCustomLocation = () => {
    const lat = markerPosition.lat;
    const lng = markerPosition.lng;

    localStorage.setItem("Lat", lat);
    localStorage.setItem("Lng", lng);

    setVisible(false);
    // handleSearch();
    // providerAvailable();
  };

  function handleSelectLocation () {
    searchClicked();
    setVisible(true);
  }

  return (
    <>
      <Box display={{ xs: "none", md: "block" }}>
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
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  height={"500px"}
                  width={"100%"}
                />
              ) : (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                  style={{ maxHeight: "500px" }}
                >
                  {sliderData.map((response) => {
                    return (
                      <SwiperSlide>
                        <img
                          src={response.slider_image}
                          height={"500px"}
                          width={"100%"}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
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
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 800,
                zIndex: 1,
                backgroundColor: theme.palette.background.input,
              }}
            >
              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                onClick={getCurrentLocation}
              >
                <GpsFixed />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputRef={inputRef1}
                id="locationValue"
                onKeyPress={handleKeyPress}
                onBlur={handleSelectLocation}
                placeholder={
                  locationName ? locationName : "Search Location, Area or City"
                }
                inputProps={{ "aria-label": "search google maps" }}
                value={locationName}
                onChange={(e) => {setLocationName(e.target.value)
                }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={service.map((response) => response.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ border: 0, width: "300px", paddingLeft: 1 }}
                    onChange={handleSearchInputChange} // Call the new search input change handler
                    value={searchValue} // Set the value to the search input state
                    placeholder="Search for services or providers"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      disableUnderline: true,
                    }}
                  />
                )}
                onChange={handleInputChangeService}
                onKeyPress={handleInputChangeService}
              />
              <Button
                startIcon={<Search />}
                size="small"
                variant="contained"
                // onClick={searchClicked}
                // onClick={fetchAndStoreLocation}
                onClick={providerAvailable}
                sx={{
                  ml: 1,
                  boxShadow: 0,
                  height: "38px",
                  textTransform: "none",
                }}
              >
                {t("Search")}
              </Button>
            </Paper>

            <Backdrop open={visible} sx={{ zIndex: 101 }}>
              <Box
                height={500}
                width={500}
                sx={{ background: theme.palette.background.box }}
              >
                <Box
                  mt={1}
                  ml={2}
                  mr={1}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography>Select Location from map</Typography>
                  <IconButton onClick={searchClosed}>
                    <Close />
                  </IconButton>
                </Box>
                <Divider />
                <Box padding={1}>
                  <div
                    ref={mapContainerRef}
                    style={{ width: "100%", height: "380px" }}
                  />
                  <br />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCustomLocation}
                  >
                    Use this location
                  </Button>
                </Box>
              </Box>
            </Backdrop>
          </Box>
        </Container>
      </Box>
      <Box display={{ xs: "block", md: "none" }}>
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
              style={{ maxHeight: 300 }}
              loop={true}
              autoplay={{ delay: 3000 }}
            >
              {loading ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                  style={{ maxHeight: "500px" }}
                >
                  {sliderimg.map((response) => {
                    return (
                      <SwiperSlide>
                        <img
                          src={response.slider_image}
                          height={"500px"}
                          width={"100%"}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <Skeleton
                  variant="rectangular"
                  height={"500px"}
                  width={"100%"}
                />
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
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 380,
                height: 36,
                zIndex: 1000,
              }}
            >
              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                onClick={getCurrentLocation}
              >
                <GpsFixed />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputRef={inputRef}
                id="locationValue"
                onKeyPress={handleKeyPress}
                placeholder={
                  locationName ? locationName : "Search Location, Area or City"
                }
                inputProps={{ "aria-label": "search google maps" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={providerOptions.map((option) => option.company_name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ border: 0, width: "160px" }}
                    placeholder="search providers"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      disableUnderline: true,
                    }}
                  />
                )}
                onChange={handleInputChange}
                onKeyPress={handleInputChange}
              />

              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <Search />
              </IconButton>
            </Paper>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SwiperHome;
