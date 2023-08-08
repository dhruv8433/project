import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Search, GpsFixed } from '@mui/icons-material';
import { Box, Button, IconButton, InputBase, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { API_URL } from '../config/config';

const apiKey = "AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function loadAsyncScript(src) {
    return new Promise((resolve) => {
        // Check if the script with the given source already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            // If the script already exists, resolve the promise immediately
            resolve(existingScript);
        } else {
            // Otherwise, create a new script element and load the script
            const script = document.createElement("script");
            Object.assign(script, {
                type: "text/javascript",
                async: true,
                src,
            });
            script.addEventListener("load", () => resolve(script));
            document.head.appendChild(script);
        }
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
        if (!inputRef.current || !window.google || !window.google.maps) {
            // If inputRef is not available or Google Maps API is not loaded, exit the function.
            return;
        }

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

                        //update this api to "https://edemand-test.wrteam.in/api/v1/provider_check_availability"
                        const availabilityApiUrl =
                            `${API_URL}/provider_check_availability`;

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


            const formData = new FormData();
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);

            //may we have to change this api url
            const availabilityApiUrl =
                `${API_URL}/provider_check_availability`;

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
                        localStorage.setItem("Lat", latitude);
                        localStorage.setItem("Lng", longitude);
                        navigate("/", { replace: true });
                        window.location.reload('/')
                        let loc = document.getElementById("locationValue").value;
                        localStorage.setItem("locationValue", loc)
                        window.location.reload();
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

        });
    }

    return (
        <div style={{ marginTop: "-82px", overflow: "hidden" }}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    {/* large screen logo  */}
                    <Box sx={{ marginTop: "10px", ml: 6, mt: 5, textAlign: "start" }} display={{ xs: "none", md: "block" }}>
                        <img src={require("../Images/edemand_logo.png")} height={100} alt="Logo" />
                    </Box>
                    {/* small screen logo  */}
                    <Box sx={{ marginTop: "10px", ml: 2, mt: 5, textAlign: "start" }} display={{ xs: "block", md: "none" }}>
                        <img src={require("../Images/edemand_logo.png")} height={60} alt="Logo" />
                    </Box>

                    {/* long sceen */}
                    <Box sx={{ marginTop: 20 }} display={{ xs: "none", md: "block" }}>
                        <Box sx={{ background: "#2560fc", maxWidth: "220px", padding: 2, color: "white", borderRadius: "10px", ml: 8 }}>
                            <Typography variant='contained'>Fast Response - Quality Works</Typography>
                        </Box>
                        <Box
                            sx={{ textAlign: "Start", justifyContent: "center", mt: 3, ml: 8, fontSize: "30px" }}>
                            <h2>One Stop Solution For Your <br /> <span style={{ color: '#2560fc' }}> Servies </span></h2>
                        </Box>
                    </Box>

                    {/* small sceen */}
                    <Box sx={{ marginTop: 20 }} display={{ xs: "block", md: "none" }}>
                        <Box sx={{ background: "#2560fc", maxWidth: "220px", padding: 2, color: "white", borderRadius: "10px", ml: 4 }}>
                            <Typography variant='contained'>Fast Response - Quality Works</Typography>
                        </Box>
                        <Box
                            sx={{ textAlign: "Start", justifyContent: "center", mt: 3, ml: 4, fontSize: "30px" }}>
                            <h2>One Stop Solution For Your <br /> <span style={{ color: '#2560fc' }}> Servies </span></h2>
                        </Box>
                    </Box>

                    {/* for large screen  */}
                    <Box
                        display={{ md: "flex" }}
                        width={{ xs: 400, sm: 500, md: 600 }}
                        marginLeft={{ xs: 4, md: 8 }}
                        sx={{
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 3
                        }}
                    >
                        <Paper
                            component="form"
                            sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                zIndex: 1000,
                                width: "inherit",
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
                                inputRef={inputRef}
                                id="locationValue"
                                onBlur={handleSearch}
                                onKeyPress={handleKeyPress}
                                inputProps={{ "aria-label": "search google maps" }}
                            />
                            <Button
                                startIcon={<Search />}
                                size="small"
                                variant="contained"
                                onClick={handleSearch}
                                sx={{ ml: 1, boxShadow: 0, height: "38px" }}
                            >
                                {t("Search")}
                            </Button>
                        </Paper>
                    </Box>

                    {/* for small screen  */}
                    {/* <Box
                        display={{ xs: "flex", md: "none" }}
                        sx={{
                            marginTop: 6,
                            alignItems: "start",
                            justifyContent: "start",
                            paddingBottom: 6,
                            marginLeft: 4
                        }}
                    >
                        <Paper
                            component="form"
                            sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                width: "auto",
                                zIndex: 1000,
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
                                inputRef={inputRef}
                                id="locationValue"
                                onBlur={handleSearch}
                                onKeyPress={handleKeyPress}
                                inputProps={{ "aria-label": "search google maps" }}
                            />
                            <Button
                                startIcon={<Search />}
                                size="small"
                                variant="contained"
                                onClick={handleSearch}
                                sx={{ ml: 1, boxShadow: 0, height: "38px" }}
                            >
                                {t("Search")}
                            </Button>
                        </Paper>
                    </Box> */}

                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={require("../Images/Image.jpg")} alt="" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} />
                </Grid>
            </Grid>

            {/* for large screen  */}
            <Box sx={{ background: "white", height: 600 }} display={{ xs: "none", md: "block" }}>
                <Box textAlign={"center"}>
                    <Typography variant='h6' sx={{ color: "gray", pt: 4 }}>Get A Serviecs</Typography>
                    <Typography variant='h3' sx={{ pt: 2 }}>How It Works</Typography>
                </Box>
                <Box gap={26} display="flex" justifyContent="center" flexWrap="wrap" position="relative">
                    <div id='wrapper' className='wrapper'>
                        <img
                            className="startimg"
                            alt="service-1"
                            src={require('../Images/How_It_Work_1.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px', marginLeft: 4 }}
                        />
                        <div className='line-top'></div>
                        {/* <Box ml={-10} mt={-8}>
                            <img src={require('../Images/step_1.png')} alt='' style={{ rotate: "-23deg" }} />
                        </Box> */}
                        <img
                            className="startimg"
                            alt="service-2"
                            src={require('../Images/How_It_Work_2.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px' }}
                        />
                        <div className='line-bottom'></div>
                        {/* <Box ml={-10} mt={-8}>
                            <img src={require('../Images/step_2.png')} alt='' style={{ rotate: "-23deg" }} />
                        </Box> */}
                        <img
                            className="startimg"
                            alt="service-3"
                            src={require('../Images/How_It_Work_3.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px' }}
                        />
                    </div>
                    {/* <div className='imgOverlay'></div> */}
                </Box>
                <Box gap={22} display="flex" justifyContent="center" flexWrap="wrap" position="relative" mt={8} ml={10}>
                    <h3>1. SELECT THE SERVICE</h3>
                    <h3>2. PICK YOUR SCHEDULE</h3>
                    <h3>3. PICK YOUR SERVICE & RELAX</h3>
                </Box>
                <Box gap={10} display="flex" justifyContent="center" flexWrap="wrap" position="relative" mt={2} ml={10} sx={{ textAlign: "center", color: "gray" }}>
                    <Typography variant="p">Quick, Reliable On-Demand Service.Get <br /> assistence anytime, anywhere. Book now for a <br /> seamless experience!</Typography>
                    <Typography variant="p">Flexible Scheduling, Tailored to You. Set your <br /> preffered time and date. We're here to <br /> accommodate your busy life!</Typography>
                    <Typography variant="p">Place Your Service, Sit Back, and Relax. WE'll <br /> handle the rest!Enjoy a stress-free on-<br /> demand service expreience.</Typography>
                </Box>
            </Box>

            {/* for small screen */}
            <Box sx={{ background: "white" }} display={{ xs: "block", md: "none" }}>
                <Box textAlign={"center"}>
                    <Typography variant='h6' sx={{ color: "gray", pt: 4 }}>Get A Serviecs</Typography>
                    <Typography variant='h4' sx={{ pb: 2 }}>How It Works</Typography>
                </Box>
                <Box gap={26} display="flex" justifyContent="center" flexWrap="wrap" position="relative" ml={10} alignItems="center">
                    <div style={{ display: "block", textAlign: "center", marginLeft: "-100px" }}>
                        <img
                            className="startimg"
                            alt="service-1"
                            src={require('../Images/How_It_Work_1.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px', marginLeft: 16 }}
                        />
                        <br />
                        <h4>1. SELECT THE SERVICE</h4>
                        <Typography variant="p" fontSize={14}>Quick, Reliable On-Demand Service.Get <br /> assistence anytime, anywhere. Book now for a <br /> seamless experience!</Typography>
                        <br />
                        <br />
                        <div className='line-left'></div>

                        <img
                            className="startimg"
                            alt="service-2"
                            src={require('../Images/How_It_Work_2.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px', marginTop: "-64px" }}
                        />
                        <br />

                        <h4>2. PICK YOUR SCHEDULE</h4>
                        <Typography variant="p" fontSize={14}>Flexible Scheduling, Tailored to You. Set your <br /> preffered time and date. We're here to <br /> accommodate your busy life!</Typography>
                        <br />
                        <br />
                        <div className='line-right'></div>

                        <img
                            className="startimg"
                            alt="service-3"
                            src={require('../Images/How_It_Work_3.png')}
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover', flex: '0 0 200px', marginTop: "-104px" }}
                        />
                        <br />
                        <h4>3. PICK YOUR SERVICE & RELAX</h4>
                        <Typography variant="p" fontSize={14}>Place Your Service, Sit Back, and Relax. WE'll <br /> handle the rest!Enjoy a stress-free on-<br /> demand service expreience.</Typography>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default StartPage;