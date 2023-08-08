// here some backup code availablehh
{
  /* <NavLink
                  to="/"
                  style={({ isActive }) => {
                    return {
                      paddingLeft: "5%",
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    };
                  }}
                >
                  Home
                </NavLink>
          
                <NavLink
                  to="/about"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  About
                </NavLink>
                <NavLink
                  to="/categorys"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Category
                </NavLink>
                <NavLink
                  to="/providers"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Provider
                </NavLink>
                <NavLink
                  to="/contact"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Contact
                </NavLink> */
}

//Removed redux files
//Counter
//REDUX File

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;


//Booking Rating

{
  /* <Button size="small" onClick={handleOpen} variant="contained">
                Rate
              </Button> */
}

{
  /* <Drawer anchor="right" open={open}>
                <Box marginLeft={3} marginRight={3}>
                  <Box display={"flex"} width="500px" marginTop={3}>
                    {
                      <NavigateBeforeIcon
                        fontSize="large"
                        onClick={handleClose}
                      />
                    }
                    <Typography fontSize={20} marginLeft={3}>
                      World Clean Pvt Ltd
                    </Typography>
                  </Box>
                  <hr />

                  <Box>
                    <Typography>Head Massage</Typography>
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography mr={2}>Rate</Typography>

                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<StarIcon sx={{ color: "goldenrod" }} />}
                        sx={{ marginRight: 1 }}
                      >
                        1
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<StarIcon sx={{ color: "goldenrod" }} />}
                        sx={{ marginRight: 1 }}
                      >
                        2
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={<StarIcon sx={{ color: "goldenrod" }} />}
                        sx={{ marginRight: 1 }}
                      >
                        3
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<StarIcon sx={{ color: "goldenrod" }} />}
                        sx={{ marginRight: 1 }}
                      >
                        4
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<StarIcon sx={{ color: "goldenrod" }} />}
                      >
                        5
                      </Button>
                    </Box>
                    <Box mt={2}>
                      <Typography>Message</Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        sx={{ mb: 2, backgroundColor: "#f2f1f6" }}
                        maxRows={10}
                        placeholder="Write Review"
                      ></TextField>
                    </Box>

                    <Typography>Other Images of the Product</Typography>
                    <OutlinedInput
                      type="file"
                      sx={{
                        height: 200,
                        paddingLeft: 20,
                        border: "2px dashed gray",
                      }}
                      fullWidth
                      placeholder="hello"
                    />

                    <Grid container mt={2} pl={3} spacing={3}>
                      <Grid xs={3}>
                        <Badge
                          badgeContent={
                            <DeleteOutlineOutlinedIcon
                              sx={{
                                backgroundColor: "  red",
                                borderRadius: 30,
                                border: "2px solid white",
                                mt: 2,
                              }}
                            />
                          }
                        >
                          <img
                            src="https://picsum.photos/300/300"
                            height={100}
                            width={100}
                            style={{ borderRadius: 10 }}
                          />
                        </Badge>
                      </Grid>
                      <Grid xs={3}>
                        <Badge
                          badgeContent={
                            <DeleteOutlineOutlinedIcon
                              sx={{
                                backgroundColor: "  red",
                                borderRadius: 30,
                                border: "2px solid white",
                                mt: 2,
                              }}
                            />
                          }
                        >
                          <img
                            src="https://picsum.photos/300/300"
                            height={100}
                            width={100}
                            style={{ borderRadius: 10 }}
                          />
                        </Badge>
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      fullWidth
                      size="medium"
                      sx={{ backgroundColor: "#343F53", marginTop: "50px" }}
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              </Drawer> */
}



//Payment ===>
// return (
//   <Box
//     sx={{
//       mt: 3,
//       bgcolor: theme.palette.background.paper,
//       mb: 3,
//       overflow: "hidden",
//     }}
//   >
//     <Container>
//       <Box sx={{ width: "100%", marginTop: "20px" }}>
//         <Stepper activeStep={activeStep}>
//           {steps.map((label, index) => {
//             const stepProps = {};
//             const labelProps = {};

//             return (
//               <Step key={label} {...stepProps}>
//                 <StepLabel {...labelProps}>{label}</StepLabel>
//               </Step>
//             );
//           })}
//         </Stepper>
//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               Step {activeStep + 1}
//               {/* Ternary operator for page changes  */}
//               {activeStep == 0 ? (
//                 <Box sx={{ mt: 2, mb: 1 }}>
//                   {/* Select Address Page import here  */}
//                   <AddressPayment />
//                 </Box>
//               ) : (
//                 // incompelte because of not ui present
//                 <Box>
//                   <React.Fragment>
//                     <Typography variant="h6" gutterBottom>
//                       Payment method
//                     </Typography>

//                     <Grid
//                       container
//                       spacing={2}
//                       justifyContent={"space-around"}
//                       display={"flex"}
//                     >
//                       <Grid item spacing={2}>
//                         <Box>
//                           <PayPalScriptProvider
//                             options={paypalOptions}
//                           >
//                             <PayPalButtons
//                               style={{ height: 50, width: 200 }}
//                             />
//                           </PayPalScriptProvider>
//                         </Box>
//                         <Button color="primary" onClick={handlePayment}>
//                           <img
//                             src={require("../../Images/RazorPay.png")}
//                             alt="paypal"
//                             width="200px"
//                             height="80px"
//                             style={{ borderRadius: "10px" }}
//                           />
//                         </Button>

//                         {/* Stripe payment Error */}
//                         <Box>
//                           <Elements stripe={stripePromise}>
//                             <StripeCheckout
//                               token={onToken}
//                               stripeKey="pk_test_51Hh90WLYfObhNTTwooBHwynrlfiPo2uwxyCVqGNNCWGmpdOHuaW4rYS9cDldKJ1hxV5ik52UXUDSYgEM66OX45550065US7tRX"
//                             >
//                               <img
//                                 src={require("../../Images/Stripe.png")}
//                                 alt="Stripe"
//                                 width="200px"
//                                 height="80px"
//                                 style={{ borderRadius: "10px" }}
//                               />
//                             </StripeCheckout>
//                           </Elements>

//                           <Box>
//                             {/* <img
//                             src={require("../../Images/PayStack.png")}
//                             alt="payStack"
//                             width="200px"
//                             height="80px"
//                             style={{ borderRadius: "10px" }}
//                           />{" "} */}
//                             <Button color="primary">
//                               <PaystackButton
//                                 data-custom-button=""
//                                 image={require("../../Images/PayStack.png")}
//                                 {...componentProps}
//                               ></PaystackButton>
//                             </Button>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </React.Fragment>
//                 </Box>
//               )}
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </Box>
//           </React.Fragment>
//         )}
//       </Box>
//     </Container>
//   </Box>
// );

// ------------------------- Home page small devices ---------------------------

// export const HomePageSmallDevice = ({ onPlaceSelected }) => {
//   const inputRef = useRef(null);
//   // init gmap script
//   const initMapScript = () => {
//     // if script already loaded
//     if (window.google) {
//       return Promise.resolve();
//     }
//     const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//     return loadAsyncScript(src);
//   };

//   // do something on address change
//   const onChangeAddress = (autocomplete) => {
//     const place = autocomplete.getPlace();
//     // setAddress(extractAddress(place));
//   };

//   // init autocomplete
//   const initAutocomplete = useCallback((place) => {
//     if (!inputRef.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       inputRef.current
//     );
//     autocomplete.setFields(["address_component", "geometry"]);
//     autocomplete.addListener("place_changed", () =>
//       onChangeAddress(autocomplete)
//     );
//     const latitude = place.geometry.location.lat();
//     const longitude = place.geometry.location.lng();
//     localStorage.setItem("latitude", latitude);
//     localStorage.setItem("longitude", longitude);
//   });

//   const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
//     const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//     inputRef.current.value = "Getting your location...";
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         const location = data.results[0];
//         const place = location.formatted_address;
//         console.log(place);
//       })
//       .catch((error) => {
//         console.error("Error reverse geocoding:", error);
//       });
//   };

//   // load map script after mounted
//   useEffect(() => {
//     initMapScript().then(() => initAutocomplete());
//   }, []);

//   useEffect(() => {
//     const loadGoogleMapsAPI = () => {
//       const googleMapsScript = document.createElement("script");
//       googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE&libraries=places`;
//       googleMapsScript.async = true;
//       googleMapsScript.defer = true;
//       googleMapsScript.onload = initAutocomplete;
//       document.body.appendChild(googleMapsScript);
//     };

//     const initAutocomplete = () => {
//       const google = window.google;
//       const autocomplete = new google.maps.places.Autocomplete(
//         inputRef.current
//       );

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         onPlaceSelected(place);
//       });
//     };

//     if (window.google) {
//       initAutocomplete();
//     } else {
//       loadGoogleMapsAPI();
//     }
//   }, [onPlaceSelected]);

//   useEffect(() => {
//     initMapScript().then(() => initAutocomplete());
//   }, [initAutocomplete]);

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
//     });
//   }

//   const theme = useTheme();

//   function gmNoop() {
//     console.log("GMap Callback");
//   }
//   const navigate = useNavigate();
//   const handleSearch = () => {
//     const { value } = inputRef.current;
//     if (value) {
//       const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         value
//       )}&key=${apiKey}&callback=gmNoop`;

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

//   const [sliderimg, setSliderimg] = useState([]);
//   const [isLoading, SetIsLoading] = useState(false);
//   const [providerOptions, setProviderOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

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
//       .then((response) => SetIsLoading(true))
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

//   return (
//     <>
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
//             style={{ maxHeight: 300 }}
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
//               width: 380,
//               height: 36,
//               zIndex: 1000,
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
//                   sx={{ border: 0, width: "160px" }}
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

//             <IconButton
//               type="button"
//               sx={{ p: "10px" }}
//               aria-label="search"
//               onClick={handleSearch}
//             >
//               <Search />
//             </IconButton>
//             {/* <Button
//               startIcon={<Search />}
//               size="small"
//               variant="contained"
//               onClick={handleSearch}
//               sx={{ ml: 1, boxShadow: 0, height: "38px" }}
//             >
//               {t("Search")}
//             </Button> */}
//           </Paper>
//         </Box>
//       </Container>
//     </>
//   );
// };
