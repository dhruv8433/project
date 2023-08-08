// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   IconButton,
//   InputBase,
//   Paper,
//   Skeleton,
//   TextField,
// } from "@mui/material";
// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
// import "swiper/swiper.min.css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper";
// import { Search, GpsFixed } from "@mui/icons-material";
// import { useTheme } from "@emotion/react";
// import { useNavigate, useParams } from "react-router";
// import { toast } from "react-toastify";
// import { t } from "i18next";
// import api from "../../../API/Fetch_data_Api";
// import { Autocomplete } from "@mui/material";
// import slugify from "slugify";
// import { debounce } from "lodash";

// const apiKey = "AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE";
// const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// function loadAsyncScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     Object.assign(script, {
//       type: "text/javascript",
//       async: true,
//       src,
//     });
//     script.addEventListener("load", () => resolve(script));
//     document.head.appendChild(script);
//   });
// }
// const locationName = localStorage.getItem("locationValue");

// const HomePage = ({ onPlaceSelected }) => {
//   const inputRef = useRef(null);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [sliderimg, setSliderimg] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [providerOptions, setProviderOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [service, setService] = useState([]);

//   //when user select and search any provider that render on that's page
//   const handleInputChange = (event, value, reason) => {
//     if (reason) {
//       // The user has selected an option, so navigate to the desired page
//       const selectedProvider = providerOptions.find(
//         (option) => option.company_name === value
//       );
//       console.log("Selected Provider : ", selectedProvider);
//       if (selectedProvider) {
//         const providerId = selectedProvider.partner_id;
//         const providerName = slugify(selectedProvider.company_name, {
//           lower: true,
//         });

//         const url = `/providers/services/${providerId}/${providerName}`;
//         window.location.href = url;
//       }
//     }
//   };

//   const initMapScript = () => {
//     // if script already loaded
//     if (window.google) {
//       return Promise.resolve();
//     }
//     const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//     return loadAsyncScript(src);
//   };

//   const handleInputChangeService = (event, value, reason) => {
//     if (reason) {
//       // The user has selected an option, so navigate to the desired page
//       const selectedProvider = providerOptions.find(
//         (option) => option.category_name === value
//       );
//       console.log("Selected Provider : ", selectedProvider);
//       if (selectedProvider) {
//         const providerId = service.category_id;
//         const providerName = slugify(service.company_name, {
//           lower: true,
//         });

//         const url = `/providers/services/${providerId}/${providerName}`;
//         window.location.href = url;
//       }
//     }
//   };

//  // Consolidate the Google Maps API initialization
//   useEffect(() => {
//     const initMapScript = () => {
//       // if script already loaded
//       if (window.google) {
//         return Promise.resolve();
//       }
//       const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//       return loadAsyncScript(src);
//     };

//     const initAutocomplete = (place) => {
//       if (!inputRef.current) return;

//       const autocomplete = new window.google.maps.places.Autocomplete(
//         inputRef.current
//       );
//       autocomplete.setFields(["address_component", "geometry"]);
//       autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

//       if (place) {
//         const latitude = place.geometry.location.lat();
//         const longitude = place.geometry.location.lng();
//         localStorage.setItem("latitude", latitude);
//         localStorage.setItem("longitude", longitude);
//       }
//     };

//     initMapScript().then(() => initAutocomplete());
//   }, []);


//   // do something on address change
//   const onChangeAddress = (autocomplete) => {
//     autocomplete.getPlace();
//   };

//   // // load map script after mounted
//   // useEffect(() => {
//   //   initMapScript().then(() => initAutocomplete());
//   // }, [initAutocomplete]);

//   // useEffect(() => {
//   //   const loadGoogleMapsAPI = () => {
//   //     const googleMapsScript = document.createElement("script");
//   //     //changes use Api key instade of direct use key here
//   //     googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
//   //     googleMapsScript.async = true;
//   //     googleMapsScript.defer = true;
//   //     googleMapsScript.onload = initAutocomplete;
//   //     document.body.appendChild(googleMapsScript);
//   //   };

//   //   const initAutocomplete = () => {
//   //     const google = window.google;
//   //     const autocomplete = new google.maps.places.Autocomplete(
//   //       inputRef.current
//   //     );

//   //     autocomplete.addListener("place_changed", () => {
//   //       const place = autocomplete.getPlace();
//   //       onPlaceSelected(place);
//   //     });
//   //   };

//   //   if (window.google) {
//   //     initAutocomplete();
//   //   } else {
//   //     loadGoogleMapsAPI();
//   //   }
//   // }, [onPlaceSelected]);

//   // useEffect(() => {
//   //   initMapScript().then(() => initAutocomplete());
//   // }, [initAutocomplete]);

//   function getCurrentLocation() {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       // Get the user's latitude and longitude coordinates.
//       var latitude = position.coords.latitude;
//       var longitude = position.coords.longitude;

//       // Create a unique key for the location value.
//       var locationKey = "current-location";

//       // Store the latitude and longitude coordinates in local storage using the key.
//       localStorage.setItem(
//         locationKey,
//         JSON.stringify({
//           latitude: latitude,
//           longitude: longitude,
//         })
//       );

//       localStorage.setItem("Lat", latitude);
//       localStorage.setItem("Lng", longitude);

//       // Create a new FormData object
//       const formData = new FormData();

//       // Append latitude and longitude to the FormData object
//       formData.append("latitude", latitude);
//       formData.append("longitude", longitude);

//       // Prepare provider availability API request data
//       const availabilityApiUrl =
//         "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

//       // Send provider availability API request with the FormData object
//       fetch(availabilityApiUrl, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // Handle the response from the provider availability API
//           console.log(data);

//           // Check if the response matches the desired condition
//           if (data.message === "Providers are available") {
//             console.log("Available", data.message);
//             localStorage.setItem("providerAvailable", true);
//             localStorage.setItem("Lat", latitude);
//             localStorage.setItem("Lng", longitude);
//             navigate("/", { replace: true });
//             window.location.reload("/");
//             let loc = document.getElementById("locationValue").value;
//             localStorage.setItem("locationValue", loc);
//           } else {
//             console.log("Not available", data.message);
//             localStorage.setItem("providerAvailable", "");
//             toast.error("Our service is not available in this Area");
//             // localStorage.setItem("providerAvailable", '');
//             localStorage.removeItem("locationValue");
//             navigate("/");
//             localStorage.removeItem("Lat");
//             localStorage.removeItem("Lng");
//           }
//         })
//         .catch((error) => {
//           // Handle error from the provider availability API
//           console.error(error);
//         });
//       window.location.reload();
//     });
//   }

//   const handleSearch = () => {
//     const { value } = inputRef.current;
//     if (value) {
//       const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         value
//       )}&key=${apiKey}`;

//       // Send geocoding API request
//       fetch(geocodeUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const { results } = data;
//           if (results.length > 0) {
//             const { lat, lng } = results[0].geometry.location;
//             console.log("Lat" + lat);
//             console.log("Lng" + lng);

//             // Create a new FormData object
//             const formData = new FormData();

//             // Append latitude and longitude to the FormData object
//             formData.append("latitude", lat);
//             formData.append("longitude", lng);

//             // Prepare provider availability API request data
//             const availabilityApiUrl =
//               "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

//             // Send provider availability API request with the FormData object
//             fetch(availabilityApiUrl, {
//               method: "POST",
//               body: formData,
//             })
//               .then((response) => response.json())
//               .then((data) => {
//                 // Handle the response from the provider availability API
//                 console.log(data);

//                 // Check if the response matches the desired condition
//                 if (data.message === "Providers are available") {
//                   console.log("Available", data.message);
//                   localStorage.setItem("providerAvailable", true);
//                   localStorage.setItem("Lat", lat);
//                   localStorage.setItem("Lng", lng);
//                   navigate("/", { replace: true });
//                   window.location.reload("/");
//                   let loc = document.getElementById("locationValue").value;
//                   localStorage.setItem("locationValue", loc);
//                 } else {
//                   console.log("Not available", data.message);
//                   localStorage.setItem("providerAvailable", "");
//                   toast.error("Our service is not available in this Area");
//                   // localStorage.setItem("providerAvailable", '');
//                   localStorage.removeItem("locationValue");
//                   navigate("/");
//                   localStorage.removeItem("Lat");
//                   localStorage.removeItem("Lng");
//                 }
//               })
//               .catch((error) => {
//                 // Handle error from the provider availability API
//                 console.error(error);
//               });
//           }
//         })
//         .catch((error) => {
//           // Handle error from the geocoding API
//           console.error(error);
//         });
//     }
//   };
//   useEffect(() => {
//     var formdata = new FormData();
//     formdata.append("latitude", "23.2507356");
//     formdata.append("longitude", "69.6339007");
//     formdata.append("category_id", "221");

//     var requestOptions = {
//       method: "POST",

//       body: formdata,
//       redirect: "follow",
//     };

//     fetch(
//       "https://edemand.wrteam.me/api/v1/get_home_screen_data",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((response) => setSliderimg(response.data.sliders))
//       .then((response) => setIsLoading(true))
//       .catch((error) => console.log("error", error));

//     //search function for provider get from api
//     api
//       .get_providers()
//       .then((response) => {
//         setProviderOptions(response.data);
//       })
//       .then(() => setLoading(true))
//       .catch((error) => console.log(error));
//   }, []);

//   //on Enter click location searched
//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       handleSearch();
//     }
//   };


//   const debouncedApiCall = useRef(
//     debounce((searchInput) => {
//       // Call the API with the debounced search input
//       handleApiRequest(searchInput);
//     }, 500) // Set the debounce delay (in milliseconds) here, e.g., 500ms
//   ).current;

//   const handleSearchInputChange = (event) => {
//     const { value } = event.target;
//     setSearchValue(value);
//     debouncedApiCall(value); // Call the debounced function with the current search input value
//   };


//   // Function to handle the API request with the search input value
//   const handleApiRequest = (searchInput) => {
//     // Create a FormData object with the search parameter
//     const formData = new FormData();
//     formData.append("latitude", "23.2367989");
//     formData.append("longitude", "69.6333604");
//     formData.append("search", searchInput); // Use the dynamically obtained search input value

//     // Prepare the API request options
//     const requestOptions = {
//       method: "POST",
//       headers: { Cookie: "ci_session=1marbnn760pnnl4tb1pv4e4h68bvqa7b" },
//       body: formData,
//       redirect: "follow",
//     };

//     // Send the API request
//     fetch("https://edemand.wrteam.me/api/v1/get_services", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         // Update the state with the options for the Autocomplete dropdown
//         setService(result.data);
//       })
//       .catch((error) => console.log("error", error));
//   };
//   return (
//     <>
//       <Box display={{ xs: "none", md: "block" }}>
//       <Container>
//         <Box
//           sx={{
//             // height: "500px",
//             position: "relative",
//             marginTop: 5,
//             overflow: "hidden",
//             objectFit: "cover",
//             borderRadius: "10px",
//           }}
//         >
//           <Swiper
//             navigation={true}
//             modules={[Navigation, Autoplay]}
//             className="mySwiper"
//             style={{ maxHeight: 500 }}
//             loop={true}
//             autoplay={{ delay: 3000 }}
//           >
//             {isLoading ? (
//               <Swiper
//                 navigation={true}
//                 modules={[Navigation]}
//                 className="mySwiper"
//                 style={{ maxHeight: "500px" }}
//               >
//                 {sliderimg.map((response) => {
//                   return (
//                     <SwiperSlide>
//                       <img
//                         src={response.slider_image}
//                         height={"500px"}
//                         width={"100%"}
//                         alt=""
//                         style={{ objectFit: "cover" }}
//                       />
//                     </SwiperSlide>
//                   );
//                 })}
//               </Swiper>
//             ) : (
//               <Skeleton variant="rectangular" height={"500px"} width={"100%"} />
//             )}
//           </Swiper>
//         </Box>
//         {/* <Box
//           sx={{
//             marginTop: -2,
//             alignItems: "center",
//             justifyContent: "center",
//             display: "flex",
//           }}
//         >
//           <button
//             style={{
//               zIndex: 1,
//               height: 38,
//               background: theme.palette.background.box,
//               border: 0,
//               cursor: "pointer",
//               marginTop: "1px",
//               borderRadius: "2px",
//             }}
//             onClick={getCurrentLocation}
//           >
//             <GpsFixed sx={{ color: theme.palette.color.navLink }} />
//           </button>
//           <Box
//             style={{ zIndex: 1 }}
//             className="search"
//             sx={{ display: "flex", alignItems: "center" }}
//           >
//             <TextField
//               inputRef={inputRef}
//               type="text"
//               id="locationValue"
//               className="myinput"
//               placeholder={localStorage.getItem("locationValue")}
//               onKeyPress={handleKeyPress}
//               sx={{
//                 "& .MuiInputBase-root": {
//                   backgroundColor: theme.palette.background.input,
//                   borderRadius: "4px",
//                   height: "38px",
//                   boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
//                   "&.Mui-focused": {
//                     boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
//                   },
//                 },
//                 mr: 1,
//               }}
//             />
//             <span>|</span>
//             <TextField
//               type="text"
//               id="providerValue"
//               className="myinput"
//               placeholder="Search for providers"
//               onKeyPress={handleKeyPress}
//               sx={{
//                 "& .MuiInputBase-root": {
//                   backgroundColor: theme.palette.background.input,
//                   borderRadius: "4px",
//                   height: "38px",
//                   boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
//                   "&.Mui-focused": {
//                     boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
//                   },
//                 },
//                 ml: 1,
//               }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSearch}
//               sx={{ ml: 1, boxShadow: 0, height: "38px" }}
//             >
//               {t("Search")}
//             </Button>
//           </Box>
//         </Box> */}
//         <Box
//           sx={{
//             marginTop: -2,
//             alignItems: "center",
//             justifyContent: "center",
//             display: "flex",
//           }}
//         >
//           <Paper
//             component="form"
//             sx={{
//               p: "2px 4px",
//               display: "flex",
//               alignItems: "center",
//               width: 800,
//               zIndex: 1000,
//               backgroundColor: theme.palette.background.input,
//             }}
//           >
//             <IconButton
//               sx={{ p: "10px" }}
//               aria-label="menu"
//               onClick={getCurrentLocation}
//             >
//               <GpsFixed />
//             </IconButton>
//             <InputBase
//               sx={{ ml: 1, flex: 1 }}
//               inputRef={inputRef}
//               id="locationValue"
//               onKeyPress={handleKeyPress}
//               placeholder={
//                 locationName ? locationName : "Search Location, Area or City"
//               }
//               inputProps={{ "aria-label": "search google maps" }}
//             />
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

//             <Autocomplete
//               freeSolo
//               id="free-solo-2-demo"
//               disableClearable
//               options={providerOptions.map((option) => option.company_name)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   variant="standard"
//                   sx={{ border: 0, width: "300px" }}
//                   placeholder="search providers"
//                   InputProps={{
//                     ...params.InputProps,
//                     type: "search",
//                     disableUnderline: true,
//                   }}
//                 />
//               )}
//               onChange={handleInputChange}
//               onKeyPress={handleInputChange}
//             />
//             {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
//               <Search />
//             </IconButton> */}
//             <Button
//               startIcon={<Search />}
//               size="small"
//               variant="contained"
//               onClick={handleSearch}
//               sx={{ ml: 1, boxShadow: 0, height: "38px" }}
//             >
//               {t("Search")}
//             </Button>
//           </Paper>
//         </Box>
//       </Container>
//       </Box>
//       <Box display={{ xs: "block", md: "none" }}>
//         <Container>
//           <Box
//             sx={{
//               // height: "500px",
//               position: "relative",
//               marginTop: 5,
//               overflow: "hidden",
//               objectFit: "cover",
//               borderRadius: "10px",
//             }}
//           >
//             <Swiper
//               navigation={true}
//               modules={[Navigation, Autoplay]}
//               className="mySwiper"
//               style={{ maxHeight: 300 }}
//               loop={true}
//               autoplay={{ delay: 3000 }}
//             >
//               {isLoading ? (
//                 <Swiper
//                   navigation={true}
//                   modules={[Navigation]}
//                   className="mySwiper"
//                   style={{ maxHeight: "500px" }}
//                 >
//                   {sliderimg.map((response) => {
//                     return (
//                       <SwiperSlide>
//                         <img
//                           src={response.slider_image}
//                           height={"500px"}
//                           width={"100%"}
//                           alt=""
//                           style={{ objectFit: "cover" }}
//                         />
//                       </SwiperSlide>
//                     );
//                   })}
//                 </Swiper>
//               ) : (
//                 <Skeleton
//                   variant="rectangular"
//                   height={"500px"}
//                   width={"100%"}
//                 />
//               )}
//             </Swiper>
//           </Box>
//           <Box
//             sx={{
//               marginTop: -2,
//               alignItems: "center",
//               justifyContent: "center",
//               display: "flex",
//             }}
//           >
//             <Paper
//               component="form"
//               sx={{
//                 p: "2px 4px",
//                 display: "flex",
//                 alignItems: "center",
//                 width: 380,
//                 height: 36,
//                 zIndex: 1000,
//               }}
//             >
//               <IconButton
//                 sx={{ p: "10px" }}
//                 aria-label="menu"
//                 onClick={getCurrentLocation}
//               >
//                 <GpsFixed />
//               </IconButton>
//               <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 inputRef={inputRef}
//                 id="locationValue"
//                 onKeyPress={handleKeyPress}
//                 placeholder={
//                   locationName ? locationName : "Search Location, Area or City"
//                 }
//                 inputProps={{ "aria-label": "search google maps" }}
//               />
//               <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

//               <Autocomplete
//                 freeSolo
//                 id="free-solo-2-demo"
//                 disableClearable
//                 options={providerOptions.map((option) => option.company_name)}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     variant="standard"
//                     sx={{ border: 0, width: "160px" }}
//                     placeholder="search providers"
//                     InputProps={{
//                       ...params.InputProps,
//                       type: "search",
//                       disableUnderline: true,
//                     }}
//                   />
//                 )}
//                 onChange={handleInputChange}
//                 onKeyPress={handleInputChange}
//               />

//               <IconButton
//                 type="button"
//                 sx={{ p: "10px" }}
//                 aria-label="search"
//                 onClick={handleSearch}
//               >
//                 <Search />
//               </IconButton>
//               {/* <Button
//               startIcon={<Search />}
//               size="small"
//               variant="contained"
//               onClick={handleSearch}
//               sx={{ ml: 1, boxShadow: 0, height: "38px" }}
//             >
//               {t("Search")}
//             </Button> */}
//             </Paper>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default HomePage;