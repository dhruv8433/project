import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Search, GpsFixed } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const apiKey = "YOUR_API_KEY";
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

const StartPage = ({ onPlaceSelected }) => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const initMapScript = () => {
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    };

    const initAutocomplete = () => {
        if (!inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current
        );
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () =>
            onPlaceSelected(autocomplete.getPlace())
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {
        const { value } = inputRef.current;
        if (value) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                value
            )}&key=${apiKey}`;

            fetch(geocodeUrl)
                .then((response) => response.json())
                .then((data) => {
                    const { results } = data;
                    if (results.length > 0) {
                        const { lat, lng } = results[0].geometry.location;
                        const formData = new FormData();
                        formData.append("latitude", lat);
                        formData.append("longitude", lng);

                        const availabilityApiUrl =
                            "https://edemand-test.thewrteam.in/api/v1/provider_check_availability";

                        fetch(availabilityApiUrl, {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);

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
                                    navigate("/");
                                    localStorage.removeItem("locationValue")
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        initMapScript().then(() => initAutocomplete());
    }, []);

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var locationKey = "current-location";
            localStorage.setItem(
                locationKey,
                JSON.stringify({ latitude: latitude, longitude: longitude })
            );
        });
    }

    return (
        <div style={{ marginTop: "-82px" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ margin: "50px", marginTop: "130px", textAlign: "Center" }}>
                        <img src={require("../Images/edemand_logo.png")} />
                    </Box>
                    {/* <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={160}
                        padding={1}
                        maxWidth={400}
                        margin="auto"
                        marginBottom={2}
                    >
                        <p style={{ fontSize: "24px", textAlign: "center", fontStyle: "italic" }}>
                            <img src={require('../Images/start-quotes.png')} height={'40px'} alt='quote'/> 
                            To keep a customer demands as much skill as to win one.
                            <img src={require('../Images/end-quotes.png')} height={'40px'} alt='quote'/>

                        </p>
                    </Box> */}
                    <Box
                        sx={{ color: "gray", textAlign: "center", justifyContent: "center" }}
                    >
                        <h2>Select Service from Our providers. </h2>
                    </Box>

                    <Box
                        sx={{
                            margin: "20px",
                            marginTop: "50px",
                            textAlign: "Center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            style={{
                                zIndex: 1,
                                height: 40,
                                background: theme.palette.background.box,
                                border: 0,
                                cursor: "pointer",
                            }}
                            onClick={getCurrentLocation}
                        >
                            <GpsFixed sx={{ color: theme.palette.color.navLink }} />
                        </button>
                        <input
                            ref={inputRef}
                            id='locationValue'
                            type="text"
                            className="myinput"
                            placeholder="Enter a location"
                            maxLength={30}
                            onKeyPress={handleKeyPress}

                        />
                        <span>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: "1px", mt: "-1px" }}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </span>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={require("../Images/img.avif")} alt="" width="100%" height="100%" />
                </Grid>
            </Grid>
        </div>
    );
};

export default StartPage;
