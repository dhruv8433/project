import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { AboutList } from "./Aboutparagraph";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router";
import api from "../../API/Fetch_data_Api";
import { useTheme } from "@emotion/react";
import { t } from "i18next";

function AboutPage() {
  const [aboutUs, setAboutUs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6339007");
    formdata.append("filter", "discount");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://edemand.wrteam.me/api/v1/get_providers", requestOptions)
      .then((response) => response.json())
      .then((response) => setAboutUs(response.data))
      // .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  const theme = useTheme();

  return (
    <>

      <Box bgcolor={theme.palette.background.heading} paddingTop={"15px"} paddingBottom={"15px"} mb={"20px"}>
        <Container maxWidth="lg">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            <Link
              sx={{ cursor: "pointer", textDecoration: "none" }}
              color="inherit"
              onClick={() => navigate("/")}
            >
              {t("Home")}
            </Link>
            <Typography color="text.primary">{t("About")}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            <>{t("About Us")}</>
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} display={{ xs: "block", md: "none" }}>
            <img
              src={require("../../Images/about.png")}
              alt="technology"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} marginTop={{ xs: "none", md: "50px" }}>
            <Box >
              <Typography variant="h4" gutterBottom>
                {t("Know About Us!")}
              </Typography>
              <Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;{t("Welcome to eDemmand is a professional on-demand service plateform, here we will provide you only service, with a focus on dependability and providing doorstep services.")} <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{t("we are working to turn our passion for on demmmand service into a booming our on-demmand service as much as we enjoy offering them. I will keep posting more inportant post on my website for all of you. please give us support and love. Thanks for visiting our site. Have a Nice day !")}
              </Typography>
            </Box>
            {/* <Typography variant="body1" gutterBottom>
            Vestibulum luctus, massa ac suscipit consequat, sapien neque porta
            dui, at faucibus nisi dolor non ante. Nulla quis libero ac lectus
            accumsan vestibulum. Quisque lobortis eget est quis luctus. Proin
            bibendum euismod sapien, eget sagittis quam commodo sit amet. Ut
            euismod tristique dui in eleifend. Praesent aliquet elit elit, eu
            viverra dui rutrum sed.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nulla faucibus ligula vel enim tincidunt mollis. Duis commodo est
            eros, eget tristique tellus auctor ac. Fusce aliquet turpis eu
            libero lacinia, at iaculis sapien facilisis. Donec fermentum, velit
            id interdum gravida, lorem felis tincidunt erat, eu suscipit felis
            est non nisi. Sed non quam non purus consequat egestas ac vitae
            lorem. Suspendisse potenti. In at neque odio. Suspendisse potenti.
          </Typography> */}
            {/* <AboutList /> */}
            <br />
          </Grid>
          <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
            <img
              src={require("../../Images/about.png")}
              alt="technology"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Grid>

        </Grid>
      </Container></>
  );
}

export default AboutPage;
