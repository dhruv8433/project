import {
  Backdrop,
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { API_URL, MAP_API } from "../../../config/config";

export const UpdateAddress = ({ selectedAddress, addressUpdate, index }) => {
  const { t } = useTranslation();

  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [type, setType] = useState("");
  const [landmark, setLandmark] = useState("");

  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Modal state
  const [open, setOpen] = useState(false);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      const coordinates = JSON.parse(storedCoordinates);
      if (coordinates.length > 0) {
        const lastCoordinate = coordinates[index];
        setArea(lastCoordinate.address);
        setPincode(lastCoordinate.pincode);
        setMobile(lastCoordinate.mobile);
        setAltMobile(lastCoordinate.altMobile);
        setType(lastCoordinate.addressType);
        setLandmark(lastCoordinate.landmark);
      }
    }
  }, [index]);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleAltMobileChange = (e) => {
    setAltMobile(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleLandmarkChange = (e) => {
    setLandmark(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic or API call with the address details
    console.log("Updated Address:", {
      area,
      pincode,
      mobile,
      altMobile,
      type,
      landmark,
    });

    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      const coordinates = JSON.parse(storedCoordinates);
      if (coordinates.length > index) {
        // Create a new coordinates array with the updated coordinate object
        const updatedCoordinates = coordinates.map((coordinate, i) => {
          if (i === index) {
            return {
              ...coordinate,
              address: area,
              lat,
              lng,
              pincode,
              mobile,
              altMobile,
              addressType: type,
              landmark,
            };
          }
          return coordinate;
        });
        // Store the updated coordinates array back in localStorage
        localStorage.setItem("coordinates", JSON.stringify(updatedCoordinates));
      }
    }

    // Reset the form fields and lat/lng values
    setArea("");
    setPincode("");
    setMobile("");
    setAltMobile("");
    setType("");
    setLandmark("");
    setLat("");
    setLng("");
  };

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locationName, setLocationName] = useState("");
  const mapRefe = useRef(null);
  const autocompleteRef = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      const coordinates = JSON.parse(storedCoordinates);
      if (coordinates.length > 0) {
        const lastCoordinate = coordinates[index];
        setLat(lastCoordinate.lat);
        setLng(lastCoordinate.lng);
      }
    }
  }, []);

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement("script");
    const apiKey = "AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize map, autocomplete, and geocoder once the Google Maps API is loaded
      initMap();
      initAutocomplete();
      initGeocoder();
    };
  }, []);


  const initMap = () => {

    const coordinates = JSON.parse(localStorage.getItem("coordinates"));
    const lastCoordinate = coordinates[index];
    const initialLat = lastCoordinate ? parseFloat(lastCoordinate.lat) : 0;
    const initialLng = lastCoordinate ? parseFloat(lastCoordinate.lng) : 0;

    const initialLati = lastCoordinate ? parseFloat(lastCoordinate.lat) : 0;
    const initialLong = lastCoordinate ? parseFloat(lastCoordinate.lng) : 0;

    const map = new window.google.maps.Map(mapRefe.current, {
      center: { lat: initialLat, lng: initialLng },
      zoom: 8,
    });
    // Add a marker to the map
    const marker = new window.google.maps.Marker({
      map: map,
      position: { lat: initialLati, lng: initialLong},
      draggable: true,
    });

    map.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      marker.setPosition({ lat: lat, lng: lng });
      const position = marker.getPosition();
      setLat(position.lat().toFixed(6));
      setLng(position.lng().toFixed(6));
      geocodeLatLng(position);

      // Reverse geocode the dragged position to get the location name
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setArea(address);
        } else {
          console.log("Geocoder failed due to:", status);
        }
      });
    })
    // Listen for marker position changes
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      setLat(position.lat().toFixed(6));
      setLng(position.lng().toFixed(6));
      geocodeLatLng(position);

      // Reverse geocode the dragged position to get the location name
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setArea(address);
        } else {
          console.log("Geocoder failed due to:", status);
        }
      });
    });
  };

  const initAutocomplete = () => {
    // Create an autocomplete instance
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current
    );

    // Listen for place selection
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      setLat(place.geometry.location.lat().toFixed(6));
      setLng(place.geometry.location.lng().toFixed(6));

    });
  };

  const initGeocoder = () => {
    // Create a geocoder instance
    geocoder.current = new window.google.maps.Geocoder();
  };

  const geocodeLatLng = (latLng) => {
    geocoder.current.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
        setLocationName(getLocationName(results[0].address_components));
      } else {
        console.log("Geocoder failed due to:", status);
      }
    });
  };

  const getLocationName = (addressComponents) => {
    const locationName = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("sublocality") ||
        component.types.includes("administrative_area_level_1") ||
        component.types.includes("country")
    );
    return locationName ? locationName.long_name : "";
  };

  const [location, setLocation] = useState("home");
  const [addressList, setAddressList] = useState([]);
  const [openAdd, isOpenAdd] = useState(true);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddressList(JSON.parse(storedAddresses));
    }
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <h3>{t("Update Location:")}</h3> <br />
            <div
              ref={mapRefe}
              style={{ height: "400px", marginBottom: "20px" }}
            ></div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl sx={{ m: 1, width: "52ch" }} variant="outlined">
                <OutlinedInput
                  id="area"
                  value={area}
                  placeholder="Area, Location"
                  onChange={handleAreaChange}
                />
              </FormControl>{" "}
              <br />
              <FormControl sx={{ m: 1, width: "52ch" }} variant="outlined">
                <OutlinedInput
                  id="pincode"
                  value={pincode}
                  placeholder="pincode"
                  onChange={handlePincodeChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "52ch" }}>
                <OutlinedInput
                  value={mobile}
                  id="mobile"
                  placeholder="Mobile no"
                  onChange={handleMobileChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "52ch" }} variant="filled">
                <FilledInput
                  value={altMobile}
                  id="alt-mobile"
                  placeholder="alternative mobile no"
                  onChange={handleAltMobileChange}
                />
              </FormControl>
            </div>
            <div>
              <TextField
                select
                label=""
                id="location-type"
                sx={{ m: 1, width: "52ch" }}
                placeholder="type"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="office">Office</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 2, width: "52ch" }}
              >
                <TextField
                  value={landmark}
                  id="landmark"
                  label=""
                  onChange={handleLandmarkChange}
                  placeholder="landmark"
                />
              </FormControl>
            </div>
          </Box>
          <Box width={"52ch"}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 1, p: "10px 20px", ml: 2 }}
              fullWidth
            >
              Update Address
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

const AddressForm = () => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locationName, setLocationName] = useState("");
  const mapRefe = useRef(null);
  const autocompleteRef = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize map, autocomplete, and geocoder once the Google Maps API is loaded
      initMap();
      initAutocomplete();
      initGeocoder();
    };
  }, []);

  const initMap = () => {
    // Create a new map instance
    const map = new window.google.maps.Map(mapRefe.current, {
      center: { lat: 23.241346, lng: 69.675293 },
      zoom: 8,
    });

    // Add a marker to the map
    const marker = new window.google.maps.Marker({
      map: map,
      position: { lat: 23.241346, lng: 69.675293 },
      draggable: true,
    });
    
    map.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      marker.setPosition({ lat: lat, lng: lng });
      const position = marker.getPosition();
      setLat(position.lat().toFixed(6));
      setLng(position.lng().toFixed(6));
      geocodeLatLng(position);

      // Reverse geocode the dragged position to get the location name
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setAddressArea(address);
        } else {
          console.log("Geocoder failed due to:", status);
        }
      });
    })

    // Listen for marker position changes
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      setLat(position.lat().toFixed(6));
      setLng(position.lng().toFixed(6));

      
      // Reverse geocode the dragged position to get the location name
      geocodeLatLng(position);
    });
  };

  const initAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current
    );

    // Listen for place selection
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      setLat(place.geometry.location.lat().toFixed(6));
      setLng(place.geometry.location.lng().toFixed(6));
    });
  };

  const initGeocoder = () => {
    // Create a geocoder instance
    geocoder.current = new window.google.maps.Geocoder();
  };

  const geocodeLatLng = (latLng) => {
    geocoder.current.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
        setLocationName(getLocationName(results[0].address_components));
      } else {
        console.log("Geocoder failed due to:", status);
      }
    });
  };

  const getLocationName = (addressComponents) => {
    const locationName = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("sublocality") ||
        component.types.includes("administrative_area_level_1") ||
        component.types.includes("country")
    );
    return locationName ? locationName.long_name : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pincode = document.getElementById("pincode").value;
    const mobile = document.getElementById("mobile").value;
    const altMobile = document.getElementById("alt-mobile").value;
    const landmark = document.getElementById("landmark").value;

    // Perform submission logic or API call with the address, lat, lng, and additional values
    console.log("Submitted Address:", address);
    console.log("Submitted Pincode:", pincode);
    console.log("Submitted Mobile:", mobile);
    console.log("Submitted Alt Mobile:", altMobile);
    // console.log("Submitted Address Type:", addressType);
    console.log("Submitted Landmark:", landmark);

    handleAddAddress();

    if (address && lat && lng && pincode && mobile && addressType) {
      const newCoordinates = {
        address,
        lat,
        lng,
        locationName,
        pincode,
        mobile,
        altMobile,
        addressType,
        landmark,
      };

      const storedCoordinates = localStorage.getItem("coordinates");
      const existingCoordinates = storedCoordinates
        ? JSON.parse(storedCoordinates)
        : [];

      // Add the new coordinates to the array
      const updatedCoordinates = [...existingCoordinates, newCoordinates];

      // Store the updated array in localStorage
      localStorage.setItem("coordinates", JSON.stringify(updatedCoordinates));

      setAddress("");
      setLat("");
      setLng("");
      setLocationName("");
      pincodeRef.current.value = "";
      mobileRef.current.value = "";
      altMobileRef.current.value = "";
      setAddressType("");
      landmarkRef.current.value = "";
    }
  };

  const [location, setLocation] = useState("home");
  const [addressList, setAddressList] = useState([]);
  const [openAdd, isOpenAdd] = useState(true);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddressList(JSON.parse(storedAddresses));
    }
  }, []);

  const handleAddAddress = () => {
    const area = addressArea;
    const pincode = pincodeRef.current.value;
    const mobile = mobileRef.current.value;
    const altmobile = altMobileRef.current.value;
    const landmark = landmarkRef.current.value;
    const location = localStorage.getItem("addLocationName");
    const state = localStorage.getItem("addState");
    const country = localStorage.getItem("addCountry");
    const addlat = localStorage.getItem("addLat");
    const addlong = localStorage.getItem("addLong");

    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("mobile", mobile);
    formdata.append("address", area);
    formdata.append("city_id", "0");
    formdata.append("city_name", location);
    formdata.append("lattitude", addlat);
    formdata.append("longitude", addlong);
    formdata.append("area", location);
    formdata.append("type", "home");
    formdata.append("country_code", "91");
    formdata.append("pincode", pincode);
    formdata.append("state", state);
    formdata.append("country", country);
    formdata.append("is_default", "1");
    formdata.append("landmark", landmark);
    formdata.append("alternate_mobile", altmobile);

    var requestOptions = {
      headers: myHeaders,
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/add_address`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success("Address added successfully!");

        if (location.trim() !== "" && area.trim() !== "") {
          const newAddress = {
            area,
            location,
            type: "home",
            mobile,
            pincode,
            altmobile,
            landmark,
            // Set the desired type here
          };
          const updatedAddressList = [...addressList, newAddress];
          setAddressList(updatedAddressList);
          localStorage.setItem("addresses", JSON.stringify(updatedAddressList));
          setAddress("");
          setLocation("");
          isOpenAdd(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const pincodeRef = useRef(null);
  const mobileRef = useRef(null);
  const altMobileRef = useRef(null);
  const landmarkRef = useRef(null);

  const [addressType, setAddressType] = useState("");
  const [addressArea, setAddressArea] = useState("");

  const handleAddressArea = (e) => {
    setAddressArea(e.target.value);
  };

  const area = localStorage.getItem("addLocationName");
  useEffect(() => {
    setAddressArea(area);
  }, [area]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("userAddress");
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userAddress") {
        setInputValue(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    localStorage.setItem("userAddress", newValue);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Select Address from MAP:</Typography>
          <div
            ref={mapRefe}
            style={{ height: "460px", marginTop: "24px" }}
          ></div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" ml={1} gutterBottom>
              Provide Additional Information
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl sx={{ m: 1, width: "52ch" }} variant="outlined">
                  <OutlinedInput
                    id="area"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Location Name"
                  />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, width: "52ch" }} variant="outlined">
                  <OutlinedInput
                    id="pincode"
                    placeholder="pincode"
                    ref={pincodeRef}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "52ch" }}>
                  <OutlinedInput
                    id="mobile"
                    placeholder="Mobile no"
                    ref={mobileRef}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: "52ch" }} variant="filled">
                  <FilledInput
                    id="alt-mobile"
                    placeholder="alternative mobile no"
                    ref={altMobileRef}
                  />
                </FormControl>
              </div>
              <div>
                <TextField
                  select
                  label=""
                  id="location-type"
                  sx={{ m: 1, width: "52ch" }}
                  placeholder="type"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 2, width: "52ch" }}
                >
                  <TextField
                    id="landmark"
                    label=""
                    placeholder="landmark"
                    ref={landmarkRef}
                  />
                </FormControl>
              </div>
              <Box width={"52ch"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ mt: 1, p: "10px 20px", ml: 1 }}
                  fullWidth
                >
                  Add Address
                </Button>
              </Box>
            </Box>

            <ToastContainer />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressForm;