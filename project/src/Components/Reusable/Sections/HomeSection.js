import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Breadcrumbs,
  Checkbox,
  Rating,
  Typography,
  TextField,
  Backdrop,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { Search, GpsFixed, Close, East } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { Autocomplete } from "@mui/material";
import slugify from "slugify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { debounce } from "lodash";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { MySkeleton } from "./Provider";
import { ArrowRightAltOutlined, Done } from "@mui/icons-material";


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

const HomeSection = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  //--------------------------------------------
  const [sliderimg, setSliderimg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [providerOptions, setProviderOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [service, setService] = useState([]);
  const [image, setImage] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [partnersData, setPartnersData] = useState([]);
  const [partnersName, setPartnersName] = useState([]);
  const [partner, setPartner] = useState([]);
  //----------------------------------------------
  const [visible, setVisible] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [customSwipe, setCustomSwipe] = useState(null);

  //Map Section
  const mapContainerRef = useRef(null);

  const latposition = localStorage.getItem("Lat");
  const lngposition = localStorage.getItem("Lng");

  // console.log(latposition)
  const lat = parseFloat(latposition);
  const lng = parseFloat(lngposition);

  //used in gettig locations 
  const [markerPosition, setMarkerPosition] = useState({ lat: lat, lng: lng });
  const [locationName, setLocationName] = useState(localStorage.getItem('locationValue'));

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      const mapOptions = {
        center: markerPosition,
        zoom: 12,
      };
      const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map,
        draggable: true,
      });

      marker.addListener('dragend', handleMarkerDragEnd);
    };
    loadGoogleMaps();
  }, []);

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
      if (status === 'OK') {
        if (results[0]) {
          setLocationName(results[0].formatted_address);
        } else {
          setLocationName('Location not found');
        }
      } else {
        setLocationName('Location not found');
      }
    });
  };
  //----------------------------------------------

  const searchClicked = () => {
    const { value1 } = inputRef1.current;
    if (value1) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        value1
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
            // Send provider availability API request with the FormData object
          }
        })
    }

    setVisible(true);

    const newLocationName = inputRef1.current.value;
    setLocationName(newLocationName);

    console.log("Loca" + locationName)

    // Use the Geocoding API to get the latitude and longitude of the selected location name
    // const geocoder = new window.google.maps.Geocoder();
    // geocoder.geocode({ address: locationName }, (results, status) => {
    //   if (status === 'OK' && results && results.length > 0) {
    //     const { lat, lng } = results[0].geometry.location;
    //     localStorage.setItem('Lat', lat);
    //     localStorage.setItem('Lng', lng);

    //     // Update the map with the new latitude and longitude
    //     const map = new window.google.maps.Map(mapContainerRef.current, {
    //       center: { lat, lng },
    //       zoom: 12,
    //     });
    //   } else {
    //     console.error('Geocode was not successful for the following reason:', status);
    //   }
    // });

  }

  const searchClosed = () => {
    setVisible(false);
  }

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
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    };

    const initAutocomplete = (place) => {
      if (inputRef.current) {
        const autocompleteXs = new window.google.maps.places.Autocomplete(
          inputRef.current
        );
        autocompleteXs.setFields(["address_component", "geometry"]);
        autocompleteXs.addListener("place_changed", () => onChangeAddress(autocompleteXs));
      }

      if (inputRef1.current) {
        const autocompleteMd = new window.google.maps.places.Autocomplete(
          inputRef1.current
        );
        autocompleteMd.setFields(["address_component", "geometry"]);
        autocompleteMd.addListener("place_changed", () => onChangeAddress(autocompleteMd));
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
        "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

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
      geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const locationName = results[0].formatted_address;
          // Update the location name in state or wherever you want to use it
          console.log("Location Name:", locationName);
          // For example, update it in the component state
          setLocationName(locationName);
        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });

      window.location.reload();
    });
  }

  const handleSearch = () => {
    const { value } = inputRef.current;
    const { value1 } = inputRef1.current;
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
              "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

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
          }
        })
        .catch((error) => {
          // Handle error from the geocoding API
          console.error(error);
        });
    }
    if (value1) {
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
              "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

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
          }
        })
        .catch((error) => {
          // Handle error from the geocoding API
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");

    var formdata = new FormData();
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);
    // formdata.append("category_id", "221");

    var requestOptions = {
      method: "POST",

      body: formdata,
      redirect: "follow",
    };

    const addSection = () => {
      const newSectionKey = `section${sectionsData.length + 1}`;
      const newSection = {
        key: newSectionKey,
        title: "",
        subCategories: [],
      };
      setSectionsData([...sectionsData, newSection]);
    };

    //change api
    fetch(
      "https://edemand.wrteam.me/api/v1/get_home_screen_data",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setSliderimg(response.data.sliders);
        setImage(response.data.categories);

        setPartnersName(response.data.sections);
        const partnersSections = response.data.sections.filter(section => section.section_type === "partners");

        // Process each partners section data
        partnersSections.forEach(section => {
          // Process your data here (you can access section.partners)
          setPartner(section.partners);
          console.log(partner)
        });

        const partners = partnersSections;

        setPartnersData(response.data.sections);
        // Create sections dynamically based on the API response
        const newSectionsData = response.data.sections.map((section) => {
          if (section.section_type === 'sub_categories') {
            return {
              key: section.title.toLowerCase().replace(" ", "-"),
              title: section.title,
              subCategories: section.sub_categories,
            };
          } else {
            return null; // or return an empty object, or simply skip the section based on your requirement.
          }
        }).filter(Boolean);

        // closed
        // const newProvidersData = response.data.sections.map((section) => {
        //   if (section.section_type === 'partners') {
        //     return {
        //       key: section.title.toLowerCase().replace(" ", "-"),
        //       title: section.title,
        //       partners: section.partners,
        //     };
        //   } else {
        //     return null; // or return an empty object, or simply skip the section based on your requirement.
        //   }
        // }).filter(Boolean);
        // setPartner(newProvidersData)

        setSectionsData(newSectionsData);
        setIsLoading(true);

        setIsLoading(true);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //on Enter click location searched
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
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
    //change api
    fetch("https://edemand.wrteam.me/api/v1/get_services", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Update the state with the options for the Autocomplete dropdown
        setService(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  //   -------------------------------------
  //   Categories page
  //   -------------------------------------

  // Function to handle sliding to the next slide
  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  // Function to handle sliding to the previous slide
  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextCustomSlide = () => {
    if (customSwipe) {
      customSwipe.slideNext();
    }
  };

  // Function to handle sliding to the previous slide
  const handlePrevCustomSlide = () => {
    if (customSwipe) {
      customSwipe.slidePrev();
    }
  };

  const cat_name = useParams();
  const { title } = cat_name;

  const theme = useTheme();
  const navigate = useNavigate();

  const handleLocationSelect = (event, value) => {
    // Update the locationName state with the selected value
    setLocationName(value);
  };

  const providerAvailable = () => {
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");

    var formdata = new FormData();
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://edemand-test.wrteam.in/api/v1/provider_check_availability", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        // Check if the provider is available based on the API response
        if (result.message === "Providers are available") {
          toast.success("Providers are available", { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.error("Providers are not available", { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleCustomLocation = () => {

    const lat = markerPosition.lat;
    const lng = markerPosition.lng;

    localStorage.setItem("Lat", lat);
    localStorage.setItem("Lng", lng);

    setVisible(false);
    // handleSearch();
    providerAvailable();
  }

  return (
    <>
      {/* ----------Slider------------ */}
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
                {isLoading ? (
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
                  placeholder={
                    locationName
                      ? locationName
                      : "Search Location, Area or City"
                  }
                  inputProps={{ "aria-label": "search google maps" }}
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
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
                {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton> */}
                <Button
                  startIcon={<Search />}
                  size="small"
                  variant="contained"
                  onClick={searchClicked}
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
                <Box height={500} width={500} sx={{ background: theme.palette.background.box }}>
                  <Box mt={1} ml={2} mr={1} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography>Select Location from map</Typography>
                    <IconButton onClick={searchClosed}><Close /></IconButton>
                  </Box>
                  <Divider />
                  <Box padding={1}>
                    <div ref={mapContainerRef} style={{ width: '100%', height: '380px' }} />
                    <br />
                    <Button variant="contained" fullWidth onClick={handleCustomLocation}>Use this location</Button>
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
                {isLoading ? (
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
                    locationName
                      ? locationName
                      : "Search Location, Area or City"
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
                {/* <Button
              startIcon={<Search />}
              size="small"
              variant="contained"
              onClick={handleSearch}
              sx={{ ml: 1, boxShadow: 0, height: "38px" }}
            >
              {t("Search")}
            </Button> */}
              </Paper>
            </Box>
          </Container>
        </Box>
        <ToastContainer />
      </>

      {/* ------------Category----------- */}
      <div style={{ background: theme.palette.background.box }}>
        <Container>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ marginBottom: 1, fontSize: theme.palette.fonts.h2, mt: 1 }}
              >
                {t("Categories")}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <span
                  className="previous-next-btn"
                  sx={{ marginLeft: "auto", alignItems: "center" }}
                >
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => handlePrevSlide()}
                  >
                    <ArrowBackIosIcon
                      sx={{ color: theme.palette.color.navLink }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => handleNextSlide()}
                  >
                    <ArrowForwardIosIcon
                      sx={{ color: theme.palette.color.navLink }}
                    />
                  </IconButton>
                </span>
              </Box>
            </Box>

            <Swiper
              className="myslider"
              pagination={{
                type: "progressbar",
              }}
              slidesPerView={5}
              freeMode={true}
              style={{
                height: "auto",
              }}
              modules={[Pagination, Navigation]}
              onSwiper={(s) => {
                setSwiper(s);
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
            >
              {isLoading ? (
                <Box>
                  {image.map((response) => {
                    const slug = slugify(response.name, { lower: true });
                    return (
                      <SwiperSlide
                        key={response.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Link
                          to={"/categories/" + response.id + "/" + slug}
                          style={{ textDecoration: "none" }}
                        >
                          <Card
                            className="creative_category"
                            key={response.id}
                            sx={{
                              mt: 3,
                              mb: 2,
                              width: 200,
                              height: 200,
                              border: "1px solid #e4e4e4",
                              background: "white",
                            }}
                          >
                            <img
                              alt="service_image"
                              src={response.category_image}
                              title={response.name}
                              style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <CardContent sx={{ textAlign: "center", mt: -6 }}>
                              <NavLink
                                gutterbottom
                                variant="a"
                                to={"/categories/" + response.id + "/" + slug}
                                component="div"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <h4 style={{ fontWeight: 400 }}>
                                  {response.name}
                                </h4>
                              </NavLink>
                            </CardContent>
                          </Card>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Box>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      display={{ xs: "none", sm: "none", md: "flex" }}
                      gap={2}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        sx={{ borderRadius: 4 }}
                        width={"20%"}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"20%"}
                        sx={{ borderRadius: 4 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        sx={{ borderRadius: 4 }}
                        width={"20%"}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        sx={{ borderRadius: 4 }}
                        width={"20%"}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"20%"}
                        sx={{ borderRadius: 4 }}
                      />
                    </Box>

                    <Box
                      display={{ xs: "none", sm: "flex", md: "none" }}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"30%"}
                        sx={{ borderRadius: 4 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"30%"}
                        sx={{ borderRadius: 4 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"30%"}
                        sx={{ borderRadius: 4 }}
                      />
                    </Box>

                    <Box
                      display={{ xs: "flex", sm: "none", md: "none" }}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={"250px"}
                        width={"75%"}
                        sx={{ borderRadius: 4 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Swiper>
          </Box>
        </Container>
      </div>

      {/* --------------Providers fetching--------------- */}
      <>

        {isLoading ? (
          <>
            {partnersData.map((response) => {
              // const slug = slugify(response.company_name, {
              //   lower: true,
              // });
              if (response.section_type === 'partners')
                return (
                  <>
                    <div style={{ background: theme.palette.background.box }}>
                      <Container>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
                          <Box>
                            <Typography
                              fontSize={theme.palette.fonts.h2}
                              marginBottom={"-2px"}
                              marginTop={1}
                            >
                              {response.title}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1 }} alignItems={"center"} display={"flex"}>
                            <Link to={'/providers'}>
                              <Button endIcon={<East />}>
                                View all providers
                              </Button>
                            </Link>
                          </Box>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                        <Box
                          display={"flex"}
                          gridColumn={3}
                          flexWrap={"wrap"}
                          sx={{
                            gap: "22px",
                            justifyContent: "space-around",
                            margin: 0,
                            pt: 3,
                            pb: 3,
                          }}
                        >
                          {
                            partner.slice(0, 3).map((response) => {
                              return (
                                <Link
                                  key={response.id}
                                  to={
                                    "/providers/services/" +
                                    response.partner_id +
                                    "/" +
                                    // slug"
                                    ""
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <Card
                                    key={response.id}
                                    sx={{ maxWidth: 345, display: "inline-block" }}
                                  >
                                    <CardMedia
                                      sx={{ height: 240 }}
                                      image={response.banner_image}
                                    />

                                    <CardMedia
                                      sx={{
                                        height: 80,
                                        width: 80,
                                        border: "5px solid white",
                                        borderRadius: "50px",
                                        cursor: "pointer",
                                        marginTop: "-40px",
                                        marginLeft: "35%",
                                      }}
                                      image={response.image}
                                    />
                                    <Box textAlign={"center"}>
                                      <CardContent>
                                        <Typography
                                          gutterbottom
                                          variant="h5"
                                          component="div"
                                          textAlign={"center"}
                                        >
                                          {response.company_name}
                                        </Typography>
                                        <Rating
                                          name="read-only"
                                          value={response.number_of_ratings}
                                          readOnly
                                          sx={{ alignContent: "center" }}
                                        />
                                        <Button variant="contained" startIcon={<Done />}>
                                          {response.number_of_orders} Order Completed
                                        </Button>

                                        <div
                                          className="lines"
                                          style={{ paddingTop: "30px" }}
                                        >
                                          <hr />
                                        </div>
                                        <Box mt={3}>
                                          <NavLink
                                            to={
                                              "/providers/services/" +
                                              response.partner_id +
                                              "/" +
                                              "slug"
                                            }
                                            style={{
                                              textAlign: "center",
                                              justifyContent: "center",
                                              display: "flex",
                                              textDecoration: "none",
                                              color: theme.palette.color.navLink,
                                              fontSize: 16,
                                              // position: "absolute", // Added position absolute
                                              right: 0, // Added right position
                                              top: "50%", // Added top position
                                              transform: "translateY(-50%)", // Added transform property
                                              transition: "transform 0.3s", // Added transition property
                                              "&:hover": {
                                                transform:
                                                  "translateX(5px) translateY(-50%)", // Added transform property on hover
                                              },
                                              zIndex: 1,
                                            }}
                                          >
                                            View All Services <ArrowRightAltOutlined />
                                          </NavLink>
                                        </Box>
                                      </CardContent>
                                    </Box>
                                  </Card>
                                </Link>
                              )
                            })
                          }
                        </Box>

                      </Container>
                    </div >
                    <br />
                  </>
                );
            })}
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid
              item
              lg={12}
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              gap={2}
            >
              <Container>
                <MySkeleton />
                <MySkeleton />
                <MySkeleton />
                <MySkeleton />
                <MySkeleton />
                <MySkeleton />
              </Container>
            </Grid>
          </Grid>
        )
        }
      </>

      {/* --------------Sub Cat fetching--------------- */}
      <div>
        {isLoading ? (
          <>
            {sectionsData.map((section) => {
              // console.log(section)
              return (
                <>
                  <div style={{ background: theme.palette.background.box }}>
                    <Container>
                      <Box key={section.key}>
                        <Box sx={{
                          paddingBottom: 1, display: "flex",
                          justifyContent: "space-between",
                        }}>
                          <Box>
                            <Typography
                              fontSize={theme.palette.fonts.h2}
                              marginBottom={"-2px"}
                              marginTop={1}
                            >
                              {section.title}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
                              <IconButton
                                aria-label="delete"
                                onClick={handlePrevCustomSlide}
                              >
                                <ArrowBackIosIcon
                                  sx={{ color: theme.palette.color.navLink }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={handleNextCustomSlide}
                                disabled={
                                  activeSectionIndex === sectionsData.length - 1
                                } // Disable next button on the last section
                              >
                                <ArrowForwardIosIcon
                                  sx={{ color: theme.palette.color.navLink }}
                                />
                              </IconButton>
                            </span>
                          </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                          {/* Render the sub-categories for each section */}
                          <Swiper
                            className="swiper-wrapper-padding"
                            slidesPerView={5}
                            freeMode={true}
                            // navigation={true}
                            style={{
                              height: "auto",
                            }}
                            modules={[Navigation]}
                            onSwiper={(s) => {
                              setCustomSwipe(s);
                            }}

                            breakpoints={{
                              0: {
                                slidesPerView: 1,
                              },
                              640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                              },
                              898: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                              },
                              1204: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                              },
                            }}
                          >
                            <Box>
                              {section.subCategories.map((response) => (
                                <div key={response.id}>
                                  <SwiperSlide
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    {/* think company name where to render  */}
                                    <Link
                                      to={`/providers/services/${response.parent_id}/${response.company_name}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <Card
                                        className="service-card"
                                        key={response.id}
                                        sx={{
                                          width: 260,
                                          height: 220,
                                          borderRadius: "10px",
                                          marginBottom: 2
                                        }}
                                      >
                                        <img
                                          src={response.image}
                                          title={response.name}
                                          alt="service_image"
                                          style={{
                                            height: "100%",
                                            width: "100%",
                                            justifyContent: "center",
                                            objectFit: "cover",
                                            display: "flex",
                                            filter: "brightness(0.5)",
                                          }}
                                        // we have to implemenmt provider/service/...
                                        />
                                        <Box marginTop={-5} textAlign={"center"}>
                                          <Typography
                                            variant="h6"
                                            zIndex={1}
                                            position={"relative"}
                                          >
                                            <NavLink
                                              to={
                                                "/providers/services/293/world-clean-pvt-ltd"
                                              }
                                              style={{
                                                color: "white",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                              }}
                                            >
                                              {response.name}
                                            </NavLink>
                                          </Typography>
                                        </Box>
                                        {/* <div className="overlay"></div> */}
                                        {/* <div className="service-card-rating">4.5</div> */}
                                      </Card>
                                    </Link>
                                  </SwiperSlide>
                                </div>
                              ))}
                            </Box>
                          </Swiper>
                        </Box>
                      </Box>
                    </Container>
                  </div>
                </>
              )
            })}
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <>
              <div
                key={index}
                style={{ background: theme.palette.background.box }}
              >
                <Container>
                  <Skeleton height={80} width={300} />
                  <hr />
                  <Box sx={{ display: "flex", gap: 2, marginTop: -3 }}>
                    <Skeleton
                      height={400}
                      width={300}
                      sx={{ borderRadius: 3 }}
                    />
                    <Skeleton
                      height={400}
                      width={300}
                      sx={{ borderRadius: 3 }}
                    />
                    <Skeleton
                      height={400}
                      width={300}
                      sx={{ borderRadius: 3 }}
                    />
                    <Skeleton
                      height={400}
                      width={300}
                      sx={{ borderRadius: 3 }}
                    />
                  </Box>
                </Container>
              </div>
              <br />
            </>
          ))
        )}
      </div>

    </>
  );
};

export default HomeSection;
